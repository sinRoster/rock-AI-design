import React, { useState } from 'react';
import { ROAK_PRINCIPLES, ROAK_PRIORITIES } from '../data/roakData';
import { ShieldAlert, Sparkles, Eye, Compass, TrendingUp, Users, ArrowRight, CheckCircle2, AlertTriangle, Info, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';

const iconMap: { [key: string]: React.ComponentType<any> } = {
  ShieldAlert,
  Sparkles,
  Eye,
  Compass,
  TrendingUp,
  Users
};

export default function PrinciplesSection() {
  const [selectedPrinciple, setSelectedPrinciple] = useState(ROAK_PRINCIPLES[0]);
  const [filterPriority, setFilterPriority] = useState<'all' | 'critical' | 'high' | 'medium'>('all');

  const filteredPrinciples = filterPriority === 'all' 
    ? ROAK_PRINCIPLES 
    : ROAK_PRINCIPLES.filter(p => p.safetyRating === filterPriority);

  return (
    <div id="principles-section" className="space-y-8 animate-fade-in">
      {/* Overview Card */}
      <div className="bg-white border border-[#D2D2D7]/50 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#1D1D1F] tracking-tight flex items-center gap-2.5 font-sans">
              <span className="w-2.5 h-2.5 bg-[#0071E3] rounded-full inline-block"></span>
              Rock-ai 工业交互设计原则
            </h2>
            <p className="text-xs text-[#86868B] mt-1.5 leading-relaxed font-sans">
              Rock-ai 面向工业自动驾驶、特殊作业港口与矿场等高危工业场景，致力于打造极低延迟、超高可靠性、对极限视觉环境友好的人机交互规范。
            </p>
          </div>
        </div>
      </div>

      {/* Priority Filters Bar */}
      <div className="bg-white border border-[#D2D2D7]/50 rounded-2xl p-5 shadow-sm">
        <h3 className="text-[10px] font-semibold text-[#86868B] uppercase tracking-wider mb-3">
          筛选 UX 优先级与安全等级
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
          <button
            onClick={() => setFilterPriority('all')}
            className={`px-4 py-2.5 rounded-lg text-xs font-medium transition-all duration-150 text-center cursor-pointer border ${
              filterPriority === 'all'
                ? 'bg-[#0071E3] text-white border-[#0071E3] shadow-sm'
                : 'bg-[#F5F5F7] hover:bg-[#E8E8ED] text-[#1D1D1F] border-[#D2D2D7]/30'
            }`}
          >
            显示全部原则 ({ROAK_PRINCIPLES.length})
          </button>
          
          {(Object.keys(ROAK_PRIORITIES) as Array<'critical' | 'high' | 'medium'>).map((key) => {
            const count = ROAK_PRINCIPLES.filter(p => p.safetyRating === key).length;
            const isSelected = filterPriority === key;
            const meta = ROAK_PRIORITIES[key];
            
            let colorClasses = '';
            if (key === 'critical') colorClasses = isSelected ? 'bg-[#FF3B30] text-white border-[#FF3B30] shadow-sm rounded-lg' : 'bg-[#FF3B30]/10 hover:bg-[#FF3B30]/25 text-[#FF3B30] rounded-lg border border-[#FF3B30]/20';
            if (key === 'high') colorClasses = isSelected ? 'bg-[#FF9500] text-white border-[#FF9500] shadow-sm rounded-lg' : 'bg-[#FF9500]/10 hover:bg-[#FF9500]/25 text-[#FF9500] rounded-lg border border-[#FF9500]/20';
            if (key === 'medium') colorClasses = isSelected ? 'bg-[#0071E3] text-white border-[#0071E3] shadow-sm rounded-lg' : 'bg-[#0071E3]/10 hover:bg-[#0071E3]/25 text-[#0071E3] rounded-lg border border-[#0071E3]/20';

            return (
              <button
                key={key}
                onClick={() => setFilterPriority(key)}
                className={`px-4 py-2.5 text-xs font-semibold transition-all duration-150 text-center cursor-pointer border ${colorClasses}`}
              >
                {meta.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Split List and Dynamic Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Principles List */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-2 bg-white border border-[#D2D2D7]/50 rounded-2xl shadow-sm">
            <p className="text-[10px] font-semibold text-[#86868B] tracking-wider p-2 uppercase">
              SELECT A PRINCIPLE TO EXPLORE
            </p>
            <div className="space-y-1">
              {filteredPrinciples.map((principle) => {
                const IconComponent = iconMap[principle.iconName] || HelpCircle;
                const isSelected = selectedPrinciple.id === principle.id;
                
                return (
                  <button
                    key={principle.id}
                    onClick={() => setSelectedPrinciple(principle)}
                    className={`w-full text-left flex items-center justify-between p-3 rounded-lg transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? 'bg-[#E8E8ED] text-[#1D1D1F] font-semibold translate-x-1 border border-[#D2D2D7]/30'
                        : 'text-[#1D1D1F]/80 hover:bg-[#F5F5F7] border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-md ${
                        isSelected ? 'bg-[#0071E3] text-white' : 'bg-[#E8E8ED] text-[#0071E3]'
                      }`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold tracking-tight">{principle.name}</span>
                        <span className="text-[9px] text-[#86868B] font-mono mt-0.5 uppercase">
                          RATING: {principle.safetyRating.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className={`w-4 h-4 text-[#86868B] transition-transform ${isSelected ? 'translate-x-0.5 text-[#0071E3] opacity-100' : 'opacity-0'}`} />
                  </button>
                );
              })}
              
              {filteredPrinciples.length === 0 && (
                <div className="p-8 text-center text-[#86868B] text-xs font-sans">
                  暂无匹配该安全优先级的原则
                </div>
              )}
            </div>
          </div>

          {/* Priority Explanation Card */}
          <div className="bg-[#1D1D1F] text-white rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#FF9500]" />
              <h4 className="text-[10px] font-bold tracking-widest text-[#86868B] uppercase">
                UX 优先级与频率管理原则
              </h4>
            </div>
            <p className="text-xs leading-relaxed text-white/80 font-sans">
              Rock-ai 系统特别规定，<strong>绝不为边缘案例进行过度优化</strong>。对最高频、最广大用户的常见障碍进行压倒性优先排期。
            </p>
            <div className="space-y-2.5 pt-3.5 border-t border-white/10">
              <div className="flex items-start gap-2.5">
                <span className="text-[9px] px-1.5 py-0.5 rounded font-mono bg-[#FF3B30]/25 text-[#FF3B30] font-bold mt-0.5">CRITICAL</span>
                <p className="text-[10px] text-white/70 leading-relaxed font-sans">
                  绝大多数用户的必用高频场景，例如：车辆接驳、安全中断控制。
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-[9px] px-1.5 py-0.5 rounded font-mono bg-[#FF9500]/25 text-[#FF9500] font-bold mt-0.5">HIGH</span>
                <p className="text-[10px] text-white/70 leading-relaxed font-sans">
                  全员必用，但极低频，如新用户绑定、基准地图初始校验、系统初始化引导。
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-[9px] px-1.5 py-0.5 rounded font-mono bg-[#0071E3]/25 text-[#0071E3] font-bold mt-0.5">MEDIUM</span>
                <p className="text-[10px] text-white/70 leading-relaxed font-sans">
                  少部分专家用户的特定偏好，如冗余报表、二次参数微调等。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Comparative Principle Detail Panel */}
        <div className="lg:col-span-7">
          <motion.div
            key={selectedPrinciple.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15 }}
            className="bg-white border border-[#D2D2D7]/50 rounded-2xl shadow-sm overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 bg-[#F5F5F7] border-b border-[#D2D2D7]/50">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[#E8E8ED] text-[#0071E3] rounded-xl animate-fade-in">
                    {React.createElement(iconMap[selectedPrinciple.iconName] || HelpCircle, { className: 'w-5 h-5' })}
                  </div>
                  <div>
                    <span className="text-[9px] font-bold px-2 py-0.5 bg-[#E8E8ED] text-[#1D1D1F] rounded-full uppercase tracking-wider">
                      ROCK-AI PRINCIPLE {selectedPrinciple.id.toUpperCase()}
                    </span>
                    <h3 className="text-xl font-bold text-[#1D1D1F] mt-1.5 font-sans">{selectedPrinciple.name}</h3>
                  </div>
                </div>
                
                {/* Safety Badge */}
                <span className={`text-[10px] font-mono font-bold px-3 py-1 rounded-full border ${
                  selectedPrinciple.safetyRating === 'critical'
                    ? 'bg-[#FF3B30]/10 text-[#FF3B30] border-[#FF3B30]/20'
                    : selectedPrinciple.safetyRating === 'high'
                    ? 'bg-[#FF9500]/10 text-[#FF9500] border-[#FF9500]/20'
                    : 'bg-[#0071E3]/10 text-[#0071E3] border-[#0071E3]/20'
                }`}>
                  {selectedPrinciple.safetyRating.toUpperCase()} PRIORITY
                </span>
              </div>
              <p className="text-[#1D1D1F]/90 text-xs mt-4 leading-relaxed font-sans">
                {selectedPrinciple.description}
              </p>
            </div>

            {/* Specification Content */}
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-2 text-[#1D1D1F]">
                <span className="w-2 h-2 bg-[#0071E3] rounded-full"></span>
                <h4 className="text-[10px] font-semibold uppercase tracking-wider text-[#86868B] font-sans">
                  Rock-ai 落地规范
                </h4>
              </div>
              <div className="bg-[#F5F5F7] rounded-xl p-5 border border-[#D2D2D7]/30 min-h-[140px] flex flex-col justify-between">
                <p className="text-xs leading-relaxed text-[#1D1D1F]/90 font-sans">
                  {selectedPrinciple.roakDetail}
                </p>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-[#86868B] bg-[#0071E3]/5 p-4 rounded-xl border border-[#0071E3]/10 font-sans">
                <Info className="w-4 h-4 text-[#0071E3] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  <strong>设计建议：</strong> 工业特种调度必须遵循此规范，禁止使用任何拟物、磨砂玻璃或无边框伪极简。
                </span>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
