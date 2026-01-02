import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function EnzymeSimulation() {
  const [temperature, setTemperature] = useState(37)
  const [pH, setPH] = useState(7)
  const [substrateConc, setSubstrateConc] = useState(50)
  const [isRunning, setIsRunning] = useState(false)
  const [reactionProgress, setReactionProgress] = useState(0)

  // 计算酶活性
  const calculateActivity = () => {
    // 温度影响（最适温度37°C）
    const tempFactor = temperature < 20 ? temperature / 20 * 0.5 :
                       temperature < 37 ? 0.5 + (temperature - 20) / 17 * 0.5 :
                       temperature < 45 ? 1 - (temperature - 37) / 8 * 0.3 :
                       temperature < 60 ? 0.7 - (temperature - 45) / 15 * 0.7 : 0

    // pH影响（最适pH 7）
    const phFactor = Math.max(0, 1 - Math.abs(pH - 7) / 4)

    // 底物浓度影响
    const substrateFactor = substrateConc < 30 ? substrateConc / 30 :
                            substrateConc < 70 ? 1 :
                            1 - (substrateConc - 70) / 100

    return Math.max(0, Math.min(100, tempFactor * phFactor * substrateFactor * 100))
  }

  const activity = calculateActivity()

  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      setReactionProgress(prev => {
        if (prev >= 100) {
          setIsRunning(false)
          return 100
        }
        return prev + activity / 20
      })
    }, 100)

    return () => clearInterval(interval)
  }, [isRunning, activity])

  const startReaction = () => {
    setReactionProgress(0)
    setIsRunning(true)
  }

  return (
    <div className="space-y-6">
      {/* 说明 */}
      <div className="text-sm text-[var(--text-secondary)]">
        调节温度、pH和底物浓度，观察酶活性的变化
      </div>

      {/* 控制面板 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[var(--text-primary)]">温度</span>
            <span className="text-sm text-[var(--text-secondary)]">{temperature}°C</span>
          </div>
          <input
            type="range"
            min="0"
            max="80"
            value={temperature}
            onChange={(e) => setTemperature(Number(e.target.value))}
            className="w-full accent-[var(--text-primary)]"
          />
          <div className="flex justify-between text-xs text-[var(--text-tertiary)] mt-1">
            <span>0°C</span>
            <span className="text-[var(--text-secondary)]">最适37°C</span>
            <span>80°C</span>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[var(--text-primary)]">pH值</span>
            <span className="text-sm text-[var(--text-secondary)]">{pH}</span>
          </div>
          <input
            type="range"
            min="1"
            max="14"
            step="0.5"
            value={pH}
            onChange={(e) => setPH(Number(e.target.value))}
            className="w-full accent-[var(--text-primary)]"
          />
          <div className="flex justify-between text-xs text-[var(--text-tertiary)] mt-1">
            <span>酸性</span>
            <span className="text-[var(--text-secondary)]">中性7</span>
            <span>碱性</span>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[var(--text-primary)]">底物浓度</span>
            <span className="text-sm text-[var(--text-secondary)]">{substrateConc}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={substrateConc}
            onChange={(e) => setSubstrateConc(Number(e.target.value))}
            className="w-full accent-[var(--text-primary)]"
          />
        </div>
      </div>

      {/* 酶活性显示 */}
      <div className="flex items-center justify-center gap-8 py-4">
        <div className="text-center">
          <div className="text-4xl font-bold text-[var(--text-primary)]">{Math.round(activity)}%</div>
          <div className="text-sm text-[var(--text-secondary)]">酶活性</div>
        </div>
        <button
          onClick={startReaction}
          disabled={isRunning || activity === 0}
          className="px-6 py-3 rounded-lg bg-[var(--text-primary)] text-[var(--bg-primary)] font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
        >
          {isRunning ? '反应中...' : '开始反应'}
        </button>
      </div>

      {/* 反应进度 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-[var(--text-secondary)]">反应进度</span>
          <span className="text-sm text-[var(--text-primary)]">{Math.round(reactionProgress)}%</span>
        </div>
        <div className="h-4 rounded-full bg-[var(--bg-secondary)]">
          <motion.div
            className="h-full rounded-full bg-[var(--text-primary)]"
            animate={{ width: `${reactionProgress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </div>

      {/* 酶促反应动画 */}
      <div className="relative h-40 rounded-lg bg-[var(--bg-tertiary)] overflow-hidden">
        <svg viewBox="0 0 300 120" className="w-full h-full">
          {/* 酶 */}
          <motion.g animate={{ scale: activity > 50 ? [1, 1.05, 1] : 1 }} transition={{ duration: 0.5, repeat: Infinity }}>
            <path
              d="M100 30 Q130 20 150 40 Q170 60 150 80 Q130 100 100 90 Q70 80 70 60 Q70 40 100 30"
              fill="var(--text-tertiary)"
              stroke="var(--text-secondary)"
              strokeWidth="2"
            />
            {/* 活性位点 */}
            <path
              d="M140 50 Q155 60 140 70"
              fill="none"
              stroke="var(--text-primary)"
              strokeWidth="3"
            />
            <text x="100" y="65" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">酶</text>
          </motion.g>

          {/* 底物 */}
          <motion.g
            animate={isRunning ? { x: [0, 40, 80], opacity: [1, 1, 0] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <rect x="180" y="45" width="30" height="30" rx="5" fill="var(--text-primary)" />
            <text x="195" y="65" textAnchor="middle" fill="var(--bg-primary)" fontSize="8">底物</text>
          </motion.g>

          {/* 产物 */}
          {isRunning && (
            <motion.g
              initial={{ x: 0, opacity: 0 }}
              animate={{ x: [0, 50], opacity: [0, 1] }}
              transition={{ duration: 1, delay: 1, repeat: Infinity }}
            >
              <rect x="220" y="45" width="15" height="15" rx="3" fill="var(--text-secondary)" />
              <rect x="220" y="60" width="15" height="15" rx="3" fill="var(--text-secondary)" />
              <text x="260" y="60" fill="var(--text-tertiary)" fontSize="8">产物</text>
            </motion.g>
          )}

          {/* 温度警告 */}
          {temperature > 60 && (
            <text x="150" y="110" textAnchor="middle" fill="var(--text-primary)" fontSize="10">
              高温使酶变性失活！
            </text>
          )}
        </svg>
      </div>

      {/* 酶的特性 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg bg-[var(--bg-tertiary)] text-center">
          <div className="text-2xl mb-2">⚡</div>
          <div className="font-medium text-[var(--text-primary)]">高效性</div>
          <div className="text-xs text-[var(--text-secondary)]">催化效率比无机催化剂高10⁷~10¹³倍</div>
        </div>
        <div className="p-4 rounded-lg bg-[var(--bg-tertiary)] text-center">
          <div className="text-2xl mb-2">🎯</div>
          <div className="font-medium text-[var(--text-primary)]">专一性</div>
          <div className="text-xs text-[var(--text-secondary)]">一种酶只能催化一种或一类化学反应</div>
        </div>
        <div className="p-4 rounded-lg bg-[var(--bg-tertiary)] text-center">
          <div className="text-2xl mb-2">🌡️</div>
          <div className="font-medium text-[var(--text-primary)]">多样性</div>
          <div className="text-xs text-[var(--text-secondary)]">生物体内有多种酶，催化不同反应</div>
        </div>
      </div>

      {/* 知识点 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)] text-sm">
        <p className="font-medium text-[var(--text-primary)] mb-2">酶的本质与作用：</p>
        <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
          <li><strong>本质</strong>：绝大多数是蛋白质，少数是RNA</li>
          <li><strong>作用</strong>：降低化学反应的活化能</li>
          <li><strong>最适条件</strong>：每种酶都有最适温度和最适pH</li>
          <li><strong>失活</strong>：高温、强酸、强碱会使酶变性失活</li>
        </ul>
      </div>
    </div>
  )
}
