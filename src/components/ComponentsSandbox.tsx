import React, { useState, useRef } from 'react';
import { Copy, Check, MousePointerClick, RefreshCw, Smartphone, Eye, Sparkles, Shield, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

// Import shadcn/ui components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ComponentsSandbox() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // Interactive Button State Tracker
  const [buttonState, setButtonState] = useState<'rest' | 'hover' | 'pressed' | 'focused'>('rest');
  
  // On-Demand Text Input State
  const [cardTitle, setCardTitle] = useState('矿区 04 号自动卡车');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState(cardTitle);
  const titleInputRef = useRef<HTMLInputElement>(null);

  // Apple Inputs State
  const [appleInputValue, setAppleInputValue] = useState('');
  const [appleInputFocused, setAppleInputFocused] = useState(false);

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
    <div id="components-sandbox" className="space-y-8 animate-fade-in font-sans">
      
      {/* SECTION 1: BUTTONS STATE ENGINE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Interactive Button Console using shadcn/ui Card */}
        <Card className="lg:col-span-7 bg-white border border-[#D2D2D7]/50 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-[#D2D2D7]/30 pb-3 gap-2">
              <div>
                <CardTitle className="text-base font-bold text-[#1D1D1F]">
                  按钮物理交互与 <span className="text-[#0071E3]">状态对比</span>
                </CardTitle>
                <CardDescription className="text-xs text-[#86868B] mt-1">
                  测试不同设计系统下状态层的视觉演绎
                </CardDescription>
              </div>
              <Badge variant="secondary" className="font-mono text-[10px] font-bold uppercase py-1 px-2.5 rounded-lg border border-[#0071E3]/10 bg-[#0071E3]/5 text-[#0071E3]">
                STATE DETECTOR: {buttonState.toUpperCase()}
              </Badge>
            </div>

            {/* Sandbox Playground */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 border-b border-[#D2D2D7]/30">
              
              {/* Apple HIG Button Box */}
              <div className="bg-[#1D1D1F] rounded-xl p-5 border border-[#D2D2D7]/30 space-y-4 flex flex-col justify-between min-h-[190px]">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-mono font-bold text-[#86868B]">APPLE HIG COMPLIANT BUTTON</span>
                    <span className="w-2 h-2 bg-[#0071E3] rounded-full"></span>
                  </div>
                  
                  {/* Interactive Apple HIG Button */}
                  <Button
                    id="apple-interactive-btn"
                    onMouseEnter={() => setButtonState('hover')}
                    onMouseLeave={() => setButtonState('rest')}
                    onMouseDown={() => setButtonState('pressed')}
                    onMouseUp={() => setButtonState('hover')}
                    onFocus={() => setButtonState('focused')}
                    onBlur={() => setButtonState('rest')}
                    className="w-full py-3 px-4 rounded-xl border transition-all duration-150 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer h-auto
                      bg-[#0071E3] text-white border-transparent hover:bg-[#0071E3]/95 hover:shadow-sm hover:scale-[1.01]
                      active:scale-[0.98]
                      focus:ring-2 focus:ring-[#0071E3] focus:ring-offset-2 focus:ring-offset-[#1D1D1F] focus:outline-none"
                  >
                    <Shield className="w-4 h-4 shrink-0" />
                    <span>EXECUTE VEHICLE EMERGENCY STOP</span>
                  </Button>
                </div>

                <div className="text-[10px] font-mono text-[#86868B] leading-normal border-t border-[#D2D2D7]/20 pt-2">
                  <strong>Apple 规范：</strong> 采用圆角边框、高饱和主色与重压时微缩反馈。
                </div>
              </div>

              {/* Muted System Buttons Box */}
              <div className="bg-[#F5F5F7] rounded-xl p-5 border border-[#D2D2D7]/50 space-y-4 flex flex-col justify-between min-h-[190px]">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-mono font-bold text-[#86868B]">SYSTEM CONTROL BUTTONS</span>
                    <span className="w-2 h-2 bg-zinc-400 rounded-full"></span>
                  </div>

                  {/* Interactive Muted Buttons */}
                  <div className="space-y-2">
                    <Button
                      id="apple-prominent-btn"
                      onMouseEnter={() => setButtonState('hover')}
                      onMouseLeave={() => setButtonState('rest')}
                      onMouseDown={() => setButtonState('pressed')}
                      onMouseUp={() => setButtonState('hover')}
                      onFocus={() => setButtonState('focused')}
                      onBlur={() => setButtonState('rest')}
                      className="w-full py-2.5 px-5 bg-white hover:bg-[#F5F5F7] text-[#1D1D1F] rounded-xl border border-[#D2D2D7] text-xs font-semibold shadow-sm transition-all cursor-pointer relative overflow-hidden h-auto"
                    >
                      Prominent Action
                    </Button>

                    {/* Secondary Button */}
                    <Button
                      id="apple-secondary-btn"
                      className="w-full py-2 px-5 bg-transparent hover:bg-[#D2D2D7]/20 text-[#0071E3] rounded-xl border border-transparent text-xs font-semibold transition-all cursor-pointer h-auto"
                    >
                      Secondary Link Button
                    </Button>
                  </div>
                </div>

                <div className="text-[10px] font-mono text-[#86868B] leading-normal border-t border-[#D2D2D7]/20 pt-2">
                  <strong>反馈规范：</strong> 强调扁平极简布局与半透明高亮，触控感知清晰且温和。
                </div>
              </div>

            </div>
          </div>

          {/* Quick Code Copier */}
          <div className="bg-[#F5F5F7] p-4 rounded-xl border border-[#D2D2D7]/40 mt-4 flex items-center justify-between text-xs">
            <span className="text-[#86868B] font-mono">Tailwind Snippet (Apple Button)</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCopy(`className="py-3 px-4 bg-[#0071E3] hover:bg-[#0071E3]/95 text-white hover:scale-[1.01] active:scale-[0.98] focus:ring-2 focus:ring-[#0071E3] rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer"`, 'btn-code')}
              className="px-3.5 py-1.5 bg-white hover:bg-[#F5F5F7] border border-[#D2D2D7] rounded-xl text-[11px] font-semibold text-[#1D1D1F] flex items-center gap-1.5 cursor-pointer transition-colors h-auto"
            >
              {copiedId === 'btn-code' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-[#86868B]" />}
              {copiedId === 'btn-code' ? '已复制' : '复制样式类'}
            </Button>
          </div>
        </Card>

        {/* Right Detail Console (Interactive States Explained) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#1D1D1F] text-[#F5F5F7] rounded-2xl p-6 border border-[#D2D2D7]/30 space-y-4">
            <h4 className="text-xs font-semibold text-[#86868B] uppercase tracking-wider">
              状态机物理回馈详解
            </h4>
            
            <div className="space-y-3.5">
              {/* REST STATE */}
              <div className={`p-4 border transition-all duration-300 ${
                buttonState === 'rest' ? 'bg-[#2C2C2E] border-[#0071E3]/40 shadow-sm rounded-xl' : 'bg-transparent border-transparent opacity-60 rounded-xl'
              }`}>
                <span className="text-xs font-mono font-bold text-zinc-300 block">REST (静止/默认状态)</span>
                <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                  Apple 倾向采用极简实色背景对齐，高饱和蓝色凸显重要度，不留冗余的线性渐变以确保最本质的数据阅读。
                </p>
              </div>

              {/* HOVER STATE */}
              <div className={`p-4 border transition-all duration-300 ${
                buttonState === 'hover' ? 'bg-[#2C2C2E] border-[#0071E3]/40 shadow-sm rounded-xl' : 'bg-transparent border-transparent opacity-60 rounded-xl'
              }`}>
                <span className="text-xs font-mono font-bold text-[#0071E3] block">HOVER (悬停状态)</span>
                <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                  通过在组件顶部增加不透明度叠层，触发深色卡片略带辉光的变色高亮，确保在不打扰底板对比度时优雅示意。
                </p>
              </div>

              {/* PRESSED STATE */}
              <div className={`p-4 border transition-all duration-300 ${
                buttonState === 'pressed' ? 'bg-[#2C2C2E] border-amber-500/40 shadow-sm rounded-xl' : 'bg-transparent border-transparent opacity-60 rounded-xl'
              }`}>
                <span className="text-xs font-mono font-bold text-amber-400 block">PRESSED (按压物理震动)</span>
                <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                  使用精确的 CSS 触控反馈参数：尺寸缩小 2%，产生向内回凹效果，以完美的线性缩放传达物理世界的触感。
                </p>
              </div>

              {/* FOCUS STATE */}
              <div className={`p-4 border transition-all duration-300 ${
                buttonState === 'focused' ? 'bg-[#2C2C2E] border-emerald-500/40 shadow-sm rounded-xl' : 'bg-transparent border-transparent opacity-60 rounded-xl'
              }`}>
                <span className="text-xs font-mono font-bold text-emerald-400 block">FOCUS (无障碍对齐焦点)</span>
                <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                  外侧弹出标准的 2px 高对比聚焦提示边缘线，从而极大地帮助低视力群体与高频纯键盘录入员的安全性。
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* SECTION 2: INPUTS AND ON-DEMAND PATTERN */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Apple On-Demand Text Input (The renameable card example) using shadcn/ui Card */}
        <Card className="lg:col-span-6 bg-white border border-[#D2D2D7]/50 rounded-2xl p-6 shadow-sm space-y-4">
          <CardHeader className="p-0">
            <span className="text-[10px] font-mono font-bold text-[#0071E3] uppercase tracking-wider block">
              APPLE EXCLUSIVE INPUT PATTERN
            </span>
            <CardTitle className="text-base font-bold text-[#1D1D1F] mt-1">
              On-Demand Text Input <span className="text-[#0071E3] font-normal">(在静止时看起来像文本)</span>
            </CardTitle>
            <CardDescription className="text-xs text-[#86868B] leading-relaxed mt-1">
              为了精简复杂的监控看板信息，可重命名的标题或静态指标<strong>不应默认放置笨重的输入框</strong>。常态下其外观和排版完美融合于文本，当悬停、激活时无缝变换为高亮输入栏。
            </CardDescription>
          </CardHeader>

          {/* Interactive Card with On-Demand renaming */}
          <div className="bg-[#F5F5F7] border border-[#D2D2D7]/40 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#D2D2D7]/30 pb-3">
              <span className="text-[10px] font-mono font-bold text-[#86868B]">VEHICLE PROFILE CARD</span>
              <Badge className="text-xs bg-emerald-500/10 text-emerald-700 font-bold px-2 py-0.5 border border-emerald-500/20 rounded-lg shadow-none">
                运行中
              </Badge>
            </div>

            {/* Renameable area using On-Demand Pattern */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono font-bold text-[#86868B] uppercase tracking-widest">
                资产名称 (点击编辑)
              </label>
              
              {isEditingTitle ? (
                <div className="flex items-center gap-2">
                  <Input
                    ref={titleInputRef as any}
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
                    className="w-full bg-white border-2 border-[#0071E3] rounded-xl px-3 py-1.5 text-sm font-bold text-[#1D1D1F] focus-visible:ring-0 focus-visible:ring-offset-0 font-sans h-9"
                  />
                  <Button
                    onClick={handleTitleSubmit}
                    className="px-3.5 py-1.5 bg-[#0071E3] hover:bg-[#0071E3]/95 text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors shrink-0 h-9"
                  >
                    保存
                  </Button>
                </div>
              ) : (
                <div
                  id="on-demand-title-btn"
                  onClick={startEditingTitle}
                  className="group flex items-center justify-between rounded-xl p-2 hover:bg-[#0071E3]/5 cursor-pointer border border-dashed border-transparent hover:border-[#0071E3]/25 transition-all"
                  title="点击开始编辑此指标"
                >
                  <span className="text-sm font-bold text-[#1D1D1F]">{cardTitle}</span>
                  <span className="text-[10px] text-[#0071E3] font-mono font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    [编辑名称]
                  </span>
                </div>
              )}
            </div>

            {/* Dummy telemetry lines to anchor the design */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
              <div className="bg-white p-3.5 rounded-xl border border-[#D2D2D7]/40 shadow-sm">
                <span className="text-[10px] text-[#86868B] block font-mono">BATTERY VOLT</span>
                <span className="font-mono font-bold text-[#1D1D1F]">412.5 V</span>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-[#D2D2D7]/40 shadow-sm">
                <span className="text-[10px] text-[#86868B] block font-mono">GPS DEVIATION</span>
                <span className="font-mono font-bold text-[#1D1D1F]">±0.04 m</span>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-[#86868B] leading-normal italic bg-[#0071E3]/5 p-4 rounded-xl border border-[#0071E3]/10">
            * <strong>交互提示：</strong> 鼠标滑过资产卡片上的标题，体会从静态表格指标到活跃输入框的无缝过渡。这大大减少了常规工业监控画面的拥挤感。
          </p>
        </Card>

        {/* Apple Standard Input Fields using shadcn/ui Card */}
        <Card className="lg:col-span-6 bg-white border border-[#D2D2D7]/50 rounded-2xl p-6 shadow-sm space-y-4">
          <CardHeader className="p-0">
            <span className="text-[10px] font-mono font-bold text-[#0071E3] block">
              APPLE DESIGN STANDARD INPUTS
            </span>
            <CardTitle className="text-base font-bold text-[#1D1D1F] mt-1">
              macOS System Inputs <span className="text-[#0071E3] font-normal">(苹果标准输入框)</span>
            </CardTitle>
            <CardDescription className="text-xs text-[#86868B] leading-relaxed mt-1">
              Apple 重视无障碍与触控空间。文本输入框必须有明确的聚焦高亮色、圆角结构，以及<strong>在聚焦时自动平滑高亮</strong>的优雅浅灰色边框。
            </CardDescription>
          </CardHeader>

          <div className="bg-[#F5F5F7] border border-[#D2D2D7]/40 rounded-xl p-5 space-y-6">
            {/* Outlined Apple Text Field with Floating Label Simulator */}
            <div className="relative mt-2">
              <Input
                type="text"
                value={appleInputValue}
                onChange={(e) => setAppleInputValue(e.target.value)}
                onFocus={() => setAppleInputFocused(true)}
                onBlur={() => setAppleInputFocused(appleInputValue.length > 0)}
                className={`w-full px-4 py-3 bg-white border rounded-xl text-sm text-[#1D1D1F] transition-all focus-visible:outline-none h-11 ${
                  appleInputFocused 
                    ? 'border-[#0071E3] ring-1 ring-[#0071E3]' 
                    : 'border-[#D2D2D7] hover:border-[#0071E3]/30'
                }`}
              />
              
              {/* Animated Floating Label */}
              <label 
                className={`absolute left-3 transition-all pointer-events-none ${
                  appleInputFocused || appleInputValue.length > 0
                    ? '-top-2.5 px-1.5 bg-white text-[10px] font-bold text-[#0071E3] rounded'
                    : 'top-3 text-sm text-[#86868B]'
                }`}
              >
                Enter destination waypoint
              </label>
            </div>

            {/* Static Filled variant demo */}
            <div className="bg-white border border-[#D2D2D7]/40 border-b-2 border-b-[#0071E3] rounded-xl p-3.5 relative flex flex-col justify-between h-14 hover:bg-[#0071E3]/5 transition-colors">
              <span className="text-[10px] font-bold text-[#0071E3] font-mono">OPERATOR LICENSE KEY</span>
              <span className="text-sm text-[#1D1D1F] font-mono">OP-88219-X9</span>
            </div>
          </div>

          <p className="text-[11px] text-[#86868B] leading-relaxed bg-[#0071E3]/5 p-4 rounded-xl border border-[#0071E3]/10">
            <strong>设计分析：</strong> 自然、谦逊的 Apple 扁平式高显框不仅能完美融于各项重载列表内，且对于中老年矿工等特殊群体的辨识效率也是首屈一指。
          </p>
        </Card>

      </div>

      {/* SECTION 3: SVG ICON SPECIFICATIONS (PIXEL ALIGN) */}
      <div className="bg-white border border-[#D2D2D7]/50 rounded-2xl p-6 shadow-sm space-y-6">
        <div>
          <h3 className="text-base font-bold text-[#1D1D1F]">
            矢量图标设计规范：<span className="text-[#0071E3]">几何化与 2px 像素对齐</span>
          </h3>
          <p className="text-xs text-[#86868B] mt-1 leading-relaxed">
            ROCK-AI 系统对自定义 SVG 图标有严苛的要求。在可能的情况下，图标所有端点和笔画必须对齐至像素网格，推荐使用 <strong>2px 粗笔描边</strong>，绝对禁止不合时宜的多余外圈装饰。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-[#D2D2D7]/30">
          {/* Good practice */}
          <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-xl p-5 flex flex-col md:flex-row items-center gap-6">
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
              <p className="text-xs text-[#1D1D1F] leading-relaxed">
                使用纯直角/圆形几何形状。矢量笔刷端点设为直角（Square），且完美的对齐像素分割点，这保证了在任意低清晰度显示屏上图标依然极其边缘清晰，拒绝发虚。
              </p>
            </div>
          </div>

          {/* Bad practice */}
          <div className="bg-red-500/5 border border-red-500/15 rounded-xl p-5 flex flex-col md:flex-row items-center gap-6">
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
              <p className="text-xs text-[#1D1D1F] leading-relaxed">
                避免无谓的外装饰圆（Concentric Circles）。1px 笔刷在微型栅格化时极易因子像素采样而变成一团模糊虚边，导致识别效率暴降，操作员容易发生视觉疲劳。
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
