import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  FileText, Copy, Check, RefreshCw, Layers, Layout, Edit3, Eye, 
  Settings, ChevronRight, ChevronLeft, Download, Info, AlertTriangle, 
  AlertCircle, CheckCircle2, Moon, Sun, ArrowUpRight, CheckSquare, 
  FileCode, Play, Trash2, Sliders, Menu
} from 'lucide-react';

// Pre-loaded stunning Markdown templates
const TEMPLATES = {
  mobius: `# ROCK-AI 智能调度中心系统规范

> [!NOTE]
> **通知：** 本指南是由 ROCK-AI 设计委员会审定的 V8.0 核心工业规范。所有符合该系统的终端应用，均须严格对齐 Apple HIG 空间与触控标准，同时遵循 ROCK-AI 极简 2D 正交理念。

---

## 1. 核心工业准则与安全

自动驾驶车辆本质上是重型工业机器，其安全系数必须由高对比度的界面视觉完全锚定。

> [!WARNING]
> **安全警示：** 自动驾驶作业车辆在特定操作状态下存在物理碰撞危险。界面必须确保所有报警源始终处于最优先层级，严禁任何形式 of 视觉遮挡。

> [!ERROR]
> **紧急响应 DANGER：** 当检测到 \`EMG_STOP_CONN\` 离线时，系统会立即触发物理锁定，此时主控制台所有的浮动浮窗（OOUI）应全部退位，让路给全屏红色高对比报警阻断卡片。

---

## 2. 操作人员班前合规检查项

在启动调度地图前，请操作员在下方自测检查表中核验关键参数。*(小提示：你可以直接点击下方的多选框来更新文档状态！)*

- [x] 完成班前车辆 2D 正交雷达标定与方向盘阻尼校验
- [x] 核验 2px 矢量 SVG 状态指示灯正常，保证无边缘发虚
- [ ] 确保控制台 [On-Demand Inputs] 按需变轨编辑处于解锁状态
- [ ] 停靠属性面板 (Docked Panel) 连接度达 100% (拒绝浮动跟随)
- [ ] 系统报警蜂鸣器声音处于 >= 85dB 的高清晰可听状态

---

## 3. 现场遥测核心参数表

下方表格为调度主系统对远端 1 号矿区车队的实时遥测快照。

| 遥测参数名称 | 额定标准范围 | 当前状态 | 现场遥测代码 |
| :--- | :--- | :--- | :--- |
| **主动力母线电压** | 380V - 420V | 🟢 正常 (412.5V) | \`SYS_VOLT_01\` |
| **GPS 三维偏差率** | < 0.05 m | 🟢 正常 (0.02m) | \`GPS_DEV_RATE\` |
| **主传动油温** | 45°C - 85°C | 🟡 警告 (81.2°C) | \`BRK_TEMP_WARN\` |
| **急停连通度** | 100% | 🔴 危险 (92.5%) | \`EMG_STOP_CONN\` |

---

## 4. 现场核心锁定脚本示例

以下为挂载于调度服务器上的轻量级校验脚本，使用 Node.js 构建：

\`\`\`typescript
// 核心安全锁定脚本 (ROCK-AI Secure Lock)
function evaluateEmergencyLock(telemetry: TelemetryData): boolean {
  if (telemetry.emergencyStopConnected === false) {
    triggerPhysicalAlarm("CRITICAL_ERR_OFFLINE");
    lockdownChassis("BRAKE_FORCE_100");
    return true; // 触发紧急锁定
  }
  return false; // 系统运行平稳
}
\`\`\`

---

## 5. 操作员执行备注

> "工业界面的精美，不源自五彩斑斓的科技感。而是来自在极端疲惫的夜班环境下，所有的间距、字体和色彩都能最快地提供安全指引，绝不让操作人员产生一丝犹豫。"
> 
> ———— *ROCK-AI 自动驾驶系统总设计师*`,

  higspec: `# Apple Human Interface Guidelines (HIG) 动态设计系统

Apple HIG 是业内公认的高品质视觉交互语言。它通过 **Vibrancy、Clear Hierarchy、Consistent Squircles**，重新定义了人机界面的美学、层级与高确定性交互。

---

## 1. 核心设计特质

Apple HIG 拥有以下四大核心设计系统特质：

- **自适应色彩 (Vibrant Colors):** 精心调配高对比度、视网膜友好的 System 基础色彩，确保在强光与夜视环境下均具备杰出的 WCAG 无障碍辨识度。
- **柔和圆角 (Squircle Corners):** 卡片与弹窗默认采用连续平滑圆角（Squircle / rounded-2xl），既显温和友好，又能极致优化边缘对齐。
- **指针反馈 (Tactile Pointer):** 悬停高亮与微调按下直接触发 2% 左右的物理内凹缩放反馈，提供纯粹自然的阻尼感。
- **无障碍点击 (Accessibilities):** 按钮和交互选项的点击目标区域保持在至少 44px 见方，完美满足高频调度人员在行进中的盲操。

---

## 2. 预设圆角规范对照

| HIG 圆角级别 | 圆角像素值 (CSS px) | 典型应用组件 |
| :--- | :--- | :--- |
| **None (直角)** | 0px | 屏幕边缘拼贴、无缝列表、传统表格单元格 |
| **Small** | 8px | 标准文本框 (TextField)、多选框、过滤标签 |
| **Medium (rounded-xl)** | 12px | 标准信息卡片 (Cards)、下拉菜单选择器 |
| **Large (rounded-2xl)** | 16px | 侧边栏/底边栏、核心对话框卡片 |
| **Extra Large** | 24px | **调度面板核心大底板、浮动状态阻断面板** |
| **Full (全圆角)** | 9999px | 全局浮动功能药丸芯片、各种徽标徽章 |

---

## 3. Apple 动态色彩状态核验表

- [x] 配置 Apple System Blue 核心品牌主色 (#0071E3)
- [x] 对齐 System Background 纯白底色 (#FFFFFF)
- [ ] 挂载 System Vibrancy 视觉效果 (自动适配底板半透明磨砂)
- [ ] 实现 Apple 指针悬停（Scale & Highlight）与轻压缩小（scale-98）反馈

---

## 4. 自定义色彩令牌 (Dynamic Theme Token)

\`\`\`css
/* Apple System Colors */
:root {
  --apple-sys-color-blue: #0071E3;
  --apple-sys-color-text: #1d1d1f;
  --apple-sys-color-gray: #f5f5f7;
  --apple-sys-color-green: #34c759;
  --apple-sys-color-orange: #ff9500;
}
\`\`\`

---

## 5. Apple 核心信条

> "Simplicity is the ultimate sophistication. / 极简是终极的复杂。"
> ———— *Steve Jobs*`,

  custom: `# 我的 Markdown 自由书写文档

在此输入或粘贴你自己的 Markdown 文档内容，系统会立刻将它解析成漂亮的 Apple HIG 风格页面！

---

## 1. 快速测试

你可以在这里自由进行测试：

- [ ] 这是一个未勾选的 HIG 任务
- [x] 这是一个已勾选的 HIG 任务

> [!NOTE]
> 这是一个优雅的系统提示信息。

> [!WARNING]
> 这是一个带图标的高反差警告条。

| 列标题 1 | 列标题 2 |
| :--- | :--- |
| 数据 1 | 数据 2 |
| 数据 3 | 数据 4 |

写一段代码：
\`\`\`javascript
console.log("Apple HIG 网站渲染器启动成功！");
\`\`\`
`
};

