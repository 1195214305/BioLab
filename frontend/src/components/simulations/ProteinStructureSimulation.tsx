import { useState } from 'react'
import { motion } from 'framer-motion'

interface AminoAcid {
  name: string
  abbr: string
  rGroup: string
  property: string
}

const aminoAcids: AminoAcid[] = [
  { name: '甘氨酸', abbr: 'Gly', rGroup: '-H', property: '最简单' },
  { name: '丙氨酸', abbr: 'Ala', rGroup: '-CH₃', property: '非极性' },
  { name: '半胱氨酸', abbr: 'Cys', rGroup: '-CH₂SH', property: '含硫' },
  { name: '赖氨酸', abbr: 'Lys', rGroup: '-(CH₂)₄NH₂', property: '碱性' },
  { name: '谷氨酸', abbr: 'Glu', rGroup: '-(CH₂)₂COOH', property: '酸性' },
]

export default function ProteinStructureSimulation() {
  const [selectedLevel, setSelectedLevel] = useState<1 | 2 | 3 | 4>(1)
  const [showDehydration, setShowDehydration] = useState(false)
  const [peptideCount, setPeptideCount] = useState(3)

  // 计算脱水缩合相关数值
  const waterMolecules = peptideCount - 1
  const peptideBonds = peptideCount - 1

  return (
    <div className="space-y-6">
      {/* 说明 */}
      <div className="text-sm text-[var(--text-secondary)]">
        探索蛋白质从氨基酸到四级结构的形成过程
      </div>

      {/* 氨基酸结构 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
        <h3 className="font-medium text-[var(--text-primary)] mb-3">氨基酸通式</h3>
        <div className="flex justify-center">
          <svg viewBox="0 0 200 120" className="w-64 h-32">
            {/* 中心碳 */}
            <circle cx="100" cy="60" r="15" fill="var(--text-primary)" />
            <text x="100" y="65" textAnchor="middle" fill="var(--bg-primary)" fontSize="12" fontWeight="bold">C</text>

            {/* 氨基 -NH2 */}
            <line x1="85" y1="60" x2="40" y2="60" stroke="var(--text-secondary)" strokeWidth="2" />
            <circle cx="30" cy="60" r="12" fill="var(--text-tertiary)" />
            <text x="30" y="64" textAnchor="middle" fill="var(--bg-primary)" fontSize="10">NH₂</text>
            <text x="30" y="85" textAnchor="middle" fill="var(--text-tertiary)" fontSize="9">氨基</text>

            {/* 羧基 -COOH */}
            <line x1="115" y1="60" x2="160" y2="60" stroke="var(--text-secondary)" strokeWidth="2" />
            <circle cx="170" cy="60" r="12" fill="var(--text-tertiary)" />
            <text x="170" y="64" textAnchor="middle" fill="var(--bg-primary)" fontSize="8">COOH</text>
            <text x="170" y="85" textAnchor="middle" fill="var(--text-tertiary)" fontSize="9">羧基</text>

            {/* H */}
            <line x1="100" y1="45" x2="100" y2="20" stroke="var(--text-secondary)" strokeWidth="2" />
            <text x="100" y="15" textAnchor="middle" fill="var(--text-secondary)" fontSize="12">H</text>

            {/* R基 */}
            <line x1="100" y1="75" x2="100" y2="100" stroke="var(--text-secondary)" strokeWidth="2" />
            <circle cx="100" cy="110" r="10" fill="var(--text-primary)" opacity="0.6" />
            <text x="100" y="114" textAnchor="middle" fill="var(--bg-primary)" fontSize="10">R</text>
          </svg>
        </div>
        <p className="text-center text-sm text-[var(--text-tertiary)] mt-2">
          R基团的不同决定了氨基酸的种类
        </p>
      </div>

      {/* 常见氨基酸 */}
      <div className="grid grid-cols-5 gap-2">
        {aminoAcids.map((aa) => (
          <div key={aa.abbr} className="p-2 rounded-lg bg-[var(--bg-tertiary)] text-center">
            <div className="font-bold text-[var(--text-primary)]">{aa.abbr}</div>
            <div className="text-xs text-[var(--text-secondary)]">{aa.name}</div>
            <div className="text-xs text-[var(--text-tertiary)]">{aa.property}</div>
          </div>
        ))}
      </div>

      {/* 脱水缩合演示 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
        <h3 className="font-medium text-[var(--text-primary)] mb-3">脱水缩合形成肽键</h3>

        <div className="flex items-center gap-4 mb-4">
          <span className="text-sm text-[var(--text-secondary)]">氨基酸数量：</span>
          <input
            type="range"
            min="2"
            max="10"
            value={peptideCount}
            onChange={(e) => setPeptideCount(Number(e.target.value))}
            className="flex-1 accent-[var(--text-primary)]"
          />
          <span className="text-sm font-medium text-[var(--text-primary)] w-8">{peptideCount}</span>
        </div>

        <button
          onClick={() => setShowDehydration(!showDehydration)}
          className="px-4 py-2 rounded-lg bg-[var(--text-primary)] text-[var(--bg-primary)] text-sm font-medium mb-4"
        >
          {showDehydration ? '重置' : '开始脱水缩合'}
        </button>

        {/* 动画演示 */}
        <div className="relative h-24 flex items-center justify-center overflow-hidden">
          <div className="flex items-center gap-1">
            {Array.from({ length: peptideCount }).map((_, i) => (
              <motion.div
                key={i}
                className="flex items-center"
                animate={showDehydration ? { x: i > 0 ? -10 * i : 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.2 }}
              >
                <div className="w-12 h-12 rounded-lg bg-[var(--text-secondary)] flex items-center justify-center text-[var(--bg-primary)] text-xs font-bold">
                  AA{i + 1}
                </div>
                {i < peptideCount - 1 && (
                  <motion.div
                    animate={showDehydration ? { opacity: 1, scale: 1 } : { opacity: 0.3, scale: 0.8 }}
                    transition={{ duration: 0.3, delay: i * 0.2 + 0.3 }}
                    className="mx-1 text-xs text-[var(--text-primary)] font-bold"
                  >
                    —
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* 水分子 */}
          {showDehydration && (
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 30 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute bottom-0 flex gap-2"
            >
              {Array.from({ length: waterMolecules }).map((_, i) => (
                <span key={i} className="text-sm text-[var(--text-tertiary)]">H₂O</span>
              ))}
            </motion.div>
          )}
        </div>

        {/* 计算结果 */}
        <div className="grid grid-cols-3 gap-4 mt-4 text-center">
          <div className="p-3 rounded-lg bg-[var(--bg-secondary)]">
            <div className="text-2xl font-bold text-[var(--text-primary)]">{peptideBonds}</div>
            <div className="text-xs text-[var(--text-tertiary)]">肽键数</div>
          </div>
          <div className="p-3 rounded-lg bg-[var(--bg-secondary)]">
            <div className="text-2xl font-bold text-[var(--text-primary)]">{waterMolecules}</div>
            <div className="text-xs text-[var(--text-tertiary)]">脱去水分子数</div>
          </div>
          <div className="p-3 rounded-lg bg-[var(--bg-secondary)]">
            <div className="text-2xl font-bold text-[var(--text-primary)]">{peptideCount >= 2 ? peptideCount - 1 + 1 : 0}</div>
            <div className="text-xs text-[var(--text-tertiary)]">游离氨基/羧基</div>
          </div>
        </div>
      </div>

      {/* 蛋白质结构层次 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
        <h3 className="font-medium text-[var(--text-primary)] mb-3">蛋白质结构层次</h3>

        <div className="flex gap-2 mb-4">
          {[1, 2, 3, 4].map((level) => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level as 1 | 2 | 3 | 4)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedLevel === level
                  ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
                  : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {level}级结构
            </button>
          ))}
        </div>

        <div className="text-center py-6">
          {selectedLevel === 1 && (
            <div>
              <div className="flex justify-center gap-1 mb-4">
                {['Gly', 'Ala', 'Cys', 'Lys', 'Glu'].map((aa, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="w-10 h-10 rounded bg-[var(--text-secondary)] flex items-center justify-center text-[var(--bg-primary)] text-xs font-bold"
                  >
                    {aa}
                  </motion.div>
                ))}
              </div>
              <p className="text-sm text-[var(--text-secondary)]">氨基酸的排列顺序（线性多肽链）</p>
            </div>
          )}
          {selectedLevel === 2 && (
            <div>
              <svg viewBox="0 0 200 80" className="w-48 h-20 mx-auto mb-4">
                <path d="M20 40 Q50 10 80 40 Q110 70 140 40 Q170 10 180 40" fill="none" stroke="var(--text-primary)" strokeWidth="3" />
              </svg>
              <p className="text-sm text-[var(--text-secondary)]">α-螺旋、β-折叠（氢键维持）</p>
            </div>
          )}
          {selectedLevel === 3 && (
            <div>
              <svg viewBox="0 0 100 100" className="w-24 h-24 mx-auto mb-4">
                <path d="M50 10 Q80 30 70 60 Q60 90 30 80 Q10 70 20 40 Q30 20 50 10" fill="var(--text-tertiary)" stroke="var(--text-primary)" strokeWidth="2" />
              </svg>
              <p className="text-sm text-[var(--text-secondary)]">多肽链的空间折叠（二硫键等维持）</p>
            </div>
          )}
          {selectedLevel === 4 && (
            <div>
              <div className="flex justify-center gap-4 mb-4">
                <svg viewBox="0 0 60 60" className="w-12 h-12">
                  <circle cx="30" cy="30" r="25" fill="var(--text-tertiary)" stroke="var(--text-primary)" strokeWidth="2" />
                </svg>
                <svg viewBox="0 0 60 60" className="w-12 h-12">
                  <circle cx="30" cy="30" r="25" fill="var(--text-tertiary)" stroke="var(--text-primary)" strokeWidth="2" />
                </svg>
              </div>
              <p className="text-sm text-[var(--text-secondary)]">多条多肽链的组合（如血红蛋白4条链）</p>
            </div>
          )}
        </div>
      </div>

      {/* 知识点 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)] text-sm">
        <p className="font-medium text-[var(--text-primary)] mb-2">蛋白质多样性原因：</p>
        <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
          <li>氨基酸的<strong>种类</strong>不同（约20种）</li>
          <li>氨基酸的<strong>数目</strong>不同</li>
          <li>氨基酸的<strong>排列顺序</strong>不同</li>
          <li>肽链的<strong>空间结构</strong>不同</li>
        </ul>
      </div>
    </div>
  )
}
