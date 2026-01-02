import { useState } from 'react'
import { motion } from 'framer-motion'

interface Tool {
  id: string
  name: string
  type: string
  function: string
  example: string
  details: string[]
}

const tools: Tool[] = [
  {
    id: 'restriction',
    name: '限制性内切酶',
    type: '分子剪刀',
    function: '识别特定DNA序列并切割',
    example: 'EcoRI、BamHI、HindIII',
    details: [
      '来源：主要从细菌中提取',
      '特点：识别特定的核苷酸序列（4-8个碱基）',
      '切割方式：产生黏性末端或平末端',
      '作用：切割目的基因和载体'
    ]
  },
  {
    id: 'ligase',
    name: 'DNA连接酶',
    type: '分子针线',
    function: '连接DNA片段',
    example: 'T4 DNA连接酶、E.coli DNA连接酶',
    details: [
      '作用：连接磷酸二酯键',
      '连接黏性末端效率高于平末端',
      '需要ATP提供能量',
      '用于构建重组DNA分子'
    ]
  },
  {
    id: 'vector',
    name: '载体',
    type: '分子运输车',
    function: '携带目的基因进入受体细胞',
    example: '质粒、噬菌体、动植物病毒',
    details: [
      '必须能自我复制',
      '有标记基因（如抗性基因）',
      '有多个限制酶切点',
      '对受体细胞无害'
    ]
  }
]

