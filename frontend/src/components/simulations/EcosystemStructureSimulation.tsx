import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Organism {
  id: string
  name: string
  type: 'producer' | 'consumer' | 'decomposer'
  level?: number
  description: string
}

const organisms: Organism[] = [
  { id: 'plant', name: '绿色植物', type: 'producer', description: '通过光合作用制造有机物' },
  { id: 'herbivore', name: '植食动物', type: 'consumer', level: 1, description: '以植物为食的动物' },
  { id: 'carnivore1', name: '初级肉食动物', type: 'consumer', level: 2, description: '以植食动物为食' },
  { id: 'carnivore2', name: '次级肉食动物', type: 'consumer', level: 3, description: '以初级肉食动物为食' },
  { id: 'decomposer', name: '分解者', type: 'decomposer', description: '分解动植物遗体和排泄物' }
]

export default function EcosystemStructureSimulation() {
  const [selectedOrganism, setSelectedOrganism] = useState<Organism | null>(null)
  const [showFoodWeb, setShowFoodWeb] = useState(false)

  return (
    <div className="space-y-6">
      {/* 说明 */}
      <div className="text-sm text-[var(--text-secondary)]">
        生态系统由生物群落和无机环境组成，包括生产者、消费者、分解者和非生物成分
      </div>

      {/* 生态系统组成 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
        <h3 className="font-medium text-[var(--text-primary)] mb-4">生态系统的组成成分</h3>
        <div className="relative h-72">
          <svg viewBox="0 0 400 260" className="w-full h-full">
            {/* 非生物成分 - 底部 */}
            <rect x="20" y="200" width="360" height="50" rx="5" fill="var(--bg-secondary)" stroke="var(--text-tertiary)" strokeWidth="2" />
            <text x="200" y="230" textAnchor="middle" fill="var(--text-tertiary)" fontSize="12">非生物成分（阳光、水、空气、无机盐等）</text>

            {/* 生产者 */}
            <motion.g
              className="cursor-pointer"
              onClick={() => setSelectedOrganism(organisms[0])}
              whileHover={{ scale: 1.05 }}
            >
              <rect x="150" y="140" width="100" height="50" rx="5" fill="var(--text-secondary)" />
              <text x="200" y="170" textAnchor="middle" fill="var(--bg-primary)" fontSize="11" fontWeight="bold">生产者</text>
              {/* 植物图标 */}
              <path d="M200 145 L200 155 M195 150 L200 145 L205 150" stroke="var(--bg-primary)" strokeWidth="2" fill="none" />
            </motion.g>

            {/* 消费者 */}
            <motion.g
              className="cursor-pointer"
              onClick={() => setSelectedOrganism(organisms[1])}
              whileHover={{ scale: 1.05 }}
            >
              <rect x="260" y="80" width="120" height="50" rx="5" fill="var(--text-primary)" />
              <text x="320" y="100" textAnchor="middle" fill="var(--bg-primary)" fontSize="11" fontWeight="bold">消费者</text>
              <text x="320" y="118" textAnchor="middle" fill="var(--bg-primary)" fontSize="9">（初级、次级、三级...）</text>
            </motion.g>

            {/* 分解者 */}
            <motion.g
              className="cursor-pointer"
              onClick={() => setSelectedOrganism(organisms[4])}
              whileHover={{ scale: 1.05 }}
            >
              <rect x="20" y="80" width="100" height="50" rx="5" fill="var(--text-tertiary)" />
              <text x="70" y="110" textAnchor="middle" fill="var(--bg-primary)" fontSize="11" fontWeight="bold">分解者</text>
            </motion.g>

            {/* 箭头 - 物质和能量流动 */}
            {/* 生产者 → 消费者 */}
            <path d="M250 155 L280 120" stroke="var(--text-secondary)" strokeWidth="2" markerEnd="url(#arrowE)" />

            {/* 生产者 → 分解者 */}
            <path d="M150 155 L120 120" stroke="var(--text-secondary)" strokeWidth="2" markerEnd="url(#arrowE)" />

            {/* 消费者 → 分解者 */}
            <path d="M260 100 L120 100" stroke="var(--text-secondary)" strokeWidth="2" markerEnd="url(#arrowE)" />

            {/* 非生物 → 生产者 */}
            <path d="M200 200 L200 190" stroke="var(--text-tertiary)" strokeWidth="2" markerEnd="url(#arrowE)" />

            {/* 分解者 → 非生物 */}
            <path d="M70 130 L70 200" stroke="var(--text-tertiary)" strokeWidth="2" markerEnd="url(#arrowE)" />

            {/* 标题 */}
            <text x="200" y="30" textAnchor="middle" fill="var(--text-primary)" fontSize="14" fontWeight="bold">生态系统的组成</text>

            {/* 图例 */}
            <g transform="translate(300, 180)">
              <text x="0" y="0" fill="var(--text-tertiary)" fontSize="9">→ 物质和能量流动</text>
            </g>

            <defs>
              <marker id="arrowE" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="var(--text-secondary)" />
              </marker>
            </defs>
          </svg>
        </div>
      </div>

      {/* 选中生物详情 */}
      <AnimatePresence>
        {selectedOrganism && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="p-4 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--text-primary)]"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-[var(--text-primary)]">{selectedOrganism.name}</h3>
              <button
                onClick={() => setSelectedOrganism(null)}
                className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
              >
                ✕
              </button>
            </div>
            <p className="text-sm text-[var(--text-secondary)]">{selectedOrganism.description}</p>
            {selectedOrganism.level && (
              <p className="text-sm text-[var(--text-tertiary)] mt-1">
                营养级：第 {selectedOrganism.level + 1} 营养级
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 食物链和食物网 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-[var(--text-primary)]">营养结构</h3>
          <button
            onClick={() => setShowFoodWeb(!showFoodWeb)}
            className="px-3 py-1 rounded-lg bg-[var(--text-primary)] text-[var(--bg-primary)] text-sm"
          >
            {showFoodWeb ? '食物链' : '食物网'}
          </button>
        </div>

        {!showFoodWeb ? (
          // 食物链
          <div className="space-y-4">
            <p className="text-sm text-[var(--text-secondary)]">食物链示例：</p>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {['草', '兔', '狐狸', '狼'].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="px-4 py-2 rounded-lg bg-[var(--bg-secondary)] text-[var(--text-primary)] font-medium">
                    {item}
                  </div>
                  {i < 3 && <span className="text-[var(--text-secondary)]">→</span>}
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-8 text-xs text-[var(--text-tertiary)]">
              <span>第一营养级</span>
              <span>第二营养级</span>
              <span>第三营养级</span>
              <span>第四营养级</span>
            </div>
          </div>
        ) : (
          // 食物网
          <div className="relative h-48">
            <svg viewBox="0 0 350 180" className="w-full h-full">
              {/* 生产者 */}
              <g>
                <circle cx="80" cy="150" r="25" fill="var(--text-secondary)" />
                <text x="80" y="155" textAnchor="middle" fill="var(--bg-primary)" fontSize="10">草</text>
              </g>
              <g>
                <circle cx="180" cy="150" r="25" fill="var(--text-secondary)" />
                <text x="180" y="155" textAnchor="middle" fill="var(--bg-primary)" fontSize="10">树</text>
              </g>

              {/* 初级消费者 */}
              <g>
                <circle cx="50" cy="90" r="20" fill="var(--text-tertiary)" />
                <text x="50" y="95" textAnchor="middle" fill="var(--bg-primary)" fontSize="9">兔</text>
              </g>
              <g>
                <circle cx="130" cy="90" r="20" fill="var(--text-tertiary)" />
                <text x="130" y="95" textAnchor="middle" fill="var(--bg-primary)" fontSize="9">鼠</text>
              </g>
              <g>
                <circle cx="210" cy="90" r="20" fill="var(--text-tertiary)" />
                <text x="210" y="95" textAnchor="middle" fill="var(--bg-primary)" fontSize="9">虫</text>
              </g>

              {/* 次级消费者 */}
              <g>
                <circle cx="90" cy="35" r="20" fill="var(--text-primary)" />
                <text x="90" y="40" textAnchor="middle" fill="var(--bg-primary)" fontSize="9">蛇</text>
              </g>
              <g>
                <circle cx="170" cy="35" r="20" fill="var(--text-primary)" />
                <text x="170" y="40" textAnchor="middle" fill="var(--bg-primary)" fontSize="9">鸟</text>
              </g>

              {/* 顶级消费者 */}
              <g>
                <circle cx="280" cy="60" r="25" fill="var(--text-primary)" opacity="0.8" />
                <text x="280" y="65" textAnchor="middle" fill="var(--bg-primary)" fontSize="10">鹰</text>
              </g>

              {/* 食物链箭头 */}
              <g stroke="var(--text-tertiary)" strokeWidth="1.5" fill="none">
                <path d="M80 125 L55 110" markerEnd="url(#arrF)" />
                <path d="M80 125 L125 110" markerEnd="url(#arrF)" />
                <path d="M180 125 L135 110" markerEnd="url(#arrF)" />
                <path d="M180 125 L205 110" markerEnd="url(#arrF)" />
                <path d="M55 70 L85 55" markerEnd="url(#arrF)" />
                <path d="M130 70 L95 55" markerEnd="url(#arrF)" />
                <path d="M130 70 L165 55" markerEnd="url(#arrF)" />
                <path d="M210 70 L175 55" markerEnd="url(#arrF)" />
                <path d="M110 35 L255 55" markerEnd="url(#arrF)" />
                <path d="M190 35 L260 50" markerEnd="url(#arrF)" />
                <path d="M70 90 L260 70" markerEnd="url(#arrF)" />
              </g>

              <defs>
                <marker id="arrF" markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto">
                  <polygon points="0 0, 6 2.5, 0 5" fill="var(--text-tertiary)" />
                </marker>
              </defs>
            </svg>
          </div>
        )}
      </div>

      {/* 生态系统功能 */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 rounded-lg bg-[var(--bg-tertiary)] text-center">
          <div className="text-xl mb-1">⚡</div>
          <div className="text-sm font-medium text-[var(--text-primary)]">能量流动</div>
          <div className="text-xs text-[var(--text-tertiary)]">单向流动、逐级递减</div>
        </div>
        <div className="p-3 rounded-lg bg-[var(--bg-tertiary)] text-center">
          <div className="text-xl mb-1">🔄</div>
          <div className="text-sm font-medium text-[var(--text-primary)]">物质循环</div>
          <div className="text-xs text-[var(--text-tertiary)]">循环往复、全球性</div>
        </div>
        <div className="p-3 rounded-lg bg-[var(--bg-tertiary)] text-center">
          <div className="text-xl mb-1">📡</div>
          <div className="text-sm font-medium text-[var(--text-primary)]">信息传递</div>
          <div className="text-xs text-[var(--text-tertiary)]">双向传递、调节作用</div>
        </div>
      </div>

      {/* 知识点 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)] text-sm">
        <p className="font-medium text-[var(--text-primary)] mb-2">生态系统结构要点：</p>
        <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
          <li><strong>生产者</strong>：自养生物，主要是绿色植物</li>
          <li><strong>消费者</strong>：异养生物，直接或间接以生产者为食</li>
          <li><strong>分解者</strong>：主要是细菌和真菌，分解有机物</li>
          <li><strong>食物链</strong>：起点是生产者，终点是最高营养级</li>
          <li><strong>营养级</strong>：生产者是第一营养级</li>
        </ul>
      </div>
    </div>
  )
}
