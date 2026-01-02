import { useState } from 'react'
import { motion } from 'framer-motion'

type ProcessType = 'replication' | 'transcription' | 'translation' | 'reverse'

export default function CentralDogmaSimulation() {
  const [activeProcess, setActiveProcess] = useState<ProcessType>('replication')
  const [isAnimating, setIsAnimating] = useState(false)
  const [step, setStep] = useState(0)

  const processes = {
    replication: {
      name: 'DNA复制',
      from: 'DNA',
      to: 'DNA',
      location: '细胞核（主要）',
      enzyme: 'DNA聚合酶',
      template: 'DNA双链',
      product: '两个相同的DNA分子',
      description: 'DNA → DNA，遗传信息的传递'
    },
    transcription: {
      name: '转录',
      from: 'DNA',
      to: 'RNA',
      location: '细胞核',
      enzyme: 'RNA聚合酶',
      template: 'DNA模板链',
      product: 'mRNA',
      description: 'DNA → RNA，遗传信息的转录'
    },
    translation: {
      name: '翻译',
      from: 'RNA',
      to: '蛋白质',
      location: '核糖体（细胞质）',
      enzyme: '多种酶',
      template: 'mRNA',
      product: '多肽链/蛋白质',
      description: 'RNA → 蛋白质，遗传信息的表达'
    },
    reverse: {
      name: '逆转录',
      from: 'RNA',
      to: 'DNA',
      location: '细胞质',
      enzyme: '逆转录酶',
      template: 'RNA',
      product: 'DNA',
      description: 'RNA → DNA，某些病毒特有'
    }
  }

  const currentProcess = processes[activeProcess]

  const startAnimation = () => {
    setIsAnimating(true)
    setStep(0)
    let currentStep = 0
    const interval = setInterval(() => {
      currentStep++
      setStep(currentStep)
      if (currentStep >= 4) {
        clearInterval(interval)
        setIsAnimating(false)
      }
    }, 800)
  }

  return (
    <div className="space-y-6">
      {/* 说明 */}
      <div className="text-sm text-[var(--text-secondary)]">
        中心法则描述了遗传信息在DNA、RNA和蛋白质之间的传递规律
      </div>

      {/* 中心法则图解 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
        <h3 className="font-medium text-[var(--text-primary)] mb-4">中心法则</h3>
        <div className="relative">
          <svg viewBox="0 0 400 200" className="w-full h-auto">
            {/* DNA */}
            <motion.g
              animate={{
                scale: activeProcess === 'replication' || activeProcess === 'transcription' ? 1.1 : 1,
                opacity: activeProcess === 'translation' ? 0.5 : 1
              }}
            >
              <circle cx="100" cy="100" r="45" fill="var(--text-primary)" />
              <text x="100" y="105" textAnchor="middle" fill="var(--bg-primary)" fontSize="16" fontWeight="bold">DNA</text>
            </motion.g>

            {/* RNA */}
            <motion.g
              animate={{
                scale: activeProcess === 'transcription' || activeProcess === 'translation' || activeProcess === 'reverse' ? 1.1 : 1
              }}
            >
              <circle cx="250" cy="100" r="45" fill="var(--text-secondary)" />
              <text x="250" y="105" textAnchor="middle" fill="var(--bg-primary)" fontSize="16" fontWeight="bold">RNA</text>
            </motion.g>

            {/* 蛋白质 */}
            <motion.g
              animate={{
                scale: activeProcess === 'translation' ? 1.1 : 1,
                opacity: activeProcess === 'replication' || activeProcess === 'reverse' ? 0.5 : 1
              }}
            >
              <rect x="320" y="55" width="70" height="90" rx="10" fill="var(--text-tertiary)" />
              <text x="355" y="105" textAnchor="middle" fill="var(--bg-primary)" fontSize="12" fontWeight="bold">蛋白质</text>
            </motion.g>

            {/* DNA复制箭头 */}
            <motion.g animate={{ opacity: activeProcess === 'replication' ? 1 : 0.3 }}>
              <path d="M60 60 Q30 100 60 140" fill="none" stroke="var(--text-primary)" strokeWidth="3" markerEnd="url(#arrowPrimary)" />
              <text x="25" y="105" fill="var(--text-primary)" fontSize="10">复制</text>
            </motion.g>

            {/* 转录箭头 */}
            <motion.g animate={{ opacity: activeProcess === 'transcription' ? 1 : 0.3 }}>
              <path d="M145 90 L205 90" fill="none" stroke="var(--text-secondary)" strokeWidth="3" markerEnd="url(#arrowSecondary)" />
              <text x="175" y="80" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">转录</text>
            </motion.g>

            {/* 翻译箭头 */}
            <motion.g animate={{ opacity: activeProcess === 'translation' ? 1 : 0.3 }}>
              <path d="M295 100 L320 100" fill="none" stroke="var(--text-tertiary)" strokeWidth="3" markerEnd="url(#arrowTertiary)" />
              <text x="307" y="90" textAnchor="middle" fill="var(--text-tertiary)" fontSize="10">翻译</text>
            </motion.g>

            {/* 逆转录箭头 */}
            <motion.g animate={{ opacity: activeProcess === 'reverse' ? 1 : 0.3 }}>
              <path d="M205 110 L145 110" fill="none" stroke="var(--text-primary)" strokeWidth="2" strokeDasharray="5 3" markerEnd="url(#arrowPrimary)" />
              <text x="175" y="130" textAnchor="middle" fill="var(--text-primary)" fontSize="9">逆转录</text>
            </motion.g>

            <defs>
              <marker id="arrowPrimary" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="var(--text-primary)" />
              </marker>
              <marker id="arrowSecondary" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="var(--text-secondary)" />
              </marker>
              <marker id="arrowTertiary" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="var(--text-tertiary)" />
              </marker>
            </defs>
          </svg>
        </div>
      </div>

      {/* 过程选择 */}
      <div className="flex flex-wrap gap-2">
        {(Object.keys(processes) as ProcessType[]).map((key) => (
          <button
            key={key}
            onClick={() => { setActiveProcess(key); setStep(0) }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeProcess === key
                ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
                : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            {processes[key].name}
          </button>
        ))}
      </div>

      {/* 当前过程详情 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-[var(--text-primary)]">{currentProcess.name}</h3>
          <button
            onClick={startAnimation}
            disabled={isAnimating}
            className="px-4 py-2 rounded-lg bg-[var(--text-primary)] text-[var(--bg-primary)] text-sm font-medium disabled:opacity-50"
          >
            {isAnimating ? '演示中...' : '开始演示'}
          </button>
        </div>

        {/* 动画演示区 */}
        <div className="relative h-32 rounded-lg bg-[var(--bg-secondary)] overflow-hidden mb-4">
          <svg viewBox="0 0 400 100" className="w-full h-full">
            {/* 模板 */}
            <motion.g animate={{ opacity: step >= 1 ? 1 : 0.3 }}>
              <rect x="20" y="35" width="100" height="30" rx="5" fill="var(--text-secondary)" />
              <text x="70" y="55" textAnchor="middle" fill="var(--bg-primary)" fontSize="10">{currentProcess.from}</text>
            </motion.g>

            {/* 酶 */}
            <motion.g
              animate={{
                x: step >= 2 ? 100 : 0,
                opacity: step >= 1 ? 1 : 0
              }}
              transition={{ duration: 0.5 }}
            >
              <ellipse cx="150" cy="50" rx="25" ry="15" fill="var(--text-tertiary)" />
              <text x="150" y="54" textAnchor="middle" fill="var(--bg-primary)" fontSize="8">酶</text>
            </motion.g>

            {/* 产物 */}
            <motion.g
              animate={{
                opacity: step >= 3 ? 1 : 0,
                x: step >= 4 ? 0 : -20
              }}
              transition={{ duration: 0.5 }}
            >
              <rect x="280" y="35" width="100" height="30" rx="5" fill="var(--text-primary)" />
              <text x="330" y="55" textAnchor="middle" fill="var(--bg-primary)" fontSize="10">{currentProcess.to}</text>
            </motion.g>

            {/* 箭头 */}
            <motion.path
              d="M130 50 L270 50"
              fill="none"
              stroke="var(--text-tertiary)"
              strokeWidth="2"
              strokeDasharray="5 3"
              animate={{ opacity: step >= 2 ? 1 : 0.3 }}
            />
          </svg>
        </div>

        {/* 过程信息 */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-[var(--text-tertiary)]">场所：</span>
            <span className="text-[var(--text-secondary)]">{currentProcess.location}</span>
          </div>
          <div>
            <span className="text-[var(--text-tertiary)]">酶：</span>
            <span className="text-[var(--text-secondary)]">{currentProcess.enzyme}</span>
          </div>
          <div>
            <span className="text-[var(--text-tertiary)]">模板：</span>
            <span className="text-[var(--text-secondary)]">{currentProcess.template}</span>
          </div>
          <div>
            <span className="text-[var(--text-tertiary)]">产物：</span>
            <span className="text-[var(--text-secondary)]">{currentProcess.product}</span>
          </div>
        </div>
      </div>

      {/* 碱基配对规则 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
        <h3 className="font-medium text-[var(--text-primary)] mb-3">碱基配对规则</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-lg bg-[var(--bg-secondary)]">
            <p className="text-sm font-medium text-[var(--text-primary)] mb-2">DNA复制/转录</p>
            <div className="flex justify-around text-sm text-[var(--text-secondary)]">
              <span>A — T(U)</span>
              <span>G — C</span>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-[var(--bg-secondary)]">
            <p className="text-sm font-medium text-[var(--text-primary)] mb-2">翻译（密码子-反密码子）</p>
            <div className="flex justify-around text-sm text-[var(--text-secondary)]">
              <span>A — U</span>
              <span>G — C</span>
            </div>
          </div>
        </div>
      </div>

      {/* 知识点 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)] text-sm">
        <p className="font-medium text-[var(--text-primary)] mb-2">中心法则要点：</p>
        <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
          <li><strong>DNA复制</strong>：DNA → DNA（半保留复制）</li>
          <li><strong>转录</strong>：DNA → RNA（以DNA一条链为模板）</li>
          <li><strong>翻译</strong>：RNA → 蛋白质（mRNA上3个碱基决定1个氨基酸）</li>
          <li><strong>逆转录</strong>：RNA → DNA（逆转录病毒，如HIV）</li>
          <li><strong>RNA复制</strong>：RNA → RNA（某些RNA病毒）</li>
        </ul>
      </div>
    </div>
  )
}
