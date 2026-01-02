import { useState } from 'react'
import { motion } from 'framer-motion'

type RespirationMode = 'aerobic' | 'anaerobic-yeast' | 'anaerobic-muscle'

interface Stage {
  name: string
  location: string
  input: string
  output: string
  atp: number
}

const respirationData: Record<RespirationMode, { name: string; stages: Stage[]; equation: string }> = {
  'aerobic': {
    name: '有氧呼吸',
    equation: 'C₆H₁₂O₆ + 6O₂ + 6H₂O → 6CO₂ + 12H₂O + 能量',
    stages: [
      {
        name: '第一阶段（糖酵解）',
        location: '细胞质基质',
        input: '1分子葡萄糖',
        output: '2分子丙酮酸 + 4[H]',
        atp: 2
      },
      {
        name: '第二阶段（柠檬酸循环）',
        location: '线粒体基质',
        input: '2分子丙酮酸',
        output: '6CO₂ + 20[H]',
        atp: 2
      },
      {
        name: '第三阶段（氧化磷酸化）',
        location: '线粒体内膜',
        input: '24[H] + 6O₂',
        output: '12H₂O',
        atp: 34
      }
    ]
  },
  'anaerobic-yeast': {
    name: '无氧呼吸（酵母菌）',
    equation: 'C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂ + 能量',
    stages: [
      {
        name: '第一阶段（糖酵解）',
        location: '细胞质基质',
        input: '1分子葡萄糖',
        output: '2分子丙酮酸 + 4[H]',
        atp: 2
      },
      {
        name: '第二阶段（酒精发酵）',
        location: '细胞质基质',
        input: '2分子丙酮酸 + 4[H]',
        output: '2分子酒精 + 2CO₂',
        atp: 0
      }
    ]
  },
  'anaerobic-muscle': {
    name: '无氧呼吸（肌肉细胞）',
    equation: 'C₆H₁₂O₆ → 2C₃H₆O₃ + 能量',
    stages: [
      {
        name: '第一阶段（糖酵解）',
        location: '细胞质基质',
        input: '1分子葡萄糖',
        output: '2分子丙酮酸 + 4[H]',
        atp: 2
      },
      {
        name: '第二阶段（乳酸发酵）',
        location: '细胞质基质',
        input: '2分子丙酮酸 + 4[H]',
        output: '2分子乳酸',
        atp: 0
      }
    ]
  }
}

