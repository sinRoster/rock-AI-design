import React from 'react';
import { ModeType } from '../types';
import { ShieldAlert, Sparkles, Layout, Layers, Activity, BookOpen, Accessibility, FileCode } from 'lucide-react';

interface SidebarProps {
  currentMode: ModeType;
  setMode: (mode: ModeType) => void;
}

export default function Sidebar({ currentMode, setMode }: SidebarProps) {
  const menuItems = [
    {
      id: 'principles' as ModeType,
      label: '1. 设计原则 (Principles)',
      subLabel: '指导所有决策的顶层哲学',
      icon: ShieldAlert,
    },
    {
      id: 'tokens' as ModeType,
      label: '2. 设计令牌 (Tokens)',
      subLabel: '颜色、字体、间距、圆角原子变量',
      icon: Layers,
    },
    {
      id: 'components' as ModeType,
      label: '3. 基础组件 (Components)',
      subLabel: 'Button、Input、Card 沙盒',
      icon: Sparkles,
    },
    {
      id: 'layouts' as ModeType,
      label: '4. 布局模式 (Layout Patterns)',
      subLabel: '页面结构、侧边停靠、2D雷达地图',
      icon: Layout,
    },
    {
      id: 'interaction' as ModeType,
      label: '5. 交互模式 (Interactions)',
      subLabel: '手势阻尼、微动反馈、状态流转',
      icon: Activity,
    },
    {
      id: 'content' as ModeType,
      label: '6. 内容指南 (Content Guidelines)',
      subLabel: '文案语调、专业术语表、急停规范',
      icon: BookOpen,
    },
    {
      id: 'accessibility' as ModeType,
      label: '7. 无障碍 (Accessibility)',
      subLabel: '色彩对比度计算、键盘聚焦体验',
      icon: Accessibility,
    },
    {
      id: 'tooling' as ModeType,
      label: '8. 工具链 (Tooling)',
      subLabel: 'Figma规范、代码导出、MD一键渲染',
      icon: FileCode,
    },
  ];

  return (
    <div 
      id="roak-sidebar"
      className="w-full md:w-80 bg-m3-muted-surface text-m3-on-surface flex flex-col border-r border-m3-outline/10 md:h-screen shrink-0"
    >
      {/* Brand Header */}
      <div className="p-6 border-b border-m3-outline/15 flex items-center justify-between bg-white/45">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-m3-primary rounded-full animate-pulse" id="brand-indicator"></span>
            <span className="text-[10px] font-mono font-bold tracking-widest text-m3-outline">ROCK-AI DESIGN</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-m3-on-surface mt-1.5 font-serif italic">
            MOBIUS UI SYSTEM
          </h1>
          <p className="text-[10px] text-m3-outline/80 mt-1 font-mono tracking-wider">
            V8.0 COMPANION GUIDE
          </p>
        </div>
        {/* Editorial edition indicator */}
        <span className="text-[9px] uppercase tracking-widest font-bold opacity-30 writing-mode-vertical text-m3-outline">M3_EDITION</span>
      </div>

      {/* Navigation Modes */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        <p className="text-[10px] font-mono font-bold text-m3-outline uppercase tracking-widest px-2 mb-3">
          MODE SELECTION
        </p>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentMode === item.id;
          return (
            <button
              key={item.id}
              id={`nav-btn-${item.id}`}
              onClick={() => setMode(item.id)}
              className={`w-full text-left flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-200 group relative ${
                isActive
                  ? 'bg-m3-primary text-white shadow-[0_4px_12px_rgba(103,80,164,0.15)] font-semibold'
                  : 'text-m3-on-surface/70 hover:bg-m3-light-purple/40 hover:text-m3-on-surface'
              }`}
            >
              <Icon className={`w-5 h-5 shrink-0 transition-transform duration-300 ${isActive ? 'scale-110 text-white' : 'text-m3-primary group-hover:scale-105'}`} />
              <div className="flex flex-col">
                <span className="text-xs font-semibold tracking-tight leading-snug">{item.label}</span>
                <span className={`text-[9px] font-mono mt-0.5 ${isActive ? 'text-m3-light-purple' : 'text-m3-outline group-hover:text-m3-on-surface/80'}`}>
                  {item.subLabel}
                </span>
              </div>
              
              {isActive && (
                <span className="absolute right-4 w-1.5 h-1.5 bg-white rounded-full"></span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Sidebar Footer with system information */}
      <div className="p-5 border-t border-m3-outline/10 bg-white/30 text-[10px] font-mono text-m3-outline">
        <div className="flex items-center justify-between mb-2">
          <span className="font-bold tracking-wider">SYSTEM INTEGRITY</span>
          <span className="text-emerald-600 font-bold">● OK (2D SECURE)</span>
        </div>
        <div className="text-[10px] leading-relaxed opacity-85">
          ROAK-AI Framework adheres to standard 2-stroke vector renders, optimized for tablet & desktop environments.
        </div>
      </div>
    </div>
  );
}
