import { useState } from 'react'
import { motion } from 'framer-motion'

export default function NerveRegulationSimulation() {
  const [isStimulated, setIsStimulated] = useState(false)
  const [signalPosition, setSignalPosition] = useState(0)
  const [showSynapse, setShowSynapse] = useState(false)

  const startSignal = () => {
    setIsStimulated(true)
    setSignalPosition(0)

    let pos = 0
    const interval = setInterval(() => {
      pos += 10
      setSignalPosition(pos)
      if (pos >= 100) {
        clearInterval(interval)
        setShowSynapse(true)
        setTimeout(() => {
          setIsStimulated(false)
          setShowSynapse(false)
          setSignalPosition(0)
        }, 2000)
      }
    }, 100)
  }

  return (
    <div className="space-y-6">
      {/* 说明 */}
      <div className="text-sm text-[var(--text-secondary)]">
        点击"刺激"按钮，观察神经冲动的传导过程
      </div>

      {/* 反射弧结构 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
        <h3 className="font-medium text-[var(--text-primary)] mb-4">反射弧的组成</h3>
        <div className="relative h-48">
          <svg viewBox="0 0 500 180" className="w-full h-full">
            {/* 感受器 */}
            <circle cx="50" cy="90" r="25" fill="var(--text-tertiary)" stroke="var(--text-secondary)" strokeWidth="2" />
            <text x="50" y="95" textAnchor="middle" fill="var(--bg-primary)" fontSize="10">感受器</text>

            {/* 传入神经 */}
            <line x1="75" y1="90" x2="150" y2="90" stroke="var(--text-secondary)" strokeWidth="3" />
            <text x="112" y="80" textAnchor="middle" fill="var(--text-tertiary)" fontSize="9">传入神经</text>

            {/* 神经中枢 */}
            <rect x="150" y="65" width="80" height="50" rx="10" fill="var(--text-tertiary)" stroke="var(--text-secondary)" strokeWidth="2" />
            <text x="190" y="95" textAnchor="middle" fill="var(--bg-primary)" fontSize="10">神经中枢</text>

            {/* 传出神经 */}
            <line x1="230" y1="90" x2="350" y2="90" stroke="var(--text-secondary)" strokeWidth="3" />
            <text x="290" y="80" textAnchor="middle" fill="var(--text-tertiary)" fontSize="9">传出神经</text>

            {/* 效应器 */}
            <circle cx="380" cy="90" r="25" fill="var(--text-tertiary)" stroke="var(--text-secondary)" strokeWidth="2" />
            <text x="380" y="95" textAnchor="middle" fill="var(--bg-primary)" fontSize="10">效应器</text>

            {/* 信号传导动画 */}
            {isStimulated && (
              <motion.circle
                cx={50 + signalPosition * 3.3}
                cy="90"
                r="8"
                fill="var(--text-primary)"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              />
            )}

            {/* 箭头 */}
            <polygon points="145,90 155,85 155,95" fill="var(--text-secondary)" />
            <polygon points="345,90 355,85 355,95" fill="var(--text-secondary)" />
          </svg>
        </div>
      </div>

      {/* 控制按钮 */}
      <div className="flex justify-center">
        <button
          onClick={startSignal}
          disabled={isStimulated}
          className="px-6 py-3 rounded-lg bg-[var(--text-primary)] text-[var(--bg-primary)] font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
        >
          {isStimulated ? '传导中...' : '刺激感受器'}
        </button>
      </div>

      {/* 突触结构 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
        <h3 className="font-medium text-[var(--text-primary)] mb-4">突触结构与传递</h3>
        <div className="relative h-56">
          <svg viewBox="0 0 400 200" className="w-full h-full">
            {/* 突触前膜 */}
            <path d="M50 50 Q100 50 100 100 Q100 150 50 150" fill="var(--text-tertiary)" stroke="var(--text-secondary)" strokeWidth="2" />
            <text x="60" y="105" fill="var(--bg-primary)" fontSize="9">突触前膜</text>

            {/* 突触小泡 */}
            {[0, 1, 2, 3].map((i) => (
              <motion.circle
                key={i}
                cx={70 + (i % 2) * 15}
                cy={75 + Math.floor(i / 2) * 20}
                r="8"
                fill="var(--text-secondary)"
                animate={showSynapse ? { cx: 95, cy: 100, opacity: [1, 0] } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              />
            ))}

            {/* 突触间隙 */}
            <rect x="100" y="50" width="30" height="100" fill="var(--bg-secondary)" />
            <text x="115" y="105" textAnchor="middle" fill="var(--text-tertiary)" fontSize="8" transform="rotate(-90, 115, 105)">突触间隙</text>

            {/* 神经递质 */}
            {showSynapse && (
              <>
                {[0, 1, 2].map((i) => (
                  <motion.circle
                    key={i}
                    cx="115"
                    cy={80 + i * 20}
                    r="4"
                    fill="var(--text-primary)"
                    initial={{ x: -15, opacity: 0 }}
                    animate={{ x: 15, opacity: [0, 1, 0] }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.8 }}
                  />
                ))}
              </>
            )}

            {/* 突触后膜 */}
            <path d="M130 50 Q130 50 180 50 L180 150 Q130 150 130 150" fill="var(--text-tertiary)" stroke="var(--text-secondary)" strokeWidth="2" />
            <text x="155" y="105" textAnchor="middle" fill="var(--bg-primary)" fontSize="9">突触后膜</text>

            {/* 受体 */}
            {[0, 1, 2].map((i) => (
              <rect key={i} x="130" y={75 + i * 20} width="10" height="10" fill="var(--text-secondary)" />
            ))}

            {/* 标注 */}
            <text x="250" y="60" fill="var(--text-secondary)" fontSize="10">突触小泡（含神经递质）</text>
            <line x1="85" y1="75" x2="240" y2="60" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="3 2" />

            <text x="250" y="100" fill="var(--text-secondary)" fontSize="10">受体蛋白</text>
            <line x1="140" y1="85" x2="240" y2="100" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="3 2" />

            <text x="250" y="140" fill="var(--text-secondary)" fontSize="10">神经递质（如乙酰胆碱）</text>
          </svg>
        </div>
      </div>

      {/* 兴奋传导特点 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
          <h4 className="font-medium text-[var(--text-primary)] mb-2">神经纤维上的传导</h4>
          <ul className="text-sm text-[var(--text-secondary)] space-y-1">
            <li>• 双向传导</li>
            <li>• 电信号传导</li>
            <li>• 速度快</li>
          </ul>
        </div>
        <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
          <h4 className="font-medium text-[var(--text-primary)] mb-2">突触处的传递</h4>
          <ul className="text-sm text-[var(--text-secondary)] space-y-1">
            <li>• 单向传递</li>
            <li>• 化学信号传递</li>
            <li>• 有突触延搁</li>
          </ul>
        </div>
      </div>

      {/* 知识点 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)] text-sm">
        <p className="font-medium text-[var(--text-primary)] mb-2">神经调节要点：</p>
        <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
          <li><strong>反射</strong>：神经调节的基本方式</li>
          <li><strong>反射弧</strong>：感受器→传入神经→神经中枢→传出神经→效应器</li>
          <li><strong>突触传递</strong>：突触前膜释放神经递质→作用于突触后膜受体</li>
          <li><strong>神经递质</strong>：乙酰胆碱（兴奋性）、GABA（抑制性）等</li>
        </ul>
      </div>
    </div>
  )
}
