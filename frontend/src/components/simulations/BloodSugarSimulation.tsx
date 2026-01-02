import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function BloodSugarSimulation() {
  const [bloodSugar, setBloodSugar] = useState(5.0) // mmol/L
  const [insulin, setInsulin] = useState(50)
  const [glucagon, setGlucagon] = useState(50)
  const [isEating, setIsEating] = useState(false)
  const [isExercising, setIsExercising] = useState(false)
  const [history, setHistory] = useState<{ time: number; sugar: number }[]>([{ time: 0, sugar: 5.0 }])

  useEffect(() => {
    const interval = setInterval(() => {
      setBloodSugar(prev => {
        let newSugar = prev

        // 进食增加血糖
        if (isEating) {
          newSugar += 0.3
        }

        // 运动消耗血糖
        if (isExercising) {
          newSugar -= 0.2
        }

        // 胰岛素降低血糖
        if (newSugar > 5.6) {
          newSugar -= (insulin / 100) * 0.15
          setInsulin(prev => Math.min(100, prev + 5))
          setGlucagon(prev => Math.max(0, prev - 5))
        }

        // 胰高血糖素升高血糖
        if (newSugar < 4.4) {
          newSugar += (glucagon / 100) * 0.1
          setGlucagon(prev => Math.min(100, prev + 5))
          setInsulin(prev => Math.max(0, prev - 5))
        }

        // 正常范围内趋于稳定
        if (newSugar >= 4.4 && newSugar <= 5.6) {
          setInsulin(prev => prev + (50 - prev) * 0.1)
          setGlucagon(prev => prev + (50 - prev) * 0.1)
        }

        // 限制范围
        newSugar = Math.max(2.5, Math.min(15, newSugar))

        return newSugar
      })

      setHistory(prev => {
        const newTime = prev.length > 0 ? prev[prev.length - 1].time + 1 : 0
        const newHistory = [...prev, { time: newTime, sugar: bloodSugar }]
        return newHistory.slice(-30)
      })
    }, 500)

    return () => clearInterval(interval)
  }, [isEating, isExercising, insulin, glucagon, bloodSugar])

  const getSugarStatus = () => {
    if (bloodSugar < 3.9) return { text: '低血糖', color: 'var(--text-primary)' }
    if (bloodSugar < 4.4) return { text: '偏低', color: 'var(--text-secondary)' }
    if (bloodSugar <= 6.1) return { text: '正常', color: 'var(--text-tertiary)' }
    if (bloodSugar <= 7.0) return { text: '偏高', color: 'var(--text-secondary)' }
    return { text: '高血糖', color: 'var(--text-primary)' }
  }

  const status = getSugarStatus()

  return (
    <div className="space-y-6">
      {/* 说明 */}
      <div className="text-sm text-[var(--text-secondary)]">
        模拟进食和运动对血糖的影响，观察胰岛素和胰高血糖素的调节作用
      </div>

      {/* 控制按钮 */}
      <div className="flex gap-4">
        <button
          onClick={() => setIsEating(!isEating)}
          className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
            isEating
              ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
              : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          {isEating ? '停止进食' : '开始进食'}
        </button>
        <button
          onClick={() => setIsExercising(!isExercising)}
          className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
            isExercising
              ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
              : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          {isExercising ? '停止运动' : '开始运动'}
        </button>
      </div>

      {/* 血糖显示 */}
      <div className="p-6 rounded-xl bg-[var(--bg-tertiary)] text-center">
        <div className="text-5xl font-bold text-[var(--text-primary)]">{bloodSugar.toFixed(1)}</div>
        <div className="text-sm text-[var(--text-secondary)]">mmol/L</div>
        <div className="mt-2 text-sm" style={{ color: status.color }}>{status.text}</div>
        <div className="mt-2 text-xs text-[var(--text-tertiary)]">正常范围：3.9-6.1 mmol/L</div>
      </div>

      {/* 激素水平 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[var(--text-primary)]">胰岛素</span>
            <span className="text-sm text-[var(--text-secondary)]">{Math.round(insulin)}%</span>
          </div>
          <div className="h-2 rounded-full bg-[var(--bg-secondary)]">
            <motion.div
              className="h-full rounded-full bg-[var(--text-primary)]"
              animate={{ width: `${insulin}%` }}
            />
          </div>
          <p className="text-xs text-[var(--text-tertiary)] mt-2">降低血糖</p>
        </div>
        <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[var(--text-primary)]">胰高血糖素</span>
            <span className="text-sm text-[var(--text-secondary)]">{Math.round(glucagon)}%</span>
          </div>
          <div className="h-2 rounded-full bg-[var(--bg-secondary)]">
            <motion.div
              className="h-full rounded-full bg-[var(--text-secondary)]"
              animate={{ width: `${glucagon}%` }}
            />
          </div>
          <p className="text-xs text-[var(--text-tertiary)] mt-2">升高血糖</p>
        </div>
      </div>

      {/* 血糖曲线 */}
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={history}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
            <XAxis dataKey="time" stroke="var(--text-tertiary)" tick={{ fontSize: 10 }} />
            <YAxis domain={[2, 12]} stroke="var(--text-tertiary)" tick={{ fontSize: 10 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px'
              }}
            />
            <Line type="monotone" dataKey="sugar" stroke="var(--text-primary)" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 调节机制图 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
        <h3 className="font-medium text-[var(--text-primary)] mb-3">血糖调节机制</h3>
        <div className="relative">
          <svg viewBox="0 0 400 150" className="w-full h-auto">
            {/* 血糖 */}
            <rect x="160" y="55" width="80" height="40" rx="5" fill="var(--text-tertiary)" />
            <text x="200" y="80" textAnchor="middle" fill="var(--bg-primary)" fontSize="12">血糖</text>

            {/* 胰岛B细胞 */}
            <rect x="20" y="20" width="80" height="30" rx="5" fill="var(--text-secondary)" />
            <text x="60" y="40" textAnchor="middle" fill="var(--bg-primary)" fontSize="10">胰岛B细胞</text>

            {/* 胰岛A细胞 */}
            <rect x="20" y="100" width="80" height="30" rx="5" fill="var(--text-secondary)" />
            <text x="60" y="120" textAnchor="middle" fill="var(--bg-primary)" fontSize="10">胰岛A细胞</text>

            {/* 肝脏 */}
            <rect x="300" y="55" width="80" height="40" rx="5" fill="var(--text-secondary)" />
            <text x="340" y="80" textAnchor="middle" fill="var(--bg-primary)" fontSize="10">肝脏/肌肉</text>

            {/* 箭头和标签 */}
            <path d="M100 35 L160 65" stroke="var(--text-primary)" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <text x="120" y="45" fill="var(--text-tertiary)" fontSize="8">胰岛素</text>

            <path d="M100 115 L160 85" stroke="var(--text-primary)" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <text x="120" y="110" fill="var(--text-tertiary)" fontSize="8">胰高血糖素</text>

            <path d="M240 75 L300 75" stroke="var(--text-primary)" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <text x="270" y="68" fill="var(--text-tertiary)" fontSize="8">糖原合成</text>

            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="var(--text-primary)" />
              </marker>
            </defs>
          </svg>
        </div>
      </div>

      {/* 知识点 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)] text-sm">
        <p className="font-medium text-[var(--text-primary)] mb-2">血糖调节要点：</p>
        <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
          <li><strong>胰岛素</strong>：唯一降血糖激素，促进糖原合成、抑制糖原分解</li>
          <li><strong>胰高血糖素</strong>：升血糖激素，促进糖原分解、非糖物质转化</li>
          <li><strong>拮抗作用</strong>：两种激素相互拮抗，维持血糖稳定</li>
          <li><strong>糖尿病</strong>：胰岛素分泌不足或作用障碍导致</li>
        </ul>
      </div>
    </div>
  )
}
