import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CellType {
  id: string
  name: string
  shape: string
  function: string
  genes: string[]
}

const cellTypes: CellType[] = [
  {
    id: 'stem',
    name: '干细胞',
    shape: 'circle',
    function: '具有分裂和分化能力',
    genes: ['全部基因都可表达']
  },
  {
    id: 'nerve',
    name: '神经细胞',
    shape: 'neuron',
    function: '传导神经冲动',
    genes: ['神经递质合成基因', '离子通道基因']
  },
  {
    id: 'muscle',
    name: '肌肉细胞',
    shape: 'fiber',
    function: '收缩运动',
    genes: ['肌动蛋白基因', '肌球蛋白基因']
  },
  {
    id: 'blood',
    name: '红细胞',
    shape: 'disc',
    function: '运输氧气',
    genes: ['血红蛋白基因']
  },
  {
    id: 'epithelial',
    name: '上皮细胞',
    shape: 'cube',
    function: '保护、分泌',
    genes: ['角蛋白基因', '黏液蛋白基因']
  }
]

export default function CellDifferentiationSimulation() {
  const [selectedCell, setSelectedCell] = useState<CellType | null>(null)
  const [isDifferentiating, setIsDifferentiating] = useState(false)
  const [differentiationStep, setDifferentiationStep] = useState(0)

  const startDifferentiation = () => {
    setIsDifferentiating(true)
    setDifferentiationStep(0)
    let step = 0
    const interval = setInterval(() => {
      step++
      setDifferentiationStep(step)
      if (step >= 4) {
        clearInterval(interval)
        setIsDifferentiating(false)
      }
    }, 1000)
  }

  const renderCellShape = (type: string, size: number = 40, color: string = 'var(--text-primary)') => {
    switch (type) {
      case 'circle':
        return <circle cx={size/2} cy={size/2} r={size/2 - 2} fill={color} />
      case 'neuron':
        return (
          <g>
            <circle cx={size/2} cy={size/2} r={size/4} fill={color} />
            <line x1={size/4} y1={size/2} x2={0} y2={size/4} stroke={color} strokeWidth="2" />
            <line x1={size/4} y1={size/2} x2={0} y2={size*3/4} stroke={color} strokeWidth="2" />
            <line x1={size*3/4} y1={size/2} x2={size} y2={size/2} stroke={color} strokeWidth="3" />
          </g>
        )
      case 'fiber':
        return <ellipse cx={size/2} cy={size/2} rx={size/2 - 2} ry={size/6} fill={color} />
      case 'disc':
        return (
          <g>
            <ellipse cx={size/2} cy={size/2} rx={size/2 - 2} ry={size/3} fill={color} />
            <ellipse cx={size/2} cy={size/2} rx={size/4} ry={size/6} fill="var(--bg-tertiary)" />
          </g>
        )
      case 'cube':
        return <rect x="4" y="4" width={size - 8} height={size - 8} rx="2" fill={color} />
      default:
        return <circle cx={size/2} cy={size/2} r={size/2 - 2} fill={color} />
    }
  }

  return (
    <div className="space-y-6">
      {/* 说明 */}
      <div className="text-sm text-[var(--text-secondary)]">
        细胞分化是指细胞在形态、结构和功能上发生稳定性差异的过程
      </div>

      {/* 分化过程演示 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-[var(--text-primary)]">细胞分化过程</h3>
          <button
            onClick={startDifferentiation}
            disabled={isDifferentiating}
            className="px-4 py-2 rounded-lg bg-[var(--text-primary)] text-[var(--bg-primary)] text-sm font-medium disabled:opacity-50"
          >
            {isDifferentiating ? '分化中...' : '开始分化'}
          </button>
        </div>

        <div className="relative h-64">
          <svg viewBox="0 0 400 220" className="w-full h-full">
            {/* 受精卵 */}
            <motion.g animate={{ opacity: differentiationStep >= 0 ? 1 : 0.3 }}>
              <circle cx="50" cy="110" r="25" fill="var(--text-primary)" />
              <circle cx="50" cy="110" r="10" fill="var(--text-secondary)" />
              <text x="50" y="150" textAnchor="middle" fill="var(--text-tertiary)" fontSize="10">受精卵</text>
            </motion.g>

            {/* 箭头1 */}
            <motion.path
              d="M80 110 L120 110"
              stroke="var(--text-tertiary)"
              strokeWidth="2"
              markerEnd="url(#arrowD)"
              animate={{ opacity: differentiationStep >= 1 ? 1 : 0.3 }}
            />
            <motion.text
              x="100"
              y="100"
              textAnchor="middle"
              fill="var(--text-tertiary)"
              fontSize="9"
              animate={{ opacity: differentiationStep >= 1 ? 1 : 0 }}
            >
              有丝分裂
            </motion.text>

            {/* 早期胚胎细胞 */}
            <motion.g animate={{ opacity: differentiationStep >= 1 ? 1 : 0.3 }}>
              {[0, 1, 2, 3].map((i) => (
                <circle
                  key={i}
                  cx={140 + (i % 2) * 20}
                  cy={100 + Math.floor(i / 2) * 20}
                  r="12"
                  fill="var(--text-secondary)"
                />
              ))}
              <text x="150" y="150" textAnchor="middle" fill="var(--text-tertiary)" fontSize="10">胚胎细胞</text>
            </motion.g>

            {/* 箭头2 */}
            <motion.path
              d="M180 110 L220 110"
              stroke="var(--text-tertiary)"
              strokeWidth="2"
              markerEnd="url(#arrowD)"
              animate={{ opacity: differentiationStep >= 2 ? 1 : 0.3 }}
            />
            <motion.text
              x="200"
              y="100"
              textAnchor="middle"
              fill="var(--text-tertiary)"
              fontSize="9"
              animate={{ opacity: differentiationStep >= 2 ? 1 : 0 }}
            >
              基因选择性表达
            </motion.text>

            {/* 分化后的不同细胞 */}
            <motion.g animate={{ opacity: differentiationStep >= 3 ? 1 : 0 }}>
              {/* 神经细胞 */}
              <g transform="translate(240, 30)">
                <svg width="50" height="50" viewBox="0 0 50 50">
                  {renderCellShape('neuron', 50, 'var(--text-primary)')}
                </svg>
                <text x="25" y="60" textAnchor="middle" fill="var(--text-tertiary)" fontSize="8">神经细胞</text>
              </g>

              {/* 肌肉细胞 */}
              <g transform="translate(300, 30)">
                <svg width="50" height="50" viewBox="0 0 50 50">
                  {renderCellShape('fiber', 50, 'var(--text-secondary)')}
                </svg>
                <text x="25" y="60" textAnchor="middle" fill="var(--text-tertiary)" fontSize="8">肌肉细胞</text>
              </g>

              {/* 红细胞 */}
              <g transform="translate(240, 110)">
                <svg width="50" height="50" viewBox="0 0 50 50">
                  {renderCellShape('disc', 50, '#ef4444')}
                </svg>
                <text x="25" y="60" textAnchor="middle" fill="var(--text-tertiary)" fontSize="8">红细胞</text>
              </g>

              {/* 上皮细胞 */}
              <g transform="translate(300, 110)">
                <svg width="50" height="50" viewBox="0 0 50 50">
                  {renderCellShape('cube', 50, 'var(--text-tertiary)')}
                </svg>
                <text x="25" y="60" textAnchor="middle" fill="var(--text-tertiary)" fontSize="8">上皮细胞</text>
              </g>
            </motion.g>

            {/* 分化箭头 */}
            <motion.g animate={{ opacity: differentiationStep >= 2 ? 1 : 0 }}>
              <path d="M220 100 L240 50" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="3 2" />
              <path d="M220 100 L300 50" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="3 2" />
              <path d="M220 120 L240 130" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="3 2" />
              <path d="M220 120 L300 130" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="3 2" />
            </motion.g>

            <defs>
              <marker id="arrowD" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="var(--text-tertiary)" />
              </marker>
            </defs>
          </svg>
        </div>
      </div>

      {/* 细胞类型展示 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
        <h3 className="font-medium text-[var(--text-primary)] mb-4">分化后的细胞类型</h3>
        <div className="grid grid-cols-5 gap-3">
          {cellTypes.map((cell) => (
            <motion.button
              key={cell.id}
              onClick={() => setSelectedCell(cell)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-3 rounded-lg text-center transition-all ${
                selectedCell?.id === cell.id
                  ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
                  : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <svg width="40" height="40" viewBox="0 0 40 40" className="mx-auto mb-2">
                {renderCellShape(cell.shape, 40, selectedCell?.id === cell.id ? 'var(--bg-primary)' : 'currentColor')}
              </svg>
              <p className="text-xs">{cell.name}</p>
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {selectedCell && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 p-3 rounded-lg bg-[var(--bg-secondary)]"
            >
              <h4 className="font-medium text-[var(--text-primary)] mb-2">{selectedCell.name}</h4>
              <p className="text-sm text-[var(--text-secondary)] mb-2">功能：{selectedCell.function}</p>
              <p className="text-sm text-[var(--text-tertiary)]">
                表达的基因：{selectedCell.genes.join('、')}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 分化特点 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-lg bg-[var(--bg-tertiary)] text-center">
          <div className="text-xl mb-1">🧬</div>
          <div className="text-sm font-medium text-[var(--text-primary)]">基因不变</div>
          <div className="text-xs text-[var(--text-tertiary)]">DNA不改变</div>
        </div>
        <div className="p-3 rounded-lg bg-[var(--bg-tertiary)] text-center">
          <div className="text-xl mb-1">🎯</div>
          <div className="text-sm font-medium text-[var(--text-primary)]">选择性表达</div>
          <div className="text-xs text-[var(--text-tertiary)]">不同基因表达</div>
        </div>
        <div className="p-3 rounded-lg bg-[var(--bg-tertiary)] text-center">
          <div className="text-xl mb-1">🔒</div>
          <div className="text-sm font-medium text-[var(--text-primary)]">稳定性</div>
          <div className="text-xs text-[var(--text-tertiary)]">一般不可逆</div>
        </div>
        <div className="p-3 rounded-lg bg-[var(--bg-tertiary)] text-center">
          <div className="text-xl mb-1">⏰</div>
          <div className="text-sm font-medium text-[var(--text-primary)]">持久性</div>
          <div className="text-xs text-[var(--text-tertiary)]">贯穿生命全程</div>
        </div>
      </div>

      {/* 知识点 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)] text-sm">
        <p className="font-medium text-[var(--text-primary)] mb-2">细胞分化要点：</p>
        <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
          <li><strong>本质</strong>：基因的选择性表达</li>
          <li><strong>结果</strong>：细胞形态、结构、功能发生稳定性差异</li>
          <li><strong>遗传物质</strong>：分化前后DNA不变（细胞全能性的基础）</li>
          <li><strong>细胞全能性</strong>：已分化的细胞仍具有发育成完整个体的潜能</li>
          <li><strong>意义</strong>：形成不同组织和器官，提高生命活动效率</li>
        </ul>
      </div>
    </div>
  )
}
