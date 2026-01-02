import { useState } from 'react'
import { motion } from 'framer-motion'

type InheritanceType = 'x-recessive' | 'x-dominant' | 'y-linked'

interface CrossResult {
  genotype: string
  phenotype: string
  ratio: string
  sex: 'male' | 'female'
}

export default function SexLinkedSimulation() {
  const [inheritanceType, setInheritanceType] = useState<InheritanceType>('x-recessive')
  const [fatherGenotype, setFatherGenotype] = useState('XᴮY')
  const [motherGenotype, setMotherGenotype] = useState('XᴮXᵇ')
  const [showResults, setShowResults] = useState(false)

  // 计算子代结果
  const calculateOffspring = (): CrossResult[] => {
    if (inheritanceType === 'x-recessive') {
      // 红绿色盲为例：XᴮXᵇ × XᴮY
      if (fatherGenotype === 'XᴮY' && motherGenotype === 'XᴮXᵇ') {
        return [
          { genotype: 'XᴮXᴮ', phenotype: '正常', ratio: '1/4', sex: 'female' },
          { genotype: 'XᴮXᵇ', phenotype: '携带者', ratio: '1/4', sex: 'female' },
          { genotype: 'XᴮY', phenotype: '正常', ratio: '1/4', sex: 'male' },
          { genotype: 'XᵇY', phenotype: '色盲', ratio: '1/4', sex: 'male' }
        ]
      } else if (fatherGenotype === 'XᵇY' && motherGenotype === 'XᴮXᵇ') {
        return [
          { genotype: 'XᴮXᵇ', phenotype: '携带者', ratio: '1/4', sex: 'female' },
          { genotype: 'XᵇXᵇ', phenotype: '色盲', ratio: '1/4', sex: 'female' },
          { genotype: 'XᴮY', phenotype: '正常', ratio: '1/4', sex: 'male' },
          { genotype: 'XᵇY', phenotype: '色盲', ratio: '1/4', sex: 'male' }
        ]
      }
    }
    return []
  }

  const offspring = calculateOffspring()

  return (
    <div className="space-y-6">
      {/* 说明 */}
      <div className="text-sm text-[var(--text-secondary)]">
        伴性遗传是指位于性染色体上的基因控制的性状遗传
      </div>

      {/* 遗传类型选择 */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setInheritanceType('x-recessive')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            inheritanceType === 'x-recessive'
              ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
              : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          X染色体隐性遗传
        </button>
        <button
          onClick={() => setInheritanceType('x-dominant')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            inheritanceType === 'x-dominant'
              ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
              : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          X染色体显性遗传
        </button>
        <button
          onClick={() => setInheritanceType('y-linked')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            inheritanceType === 'y-linked'
              ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
              : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          Y染色体遗传
        </button>
      </div>

      {/* 遗传类型说明 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
        {inheritanceType === 'x-recessive' && (
          <div>
            <h3 className="font-medium text-[var(--text-primary)] mb-2">X染色体隐性遗传</h3>
            <p className="text-sm text-[var(--text-secondary)] mb-2">
              典型例子：红绿色盲、血友病
            </p>
            <ul className="text-sm text-[var(--text-secondary)] space-y-1">
              <li>• 男性患者多于女性（男性只需一个致病基因）</li>
              <li>• 女性多为携带者</li>
              <li>• 交叉遗传：男性患者的致病基因来自母亲，传给女儿</li>
              <li>• 隔代遗传现象明显</li>
            </ul>
          </div>
        )}
        {inheritanceType === 'x-dominant' && (
          <div>
            <h3 className="font-medium text-[var(--text-primary)] mb-2">X染色体显性遗传</h3>
            <p className="text-sm text-[var(--text-secondary)] mb-2">
              典型例子：抗维生素D佝偻病
            </p>
            <ul className="text-sm text-[var(--text-secondary)] space-y-1">
              <li>• 女性患者多于男性</li>
              <li>• 男性患者的女儿全部患病</li>
              <li>• 女性患者的子女各有1/2患病</li>
              <li>• 连续遗传</li>
            </ul>
          </div>
        )}
        {inheritanceType === 'y-linked' && (
          <div>
            <h3 className="font-medium text-[var(--text-primary)] mb-2">Y染色体遗传</h3>
            <p className="text-sm text-[var(--text-secondary)] mb-2">
              典型例子：外耳道多毛症
            </p>
            <ul className="text-sm text-[var(--text-secondary)] space-y-1">
              <li>• 只有男性患病</li>
              <li>• 父传子，子传孙</li>
              <li>• 所有男性后代都患病</li>
              <li>• 女性不会患病也不会携带</li>
            </ul>
          </div>
        )}
      </div>

      {/* 遗传图解 - X隐性遗传 */}
      {inheritanceType === 'x-recessive' && (
        <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
          <h3 className="font-medium text-[var(--text-primary)] mb-4">红绿色盲遗传图解</h3>

          {/* 亲本选择 */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm text-[var(--text-tertiary)] block mb-1">父亲基因型</label>
              <select
                value={fatherGenotype}
                onChange={(e) => { setFatherGenotype(e.target.value); setShowResults(false) }}
                className="w-full px-3 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)]"
              >
                <option value="XᴮY">XᴮY（正常）</option>
                <option value="XᵇY">XᵇY（色盲）</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-[var(--text-tertiary)] block mb-1">母亲基因型</label>
              <select
                value={motherGenotype}
                onChange={(e) => { setMotherGenotype(e.target.value); setShowResults(false) }}
                className="w-full px-3 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)]"
              >
                <option value="XᴮXᴮ">XᴮXᴮ（正常）</option>
                <option value="XᴮXᵇ">XᴮXᵇ（携带者）</option>
                <option value="XᵇXᵇ">XᵇXᵇ（色盲）</option>
              </select>
            </div>
          </div>

          <button
            onClick={() => setShowResults(true)}
            className="w-full py-2 rounded-lg bg-[var(--text-primary)] text-[var(--bg-primary)] font-medium mb-4"
          >
            计算子代
          </button>

          {/* 遗传图解 */}
          <div className="relative h-64">
            <svg viewBox="0 0 400 240" className="w-full h-full">
              {/* 亲本 */}
              <g>
                <circle cx="100" cy="40" r="30" fill="var(--text-secondary)" />
                <text x="100" y="35" textAnchor="middle" fill="var(--bg-primary)" fontSize="10">父</text>
                <text x="100" y="50" textAnchor="middle" fill="var(--bg-primary)" fontSize="11" fontWeight="bold">{fatherGenotype}</text>
              </g>

              <text x="200" y="45" textAnchor="middle" fill="var(--text-tertiary)" fontSize="14">×</text>

              <g>
                <circle cx="300" cy="40" r="30" fill="var(--text-tertiary)" />
                <text x="300" y="35" textAnchor="middle" fill="var(--bg-primary)" fontSize="10">母</text>
                <text x="300" y="50" textAnchor="middle" fill="var(--bg-primary)" fontSize="11" fontWeight="bold">{motherGenotype}</text>
              </g>

              {/* 配子 */}
              <motion.g animate={{ opacity: showResults ? 1 : 0.3 }}>
                <text x="200" y="90" textAnchor="middle" fill="var(--text-tertiary)" fontSize="10">配子</text>

                {/* 父方配子 */}
                <rect x="60" y="100" width="35" height="25" rx="3" fill="var(--text-secondary)" opacity="0.7" />
                <text x="77" y="117" textAnchor="middle" fill="var(--bg-primary)" fontSize="9">{fatherGenotype.includes('ᴮ') ? 'Xᴮ' : 'Xᵇ'}</text>

                <rect x="105" y="100" width="25" height="25" rx="3" fill="var(--text-secondary)" opacity="0.7" />
                <text x="117" y="117" textAnchor="middle" fill="var(--bg-primary)" fontSize="9">Y</text>

                {/* 母方配子 */}
                <rect x="260" y="100" width="35" height="25" rx="3" fill="var(--text-tertiary)" opacity="0.7" />
                <text x="277" y="117" textAnchor="middle" fill="var(--bg-primary)" fontSize="9">{motherGenotype.charAt(0) + motherGenotype.charAt(1)}</text>

                <rect x="305" y="100" width="35" height="25" rx="3" fill="var(--text-tertiary)" opacity="0.7" />
                <text x="322" y="117" textAnchor="middle" fill="var(--bg-primary)" fontSize="9">{motherGenotype.charAt(2) + motherGenotype.charAt(3)}</text>
              </motion.g>

              {/* 子代 */}
              <motion.g animate={{ opacity: showResults ? 1 : 0 }}>
                <text x="200" y="155" textAnchor="middle" fill="var(--text-tertiary)" fontSize="10">子代</text>

                {offspring.map((child, i) => (
                  <g key={i} transform={`translate(${50 + i * 85}, 165)`}>
                    <rect
                      x="0"
                      y="0"
                      width="70"
                      height="50"
                      rx="5"
                      fill={child.phenotype.includes('色盲') ? 'var(--text-primary)' : 'var(--text-secondary)'}
                      opacity={child.phenotype.includes('携带') ? 0.6 : 0.8}
                    />
                    <text x="35" y="18" textAnchor="middle" fill="var(--bg-primary)" fontSize="10" fontWeight="bold">
                      {child.genotype}
                    </text>
                    <text x="35" y="32" textAnchor="middle" fill="var(--bg-primary)" fontSize="8">
                      {child.phenotype}
                    </text>
                    <text x="35" y="45" textAnchor="middle" fill="var(--bg-primary)" fontSize="8">
                      {child.sex === 'male' ? '♂' : '♀'} {child.ratio}
                    </text>
                  </g>
                ))}
              </motion.g>
            </svg>
          </div>
        </div>
      )}

      {/* 性染色体图示 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
        <h3 className="font-medium text-[var(--text-primary)] mb-4">X和Y染色体</h3>
        <div className="flex justify-center gap-12">
          <div className="text-center">
            <svg viewBox="0 0 60 100" className="w-16 h-24">
              <path d="M20 10 L20 90 M40 10 L40 90 M20 50 L40 50" stroke="var(--text-primary)" strokeWidth="6" strokeLinecap="round" />
            </svg>
            <p className="text-sm text-[var(--text-primary)] font-medium">X染色体</p>
            <p className="text-xs text-[var(--text-tertiary)]">较大，携带较多基因</p>
          </div>
          <div className="text-center">
            <svg viewBox="0 0 60 100" className="w-16 h-24">
              <path d="M30 10 L30 90" stroke="var(--text-secondary)" strokeWidth="6" strokeLinecap="round" />
              <path d="M20 20 L40 20" stroke="var(--text-secondary)" strokeWidth="4" strokeLinecap="round" />
            </svg>
            <p className="text-sm text-[var(--text-secondary)] font-medium">Y染色体</p>
            <p className="text-xs text-[var(--text-tertiary)]">较小，基因较少</p>
          </div>
        </div>
      </div>

      {/* 知识点 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)] text-sm">
        <p className="font-medium text-[var(--text-primary)] mb-2">伴性遗传要点：</p>
        <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
          <li><strong>X隐性遗传</strong>：男多于女，交叉遗传，隔代遗传</li>
          <li><strong>X显性遗传</strong>：女多于男，连续遗传</li>
          <li><strong>Y染色体遗传</strong>：只传男不传女</li>
          <li><strong>判断方法</strong>：看患者性别比例和遗传规律</li>
          <li><strong>常见疾病</strong>：色盲、血友病（X隐性）；抗维生素D佝偻病（X显性）</li>
        </ul>
      </div>
    </div>
  )
}
