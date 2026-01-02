import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const dnaToRna: Record<string, string> = {
  'A': 'U',
  'T': 'A',
  'G': 'C',
  'C': 'G'
}

const baseColors: Record<string, string> = {
  'A': '#525252',
  'T': '#737373',
  'G': '#404040',
  'C': '#a3a3a3',
  'U': '#171717'
}

export default function TranscriptionSimulation() {
  const [templateStrand] = useState(['T', 'A', 'C', 'G', 'A', 'T', 'C', 'G', 'A', 'T'])
  const [progress, setProgress] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= templateStrand.length) {
          setIsRunning(false)
          return prev
        }
        return prev + 1
      })
    }, 600)

    return () => clearInterval(interval)
  }, [isRunning, templateStrand.length])

  const startTranscription = () => {
    setProgress(0)
    setIsRunning(true)
  }

  const mRNA = templateStrand.slice(0, progress).map(base => dnaToRna[base])

  return (
    <div className="space-y-6">
      {/* 说明 */}
      <div className="text-sm text-[var(--text-secondary)]">
        转录：以DNA模板链为模板，按碱基互补配对原则合成mRNA
      </div>

      {/* 控制 */}
      <div className="flex gap-4">
        <button
          onClick={startTranscription}
          disabled={isRunning}
          className="px-4 py-2 rounded-lg bg-[var(--text-primary)] text-[var(--bg-primary)] font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
        >
          {isRunning ? '转录中...' : '开始转录'}
        </button>
        <button
          onClick={() => { setProgress(0); setIsRunning(false) }}
          className="px-4 py-2 rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors"
        >
          重置
        </button>
      </div>

      {/* 转录动画 */}
      <div className="relative overflow-x-auto py-4">
        <div className="min-w-[500px]">
          <svg viewBox="0 0 500 180" className="w-full h-auto">
            {/* DNA双链 */}
            <text x="20" y="40" fill="var(--text-secondary)" fontSize="10">DNA编码链 (5'→3')</text>
            <text x="20" y="90" fill="var(--text-secondary)" fontSize="10">DNA模板链 (3'→5')</text>

            {/* 编码链 */}
            {templateStrand.map((base, i) => {
              const codingBase = dnaToRna[base] === 'U' ? 'A' : dnaToRna[base] === 'A' ? 'T' : dnaToRna[base] === 'G' ? 'C' : 'G'
              const x = 100 + i * 40
              return (
                <g key={`coding-${i}`}>
                  <rect x={x - 15} y={30} width={30} height={20} rx={3} fill={baseColors[codingBase]} opacity={i < progress ? 0.5 : 1} />
                  <text x={x} y={44} textAnchor="middle" fill="var(--bg-primary)" fontSize="10" fontWeight="bold">{codingBase}</text>
                </g>
              )
            })}

            {/* 模板链 */}
            {templateStrand.map((base, i) => {
              const x = 100 + i * 40
              return (
                <g key={`template-${i}`}>
                  <rect x={x - 15} y={75} width={30} height={20} rx={3} fill={baseColors[base]} />
                  <text x={x} y={89} textAnchor="middle" fill="var(--bg-primary)" fontSize="10" fontWeight="bold">{base}</text>
                </g>
              )
            })}

            {/* 氢键 */}
            {templateStrand.map((_, i) => {
              const x = 100 + i * 40
              if (i >= progress) {
                return (
                  <line key={`bond-${i}`} x1={x} y1={50} x2={x} y2={75} stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="2 2" />
                )
              }
              return null
            })}

            {/* RNA聚合酶 */}
            <motion.g
              animate={{ x: progress * 40 }}
              transition={{ duration: 0.4 }}
            >
              <ellipse cx={100} cy={110} rx={20} ry={12} fill="var(--text-tertiary)" opacity={0.6} />
              <text x={100} y={114} textAnchor="middle" fill="var(--bg-primary)" fontSize="7">RNA聚合酶</text>
            </motion.g>

            {/* mRNA */}
            <text x="20" y="150" fill="var(--text-secondary)" fontSize="10">mRNA (5'→3')</text>
            {mRNA.map((base, i) => {
              const x = 100 + i * 40
              return (
                <motion.g
                  key={`mrna-${i}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <rect x={x - 15} y={140} width={30} height={20} rx={3} fill={baseColors[base]} stroke="var(--text-primary)" strokeWidth="1" />
                  <text x={x} y={154} textAnchor="middle" fill="var(--bg-primary)" fontSize="10" fontWeight="bold">{base}</text>
                </motion.g>
              )
            })}
          </svg>
        </div>
      </div>

      {/* 进度 */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-2 rounded-full bg-[var(--bg-tertiary)]">
          <motion.div
            className="h-full rounded-full bg-[var(--text-primary)]"
            animate={{ width: `${(progress / templateStrand.length) * 100}%` }}
          />
        </div>
        <span className="text-sm text-[var(--text-secondary)]">{progress}/{templateStrand.length}</span>
      </div>

      {/* 碱基配对规则 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
        <p className="font-medium text-[var(--text-primary)] mb-3">转录时的碱基配对：</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Object.entries(dnaToRna).map(([dna, rna]) => (
            <div key={dna} className="flex items-center justify-center gap-2 p-2 rounded bg-[var(--bg-secondary)]">
              <span className="text-sm text-[var(--text-secondary)]">DNA</span>
              <span className="w-6 h-6 rounded flex items-center justify-center text-[var(--bg-primary)] text-sm font-bold" style={{ backgroundColor: baseColors[dna] }}>{dna}</span>
              <span className="text-[var(--text-tertiary)]">→</span>
              <span className="w-6 h-6 rounded flex items-center justify-center text-[var(--bg-primary)] text-sm font-bold" style={{ backgroundColor: baseColors[rna] }}>{rna}</span>
              <span className="text-sm text-[var(--text-secondary)]">RNA</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-[var(--text-tertiary)] mt-3">
          注意：RNA中用尿嘧啶(U)代替胸腺嘧啶(T)
        </p>
      </div>

      {/* 知识点 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)] text-sm">
        <p className="font-medium text-[var(--text-primary)] mb-2">转录要点：</p>
        <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
          <li><strong>场所</strong>：主要在细胞核（真核生物）</li>
          <li><strong>模板</strong>：DNA的一条链（模板链）</li>
          <li><strong>原料</strong>：4种核糖核苷酸（A、U、G、C）</li>
          <li><strong>酶</strong>：RNA聚合酶</li>
          <li><strong>方向</strong>：mRNA从5'端向3'端延伸</li>
        </ul>
      </div>
    </div>
  )
}
