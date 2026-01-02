import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const basePairs: Record<string, string> = {
  'A': 'T',
  'T': 'A',
  'G': 'C',
  'C': 'G'
}

const baseColors: Record<string, string> = {
  'A': '#525252',
  'T': '#737373',
  'G': '#404040',
  'C': '#a3a3a3'
}

export default function DNAReplicationSimulation() {
  const [templateStrand] = useState(['A', 'T', 'G', 'C', 'A', 'G', 'T', 'C', 'A', 'T'])
  const [replicationProgress, setReplicationProgress] = useState(0)
  const [isReplicating, setIsReplicating] = useState(false)
  const [showLabels, setShowLabels] = useState(true)

  useEffect(() => {
    if (!isReplicating) return

    const interval = setInterval(() => {
      setReplicationProgress(prev => {
        if (prev >= templateStrand.length) {
          setIsReplicating(false)
          return prev
        }
        return prev + 1
      })
    }, 800)

    return () => clearInterval(interval)
  }, [isReplicating, templateStrand.length])

  const startReplication = () => {
    setReplicationProgress(0)
    setIsReplicating(true)
  }

  const resetReplication = () => {
    setReplicationProgress(0)
    setIsReplicating(false)
  }

  return (
    <div className="space-y-6">
      {/* 说明 */}
      <div className="text-sm text-[var(--text-secondary)]">
        观察DNA半保留复制过程：解旋酶解开双螺旋，DNA聚合酶按碱基互补配对原则合成新链
      </div>

      {/* 控制面板 */}
      <div className="flex flex-wrap items-center gap-4">
        <button
          onClick={startReplication}
          disabled={isReplicating}
          className="px-4 py-2 rounded-lg bg-[var(--text-primary)] text-[var(--bg-primary)] font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
        >
          {isReplicating ? '复制中...' : '开始复制'}
        </button>
        <button
          onClick={resetReplication}
          className="px-4 py-2 rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors"
        >
          重置
        </button>
        <label className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
          <input
            type="checkbox"
            checked={showLabels}
            onChange={(e) => setShowLabels(e.target.checked)}
            className="accent-[var(--text-primary)]"
          />
          显示标签
        </label>
      </div>

      {/* DNA复制动画 */}
      <div className="relative overflow-x-auto py-8">
        <div className="min-w-[600px]">
          <svg viewBox="0 0 600 200" className="w-full h-auto">
            {/* 解旋酶 */}
            <motion.g
              animate={{ x: replicationProgress * 50 }}
              transition={{ duration: 0.5 }}
            >
              <circle cx={50} cy={100} r={15} fill="var(--text-tertiary)" opacity={0.5} />
              {showLabels && (
                <text x={50} y={80} textAnchor="middle" fill="var(--text-secondary)" fontSize="10">解旋酶</text>
              )}
            </motion.g>

            {/* 原始DNA双链 - 未解旋部分 */}
            {templateStrand.slice(replicationProgress).map((base, i) => {
              const x = 100 + (replicationProgress + i) * 50
              const complementBase = basePairs[base]
              return (
                <g key={`original-${i}`}>
                  {/* 上链（模板链） */}
                  <rect x={x - 15} y={85} width={30} height={15} rx={3} fill={baseColors[base]} />
                  <text x={x} y={96} textAnchor="middle" fill="var(--bg-primary)" fontSize="10" fontWeight="bold">{base}</text>

                  {/* 氢键 */}
                  <line x1={x} y1={100} x2={x} y2={115} stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="2 2" />

                  {/* 下链（互补链） */}
                  <rect x={x - 15} y={115} width={30} height={15} rx={3} fill={baseColors[complementBase]} />
                  <text x={x} y={126} textAnchor="middle" fill="var(--bg-primary)" fontSize="10" fontWeight="bold">{complementBase}</text>
                </g>
              )
            })}

            {/* 已复制部分 - 上方新双链 */}
            {templateStrand.slice(0, replicationProgress).map((base, i) => {
              const x = 100 + i * 50
              const newBase = basePairs[base]
              return (
                <motion.g
                  key={`upper-${i}`}
                  initial={{ y: 0, opacity: 0 }}
                  animate={{ y: -30, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* 原始上链 */}
                  <rect x={x - 15} y={85} width={30} height={15} rx={3} fill={baseColors[base]} />
                  <text x={x} y={96} textAnchor="middle" fill="var(--bg-primary)" fontSize="10" fontWeight="bold">{base}</text>

                  {/* 氢键 */}
                  <line x1={x} y1={100} x2={x} y2={115} stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="2 2" />

                  {/* 新合成的下链 */}
                  <rect x={x - 15} y={115} width={30} height={15} rx={3} fill={baseColors[newBase]} stroke="var(--text-primary)" strokeWidth="1" />
                  <text x={x} y={126} textAnchor="middle" fill="var(--bg-primary)" fontSize="10" fontWeight="bold">{newBase}</text>
                </motion.g>
              )
            })}

            {/* 已复制部分 - 下方新双链 */}
            {templateStrand.slice(0, replicationProgress).map((base, i) => {
              const x = 100 + i * 50
              const complementBase = basePairs[base]
              const newBase = basePairs[complementBase]
              return (
                <motion.g
                  key={`lower-${i}`}
                  initial={{ y: 0, opacity: 0 }}
                  animate={{ y: 30, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* 新合成的上链 */}
                  <rect x={x - 15} y={85} width={30} height={15} rx={3} fill={baseColors[newBase]} stroke="var(--text-primary)" strokeWidth="1" />
                  <text x={x} y={96} textAnchor="middle" fill="var(--bg-primary)" fontSize="10" fontWeight="bold">{newBase}</text>

                  {/* 氢键 */}
                  <line x1={x} y1={100} x2={x} y2={115} stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="2 2" />

                  {/* 原始下链 */}
                  <rect x={x - 15} y={115} width={30} height={15} rx={3} fill={baseColors[complementBase]} />
                  <text x={x} y={126} textAnchor="middle" fill="var(--bg-primary)" fontSize="10" fontWeight="bold">{complementBase}</text>
                </motion.g>
              )
            })}

            {/* 标签 */}
            {showLabels && (
              <>
                <text x={30} y={50} fill="var(--text-secondary)" fontSize="10">5'</text>
                <text x={30} y={170} fill="var(--text-secondary)" fontSize="10">3'</text>
                {replicationProgress > 0 && (
                  <>
                    <text x={100 + (replicationProgress - 1) * 50 + 40} y={20} fill="var(--text-tertiary)" fontSize="9">新链</text>
                    <text x={100 + (replicationProgress - 1) * 50 + 40} y={180} fill="var(--text-tertiary)" fontSize="9">新链</text>
                  </>
                )}
              </>
            )}
          </svg>
        </div>
      </div>

      {/* 进度指示 */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-2 rounded-full bg-[var(--bg-tertiary)]">
          <motion.div
            className="h-full rounded-full bg-[var(--text-primary)]"
            animate={{ width: `${(replicationProgress / templateStrand.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <span className="text-sm text-[var(--text-secondary)]">
          {replicationProgress}/{templateStrand.length}
        </span>
      </div>

      {/* 碱基配对规则 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Object.entries(basePairs).map(([base, pair]) => (
          <div key={base} className="p-3 rounded-lg bg-[var(--bg-tertiary)] text-center">
            <div className="flex items-center justify-center gap-2">
              <span
                className="w-8 h-8 rounded flex items-center justify-center text-[var(--bg-primary)] font-bold"
                style={{ backgroundColor: baseColors[base] }}
              >
                {base}
              </span>
              <span className="text-[var(--text-tertiary)]">=</span>
              <span
                className="w-8 h-8 rounded flex items-center justify-center text-[var(--bg-primary)] font-bold"
                style={{ backgroundColor: baseColors[pair] }}
              >
                {pair}
              </span>
            </div>
            <p className="text-xs text-[var(--text-tertiary)] mt-2">
              {base === 'A' ? '腺嘌呤-胸腺嘧啶' : base === 'G' ? '鸟嘌呤-胞嘧啶' : base === 'T' ? '胸腺嘧啶-腺嘌呤' : '胞嘧啶-鸟嘌呤'}
            </p>
          </div>
        ))}
      </div>

      {/* 知识点 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)] text-sm">
        <p className="font-medium text-[var(--text-primary)] mb-2">DNA复制特点：</p>
        <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
          <li><strong>半保留复制</strong>：每个子代DNA分子都含有一条亲代链和一条新合成链</li>
          <li><strong>边解旋边复制</strong>：解旋酶解开双螺旋，DNA聚合酶随后合成新链</li>
          <li><strong>碱基互补配对</strong>：A-T配对（2个氢键），G-C配对（3个氢键）</li>
          <li><strong>半不连续复制</strong>：前导链连续合成，后随链以冈崎片段形式合成</li>
        </ul>
      </div>
    </div>
  )
}
