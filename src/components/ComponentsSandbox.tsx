import React, { useState, useRef } from 'react';
import { Copy, Check, MousePointerClick, RefreshCw, Smartphone, Eye, Sparkles, Shield, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function ComponentsSandbox() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // Interactive Button State Tracker
  const [buttonState, setButtonState] = useState<'rest' | 'hover' | 'pressed' | 'focused'>('rest');
  
  // On-Demand Text Input State
  const [cardTitle, setCardTitle] = useState('矿区 04 号自动卡车');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState(cardTitle);
  const titleInputRef = useRef<HTMLInputElement>(null);

  // M3 Inputs State
  const [m3InputValue, setM3InputValue] = useState('');
  const [m3InputFocused, setM3InputFocused] = useState(false);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleTitleSubmit = () => {
    if (tempTitle.trim()) {
      setCardTitle(tempTitle);
    } else {
      setTempTitle(cardTitle);
    }
    setIsEditingTitle(false);
  };

  const startEditingTitle = () => {
    setTempTitle(cardTitle);
    setIsEditingTitle(true);
    setTimeout(() => {
      titleInputRef.current?.focus();
      titleInputRef.current?.select();
    }, 50);
  };

  return (
    <div id="components-sandbox" className="space-y-8 animate-fade-in">
      
      {/* SECTION 1: BUTTONS STATE ENGINE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Interactive Button Console */}
        <div className="lg:col-span-7 bg-white border border-m3-outline/15 rounded-[28px] p-6 shadow-[0_4px_16px_rgba(103,80,164,0.03)] flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-m3-outline/10 pb-3">
              <div>
                <h3 className="text-base font-bold text-m3-on-surface font-serif">按钮物理交互与 <span className="italic text-m3-primary font-serif">状态对比</span></h3>
                <p className="text-xs text-m3-outline mt-1 font-sans">测试不同设计系统下状态层的视觉演绎</p>
              </div>
              <span className="text-[10px] bg-m3-primary/10 text-m3-primary border border-m3-primary/20 px-2.5 py-1 rounded-xl font-mono font-bold uppercase">
                STATE DETECTOR: {buttonState.toUpperCase()}
              </span>
            </div>

            {/* Sandbox Playground */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 border-b border-m3-outline/10">
              
              {/* ROAK-AI Button Box */}
              <div className="bg-[#131118] rounded-2xl p-5 border border-m3-outline/20 space-y-4 flex flex-col justify-between min-h-[190px]">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-mono font-bold text-m3-outline">ROCK-AI BUTTON (MOBIUS)</span>
                    <span className="w-2 h-2 bg-m3-primary rounded-full"></span>
                  </div>
                  
                  {/* Interactive ROAK Button */}
                  <button
                    id="roak-interactive-btn"
                    onMouseEnter={() => setButtonState('hover')}
                    onMouseLeave={() => setButtonState('rest')}
                    onMouseDown={() => setButtonState('pressed')}
                    onMouseUp={() => setButtonState('hover')}
                    onFocus={() => setButtonState('focused')}
                    onBlur={() => setButtonState('rest')}
                    className="w-full py-3 px-4 rounded border transition-all duration-150 text-xs font-mono font-bold flex items-center justify-center gap-2 cursor-pointer
                      bg-[#1a1820] text-zinc-100 border-zinc-700 hover:bg-m3-primary hover:text-white hover:border-m3-primary hover:shadow-md hover:shadow-purple-950/40 hover:scale-[1.01]
                      active:bg-[#4f378b] active:scale-[0.98]
                      focus:ring-2 focus:ring-m3-primary focus:ring-offset-2 focus:ring-offset-[#131118] focus:outline-none"
                  >
                    <Shield className="w-4 h-4 shrink-0" />
                    <span>EXECUTE VEHICLE EMERGENCY STOP</span>
                  </button>
                </div>

                <div className="text-[10px] font-mono text-m3-outline leading-normal border-t border-m3-outline/10 pt-2">
                  <strong>ROAK 规范：</strong> 1px 机械边框，大面积点击盒模型，重压时尺寸微缩 (scale: 0.98)。
                </div>
              </div>

              {/* M3 Buttons Box */}
              <div className="bg-m3-primary/5 rounded-[24px] p-5 border border-m3-outline/10 space-y-4 flex flex-col justify-between min-h-[190px]">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-mono font-bold text-m3-primary">MATERIAL 3 BUTTONS</span>
                    <span className="w-2 h-2 bg-m3-primary rounded-full"></span>
                  </div>

                  {/* Interactive M3 Filled Button */}
                  <div className="space-y-2">
                    <button
                      id="m3-filled-btn"
                      onMouseEnter={() => setButtonState('hover')}
                      onMouseLeave={() => setButtonState('rest')}
                      onMouseDown={() => setButtonState('pressed')}
                      onMouseUp={() => setButtonState('hover')}
                      onFocus={() => setButtonState('focused')}
                      onBlur={() => setButtonState('rest')}
                      className="w-full py-2.5 px-5 bg-m3-primary hover:bg-[#533c8c] text-white rounded-full text-xs font-semibold tracking-wide shadow-sm hover:shadow-md transition-all cursor-pointer relative overflow-hidden"
                    >
                      {/* State overlay simulator */}
                      <span className="absolute inset-0 bg-white opacity-0 hover:opacity-[0.08] active:opacity-[0.12] transition-opacity"></span>
                      Filled Tonal Action
                    </button>

                    {/* Elevated Button */}
                    <button
                      id="m3-elevated-btn"
                      className="w-full py-2 px-5 bg-white border border-m3-outline/15 text-m3-primary rounded-full text-xs font-semibold shadow-[0_2px_8px_rgba(103,80,164,0.06)] hover:shadow-md hover:bg-m3-primary/5 transition-all cursor-pointer"
                    >
                      Elevated Button
                    </button>
                  </div>
                </div>

                <div className="text-[10px] font-mono text-m3-outline leading-normal border-t border-m3-outline/10 pt-2">
                  <strong>M3 规范：</strong> 采用全圆角胶囊（Rounded Full），内置状态叠加层（State overlay），优雅大气。
                </div>
              </div>

            </div>
          </div>

          {/* Quick Code Copier */}
          <div className="bg-m3-muted-surface p-4 rounded-2xl border border-m3-outline/10 mt-4 flex items-center justify-between text-xs">
            <span className="text-m3-outline font-mono">Tailwind Snippet (ROAK Button)</span>
            <button
              onClick={() => handleCopy(`className="py-3 px-4 bg-[#1a1820] border border-zinc-700 hover:bg-m3-primary hover:text-white hover:scale-[1.01] active:scale-[0.98] focus:ring-2 focus:ring-m3-primary rounded text-xs font-mono font-bold transition-all duration-150 cursor-pointer"`, 'btn-code')}
              className="px-3.5 py-1.5 bg-white hover:bg-m3-primary/5 border border-m3-outline/15 rounded-xl text-[11px] font-semibold text-m3-on-surface flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              {copiedId === 'btn-code' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-m3-outline" />}
              {copiedId === 'btn-code' ? '已复制' : '复制样式类'}
            </button>
          </div>
        </div>

        {/* Right Detail Console (Interactive States Explained) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#131118] text-zinc-100 rounded-[28px] p-6 border border-m3-outline/20 space-y-4">
            <h4 className="text-xs font-mono font-bold text-m3-outline uppercase tracking-widest">
              状态机机制详解 (ROAK vs M3)
            </h4>
            
            <div className="space-y-3.5">
              {/* REST STATE */}
              <div className={`p-4 border transition-all duration-300 ${
                buttonState === 'rest' ? 'bg-[#201d29] border-m3-primary/45 shadow-lg rounded-2xl' : 'bg-zinc-950/25 border-transparent opacity-60 rounded-xl'
              }`}>
                <span className="text-xs font-mono font-bold text-zinc-300 block">REST (静止/默认状态)</span>
                <p className="text-[11px] text-zinc-400 mt-1 font-sans leading-relaxed">
                  ROAK 使用 1px 细边框进行极强的数据边缘框定，不使用多余渐变；M3 使用平铺或轻微高度色阶体现自然融合。
                </p>
              </div>

              {/* HOVER STATE */}
              <div className={`p-4 border transition-all duration-300 ${
                buttonState === 'hover' ? 'bg-[#231b30] border-m3-primary/45 shadow-lg rounded-2xl' : 'bg-zinc-950/25 border-transparent opacity-60 rounded-xl'
              }`}>
                <span className="text-xs font-mono font-bold text-m3-primary block">HOVER (悬停高亮状态)</span>
                <p className="text-[11px] text-zinc-400 mt-1 font-sans leading-relaxed">
                  ROAK 要求悬停时背景色突变并稍微拉伸点击盒外圈，形成高对比强反馈；M3 通过在表面叠加 8% 的半透明主色层来优雅表现。
                </p>
              </div>

              {/* PRESSED STATE */}
              <div className={`p-4 border transition-all duration-300 ${
                buttonState === 'pressed' ? 'bg-[#2e1c2a] border-amber-500/40 shadow-lg rounded-2xl' : 'bg-zinc-950/25 border-transparent opacity-60 rounded-xl'
              }`}>
                <span className="text-xs font-mono font-bold text-amber-400 block">PRESSED (按下物理按压感)</span>
                <p className="text-[11px] text-zinc-400 mt-1 font-sans leading-relaxed">
                  ROAK 强制按钮整体稍微缩水 (scale-[0.98])，以模拟手指或鼠标真实按压的机械响应；M3 会叠加 12% 状态层并启动扩散的水波纹（Ripple）动画。
                </p>
              </div>

              {/* FOCUS STATE */}
              <div className={`p-4 border transition-all duration-300 ${
                buttonState === 'focused' ? 'bg-[#10241f] border-emerald-500/40 shadow-lg rounded-2xl' : 'bg-zinc-950/25 border-transparent opacity-60 rounded-xl'
              }`}>
                <span className="text-xs font-mono font-bold text-emerald-400 block">FOCUS (焦点无障碍)</span>
                <p className="text-[11px] text-zinc-400 mt-1 font-sans leading-relaxed">
                  ROAK 必须配备明显的 2px 高反差轮廓环（环外侧间隙 2px），保护纯键盘高频录入人员的安全；M3 展现为 1px 圆形轨道包络。
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* SECTION 2: INPUTS AND ON-DEMAND PATTERN */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ROAK On-Demand Text Input (The renameable card example) */}
        <div className="lg:col-span-6 bg-white border border-m3-outline/15 rounded-[28px] p-6 shadow-[0_4px_16px_rgba(103,80,164,0.03)] space-y-4">
          <div>
            <span className="text-[10px] font-mono font-bold text-m3-primary uppercase tracking-wider block">
              ROAK-AI EXCLUSIVE PATTERN
            </span>
            <h3 className="text-base font-bold text-m3-on-surface mt-1 font-serif">
              On-Demand Text Input <span className="italic text-m3-primary font-serif">(在静止时看起来像文本按钮)</span>
            </h3>
            <p className="text-xs text-m3-outline mt-1 leading-relaxed">
              为了精简复杂的工业看板信息，可重命名的标题或静态指标<strong>不应默认放置笨重的输入框</strong>。常态下其外观和排版完美融合于文本，当悬停、激活时无缝变换为高亮输入栏。
            </p>
          </div>

          {/* Interactive Card with On-Demand renaming */}
          <div className="bg-m3-muted-surface border border-m3-outline/10 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-m3-outline/10 pb-3">
              <span className="text-[10px] font-mono font-bold text-m3-outline">VEHICLE PROFILE CARD</span>
              <span className="text-xs bg-emerald-500/10 text-emerald-700 font-bold px-2 py-0.5 border border-emerald-500/20 rounded-lg">
                运行中
              </span>
            </div>

            {/* Renameable area using On-Demand Pattern */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono font-bold text-m3-outline uppercase tracking-widest">
                资产名称 (点击编辑)
              </label>
              
              {isEditingTitle ? (
                <div className="flex items-center gap-2">
                  <input
                    ref={titleInputRef}
                    type="text"
                    value={tempTitle}
                    onChange={(e) => setTempTitle(e.target.value)}
                    onBlur={handleTitleSubmit}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleTitleSubmit();
                      if (e.key === 'Escape') {
                        setTempTitle(cardTitle);
                        setIsEditingTitle(false);
                      }
                    }}
                    className="w-full bg-white border-2 border-m3-primary rounded-xl px-3 py-1.5 text-sm font-bold text-m3-on-surface focus:outline-none focus:ring-0 font-sans"
                  />
                  <button
                    onClick={handleTitleSubmit}
                    className="px-3.5 py-1.5 bg-m3-primary hover:bg-[#533c8c] text-white rounded-xl text-xs font-bold cursor-pointer transition-colors shrink-0"
                  >
                    保存
                  </button>
                </div>
              ) : (
                <div
                  id="on-demand-title-btn"
                  onClick={startEditingTitle}
                  className="group flex items-center justify-between rounded-xl p-2 hover:bg-m3-primary/5 cursor-pointer border border-dashed border-transparent hover:border-m3-primary/25 transition-all"
                  title="点击开始编辑此指标"
                >
                  <span className="text-sm font-bold text-m3-on-surface font-sans">{cardTitle}</span>
                  <span className="text-[10px] text-m3-primary font-mono font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    [编辑名称]
                  </span>
                </div>
              )}
            </div>

            {/* Dummy telemetry lines to anchor the design */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
              <div className="bg-white p-3.5 rounded-xl border border-m3-outline/10 shadow-[0_2px_8px_rgba(103,80,164,0.01)]">
                <span className="text-[10px] text-m3-outline block font-mono">BATTERY VOLT</span>
                <span className="font-mono font-bold text-m3-on-surface">412.5 V</span>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-m3-outline/10 shadow-[0_2px_8px_rgba(103,80,164,0.01)]">
                <span className="text-[10px] text-m3-outline block font-mono">GPS DEVIATION</span>
                <span className="font-mono font-bold text-m3-on-surface">±0.04 m</span>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-m3-outline leading-normal italic font-sans bg-m3-primary/5 p-4 rounded-2xl border border-m3-outline/5">
            * <strong>交互提示：</strong> 鼠标滑过资产卡片上的标题，体会从静态表格指标到活跃输入框的无缝过渡。这减少了常规工业监控画面的拥挤感。
          </p>
        </div>

        {/* M3 Standard Input Fields */}
        <div className="lg:col-span-6 bg-white border border-m3-outline/15 rounded-[28px] p-6 shadow-[0_4px_16px_rgba(103,80,164,0.03)] space-y-4">
          <div>
            <span className="text-[10px] font-mono font-bold text-m3-primary block">
              MATERIAL DESIGN 3 STANDARD
            </span>
            <h3 className="text-base font-bold text-m3-on-surface mt-1 font-serif">
              Filled & Outlined Inputs <span className="italic text-m3-primary font-serif">(M3 标准输入框)</span>
            </h3>
            <p className="text-xs text-m3-outline mt-1 leading-relaxed">
              M3 重视无障碍与触控空间。文本输入框必须有明确的聚焦高亮色、圆角结构，以及<strong>在聚焦时自动平滑上浮</strong>的悬浮浮动标签（Floating Label）。
            </p>
          </div>

          <div className="bg-m3-muted-surface border border-m3-outline/10 rounded-2xl p-5 space-y-6">
            {/* Outlined M3 Text Field with Floating Label Simulator */}
            <div className="relative mt-2">
              <input
                type="text"
                value={m3InputValue}
                onChange={(e) => setM3InputValue(e.target.value)}
                onFocus={() => setM3InputFocused(true)}
                onBlur={() => setM3InputFocused(m3InputValue.length > 0)}
                className={`w-full px-4 py-3 bg-white border rounded-xl text-sm text-m3-on-surface transition-all focus:outline-none ${
                  m3InputFocused 
                    ? 'border-m3-primary ring-1 ring-m3-primary' 
                    : 'border-m3-outline/25 hover:border-m3-primary/30'
                }`}
              />
              
              {/* Animated Floating Label */}
              <label 
                className={`absolute left-3 transition-all pointer-events-none ${
                  m3InputFocused || m3InputValue.length > 0
                    ? '-top-2.5 px-1.5 bg-white text-[10px] font-bold text-m3-primary rounded'
                    : 'top-3 text-sm text-m3-outline'
                }`}
              >
                Enter destination waypoint
              </label>
            </div>

            {/* Static Filled variant demo */}
            <div className="bg-white border border-m3-outline/10 border-b-2 border-b-m3-primary rounded-xl p-3.5 relative flex flex-col justify-between h-14 hover:bg-m3-primary/5 transition-colors">
              <span className="text-[10px] font-bold text-m3-primary font-mono">OPERATOR LICENSE KEY</span>
              <span className="text-sm text-m3-on-surface font-mono">OP-88219-X9</span>
            </div>
          </div>

          <p className="text-[11px] text-m3-outline leading-relaxed font-sans bg-m3-primary/5 p-4 rounded-2xl border border-m3-outline/5">
            <strong>M3 对比分析：</strong> M3 的上浮标签是多表单填写场景下的黄金准则，但在高度压缩的工业表格、属性网格中，过高的组件深度容易耗尽垂直像素空间。
          </p>
        </div>

      </div>

      {/* SECTION 3: SVG ICON SPECIFICATIONS (PIXEL ALIGN) */}
      <div className="bg-white border border-m3-outline/15 rounded-[28px] p-6 shadow-[0_4px_16px_rgba(103,80,164,0.03)] space-y-6">
        <div>
          <h3 className="text-base font-bold text-m3-on-surface font-serif">
            矢量图标设计规范：<span className="italic text-m3-primary font-serif">几何化与 2px 像素对齐</span>
          </h3>
          <p className="text-xs text-m3-outline mt-1 leading-relaxed">
            ROAK-AI 系统对自定义 SVG 图标有严苛的要求。在可能的情况下，图标所有端点和笔画必须对齐至像素网格，推荐使用 <strong>2px 粗笔描边</strong>，绝对禁止不合时宜的多余外圈装饰。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-m3-outline/10">
          {/* Good practice */}
          <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-2xl p-5 flex flex-col md:flex-row items-center gap-6">
            {/* SVG illustration */}
            <div className="w-24 h-24 bg-white rounded-xl border border-emerald-500/25 flex items-center justify-center relative shadow-sm shrink-0">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                {/* 2px stroke geometric layout indicator */}
                <rect x="6" y="6" width="36" height="36" rx="4" stroke="#059669" strokeWidth="2.5" />
                <line x1="16" y1="24" x2="32" y2="24" stroke="#059669" strokeWidth="2.5" strokeLinecap="square" />
                <line x1="24" y1="16" x2="24" y2="32" stroke="#059669" strokeWidth="2.5" strokeLinecap="square" />
              </svg>
              {/* Magnifying glass circle details to show grid alignment */}
              <span className="absolute bottom-1 right-1 text-[8px] bg-emerald-600 text-white font-mono px-1 rounded-md">2px STROKE</span>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-emerald-700 uppercase flex items-center gap-1">
                <Check className="w-4 h-4" /> IDEAL (符合规范)
              </span>
              <p className="text-xs text-m3-on-surface leading-relaxed font-sans">
                使用纯直角/圆形几何形状。矢量笔刷端点设为直角（Square），且完美的对齐像素分割点，这保证了在任意低清晰度显示屏上图标依然极其边缘清晰，拒绝发虚。
              </p>
            </div>
          </div>

          {/* Bad practice */}
          <div className="bg-red-500/5 border border-red-500/15 rounded-2xl p-5 flex flex-col md:flex-row items-center gap-6">
            {/* SVG illustration */}
            <div className="w-24 h-24 bg-white rounded-xl border border-red-500/25 flex items-center justify-center relative shadow-sm shrink-0">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" opacity="0.6">
                {/* Cluttered concentric circle with blurry lines */}
                <circle cx="24" cy="24" r="21" stroke="#dc2626" strokeWidth="1" strokeDasharray="2 2" />
                <circle cx="24" cy="24" r="14" stroke="#dc2626" strokeWidth="1" />
                <line x1="14" y1="24" x2="34" y2="24" stroke="#dc2626" strokeWidth="1" strokeLinecap="round" />
                <line x1="24" y1="14" x2="24" y2="34" stroke="#dc2626" strokeWidth="1" strokeLinecap="round" />
              </svg>
              <span className="absolute bottom-1 right-1 text-[8px] bg-red-600 text-white font-mono px-1 rounded-md">1px BLURRY</span>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-red-700 uppercase flex items-center gap-1">
                <AlertCircle className="w-4 h-4" /> AVOID (避免的做法)
              </span>
              <p className="text-xs text-m3-on-surface leading-relaxed font-sans">
                避免无谓的外装饰圆（Concentric Circles）。1px 笔刷在微型栅格化时极易因子像素采样而变成一团模糊虚边，导致识别效率暴降，操作员容易发生视觉疲劳。
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
