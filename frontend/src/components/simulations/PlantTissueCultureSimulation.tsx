import { useState } from 'react'
import { motion } from 'framer-motion'

type CultureStage = 'explant' | 'dedifferentiation' | 'callus' | 'redifferentiation' | 'plantlet'

interface StageInfo {
  name: string
  description: string
  conditions: string[]
  duration: string
}

const stages: Record<CultureStage, StageInfo> = {
  explant: {
    name: '外植体',
    description: '从植物体上切取的用于培养的组织或器官',
    conditions: ['选择幼嫩、健康的组织', '常用茎尖、叶片、花药等', '需进行消毒处理'],
    duration: '准备阶段'
  },
  dedifferentiation: {
    name: '脱分化',
    description: '已分化的细胞失去特有的结构和功能，恢复分裂能力',
    conditions: ['生长素/细胞分裂素比值较高', '暗培养', '适宜温度（25-28°C）'],
    duration: '2-4周'
  },
  callus: {
    name: '愈伤组织',
    description: '脱分化形成的无定形细胞团',
    conditions: ['排列疏松、无规则', '高度液泡化', '具有全能性'],
    duration: '持续增殖'
  },
  redifferentiation: {
    name: '再分化',
    description: '愈伤组织重新分化形成根、芽等器官',
    conditions: ['调整激素比例', '生长素/细胞分裂素比值影响器官分化', '光照培养'],
    duration: '3-6周'
  },
  plantlet: {
    name: '试管苗',
    description: '形成完整的小植株',
    conditions: ['具有根、茎、叶', '需要炼苗后移栽', '可大量繁殖'],
    duration: '移栽前'
  }
}

