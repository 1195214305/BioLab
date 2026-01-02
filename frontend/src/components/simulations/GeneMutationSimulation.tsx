import { useState } from 'react'
import { motion } from 'framer-motion'

type MutationType = 'substitution' | 'insertion' | 'deletion'

export default function GeneMutationSimulation() {
  const [mutationType, setMutationType] = useState<MutationType>('substitution')
  const [originalSequence] = useState(['A', 'T', 'G', 'C', 'A', 'T', 'G', 'C'])
  const [showMutation, setShowMutation] = useState(false)

  const getMutatedSequence = () => {
    const seq = [...originalSequence]
    switch (mutationType) {
      case 'substitution':
        seq[3] = 'A' // C → A
        return seq
      case 'insertion':
        seq.splice(3, 0, 'T')
        return seq.slice(0, 8)
      case 'deletion':
        seq.splice(3, 1)
        seq.push('-')
        return seq
      default:
        return seq
    }
  }

  const mutatedSequence = getMutatedSequence()

  const getMutationDescription = () => {
    switch (mutationType) {
      case 'substitution':
        return '碱基替换：一个碱基被另一个碱基替代（C→A）'
      case 'insertion':
        return '碱基插入：在序列中插入一个或多个碱基'
      case 'deletion':
        return '碱基缺失：序列中丢失一个或多个碱基'
    }
  }

  return (
    <div className="space-y-6">
      {/* 说明 */}
      <div className="text-sm text-[var(--text-secondary)]">
        选择突变类型，观察DNA序列的变化
      </div>

      {/* 突变类型选择 */}
      <div className="flex flex-wrap gap-2">
        {[
          { type: 'substitution' as MutationType, name: '碱基替换' },
          { type: 'insertion' as MutationType, name: '碱基插入' },
          { type: 'deletion' as MutationType, name: '碱基缺失' },
        ].map(({ type, name }) => (
          <button
            key={type}
            onClick={() => { setMutationType(type); setShowMutation(false) }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              mutationType === type
                ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
                : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      {/* DNA序列对比 */}
      <div className="space-y-4">
        {/* 原始序列 */}
        <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
          <p className="text-sm text-[var(--text-secondary)] mb-2">原始DNA序列：</p>
          <div className="flex gap-1">
            {originalSequence.map((base, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded flex items-center justify-center text-[var(--bg-primary)] font-bold"
                style={{
                  backgroundColor: base === 'A' ? '#525252' : base === 'T' ? '#737373' : base === 'G' ? '#404040' : '#a3a3a3'
                }}
              >
                {base}
              </div>
            ))}
          </div>
        </div>

        {/* 突变按钮 */}
        <div className="flex justify-center">
          <button
            onClick={() => setShowMutation(!showMutation)}
            className="px-6 py-3 rounded-lg bg-[var(--text-primary)] text-[var(--bg-primary)] font-medium hover:opacity-90"
          >
            {showMutation ? '重置' : '发生突变'}
          </button>
        </div>

        {/* 突变后序列 */}
        {showMutation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-lg bg-[var(--bg-tertiary)]"
          >
            <p className="text-sm text-[var(--text-secondary)] mb-2">突变后DNA序列：</p>
            <div className="flex gap-1">
              {mutatedSequence.map((base, i) => {
                const isChanged = base !== originalSequence[i]
                return (
                  <motion.div
                    key={i}
                    initial={{ scale: isChanged ? 0.8 : 1 }}
                    animate={{ scale: 1 }}
                    className={`w-10 h-10 rounded flex items-center justify-center font-bold ${
                      isChanged ? 'ring-2 ring-[var(--text-primary)]' : ''
                    }`}
                    style={{
                      backgroundColor: base === '-' ? 'var(--bg-secondary)' :
                        base === 'A' ? '#525252' : base === 'T' ? '#737373' : base === 'G' ? '#404040' : '#a3a3a3',
                      color: base === '-' ? 'var(--text-tertiary)' : 'var(--bg-primary)'
                    }}
                  >
                    {base}
                  </motion.div>
                )
              })}
            </div>
            <p className="text-sm text-[var(--text-primary)] mt-3">{getMutationDescription()}</p>
          </motion.div>
        )}
      </div>

      {/* 突变后果 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
        <h3 className="font-medium text-[var(--text-primary)] mb-3">突变可能的后果</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded bg-[var(--bg-secondary)]">
            <div className="font-medium text-[var(--text-primary)]">有害突变</div>
            <div className="text-xs text-[var(--text-secondary)]">导致遗传病，如镰刀型细胞贫血症</div>
          </div>
          <div className="p-3 rounded bg-[var(--bg-secondary)]">
            <div className="font-medium text-[var(--text-primary)]">中性突变</div>
            <div className="text-xs text-[var(--text-secondary)]">不影响蛋白质功能（密码子简并性）</div>
          </div>
          <div className="p-3 rounded bg-[var(--bg-secondary)]">
            <div className="font-medium text-[var(--text-primary)]">有利突变</div>
            <div className="text-xs text-[var(--text-secondary)]">产生新性状，是进化的原材料</div>
          </div>
        </div>
      </div>

      {/* 知识点 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)] text-sm">
        <p className="font-medium text-[var(--text-primary)] mb-2">基因突变特点：</p>
        <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
          <li><strong>随机性</strong>：可发生在任何生物、任何时期</li>
          <li><strong>低频性</strong>：自然突变频率很低（10⁻⁵~10⁻⁸）</li>
          <li><strong>不定向性</strong>：突变方向不确定</li>
          <li><strong>多害少利性</strong>：大多数突变有害</li>
          <li><strong>可逆性</strong>：A→a，也可能a→A</li>
        </ul>
      </div>
    </div>
  )
}
