import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type InfoType = 'physical' | 'chemical' | 'behavioral'

interface InfoExample {
  name: string
  sender: string
  receiver: string
  effect: string
}

const infoTypes: Record<InfoType, { name: string; description: string; examples: InfoExample[] }> = {
  physical: {
    name: '物理信息',
    description: '通过物理过程传递的信息，如光、声、温度、磁场等',
    examples: [
      { name: '萤火虫发光', sender: '萤火虫', receiver: '同种萤火虫', effect: '求偶、交配' },
      { name: '蝙蝠超声波', sender: '蝙蝠', receiver: '猎物/同类', effect: '定位、捕食' },
      { name: '植物开花', sender: '日照长度', receiver: '植物', effect: '诱导开花' },
      { name: '鸟类鸣叫', sender: '鸟类', receiver: '同种鸟类', effect: '求偶、警戒' }
    ]
  },
  chemical: {
    name: '化学信息',
    description: '通过化学物质传递的信息，如信息素、代谢产物等',
    examples: [
      { name: '蜜蜂信息素', sender: '蜂王', receiver: '工蜂', effect: '抑制工蜂发育' },
      { name: '蚂蚁信息素', sender: '蚂蚁', receiver: '同巢蚂蚁', effect: '标记路径' },
      { name: '植物挥发物', sender: '受害植物', receiver: '邻近植物', effect: '诱导防御' },
      { name: '性信息素', sender: '雌蛾', receiver: '雄蛾', effect: '吸引交配' }
    ]
  },
  behavioral: {
    name: '行为信息',
    description: '通过特殊行为传递的信息，如舞蹈、姿态等',
    examples: [
      { name: '蜜蜂舞蹈', sender: '侦察蜂', receiver: '采集蜂', effect: '指示蜜源方向和距离' },
      { name: '孔雀开屏', sender: '雄孔雀', receiver: '雌孔雀', effect: '求偶展示' },
      { name: '狗摇尾巴', sender: '狗', receiver: '人/其他狗', effect: '表达友好' },
      { name: '威胁姿态', sender: '动物', receiver: '竞争者', effect: '警告、驱赶' }
    ]
  }
}

