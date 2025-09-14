# OpenWeb3 弹窗组件库

基于 shadcn-ui 构建的现代化弹窗组件库，专为 OpenWeb3 钱包扩展设计。

## 特性

- 🎨 **Uniswap 风格设计** - 与项目整体设计保持一致
- 🌐 **国际化支持** - 支持中英双语切换
- 📱 **响应式布局** - 适配浏览器扩展窗口
- ✨ **流畅动画** - Framer Motion 提供的过渡效果
- 🎯 **TypeScript 支持** - 完整的类型定义

## 组件列表

### 1. TransactionConfirmModal - 交易确认弹窗

用于交易签署确认的专用弹窗，支持发送、接收、交换等不同交易类型。

**特性：**
- 显示交易详情（金额、地址、网络费用等）
- 支持不同交易类型的图标和颜色
- 内置安全警告提示
- 加载状态支持

**使用示例：**
```tsx
import { TransactionConfirmModal } from '../ui';

const [isOpen, setIsOpen] = useState(false);
const [isLoading, setIsLoading] = useState(false);

<TransactionConfirmModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onConfirm={() => handleConfirm()}
  isLoading={isLoading}
  transaction={{
    type: 'send',
    fromToken: 'ETH',
    fromAmount: '0.05',
    toAddress: '0x1234...5678',
    network: 'Ethereum',
    estimatedFee: '0.002 ETH (~$4.85)'
  }}
/>
```

### 2. QRCodeModal - 二维码弹窗

用于显示二维码的弹窗，支持地址分享、下载和复制功能。

**特性：**
- 自动生成二维码
- 一键复制功能
- 下载为PNG图片
- 系统分享功能（支持的设备）
- 自定义尺寸

**使用示例：**
```tsx
import { QRCodeModal } from '../ui';

<QRCodeModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="接收 ETH"
  description="分享此二维码或地址以接收付款"
  value="0x742e4C842694F455A1c8E2bD8a1ee28962b9B88a"
  size={200}
/>
```

### 3. ConfirmModal - 通用确认弹窗

通用的确认对话框，支持不同的样式主题和自定义内容。

**特性：**
- 多种主题样式（info、warning、danger、success）
- 自定义内容支持
- 灵活的按钮文本配置
- 加载状态支持

**使用示例：**
```tsx
import { ConfirmModal } from '../ui';

<ConfirmModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onConfirm={() => handleConfirm()}
  title="删除钱包"
  description="此操作无法撤销，请确认是否继续"
  type="danger"
  confirmText="删除"
  cancelText="取消"
/>
```

## 基础组件

### Dialog - 对话框基础组件

基于 Radix UI 的对话框组件，提供了所有弹窗的基础功能。

**组件列表：**
- `Dialog` - 根组件
- `DialogTrigger` - 触发器
- `DialogContent` - 内容容器
- `DialogHeader` - 头部区域
- `DialogTitle` - 标题
- `DialogDescription` - 描述
- `DialogFooter` - 底部区域

### Button - 按钮组件

提供多种样式的按钮组件。

**变体：**
- `default` - 默认样式
- `gradient` - 渐变样式（推荐用于主要操作）
- `outline` - 边框样式
- `ghost` - 透明样式
- `success` - 成功样式
- `danger` - 危险操作样式

## 国际化

所有组件都支持国际化，使用 react-i18next 进行语言切换。

**翻译键：**
```json
{
  "common": {
    "cancel": "取消",
    "confirm": "确认",
    "close": "关闭",
    "processing": "处理中..."
  },
  "transaction": {
    "send": "发送交易",
    "receive": "接收交易",
    "swap": "代币交换",
    "confirmDetails": "请仔细检查并确认交易详情"
  },
  "qr": {
    "title": "二维码",
    "copy": "复制",
    "download": "下载",
    "share": "分享"
  }
}
```

## 样式定制

组件使用 Tailwind CSS 构建，支持深色/浅色主题切换。

**CSS 变量：**
```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --border: 214.3 31.8% 91.4%;
  --radius: 0.5rem;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --card: 222.2 84% 4.9%;
  --border: 217.2 32.6% 17.5%;
}
```

## 最佳实践

1. **状态管理：** 使用 useState 管理弹窗的开启/关闭状态
2. **加载状态：** 在异步操作期间显示加载状态，防止重复提交
3. **错误处理：** 在 onConfirm 回调中添加适当的错误处理
4. **无障碍访问：** 组件已内置键盘导航和屏幕阅读器支持
5. **性能优化：** 使用条件渲染，仅在需要时渲染弹窗组件

## 依赖项

- React 18+
- TypeScript
- Tailwind CSS
- Framer Motion
- React-i18next
- @radix-ui/react-dialog
- react-qr-code

## 更新日志

### v1.0.0
- 初始版本发布
- 支持交易确认、二维码显示、通用确认三种弹窗
- 完整的国际化支持
- shadcn-ui 设计系统集成