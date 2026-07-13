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
  mobius: `# MOBIUS V8.0 智能调度中心系统规范

> [!NOTE]
> **通知：** 本指南是由 MOBIUS 设计委员会审定的 V8.0 核心工业规范。所有符合该系统的终端应用，均须严格对齐 Material 3 空间与触控标准，同时遵循 ROAK 极简 2D 正交理念。

---

## 1. 核心工业准则与安全

自动驾驶车辆本质上是重型工业机器，其安全系数必须由高对比度的界面视觉完全锚定。

> [!WARNING]
> **安全警示：** 自动驾驶作业车辆在特定操作状态下存在物理碰撞危险。界面必须确保所有报警源始终处于最优先层级，严禁任何形式的视觉遮挡。

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
// 核心安全锁定脚本 (MOBIUS Secure Lock)
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
> ———— *MOBIUS 自动驾驶系统总设计师*`,

  m3spec: `# Material Design 3 (M3) 动态设计系统

M3 是 Google 最新的视觉设计语言。它通过 **Material You** 个人化机制，重新定义了人机界面的美学、层级与自适应交互。

---

## 1. 核心设计特质

M3 拥有以下四大核心设计系统特质：

- **动态色彩 (Dynamic Color):** 提取壁纸的主色，并采用数学算法自动推导 30 多种色盘，确保在任何背景下均具备 WCAG 无障碍对比度。
- **特大圆角 (Expressive Shapes):** 卡片默认采用 12dp 圆角，而控制面板、浮动弹窗和对话框采用高达 28dp 的圆角。
- **状态图层 (State Layers):** 悬停、聚焦、按下均使用 8% 至 12% 的纯色半透明遮罩覆盖，提供真实的物理微动反馈。
- **触控优化 (Touch & Reach):** 按钮和选项卡的目标点击区域保持在至少 48dp 见方，让触手可及更为流畅。

---

## 2. 预设圆角规范对照

| M3 圆角级别 | 圆角像素值 (CSS px) | 典型应用组件 |
| :--- | :--- | :--- |
| **None (直角)** | 0px | 屏幕边缘拼贴、无缝列表、传统表格格单元 |
| **Extra Small** | 4px | 顶部标签徽章 (Badges)、微型输入框标记 |
| **Small** | 8px | 标准文本框 (TextField)、多选框、过滤标签 |
| **Medium** | 12px | 标准信息卡片 (Cards)、下拉菜单选择器 |
| **Large** | 16px | 侧边栏/底边栏、中型对话框卡片 |
| **Extra Large** | 28px | **调度面板核心卡片、浮动对话框、全局弹窗** |
| **Full (全圆角)** | 9999px | 全局浮动功能按钮 (FAB)、各种药丸型状态芯片 |

---

## 3. M3 动态色彩状态核验表

- [x] 配置 M3 Primary 核心品牌主色 (#6750A4)
- [x] 计算 On-Primary 高对比文字底色 (#FFFFFF)
- [ ] 挂载 Dynamic Color 提取器 (自动适配壁纸色彩)
- [ ] 实现 M3 Standard State Layers 的 8% 悬停高亮和 12% 点击涟漪波纹

---

## 4. 自定义色彩令牌 (Dynamic Theme Token)

\`\`\`css
/* M3 动态色彩图层分配代码 */
:root {
  --md-sys-color-primary: #6750a4;
  --md-sys-color-on-primary: #ffffff;
  --md-sys-color-primary-container: #eaddff;
  --md-sys-color-surface: #fef7ff;
  --md-sys-color-on-surface: #1d1b20;
  --md-sys-color-outline: #79747e;
}
\`\`\`

---

## 5. Google 核心信条

> "设计不只是产品看起来和感觉起来的样子。设计是它如何工作的样子。"
> ———— *M3 体验委员会*`,

  custom: `# 我的 Markdown 自由书写文档

在此输入或粘贴你自己的 Markdown 文档内容，系统会立刻将它解析成漂亮的 Material 3 (M3) 工业网站风格！

---

## 1. 快速测试

你可以在这里自由进行测试：

- [ ] 这是一个未勾选的 M3 任务
- [x] 这是一个已勾选的 M3 任务

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
console.log("Material 3 网站渲染器启动成功！");
\`\`\`
`
};

