import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Organelle {
  id: string
  name: string
  description: string
  function: string
  membrane: string
  x: number
  y: number
  width: number
  height: number
  color: string
}

const organelles: Organelle[] = [
  {
    id: 'nucleus',
    name: '细胞核',
    description: '细胞的控制中心，含有遗传物质DNA',
    function: '储存遗传信息，控制细胞的代谢和遗传',
    membrane: '双层膜结构，有核孔',
    x: 45,
    y: 40,
    width: 25,
    height: 25,
    color: '#525252'
  },
  {
    id: 'mitochondria',
    name: '线粒体',
    description: '细胞的"动力工厂"',
    function: '进行有氧呼吸，产生ATP',
    membrane: '双层膜结构，内膜向内折叠形成嵴',
    x: 75,
    y: 30,
    width: 12,
    height: 8,
    color: '#737373'
  },
  {
    id: 'chloroplast',
    name: '叶绿体',
    description: '光合作用的场所（植物细胞特有）',
    function: '进行光合作用，将光能转化为化学能',
    membrane: '双层膜结构，含有基粒和基质',
    x: 20,
    y: 25,
    width: 14,
    height: 10,
    color: '#404040'
  },
  {
    id: 'er',
    name: '内质网',
    description: '细胞内的膜系统',
    function: '粗面内质网合成蛋白质，光滑内质网合成脂质',
    membrane: '单层膜结构',
    x: 30,
    y: 55,
    width: 20,
    height: 15,
    color: '#a3a3a3'
  },
  {
    id: 'golgi',
    name: '高尔基体',
    description: '细胞的"加工厂"和"邮局"',
    function: '加工、分类和包装蛋白质，形成分泌小泡',
    membrane: '单层膜结构，由扁平囊和小泡组成',
    x: 65,
    y: 60,
    width: 12,
    height: 10,
    color: '#d4d4d4'
  },
  {
    id: 'ribosome',
    name: '核糖体',
    description: '蛋白质合成的场所',
    function: '翻译mRNA，合成蛋白质',
    membrane: '无膜结构，由rRNA和蛋白质组成',
    x: 80,
    y: 55,
    width: 4,
    height: 4,
    color: '#171717'
  },
  {
    id: 'lysosome',
    name: '溶酶体',
    description: '细胞的"消化车间"',
    function: '分解衰老的细胞器和外来物质',
    membrane: '单层膜结构，含有多种水解酶',
    x: 15,
    y: 65,
    width: 6,
    height: 6,
    color: '#525252'
  },
  {
    id: 'vacuole',
    name: '液泡',
    description: '植物细胞特有的大型细胞器',
    function: '储存物质，维持细胞渗透压',
    membrane: '单层膜（液泡膜）',
    x: 50,
    y: 75,
    width: 18,
    height: 12,
    color: '#e5e5e5'
  }
]

