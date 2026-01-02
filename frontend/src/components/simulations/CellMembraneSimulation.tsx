import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CellMembraneSimulation() {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)
  const [showFluidAnimation, setShowFluidAnimation] = useState(false)

  const components = [
    {
      id: 'phospholipid',
      name: '磷脂双分子层',
      description: '细胞膜的基本骨架，由磷脂分子排列成两层',
      features: ['亲水头部朝外', '疏水尾部朝内', '具有流动性'],
      color: '#525252'
    },
    {
      id: 'protein',
      name: '膜蛋白',
      description: '镶嵌在磷脂双分子层中或附着在表面的蛋白质',
      features: ['载体蛋白（运输物质）', '受体蛋白（信号识别）', '酶（催化反应）'],
      color: '#737373'
    },
    {
      id: 'cholesterol',
      name: '胆固醇',
      description: '动物细胞膜中的重要成分，调节膜的流动性',
      features: ['稳定膜结构', '调节流动性', '动物细胞特有'],
      color: '#a3a3a3'
    },
    {
      id: 'glycoprotein',
      name: '糖蛋白',
      description: '蛋白质与糖类结合形成，位于细胞膜外侧',
      features: ['细胞识别', '保护作用', '信息传递'],
      color: '#404040'
    }
  ]

  return (
    <div className="space-y-6">
      {/* 说明 */}
      <div className="text-sm text-[var(--text-secondary)]">
        点击不同组件了解细胞膜的流动镶嵌模型
      </div>

      {/* 控制 */}
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
          <input
            type="checkbox"
            checked={showFluidAnimation}
            onChange={(e) => setShowFluidAnimation(e.target.checked)}
            className="accent-[var(--text-primary)]"
          />
          显示流动性动画
        </label>
      </div>

      {/* 细胞膜模型 */}
      <div className="relative aspect-[2/1] max-w-3xl mx-auto rounded-lg bg-[var(--bg-tertiary)] overflow-hidden">
        <svg viewBox="0 0 600 300" className="w-full h-full">
          {/* 背景 - 细胞外 */}
          <rect x="0" y="0" width="600" height="100" fill="var(--bg-secondary)" />
          <text x="300" y="30" textAnchor="middle" fill="var(--text-tertiary)" fontSize="12">细胞外</text>

          {/* 背景 - 细胞内 */}
          <rect x="0" y="200" width="600" height="100" fill="var(--bg-secondary)" />
          <text x="300" y="280" textAnchor="middle" fill="var(--text-tertiary)" fontSize="12">细胞内</text>

          {/* 磷脂双分子层 - 上层 */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.g
              key={`upper-${i}`}
              animate={showFluidAnimation ? { x: [0, 5, -5, 0] } : {}}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.1 }}
            >
              {/* 亲水头部 */}
              <circle
                cx={30 + i * 30}
                cy={110}
                r={10}
                fill={selectedComponent === 'phospholipid' ? '#171717' : '#525252'}
                className="cursor-pointer"
                onClick={() => setSelectedComponent('phospholipid')}
              />
              {/* 疏水尾部 */}
              <path
                d={`M${30 + i * 30} 120 Q${25 + i * 30} 140 ${30 + i * 30} 150`}
                fill="none"
                stroke={selectedComponent === 'phospholipid' ? '#171717' : '#737373'}
                strokeWidth="3"
              />
              <path
                d={`M${30 + i * 30} 120 Q${35 + i * 30} 140 ${30 + i * 30} 150`}
                fill="none"
                stroke={selectedComponent === 'phospholipid' ? '#171717' : '#737373'}
                strokeWidth="3"
              />
            </motion.g>
          ))}

          {/* 磷脂双分子层 - 下层 */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.g
              key={`lower-${i}`}
              animate={showFluidAnimation ? { x: [0, -5, 5, 0] } : {}}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.1 }}
            >
              {/* 疏水尾部 */}
              <path
                d={`M${30 + i * 30} 180 Q${25 + i * 30} 160 ${30 + i * 30} 150`}
                fill="none"
                stroke={selectedComponent === 'phospholipid' ? '#171717' : '#737373'}
                strokeWidth="3"
              />
              <path
                d={`M${30 + i * 30} 180 Q${35 + i * 30} 160 ${30 + i * 30} 150`}
                fill="none"
                stroke={selectedComponent === 'phospholipid' ? '#171717' : '#737373'}
                strokeWidth="3"
              />
              {/* 亲水头部 */}
              <circle
                cx={30 + i * 30}
                cy={190}
                r={10}
                fill={selectedComponent === 'phospholipid' ? '#171717' : '#525252'}
                className="cursor-pointer"
                onClick={() => setSelectedComponent('phospholipid')}
              />
            </motion.g>
          ))}

          {/* 整合蛋白（跨膜蛋白） */}
          <motion.g
            animate={showFluidAnimation ? { x: [0, 10, 0] } : {}}
            transition={{ duration: 5, repeat: Infinity }}
          >
            <ellipse
              cx={150}
              cy={150}
              rx={25}
              ry={50}
              fill={selectedComponent === 'protein' ? '#171717' : '#737373'}
              className="cursor-pointer"
              onClick={() => setSelectedComponent('protein')}
            />
            <text x={150} y={155} textAnchor="middle" fill="var(--bg-primary)" fontSize="8">载体</text>
          </motion.g>

          {/* 通道蛋白 */}
          <motion.g
            animate={showFluidAnimation ? { x: [0, -8, 0] } : {}}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <rect
              x={280}
              y={105}
              width={40}
              height={90}
              rx={5}
              fill={selectedComponent === 'protein' ? '#171717' : '#737373'}
              className="cursor-pointer"
              onClick={() => setSelectedComponent('protein')}
            />
            <rect x={290} y={115} width={20} height={70} fill="var(--bg-tertiary)" />
            <text x={300} y={155} textAnchor="middle" fill="var(--bg-primary)" fontSize="8">通道</text>
          </motion.g>

          {/* 外周蛋白 */}
          <ellipse
            cx={420}
            cy={105}
            rx={20}
            ry={12}
            fill={selectedComponent === 'protein' ? '#171717' : '#a3a3a3'}
            className="cursor-pointer"
            onClick={() => setSelectedComponent('protein')}
          />

          {/* 胆固醇 */}
          <motion.g
            animate={showFluidAnimation ? { y: [0, 3, 0] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <polygon
              points="500,120 510,150 500,145 490,150"
              fill={selectedComponent === 'cholesterol' ? '#171717' : '#a3a3a3'}
              className="cursor-pointer"
              onClick={() => setSelectedComponent('cholesterol')}
            />
          </motion.g>

          {/* 糖蛋白 */}
          <g className="cursor-pointer" onClick={() => setSelectedComponent('glycoprotein')}>
            <ellipse
              cx={550}
              cy={115}
              rx={15}
              ry={25}
              fill={selectedComponent === 'glycoprotein' ? '#171717' : '#737373'}
            />
            {/* 糖链 */}
            <path
              d="M545 90 L540 70 M550 90 L550 65 M555 90 L560 70"
              fill="none"
              stroke={selectedComponent === 'glycoprotein' ? '#171717' : '#404040'}
              strokeWidth="2"
            />
            <circle cx={540} cy={65} r={5} fill={selectedComponent === 'glycoprotein' ? '#171717' : '#404040'} />
            <circle cx={550} cy={60} r={5} fill={selectedComponent === 'glycoprotein' ? '#171717' : '#404040'} />
            <circle cx={560} cy={65} r={5} fill={selectedComponent === 'glycoprotein' ? '#171717' : '#404040'} />
          </g>

          {/* 图例 */}
          <g transform="translate(10, 250)">
            <circle cx={10} cy={10} r={6} fill="#525252" />
            <text x={25} y={14} fill="var(--text-secondary)" fontSize="9">磷脂</text>
            <ellipse cx={80} cy={10} rx={8} ry={5} fill="#737373" />
            <text x={95} y={14} fill="var(--text-secondary)" fontSize="9">蛋白质</text>
            <polygon points="150,5 155,15 150,12 145,15" fill="#a3a3a3" />
            <text x={165} y={14} fill="var(--text-secondary)" fontSize="9">胆固醇</text>
          </g>
        </svg>
      </div>

      {/* 组件选择 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {components.map(comp => (
          <button
            key={comp.id}
            onClick={() => setSelectedComponent(comp.id)}
            className={`px-3 py-2 rounded-lg text-sm transition-all ${
              selectedComponent === comp.id
                ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
                : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            {comp.name}
          </button>
        ))}
      </div>

      {/* 组件详情 */}
      <AnimatePresence>
        {selectedComponent && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="p-4 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-color)]"
          >
            {(() => {
              const comp = components.find(c => c.id === selectedComponent)
              if (!comp) return null
              return (
                <>
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-[var(--text-primary)]">{comp.name}</h3>
                    <button
                      onClick={() => setSelectedComponent(null)}
                      className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
                    >
                      ✕
                    </button>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] mb-3">{comp.description}</p>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-[var(--text-primary)]">特点：</p>
                    <ul className="list-disc list-inside text-sm text-[var(--text-secondary)]">
                      {comp.features.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>
                </>
              )
            })()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 知识点 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)] text-sm">
        <p className="font-medium text-[var(--text-primary)] mb-2">流动镶嵌模型要点：</p>
        <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
          <li><strong>基本骨架</strong>：磷脂双分子层</li>
          <li><strong>流动性</strong>：磷脂分子和蛋白质可以运动</li>
          <li><strong>不对称性</strong>：糖蛋白只分布在细胞膜外侧</li>
          <li><strong>选择透过性</strong>：细胞膜对物质的通过具有选择性</li>
          <li><strong>功能</strong>：保护、物质运输、信息传递、细胞识别</li>
        </ul>
      </div>
    </div>
  )
}
