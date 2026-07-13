import React, { useState, useEffect, useRef } from 'react';
import { MapAsset } from '../types';
import { 
  RotateCcw, ZoomIn, ZoomOut, Maximize, ChevronLeft, ChevronRight, 
  MapPin, Play, Pause, Compass, Grid, Layers, Info, Trash2, Plus, 
  Settings, Truck, ShieldAlert, Video, KeyRound 
} from 'lucide-react';
import { motion } from 'motion/react';

const INITIAL_ASSETS: MapAsset[] = [
  { id: 'truck-1', name: 'AT-01 (无人智能卡车)', type: 'vehicle', status: 'online', x: 25, y: 35, info: '装载级别: 84% | 燃油/电池: 92% | 前进速度: 12.4 m/s' },
  { id: 'truck-2', name: 'AT-02 (自卸式挖掘卡车)', type: 'vehicle', status: 'warning', x: 65, y: 48, info: '装载级别: 0% | 传感器异常微调中 | 静止状态' },
  { id: 'gate-a', name: '港口西侧 01 号门禁关卡', type: 'static-gate', status: 'online', x: 45, y: 75, info: '状态: 已锁闭 | 识别率: 99.8% | 每日通行: 142车次' },
  { id: 'cam-east', name: '采矿场东边界 4K 巡检球机', type: 'static-camera', status: 'critical', x: 80, y: 20, info: '报警: 镜头遮挡或大风位移 | 信号强度: 弱 (14dB)' },
  { id: 'dump-x', name: '矿渣排土卸料倒土槽', type: 'stationary-dump', status: 'online', x: 15, y: 80, info: '承载余量: 22% | 自动化清障推土机: 运行中' }
];

