import { useState } from 'react'
import { motion } from 'framer-motion'

export default function CellDivisionSimulation() {
  const [divisionType, setDivisionType] = useState<'mitosis' | 'meiosis'>('mitosis')
  const [currentPhase, setCurrentPhase] = useState(0)

  const mitosisPhases = [
    { name: '间期', description: 'DNA复制，细胞生长', chromosomes: 4, dna: 8 },
    { name: '前期', description: '染色质螺旋化成染色体，核膜核仁消失', chromosomes: 4, dna: 8 },
    { name: '中期', description: '染色体排列在赤道板上', chromosomes: 4, dna: 8 },
    { name: '后期', description: '着丝点分裂，姐妹染色单体分开', chromosomes: 8, dna: 8 },
    { name: '末期', description: '核膜核仁重现，细胞质分裂', chromosomes: 4, dna: 4 },
  ]

  const meiosisPhases = [
    { name: '间期', description: 'DNA复制', chromosomes: 4, dna: 8 },
    { name: '减I前期', description: '同源染色体联会，形成四分体', chromosomes: 4, dna: 8 },
    { name: '减I中期', description: '四分体排列在赤道板上', chromosomes: 4, dna: 8 },
    { name: '减I后期', description: '同源染色体分离', chromosomes: 4, dna: 8 },
    { name: '减I末期', description: '形成两个子细胞', chromosomes: 2, dna: 4 },
    { name: '减II前期', description: '染色体再次螺旋化', chromosomes: 2, dna: 4 },
    { name: '减II中期', description: '染色体排列在赤道板', chromosomes: 2, dna: 4 },
    { name: '减II后期', description: '着丝点分裂', chromosomes: 4, dna: 4 },
    { name: '减II末期', description: '形成四个子细胞', chromosomes: 2, dna: 2 },
  ]

  const phases = divisionType === 'mitosis' ? mitosisPhases : meiosisPhases
  const currentPhaseData = phases[currentPhase]

  const nextPhase = () => {
    setCurrentPhase(prev => (prev + 1) % phases.length)
  }

  const prevPhase = () => {
    setCurrentPhase(prev => (prev - 1 + phases.length) % phases.length)
  }

  return (
    <div className="space-y-6">
      {/* 分裂类型选择 */}
      <div className="flex gap-2">
        <button
          onClick={() => { setDivisionType('mitosis'); setCurrentPhase(0) }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            divisionType === 'mitosis'
              ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
              : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          有丝分裂
        </button>
        <button
          onClick={() => { setDivisionType('meiosis'); setCurrentPhase(0) }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            divisionType === 'meiosis'
              ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
              : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          减数分裂
        </button>
      </div>

      {/* 当前阶段信息 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">{currentPhaseData.name}</h3>
          <span className="text-sm text-[var(--text-tertiary)]">{currentPhase + 1}/{phases.length}</span>
        </div>
        <p className="text-sm text-[var(--text-secondary)]">{currentPhaseData.description}</p>
      </div>

      {/* 细胞分裂动画 */}
      <div className="relative h-64 rounded-lg bg-[var(--bg-tertiary)] overflow-hidden">
        <svg viewBox="0 0 300 200" className="w-full h-full">
          {/* 细胞轮廓 */}
          {divisionType === 'mitosis' ? (
            currentPhase < 4 ? (
              <ellipse cx="150" cy="100" rx="80" ry="60" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
            ) : (
              <>
                <ellipse cx="100" cy="100" rx="50" ry="40" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
                <ellipse cx="200" cy="100" rx="50" ry="40" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
              </>
            )
          ) : (
            currentPhase < 4 ? (
              <ellipse cx="150" cy="100" rx="80" ry="60" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
            ) : currentPhase < 8 ? (
              <>
                <ellipse cx="100" cy="100" rx="50" ry="40" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
                <ellipse cx="200" cy="100" rx="50" ry="40" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
              </>
            ) : (
              <>
                <ellipse cx="60" cy="80" rx="30" ry="25" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
                <ellipse cx="140" cy="80" rx="30" ry="25" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
                <ellipse cx="160" cy="120" rx="30" ry="25" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
                <ellipse cx="240" cy="120" rx="30" ry="25" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
              </>
            )
          )}

          {/* 染色体示意 */}
          {divisionType === 'mitosis' && (
            <>
              {currentPhase === 0 && (
                <g>
                  <text x="150" y="100" textAnchor="middle" fill="var(--text-tertiary)" fontSize="10">DNA复制中...</text>
                </g>
              )}
              {currentPhase === 1 && (
                <g>
                  <motion.path d="M130 80 L130 120 M135 80 L135 120" stroke="var(--text-primary)" strokeWidth="3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
                  <motion.path d="M160 80 L160 120 M165 80 L165 120" stroke="var(--text-primary)" strokeWidth="3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
                </g>
              )}
              {currentPhase === 2 && (
                <g>
                  <line x1="70" y1="100" x2="230" y2="100" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="4 2" />
                  <motion.path d="M140 95 L140 105 M145 95 L145 105" stroke="var(--text-primary)" strokeWidth="3" />
                  <motion.path d="M155 95 L155 105 M160 95 L160 105" stroke="var(--text-primary)" strokeWidth="3" />
                </g>
              )}
              {currentPhase === 3 && (
                <g>
                  <motion.path d="M100 80 L100 90" stroke="var(--text-primary)" strokeWidth="3" animate={{ y: [-10, 0] }} />
                  <motion.path d="M110 80 L110 90" stroke="var(--text-primary)" strokeWidth="3" animate={{ y: [-10, 0] }} />
                  <motion.path d="M190 110 L190 120" stroke="var(--text-primary)" strokeWidth="3" animate={{ y: [10, 0] }} />
                  <motion.path d="M200 110 L200 120" stroke="var(--text-primary)" strokeWidth="3" animate={{ y: [10, 0] }} />
                </g>
              )}
              {currentPhase === 4 && (
                <g>
                  <circle cx="100" cy="100" r="15" fill="var(--text-tertiary)" opacity="0.5" />
                  <circle cx="200" cy="100" r="15" fill="var(--text-tertiary)" opacity="0.5" />
                </g>
              )}
            </>
          )}

          {/* 纺锤丝 */}
          {(currentPhase === 2 || currentPhase === 3) && divisionType === 'mitosis' && (
            <g opacity="0.3">
              <line x1="80" y1="50" x2="150" y2="100" stroke="var(--text-secondary)" strokeWidth="1" />
              <line x1="220" y1="50" x2="150" y2="100" stroke="var(--text-secondary)" strokeWidth="1" />
              <line x1="80" y1="150" x2="150" y2="100" stroke="var(--text-secondary)" strokeWidth="1" />
              <line x1="220" y1="150" x2="150" y2="100" stroke="var(--text-secondary)" strokeWidth="1" />
            </g>
          )}
        </svg>
      </div>

      {/* 控制按钮 */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={prevPhase}
          className="px-4 py-2 rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]"
        >
          上一阶段
        </button>
        <button
          onClick={nextPhase}
          className="px-4 py-2 rounded-lg bg-[var(--text-primary)] text-[var(--bg-primary)] font-medium hover:opacity-90"
        >
          下一阶段
        </button>
      </div>

      {/* 阶段进度 */}
      <div className="flex gap-1">
        {phases.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPhase(i)}
            className={`flex-1 h-2 rounded-full transition-colors ${
              i === currentPhase ? 'bg-[var(--text-primary)]' : 'bg-[var(--bg-tertiary)]'
            }`}
          />
        ))}
      </div>

      {/* 染色体和DNA数量 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-[var(--bg-tertiary)] text-center">
          <div className="text-3xl font-bold text-[var(--text-primary)]">{currentPhaseData.chromosomes}</div>
          <div className="text-sm text-[var(--text-secondary)]">染色体数目</div>
        </div>
        <div className="p-4 rounded-lg bg-[var(--bg-tertiary)] text-center">
          <div className="text-3xl font-bold text-[var(--text-primary)]">{currentPhaseData.dna}</div>
          <div className="text-sm text-[var(--text-secondary)]">DNA分子数</div>
        </div>
      </div>

      {/* 知识点 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)] text-sm">
        <p className="font-medium text-[var(--text-primary)] mb-2">
          {divisionType === 'mitosis' ? '有丝分裂' : '减数分裂'}特点：
        </p>
        <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
          {divisionType === 'mitosis' ? (
            <>
              <li>子细胞染色体数目与亲代细胞<strong>相同</strong></li>
              <li>一次分裂产生<strong>2个</strong>子细胞</li>
              <li>用于<strong>体细胞增殖</strong></li>
            </>
          ) : (
            <>
              <li>子细胞染色体数目是亲代细胞的<strong>一半</strong></li>
              <li>一次分裂产生<strong>4个</strong>子细胞</li>
              <li>用于产生<strong>生殖细胞</strong></li>
              <li>减I同源染色体分离，减II姐妹染色单体分开</li>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}
