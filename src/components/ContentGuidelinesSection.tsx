import React, { useState } from 'react';
import { 
  BookOpen, Search, Filter, AlertTriangle, CheckCircle, 
  HelpCircle, MessageSquare, ShieldCheck, RefreshCw, Layers
} from 'lucide-react';

interface Term {
  code: string;
  chinese: string;
  english: string;
  definition: string;
  rationale: string;
  category: 'safety' | 'ui' | 'system';
}

export default function ContentGuidelinesSection() {
  // Voice and tone mode
  const [toneMode, setToneMode] = useState<'consumer' | 'industrial'>('industrial');

  // Search/Filter states for the glossary
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'safety' | 'ui' | 'system'>('all');

  // Interactive message evaluator
  const [userWarningText, setUserWarningText] = useState('注意：卡车有点太热了，建议停一下。');
  const [evaluationResult, setEvaluationResult] = useState<{
    score: number;
    level: 'A' | 'B' | 'F';
    verdict: string;
    suggestions: string[];
  }>({
    score: 40,
    level: 'F',
    verdict: '不符合工业安全规程：信息含糊，缺乏特定设备代码和立即执行的操作指令。',
    suggestions: [
      '添加唯一的错误代码 (例如: ERR_ENG_OVERHEAT)',
      '标明具体的温度或监控数据 (例如: [105°C])',
      '给出清晰、不容置疑的指令动作 (例如: 立即停机)'
    ]
  });

  const glossary: Term[] = [
    {
      code: 'ESTOP_TRIGGER',
      chinese: '紧急制动激活',
      english: 'Emergency Stop Engaged',
      definition: '物理或软件最高级别急停开关触发，车辆强制中断全部既定规划路线并抱死轮轨。',
      rationale: '文案绝对不能使用“可能”等软性词汇，必须一律采用红色底、全大写、强对比状态栏。',
      category: 'safety'
    },
    {
      code: 'LOCKOUT_TAGOUT',
      chinese: '能量隔离锁定',
      english: 'Lockout Tagout (LOTO)',
      definition: '设备维护期间，为防止调度员误发送启动代码，锁死其 UI 界面对应模块的实体与软件开关。',
      rationale: '界面上对应组件必须打上黄色高反差对角斑马斜纹条，并在点击时弹出强迫式的核验对话框。',
      category: 'safety'
    },
    {
      code: 'ON_DEMAND_INPUT',
      chinese: '按需变轨编辑',
      english: 'On-Demand Inputs',
      definition: '默认以只读文本或静态标签渲染，只有当鼠标 hover 且点击“编辑”按钮时，才变成高对比度文本输入框。',
      rationale: '防止工业控制台高频震动或误触鼠标时，调度员不小心修改了矿用车的既定航线和卡板编号。',
      category: 'ui'
    },
    {
      code: 'STATE_OVERLAY',
      chinese: '状态图层叠加',
      english: 'State Layer Overlay',
      definition: 'Material 3 体系下用于指示交互状态（悬停、按下、拖拽等）的不透明品牌纯色蒙版。',
      rationale: '使用透明度来在底层颜色上累加明度，这样即使在非标准屏幕上也能保持统一的色彩感知。',
      category: 'ui'
    },
    {
      code: 'VECTOR_2PX_MESH',
      chinese: '2像素矢量对齐',
      english: '2px Vector Grid-Align',
      definition: '所有自定义 SVG 图标均必须采用 2 像素物理网格笔刷对齐，且四周保留 2px 安全透明边距。',
      rationale: '保证在 1024x768 等高负荷、中低分辨率的工业平板上，图标绝不产生模糊虚边，确保瞬间辨识度。',
      category: 'system'
    },
    {
      code: 'COORDINATE_2D_RADAR',
      chinese: '2D 正交雷达地图',
      english: '2D Orthogonal Radar Map',
      definition: '取消任何带有倾斜视差的 3D 透视视图，纯粹用二维水平投影或极坐标系标定卡车的位置。',
      rationale: '3D 渲染会阻挡由于高低差导致的视觉盲区，2D 正交能百分之百反映精确的物理贴边距离。',
      category: 'system'
    }
  ];

  // Evaluate copywriting logic
  const handleEvaluateCopy = (text: string) => {
    setUserWarningText(text);
    
    let score = 20;
    const suggestions: string[] = [];
    
    // Check if contains equipment code or standard uppercase keys
    if (/[A-Z]_[A-Z]/.test(text) || /[A-Z]{3,}/.test(text)) {
      score += 30;
    } else {
      suggestions.push('添加清晰的故障代码（如: ERR_TRK_04, OVERHEAT_ALRT 等大写字符）');
    }

    // Check for clear statistics/metrics [data]
    if (/\[\d+(\.\d+)?(°C|C|%|m|km\/h|V|A)\]/.test(text) || /[\d.]+(°C|C|%|m|km\/h|V|A)/.test(text)) {
      score += 25;
    } else {
      suggestions.push('说明明确的物理数值数据（例如: [102°C], [45 km/h] 或 95%）');
    }

    // Check for explicit imperative verbs
    if (/立即|强制|必须|强制下线|启动|锁定|切断|停机|制动/.test(text)) {
      score += 25;
    } else {
      suggestions.push('使用断言式动作指令词汇（如: “立即停机”、“强制抱死”、“必须锁死”）');
    }

    let level: 'A' | 'B' | 'F' = 'F';
    let verdict = '不合格：安全警告信息模糊，可能会延迟操作员的危险响应。';
    
    if (score >= 90) {
      level = 'A';
      verdict = '完美工业文案！具备明确的系统追踪标识、实时数据配重，且操作指引高度断言、无二义性。';
    } else if (score >= 55) {
      level = 'B';
      verdict = '部分合规：包含了部分关键要素，但建议补充故障源编号或操作急迫词。';
    }

    setEvaluationResult({
      score,
      level,
      verdict,
      suggestions
    });
  };

  const filteredGlossary = glossary.filter(term => {
    const matchesSearch = 
      term.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.chinese.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.definition.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || term.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 animate-fade-in" id="content-guidelines-section">
      
      {/* Intro block */}
      <div className="bg-[#131118] border border-m3-outline/20 rounded-[28px] p-6 text-zinc-300 space-y-3 shadow-md">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-m3-primary shrink-0" />
          <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-m3-outline">
            MOBIUS 5.0 内容指南与工业文案范式 (Content Guidelines)
          </h4>
        </div>
        <p className="text-xs text-m3-outline leading-relaxed">
          在无人驾驶矿区、智慧码头等高危工业调度控制台，一字之差可能导致严重的物理碰撞。文案写作必须摒弃消费级产品的委婉与感性，执行极致的数据精准度与命令式语调。
        </p>
      </div>

      {/* CORE HIGHLIGHT A: Voice and Tone Comparison */}
      <div className="bg-white border border-m3-outline/15 rounded-[28px] p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-m3-outline/10 pb-4">
          <div>
            <h4 className="text-sm font-bold text-m3-on-surface">文案语气多态比对 (Consumer vs. Industrial Voice)</h4>
            <p className="text-xs text-m3-outline mt-1">
              切换语气观察同一个事件在消费级应用与高危调度终端上的文案差异：
            </p>
          </div>

          <div className="flex bg-m3-muted-surface p-1 rounded-xl shrink-0 border border-m3-outline/10">
            <button
              onClick={() => setToneMode('consumer')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                toneMode === 'consumer' 
                  ? 'bg-white text-m3-primary shadow-sm' 
                  : 'text-m3-outline hover:text-m3-on-surface'
              }`}
            >
              消费端语调 (Consumer Context)
            </button>
            <button
              onClick={() => setToneMode('industrial')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                toneMode === 'industrial' 
                  ? 'bg-m3-primary text-white shadow-sm' 
                  : 'text-m3-outline hover:text-m3-on-surface'
              }`}
            >
              工业合规语调 (Industrial Standard)
            </button>
          </div>
        </div>

        {/* Tone Showroom Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              scenario: '场景 A：无线局域网连接超时',
              consumer: {
                title: '网络有点不给力',
                desc: '系统正在尝试重新连接，请您稍等片刻，或者检查路由器状态。',
                style: 'border-m3-outline/15 text-m3-outline',
                tag: 'Soft Assistance'
              },
              industrial: {
                title: 'ERR_NET_TIMEOUT [MOBIUS_WIFI_04]',
                desc: '调度终端AP丢包率超限 [94%]。自动重试 3/5 次。车辆自动停等锁死，请立即派驻地面检测员核查 AP 基站信号。',
                style: 'border-red-500/30 bg-red-50/20 text-red-900',
                tag: 'IMPERATIVE WARNING'
              }
            },
            {
              scenario: '场景 B：电池电量低下 (15%)',
              consumer: {
                title: '电量不足，请充电',
                desc: '您的电量仅剩 15%，为了不影响正常使用，请及时连接电源线。',
                style: 'border-m3-outline/15 text-m3-outline',
                tag: 'Gentle Suggestion'
              },
              industrial: {
                title: 'BATT_LOW_ALRT [TRK_302: 14%]',
                desc: '锂电电量已进入二级报警阈值（小于15%）。车辆将在 300m 内强制停靠至最近的充电滑轨，停止响应常规路线，调度员请勿重设参数。',
                style: 'border-amber-500/30 bg-amber-50/20 text-amber-900',
                tag: 'PRE-EMPTIVE COMMAND'
              }
            },
            {
              scenario: '场景 C：设置参数保存成功',
              consumer: {
                title: '更改成功啦！',
                desc: '我们已经将您的配置记录下来了，祝您今天使用愉快！',
                style: 'border-m3-outline/15 text-m3-outline',
                tag: 'Celebratory Friendly'
              },
              industrial: {
                title: 'SYS_CFG_WRITE [OK_ACK]',
                desc: '写入存储器成功。校验哈希 [SHA-256: 8cf51]。新航道控制包已下发，各分部传感器在 16ms 内重新对齐。',
                style: 'border-emerald-500/30 bg-emerald-50/20 text-emerald-900',
                tag: 'TRANSACTIONAL LOG'
              }
            }
          ].map((card, idx) => {
            const currentObj = toneMode === 'consumer' ? card.consumer : card.industrial;
            return (
              <div 
                key={idx} 
                className={`border rounded-2xl p-5 space-y-4 transition-all duration-300 flex flex-col justify-between ${currentObj.style}`}
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-m3-outline font-bold uppercase tracking-wider block">{card.scenario}</span>
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                      toneMode === 'industrial' ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {currentObj.tag}
                    </span>
                  </div>
                  <h5 className="text-xs font-extrabold font-mono uppercase tracking-tight mt-1">
                    {currentObj.title}
                  </h5>
                  <p className="text-xs leading-relaxed opacity-90 font-sans">
                    {currentObj.desc}
                  </p>
                </div>

                <div className="text-[10px] font-mono opacity-60 border-t border-m3-outline/10 pt-2.5">
                  文案合规度：
                  <span className="font-bold ml-1">
                    {toneMode === 'industrial' ? '✅ 符合 MOBIUS V8.0' : '❌ 极度不建议用于控制台'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CORE HIGHLIGHT B: Copywriting compliance evaluator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Warning Copy Evaluator */}
        <div className="bg-white border border-m3-outline/15 rounded-[28px] p-6 shadow-sm space-y-5 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-m3-outline/10 pb-3">
              <span className="text-[10px] font-mono font-bold text-m3-primary bg-m3-secondary-container px-2.5 py-0.5 rounded-full">INTERACTIVE TEST</span>
              <h4 className="text-sm font-bold text-m3-on-surface">安全告警文案合规评审器</h4>
            </div>
            <p className="text-xs text-m3-outline leading-relaxed">
              输入你为工业平板、调度员看板编写的警报文案，我们的文案规则引擎将实时检测、分析和评分，输出修改建议。
            </p>
          </div>

          <div className="space-y-2.5">
            <label className="text-[10px] font-mono font-bold text-m3-outline block uppercase">输入您的告警文案进行评估</label>
            <textarea
              value={userWarningText}
              onChange={(e) => handleEvaluateCopy(e.target.value)}
              className="w-full h-24 p-3.5 text-xs border border-m3-outline/25 rounded-xl font-mono focus:ring-1 focus:ring-m3-primary focus:border-m3-primary bg-m3-muted-surface/30 text-m3-on-surface"
              placeholder="例如: 警告：卡车TRK_12电机超温 [105°C]，请立即手动停机！"
            />
          </div>

          <div className="flex gap-2">
            {[
              { text: 'TRK_03电机超温 [108°C]，请立即手动停机！', label: '正规预设 (高分)' },
              { text: '系统故障，卡车可能有点问题。', label: '日常预设 (零分)' }
            ].map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handleEvaluateCopy(preset.text)}
                className="text-[10px] font-semibold bg-m3-muted-surface hover:bg-m3-light-purple/40 border border-m3-outline/10 py-1.5 px-3 rounded-lg text-m3-on-surface transition-colors cursor-pointer"
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Assessment results */}
          <div className="bg-[#131118] text-zinc-300 rounded-2xl p-5 space-y-4 border border-m3-outline/20">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2.5">
                <span className={`w-8 h-8 rounded-full font-bold flex items-center justify-center text-xs ${
                  evaluationResult.level === 'A' 
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' 
                    : evaluationResult.level === 'B' 
                    ? 'bg-amber-950 text-amber-400 border border-amber-800'
                    : 'bg-red-950 text-red-400 border border-red-800'
                }`}>
                  {evaluationResult.level}
                </span>
                <div>
                  <span className="text-[10px] text-zinc-500 font-mono block">COMPLIANCE SCORE</span>
                  <span className="text-sm font-bold text-white font-mono">{evaluationResult.score} / 100</span>
                </div>
              </div>
              <span className="text-[9px] font-mono text-zinc-500">MOBIUS RULE RE-CHECK</span>
            </div>

            <div className="text-xs space-y-1 leading-relaxed">
              <span className="text-m3-outline font-bold">评级结论：</span>
              <p className="text-white opacity-95">{evaluationResult.verdict}</p>
            </div>

            {evaluationResult.suggestions.length > 0 && (
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-m3-primary font-bold uppercase tracking-wider block">⚠️ 仍需改进的条款</span>
                <ul className="space-y-1">
                  {evaluationResult.suggestions.map((sug, i) => (
                    <li key={i} className="text-[10px] text-zinc-400 flex items-start gap-1.5 leading-normal">
                      <span className="text-red-400 mt-0.5">•</span>
                      <span>{sug}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* SEARCHABLE GLOSSARY */}
        <div className="bg-white border border-m3-outline/15 rounded-[28px] p-6 shadow-sm space-y-5 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-m3-outline/10 pb-3">
              <span className="text-[10px] font-mono font-bold text-m3-primary bg-m3-secondary-container px-2.5 py-0.5 rounded-full">GLOSSARY</span>
              <h4 className="text-sm font-bold text-m3-on-surface">MOBIUS 工业术语词汇表</h4>
            </div>
            
            {/* Search Input and category filters */}
            <div className="space-y-2.5">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-m3-outline" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="搜索代码、定义或设计原则..."
                  className="w-full text-xs pl-9 pr-4 py-2 border border-m3-outline/25 rounded-xl font-mono focus:ring-1 focus:ring-m3-primary bg-m3-muted-surface/30"
                />
              </div>

              <div className="flex gap-1.5 flex-wrap">
                {[
                  { id: 'all', name: '全部 (All)' },
                  { id: 'safety', name: '安全规制 (Safety)' },
                  { id: 'ui', name: '交互UI (UI)' },
                  { id: 'system', name: '物理系统 (System)' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategoryFilter(cat.id as any)}
                    className={`text-[9px] font-bold border rounded-full px-2.5 py-1 transition-all cursor-pointer ${
                      categoryFilter === cat.id 
                        ? 'bg-m3-primary text-white border-m3-primary' 
                        : 'bg-white border-m3-outline/15 text-m3-outline hover:bg-m3-muted-surface'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Search Result list */}
          <div className="flex-1 overflow-y-auto max-h-[220px] space-y-3.5 pr-1 mt-2">
            {filteredGlossary.length === 0 ? (
              <p className="text-xs text-m3-outline text-center py-8">未找到匹配的学术/工业专用词条。</p>
            ) : (
              filteredGlossary.map((term, idx) => (
                <div key={idx} className="border-b border-m3-outline/10 pb-3.5 space-y-1.5 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-m3-primary">{term.code}</span>
                    <span className={`text-[8px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                      term.category === 'safety' ? 'bg-red-50 text-red-700' : term.category === 'ui' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'
                    }`}>
                      {term.category}
                    </span>
                  </div>
                  <div className="text-xs font-extrabold text-m3-on-surface">
                    {term.chinese} <span className="text-m3-outline font-mono text-[10px] font-normal">/ {term.english}</span>
                  </div>
                  <p className="text-[11px] text-m3-outline leading-relaxed">{term.definition}</p>
                  <p className="text-[10px] text-m3-primary leading-normal italic font-mono bg-m3-secondary-container/20 p-2 rounded-lg border border-m3-primary/10">
                    <span className="font-bold">设计准则：</span>{term.rationale}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
