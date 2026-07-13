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
      <div className="bg-white border border-m3-outline/15 rounded-[28px] p-6 shadow-[0_4px_16px_rgba(103,80,164,0.03)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-m3-on-surface tracking-tight flex items-center gap-2.5 font-serif">
              <span className="w-2.5 h-2.5 bg-m3-primary rounded-full inline-block"></span>
              ROAK-AI (Mobius) 与 <span className="italic text-m3-primary font-serif">Google M3</span> 设计哲学对比
            </h2>
            <p className="text-xs text-m3-outline mt-1.5 leading-relaxed">
              ROAK-AI 面向工业自动驾驶、特殊作业港口与矿场等高危工业场景；而 Material Design 3 (M3) 面向全球消费者生态系统。
            </p>
          </div>
          
          {/* System Mode Indicator */}
          <div className="inline-flex items-center gap-2 bg-m3-secondary-container text-m3-primary px-4 py-2 rounded-full text-xs font-mono font-bold shrink-0">
            <span className="w-2 h-2 bg-m3-primary rounded-full"></span>
            <span>工业级安全 vs. 消费级动态</span>
          </div>
        </div>
      </div>

      {/* Priority Filters Bar */}
      <div className="bg-white border border-m3-outline/15 rounded-[28px] p-5 shadow-[0_4px_16px_rgba(103,80,164,0.03)]">
        <h3 className="text-[10px] font-mono font-bold text-m3-outline uppercase tracking-widest mb-3">
          筛选 UX 优先级与安全等级
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
          <button
            onClick={() => setFilterPriority('all')}
            className={`px-4 py-2.5 rounded-2xl border text-xs font-semibold transition-all duration-150 text-center cursor-pointer ${
              filterPriority === 'all'
                ? 'bg-m3-primary text-white border-m3-primary shadow-sm'
                : 'bg-m3-muted-surface hover:bg-m3-light-purple/30 text-m3-on-surface/80 border-m3-outline/20'
            }`}
          >
            显示全部原则 ({ROAK_PRINCIPLES.length})
          </button>
          
          {(Object.keys(ROAK_PRIORITIES) as Array<'critical' | 'high' | 'medium'>).map((key) => {
            const count = ROAK_PRINCIPLES.filter(p => p.safetyRating === key).length;
            const isSelected = filterPriority === key;
            const meta = ROAK_PRIORITIES[key];
            
            let colorClasses = '';
            if (key === 'critical') colorClasses = isSelected ? 'bg-red-600 text-white border-red-600 shadow-sm rounded-2xl' : 'hover:bg-red-50 text-red-700 border-red-200 bg-red-50/20 rounded-2xl';
            if (key === 'high') colorClasses = isSelected ? 'bg-amber-600 text-white border-amber-600 shadow-sm rounded-2xl' : 'hover:bg-amber-50 text-amber-700 border-amber-200 bg-amber-50/20 rounded-2xl';
            if (key === 'medium') colorClasses = isSelected ? 'bg-m3-primary text-white border-m3-primary shadow-sm rounded-2xl' : 'hover:bg-m3-secondary-container/50 text-m3-primary border-m3-primary/20 bg-m3-secondary-container/20 rounded-2xl';

            return (
              <button
                key={key}
                onClick={() => setFilterPriority(key)}
                className={`px-4 py-2.5 text-xs font-semibold transition-all duration-150 text-center cursor-pointer ${colorClasses}`}
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
          <div className="p-2 bg-m3-muted-surface rounded-[24px] border border-m3-outline/10">
            <p className="text-[10px] font-mono font-bold text-m3-outline tracking-wider p-2">
              SELECT A PRINCIPLE TO EXPLORE
            </p>
            <div className="space-y-1.5">
              {filteredPrinciples.map((principle) => {
                const IconComponent = iconMap[principle.iconName] || HelpCircle;
                const isSelected = selectedPrinciple.id === principle.id;
                
                return (
                  <button
                    key={principle.id}
                    onClick={() => setSelectedPrinciple(principle)}
                    className={`w-full text-left flex items-center justify-between p-3 rounded-2xl transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? 'bg-white shadow-[0_4px_12px_rgba(103,80,164,0.06)] border border-m3-outline/25 text-m3-on-surface translate-x-1'
                        : 'text-m3-on-surface/80 hover:bg-white/50 hover:text-m3-on-surface border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl ${
                        isSelected ? 'bg-m3-primary text-white' : 'bg-m3-secondary-container text-m3-primary'
                      }`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold tracking-tight">{principle.name}</span>
                        <span className="text-[9px] text-m3-outline font-mono mt-0.5">
                          RATING: {principle.safetyRating.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className={`w-4 h-4 text-m3-outline transition-transform ${isSelected ? 'translate-x-0.5 text-m3-primary opacity-100' : 'opacity-0'}`} />
                  </button>
                );
              })}
              
              {filteredPrinciples.length === 0 && (
                <div className="p-8 text-center text-m3-outline text-xs">
                  暂无匹配该安全优先级的原则
                </div>
              )}
            </div>
          </div>

          {/* Priority Explanation Card */}
          <div className="bg-m3-on-surface text-white rounded-[24px] p-6 shadow-md space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <h4 className="text-[10px] font-mono font-bold tracking-widest text-m3-light-purple">
                UX 优先级与频率管理原则
              </h4>
            </div>
            <p className="text-xs leading-relaxed text-m3-surface/80">
              ROAK-AI 系统特别规定，<strong>绝不为边缘案例进行过度优化</strong>。对最高频、最广大用户的常见障碍进行压倒性优先排期。
            </p>
            <div className="space-y-2.5 pt-3.5 border-t border-white/10">
              <div className="flex items-start gap-2.5">
                <span className="text-[9px] px-1.5 py-0.5 rounded font-mono bg-red-950 text-red-400 font-bold mt-0.5">CRITICAL</span>
                <p className="text-[10px] text-white/70 leading-relaxed">
                  绝大多数用户的必用高频场景，例如：车辆接驳、安全中断控制。
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-[9px] px-1.5 py-0.5 rounded font-mono bg-amber-950 text-amber-400 font-bold mt-0.5">HIGH</span>
                <p className="text-[10px] text-white/70 leading-relaxed">
                  全员必用，但极低频，如新用户绑定、基准地图初始校验、系统初始化引导。
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-[9px] px-1.5 py-0.5 rounded font-mono bg-blue-950 text-blue-300 font-bold mt-0.5">MEDIUM</span>
                <p className="text-[10px] text-white/70 leading-relaxed">
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
            transition={{ duration: 0.2 }}
            className="bg-white border border-m3-outline/15 rounded-[28px] shadow-[0_4px_16px_rgba(103,80,164,0.03)] overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 bg-m3-muted-surface/40 border-b border-m3-outline/10">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-m3-secondary-container text-m3-primary rounded-2xl">
                    {React.createElement(iconMap[selectedPrinciple.iconName] || HelpCircle, { className: 'w-6 h-6' })}
                  </div>
                  <div>
                    <span className="text-[9px] font-mono font-bold px-2 py-0.5 bg-m3-secondary-container text-m3-primary rounded-full">
                      ROAK PRINCIPLE {selectedPrinciple.id.toUpperCase()}
                    </span>
                    <h3 className="text-xl font-bold text-m3-on-surface mt-1.5 font-serif">{selectedPrinciple.name}</h3>
                  </div>
                </div>
                
                {/* Safety Badge */}
                <span className={`text-[10px] font-mono font-bold px-3 py-1 rounded-full border ${
                  selectedPrinciple.safetyRating === 'critical'
                    ? 'bg-red-50 text-red-700 border-red-200'
                    : selectedPrinciple.safetyRating === 'high'
                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                    : 'bg-m3-secondary-container text-m3-primary border-m3-primary/25'
                }`}>
                  {selectedPrinciple.safetyRating.toUpperCase()} PRIORITY
                </span>
              </div>
              <p className="text-m3-on-surface/85 text-xs mt-4 leading-relaxed">
                {selectedPrinciple.description}
              </p>
            </div>

            {/* Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-m3-outline/10">
              
              {/* ROAK AI Detail Column */}
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-2 text-m3-on-surface">
                  <span className="w-2 h-2 bg-m3-primary rounded-full"></span>
                  <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-m3-outline">
                    ROCK-AI / MOBIUS 落地规范
                  </h4>
                </div>
                <div className="bg-m3-muted-surface/45 rounded-2xl p-4 border border-m3-outline/10 min-h-[160px] flex flex-col justify-between">
                  <p className="text-xs leading-relaxed text-m3-on-surface/90">
                    {selectedPrinciple.roakDetail}
                  </p>
                </div>
                <div className="flex items-start gap-2.5 text-[10px] text-m3-outline bg-m3-secondary-container/30 p-3.5 rounded-2xl border border-m3-primary/10">
                  <Info className="w-4 h-4 text-m3-primary shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    <strong>设计建议：</strong> 工业特种调度必须遵循此规范，禁止使用任何拟物、磨砂玻璃或无边框伪极简。
                  </span>
                </div>
              </div>

              {/* M3 Equivalent Detail Column */}
              <div className="p-6 space-y-4 bg-m3-muted-surface/10">
                <div className="flex items-center gap-2 text-m3-on-surface">
                  <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                  <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-600">
                    MATERIAL DESIGN 3 对等点
                  </h4>
                </div>
                <div className="bg-purple-50/20 rounded-2xl p-4 border border-purple-100 min-h-[160px] flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-purple-700 font-mono block mb-1.5 uppercase">
                      {selectedPrinciple.m3Equivalent}
                    </span>
                    <p className="text-xs leading-relaxed text-m3-on-surface/90">
                      {selectedPrinciple.m3Detail}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 text-[10px] text-m3-outline bg-purple-50/30 p-3.5 rounded-2xl border border-purple-100">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    <strong>M3 偏向：</strong> 为大规模消费者软件的包容性、艺术自适应和手势微澜打造。
                  </span>
                </div>
              </div>

            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
