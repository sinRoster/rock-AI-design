import React, { useState } from 'react';
import { ROAK_TYPOGRAPHY, ROAK_SPACING, ROAK_LOGO_SPECS } from '../data/roakData';
import { ROCK_AI_TYPOGRAPHY, ROCK_AI_SHAPES, ROCK_AI_ELEVATION } from '../data/rockaiData';
import { Copy, Check, Eye, HelpCircle, Layers, Maximize2, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

// Import shadcn/ui components
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function BrandTokensSection() {
  const [inputText, setInputText] = useState('ROCK-AI SYSTEM V8');
  const [selectedSystem, setSelectedSystem] = useState<'roak' | 'rockai'>('roak');
  const [activeTab, setActiveTab] = useState<'typography' | 'logo' | 'spacing'>('typography');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Logo settings
  const [logoColor, setLogoColor] = useState('#0071E3'); // default Apple Blue
  const [logoBg, setLogoBg] = useState('#1D1D1F'); // default Apple Black
  const [logoSize, setLogoSize] = useState<'badge' | 'full' | 'icon'>('badge');

  // Spacing Stack Settings
  const [boxCount, setBoxCount] = useState(3);
  const [marginValue, setMarginValue] = useState(16); // px
  const [paddingValue, setPaddingValue] = useState(16); // px

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div id="brand-tokens-section" className="space-y-8 animate-fade-in">
      {/* Tab Switcher (using shadcn/ui Tabs) */}
      <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as any)} className="w-full">
        <TabsList variant="line" className="w-full border-b border-[#D2D2D7]/50 justify-start h-auto p-0 rounded-none bg-transparent gap-4">
          <TabsTrigger 
            value="typography" 
            className="px-6 py-3.5 text-sm font-semibold tracking-tight transition-all border-b-2 data-active:border-[#0071E3] data-active:text-[#0071E3] data-active:font-bold border-transparent text-[#86868B] hover:text-[#1D1D1F] cursor-pointer rounded-none bg-transparent shadow-none font-sans"
          >
            排版与字体系统
          </TabsTrigger>
          <TabsTrigger 
            value="logo" 
            className="px-6 py-3.5 text-sm font-semibold tracking-tight transition-all border-b-2 data-active:border-[#0071E3] data-active:text-[#0071E3] data-active:font-bold border-transparent text-[#86868B] hover:text-[#1D1D1F] cursor-pointer rounded-none bg-transparent shadow-none font-sans"
          >
            Logo 与徽章规范
          </TabsTrigger>
          <TabsTrigger 
            value="spacing" 
            className="px-6 py-3.5 text-sm font-semibold tracking-tight transition-all border-b-2 data-active:border-[#0071E3] data-active:text-[#0071E3] data-active:font-bold border-transparent text-[#86868B] hover:text-[#1D1D1F] cursor-pointer rounded-none bg-transparent shadow-none font-sans"
          >
            间距堆叠与面板
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* TYPOGRAPHY TAB */}
      {activeTab === 'typography' && (
        <div className="space-y-6">
          {/* Typography Header using shadcn Card and Input */}
          <Card className="bg-white border border-[#D2D2D7]/50 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-lg font-bold text-[#1D1D1F] font-sans mb-1">
                  Rock-ai 字体规格与 <span className="text-[#0071E3]">实时演练</span>
                </CardTitle>
                <CardDescription className="text-xs text-[#86868B] leading-relaxed mt-1.5 font-sans">
                  Rock-ai 以 <strong>Roboto / JetBrains Mono</strong> 为主，配合高密度字重带来紧凑的工业机械感，确保在特种作业场景下具备极高的信息可视性与阅读效率。
                </CardDescription>
              </div>
            </div>

            {/* Live Input Field using shadcn Input */}
            <div className="pt-2">
              <label className="block text-[10px] font-semibold text-[#86868B] uppercase tracking-wider mb-2 font-sans">
                实时测试文本输入 (Live Specimen Input)
              </label>
              <Input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full px-4 py-3 bg-[#F5F5F7] border border-[#D2D2D7]/50 rounded-xl text-sm text-[#1D1D1F] focus-visible:ring-[#0071E3] focus-visible:border-[#0071E3] transition-all font-mono h-12"
                placeholder="请输入用于预览测试的文本..."
              />
            </div>
          </Card>

          {/* Typography Tokens Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Rock-ai Typography List */}
            {ROAK_TYPOGRAPHY.map((token, idx) => {
              const textStyle: React.CSSProperties = {
                fontFamily: token.family.includes('Georgia') ? 'Georgia, serif' : token.family.includes('Consolas') ? 'Consolas, monospace' : '"Roboto", "Inter", sans-serif',
                fontWeight: token.weight === 'Thin' ? 100 : token.weight === 'Light' ? 300 : token.weight === 'Medium' ? 500 : token.weight === 'Bold' ? 700 : 400,
                fontSize: token.size,
                lineHeight: token.lineHeight,
                letterSpacing: token.letterSpacing || 'normal',
                textTransform: token.decoration?.includes('全大写') ? 'uppercase' : 'none',
              };

              const tailwindFontClass = token.family.includes('Consolas') ? 'font-mono' : 'font-sans';
              const cssDeclaration = `font-family: "${token.family}";\nfont-size: ${token.size};\nfont-weight: ${token.weight};\nline-height: ${token.lineHeight};${token.letterSpacing ? `\nletter-spacing: ${token.letterSpacing};` : ''}`;

              return (
                <div key={idx} className="bg-white border border-[#D2D2D7]/50 rounded-2xl p-5 shadow-sm space-y-4 flex flex-col justify-between hover:border-[#0071E3]/50 transition-all">
                  <div>
                    {/* Token Metadata */}
                    <div className="flex items-center justify-between border-b border-[#D2D2D7]/40 pb-2 mb-3">
                      <span className="text-xs font-mono font-bold text-[#0071E3]">{token.name}</span>
                      <button
                        onClick={() => handleCopy(cssDeclaration, `roak-ty-${idx}`)}
                        className="p-1 hover:bg-[#F5F5F7] rounded-md text-[#86868B] hover:text-[#1D1D1F] transition-all cursor-pointer"
                        title="复制 CSS 样式"
                      >
                        {copiedId === `roak-ty-${idx}` ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Display Text Demo */}
                    <div className="py-4 border-b border-[#D2D2D7]/30 overflow-hidden min-h-[80px] flex items-center">
                      <span style={textStyle} className={`${tailwindFontClass} text-[#1D1D1F] block break-words w-full`}>
                        {token.decoration?.includes('全大写') ? inputText.toUpperCase() : inputText}
                      </span>
                    </div>
                  </div>

                  {/* Usage Guideline */}
                  <div className="space-y-1.5 pt-2 font-sans">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-[#86868B]">Specs: {token.size} • {token.weight} • LH {token.lineHeight}</span>
                    </div>
                    <p className="text-xs text-[#1D1D1F]/90">
                      <strong>主要用途：</strong> {token.useCase}
                    </p>
                    {token.decoration && (
                      <p className="text-[10px] text-[#86868B] italic font-mono bg-[#F5F5F7] p-2 rounded-lg border border-[#D2D2D7]/40">
                        * {token.decoration}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* LOGO & BADGE TAB */}
      {activeTab === 'logo' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Logo Controller Dashboard */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-[#D2D2D7]/50 rounded-2xl p-5 shadow-sm space-y-4 font-sans">
              <h4 className="text-xs font-bold text-[#86868B] uppercase tracking-wider">
                Logo 渲染与对比度测试
              </h4>
              
              {/* Select Logo Style */}
              <div className="space-y-1.5">
                <label className="text-xs text-[#86868B] font-medium block">Logo 类型规格</label>
                <div className="grid grid-cols-3 gap-1 bg-[#F5F5F7] p-1 rounded-xl border border-[#D2D2D7]/30">
                  {(['badge', 'full', 'icon'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setLogoSize(type)}
                      className={`py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                        logoSize === type ? 'bg-white shadow-sm text-[#1D1D1F]' : 'text-[#86868B] hover:text-[#1D1D1F]'
                      }`}
                    >
                      {type === 'badge' && '齿轮徽章'}
                      {type === 'full' && '完整 Logo'}
                      {type === 'icon' && '独立图标'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Select Logo Tint */}
              <div className="space-y-1.5">
                <label className="text-xs text-[#86868B] font-medium block">Logo 授权色</label>
                <div className="grid grid-cols-4 gap-1">
                  {[
                    { hex: '#0071E3', name: '苹果蓝' },
                    { hex: '#1D1D1F', name: '深炭黑' },
                    { hex: '#FF9500', name: '橙黄警示' },
                    { hex: '#FFFFFF', name: '精白' }
                  ].map((color) => (
                    <button
                      key={color.hex}
                      onClick={() => setLogoColor(color.hex)}
                      className={`py-1 px-1 border text-[10px] font-bold rounded-xl flex flex-col items-center gap-1 cursor-pointer transition-all ${
                        logoColor === color.hex ? 'border-[#0071E3]/50 bg-[#0071E3]/10 text-[#0071E3]' : 'border-[#D2D2D7]/40 hover:bg-[#F5F5F7]'
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full border border-zinc-300 shadow-inner" style={{ backgroundColor: color.hex }}></span>
                      <span>{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Select Background for Contrast Check */}
              <div className="space-y-1.5">
                <label className="text-xs text-[#86868B] font-medium block">背景底色测试</label>
                <div className="grid grid-cols-3 gap-1 bg-[#F5F5F7] p-1 rounded-xl border border-[#D2D2D7]/30">
                  {[
                    { hex: '#1D1D1F', name: '黑色底' },
                    { hex: '#F5F5F7', name: '浅灰底' },
                    { hex: '#ffffff', name: '白背景' }
                  ].map((bg) => (
                    <button
                      key={bg.hex}
                      onClick={() => setLogoBg(bg.hex)}
                      className={`py-1 text-xs rounded-lg transition-all cursor-pointer font-medium ${
                        logoBg === bg.hex ? 'bg-[#0071E3] text-white shadow-sm' : 'text-[#86868B] hover:text-[#1D1D1F]'
                      }`}
                    >
                      {bg.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Constraints Checklist */}
            <div className="bg-[#1D1D1F] text-white rounded-2xl p-5 border border-[#D2D2D7]/30 space-y-4">
              <h4 className="text-xs font-semibold text-[#86868B] uppercase tracking-wider font-sans">
                Rock-ai LOGO 设计硬指标限制
              </h4>
              <ul className="text-xs space-y-3 font-sans text-[#86868B]">
                <li className="flex gap-2 items-start">
                  <span className="text-[#0071E3] mt-0.5">✔</span>
                  <span className="text-white/80"><strong>2:1 宽高比：</strong> 徽章（Badge）的外围结构必须满足精确的 2:1 长宽尺寸比率。</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="text-[#0071E3] mt-0.5">✔</span>
                  <span className="text-white/80"><strong>中心锚定：</strong> 指南针刻度盘必须完美居中于上半部分，下半部分承接齿轮咬合轮廓。</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="text-[#FF3B30] mt-0.5">✘</span>
                  <span className="text-white/80"><strong>禁止白色上用徽标：</strong> 绝对禁止在纯白背景上直接放置齿轮徽章（因为细节易淹没，极易造成识别困难）。</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Logo Real-Time Interactive Canvas */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-white rounded-2xl border border-[#D2D2D7]/50 p-6 min-h-[340px]">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-semibold text-[#86868B] font-sans">INTERACTIVE GRAPHIC CANVAS</span>
                {logoBg === '#ffffff' && logoColor === '#FFFFFF' ? (
                  <span className="text-xs font-semibold text-[#FF3B30] bg-[#FF3B30]/10 px-2.5 py-1 rounded-full border border-[#FF3B30]/20 animate-pulse font-sans">
                    ⚠️ 严重警告：纯白 Logo 在纯白背景中不可见！
                  </span>
                ) : logoBg === '#ffffff' && logoSize === 'badge' ? (
                  <span className="text-xs font-semibold text-[#FF9500] bg-[#FF9500]/10 px-2.5 py-1 rounded-full border border-[#FF9500]/20 font-sans">
                    ⚠️ 规范警示：禁止在白底使用齿轮徽章！
                  </span>
                ) : (
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 font-sans">
                    符合对比度要求
                  </span>
                )}
              </div>

              {/* Dynamic Logo Viewport */}
              <div
                className="w-full h-64 rounded-xl flex items-center justify-center relative overflow-hidden shadow-inner border border-[#D2D2D7]/40 transition-colors duration-300"
                style={{ backgroundColor: logoBg }}
              >
                {/* SVG Badge Construction Guides */}
                <div className="absolute inset-0 border border-dashed border-zinc-400/10 pointer-events-none grid grid-cols-6 grid-rows-6">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div key={i} className="border-[0.5px] border-zinc-400/5"></div>
                  ))}
                </div>

                {logoSize === 'badge' && (
                  <div className="relative flex flex-col items-center">
                    {/* Visual 2:1 Outer box guide */}
                    <div className="absolute -inset-4 border border-zinc-500/20 rounded pointer-events-none flex flex-col items-center">
                      <span className="text-[9px] font-mono text-[#86868B] absolute -top-4">72px</span>
                      <span className="text-[9px] font-mono text-[#86868B] absolute -left-10 top-1/2 -translate-y-1/2 rotate-90">144px (2:1 Ratio)</span>
                    </div>

                    {/* SVG Render representing the ROAK Badge */}
                    <svg width="72" height="144" viewBox="0 0 72 144" className="transition-all duration-300" fill="none">
                      {/* Upper Circle - Compass Section */}
                      <circle cx="36" cy="36" r="32" stroke={logoColor} strokeWidth="3" />
                      <line x1="36" y1="12" x2="36" y2="24" stroke={logoColor} strokeWidth="3" />
                      <line x1="36" y1="60" x2="36" y2="48" stroke={logoColor} strokeWidth="3" />
                      <line x1="12" y1="36" x2="24" y2="36" stroke={logoColor} strokeWidth="3" />
                      <line x1="60" y1="36" x2="48" y2="36" stroke={logoColor} strokeWidth="3" />
                      
                      {/* Compass needle */}
                      <polygon points="36,18 42,36 36,44 30,36" fill={logoColor} opacity="0.8" />
                      <circle cx="36" cy="36" r="4" fill={logoBg} />

                      {/* Lower Section - Gear Teeth Contour */}
                      <path d="M12,108 C12,90 60,90 60,108 L60,132 C60,136 56,140 52,140 L20,140 C16,140 12,136 12,132 Z" stroke={logoColor} strokeWidth="3" />
                      <circle cx="36" cy="116" r="16" stroke={logoColor} strokeWidth="2.5" />
                      {/* Gear ridges representation */}
                      {Array.from({ length: 8 }).map((_, angleIdx) => {
                        const angle = (angleIdx * 45 * Math.PI) / 180;
                        const x1 = 36 + Math.cos(angle) * 16;
                        const y1 = 116 + Math.sin(angle) * 16;
                        const x2 = 36 + Math.cos(angle) * 22;
                        const y2 = 116 + Math.sin(angle) * 22;
                        return (
                          <line key={angleIdx} x1={x1} y1={y1} x2={x2} y2={y2} stroke={logoColor} strokeWidth="3" />
                        );
                      })}
                    </svg>
                  </div>
                )}

                {logoSize === 'full' && (
                  <div className="flex items-center gap-4">
                    {/* Full Logo: Icon + Text */}
                    <svg width="47" height="47" viewBox="0 0 44 47" fill="none">
                      <circle cx="22" cy="23.5" r="18" stroke={logoColor} strokeWidth="3.5" />
                      <polygon points="22,12 28,26 22,32 16,26" fill={logoColor} />
                    </svg>
                    <div className="flex flex-col">
                      <span className="font-extrabold text-2xl tracking-widest font-sans" style={{ color: logoColor }}>ROCK-AI</span>
                      <span className="text-[10px] font-mono tracking-widest" style={{ color: logoColor, opacity: 0.7 }}>ROCK-AI SYSTEM</span>
                    </div>
                  </div>
                )}

                {logoSize === 'icon' && (
                  <svg width="44" height="47" viewBox="0 0 44 47" fill="none">
                    <circle cx="22" cy="23.5" r="18" stroke={logoColor} strokeWidth="3.5" />
                    <line x1="22" y1="12" x2="22" y2="35" stroke={logoColor} strokeWidth="3" />
                    <line x1="10" y1="23.5" x2="34" y2="23.5" stroke={logoColor} strokeWidth="3" />
                    <polygon points="22,15 26,23.5 22,29 18,23.5" fill={logoBg} stroke={logoColor} strokeWidth="2" />
                  </svg>
                )}
              </div>
            </div>

            <div className="bg-[#F5F5F7] p-3 rounded-xl border border-[#D2D2D7]/40 mt-4 flex items-center justify-between text-xs text-[#86868B] font-mono">
              <span>Selected Specs: {logoSize === 'badge' ? '72x144 px (Badge)' : logoSize === 'full' ? '47x105 px (Full)' : '44x47 px (Icon)'}</span>
              <Button 
                variant="ghost"
                size="xs"
                onClick={() => {
                  setLogoColor('#0071E3');
                  setLogoBg('#1D1D1F');
                  setLogoSize('badge');
                }}
                className="flex items-center gap-1 hover:text-[#0071E3] text-[#86868B] text-[11px] cursor-pointer h-7 rounded-lg"
              >
                <RefreshCw className="w-3 h-3" /> 重置画布
              </Button>
            </div>
          </div>

        </div>
      )}

      {/* SPACING TAB */}
      {activeTab === 'spacing' && (
        <div className="space-y-6">
          <Card className="bg-white border border-[#D2D2D7]/50 rounded-2xl p-6 shadow-sm space-y-4">
            <CardHeader className="p-0">
              <CardTitle className="text-lg font-bold text-[#1D1D1F] font-sans">
                "Down & Right Only" (向下向右堆叠) <span className="text-[#0071E3]">间距原理演练</span>
              </CardTitle>
              <CardDescription className="text-xs text-[#86868B] leading-relaxed mt-1.5 font-sans">
                Rock-ai 系统强制：<strong>间距（Margins 与 Paddings）一律朝下、朝右推移</strong>。这一设计法则可防止在流式、自适应布局中组件间发生间距崩塌或重叠，与 Apple HIG 弹性流布局高度相似。
              </CardDescription>
            </CardHeader>

            {/* Simulated controller using shadcn/ui Slider */}
            <CardContent className="p-0 grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 border-t border-[#D2D2D7]/40">
              <div className="space-y-3 font-sans">
                <div className="flex justify-between items-center text-xs font-semibold text-[#86868B]">
                  <span>模拟项目数量</span>
                  <span className="font-mono bg-[#F5F5F7] px-2 py-0.5 rounded text-[#0071E3]">{boxCount} 个子项</span>
                </div>
                <div className="pt-1.5">
                  <Slider
                    min={2}
                    max={6}
                    value={[boxCount]}
                    onValueChange={(val) => setBoxCount(val[0])}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="space-y-3 font-sans">
                <div className="flex justify-between items-center text-xs font-semibold text-[#86868B]">
                  <span>朝下/朝右外边距</span>
                  <span className="font-mono bg-[#F5F5F7] px-2 py-0.5 rounded text-[#0071E3]">Margin: {marginValue}px</span>
                </div>
                <div className="pt-1.5">
                  <Slider
                    min={4}
                    max={32}
                    value={[marginValue]}
                    onValueChange={(val) => setMarginValue(val[0])}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="space-y-3 font-sans">
                <div className="flex justify-between items-center text-xs font-semibold text-[#86868B]">
                  <span>面板内边距</span>
                  <span className="font-mono bg-[#F5F5F7] px-2 py-0.5 rounded text-[#0071E3]">Padding: {paddingValue}px</span>
                </div>
                <div className="pt-1.5">
                  <Slider
                    min={8}
                    max={32}
                    value={[paddingValue]}
                    onValueChange={(val) => setPaddingValue(val[0])}
                    className="w-full"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Margins Demo Container */}
            <div className="lg:col-span-8 bg-[#1D1D1F] border border-[#D2D2D7]/50 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-6 font-sans">
                  <span className="text-xs font-semibold text-white/70 uppercase">STACK VISUALIZER (ROCK-AI PRINCIPLE)</span>
                  <span className="text-[10px] bg-[#0071E3]/20 text-[#0071E3] px-2.5 py-1 border border-[#0071E3]/30 rounded-full font-mono">
                    MARGIN-BOTTOM & MARGIN-RIGHT ONLY
                  </span>
                </div>

                {/* Simulated Panel Container */}
                <div 
                  className="bg-zinc-900 border border-zinc-800 rounded-lg relative transition-all duration-300"
                  style={{ padding: `${paddingValue}px` }}
                >
                  {/* Visual Padding Indicator */}
                  <div className="absolute top-0 left-0 bg-red-500/10 border-b border-r border-red-500/30 text-[9px] font-mono text-red-400 p-1 rounded-br z-10">
                    Padding: {paddingValue}px
                  </div>

                  {/* Flow grid with custom margin bottom/right */}
                  <div className="flex flex-wrap items-start">
                    {Array.from({ length: boxCount }).map((_, index) => (
                      <div
                        key={index}
                        className="bg-zinc-800 border border-zinc-700 p-4 rounded min-w-[140px] relative transition-all duration-150"
                        style={{
                          marginBottom: `${marginValue}px`,
                          marginRight: `${marginValue}px`,
                        }}
                      >
                        {/* Box header */}
                        <div className="text-[10px] font-mono font-bold text-zinc-400 mb-1 flex items-center justify-between">
                          <span>ITEM 0{index + 1}</span>
                          <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                        </div>
                        <p className="text-xs text-zinc-500 font-mono">w-40 h-20</p>
                        <p className="text-[9px] text-zinc-600 mt-2 font-sans">
                          Push down: {marginValue}px<br />
                          Push right: {marginValue}px
                        </p>

                        {/* Visual margin bottom indicator */}
                        {marginValue > 0 && (
                          <div 
                            className="absolute left-0 right-0 bg-amber-500/20 border-t border-b border-amber-500/30 flex items-center justify-center text-[8px] font-mono text-amber-400 pointer-events-none"
                            style={{ 
                              height: `${marginValue}px`,
                              bottom: `-${marginValue}px`
                            }}
                          >
                            Margin-Bottom ({marginValue}px)
                          </div>
                        )}

                        {/* Visual margin right indicator */}
                        {marginValue > 0 && (
                          <div 
                            className="absolute top-0 bottom-0 bg-amber-500/20 border-l border-r border-amber-500/30 flex items-center justify-center text-[8px] font-mono text-amber-400 pointer-events-none"
                            style={{ 
                              width: `${marginValue}px`,
                              right: `-${marginValue}px`,
                              height: '100%'
                            }}
                          >
                            <span className="rotate-90 origin-center whitespace-nowrap">MR ({marginValue}px)</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-[11px] font-sans text-[#86868B] mt-4 leading-relaxed bg-zinc-950 p-4 rounded-xl border border-zinc-800">
                <span className="text-[#0071E3] font-bold">优势分析：</span> 
                相比于使用双向边距（如 margin: 8px 16px），仅向下向右推动的单向对齐法能够实现最稳定的元素追加。在编写数据驱动的无限网格、表格或组件拼接时，消除了上边距重叠（Collapse Margin）导致的各种恶性抖动与断裂。
              </div>
            </div>

            {/* Apple Space Scale & Shapes */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Apple Rounding Scale */}
              <div className="bg-white border border-[#D2D2D7]/50 rounded-2xl p-5 shadow-sm space-y-4 font-sans">
                <h4 className="text-xs font-bold text-[#0071E3] uppercase tracking-wider">
                  Apple HIG Squircle Rounding (圆角体系)
                </h4>
                <div className="space-y-2">
                  {[
                    { name: 'App Icon / Squircle', value: '22px', usage: '适用于 iOS/macOS 桌面图标，完美的连续曲率圆角' },
                    { name: 'Standard Dialog', value: '16px', usage: '适用于系统弹窗、功能对话框与核心内容大卡片' },
                    { name: 'Component Card', value: '12px', usage: '适用于中型控制面板、操作卡片与选项卡布局' },
                    { name: 'Pills & Segmented', value: '9999px', usage: '适用于滑动胶囊、按钮、药丸形态搜索框与状态标定' }
                  ].map((shape, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 bg-[#F5F5F7] border border-[#D2D2D7]/30 rounded-xl hover:border-[#0071E3]/30 transition-all">
                      {/* Rounding block demo */}
                      <div 
                        className="w-10 h-10 bg-[#0071E3] shrink-0 shadow-inner flex items-center justify-center text-[10px] font-mono text-white font-bold"
                        style={{ borderRadius: shape.value }}
                      >
                        iOS
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-[#1D1D1F]">{shape.name} ({shape.value})</span>
                        <span className="text-[10px] text-[#86868B] mt-0.5">{shape.usage}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Apple Depth & Shadows */}
              <div className="bg-white border border-[#D2D2D7]/50 rounded-2xl p-5 shadow-sm space-y-4 font-sans">
                <h4 className="text-xs font-bold text-[#0071E3] uppercase tracking-wider">
                  Apple Subtle Depth & Material Layering (高分散光影)
                </h4>
                <p className="text-[11px] text-[#86868B] leading-relaxed">
                  Apple HIG 摒弃了传统的沉重黑色阴影，改用<strong>极高扩散率、极低不透明度的空气光影（High Diffusion Shadow）</strong>和一到两层半透明磨砂背板（Mica / Material Material Overlay）体现物理层次。
                </p>
                <div className="space-y-1.5">
                  {[
                    { level: 'Airy Window', overlay: 'Mica Glassmorphism', shadow: 'shadow-[0_12px_40px_rgba(0,0,0,0.04)] bg-white/80 backdrop-blur-md' },
                    { level: 'Action Drawer', overlay: 'Vibrant Light Material', shadow: 'shadow-[0_8px_24px_rgba(0,0,0,0.03)] bg-white' },
                    { level: 'Dropdown Menu', overlay: 'Thick Semi-Transparent', shadow: 'shadow-[0_4px_16px_rgba(0,0,0,0.03)] bg-white/90' },
                    { level: 'Hovered Card', overlay: 'Base White', shadow: 'shadow-sm border border-[#D2D2D7]/60' }
                  ].map((el, idx) => (
                    <div 
                      key={idx} 
                      className={`p-3 border border-[#D2D2D7]/30 rounded-xl flex items-center justify-between text-xs hover:scale-[1.01] transition-all ${el.shadow}`}
                    >
                      <span className="font-semibold text-[#1D1D1F]">{el.level}</span>
                      <span className="text-[10px] font-mono text-[#0071E3] bg-[#0071E3]/5 px-2.5 py-1 rounded-full border border-[#0071E3]/10">
                        {el.overlay}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