export default function RespirationSimulation() {
  const [mode, setMode] = useState<RespirationMode>('aerobic')
  const [activeStage, setActiveStage] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const currentData = respirationData[mode]
  const totalATP = currentData.stages.reduce((sum, s) => sum + s.atp, 0)

  const startAnimation = () => {
    setIsAnimating(true)
    setActiveStage(0)

    let stage = 0
    const interval = setInterval(() => {
      stage++
      if (stage >= currentData.stages.length) {
        clearInterval(interval)
        setIsAnimating(false)
      } else {
        setActiveStage(stage)
      }
    }, 2000)
  }

  return (
    <div className="space-y-6">
      {/* 模式选择 */}
      <div className="flex flex-wrap gap-2">
        {(Object.keys(respirationData) as RespirationMode[]).map((key) => (
          <button
            key={key}
            onClick={() => {
              setMode(key)
              setActiveStage(0)
              setIsAnimating(false)
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              mode === key
                ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
                : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            {respirationData[key].name}
          </button>
        ))}
      </div>

      {/* 总反应式 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)] text-center">
        <p className="text-sm text-[var(--text-secondary)] mb-1">总反应式</p>
        <p className="text-lg font-mono text-[var(--text-primary)]">{currentData.equation}</p>
      </div>

      {/* 动画区域 */}
      <div className="relative h-64 rounded-lg bg-[var(--bg-tertiary)] overflow-hidden">
        <svg viewBox="0 0 300 150" className="w-full h-full">
          {/* 细胞轮廓 */}
          <rect x="10" y="10" width="280" height="130" rx="10" fill="none" stroke="var(--text-secondary)" strokeWidth="1" strokeDasharray="4 2" />

          {/* 线粒体（有氧呼吸时显示） */}
          {mode === 'aerobic' && (
            <g>
              <ellipse cx="200" cy="75" rx="60" ry="40" fill="none" stroke="var(--text-secondary)" strokeWidth="1.5" />
              <ellipse cx="200" cy="75" rx="55" ry="35" fill="none" stroke="var(--text-tertiary)" strokeWidth="1" />
              {/* 内膜嵴 */}
              {[0, 1, 2, 3].map((i) => (
                <path
                  key={i}
                  d={`M${160 + i * 20} ${55} Q${165 + i * 20} ${75} ${160 + i * 20} ${95}`}
                  fill="none"
                  stroke="var(--text-tertiary)"
                  strokeWidth="1"
                />
              ))}
              <text x="200" y="78" textAnchor="middle" fill="var(--text-secondary)" fontSize="8">线粒体</text>
            </g>
          )}

          {/* 葡萄糖 */}
          <motion.g
            animate={{
              x: isAnimating && activeStage >= 0 ? [0, 30] : 0,
              opacity: isAnimating && activeStage > 0 ? 0.3 : 1
            }}
            transition={{ duration: 1 }}
          >
            <circle cx="40" cy="75" r="15" fill="var(--text-tertiary)" />
            <text x="40" y="78" textAnchor="middle" fill="var(--bg-primary)" fontSize="6" fontWeight="bold">葡萄糖</text>
          </motion.g>

          {/* 丙酮酸 */}
          <motion.g
            animate={{
              opacity: isAnimating && activeStage >= 1 ? 1 : 0.3,
              x: mode === 'aerobic' && isAnimating && activeStage >= 2 ? [0, 50] : 0
            }}
            transition={{ duration: 1 }}
          >
            <circle cx="100" cy="75" r="12" fill="var(--text-secondary)" />
            <text x="100" y="78" textAnchor="middle" fill="var(--bg-primary)" fontSize="5">丙酮酸</text>
          </motion.g>

          {/* 最终产物 */}
          <motion.g
            animate={{ opacity: isAnimating && activeStage >= currentData.stages.length - 1 ? 1 : 0.2 }}
            transition={{ duration: 1 }}
          >
            {mode === 'aerobic' ? (
              <>
                <text x="250" y="50" textAnchor="middle" fill="var(--text-primary)" fontSize="8">CO₂</text>
                <text x="250" y="70" textAnchor="middle" fill="var(--text-primary)" fontSize="8">H₂O</text>
                <text x="250" y="90" textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontWeight="bold">ATP×38</text>
              </>
            ) : mode === 'anaerobic-yeast' ? (
              <>
                <text x="200" y="60" textAnchor="middle" fill="var(--text-primary)" fontSize="8">酒精</text>
                <text x="200" y="80" textAnchor="middle" fill="var(--text-primary)" fontSize="8">CO₂</text>
                <text x="200" y="100" textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontWeight="bold">ATP×2</text>
              </>
            ) : (
              <>
                <text x="200" y="70" textAnchor="middle" fill="var(--text-primary)" fontSize="8">乳酸</text>
                <text x="200" y="95" textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontWeight="bold">ATP×2</text>
              </>
            )}
          </motion.g>

          {/* 阶段标签 */}
          <text x="70" y="130" textAnchor="middle" fill="var(--text-tertiary)" fontSize="7">细胞质基质</text>
          {mode === 'aerobic' && (
            <text x="200" y="130" textAnchor="middle" fill="var(--text-tertiary)" fontSize="7">线粒体</text>
          )}
        </svg>
      </div>

      {/* 控制按钮 */}
      <div className="flex justify-center">
        <button
          onClick={startAnimation}
          disabled={isAnimating}
          className="px-6 py-3 rounded-lg bg-[var(--text-primary)] text-[var(--bg-primary)] font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
        >
          {isAnimating ? '演示中...' : '开始演示'}
        </button>
      </div>

      {/* 阶段详情 */}
      <div className="space-y-3">
        {currentData.stages.map((stage, index) => (
          <motion.div
            key={index}
            animate={{
              scale: activeStage === index && isAnimating ? 1.02 : 1,
              borderColor: activeStage === index && isAnimating ? 'var(--text-primary)' : 'var(--border-color)'
            }}
            className="p-4 rounded-lg border bg-[var(--bg-tertiary)]"
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-[var(--text-primary)]">{stage.name}</h4>
              <span className="px-2 py-1 rounded-full bg-[var(--bg-secondary)] text-xs text-[var(--text-secondary)]">
                {stage.location}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-[var(--text-tertiary)]">输入</p>
                <p className="text-[var(--text-secondary)]">{stage.input}</p>
              </div>
              <div>
                <p className="text-[var(--text-tertiary)]">输出</p>
                <p className="text-[var(--text-secondary)]">{stage.output}</p>
              </div>
              <div>
                <p className="text-[var(--text-tertiary)]">ATP产量</p>
                <p className="text-[var(--text-primary)] font-bold">{stage.atp}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 总结 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
        <div className="flex items-center justify-between">
          <span className="text-[var(--text-secondary)]">总ATP产量</span>
          <span className="text-2xl font-bold text-[var(--text-primary)]">{totalATP} ATP</span>
        </div>
        <p className="text-sm text-[var(--text-tertiary)] mt-2">
          {mode === 'aerobic'
            ? '有氧呼吸效率高，1分子葡萄糖可产生约38个ATP'
            : '无氧呼吸效率低，1分子葡萄糖只能产生2个ATP'}
        </p>
      </div>
    </div>
  )
}
