import { useState } from 'react'
import { motion } from 'framer-motion'

type ImmuneType = 'humoral' | 'cellular'

export default function ImmuneRegulationSimulation() {
  const [immuneType, setImmuneType] = useState<ImmuneType>('humoral')
  const [step, setStep] = useState(0)

  const humoralSteps = [
    { name: '抗原入侵', description: '病原体（抗原）进入体内' },
    { name: '抗原呈递', description: '吞噬细胞处理抗原，呈递给T细胞' },
    { name: 'T细胞活化', description: 'T细胞识别抗原，产生淋巴因子' },
    { name: 'B细胞活化', description: 'B细胞在淋巴因子作用下增殖分化' },
    { name: '产生抗体', description: '浆细胞分泌抗体' },
    { name: '抗原抗体结合', description: '抗体与抗原特异性结合，形成沉淀' },
  ]

  const cellularSteps = [
    { name: '抗原入侵', description: '病原体感染靶细胞' },
    { name: '抗原呈递', description: '吞噬细胞处理抗原，呈递给T细胞' },
    { name: 'T细胞活化', description: '效应T细胞增殖分化' },
    { name: '识别靶细胞', description: '效应T细胞识别被感染的靶细胞' },
    { name: '裂解靶细胞', description: '效应T细胞释放淋巴因子，使靶细胞裂解' },
  ]

  const steps = immuneType === 'humoral' ? humoralSteps : cellularSteps

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  return (
    <div className="space-y-6">
      {/* 免疫类型选择 */}
      <div className="flex gap-2">
        <button
          onClick={() => { setImmuneType('humoral'); setStep(0) }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            immuneType === 'humoral'
              ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
              : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          体液免疫
        </button>
        <button
          onClick={() => { setImmuneType('cellular'); setStep(0) }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            immuneType === 'cellular'
              ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
              : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          细胞免疫
        </button>
      </div>

      {/* 当前步骤 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-[var(--text-primary)]">{steps[step].name}</h3>
          <span className="text-sm text-[var(--text-tertiary)]">{step + 1}/{steps.length}</span>
        </div>
        <p className="text-sm text-[var(--text-secondary)]">{steps[step].description}</p>
      </div>

      {/* 免疫过程动画 */}
      <div className="relative h-64 rounded-lg bg-[var(--bg-tertiary)] overflow-hidden">
        <svg viewBox="0 0 400 220" className="w-full h-full">
          {immuneType === 'humoral' ? (
            <>
              {/* 抗原 */}
              <motion.g animate={{ opacity: step >= 0 ? 1 : 0.3 }}>
                <polygon points="50,100 60,80 80,80 90,100 80,120 60,120" fill="var(--text-primary)" />
                <text x="70" y="145" textAnchor="middle" fill="var(--text-tertiary)" fontSize="9">抗原</text>
              </motion.g>

              {/* 吞噬细胞 */}
              <motion.g animate={{ opacity: step >= 1 ? 1 : 0.3 }}>
                <circle cx="130" cy="100" r="25" fill="var(--text-secondary)" />
                <text x="130" y="145" textAnchor="middle" fill="var(--text-tertiary)" fontSize="9">吞噬细胞</text>
              </motion.g>

              {/* T细胞 */}
              <motion.g animate={{ opacity: step >= 2 ? 1 : 0.3, scale: step >= 2 ? 1 : 0.8 }}>
                <circle cx="200" cy="60" r="20" fill="var(--text-tertiary)" />
                <text x="200" y="65" textAnchor="middle" fill="var(--bg-primary)" fontSize="10">T</text>
                <text x="200" y="95" textAnchor="middle" fill="var(--text-tertiary)" fontSize="9">T细胞</text>
              </motion.g>

              {/* B细胞 */}
              <motion.g animate={{ opacity: step >= 3 ? 1 : 0.3, scale: step >= 3 ? 1 : 0.8 }}>
                <circle cx="200" cy="150" r="20" fill="var(--text-tertiary)" />
                <text x="200" y="155" textAnchor="middle" fill="var(--bg-primary)" fontSize="10">B</text>
                <text x="200" y="185" textAnchor="middle" fill="var(--text-tertiary)" fontSize="9">B细胞</text>
              </motion.g>

              {/* 浆细胞 */}
              <motion.g animate={{ opacity: step >= 4 ? 1 : 0.3 }}>
                <ellipse cx="280" cy="150" rx="25" ry="20" fill="var(--text-secondary)" />
                <text x="280" y="155" textAnchor="middle" fill="var(--bg-primary)" fontSize="8">浆细胞</text>
              </motion.g>

              {/* 抗体 */}
              <motion.g animate={{ opacity: step >= 5 ? 1 : 0.3 }}>
                <text x="350" y="100" textAnchor="middle" fill="var(--text-primary)" fontSize="20">Y</text>
                <text x="350" y="120" textAnchor="middle" fill="var(--text-tertiary)" fontSize="9">抗体</text>
              </motion.g>

              {/* 箭头 */}
              {step >= 1 && <path d="M90 100 L105 100" stroke="var(--text-tertiary)" strokeWidth="2" markerEnd="url(#arrow)" />}
              {step >= 2 && <path d="M155 90 L180 70" stroke="var(--text-tertiary)" strokeWidth="2" markerEnd="url(#arrow)" />}
              {step >= 3 && <path d="M200 80 L200 130" stroke="var(--text-tertiary)" strokeWidth="2" markerEnd="url(#arrow)" />}
              {step >= 4 && <path d="M220 150 L255 150" stroke="var(--text-tertiary)" strokeWidth="2" markerEnd="url(#arrow)" />}
              {step >= 5 && <path d="M305 150 L330 120" stroke="var(--text-tertiary)" strokeWidth="2" markerEnd="url(#arrow)" />}
            </>
          ) : (
            <>
              {/* 靶细胞 */}
              <motion.g animate={{ opacity: step >= 0 ? 1 : 0.3 }}>
                <rect x="40" y="80" width="50" height="50" rx="5" fill="var(--text-tertiary)" />
                <polygon points="55,95 65,85 75,95 65,105" fill="var(--text-primary)" />
                <text x="65" y="150" textAnchor="middle" fill="var(--text-tertiary)" fontSize="9">靶细胞</text>
              </motion.g>

              {/* 吞噬细胞 */}
              <motion.g animate={{ opacity: step >= 1 ? 1 : 0.3 }}>
                <circle cx="150" cy="105" r="25" fill="var(--text-secondary)" />
                <text x="150" y="150" textAnchor="middle" fill="var(--text-tertiary)" fontSize="9">吞噬细胞</text>
              </motion.g>

              {/* T细胞 */}
              <motion.g animate={{ opacity: step >= 2 ? 1 : 0.3, scale: step >= 2 ? 1 : 0.8 }}>
                <circle cx="230" cy="105" r="20" fill="var(--text-tertiary)" />
                <text x="230" y="110" textAnchor="middle" fill="var(--bg-primary)" fontSize="10">T</text>
                <text x="230" y="145" textAnchor="middle" fill="var(--text-tertiary)" fontSize="9">效应T细胞</text>
              </motion.g>

              {/* 效应T细胞攻击 */}
              <motion.g animate={{ opacity: step >= 3 ? 1 : 0.3 }}>
                <circle cx="310" cy="105" r="20" fill="var(--text-primary)" />
                <text x="310" y="110" textAnchor="middle" fill="var(--bg-primary)" fontSize="10">T</text>
              </motion.g>

              {/* 裂解的靶细胞 */}
              <motion.g animate={{ opacity: step >= 4 ? 1 : 0.3 }}>
                <rect x="340" y="80" width="50" height="50" rx="5" fill="var(--text-tertiary)" opacity="0.5" strokeDasharray="5 3" stroke="var(--text-secondary)" />
                <text x="365" y="150" textAnchor="middle" fill="var(--text-tertiary)" fontSize="9">裂解</text>
              </motion.g>

              {/* 箭头 */}
              {step >= 1 && <path d="M90 105 L125 105" stroke="var(--text-tertiary)" strokeWidth="2" markerEnd="url(#arrow)" />}
              {step >= 2 && <path d="M175 105 L210 105" stroke="var(--text-tertiary)" strokeWidth="2" markerEnd="url(#arrow)" />}
              {step >= 3 && <path d="M250 105 L290 105" stroke="var(--text-tertiary)" strokeWidth="2" markerEnd="url(#arrow)" />}
              {step >= 4 && <path d="M330 105 L340 105" stroke="var(--text-tertiary)" strokeWidth="2" markerEnd="url(#arrow)" />}
            </>
          )}

          <defs>
            <marker id="arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="var(--text-tertiary)" />
            </marker>
          </defs>
        </svg>
      </div>

      {/* 控制按钮 */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={prevStep}
          disabled={step === 0}
          className="px-4 py-2 rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] disabled:opacity-50"
        >
          上一步
        </button>
        <button
          onClick={nextStep}
          disabled={step === steps.length - 1}
          className="px-4 py-2 rounded-lg bg-[var(--text-primary)] text-[var(--bg-primary)] font-medium disabled:opacity-50"
        >
          下一步
        </button>
      </div>

      {/* 进度条 */}
      <div className="flex gap-1">
        {steps.map((_, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            className={`flex-1 h-2 rounded-full transition-colors ${
              i <= step ? 'bg-[var(--text-primary)]' : 'bg-[var(--bg-secondary)]'
            }`}
          />
        ))}
      </div>

      {/* 免疫细胞对比 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
          <h4 className="font-medium text-[var(--text-primary)] mb-2">体液免疫</h4>
          <ul className="text-sm text-[var(--text-secondary)] space-y-1">
            <li>• 主要针对细胞外病原体</li>
            <li>• B细胞→浆细胞→抗体</li>
            <li>• 抗体与抗原结合</li>
          </ul>
        </div>
        <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
          <h4 className="font-medium text-[var(--text-primary)] mb-2">细胞免疫</h4>
          <ul className="text-sm text-[var(--text-secondary)] space-y-1">
            <li>• 主要针对细胞内病原体</li>
            <li>• T细胞→效应T细胞</li>
            <li>• 直接裂解靶细胞</li>
          </ul>
        </div>
      </div>

      {/* 知识点 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)] text-sm">
        <p className="font-medium text-[var(--text-primary)] mb-2">免疫调节要点：</p>
        <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
          <li><strong>免疫系统</strong>：免疫器官、免疫细胞、免疫活性物质</li>
          <li><strong>特异性免疫</strong>：体液免疫和细胞免疫</li>
          <li><strong>记忆细胞</strong>：二次免疫反应更快更强</li>
          <li><strong>免疫失调</strong>：过敏反应、自身免疫病、免疫缺陷病</li>
        </ul>
      </div>
    </div>
  )
}
