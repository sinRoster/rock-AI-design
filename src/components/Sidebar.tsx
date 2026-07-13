import React from 'react';
import { ModeType } from '../types';
import { ShieldAlert, Sparkles, Layout, Layers, Activity, BookOpen, Accessibility, FileCode, Palette } from 'lucide-react';

interface SidebarProps {
  currentMode: ModeType;
  setMode: (mode: ModeType) => void;
}

export default function Sidebar({ currentMode, setMode }: SidebarProps) {
  const menuItems = [
    {
      id: 'principles' as ModeType,
      label: '1. 设计原则 (Principles)',
      subLabel: 'Rock-ai Core Philosophy',
      icon: ShieldAlert,
      iconBg: 'bg-[#FF9500]', // Apple System Orange
    },
    {
      id: 'tokens' as ModeType,
      label: '2. 设计令牌 (Tokens)',
      subLabel: 'Sleek Typography & Variables',
      icon: Layers,
      iconBg: 'bg-[#007AFF]', // Apple System Blue
    },
    {
      id: 'components' as ModeType,
      label: '3. 基础组件 (Components)',
      subLabel: 'Rock-ai Native Sandboxes',
      icon: Sparkles,
      iconBg: 'bg-[#5856D6]', // Apple System Purple
    },
    {
      id: 'layouts' as ModeType,
      label: '4. 布局模式 (Layout Patterns)',
      subLabel: 'Responsive Multi-Device Shells',
      icon: Layout,
      iconBg: 'bg-[#30B0C7]', // Apple System Teal
    },
    {
      id: 'interaction' as ModeType,
      label: '5. 交互模式 (Interactions)',
      subLabel: 'Fluid Damping & Spring Physics',
      icon: Activity,
      iconBg: 'bg-[#FF2D55]', // Apple System Pink
    },
    {
      id: 'content' as ModeType,
      label: '6. 内容指南 (Content Guidelines)',
      subLabel: 'Clear Professional Tone Guides',
      icon: BookOpen,
      iconBg: 'bg-[#34C759]', // Apple System Green
    },
    {
      id: 'accessibility' as ModeType,
      label: '7. 无障碍 (Accessibility)',
      subLabel: 'WCAG Contrast Ratio Engine',
      icon: Accessibility,
      iconBg: 'bg-[#AF52DE]', // Apple System Indigo
    },
    {
      id: 'tooling' as ModeType,
      label: '8. 工具链 (Tooling)',
      subLabel: 'Rock-ai Specification Workspace',
      icon: FileCode,
      iconBg: 'bg-[#8E8E93]', // Apple System Gray
    },
    {
      id: 'rockaifoundations' as ModeType,
      label: '9. Rock-AI 基石 (Rock-AI Foundations)',
      subLabel: 'Rock-AI Design Foundations Suite',
      icon: Palette,
      iconBg: 'bg-[#30B0C7]', // Apple System Teal
    },
  ];

  return (
    <div 
      id="apple-sidebar"
      className="w-full md:w-80 bg-[#F5F5F7] text-[#1D1D1F] flex flex-col border-r border-[#D2D2D7]/50 md:h-screen shrink-0"
    >
      {/* Apple Sidebar Header */}
      <div className="p-6 border-b border-[#D2D2D7]/50 flex items-center justify-between bg-white/60 backdrop-blur-xl">
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-[#34C759] rounded-full" id="apple-indicator"></span>
            <span className="text-[10px] font-semibold tracking-wider text-[#86868B] uppercase">Human Interface Companion</span>
          </div>
          <h1 className="text-lg font-bold tracking-tight text-[#1D1D1F] mt-1 font-sans">
            Rock-ai Design Guide
          </h1>
          <p className="text-[10px] text-[#86868B] font-mono">
            macOS Custom Edition v8.1
          </p>
        </div>
        <div className="flex gap-1.5 shrink-0">
          <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]"></span>
          <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]"></span>
          <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]"></span>
        </div>
      </div>

      {/* macOS Sidebar Navigation Items */}
      <nav className="flex-1 px-3 py-4 space-y-[2px] overflow-y-auto">
        <p className="text-[10px] font-semibold text-[#86868B] uppercase tracking-wider px-3 mb-2">
          Design System Levels
        </p>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentMode === item.id;
          return (
            <button
              key={item.id}
              id={`nav-btn-${item.id}`}
              onClick={() => setMode(item.id)}
              className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150 group relative cursor-pointer ${
                isActive
                  ? 'bg-[#0071E3] text-white font-medium shadow-sm'
                  : 'text-[#1D1D1F]/90 hover:bg-[#E8E8ED]'
              }`}
            >
              {/* Apple colorful round-rect icon wrapper */}
              <div className={`w-7 h-7 rounded-md ${item.iconBg} flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-105`}>
                <Icon className="w-4 h-4 text-white" />
              </div>
              
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-[13px] font-medium tracking-tight truncate">{item.label}</span>
                <span className={`text-[10px] truncate ${isActive ? 'text-white/80' : 'text-[#86868B]'}`}>
                  {item.subLabel}
                </span>
              </div>
              
              {isActive && (
                <span className="w-1.5 h-1.5 bg-white rounded-full shrink-0"></span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Apple Styled Integrity Footer */}
      <div className="p-4 border-t border-[#D2D2D7]/50 bg-white/30 backdrop-blur-md text-[10px] text-[#86868B] space-y-1">
        <div className="flex items-center justify-between">
          <span className="font-semibold tracking-wider text-[9px] uppercase">HIG Specification</span>
          <span className="text-[#34C759] font-bold">● Active Sandbox</span>
        </div>
        <div className="text-[10px] leading-relaxed">
          Fluid adaptive frames rendering on native Canvas pipelines. Designed for Apple Silicon architectures.
        </div>
      </div>
    </div>
  );
}
