# Ecode - 二维码生成器 (Chrome 扩展)

一个简洁的 Chrome 浏览器扩展，可将当前页面 URL 生成二维码，也支持自定义内容生成二维码。

## 快速开始（无需安装 Node.js）

本项目为纯前端 Chrome 扩展，**不需要 Node.js 环境**，下载后即可直接加载使用。

### 加载扩展到 Chrome

1. 打开 Chrome 浏览器，在地址栏输入 `chrome://extensions/`
2. 开启右上角的 **"开发者模式"**
3. 点击左上角的 **"加载已解压的扩展程序"**
4. 选择本项目所在目录（`Ecode/`）
5. 安装成功后，扩展列表中会出现 **Ecode**

### 使用扩展

1. 点击 Chrome 工具栏右上角的扩展图标（拼图图标），找到 **Ecode** 并点击
2. 弹出窗口会自动读取当前标签页的 URL 并生成二维码
3. 支持以下操作：
   - **生成二维码**：修改输入框内容后，点击"生成二维码"按钮
   - **快捷生成**：在输入框中按 `Ctrl+Enter`（Mac: `Cmd+Enter`）
   - **重置为页面 URL**：点击"重置为页面 URL"按钮恢复当前页面链接

## Node.js 环境（仅限开发依赖管理）

二维码库已内置在 `libs/` 目录中，**正常情况下无需安装任何依赖**。`package.json` 仅用于记录 `qrcode-generator` 版本信息，供需要时参考。

如需重新安装或更新依赖，建议 Node.js **16.x 及以上** LTS 版本：

```bash
npm install
```

## 项目结构

```
Ecode/
├── icons/              # 扩展图标
├── libs/               # qrcode-generator 库文件（内置，无需 npm install）
│   ├── qrcode.js
│   └── qrcode.min.js
├── manifest.json       # Chrome 扩展清单 (Manifest V3)
├── popup.html          # 弹出窗口 HTML
├── popup.css           # 弹出窗口样式
├── popup.js            # 弹出窗口逻辑
├── package.json        # npm 依赖配置（仅记录版本，非必需）
└── README.md           # 本文件
```

## 技术说明

- **Manifest V3**：基于 Chrome Extension Manifest V3 规范
- **权限**：仅需 `activeTab` 权限，用于读取当前标签页 URL
- **二维码库**：使用 [qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator) JS 库
