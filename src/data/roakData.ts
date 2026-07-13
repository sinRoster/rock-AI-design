import { Principle, TypographyToken, SpacingPreset } from '../types';

export const ROAK_PRINCIPLES: Principle[] = [
  {
    id: 'safety',
    name: 'Safety (安全)',
    description: '自动驾驶车辆本质上是危险的。在适当情况下，UI 应警告潜在不安全的车辆。目标是与用户建立信任，使车辆行为可预测且安全。',
    roakDetail: '所有不安全或处于报警状态的资产（如故障车辆、紧急区域、离线门禁）都必须在界面上使用高反差报警色。UI 绝不能隐藏警告，并提供一键重置或紧急响应操作。',
    rockaiEquivalent: 'Rock-AI Trust & Feedback',
    rockaiDetail: 'Rock-AI 极其关注系统的反馈和控制。通过定制的 Error/Critical 颜色系统和无障碍（A11y）准则，确保核心安全信息能够 100% 准确传达给用户。',
    safetyRating: 'critical',
    iconName: 'ShieldAlert'
  },
  {
    id: 'simplicity',
    name: 'Simplicity (简洁)',
    description: '不要为了新奇而做新或不同的事情。遵循交互/行业标准 UI 组件。',
    roakDetail: '使用用户熟悉的传统 UI 交互模式。严禁为创新而创新，例如：不要制造复杂的非标准滑块，使用经典下拉框、多选框 and 简洁的卡片面板。',
    rockaiEquivalent: 'Rock-AI Standardized Systems',
    rockaiDetail: 'Rock-AI 提供了极其完整 and 一致的标准化组件库（按钮、文本框、卡片、导航），旨在减少用户的认知负荷，让交互变得可预测。',
    safetyRating: 'critical',
    iconName: 'Sparkles'
  },
  {
    id: 'transparency',
    name: 'Transparency (透明)',
    description: '系统应文档齐全且易于理解（UI 和代码层面）。新开发者应能阅读并理解现有代码库。使用注释和代码文档。',
    roakDetail: '不仅系统逻辑需要透明，UI 状态也必须一目了然。车辆当前的具体任务、当前连通性、正在执行的操作都应以文本或清晰指标说明。代码必须高度模块化，具有详细说明。',
    rockaiEquivalent: 'Rock-AI Expressive Architecture',
    rockaiDetail: 'Rock-AI 的透明性偏向于系统设计和个性化。通过清晰的视觉层级和状态指示器（State layers）向用户传达当前是什么组件在交互、处于什么状态。',
    safetyRating: 'high',
    iconName: 'Eye'
  },
  {
    id: 'detail',
    name: 'Attention to Detail (注重细节)',
    description: '系统的公众形象。糟糕的 UI 和 UX 印象将导致对整个系统的不信任。UI 应精致而非粗糙。Rock-ai 应呈现简化的现实视图，移除用户完成任务所不需要的一切。',
    roakDetail: '每一个对齐、间距、像素和动画都有其含义。剔除任何多余的装饰，杜绝“科技黑话”（Tech-Larping），如无意义 of 日志流、坐标跳动或炫酷但多余的 3D 线框。保持纯粹的 2D 精美渲染。',
    rockaiEquivalent: 'Rock-AI Craftsmanship & Polishing',
    rockaiDetail: 'Rock-AI 通过细腻的动态过渡效果（Spring animations）、精密计算的圆角（Shapes 8dp - 28dp）以及精细的颜色灰度层级，展现了极高的视觉工艺水平。',
    safetyRating: 'high',
    iconName: 'Compass'
  },
  {
    id: 'growth',
    name: 'Growth (成长)',
    description: '为成长做规划。MVP 设计应具有可扩展性。为最终状态以及中间步骤进行设计。基本 UI 组件应与用例无关，以便在任何地方使用。代码库应模块化且可扩展，以便在需要时扩展应用。',
    roakDetail: '采用原子化或高模块化的 UI 开发策略。组件必须与具体用例解耦。所有组件都要在桌面、平板和移动端做到自适应（Responsive），并在鼠标与触控输入间平滑过渡。',
    rockaiEquivalent: 'Rock-AI Adaptive Design',
    rockaiDetail: 'Rock-AI 支持从手机、折叠屏到平板和桌面的自适应布局（Adaptive Columns and Rails），非常注重弹性扩张。',
    safetyRating: 'medium',
    iconName: 'TrendingUp'
  },
  {
    id: 'humility',
    name: 'Humility (谦逊)',
    description: 'UI 应为特定的基于任务的使用场景而设计。不同市场细分领域的用户没有共同体验。他们不应共享共同的 UI。Rock-ai UI 应自我解释。不要假设用户了解系统的任何信息。UI 和交互模型应在整个应用中保持一致。',
    roakDetail: '不要强迫港口操作员、矿场指挥官和物流调度员共用一套高度复杂、通用的全能界面。根据他们的任务，提炼核心工具。保持所有按钮的外观和交互一律一致，杜绝惊喜。',
    rockaiEquivalent: 'Rock-AI User-Centric / Personalization',
    rockaiDetail: 'Rock-AI 提倡控制权交还给用户，允许根据其偏好、壁纸提取色调来动态定制专属界面。它通过极致的包容性尊重不同的用户群体。',
    safetyRating: 'medium',
    iconName: 'Users'
  }
];