export default function GeneToolsSimulation() {
  const [selectedTool, setSelectedTool] = useState<Tool>(tools[0])
  const [, setShowCutting] = useState(false)
  const [cutStep, setCutStep] = useState(0)

  const startCutting = () => {
    setShowCutting(true)
    setCutStep(0)
    let step = 0
    const interval = setInterval(() => {
      step++
      setCutStep(step)
      if (step >= 4) {
        clearInterval(interval)
      }
    }, 800)
  }

  return (
    <div className="space-y-6">
      {/* 说明 */}
      <div className="text-sm text-[var(--text-secondary)]">
        基因工程的三大工具：限制性内切酶、DNA连接酶、载体
      </div>

      {/* 工具选择 */}
      <div className="flex gap-2">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => { setSelectedTool(tool); setShowCutting(false); setCutStep(0) }}
            className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedTool.id === tool.id
                ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
                : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            {tool.name}
          </button>
        ))}
      </div>

      {/* 工具详情 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
        <div className="flex items-center gap-3 mb-3">
          <h3 className="font-medium text-[var(--text-primary)]">{selectedTool.name}</h3>
          <span className="px-2 py-0.5 rounded bg-[var(--bg-secondary)] text-xs text-[var(--text-tertiary)]">
            {selectedTool.type}
          </span>
        </div>
        <p className="text-sm text-[var(--text-secondary)] mb-3">{selectedTool.function}</p>
        <p className="text-sm mb-3">
          <span className="text-[var(--text-tertiary)]">常见例子：</span>
          <span className="text-[var(--text-secondary)]">{selectedTool.example}</span>
        </p>
        <ul className="space-y-1">
          {selectedTool.details.map((detail, i) => (
            <li key={i} className="text-sm text-[var(--text-secondary)] flex items-start gap-2">
              <span className="text-[var(--text-tertiary)]">•</span>
              {detail}
            </li>
          ))}
        </ul>
      </div>

      {/* 限制酶切割演示 */}
      {selectedTool.id === 'restriction' && (
        <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-[var(--text-primary)]">EcoRI 切割演示</h3>
            <button
              onClick={startCutting}
              className="px-4 py-2 rounded-lg bg-[var(--text-primary)] text-[var(--bg-primary)] text-sm font-medium"
            >
              开始切割
            </button>
          </div>

          <div className="relative h-48">
            <svg viewBox="0 0 400 160" className="w-full h-full">
              {/* 识别序列标注 */}
              <text x="200" y="20" textAnchor="middle" fill="var(--text-tertiary)" fontSize="10">
                EcoRI 识别序列: 5'-GAATTC-3'
              </text>

              {/* DNA双链 - 上链 */}
              <g>
                <text x="50" y="55" fill="var(--text-tertiary)" fontSize="10">5'</text>
                {['G', 'A', 'A', 'T', 'T', 'C'].map((base, i) => (
                  <motion.text
                    key={`top-${i}`}
                    x={80 + i * 40}
                    y="55"
                    fill={i >= 1 && i <= 4 ? 'var(--text-primary)' : 'var(--text-secondary)'}
                    fontSize="14"
                    fontWeight="bold"
                    animate={cutStep >= 2 && i >= 1 ? { x: 80 + i * 40 + (i <= 1 ? -20 : 20) } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    {base}
                  </motion.text>
                ))}
                <text x="330" y="55" fill="var(--text-tertiary)" fontSize="10">3'</text>
              </g>

              {/* 氢键 */}
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <motion.line
                  key={`bond-${i}`}
                  x1={80 + i * 40}
                  y1="65"
                  x2={80 + i * 40}
                  y2="85"
                  stroke="var(--text-tertiary)"
                  strokeWidth="1"
                  strokeDasharray="3 2"
                  animate={cutStep >= 2 && i >= 1 ? {
                    x1: 80 + i * 40 + (i <= 1 ? -20 : 20),
                    x2: 80 + i * 40 + (i <= 1 ? -20 : 20)
                  } : {}}
                  transition={{ duration: 0.5 }}
                />
              ))}

              {/* DNA双链 - 下链 */}
              <g>
                <text x="50" y="100" fill="var(--text-tertiary)" fontSize="10">3'</text>
                {['C', 'T', 'T', 'A', 'A', 'G'].map((base, i) => (
                  <motion.text
                    key={`bottom-${i}`}
                    x={80 + i * 40}
                    y="100"
                    fill={i >= 1 && i <= 4 ? 'var(--text-primary)' : 'var(--text-secondary)'}
                    fontSize="14"
                    fontWeight="bold"
                    animate={cutStep >= 2 && i <= 4 ? { x: 80 + i * 40 + (i <= 4 ? -20 : 20) } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    {base}
                  </motion.text>
                ))}
                <text x="330" y="100" fill="var(--text-tertiary)" fontSize="10">5'</text>
              </g>

              {/* 切割位置标记 */}
              <motion.g
                animate={{ opacity: cutStep >= 1 ? 1 : 0 }}
              >
                <line x1="100" y1="45" x2="100" y2="110" stroke="var(--text-primary)" strokeWidth="2" strokeDasharray="5 3" />
                <line x1="260" y1="45" x2="260" y2="110" stroke="var(--text-primary)" strokeWidth="2" strokeDasharray="5 3" />
                <text x="180" y="130" textAnchor="middle" fill="var(--text-primary)" fontSize="10">切割位点</text>
              </motion.g>

              {/* 黏性末端标注 */}
              <motion.g animate={{ opacity: cutStep >= 3 ? 1 : 0 }}>
                <text x="100" y="145" textAnchor="middle" fill="var(--text-tertiary)" fontSize="9">
                  黏性末端 (5'-AATT)
                </text>
                <text x="280" y="145" textAnchor="middle" fill="var(--text-tertiary)" fontSize="9">
                  黏性末端 (5'-AATT)
                </text>
              </motion.g>
            </svg>
          </div>

          <p className="text-xs text-center text-[var(--text-tertiary)]">
            EcoRI在G和A之间切割，产生4个碱基的黏性末端
          </p>
        </div>
      )}

      {/* DNA连接酶演示 */}
      {selectedTool.id === 'ligase' && (
        <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
          <h3 className="font-medium text-[var(--text-primary)] mb-4">DNA连接酶作用</h3>
          <div className="relative h-40">
            <svg viewBox="0 0 400 120" className="w-full h-full">
              {/* 两个DNA片段 */}
              <g>
                <rect x="30" y="40" width="120" height="40" rx="5" fill="var(--text-secondary)" />
                <text x="90" y="65" textAnchor="middle" fill="var(--bg-primary)" fontSize="10">DNA片段1</text>
                <text x="145" y="55" fill="var(--text-primary)" fontSize="10">AATT</text>
              </g>

              <g>
                <rect x="250" y="40" width="120" height="40" rx="5" fill="var(--text-tertiary)" />
                <text x="310" y="65" textAnchor="middle" fill="var(--bg-primary)" fontSize="10">DNA片段2</text>
                <text x="245" y="55" fill="var(--text-primary)" fontSize="10">TTAA</text>
              </g>

              {/* 连接酶 */}
              <motion.g
                animate={{ x: [0, 20, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ellipse cx="200" cy="60" rx="25" ry="15" fill="var(--text-primary)" />
                <text x="200" y="64" textAnchor="middle" fill="var(--bg-primary)" fontSize="8">连接酶</text>
              </motion.g>

              {/* 箭头 */}
              <path d="M200 85 L200 100" stroke="var(--text-secondary)" strokeWidth="2" markerEnd="url(#arrL)" />

              {/* 连接后 */}
              <rect x="100" y="105" width="200" height="15" rx="3" fill="var(--text-secondary)" />

              <defs>
                <marker id="arrL" markerWidth="8" markerHeight="6" refX="4" refY="3" orient="auto">
                  <polygon points="0 0, 8 3, 0 6" fill="var(--text-secondary)" />
                </marker>
              </defs>
            </svg>
          </div>
          <p className="text-xs text-center text-[var(--text-tertiary)]">
            DNA连接酶连接磷酸二酯键，将两个DNA片段连接成一个
          </p>
        </div>
      )}

      {/* 载体结构 */}
      {selectedTool.id === 'vector' && (
        <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
          <h3 className="font-medium text-[var(--text-primary)] mb-4">质粒载体结构</h3>
          <div className="relative h-56">
            <svg viewBox="0 0 300 200" className="w-full h-full">
              {/* 质粒环 */}
              <circle cx="150" cy="100" r="70" fill="none" stroke="var(--text-secondary)" strokeWidth="8" />

              {/* 复制原点 */}
              <g>
                <circle cx="150" cy="30" r="12" fill="var(--text-primary)" />
                <text x="150" y="34" textAnchor="middle" fill="var(--bg-primary)" fontSize="8">ori</text>
                <text x="150" y="10" textAnchor="middle" fill="var(--text-tertiary)" fontSize="8">复制原点</text>
              </g>

              {/* 抗性基因 */}
              <g>
                <rect x="200" y="85" width="40" height="30" rx="3" fill="var(--text-tertiary)" />
                <text x="220" y="105" textAnchor="middle" fill="var(--bg-primary)" fontSize="8">Amp</text>
                <text x="260" y="100" fill="var(--text-tertiary)" fontSize="8">抗性基因</text>
              </g>

              {/* 多克隆位点 */}
              <g>
                <rect x="60" y="85" width="40" height="30" rx="3" fill="var(--text-secondary)" />
                <text x="80" y="105" textAnchor="middle" fill="var(--bg-primary)" fontSize="8">MCS</text>
                <text x="20" y="100" fill="var(--text-tertiary)" fontSize="8">多克隆位点</text>
              </g>

              {/* 另一个标记基因 */}
              <g>
                <rect x="130" y="150" width="40" height="25" rx="3" fill="var(--text-tertiary)" />
                <text x="150" y="167" textAnchor="middle" fill="var(--bg-primary)" fontSize="8">lacZ</text>
                <text x="150" y="190" textAnchor="middle" fill="var(--text-tertiary)" fontSize="8">标记基因</text>
              </g>
            </svg>
          </div>
          <p className="text-xs text-center text-[var(--text-tertiary)]">
            质粒是最常用的载体，具有复制原点、标记基因和多克隆位点
          </p>
        </div>
      )}

      {/* 知识点 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)] text-sm">
        <p className="font-medium text-[var(--text-primary)] mb-2">基因工程工具要点：</p>
        <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
          <li><strong>限制酶</strong>：识别特定序列，产生黏性末端或平末端</li>
          <li><strong>DNA连接酶</strong>：连接磷酸二酯键，不连接氢键</li>
          <li><strong>载体条件</strong>：能复制、有标记、有切点、安全</li>
          <li><strong>常用载体</strong>：质粒（原核）、噬菌体、病毒</li>
        </ul>
      </div>
    </div>
  )
}
