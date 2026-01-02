import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface NucleusComponent {
  id: string
  name: string
  description: string
  function: string
}

const nucleusComponents: NucleusComponent[] = [
  {
    id: 'nuclear-envelope',
    name: '核膜',
    description: '双层膜结构，外膜与内质网相连',
    function: '将核内物质与细胞质分开，控制物质进出'
  },
  {
    id: 'nuclear-pore',
    name: '核孔',
    description: '核膜上的通道，由多种蛋白质构成',
    function: '实现核质之间的物质交换和信息交流'
  },
  {
    id: 'nucleolus',
    name: '核仁',
    description: '核内折光性较强的球状结构',
    function: '与核糖体RNA的合成及核糖体的形成有关'
  },
  {
    id: 'chromatin',
    name: '染色质/染色体',
    description: 'DNA和蛋白质组成的复合物',
    function: '储存遗传信息，在细胞分裂时变为染色体'
  },
  {
    id: 'nucleoplasm',
    name: '核基质',
    description: '核内的液态物质',
    function: '为核内代谢提供场所和原料'
  }
]

export default function CellNucleusSimulation() {
  const [selectedComponent, setSelectedComponent] = useState<NucleusComponent | null>(null)

  return (
    <div className="space-y-6">
      {/* 说明 */}
      <div className="text-sm text-[var(--text-secondary)]">
        点击细胞核的各部分结构，了解其功能
      </div>

      {/* 细胞核结构图 */}
      <div className="relative h-80 rounded-lg bg-[var(--bg-tertiary)] overflow-hidden">
        <svg viewBox="0 0 400 300" className="w-full h-full">
          {/* 细胞质背景 */}
          <rect x="0" y="0" width="400" height="300" fill="var(--bg-secondary)" />

          {/* 核膜（外层） */}
          <motion.ellipse
            cx="200"
            cy="150"
            rx="120"
            ry="100"
            fill="none"
            stroke="var(--text-secondary)"
            strokeWidth="8"
            className="cursor-pointer"
            whileHover={{ strokeWidth: 10 }}
            onClick={() => setSelectedComponent(nucleusComponents[0])}
            animate={{
              stroke: selectedComponent?.id === 'nuclear-envelope' ? 'var(--text-primary)' : 'var(--text-secondary)'
            }}
          />

          {/* 核膜（内层） */}
          <ellipse
            cx="200"
            cy="150"
            rx="112"
            ry="92"
            fill="var(--bg-tertiary)"
            stroke="var(--text-secondary)"
            strokeWidth="2"
          />

          {/* 核孔 */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
            const rad = (angle * Math.PI) / 180
            const x = 200 + 116 * Math.cos(rad)
            const y = 150 + 96 * Math.sin(rad)
            return (
              <motion.circle
                key={i}
                cx={x}
                cy={y}
                r="8"
                fill="var(--bg-secondary)"
                stroke="var(--text-tertiary)"
                strokeWidth="2"
                className="cursor-pointer"
                whileHover={{ scale: 1.3 }}
                onClick={() => setSelectedComponent(nucleusComponents[1])}
                animate={{
                  fill: selectedComponent?.id === 'nuclear-pore' ? 'var(--text-primary)' : 'var(--bg-secondary)'
                }}
              />
            )
          })}

          {/* 核仁 */}
          <motion.circle
            cx="180"
            cy="130"
            r="25"
            fill="var(--text-tertiary)"
            className="cursor-pointer"
            whileHover={{ scale: 1.1 }}
            onClick={() => setSelectedComponent(nucleusComponents[2])}
            animate={{
              fill: selectedComponent?.id === 'nucleolus' ? 'var(--text-primary)' : 'var(--text-tertiary)'
            }}
          />
          <text x="180" y="135" textAnchor="middle" fill="var(--bg-primary)" fontSize="10">核仁</text>

          {/* 染色质 */}
          <motion.g
            className="cursor-pointer"
            onClick={() => setSelectedComponent(nucleusComponents[3])}
          >
            <motion.path
              d="M150 100 Q170 120 160 140 Q150 160 170 180"
              fill="none"
              stroke={selectedComponent?.id === 'chromatin' ? 'var(--text-primary)' : 'var(--text-secondary)'}
              strokeWidth="4"
              strokeLinecap="round"
            />
            <motion.path
              d="M220 90 Q240 110 230 130 Q220 150 240 170 Q260 190 250 200"
              fill="none"
              stroke={selectedComponent?.id === 'chromatin' ? 'var(--text-primary)' : 'var(--text-secondary)'}
              strokeWidth="4"
              strokeLinecap="round"
            />
            <motion.path
              d="M190 160 Q210 170 200 190 Q190 210 210 220"
              fill="none"
              stroke={selectedComponent?.id === 'chromatin' ? 'var(--text-primary)' : 'var(--text-secondary)'}
              strokeWidth="3"
              strokeLinecap="round"
            />
          </motion.g>

          {/* 标注线 */}
          <line x1="320" y1="150" x2="280" y2="150" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="3 2" />
          <text x="330" y="155" fill="var(--text-tertiary)" fontSize="10">核膜</text>

          <line x1="320" y1="80" x2="260" y2="100" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="3 2" />
          <text x="330" y="85" fill="var(--text-tertiary)" fontSize="10">核孔</text>

          <line x1="100" y1="130" x2="155" y2="130" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="3 2" />
          <text x="60" y="135" fill="var(--text-tertiary)" fontSize="10">核仁</text>

          <line x1="100" y1="180" x2="150" y2="170" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="3 2" />
          <text x="50" y="185" fill="var(--text-tertiary)" fontSize="10">染色质</text>
        </svg>
      </div>

      {/* 选中组件信息 */}
      <AnimatePresence>
        {selectedComponent && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="p-4 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--text-primary)]"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-[var(--text-primary)]">{selectedComponent.name}</h3>
              <button
                onClick={() => setSelectedComponent(null)}
                className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
              >
                ✕
              </button>
            </div>
            <p className="text-sm text-[var(--text-secondary)] mb-2">{selectedComponent.description}</p>
            <p className="text-sm">
              <span className="text-[var(--text-tertiary)]">功能：</span>
              <span className="text-[var(--text-secondary)]">{selectedComponent.function}</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 染色质与染色体转换 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
        <h3 className="font-medium text-[var(--text-primary)] mb-4">染色质与染色体的转换</h3>
        <div className="flex items-center justify-center gap-4">
          <div className="text-center">
            <svg viewBox="0 0 80 80" className="w-20 h-20">
              <path
                d="M20 20 Q40 30 30 50 Q20 70 40 75 Q60 70 50 50 Q40 30 60 20"
                fill="none"
                stroke="var(--text-secondary)"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
            <p className="text-sm text-[var(--text-secondary)]">染色质</p>
            <p className="text-xs text-[var(--text-tertiary)]">（间期）</p>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-[var(--text-tertiary)]">螺旋化</span>
            <span className="text-2xl text-[var(--text-secondary)]">⇌</span>
            <span className="text-[var(--text-tertiary)]">解螺旋</span>
          </div>

          <div className="text-center">
            <svg viewBox="0 0 80 80" className="w-20 h-20">
              <path d="M30 15 L30 65" stroke="var(--text-primary)" strokeWidth="8" strokeLinecap="round" />
              <path d="M50 15 L50 65" stroke="var(--text-primary)" strokeWidth="8" strokeLinecap="round" />
              <ellipse cx="40" cy="40" rx="15" ry="5" fill="var(--text-secondary)" />
            </svg>
            <p className="text-sm text-[var(--text-secondary)]">染色体</p>
            <p className="text-xs text-[var(--text-tertiary)]">（分裂期）</p>
          </div>
        </div>
        <p className="text-xs text-center text-[var(--text-tertiary)] mt-4">
          染色质和染色体是同一物质在不同时期的两种形态
        </p>
      </div>

      {/* 细胞核功能 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
          <h4 className="font-medium text-[var(--text-primary)] mb-2">遗传信息库</h4>
          <p className="text-sm text-[var(--text-secondary)]">
            细胞核中的DNA携带遗传信息，控制生物的遗传和变异
          </p>
        </div>
        <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
          <h4 className="font-medium text-[var(--text-primary)] mb-2">代谢控制中心</h4>
          <p className="text-sm text-[var(--text-secondary)]">
            通过控制mRNA的合成，间接控制蛋白质的合成，进而控制细胞代谢
          </p>
        </div>
      </div>

      {/* 知识点 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)] text-sm">
        <p className="font-medium text-[var(--text-primary)] mb-2">细胞核要点：</p>
        <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
          <li><strong>核膜</strong>：双层膜，外膜与内质网相连，有核孔</li>
          <li><strong>核孔</strong>：mRNA、蛋白质等大分子物质的通道</li>
          <li><strong>核仁</strong>：与rRNA合成和核糖体形成有关</li>
          <li><strong>染色质</strong>：DNA + 蛋白质（主要是组蛋白）</li>
          <li><strong>功能</strong>：遗传信息库，细胞代谢和遗传的控制中心</li>
        </ul>
      </div>
    </div>
  )
}
