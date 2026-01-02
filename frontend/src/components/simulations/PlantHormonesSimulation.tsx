import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Hormone {
  id: string
  name: string
  synthesisLocation: string
  mainFunctions: string[]
  applications: string[]
  color: string
}

const hormones: Hormone[] = [
  {
    id: 'gibberellin',
    name: '赤霉素（GA）',
    synthesisLocation: '未成熟的种子、幼根、幼叶',
    mainFunctions: [
      '促进细胞伸长，引起植株增高',
      '促进种子萌发和果实发育',
      '解除种子和块茎的休眠',
      '诱导开花（某些植物）'
    ],
    applications: [
      '促进矮生植物茎秆伸长',
      '打破种子休眠，促进萌发',
      '促进无籽果实形成',
      '啤酒酿造中促进大麦种子萌发'
    ],
    color: '#22c55e'
  },
  {
    id: 'cytokinin',
    name: '细胞分裂素（CTK）',
    synthesisLocation: '根尖、萌发的种子',
    mainFunctions: [
      '促进细胞分裂',
      '诱导芽的分化',
      '延缓叶片衰老',
      '促进侧芽发育（解除顶端优势）'
    ],
    applications: [
      '组织培养中诱导芽的分化',
      '蔬菜保鲜，延缓衰老',
      '促进侧枝生长'
    ],
    color: '#3b82f6'
  },
  {
    id: 'abscisic',
    name: '脱落酸（ABA）',
    synthesisLocation: '根冠、萎蔫的叶片',
    mainFunctions: [
      '抑制细胞分裂和种子萌发',
      '促进叶和果实的衰老与脱落',
      '促进气孔关闭（抗旱）',
      '增强植物抗逆性'
    ],
    applications: [
      '促进果实脱落，便于采收',
      '抑制种子萌发，延长储存',
      '提高植物抗旱、抗寒能力'
    ],
    color: '#f59e0b'
  },
  {
    id: 'ethylene',
    name: '乙烯（ETH）',
    synthesisLocation: '植物各部位，成熟果实中较多',
    mainFunctions: [
      '促进果实成熟',
      '促进叶片和果实脱落',
      '促进开花（某些植物）',
      '三重反应（抑制伸长、促进加粗、横向生长）'
    ],
    applications: [
      '催熟水果（香蕉、番茄等）',
      '促进菠萝等植物开花',
      '促进橡胶树排胶'
    ],
    color: '#ef4444'
  }
]

