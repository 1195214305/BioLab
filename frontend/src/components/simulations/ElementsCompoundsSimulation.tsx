import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Element {
  symbol: string
  name: string
  percentage: string
  role: string
  category: 'major' | 'minor' | 'trace'
}

const elements: Element[] = [
  { symbol: 'C', name: '碳', percentage: '18%', role: '构成有机物的骨架', category: 'major' },
  { symbol: 'H', name: '氢', percentage: '10%', role: '构成水和有机物', category: 'major' },
  { symbol: 'O', name: '氧', percentage: '65%', role: '构成水和有机物，参与呼吸', category: 'major' },
  { symbol: 'N', name: '氮', percentage: '3%', role: '构成蛋白质和核酸', category: 'major' },
  { symbol: 'P', name: '磷', percentage: '1%', role: '构成ATP、核酸、磷脂', category: 'minor' },
  { symbol: 'S', name: '硫', percentage: '0.3%', role: '构成某些氨基酸', category: 'minor' },
  { symbol: 'K', name: '钾', percentage: '0.2%', role: '维持渗透压，神经传导', category: 'minor' },
  { symbol: 'Ca', name: '钙', percentage: '1.5%', role: '构成骨骼，参与肌肉收缩', category: 'minor' },
  { symbol: 'Mg', name: '镁', percentage: '0.05%', role: '构成叶绿素，酶的辅因子', category: 'minor' },
  { symbol: 'Fe', name: '铁', percentage: '微量', role: '构成血红蛋白', category: 'trace' },
  { symbol: 'Zn', name: '锌', percentage: '微量', role: '酶的辅因子', category: 'trace' },
  { symbol: 'I', name: '碘', percentage: '微量', role: '构成甲状腺激素', category: 'trace' },
]

interface Compound {
  name: string
  type: string
  function: string
  examples: string
}

const compounds: Compound[] = [
  { name: '水', type: '无机物', function: '溶剂、参与代谢、调节体温', examples: '自由水、结合水' },
  { name: '无机盐', type: '无机物', function: '维持渗透压、酸碱平衡、构成化合物', examples: 'Na⁺、K⁺、Ca²⁺、Cl⁻' },
  { name: '糖类', type: '有机物', function: '储能、供能、构成细胞结构', examples: '葡萄糖、淀粉、纤维素' },
  { name: '脂质', type: '有机物', function: '储能、构成膜结构、调节代谢', examples: '脂肪、磷脂、固醇' },
  { name: '蛋白质', type: '有机物', function: '催化、运输、免疫、调节', examples: '酶、抗体、激素' },
  { name: '核酸', type: '有机物', function: '储存和传递遗传信息', examples: 'DNA、RNA' },
]

export default function ElementsCompoundsSimulation() {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null)
  const [selectedCompound, setSelectedCompound] = useState<Compound | null>(null)
  const [viewMode, setViewMode] = useState<'elements' | 'compounds'>('elements')

  return (
    <div className="space-y-6">
      {/* 切换视图 */}
      <div className="flex gap-2">
        <button
          onClick={() => setViewMode('elements')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            viewMode === 'elements'
              ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
              : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          组成元素
        </button>
        <button
          onClick={() => setViewMode('compounds')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            viewMode === 'compounds'
              ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
              : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          化合物
        </button>
      </div>

      {viewMode === 'elements' ? (
        <>
          {/* 元素周期表简化版 */}
          <div className="text-sm text-[var(--text-secondary)] mb-4">
            点击元素查看详细信息。颜色深浅表示含量多少。
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
            {elements.map((el) => (
              <motion.button
                key={el.symbol}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedElement(el)}
                className={`p-4 rounded-lg border transition-all ${
                  selectedElement?.symbol === el.symbol
                    ? 'border-[var(--text-primary)] bg-[var(--text-primary)] text-[var(--bg-primary)]'
                    : 'border-[var(--border-color)] bg-[var(--bg-tertiary)] hover:border-[var(--text-secondary)]'
                }`}
                style={{
                  opacity: el.category === 'major' ? 1 : el.category === 'minor' ? 0.8 : 0.6
                }}
              >
                <div className="text-2xl font-bold">{el.symbol}</div>
                <div className="text-xs mt-1">{el.name}</div>
                <div className="text-xs opacity-70">{el.percentage}</div>
              </motion.button>
            ))}
          </div>

          {/* 元素分类图例 */}
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-[var(--text-tertiary)]" style={{ opacity: 1 }} />
              <span className="text-[var(--text-secondary)]">大量元素 (C、H、O、N)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-[var(--text-tertiary)]" style={{ opacity: 0.8 }} />
              <span className="text-[var(--text-secondary)]">常量元素</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-[var(--text-tertiary)]" style={{ opacity: 0.6 }} />
              <span className="text-[var(--text-secondary)]">微量元素</span>
            </div>
          </div>

          {/* 元素详情 */}
          <AnimatePresence>
            {selectedElement && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="p-4 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-color)]"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-[var(--text-primary)] text-[var(--bg-primary)] flex items-center justify-center text-xl font-bold">
                      {selectedElement.symbol}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--text-primary)]">{selectedElement.name}</h3>
                      <p className="text-sm text-[var(--text-secondary)]">含量：{selectedElement.percentage}</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedElement(null)} className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)]">✕</button>
                </div>
                <p className="text-sm text-[var(--text-secondary)]">
                  <strong>主要作用：</strong>{selectedElement.role}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <>
          {/* 化合物列表 */}
          <div className="text-sm text-[var(--text-secondary)] mb-4">
            点击化合物查看详细信息
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {compounds.map((comp) => (
              <motion.button
                key={comp.name}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCompound(comp)}
                className={`p-4 rounded-lg border text-left transition-all ${
                  selectedCompound?.name === comp.name
                    ? 'border-[var(--text-primary)] bg-[var(--bg-tertiary)]'
                    : 'border-[var(--border-color)] bg-[var(--bg-secondary)] hover:border-[var(--text-secondary)]'
                }`}
              >
                <div className="font-medium text-[var(--text-primary)]">{comp.name}</div>
                <div className="text-xs text-[var(--text-tertiary)] mt-1">{comp.type}</div>
              </motion.button>
            ))}
          </div>

          {/* 化合物详情 */}
          <AnimatePresence>
            {selectedCompound && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="p-4 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-color)]"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-[var(--text-primary)]">{selectedCompound.name}</h3>
                  <button onClick={() => setSelectedCompound(null)} className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)]">✕</button>
                </div>
                <div className="space-y-2 text-sm">
                  <p><span className="text-[var(--text-tertiary)]">类型：</span><span className="text-[var(--text-secondary)]">{selectedCompound.type}</span></p>
                  <p><span className="text-[var(--text-tertiary)]">功能：</span><span className="text-[var(--text-secondary)]">{selectedCompound.function}</span></p>
                  <p><span className="text-[var(--text-tertiary)]">举例：</span><span className="text-[var(--text-secondary)]">{selectedCompound.examples}</span></p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {/* 知识点 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)] text-sm">
        <p className="font-medium text-[var(--text-primary)] mb-2">要点总结：</p>
        <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
          <li><strong>最基本元素</strong>：C（碳是构成有机物的骨架）</li>
          <li><strong>大量元素</strong>：C、H、O、N（占细胞鲜重约97%）</li>
          <li><strong>含量最多</strong>：O（鲜重）、C（干重）</li>
          <li><strong>化合物含量</strong>：水最多（鲜重），蛋白质最多（干重）</li>
        </ul>
      </div>
    </div>
  )
}
