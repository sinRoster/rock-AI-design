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
import RockAiFoundationsSection from './components/RockAiFoundationsSection';
import { Menu, X, CheckSquare, Award, BookOpen, AlertTriangle } from 'lucide-react';

export default function App() {
  const [currentMode, setMode] = useState<ModeType>('principles');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#F5F5F7] text-[#1D1D1F] font-sans">
      
      {/* MOBILE HEADER (Translucent macOS Glass style) */}
      <header className="md:hidden bg-white/85 backdrop-blur-md text-[#1D1D1F] p-4 border-b border-[#D2D2D7]/50 flex items-center justify-between z-40 sticky top-0">
        <div className="flex flex-col">
          <span className="text-[10px] font-semibold tracking-wider text-[#86868B] uppercase">Rock-ai Systems</span>
          <h1 className="text-sm font-bold text-[#1D1D1F] tracking-tight font-sans">HUMAN INTERFACE GUIDE</h1>
        </div>
        
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 hover:bg-[#E8E8ED] rounded-lg transition-colors"
          title="切换菜单"
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-[#1D1D1F]" /> : <Menu className="w-5 h-5 text-[#1D1D1F]" />}
        </button>
      </header>

      {/* MOBILE OVERLAY MENU (Expands downwards with HIG style) */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[53px] bg-white/95 backdrop-blur-xl z-30 flex flex-col p-6 animate-fade-in divide-y divide-[#D2D2D7]/50">
          <div className="py-4 space-y-3">
            <p className="text-[10px] font-semibold text-[#86868B] uppercase tracking-wider">
              System Modules
            </p>
            <div className="grid grid-cols-1 gap-1.5">
              {[
                { id: 'principles' as ModeType, label: '1. 设计原则 (Principles)' },
                { id: 'tokens' as ModeType, label: '2. 设计令牌 (Design Tokens)' },
                { id: 'components' as ModeType, label: '3. 基础组件 (Components)' },
                { id: 'layouts' as ModeType, label: '4. 布局模式 (Layout Patterns)' },
                { id: 'interaction' as ModeType, label: '5. 交互模式 (Interactions)' },
                { id: 'content' as ModeType, label: '6. 内容指南 (Content Guidelines)' },
                { id: 'accessibility' as ModeType, label: '7. 无障碍 (Accessibility)' },
                { id: 'tooling' as ModeType, label: '8. 工具链 (Tooling / MD)' },
                { id: 'rockaifoundations' as ModeType, label: '9. Rock-AI 基石 (Rock-AI Foundations)' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setMode(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full py-3 px-4 text-left text-sm font-medium rounded-lg transition-all ${
                    currentMode === item.id 
                      ? 'bg-[#0071E3] text-white font-semibold' 
                      : 'text-[#1D1D1F]/80 hover:bg-[#E8E8ED]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick System integrity checks */}
          <div className="py-6 space-y-3">
            <span className="text-[10px] font-semibold text-[#86868B] block uppercase tracking-wider">System Runtime</span>
            <div className="flex justify-between items-center text-xs text-[#86868B] font-mono">
              <span>STATUS: ADAPTIVE RUNNING</span>
              <span className="text-[#34C759] font-bold">● ONLINE</span>
            </div>
          </div>
        </div>
      )}

      {/* DESKTOP SIDEBAR (Mode Manager) */}
      <Sidebar currentMode={currentMode} setMode={setMode} />

      {/* MAIN VIEWPORT */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-w-7xl mx-auto w-full space-y-8">
        
        {/* Dynamic header title block based on mode */}
        <div className="border-b border-[#D2D2D7]/50 pb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#86868B] text-xs font-sans mb-2">
              <span className="tracking-wider uppercase text-[10px] font-semibold">Human Interface Companion</span>
              <span>/</span>
              <span className="text-[#0071E3] font-bold uppercase tracking-wider bg-[#0071E3]/8 px-2.5 py-0.5 rounded-full text-[9px]">{currentMode}</span>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-[#1D1D1F] tracking-tight font-sans">
              {currentMode === 'principles' && <>1. 核心原则与 <span className="text-[#0071E3]">操作优先级</span></>}
              {currentMode === 'tokens' && <>2. 全局设计标记：<span className="text-[#0071E3]">色彩、排版、间距与圆角</span></>}
              {currentMode === 'components' && <>3. 基础组件 <span className="text-[#0071E3]">沙盒 Playground</span></>}
              {currentMode === 'layouts' && <>4. 自适应布局与 <span className="text-[#0071E3]">2D 雷达地图仿真</span></>}
              {currentMode === 'interaction' && <>5. 交互动力学：<span className="text-[#0071E3]">阻尼、曲线与状态图层</span></>}
              {currentMode === 'content' && <>6. 内容指南：<span className="text-[#0071E3]">文案语气与急停规范</span></>}
              {currentMode === 'accessibility' && <>7. 无障碍性：<span className="text-[#0071E3]">对比度计算与键盘聚焦</span></>}
              {currentMode === 'tooling' && <>8. 辅助工具链：<span className="text-[#0071E3]">MD 一键渲染与 Figma 资产</span></>}
            </h2>
            <p className="text-xs text-[#86868B] mt-2 leading-relaxed max-w-2xl font-sans">
              {currentMode === 'principles' && '分析工业自动驾驶调度法则与 Google 消费者生态规范的不同物理侧重与哲学对齐。'}
              {currentMode === 'tokens' && '深度解析和测试 Roboto 压缩字体、标志尺寸配比以及向下向右推动的单向间距传递。'}
              {currentMode === 'components' && '在此调配测试高对比度按钮、像素对齐 SVG 以及创新的按需重命名文本框。'}
              {currentMode === 'layouts' && '体验真正的 2D 现场卡车雷达平移，比对固定侧栏数据展示与移动浮动目标。'}
              {currentMode === 'interaction' && '体验 Rock-AI 标准微动、阻尼回弹控制以及不透明状态图层在工业震动平板上的防误触标定。'}
              {currentMode === 'content' && '学习如何在秒级响应工业调度场景中提炼不含糊、命令式的急停、告警语调与专用术语哈希校验。'}
              {currentMode === 'accessibility' && '核查色彩相对亮度对比，测试键盘 Tab 状态引导双圈线，仿真视力缺陷辅助阅读旁白。'}
              {currentMode === 'tooling' && '在这里将你任意的 Markdown 文本实时转化为 Rock-AI 设计系统风格的自适应网页，并支持导出配置。'}
            </p>
          </div>

          {/* Design integrity Badge */}
          <div className="bg-white border border-[#D2D2D7]/50 px-5 py-3 rounded-2xl shadow-sm flex items-center gap-4 shrink-0">
            <Award className="w-5 h-5 text-[#0071E3] shrink-0" />
            <div className="flex flex-col">
              <span className="text-[9px] font-semibold text-[#86868B] leading-none tracking-wider uppercase">ROCK-AI COMPLIANT</span>
              <span className="text-xs font-bold text-[#1D1D1F] mt-1.5 font-sans">Apple HIG Style Verified</span>
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
          {currentMode === 'rockaifoundations' && <RockAiFoundationsSection />}
        </div>

      </main>
    </div>
  );
}
