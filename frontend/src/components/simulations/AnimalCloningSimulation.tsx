import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type CloningStep = 'donor' | 'enucleation' | 'transfer' | 'activation' | 'embryo' | 'surrogate' | 'clone'

interface StepInfo {
  name: string
  description: string
  details: string[]
}

const steps: Record<CloningStep, StepInfo> = {
  donor: {
    name: '获取供体细胞',
    description: '从供体动物获取体细胞（如乳腺细胞）',
    details: ['选择健康的供体动物', '取体细胞（含完整遗传信息）', '体外培养使细胞处于G0期']
  },
  enucleation: {
    name: '去核',
    description: '从卵母细胞中去除细胞核',
    details: ['获取成熟的卵母细胞', '用微型吸管吸出细胞核', '保留细胞质（含线粒体等）']
  },
  transfer: {
    name: '核移植',
    description: '将供体细胞核注入去核卵母细胞',
    details: ['将供体细胞核注入去核卵', '或将供体细胞与去核卵融合', '形成重组细胞']
  },
  activation: {
    name: '激活',
    description: '用电脉冲或化学方法激活重组细胞',
    details: ['电脉冲刺激细胞融合', '化学物质诱导细胞分裂', '模拟受精过程']
  },
  embryo: {
    name: '早期胚胎培养',
    description: '体外培养至囊胚期',
    details: ['在培养液中培养', '观察细胞分裂情况', '发育至囊胚期']
  },
  surrogate: {
    name: '胚胎移植',
    description: '将胚胎移植到代孕母体子宫',
    details: ['选择同种代孕母体', '同期发情处理', '将胚胎移入子宫']
  },
  clone: {
    name: '克隆动物诞生',
    description: '代孕母体产下克隆动物',
    details: ['妊娠期正常发育', '产下与供体遗传信息相同的个体', '核DNA来自供体，线粒体DNA来自卵母细胞']
  }
}

const stepOrder: CloningStep[] = ['donor', 'enucleation', 'transfer', 'activation', 'embryo', 'surrogate', 'clone']

