import React, { useState } from 'react';
import { ROAK_TYPOGRAPHY, ROAK_SPACING, ROAK_LOGO_SPECS } from '../data/roakData';
import { M3_TYPOGRAPHY, M3_SHAPES, M3_ELEVATION } from '../data/m3Data';
import { Copy, Check, Eye, HelpCircle, Layers, Maximize2, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

export default function BrandTokensSection() {
  const [inputText, setInputText] = useState('ROCK-AI MOBIUS SYSTEM V8');
  const [selectedSystem, setSelectedSystem] = useState<'roak' | 'm3'>('roak');
  const [activeTab, setActiveTab] = useState<'typography' | 'logo' | 'spacing'>('typography');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Logo settings
  const [logoColor, setLogoColor] = useState('#2563EB'); // default blue
  const [logoBg, setLogoBg] = useState('#09090b'); // default dark bg
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
      {/* Tab Switcher */}
      <div className="flex border-b border-m3-outline/20">
        {(['typography', 'logo', 'spacing'] as const).map((tab) => (
          <button
            key={tab}
            id={`token-tab-${tab}`}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-4 text-sm font-semibold tracking-tight transition-all duration-150 border-b-2 -mb-px cursor-pointer ${
              activeTab === tab
                ? 'border-m3-primary text-m3-primary font-bold font-serif italic'
                : 'border-transparent text-m3-outline hover:text-m3-on-surface'
            }`}
          >
            {tab === 'typography' && '排版与字体系统'}
            {tab === 'logo' && 'Logo 与徽章规范'}
            {tab === 'spacing' && '间距堆叠与面板'}
          </button>
        ))}
      </div>

      {/* TYPOGRAPHY TAB */}
      {activeTab === 'typography' && (
        <div className="space-y-6">
          {/* Typography Header */}
          <div className="bg-white border border-m3-outline/15 rounded-[28px] p-6 shadow-[0_4px_16px_rgba(103,80,164,0.03)] space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-m3-on-surface font-serif">
                  双系统字体规格对比与 <span className="italic text-m3-primary font-serif">实时演练</span>
                </h3>
                <p className="text-xs text-m3-outline mt-1.5 leading-relaxed">
                  ROAK-AI 以 <strong>Roboto</strong> 为主字体，配合 <strong>Roboto Condensed</strong> 带来强硬、紧凑的工业机械感；M3 采用 <strong>Inter/Roboto</strong> 作为通用字体，注重动态弹性与阅读流畅性。
                </p>
              </div>
              
              {/* System selector */}
              <div className="inline-flex rounded-2xl bg-m3-muted-surface p-1 border border-m3-outline/20 shrink-0">
                <button
                  onClick={() => setSelectedSystem('roak')}
                  className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedSystem === 'roak' ? 'bg-white shadow-[0_2px_8px_rgba(103,80,164,0.08)] text-m3-on-surface' : 'text-m3-outline hover:text-m3-on-surface'
                  }`}
                >
                  ROAK-AI 工业栈
                </button>
                <button
                  onClick={() => setSelectedSystem('m3')}
                  className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedSystem === 'm3' ? 'bg-white shadow-[0_2px_8px_rgba(103,80,164,0.08)] text-m3-on-surface' : 'text-m3-outline hover:text-m3-on-surface'
                  }`}
                >
                  Material 3 消费栈
                </button>
              </div>
            </div>

            {/* Live Input Field */}
            <div className="pt-2">
              <label className="block text-[10px] font-mono font-bold text-m3-outline uppercase tracking-widest mb-2">
                实时测试文本输入 (TYPE HERE)
              </label>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full px-4 py-3 bg-m3-muted-surface border border-m3-outline/20 rounded-2xl text-sm text-m3-on-surface focus:outline-none focus:ring-2 focus:ring-m3-primary focus:bg-white transition-all font-mono"
                placeholder="请输入用于预览测试的文本..."
              />
            </div>
          </div>

          {/* Typography Tokens Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {selectedSystem === 'roak' ? (
              // ROAK Typography List
              ROAK_TYPOGRAPHY.map((token, idx) => {
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
                  <div key={idx} className="bg-white border border-m3-outline/15 rounded-[24px] p-5 shadow-[0_2px_12px_rgba(103,80,164,0.02)] space-y-4 flex flex-col justify-between hover:border-m3-primary/30 transition-all">
                    <div>
                      {/* Token Metadata */}
                      <div className="flex items-center justify-between border-b border-m3-outline/10 pb-2 mb-3">
                        <span className="text-xs font-mono font-bold text-m3-primary">{token.name}</span>
                        <button
                          onClick={() => handleCopy(cssDeclaration, `roak-ty-${idx}`)}
                          className="p-1 hover:bg-m3-secondary-container/50 rounded-lg text-m3-outline hover:text-m3-on-surface transition-all"
                          title="复制 CSS 样式"
                        >
                          {copiedId === `roak-ty-${idx}` ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>

                      {/* Display Text Demo */}
                      <div className="py-4 border-b border-m3-outline/10 overflow-hidden min-h-[80px] flex items-center">
                        <span style={textStyle} className={`${tailwindFontClass} text-m3-on-surface block break-words w-full`}>
                          {token.decoration?.includes('全大写') ? inputText.toUpperCase() : inputText}
                        </span>
                      </div>
                    </div>

                    {/* Usage Guideline */}
                    <div className="space-y-1.5 pt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-m3-outline">Specs: {token.size} • {token.weight} • LH {token.lineHeight}</span>
                      </div>
                      <p className="text-xs text-m3-on-surface/85 font-sans">
                        <strong>主要用途：</strong> {token.useCase}
                      </p>
                      {token.decoration && (
                        <p className="text-[10px] text-m3-outline italic font-mono bg-m3-muted-surface/55 p-2 rounded-xl border border-m3-outline/10">
                          * {token.decoration}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              // M3 Typography List
              M3_TYPOGRAPHY.map((token, idx) => {
                const textStyle: React.CSSProperties = {
                  fontFamily: '"Inter", "Roboto", sans-serif',
                  fontWeight: token.weight === 'Medium' ? 500 : 400,
                  fontSize: token.size,
                  lineHeight: token.lineHeight,
                  letterSpacing: token.letterSpacing || 'normal',
                };

                const cssDeclaration = `font-family: "Inter", sans-serif;\nfont-size: ${token.size};\nfont-weight: ${token.weight === 'Medium' ? 500 : 400};\nline-height: ${token.lineHeight};${token.letterSpacing ? `\nletter-spacing: ${token.letterSpacing};` : ''}`;

                return (
                  <div key={idx} className="bg-white border border-m3-outline/15 rounded-[24px] p-5 shadow-[0_2px_12px_rgba(103,80,164,0.02)] space-y-4 flex flex-col justify-between hover:border-m3-primary/30 transition-all">
                    <div>
                      {/* Token Metadata */}
                      <div className="flex items-center justify-between border-b border-m3-outline/10 pb-2 mb-3">
                        <span className="text-xs font-mono font-bold text-m3-primary">{token.name}</span>
                        <button
                          onClick={() => handleCopy(cssDeclaration, `m3-ty-${idx}`)}
                          className="p-1 hover:bg-m3-secondary-container/50 rounded-lg text-m3-outline hover:text-m3-on-surface transition-all"
                          title="复制 CSS 样式"
                        >
                          {copiedId === `m3-ty-${idx}` ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>

                      {/* Display Text Demo */}
                      <div className="py-4 border-b border-m3-outline/10 overflow-hidden min-h-[80px] flex items-center">
                        <span style={textStyle} className="font-sans text-m3-on-surface block break-words w-full">
                          {inputText}
                        </span>
                      </div>
                    </div>

                    {/* Usage Guideline */}
                    <div className="space-y-1.5 pt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-m3-outline">Specs: {token.size} • {token.weight} • LH {token.lineHeight}</span>
                      </div>
                      <p className="text-xs text-m3-on-surface/85 font-sans">
                        <strong>建议用途：</strong> {token.useCase}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* LOGO & BADGE TAB */}
      {activeTab === 'logo' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Logo Controller Dashboard */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-m3-outline/15 rounded-[28px] p-5 shadow-[0_4px_16px_rgba(103,80,164,0.03)] space-y-4">
              <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">
                Logo 渲染与对比度测试
              </h4>
              
              {/* Select Logo Style */}
              <div className="space-y-1.5">
                <label className="text-xs text-m3-outline font-medium block">Logo 类型规格</label>
                <div className="grid grid-cols-3 gap-1 bg-m3-muted-surface p-1 rounded-xl border border-m3-outline/10">
                  {(['badge', 'full', 'icon'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setLogoSize(type)}
                      className={`py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                        logoSize === type ? 'bg-white shadow-[0_2px_8px_rgba(103,80,164,0.08)] text-m3-on-surface' : 'text-m3-outline hover:text-m3-on-surface'
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
                <label className="text-xs text-m3-outline font-medium block">Logo 授权色</label>
                <div className="grid grid-cols-4 gap-1">
                  {[
                    { hex: '#2563EB', name: '经典蓝' },
                    { hex: '#1E3A8A', name: '藏青蓝' },
                    { hex: '#000000', name: '全黑' },
                    { hex: '#FFFFFF', name: '纯白' }
                  ].map((color) => (
                    <button
                      key={color.hex}
                      onClick={() => setLogoColor(color.hex)}
                      className={`py-1 px-1 border text-[10px] font-bold rounded-xl flex flex-col items-center gap-1 cursor-pointer transition-all ${
                        logoColor === color.hex ? 'border-m3-primary/50 bg-m3-primary/10 text-m3-primary' : 'border-m3-outline/20 hover:bg-m3-muted-surface'
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full border border-zinc-300" style={{ backgroundColor: color.hex }}></span>
                      <span>{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Select Background for Contrast Check */}
              <div className="space-y-1.5">
                <label className="text-xs text-m3-outline font-medium block">背景底色测试</label>
                <div className="grid grid-cols-3 gap-1 bg-m3-muted-surface p-1 rounded-xl border border-m3-outline/10">
                  {[
                    { hex: '#09090b', name: '深色底' },
                    { hex: '#f4f4f5', name: '浅灰底' },
                    { hex: '#ffffff', name: '白背景' }
                  ].map((bg) => (
                    <button
                      key={bg.hex}
                      onClick={() => setLogoBg(bg.hex)}
                      className={`py-1 text-xs rounded-lg transition-all cursor-pointer ${
                        logoBg === bg.hex ? 'bg-m3-primary text-white shadow-sm' : 'text-m3-outline hover:text-m3-on-surface'
                      }`}
                    >
                      {bg.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Constraints Checklist */}
            <div className="bg-zinc-900 text-zinc-200 rounded-[28px] p-5 border border-zinc-800 space-y-4">
              <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">
                ROAK-AI LOGO 设计硬指标限制
              </h4>
              <ul className="text-xs space-y-3 font-sans text-zinc-400">
                <li className="flex gap-2 items-start">
                  <span className="text-blue-500 mt-0.5">✔</span>
                  <span><strong>2:1 宽高比：</strong> 徽章（Badge）的外围结构必须满足精确的 2:1 长宽尺寸比率。</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="text-blue-500 mt-0.5">✔</span>
                  <span><strong>中心锚定：</strong> 指南针刻度盘必须完美居中于上半部分，下半部分承接齿轮咬合轮廓。</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="text-red-500 mt-0.5">✘</span>
                  <span><strong>禁止白色上用徽标：</strong> 绝对禁止在纯白背景上直接放置齿轮徽章（因为细节易淹没，极易造成低反差导致识别困难）。</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Logo Real-Time Interactive Canvas */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-m3-muted-surface/40 rounded-[28px] border border-m3-outline/15 p-6 min-h-[340px]">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-mono font-bold text-zinc-400">INTERACTIVE GRAPHIC CANVAS</span>
                {logoBg === '#ffffff' && logoColor === '#FFFFFF' ? (
                  <span className="text-xs font-mono text-red-500 font-bold bg-red-100 px-2 py-0.5 rounded border border-red-300 animate-pulse">
                    ⚠️ 严重警告：纯白 Logo 在纯白背景中不可见！
                  </span>
                ) : logoBg === '#ffffff' && logoSize === 'badge' ? (
                  <span className="text-xs font-mono text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    ⚠️ 规范警示：禁止在白底使用齿轮徽章！
                  </span>
                ) : (
                  <span className="text-xs font-mono text-emerald-500 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    符合对比度要求
                  </span>
                )}
              </div>

              {/* Dynamic Logo Viewport */}
              <div
                className="w-full h-64 rounded-lg flex items-center justify-center relative overflow-hidden shadow-inner border border-zinc-300 transition-colors duration-300"
                style={{ backgroundColor: logoBg }}
              >
                {/* SVG Badge Construction Guides */}
                <div className="absolute inset-0 border border-dashed border-zinc-400/20 pointer-events-none grid grid-cols-6 grid-rows-6">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div key={i} className="border-[0.5px] border-zinc-400/5"></div>
                  ))}
                </div>

                {logoSize === 'badge' && (
                  <div className="relative flex flex-col items-center">
                    {/* Visual 2:1 Outer box guide */}
                    <div className="absolute -inset-4 border border-zinc-500/20 rounded pointer-events-none flex flex-col items-center">
                      <span className="text-[9px] font-mono text-zinc-500 absolute -top-4">72px</span>
                      <span className="text-[9px] font-mono text-zinc-500 absolute -left-10 top-1/2 -translate-y-1/2 rotate-90">144px (2:1 Ratio)</span>
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
                      <span className="font-extrabold text-2xl tracking-widest" style={{ color: logoColor }}>MOBIUS</span>
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

            <div className="bg-m3-muted-surface p-3 rounded-xl border border-m3-outline/10 mt-4 flex items-center justify-between text-xs text-m3-outline font-mono">
              <span>Selected Specs: {logoSize === 'badge' ? '72x144 px (Badge)' : logoSize === 'full' ? '47x105 px (Full)' : '44x47 px (Icon)'}</span>
              <button 
                onClick={() => {
                  setLogoColor('#2563EB');
                  setLogoBg('#09090b');
                  setLogoSize('badge');
                }}
                className="flex items-center gap-1 hover:text-m3-primary text-m3-outline text-[11px] cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" /> 重置画布
              </button>
            </div>
          </div>

        </div>
      )}

      {/* SPACING TAB */}
      {activeTab === 'spacing' && (
        <div className="space-y-6">
          <div className="bg-white border border-m3-outline/15 rounded-[28px] p-6 shadow-[0_4px_16px_rgba(103,80,164,0.03)] space-y-4">
            <h3 className="text-lg font-bold text-m3-on-surface font-serif">
              "Down & Right Only" (向下向右堆叠) <span className="italic text-m3-primary font-serif">间距原理演练</span>
            </h3>
            <p className="text-xs text-m3-outline leading-relaxed mt-1.5">
              ROAK-AI 系统强制：<strong>间距（Margins 与 Paddings）一律朝下、朝右推移</strong>。这一设计法则可防止在流式、自适应布局中组件间发生间距崩塌或重叠，特别适合大规模列表和动态面板堆积。
            </p>

            {/* Simulated controller */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-3 border-t border-m3-outline/10">
              <div className="space-y-1.5">
                <label className="text-xs text-m3-outline font-medium block">
                  模拟项目数量 ({boxCount} 个子项)
                </label>
                <input
                  type="range"
                  min="2"
                  max="6"
                  value={boxCount}
                  onChange={(e) => setBoxCount(Number(e.target.value))}
                  className="w-full accent-m3-primary cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-m3-outline font-medium block">
                  朝下/朝右外边距 (Margin: {marginValue}px)
                </label>
                <input
                  type="range"
                  min="4"
                  max="32"
                  value={marginValue}
                  onChange={(e) => setMarginValue(Number(e.target.value))}
                  className="w-full accent-m3-primary cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-m3-outline font-medium block">
                  面板内边距 (Padding: {paddingValue}px)
                </label>
                <input
                  type="range"
                  min="8"
                  max="32"
                  value={paddingValue}
                  onChange={(e) => setPaddingValue(Number(e.target.value))}
                  className="w-full accent-m3-primary cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Margins Demo Container */}
            <div className="lg:col-span-8 bg-[#131118] border border-m3-outline/25 rounded-[28px] p-6 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-mono font-bold text-m3-outline">STACK VISUALIZER (MOBIUS PRINCIPLE)</span>
                  <span className="text-[10px] bg-m3-primary/10 text-m3-primary px-2.5 py-1 border border-m3-primary/25 rounded-xl font-mono">
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

              <div className="text-[11px] font-mono text-zinc-400 mt-4 leading-relaxed bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800">
                <span className="text-m3-primary font-bold">优势分析：</span> 
                相比于使用双向边距（如 margin: 8px 16px），仅向下向右推动的单向对齐法能够实现最稳定的元素追加。在编写数据驱动的无限网格、表格或组件拼接时，消除了上边距重叠（Collapse Margin）导致的各种恶性抖动与断裂。
              </div>
            </div>

            {/* M3 Space Scale & Shapes */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* M3 Rounding Scale */}
              <div className="bg-white border border-m3-outline/15 rounded-[28px] p-5 shadow-[0_4px_16px_rgba(103,80,164,0.03)] space-y-4">
                <h4 className="text-xs font-mono font-bold text-m3-primary uppercase tracking-widest">
                  Material 3 Shapes (圆角体系)
                </h4>
                <div className="space-y-2">
                  {M3_SHAPES.slice(1).map((shape, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 bg-m3-muted-surface border border-m3-outline/10 rounded-xl hover:border-m3-primary/30 transition-all">
                      {/* Rounding block demo */}
                      <div 
                        className="w-10 h-10 bg-m3-primary shrink-0 shadow-inner flex items-center justify-center text-[10px] font-mono text-white font-bold"
                        style={{ borderRadius: shape.value }}
                      >
                        M3
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-m3-on-surface">{shape.name} ({shape.value})</span>
                        <span className="text-[10px] text-m3-outline mt-0.5">{shape.usage}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* M3 Elevations */}
              <div className="bg-white border border-m3-outline/15 rounded-[28px] p-5 shadow-[0_4px_16px_rgba(103,80,164,0.03)] space-y-4">
                <h4 className="text-xs font-mono font-bold text-m3-primary uppercase tracking-widest">
                  Material 3 Tonal Elevation (高度色阶)
                </h4>
                <p className="text-[11px] text-m3-outline leading-relaxed">
                  M3 摒弃了传统的沉重黑色阴影，改用<strong>彩色半透明叠加层（Tonal Overlay）</strong>和轻盈影子体现深度。高度（Level 0-5）越高，色彩中叠加的 Primary 比例越大。
                </p>
                <div className="space-y-1.5">
                  {M3_ELEVATION.slice(0, 4).map((el, idx) => (
                    <div 
                      key={idx} 
                      className={`p-3 bg-white border border-m3-outline/10 rounded-xl flex items-center justify-between text-xs hover:scale-[1.01] transition-transform ${el.shadow}`}
                    >
                      <span className="font-semibold text-m3-on-surface">Level {el.level}</span>
                      <span className="text-[10px] font-mono text-m3-primary bg-m3-primary/10 px-2.5 py-1 rounded-xl border border-m3-primary/20">
                        Overlay: {el.overlay}
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