export default function LayoutSimulator() {
  const [layoutType, setLayoutType] = useState<'single' | 'master-detail' | 'map'>('map');
  const [assets, setAssets] = useState<MapAsset[]>(INITIAL_ASSETS);
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>('truck-1');
  
  // Interactive Simulator Controls
  const [mapZoom, setMapZoom] = useState<number>(1.0);
  const [mapRotation, setMapRotation] = useState<number>(0); // in degrees
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(true);
  const [isPatrolling, setIsPatrolling] = useState<boolean>(true);
  const [uiPattern, setUiPattern] = useState<'docked' | 'floating'>('docked'); // docked vs floating OOUI

  // Map container reference for coordinate calculation on click/drag
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [draggingAssetId, setDraggingAssetId] = useState<string | null>(null);

  // Asset patrol simulation loop
  useEffect(() => {
    if (!isPatrolling) return;
    
    const interval = setInterval(() => {
      setAssets(prev => prev.map(asset => {
        if (asset.type === 'vehicle') {
          // Calculate movement loop
          let dx = asset.id === 'truck-1' ? 0.3 : -0.2;
          let dy = asset.id === 'truck-1' ? 0.1 : 0.25;

          let newX = asset.x + dx;
          let newY = asset.y + dy;

          // Boundary bounce or wrap around
          if (newX > 90) newX = 10;
          if (newX < 10) newX = 90;
          if (newY > 90) newY = 10;
          if (newY < 10) newY = 90;

          return { ...asset, x: Number(newX.toFixed(2)), y: Number(newY.toFixed(2)) };
        }
        return asset;
      }));
    }, 100);

    return () => clearInterval(interval);
  }, [isPatrolling]);

  const handleShowAll = () => {
    setMapZoom(1.0);
    setMapRotation(0);
  };

  const handleMapMouseDown = (e: React.MouseEvent, assetId: string) => {
    e.stopPropagation();
    setDraggingAssetId(assetId);
    setSelectedAssetId(assetId);
  };

  const handleMapMouseMove = (e: React.MouseEvent) => {
    if (!draggingAssetId || !mapContainerRef.current) return;
    
    const rect = mapContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    // Bounds check 0-100
    const clampedX = Math.max(2, Math.min(98, x));
    const clampedY = Math.max(2, Math.min(98, y));

    setAssets(prev => prev.map(asset => {
      if (asset.id === draggingAssetId) {
        return { 
          ...asset, 
          x: Number(clampedX.toFixed(1)), 
          y: Number(clampedY.toFixed(1)) 
        };
      }
      return asset;
    }));
  };

  const handleMapMouseUp = () => {
    setDraggingAssetId(null);
  };

  // Helper to retrieve selected asset details
  const selectedAsset = assets.find(a => a.id === selectedAssetId);

  // Asset icon mapper
  const getAssetIcon = (type: string, status: string) => {
    let baseColor = 'text-[#0071E3]';
    if (status === 'warning') baseColor = 'text-[#FF9500]';
    if (status === 'critical') baseColor = 'text-[#FF3B30]';

    switch (type) {
      case 'vehicle':
        return <Truck className={`w-5 h-5 ${baseColor}`} />;
      case 'static-gate':
        return <KeyRound className={`w-5 h-5 ${baseColor}`} />;
      case 'static-camera':
        return <Video className={`w-5 h-5 ${baseColor}`} />;
      default:
        return <MapPin className={`w-5 h-5 ${baseColor}`} />;
    }
  };

  return (
    <div id="layout-simulator-section" className="space-y-6 animate-fade-in">
      
      {/* Upper Mode Banner */}
      <div className="bg-white border border-[#D2D2D7]/50 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-lg font-bold text-[#1D1D1F] font-sans flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#0071E3] rounded-full inline-block"></span>
            自适应视口布局与 <span className="text-[#0071E3] font-sans">2D 地图仿真</span>
          </h3>
          <p className="text-xs text-[#86868B] mt-1 font-sans">
            针对不同设备尺寸提供了三种极致精炼的骨架。以下模拟高算力矿区调度系统的 2D 纯平地图。
          </p>
        </div>

        {/* Layout forms switcher */}
        <div className="flex bg-[#F5F5F7] p-1 border border-[#D2D2D7]/30 rounded-xl self-stretch md:self-auto gap-1">
          {(['single', 'master-detail', 'map'] as const).map((type) => (
            <button
              key={type}
              id={`layout-selector-${type}`}
              onClick={() => setLayoutType(type)}
              className={`flex-1 md:flex-none px-4 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                layoutType === type 
                  ? 'bg-white shadow-sm text-[#1D1D1F] font-bold' 
                  : 'text-[#86868B] hover:text-[#0071E3]'
              }`}
            >
              {type === 'single' && '单一视图'}
              {type === 'master-detail' && '主从视图'}
              {type === 'map' && '2D 地图调度'}
            </button>
          ))}
        </div>
      </div>

      {/* SINGLE VIEW LAYOUT */}
      {layoutType === 'single' && (
        <div className="bg-white border border-[#D2D2D7]/50 rounded-2xl p-6 shadow-sm space-y-6 font-sans">
          <div className="border-b border-[#D2D2D7]/30 pb-4">
            <span className="text-[10px] font-mono font-bold text-[#0071E3] uppercase tracking-widest block">SINGLE LAYOUT FORM</span>
            <h4 className="text-sm font-bold text-[#1D1D1F] mt-1">最简单一容器结构 (Single Panel Layout)</h4>
            <p className="text-xs text-[#86868B] mt-1 leading-relaxed">
              不包含侧栏或次级抽屉，所有的表格或参数在同一面板（Panel）内聚合。常态为静止，二级页面时后退按钮将替换根目录按钮，保持空间层级。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-[#D2D2D7]/40 bg-[#F5F5F7] rounded-xl p-5 hover:border-[#0071E3]/40 transition-all">
              <span className="text-[10px] font-mono font-bold text-[#0071E3]">01 / ROOT STAGE</span>
              <p className="text-xs font-bold text-[#1D1D1F] mt-2">常态静止主面板</p>
              <p className="text-xs text-[#86868B] mt-1 leading-relaxed">没有浮夸的侧边栏，页面元素保持绝对对称性。</p>
            </div>
            <div className="border border-[#D2D2D7]/40 bg-[#F5F5F7] rounded-xl p-5 hover:border-[#0071E3]/40 transition-all">
              <span className="text-[10px] font-mono font-bold text-[#0071E3]">02 / INTERACTION</span>
              <p className="text-xs font-bold text-[#1D1D1F] mt-2">二级详情跳转</p>
              <p className="text-xs text-[#86868B] mt-1 leading-relaxed">左右横向动画平移（View panel animation）滑动。</p>
            </div>
            <div className="border border-[#D2D2D7]/40 bg-[#F5F5F7] rounded-xl p-5 hover:border-[#0071E3]/40 transition-all">
              <span className="text-[10px] font-mono font-bold text-[#0071E3]">03 / BACK ROADS</span>
              <p className="text-xs font-bold text-[#1D1D1F] mt-2">后退按钮替代</p>
              <p className="text-xs text-[#86868B] mt-1 leading-relaxed">顶部面包屑或后退按钮完美继承在原菜单键位置。</p>
            </div>
          </div>
        </div>
      )}

      {/* MASTER-DETAIL LAYOUT */}
      {layoutType === 'master-detail' && (
        <div className="bg-white border border-[#D2D2D7]/50 rounded-2xl p-6 shadow-sm space-y-6 font-sans">
          <div className="border-b border-[#D2D2D7]/30 pb-4">
            <span className="text-[10px] font-mono font-bold text-[#0071E3] uppercase tracking-widest block">MASTER-DETAIL FORM</span>
            <h4 className="text-sm font-bold text-[#1D1D1F] mt-1">主从分类详细视图 (Master-Detail Layout)</h4>
            <p className="text-xs text-[#86868B] mt-1 leading-relaxed">
              适用于对海量资源（车辆列表、门禁配置、报警事件）进行统一查看、增删改。移动端采用卡片式层级穿梭，平板与桌面端则采用双栏/多栏拼接。
            </p>
          </div>

          <div className="border border-[#D2D2D7]/50 rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 h-[420px] shadow-sm">
            {/* Master Column (List) */}
            <div className="md:col-span-4 bg-[#F5F5F7] border-r border-[#D2D2D7]/40 flex flex-col justify-between">
              <div className="p-3 border-b border-[#D2D2D7]/40 bg-white">
                <input 
                  type="text" 
                  disabled 
                  placeholder="搜索资产设备..." 
                  className="w-full px-3 py-2 bg-[#F5F5F7] border border-[#D2D2D7]/40 rounded-xl text-xs text-[#1D1D1F] placeholder:text-[#86868B]/60 focus:outline-none"
                />
              </div>
              <div className="flex-1 p-2 overflow-y-auto space-y-1">
                {assets.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedAssetId(item.id)}
                    className={`w-full text-left p-3 rounded-xl text-xs font-semibold flex items-center justify-between border cursor-pointer transition-all ${
                      selectedAssetId === item.id 
                        ? 'bg-white border-[#0071E3]/20 text-[#1D1D1F] shadow-sm' 
                        : 'border-transparent text-[#86868B] hover:bg-[#0071E3]/5 hover:text-[#0071E3]'
                    }`}
                  >
                    <span>{item.name}</span>
                    <span className={`w-2.5 h-2.5 rounded-full ${
                      item.status === 'online' ? 'bg-emerald-500' : item.status === 'warning' ? 'bg-[#FF9500]' : 'bg-[#FF3B30]'
                    }`}></span>
                  </button>
                ))}
              </div>
              <div className="p-3.5 border-t border-[#D2D2D7]/40 bg-white/50 text-[10px] font-mono font-bold text-[#86868B]">
                TOTAL ITEMS: {assets.length}
              </div>
            </div>

            {/* Detail Column */}
            <div className="md:col-span-8 bg-white p-6 flex flex-col justify-between">
              {selectedAsset ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-[#D2D2D7]/40 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#0071E3]/10 rounded-xl">
                        {getAssetIcon(selectedAsset.type, selectedAsset.status)}
                      </div>
                      <h5 className="font-bold text-[#1D1D1F] text-sm">{selectedAsset.name}</h5>
                    </div>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border ${
                      selectedAsset.status === 'online' 
                        ? 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20' 
                        : selectedAsset.status === 'warning' 
                        ? 'bg-amber-500/10 text-amber-700 border-amber-500/20' 
                        : 'bg-red-500/10 text-red-700 border-red-500/20'
                    }`}>
                      {selectedAsset.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[10px] font-semibold text-[#86868B] block uppercase tracking-wider">当前遥测指标 (Live Metrics)</span>
                    <div className="bg-[#1D1D1F] border border-[#D2D2D7]/30 p-4 rounded-xl font-mono text-xs text-[#86868B] leading-relaxed">
                      {selectedAsset.info}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3.5 bg-[#F5F5F7] rounded-xl border border-[#D2D2D7]/30">
                      <span className="text-[9px] font-semibold text-[#86868B] block">MAP LOCATION X</span>
                      <span className="text-xs font-mono font-bold text-[#1D1D1F]">{selectedAsset.x} %</span>
                    </div>
                    <div className="p-3.5 bg-[#F5F5F7] rounded-xl border border-[#D2D2D7]/30">
                      <span className="text-[9px] font-semibold text-[#86868B] block">MAP LOCATION Y</span>
                      <span className="text-xs font-mono font-bold text-[#1D1D1F]">{selectedAsset.y} %</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-[#86868B] text-xs italic">
                  请在左栏选择一项资源查看其详情
                </div>
              )}

              <div className="flex justify-end gap-2 border-t border-[#D2D2D7]/40 pt-4">
                <button className="px-4 py-2 bg-[#F5F5F7] hover:bg-[#D2D2D7]/30 text-[#1D1D1F] border border-[#D2D2D7]/40 rounded-xl text-xs font-semibold cursor-pointer transition-colors">
                  标记锁定
                </button>
                <button className="px-4 py-2 bg-[#0071E3] hover:bg-[#0071E3]/95 text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors">
                  重置指令通道
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MAP LAYOUT AND SIMULATION */}
      {layoutType === 'map' && (
        <div className="space-y-6">
          
          {/* Map Guidelines Banner */}
          <div className="bg-[#1D1D1F] border border-[#D2D2D7]/30 rounded-2xl p-6 text-[#F5F5F7] space-y-4 shadow-sm font-sans">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Grid className="w-5 h-5 text-[#0071E3] shrink-0" />
                <h4 className="text-xs font-semibold uppercase tracking-tight text-[#86868B]">
                  MAP LAYOUT 控制台与行为模拟
                </h4>
              </div>

              {/* UI pattern toggle */}
              <div className="inline-flex rounded-xl bg-zinc-800 p-1 border border-[#D2D2D7]/20 shrink-0 gap-1">
                <button
                  id="map-ui-docked"
                  onClick={() => setUiPattern('docked')}
                  className={`px-4 py-1.5 text-[11px] font-semibold rounded-lg transition-all cursor-pointer ${
                    uiPattern === 'docked' 
                      ? 'bg-[#0071E3] text-white shadow-sm' 
                      : 'text-[#86868B] hover:text-zinc-200'
                  }`}
                >
                  DOCK MAP UI
                </button>
                <button
                  id="map-ui-floating"
                  onClick={() => setUiPattern('floating')}
                  className={`px-4 py-1.5 text-[11px] font-semibold rounded-lg transition-all cursor-pointer ${
                    uiPattern === 'floating' 
                      ? 'bg-amber-600 text-white shadow-sm' 
                      : 'text-[#86868B] hover:text-zinc-200'
                  }`}
                >
                  FLOATING OOUI
                </button>
              </div>
            </div>

            <p className="text-xs text-[#86868B] leading-relaxed">
              <strong>停靠与悬浮对齐法：</strong> 浮动对象上 UI（Object-On-Object UI）会遮挡重要的静态地图网格，并且当资产移动或处于拖拽中时，其代表的操作和数值标签会成为一个<strong>极难捕捉的“移动目标”</strong>（如下方动态演练）。因此，所有复杂的卡片、指标与多选操作，一律要求<strong>停靠（Dock）</strong>于侧边固定面板，禁止随图标浮动移动。
            </p>
          </div>

          {/* Interactive Map Visual Simulator */}
          <div className="border border-[#D2D2D7]/50 rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 h-[540px] bg-white shadow-sm">
            
            {/* Docked Side Panel (Left) */}
            {uiPattern === 'docked' && sidebarExpanded && (
              <div className="lg:col-span-4 bg-[#F5F5F7] border-r border-[#D2D2D7]/40 p-5 flex flex-col justify-between h-full overflow-y-auto font-sans">
                <div className="space-y-5">
                  <div className="flex justify-between items-center border-b border-[#D2D2D7]/40 pb-2.5">
                    <span className="text-[10px] font-mono font-bold text-[#86868B]">DOCKED ATTRIBUTE PANEL</span>
                    <button
                      onClick={() => setSidebarExpanded(false)}
                      className="p-1.5 hover:bg-[#0071E3]/10 rounded-lg text-[#86868B] hover:text-[#0071E3] cursor-pointer transition-colors"
                      title="折叠面板"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  </div>

                  {selectedAsset ? (
                    <div className="space-y-4">
                      {/* Asset Header Info */}
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-[#0071E3]/10 rounded-xl">
                          {getAssetIcon(selectedAsset.type, selectedAsset.status)}
                        </div>
                        <div>
                          <h5 className="font-bold text-[#1D1D1F] text-sm">{selectedAsset.name}</h5>
                          <p className="text-[10px] font-mono text-[#86868B] mt-0.5">Asset ID: {selectedAsset.id.toUpperCase()}</p>
                        </div>
                      </div>

                      {/* Status indicator badge */}
                      <div className="flex items-center justify-between bg-white border border-[#D2D2D7]/30 p-3 rounded-xl text-xs">
                        <span className="text-[#86868B]">当前连接可用度</span>
                        <span className={`font-mono font-bold px-2 py-0.5 rounded-md border ${
                          selectedAsset.status === 'online' 
                            ? 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20' 
                            : selectedAsset.status === 'warning' 
                            ? 'bg-amber-500/10 text-amber-700 border-amber-500/20' 
                            : 'bg-red-500/10 text-red-700 border-red-500/20'
                        }`}>
                          {selectedAsset.status.toUpperCase()}
                        </span>
                      </div>

                      {/* Live metrics log */}
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-semibold text-[#86868B] block uppercase">现场遥测实时数据</span>
                        <div className="bg-[#1D1D1F] border border-[#D2D2D7]/30 p-3.5 rounded-xl font-mono text-[11px] text-[#86868B] leading-relaxed">
                          {selectedAsset.info}
                          <div className="text-[10px] text-[#0071E3] mt-2 font-bold">
                            • Coordinates: X={selectedAsset.x}%, Y={selectedAsset.y}%
                          </div>
                        </div>
                      </div>

                      {/* Instruction Panel */}
                      <div className="bg-[#0071E3]/5 border border-[#0071E3]/15 rounded-xl p-4 text-[11px] text-[#86868B] leading-relaxed">
                        <strong>停靠面板操作优势：</strong> 固定停靠让操作员的双眼在不偏离主地图全局视差的前提下，在键盘或手持板上获得高枕无忧的操控保障。
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-[#86868B] text-xs italic">
                      请在地图上点击选择任意移动车辆或静态资产。
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-[#D2D2D7]/40">
                  <div className="flex gap-2 font-mono">
                    <button className="flex-1 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-100 font-bold rounded-xl text-xs cursor-pointer transition-colors">
                      CMD SHUTDOWN
                    </button>
                    <button className="flex-1 py-2 bg-[#0071E3] hover:bg-[#0071E3]/95 text-white font-bold rounded-xl text-xs cursor-pointer transition-colors">
                      CMD ROUTE REPLAN
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Reopen sidebar button if collapsed */}
            {uiPattern === 'docked' && !sidebarExpanded && (
              <div className="w-12 bg-[#F5F5F7] border-r border-[#D2D2D7]/40 flex flex-col items-center py-4 justify-between h-full font-sans">
                <button
                  onClick={() => setSidebarExpanded(true)}
                  className="p-1.5 hover:bg-[#0071E3]/10 rounded-lg text-[#86868B] hover:text-[#0071E3] cursor-pointer transition-colors"
                  title="展开侧边属性板"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="h-28 flex items-center">
                  <span className="rotate-90 origin-center whitespace-nowrap text-[10px] font-mono font-bold text-[#86868B]">
                    DOCKED DATA PANEL
                  </span>
                </div>
                <div></div>
              </div>
            )}

            {/* Simulated Map View Container */}
            <div 
              className={`relative bg-zinc-150 overflow-hidden flex flex-col justify-between h-full ${
                uiPattern === 'docked' 
                  ? sidebarExpanded ? 'lg:col-span-8' : 'lg:col-span-11'
                  : 'lg:col-span-12'
              }`}
              onMouseMove={handleMapMouseMove}
              onMouseUp={handleMapMouseUp}
              onMouseLeave={handleMapMouseUp}
            >
              {/* UPPER BAR: Simulated Map Status */}
              <div className="p-3.5 bg-[#1D1D1F]/95 backdrop-blur border-b border-[#D2D2D7]/20 text-white flex justify-between items-center z-10 shadow-sm font-sans">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-zinc-300 font-bold flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-[#0071E3] animate-spin" style={{ animationDuration: '6s' }} /> 
                    ROCK-AI LIVE SCHEDULER MAP <span className="text-[10px] text-[#0071E3] font-sans font-medium italic">(2D ONLY)</span>
                  </span>
                </div>

                {/* Simulator controls */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPatrolling(!isPatrolling)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer ${
                      isPatrolling 
                        ? 'bg-[#0071E3] text-white shadow-sm' 
                        : 'bg-zinc-800 text-[#a8a29e] hover:text-white border border-[#D2D2D7]/20'
                    }`}
                  >
                    {isPatrolling ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    <span>{isPatrolling ? '停止模拟移动' : '启动模拟移动'}</span>
                  </button>
                </div>
              </div>

              {/* MAP GRID CANVAS (Drag and Drop Area) */}
              <div 
                ref={mapContainerRef}
                className="flex-1 w-full relative bg-[#0e0c12]"
                style={{
                  backgroundImage: 'radial-gradient(circle, rgba(0,113,227,0.12) 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                  transform: `scale(${mapZoom}) rotate(${mapRotation}deg)`,
                  transition: draggingAssetId ? 'none' : 'transform 0.15s ease-out',
                }}
              >
                {/* Visual grid reference lines (X/Y) */}
                <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-[#D2D2D7]/10 pointer-events-none"></div>
                <div className="absolute inset-y-0 left-1/2 border-l border-dashed border-[#D2D2D7]/10 pointer-events-none"></div>

                {/* Assets Markers */}
                {assets.map((asset) => {
                  const isSelected = selectedAssetId === asset.id;
                  
                  // Status Colors
                  let borderClass = 'border-[#0071E3] bg-[#1D1D1F]/90 text-[#0071E3] shadow-inner';
                  if (asset.status === 'warning') borderClass = 'border-[#FF9500] bg-[#1D1D1F]/90 text-[#FF9500] shadow-inner';
                  if (asset.status === 'critical') borderClass = 'border-[#FF3B30] bg-[#1D1D1F]/90 text-[#FF3B30] shadow-inner';

                  return (
                    <div
                      key={asset.id}
                      className="absolute group z-20 cursor-grab active:cursor-grabbing"
                      style={{ 
                        left: `${asset.x}%`, 
                        top: `${asset.y}%`,
                        transform: `translate(-50%, -50%) rotate(${-mapRotation}deg)`, // un-rotate label
                      }}
                      onMouseDown={(e) => handleMapMouseDown(e, asset.id)}
                    >
                      {/* Anchor Dot */}
                      <div className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all ${
                        isSelected 
                          ? 'scale-125 border-white ring-4 ring-[#0071E3]/40' 
                          : 'hover:scale-110'
                      } ${borderClass}`}>
                        {asset.type === 'vehicle' && <Truck className="w-4 h-4" />}
                        {asset.type === 'static-gate' && <KeyRound className="w-4 h-4" />}
                        {asset.type === 'static-camera' && <Video className="w-4 h-4" />}
                      </div>

                      {/* Micro inline label */}
                      <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-[#1D1D1F]/95 border border-[#D2D2D7]/35 text-[9px] font-mono text-[#e4e4e7] px-2 py-0.5 rounded-md whitespace-nowrap shadow-sm select-none pointer-events-none">
                        {asset.id.toUpperCase()}
                      </div>

                      {/* FLOATING OOUI WARNING MODE REPRESENTATION */}
                      {uiPattern === 'floating' && isSelected && (
                        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-[#2a1708] text-amber-100 border border-amber-500/50 px-4 py-3 rounded-xl shadow-[0_12px_32px_rgba(0,0,0,0.5)] w-56 z-30 pointer-events-auto font-sans animate-fade-in">
                          <div className="flex items-center gap-1.5 border-b border-amber-500/20 pb-2 mb-2">
                            <span className="w-2 h-2 bg-amber-500 rounded-full animate-ping"></span>
                            <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-amber-400">FLOATING MOVING TARGET</span>
                          </div>
                          <span className="text-xs font-bold block">{asset.name}</span>
                          <span className="text-[9px] text-[#fcd34d] font-mono block mt-1 leading-relaxed">
                            {asset.info}
                          </span>
                          {/* visual pointer triangle */}
                          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#2a1708] border-r border-b border-amber-500/50 rotate-45"></div>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Simulated Sector Boundaries */}
                <div className="absolute top-1/4 left-1/3 w-40 h-40 border border-[#D2D2D7]/5 rounded-full pointer-events-none"></div>
                <div className="absolute bottom-1/4 right-1/4 w-52 h-52 border border-dashed border-[#D2D2D7]/5 rounded-full pointer-events-none"></div>
              </div>

              {/* LOWER FLOATING MAP CONTROLS */}
              <div className="absolute bottom-4 right-4 bg-[#1D1D1F]/95 backdrop-blur border border-[#D2D2D7]/35 rounded-xl p-3 flex items-center gap-2.5 shadow-lg z-20 font-sans">
                {/* Compass / Rotation (Specified) */}
                <button
                  onClick={() => setMapRotation(0)}
                  className="p-2 bg-zinc-800 hover:bg-[#0071E3] text-zinc-300 hover:text-white rounded-xl transition-all cursor-pointer relative"
                  title="点击重置北方 (Reset to North)"
                >
                  <Compass 
                    className="w-5 h-5 transition-transform duration-300" 
                    style={{ transform: `rotate(${mapRotation}deg)` }}
                  />
                  {/* Micro compass indicator */}
                  <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                </button>

                <div className="h-5 w-px bg-zinc-800"></div>

                {/* Slider for rotation */}
                <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-[#86868B]">
                  <span>旋转</span>
                  <input 
                    type="range" 
                    min="0" 
                    max="360" 
                    value={mapRotation}
                    onChange={(e) => setMapRotation(Number(e.target.value))}
                    className="w-16 accent-[#0071E3] h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="w-8 text-right text-[#86868B]">{mapRotation}°</span>
                </div>

                <div className="hidden sm:block h-5 w-px bg-zinc-800"></div>

                {/* Zoom Controls (Specified: +/- Buttons) */}
                <button
                  onClick={() => setMapZoom(prev => Math.min(1.8, prev + 0.1))}
                  className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-lg cursor-pointer"
                  title="放大 (Zoom In)"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setMapZoom(prev => Math.max(0.6, prev - 0.1))}
                  className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-lg cursor-pointer"
                  title="缩小 (Zoom Out)"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>

                {/* Show All (Specified) */}
                <button
                  onClick={handleShowAll}
                  className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-lg cursor-pointer"
                  title="全显重置 (Show All / Fit Map)"
                >
                  <Maximize className="w-4 h-4" />
                </button>
              </div>

              {/* Dynamic bottom telemetry footer */}
              <div className="p-3 bg-[#0a090d] border-t border-zinc-800 text-[10px] font-mono text-[#86868B] flex justify-between items-center">
                <span>SIMULATION FPS: 60 | RENDER: CANVAS_2D</span>
                <span className="font-semibold text-[#0071E3]">DRAG ANY VEHICLE MARKER ON MAP GRID</span>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
