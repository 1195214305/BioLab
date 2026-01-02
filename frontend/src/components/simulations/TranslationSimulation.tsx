import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// 密码子表（简化版）
const codonTable: Record<string, string> = {
  'AUG': 'Met(起始)',
  'UUU': 'Phe', 'UUC': 'Phe',
  'UUA': 'Leu', 'UUG': 'Leu',
  'UCU': 'Ser', 'UCC': 'Ser', 'UCA': 'Ser', 'UCG': 'Ser',
  'UAU': 'Tyr', 'UAC': 'Tyr',
  'UGU': 'Cys', 'UGC': 'Cys',
  'UGG': 'Trp',
  'CUU': 'Leu', 'CUC': 'Leu', 'CUA': 'Leu', 'CUG': 'Leu',
  'CCU': 'Pro', 'CCC': 'Pro', 'CCA': 'Pro', 'CCG': 'Pro',
  'CAU': 'His', 'CAC': 'His',
  'CAA': 'Gln', 'CAG': 'Gln',
  'CGU': 'Arg', 'CGC': 'Arg', 'CGA': 'Arg', 'CGG': 'Arg',
  'AUU': 'Ile', 'AUC': 'Ile', 'AUA': 'Ile',
  'ACU': 'Thr', 'ACC': 'Thr', 'ACA': 'Thr', 'ACG': 'Thr',
  'AAU': 'Asn', 'AAC': 'Asn',
  'AAA': 'Lys', 'AAG': 'Lys',
  'AGU': 'Ser', 'AGC': 'Ser',
  'AGA': 'Arg', 'AGG': 'Arg',
  'GUU': 'Val', 'GUC': 'Val', 'GUA': 'Val', 'GUG': 'Val',
  'GCU': 'Ala', 'GCC': 'Ala', 'GCA': 'Ala', 'GCG': 'Ala',
  'GAU': 'Asp', 'GAC': 'Asp',
  'GAA': 'Glu', 'GAG': 'Glu',
  'GGU': 'Gly', 'GGC': 'Gly', 'GGA': 'Gly', 'GGG': 'Gly',
  'UAA': '终止', 'UAG': '终止', 'UGA': '终止'
}

const anticodonMap: Record<string, string> = {
  'A': 'U', 'U': 'A', 'G': 'C', 'C': 'G'
}

