// popup.js - Ecode Chrome Extension

(function () {
  'use strict';

  const qrCodeEl = document.getElementById('qr-code');
  const textInput = document.getElementById('text-input');
  const generateBtn = document.getElementById('generate-btn');
  const resetBtn = document.getElementById('reset-btn');
  const statusText = document.getElementById('status-text');

  let currentPageUrl = '';

  // Generate QR code for given text
  function generateQR(text) {
    clearStatus();

    if (!text || !text.trim()) {
      showStatus('请输入文本或 URL', 'error');
      qrCodeEl.innerHTML = '';
      return;
    }

    text = text.trim();

    try {
      const qr = qrcode(0, 'M');
      qr.addData(text);
      qr.make();
      // cellSize=5, margin=0 (we add our own padding via CSS)
      qrCodeEl.innerHTML = qr.createImgTag(5, 0);

      // Update status with truncated text
      const display = text.length > 60 ? text.slice(0, 60) + '...' : text;
      showStatus(display, 'info');
    } catch (e) {
      qrCodeEl.innerHTML = '';
      if (e.message && e.message.indexOf('too long') !== -1) {
        showStatus('内容过长，无法生成二维码', 'error');
      } else {
        showStatus('生成失败：' + e.message, 'error');
      }
    }
  }

  function showStatus(msg, type) {
    statusText.textContent = msg;
    statusText.className = type === 'error' ? 'error' : type === 'warning' ? 'warning' : '';
  }

  function clearStatus() {
    statusText.textContent = '';
    statusText.className = '';
  }

  // Check if URL is a special Chrome page
  function isSpecialUrl(url) {
    return url.startsWith('chrome://') ||
           url.startsWith('chrome-extension://') ||
           url === 'about:blank' ||
           url.startsWith('edge://') ||
           url.startsWith('brave://');
  }

  // Get current tab URL and initialize
  function init() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (!tabs || !tabs.length) {
        showStatus('无法获取当前页面信息', 'error');
        return;
      }

      const tab = tabs[0];
      currentPageUrl = tab.url || '';

      if (!currentPageUrl || currentPageUrl === 'about:blank') {
        showStatus('当前页面没有 URL', 'warning');
        textInput.value = '';
        return;
      }

      if (isSpecialUrl(currentPageUrl)) {
        showStatus('该页面 URL 无法在其他设备打开', 'warning');
        textInput.value = currentPageUrl;
        generateQR(currentPageUrl);
        return;
      }

      textInput.value = currentPageUrl;
      generateQR(currentPageUrl);
    });
  }

  // Event: Generate button
  generateBtn.addEventListener('click', function () {
    const text = textInput.value;
    generateQR(text);
  });

  // Event: Enter key in textarea (Ctrl+Enter or Cmd+Enter to generate)
  textInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      generateQR(textInput.value);
    }
  });

  // Event: Reset button
  resetBtn.addEventListener('click', function () {
    if (currentPageUrl) {
      textInput.value = currentPageUrl;
      generateQR(currentPageUrl);
    }
  });

  // Initialize on load
  init();
})();