export default function AnimalCloningSimulation() {
  const [currentStep, setCurrentStep] = useState<CloningStep>('donor')
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationStep, setAnimationStep] = useState(0)

  const currentIndex = stepOrder.indexOf(currentStep)
  const stepInfo = steps[currentStep]

  const startAnimation = () => {
    setIsAnimating(true)
    setAnimationStep(0)
    setCurrentStep('donor')

    let step = 0
    const interval = setInterval(() => {
      step++
      setAnimationStep(step)
      if (step < stepOrder.length) {
        setCurrentStep(stepOrder[step])
      }
      if (step >= stepOrder.length) {
        clearInterval(interval)
        setIsAnimating(false)
      }
    }, 2000)
  }

  return (
    <div className="space-y-6">
      {/* 说明 */}
      <div className="text-sm text-[var(--text-secondary)]">
        动物克隆是利用体细胞核移植技术，将供体细胞核移入去核卵母细胞，培育出与供体遗传信息相同的个体
      </div>

      {/* 克隆过程动画 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-[var(--text-primary)]">体细胞核移植过程（以克隆羊多莉为例）</h3>
          <button
            onClick={startAnimation}
            disabled={isAnimating}
            className="px-4 py-2 rounded-lg bg-[var(--text-primary)] text-[var(--bg-primary)] text-sm font-medium disabled:opacity-50"
          >
            {isAnimating ? '克隆中...' : '开始克隆'}
          </button>
        </div>

        <div className="relative h-72 overflow-x-auto">
          <svg viewBox="0 0 800 240" className="w-full h-full min-w-[600px]">
            {/* 供体羊A（白面羊） */}
            <motion.g animate={{ opacity: animationStep >= 0 ? 1 : 0.3 }}>
              <text x="60" y="20" textAnchor="middle" fill="var(--text-tertiary)" fontSize="10">供体羊A（白面）</text>
              {/* 羊的简化图形 */}
              <ellipse cx="60" cy="50" rx="30" ry="20" fill="#f5f5f5" stroke="var(--border-color)" />
              <circle cx="45" cy="40" r="12" fill="#f5f5f5" stroke="var(--border-color)" />
              <circle cx="42" cy="38" r="2" fill="var(--text-primary)" />
              {/* 乳腺细胞 */}
              <circle cx="60" cy="90" r="15" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" />
              <circle cx="60" cy="90" r="6" fill="#78350f" />
              <text x="60" y="115" textAnchor="middle" fill="var(--text-tertiary)" fontSize="8">乳腺细胞</text>
            </motion.g>

            {/* 供体羊B（黑面羊） */}
            <motion.g animate={{ opacity: animationStep >= 0 ? 1 : 0.3 }}>
              <text x="180" y="20" textAnchor="middle" fill="var(--text-tertiary)" fontSize="10">供体羊B（黑面）</text>
              <ellipse cx="180" cy="50" rx="30" ry="20" fill="#e5e5e5" stroke="var(--border-color)" />
              <circle cx="165" cy="40" r="12" fill="#374151" stroke="var(--border-color)" />
              <circle cx="162" cy="38" r="2" fill="white" />
              {/* 卵母细胞 */}
              <circle cx="180" cy="90" r="18" fill="#a78bfa" stroke="#7c3aed" strokeWidth="2" />
              <circle cx="180" cy="90" r="7" fill="#4c1d95" />
              <text x="180" y="118" textAnchor="middle" fill="var(--text-tertiary)" fontSize="8">卵母细胞</text>
            </motion.g>

            {/* 箭头：去核 */}
            <motion.g animate={{ opacity: animationStep >= 1 ? 1 : 0.3 }}>
              <path d="M200 90 L250 90" stroke="var(--text-tertiary)" strokeWidth="2" markerEnd="url(#arrowClone)" />
              <text x="225" y="80" textAnchor="middle" fill="var(--text-tertiary)" fontSize="8">去核</text>
            </motion.g>

            {/* 去核卵母细胞 */}
            <motion.g animate={{ opacity: animationStep >= 1 ? 1 : 0.3 }}>
              <circle cx="280" cy="90" r="18" fill="#a78bfa" stroke="#7c3aed" strokeWidth="2" />
              {/* 空心表示去核 */}
              <circle cx="280" cy="90" r="7" fill="none" stroke="#4c1d95" strokeWidth="1" strokeDasharray="2 2" />
              <text x="280" y="118" textAnchor="middle" fill="var(--text-tertiary)" fontSize="8">去核卵</text>
            </motion.g>

            {/* 箭头：核移植 */}
            <motion.g animate={{ opacity: animationStep >= 2 ? 1 : 0.3 }}>
              <path d="M80 90 L80 150 L320 150 L320 110" stroke="var(--text-tertiary)" strokeWidth="2" strokeDasharray="4 2" />
              <path d="M300 90 L350 90" stroke="var(--text-tertiary)" strokeWidth="2" markerEnd="url(#arrowClone)" />
              <text x="325" y="80" textAnchor="middle" fill="var(--text-tertiary)" fontSize="8">核移植</text>
            </motion.g>

            {/* 重组细胞 */}
            <motion.g animate={{ opacity: animationStep >= 2 ? 1 : 0.3 }}>
              <circle cx="380" cy="90" r="18" fill="#a78bfa" stroke="#7c3aed" strokeWidth="2" />
              <circle cx="380" cy="90" r="7" fill="#78350f" />
              <text x="380" y="118" textAnchor="middle" fill="var(--text-tertiary)" fontSize="8">重组细胞</text>
            </motion.g>

            {/* 箭头：激活 */}
            <motion.g animate={{ opacity: animationStep >= 3 ? 1 : 0.3 }}>
              <path d="M400 90 L440 90" stroke="var(--text-tertiary)" strokeWidth="2" markerEnd="url(#arrowClone)" />
              <text x="420" y="80" textAnchor="middle" fill="var(--text-tertiary)" fontSize="8">电激活</text>
              {/* 电击符号 */}
              <path d="M415 95 L420 100 L425 95" stroke="#fbbf24" strokeWidth="2" fill="none" />
            </motion.g>

            {/* 早期胚胎 */}
            <motion.g animate={{ opacity: animationStep >= 4 ? 1 : 0.3 }}>
              <circle cx="480" cy="90" r="20" fill="#bbf7d0" stroke="#22c55e" strokeWidth="2" />
              {/* 多个细胞 */}
              {[0, 1, 2, 3].map((i) => (
                <circle
                  key={i}
                  cx={472 + (i % 2) * 16}
                  cy={82 + Math.floor(i / 2) * 16}
                  r="6"
                  fill="#86efac"
                  stroke="#22c55e"
                  strokeWidth="1"
                />
              ))}
              <text x="480" y="120" textAnchor="middle" fill="var(--text-tertiary)" fontSize="8">早期胚胎</text>
            </motion.g>

            {/* 代孕母羊C（黑面羊） */}
            <motion.g animate={{ opacity: animationStep >= 5 ? 1 : 0.3 }}>
              <text x="580" y="20" textAnchor="middle" fill="var(--text-tertiary)" fontSize="10">代孕母羊C（黑面）</text>
              <ellipse cx="580" cy="60" rx="35" ry="25" fill="#d1d5db" stroke="var(--border-color)" />
              <circle cx="560" cy="48" r="14" fill="#374151" stroke="var(--border-color)" />
              <circle cx="556" cy="46" r="2" fill="white" />
              {/* 子宫示意 */}
              <ellipse cx="580" cy="70" rx="15" ry="10" fill="#fecaca" stroke="#ef4444" strokeWidth="1" />
            </motion.g>

            {/* 箭头：胚胎移植 */}
            <motion.g animate={{ opacity: animationStep >= 5 ? 1 : 0.3 }}>
              <path d="M505 90 L545 70" stroke="var(--text-tertiary)" strokeWidth="2" markerEnd="url(#arrowClone)" />
              <text x="525" y="70" textAnchor="middle" fill="var(--text-tertiary)" fontSize="8">移植</text>
            </motion.g>

            {/* 克隆羊多莉（白面） */}
            <motion.g animate={{ opacity: animationStep >= 6 ? 1 : 0 }}>
              <text x="700" y="20" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="bold">克隆羊多莉</text>
              <ellipse cx="700" cy="55" rx="32" ry="22" fill="#f5f5f5" stroke="#22c55e" strokeWidth="2" />
              <circle cx="682" cy="44" r="13" fill="#f5f5f5" stroke="#22c55e" strokeWidth="2" />
              <circle cx="678" cy="42" r="2" fill="var(--text-primary)" />
              {/* 成功标记 */}
              <circle cx="730" cy="30" r="12" fill="#22c55e" />
              <path d="M724 30 L728 34 L736 26" stroke="white" strokeWidth="2" fill="none" />
              <text x="700" y="90" textAnchor="middle" fill="var(--text-tertiary)" fontSize="8">与供体羊A遗传信息相同</text>
            </motion.g>

            {/* 箭头：发育 */}
            <motion.g animate={{ opacity: animationStep >= 6 ? 1 : 0.3 }}>
              <path d="M620 60 L660 55" stroke="var(--text-tertiary)" strokeWidth="2" markerEnd="url(#arrowClone)" />
              <text x="640" y="50" textAnchor="middle" fill="var(--text-tertiary)" fontSize="8">发育</text>
            </motion.g>

            {/* 底部说明 */}
            <motion.g animate={{ opacity: animationStep >= 6 ? 1 : 0 }}>
              <rect x="50" y="180" width="700" height="50" rx="5" fill="var(--bg-secondary)" />
              <text x="400" y="200" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">
                多莉的核DNA来自供体羊A（白面），线粒体DNA来自供体羊B（黑面），由代孕母羊C（黑面）生出
              </text>
              <text x="400" y="220" textAnchor="middle" fill="var(--text-tertiary)" fontSize="9">
                多莉的外貌与供体羊A相同（白面），证明核DNA决定生物主要性状
              </text>
            </motion.g>

            <defs>
              <marker id="arrowClone" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="var(--text-tertiary)" />
              </marker>
            </defs>
          </svg>
        </div>

        {/* 进度指示 */}
        <div className="flex justify-between mt-4 px-4">
          {stepOrder.map((step, i) => (
            <div
              key={step}
              className={`flex flex-col items-center ${i <= currentIndex ? 'opacity-100' : 'opacity-40'}`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  step === currentStep
                    ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
                    : i < currentIndex
                    ? 'bg-[var(--text-secondary)] text-[var(--bg-primary)]'
                    : 'bg-[var(--bg-secondary)] text-[var(--text-tertiary)]'
                }`}
              >
                {i + 1}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 当前步骤详情 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="p-4 rounded-lg bg-[var(--bg-tertiary)]"
        >
          <h3 className="font-medium text-[var(--text-primary)] mb-2">
            步骤 {currentIndex + 1}：{stepInfo.name}
          </h3>
          <p className="text-sm text-[var(--text-secondary)] mb-3">{stepInfo.description}</p>
          <ul className="space-y-1">
            {stepInfo.details.map((detail, i) => (
              <li key={i} className="text-sm text-[var(--text-tertiary)]">• {detail}</li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>

      {/* 步骤选择 */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {stepOrder.map((step) => (
          <button
            key={step}
            onClick={() => setCurrentStep(step)}
            className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              currentStep === step
                ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
                : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            {steps[step].name}
          </button>
        ))}
      </div>

      {/* 克隆技术应用 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
        <h3 className="font-medium text-[var(--text-primary)] mb-3">动物克隆技术的应用</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-lg bg-[var(--bg-secondary)] text-center">
            <div className="text-2xl mb-1">🐑</div>
            <div className="text-sm font-medium text-[var(--text-primary)]">繁殖优良品种</div>
            <div className="text-xs text-[var(--text-tertiary)]">保存优良基因</div>
          </div>
          <div className="p-3 rounded-lg bg-[var(--bg-secondary)] text-center">
            <div className="text-2xl mb-1">💊</div>
            <div className="text-sm font-medium text-[var(--text-primary)]">生产药物</div>
            <div className="text-xs text-[var(--text-tertiary)]">乳腺生物反应器</div>
          </div>
          <div className="p-3 rounded-lg bg-[var(--bg-secondary)] text-center">
            <div className="text-2xl mb-1">🔬</div>
            <div className="text-sm font-medium text-[var(--text-primary)]">医学研究</div>
            <div className="text-xs text-[var(--text-tertiary)]">疾病模型动物</div>
          </div>
          <div className="p-3 rounded-lg bg-[var(--bg-secondary)] text-center">
            <div className="text-2xl mb-1">🦏</div>
            <div className="text-sm font-medium text-[var(--text-primary)]">保护濒危物种</div>
            <div className="text-xs text-[var(--text-tertiary)]">挽救濒危动物</div>
          </div>
        </div>
      </div>

      {/* 知识点 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)] text-sm">
        <p className="font-medium text-[var(--text-primary)] mb-2">动物克隆要点：</p>
        <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
          <li><strong>原理</strong>：动物体细胞核的全能性</li>
          <li><strong>核心技术</strong>：体细胞核移植</li>
          <li><strong>供体细胞</strong>：提供细胞核（决定克隆动物主要遗传性状）</li>
          <li><strong>受体细胞</strong>：去核卵母细胞（提供细胞质环境和线粒体）</li>
          <li><strong>克隆动物特点</strong>：核DNA与供体相同，线粒体DNA与卵母细胞供体相同</li>
          <li><strong>伦理问题</strong>：克隆人在伦理上不被接受</li>
        </ul>
      </div>
    </div>
  )
}
