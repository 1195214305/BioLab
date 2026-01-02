import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

type CycleType = 'carbon' | 'nitrogen'

export default function MatterCycleSimulation() {
  const [cycleType, setCycleType] = useState<CycleType>('carbon')
  const [isAnimating, setIsAnimating] = useState(false)
  const [step, setStep] = useState(0)

  const carbonSteps = [
    { from: '大气CO₂', to: '生产者', process: '光合作用', description: '植物通过光合作用固定CO₂' },
    { from: '生产者', to: '消费者', process: '摄食', description: '消费者通过摄食获得有机物中的碳' },
    { from: '生产者', to: '大气CO₂', process: '呼吸作用', description: '生产者呼吸作用释放CO₂' },
    { from: '消费者', to: '大气CO₂', process: '呼吸作用', description: '消费者呼吸作用释放CO₂' },
    { from: '生产者/消费者', to: '分解者', process: '死亡', description: '遗体残骸被分解者分解' },
    { from: '分解者', to: '大气CO₂', process: '分解作用', description: '分解者分解有机物释放CO₂' },
    { from: '化石燃料', to: '大气CO₂', process: '燃烧', description: '化石燃料燃烧释放CO₂' },
  ]

  const nitrogenSteps = [
    { from: '大气N₂', to: '土壤NH₃', process: '固氮作用', description: '固氮菌将N₂转化为NH₃' },
    { from: '土壤NH₃', to: '土壤NO₃⁻', process: '硝化作用', description: '硝化细菌将NH₃氧化为NO₃⁻' },
    { from: '土壤NO₃⁻', to: '植物', process: '吸收', description: '植物根系吸收NO₃⁻' },
    { from: '植物', to: '动物', process: '摄食', description: '动物通过摄食获得含氮有机物' },
    { from: '动物', to: '土壤NH₃', process: '排泄/分解', description: '排泄物和遗体被分解释放NH₃' },
    { from: '土壤NO₃⁻', to: '大气N₂', process: '反硝化作用', description: '反硝化细菌将NO₃⁻还原为N₂' },
  ]

  const steps = cycleType === 'carbon' ? carbonSteps : nitrogenSteps

  useEffect(() => {
    if (!isAnimating) return

    const interval = setInterval(() => {
      setStep(prev => {
        if (prev >= steps.length - 1) {
          return 0
        }
        return prev + 1
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [isAnimating, steps.length])

  return (
    <div className="space-y-6">
      {/* 循环类型选择 */}
      <div className="flex gap-2">
        <button
          onClick={() => { setCycleType('carbon'); setStep(0) }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            cycleType === 'carbon'
              ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
              : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          碳循环
        </button>
        <button
          onClick={() => { setCycleType('nitrogen'); setStep(0) }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            cycleType === 'nitrogen'
              ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
              : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          氮循环
        </button>
      </div>

      {/* 动画控制 */}
      <div className="flex gap-4">
        <button
          onClick={() => setIsAnimating(!isAnimating)}
          className="px-4 py-2 rounded-lg bg-[var(--text-primary)] text-[var(--bg-primary)] font-medium hover:opacity-90 transition-opacity"
        >
          {isAnimating ? '暂停' : '播放动画'}
        </button>
        <button
          onClick={() => setStep(prev => (prev + 1) % steps.length)}
          className="px-4 py-2 rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors"
        >
          下一步
        </button>
      </div>

      {/* 循环图 */}
      <div className="relative aspect-[4/3] max-w-2xl mx-auto">
        <svg viewBox="0 0 400 300" className="w-full h-full">
          {cycleType === 'carbon' ? (
            <>
              {/* 大气 */}
              <rect x="150" y="10" width="100" height="40" rx="8" fill="var(--bg-tertiary)" stroke="var(--text-secondary)" strokeWidth="1" />
              <text x="200" y="35" textAnchor="middle" fill="var(--text-primary)" fontSize="12">大气CO₂</text>

              {/* 生产者 */}
              <rect x="50" y="100" width="80" height="50" rx="8" fill="var(--bg-tertiary)" stroke="var(--text-secondary)" strokeWidth="1" />
              <text x="90" y="130" textAnchor="middle" fill="var(--text-primary)" fontSize="11">生产者</text>

              {/* 消费者 */}
              <rect x="270" y="100" width="80" height="50" rx="8" fill="var(--bg-tertiary)" stroke="var(--text-secondary)" strokeWidth="1" />
              <text x="310" y="130" textAnchor="middle" fill="var(--text-primary)" fontSize="11">消费者</text>

              {/* 分解者 */}
              <rect x="160" y="200" width="80" height="50" rx="8" fill="var(--bg-tertiary)" stroke="var(--text-secondary)" strokeWidth="1" />
              <text x="200" y="230" textAnchor="middle" fill="var(--text-primary)" fontSize="11">分解者</text>

              {/* 化石燃料 */}
              <rect x="50" y="200" width="80" height="50" rx="8" fill="var(--bg-tertiary)" stroke="var(--text-secondary)" strokeWidth="1" />
              <text x="90" y="225" textAnchor="middle" fill="var(--text-primary)" fontSize="10">化石燃料</text>

              {/* 箭头 */}
              <motion.path
                d="M150 30 L90 100"
                fill="none"
                stroke={step === 0 ? 'var(--text-primary)' : 'var(--text-tertiary)'}
                strokeWidth={step === 0 ? 3 : 1.5}
                markerEnd="url(#arrow)"
              />
              <motion.path
                d="M130 125 L270 125"
                fill="none"
                stroke={step === 1 ? 'var(--text-primary)' : 'var(--text-tertiary)'}
                strokeWidth={step === 1 ? 3 : 1.5}
                markerEnd="url(#arrow)"
              />
              <motion.path
                d="M70 100 L170 50"
                fill="none"
                stroke={step === 2 ? 'var(--text-primary)' : 'var(--text-tertiary)'}
                strokeWidth={step === 2 ? 3 : 1.5}
                markerEnd="url(#arrow)"
              />
              <motion.path
                d="M330 100 L230 50"
                fill="none"
                stroke={step === 3 ? 'var(--text-primary)' : 'var(--text-tertiary)'}
                strokeWidth={step === 3 ? 3 : 1.5}
                markerEnd="url(#arrow)"
              />
              <motion.path
                d="M90 150 L180 200"
                fill="none"
                stroke={step === 4 ? 'var(--text-primary)' : 'var(--text-tertiary)'}
                strokeWidth={step === 4 ? 3 : 1.5}
                markerEnd="url(#arrow)"
              />
              <motion.path
                d="M200 200 L200 50"
                fill="none"
                stroke={step === 5 ? 'var(--text-primary)' : 'var(--text-tertiary)'}
                strokeWidth={step === 5 ? 3 : 1.5}
                markerEnd="url(#arrow)"
              />
              <motion.path
                d="M90 200 L170 50"
                fill="none"
                stroke={step === 6 ? 'var(--text-primary)' : 'var(--text-tertiary)'}
                strokeWidth={step === 6 ? 3 : 1.5}
                markerEnd="url(#arrow)"
              />
            </>
          ) : (
            <>
              {/* 大气N₂ */}
              <rect x="150" y="10" width="100" height="40" rx="8" fill="var(--bg-tertiary)" stroke="var(--text-secondary)" strokeWidth="1" />
              <text x="200" y="35" textAnchor="middle" fill="var(--text-primary)" fontSize="12">大气N₂</text>

              {/* 土壤NH₃ */}
              <rect x="50" y="100" width="80" height="40" rx="8" fill="var(--bg-tertiary)" stroke="var(--text-secondary)" strokeWidth="1" />
              <text x="90" y="125" textAnchor="middle" fill="var(--text-primary)" fontSize="10">土壤NH₃</text>

              {/* 土壤NO₃⁻ */}
              <rect x="50" y="180" width="80" height="40" rx="8" fill="var(--bg-tertiary)" stroke="var(--text-secondary)" strokeWidth="1" />
              <text x="90" y="205" textAnchor="middle" fill="var(--text-primary)" fontSize="10">土壤NO₃⁻</text>

              {/* 植物 */}
              <rect x="200" y="140" width="70" height="40" rx="8" fill="var(--bg-tertiary)" stroke="var(--text-secondary)" strokeWidth="1" />
              <text x="235" y="165" textAnchor="middle" fill="var(--text-primary)" fontSize="11">植物</text>

              {/* 动物 */}
              <rect x="300" y="140" width="70" height="40" rx="8" fill="var(--bg-tertiary)" stroke="var(--text-secondary)" strokeWidth="1" />
              <text x="335" y="165" textAnchor="middle" fill="var(--text-primary)" fontSize="11">动物</text>

              {/* 箭头 */}
              <motion.path
                d="M180 50 L100 100"
                fill="none"
                stroke={step === 0 ? 'var(--text-primary)' : 'var(--text-tertiary)'}
                strokeWidth={step === 0 ? 3 : 1.5}
                markerEnd="url(#arrow)"
              />
              <motion.path
                d="M90 140 L90 180"
                fill="none"
                stroke={step === 1 ? 'var(--text-primary)' : 'var(--text-tertiary)'}
                strokeWidth={step === 1 ? 3 : 1.5}
                markerEnd="url(#arrow)"
              />
              <motion.path
                d="M130 190 L200 165"
                fill="none"
                stroke={step === 2 ? 'var(--text-primary)' : 'var(--text-tertiary)'}
                strokeWidth={step === 2 ? 3 : 1.5}
                markerEnd="url(#arrow)"
              />
              <motion.path
                d="M270 160 L300 160"
                fill="none"
                stroke={step === 3 ? 'var(--text-primary)' : 'var(--text-tertiary)'}
                strokeWidth={step === 3 ? 3 : 1.5}
                markerEnd="url(#arrow)"
              />
              <motion.path
                d="M300 170 L130 120"
                fill="none"
                stroke={step === 4 ? 'var(--text-primary)' : 'var(--text-tertiary)'}
                strokeWidth={step === 4 ? 3 : 1.5}
                markerEnd="url(#arrow)"
              />
              <motion.path
                d="M90 180 L180 50"
                fill="none"
                stroke={step === 5 ? 'var(--text-primary)' : 'var(--text-tertiary)'}
                strokeWidth={step === 5 ? 3 : 1.5}
                markerEnd="url(#arrow)"
              />
            </>
          )}

          <defs>
            <marker id="arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
            </marker>
          </defs>
        </svg>
      </div>

      {/* 当前步骤说明 */}
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 rounded-lg bg-[var(--bg-tertiary)]"
      >
        <div className="flex items-center gap-4 mb-2">
          <span className="px-3 py-1 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] text-sm font-medium">
            步骤 {step + 1}/{steps.length}
          </span>
          <span className="font-medium text-[var(--text-primary)]">{steps[step].process}</span>
        </div>
        <p className="text-sm text-[var(--text-secondary)]">
          <span className="font-medium">{steps[step].from}</span>
          {' → '}
          <span className="font-medium">{steps[step].to}</span>
        </p>
        <p className="text-sm text-[var(--text-tertiary)] mt-1">{steps[step].description}</p>
      </motion.div>

      {/* 知识点 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)] text-sm">
        <p className="font-medium text-[var(--text-primary)] mb-2">
          {cycleType === 'carbon' ? '碳循环' : '氮循环'}特点：
        </p>
        <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
          {cycleType === 'carbon' ? (
            <>
              <li>碳在生物群落与无机环境之间以<strong>CO₂</strong>形式循环</li>
              <li>碳在生物群落内部以<strong>有机物</strong>形式传递</li>
              <li>光合作用是碳进入生物群落的主要途径</li>
              <li>呼吸作用和分解作用是碳返回大气的主要途径</li>
              <li>化石燃料燃烧加剧了温室效应</li>
            </>
          ) : (
            <>
              <li>大气中N₂需要通过<strong>固氮作用</strong>才能被生物利用</li>
              <li>固氮微生物：根瘤菌、固氮菌、蓝藻等</li>
              <li>硝化细菌将NH₃氧化为NO₃⁻（硝化作用）</li>
              <li>反硝化细菌将NO₃⁻还原为N₂（反硝化作用）</li>
              <li>氮循环与碳循环相互联系</li>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}
