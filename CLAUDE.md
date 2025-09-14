# OpenWeb3 钱包扩展

## 项目概述

OpenWeb3是一个现代化的Web3钱包浏览器扩展，采用React 19 + TypeScript + Vite构建。项目实现了完整的钱包功能，包括创建钱包、导入钱包、密码保护、助记词管理等核心功能。界面设计现代化，支持深色/浅色主题切换，以及中英文双语支持。

## 核心技术栈

### 前端框架
- **React 19** - 最新版本的React用户界面库
- **TypeScript 5.8** - 类型安全的JavaScript超集
- **Vite 7.1** - 现代化构建工具，快速开发体验

### 样式和UI
- **Tailwind CSS 3.4** - 原子化CSS框架
- **Framer Motion 12.23** - 流畅的动画效果库
- **Lucide React** - 现代化图标库
- **Google Fonts** - Montserrat (英文) + Noto Sans SC (中文)

### Web3技术栈
- **ethers.js v6.15** - 以太坊JavaScript库
- **bip39 v3.1** - 助记词生成和验证
- **HD钱包支持** - 分层确定性钱包实现

### 状态管理和工具
- **Zustand 5.0** - 轻量级状态管理库
- **React-i18next 15.7** - 国际化解决方案
- **React QR Code** - 二维码生成组件

### 浏览器扩展
- **Plasmo Framework 0.90** - 现代化扩展开发框架 (待实现)
- **Manifest V3** - 支持最新的浏览器扩展标准

## 项目结构

```
wallet-extension/
├── src/
│   ├── components/           # React组件
│   │   ├── OpenWeb3Welcome.tsx    # 欢迎页面组件
│   │   ├── CreateWallet.tsx       # 创建钱包组件
│   │   ├── ImportWallet.tsx       # 导入钱包组件
│   │   ├── WalletPassword.tsx     # 密码设置组件
│   │   ├── WalletSetup.tsx        # 钱包设置组件（占位）
│   │   ├── UnlockWallet.tsx       # 钱包解锁组件（占位）
│   │   ├── WalletApp.tsx          # 主钱包应用（占位）
│   │   ├── WalletHeader.tsx       # 钱包头部组件
│   │   ├── UserInfo.tsx           # 用户信息组件
│   │   ├── BalanceSection.tsx     # 余额显示组件
│   │   ├── ActionButtons.tsx      # 操作按钮组件
│   │   ├── TokenList.tsx          # 代币列表组件
│   │   ├── ThemeToggle.tsx        # 主题切换组件
│   │   ├── LanguageToggle.tsx     # 语言切换组件
│   │   ├── CryptoProjectIcon.tsx  # 加密项目图标组件
│   │   └── ui/               # UI基础组件
│   │       ├── AlertModal.tsx         # 警告弹窗
│   │       ├── ConfirmModal.tsx       # 确认弹窗
│   │       ├── PasskeyModal.tsx       # Passkey身份验证弹窗
│   │       ├── QRCodeModal.tsx        # 二维码弹窗
│   │       ├── TransactionConfirmModal.tsx # 交易确认弹窗
│   │       ├── button.tsx             # 按钮组件
│   │       └── dialog.tsx             # 对话框组件
│   ├── store/               # 状态管理
│   │   ├── useWalletStore.ts      # 钱包状态管理
│   │   ├── useThemeStore.ts       # 主题状态管理
│   │   └── useLanguageStore.ts    # 语言状态管理
│   ├── i18n/                # 国际化
│   │   ├── index.ts              # i18n配置
│   │   └── locales/              # 语言文件
│   │       ├── en.json           # 英文翻译
│   │       └── zh.json           # 中文翻译
│   ├── App.tsx              # 主应用组件
│   ├── main.tsx             # 应用入口点
│   └── index.css            # 全局样式文件
├── public/                  # 静态资源
│   ├── bip39-wordlist.txt   # BIP39单词表
|   └── icon.png             # logo.png
├── index.html              # 主HTML文件
├── tailwind.config.js      # Tailwind配置
├── vite.config.ts          # Vite构建配置
├── tsconfig.json           # TypeScript配置
├── package.json            # 项目依赖和脚本
└── CLAUDE.md              # 项目文档
```

## 核心功能实现

### 🎨 用户界面和体验
- **现代化设计** - 简洁优雅的界面设计
- **双主题支持** - 深色/浅色主题无缝切换
- **响应式布局** - 375x600像素钱包窗口优化
- **流畅动画** - Framer Motion驱动的过渡效果
- **浮动背景动画** - 加密项目图标动画背景

### 🔐 钱包核心功能
- **HD钱包支持** - BIP44标准的分层确定性钱包
- **助记词管理** - BIP39标准的12词助记词生成和验证
- **密码加密** - 本地密码加密存储（简化版，生产环境需加强）
- **账户管理** - 多账户创建和切换功能
- **钱包导入** - 通过助记词导入现有钱包

