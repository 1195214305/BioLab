import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FluidComponent {
  id: string
  name: string
  location: string
  composition: string[]
  function: string
}

const fluidComponents: FluidComponent[] = [
  {
    id: 'plasma',
    name: '血浆',
    location: '血管内',
    composition: ['水（90%）', '蛋白质（7-9%）', '无机盐', '葡萄糖', '氨基酸', '激素', '代谢废物'],
    function: '运输营养物质、代谢废物、激素等'
  },
  {
    id: 'tissue-fluid',
    name: '组织液',
    location: '组织细胞间隙',
    composition: ['水', '无机盐', '葡萄糖', '氨基酸', '少量蛋白质'],
    function: '细胞与血浆之间物质交换的媒介'
  },
  {
    id: 'lymph',
    name: '淋巴',
    location: '淋巴管内',
    composition: ['与组织液相似', '含淋巴细胞'],
    function: '回收组织液中的蛋白质，参与免疫'
  }
]

export default function InternalEnvSimulation() {
  const [selectedFluid, setSelectedFluid] = useState<FluidComponent | null>(null)

  return (
    <div className="space-y-6">
      {/* 说明 */}
      <div className="text-sm text-[var(--text-secondary)]">
        内环境是细胞生活的液体环境，由血浆、组织液和淋巴组成
      </div>

      {/* 内环境组成图 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
        <h3 className="font-medium text-[var(--text-primary)] mb-4">内环境的组成</h3>
        <div className="relative h-72">
          <svg viewBox="0 0 400 250" className="w-full h-full">
            {/* 血管 */}
            <motion.g
              className="cursor-pointer"
              onClick={() => setSelectedFluid(fluidComponents[0])}
              whileHover={{ scale: 1.02 }}
            >
              <rect x="50" y="80" width="300" height="50" rx="25" fill="none" stroke="var(--text-primary)" strokeWidth="4" />
              <rect x="60" y="90" width="280" height="30" rx="15" fill="var(--text-primary)" opacity="0.3" />
              <text x="200" y="110" textAnchor="middle" fill="var(--text-primary)" fontSize="12" fontWeight="bold">血浆</text>

              {/* 红细胞 */}
              {[80, 140, 200, 260, 320].map((x, i) => (
                <ellipse key={i} cx={x} cy="105" rx="12" ry="8" fill="var(--text-secondary)" />
              ))}
            </motion.g>

            {/* 组织液 */}
            <motion.g
              className="cursor-pointer"
              onClick={() => setSelectedFluid(fluidComponents[1])}
              whileHover={{ scale: 1.02 }}
            >
              <rect x="80" y="140" width="240" height="60" rx="5" fill="var(--text-secondary)" opacity="0.2" stroke="var(--text-secondary)" strokeWidth="2" strokeDasharray="5 3" />
              <text x="200" y="175" textAnchor="middle" fill="var(--text-secondary)" fontSize="12" fontWeight="bold">组织液</text>

              {/* 组织细胞 */}
              {[120, 200, 280].map((x, i) => (
                <g key={i}>
                  <circle cx={x} cy="170" r="20" fill="var(--text-tertiary)" stroke="var(--text-secondary)" strokeWidth="2" />
                  <circle cx={x} cy="170" r="8" fill="var(--text-secondary)" />
                </g>
              ))}
            </motion.g>

            {/* 淋巴管 */}
            <motion.g
              className="cursor-pointer"
              onClick={() => setSelectedFluid(fluidComponents[2])}
              whileHover={{ scale: 1.02 }}
            >
              <path d="M350 150 Q370 180 350 210 L330 210 Q350 180 330 150 Z" fill="var(--text-tertiary)" opacity="0.5" stroke="var(--text-tertiary)" strokeWidth="2" />
              <text x="340" y="185" textAnchor="middle" fill="var(--text-tertiary)" fontSize="10" fontWeight="bold">淋巴</text>
            </motion.g>

            {/* 箭头标注物质交换 */}
            <g opacity="0.6">
              {/* 血浆 → 组织液 */}
              <path d="M150 130 L150 145" stroke="var(--text-secondary)" strokeWidth="2" markerEnd="url(#arrowDown)" />
              <path d="M250 145 L250 130" stroke="var(--text-secondary)" strokeWidth="2" markerEnd="url(#arrowUp)" />

              {/* 组织液 → 淋巴 */}
              <path d="M310 170 L330 170" stroke="var(--text-tertiary)" strokeWidth="2" markerEnd="url(#arrowRight)" />
            </g>

            {/* 标注 */}
            <text x="200" y="40" textAnchor="middle" fill="var(--text-primary)" fontSize="14" fontWeight="bold">细胞外液（内环境）</text>
            <text x="200" y="240" textAnchor="middle" fill="var(--text-tertiary)" fontSize="10">点击各部分查看详情</text>

            <defs>
              <marker id="arrowDown" markerWidth="10" markerHeight="7" refX="5" refY="7" orient="auto">
                <polygon points="0 0, 10 0, 5 7" fill="var(--text-secondary)" />
              </marker>
              <marker id="arrowUp" markerWidth="10" markerHeight="7" refX="5" refY="0" orient="auto">
                <polygon points="0 7, 10 7, 5 0" fill="var(--text-secondary)" />
              </marker>
              <marker id="arrowRight" markerWidth="7" markerHeight="10" refX="7" refY="5" orient="auto">
                <polygon points="0 0, 7 5, 0 10" fill="var(--text-tertiary)" />
              </marker>
            </defs>
          </svg>
        </div>
      </div>

      {/* 选中组分详情 */}
      <AnimatePresence>
        {selectedFluid && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="p-4 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--text-primary)]"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-[var(--text-primary)]">{selectedFluid.name}</h3>
              <button
                onClick={() => setSelectedFluid(null)}
                className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2 text-sm">
              <p>
                <span className="text-[var(--text-tertiary)]">位置：</span>
                <span className="text-[var(--text-secondary)]">{selectedFluid.location}</span>
              </p>
              <p>
                <span className="text-[var(--text-tertiary)]">功能：</span>
                <span className="text-[var(--text-secondary)]">{selectedFluid.function}</span>
              </p>
              <div>
                <span className="text-[var(--text-tertiary)]">主要成分：</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedFluid.composition.map((comp, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-[var(--bg-secondary)] text-xs text-[var(--text-secondary)]">
                      {comp}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 三者关系 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
        <h3 className="font-medium text-[var(--text-primary)] mb-4">三者之间的关系</h3>
        <div className="flex justify-center">
          <svg viewBox="0 0 300 150" className="w-full max-w-sm h-40">
            {/* 血浆 */}
            <circle cx="150" cy="40" r="35" fill="var(--text-primary)" opacity="0.8" />
            <text x="150" y="45" textAnchor="middle" fill="var(--bg-primary)" fontSize="12" fontWeight="bold">血浆</text>

            {/* 组织液 */}
            <circle cx="80" cy="110" r="35" fill="var(--text-secondary)" opacity="0.8" />
            <text x="80" y="115" textAnchor="middle" fill="var(--bg-primary)" fontSize="12" fontWeight="bold">组织液</text>

            {/* 淋巴 */}
            <circle cx="220" cy="110" r="35" fill="var(--text-tertiary)" opacity="0.8" />
            <text x="220" y="115" textAnchor="middle" fill="var(--bg-primary)" fontSize="12" fontWeight="bold">淋巴</text>

            {/* 双向箭头：血浆 ↔ 组织液 */}
            <path d="M120 65 L100 85" stroke="var(--text-secondary)" strokeWidth="2" markerEnd="url(#arr)" />
            <path d="M100 85 L120 65" stroke="var(--text-secondary)" strokeWidth="2" markerEnd="url(#arr)" />

            {/* 单向箭头：组织液 → 淋巴 */}
            <path d="M115 110 L185 110" stroke="var(--text-tertiary)" strokeWidth="2" markerEnd="url(#arr)" />

            {/* 单向箭头：淋巴 → 血浆 */}
            <path d="M200 80 L175 55" stroke="var(--text-primary)" strokeWidth="2" markerEnd="url(#arr)" />

            <defs>
              <marker id="arr" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="currentColor" />
              </marker>
            </defs>
          </svg>
        </div>
        <p className="text-xs text-center text-[var(--text-tertiary)] mt-2">
          血浆与组织液可双向渗透，组织液单向进入淋巴，淋巴最终汇入血浆
        </p>
      </div>

      {/* 稳态 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
        <h3 className="font-medium text-[var(--text-primary)] mb-3">内环境稳态</h3>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-3 rounded-lg bg-[var(--bg-secondary)]">
            <div className="text-lg font-bold text-[var(--text-primary)]">7.35-7.45</div>
            <div className="text-xs text-[var(--text-tertiary)]">pH值</div>
          </div>
          <div className="p-3 rounded-lg bg-[var(--bg-secondary)]">
            <div className="text-lg font-bold text-[var(--text-primary)]">37°C</div>
            <div className="text-xs text-[var(--text-tertiary)]">温度</div>
          </div>
          <div className="p-3 rounded-lg bg-[var(--bg-secondary)]">
            <div className="text-lg font-bold text-[var(--text-primary)]">0.9%</div>
            <div className="text-xs text-[var(--text-tertiary)]">渗透压(NaCl)</div>
          </div>
        </div>
        <p className="text-sm text-[var(--text-secondary)] mt-3">
          稳态是指内环境的各种化学成分和理化性质保持相对稳定的状态
        </p>
      </div>

      {/* 知识点 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)] text-sm">
        <p className="font-medium text-[var(--text-primary)] mb-2">内环境要点：</p>
        <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
          <li><strong>内环境</strong>：细胞外液，包括血浆、组织液、淋巴</li>
          <li><strong>细胞内液</strong>：不属于内环境</li>
          <li><strong>稳态调节</strong>：神经-体液-免疫调节网络</li>
          <li><strong>稳态意义</strong>：为细胞代谢提供适宜的环境</li>
          <li><strong>稳态失调</strong>：可能导致疾病，如酸中毒、碱中毒</li>
        </ul>
      </div>
    </div>
  )
}
