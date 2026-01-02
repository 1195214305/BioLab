import { useState } from 'react'
import { motion } from 'framer-motion'

type ProcessType = 'aging' | 'apoptosis' | 'necrosis'

interface ProcessInfo {
  name: string
  definition: string
  features: string[]
  significance: string
  examples: string[]
}

const processes: Record<ProcessType, ProcessInfo> = {
  aging: {
    name: '细胞衰老',
    definition: '细胞的生理状态和化学反应发生复杂变化的过程',
    features: [
      '细胞内水分减少，体积变小',
      '酶活性降低，代谢速率减慢',
      '细胞核体积增大，染色质收缩',
      '细胞膜通透性改变',
      '色素（如脂褐素）积累'
    ],
    significance: '个体衰老的细胞学基础',
    examples: ['皮肤皱纹', '白发', '老年斑']
  },
  apoptosis: {
    name: '细胞凋亡',
    definition: '由基因控制的细胞自动结束生命的过程（程序性死亡）',
    features: [
      '细胞变圆，与周围细胞脱离',
      '细胞核DNA断裂',
      '细胞膜内陷，形成凋亡小体',
      '被吞噬细胞清除',
      '不引起炎症反应'
    ],
    significance: '维持内环境稳定，清除异常细胞',
    examples: ['蝌蚪尾巴消失', '手指分开', '清除癌变细胞']
  },
  necrosis: {
    name: '细胞坏死',
    definition: '在不利条件下细胞被动死亡的过程',
    features: [
      '细胞膜破裂',
      '细胞内容物外泄',
      '引起炎症反应',
      '由外界因素引起',
      '非程序性死亡'
    ],
    significance: '病理性死亡，对机体有害',
    examples: ['烧伤', '冻伤', '病原体感染']
  }
}

