import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'

type Allele = 'A' | 'a' | 'B' | 'b'
type Genotype = [Allele, Allele]

interface Parent {
  gene1: Genotype
  gene2?: Genotype // 用于自由组合
}

export default function GeneticsSimulation() {
  const [mode, setMode] = useState<'segregation' | 'combination'>('segregation')
  const [parent1Gene1, setParent1Gene1] = useState<Genotype>(['A', 'a'])
  const [parent2Gene1, setParent2Gene1] = useState<Genotype>(['A', 'a'])
  const [parent1Gene2, setParent1Gene2] = useState<Genotype>(['B', 'b'])
  const [parent2Gene2, setParent2Gene2] = useState<Genotype>(['B', 'b'])
  const [showPunnett, setShowPunnett] = useState(true)

  // 计算配子
  const getGametes = (parent: Parent): string[] => {
    if (mode === 'segregation') {
      return [parent.gene1[0], parent.gene1[1]]
    } else {
      const gametes: string[] = []
      for (const a of parent.gene1) {
        for (const b of parent.gene2!) {
          gametes.push(a + b)
        }
      }
      return gametes
    }
  }

  // 计算子代
  const offspring = useMemo(() => {
    const parent1: Parent = { gene1: parent1Gene1, gene2: parent1Gene2 }
    const parent2: Parent = { gene1: parent2Gene1, gene2: parent2Gene2 }

    const gametes1 = getGametes(parent1)
    const gametes2 = getGametes(parent2)

    const results: Record<string, number> = {}
    const total = gametes1.length * gametes2.length

    for (const g1 of gametes1) {
      for (const g2 of gametes2) {
        let genotype: string
        if (mode === 'segregation') {
          // 排序使大写在前
          genotype = [g1, g2].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()) || a.localeCompare(b)).join('')
        } else {
          // 分别排序两对基因
          const gene1 = [g1[0], g2[0]].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()) || a.localeCompare(b)).join('')
          const gene2 = [g1[1], g2[1]].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()) || a.localeCompare(b)).join('')
          genotype = gene1 + gene2
        }
        results[genotype] = (results[genotype] || 0) + 1
      }
    }

    return { results, total, gametes1, gametes2 }
  }, [mode, parent1Gene1, parent2Gene1, parent1Gene2, parent2Gene2])

  // 获取表现型
  const getPhenotype = (genotype: string): string => {
    if (mode === 'segregation') {
      return genotype.includes('A') ? '显性' : '隐性'
    } else {
      const hasA = genotype[0] === 'A' || genotype[1] === 'A'
      const hasB = genotype[2] === 'B' || genotype[3] === 'B'
      if (hasA && hasB) return 'A_B_'
      if (hasA && !hasB) return 'A_bb'
      if (!hasA && hasB) return 'aaB_'
      return 'aabb'
    }
  }

  // 统计表现型比例
  const phenotypeRatios = useMemo(() => {
    const ratios: Record<string, number> = {}
    for (const [genotype, count] of Object.entries(offspring.results)) {
      const phenotype = getPhenotype(genotype)
      ratios[phenotype] = (ratios[phenotype] || 0) + count
    }
    return ratios
  }, [offspring])

  const GenotypeSelector = ({ value, onChange, label }: { value: Genotype; onChange: (v: Genotype) => void; label: string }) => (
    <div className="p-3 rounded-lg bg-[var(--bg-tertiary)]">
      <p className="text-xs text-[var(--text-tertiary)] mb-2">{label}</p>
      <select
        value={value.join('')}
        onChange={(e) => onChange(e.target.value.split('') as Genotype)}
        className="w-full px-3 py-2 rounded bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)]"
      >
        <option value="AA">AA (纯合显性)</option>
        <option value="Aa">Aa (杂合)</option>
        <option value="aa">aa (纯合隐性)</option>
      </select>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* 模式选择 */}
      <div className="flex gap-2">
        <button
          onClick={() => setMode('segregation')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === 'segregation'
              ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
              : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          分离定律（一对基因）
        </button>
        <button
          onClick={() => setMode('combination')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === 'combination'
              ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
              : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          自由组合定律（两对基因）
        </button>
      </div>

      {/* 亲本设置 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-3">
          <h3 className="font-medium text-[var(--text-primary)]">亲本 1 (P₁)</h3>
          <GenotypeSelector
            value={parent1Gene1}
            onChange={setParent1Gene1}
            label={mode === 'segregation' ? '基因型' : '第一对基因'}
          />
          {mode === 'combination' && (
            <GenotypeSelector
              value={parent1Gene2}
              onChange={setParent1Gene2}
              label="第二对基因"
            />
          )}
        </div>
        <div className="space-y-3">
          <h3 className="font-medium text-[var(--text-primary)]">亲本 2 (P₂)</h3>
          <GenotypeSelector
            value={parent2Gene1}
            onChange={setParent2Gene1}
            label={mode === 'segregation' ? '基因型' : '第一对基因'}
          />
          {mode === 'combination' && (
            <GenotypeSelector
              value={parent2Gene2}
              onChange={setParent2Gene2}
              label="第二对基因"
            />
          )}
        </div>
      </div>

      {/* 配子 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
          <p className="text-sm text-[var(--text-secondary)] mb-2">P₁ 配子</p>
          <div className="flex flex-wrap gap-2">
            {offspring.gametes1.map((g, i) => (
              <span key={i} className="px-3 py-1 rounded-full bg-[var(--bg-secondary)] text-sm font-mono text-[var(--text-primary)]">
                {g}
              </span>
            ))}
          </div>
        </div>
        <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
          <p className="text-sm text-[var(--text-secondary)] mb-2">P₂ 配子</p>
          <div className="flex flex-wrap gap-2">
            {offspring.gametes2.map((g, i) => (
              <span key={i} className="px-3 py-1 rounded-full bg-[var(--bg-secondary)] text-sm font-mono text-[var(--text-primary)]">
                {g}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 棋盘格 */}
      <div className="flex items-center gap-2 mb-2">
        <label className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
          <input
            type="checkbox"
            checked={showPunnett}
            onChange={(e) => setShowPunnett(e.target.checked)}
            className="accent-[var(--text-primary)]"
          />
          显示棋盘格
        </label>
      </div>

      {showPunnett && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="overflow-x-auto"
        >
          <table className="w-full border-collapse text-center text-sm">
            <thead>
              <tr>
                <th className="p-2 border border-[var(--border-color)] bg-[var(--bg-tertiary)]"></th>
                {offspring.gametes2.map((g, i) => (
                  <th key={i} className="p-2 border border-[var(--border-color)] bg-[var(--bg-tertiary)] font-mono">
                    {g}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {offspring.gametes1.map((g1, i) => (
                <tr key={i}>
                  <td className="p-2 border border-[var(--border-color)] bg-[var(--bg-tertiary)] font-mono font-medium">
                    {g1}
                  </td>
                  {offspring.gametes2.map((g2, j) => {
                    let genotype: string
                    if (mode === 'segregation') {
                      genotype = [g1, g2].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()) || a.localeCompare(b)).join('')
                    } else {
                      const gene1 = [g1[0], g2[0]].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()) || a.localeCompare(b)).join('')
                      const gene2 = [g1[1], g2[1]].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()) || a.localeCompare(b)).join('')
                      genotype = gene1 + gene2
                    }
                    return (
                      <td key={j} className="p-2 border border-[var(--border-color)] font-mono">
                        {genotype}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}

      {/* 结果统计 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* 基因型比例 */}
        <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
          <h4 className="font-medium text-[var(--text-primary)] mb-3">基因型比例</h4>
          <div className="space-y-2">
            {Object.entries(offspring.results).map(([genotype, count]) => (
              <div key={genotype} className="flex items-center justify-between">
                <span className="font-mono text-[var(--text-primary)]">{genotype}</span>
                <span className="text-[var(--text-secondary)]">
                  {count}/{offspring.total} ({((count / offspring.total) * 100).toFixed(1)}%)
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 表现型比例 */}
        <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
          <h4 className="font-medium text-[var(--text-primary)] mb-3">表现型比例</h4>
          <div className="space-y-2">
            {Object.entries(phenotypeRatios).map(([phenotype, count]) => (
              <div key={phenotype} className="flex items-center justify-between">
                <span className="text-[var(--text-primary)]">{phenotype}</span>
                <span className="text-[var(--text-secondary)]">
                  {count}/{offspring.total} ({((count / offspring.total) * 100).toFixed(1)}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 知识点 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)] text-sm">
        <p className="font-medium text-[var(--text-primary)] mb-2">
          {mode === 'segregation' ? '分离定律' : '自由组合定律'}要点：
        </p>
        <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
          {mode === 'segregation' ? (
            <>
              <li>杂合子 Aa × Aa 的子代基因型比例为 1:2:1 (AA:Aa:aa)</li>
              <li>表现型比例为 3:1 (显性:隐性)</li>
              <li>等位基因在形成配子时分离，分别进入不同配子</li>
            </>
          ) : (
            <>
              <li>双杂合子 AaBb × AaBb 的子代表现型比例为 9:3:3:1</li>
              <li>非同源染色体上的非等位基因自由组合</li>
              <li>前提：两对基因位于非同源染色体上</li>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}