### 🌐 国际化功能
- **双语支持** - 中文和英文界面切换
- **动态翻译** - React-i18next实现的实时语言切换
- **本地化存储** - 用户偏好设置持久化

### 🔒 安全特性
- **密码保护** - 钱包创建和访问密码保护
- **本地存储** - 敏感数据本地加密存储
- **Passkey支持** - WebAuthn生物识别身份验证（实现中）

## 状态管理架构

### 钱包状态 (useWalletStore)
```typescript
interface WalletState {
  isInitialized: boolean;        // 钱包是否已初始化
  isLocked: boolean;             // 钱包是否锁定
  currentAccount: WalletAccount | null;  // 当前选中账户
  accounts: WalletAccount[];     // 所有账户列表
  mnemonic: string | null;       // 助记词（解锁后）

  // 核心操作
  createWallet: (password: string) => Promise<void>;
  importWallet: (mnemonic: string, password: string) => Promise<void>;
  unlockWallet: (password: string) => Promise<boolean>;
  lockWallet: () => void;
  addAccount: (name: string) => Promise<WalletAccount>;
}
```

### 账户结构
```typescript
interface WalletAccount {
  id: string;                    // 账户ID
  name: string;                  // 账户名称
  address: string;               // 以太坊地址
  privateKey: string;            // 私钥
  derivationPath: string;        // HD派生路径
}
```

## 开发和构建

### 环境要求
- Node.js 18+
- npm 或 yarn

### 开发命令
```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 代码检查
npm run lint

# 预览构建结果
npm run preview
```

### 开发服务器
- 开发地址: http://localhost:5173
- 热重载支持
- TypeScript类型检查

## 组件说明

### 主要页面组件

#### OpenWeb3Welcome
欢迎页面，提供创建钱包和导入钱包入口
- 主题切换功能
- 语言切换功能
- 动画背景效果
- 响应式布局

#### CreateWallet
创建新钱包流程
- 密码强度验证
- Passkey支持（可选）
- 安全提示和指导

#### ImportWallet
导入现有钱包
- BIP39助记词验证（已禁用严格验证）
- 自动完成和建议功能
- 12/24词助记词支持

#### WalletPassword
密码设置和验证
- 密码强度检查
- 确认密码验证
- 生物识别选项

### UI组件库

完整的模态框组件系统：
- **AlertModal** - 信息提示弹窗
- **ConfirmModal** - 确认操作弹窗
- **PasskeyModal** - Passkey身份验证
- **QRCodeModal** - 二维码显示和扫描
- **TransactionConfirmModal** - 交易确认界面

## 配置文件

### Tailwind配置
- 自定义字体: Montserrat + Noto Sans SC
- Uniswap风格色彩系统
- 自定义动画效果
- 深色/浅色主题变量

### TypeScript配置
- 严格类型检查
- 路径别名 (@/ -> src/)
- React 19 支持
- ES2020 目标

### Vite配置
- React插件
- 路径解析
- 开发服务器配置

## 当前实现状态

### ✅ 已完成
- [x] 基础项目架构
- [x] UI组件库
- [x] 钱包核心逻辑
- [x] 助记词生成和验证
- [x] 密码加密存储
- [x] 双主题支持
- [x] 国际化支持
- [x] 响应式设计
- [x] Google Fonts集成

### 🚧 开发中
- [ ] 浏览器扩展集成 (Plasmo)
- [ ] Passkey完整实现
- [ ] 网络连接和RPC
- [ ] 交易功能
- [ ] NFT支持

### 📋 待开发
- [ ] 代币余额查询
- [ ] 交易历史
- [ ] DApp连接
- [ ] 硬件钱包支持
- [ ] 多链支持

## 安全考虑

### 当前实现
- 简化的密码加密（使用btoa/atob）
- 本地存储敏感数据
- 基础的错误处理

### 生产环境改进
- 使用Web Crypto API或专业加密库
- 实现安全的密钥派生函数
- 添加盐值和多轮加密
- 实现安全的内存清理
- 添加防截屏和调试保护

## 部署说明

### Web应用部署
当前项目可作为标准Web应用部署到任何静态托管服务

### 浏览器扩展打包
1. 构建项目: `npm run build`
2. 配置manifest.json文件
3. 打包dist目录为.zip文件
4. 上传到Chrome Web Store或Firefox Add-ons

## 开发指南

### 代码规范
- 使用TypeScript严格模式
- 遵循React函数组件模式
- 使用Tailwind CSS原子化类名
- 国际化所有用户可见文本
- 保持组件单一职责原则

### 提交规范
- 使用语义化提交信息
- 代码提交前运行类型检查
- 确保构建无错误
- 添加必要的测试用例

## 致谢

- **React团队** - 优秀的UI库
- **Tailwind CSS** - 强大的CSS框架
- **ethers.js** - 可靠的Web3库
- **Framer Motion** - 流畅的动画库
- **Zustand** - 简洁的状态管理

---

*OpenWeb3 - 让每个人都能轻松使用Web3*