// Available Color Themes
const THEMES = [
  {
    id: 'purple',
    name: '深紫罗兰 (M3 Default)',
    primary: '#6750A4',
    bg: '#FEF7FF',
    onSurface: '#1D1B20',
    mutedSurface: '#F3EDF7',
    secondaryContainer: '#E8DEF8',
    lightPurple: '#EADDFF',
    accentClass: 'text-[#6750A4] bg-[#EADDFF]',
    hoverClass: 'hover:bg-[#6750A4]/10 hover:text-[#6750A4]',
    activeBtn: 'bg-[#6750A4] hover:bg-[#533c8c] text-white',
    outlineBorder: 'border-[#6750A4]/25 focus:border-[#6750A4] focus:ring-[#6750A4]/20'
  },
  {
    id: 'emerald',
    name: '工业翠绿 (ROAK Safety)',
    primary: '#059669',
    bg: '#f0fdf4',
    onSurface: '#064e3b',
    mutedSurface: '#ecfdf5',
    secondaryContainer: '#d1fae5',
    lightPurple: '#a7f3d0',
    accentClass: 'text-[#059669] bg-[#d1fae5]',
    hoverClass: 'hover:bg-[#059669]/10 hover:text-[#059669]',
    activeBtn: 'bg-[#059669] hover:bg-[#047857] text-white',
    outlineBorder: 'border-[#059669]/25 focus:border-[#059669] focus:ring-[#059669]/20'
  },
  {
    id: 'amber',
    name: '琥珀香槟 (High Contrast)',
    primary: '#d97706',
    bg: '#fffbeb',
    onSurface: '#451a03',
    mutedSurface: '#fef3c7',
    secondaryContainer: '#fde68a',
    lightPurple: '#fcd34d',
    accentClass: 'text-[#d97706] bg-[#fef3c7]',
    hoverClass: 'hover:bg-[#d97706]/10 hover:text-[#d97706]',
    activeBtn: 'bg-[#d97706] hover:bg-[#b45309] text-white',
    outlineBorder: 'border-[#d97706]/25 focus:border-[#d97706] focus:ring-[#d97706]/20'
  },
  {
    id: 'ocean',
    name: '深蓝冰川 (Ocean Tech)',
    primary: '#0284c7',
    bg: '#f0f9ff',
    onSurface: '#0c4a6e',
    mutedSurface: '#e0f2fe',
    secondaryContainer: '#bae6fd',
    lightPurple: '#7dd3fc',
    accentClass: 'text-[#0284c7] bg-[#e0f2fe]',
    hoverClass: 'hover:bg-[#0284c7]/10 hover:text-[#0284c7]',
    activeBtn: 'bg-[#0284c7] hover:bg-[#0369a1] text-white',
    outlineBorder: 'border-[#0284c7]/25 focus:border-[#0284c7] focus:ring-[#0284c7]/20'
  }
];

