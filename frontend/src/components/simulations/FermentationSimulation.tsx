import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

type FermentationType = 'alcohol' | 'lactic' | 'vinegar'

interface FermentationInfo {
  name: string
  organism: string
  substrate: string
  product: string
  equation: string
  conditions: string[]
  applications: string[]
}

const fermentations: Record<FermentationType, FermentationInfo> = {
  alcohol: {
    name: '酒精发酵',
    organism: '酵母菌',
    substrate: '葡萄糖',
    product: '酒精 + CO₂',
    equation: 'C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂ + 能量',
    conditions: ['无氧或低氧', '适宜温度（18-25°C）', '适当的糖浓度'],
    applications: ['酿酒（啤酒、葡萄酒）', '面包发酵', '生物燃料']
  },
  lactic: {
    name: '乳酸发酵',
    organism: '乳酸菌',
    substrate: '葡萄糖',
    product: '乳酸',
    equation: 'C₆H₁₂O₆ → 2C₃H₆O₃ + 能量',
    conditions: ['无氧', '适宜温度（30-40°C）', '适当的pH'],
    applications: ['酸奶制作', '泡菜腌制', '青贮饲料']
  },
  vinegar: {
    name: '醋酸发酵',
    organism: '醋酸菌',
    substrate: '酒精',
    product: '醋酸',
    equation: 'C₂H₅OH + O₂ → CH₃COOH + H₂O',
    conditions: ['有氧', '适宜温度（30-35°C）', '需要酒精作为底物'],
    applications: ['食醋酿造', '工业醋酸生产']
  }
}