export default function CellAgingDeathSimulation() {
  const [selectedProcess, setSelectedProcess] = useState<ProcessType>('aging')
  const [animationStep, setAnimationStep] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const currentProcess = processes[selectedProcess]

  const startAnimation = () => {
    setIsAnimating(true)
    setAnimationStep(0)
    let step = 0
    const interval = setInterval(() => {
      step++
      setAnimationStep(step)
      if (step >= 5) {
        clearInterval(interval)
        setIsAnimating(false)
      }
    }, 800)
  }

  return (
    <div className="space-y-6">
      {/* 说明 */}
      <div className="text-sm text-[var(--text-secondary)]">
        细胞的衰老和死亡是生命活动的正常现象，对维持生物体的正常功能具有重要意义
      </div>

      {/* 过程选择 */}
      <div className="flex gap-2">
        {(Object.keys(processes) as ProcessType[]).map((key) => (
          <button
            key={key}
            onClick={() => { setSelectedProcess(key); setAnimationStep(0) }}
            className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedProcess === key
                ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
                : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            {processes[key].name}
          </button>
        ))}
      </div>

      {/* 动画演示 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-[var(--text-primary)]">{currentProcess.name}过程</h3>
          <button
            onClick={startAnimation}
            disabled={isAnimating}
            className="px-4 py-2 rounded-lg bg-[var(--text-primary)] text-[var(--bg-primary)] text-sm font-medium disabled:opacity-50"
          >
            {isAnimating ? '演示中...' : '开始演示'}
          </button>
        </div>

        <div className="relative h-48">
          <svg viewBox="0 0 400 160" className="w-full h-full">
            {selectedProcess === 'aging' && (
              <>
                {/* 年轻细胞 */}
                <g>
                  <circle cx="80" cy="80" r="35" fill="var(--text-secondary)" opacity="0.8" />
                  <circle cx="80" cy="80" r="15" fill="var(--text-primary)" />
                  <text x="80" y="130" textAnchor="middle" fill="var(--text-tertiary)" fontSize="10">年轻细胞</text>
                </g>

                <path d="M130 80 L180 80" stroke="var(--text-tertiary)" strokeWidth="2" markerEnd="url(#arrowAD)" />
                <text x="155" y="70" textAnchor="middle" fill="var(--text-tertiary)" fontSize="9">衰老</text>

                {/* 衰老细胞 */}
                <motion.g animate={{ opacity: animationStep >= 2 ? 1 : 0.5 }}>
                  <motion.circle
                    cx="250"
                    cy="80"
                    r="30"
                    fill="var(--text-tertiary)"
                    opacity="0.6"
                    animate={animationStep >= 1 ? { r: [35, 30] } : {}}
                  />
                  <motion.circle
                    cx="250"
                    cy="80"
                    r="18"
                    fill="var(--text-secondary)"
                    animate={animationStep >= 2 ? { r: [15, 18] } : {}}
                  />
                  {/* 色素积累 */}
                  {animationStep >= 3 && (
                    <>
                      <circle cx="240" cy="90" r="3" fill="#92400e" />
                      <circle cx="260" cy="85" r="2" fill="#92400e" />
                      <circle cx="255" cy="95" r="2.5" fill="#92400e" />
                    </>
                  )}
                  <text x="250" y="130" textAnchor="middle" fill="var(--text-tertiary)" fontSize="10">衰老细胞</text>
                </motion.g>

                {/* 特征标注 */}
                <motion.g animate={{ opacity: animationStep >= 4 ? 1 : 0 }}>
                  <text x="320" y="50" fill="var(--text-secondary)" fontSize="9">• 体积变小</text>
                  <text x="320" y="70" fill="var(--text-secondary)" fontSize="9">• 核增大</text>
                  <text x="320" y="90" fill="var(--text-secondary)" fontSize="9">• 色素积累</text>
                  <text x="320" y="110" fill="var(--text-secondary)" fontSize="9">• 代谢减慢</text>
                </motion.g>
              </>
            )}

            {selectedProcess === 'apoptosis' && (
              <>
                {/* 正常细胞 */}
                <g>
                  <circle cx="50" cy="80" r="30" fill="var(--text-secondary)" />
                  <circle cx="50" cy="80" r="12" fill="var(--text-primary)" />
                  <text x="50" y="125" textAnchor="middle" fill="var(--text-tertiary)" fontSize="9">正常细胞</text>
                </g>

                {/* 凋亡信号 */}
                <motion.text
                  x="100"
                  y="60"
                  fill="var(--text-primary)"
                  fontSize="9"
                  animate={{ opacity: animationStep >= 1 ? 1 : 0 }}
                >
                  凋亡信号
                </motion.text>
                <motion.path
                  d="M90 70 L120 80"
                  stroke="var(--text-primary)"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                  animate={{ opacity: animationStep >= 1 ? 1 : 0 }}
                />

                {/* 细胞变圆、收缩 */}
                <motion.g animate={{ opacity: animationStep >= 2 ? 1 : 0.3 }}>
                  <motion.circle
                    cx="150"
                    cy="80"
                    r="25"
                    fill="var(--text-tertiary)"
                    animate={animationStep >= 2 ? { r: [30, 25] } : {}}
                  />
                  <circle cx="150" cy="80" r="10" fill="var(--text-secondary)" />
                  <text x="150" y="125" textAnchor="middle" fill="var(--text-tertiary)" fontSize="9">细胞收缩</text>
                </motion.g>

                {/* DNA断裂 */}
                <motion.g animate={{ opacity: animationStep >= 3 ? 1 : 0.3 }}>
                  <circle cx="230" cy="80" r="22" fill="var(--text-tertiary)" />
                  <path d="M225 75 L235 85 M225 85 L235 75" stroke="var(--text-primary)" strokeWidth="2" />
                  <text x="230" y="125" textAnchor="middle" fill="var(--text-tertiary)" fontSize="9">DNA断裂</text>
                </motion.g>

                {/* 凋亡小体 */}
                <motion.g animate={{ opacity: animationStep >= 4 ? 1 : 0 }}>
                  <circle cx="300" cy="65" r="10" fill="var(--text-secondary)" />
                  <circle cx="320" cy="80" r="8" fill="var(--text-secondary)" />
                  <circle cx="305" cy="95" r="9" fill="var(--text-secondary)" />
                  <circle cx="330" cy="100" r="7" fill="var(--text-secondary)" />
                  <text x="315" y="125" textAnchor="middle" fill="var(--text-tertiary)" fontSize="9">凋亡小体</text>
                </motion.g>

                {/* 被吞噬 */}
                <motion.g animate={{ opacity: animationStep >= 5 ? 1 : 0 }}>
                  <ellipse cx="370" cy="80" rx="25" ry="30" fill="var(--text-primary)" opacity="0.6" />
                  <text x="370" y="125" textAnchor="middle" fill="var(--text-tertiary)" fontSize="9">被吞噬</text>
                </motion.g>
              </>
            )}

            {selectedProcess === 'necrosis' && (
              <>
                {/* 正常细胞 */}
                <g>
                  <circle cx="80" cy="80" r="30" fill="var(--text-secondary)" />
                  <circle cx="80" cy="80" r="12" fill="var(--text-primary)" />
                  <text x="80" y="125" textAnchor="middle" fill="var(--text-tertiary)" fontSize="9">正常细胞</text>
                </g>

                {/* 损伤因素 */}
                <motion.g animate={{ opacity: animationStep >= 1 ? 1 : 0 }}>
                  <text x="140" y="50" fill="#ef4444" fontSize="10">损伤因素</text>
                  <path d="M140 55 L120 70" stroke="#ef4444" strokeWidth="2" />
                  <polygon points="115,65 125,70 120,75" fill="#ef4444" />
                </motion.g>

                {/* 细胞肿胀 */}
                <motion.g animate={{ opacity: animationStep >= 2 ? 1 : 0.3 }}>
                  <motion.circle
                    cx="200"
                    cy="80"
                    r="35"
                    fill="var(--text-tertiary)"
                    animate={animationStep >= 2 ? { r: [30, 35, 38] } : {}}
                    transition={{ duration: 1 }}
                  />
                  <circle cx="200" cy="80" r="12" fill="var(--text-secondary)" />
                  <text x="200" y="130" textAnchor="middle" fill="var(--text-tertiary)" fontSize="9">细胞肿胀</text>
                </motion.g>

                {/* 细胞膜破裂 */}
                <motion.g animate={{ opacity: animationStep >= 3 ? 1 : 0 }}>
                  <circle cx="300" cy="80" r="35" fill="none" stroke="var(--text-tertiary)" strokeWidth="2" strokeDasharray="8 4" />
                  {/* 内容物外泄 */}
                  <motion.circle cx="280" cy="60" r="5" fill="var(--text-secondary)" animate={{ x: [-5, -15], opacity: [1, 0] }} transition={{ duration: 1, repeat: Infinity }} />
                  <motion.circle cx="320" cy="70" r="4" fill="var(--text-secondary)" animate={{ x: [5, 15], opacity: [1, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0.3 }} />
                  <motion.circle cx="290" cy="100" r="4" fill="var(--text-secondary)" animate={{ y: [5, 15], opacity: [1, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0.5 }} />
                  <text x="300" y="130" textAnchor="middle" fill="var(--text-tertiary)" fontSize="9">膜破裂</text>
                </motion.g>

                {/* 炎症反应 */}
                <motion.g animate={{ opacity: animationStep >= 4 ? 1 : 0 }}>
                  <text x="350" y="60" fill="#ef4444" fontSize="10">炎症!</text>
                  <circle cx="360" cy="80" r="8" fill="#ef4444" opacity="0.5" />
                  <circle cx="375" cy="90" r="6" fill="#ef4444" opacity="0.5" />
                </motion.g>
              </>
            )}

            <defs>
              <marker id="arrowAD" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="var(--text-tertiary)" />
              </marker>
            </defs>
          </svg>
        </div>
      </div>

      {/* 过程详情 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
        <h3 className="font-medium text-[var(--text-primary)] mb-3">{currentProcess.name}</h3>
        <p className="text-sm text-[var(--text-secondary)] mb-3">{currentProcess.definition}</p>

        <div className="space-y-3">
          <div>
            <p className="text-sm text-[var(--text-tertiary)] mb-1">主要特征：</p>
            <ul className="space-y-1">
              {currentProcess.features.map((feature, i) => (
                <li key={i} className="text-sm text-[var(--text-secondary)]">• {feature}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm text-[var(--text-tertiary)]">意义：</p>
            <p className="text-sm text-[var(--text-secondary)]">{currentProcess.significance}</p>
          </div>

          <div>
            <p className="text-sm text-[var(--text-tertiary)]">实例：</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {currentProcess.examples.map((ex, i) => (
                <span key={i} className="px-2 py-1 rounded bg-[var(--bg-secondary)] text-xs text-[var(--text-secondary)]">
                  {ex}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 凋亡与坏死对比 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
        <h3 className="font-medium text-[var(--text-primary)] mb-3">细胞凋亡与细胞坏死的比较</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[var(--border-color)]">
                <th className="py-2 text-left text-[var(--text-tertiary)]">比较项目</th>
                <th className="py-2 text-center text-[var(--text-tertiary)]">细胞凋亡</th>
                <th className="py-2 text-center text-[var(--text-tertiary)]">细胞坏死</th>
              </tr>
            </thead>
            <tbody className="text-[var(--text-secondary)]">
              <tr className="border-b border-[var(--border-color)]">
                <td className="py-2">起因</td>
                <td className="py-2 text-center">基因控制（主动）</td>
                <td className="py-2 text-center">外界因素（被动）</td>
              </tr>
              <tr className="border-b border-[var(--border-color)]">
                <td className="py-2">细胞膜</td>
                <td className="py-2 text-center">保持完整</td>
                <td className="py-2 text-center">破裂</td>
              </tr>
              <tr className="border-b border-[var(--border-color)]">
                <td className="py-2">细胞内容物</td>
                <td className="py-2 text-center">不外泄</td>
                <td className="py-2 text-center">外泄</td>
              </tr>
              <tr className="border-b border-[var(--border-color)]">
                <td className="py-2">炎症反应</td>
                <td className="py-2 text-center">无</td>
                <td className="py-2 text-center">有</td>
              </tr>
              <tr>
                <td className="py-2">对机体影响</td>
                <td className="py-2 text-center">有利</td>
                <td className="py-2 text-center">有害</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 知识点 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)] text-sm">
        <p className="font-medium text-[var(--text-primary)] mb-2">细胞衰老与凋亡要点：</p>
        <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
          <li><strong>细胞衰老</strong>：正常生理过程，是个体衰老的基础</li>
          <li><strong>细胞凋亡</strong>：程序性死亡，由基因控制，对机体有利</li>
          <li><strong>细胞坏死</strong>：病理性死亡，由外界因素引起，对机体有害</li>
          <li><strong>凋亡意义</strong>：清除多余、受损、癌变细胞，维持稳态</li>
        </ul>
      </div>
    </div>
  )
}
