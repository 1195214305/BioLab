import { useState } from 'react'
import { motion } from 'framer-motion'

interface Hormone {
  id: string
  name: string
  gland: string
  target: string
  function: string
  regulation: string
}

const hormones: Hormone[] = [
  {
    id: 'thyroxine',
    name: '甲状腺激素',
    gland: '甲状腺',
    target: '全身细胞',
    function: '促进新陈代谢，促进生长发育',
    regulation: '下丘脑-垂体-甲状腺轴（负反馈）'
  },
  {
    id: 'growth',
    name: '生长激素',
    gland: '垂体',
    target: '全身细胞',
    function: '促进生长，促进蛋白质合成',
    regulation: '下丘脑调节'
  },
  {
    id: 'adrenaline',
    name: '肾上腺素',
    gland: '肾上腺髓质',
    target: '心脏、血管、肝脏等',
    function: '升高血糖，加快心跳，应激反应',
    regulation: '神经调节为主'
  },
  {
    id: 'insulin',
    name: '胰岛素',
    gland: '胰岛B细胞',
    target: '肝脏、肌肉、脂肪组织',
    function: '降低血糖（唯一）',
    regulation: '血糖浓度直接调节'
  },
  {
    id: 'glucagon',
    name: '胰高血糖素',
    gland: '胰岛A细胞',
    target: '肝脏',
    function: '升高血糖',
    regulation: '血糖浓度直接调节'
  }
]

