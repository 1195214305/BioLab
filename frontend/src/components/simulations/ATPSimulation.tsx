import { useState } from 'react'
import { motion } from 'framer-motion'

export default function ATPSimulation() {
  const [isHydrolyzing, setIsHydrolyzing] = useState(false)
  const [isSynthesizing, setIsSynthesizing] = useState(false)
  const [atpCount, setAtpCount] = useState(5)
  const [adpCount, setAdpCount] = useState(0)
  const [energyReleased, setEnergyReleased] = useState(0)

  const hydrolyze = () => {
    if (atpCount <= 0 || isHydrolyzing) return
    setIsHydrolyzing(true)
    setTimeout(() => {
      setAtpCount(prev => prev - 1)
      setAdpCount(prev => prev + 1)
      setEnergyReleased(prev => prev + 30.54)
      setIsHydrolyzing(false)
    }, 1000)
  }

  const synthesize = () => {
    if (adpCount <= 0 || isSynthesizing) return
    setIsSynthesizing(true)
    setTimeout(() => {
      setAdpCount(prev => prev - 1)
      setAtpCount(prev => prev + 1)
      setEnergyReleased(prev => Math.max(0, prev - 30.54))
      setIsSynthesizing(false)
    }, 1000)
  }

  const reset = () => {
    setAtpCount(5)
    setAdpCount(0)
    setEnergyReleased(0)
  }

  return (
    <div className="space-y-6">
      {/* 说明 */}
      <div className="text-sm text-[var(--text-secondary)]">
        观察ATP与ADP的相互转化过程，理解能量的释放与储存
      </div>

      {/* ATP结构 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
        <h3 className="font-medium text-[var(--text-primary)] mb-4">ATP的分子结构</h3>
        <div className="flex justify-center">
          <svg viewBox="0 0 400 120" className="w-full max-w-md h-32">
            {/* 腺苷 */}
            <g>
              <rect x="20" y="35" width="80" height="50" rx="5" fill="var(--text-tertiary)" />
              <text x="60" y="55" textAnchor="middle" fill="var(--bg-primary)" fontSize="10">腺嘌呤</text>
              <text x="60" y="70" textAnchor="middle" fill="var(--bg-primary)" fontSize="8">(A)</text>
            </g>

            {/* 核糖 */}
            <g>
              <polygon points="120,35 150,35 160,60 150,85 120,85 110,60" fill="var(--text-secondary)" />
              <text x="135" y="65" textAnchor="middle" fill="var(--bg-primary)" fontSize="9">核糖</text>
            </g>

            {/* 连接线 */}
            <line x1="100" y1="60" x2="110" y2="60" stroke="var(--text-secondary)" strokeWidth="2" />

            {/* 腺苷标注 */}
            <path d="M20 95 L160 95" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="3 2" />
            <text x="90" y="110" textAnchor="middle" fill="var(--text-tertiary)" fontSize="10">腺苷</text>

            {/* 磷酸基团 */}
            <g>
              <circle cx="200" cy="60" r="25" fill="var(--text-secondary)" />
              <text x="200" y="55" textAnchor="middle" fill="var(--bg-primary)" fontSize="10">磷酸</text>
              <text x="200" y="70" textAnchor="middle" fill="var(--bg-primary)" fontSize="8">①</text>
            </g>

            <motion.g animate={isHydrolyzing ? { x: [0, 5, 0] } : {}}>
              <line x1="225" y1="60" x2="245" y2="60" stroke="var(--text-primary)" strokeWidth="3" />
              <text x="235" y="50" textAnchor="middle" fill="var(--text-primary)" fontSize="8">~</text>
            </motion.g>

            <g>
              <circle cx="270" cy="60" r="25" fill="var(--text-secondary)" />
              <text x="270" y="55" textAnchor="middle" fill="var(--bg-primary)" fontSize="10">磷酸</text>
              <text x="270" y="70" textAnchor="middle" fill="var(--bg-primary)" fontSize="8">②</text>
            </g>

            <motion.g animate={isHydrolyzing ? { x: [0, 10, 0], opacity: [1, 0.5, 1] } : {}}>
              <line x1="295" y1="60" x2="315" y2="60" stroke="var(--text-primary)" strokeWidth="3" />
              <text x="305" y="50" textAnchor="middle" fill="var(--text-primary)" fontSize="8">~</text>
            </motion.g>

            <motion.g
              animate={isHydrolyzing ? { x: 30, opacity: 0 } : { x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <circle cx="340" cy="60" r="25" fill="var(--text-primary)" />
              <text x="340" y="55" textAnchor="middle" fill="var(--bg-primary)" fontSize="10">磷酸</text>
              <text x="340" y="70" textAnchor="middle" fill="var(--bg-primary)" fontSize="8">③</text>
            </motion.g>

            {/* 高能磷酸键标注 */}
            <text x="270" y="105" textAnchor="middle" fill="var(--text-primary)" fontSize="9">
              ~ 高能磷酸键
            </text>
          </svg>
        </div>
        <p className="text-center text-sm text-[var(--text-tertiary)] mt-2">
          ATP = 腺苷 + 3个磷酸基团（含2个高能磷酸键）
        </p>
      </div>

      {/* ATP/ADP转化演示 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
        <h3 className="font-medium text-[var(--text-primary)] mb-4">ATP与ADP的相互转化</h3>

        <div className="flex items-center justify-center gap-8 mb-6">
          {/* ATP */}
          <div className="text-center">
            <div className="text-4xl font-bold text-[var(--text-primary)]">{atpCount}</div>
            <div className="text-sm text-[var(--text-secondary)]">ATP</div>
          </div>

          {/* 转化箭头 */}
          <div className="flex flex-col items-center gap-2">
            <motion.button
              onClick={hydrolyze}
              disabled={atpCount <= 0 || isHydrolyzing}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-lg bg-[var(--text-primary)] text-[var(--bg-primary)] text-sm font-medium disabled:opacity-50"
            >
              水解 →
            </motion.button>
            <div className="text-xs text-[var(--text-tertiary)]">释放能量</div>
            <div className="text-xs text-[var(--text-tertiary)]">吸收能量</div>
            <motion.button
              onClick={synthesize}
              disabled={adpCount <= 0 || isSynthesizing}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] text-sm font-medium disabled:opacity-50 hover:text-[var(--text-primary)]"
            >
              ← 合成
            </motion.button>
          </div>

          {/* ADP + Pi */}
          <div className="text-center">
            <div className="text-4xl font-bold text-[var(--text-secondary)]">{adpCount}</div>
            <div className="text-sm text-[var(--text-secondary)]">ADP + Pi</div>
          </div>
        </div>

        {/* 能量显示 */}
        <div className="p-3 rounded-lg bg-[var(--bg-secondary)] text-center">
          <div className="text-sm text-[var(--text-tertiary)]">释放的能量</div>
          <div className="text-2xl font-bold text-[var(--text-primary)]">
            {energyReleased.toFixed(2)} kJ/mol
          </div>
        </div>

        <button
          onClick={reset}
          className="w-full mt-4 py-2 rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] text-sm hover:text-[var(--text-primary)]"
        >
          重置
        </button>
      </div>

      {/* ATP的来源与去路 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
        <h3 className="font-medium text-[var(--text-primary)] mb-4">ATP的来源与去路</h3>
        <div className="relative">
          <svg viewBox="0 0 400 200" className="w-full h-auto">
            {/* 中心ATP */}
            <circle cx="200" cy="100" r="40" fill="var(--text-primary)" />
            <text x="200" y="105" textAnchor="middle" fill="var(--bg-primary)" fontSize="14" fontWeight="bold">ATP</text>

            {/* 来源 - 左侧 */}
            <g>
              <rect x="20" y="30" width="80" height="40" rx="5" fill="var(--text-secondary)" />
              <text x="60" y="55" textAnchor="middle" fill="var(--bg-primary)" fontSize="10">细胞呼吸</text>
              <path d="M100 50 L160 90" stroke="var(--text-secondary)" strokeWidth="2" markerEnd="url(#arrow)" />
            </g>

            <g>
              <rect x="20" y="130" width="80" height="40" rx="5" fill="var(--text-secondary)" />
              <text x="60" y="155" textAnchor="middle" fill="var(--bg-primary)" fontSize="10">光合作用</text>
              <path d="M100 150 L160 110" stroke="var(--text-secondary)" strokeWidth="2" markerEnd="url(#arrow)" />
            </g>

            {/* 去路 - 右侧 */}
            <g>
              <rect x="300" y="20" width="80" height="35" rx="5" fill="var(--text-tertiary)" />
              <text x="340" y="42" textAnchor="middle" fill="var(--bg-primary)" fontSize="9">主动运输</text>
              <path d="M240 85 L300 45" stroke="var(--text-tertiary)" strokeWidth="2" markerEnd="url(#arrow2)" />
            </g>

            <g>
              <rect x="300" y="65" width="80" height="35" rx="5" fill="var(--text-tertiary)" />
              <text x="340" y="87" textAnchor="middle" fill="var(--bg-primary)" fontSize="9">肌肉收缩</text>
              <path d="M240 95 L300 85" stroke="var(--text-tertiary)" strokeWidth="2" markerEnd="url(#arrow2)" />
            </g>

            <g>
              <rect x="300" y="110" width="80" height="35" rx="5" fill="var(--text-tertiary)" />
              <text x="340" y="132" textAnchor="middle" fill="var(--bg-primary)" fontSize="9">神经传导</text>
              <path d="M240 105 L300 125" stroke="var(--text-tertiary)" strokeWidth="2" markerEnd="url(#arrow2)" />
            </g>

            <g>
              <rect x="300" y="155" width="80" height="35" rx="5" fill="var(--text-tertiary)" />
              <text x="340" y="177" textAnchor="middle" fill="var(--bg-primary)" fontSize="9">生物合成</text>
              <path d="M240 115 L300 165" stroke="var(--text-tertiary)" strokeWidth="2" markerEnd="url(#arrow2)" />
            </g>

            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="var(--text-secondary)" />
              </marker>
              <marker id="arrow2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="var(--text-tertiary)" />
              </marker>
            </defs>
          </svg>
        </div>
      </div>

      {/* ATP特点 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg bg-[var(--bg-tertiary)] text-center">
          <div className="text-2xl mb-2">⚡</div>
          <div className="font-medium text-[var(--text-primary)]">能量货币</div>
          <div className="text-xs text-[var(--text-secondary)]">细胞内直接供能物质</div>
        </div>
        <div className="p-4 rounded-lg bg-[var(--bg-tertiary)] text-center">
          <div className="text-2xl mb-2">🔄</div>
          <div className="font-medium text-[var(--text-primary)]">快速转化</div>
          <div className="text-xs text-[var(--text-secondary)]">ATP与ADP可快速相互转化</div>
        </div>
        <div className="p-4 rounded-lg bg-[var(--bg-tertiary)] text-center">
          <div className="text-2xl mb-2">📊</div>
          <div className="font-medium text-[var(--text-primary)]">含量少</div>
          <div className="text-xs text-[var(--text-secondary)]">细胞内ATP含量很少但转化快</div>
        </div>
      </div>

      {/* 知识点 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)] text-sm">
        <p className="font-medium text-[var(--text-primary)] mb-2">ATP要点：</p>
        <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
          <li><strong>全称</strong>：三磷酸腺苷（Adenosine Triphosphate）</li>
          <li><strong>结构</strong>：腺苷 + 3个磷酸基团，含2个高能磷酸键</li>
          <li><strong>水解</strong>：ATP → ADP + Pi + 能量（约30.54 kJ/mol）</li>
          <li><strong>合成</strong>：ADP + Pi + 能量 → ATP</li>
          <li><strong>来源</strong>：细胞呼吸（主要）、光合作用（植物）</li>
        </ul>
      </div>
    </div>
  )
}
