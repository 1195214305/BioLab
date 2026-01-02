import { useState } from 'react'
import { motion } from 'framer-motion'

interface Step {
  id: number
  name: string
  description: string
  details: string[]
}

const steps: Step[] = [
  {
    id: 1,
    name: '获取目的基因',
    description: '从供体生物中获取所需的基因',
    details: [
      '从基因文库中获取',
      '利用PCR技术扩增',
      '化学方法人工合成',
      '逆转录法（从mRNA获取）'
    ]
  },
  {
    id: 2,
    name: '构建基因表达载体',
    description: '将目的基因与载体连接形成重组DNA',
    details: [
      '用同种限制酶切割目的基因和载体',
      '用DNA连接酶连接',
      '重组载体包含：目的基因、启动子、终止子、标记基因'
    ]
  },
  {
    id: 3,
    name: '将目的基因导入受体细胞',
    description: '将重组载体导入受体细胞',
    details: [
      '植物：农杆菌转化法、基因枪法',
      '动物：显微注射法',
      '微生物：感受态细胞转化法'
    ]
  },
  {
    id: 4,
    name: '目的基因的检测与鉴定',
    description: '检测目的基因是否成功表达',
    details: [
      '分子水平：DNA检测（PCR、Southern杂交）',
      'RNA检测（Northern杂交）',
      '蛋白质检测（抗原-抗体杂交）',
      '个体水平：观察性状表现'
    ]
  }
]

