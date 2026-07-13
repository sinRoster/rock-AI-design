import React, { useState, useEffect } from 'react';
import { 
  Accessibility, Keyboard, Eye, EyeOff, Check, X, 
  HelpCircle, Sparkles, Volume2, Info, Moon
} from 'lucide-react';

export default function AccessibilitySection() {
  // WCAG Color Contrast Calculator States
  const [fgColor, setFgColor] = useState('#0071E3'); // Apple Blue
  const [bgColor, setBgColor] = useState('#F5F5F7'); // Apple Light Gray
  const [contrastRatio, setContrastRatio] = useState<number>(4.5);
  
  // Keyboard Simulation focus index
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  // Screen reader interactive element selection
  const [selectedScreenReaderEl, setSelectedScreenReaderEl] = useState<'estop' | 'speed' | 'status'>('estop');

  // Convert Hex to RGB helper
  const hexToRgb = (hex: string): [number, number, number] | null => {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    const fullHex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
    return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
    ] : null;
  };

  // Calculate relative luminance for WCAG formulas
  const getRelativeLuminance = (r: number, g: number, b: number): number => {
    const sRGB = [r, g, b].map(v => {
      let val = v / 255;
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    });
    return sRGB[0] * 0.2126 + sRGB[1] * 0.7152 + sRGB[2] * 0.0722;
  };

  // Run calculation when colors change
  useEffect(() => {
    const rgbFg = hexToRgb(fgColor);
    const rgbBg = hexToRgb(bgColor);

    if (rgbFg && rgbBg) {
      const lumFg = getRelativeLuminance(...rgbFg);
      const lumBg = getRelativeLuminance(...rgbBg);
      const brightest = Math.max(lumFg, lumBg);
      const darkest = Math.min(lumFg, lumBg);
      const ratio = (brightest + 0.05) / (darkest + 0.05);
      setContrastRatio(Math.round(ratio * 100) / 100);
    }
  }, [fgColor, bgColor]);

  // Accessibility verdict
  const aaNormalText = contrastRatio >= 4.5;
  const aaLargeText = contrastRatio >= 3.0;
  const aaaNormalText = contrastRatio >= 7.0;
  const aaaLargeText = contrastRatio >= 4.5;

  return (
    <div className="space-y-8 animate-fade-in" id="accessibility-section">
      
      {/* Intro section banner */}
      <div className="bg-[#1D1D1F] border border-[#D2D2D7]/30 rounded-2xl p-6 text-[#F5F5F7] space-y-3 shadow-sm">
        <div className="flex items-center gap-2">
          <Accessibility className="w-5 h-5 text-[#0071E3] shrink-0" />
          <h4 className="text-xs font-semibold uppercase tracking-tight text-[#86868B] font-sans">
            ROCK-AI & APPLE HIG 无障碍、包容性与极端视感标准 (Accessibility)
          </h4>
        </div>
        <p className="text-xs text-[#86868B] leading-relaxed font-sans">
          在高光眩光、严重沙尘或夜间红外夜视条件下，设计良好的无障碍属性不仅仅是社会责任，更是避免由于视疲劳而酿成灾难性人身意外的直接技术安全屏障。
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* INTERACTIVE CONTRAST CALCULATOR */}
        <div className="bg-white border border-[#D2D2D7]/50 rounded-2xl p-6 shadow-sm space-y-6 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-[#D2D2D7]/30 pb-3 font-sans">
              <span className="text-[10px] font-bold text-[#0071E3] bg-[#0071E3]/10 px-2.5 py-0.5 rounded-full">TOOL 01</span>
              <h4 className="text-sm font-bold text-[#1D1D1F]">WCAG 2.1 物理对比度计算器</h4>
            </div>
            <p className="text-xs text-[#86868B] leading-relaxed font-sans">
              输入或选择前景色 (文字) 和背景色，系统使用相对亮度 (Relative Luminance) 实时计算对比系数，判别 WCAG 标准。
            </p>
          </div>

          {/* Color pickers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#F5F5F7] p-4 rounded-xl border border-[#D2D2D7]/30 font-sans">
            <div className="space-y-2">
              <label className="text-[10px] font-semibold text-[#1D1D1F] block uppercase tracking-tight">前景色 / 文字 (Foreground)</label>
              <div className="flex gap-2">
                <input 
                  type="color" 
                  value={fgColor} 
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-8 h-8 rounded-lg border border-zinc-300 cursor-pointer p-0"
                />
                <input
                  type="text"
                  maxLength={7}
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-full text-xs font-mono px-3 py-1.5 border border-[#D2D2D7]/40 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0071E3] bg-white uppercase"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-semibold text-[#1D1D1F] block uppercase tracking-tight">背景色 (Background)</label>
              <div className="flex gap-2">
                <input 
                  type="color" 
                  value={bgColor} 
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-8 h-8 rounded-lg border border-zinc-300 cursor-pointer p-0"
                />
                <input
                  type="text"
                  maxLength={7}
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-full text-xs font-mono px-3 py-1.5 border border-[#D2D2D7]/40 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0071E3] bg-white uppercase"
                />
              </div>
            </div>
          </div>

          {/* Dynamic Render Sandbox */}
          <div 
            className="rounded-xl p-6 h-36 flex flex-col justify-between items-center relative overflow-hidden transition-all duration-150 border border-[#D2D2D7]/40 shadow-inner"
            style={{ backgroundColor: bgColor }}
          >
            <span className="text-[9px] font-mono opacity-40 absolute top-2 right-4">LIVE RENDER PREVIEW</span>
            <div className="text-center my-auto space-y-1">
              <p className="text-base font-extrabold font-mono" style={{ color: fgColor }}>
                ROCK-AI_ALRT (14pt 常规文字)
              </p>
              <p className="text-2xl font-bold font-sans tracking-tight" style={{ color: fgColor }}>
                2D RADAR TRACK (24pt 大字号)
              </p>
            </div>
            <span className="text-[10px] font-mono opacity-50" style={{ color: fgColor }}>
              背景: {bgColor.toUpperCase()} / 文字: {fgColor.toUpperCase()}
            </span>
          </div>

          {/* Compliance Checklist and Contrast Score */}
          <div className="flex flex-col sm:flex-row items-stretch justify-between gap-4 border-t border-[#D2D2D7]/30 pt-4 font-sans">
            {/* Big Score Box */}
            <div className="bg-[#1D1D1F] text-white py-4 px-6 rounded-2xl text-center shrink-0 border border-[#D2D2D7]/30 flex flex-col justify-center min-w-[120px]">
              <span className="text-[9px] font-semibold text-[#86868B] block leading-none uppercase tracking-tight">Contrast Ratio</span>
              <span className="text-3xl font-bold block mt-2 font-mono text-[#0071E3]">{contrastRatio}:1</span>
              <span className="text-[9px] text-[#86868B] mt-1 font-semibold">
                {contrastRatio >= 4.5 ? '✅ AA 符合' : '⚠️ 低于最低标准'}
              </span>
            </div>

            {/* WCAG checklist table */}
            <div className="flex-1 grid grid-cols-2 gap-3 text-xs">
              <div className={`p-3 rounded-xl border flex flex-col justify-between ${aaNormalText ? 'border-emerald-500/20 bg-emerald-50/20 text-emerald-900' : 'border-red-500/20 bg-red-50/20 text-red-900'}`}>
                <span className="font-mono text-[9px] block">AA 常规文本 (4.5:1)</span>
                <span className="font-bold flex items-center gap-1.5 mt-2">
                  {aaNormalText ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                  {aaNormalText ? 'AA Pass' : 'AA Fail'}
                </span>
              </div>

              <div className={`p-3 rounded-xl border flex flex-col justify-between ${aaLargeText ? 'border-emerald-500/20 bg-emerald-50/20 text-emerald-900' : 'border-red-500/20 bg-red-50/20 text-red-900'}`}>
                <span className="font-mono text-[9px] block">AA 大号文本 (3.0:1)</span>
                <span className="font-bold flex items-center gap-1.5 mt-2">
                  {aaLargeText ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                  {aaLargeText ? 'AA Pass' : 'AA Fail'}
                </span>
              </div>

              <div className={`p-3 rounded-xl border flex flex-col justify-between ${aaaNormalText ? 'border-emerald-500/20 bg-emerald-50/20 text-emerald-900' : 'border-red-500/20 bg-red-50/20 text-red-900'}`}>
                <span className="font-mono text-[9px] block">AAA 常规文本 (7.0:1)</span>
                <span className="font-bold flex items-center gap-1.5 mt-2">
                  {aaaNormalText ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                  {aaaNormalText ? 'AAA Pass' : 'AAA Fail'}
                </span>
              </div>

              <div className={`p-3 rounded-xl border flex flex-col justify-between ${aaaLargeText ? 'border-emerald-500/20 bg-emerald-50/20 text-emerald-900' : 'border-red-500/20 bg-red-50/20 text-red-900'}`}>
                <span className="font-mono text-[9px] block">AAA 大号文本 (4.5:1)</span>
                <span className="font-bold flex items-center gap-1.5 mt-2">
                  {aaaLargeText ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                  {aaaLargeText ? 'AAA Pass' : 'AAA Fail'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* KEYBOARD NAVIGATION INTERACTIVE PANEL */}
        <div className="bg-white border border-[#D2D2D7]/50 rounded-2xl p-6 shadow-sm space-y-6 flex flex-col justify-between">
          <div className="space-y-3 font-sans">
            <div className="flex items-center gap-2 border-b border-[#D2D2D7]/30 pb-3">
              <span className="text-[10px] font-bold text-[#0071E3] bg-[#0071E3]/10 px-2.5 py-0.5 rounded-full">PLAYGROUND 02</span>
              <h4 className="text-sm font-bold text-[#1D1D1F]">无障碍键盘导航与焦点环环线</h4>
            </div>
            <p className="text-xs text-[#86868B] leading-relaxed">
              在重度高负荷现场，鼠标损坏时调度员必须依靠键盘 TAB 键极速寻焦。Apple HIG 与 Rock-ai 规定，焦圈环必须使用双层高反差边框。点击模拟键位，观察焦点环的轮廓响应：
            </p>
          </div>

          {/* Interactive buttons simulating keyboard tab */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#F5F5F7] p-4 rounded-xl border border-[#D2D2D7]/30">
            {[
              { id: 0, label: '按钮 A: 航道核对 (Route Check)', desc: '普通功能键' },
              { id: 1, label: '按钮 B: 二维标定 (Radar Cal)', desc: '标定核心功能' },
              { id: 2, label: '按钮 C: 紧急避险 (EMG ESTOP)', desc: '高危触发器' }
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setFocusedIndex(btn.id)}
                className={`p-4 text-left rounded-xl border bg-white transition-all cursor-pointer relative ${
                  focusedIndex === btn.id 
                    ? 'ring-2 ring-[#0071E3] ring-offset-2 border-[#0071E3] shadow-sm' 
                    : 'border-[#D2D2D7]/40 text-[#1D1D1F]/80 hover:bg-[#0071E3]/5'
                }`}
              >
                {/* Visual focus indicator details */}
                {focusedIndex === btn.id && (
                  <span className="absolute -inset-1.5 border-1 border-dashed border-[#0071E3]/60 rounded-2xl pointer-events-none" />
                )}
                
                <span className="text-[11px] font-extrabold block font-sans">{btn.label}</span>
                <span className="text-[9px] text-[#86868B] block mt-1 leading-normal font-sans">{btn.desc}</span>
                
                {focusedIndex === btn.id && (
                  <span className="text-[8px] font-mono font-bold text-[#0071E3] block mt-2 animate-pulse">
                    FOCUS ACTIVE (Tab Order: {btn.id + 1})
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="flex gap-2 font-sans">
            <button
              onClick={() => {
                const next = focusedIndex === null ? 0 : (focusedIndex + 1) % 3;
                setFocusedIndex(next);
              }}
              className="flex-1 py-2 px-3 text-center bg-[#0071E3] text-white font-semibold text-xs rounded-xl cursor-pointer hover:bg-[#0071E3]/90 transition-all"
            >
              模拟按下 [TAB] 键切换焦点
            </button>
            <button
              onClick={() => setFocusedIndex(null)}
              className="py-2 px-4 border border-[#D2D2D7]/50 text-xs font-semibold rounded-xl text-[#86868B] hover:bg-[#F5F5F7] cursor-pointer transition-all"
            >
              清除焦点 (Reset)
            </button>
          </div>

          <div className="bg-[#F5F5F7] p-4 rounded-xl border border-[#D2D2D7]/30 text-[11px] text-[#86868B] leading-relaxed flex items-start gap-2.5 font-sans">
            <Keyboard className="w-5 h-5 text-[#0071E3] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#1D1D1F] block mb-1">ROCK-AI 无障碍焦点双重轨线：</span>
              在聚焦状态下，系统除了提供高饱和度的主色描边外，还会在其外侧加上 2dp 的虚线引导带，确保即使对红绿色盲患者也能一眼区分哪个组件正处于活跃编辑状态。
            </div>
          </div>
        </div>

      </div>

      {/* ARIA SCREEN READER SOUND/NARRATOR EXPLORER */}
      <div className="bg-white border border-[#D2D2D7]/50 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="border-b border-[#D2D2D7]/30 pb-3 space-y-1.5 font-sans">
          <h4 className="text-sm font-bold text-[#1D1D1F]">ARIA 属性与屏幕阅读器旁白映射 (Screen Reader Simulator)</h4>
          <p className="text-xs text-[#86868B]">
            对于具有视力障碍的辅助驾驶人员，高完整度的 `aria-label` 与 `role` 是他们感知软件维度的唯一途径。在下方选择组件查看拟真的视听旁白映射：
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              id: 'estop' as const,
              label: '🚨 紧急急停按钮 (Estop Trigger)',
              aria: {
                role: 'button',
                label: '紧急制动控制钮，警告：双击将导致车辆锁定。',
                live: 'assertive (高优先级中断)',
                status: '未触发'
              },
              code: '<button role="button" aria-label="紧急制动控制钮，警告：双击将导致车辆锁定。" aria-live="assertive" />'
            },
            {
              id: 'speed' as const,
              label: '📉 车速实时显示仪 (Speed Meter)',
              aria: {
                role: 'status',
                label: '卡卡03当前运行车速：每小时二十五公里。',
                live: 'polite (温和排队播报)',
                status: '运行中 [25km/h]'
              },
              code: '<div role="status" aria-live="polite" aria-label="卡卡03当前运行车速：每小时二十五公里" />'
            },
            {
              id: 'status' as const,
              label: '🔋 锂电池充电机 (Battery Unit)',
              aria: {
                role: 'progressbar',
                label: '锂电组一号充电状态，当前电量百分子八十。',
                live: 'off (仅在查询时播报)',
                status: '正常充电中 [80%]'
              },
              code: '<div role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" />'
            }
          ].map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedScreenReaderEl(item.id)}
              className={`border rounded-2xl p-5 space-y-4 cursor-pointer transition-all ${
                selectedScreenReaderEl === item.id 
                  ? 'border-[#0071E3] bg-[#0071E3]/5 shadow-sm' 
                  : 'border-[#D2D2D7]/50 bg-white hover:bg-[#F5F5F7]'
              }`}
            >
              <h5 className="text-xs font-bold text-[#1D1D1F] font-sans">{item.label}</h5>
              
              <div className="space-y-2 bg-[#1D1D1F] text-[#86868B] rounded-xl p-4 font-mono text-[11px] border border-[#D2D2D7]/30">
                <div className="flex justify-between border-b border-[#D2D2D7]/20 pb-1.5 text-[9px] text-[#86868B] font-sans font-semibold">
                  <span>SCREEN READER NARRATIVE</span>
                  <Volume2 className="w-3.5 h-3.5 text-[#0071E3]" />
                </div>
                <div className="text-white font-sans text-xs italic leading-relaxed py-1.5">
                  “ {item.aria.label} ”
                </div>
                <div className="pt-1.5 border-t border-[#D2D2D7]/20 flex justify-between text-[9px] text-[#86868B] font-sans">
                  <span>ROLE: <strong className="text-[#0071E3] font-semibold">{item.aria.role}</strong></span>
                  <span>LIVE: {item.aria.live}</span>
                </div>
              </div>

              <div className="space-y-1.5 font-sans">
                <span className="text-[9px] font-semibold text-[#86868B] uppercase block">HTML 无障碍语义标记 (ARIA HTML)</span>
                <pre className="text-[9px] font-mono text-[#0071E3] bg-[#0071E3]/5 px-2 py-1.5 rounded border border-[#0071E3]/10 overflow-x-auto whitespace-pre">
                  {item.code}
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