export default function FermentationSimulation() {
  const [selectedType, setSelectedType] = useState<FermentationType>('alcohol')
  const [isRunning, setIsRunning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [bubbles, setBubbles] = useState<number[]>([])

  const currentInfo = fermentations[selectedType]

  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setIsRunning(false)
          return 100
        }
        return prev + 2
      })

      // 产生气泡（酒精发酵产生CO2）
      if (selectedType === 'alcohol' && Math.random() > 0.5) {
        setBubbles(prev => [...prev.slice(-10), Date.now()])
      }
    }, 100)

    return () => clearInterval(interval)
  }, [isRunning, selectedType])

  const startFermentation = () => {
    setProgress(0)
    setBubbles([])
    setIsRunning(true)
  }

  return (
    <div className="space-y-6">
      {/* 说明 */}
      <div className="text-sm text-[var(--text-secondary)]">
        发酵是利用微生物的代谢作用生产特定产物的过程
      </div>

      {/* 发酵类型选择 */}
      <div className="flex gap-2">
        {(Object.keys(fermentations) as FermentationType[]).map((type) => (
          <button
            key={type}
            onClick={() => { setSelectedType(type); setProgress(0); setIsRunning(false); setBubbles([]) }}
            className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedType === type
                ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
                : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            {fermentations[type].name}
          </button>
        ))}
      </div>

      {/* 发酵演示 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-[var(--text-primary)]">{currentInfo.name}演示</h3>
          <button
            onClick={startFermentation}
            disabled={isRunning}
            className="px-4 py-2 rounded-lg bg-[var(--text-primary)] text-[var(--bg-primary)] text-sm font-medium disabled:opacity-50"
          >
            {isRunning ? '发酵中...' : '开始发酵'}
          </button>
        </div>

        <div className="relative h-56">
          <svg viewBox="0 0 400 200" className="w-full h-full">
            {/* 发酵罐 */}
            <path
              d="M100 40 L100 160 Q100 180 120 180 L280 180 Q300 180 300 160 L300 40 Q300 20 280 20 L120 20 Q100 20 100 40"
              fill="var(--bg-secondary)"
              stroke="var(--text-secondary)"
              strokeWidth="3"
            />

            {/* 发酵液 */}
            <motion.rect
              x="103"
              y={180 - progress * 1.4}
              width="194"
              height={progress * 1.4}
              fill={selectedType === 'alcohol' ? 'var(--text-tertiary)' : selectedType === 'lactic' ? 'var(--text-secondary)' : 'var(--text-primary)'}
              opacity="0.5"
              rx="3"
            />

            {/* 气泡（酒精发酵） */}
            {selectedType === 'alcohol' && bubbles.map((id) => (
              <motion.circle
                key={id}
                cx={150 + Math.random() * 100}
                cy={150}
                r={3 + Math.random() * 3}
                fill="var(--text-tertiary)"
                initial={{ y: 0, opacity: 1 }}
                animate={{ y: -100, opacity: 0 }}
                transition={{ duration: 2 }}
              />
            ))}

            {/* 微生物图标 */}
            {progress > 20 && (
              <g>
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.ellipse
                    key={i}
                    cx={130 + i * 35}
                    cy={160 - progress * 0.8}
                    rx="8"
                    ry="5"
                    fill="var(--text-primary)"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </g>
            )}

            {/* 标签 */}
            <text x="200" y="195" textAnchor="middle" fill="var(--text-tertiary)" fontSize="10">
              {currentInfo.organism}
            </text>

            {/* 产物指示 */}
            {progress > 50 && (
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <rect x="320" y="80" width="70" height="40" rx="5" fill="var(--text-secondary)" opacity="0.8" />
                <text x="355" y="95" textAnchor="middle" fill="var(--bg-primary)" fontSize="9">产物</text>
                <text x="355" y="110" textAnchor="middle" fill="var(--bg-primary)" fontSize="8">{currentInfo.product}</text>
              </motion.g>
            )}

            {/* 底物 */}
            <g>
              <rect x="10" y="80" width="70" height="40" rx="5" fill="var(--text-tertiary)" />
              <text x="45" y="95" textAnchor="middle" fill="var(--bg-primary)" fontSize="9">底物</text>
              <text x="45" y="110" textAnchor="middle" fill="var(--bg-primary)" fontSize="8">{currentInfo.substrate}</text>
            </g>

            {/* 箭头 */}
            <path d="M80 100 L100 100" stroke="var(--text-tertiary)" strokeWidth="2" markerEnd="url(#arrF)" />
            <path d="M300 100 L320 100" stroke="var(--text-tertiary)" strokeWidth="2" markerEnd="url(#arrF)" />

            <defs>
              <marker id="arrF" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="var(--text-tertiary)" />
              </marker>
            </defs>
          </svg>
        </div>

        {/* 进度条 */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-[var(--text-secondary)]">发酵进度</span>
            <span className="text-sm text-[var(--text-primary)]">{progress}%</span>
          </div>
          <div className="h-2 rounded-full bg-[var(--bg-secondary)]">
            <motion.div
              className="h-full rounded-full bg-[var(--text-primary)]"
              animate={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* 发酵信息 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
        <h3 className="font-medium text-[var(--text-primary)] mb-3">{currentInfo.name}</h3>

        <div className="space-y-3 text-sm">
          <div>
            <span className="text-[var(--text-tertiary)]">微生物：</span>
            <span className="text-[var(--text-secondary)]">{currentInfo.organism}</span>
          </div>

          <div>
            <span className="text-[var(--text-tertiary)]">反应方程式：</span>
            <div className="mt-1 p-2 rounded bg-[var(--bg-secondary)] font-mono text-[var(--text-primary)]">
              {currentInfo.equation}
            </div>
          </div>

          <div>
            <span className="text-[var(--text-tertiary)]">发酵条件：</span>
            <ul className="mt-1 space-y-1">
              {currentInfo.conditions.map((cond, i) => (
                <li key={i} className="text-[var(--text-secondary)]">• {cond}</li>
              ))}
            </ul>
          </div>

          <div>
            <span className="text-[var(--text-tertiary)]">应用：</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {currentInfo.applications.map((app, i) => (
                <span key={i} className="px-2 py-1 rounded bg-[var(--bg-secondary)] text-xs text-[var(--text-secondary)]">
                  {app}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 三种发酵对比 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
        <h3 className="font-medium text-[var(--text-primary)] mb-3">三种发酵对比</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border-color)]">
                <th className="py-2 text-left text-[var(--text-tertiary)]">类型</th>
                <th className="py-2 text-center text-[var(--text-tertiary)]">微生物</th>
                <th className="py-2 text-center text-[var(--text-tertiary)]">氧气</th>
                <th className="py-2 text-center text-[var(--text-tertiary)]">产物</th>
              </tr>
            </thead>
            <tbody className="text-[var(--text-secondary)]">
              <tr className="border-b border-[var(--border-color)]">
                <td className="py-2">酒精发酵</td>
                <td className="py-2 text-center">酵母菌</td>
                <td className="py-2 text-center">无氧</td>
                <td className="py-2 text-center">酒精+CO₂</td>
              </tr>
              <tr className="border-b border-[var(--border-color)]">
                <td className="py-2">乳酸发酵</td>
                <td className="py-2 text-center">乳酸菌</td>
                <td className="py-2 text-center">无氧</td>
                <td className="py-2 text-center">乳酸</td>
              </tr>
              <tr>
                <td className="py-2">醋酸发酵</td>
                <td className="py-2 text-center">醋酸菌</td>
                <td className="py-2 text-center">有氧</td>
                <td className="py-2 text-center">醋酸</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 知识点 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)] text-sm">
        <p className="font-medium text-[var(--text-primary)] mb-2">发酵工程要点：</p>
        <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
          <li><strong>酵母菌</strong>：兼性厌氧，有氧呼吸产CO₂和H₂O，无氧产酒精和CO₂</li>
          <li><strong>乳酸菌</strong>：严格厌氧，只进行无氧呼吸产乳酸</li>
          <li><strong>醋酸菌</strong>：好氧菌，需要氧气将酒精氧化为醋酸</li>
          <li><strong>果酒→果醋</strong>：先无氧发酵产酒精，再有氧发酵产醋酸</li>
        </ul>
      </div>
    </div>
  )
}