export default function GeneOperationSimulation() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const startAnimation = () => {
    setIsAnimating(true)
    setCurrentStep(0)
    let step = 0
    const interval = setInterval(() => {
      step++
      setCurrentStep(step)
      if (step >= 4) {
        clearInterval(interval)
        setIsAnimating(false)
      }
    }, 2000)
  }

  return (
    <div className="space-y-6">
      {/* 说明 */}
      <div className="text-sm text-[var(--text-secondary)]">
        基因工程的基本操作步骤：获取目的基因 → 构建表达载体 → 导入受体细胞 → 检测鉴定
      </div>

      {/* 操作流程图 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-[var(--text-primary)]">基因工程操作流程</h3>
          <button
            onClick={startAnimation}
            disabled={isAnimating}
            className="px-4 py-2 rounded-lg bg-[var(--text-primary)] text-[var(--bg-primary)] text-sm font-medium disabled:opacity-50"
          >
            {isAnimating ? '演示中...' : '开始演示'}
          </button>
        </div>

        <div className="relative h-80">
          <svg viewBox="0 0 400 300" className="w-full h-full">
            {/* 步骤1：获取目的基因 */}
            <motion.g animate={{ opacity: currentStep >= 1 || !isAnimating ? 1 : 0.3 }}>
              <rect x="20" y="20" width="160" height="60" rx="8" fill="var(--text-secondary)" />
              <text x="100" y="45" textAnchor="middle" fill="var(--bg-primary)" fontSize="11" fontWeight="bold">1. 获取目的基因</text>
              <text x="100" y="62" textAnchor="middle" fill="var(--bg-primary)" fontSize="9">PCR、基因文库、人工合成</text>

              {/* DNA片段图标 */}
              <g transform="translate(30, 35)">
                <path d="M0 0 L20 0 M0 10 L20 10" stroke="var(--bg-primary)" strokeWidth="2" />
              </g>
            </motion.g>

            {/* 箭头1 */}
            <motion.path
              d="M180 50 L220 50"
              stroke="var(--text-tertiary)"
              strokeWidth="2"
              markerEnd="url(#arrowOp)"
              animate={{ opacity: currentStep >= 1 ? 1 : 0.3 }}
            />

            {/* 步骤2：构建表达载体 */}
            <motion.g animate={{ opacity: currentStep >= 2 || !isAnimating ? 1 : 0.3 }}>
              <rect x="220" y="20" width="160" height="60" rx="8" fill="var(--text-primary)" />
              <text x="300" y="45" textAnchor="middle" fill="var(--bg-primary)" fontSize="11" fontWeight="bold">2. 构建表达载体</text>
              <text x="300" y="62" textAnchor="middle" fill="var(--bg-primary)" fontSize="9">限制酶切割+连接酶连接</text>

              {/* 质粒图标 */}
              <circle cx="240" cy="50" r="12" fill="none" stroke="var(--bg-primary)" strokeWidth="2" />
            </motion.g>

            {/* 箭头2 */}
            <motion.path
              d="M300 80 L300 110"
              stroke="var(--text-tertiary)"
              strokeWidth="2"
              markerEnd="url(#arrowOp)"
              animate={{ opacity: currentStep >= 2 ? 1 : 0.3 }}
            />

            {/* 步骤3：导入受体细胞 */}
            <motion.g animate={{ opacity: currentStep >= 3 || !isAnimating ? 1 : 0.3 }}>
              <rect x="220" y="110" width="160" height="60" rx="8" fill="var(--text-tertiary)" />
              <text x="300" y="135" textAnchor="middle" fill="var(--bg-primary)" fontSize="11" fontWeight="bold">3. 导入受体细胞</text>
              <text x="300" y="152" textAnchor="middle" fill="var(--bg-primary)" fontSize="9">转化、显微注射、基因枪</text>

              {/* 细胞图标 */}
              <ellipse cx="240" cy="140" rx="12" ry="10" fill="none" stroke="var(--bg-primary)" strokeWidth="2" />
            </motion.g>

            {/* 箭头3 */}
            <motion.path
              d="M220 140 L180 140"
              stroke="var(--text-tertiary)"
              strokeWidth="2"
              markerEnd="url(#arrowOp)"
              animate={{ opacity: currentStep >= 3 ? 1 : 0.3 }}
            />

            {/* 步骤4：检测鉴定 */}
            <motion.g animate={{ opacity: currentStep >= 4 || !isAnimating ? 1 : 0.3 }}>
              <rect x="20" y="110" width="160" height="60" rx="8" fill="var(--text-secondary)" opacity="0.8" />
              <text x="100" y="135" textAnchor="middle" fill="var(--bg-primary)" fontSize="11" fontWeight="bold">4. 检测与鉴定</text>
              <text x="100" y="152" textAnchor="middle" fill="var(--bg-primary)" fontSize="9">分子水平+个体水平</text>
            </motion.g>

            {/* 成功标志 */}
            <motion.g
              animate={{ opacity: currentStep >= 4 ? 1 : 0, scale: currentStep >= 4 ? 1 : 0.5 }}
              transition={{ duration: 0.5 }}
            >
              <circle cx="100" cy="220" r="30" fill="var(--text-primary)" />
              <text x="100" y="215" textAnchor="middle" fill="var(--bg-primary)" fontSize="10">转基因</text>
              <text x="100" y="230" textAnchor="middle" fill="var(--bg-primary)" fontSize="10">生物</text>
            </motion.g>

            {/* 箭头4 */}
            <motion.path
              d="M100 170 L100 190"
              stroke="var(--text-tertiary)"
              strokeWidth="2"
              markerEnd="url(#arrowOp)"
              animate={{ opacity: currentStep >= 4 ? 1 : 0.3 }}
            />

            {/* 应用示例 */}
            <motion.g animate={{ opacity: currentStep >= 4 ? 1 : 0 }}>
              <text x="200" y="210" fill="var(--text-tertiary)" fontSize="9">应用：</text>
              <text x="200" y="225" fill="var(--text-secondary)" fontSize="9">• 抗虫棉</text>
              <text x="200" y="240" fill="var(--text-secondary)" fontSize="9">• 转基因大豆</text>
              <text x="200" y="255" fill="var(--text-secondary)" fontSize="9">• 人胰岛素</text>
              <text x="200" y="270" fill="var(--text-secondary)" fontSize="9">• 乙肝疫苗</text>
            </motion.g>

            <defs>
              <marker id="arrowOp" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="var(--text-tertiary)" />
              </marker>
            </defs>
          </svg>
        </div>
      </div>

      {/* 步骤详情 */}
      <div className="space-y-3">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            className={`p-4 rounded-lg border transition-all ${
              currentStep === index + 1
                ? 'bg-[var(--bg-tertiary)] border-[var(--text-primary)]'
                : 'bg-[var(--bg-secondary)] border-[var(--border-color)]'
            }`}
            animate={{ scale: currentStep === index + 1 ? 1.02 : 1 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                currentStep >= index + 1
                  ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
                  : 'bg-[var(--bg-tertiary)] text-[var(--text-tertiary)]'
              }`}>
                {step.id}
              </span>
              <h4 className="font-medium text-[var(--text-primary)]">{step.name}</h4>
            </div>
            <p className="text-sm text-[var(--text-secondary)] mb-2 ml-9">{step.description}</p>
            <ul className="ml-9 space-y-1">
              {step.details.map((detail, i) => (
                <li key={i} className="text-xs text-[var(--text-tertiary)]">• {detail}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* 知识点 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)] text-sm">
        <p className="font-medium text-[var(--text-primary)] mb-2">基因工程操作要点：</p>
        <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
          <li><strong>核心步骤</strong>：构建基因表达载体（重组DNA）</li>
          <li><strong>PCR</strong>：体外扩增DNA的技术，需要引物和DNA聚合酶</li>
          <li><strong>表达载体</strong>：必须有启动子、终止子才能表达</li>
          <li><strong>检测方法</strong>：DNA→PCR/Southern；RNA→Northern；蛋白质→抗原抗体</li>
        </ul>
      </div>
    </div>
  )
}
