import { TypographyToken } from '../types';

export const ROCK_AI_TYPOGRAPHY: TypographyToken[] = [
  {
    name: 'Display Large (特大显示)',
    family: 'Inter / Roboto',
    weight: 'Regular',
    size: '57px',
    lineHeight: '64px',
    letterSpacing: '-0.25px',
    useCase: '大屏幕上的首要突出文本、数字化墙报大数值'
  },
  {
    name: 'Headline Large (大标题)',
    family: 'Inter / Roboto',
    weight: 'Regular',
    size: '32px',
    lineHeight: '40px',
    useCase: '标准主页面头部、第一级重点版块声明'
  },
  {
    name: 'Title Large (标题大)',
    family: 'Inter / Roboto',
    weight: 'Medium',
    size: '22px',
    lineHeight: '28px',
    useCase: '卡片标题、对话框首要文本、导航栏居中大字'
  },
  {
    name: 'Title Medium (标题中)',
    family: 'Inter / Roboto',
    weight: 'Medium',
    size: '16px',
    lineHeight: '24px',
    letterSpacing: '0.15px',
    useCase: '卡片内的分项标题、设置页面子分类名'
  },
  {
    name: 'Body Large (正文大)',
    family: 'Inter / Roboto',
    weight: 'Regular',
    size: '16px',
    lineHeight: '24px',
    letterSpacing: '0.5px',
    useCase: '长篇幅段落内容、核心输入区域正文'
  },
  {
    name: 'Body Medium (正文中)',
    family: 'Inter / Roboto',
    weight: 'Regular',
    size: '14px',
    lineHeight: '20px',
    letterSpacing: '0.25px',
    useCase: '大部分次要文本、说明段落、附属标签'
  },
  {
    name: 'Label Large (标签大)',
    family: 'Inter / Roboto',
    weight: 'Medium',
    size: '14px',
    lineHeight: '20px',
    letterSpacing: '0.1px',
    useCase: '所有传统按钮内的文本、切换控件标签、关键菜单项'
  },
  {
    name: 'Label Medium (标签中)',
    family: 'Inter / Roboto',
    weight: 'Medium',
    size: '12px',
    lineHeight: '16px',
    letterSpacing: '0.5px',
    useCase: '搜索联想字、输入框右上角辅助字符、错误提示字'
  }
];

export const ROCK_AI_ELEVATION = [
  { level: 0, shadow: 'none', overlay: '0%', description: 'Flat (平铺) - 对应页面最低底层底板，如整个视口背景。' },
  { level: 1, shadow: 'shadow-sm', overlay: '5%', description: 'Level 1 - 卡片默认高度，用于基本项目卡片、设置列表项目。' },
  { level: 2, shadow: 'shadow', overlay: '8%', description: 'Level 2 - 悬停或高亮卡片、浮动控制栏（如搜索栏）。' },
  { level: 3, shadow: 'shadow-md', overlay: '11%', description: 'Level 3 - 主要浮动组件，如对话框（Dialogs）、操作单（Sheets）。' },
  { level: 4, shadow: 'shadow-lg', overlay: '12%', description: 'Level 4 - 重大控制组件，如未折叠抽屉、浮动操作按钮（FAB）。' },
  { level: 5, shadow: 'shadow-xl', overlay: '14%', description: 'Level 5 - 绝对顶层，例如正在拖动的列表卡片、高优先级警告弹窗。' }
];

export const ROCK_AI_SHAPES = [
  { name: 'None (直角)', value: '0px', usage: '屏幕边缘、拼贴无缝列表、传统表格单元格。' },
  { name: 'Extra Small (微圆角)', value: '4px', usage: '徽章 (Badges)、输入框里的微标记。' },
  { name: 'Small (小圆角)', value: '8px', usage: '标准输入框 (Text fields)、多选框、芯片 (Chips)。' },
  { name: 'Medium (中圆角)', value: '12px', usage: '卡片 (Cards) 常态、小型对话框。' },
  { name: 'Large (大圆角)', value: '16px', usage: '大型展开卡片、导航抽屉边缘。' },
  { name: 'Extra Large (特大圆角)', value: '28px', usage: '主操作面板、浮动对话框、全局控制大卡片。' },
  { name: 'Full (全圆角/胶囊型)', value: '9999px', usage: '高频按钮 (FAB)、各种胶囊按钮、滑块轨道。' }
];

export const ROCK_AI_STATE_LAYERS = {
  hover: '8% 纯色叠加 (视觉高亮反馈)',
  focus: '12% 纯色叠加 + 1px 外边框线',
  pressed: '12% 纯色叠加 (按下、涟漪波纹动画起动)',
  dragged: '16% 纯色叠加 + 影子升级提升'
};

export const ROCK_AI_DYNAMIC_COLOR_DECS = 'Rock-ai 的核心灵魂是 8.0 动态颜色系统。系统可以提取用户壁纸中的主色调，然后使用数学算法动态计算出 30 多种色调的协调色盘。这涵盖了 Primary、Secondary、Tertiary、Error、Surface 及其对应的 On- 颜色（如 On-Primary，用于主背景色上的文字），确保在任何壁纸下都有出色的无障碍对比度。';