export default function TranslationSimulation() {
  const [mRNA] = useState(['A', 'U', 'G', 'G', 'C', 'U', 'U', 'A', 'C', 'A', 'A', 'U', 'A', 'A'])
  const [progress, setProgress] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  const codons: string[] = []
  for (let i = 0; i < mRNA.length - 2; i += 3) {
    codons.push(mRNA.slice(i, i + 3).join(''))
  }

  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      setProgress(prev => {
        const nextCodon = codons[prev]
        if (prev >= codons.length || (nextCodon && codonTable[nextCodon] === '终止')) {
          setIsRunning(false)
          return prev
        }
        return prev + 1
      })
    }, 1200)

    return () => clearInterval(interval)
  }, [isRunning, codons])

  const startTranslation = () => {
    setProgress(0)
    setIsRunning(true)
  }

  const getAnticodon = (codon: string) => {
    return codon.split('').map(b => anticodonMap[b]).join('')
  }

  return (
    <div className="space-y-6">
      {/* 说明 */}
      <div className="text-sm text-[var(--text-secondary)]">
        翻译：核糖体沿mRNA移动，tRNA携带氨基酸，按密码子-反密码子配对合成多肽链
      </div>

      {/* 控制 */}
      <div className="flex gap-4">
        <button
          onClick={startTranslation}
          disabled={isRunning}
          className="px-4 py-2 rounded-lg bg-[var(--text-primary)] text-[var(--bg-primary)] font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
        >
          {isRunning ? '翻译中...' : '开始翻译'}
        </button>
        <button
          onClick={() => { setProgress(0); setIsRunning(false) }}
          className="px-4 py-2 rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors"
        >
          重置
        </button>
      </div>

      {/* 翻译动画 */}
      <div className="relative overflow-x-auto py-4">
        <div className="min-w-[600px]">
          <svg viewBox="0 0 600 220" className="w-full h-auto">
            {/* mRNA */}
            <text x="20" y="180" fill="var(--text-secondary)" fontSize="10">mRNA (5'→3')</text>
            {mRNA.map((base, i) => {
              const x = 80 + i * 35
              const isInCurrentCodon = Math.floor(i / 3) === progress && i < progress * 3 + 3
              return (
                <g key={`mrna-${i}`}>
                  <rect
                    x={x - 12}
                    y={165}
                    width={24}
                    height={20}
                    rx={3}
                    fill={isInCurrentCodon ? 'var(--text-primary)' : 'var(--text-tertiary)'}
                    opacity={Math.floor(i / 3) < progress ? 0.4 : 1}
                  />
                  <text
                    x={x}
                    y={179}
                    textAnchor="middle"
                    fill="var(--bg-primary)"
                    fontSize="10"
                    fontWeight="bold"
                  >
                    {base}
                  </text>
                </g>
              )
            })}

            {/* 密码子分隔线 */}
            {codons.map((_, i) => {
              const x = 80 + i * 3 * 35 - 15
              return (
                <line
                  key={`sep-${i}`}
                  x1={x}
                  y1={160}
                  x2={x}
                  y2={190}
                  stroke="var(--text-tertiary)"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                />
              )
            })}

            {/* 核糖体 */}
            <motion.g
              animate={{ x: progress * 105 }}
              transition={{ duration: 0.8 }}
            >
              {/* 大亚基 */}
              <ellipse cx={130} cy={130} rx={55} ry={30} fill="var(--text-tertiary)" opacity={0.3} />
              {/* 小亚基 */}
              <ellipse cx={130} cy={165} rx={45} ry={15} fill="var(--text-tertiary)" opacity={0.3} />
              <text x={130} y={135} textAnchor="middle" fill="var(--text-secondary)" fontSize="8">核糖体</text>
            </motion.g>

            {/* tRNA和氨基酸 */}
            {codons.slice(0, progress).map((codon, i) => {
              const aminoAcid = codonTable[codon]
              if (aminoAcid === '终止') return null
              const x = 80 + i * 105 + 35
              return (
                <motion.g
                  key={`trna-${i}`}
                  initial={{ y: -30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* tRNA */}
                  <path
                    d={`M${x} 140 L${x - 15} 110 L${x} 80 L${x + 15} 110 Z`}
                    fill="var(--bg-tertiary)"
                    stroke="var(--text-secondary)"
                    strokeWidth="1"
                  />
                  {/* 反密码子 */}
                  <text x={x} y={150} textAnchor="middle" fill="var(--text-secondary)" fontSize="7">
                    {getAnticodon(codon)}
                  </text>
                  {/* 氨基酸 */}
                  <circle cx={x} cy={65} r={15} fill="var(--text-primary)" />
                  <text x={x} y={69} textAnchor="middle" fill="var(--bg-primary)" fontSize="7" fontWeight="bold">
                    {aminoAcid.slice(0, 3)}
                  </text>
                </motion.g>
              )
            })}

            {/* 多肽链 */}
            {progress > 1 && (
              <g>
                <text x="20" y="50" fill="var(--text-secondary)" fontSize="10">多肽链</text>
                {codons.slice(0, progress).map((codon, i) => {
                  const aminoAcid = codonTable[codon]
                  if (aminoAcid === '终止') return null
                  const x = 80 + i * 30
                  return (
                    <g key={`peptide-${i}`}>
                      <circle cx={x} cy={40} r={12} fill="var(--text-primary)" />
                      <text x={x} y={44} textAnchor="middle" fill="var(--bg-primary)" fontSize="6" fontWeight="bold">
                        {aminoAcid.slice(0, 3)}
                      </text>
                      {i > 0 && (
                        <line x1={x - 12} y1={40} x2={x - 18} y2={40} stroke="var(--text-secondary)" strokeWidth="2" />
                      )}
                    </g>
                  )
                })}
              </g>
            )}
          </svg>
        </div>
      </div>

      {/* 当前密码子信息 */}
      {progress > 0 && progress <= codons.length && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-lg bg-[var(--bg-tertiary)]"
        >
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xs text-[var(--text-tertiary)]">当前密码子</p>
              <p className="text-lg font-mono font-bold text-[var(--text-primary)]">{codons[progress - 1]}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--text-tertiary)]">反密码子</p>
              <p className="text-lg font-mono font-bold text-[var(--text-primary)]">{getAnticodon(codons[progress - 1])}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--text-tertiary)]">氨基酸</p>
              <p className="text-lg font-bold text-[var(--text-primary)]">{codonTable[codons[progress - 1]]}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* 知识点 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)] text-sm">
        <p className="font-medium text-[var(--text-primary)] mb-2">翻译要点：</p>
        <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
          <li><strong>场所</strong>：核糖体（细胞质中或附着在内质网上）</li>
          <li><strong>模板</strong>：mRNA</li>
          <li><strong>原料</strong>：20种氨基酸</li>
          <li><strong>起始密码子</strong>：AUG（编码甲硫氨酸）</li>
          <li><strong>终止密码子</strong>：UAA、UAG、UGA（不编码氨基酸）</li>
          <li><strong>密码子特点</strong>：简并性（多个密码子编码同一氨基酸）、通用性</li>
        </ul>
      </div>
    </div>
  )
}
