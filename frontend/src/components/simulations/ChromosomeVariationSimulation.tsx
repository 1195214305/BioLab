import { useState } from 'react'
import { motion } from 'framer-motion'

type VariationType = 'deletion' | 'duplication' | 'inversion' | 'translocation' | 'aneuploidy' | 'polyploidy'

export default function ChromosomeVariationSimulation() {
  const [variationType, setVariationType] = useState<VariationType>('deletion')

  const variations = {
    deletion: {
      name: '缺失',
      description: '染色体片段丢失',
      example: '猫叫综合征（5号染色体短臂缺失）',
      category: 'structure'
    },
    duplication: {
      name: '重复',
      description: '染色体片段重复出现',
      example: '果蝇棒眼',
      category: 'structure'
    },
    inversion: {
      name: '倒位',
      description: '染色体片段颠倒180°',
      example: '某些物种的进化',
      category: 'structure'
    },
    translocation: {
      name: '易位',
      description: '非同源染色体间片段交换',
      example: '慢性粒细胞白血病',
      category: 'structure'
    },
    aneuploidy: {
      name: '非整倍体',
      description: '个别染色体数目增减',
      example: '21三体综合征（唐氏综合征）',
      category: 'number'
    },
    polyploidy: {
      name: '多倍体',
      description: '染色体组成倍增加',
      example: '三倍体无籽西瓜',
      category: 'number'
    }
  }

  const currentVariation = variations[variationType]

  return (
    <div className="space-y-6">
      {/* 说明 */}
      <div className="text-sm text-[var(--text-secondary)]">
        选择变异类型，观察染色体的变化
      </div>

      {/* 变异类型分类 */}
      <div className="space-y-3">
        <div>
          <p className="text-xs text-[var(--text-tertiary)] mb-2">结构变异</p>
          <div className="flex flex-wrap gap-2">
            {(['deletion', 'duplication', 'inversion', 'translocation'] as VariationType[]).map((type) => (
              <button
                key={type}
                onClick={() => setVariationType(type)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  variationType === type
                    ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
                    : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {variations[type].name}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs text-[var(--text-tertiary)] mb-2">数目变异</p>
          <div className="flex flex-wrap gap-2">
            {(['aneuploidy', 'polyploidy'] as VariationType[]).map((type) => (
              <button
                key={type}
                onClick={() => setVariationType(type)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  variationType === type
                    ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
                    : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {variations[type].name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 染色体变异动画 */}
      <div className="relative h-64 rounded-lg bg-[var(--bg-tertiary)] overflow-hidden">
        <svg viewBox="0 0 400 200" className="w-full h-full">
          {variationType === 'deletion' && (
            <>
              <text x="100" y="30" textAnchor="middle" fill="var(--text-secondary)" fontSize="12">正常</text>
              <text x="300" y="30" textAnchor="middle" fill="var(--text-secondary)" fontSize="12">缺失后</text>
              {/* 正常染色体 */}
              <g>
                <rect x="80" y="50" width="40" height="120" rx="5" fill="var(--text-tertiary)" />
                <rect x="85" y="60" width="30" height="20" fill="#525252" />
                <rect x="85" y="85" width="30" height="20" fill="#737373" />
                <rect x="85" y="110" width="30" height="20" fill="#404040" />
                <rect x="85" y="135" width="30" height="20" fill="#a3a3a3" />
              </g>
              {/* 缺失后 */}
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                <rect x="280" y="50" width="40" height="100" rx="5" fill="var(--text-tertiary)" />
                <rect x="285" y="60" width="30" height="20" fill="#525252" />
                <rect x="285" y="85" width="30" height="20" fill="#404040" />
                <rect x="285" y="110" width="30" height="20" fill="#a3a3a3" />
              </motion.g>
              <motion.text x="300" y="180" textAnchor="middle" fill="var(--text-primary)" fontSize="10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                B片段丢失
              </motion.text>
            </>
          )}

          {variationType === 'duplication' && (
            <>
              <text x="100" y="30" textAnchor="middle" fill="var(--text-secondary)" fontSize="12">正常</text>
              <text x="300" y="30" textAnchor="middle" fill="var(--text-secondary)" fontSize="12">重复后</text>
              {/* 正常染色体 */}
              <g>
                <rect x="80" y="50" width="40" height="120" rx="5" fill="var(--text-tertiary)" />
                <rect x="85" y="60" width="30" height="25" fill="#525252" />
                <rect x="85" y="90" width="30" height="25" fill="#737373" />
                <rect x="85" y="120" width="30" height="25" fill="#404040" />
              </g>
              {/* 重复后 */}
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                <rect x="280" y="40" width="40" height="150" rx="5" fill="var(--text-tertiary)" />
                <rect x="285" y="50" width="30" height="25" fill="#525252" />
                <rect x="285" y="80" width="30" height="25" fill="#737373" />
                <rect x="285" y="110" width="30" height="25" fill="#737373" />
                <rect x="285" y="140" width="30" height="25" fill="#404040" />
              </motion.g>
              <motion.text x="300" y="195" textAnchor="middle" fill="var(--text-primary)" fontSize="10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                B片段重复
              </motion.text>
            </>
          )}

          {variationType === 'inversion' && (
            <>
              <text x="100" y="30" textAnchor="middle" fill="var(--text-secondary)" fontSize="12">正常</text>
              <text x="300" y="30" textAnchor="middle" fill="var(--text-secondary)" fontSize="12">倒位后</text>
              {/* 正常染色体 ABCD */}
              <g>
                <rect x="80" y="50" width="40" height="120" rx="5" fill="var(--text-tertiary)" />
                <rect x="85" y="60" width="30" height="25" fill="#525252" />
                <text x="100" y="77" textAnchor="middle" fill="var(--bg-primary)" fontSize="10">A</text>
                <rect x="85" y="90" width="30" height="25" fill="#737373" />
                <text x="100" y="107" textAnchor="middle" fill="var(--bg-primary)" fontSize="10">B</text>
                <rect x="85" y="120" width="30" height="25" fill="#404040" />
                <text x="100" y="137" textAnchor="middle" fill="var(--bg-primary)" fontSize="10">C</text>
              </g>
              {/* 倒位后 ACBD */}
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                <rect x="280" y="50" width="40" height="120" rx="5" fill="var(--text-tertiary)" />
                <rect x="285" y="60" width="30" height="25" fill="#525252" />
                <text x="300" y="77" textAnchor="middle" fill="var(--bg-primary)" fontSize="10">A</text>
                <rect x="285" y="90" width="30" height="25" fill="#404040" />
                <text x="300" y="107" textAnchor="middle" fill="var(--bg-primary)" fontSize="10">C</text>
                <rect x="285" y="120" width="30" height="25" fill="#737373" />
                <text x="300" y="137" textAnchor="middle" fill="var(--bg-primary)" fontSize="10">B</text>
              </motion.g>
              <motion.text x="300" y="185" textAnchor="middle" fill="var(--text-primary)" fontSize="10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                BC片段倒位
              </motion.text>
            </>
          )}

          {variationType === 'translocation' && (
            <>
              <text x="80" y="25" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">染色体1</text>
              <text x="140" y="25" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">染色体2</text>
              <text x="260" y="25" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">易位后1</text>
              <text x="320" y="25" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">易位后2</text>
              {/* 原始染色体 */}
              <rect x="65" y="40" width="30" height="80" rx="3" fill="var(--text-tertiary)" />
              <rect x="68" y="45" width="24" height="30" fill="#525252" />
              <rect x="68" y="80" width="24" height="30" fill="#737373" />

              <rect x="125" y="40" width="30" height="80" rx="3" fill="var(--text-secondary)" />
              <rect x="128" y="45" width="24" height="30" fill="#404040" />
              <rect x="128" y="80" width="24" height="30" fill="#a3a3a3" />

              {/* 易位后 */}
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                <rect x="245" y="40" width="30" height="80" rx="3" fill="var(--text-tertiary)" />
                <rect x="248" y="45" width="24" height="30" fill="#525252" />
                <rect x="248" y="80" width="24" height="30" fill="#a3a3a3" />

                <rect x="305" y="40" width="30" height="80" rx="3" fill="var(--text-secondary)" />
                <rect x="308" y="45" width="24" height="30" fill="#404040" />
                <rect x="308" y="80" width="24" height="30" fill="#737373" />
              </motion.g>

              <path d="M170 80 L230 80" stroke="var(--text-tertiary)" strokeWidth="2" markerEnd="url(#arrow)" />
            </>
          )}

          {variationType === 'aneuploidy' && (
            <>
              <text x="100" y="30" textAnchor="middle" fill="var(--text-secondary)" fontSize="12">正常(2n)</text>
              <text x="300" y="30" textAnchor="middle" fill="var(--text-secondary)" fontSize="12">21三体(2n+1)</text>
              {/* 正常 */}
              <g>
                {[0, 1, 2].map((i) => (
                  <g key={i}>
                    <rect x={60 + i * 30} y={50} width="20" height="50" rx="3" fill="var(--text-tertiary)" />
                    <rect x={60 + i * 30} y={110} width="20" height="50" rx="3" fill="var(--text-tertiary)" />
                  </g>
                ))}
              </g>
              {/* 21三体 */}
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                {[0, 1, 2].map((i) => (
                  <g key={i}>
                    <rect x={240 + i * 30} y={50} width="20" height="50" rx="3" fill="var(--text-tertiary)" />
                    <rect x={240 + i * 30} y={110} width="20" height="50" rx="3" fill="var(--text-tertiary)" />
                  </g>
                ))}
                <rect x={330} y={50} width="20" height="50" rx="3" fill="var(--text-primary)" />
              </motion.g>
              <text x="300" y="185" textAnchor="middle" fill="var(--text-primary)" fontSize="10">多一条21号染色体</text>
            </>
          )}

          {variationType === 'polyploidy' && (
            <>
              <text x="80" y="25" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">二倍体(2n)</text>
              <text x="200" y="25" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">三倍体(3n)</text>
              <text x="320" y="25" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">四倍体(4n)</text>
              {/* 二倍体 */}
              <g>
                <rect x="60" y="40" width="15" height="40" rx="2" fill="var(--text-tertiary)" />
                <rect x="80" y="40" width="15" height="40" rx="2" fill="var(--text-tertiary)" />
                <rect x="60" y="90" width="15" height="40" rx="2" fill="var(--text-secondary)" />
                <rect x="80" y="90" width="15" height="40" rx="2" fill="var(--text-secondary)" />
              </g>
              {/* 三倍体 */}
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                <rect x="170" y="40" width="15" height="40" rx="2" fill="var(--text-tertiary)" />
                <rect x="190" y="40" width="15" height="40" rx="2" fill="var(--text-tertiary)" />
                <rect x="210" y="40" width="15" height="40" rx="2" fill="var(--text-tertiary)" />
                <rect x="170" y="90" width="15" height="40" rx="2" fill="var(--text-secondary)" />
                <rect x="190" y="90" width="15" height="40" rx="2" fill="var(--text-secondary)" />
                <rect x="210" y="90" width="15" height="40" rx="2" fill="var(--text-secondary)" />
              </motion.g>
              {/* 四倍体 */}
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                <rect x="280" y="40" width="15" height="40" rx="2" fill="var(--text-tertiary)" />
                <rect x="300" y="40" width="15" height="40" rx="2" fill="var(--text-tertiary)" />
                <rect x="320" y="40" width="15" height="40" rx="2" fill="var(--text-tertiary)" />
                <rect x="340" y="40" width="15" height="40" rx="2" fill="var(--text-tertiary)" />
                <rect x="280" y="90" width="15" height="40" rx="2" fill="var(--text-secondary)" />
                <rect x="300" y="90" width="15" height="40" rx="2" fill="var(--text-secondary)" />
                <rect x="320" y="90" width="15" height="40" rx="2" fill="var(--text-secondary)" />
                <rect x="340" y="90" width="15" height="40" rx="2" fill="var(--text-secondary)" />
              </motion.g>
            </>
          )}

          <defs>
            <marker id="arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="var(--text-tertiary)" />
            </marker>
          </defs>
        </svg>
      </div>

      {/* 当前变异信息 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
        <h3 className="font-medium text-[var(--text-primary)] mb-2">{currentVariation.name}</h3>
        <p className="text-sm text-[var(--text-secondary)] mb-2">{currentVariation.description}</p>
        <p className="text-sm text-[var(--text-tertiary)]">
          <strong>实例：</strong>{currentVariation.example}
        </p>
      </div>

      {/* 知识点 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)] text-sm">
        <p className="font-medium text-[var(--text-primary)] mb-2">染色体变异要点：</p>
        <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
          <li><strong>结构变异</strong>：缺失、重复、倒位、易位</li>
          <li><strong>数目变异</strong>：整倍体变异、非整倍体变异</li>
          <li><strong>多倍体形成</strong>：秋水仙素抑制纺锤体形成</li>
          <li><strong>单倍体</strong>：体细胞中含有本物种配子染色体数目</li>
        </ul>
      </div>
    </div>
  )
}