export default function PlantHormonesSimulation() {
  const [selectedHormone, setSelectedHormone] = useState<Hormone>(hormones[0])
  const [showInteraction, setShowInteraction] = useState(false)

  return (
    <div className="space-y-6">
      {/* 说明 */}
      <div className="text-sm text-[var(--text-secondary)]">
        植物体内除生长素外，还有赤霉素、细胞分裂素、脱落酸、乙烯等多种激素共同调节生命活动
      </div>

      {/* 激素选择 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {hormones.map((h) => (
          <button
            key={h.id}
            onClick={() => setSelectedHormone(h)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedHormone.id === h.id
                ? 'text-[var(--bg-primary)]'
                : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
            style={{
              backgroundColor: selectedHormone.id === h.id ? h.color : undefined
            }}
          >
            {h.name.split('（')[0]}
          </button>
        ))}
      </div>

      {/* 激素详情 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedHormone.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="p-4 rounded-lg bg-[var(--bg-tertiary)]"
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: selectedHormone.color }}
            />
            <h3 className="font-medium text-[var(--text-primary)]">{selectedHormone.name}</h3>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-[var(--text-tertiary)] mb-1">合成部位</p>
              <p className="text-sm text-[var(--text-secondary)]">{selectedHormone.synthesisLocation}</p>
            </div>

            <div>
              <p className="text-sm text-[var(--text-tertiary)] mb-2">主要功能</p>
              <ul className="space-y-1">
                {selectedHormone.mainFunctions.map((func, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-sm text-[var(--text-secondary)] flex items-start gap-2"
                  >
                    <span style={{ color: selectedHormone.color }}>•</span>
                    {func}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-sm text-[var(--text-tertiary)] mb-2">实际应用</p>
              <div className="flex flex-wrap gap-2">
                {selectedHormone.applications.map((app, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="px-2 py-1 rounded text-xs text-[var(--text-secondary)] bg-[var(--bg-secondary)]"
                  >
                    {app}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 激素作用演示 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
        <h3 className="font-medium text-[var(--text-primary)] mb-4">激素作用演示</h3>
        <div className="relative h-56">
          <svg viewBox="0 0 400 200" className="w-full h-full">
            {selectedHormone.id === 'gibberellin' && (
              <>
                {/* 赤霉素 - 促进茎伸长 */}
                <g>
                  {/* 矮生植物 */}
                  <rect x="60" y="140" width="60" height="50" rx="3" fill="var(--text-tertiary)" opacity="0.5" />
                  <rect x="85" y="100" width="10" height="40" fill="#22c55e" opacity="0.6" />
                  <ellipse cx="90" cy="90" rx="20" ry="15" fill="#22c55e" />
                  <text x="90" y="180" textAnchor="middle" fill="var(--text-tertiary)" fontSize="10">处理前</text>
                </g>

                <text x="200" y="100" textAnchor="middle" fill="var(--text-secondary)" fontSize="12">+ 赤霉素</text>
                <path d="M150 100 L250 100" stroke="var(--text-tertiary)" strokeWidth="2" markerEnd="url(#arrowH)" />

                <g>
                  {/* 高大植物 */}
                  <rect x="280" y="140" width="60" height="50" rx="3" fill="var(--text-tertiary)" opacity="0.5" />
                  <motion.rect
                    x="305"
                    y="50"
                    width="10"
                    height="90"
                    fill="#22c55e"
                    initial={{ height: 40, y: 100 }}
                    animate={{ height: 90, y: 50 }}
                    transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse', repeatDelay: 1 }}
                  />
                  <ellipse cx="310" cy="40" rx="25" ry="18" fill="#22c55e" />
                  <text x="310" y="180" textAnchor="middle" fill="var(--text-tertiary)" fontSize="10">处理后</text>
                </g>
              </>
            )}

            {selectedHormone.id === 'cytokinin' && (
              <>
                {/* 细胞分裂素 - 促进细胞分裂 */}
                <g>
                  <circle cx="80" cy="100" r="30" fill="var(--text-tertiary)" stroke="#3b82f6" strokeWidth="2" />
                  <circle cx="80" cy="100" r="10" fill="#3b82f6" />
                  <text x="80" y="150" textAnchor="middle" fill="var(--text-tertiary)" fontSize="10">单个细胞</text>
                </g>

                <text x="200" y="80" textAnchor="middle" fill="var(--text-secondary)" fontSize="12">+ 细胞分裂素</text>
                <path d="M130 100 L250 100" stroke="var(--text-tertiary)" strokeWidth="2" markerEnd="url(#arrowH)" />

                <g>
                  {/* 多个细胞 */}
                  {[0, 1, 2, 3].map((i) => (
                    <motion.g
                      key={i}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: i * 0.3, duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                    >
                      <circle
                        cx={290 + (i % 2) * 40}
                        cy={80 + Math.floor(i / 2) * 40}
                        r="18"
                        fill="var(--text-tertiary)"
                        stroke="#3b82f6"
                        strokeWidth="2"
                      />
                      <circle
                        cx={290 + (i % 2) * 40}
                        cy={80 + Math.floor(i / 2) * 40}
                        r="6"
                        fill="#3b82f6"
                      />
                    </motion.g>
                  ))}
                  <text x="310" y="170" textAnchor="middle" fill="var(--text-tertiary)" fontSize="10">细胞分裂</text>
                </g>
              </>
            )}

            {selectedHormone.id === 'abscisic' && (
              <>
                {/* 脱落酸 - 促进气孔关闭 */}
                <g>
                  {/* 开放的气孔 */}
                  <ellipse cx="80" cy="100" rx="35" ry="25" fill="none" stroke="var(--text-secondary)" strokeWidth="3" />
                  <ellipse cx="80" cy="100" rx="15" ry="20" fill="var(--bg-secondary)" />
                  <text x="80" y="145" textAnchor="middle" fill="var(--text-tertiary)" fontSize="10">气孔开放</text>
                  <text x="80" y="160" textAnchor="middle" fill="var(--text-tertiary)" fontSize="9">（蒸腾作用强）</text>
                </g>

                <text x="200" y="80" textAnchor="middle" fill="var(--text-secondary)" fontSize="12">+ 脱落酸</text>
                <text x="200" y="95" textAnchor="middle" fill="var(--text-tertiary)" fontSize="10">（干旱胁迫）</text>
                <path d="M130 100 L260 100" stroke="var(--text-tertiary)" strokeWidth="2" markerEnd="url(#arrowH)" />

                <g>
                  {/* 关闭的气孔 */}
                  <motion.ellipse
                    cx="320"
                    cy="100"
                    rx="35"
                    ry="25"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="3"
                  />
                  <motion.ellipse
                    cx="320"
                    cy="100"
                    rx="3"
                    ry="20"
                    fill="var(--bg-secondary)"
                    initial={{ rx: 15 }}
                    animate={{ rx: 3 }}
                    transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse', repeatDelay: 1 }}
                  />
                  <text x="320" y="145" textAnchor="middle" fill="var(--text-tertiary)" fontSize="10">气孔关闭</text>
                  <text x="320" y="160" textAnchor="middle" fill="var(--text-tertiary)" fontSize="9">（减少水分散失）</text>
                </g>
              </>
            )}

            {selectedHormone.id === 'ethylene' && (
              <>
                {/* 乙烯 - 促进果实成熟 */}
                <g>
                  {/* 未成熟果实 */}
                  <ellipse cx="80" cy="100" rx="30" ry="25" fill="#84cc16" />
                  <path d="M80 75 L80 65 Q85 60 90 65" stroke="#22c55e" strokeWidth="2" fill="none" />
                  <text x="80" y="145" textAnchor="middle" fill="var(--text-tertiary)" fontSize="10">未成熟（绿色）</text>
                </g>

                <text x="200" y="80" textAnchor="middle" fill="var(--text-secondary)" fontSize="12">+ 乙烯</text>
                <path d="M130 100 L260 100" stroke="var(--text-tertiary)" strokeWidth="2" markerEnd="url(#arrowH)" />

                <g>
                  {/* 成熟果实 */}
                  <motion.ellipse
                    cx="320"
                    cy="100"
                    rx="30"
                    ry="25"
                    initial={{ fill: '#84cc16' }}
                    animate={{ fill: '#ef4444' }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                  />
                  <path d="M320 75 L320 65 Q325 60 330 65" stroke="#22c55e" strokeWidth="2" fill="none" />
                  <text x="320" y="145" textAnchor="middle" fill="var(--text-tertiary)" fontSize="10">成熟（红色）</text>
                </g>

                {/* 乙烯气体 */}
                <motion.g
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <text x="200" y="130" textAnchor="middle" fill="#ef4444" fontSize="10">C₂H₄ ↑</text>
                </motion.g>
              </>
            )}

            <defs>
              <marker id="arrowH" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="var(--text-tertiary)" />
              </marker>
            </defs>
          </svg>
        </div>
      </div>

      {/* 激素相互作用 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-[var(--text-primary)]">激素间的相互作用</h3>
          <button
            onClick={() => setShowInteraction(!showInteraction)}
            className="px-3 py-1 rounded-lg bg-[var(--text-primary)] text-[var(--bg-primary)] text-sm"
          >
            {showInteraction ? '隐藏' : '查看'}
          </button>
        </div>

        <AnimatePresence>
          {showInteraction && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3"
            >
              <div className="p-3 rounded-lg bg-[var(--bg-secondary)]">
                <p className="text-sm font-medium text-[var(--text-primary)] mb-1">协同作用</p>
                <ul className="text-xs text-[var(--text-secondary)] space-y-1">
                  <li>• 生长素 + 赤霉素 → 共同促进果实发育</li>
                  <li>• 生长素 + 细胞分裂素 → 促进细胞分裂和分化</li>
                  <li>• 脱落酸 + 乙烯 → 促进叶片和果实脱落</li>
                </ul>
              </div>

              <div className="p-3 rounded-lg bg-[var(--bg-secondary)]">
                <p className="text-sm font-medium text-[var(--text-primary)] mb-1">拮抗作用</p>
                <ul className="text-xs text-[var(--text-secondary)] space-y-1">
                  <li>• 生长素 vs 细胞分裂素 → 顶端优势（生长素抑制侧芽，细胞分裂素促进）</li>
                  <li>• 赤霉素 vs 脱落酸 → 种子萌发（赤霉素促进，脱落酸抑制）</li>
                  <li>• 细胞分裂素 vs 脱落酸 → 叶片衰老（细胞分裂素延缓，脱落酸促进）</li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 五种激素对比 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
        <h3 className="font-medium text-[var(--text-primary)] mb-3">五种植物激素对比</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[var(--border-color)]">
                <th className="py-2 text-left text-[var(--text-tertiary)]">激素</th>
                <th className="py-2 text-center text-[var(--text-tertiary)]">主要作用</th>
                <th className="py-2 text-center text-[var(--text-tertiary)]">合成部位</th>
              </tr>
            </thead>
            <tbody className="text-[var(--text-secondary)]">
              <tr className="border-b border-[var(--border-color)]">
                <td className="py-2">生长素</td>
                <td className="py-2 text-center">促进生长（两重性）</td>
                <td className="py-2 text-center">幼嫩部位</td>
              </tr>
              <tr className="border-b border-[var(--border-color)]">
                <td className="py-2" style={{ color: '#22c55e' }}>赤霉素</td>
                <td className="py-2 text-center">促进茎伸长、种子萌发</td>
                <td className="py-2 text-center">幼芽、幼根、种子</td>
              </tr>
              <tr className="border-b border-[var(--border-color)]">
                <td className="py-2" style={{ color: '#3b82f6' }}>细胞分裂素</td>
                <td className="py-2 text-center">促进细胞分裂</td>
                <td className="py-2 text-center">根尖</td>
              </tr>
              <tr className="border-b border-[var(--border-color)]">
                <td className="py-2" style={{ color: '#f59e0b' }}>脱落酸</td>
                <td className="py-2 text-center">抑制生长、促进脱落</td>
                <td className="py-2 text-center">根冠、萎蔫叶片</td>
              </tr>
              <tr>
                <td className="py-2" style={{ color: '#ef4444' }}>乙烯</td>
                <td className="py-2 text-center">促进果实成熟</td>
                <td className="py-2 text-center">各部位（成熟果实多）</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 知识点 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)] text-sm">
        <p className="font-medium text-[var(--text-primary)] mb-2">植物激素要点：</p>
        <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
          <li><strong>激素特点</strong>：微量、有机物、由植物体产生、调节生命活动</li>
          <li><strong>协调作用</strong>：多种激素共同调节，而非单一激素</li>
          <li><strong>环境因素</strong>：光照、温度等影响激素的合成和分布</li>
          <li><strong>植物生长调节剂</strong>：人工合成的类似物，如2,4-D、乙烯利</li>
        </ul>
      </div>
    </div>
  )
}