export default function InformationTransferSimulation() {
  const [selectedType, setSelectedType] = useState<InfoType>('physical')
  const [selectedExample, setSelectedExample] = useState<InfoExample | null>(null)
  const [showAnimation, setShowAnimation] = useState(false)

  const currentInfo = infoTypes[selectedType]

  const startAnimation = () => {
    setShowAnimation(true)
    setTimeout(() => setShowAnimation(false), 3000)
  }

  return (
    <div className="space-y-6">
      {/* 说明 */}
      <div className="text-sm text-[var(--text-secondary)]">
        生态系统中的信息传递是生物之间以及生物与环境之间交流的重要方式
      </div>

      {/* 信息类型选择 */}
      <div className="flex gap-2">
        {(Object.keys(infoTypes) as InfoType[]).map((type) => (
          <button
            key={type}
            onClick={() => { setSelectedType(type); setSelectedExample(null) }}
            className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedType === type
                ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
                : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            {infoTypes[type].name}
          </button>
        ))}
      </div>

      {/* 信息类型详情 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
        <h3 className="font-medium text-[var(--text-primary)] mb-2">{currentInfo.name}</h3>
        <p className="text-sm text-[var(--text-secondary)] mb-4">{currentInfo.description}</p>

        {/* 示例列表 */}
        <div className="grid grid-cols-2 gap-2">
          {currentInfo.examples.map((ex, i) => (
            <motion.button
              key={i}
              onClick={() => setSelectedExample(ex)}
              whileHover={{ scale: 1.02 }}
              className={`p-3 rounded-lg text-left transition-all ${
                selectedExample?.name === ex.name
                  ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
                  : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <p className="text-sm font-medium">{ex.name}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* 选中示例详情 */}
      <AnimatePresence>
        {selectedExample && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--text-primary)]"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-[var(--text-primary)]">{selectedExample.name}</h3>
              <button
                onClick={startAnimation}
                className="px-3 py-1 rounded-lg bg-[var(--text-primary)] text-[var(--bg-primary)] text-sm"
              >
                演示
              </button>
            </div>

            {/* 信息传递动画 */}
            <div className="relative h-32 rounded-lg bg-[var(--bg-secondary)] overflow-hidden mb-4">
              <svg viewBox="0 0 400 100" className="w-full h-full">
                {/* 发送者 */}
                <g>
                  <circle cx="80" cy="50" r="30" fill="var(--text-secondary)" />
                  <text x="80" y="55" textAnchor="middle" fill="var(--bg-primary)" fontSize="10">发送者</text>
                </g>

                {/* 信息传递 */}
                <motion.g
                  animate={showAnimation ? { x: [0, 120, 240] } : { x: 120 }}
                  transition={{ duration: 2, ease: 'linear' }}
                >
                  {selectedType === 'physical' && (
                    <g>
                      <circle cx="80" cy="50" r="8" fill="var(--text-primary)" opacity="0.8" />
                      <circle cx="80" cy="50" r="15" fill="none" stroke="var(--text-primary)" strokeWidth="2" opacity="0.5" />
                    </g>
                  )}
                  {selectedType === 'chemical' && (
                    <g>
                      {[0, 1, 2].map((i) => (
                        <circle key={i} cx={75 + i * 10} cy={45 + (i % 2) * 10} r="5" fill="var(--text-primary)" opacity="0.7" />
                      ))}
                    </g>
                  )}
                  {selectedType === 'behavioral' && (
                    <g>
                      <path d="M70 50 L90 40 L90 60 Z" fill="var(--text-primary)" />
                    </g>
                  )}
                </motion.g>

                {/* 接收者 */}
                <g>
                  <circle cx="320" cy="50" r="30" fill="var(--text-tertiary)" />
                  <text x="320" y="55" textAnchor="middle" fill="var(--bg-primary)" fontSize="10">接收者</text>
                </g>

                {/* 箭头 */}
                <path d="M120 50 L280 50" stroke="var(--text-tertiary)" strokeWidth="2" strokeDasharray="5 3" markerEnd="url(#arrowInfo)" />

                <defs>
                  <marker id="arrowInfo" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="var(--text-tertiary)" />
                  </marker>
                </defs>
              </svg>
            </div>

            <div className="grid grid-cols-3 gap-3 text-sm">
              <div className="p-2 rounded bg-[var(--bg-secondary)]">
                <p className="text-[var(--text-tertiary)]">发送者</p>
                <p className="text-[var(--text-primary)]">{selectedExample.sender}</p>
              </div>
              <div className="p-2 rounded bg-[var(--bg-secondary)]">
                <p className="text-[var(--text-tertiary)]">接收者</p>
                <p className="text-[var(--text-primary)]">{selectedExample.receiver}</p>
              </div>
              <div className="p-2 rounded bg-[var(--bg-secondary)]">
                <p className="text-[var(--text-tertiary)]">作用</p>
                <p className="text-[var(--text-primary)]">{selectedExample.effect}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 信息传递的作用 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
        <h3 className="font-medium text-[var(--text-primary)] mb-3">信息传递的作用</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-[var(--bg-secondary)]">
            <p className="text-sm font-medium text-[var(--text-primary)] mb-1">生命活动的调节</p>
            <p className="text-xs text-[var(--text-secondary)]">调节生物的生长、发育、繁殖等</p>
          </div>
          <div className="p-3 rounded-lg bg-[var(--bg-secondary)]">
            <p className="text-sm font-medium text-[var(--text-primary)] mb-1">种群的繁衍</p>
            <p className="text-xs text-[var(--text-secondary)]">求偶、交配、育幼等行为</p>
          </div>
          <div className="p-3 rounded-lg bg-[var(--bg-secondary)]">
            <p className="text-sm font-medium text-[var(--text-primary)] mb-1">种间关系调节</p>
            <p className="text-xs text-[var(--text-secondary)]">捕食、竞争、共生等关系</p>
          </div>
          <div className="p-3 rounded-lg bg-[var(--bg-secondary)]">
            <p className="text-sm font-medium text-[var(--text-primary)] mb-1">维持生态平衡</p>
            <p className="text-xs text-[var(--text-secondary)]">调节种群数量，维持稳定</p>
          </div>
        </div>
      </div>

      {/* 信息传递特点 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
        <h3 className="font-medium text-[var(--text-primary)] mb-3">信息传递的特点</h3>
        <div className="flex justify-around">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center mx-auto mb-2">
              <span className="text-2xl">↔️</span>
            </div>
            <p className="text-sm text-[var(--text-primary)]">双向性</p>
            <p className="text-xs text-[var(--text-tertiary)]">往返于生物之间</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center mx-auto mb-2">
              <span className="text-2xl">🔄</span>
            </div>
            <p className="text-sm text-[var(--text-primary)]">普遍性</p>
            <p className="text-xs text-[var(--text-tertiary)]">存在于各营养级</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center mx-auto mb-2">
              <span className="text-2xl">⚡</span>
            </div>
            <p className="text-sm text-[var(--text-primary)]">高效性</p>
            <p className="text-xs text-[var(--text-tertiary)]">微量即可起作用</p>
          </div>
        </div>
      </div>

      {/* 知识点 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)] text-sm">
        <p className="font-medium text-[var(--text-primary)] mb-2">信息传递要点：</p>
        <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
          <li><strong>物理信息</strong>：光、声、温度、磁场等</li>
          <li><strong>化学信息</strong>：信息素、代谢产物等化学物质</li>
          <li><strong>行为信息</strong>：动物的特殊行为，如舞蹈、姿态</li>
          <li><strong>与能量流动的区别</strong>：信息传递是双向的，能量流动是单向的</li>
          <li><strong>应用</strong>：利用信息素诱杀害虫、控制有害动物</li>
        </ul>
      </div>
    </div>
  )
}