export default function HormoneRegulationSimulation() {
  const [selectedHormone, setSelectedHormone] = useState<Hormone>(hormones[0])
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackStep, setFeedbackStep] = useState(0)

  const startFeedback = () => {
    setShowFeedback(true)
    setFeedbackStep(0)
    let step = 0
    const interval = setInterval(() => {
      step++
      setFeedbackStep(step)
      if (step >= 5) {
        clearInterval(interval)
      }
    }, 1000)
  }

  return (
    <div className="space-y-6">
      {/* 说明 */}
      <div className="text-sm text-[var(--text-secondary)]">
        体液调节是指激素等化学物质通过体液传送调节生命活动的方式
      </div>

      {/* 激素选择 */}
      <div className="flex flex-wrap gap-2">
        {hormones.map((h) => (
          <button
            key={h.id}
            onClick={() => setSelectedHormone(h)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              selectedHormone.id === h.id
                ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
                : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            {h.name}
          </button>
        ))}
      </div>

      {/* 激素详情 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
        <h3 className="font-medium text-[var(--text-primary)] mb-3">{selectedHormone.name}</h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-[var(--text-tertiary)]">分泌腺体：</span>
            <span className="text-[var(--text-secondary)]">{selectedHormone.gland}</span>
          </div>
          <div>
            <span className="text-[var(--text-tertiary)]">靶器官/细胞：</span>
            <span className="text-[var(--text-secondary)]">{selectedHormone.target}</span>
          </div>
          <div className="col-span-2">
            <span className="text-[var(--text-tertiary)]">主要功能：</span>
            <span className="text-[var(--text-secondary)]">{selectedHormone.function}</span>
          </div>
          <div className="col-span-2">
            <span className="text-[var(--text-tertiary)]">调节方式：</span>
            <span className="text-[var(--text-secondary)]">{selectedHormone.regulation}</span>
          </div>
        </div>
      </div>

      {/* 负反馈调节演示 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-[var(--text-primary)]">甲状腺激素的分级调节与负反馈</h3>
          <button
            onClick={startFeedback}
            className="px-4 py-2 rounded-lg bg-[var(--text-primary)] text-[var(--bg-primary)] text-sm font-medium"
          >
            演示
          </button>
        </div>

        <div className="relative h-72">
          <svg viewBox="0 0 400 260" className="w-full h-full">
            {/* 下丘脑 */}
            <motion.g animate={{ opacity: feedbackStep >= 1 || !showFeedback ? 1 : 0.3 }}>
              <ellipse cx="200" cy="40" rx="60" ry="25" fill="var(--text-primary)" />
              <text x="200" y="45" textAnchor="middle" fill="var(--bg-primary)" fontSize="11" fontWeight="bold">下丘脑</text>
            </motion.g>

            {/* 垂体 */}
            <motion.g animate={{ opacity: feedbackStep >= 2 || !showFeedback ? 1 : 0.3 }}>
              <ellipse cx="200" cy="110" rx="50" ry="22" fill="var(--text-secondary)" />
              <text x="200" y="115" textAnchor="middle" fill="var(--bg-primary)" fontSize="11" fontWeight="bold">垂体</text>
            </motion.g>

            {/* 甲状腺 */}
            <motion.g animate={{ opacity: feedbackStep >= 3 || !showFeedback ? 1 : 0.3 }}>
              <path d="M160 170 Q200 150 240 170 Q240 200 200 210 Q160 200 160 170" fill="var(--text-tertiary)" />
              <text x="200" y="190" textAnchor="middle" fill="var(--bg-primary)" fontSize="10" fontWeight="bold">甲状腺</text>
            </motion.g>

            {/* 靶细胞 */}
            <motion.g animate={{ opacity: feedbackStep >= 4 || !showFeedback ? 1 : 0.3 }}>
              <rect x="160" y="230" width="80" height="25" rx="5" fill="var(--bg-secondary)" stroke="var(--text-secondary)" strokeWidth="2" />
              <text x="200" y="247" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">靶细胞</text>
            </motion.g>

            {/* 正向调节箭头 */}
            <motion.g animate={{ opacity: showFeedback ? 1 : 0.5 }}>
              {/* 下丘脑 → 垂体 */}
              <path d="M200 65 L200 88" stroke="var(--text-secondary)" strokeWidth="2" markerEnd="url(#arrowG)" />
              <text x="230" y="80" fill="var(--text-tertiary)" fontSize="8">TRH</text>

              {/* 垂体 → 甲状腺 */}
              <path d="M200 132 L200 155" stroke="var(--text-secondary)" strokeWidth="2" markerEnd="url(#arrowG)" />
              <text x="230" y="145" fill="var(--text-tertiary)" fontSize="8">TSH</text>

              {/* 甲状腺 → 靶细胞 */}
              <path d="M200 210 L200 230" stroke="var(--text-secondary)" strokeWidth="2" markerEnd="url(#arrowG)" />
              <text x="235" y="222" fill="var(--text-tertiary)" fontSize="8">甲状腺激素</text>
            </motion.g>

            {/* 负反馈箭头 */}
            <motion.g
              animate={{
                opacity: feedbackStep >= 5 || !showFeedback ? 1 : 0.2,
                pathLength: feedbackStep >= 5 ? 1 : 0
              }}
            >
              {/* 甲状腺激素 → 下丘脑（抑制） */}
              <path d="M160 180 Q80 120 140 50" fill="none" stroke="var(--text-primary)" strokeWidth="2" strokeDasharray="5 3" markerEnd="url(#arrowR)" />
              <text x="70" y="120" fill="var(--text-primary)" fontSize="8">(-)</text>

              {/* 甲状腺激素 → 垂体（抑制） */}
              <path d="M160 175 Q100 140 150 115" fill="none" stroke="var(--text-primary)" strokeWidth="2" strokeDasharray="5 3" markerEnd="url(#arrowR)" />
              <text x="100" y="150" fill="var(--text-primary)" fontSize="8">(-)</text>
            </motion.g>

            {/* 标注 */}
            <text x="320" y="80" fill="var(--text-tertiary)" fontSize="9">促甲状腺激素</text>
            <text x="320" y="95" fill="var(--text-tertiary)" fontSize="9">释放激素</text>
            <text x="320" y="145" fill="var(--text-tertiary)" fontSize="9">促甲状腺激素</text>

            <defs>
              <marker id="arrowG" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="var(--text-secondary)" />
              </marker>
              <marker id="arrowR" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="var(--text-primary)" />
              </marker>
            </defs>
          </svg>
        </div>

        <p className="text-xs text-center text-[var(--text-tertiary)]">
          当甲状腺激素浓度升高时，会抑制下丘脑和垂体的分泌（负反馈）
        </p>
      </div>

      {/* 激素作用特点 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-lg bg-[var(--bg-tertiary)] text-center">
          <div className="text-xl mb-1">💧</div>
          <div className="text-sm font-medium text-[var(--text-primary)]">微量高效</div>
          <div className="text-xs text-[var(--text-tertiary)]">含量极少但作用显著</div>
        </div>
        <div className="p-3 rounded-lg bg-[var(--bg-tertiary)] text-center">
          <div className="text-xl mb-1">🩸</div>
          <div className="text-sm font-medium text-[var(--text-primary)]">体液运输</div>
          <div className="text-xs text-[var(--text-tertiary)]">通过血液运输</div>
        </div>
        <div className="p-3 rounded-lg bg-[var(--bg-tertiary)] text-center">
          <div className="text-xl mb-1">🎯</div>
          <div className="text-sm font-medium text-[var(--text-primary)]">特异性</div>
          <div className="text-xs text-[var(--text-tertiary)]">作用于特定靶器官</div>
        </div>
        <div className="p-3 rounded-lg bg-[var(--bg-tertiary)] text-center">
          <div className="text-xl mb-1">⏱️</div>
          <div className="text-sm font-medium text-[var(--text-primary)]">作用后灭活</div>
          <div className="text-xs text-[var(--text-tertiary)]">需持续分泌</div>
        </div>
      </div>

      {/* 知识点 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)] text-sm">
        <p className="font-medium text-[var(--text-primary)] mb-2">体液调节要点：</p>
        <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
          <li><strong>激素</strong>：由内分泌腺分泌，通过体液运输</li>
          <li><strong>分级调节</strong>：下丘脑 → 垂体 → 靶腺体</li>
          <li><strong>负反馈</strong>：激素浓度升高时抑制上级分泌</li>
          <li><strong>协同作用</strong>：如生长激素与甲状腺激素</li>
          <li><strong>拮抗作用</strong>：如胰岛素与胰高血糖素</li>
        </ul>
      </div>
    </div>
  )
}
