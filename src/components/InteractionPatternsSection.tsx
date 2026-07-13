import React, { useState } from 'react';
import { 
  Activity, Play, RotateCcw, HelpCircle, AlertCircle, 
  ChevronRight, Touchpad, HelpCircle as HelpIcon, Sparkles, Move
} from 'lucide-react';

export default function InteractionPatternsSection() {
  // Motion curve state
  const [motionCurve, setMotionCurve] = useState<'standard' | 'emphasized' | 'linear' | 'roak'>('standard');
  const [animationKey, setAnimationKey] = useState(0);

  // Gesture simulation states
  const [damping, setDamping] = useState(15);
  const [stiffness, setStiffness] = useState(120);
  const [gestureStatus, setGestureStatus] = useState('IDLE');
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  // Interactive state layers simulation
  const [activeHoverId, setActiveHoverId] = useState<string | null>(null);

  // Trigger motion preview animation
  const triggerAnimation = () => {
    setAnimationKey(prev => prev + 1);
  };

  // Drag-and-drop gesture simulation logic
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.clientX - dragOffset);
    setGestureStatus('DRAGGING');
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const offset = e.clientX - startX;
    // Apply heavy physics damping
    const dampedOffset = offset * (1 - (Math.abs(offset) / 600));
    setDragOffset(Math.max(-150, Math.min(150, dampedOffset)));
    setGestureStatus(`DRAGGING (Offset: ${Math.round(dragOffset)}px)`);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    setGestureStatus('SPRINGING BACK');
    
    // Animate spring back to 0 using manual spring transition
    let current = dragOffset;
    const step = () => {
      // Very primitive spring physics formula for simulation
      const acceleration = -current * (stiffness / 1000) - (current * (damping / 100));
      current += acceleration;
      if (Math.abs(current) < 0.5) {
        setDragOffset(0);
        setGestureStatus('IDLE (Spring settled)');
      } else {
        setDragOffset(current);
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  };

  const getCurveDescription = () => {
    switch (motionCurve) {
      case 'standard':
        return 'macOS/iOS 默认系统曲线 (Standard Easing)：加速极其轻快，在接近终点时柔和减速，广泛用于绝大多数系统窗口与控制卡片的弹出。';
      case 'emphasized':
        return 'Apple HIG 弹性流畅曲线 (Fluid Spring Curve)：采用自然的惯性物理弹簧，包含微弱的动态回弹，极具手感，广泛用于 iOS 核心手势与下拉回弹。';
      case 'linear':
        return '线性刚性曲线 (Linear)：恒速运动。在工业和物理操控中常用来表示不受阻尼干扰的原始机械臂/传感器实时读取。';
      case 'roak':
        return 'ROAK 强力工业曲线 (Heavy Industrial)：无过渡的极速启动与阶跃，确保任何安全警告在 16ms 内无残影完全呈递给操作员。';
    }
  };

  const getTransitionStyle = () => {
    switch (motionCurve) {
      case 'standard':
        return 'cubic-bezier(0.25, 1, 0.5, 1)'; // standard apple ease-out
      case 'emphasized':
        return 'cubic-bezier(0.175, 0.885, 0.32, 1.1)'; // fluid spring overshoot
      case 'linear':
        return 'linear';
      case 'roak':
        return 'cubic-bezier(0, 0.9, 0.1, 1)'; // very fast rise
    }
  };

  const getTransitionDuration = () => {
    switch (motionCurve) {
      case 'standard': return '400ms';
      case 'emphasized': return '500ms';
      case 'linear': return '300ms';
      case 'roak': return '120ms';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in" id="interaction-patterns-section">
      
      {/* Introduction banner */}
      <div className="bg-[#1D1D1F] border border-[#D2D2D7]/30 rounded-2xl p-6 text-[#F5F5F7] space-y-3 shadow-sm font-sans">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-[#0071E3] shrink-0" />
          <h4 className="text-xs font-semibold uppercase tracking-tight text-[#86868B]">
            ROCK-AI 交互动力学设计规范 (Interaction Dynamics)
          </h4>
        </div>
        <p className="text-xs text-[#86868B] leading-relaxed">
          本规范交互动力学设计完美对齐高精度工业场景下的物理摩擦力、阻尼常数和动力学动画公式，提供温和自然的物理阻尼反馈，实现极限环境下的高确定性、高顺畅触控体验。
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* PLAYGROUND A: Motion Curves Timing */}
        <div className="bg-white border border-[#D2D2D7]/50 rounded-2xl p-6 shadow-sm space-y-6 flex flex-col justify-between font-sans">
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-[#D2D2D7]/30 pb-3">
              <span className="text-[10px] font-bold text-[#0071E3] bg-[#0071E3]/10 px-2.5 py-0.5 rounded-full">PLAYGROUND 01</span>
              <h4 className="text-sm font-bold text-[#1D1D1F]">动力学运动曲线演练</h4>
            </div>
            <p className="text-xs text-[#86868B] leading-relaxed">
              运动曲线引导操作员的注意力。点击切换不同的贝塞尔控制曲线，并点击播放观看圆球的物理平移动画。
            </p>
          </div>

          {/* Timing curve select buttons */}
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'standard', name: 'Apple Ease-Out (标准流畅)' },
              { id: 'emphasized', name: 'Apple Fluid Spring (弹性回弹)' },
              { id: 'linear', name: 'Linear (物理原始线性)' },
              { id: 'roak', name: 'ROAK Heavy (强力瞬发阶跃)' }
            ].map((curve) => (
              <button
                key={curve.id}
                onClick={() => { setMotionCurve(curve.id as any); triggerAnimation(); }}
                className={`py-2 px-3 text-left text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  motionCurve === curve.id 
                    ? 'bg-[#0071E3] border-[#0071E3] text-white shadow-sm' 
                    : 'bg-[#F5F5F7] border-[#D2D2D7]/50 text-[#1D1D1F] hover:bg-[#0071E3]/10'
                }`}
              >
                {curve.name}
              </button>
            ))}
          </div>

          {/* Current curve text descriptor */}
          <div className="bg-[#F5F5F7] border border-[#D2D2D7]/40 rounded-xl p-4 text-xs text-[#1D1D1F]/90 leading-relaxed min-h-[72px]">
            {getCurveDescription()}
          </div>

          {/* Interactive Arena */}
          <div className="bg-zinc-950 rounded-xl p-6 relative overflow-hidden h-36 border border-zinc-800 flex flex-col justify-between">
            <div className="flex justify-between text-[9px] font-mono text-zinc-500">
              <span>START (0.0s)</span>
              <span>FINISH (1.0s)</span>
            </div>

            {/* Track line */}
            <div className="h-0.5 w-full bg-zinc-800 relative my-auto">
              {/* Ball */}
              <div 
                key={animationKey}
                className="absolute w-6 h-6 -top-[11px] rounded-full border-2 border-white flex items-center justify-center shadow-lg"
                style={{
                  backgroundColor: motionCurve === 'roak' ? '#ef4444' : '#0071E3',
                  left: '0%',
                  animation: `moveRight ${getTransitionDuration()} ${getTransitionStyle()} forwards`,
                  animationDelay: '100ms'
                }}
              >
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono text-[#0071E3] font-bold">
                CUBIC-BEZIER: {getTransitionStyle()} ({getTransitionDuration()})
              </span>
              <button
                onClick={triggerAnimation}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0071E3] text-white rounded-lg text-xs font-mono font-semibold cursor-pointer hover:bg-[#0071E3]/95 transition-colors"
              >
                <Play className="w-3.5 h-3.5" /> 播放动画
              </button>
            </div>
          </div>
        </div>

        {/* PLAYGROUND B: Drag and Drop Springs */}
        <div className="bg-white border border-[#D2D2D7]/50 rounded-2xl p-6 shadow-sm space-y-6 flex flex-col justify-between font-sans">
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-[#D2D2D7]/30 pb-3">
              <span className="text-[10px] font-bold text-[#0071E3] bg-[#0071E3]/10 px-2.5 py-0.5 rounded-full">PLAYGROUND 02</span>
              <h4 className="text-sm font-bold text-[#1D1D1F]">手势阻尼与物理弹簧系数</h4>
            </div>
            <p className="text-xs text-[#86868B] leading-relaxed">
              在重型矿区环境中，控制台滑块拖拽须拥有精确的惯性抗性（Anti-slip resistance）。用鼠标拖拽下方的物理方块，放手体验弹簧力回弹。
            </p>
          </div>

          {/* Physical control sliders */}
          <div className="space-y-4 bg-[#F5F5F7] border border-[#D2D2D7]/30 p-4 rounded-xl">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono text-[#1D1D1F]">
                <span>DAMPING (空气阻尼系数 / 摩擦力)</span>
                <span className="font-bold text-[#0071E3]">{damping} N·s/m</span>
              </div>
              <input 
                type="range" 
                min="3" 
                max="40" 
                value={damping}
                onChange={(e) => setDamping(Number(e.target.value))}
                className="w-full accent-[#0071E3] h-1 bg-[#D2D2D7] rounded-lg appearance-none cursor-pointer"
              />
              <p className="text-[10px] text-[#86868B]">低阻尼会产生多次弹回余震；高阻尼会使卡片沉稳缓慢地靠拢。</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono text-[#1D1D1F]">
                <span>STIFFNESS (弹簧刚度系数 / 物理拉力)</span>
                <span className="font-bold text-[#0071E3]">{stiffness} N/m</span>
              </div>
              <input 
                type="range" 
                min="40" 
                max="300" 
                value={stiffness}
                onChange={(e) => setStiffness(Number(e.target.value))}
                className="w-full accent-[#0071E3] h-1 bg-[#D2D2D7] rounded-lg appearance-none cursor-pointer"
              />
              <p className="text-[10px] text-[#86868B]">高刚度使回弹速率极其刚性猛烈；低刚度产生轻缓柔性的舒缓位移。</p>
            </div>
          </div>

          {/* Gesture Spring Track area */}
          <div 
            className="border border-dashed border-[#D2D2D7] bg-[#F5F5F7]/30 rounded-xl p-6 h-36 flex flex-col justify-between items-center relative select-none cursor-grab active:cursor-grabbing overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div className="text-[10px] font-mono text-[#86868B] flex items-center gap-1">
              <Move className="w-3.5 h-3.5" /> 拖动下方卡片向左或向右拉伸并放手
            </div>

            {/* Container */}
            <div className="w-full h-12 relative flex items-center justify-center">
              {/* Dynamic physical container */}
              <div
                onMouseDown={handleMouseDown}
                className="absolute w-36 h-12 bg-white border border-[#0071E3]/20 text-[#1D1D1F] font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all select-none"
                style={{
                  transform: `translateX(${dragOffset}px)`,
                  borderColor: isDragging ? '#0071E3' : 'rgba(0,113,227,0.2)',
                  boxShadow: isDragging ? '0 8px 24px rgba(0,113,227,0.1)' : '0 2px 8px rgba(0,0,0,0.03)'
                }}
              >
                <Touchpad className="w-4 h-4 text-[#0071E3]" />
                <span>ROCK-AI_SLID</span>
              </div>
            </div>

            {/* Live feedback status */}
            <div className="text-[10px] font-mono text-[#0071E3] font-bold">
              PHYSICS STATUS: <span className="bg-[#0071E3]/10 px-2 py-0.5 rounded-full">{gestureStatus}</span>
            </div>
          </div>
        </div>

      </div>

      {/* STATE LAYERS SPECIFICATION: Apple Tactile pointer overlays */}
      <div className="bg-white border border-[#D2D2D7]/50 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="space-y-2 border-b border-[#D2D2D7]/30 pb-3 font-sans">
          <h4 className="text-sm font-bold text-[#1D1D1F]">Apple HIG 与 macOS 状态反馈规范 (Interaction States Feedback)</h4>
          <p className="text-xs text-[#86868B]">
            Apple 采用极高反差的 Hover 变色及半透明状态叠加，提供优雅的指针与触控反馈，保证即使在非标准屏幕上也能保持统一的色彩感知。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-sans">
          {[
            { id: 'hover', name: 'Hover (悬停状态)', percentage: '8%', color: 'bg-[#0071E3]/8', desc: '当光标停留在容器表面时增加，提供触控悬停感知，不阻断视差。' },
            { id: 'focus', name: 'Focus (聚焦状态)', percentage: '12%', color: 'bg-[#0071E3]/12', desc: '键盘 tab 切换或指针聚焦时，用于对齐无障碍轮廓线框。' },
            { id: 'press', name: 'Pressed (按下状态)', percentage: '12%', color: 'bg-[#0071E3]/12', desc: '点击那一刻产生的波纹遮罩，反馈最强烈的实体下沉感。' },
            { id: 'drag', name: 'Dragged (拖动状态)', percentage: '16%', color: 'bg-[#0071E3]/16', desc: '卡片处于被悬浮在空中或被拖曳中时的加深遮罩。' }
          ].map((layer) => (
            <div
              key={layer.id}
              onMouseEnter={() => setActiveHoverId(layer.id)}
              onMouseLeave={() => setActiveHoverId(null)}
              className={`border rounded-2xl p-5 space-y-3 cursor-pointer transition-all duration-150 relative overflow-hidden ${
                activeHoverId === layer.id 
                  ? 'border-[#0071E3] bg-[#0071E3]/5 shadow-sm scale-102' 
                  : 'border-[#D2D2D7]/50 bg-white'
              }`}
            >
              {/* Highlight Overlay representing the actual state layer */}
              <div className={`absolute inset-0 pointer-events-none transition-opacity ${layer.color} ${
                activeHoverId === layer.id ? 'opacity-100' : 'opacity-20'
              }`} />

              <div className="flex justify-between items-center relative z-10">
                <span className="text-xs font-bold text-[#1D1D1F]">{layer.name}</span>
                <span className="font-mono text-[11px] font-bold text-[#0071E3] bg-[#0071E3]/5 px-2 py-0.5 rounded-full">
                  +{layer.percentage} Opacity
                </span>
              </div>
              <p className="text-[11px] text-[#86868B] leading-relaxed relative z-10">
                {layer.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Embedded CSS custom dynamic keyframe rule in markdown-friendly React style */}
      <style>{`
        @keyframes moveRight {
          0% { left: 5%; }
          100% { left: 90%; }
        }
      `}</style>

    </div>
  );
}
