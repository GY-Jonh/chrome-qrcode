// popup.js - Ecode Chrome Extension

(function () {
  'use strict';

  // 覆盖 stringToBytes 为 UTF-8 编码，支持中文
  qrcode.stringToBytes = qrcode.stringToBytesFuncs['UTF-8'];

  const qrCodeEl = document.getElementById('qr-code');
  const textInput = document.getElementById('text-input');
  const generateBtn = document.getElementById('generate-btn');
  const resetBtn = document.getElementById('reset-btn');

  let currentPageUrl = '';

  // Generate QR code for given text
  function generateQR(text) {

    if (!text || !text.trim()) {
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
    } catch (e) {
      qrCodeEl.innerHTML = '';
    }
  }

  // Get current tab URL and initialize
  function init() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (!tabs || !tabs.length) {
        return;
      }

      const tab = tabs[0];
      currentPageUrl = tab.url || '';

      if (!currentPageUrl || currentPageUrl === 'about:blank') {
        textInput.value = '';
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