export default function PlantTissueCultureSimulation() {
  const [currentStage, setCurrentStage] = useState<CultureStage>('explant')
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationStep, setAnimationStep] = useState(0)

  const stageOrder: CultureStage[] = ['explant', 'dedifferentiation', 'callus', 'redifferentiation', 'plantlet']
  const currentIndex = stageOrder.indexOf(currentStage)

  const startAnimation = () => {
    setIsAnimating(true)
    setAnimationStep(0)
    setCurrentStage('explant')

    let step = 0
    const interval = setInterval(() => {
      step++
      setAnimationStep(step)
      if (step < stageOrder.length) {
        setCurrentStage(stageOrder[step])
      }
      if (step >= stageOrder.length) {
        clearInterval(interval)
        setIsAnimating(false)
      }
    }, 1500)
  }

  const currentInfo = stages[currentStage]

  return (
    <div className="space-y-6">
      {/* 说明 */}
      <div className="text-sm text-[var(--text-secondary)]">
        植物组织培养是利用植物细胞的全能性，在无菌条件下培养植物组织或细胞的技术
      </div>

      {/* 培养过程动画 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-[var(--text-primary)]">组织培养过程</h3>
          <button
            onClick={startAnimation}
            disabled={isAnimating}
            className="px-4 py-2 rounded-lg bg-[var(--text-primary)] text-[var(--bg-primary)] text-sm font-medium disabled:opacity-50"
          >
            {isAnimating ? '培养中...' : '开始培养'}
          </button>
        </div>

        <div className="relative h-48">
          <svg viewBox="0 0 500 160" className="w-full h-full">
            {/* 培养皿/试管背景 */}
            {stageOrder.map((stage, i) => (
              <g key={stage} transform={`translate(${i * 100}, 0)`}>
                {/* 容器 */}
                <rect
                  x="10"
                  y="30"
                  width="80"
                  height="80"
                  rx="5"
                  fill="var(--bg-secondary)"
                  stroke={currentStage === stage ? 'var(--text-primary)' : 'var(--border-color)'}
                  strokeWidth={currentStage === stage ? 2 : 1}
                />
                {/* 培养基 */}
                <rect x="15" y="80" width="70" height="25" rx="3" fill="var(--text-tertiary)" opacity="0.3" />
              </g>
            ))}

            {/* 外植体 */}
            <motion.g
              animate={{ opacity: animationStep >= 0 ? 1 : 0.3 }}
              transform="translate(10, 0)"
            >
              <rect x="30" y="50" width="30" height="20" rx="2" fill="#22c55e" />
              <text x="45" y="130" textAnchor="middle" fill="var(--text-tertiary)" fontSize="9">外植体</text>
            </motion.g>

            {/* 脱分化中 */}
            <motion.g
              animate={{ opacity: animationStep >= 1 ? 1 : 0.3 }}
              transform="translate(110, 0)"
            >
              <rect x="25" y="45" width="40" height="30" rx="5" fill="#86efac" opacity="0.8" />
              <circle cx="35" cy="55" r="5" fill="#22c55e" />
              <circle cx="50" cy="60" r="4" fill="#22c55e" />
              <circle cx="55" cy="50" r="4" fill="#22c55e" />
              <text x="45" y="130" textAnchor="middle" fill="var(--text-tertiary)" fontSize="9">脱分化</text>
            </motion.g>

            {/* 愈伤组织 */}
            <motion.g
              animate={{ opacity: animationStep >= 2 ? 1 : 0.3 }}
              transform="translate(210, 0)"
            >
              <ellipse cx="45" cy="60" rx="30" ry="25" fill="#bbf7d0" />
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <circle
                  key={i}
                  cx={30 + (i % 3) * 15}
                  cy={45 + Math.floor(i / 3) * 15}
                  r="6"
                  fill="#86efac"
                  stroke="#22c55e"
                  strokeWidth="1"
                />
              ))}
              <text x="45" y="130" textAnchor="middle" fill="var(--text-tertiary)" fontSize="9">愈伤组织</text>
            </motion.g>

            {/* 再分化 */}
            <motion.g
              animate={{ opacity: animationStep >= 3 ? 1 : 0.3 }}
              transform="translate(310, 0)"
            >
              <ellipse cx="45" cy="65" rx="25" ry="20" fill="#bbf7d0" />
              {/* 芽 */}
              <path d="M45 45 L40 55 L50 55 Z" fill="#22c55e" />
              <path d="M45 40 L45 45" stroke="#22c55e" strokeWidth="2" />
              {/* 根 */}
              <path d="M45 75 L45 85 M40 80 L45 85 L50 80" stroke="#22c55e" strokeWidth="2" fill="none" />
              <text x="45" y="130" textAnchor="middle" fill="var(--text-tertiary)" fontSize="9">再分化</text>
            </motion.g>

            {/* 试管苗 */}
            <motion.g
              animate={{ opacity: animationStep >= 4 ? 1 : 0.3 }}
              transform="translate(410, 0)"
            >
              {/* 完整植株 */}
              <path d="M45 75 L45 50" stroke="#22c55e" strokeWidth="3" />
              {/* 叶子 */}
              <ellipse cx="35" cy="45" rx="10" ry="5" fill="#22c55e" transform="rotate(-30, 35, 45)" />
              <ellipse cx="55" cy="50" rx="10" ry="5" fill="#22c55e" transform="rotate(30, 55, 50)" />
              <ellipse cx="38" cy="55" rx="8" ry="4" fill="#22c55e" transform="rotate(-20, 38, 55)" />
              {/* 根系 */}
              <path d="M45 75 L45 90 M40 80 L35 90 M50 80 L55 90" stroke="#22c55e" strokeWidth="2" fill="none" />
              <text x="45" y="130" textAnchor="middle" fill="var(--text-tertiary)" fontSize="9">试管苗</text>
            </motion.g>

            {/* 箭头 */}
            {[0, 1, 2, 3].map((i) => (
              <motion.path
                key={i}
                d={`M${95 + i * 100} 70 L${105 + i * 100} 70`}
                stroke="var(--text-tertiary)"
                strokeWidth="2"
                markerEnd="url(#arrowTC)"
                animate={{ opacity: animationStep > i ? 1 : 0.3 }}
              />
            ))}

            <defs>
              <marker id="arrowTC" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="var(--text-tertiary)" />
              </marker>
            </defs>
          </svg>
        </div>

        {/* 进度指示 */}
        <div className="flex justify-between mt-2">
          {stageOrder.map((stage, i) => (
            <div
              key={stage}
              className={`w-3 h-3 rounded-full ${
                i <= currentIndex ? 'bg-[var(--text-primary)]' : 'bg-[var(--bg-secondary)]'
              }`}
            />
          ))}
        </div>
      </div>

      {/* 当前阶段详情 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
        <h3 className="font-medium text-[var(--text-primary)] mb-2">{currentInfo.name}</h3>
        <p className="text-sm text-[var(--text-secondary)] mb-3">{currentInfo.description}</p>

        <div className="space-y-2">
          <p className="text-sm text-[var(--text-tertiary)]">关键条件：</p>
          <ul className="space-y-1">
            {currentInfo.conditions.map((cond, i) => (
              <li key={i} className="text-sm text-[var(--text-secondary)]">• {cond}</li>
            ))}
          </ul>
        </div>

        <p className="text-sm text-[var(--text-tertiary)] mt-3">
          时间：<span className="text-[var(--text-secondary)]">{currentInfo.duration}</span>
        </p>
      </div>

      {/* 阶段选择 */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {stageOrder.map((stage) => (
          <button
            key={stage}
            onClick={() => setCurrentStage(stage)}
            className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              currentStage === stage
                ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
                : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            {stages[stage].name}
          </button>
        ))}
      </div>

      {/* 激素调控 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
        <h3 className="font-medium text-[var(--text-primary)] mb-3">激素比例与器官分化</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <p className="text-sm text-[var(--text-secondary)] mb-1">生长素/细胞分裂素 比值高</p>
              <div className="h-2 rounded-full bg-[var(--bg-secondary)]">
                <div className="h-full w-3/4 rounded-full bg-[var(--text-primary)]" />
              </div>
            </div>
            <span className="text-sm text-[var(--text-tertiary)]">→ 促进根的分化</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <p className="text-sm text-[var(--text-secondary)] mb-1">生长素/细胞分裂素 比值低</p>
              <div className="h-2 rounded-full bg-[var(--bg-secondary)]">
                <div className="h-full w-1/4 rounded-full bg-[var(--text-primary)]" />
              </div>
            </div>
            <span className="text-sm text-[var(--text-tertiary)]">→ 促进芽的分化</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <p className="text-sm text-[var(--text-secondary)] mb-1">比值适中</p>
              <div className="h-2 rounded-full bg-[var(--bg-secondary)]">
                <div className="h-full w-1/2 rounded-full bg-[var(--text-primary)]" />
              </div>
            </div>
            <span className="text-sm text-[var(--text-tertiary)]">→ 促进愈伤组织生长</span>
          </div>
        </div>
      </div>

      {/* 知识点 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)] text-sm">
        <p className="font-medium text-[var(--text-primary)] mb-2">植物组织培养要点：</p>
        <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
          <li><strong>原理</strong>：植物细胞的全能性</li>
          <li><strong>条件</strong>：无菌、适宜的营养和激素、适宜的温度和光照</li>
          <li><strong>过程</strong>：外植体 → 脱分化 → 愈伤组织 → 再分化 → 试管苗</li>
          <li><strong>应用</strong>：快速繁殖、脱毒苗培育、人工种子、次生代谢物生产</li>
        </ul>
      </div>
    </div>
  )
}