// Available Color Themes
const THEMES = [
  {
    id: 'blue',
    name: '苹果经典蓝 (Apple Blue)',
    primary: '#0071E3',
    bg: '#F5F5F7',
    onSurface: '#1D1D1F',
    mutedSurface: '#F5F5F7',
    secondaryContainer: '#E8F2FF',
    lightPurple: '#C1E0FF', // Used as active tag highlight
    accentClass: 'text-[#0071E3] bg-[#0071E3]/10',
    hoverClass: 'hover:bg-[#0071E3]/10 hover:text-[#0071E3]',
    activeBtn: 'bg-[#0071E3] hover:bg-[#0071E3]/95 text-white',
    outlineBorder: 'border-[#0071E3]/25 focus:border-[#0071E3] focus:ring-[#0071E3]/20'
  },
  {
    id: 'emerald',
    name: '安全翡翠绿 (Apple Green)',
    primary: '#34C759',
    bg: '#F5F5F7',
    onSurface: '#1D1D1F',
    mutedSurface: '#F5F5F7',
    secondaryContainer: '#EBF9EE',
    lightPurple: '#C6F2D2',
    accentClass: 'text-[#34C759] bg-[#EBF9EE]',
    hoverClass: 'hover:bg-[#34C759]/10 hover:text-[#34C759]',
    activeBtn: 'bg-[#34C759] hover:bg-[#34C759]/95 text-white',
    outlineBorder: 'border-[#34C759]/25 focus:border-[#34C759] focus:ring-[#34C759]/20'
  },
  {
    id: 'orange',
    name: '琥珀活力橙 (Apple Orange)',
    primary: '#FF9500',
    bg: '#F5F5F7',
    onSurface: '#1D1D1F',
    mutedSurface: '#F5F5F7',
    secondaryContainer: '#FFF5E6',
    lightPurple: '#FFE3B3',
    accentClass: 'text-[#FF9500] bg-[#FFF5E6]',
    hoverClass: 'hover:bg-[#FF9500]/10 hover:text-[#FF9500]',
    activeBtn: 'bg-[#FF9500] hover:bg-[#FF9500]/95 text-white',
    outlineBorder: 'border-[#FF9500]/25 focus:border-[#FF9500] focus:ring-[#FF9500]/20'
  },
  {
    id: 'indigo',
    name: '星曜深海靛 (Apple Indigo)',
    primary: '#5856D6',
    bg: '#F5F5F7',
    onSurface: '#1D1D1F',
    mutedSurface: '#F5F5F7',
    secondaryContainer: '#EEEDFA',
    lightPurple: '#D3D2F5',
    accentClass: 'text-[#5856D6] bg-[#EEEDFA]',
    hoverClass: 'hover:bg-[#5856D6]/10 hover:text-[#5856D6]',
    activeBtn: 'bg-[#5856D6] hover:bg-[#5856D6]/95 text-white',
    outlineBorder: 'border-[#5856D6]/25 focus:border-[#5856D6] focus:ring-[#5856D6]/20'
  }
];