export default function MarkdownWorkspace() {
  const [activeTab, setActiveTab] = useState<'mobius' | 'm3spec' | 'custom'>('mobius');
  const [markdownText, setMarkdownText] = useState<string>(TEMPLATES.mobius);
  const [themeId, setThemeId] = useState<string>('purple');
  const [viewMode, setViewMode] = useState<'split' | 'full'>('split');
  const [copiedState, setCopiedState] = useState(false);
  const [exportedState, setExportedState] = useState(false);
  const [activeAnchor, setActiveAnchor] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const previewContainerRef = useRef<HTMLDivElement>(null);

  const currentTheme = THEMES.find(t => t.id === themeId) || THEMES[0];

  // Sync template text when template tab changes
  const handleTabChange = (tab: 'mobius' | 'm3spec' | 'custom') => {
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
      --font-sans: "Plus Jakarta Sans", "Inter", sans-serif;
      --font-serif: "Playfair Display", Georgia, serif;
      --font-mono: "Consolas", monospace;
      --color-m3-primary: ${currentTheme.primary};
      --color-m3-surface: ${currentTheme.bg};
      --color-m3-on-surface: ${currentTheme.onSurface};
      --color-m3-muted-surface: ${currentTheme.mutedSurface};
      --color-m3-secondary-container: ${currentTheme.secondaryContainer};
      --color-m3-light-purple: ${currentTheme.lightPurple};
    `;

    const htmlTemplate = `<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Material 3 Generated Website</title>
    <script src="https://unpkg.com/@tailwindcss/browser@4"></script>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,900;1,900&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
      :root {
        ${styleVariables}
      }
      body {
        background-color: var(--color-m3-surface);
        color: var(--color-m3-on-surface);
        font-family: var(--font-sans);
      }
    </style>
</head>
<body class="p-4 md:p-12 min-h-screen">
    <div class="max-w-4xl mx-auto bg-white border border-gray-100 rounded-[28px] p-6 md:p-12 shadow-lg">
      <div class="flex items-center gap-2 text-xs font-mono mb-4 text-gray-500 uppercase tracking-widest">
        <span>Published Document</span>
        <span>/</span>
        <span style="color: var(--color-m3-primary)" class="font-bold">M3 RENDERER V1.0</span>
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
    a.download = `m3-website-${activeTab}.html`;
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
    <div className="space-y-6 animate-fade-in" id="m3-markdown-workspace">
      
      {/* Top Controller Bar */}
      <div className="bg-white border border-m3-outline/15 rounded-[28px] p-6 shadow-[0_4px_16px_rgba(103,80,164,0.03)] flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-m3-primary inline-block"></span>
            <span className="text-[10px] font-mono font-bold text-m3-primary uppercase tracking-widest">MD-to-M3 WEBSITE RENDERER</span>
          </div>
          <h3 className="text-xl font-bold text-m3-on-surface font-serif">
            Markdown 到 <span className="italic text-m3-primary font-serif">Material 3 网页渲染器</span>
          </h3>
          <p className="text-xs text-m3-outline leading-relaxed font-sans max-w-xl">
            提供真正的 Markdown 极速排版预览，在后台自动将标准的层级标题、警告提示框、技术表格和待办列表转换成极其精致的 Material 3 页面。
          </p>
        </div>

        {/* View Mode & Theme switches */}
        <div className="flex flex-wrap gap-3 w-full md:w-auto shrink-0">
          
          {/* Accent Theme Selection */}
          <div className="flex items-center gap-1.5 bg-m3-muted-surface p-1 border border-m3-outline/10 rounded-xl">
            <span className="text-[9px] font-mono font-bold text-m3-outline px-2">配色:</span>
            {THEMES.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setThemeId(theme.id)}
                className={`w-6 h-6 rounded-full cursor-pointer transition-transform relative ${
                  themeId === theme.id ? 'scale-110 ring-2 ring-offset-2 ring-m3-primary' : 'hover:scale-105'
                }`}
                style={{ backgroundColor: theme.primary }}
                title={theme.name}
              />
            ))}
          </div>

          {/* Editor Switcher */}
          <div className="flex bg-m3-muted-surface p-1 border border-m3-outline/10 rounded-xl">
            <button
              onClick={() => setViewMode('split')}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                viewMode === 'split' 
                  ? 'bg-white shadow-[0_2px_8px_rgba(103,80,164,0.08)] text-m3-on-surface font-bold' 
                  : 'text-m3-outline hover:text-m3-primary'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" /> 双栏编辑
            </button>
            <button
              onClick={() => setViewMode('full')}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                viewMode === 'full' 
                  ? 'bg-white shadow-[0_2px_8px_rgba(103,80,164,0.08)] text-m3-on-surface font-bold' 
                  : 'text-m3-outline hover:text-m3-primary'
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
          <div className="lg:col-span-5 bg-white border border-m3-outline/15 rounded-[28px] p-6 shadow-[0_4px_16px_rgba(103,80,164,0.02)] flex flex-col space-y-4 h-[720px]">
            
            {/* Header tab choose */}
            <div className="flex items-center justify-between border-b border-m3-outline/10 pb-3">
              <span className="text-[10px] font-mono font-bold text-m3-outline uppercase tracking-wider">MARKDOWN WORKSPACE</span>
              <div className="flex bg-m3-muted-surface p-1 rounded-xl gap-1">
                <button
                  onClick={() => handleTabChange('mobius')}
                  className={`px-3 py-1 text-[10px] font-mono font-bold rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'mobius' ? 'bg-m3-primary text-white' : 'text-m3-outline hover:text-m3-primary'
                  }`}
                >
                  智能调度规范
                </button>
                <button
                  onClick={() => handleTabChange('m3spec')}
                  className={`px-3 py-1 text-[10px] font-mono font-bold rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'm3spec' ? 'bg-m3-primary text-white' : 'text-m3-outline hover:text-m3-primary'
                  }`}
                >
                  M3 设计定义
                </button>
                <button
                  onClick={() => handleTabChange('custom')}
                  className={`px-3 py-1 text-[10px] font-mono font-bold rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'custom' ? 'bg-m3-primary text-white' : 'text-m3-outline hover:text-m3-primary'
                  }`}
                >
                  自由画布
                </button>
              </div>
            </div>

            {/* Quick editing utilities */}
            <div className="flex items-center justify-between text-xs bg-m3-muted-surface/50 border border-m3-outline/10 rounded-xl p-3">
              <div className="flex items-center gap-1.5 text-m3-outline font-medium">
                <FileText className="w-4 h-4 text-m3-primary" />
                <span>
                  共计 <strong>{markdownText.split('\n').length}</strong> 行，
                  <strong>{markdownText.length}</strong> 字符
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleReset}
                  className="px-2.5 py-1 text-[10px] font-mono font-bold bg-white text-m3-primary border border-m3-primary/20 rounded-md hover:bg-m3-primary/5 cursor-pointer transition-colors"
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
                className="w-full h-full p-4 bg-zinc-950 font-mono text-xs text-zinc-100 border border-m3-outline/15 rounded-2xl focus:outline-none focus:ring-2 focus:ring-m3-primary/45 leading-relaxed resize-none shadow-inner"
                style={{ tabSize: 4 }}
              />
              <div className="absolute bottom-3 right-3 bg-zinc-900/90 text-zinc-400 font-mono text-[9px] px-2 py-0.5 rounded border border-zinc-800">
                UTF-8 | MARKDOWN
              </div>
            </div>
          </div>
        )}

        {/* RIGHT COLUMN: Stunning Material 3 Styled Render Preview */}
        <div className={`bg-white border border-m3-outline/15 rounded-[28px] p-6 shadow-[0_4px_16px_rgba(103,80,164,0.03)] h-[720px] overflow-hidden flex flex-col relative ${
          viewMode === 'full' ? 'lg:col-span-12' : 'lg:col-span-7'
        }`}>
          
          {/* Checklist interactive progress overlay */}
          {checklistStats.total > 0 && (
            <div className="mb-4 bg-m3-primary/5 border border-m3-primary/10 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <CheckSquare className="w-5 h-5 text-m3-primary shrink-0" />
                <div>
                  <span className="text-[10px] font-mono font-bold text-m3-outline uppercase block leading-none">CHECKLIST COMPLETION</span>
                  <span className="text-xs font-bold text-m3-on-surface mt-1.5 inline-block font-sans">
                    已核验 <strong>{checklistStats.checked}</strong> / <strong>{checklistStats.total}</strong> 项待办指令
                  </span>
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="flex items-center gap-3 w-full sm:w-48 shrink-0">
                <div className="flex-1 bg-m3-muted-surface rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full bg-m3-primary transition-all duration-300"
                    style={{ 
                      width: `${checklistStats.percentage}%`,
                      backgroundColor: currentTheme.primary
                    }}
                  />
                </div>
                <span className="font-mono text-xs font-bold text-m3-primary" style={{ color: currentTheme.primary }}>
                  {checklistStats.percentage}%
                </span>
              </div>
            </div>
          )}

          {/* Inner Navigation Shell */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-6 overflow-hidden">
            
            {/* Embedded TOC Drawer (Left 3 columns on tablet/desktop) */}
            <div className="hidden md:flex md:col-span-3 flex-col justify-between border-r border-m3-outline/10 pr-4 overflow-y-auto">
              <div className="space-y-4">
                <div className="flex items-center gap-1.5 pb-2 border-b border-m3-outline/10">
                  <Menu className="w-4 h-4 text-m3-primary" style={{ color: currentTheme.primary }} />
                  <span className="text-[10px] font-mono font-bold text-m3-outline uppercase tracking-widest">
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
                            ? 'font-bold py-2 px-2.5' 
                            : heading.level === 2
                            ? 'font-semibold py-1.5 px-4 text-m3-outline/90'
                            : 'py-1 px-6 text-m3-outline/70 italic'
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
                  <p className="text-[10px] text-m3-outline/60 italic leading-relaxed">
                    在 Markdown 中书写 # 或 ## 标题，此处将自动抽取出侧边导轨。
                  </p>
                )}
              </div>

              {/* Dynamic bottom info */}
              <div className="pt-3 border-t border-m3-outline/10 bg-white">
                <span className="text-[9px] font-mono text-m3-outline block uppercase tracking-wider">ACTIVE THEME</span>
                <span className="text-xs font-serif font-extrabold italic mt-1 block" style={{ color: currentTheme.primary }}>
                  {currentTheme.name}
                </span>
              </div>
            </div>

            {/* Document Content Page (Scrollable) */}
            <div className="col-span-1 md:col-span-9 flex flex-col justify-between h-full overflow-hidden">
              
              {/* Toolbar */}
              <div className="flex items-center justify-between border-b border-m3-outline/10 pb-2 mb-3 bg-white">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[9px] font-mono text-m3-outline uppercase tracking-wider">M3 STANDALONE PAGE</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopyMarkdown}
                    className="flex items-center gap-1 px-2.5 py-1 bg-m3-muted-surface hover:bg-m3-light-purple hover:text-m3-primary border border-m3-outline/10 rounded-lg text-[10px] font-bold text-m3-on-surface cursor-pointer transition-colors"
                  >
                    {copiedState ? <Check className="w-3.5 h-3.5 text-emerald-600 animate-bounce" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedState ? '已复制 Markdown' : '复制 MD 源码'}</span>
                  </button>
                  <button
                    onClick={handleExportHTML}
                    className="flex items-center gap-1 px-2.5 py-1 bg-m3-muted-surface hover:bg-m3-light-purple hover:text-m3-primary border border-m3-outline/10 rounded-lg text-[10px] font-bold text-m3-on-surface cursor-pointer transition-colors"
                  >
                    {exportedState ? <Check className="w-3.5 h-3.5 text-emerald-600 animate-bounce" /> : <Download className="w-3.5 h-3.5" />}
                    <span>{exportedState ? '下载成功' : '一键导出 M3 网页'}</span>
                  </button>
                </div>
              </div>

              {/* Document Scroller */}
              <div 
                ref={previewContainerRef}
                className="flex-1 overflow-y-auto pr-2 pb-12 scroll-smooth"
                style={{ scrollBehavior: 'smooth' }}
              >
                <div className="prose prose-zinc max-w-none text-m3-on-surface select-text selection:bg-m3-light-purple">
                  
                  {/* Markdown Renderer */}
                  {markdownText.trim().length > 0 ? (
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      components={{
                        // H1 - Styled like a monumental Material 3 page banner
                        h1: ({ children }) => {
                          const textStr = String(children || '');
                          const id = textStr.toLowerCase()
                            .replace(/[^\w\u4e00-\u9fa5\s-]/g, '')
                            .replace(/\s+/g, '-');
                          return (
                            <div id={id} className="border-b-4 border-m3-outline/10 pb-4 mb-6 mt-2">
                              <span className="text-[10px] font-mono font-extrabold tracking-widest text-m3-outline uppercase block mb-1">M3 DOCUMENT / TITLE</span>
                              <h1 className="text-3xl font-extrabold tracking-tight font-serif text-m3-on-surface">
                                {children}
                              </h1>
                            </div>
                          );
                        },

                        // H2 - Styled as a sectional serif header with custom underline
                        h2: ({ children }) => {
                          const textStr = String(children || '');
                          const id = textStr.toLowerCase()
                            .replace(/[^\w\u4e00-\u9fa5\s-]/g, '')
                            .replace(/\s+/g, '-');
                          return (
                            <div id={id} className="group relative mt-8 mb-4 border-b border-m3-outline/10 pb-2">
                              <h2 className="text-lg font-bold font-serif text-m3-on-surface flex items-center gap-1">
                                <span className="w-1.5 h-5 bg-m3-primary rounded-full inline-block transition-all group-hover:scale-110" style={{ backgroundColor: currentTheme.primary }}></span>
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
                            <h3 id={id} className="text-sm font-bold font-sans text-m3-on-surface mt-6 mb-3 uppercase tracking-wider" style={{ color: currentTheme.primary }}>
                              {children}
                            </h3>
                          );
                        },

                        // Paragraphs
                        p: ({ children }) => (
                          <p className="text-xs text-m3-on-surface/85 leading-relaxed font-sans mb-4">
                            {children}
                          </p>
                        ),

                        // Horizonal Rule
                        hr: () => (
                          <hr className="my-6 border-t border-m3-outline/10" />
                        ),

                        // Bold
                        strong: ({ children }) => (
                          <strong className="font-bold text-m3-on-surface" style={{ color: currentTheme.primary }}>
                            {children}
                          </strong>
                        ),

                        // Italic
                        em: ({ children }) => (
                          <span className="italic text-m3-outline font-serif">
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
                                  className="rounded-lg border-m3-outline text-m3-primary focus:ring-m3-primary cursor-pointer w-4.5 h-4.5 transition-all"
                                  style={{ accentColor: currentTheme.primary }}
                                />
                                <span className={checked ? 'line-through text-m3-outline/65 italic' : 'text-m3-on-surface'}>
                                  {children}
                                </span>
                              </li>
                            );
                          }
                          return (
                            <li className="list-disc pl-1 ml-4 py-0.5 text-xs text-m3-on-surface/85 font-sans" {...props}>
                              {children}
                            </li>
                          );
                        },

                        // Tables with M3 border aesthetics
                        table: ({ children }) => (
                          <div className="my-6 border border-m3-outline/15 rounded-2xl overflow-hidden shadow-sm max-w-full overflow-x-auto">
                            <table className="w-full text-left text-xs border-collapse">
                              {children}
                            </table>
                          </div>
                        ),

                        thead: ({ children }) => (
                          <thead className="bg-m3-muted-surface border-b border-m3-outline/15 font-mono text-[10px] font-bold text-m3-outline">
                            {children}
                          </thead>
                        ),

                        tr: ({ children }) => (
                          <tr className="hover:bg-m3-primary/5 transition-colors border-b border-m3-outline/5 last:border-none">
                            {children}
                          </tr>
                        ),

                        th: ({ children }) => (
                          <th className="px-4 py-3 font-semibold text-m3-outline uppercase tracking-wider">
                            {children}
                          </th>
                        ),

                        td: ({ children }) => (
                          <td className="px-4 py-3 text-m3-on-surface leading-normal">
                            {children}
                          </td>
                        ),

                        // Georgia Italic Blockquotes & Custom Alert Boxes
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
                              <div className="bg-amber-500/5 border-l-4 border-amber-500 rounded-r-2xl p-4 my-4 flex items-start gap-3 shadow-sm">
                                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                                <div>
                                  <span className="text-[10px] font-bold text-amber-600 block font-mono uppercase tracking-wider">WARNING / 调度安全警告</span>
                                  <p className="text-xs text-amber-800 leading-relaxed mt-1 font-sans font-medium">{cleanText}</p>
                                </div>
                              </div>
                            );
                          }
                          
                          if (text.startsWith('[!ERROR]') || text.startsWith('[!DANGER]')) {
                            const cleanText = text.replace(/\[!(ERROR|DANGER)\]/, '').trim();
                            return (
                              <div className="bg-red-500/5 border-l-4 border-red-500 rounded-r-2xl p-4 my-4 flex items-start gap-3 shadow-sm animate-pulse">
                                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                <div>
                                  <span className="text-[10px] font-bold text-red-600 block font-mono uppercase tracking-wider">CRITICAL / 急停锁定警示</span>
                                  <p className="text-xs text-red-800 leading-relaxed mt-1 font-sans font-medium">{cleanText}</p>
                                </div>
                              </div>
                            );
                          }
                          
                          if (text.startsWith('[!NOTE]') || text.startsWith('[!INFO]')) {
                            const cleanText = text.replace(/\[!(NOTE|INFO)\]/, '').trim();
                            return (
                              <div className="bg-m3-primary/5 border-l-4 border-m3-primary rounded-r-2xl p-4 my-4 flex items-start gap-3 shadow-sm" style={{ borderColor: currentTheme.primary }}>
                                <Info className="w-5 h-5 text-m3-primary shrink-0 mt-0.5" style={{ color: currentTheme.primary }} />
                                <div>
                                  <span className="text-[10px] font-bold text-m3-primary block font-mono uppercase tracking-wider" style={{ color: currentTheme.primary }}>NOTE / 工业设计说明</span>
                                  <p className="text-xs text-m3-on-surface/85 leading-relaxed mt-1 font-sans">{cleanText}</p>
                                </div>
                              </div>
                            );
                          }
                          
                          if (text.startsWith('[!SUCCESS]')) {
                            const cleanText = text.replace('[!SUCCESS]', '').trim();
                            return (
                              <div className="bg-emerald-500/5 border-l-4 border-emerald-500 rounded-r-2xl p-4 my-4 flex items-start gap-3 shadow-sm">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                <div>
                                  <span className="text-[10px] font-bold text-emerald-600 block font-mono uppercase tracking-wider">SUCCESS / 自测校验成功</span>
                                  <p className="text-xs text-emerald-800 leading-relaxed mt-1 font-sans font-medium">{cleanText}</p>
                                </div>
                              </div>
                            );
                          }
                          
                          return (
                            <blockquote className="border-l-4 border-m3-outline/20 pl-4 py-1.5 my-4 italic text-m3-outline leading-relaxed font-serif text-xs bg-m3-muted-surface/30 pr-3 rounded-r-xl">
                              {children}
                            </blockquote>
                          );
                        },

                        // Code Blocks with "Copy Snippet" button
                        code: ({ children, className }) => {
                          const lang = className ? className.replace('language-', '') : 'code';
                          const codeText = String(children).replace(/\n$/, '');
                          
                          return (
                            <div className="my-4 border border-m3-outline/10 rounded-2xl overflow-hidden shadow-sm">
                              <div className="bg-zinc-900 px-4 py-2 border-b border-zinc-800 flex justify-between items-center text-[10px] font-mono text-zinc-400">
                                <span className="uppercase font-bold text-m3-primary" style={{ color: currentTheme.primary }}>
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
                              <pre className="bg-[#0e0c12] p-4 overflow-x-auto text-xs leading-relaxed text-zinc-300 font-mono shadow-inner">
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
                    <div className="flex flex-col items-center justify-center py-20 text-m3-outline space-y-3">
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

          {/* Floating Action Button (FAB) toggles Full View / Split View - Classic M3 component */}
          <button
            onClick={() => setViewMode(prev => prev === 'split' ? 'full' : 'split')}
            className="absolute bottom-6 right-6 w-14 h-14 bg-m3-primary hover:bg-[#533c8c] text-white rounded-[20px] shadow-[0_8px_24px_rgba(103,80,164,0.3)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer group z-30"
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