export const ROAK_PRIORITIES = {
  critical: {
    label: 'CRITICAL (关键)',
    desc: '这些功能被大多数用户使用且经常使用。问题对遇到的每个人都很明显。应优化绝对的操作流程。'
  },
  high: {
    label: 'HIGH (高)',
    desc: '这些功能被大多数用户使用，但很少使用：安装、初始化、启动相关的交互等。确保其健壮性。'
  },
  medium: {
    label: 'MEDIUM (中)',
    desc: '高功能特性被一小部分用户使用，不是大多数：快捷交互、重复、次要、冗余、用户偏好。'
  }
};

export const ROAK_TYPOGRAPHY: TypographyToken[] = [
  {
    name: 'DOCTITLE (文档大标题)',
    family: 'Roboto Condensed',
    weight: 'Bold',
    size: '14px',
    lineHeight: '14px',
    letterSpacing: '0.05em',
    decoration: '全大写, 提供极大的视觉重量和强调。用于展会、宣传及主卡片外壳。',
    useCase: '大卡片外部边界、品牌宣传、展会大号展示'
  },
  {
    name: 'SectionTitle (区块标题)',
    family: 'Roboto',
    weight: 'Bold',
    size: '18px',
    lineHeight: '22px',
    decoration: '带 3px 下划线装饰。用于文本列顶部加标题或二级区块副标题。',
    useCase: '列布局顶部、属性面板标题、表单区块首'
  },
  {
    name: 'HeadingLg (大标题)',
    family: 'Roboto',
    weight: 'Thin',
    size: '36px',
    lineHeight: '40px',
    useCase: '较少强调的巨幅看板、欢迎标语、非核心数据区块'
  },
  {
    name: 'HeadingMd (中标题)',
    family: 'Roboto',
    weight: 'Light',
    size: '24px',
    lineHeight: '30px',
    useCase: '主对话框标题、空状态引导标题、模块首标题'
  },
  {
    name: 'HeadingSm (小标题)',
    family: 'Roboto',
    weight: 'Regular',
    size: '18px',
    lineHeight: '22px',
    useCase: '中型卡片内标题、操作抽屉顶部文本'
  },
  {
    name: 'Body (正文)',
    family: 'Roboto',
    weight: 'Regular',
    size: '14px',
    lineHeight: '20px',
    useCase: '标准段落、属性键值对、表单输入、提示信息'
  },
  {
    name: 'Meta Font (元数据字体)',
    family: 'Roboto',
    weight: 'Bold',
    size: '11px',
    lineHeight: '11px',
    letterSpacing: '0.08em',
    decoration: '全大写, 获得矩形视觉外形，极易在布局中进行视觉对齐。',
    useCase: '小标签、操作徽章、时间戳、次要单位说明'
  },
  {
    name: 'Monospace (等宽)',
    family: 'Consolas (预装系统字体)',
    weight: 'Regular',
    size: '14px',
    lineHeight: '20px',
    useCase: '代码段落、坐标序列 (x, y)、精确测量数值、网络报文数据'
  },
  {
    name: 'Quote (引文)',
    family: 'Georgia (预装系统字体)',
    weight: 'Bold Italic',
    size: '14px',
    lineHeight: '20px',
    useCase: '引用话语、数学/航向变量定义 (如 Δ, θ)'
  }
];

export const ROAK_SPACING: SpacingPreset[] = [
  { name: '1px Spacing', value: '1px', description: '交互式子项（如列表条目、紧邻按钮）之间的微分割。这提供了极高的数据密度，并且避免了空间浪费。' },
  { name: 'Margin & Padding Stacking', value: 'Down & Right Only', description: '所有内边距（Padding）与外边距（Margin）必须统一向下（Down）与向右（Right）推动。这样，同级对象即使大小不同也能保证绝对对齐和一致边距。' },
  { name: 'Panels (面板组件)', value: 'Color BG + 1px Border', description: '面板用于信息分组。面板由背景底色和 1px 细微边界线组成。相邻面板间应使用对比背景色或 1px 细框来明确划分。' }
];

export const ROAK_LOGO_SPECS = {
  logo: '47x105 px',
  icon: '44x47 px',
  badge: '72x144 px (2:1 高宽比，指南针居中于上半部，齿轮对面侧贴墙锚定)',
  allowedColors: ['经典蓝 (#2563EB)', '藏青深蓝 (#1E3A8A)', '纯黑 (#000000)', '亮白 (#FFFFFF)'],
  combinations: '仅允许上述颜色组合，绝对禁止在白色背景上直接显示微型齿轮徽章。'
};

export const ROAK_INTERACTIVE_STATES = {
  rest: {
    bg: 'bg-zinc-800 text-zinc-100 border border-zinc-700',
    desc: '静态常态，1px 精确边框，文字和图标清晰对齐。'
  },
  hover: {
    bg: 'bg-blue-600 text-white shadow-md shadow-blue-900/20 scale-[1.01]',
    desc: '鼠标悬停或触控滑动边缘。点击区域会在前景视觉外围扩展，并提供发光或高亮反馈，明确提示用户交互点。'
  },
  active: {
    bg: 'bg-blue-800 text-white scale-[0.98]',
    desc: '按钮或输入框被点击或手指深按（Pressed），尺寸微幅收缩，体现物理重压物理感。'
  },
  focus: {
    bg: 'ring-2 ring-blue-400 ring-offset-2 ring-offset-zinc-950 border-blue-500',
    desc: '通过键盘 Tab 键选中。必须有绝对清晰的 2px 轮廓环（Ring），确保对视力障碍用户和纯键盘操作员的无障碍支持。'
  }
};