export default function MarkdownWorkspace() {
  const [activeTab, setActiveTab] = useState<'mobius' | 'higspec' | 'custom'>('mobius');
  const [markdownText, setMarkdownText] = useState<string>(TEMPLATES.mobius);
  const [themeId, setThemeId] = useState<string>('blue');
  const [viewMode, setViewMode] = useState<'split' | 'full'>('split');
  const [copiedState, setCopiedState] = useState(false);
  const [exportedState, setExportedState] = useState(false);
  const [activeAnchor, setActiveAnchor] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const previewContainerRef = useRef<HTMLDivElement>(null);

  const currentTheme = THEMES.find(t => t.id === themeId) || THEMES[0];

  // Sync template text when template tab changes
  const handleTabChange = (tab: 'mobius' | 'higspec' | 'custom') => {
    setActiveTab(tab);
    setMarkdownText(TEMPLATES[tab]);
  };

  // Extract headings from Markdown to generate a Sidebar Table of Contents
  const extractHeadings = (text: string) => {
    const lines = text.split('\n');
    const headingList: { id: string; text: string; level: number }[] = [];
    lines.forEach((line) => {
      // Match #, ##, ### at start of line
      const match = line.match(/^(#{1,3})\s+(.+)$/);
      if (match) {
        const level = match[1].length;
        const headingText = match[2].replace(/`|[*_~]/g, '').trim();
        // Generate slug id
        const id = headingText.toLowerCase()
          .replace(/[^\w\u4e00-\u9fa5\s-]/g, '')
          .replace(/\s+/g, '-');
        headingList.push({ id, text: headingText, level });
      }
    });
    return headingList;
  };

  const headings = extractHeadings(markdownText);

  // Toggle checklist items in source markdown text
  const toggleMarkdownCheckbox = (lineIndex: number) => {
    const lines = markdownText.split('\n');
    let currentTaskIndex = 0;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      // Match - [ ] or - [x] or * [ ] or * [x]
      const match = line.match(/^(\s*[-*]\s+\[)([\sXx])(\]\s+.+)$/);
      if (match) {
        if (currentTaskIndex === lineIndex) {
          const isChecked = match[2].toLowerCase() === 'x';
          const newMark = isChecked ? ' ' : 'x';
          lines[i] = `${match[1]}${newMark}${match[3]}`;
          break;
        }
        currentTaskIndex++;
      }
    }
    setMarkdownText(lines.join('\n'));
  };

  // Dynamic checklist progress calculation
  const getChecklistStats = () => {
    const matches = markdownText.match(/^\s*[-*]\s+\[([\sXx])\]/gm);
    if (!matches) return { total: 0, checked: 0, percentage: 0 };
    const total = matches.length;
    const checked = matches.filter(m => m.includes('x') || m.includes('X')).length;
    const percentage = Math.round((checked / total) * 100);
    return { total, checked, percentage };
  };

  const checklistStats = getChecklistStats();

  // Reset current tab to original template
  const handleReset = () => {
    setMarkdownText(TEMPLATES[activeTab]);
  };

  // Copy raw Markdown to clipboard
  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(markdownText);
    setCopiedState(true);
    setTimeout(() => setCopiedState(false), 2000);
  };

  // Clear workspace
  const handleClear = () => {
    setMarkdownText('');
  };

  // Export full styled HTML file
  const handleExportHTML = () => {
    const previewContent = previewContainerRef.current?.innerHTML || '';
    const styleVariables = `
      --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      --font-serif: Georgia, serif;
      --font-mono: SFMono-Regular, Consolas, monospace;
      --color-apple-primary: ${currentTheme.primary};
      --color-apple-surface: #FFFFFF;
      --color-apple-text: ${currentTheme.onSurface};
      --color-apple-gray: ${currentTheme.bg};
      --color-apple-secondary-container: ${currentTheme.secondaryContainer};
    `;

    const htmlTemplate = `<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Apple HIG Generated Website</title>
    <script src="https://unpkg.com/@tailwindcss/browser@4"></script>
    <style>
      :root {
        ${styleVariables}
      }
      body {
        background-color: var(--color-apple-gray);
        color: var(--color-apple-text);
        font-family: var(--font-sans);
      }
    </style>
</head>
<body class="p-4 md:p-12 min-h-screen">
    <div class="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl p-6 md:p-12 shadow-sm">
      <div class="flex items-center gap-2 text-xs font-mono mb-4 text-gray-500 uppercase tracking-widest border-b border-gray-100 pb-3">
        <span>Published Document</span>
        <span>/</span>
        <span style="color: var(--color-apple-primary)" class="font-bold">APPLE HIG RENDERER V1.0</span>
      </div>
      <div class="prose prose-zinc max-w-none">
        ${previewContent}
      </div>
    </div>
</body>
</html>`;

    const blob = new Blob([htmlTemplate], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `apple-website-${activeTab}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setExportedState(true);
    setTimeout(() => setExportedState(false), 2000);
  };

  // Jump to specific anchor section in the preview
  const scrollToAnchor = (id: string) => {
    setActiveAnchor(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    setMobileMenuOpen(false);
  };

  // Tracking Checklist sequentially in Render Loop
  let checklistRenderCount = 0;

  return (
    <div className="space-y-6 animate-fade-in font-sans" id="apple-markdown-workspace">
      
      {/* Top Controller Bar */}
      <div className="bg-white border border-[#D2D2D7]/50 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0071E3] inline-block"></span>
            <span className="text-[10px] font-mono font-bold text-[#0071E3] uppercase tracking-widest">MD-to-APPLE HIG WEBSITE RENDERER</span>
          </div>
          <h3 className="text-xl font-bold text-[#1D1D1F]">
            Markdown 到 <span className="text-[#0071E3]">Apple HIG 网页渲染器</span>
          </h3>
          <p className="text-xs text-[#86868B] leading-relaxed max-w-xl">
            提供真正的 Markdown 极速排版预览，在后台自动将标准的层级标题、警告提示框、技术表格和待办列表转换成极其精致的 Apple HIG 页面。
          </p>
        </div>

        {/* View Mode & Theme switches */}
        <div className="flex flex-wrap gap-3 w-full md:w-auto shrink-0">
          
          {/* Accent Theme Selection */}
          <div className="flex items-center gap-1.5 bg-[#F5F5F7] p-1 border border-[#D2D2D7]/30 rounded-xl">
            <span className="text-[9px] font-mono font-bold text-[#86868B] px-2">配色:</span>
            {THEMES.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setThemeId(theme.id)}
                className={`w-6 h-6 rounded-full cursor-pointer transition-transform relative ${
                  themeId === theme.id ? 'scale-110 ring-2 ring-offset-2 ring-[#0071E3]' : 'hover:scale-105'
                }`}
                style={{ backgroundColor: theme.primary }}
                title={theme.name}
              />
            ))}
          </div>

          {/* Editor Switcher */}
          <div className="flex bg-[#F5F5F7] p-1 border border-[#D2D2D7]/30 rounded-xl gap-1">
            <button
              onClick={() => setViewMode('split')}
              className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                viewMode === 'split' 
                  ? 'bg-white shadow-sm text-[#1D1D1F] font-bold' 
                  : 'text-[#86868B] hover:text-[#0071E3]'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" /> 双栏编辑
            </button>
            <button
              onClick={() => setViewMode('full')}
              className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                viewMode === 'full' 
                  ? 'bg-white shadow-sm text-[#1D1D1F] font-bold' 
                  : 'text-[#86868B] hover:text-[#0071E3]'
              }`}
            >
              <Eye className="w-3.5 h-3.5" /> 纯网页预览
            </button>
          </div>
        </div>
      </div>

      {/* Main Sandbox Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* LEFT COLUMN: Markdown Editor & Template choice */}
        {viewMode === 'split' && (
          <div className="lg:col-span-5 bg-white border border-[#D2D2D7]/50 rounded-2xl p-6 shadow-sm flex flex-col space-y-4 h-[720px]">
            
            {/* Header tab choose */}
            <div className="flex items-center justify-between border-b border-[#D2D2D7]/30 pb-3">
              <span className="text-[10px] font-mono font-bold text-[#86868B] uppercase tracking-wider">MARKDOWN WORKSPACE</span>
              <div className="flex bg-[#F5F5F7] p-1 rounded-xl gap-1">
                <button
                  onClick={() => handleTabChange('mobius')}
                  className={`px-3 py-1 text-[10px] font-semibold rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'mobius' ? 'bg-[#0071E3] text-white' : 'text-[#86868B] hover:text-[#0071E3]'
                  }`}
                >
                  智能调度规范
                </button>
                <button
                  onClick={() => handleTabChange('higspec')}
                  className={`px-3 py-1 text-[10px] font-semibold rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'higspec' ? 'bg-[#0071E3] text-white' : 'text-[#86868B] hover:text-[#0071E3]'
                  }`}
                >
                  Apple HIG 规范
                </button>
                <button
                  onClick={() => handleTabChange('custom')}
                  className={`px-3 py-1 text-[10px] font-semibold rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'custom' ? 'bg-[#0071E3] text-white' : 'text-[#86868B] hover:text-[#0071E3]'
                  }`}
                >
                  自由画布
                </button>
              </div>
            </div>

            {/* Quick editing utilities */}
            <div className="flex items-center justify-between text-xs bg-[#F5F5F7]/80 border border-[#D2D2D7]/30 rounded-xl p-3">
              <div className="flex items-center gap-1.5 text-[#86868B] font-medium">
                <FileText className="w-4 h-4 text-[#0071E3]" />
                <span>
                  共计 <strong>{markdownText.split('\n').length}</strong> 行，
                  <strong>{markdownText.length}</strong> 字符
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleReset}
                  className="px-2.5 py-1 text-[10px] font-mono font-bold bg-white text-[#0071E3] border border-[#0071E3]/20 rounded-md hover:bg-[#0071E3]/5 cursor-pointer transition-colors"
                  title="重置当前模板"
                >
                  重置
                </button>
                <button
                  onClick={handleClear}
                  className="px-2.5 py-1 text-[10px] font-mono font-bold bg-red-500/10 text-red-700 border border-red-500/20 rounded-md hover:bg-red-500/20 cursor-pointer transition-colors"
                  title="清空画布"
                >
                  清空
                </button>
              </div>
            </div>

            {/* Editor textarea */}
            <div className="flex-1 relative">
              <textarea
                value={markdownText}
                onChange={(e) => setMarkdownText(e.target.value)}
                placeholder="在此输入或粘贴标准的 Markdown 格式，右侧预览将秒级重构渲染..."
                className="w-full h-full p-4 bg-[#1D1D1F] font-mono text-xs text-zinc-100 border border-[#D2D2D7]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0071E3]/45 leading-relaxed resize-none shadow-inner"
                style={{ tabSize: 4 }}
              />
              <div className="absolute bottom-3 right-3 bg-[#2C2C2E]/90 text-zinc-400 font-mono text-[9px] px-2 py-0.5 rounded border border-zinc-800">
                UTF-8 | MARKDOWN
              </div>
            </div>
          </div>
        )}

        {/* RIGHT COLUMN: Stunning Apple HIG Styled Render Preview */}
        <div className={`bg-white border border-[#D2D2D7]/50 rounded-2xl p-6 shadow-sm h-[720px] overflow-hidden flex flex-col relative ${
          viewMode === 'full' ? 'lg:col-span-12' : 'lg:col-span-7'
        }`}>
          
          {/* Checklist interactive progress overlay */}
          {checklistStats.total > 0 && (
            <div className="mb-4 bg-[#0071E3]/5 border border-[#0071E3]/10 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <CheckSquare className="w-5 h-5 text-[#0071E3] shrink-0" />
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#86868B] uppercase block leading-none">CHECKLIST COMPLETION</span>
                  <span className="text-xs font-bold text-[#1D1D1F] mt-1.5 inline-block font-sans">
                    已核验 <strong>{checklistStats.checked}</strong> / <strong>{checklistStats.total}</strong> 项待办指令
                  </span>
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="flex items-center gap-3 w-full sm:w-48 shrink-0">
                <div className="flex-1 bg-[#F5F5F7] rounded-full h-2 overflow-hidden border border-[#D2D2D7]/30">
                  <div 
                    className="h-full bg-[#0071E3] transition-all duration-300"
                    style={{ 
                      width: `${checklistStats.percentage}%`,
                      backgroundColor: currentTheme.primary
                    }}
                  />
                </div>
                <span className="font-mono text-xs font-bold text-[#0071E3]" style={{ color: currentTheme.primary }}>
                  {checklistStats.percentage}%
                </span>
              </div>
            </div>
          )}

          {/* Inner Navigation Shell */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-6 overflow-hidden">
            
            {/* Embedded TOC Drawer (Left 3 columns on tablet/desktop) */}
            <div className="hidden md:flex md:col-span-3 flex-col justify-between border-r border-[#D2D2D7]/40 pr-4 overflow-y-auto">
              <div className="space-y-4">
                <div className="flex items-center gap-1.5 pb-2 border-b border-[#D2D2D7]/40">
                  <Menu className="w-4 h-4 text-[#0071E3]" style={{ color: currentTheme.primary }} />
                  <span className="text-[10px] font-mono font-bold text-[#86868B] uppercase tracking-widest">
                    目录 / NAVIGATION
                  </span>
                </div>

                {headings.length > 0 ? (
                  <nav className="space-y-1">
                    {headings.map((heading, idx) => (
                      <button
                        key={idx}
                        onClick={() => scrollToAnchor(heading.id)}
                        className={`w-full text-left rounded-lg text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                          heading.level === 1 
                            ? 'font-bold py-2 px-2.5 text-[#1D1D1F]' 
                            : heading.level === 2
                            ? 'font-semibold py-1.5 px-4 text-[#86868B]'
                            : 'py-1 px-6 text-[#86868B] italic'
                        } ${
                          activeAnchor === heading.id 
                            ? `${currentTheme.accentClass} font-extrabold shadow-sm` 
                            : `${currentTheme.hoverClass}`
                        }`}
                      >
                        <ChevronRight className="w-3 h-3 shrink-0 opacity-40" />
                        <span className="truncate">{heading.text}</span>
                      </button>
                    ))}
                  </nav>
                ) : (
                  <p className="text-[10px] text-[#86868B]/60 italic leading-relaxed">
                    在 Markdown 中书写 # 或 ## 标题，此处将自动抽取出侧边导轨。
                  </p>
                )}
              </div>

              {/* Dynamic bottom info */}
              <div className="pt-3 border-t border-[#D2D2D7]/40 bg-white">
                <span className="text-[9px] font-mono text-[#86868B] block uppercase tracking-wider">ACTIVE THEME</span>
                <span className="text-xs font-semibold mt-1 block" style={{ color: currentTheme.primary }}>
                  {currentTheme.name}
                </span>
              </div>
            </div>

            {/* Document Content Page (Scrollable) */}
            <div className="col-span-1 md:col-span-9 flex flex-col justify-between h-full overflow-hidden">
              
              {/* Toolbar */}
              <div className="flex items-center justify-between border-b border-[#D2D2D7]/40 pb-2 mb-3 bg-white">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[9px] font-mono text-[#86868B] uppercase tracking-wider">HIG STANDALONE PAGE</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopyMarkdown}
                    className="flex items-center gap-1 px-2.5 py-1 bg-[#F5F5F7] hover:bg-[#0071E3]/10 hover:text-[#0071E3] border border-[#D2D2D7]/40 rounded-lg text-[10px] font-semibold text-[#1D1D1F] cursor-pointer transition-colors"
                  >
                    {copiedState ? <Check className="w-3.5 h-3.5 text-emerald-600 animate-bounce" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedState ? '已复制 Markdown' : '复制 MD 源码'}</span>
                  </button>
                  <button
                    onClick={handleExportHTML}
                    className="flex items-center gap-1 px-2.5 py-1 bg-[#F5F5F7] hover:bg-[#0071E3]/10 hover:text-[#0071E3] border border-[#D2D2D7]/40 rounded-lg text-[10px] font-semibold text-[#1D1D1F] cursor-pointer transition-colors"
                  >
                    {exportedState ? <Check className="w-3.5 h-3.5 text-emerald-600 animate-bounce" /> : <Download className="w-3.5 h-3.5" />}
                    <span>{exportedState ? '下载成功' : '一键导出 HIG 网页'}</span>
                  </button>
                </div>
              </div>

              {/* Document Scroller */}
              <div 
                ref={previewContainerRef}
                className="flex-1 overflow-y-auto pr-2 pb-12 scroll-smooth"
                style={{ scrollBehavior: 'smooth' }}
              >
                <div className="prose prose-zinc max-w-none text-[#1D1D1F] select-text selection:bg-[#0071E3]/15">
                  
                  {/* Markdown Renderer */}
                  {markdownText.trim().length > 0 ? (
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      components={{
                        // H1 - Styled like a monumental Apple Page Header
                        h1: ({ children }) => {
                          const textStr = String(children || '');
                          const id = textStr.toLowerCase()
                            .replace(/[^\w\u4e00-\u9fa5\s-]/g, '')
                            .replace(/\s+/g, '-');
                          return (
                            <div id={id} className="border-b border-[#D2D2D7]/40 pb-4 mb-6 mt-2">
                              <span className="text-[10px] font-mono font-bold tracking-widest text-[#86868B] uppercase block mb-1">APPLE HIG DOCUMENT / SPEC</span>
                              <h1 className="text-2xl font-bold tracking-tight text-[#1D1D1F]">
                                {children}
                              </h1>
                            </div>
                          );
                        },

                        // H2 - Styled as a sectional header
                        h2: ({ children }) => {
                          const textStr = String(children || '');
                          const id = textStr.toLowerCase()
                            .replace(/[^\w\u4e00-\u9fa5\s-]/g, '')
                            .replace(/\s+/g, '-');
                          return (
                            <div id={id} className="group relative mt-8 mb-4 border-b border-[#D2D2D7]/30 pb-2">
                              <h2 className="text-base font-bold text-[#1D1D1F] flex items-center gap-1.5">
                                <span className="w-1 h-4 bg-[#0071E3] rounded-full inline-block transition-all group-hover:scale-110" style={{ backgroundColor: currentTheme.primary }}></span>
                                {children}
                              </h2>
                            </div>
                          );
                        },

                        // H3 - Subsections
                        h3: ({ children }) => {
                          const textStr = String(children || '');
                          const id = textStr.toLowerCase()
                            .replace(/[^\w\u4e00-\u9fa5\s-]/g, '')
                            .replace(/\s+/g, '-');
                          return (
                            <h3 id={id} className="text-xs font-bold text-[#1D1D1F] mt-6 mb-3 uppercase tracking-wider" style={{ color: currentTheme.primary }}>
                              {children}
                            </h3>
                          );
                        },

                        // Paragraphs
                        p: ({ children }) => (
                          <p className="text-xs text-[#1D1D1F]/90 leading-relaxed font-sans mb-4">
                            {children}
                          </p>
                        ),

                        // Horizonal Rule
                        hr: () => (
                          <hr className="my-6 border-t border-[#D2D2D7]/30" />
                        ),

                        // Bold
                        strong: ({ children }) => (
                          <strong className="font-bold text-[#1D1D1F]" style={{ color: currentTheme.primary }}>
                            {children}
                          </strong>
                        ),

                        // Italic
                        em: ({ children }) => (
                          <span className="italic text-[#86868B] font-serif">
                            {children}
                          </span>
                        ),

                        // List Items (intercept checklists dynamically!)
                        li: ({ children, checked, ...props }: any) => {
                          if (checked !== null && checked !== undefined) {
                            const currentIndex = checklistRenderCount++;
                            return (
                              <li className="flex items-center gap-3 py-1.5 text-xs font-semibold animate-fade-in" {...props}>
                                <input
                                  type="checkbox"
                                  checked={checked}
                                  onChange={() => toggleMarkdownCheckbox(currentIndex)}
                                  className="rounded-md border-[#D2D2D7] text-[#0071E3] focus:ring-[#0071E3] cursor-pointer w-4 h-4 transition-all"
                                  style={{ accentColor: currentTheme.primary }}
                                />
                                <span className={checked ? 'line-through text-[#86868B]/65 italic' : 'text-[#1D1D1F]'}>
                                  {children}
                                </span>
                              </li>
                            );
                          }
                          return (
                            <li className="list-disc pl-1 ml-4 py-0.5 text-xs text-[#1D1D1F]/90 font-sans" {...props}>
                              {children}
                            </li>
                          );
                        },

                        // Tables with Apple border aesthetics
                        table: ({ children }) => (
                          <div className="my-6 border border-[#D2D2D7]/50 rounded-xl overflow-hidden shadow-sm max-w-full overflow-x-auto">
                            <table className="w-full text-left text-xs border-collapse">
                              {children}
                            </table>
                          </div>
                        ),

                        thead: ({ children }) => (
                          <thead className="bg-[#F5F5F7] border-b border-[#D2D2D7]/40 font-mono text-[10px] font-bold text-[#86868B]">
                            {children}
                          </thead>
                        ),

                        tr: ({ children }) => (
                          <tr className="hover:bg-[#F5F5F7] transition-colors border-b border-[#D2D2D7]/30 last:border-none">
                            {children}
                          </tr>
                        ),

                        th: ({ children }) => (
                          <th className="px-4 py-3 font-semibold text-[#86868B] uppercase tracking-wider">
                            {children}
                          </th>
                        ),

                        td: ({ children }) => (
                          <td className="px-4 py-3 text-[#1D1D1F] leading-normal">
                            {children}
                          </td>
                        ),

                        // Custom Alert Boxes aligned with Apple guidelines
                        blockquote: ({ children }) => {
                          const extractText = (node: any): string => {
                            if (!node) return '';
                            if (typeof node === 'string') return node;
                            if (Array.isArray(node)) return node.map(extractText).join('');
                            if (node.props && node.props.children) return extractText(node.props.children);
                            return '';
                          };
                          
                          const text = extractText(children).trim();
                          
                          if (text.startsWith('[!WARNING]')) {
                            const cleanText = text.replace('[!WARNING]', '').trim();
                            return (
                              <div className="bg-[#FF9500]/5 border-l-4 border-[#FF9500] rounded-r-xl p-4 my-4 flex items-start gap-3 shadow-sm">
                                <AlertTriangle className="w-5 h-5 text-[#FF9500] shrink-0 mt-0.5" />
                                <div>
                                  <span className="text-[10px] font-bold text-[#FF9500] block font-mono uppercase tracking-wider">WARNING / 调度安全警告</span>
                                  <p className="text-xs text-[#FF9500] leading-relaxed mt-1 font-sans font-medium">{cleanText}</p>
                                </div>
                              </div>
                            );
                          }
                          
                          if (text.startsWith('[!ERROR]') || text.startsWith('[!DANGER]')) {
                            const cleanText = text.replace(/\[!(ERROR|DANGER)\]/, '').trim();
                            return (
                              <div className="bg-[#FF3B30]/5 border-l-4 border-[#FF3B30] rounded-r-xl p-4 my-4 flex items-start gap-3 shadow-sm animate-pulse">
                                <AlertCircle className="w-5 h-5 text-[#FF3B30] shrink-0 mt-0.5" />
                                <div>
                                  <span className="text-[10px] font-bold text-[#FF3B30] block font-mono uppercase tracking-wider">CRITICAL / 急停锁定警示</span>
                                  <p className="text-xs text-[#FF3B30] leading-relaxed mt-1 font-sans font-medium">{cleanText}</p>
                                </div>
                              </div>
                            );
                          }
                          
                          if (text.startsWith('[!NOTE]') || text.startsWith('[!INFO]')) {
                            const cleanText = text.replace(/\[!(NOTE|INFO)\]/, '').trim();
                            return (
                              <div className="bg-[#0071E3]/5 border-l-4 border-[#0071E3] rounded-r-xl p-4 my-4 flex items-start gap-3 shadow-sm" style={{ borderColor: currentTheme.primary }}>
                                <Info className="w-5 h-5 text-[#0071E3] shrink-0 mt-0.5" style={{ color: currentTheme.primary }} />
                                <div>
                                  <span className="text-[10px] font-bold text-[#0071E3] block font-mono uppercase tracking-wider" style={{ color: currentTheme.primary }}>NOTE / 工业设计说明</span>
                                  <p className="text-xs text-[#1D1D1F]/90 leading-relaxed mt-1 font-sans">{cleanText}</p>
                                </div>
                              </div>
                            );
                          }
                          
                          if (text.startsWith('[!SUCCESS]')) {
                            const cleanText = text.replace('[!SUCCESS]', '').trim();
                            return (
                              <div className="bg-[#34C759]/5 border-l-4 border-[#34C759] rounded-r-xl p-4 my-4 flex items-start gap-3 shadow-sm">
                                <CheckCircle2 className="w-5 h-5 text-[#34C759] shrink-0 mt-0.5" />
                                <div>
                                  <span className="text-[10px] font-bold text-[#34C759] block font-mono uppercase tracking-wider">SUCCESS / 自测校验成功</span>
                                  <p className="text-xs text-[#34C759] leading-relaxed mt-1 font-sans font-medium">{cleanText}</p>
                                </div>
                              </div>
                            );
                          }
                          
                          return (
                            <blockquote className="border-l-4 border-[#D2D2D7] pl-4 py-1.5 my-4 italic text-[#86868B] leading-relaxed font-serif text-xs bg-[#F5F5F7]/80 pr-3 rounded-r-xl">
                              {children}
                            </blockquote>
                          );
                        },

                        // Code Blocks with "Copy Snippet" button
                        code: ({ children, className }) => {
                          const lang = className ? className.replace('language-', '') : 'code';
                          const codeText = String(children).replace(/\n$/, '');
                          
                          return (
                            <div className="my-4 border border-[#D2D2D7]/50 rounded-xl overflow-hidden shadow-sm">
                              <div className="bg-zinc-900 px-4 py-2 border-b border-zinc-800 flex justify-between items-center text-[10px] font-mono text-zinc-400">
                                <span className="uppercase font-bold text-[#0071E3]" style={{ color: currentTheme.primary }}>
                                  {lang}
                                </span>
                                <button
                                  onClick={() => {
                                    navigator.clipboard.writeText(codeText);
                                  }}
                                  className="flex items-center gap-1 hover:text-white cursor-pointer transition-colors"
                                  title="复制代码段"
                                >
                                  <Copy className="w-3.5 h-3.5" /> <span>复制</span>
                                </button>
                              </div>
                              <pre className="bg-[#1D1D1F] p-4 overflow-x-auto text-xs leading-relaxed text-zinc-300 font-mono shadow-inner">
                                <code>{children}</code>
                              </pre>
                            </div>
                          );
                        }
                      }}
                    >
                      {markdownText}
                    </ReactMarkdown>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-[#86868B] space-y-3">
                      <FileCode className="w-12 h-12 stroke-1 opacity-50" />
                      <p className="text-xs italic">
                        编辑器当前为空。请在左栏输入 Markdown，此处将同步自动排版。
                      </p>
                    </div>
                  )}

                </div>
              </div>

            </div>

          </div>

          {/* Floating Action Button (FAB) toggles Full View / Split View */}
          <button
            onClick={() => setViewMode(prev => prev === 'split' ? 'full' : 'split')}
            className="absolute bottom-6 right-6 w-14 h-14 bg-[#0071E3] hover:bg-[#0071E3]/95 text-white rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer group z-30"
            style={{ backgroundColor: currentTheme.primary }}
            title={viewMode === 'split' ? '进入纯网页全屏模式' : '返回双栏编辑器模式'}
          >
            {viewMode === 'split' ? <Eye className="w-6 h-6" /> : <Edit3 className="w-6 h-6" />}
          </button>

        </div>

      </div>

    </div>
  );
}
