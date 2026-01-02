import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type NucleicType = 'dna' | 'rna'

export default function NucleicAcidSimulation() {
  const [selectedType, setSelectedType] = useState<NucleicType>('dna')
  const [showStructure, setShowStructure] = useState(false)
  const [highlightedPart, setHighlightedPart] = useState<string | null>(null)

  const dnaInfo = {
    name: 'DNA（脱氧核糖核酸）',
    sugar: '脱氧核糖',
    bases: ['A（腺嘌呤）', 'T（胸腺嘧啶）', 'G（鸟嘌呤）', 'C（胞嘧啶）'],
    structure: '双螺旋结构',
    location: '主要在细胞核（线粒体、叶绿体中也有少量）',
    function: '储存和传递遗传信息',
    pairing: 'A-T, G-C'
  }

  const rnaInfo = {
    name: 'RNA（核糖核酸）',
    sugar: '核糖',
    bases: ['A（腺嘌呤）', 'U（尿嘧啶）', 'G（鸟嘌呤）', 'C（胞嘧啶）'],
    structure: '单链结构',
    location: '主要在细胞质',
    function: 'mRNA传递遗传信息，tRNA转运氨基酸，rRNA构成核糖体',
    pairing: 'A-U, G-C'
  }

  const currentInfo = selectedType === 'dna' ? dnaInfo : rnaInfo

  const dnaSequence = ['A', 'T', 'G', 'C', 'A', 'G', 'T', 'C']
  const complementaryDNA = dnaSequence.map(b => b === 'A' ? 'T' : b === 'T' ? 'A' : b === 'G' ? 'C' : 'G')
  const rnaSequence = ['A', 'U', 'G', 'C', 'A', 'G', 'U', 'C']

  const getBaseColor = (base: string) => {
    switch (base) {
      case 'A': return '#525252'
      case 'T': return '#737373'
      case 'G': return '#404040'
      case 'C': return '#a3a3a3'
      case 'U': return '#737373'
      default: return '#666'
    }
  }

  return (
    <div className="space-y-6">
      {/* 类型选择 */}
      <div className="flex gap-2">
        <button
          onClick={() => { setSelectedType('dna'); setShowStructure(false) }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedType === 'dna'
              ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
              : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          DNA
        </button>
        <button
          onClick={() => { setSelectedType('rna'); setShowStructure(false) }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedType === 'rna'
              ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
              : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          RNA
        </button>
      </div>

      {/* 核苷酸结构 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
        <h3 className="font-medium text-[var(--text-primary)] mb-4">核苷酸的组成</h3>
        <div className="flex justify-center">
          <svg viewBox="0 0 280 180" className="w-72 h-48">
            {/* 磷酸基团 */}
            <motion.g
              animate={{ scale: highlightedPart === 'phosphate' ? 1.1 : 1 }}
              onMouseEnter={() => setHighlightedPart('phosphate')}
              onMouseLeave={() => setHighlightedPart(null)}
              className="cursor-pointer"
            >
              <circle cx="50" cy="90" r="25" fill="var(--text-primary)" opacity={highlightedPart === 'phosphate' ? 1 : 0.8} />
              <text x="50" y="95" textAnchor="middle" fill="var(--bg-primary)" fontSize="10" fontWeight="bold">磷酸</text>
            </motion.g>

            {/* 五碳糖 */}
            <motion.g
              animate={{ scale: highlightedPart === 'sugar' ? 1.1 : 1 }}
              onMouseEnter={() => setHighlightedPart('sugar')}
              onMouseLeave={() => setHighlightedPart(null)}
              className="cursor-pointer"
            >
              <polygon points="140,60 170,75 170,105 140,120 110,105 110,75" fill="var(--text-secondary)" opacity={highlightedPart === 'sugar' ? 1 : 0.8} />
              <text x="140" y="95" textAnchor="middle" fill="var(--bg-primary)" fontSize="9" fontWeight="bold">
                {selectedType === 'dna' ? '脱氧核糖' : '核糖'}
              </text>
            </motion.g>

            {/* 含氮碱基 */}
            <motion.g
              animate={{ scale: highlightedPart === 'base' ? 1.1 : 1 }}
              onMouseEnter={() => setHighlightedPart('base')}
              onMouseLeave={() => setHighlightedPart(null)}
              className="cursor-pointer"
            >
              <rect x="200" y="65" width="60" height="50" rx="5" fill="var(--text-tertiary)" opacity={highlightedPart === 'base' ? 1 : 0.8} />
              <text x="230" y="95" textAnchor="middle" fill="var(--bg-primary)" fontSize="10" fontWeight="bold">碱基</text>
            </motion.g>

            {/* 连接线 */}
            <line x1="75" y1="90" x2="110" y2="90" stroke="var(--text-secondary)" strokeWidth="3" />
            <line x1="170" y1="90" x2="200" y2="90" stroke="var(--text-secondary)" strokeWidth="3" />

            {/* 标注 */}
            <text x="140" y="150" textAnchor="middle" fill="var(--text-tertiary)" fontSize="10">
              核苷酸 = 磷酸 + 五碳糖 + 含氮碱基
            </text>
          </svg>
        </div>

        {/* 高亮部分说明 */}
        <AnimatePresence>
          {highlightedPart && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="mt-4 p-3 rounded-lg bg-[var(--bg-secondary)] text-sm"
            >
              {highlightedPart === 'phosphate' && (
                <p className="text-[var(--text-secondary)]">
                  <strong className="text-[var(--text-primary)]">磷酸基团</strong>：提供负电荷，使DNA/RNA呈酸性，连接相邻核苷酸形成磷酸二酯键
                </p>
              )}
              {highlightedPart === 'sugar' && (
                <p className="text-[var(--text-secondary)]">
                  <strong className="text-[var(--text-primary)]">{selectedType === 'dna' ? '脱氧核糖' : '核糖'}</strong>：
                  {selectedType === 'dna' ? '比核糖少一个氧原子（2号碳位置），使DNA更稳定' : '五碳糖，2号碳位置有羟基（-OH）'}
                </p>
              )}
              {highlightedPart === 'base' && (
                <p className="text-[var(--text-secondary)]">
                  <strong className="text-[var(--text-primary)]">含氮碱基</strong>：
                  {selectedType === 'dna' ? 'A、T、G、C四种，A与T配对，G与C配对' : 'A、U、G、C四种，T被U取代'}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 结构展示 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-[var(--text-primary)]">{currentInfo.structure}</h3>
          <button
            onClick={() => setShowStructure(!showStructure)}
            className="px-3 py-1 rounded-lg bg-[var(--text-primary)] text-[var(--bg-primary)] text-sm"
          >
            {showStructure ? '隐藏' : '展示'}结构
          </button>
        </div>

        <AnimatePresence>
          {showStructure && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              {selectedType === 'dna' ? (
                <div className="space-y-4">
                  <p className="text-sm text-[var(--text-secondary)]">DNA双螺旋结构：两条反向平行的链通过碱基配对连接</p>
                  <div className="flex justify-center gap-2">
                    <div className="text-center">
                      <p className="text-xs text-[var(--text-tertiary)] mb-2">5' → 3'</p>
                      <div className="flex flex-col gap-1">
                        {dnaSequence.map((base, i) => (
                          <motion.div
                            key={i}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="w-10 h-8 rounded flex items-center justify-center text-[var(--bg-primary)] font-bold text-sm"
                            style={{ backgroundColor: getBaseColor(base) }}
                          >
                            {base}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col justify-center gap-1">
                      {dnaSequence.map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ delay: i * 0.1 + 0.5 }}
                          className="w-8 h-8 flex items-center justify-center"
                        >
                          <span className="text-[var(--text-tertiary)]">═</span>
                        </motion.div>
                      ))}
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-[var(--text-tertiary)] mb-2">3' ← 5'</p>
                      <div className="flex flex-col gap-1">
                        {complementaryDNA.map((base, i) => (
                          <motion.div
                            key={i}
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: i * 0.1 + 0.3 }}
                            className="w-10 h-8 rounded flex items-center justify-center text-[var(--bg-primary)] font-bold text-sm"
                            style={{ backgroundColor: getBaseColor(base) }}
                          >
                            {base}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-center text-[var(--text-tertiary)]">氢键：A-T（2个），G-C（3个）</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-[var(--text-secondary)]">RNA单链结构：一条多核苷酸链</p>
                  <div className="flex justify-center">
                    <div className="text-center">
                      <p className="text-xs text-[var(--text-tertiary)] mb-2">5' → 3'</p>
                      <div className="flex gap-1">
                        {rnaSequence.map((base, i) => (
                          <motion.div
                            key={i}
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="w-10 h-10 rounded flex items-center justify-center text-[var(--bg-primary)] font-bold"
                            style={{ backgroundColor: getBaseColor(base) }}
                          >
                            {base}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 信息对比 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
        <h3 className="font-medium text-[var(--text-primary)] mb-3">{currentInfo.name}</h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-[var(--text-tertiary)]">五碳糖：</span>
            <span className="text-[var(--text-secondary)]">{currentInfo.sugar}</span>
          </div>
          <div>
            <span className="text-[var(--text-tertiary)]">结构：</span>
            <span className="text-[var(--text-secondary)]">{currentInfo.structure}</span>
          </div>
          <div>
            <span className="text-[var(--text-tertiary)]">碱基配对：</span>
            <span className="text-[var(--text-secondary)]">{currentInfo.pairing}</span>
          </div>
          <div>
            <span className="text-[var(--text-tertiary)]">分布：</span>
            <span className="text-[var(--text-secondary)]">{currentInfo.location}</span>
          </div>
        </div>
        <div className="mt-3">
          <span className="text-[var(--text-tertiary)] text-sm">碱基：</span>
          <div className="flex flex-wrap gap-2 mt-1">
            {currentInfo.bases.map((base, i) => (
              <span key={i} className="px-2 py-1 rounded bg-[var(--bg-secondary)] text-xs text-[var(--text-secondary)]">
                {base}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* DNA vs RNA 对比 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)] text-sm">
        <p className="font-medium text-[var(--text-primary)] mb-2">DNA与RNA的区别：</p>
        <div className="overflow-x-auto">
          <table className="w-full text-[var(--text-secondary)]">
            <thead>
              <tr className="border-b border-[var(--border-color)]">
                <th className="py-2 text-left text-[var(--text-tertiary)]">比较项目</th>
                <th className="py-2 text-center">DNA</th>
                <th className="py-2 text-center">RNA</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[var(--border-color)]">
                <td className="py-2 text-[var(--text-tertiary)]">五碳糖</td>
                <td className="py-2 text-center">脱氧核糖</td>
                <td className="py-2 text-center">核糖</td>
              </tr>
              <tr className="border-b border-[var(--border-color)]">
                <td className="py-2 text-[var(--text-tertiary)]">特有碱基</td>
                <td className="py-2 text-center">T（胸腺嘧啶）</td>
                <td className="py-2 text-center">U（尿嘧啶）</td>
              </tr>
              <tr className="border-b border-[var(--border-color)]">
                <td className="py-2 text-[var(--text-tertiary)]">结构</td>
                <td className="py-2 text-center">双螺旋</td>
                <td className="py-2 text-center">单链</td>
              </tr>
              <tr>
                <td className="py-2 text-[var(--text-tertiary)]">主要分布</td>
                <td className="py-2 text-center">细胞核</td>
                <td className="py-2 text-center">细胞质</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
