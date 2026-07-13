import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Palette, 
  Layers, 
  Layout, 
  Activity, 
  Accessibility, 
  Check, 
  Copy, 
  Smartphone, 
  Tablet, 
  Monitor, 
  Sliders, 
  Info, 
  HelpCircle, 
  CheckCircle2, 
  Search, 
  ChevronRight, 
  AlertCircle,
  Eye,
  SlidersHorizontal,
  Fingerprint
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';

// Helper for generating tonal palettes from a base HSL
interface Tone {
  label: string;
  lightness: number;
  hex: string;
}

const interpolateColor = (h: number, s: number, l: number): string => {
  return `hsl(${h}, ${s}%, ${l}%)`;
};

// Converts HSL to Hex (for display and copying)
const hslToHex = (h: number, s: number, l: number): string => {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
};

export default function RockAiFoundationsSection() {
  const [activeTab, setActiveTab] = useState<'overview' | 'color' | 'tokens' | 'states' | 'layout' | 'shapes' | 'accessibility'>('overview');

  // --- TAB 2: COLOR STATE ---
  const [seedHue, setSeedHue] = useState<number>(220); // Default Violet/Blue seed
  const [seedSat, setSeedSat] = useState<number>(85);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 1500);
  };

  const getTonalPalette = (h: number, s: number, sFactor: number = 1) => {
    const tones = [100, 99, 95, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0];
    return tones.map(t => {
      const lightness = t;
      // Adjust saturation slightly based on lightness for realistic palettes
      const sat = Math.min(100, Math.max(0, s * sFactor));
      const hex = hslToHex(h, sat, lightness);
      return { label: t.toString(), lightness, hex };
    });
  };

  const palettes = {
    primary: { name: 'Primary (主色)', desc: '用于高频、核心品牌元素', data: getTonalPalette(seedHue, seedSat) },
    secondary: { name: 'Secondary (辅助色)', desc: '用于较弱的装饰及次要选择芯片', data: getTonalPalette(seedHue, Math.max(10, seedSat - 50), 0.6) },
    tertiary: { name: 'Tertiary (第三色)', desc: '用于互补、警示或特殊突出的视觉平衡', data: getTonalPalette((seedHue + 60) % 360, seedSat, 0.9) },
    neutral: { name: 'Neutral (中性灰)', desc: '用于视口底色、主容器背景及文字颜色', data: getTonalPalette(seedHue, 8, 0.5) },
    neutralVariant: { name: 'Neutral Variant (中性灰变体)', desc: '用于卡片外廓、细分边框、滑块未激活轨道', data: getTonalPalette(seedHue, 16, 0.6) },
  };

  // --- TAB 3: TOKENS STATE ---
  const [tokenSearch, setTokenSearch] = useState('');
  const [selectedTokenTrace, setSelectedTokenTrace] = useState<string | null>('button-container');

  const tokenTracingData = [
    {
      id: 'button-container',
      name: 'Filled Button Container Color (填充按钮容器背景)',
      compToken: 'md.comp.filled-button.container.color',
      sysToken: 'md.sys.color.primary',
      refToken: 'md.ref.palette.primary40',
      valueHex: hslToHex(seedHue, seedSat, 40),
      useCase: '高可见性按钮的主底色，例如保存、登录、提现按钮容器。'
    },
    {
      id: 'button-label',
      name: 'Filled Button Label Text Color (填充按钮标签文本色)',
      compToken: 'md.comp.filled-button.label-text.color',
      sysToken: 'md.sys.color.on-primary',
      refToken: 'md.ref.palette.primary100',
      valueHex: hslToHex(seedHue, seedSat, 100),
      useCase: '放置在主色之上的文字、图标或标签。'
    },
    {
      id: 'card-container',
      name: 'Elevated Card Container Color (海拔卡片容器背景色)',
      compToken: 'md.comp.elevated-card.container.color',
      sysToken: 'md.sys.color.surface-container-low',
      refToken: 'md.ref.palette.neutral96',
      valueHex: hslToHex(seedHue, 8, 96),
      useCase: '需要浅层海拔高度阴影支撑的常规信息卡片容器。'
    },
    {
      id: 'switch-track',
      name: 'Switch Unselected Track Color (开关未选中轨道色)',
      compToken: 'md.comp.switch.unselected.track.color',
      sysToken: 'md.sys.color.surface-container-highest',
      refToken: 'md.ref.palette.neutral90',
      valueHex: hslToHex(seedHue, 8, 90),
      useCase: '开关在关闭（未选定）状态时其外侧轨道的底色。'
    },
    {
      id: 'error-text',
      name: 'Error Text Color (错误警示文本颜色)',
      compToken: 'md.comp.error.text.color',
      sysToken: 'md.sys.color.error',
      refToken: 'md.ref.palette.error40',
      valueHex: '#B3261E', // Standard Rock-AI Error Hue
      useCase: '文本输入框下方的错误状态提示字符，或系统级危机通知。'
    }
  ];

  // --- TAB 4: STATES STATE ---
  const [simulatedState, setSimulatedState] = useState<'hover' | 'focus' | 'pressed' | 'dragged' | 'disabled'>('hover');
  const [rippleOrigin, setRippleOrigin] = useState<{ x: number; y: number } | null>(null);
  const [isRippling, setIsRippling] = useState(false);

  const handlePressedDemo = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRippleOrigin({ x, y });
    setIsRippling(true);
    setSimulatedState('pressed');
    setTimeout(() => {
      setIsRippling(false);
    }, 600);
  };

  // --- TAB 5: LAYOUT STATE ---
  const [deviceSize, setDeviceSize] = useState<'compact' | 'medium' | 'expanded'>('compact');

  const deviceSpecs = {
    compact: { name: 'Compact (手机/窄屏)', width: '380px', breakpoint: '< 600dp', cols: 4, margin: '16px', rail: 'Bottom Nav (底部导航栏)' },
    medium: { name: 'Medium (折叠屏/平板)', width: '640px', breakpoint: '600dp - 840dp', cols: 8, margin: '24px', rail: 'Navigation Rail (导航侧条)' },
    expanded: { name: 'Expanded (桌面端/大屏)', width: '840px', breakpoint: '>= 840dp', cols: 12, margin: '24px', rail: 'Permanent Drawer (常驻抽屉)' },
  };

  // --- TAB 6: SHAPES & ELEVATION STATE ---
  const [selectedShape, setSelectedShape] = useState<string>('medium');
  const [selectedElevation, setSelectedElevation] = useState<number>(1);

  const shapeData = [
    { id: 'none', label: 'None', val: '0px', desc: '直角。用于全屏边缘、拼接列表项。' },
    { id: 'xs', label: 'Extra Small', val: '4px', desc: '微圆角。用于气泡、状态徽章。' },
    { id: 'small', label: 'Small', val: '8px', desc: '小圆角。用于文本输入框、芯片（Chips）。' },
    { id: 'medium', label: 'Medium', val: '12px', desc: '中圆角。用于主视图小卡片、菜单浮窗。' },
    { id: 'large', label: 'Large', val: '16px', desc: '大圆角。用于内容卡片、展开卡片、底部表单。' },
    { id: 'xl', label: 'Extra Large', val: '28px', desc: '特大圆角。用于对话框（Dialogs）、操作弹窗。' },
    { id: 'full', label: 'Full', val: '9999px', desc: '胶囊型/全圆角。用于高频按钮（FAB）、标签。' }
  ];

  const elevationData = [
    { level: 0, shadow: 'shadow-none', tint: 'bg-transparent', height: '0dp', usage: '平铺于背景。通常与底板无异，不使用阴影与叠加。' },
    { level: 1, shadow: 'shadow-sm', tint: 'bg-primary/5', height: '1dp', usage: '默认卡片、列表项目底板。提供微弱的空间脱离感。' },
    { level: 2, shadow: 'shadow', tint: 'bg-primary/8', height: '3dp', usage: '悬停或高亮卡片、浮动搜索栏底座。' },
    { level: 3, shadow: 'shadow-md', tint: 'bg-primary/11', height: '6dp', usage: '高海拔弹出框、核心功能对话框、上下文侧栏（Sheets）。' },
    { level: 4, shadow: 'shadow-lg', tint: 'bg-primary/12', height: '8dp', usage: '全局最高操作组件，如未折叠抽屉、常驻浮动功能大板。' },
    { level: 5, shadow: 'shadow-xl', tint: 'bg-primary/14', height: '12dp', usage: '绝对顶层悬浮，如正在拖拽中的模块、超高优先级报警面板。' }
  ];

  // --- TAB 7: ACCESSIBILITY STATE ---
  const [accFg, setAccFg] = useState('#FFFFFF');
  const [accBg, setAccBg] = useState(hslToHex(seedHue, seedSat, 40));
  const [targetInteractive, setTargetInteractive] = useState<string | null>(null);

  // Calculate Relative Luminance
  const getLuminance = (hex: string): number => {
    const cleanHex = hex.replace('#', '');
    if (cleanHex.length !== 6) return 0.5;
    const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
    const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
    const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

    const a = [r, g, b].map(v => {
      return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  const getContrastRatio = (fg: string, bg: string): number => {
    const l1 = getLuminance(fg);
    const l2 = getLuminance(bg);
    const bright = Math.max(l1, l2);
    const dark = Math.min(l1, l2);
    return Math.round(((bright + 0.05) / (dark + 0.05)) * 100) / 100;
  };

  const contrastRatio = getContrastRatio(accFg, accBg);
  const aaNormal = contrastRatio >= 4.5 ? 'PASS' : 'FAIL';
  const aaLarge = contrastRatio >= 3.0 ? 'PASS' : 'FAIL';
  const aaaNormal = contrastRatio >= 7.0 ? 'PASS' : 'FAIL';
  const aaaLarge = contrastRatio >= 4.5 ? 'PASS' : 'FAIL';

  return (
    <div className="space-y-6">
      
      {/* Header card with glass effect */}
      <div className="bg-white border border-[#D2D2D7]/50 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-[#E8E8ED] text-[#1D1D1F] px-2.5 py-1 border border-[#D2D2D7]/30 rounded-full font-mono font-bold">
              ROCK-AI DESIGN SYSTEM 8.0
            </span>
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
            <span className="text-[10px] text-emerald-600 font-mono font-bold uppercase">Rock-AI Spec Verified</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#1D1D1F] font-sans">
            Rock-AI Foundations <span className="text-[#0071E3] font-normal font-sans">设计基石系统</span>
          </h1>
          <p className="text-xs text-[#86868B] max-w-2xl leading-relaxed font-sans">
            Rock-AI 8.0 的最底层视觉核心理念、色彩动力学及自适应物理规则的完整实现。在此可以无缝查阅、交互演练并获取代码级系统令牌规范。
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="bg-[#0071E3]/5 border border-[#0071E3]/20 px-4 py-2.5 rounded-2xl flex items-center gap-3 shadow-sm">
            <SlidersHorizontal className="w-5 h-5 text-[#0071E3]" />
            <div className="flex flex-col">
              <span className="text-[9px] font-semibold text-[#86868B] leading-none tracking-wider uppercase">CORE COMPONENT</span>
              <span className="text-xs font-bold text-[#1D1D1F] mt-1 font-sans">100% Interactivity</span>
            </div>
          </div>
        </div>
      </div>

      {/* Internal Tab Navigation (macOS segmented control style) */}
      <div className="overflow-x-auto pb-1">
        <div className="inline-flex rounded-full bg-white/80 p-1 border border-[#D2D2D7]/50 shadow-sm shrink-0 min-w-full md:min-w-0">
          {[
            { id: 'overview', label: '概览 (Overview)', icon: Info },
            { id: 'color', label: '动态色彩 (Color)', icon: Palette },
            { id: 'tokens', label: '设计令牌 (Tokens)', icon: Fingerprint },
            { id: 'states', label: '状态图层 (States)', icon: Layers },
            { id: 'layout', label: '自适应网格 (Grid)', icon: Layout },
            { id: 'shapes', label: '圆角与海拔 (Shapes)', icon: Sliders },
            { id: 'accessibility', label: '无障碍标准 (A11y)', icon: Accessibility },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  isActive 
                    ? 'bg-[#0071E3] text-white shadow-sm' 
                    : 'text-[#86868B] hover:text-[#1D1D1F]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#86868B]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Area with smooth page switching */}
      <div className="min-h-[500px]">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="md:col-span-2 space-y-6">
                <Card className="border border-[#D2D2D7]/50 rounded-3xl overflow-hidden shadow-sm bg-white">
                  <CardHeader className="border-b border-[#D2D2D7]/30 pb-4">
                    <CardTitle className="text-base font-bold text-[#1D1D1F] font-sans flex items-center gap-2">
                      <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full inline-block"></span>
                      什么是 Rock-AI Design Foundations？
                    </CardTitle>
                    <CardDescription className="text-xs font-sans">
                      基石（Foundations）是指导跨平台应用如何表达 Rock-AI 系统的物理规律与感官核心。
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <p className="text-xs text-[#1D1D1F]/90 leading-relaxed font-sans">
                      Rock-AI 8.0 引领了全新的 <strong>Rock-AI Dynamic Theme</strong> 设计系统。它从底层的物理纸张、反射光源、用户个性化的偏好状态中汲取设计灵感，形成了一套坚固的逻辑自闭环机制。
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="bg-[#F5F5F7] p-4 rounded-2xl border border-[#D2D2D7]/30">
                        <h4 className="text-xs font-bold text-[#1D1D1F] mb-1 font-sans">
                          🎯 动态个性表达
                        </h4>
                        <p className="text-[11px] text-[#86868B] leading-relaxed font-sans">
                          打破千人一面的设计固化，使用 tonal palette 数学色调模型从壁纸中智能编排舒适、安全的和谐色。
                        </p>
                      </div>
                      <div className="bg-[#F5F5F7] p-4 rounded-2xl border border-[#D2D2D7]/30">
                        <h4 className="text-xs font-bold text-[#1D1D1F] mb-1 font-sans">
                          ♿️ 绝对无障碍优先
                        </h4>
                        <p className="text-[11px] text-[#86868B] leading-relaxed font-sans">
                          将 WCAG 2.1 物理对比度计算深度编入系统级色彩令牌映射，使得任何高对比或低视力群体的无障碍体验无缝自适应。
                        </p>
                      </div>
                      <div className="bg-[#F5F5F7] p-4 rounded-2xl border border-[#D2D2D7]/30">
                        <h4 className="text-xs font-bold text-[#1D1D1F] mb-1 font-sans">
                          📐 响应自适应设计
                        </h4>
                        <p className="text-[11px] text-[#86868B] leading-relaxed font-sans">
                          规定 Compact、Medium 及 Expanded 三类主屏幕尺寸级别。使用窗格化（Panes）自适应布局将大屏空间的利用率拉至极致。
                        </p>
                      </div>
                      <div className="bg-[#F5F5F7] p-4 rounded-2xl border border-[#D2D2D7]/30">
                        <h4 className="text-xs font-bold text-[#1D1D1F] mb-1 font-sans">
                          ⚡️ 状态反馈与物理隐喻
                        </h4>
                        <p className="text-[11px] text-[#86868B] leading-relaxed font-sans">
                          以多层 2D 叠加不透明度作为状态（Hover, Focus, Pressed, Dragged）层，搭配惯性涟漪，展现无与伦比的优雅顺畅感。
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Core Pillars Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white p-5 border border-[#D2D2D7]/50 rounded-2xl shadow-sm flex flex-col justify-between min-h-[140px] hover:border-[#0071E3]/50 transition-all">
                    <Palette className="w-5 h-5 text-emerald-500" />
                    <div>
                      <h4 className="text-xs font-bold text-[#1D1D1F] mt-3">Color System</h4>
                      <p className="text-[10px] text-[#86868B] mt-1 font-mono leading-relaxed">
                        HSL/HCT 数学色调模型，一键铺设 30+ 种高包容度系统色盘。
                      </p>
                    </div>
                  </div>
                  <div className="bg-white p-5 border border-[#D2D2D7]/50 rounded-2xl shadow-sm flex flex-col justify-between min-h-[140px] hover:border-[#0071E3]/50 transition-all">
                    <Fingerprint className="w-5 h-5 text-[#0071E3]" />
                    <div>
                      <h4 className="text-xs font-bold text-[#1D1D1F] mt-3">Design Tokens</h4>
                      <p className="text-[10px] text-[#86868B] mt-1 font-mono leading-relaxed">
                        Reference -&gt; System -&gt; Component 三级令牌级联。
                      </p>
                    </div>
                  </div>
                  <div className="bg-white p-5 border border-[#D2D2D7]/50 rounded-2xl shadow-sm flex flex-col justify-between min-h-[140px] hover:border-[#0071E3]/50 transition-all">
                    <Layout className="w-5 h-5 text-[#5856D6]" />
                    <div>
                      <h4 className="text-xs font-bold text-[#1D1D1F] mt-3">Adaptive layouts</h4>
                      <p className="text-[10px] text-[#86868B] mt-1 font-mono leading-relaxed">
                        自适应分栏、导航侧条及多轨动态内容窗格（Panes）自适应。
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar with specifications summary */}
              <div className="space-y-6">
                <Card className="border border-[#D2D2D7]/50 rounded-3xl shadow-sm bg-[#1D1D1F] text-white">
                  <CardHeader className="pb-3 border-b border-white/10">
                    <CardTitle className="text-xs font-semibold text-[#86868B] uppercase tracking-wider font-sans">
                      Rock-AI Foundations 规格清单
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-5 space-y-4">
                    <div className="space-y-3">
                      {[
                        { title: '无障碍对比度', desc: '文本 >= 4.5:1, 图形 >= 3:1' },
                        { title: '物理圆角等级', desc: '0px 至 28px、9999px (7大尺度)' },
                        { title: '海拔高度分级', desc: 'Level 0 至 Level 5' },
                        { title: '状态覆盖比例', desc: 'Hover 8%, Focus 12%, Dragged 16%' },
                        { title: '屏幕断点级别', desc: 'Compact (手机), Medium (平板), Expanded (电脑)' },
                        { title: '高频手势响应', desc: '双击, 划过, 弹性拖拽, 缩放' }
                      ].map((item, index) => (
                        <div key={index} className="flex justify-between items-center text-xs border-b border-white/5 pb-2 last:border-b-0 last:pb-0 font-sans">
                          <span className="text-[#86868B]">{item.title}</span>
                          <span className="font-mono font-medium text-white/95">{item.desc}</span>
                        </div>
                      ))}
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-[10px] text-[#86868B] leading-relaxed font-sans">
                      <HelpCircle className="w-3.5 h-3.5 text-[#0071E3] inline mr-1 -mt-0.5" />
                      所有数据均严格对齐 2026 最新官方 Rock-AI 设计委员会工业落地规范。
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Interactive teaser */}
                <div className="bg-gradient-to-br from-[#0071E3] to-[#5856D6] rounded-2xl p-5 text-white flex flex-col justify-between min-h-[160px] shadow-md relative overflow-hidden">
                  <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
                    <Palette className="w-48 h-48" />
                  </div>
                  <div className="space-y-1.5 z-10">
                    <span className="text-[9px] font-mono font-bold tracking-wider uppercase text-white/70 bg-white/10 px-2 py-0.5 rounded-full inline-block">Interactive Try</span>
                    <h3 className="text-base font-bold font-sans">实时演练设计令牌和动态色板</h3>
                    <p className="text-[11px] text-white/80 leading-relaxed font-sans">
                      点击下方的“动态色彩”或“设计令牌”标签，可一键调节色调种子，并观察全局物理映射。
                    </p>
                  </div>
                  <Button 
                    onClick={() => setActiveTab('color')}
                    variant="secondary"
                    className="w-full bg-white text-[#0071E3] hover:bg-white/90 text-xs font-bold rounded-xl py-2 mt-4 cursor-pointer"
                  >
                    开始色调生成
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: DYNAMIC COLOR & PALETTE */}
          {activeTab === 'color' && (
            <motion.div
              key="color"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <Card className="border border-[#D2D2D7]/50 rounded-3xl shadow-sm bg-white overflow-hidden">
                <CardHeader className="border-b border-[#D2D2D7]/30">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-base font-bold text-[#1D1D1F] font-sans flex items-center gap-2">
                        <Palette className="w-5 h-5 text-[#0071E3]" />
                        Rock-AI Tonal Palette Generator (智能色调色盘生成器)
                      </CardTitle>
                      <CardDescription className="text-xs font-sans mt-1">
                        基于 Rock-AI Dynamic Theme 的 HCT/HSL 数学算法。调节滑块选择主色种子（Seed Color），系统将动态派生 5 大核心色调带。
                      </CardDescription>
                    </div>
                    {/* Seed Color Quick Selects */}
                    <div className="flex items-center gap-1.5 shrink-0 bg-[#F5F5F7] p-1.5 rounded-full border border-[#D2D2D7]/30">
                      {[
                        { hue: 220, name: '活力蓝', color: 'bg-blue-500' },
                        { hue: 142, name: '极客绿', color: 'bg-emerald-500' },
                        { hue: 350, name: '炽热红', color: 'bg-rose-500' },
                        { hue: 25, name: '温暖橙', color: 'bg-amber-500' },
                        { hue: 280, name: '迷幻紫', color: 'bg-purple-500' },
                      ].map(item => (
                        <button
                          key={item.hue}
                          onClick={() => {
                            setSeedHue(item.hue);
                            setSeedSat(85);
                          }}
                          className={`w-5 h-5 rounded-full ${item.color} border border-white cursor-pointer hover:scale-110 transition-transform ${
                            seedHue === item.hue ? 'ring-2 ring-[#0071E3]' : ''
                          }`}
                          title={item.name}
                        />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  {/* Hue & Saturation Sliders using shadcn/ui Slider */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#F5F5F7] p-4 rounded-2xl border border-[#D2D2D7]/40">
                    <div className="space-y-2.5">
                      <div className="flex justify-between text-xs font-semibold font-sans">
                        <span className="text-[#1D1D1F]">Hue (色相种子): {seedHue}°</span>
                        <span className="text-xs font-mono text-[#86868B]">0° - 360°</span>
                      </div>
                      <Slider
                        min={0}
                        max={360}
                        value={[seedHue]}
                        onValueChange={(val) => setSeedHue(val[0])}
                        className="py-2"
                      />
                    </div>
                    <div className="space-y-2.5">
                      <div className="flex justify-between text-xs font-semibold font-sans">
                        <span className="text-[#1D1D1F]">Saturation (饱和度种子): {seedSat}%</span>
                        <span className="text-xs font-mono text-[#86868B]">10% - 100%</span>
                      </div>
                      <Slider
                        min={10}
                        max={100}
                        value={[seedSat]}
                        onValueChange={(val) => setSeedSat(val[0])}
                        className="py-2"
                      />
                    </div>
                  </div>

                  {/* Tonal Palettes Map Display */}
                  <div className="space-y-6">
                    {Object.entries(palettes).map(([key, palette]) => (
                      <div key={key} className="space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#1D1D1F] font-sans">{palette.name}</span>
                            <span className="text-[10px] text-[#86868B] font-sans">({palette.desc})</span>
                          </div>
                          <span className="text-[9px] font-mono text-[#86868B]">
                            Hue: {key === 'tertiary' ? `${(seedHue + 60) % 360}°` : `${seedHue}°`}
                          </span>
                        </div>
                        
                        {/* Tonal Band (0 to 100) */}
                        <div 
                          style={{ gridTemplateColumns: 'repeat(13, minmax(0, 1fr))' }}
                          className="grid h-14 rounded-xl overflow-hidden border border-[#D2D2D7]/30 shadow-sm"
                        >
                          {palette.data.map((tone) => {
                            const isDarkText = tone.lightness >= 50;
                            const isCopied = copiedText === `${key}-${tone.label}`;
                            return (
                              <button
                                key={tone.label}
                                onClick={() => handleCopy(tone.hex, `${key}-${tone.label}`)}
                                style={{ backgroundColor: tone.hex }}
                                className="h-full flex flex-col justify-between items-center py-2 relative group cursor-pointer hover:brightness-105 transition-all outline-none"
                              >
                                <span 
                                  className="text-[8px] font-mono font-bold leading-none"
                                  style={{ color: isDarkText ? '#1D1D1F' : '#FFFFFF' }}
                                >
                                  {tone.label}
                                </span>
                                
                                {isCopied ? (
                                  <Check className="w-3 h-3 text-emerald-500 absolute inset-0 m-auto" />
                                ) : (
                                  <span 
                                    className="text-[7px] font-mono opacity-0 group-hover:opacity-100 transition-opacity uppercase leading-none"
                                    style={{ color: isDarkText ? '#1D1D1F' : '#FFFFFF' }}
                                  >
                                    Copy
                                  </span>
                                )}

                                <span 
                                  className="text-[8px] font-mono leading-none scale-90"
                                  style={{ color: isDarkText ? '#1D1D1F' : '#FFFFFF', opacity: 0.8 }}
                                >
                                  {tone.hex}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Dynamic Color Scheme Summary Table */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border border-[#D2D2D7]/50 rounded-3xl bg-white shadow-sm p-6 space-y-4">
                  <h3 className="text-sm font-bold text-[#1D1D1F] font-sans border-b border-[#D2D2D7]/30 pb-2.5">
                    🎨 Rock-AI Dynamic Theme 色彩映射原理
                  </h3>
                  <div className="space-y-3 text-xs leading-relaxed text-[#86868B] font-sans">
                    <p>
                      Rock-AI 采用全新的 <strong>HCT 色彩空间</strong>（Hue 色相, Chroma 介度, Tone 相对亮度）。其色调（Tone）概念专门解决了物理视感对比度问题：
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-[#1D1D1F]/90">
                      <li><strong>Primary (主色):</strong> 取自 Primary Tonal Palette 的 <strong>T40</strong>（浅色模式）及 <strong>T80</strong>（深色模式）。</li>
                      <li><strong>On-Primary (主色文字):</strong> 必须取自 <strong>T100</strong> (纯白，在 T40 上) 或 <strong>T20</strong> (在 T80 上) 以满足 &gt;= 4.5:1 WCAG 对比度。</li>
                      <li><strong>Surface (表面背景色):</strong> 取自 Neutral Palette 的 <strong>T98</strong> (浅色) 或 <strong>T6</strong> (深色)。</li>
                      <li><strong>Outline (边框色):</strong> 取自 Neutral Variant 的 <strong>T50</strong>。</li>
                    </ul>
                  </div>
                </Card>

                <Card className="border border-[#D2D2D7]/50 rounded-3xl bg-[#1D1D1F] text-white shadow-sm p-6 space-y-4">
                  <h3 className="text-sm font-bold text-white font-sans border-b border-white/10 pb-2.5">
                    ⚙️ 实战：提取当前 Seed 核心值（React CSS 变量定义）
                  </h3>
                  <div className="space-y-3 font-mono text-[11px] bg-white/5 p-4 rounded-xl border border-white/10 overflow-x-auto text-[#86868B] relative">
                    <button
                      onClick={() => handleCopy(
                        `:root {\n  --md-sys-color-primary: ${hslToHex(seedHue, seedSat, 40)};\n  --md-sys-color-on-primary: ${hslToHex(seedHue, seedSat, 100)};\n  --md-sys-color-secondary: ${hslToHex(seedHue, Math.max(10, seedSat - 50), 40)};\n  --md-sys-color-surface: ${hslToHex(seedHue, 8, 98)};\n  --md-sys-color-outline: ${hslToHex(seedHue, 16, 50)};\n}`,
                        'css-root'
                      )}
                      className="absolute top-3 right-3 p-1.5 hover:bg-white/10 rounded-md text-[#86868B] hover:text-white transition-all cursor-pointer"
                      title="复制 CSS 代码"
                    >
                      {copiedText === 'css-root' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <p className="text-white">// Rock-AI CSS variables derived from seed</p>
                    <p>:root &#123;</p>
                    <p>&nbsp;&nbsp;--md-sys-color-primary: <span className="text-emerald-400">{hslToHex(seedHue, seedSat, 40)}</span>; <span className="text-white/40">// Primary 40</span></p>
                    <p>&nbsp;&nbsp;--md-sys-color-on-primary: <span className="text-emerald-400">{hslToHex(seedHue, seedSat, 100)}</span>; <span className="text-white/40">// Primary 100</span></p>
                    <p>&nbsp;&nbsp;--md-sys-color-secondary: <span className="text-emerald-400">{hslToHex(seedHue, Math.max(10, seedSat - 50), 40)}</span>; <span className="text-white/40">// Secondary 40</span></p>
                    <p>&nbsp;&nbsp;--md-sys-color-surface: <span className="text-emerald-400">{hslToHex(seedHue, 8, 98)}</span>; <span className="text-white/40">// Neutral 98</span></p>
                    <p>&nbsp;&nbsp;--md-sys-color-outline: <span className="text-emerald-400">{hslToHex(seedHue, 16, 50)}</span>; <span className="text-white/40">// Neutral Variant 50</span></p>
                    <p>&#125;</p>
                  </div>
                </Card>
              </div>
            </motion.div>
          )}

          {/* TAB 3: DESIGN TOKENS TRACING */}
          {activeTab === 'tokens' && (
            <motion.div
              key="tokens"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <Card className="border border-[#D2D2D7]/50 rounded-3xl shadow-sm bg-white overflow-hidden">
                <CardHeader className="border-b border-[#D2D2D7]/30 pb-4">
                  <CardTitle className="text-base font-bold text-[#1D1D1F] font-sans flex items-center gap-2">
                    <Fingerprint className="w-5 h-5 text-[#0071E3]" />
                    Design Tokens Tracing Engine (令牌级联追溯引擎)
                  </CardTitle>
                  <CardDescription className="text-xs font-sans">
                    Rock-AI 将视觉决策层层解耦为三级令牌结构：<strong>Reference (基准) &gt; System (系统) &gt; Component (组件)</strong>。点击下方令牌，查看其实时追溯解析链。
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    
                    {/* Left List */}
                    <div className="lg:col-span-4 space-y-2">
                      <span className="text-[10px] font-bold text-[#86868B] uppercase tracking-wider font-sans block mb-1">
                        Select Component Token
                      </span>
                      {tokenTracingData.map((tok) => (
                        <button
                          key={tok.id}
                          onClick={() => setSelectedTokenTrace(tok.id)}
                          className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs flex flex-col gap-1 cursor-pointer font-sans ${
                            selectedTokenTrace === tok.id 
                              ? 'border-[#0071E3] bg-[#0071E3]/5 shadow-sm' 
                              : 'border-[#D2D2D7]/40 hover:border-[#D2D2D7]'
                          }`}
                        >
                          <span className="font-semibold text-[#1D1D1F]">{tok.name}</span>
                          <span className="font-mono text-[9px] text-[#86868B] break-all">{tok.compToken}</span>
                        </button>
                      ))}
                    </div>

                    {/* Right Cascading Visualization */}
                    <div className="lg:col-span-8 bg-[#F5F5F7] border border-[#D2D2D7]/40 rounded-2xl p-6 flex flex-col justify-between">
                      {(() => {
                        const trace = tokenTracingData.find(t => t.id === selectedTokenTrace);
                        if (!trace) return null;
                        return (
                          <div className="space-y-6">
                            <div className="flex justify-between items-center border-b border-[#D2D2D7]/30 pb-3">
                              <span className="text-xs font-bold text-[#1D1D1F] font-sans">
                                令牌追踪解析
                              </span>
                              <span className="text-[10px] font-mono bg-white border border-[#D2D2D7]/30 px-2.5 py-1 rounded-full text-[#1D1D1F]">
                                Resolved Value: <strong className="text-[#0071E3]">{trace.valueHex}</strong>
                              </span>
                            </div>

                            {/* Flow Blocks */}
                            <div className="space-y-4">
                              {/* Tier 3: Component Token */}
                              <div className="bg-white border border-[#D2D2D7]/40 rounded-xl p-4 shadow-sm relative hover:border-[#0071E3]/30 transition-all">
                                <span className="absolute top-2.5 right-4 text-[9px] font-mono text-[#86868B] uppercase bg-[#F5F5F7] px-2 py-0.5 rounded-md border">Tier 3: Component</span>
                                <h4 className="text-[10px] font-mono text-zinc-400 font-bold">COMPONENT TOKEN</h4>
                                <p className="text-xs font-mono font-bold text-[#1D1D1F] mt-1 break-all">{trace.compToken}</p>
                                <p className="text-[11px] text-[#86868B] mt-1 font-sans">{trace.useCase}</p>
                              </div>

                              {/* Arrow down */}
                              <div className="flex justify-center -my-2.5 text-zinc-300">
                                <ChevronRight className="w-5 h-5 rotate-90" />
                              </div>

                              {/* Tier 2: System Token */}
                              <div className="bg-white border border-[#D2D2D7]/40 rounded-xl p-4 shadow-sm relative hover:border-[#0071E3]/30 transition-all">
                                <span className="absolute top-2.5 right-4 text-[9px] font-mono text-[#86868B] uppercase bg-[#F5F5F7] px-2 py-0.5 rounded-md border">Tier 2: System</span>
                                <h4 className="text-[10px] font-mono text-zinc-400 font-bold">SYSTEM TOKEN</h4>
                                <p className="text-xs font-mono font-bold text-[#0071E3] mt-1 break-all">{trace.sysToken}</p>
                                <p className="text-[11px] text-[#86868B] mt-1 font-sans">连接组件和主题决策。保证深浅色模式、无障碍对比度的核心安全转换层。</p>
                              </div>

                              {/* Arrow down */}
                              <div className="flex justify-center -my-2.5 text-zinc-300">
                                <ChevronRight className="w-5 h-5 rotate-90" />
                              </div>

                              {/* Tier 1: Reference Token */}
                              <div className="bg-white border border-[#D2D2D7]/40 rounded-xl p-4 shadow-sm relative hover:border-[#0071E3]/30 transition-all">
                                <span className="absolute top-2.5 right-4 text-[9px] font-mono text-[#86868B] uppercase bg-[#F5F5F7] px-2 py-0.5 rounded-md border">Tier 1: Reference</span>
                                <h4 className="text-[10px] font-mono text-zinc-400 font-bold">REFERENCE TOKEN</h4>
                                <p className="text-xs font-mono font-bold text-amber-600 mt-1 break-all">{trace.refToken}</p>
                                <p className="text-[11px] text-[#86868B] mt-1 font-sans">色板中的绝对物理颜色。形式为 palette + 颜色分类 + 亮度级别（0-100）。</p>
                              </div>
                            </div>

                            {/* Copy CSS token trace */}
                            <div className="flex justify-between items-center pt-3 border-t border-[#D2D2D7]/30 text-[11px]">
                              <span className="text-[#86868B] font-sans">
                                可以在开发中直接引用此 CSS 样式变量级联。
                              </span>
                              <Button
                                size="xs"
                                variant="outline"
                                className="text-xs cursor-pointer"
                                onClick={() => handleCopy(`background-color: var(--md-sys-color-primary, ${trace.valueHex});`, 'copied-css-tok')}
                              >
                                {copiedText === 'copied-css-tok' ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-emerald-500 mr-1" />
                                    已复制
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3.5 h-3.5 mr-1" />
                                    复制 CSS
                                  </>
                                )}
                              </Button>
                            </div>
                          </div>
                        );
                      })()}
                    </div>

                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* TAB 4: INTERACTION STATES & RIPPLE */}
          {activeTab === 'states' && (
            <motion.div
              key="states"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-6"
            >
              {/* Controller */}
              <Card className="md:col-span-4 border border-[#D2D2D7]/50 rounded-3xl shadow-sm bg-white p-5 space-y-4">
                <div className="border-b border-[#D2D2D7]/30 pb-3">
                  <h3 className="text-sm font-bold text-[#1D1D1F] font-sans">
                    Rock-AI 交互状态层级机制
                  </h3>
                  <p className="text-xs text-[#86868B] mt-1 font-sans">
                    状态层（State Layer）是一种半透明的叠加层，始终附带于组件之上，用于向用户示意当前交互状态。
                  </p>
                </div>

                <div className="space-y-2">
                  {[
                    { id: 'hover', label: 'Hover (悬停) - 8%', desc: '当光标覆盖组件时触发。不改变文字颜色，仅通过 8% 的前景色叠加显示极轻微的微调。' },
                    { id: 'focus', label: 'Focus (聚焦) - 12%', desc: '当通过键盘 Tab 或手势触发组件时。除了 12% 叠加层，还必须生成 1px 宽的外层对比边框线。' },
                    { id: 'pressed', label: 'Pressed (按下/涟漪) - 12%', desc: '手指或点击瞬间触发。向外放射性扩散水波纹（Ripple）动画，并在释放时逐渐消失。' },
                    { id: 'dragged', label: 'Dragged (拖动) - 16%', desc: '当用户握持并移动组件。除了 16% 高纯度叠层，组件的 Elevation 海拔需提升以展现悬浮感。' },
                    { id: 'disabled', label: 'Disabled (禁用) - 0%', desc: '组件进入不可操作状态。前景色不透明度暴跌至 38%，无状态层响应。' }
                  ].map((st) => (
                    <button
                      key={st.id}
                      onClick={() => setSimulatedState(st.id as any)}
                      className={`w-full text-left p-3 rounded-xl border text-xs font-sans transition-all flex flex-col gap-1 cursor-pointer ${
                        simulatedState === st.id 
                          ? 'border-[#0071E3] bg-[#0071E3]/5 shadow-sm' 
                          : 'border-[#D2D2D7]/30 hover:border-[#D2D2D7]'
                      }`}
                    >
                      <span className="font-bold text-[#1D1D1F]">{st.label}</span>
                      <span className="text-[10px] text-[#86868B] leading-relaxed">{st.desc}</span>
                    </button>
                  ))}
                </div>
              </Card>

              {/* Live Preview Canvas */}
              <Card className="md:col-span-8 border border-[#D2D2D7]/50 rounded-3xl shadow-sm bg-white overflow-hidden p-6 flex flex-col justify-between min-h-[460px]">
                <div>
                  <div className="flex items-center justify-between border-b border-[#D2D2D7]/30 pb-3 mb-6">
                    <span className="text-xs font-bold text-[#1D1D1F] font-sans">STATE INTERACTION CANVAS (状态交互沙盒)</span>
                    <span className="text-[10px] font-mono text-[#86868B] uppercase bg-[#F5F5F7] px-2 py-0.5 rounded border">
                      Active Sim: <strong className="text-[#0071E3]">{simulatedState.toUpperCase()}</strong>
                    </span>
                  </div>

                  {/* Simulated Button Box */}
                  <div className="h-44 bg-[#F5F5F7] border border-[#D2D2D7]/30 rounded-2xl flex items-center justify-center relative overflow-hidden">
                    
                    {/* Simulated Component Container */}
                    <button
                      onClick={handlePressedDemo}
                      disabled={simulatedState === 'disabled'}
                      className={`relative px-8 py-3.5 rounded-full text-xs font-bold font-sans tracking-wide transition-all duration-300 select-none outline-none overflow-hidden ${
                        simulatedState === 'dragged' ? 'shadow-xl -translate-y-1' : 'shadow-md'
                      } ${
                        simulatedState === 'disabled' 
                          ? 'bg-zinc-200 text-zinc-400 cursor-not-allowed border border-transparent shadow-none' 
                          : 'bg-[#0071E3] text-white cursor-pointer'
                      }`}
                    >
                      {/* State overlay simulator */}
                      {simulatedState !== 'disabled' && (
                        <span 
                          className="absolute inset-0 bg-white transition-opacity duration-300 pointer-events-none"
                          style={{
                            opacity: simulatedState === 'hover' ? 0.08 :
                                     simulatedState === 'focus' ? 0.12 :
                                     simulatedState === 'pressed' ? 0.12 :
                                     simulatedState === 'dragged' ? 0.16 : 0
                          }}
                        />
                      )}

                      {/* Ripple container */}
                      {isRippling && rippleOrigin && (
                        <span 
                          className="absolute bg-white/30 rounded-full animate-ripple pointer-events-none"
                          style={{
                            width: '200px',
                            height: '200px',
                            left: rippleOrigin.x - 100,
                            top: rippleOrigin.y - 100,
                          }}
                        />
                      )}

                      <span className="relative z-10 flex items-center gap-1.5 uppercase tracking-wider font-bold">
                        {simulatedState === 'disabled' ? 'Disabled Action' : 'Interactive Button'}
                      </span>
                    </button>

                    {/* FOCUS RING ILLUSTRATION */}
                    {simulatedState === 'focus' && (
                      <div className="absolute inset-0 pointer-events-none border-2 border-dashed border-[#0071E3]/60 rounded-2xl m-6"></div>
                    )}
                  </div>
                </div>

                {/* Specs description footer */}
                <div className="bg-[#0071E3]/5 p-4 rounded-xl border border-[#0071E3]/10 font-sans text-xs space-y-2">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#0071E3]" />
                    <strong className="text-[#1D1D1F]">Rock-AI 状态图层参数细节指标：</strong>
                  </div>
                  <p className="text-[#86868B] leading-relaxed">
                    在 HTML/CSS 中，状态层最推荐采用伪元素（如 <code className="font-mono text-[10px] bg-white border px-1 rounded">::before</code>）进行不透明度叠加，以防止影响到底色。对于 Pressed 状态，Rock-AI 建议将不透明度动画化并配合 <code className="font-mono text-[10px] bg-white border px-1 rounded">cubic-bezier(0.2, 0, 0, 1)</code> 动力学缓动实现顺畅波纹辐射。
                  </p>
                </div>
              </Card>
            </motion.div>
          )}

          {/* TAB 5: ADAPTIVE GRID & LAYOUT */}
          {activeTab === 'layout' && (
            <motion.div
              key="layout"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <Card className="border border-[#D2D2D7]/50 rounded-3xl shadow-sm bg-white overflow-hidden">
                <CardHeader className="border-b border-[#D2D2D7]/30">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-base font-bold text-[#1D1D1F] font-sans flex items-center gap-2">
                        <Layout className="w-5 h-5 text-[#0071E3]" />
                        Rock-AI Window Size Classes & Adaptive Grids (自适应网格)
                      </CardTitle>
                      <CardDescription className="text-xs font-sans">
                        Rock-AI 根据物理屏幕宽度定义了三大标准的窗口尺寸等级（Window Size Classes）。点击按钮，模拟不同设备窗口的分栏与边框演变。
                      </CardDescription>
                    </div>

                    {/* Window selector */}
                    <div className="inline-flex rounded-full bg-[#F5F5F7] p-1 border border-[#D2D2D7]/30 shrink-0 gap-1">
                      <Button
                        variant={deviceSize === 'compact' ? 'secondary' : 'ghost'}
                        size="xs"
                        onClick={() => setDeviceSize('compact')}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer ${
                          deviceSize === 'compact' ? 'bg-white shadow-sm text-[#1D1D1F]' : 'text-[#86868B] hover:text-[#1D1D1F]'
                        }`}
                      >
                        <Smartphone className="w-3.5 h-3.5 mr-1" />
                        Compact (Phone)
                      </Button>
                      <Button
                        variant={deviceSize === 'medium' ? 'secondary' : 'ghost'}
                        size="xs"
                        onClick={() => setDeviceSize('medium')}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer ${
                          deviceSize === 'medium' ? 'bg-white shadow-sm text-[#1D1D1F]' : 'text-[#86868B] hover:text-[#1D1D1F]'
                        }`}
                      >
                        <Tablet className="w-3.5 h-3.5 mr-1" />
                        Medium (Tablet)
                      </Button>
                      <Button
                        variant={deviceSize === 'expanded' ? 'secondary' : 'ghost'}
                        size="xs"
                        onClick={() => setDeviceSize('expanded')}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer ${
                          deviceSize === 'expanded' ? 'bg-white shadow-sm text-[#1D1D1F]' : 'text-[#86868B] hover:text-[#1D1D1F]'
                        }`}
                      >
                        <Monitor className="w-3.5 h-3.5 mr-1" />
                        Expanded (Desktop)
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  {/* Specifications card for simulated size */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 bg-[#F5F5F7] p-4 rounded-2xl border border-[#D2D2D7]/40 text-xs font-sans">
                    <div>
                      <span className="text-[#86868B] block mb-0.5">屏幕级别 (Class):</span>
                      <strong className="text-[#1D1D1F]">{deviceSpecs[deviceSize].name}</strong>
                    </div>
                    <div>
                      <span className="text-[#86868B] block mb-0.5">屏幕断点 (Width):</span>
                      <strong className="text-mono text-[#1D1D1F]">{deviceSpecs[deviceSize].breakpoint}</strong>
                    </div>
                    <div>
                      <span className="text-[#86868B] block mb-0.5">网格列数 (Columns):</span>
                      <strong className="text-[#1D1D1F]">{deviceSpecs[deviceSize].cols} 栏</strong>
                    </div>
                    <div>
                      <span className="text-[#86868B] block mb-0.5">外边距 (Margin):</span>
                      <strong className="text-[#1D1D1F]">{deviceSpecs[deviceSize].margin}</strong>
                    </div>
                    <div>
                      <span className="text-[#86868B] block mb-0.5">导航形式 (Nav):</span>
                      <strong className="text-[#0071E3]">{deviceSpecs[deviceSize].rail}</strong>
                    </div>
                  </div>

                  {/* Device simulator preview container */}
                  <div className="flex justify-center items-center py-6 bg-zinc-100 rounded-3xl border border-[#D2D2D7]/30 relative overflow-hidden">
                    
                    {/* Simulated screen body */}
                    <div 
                      className="bg-white border-4 border-zinc-900 rounded-2xl shadow-xl transition-all duration-500 overflow-hidden relative flex flex-col justify-between"
                      style={{ 
                        width: deviceSpecs[deviceSize].width, 
                        height: '240px' 
                      }}
                    >
                      {/* Top status bar */}
                      <div className="bg-zinc-900 h-6 px-4 flex items-center justify-between text-[8px] text-white font-mono select-none">
                        <span>10:30 AM</span>
                        <div className="flex items-center gap-1">
                          <span>5G</span>
                          <span className="w-3.5 h-1.5 bg-white rounded-xs"></span>
                        </div>
                      </div>

                      {/* Main screen section */}
                      <div className="flex-1 flex overflow-hidden">
                        
                        {/* NAVIGATION SIDEBAR RAIL (Medium & Expanded only) */}
                        {deviceSize !== 'compact' && (
                          <div className="bg-zinc-50 border-r border-zinc-200 w-12 flex flex-col items-center py-4 gap-4 shrink-0">
                            <span className="w-5 h-5 rounded-full bg-zinc-300"></span>
                            <span className="w-5 h-2 bg-zinc-200 rounded-xs"></span>
                            <span className="w-5 h-2 bg-zinc-200 rounded-xs"></span>
                          </div>
                        )}

                        {/* Page contents Grid preview */}
                        <div className="flex-1 p-3.5 flex flex-col justify-between overflow-hidden">
                          <div>
                            <span className="text-[10px] font-bold text-zinc-400 font-sans block mb-1">Rock-AI Grid Layout Preview</span>
                            
                            {/* Grid container */}
                            <div 
                              className="grid gap-2"
                              style={{ 
                                gridTemplateColumns: `repeat(${deviceSpecs[deviceSize].cols}, minmax(0, 1fr))` 
                              }}
                            >
                              {Array.from({ length: deviceSpecs[deviceSize].cols }).map((_, index) => (
                                <div 
                                  key={index} 
                                  className="h-20 bg-[#0071E3]/15 border border-[#0071E3]/25 rounded-md flex items-center justify-center font-mono text-[9px] text-[#0071E3] font-bold select-none"
                                >
                                  Col
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                      </div>

                      {/* BOTTOM NAV BAR (Compact phone only) */}
                      {deviceSize === 'compact' && (
                        <div className="bg-zinc-50 border-t border-zinc-200 h-11 flex justify-around items-center select-none text-[8px] font-mono shrink-0">
                          <span className="text-[#0071E3] font-bold">Home</span>
                          <span className="text-zinc-400">Search</span>
                          <span className="text-zinc-400">Settings</span>
                        </div>
                      )}

                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* TAB 6: SHAPES & ELEVATION */}
          {activeTab === 'shapes' && (
            <motion.div
              key="shapes"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 xl:grid-cols-12 gap-6"
            >
              {/* Left Column: Shape & Elevation Sliders */}
              <div className="xl:col-span-4 space-y-6">
                {/* Shapes selector */}
                <Card className="border border-[#D2D2D7]/50 rounded-3xl shadow-sm bg-white p-5 space-y-4">
                  <h3 className="text-sm font-bold text-[#1D1D1F] font-sans border-b border-[#D2D2D7]/30 pb-2.5 flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-[#0071E3]" />
                    Shape System (物理圆角体系)
                  </h3>
                  <div className="space-y-1.5">
                    {shapeData.map((sh) => (
                      <button
                        key={sh.id}
                        onClick={() => setSelectedShape(sh.id)}
                        className={`w-full text-left px-3 py-2 rounded-xl border text-xs font-sans transition-all flex justify-between items-center cursor-pointer ${
                          selectedShape === sh.id 
                            ? 'border-[#0071E3] bg-[#0071E3]/5 text-[#1D1D1F]' 
                            : 'border-[#D2D2D7]/30 hover:border-[#D2D2D7] text-[#86868B]'
                        }`}
                      >
                        <span className="font-bold">{sh.label}</span>
                        <span className="font-mono text-[10px] bg-white px-2 py-0.5 rounded border border-zinc-200 text-[#1D1D1F]">{sh.val}</span>
                      </button>
                    ))}
                  </div>
                </Card>

                {/* Elevation selector */}
                <Card className="border border-[#D2D2D7]/50 rounded-3xl shadow-sm bg-white p-5 space-y-4">
                  <h3 className="text-sm font-bold text-[#1D1D1F] font-sans border-b border-[#D2D2D7]/30 pb-2.5 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#0071E3]" />
                    Elevation Levels (海拔与叠加色)
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs font-semibold font-sans text-[#1D1D1F]">
                      <span>海拔等级: Level {selectedElevation}</span>
                      <span className="text-[10px] font-mono text-[#86868B]">{elevationData[selectedElevation].height}</span>
                    </div>
                    <Slider
                      min={0}
                      max={5}
                      step={1}
                      value={[selectedElevation]}
                      onValueChange={(val) => setSelectedElevation(val[0])}
                      className="py-2"
                    />
                    <div className="text-[10px] text-[#86868B] bg-[#F5F5F7] p-3 rounded-xl border border-[#D2D2D7]/40 leading-relaxed font-sans">
                      <strong>海拔映射：</strong> {elevationData[selectedElevation].usage}
                    </div>
                  </div>
                </Card>
              </div>

              {/* Right Column: Live Card Sandbox */}
              <Card className="xl:col-span-8 border border-[#D2D2D7]/50 rounded-3xl shadow-sm bg-white p-6 flex flex-col justify-between min-h-[480px]">
                <div>
                  <div className="flex justify-between items-center border-b border-[#D2D2D7]/30 pb-3 mb-6">
                    <span className="text-xs font-bold text-[#1D1D1F] font-sans">PHYSICAL MATERIAL PREVIEW (物理介质渲染预览)</span>
                    <span className="text-[10px] font-mono text-[#86868B] uppercase">Dynamic Shader</span>
                  </div>

                  <div className="h-44 bg-[#F5F5F7] border border-[#D2D2D7]/30 rounded-2xl flex items-center justify-center p-8 relative">
                    
                    {/* Rendered Physical Card with customizable round corner & elevation */}
                    <div 
                      className={`w-72 p-5 bg-white transition-all duration-500 relative flex flex-col justify-between h-32 ${elevationData[selectedElevation].shadow}`}
                      style={{ 
                        borderRadius: shapeData.find(s => s.id === selectedShape)?.val || '0px'
                      }}
                    >
                      {/* Translucent tint color overlay representing elevation tint in Rock-AI */}
                      <div 
                        className={`absolute inset-0 rounded-inherit transition-all duration-500 pointer-events-none mix-blend-multiply opacity-5 bg-blue-700`}
                        style={{
                          opacity: selectedElevation * 0.03
                        }}
                      />

                      <div className="z-10 flex justify-between items-start font-sans">
                        <div>
                          <span className="text-[9px] font-bold text-[#0071E3] uppercase tracking-wider font-mono">Rock-AI Sheet</span>
                          <h4 className="text-xs font-bold text-[#1D1D1F] mt-0.5">Rock-AI 实体组件卡片</h4>
                        </div>
                        <span className="text-[9px] bg-zinc-100 border border-zinc-200 text-[#86868B] px-1.5 py-0.5 rounded font-mono font-bold">
                          E: {elevationData[selectedElevation].height}
                        </span>
                      </div>

                      <div className="z-10 flex items-center justify-between font-sans">
                        <span className="text-[10px] text-[#86868B]">Shape: {shapeData.find(s => s.id === selectedShape)?.label}</span>
                        <span className="text-[9px] font-mono text-zinc-400">WCAG Verified</span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Specification reference */}
                <div className="bg-[#0071E3]/5 p-4 rounded-xl border border-[#0071E3]/10 text-xs space-y-2 font-sans">
                  <div className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-[#0071E3]" />
                    <strong className="text-[#1D1D1F]">Rock-AI 物理反射与叠加颜色叠加原理：</strong>
                  </div>
                  <p className="text-[#86868B] leading-relaxed">
                    在 Rock-AI 中，随着卡片海拔（Elevation）的增高，系统不仅仅使用落影阴影（Shadows），更会为其背景叠加高亮度的 <strong>Tint 表面反射色</strong>（基于 Primary 调色板），从而在深色模式下即使不依靠阴影，也能极为显著地展现出纵深层级。
                  </p>
                </div>
              </Card>
            </motion.div>
          )}

          {/* TAB 7: ACCESSIBILITY */}
          {activeTab === 'accessibility' && (
            <motion.div
              key="accessibility"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Contrast Tester */}
                <Card className="border border-[#D2D2D7]/50 rounded-3xl shadow-sm bg-white p-5 space-y-4">
                  <div className="border-b border-[#D2D2D7]/30 pb-3">
                    <h3 className="text-sm font-bold text-[#1D1D1F] font-sans flex items-center gap-2">
                      <Palette className="w-4.5 h-4.5 text-[#0071E3]" />
                      WCAG 2.1 物理对比度实时测试仪
                    </h3>
                    <p className="text-xs text-[#86868B] mt-1 font-sans">
                      输入文本前景色与底板背景色，系统采用 w3c 相对亮度标准解析对比系数。
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-[#86868B] font-sans uppercase">Foreground (文本色)</label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={accFg}
                          onChange={(e) => setAccFg(e.target.value)}
                          className="w-10 h-9 p-1 border rounded-lg cursor-pointer shrink-0"
                        />
                        <Input
                          type="text"
                          value={accFg}
                          onChange={(e) => setAccFg(e.target.value)}
                          className="font-mono text-xs text-[#1D1D1F]"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-[#86868B] font-sans uppercase">Background (底色)</label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={accBg}
                          onChange={(e) => setAccBg(e.target.value)}
                          className="w-10 h-9 p-1 border rounded-lg cursor-pointer shrink-0"
                        />
                        <Input
                          type="text"
                          value={accBg}
                          onChange={(e) => setAccBg(e.target.value)}
                          className="font-mono text-xs text-[#1D1D1F]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contrast results displays */}
                  <div className="bg-[#F5F5F7] rounded-2xl p-4 border border-[#D2D2D7]/30 space-y-3 font-sans">
                    <div className="flex justify-between items-center border-b border-zinc-200 pb-2">
                      <span className="text-xs text-[#86868B]">相对对比比率:</span>
                      <span className="text-base font-extrabold text-[#1D1D1F] font-mono">{contrastRatio} : 1</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-center text-[10px] font-bold font-sans">
                      <div className={`p-2 rounded-lg border ${aaNormal === 'PASS' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                        <span>Normal Text AA (4.5)</span>
                        <div className="text-sm mt-0.5">{aaNormal}</div>
                      </div>
                      <div className={`p-2 rounded-lg border ${aaLarge === 'PASS' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                        <span>Large Text AA (3.0)</span>
                        <div className="text-sm mt-0.5">{aaLarge}</div>
                      </div>
                      <div className={`p-2 rounded-lg border ${aaaNormal === 'PASS' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                        <span>Normal Text AAA (7.0)</span>
                        <div className="text-sm mt-0.5">{aaaNormal}</div>
                      </div>
                      <div className={`p-2 rounded-lg border ${aaaLarge === 'PASS' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                        <span>Large Text AAA (4.5)</span>
                        <div className="text-sm mt-0.5">{aaaLarge}</div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Touch Target Simulator */}
                <Card className="border border-[#D2D2D7]/50 rounded-3xl shadow-sm bg-white p-5 space-y-4">
                  <div className="border-b border-[#D2D2D7]/30 pb-3">
                    <h3 className="text-sm font-bold text-[#1D1D1F] font-sans flex items-center gap-2">
                      <Accessibility className="w-4.5 h-4.5 text-[#0071E3]" />
                      Touch Target Size Standards (点击目标尺寸)
                    </h3>
                    <p className="text-xs text-[#86868B] mt-1 font-sans">
                      Rock-AI 规定，即使小图标仅 24dp，其外侧热区点击目标必须在触控面上扩展至 <strong>48 x 48 dp</strong>。
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-6 justify-center items-center py-6 bg-[#F5F5F7] rounded-2xl border border-zinc-200">
                    
                    {/* Small uncompliant target */}
                    <div className="text-center space-y-2">
                      <span className="text-[10px] font-bold text-red-600 block font-sans">❌ 不推荐: 仅 32x32px</span>
                      <div className="relative flex items-center justify-center">
                        <button 
                          onClick={() => setTargetInteractive('32')}
                          className="w-8 h-8 rounded bg-zinc-300 hover:bg-zinc-400 transition-colors flex items-center justify-center font-mono text-[9px] font-bold text-zinc-700 cursor-pointer"
                        >
                          32
                        </button>
                        {targetInteractive === '32' && (
                          <div className="absolute top-9 text-[9px] text-zinc-500 font-sans animate-bounce">拇指极易误触!</div>
                        )}
                      </div>
                    </div>

                    {/* Rock-AI Compliant target */}
                    <div className="text-center space-y-2">
                      <span className="text-[10px] font-bold text-emerald-600 block font-sans">✅ Rock-AI 合规: 热区 48x48px</span>
                      <div className="relative flex items-center justify-center">
                        {/* Hidden outline target showing 48x48 scope */}
                        <div className="absolute w-12 h-12 border border-dashed border-[#0071E3] rounded-md animate-pulse"></div>
                        <button 
                          onClick={() => setTargetInteractive('48')}
                          className="w-12 h-12 rounded-lg bg-[#0071E3] hover:bg-[#0071E3]/95 text-white transition-colors flex items-center justify-center font-mono text-xs font-bold relative z-10 cursor-pointer shadow-sm"
                        >
                          48
                        </button>
                        {targetInteractive === '48' && (
                          <div className="absolute top-13 text-[9px] text-[#0071E3] font-sans animate-bounce">理想的拇指触控热区!</div>
                        )}
                      </div>
                    </div>

                  </div>
                </Card>

              </div>

              {/* Rock-AI Accessibility Rules summary card */}
              <Card className="border border-[#D2D2D7]/50 rounded-3xl shadow-sm bg-[#1D1D1F] text-white p-6 space-y-4">
                <h3 className="text-sm font-bold text-white font-sans border-b border-white/10 pb-2.5">
                  📚 Rock-AI 核心无障碍保障规则
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-sans text-[#86868B] leading-relaxed">
                  <div className="space-y-1.5">
                    <strong className="text-white block">1. 状态双轨聚焦 (Double-Track Focus)</strong>
                    <span>聚焦时不可仅仅依靠颜色改变。对于没有鼠标的键盘操作员，必须在元素外侧添加至少 2px 宽的焦点环或边框，确保色彩敏感度低的用户也能准确寻焦。</span>
                  </div>
                  <div className="space-y-1.5">
                    <strong className="text-white block">2. 动态类型自适应 (Dynamic Type Scaling)</strong>
                    <span>UI 应支持高达 200% 的字体缩放而不导致内容重叠。在规划容器（如卡片、输入框）高度时，避免使用固定 height 像素值，多采用 Flex 及 padding 自适应堆垒。</span>
                  </div>
                  <div className="space-y-1.5">
                    <strong className="text-white block">3. 语义辅助与播报 (Screen Reader Support)</strong>
                    <span>所有装饰性图标必须挂载 <code className="font-mono text-[10px] text-emerald-400 bg-white/5 px-1 py-0.5 rounded">aria-hidden="true"</code>，对于具有操作性的按钮若无明文标签，必须挂载 <code className="font-mono text-[10px] text-emerald-400 bg-white/5 px-1 py-0.5 rounded">aria-label</code>。</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}
