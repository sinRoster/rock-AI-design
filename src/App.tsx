import React, { useState } from 'react';
import { ModeType } from './types';
import Sidebar from './components/Sidebar';
import PrinciplesSection from './components/PrinciplesSection';
import BrandTokensSection from './components/BrandTokensSection';
import ComponentsSandbox from './components/ComponentsSandbox';
import LayoutSimulator from './components/LayoutSimulator';
import InteractionPatternsSection from './components/InteractionPatternsSection';
import ContentGuidelinesSection from './components/ContentGuidelinesSection';
import AccessibilitySection from './components/AccessibilitySection';
import MarkdownWorkspace from './components/MarkdownWorkspace';
import { Menu, X, CheckSquare, Award, BookOpen, AlertTriangle } from 'lucide-react';

export default function App() {
  const [currentMode, setMode] = useState<ModeType>('principles');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Self-Assessment Checklist state for compliance score
  const [checklist, setChecklist] = useState({
    rule1: true,   // 2px stroke vectors
    rule2: false,  // On-demand inputs
    rule3: true,   // No 3D map
    rule4: false,  // Down & Right margin stack
    rule5: true,   // High contrast alert colors
    rule6: false,  // Docked map panels (no float OOUI)
  });

  const handleToggleCheck = (key: keyof typeof checklist) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const calculateScore = () => {
    const total = Object.keys(checklist).length;
    const checked = Object.values(checklist).filter(Boolean).length;
    return Math.round((checked / total) * 100);
  };

  const getComplianceVerdict = (score: number) => {
    if (score === 100) return { label: '完美合规 (Level 8.0 Secure)', color: 'text-m3-primary bg-m3-light-purple border-m3-primary/30' };
    if (score >= 60) return { label: '基本合格 (Industrial Stable)', color: 'text-amber-800 bg-amber-50 border-amber-200' };
    return { label: '不符规范 (Warning!)', color: 'text-red-800 bg-red-50 border-red-200' };
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-m3-surface text-m3-on-surface font-sans">
      
      {/* MOBILE HEADER (Mode menu overlays on mobile, expands on tablet) */}
      <header className="md:hidden bg-m3-primary text-white p-4 border-b border-m3-primary/20 flex items-center justify-between z-40">
        <div className="flex flex-col">
          <span className="text-[10px] font-mono font-bold tracking-widest text-m3-light-purple">ROCK-AI DESIGN</span>
          <h1 className="text-sm font-bold text-white tracking-tight font-serif italic">MOBIUS COMPANION</h1>
        </div>
        
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 hover:bg-m3-primary/80 rounded transition-colors"
          title="切换菜单"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* MOBILE OVERLAY MENU (Expands downwards) */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[60px] bg-m3-surface/95 z-30 flex flex-col p-6 animate-fade-in divide-y divide-m3-outline/20">
          <div className="py-4 space-y-3">
            <p className="text-[10px] font-mono font-bold text-m3-outline uppercase tracking-widest">
              切换设计系统模块
            </p>
            <div className="grid grid-cols-1 gap-2">
              {[
                { id: 'principles' as ModeType, label: '1. 设计原则 (Principles)' },
                { id: 'tokens' as ModeType, label: '2. 设计令牌 (Design Tokens)' },
                { id: 'components' as ModeType, label: '3. 基础组件 (Components)' },
                { id: 'layouts' as ModeType, label: '4. 布局模式 (Layout Patterns)' },
                { id: 'interaction' as ModeType, label: '5. 交互模式 (Interactions)' },
                { id: 'content' as ModeType, label: '6. 内容指南 (Content Guidelines)' },
                { id: 'accessibility' as ModeType, label: '7. 无障碍 (Accessibility)' },
                { id: 'tooling' as ModeType, label: '8. 工具链 (Tooling / MD)' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setMode(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full py-3.5 px-4 text-left text-sm font-bold rounded-xl transition-all ${
                    currentMode === item.id 
                      ? 'bg-m3-primary text-white shadow-lg' 
                      : 'text-m3-on-surface/80 hover:bg-m3-secondary-container/50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick System integrity checks */}
          <div className="py-6 space-y-3">
            <span className="text-[10px] font-mono font-bold text-m3-outline block uppercase">SYSTEM RUNTIME</span>
            <div className="flex justify-between items-center text-xs text-m3-outline font-mono">
              <span>STATUS: LIVE</span>
              <span className="text-emerald-600 font-bold">● ONLINE</span>
            </div>
          </div>
        </div>
      )}

      {/* DESKTOP SIDEBAR (Mode Manager) */}
      <Sidebar currentMode={currentMode} setMode={setMode} />

      {/* MAIN VIEWPORT */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-w-7xl mx-auto w-full space-y-8">
        
        {/* Dynamic header title block based on mode */}
        <div className="border-b border-m3-outline/20 pb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-m3-outline text-xs font-mono mb-2">
              <span className="tracking-widest uppercase">DESIGN SYSTEM COMPANION</span>
              <span>/</span>
              <span className="text-m3-primary font-bold uppercase tracking-widest bg-m3-secondary-container px-2.5 py-0.5 rounded-full text-[10px]">{currentMode}</span>
            </div>
            
            <h2 className="text-3xl font-bold text-m3-on-surface tracking-tight font-serif">
              {currentMode === 'principles' && <>1. 核心原则与 <span className="italic text-m3-primary font-serif">操作优先级</span></>}
              {currentMode === 'tokens' && <>2. 全局设计标记：<span className="italic text-m3-primary font-serif">色彩、排版、间距与圆角</span></>}
              {currentMode === 'components' && <>3. 基础组件 <span className="italic text-m3-primary font-serif">沙盒 Sandbox</span></>}
              {currentMode === 'layouts' && <>4. 自适应布局与 <span className="italic text-m3-primary font-serif">2D 雷达地图仿真</span></>}
              {currentMode === 'interaction' && <>5. 交互动力学：<span className="italic text-m3-primary font-serif">阻尼、曲线与状态图层</span></>}
              {currentMode === 'content' && <>6. 内容指南：<span className="italic text-m3-primary font-serif">文案语气与急停规范</span></>}
              {currentMode === 'accessibility' && <>7. 无障碍性：<span className="italic text-m3-primary font-serif">对比度计算与键盘聚焦</span></>}
              {currentMode === 'tooling' && <>8. 辅助工具链：<span className="italic text-m3-primary font-serif">MD 一键渲染与 Figma 资产</span></>}
            </h2>
            <p className="text-xs text-m3-outline mt-2 leading-relaxed max-w-2xl">
              {currentMode === 'principles' && '分析工业自动驾驶调度法则与 Google 消费者生态规范的不同物理侧重与哲学对齐。'}
              {currentMode === 'tokens' && '深度解析和测试 Roboto 压缩字体、标志尺寸配比以及向下向右推动的单向间距传递。'}
              {currentMode === 'components' && '在此调配测试高对比度按钮、像素对齐 SVG 以及创新的按需重命名文本框。'}
              {currentMode === 'layouts' && '体验真正的 2D 现场卡车雷达平移，比对固定侧栏数据展示与移动浮动目标。'}
              {currentMode === 'interaction' && '体验 M3 标准微动、阻尼回弹控制以及不透明状态图层在工业震动平板上的防误触标定。'}
              {currentMode === 'content' && '学习如何在秒级响应工业调度场景中提炼不含糊、命令式的急停、告警语调与专用术语哈希校验。'}
              {currentMode === 'accessibility' && '核查色彩相对亮度对比，测试键盘 Tab 状态引导双圈线，仿真视力缺陷辅助阅读旁白。'}
              {currentMode === 'tooling' && '在这里将你任意的 Markdown 文本实时转化为 Material 3 设计系统风格的自适应网页，并支持导出配置。'}
            </p>
          </div>

          {/* Design integrity Badge */}
          <div className="bg-white border border-m3-outline/25 px-5 py-3 rounded-[24px] shadow-sm flex items-center gap-4 shrink-0">
            <Award className="w-5 h-5 text-m3-primary shrink-0" />
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-m3-outline font-bold leading-none tracking-widest">ROAK V8 COMPLIANCE</span>
              <span className="text-xs font-bold text-m3-on-surface mt-1.5 font-serif italic">Mobius Standards Approved</span>
            </div>
          </div>
        </div>

        {/* ACTIVE SECTION CONTENT */}
        <div className="min-h-[460px]">
          {currentMode === 'principles' && <PrinciplesSection />}
          {currentMode === 'tokens' && <BrandTokensSection />}
          {currentMode === 'components' && <ComponentsSandbox />}
          {currentMode === 'layouts' && <LayoutSimulator />}
          {currentMode === 'interaction' && <InteractionPatternsSection />}
          {currentMode === 'content' && <ContentGuidelinesSection />}
          {currentMode === 'accessibility' && <AccessibilitySection />}
          {currentMode === 'tooling' && <MarkdownWorkspace />}
        </div>

        {/* BOTTOM UTILITY PANEL: Interactive Compliance Evaluator */}
        <section id="compliance-checklist" className="bg-white border border-m3-outline/20 rounded-[28px] p-8 shadow-[0_4px_16px_rgba(103,80,164,0.04)] space-y-5 mt-12">
          <div className="flex items-center gap-2.5 border-b border-m3-outline/10 pb-4">
            <CheckSquare className="w-5 h-5 text-m3-primary" />
            <h3 className="text-lg font-bold text-m3-on-surface font-serif">
              ROAK-AI 设计合规自测计分板 <span className="italic text-m3-primary font-serif">(Compliance Evaluator)</span>
            </h3>
          </div>
          
          <p className="text-xs text-m3-outline leading-relaxed max-w-2xl">
            在构建符合 MOBIUS V8.0 标准的工业交互系统时，请通过以下关键指标核验您的 UI 实现，系统将实时评定合规等级。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {[
              { key: 'rule1', label: '矢量 SVG 图标对齐至像素网格，采用 2px 笔刷' },
              { key: 'rule2', label: '静态指标标题使用 [On-Demand Inputs] 按需变轨编辑' },
              { key: 'rule3', label: '摒弃复杂的 3D 渲染，地图环境完全锁定为 2D 正交透视' },
              { key: 'rule4', label: '内边距与外边距统一向下、向右单向传递堆叠' },
              { key: 'rule5', label: '车辆报警、安全关键信息使用绝对反差色进行加权警示' },
              { key: 'rule6', label: '地图交互详情强制停靠于侧边/底部，不随资产移动浮动' }
            ].map((rule) => {
              const ruleKey = rule.key as keyof typeof checklist;
              return (
                <label
                  key={rule.key}
                  className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer select-none transition-all duration-150 ${
                    checklist[ruleKey] 
                      ? 'bg-m3-secondary-container/30 border-m3-primary text-m3-on-surface shadow-[0_2px_8px_rgba(103,80,164,0.05)]' 
                      : 'bg-white border-m3-outline/20 text-m3-outline hover:bg-m3-muted-surface/40'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checklist[ruleKey]}
                    onChange={() => handleToggleCheck(ruleKey)}
                    className="mt-0.5 rounded border-m3-outline text-m3-primary focus:ring-m3-primary cursor-pointer w-4 h-4"
                  />
                  <span className="text-xs leading-relaxed font-medium">{rule.label}</span>
                </label>
              );
            })}
          </div>

          {/* Compliance Result Box */}
          <div className="pt-5 border-t border-m3-outline/10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="text-center bg-m3-primary text-white py-3 px-4 rounded-[20px] font-mono shrink-0 shadow-sm">
                <span className="text-[10px] text-m3-light-purple block leading-none font-bold tracking-wider">SCORE</span>
                <span className="text-2xl font-extrabold block mt-1.5 font-sans">{calculateScore()}%</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-m3-outline font-bold block uppercase leading-none tracking-widest">合规判定结果 (Verdict)</span>
                <span className={`text-xs font-bold inline-block px-3 py-1.5 rounded-full border mt-2 ${getComplianceVerdict(calculateScore()).color}`}>
                  {getComplianceVerdict(calculateScore()).label}
                </span>
              </div>
            </div>

            <div className="text-xs text-m3-outline leading-relaxed max-w-md">
              <span className="text-m3-primary font-semibold">小提示：</span>
              工业自动驾驶与高负荷现场对系统合规要求极度严格，100% 的合规能大幅压缩事故冗余度，降低调度员误操作机率。
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