export default function CellOrganellesSimulation() {
  const [selectedOrganelle, setSelectedOrganelle] = useState<Organelle | null>(null)
  const [hoveredOrganelle, setHoveredOrganelle] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      {/* 说明 */}
      <div className="text-sm text-[var(--text-secondary)]">
        点击细胞器查看详细信息
      </div>

      {/* 细胞图 */}
      <div className="relative aspect-[4/3] max-w-2xl mx-auto">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* 细胞膜 */}
          <ellipse
            cx="50"
            cy="50"
            rx="48"
            ry="45"
            fill="none"
            stroke="var(--text-primary)"
            strokeWidth="1.5"
            strokeDasharray="4 2"
          />

          {/* 细胞质 */}
          <ellipse
            cx="50"
            cy="50"
            rx="46"
            ry="43"
            fill="var(--bg-tertiary)"
            opacity="0.3"
          />

          {/* 细胞器 */}
          {organelles.map((org) => (
            <g key={org.id}>
              {org.id === 'nucleus' ? (
                // 细胞核 - 圆形
                <circle
                  cx={org.x + org.width / 2}
                  cy={org.y + org.height / 2}
                  r={org.width / 2}
                  fill={org.color}
                  stroke={hoveredOrganelle === org.id || selectedOrganelle?.id === org.id ? 'var(--text-primary)' : 'none'}
                  strokeWidth="2"
                  className="cursor-pointer transition-all"
                  onClick={() => setSelectedOrganelle(org)}
                  onMouseEnter={() => setHoveredOrganelle(org.id)}
                  onMouseLeave={() => setHoveredOrganelle(null)}
                  style={{ opacity: hoveredOrganelle === org.id ? 0.8 : 1 }}
                />
              ) : org.id === 'ribosome' ? (
                // 核糖体 - 小圆点
                <circle
                  cx={org.x}
                  cy={org.y}
                  r={org.width / 2}
                  fill={org.color}
                  stroke={hoveredOrganelle === org.id || selectedOrganelle?.id === org.id ? 'var(--text-primary)' : 'none'}
                  strokeWidth="1"
                  className="cursor-pointer transition-all"
                  onClick={() => setSelectedOrganelle(org)}
                  onMouseEnter={() => setHoveredOrganelle(org.id)}
                  onMouseLeave={() => setHoveredOrganelle(null)}
                />
              ) : org.id === 'er' ? (
                // 内质网 - 波浪线
                <path
                  d={`M${org.x} ${org.y} Q${org.x + 5} ${org.y - 3} ${org.x + 10} ${org.y} Q${org.x + 15} ${org.y + 3} ${org.x + 20} ${org.y} M${org.x} ${org.y + 5} Q${org.x + 5} ${org.y + 2} ${org.x + 10} ${org.y + 5} Q${org.x + 15} ${org.y + 8} ${org.x + 20} ${org.y + 5} M${org.x} ${org.y + 10} Q${org.x + 5} ${org.y + 7} ${org.x + 10} ${org.y + 10} Q${org.x + 15} ${org.y + 13} ${org.x + 20} ${org.y + 10}`}
                  fill="none"
                  stroke={org.color}
                  strokeWidth="1.5"
                  className="cursor-pointer transition-all"
                  onClick={() => setSelectedOrganelle(org)}
                  onMouseEnter={() => setHoveredOrganelle(org.id)}
                  onMouseLeave={() => setHoveredOrganelle(null)}
                  style={{ strokeWidth: hoveredOrganelle === org.id || selectedOrganelle?.id === org.id ? 2.5 : 1.5 }}
                />
              ) : org.id === 'golgi' ? (
                // 高尔基体 - 堆叠的扁平囊
                <g
                  className="cursor-pointer"
                  onClick={() => setSelectedOrganelle(org)}
                  onMouseEnter={() => setHoveredOrganelle(org.id)}
                  onMouseLeave={() => setHoveredOrganelle(null)}
                >
                  {[0, 3, 6].map((offset) => (
                    <ellipse
                      key={offset}
                      cx={org.x + org.width / 2}
                      cy={org.y + offset}
                      rx={org.width / 2}
                      ry={1.5}
                      fill={org.color}
                      stroke={hoveredOrganelle === org.id || selectedOrganelle?.id === org.id ? 'var(--text-primary)' : 'none'}
                      strokeWidth="0.5"
                    />
                  ))}
                </g>
              ) : (
                // 其他细胞器 - 椭圆
                <ellipse
                  cx={org.x + org.width / 2}
                  cy={org.y + org.height / 2}
                  rx={org.width / 2}
                  ry={org.height / 2}
                  fill={org.color}
                  stroke={hoveredOrganelle === org.id || selectedOrganelle?.id === org.id ? 'var(--text-primary)' : 'none'}
                  strokeWidth="1.5"
                  className="cursor-pointer transition-all"
                  onClick={() => setSelectedOrganelle(org)}
                  onMouseEnter={() => setHoveredOrganelle(org.id)}
                  onMouseLeave={() => setHoveredOrganelle(null)}
                  style={{ opacity: hoveredOrganelle === org.id ? 0.8 : 1 }}
                />
              )}
            </g>
          ))}

          {/* 标签 */}
          {hoveredOrganelle && (
            <text
              x="50"
              y="95"
              textAnchor="middle"
              fill="var(--text-primary)"
              fontSize="4"
              fontWeight="500"
            >
              {organelles.find(o => o.id === hoveredOrganelle)?.name}
            </text>
          )}
        </svg>
      </div>

      {/* 细胞器列表 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {organelles.map((org) => (
          <button
            key={org.id}
            onClick={() => setSelectedOrganelle(org)}
            className={`px-3 py-2 rounded-lg text-sm transition-all ${
              selectedOrganelle?.id === org.id
                ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
                : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            {org.name}
          </button>
        ))}
      </div>

      {/* 详细信息面板 */}
      <AnimatePresence>
        {selectedOrganelle && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="p-4 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-color)]"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                {selectedOrganelle.name}
              </h3>
              <button
                onClick={() => setSelectedOrganelle(null)}
                className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
              >
                ✕
              </button>
            </div>
            <p className="text-sm text-[var(--text-secondary)] mb-3">
              {selectedOrganelle.description}
            </p>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium text-[var(--text-primary)]">功能：</span>
                <span className="text-[var(--text-secondary)]">{selectedOrganelle.function}</span>
              </div>
              <div>
                <span className="font-medium text-[var(--text-primary)]">膜结构：</span>
                <span className="text-[var(--text-secondary)]">{selectedOrganelle.membrane}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
