import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Organism {
  id: number
  genotype: string
  fitness: number
  color: string
}

export default function EvolutionSimulation() {
  const [generation, setGeneration] = useState(1)
  const [population, setPopulation] = useState<Organism[]>([])
  const [environment, setEnvironment] = useState<'light' | 'dark'>('light')
  const [isRunning, setIsRunning] = useState(false)
  const [geneFrequency, setGeneFrequency] = useState({ A: 0.5, a: 0.5 })

  // 初始化种群
  useEffect(() => {
    initPopulation()
  }, [])

  const initPopulation = () => {
    const newPop: Organism[] = []
    for (let i = 0; i < 20; i++) {
      const rand = Math.random()
      let genotype: string
      let color: string
      if (rand < 0.25) {
        genotype = 'AA'
        color = '#f5f5f5'
      } else if (rand < 0.75) {
        genotype = 'Aa'
        color = '#a3a3a3'
      } else {
        genotype = 'aa'
        color = '#404040'
      }
      newPop.push({ id: i, genotype, fitness: 1, color })
    }
    setPopulation(newPop)
    setGeneration(1)
    calculateGeneFrequency(newPop)
  }

  const calculateGeneFrequency = (pop: Organism[]) => {
    let aCount = 0
    let totalAlleles = pop.length * 2
    pop.forEach(org => {
      if (org.genotype === 'AA') aCount += 2
      else if (org.genotype === 'Aa') aCount += 1
    })
    setGeneFrequency({
      A: aCount / totalAlleles,
      a: (totalAlleles - aCount) / totalAlleles
    })
  }

  const runGeneration = () => {
    setIsRunning(true)

    // 自然选择：根据环境计算适应度
    const selectedPop = population.map(org => {
      let fitness = 1
      if (environment === 'light') {
        // 浅色环境，浅色个体适应度高
        if (org.genotype === 'AA') fitness = 1.5
        else if (org.genotype === 'Aa') fitness = 1.2
        else fitness = 0.5
      } else {
        // 深色环境，深色个体适应度高
        if (org.genotype === 'aa') fitness = 1.5
        else if (org.genotype === 'Aa') fitness = 1.2
        else fitness = 0.5
      }
      return { ...org, fitness }
    })

    // 根据适应度选择存活个体
    const survivors = selectedPop.filter(org => Math.random() < org.fitness / 1.5)

    // 繁殖产生下一代
    const newPop: Organism[] = []
    while (newPop.length < 20 && survivors.length >= 2) {
      const parent1 = survivors[Math.floor(Math.random() * survivors.length)]
      const parent2 = survivors[Math.floor(Math.random() * survivors.length)]

      // 简化的遗传
      const allele1 = parent1.genotype[Math.floor(Math.random() * 2)]
      const allele2 = parent2.genotype[Math.floor(Math.random() * 2)]
      const childGenotype = [allele1, allele2].sort().join('')

      let color: string
      if (childGenotype === 'AA') color = '#f5f5f5'
      else if (childGenotype === 'Aa') color = '#a3a3a3'
      else color = '#404040'

      newPop.push({
        id: newPop.length,
        genotype: childGenotype,
        fitness: 1,
        color
      })
    }

    setPopulation(newPop)
    setGeneration(prev => prev + 1)
    calculateGeneFrequency(newPop)
    setIsRunning(false)
  }

  const runMultipleGenerations = () => {
    let count = 0
    const interval = setInterval(() => {
      runGeneration()
      count++
      if (count >= 10) {
        clearInterval(interval)
      }
    }, 500)
  }

  return (
    <div className="space-y-6">
      {/* 说明 */}
      <div className="text-sm text-[var(--text-secondary)]">
        模拟自然选择对种群基因频率的影响，观察生物进化的过程
      </div>

      {/* 环境选择 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
        <h3 className="font-medium text-[var(--text-primary)] mb-3">选择环境</h3>
        <div className="flex gap-4">
          <button
            onClick={() => setEnvironment('light')}
            className={`flex-1 p-4 rounded-lg border-2 transition-all ${
              environment === 'light'
                ? 'border-[var(--text-primary)] bg-gray-100'
                : 'border-[var(--border-color)] bg-[var(--bg-secondary)]'
            }`}
          >
            <div className="w-full h-12 rounded bg-gray-200 mb-2" />
            <p className="text-sm text-[var(--text-primary)]">浅色环境</p>
            <p className="text-xs text-[var(--text-tertiary)]">浅色个体更易存活</p>
          </button>
          <button
            onClick={() => setEnvironment('dark')}
            className={`flex-1 p-4 rounded-lg border-2 transition-all ${
              environment === 'dark'
                ? 'border-[var(--text-primary)] bg-gray-700'
                : 'border-[var(--border-color)] bg-[var(--bg-secondary)]'
            }`}
          >
            <div className="w-full h-12 rounded bg-gray-700 mb-2" />
            <p className="text-sm text-[var(--text-primary)]">深色环境</p>
            <p className="text-xs text-[var(--text-tertiary)]">深色个体更易存活</p>
          </button>
        </div>
      </div>

      {/* 种群显示 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-[var(--text-primary)]">
            种群（第 {generation} 代）
          </h3>
          <div className="flex gap-2">
            <button
              onClick={runGeneration}
              disabled={isRunning}
              className="px-3 py-1 rounded-lg bg-[var(--text-primary)] text-[var(--bg-primary)] text-sm disabled:opacity-50"
            >
              下一代
            </button>
            <button
              onClick={runMultipleGenerations}
              disabled={isRunning}
              className="px-3 py-1 rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] text-sm disabled:opacity-50"
            >
              演化10代
            </button>
            <button
              onClick={initPopulation}
              className="px-3 py-1 rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] text-sm"
            >
              重置
            </button>
          </div>
        </div>

        {/* 种群个体 */}
        <div
          className="p-4 rounded-lg grid grid-cols-10 gap-2"
          style={{ backgroundColor: environment === 'light' ? '#e5e5e5' : '#404040' }}
        >
          {population.map((org, i) => (
            <motion.div
              key={`${generation}-${i}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.02 }}
              className="aspect-square rounded-full border-2 border-white/30"
              style={{ backgroundColor: org.color }}
              title={org.genotype}
            />
          ))}
        </div>

        {/* 图例 */}
        <div className="flex justify-center gap-6 mt-3 text-xs text-[var(--text-secondary)]">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#f5f5f5', border: '1px solid #ccc' }} />
            <span>AA (浅色)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#a3a3a3' }} />
            <span>Aa (中间色)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#404040' }} />
            <span>aa (深色)</span>
          </div>
        </div>
      </div>

      {/* 基因频率 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
        <h3 className="font-medium text-[var(--text-primary)] mb-3">基因频率</h3>
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-[var(--text-secondary)]">A (显性基因)</span>
              <span className="text-sm text-[var(--text-primary)]">{(geneFrequency.A * 100).toFixed(1)}%</span>
            </div>
            <div className="h-3 rounded-full bg-[var(--bg-secondary)]">
              <motion.div
                className="h-full rounded-full bg-gray-300"
                animate={{ width: `${geneFrequency.A * 100}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-[var(--text-secondary)]">a (隐性基因)</span>
              <span className="text-sm text-[var(--text-primary)]">{(geneFrequency.a * 100).toFixed(1)}%</span>
            </div>
            <div className="h-3 rounded-full bg-[var(--bg-secondary)]">
              <motion.div
                className="h-full rounded-full bg-gray-600"
                animate={{ width: `${geneFrequency.a * 100}%` }}
              />
            </div>
          </div>
        </div>
        <p className="text-xs text-[var(--text-tertiary)] mt-2">
          自然选择使适应环境的基因频率升高，不适应的基因频率降低
        </p>
      </div>

      {/* 进化理论 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
        <h3 className="font-medium text-[var(--text-primary)] mb-3">现代生物进化理论</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-[var(--bg-secondary)]">
            <p className="text-sm font-medium text-[var(--text-primary)]">种群</p>
            <p className="text-xs text-[var(--text-secondary)]">生物进化的基本单位</p>
          </div>
          <div className="p-3 rounded-lg bg-[var(--bg-secondary)]">
            <p className="text-sm font-medium text-[var(--text-primary)]">突变和基因重组</p>
            <p className="text-xs text-[var(--text-secondary)]">提供进化的原材料</p>
          </div>
          <div className="p-3 rounded-lg bg-[var(--bg-secondary)]">
            <p className="text-sm font-medium text-[var(--text-primary)]">自然选择</p>
            <p className="text-xs text-[var(--text-secondary)]">决定进化的方向</p>
          </div>
          <div className="p-3 rounded-lg bg-[var(--bg-secondary)]">
            <p className="text-sm font-medium text-[var(--text-primary)]">隔离</p>
            <p className="text-xs text-[var(--text-secondary)]">物种形成的必要条件</p>
          </div>
        </div>
      </div>

      {/* 知识点 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)] text-sm">
        <p className="font-medium text-[var(--text-primary)] mb-2">生物进化要点：</p>
        <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
          <li><strong>进化实质</strong>：种群基因频率的改变</li>
          <li><strong>自然选择</strong>：环境对生物的选择，适者生存</li>
          <li><strong>物种形成</strong>：长期地理隔离 → 生殖隔离 → 新物种</li>
          <li><strong>共同进化</strong>：不同物种之间、生物与环境之间相互影响</li>
        </ul>
      </div>
    </div>
  )
}
