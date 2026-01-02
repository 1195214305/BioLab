import { useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface TrophicLevel {
  name: string
  energy: number
  examples: string
}

export default function EnergyFlowSimulation() {
  const [producerEnergy, setProducerEnergy] = useState(10000)
  const [transferRate, setTransferRate] = useState(15)

  // 计算各营养级能量
  const calculateLevels = (): TrophicLevel[] => {
    const rate = transferRate / 100
    return [
      { name: '生产者', energy: producerEnergy, examples: '植物、藻类' },
      { name: '初级消费者', energy: Math.round(producerEnergy * rate), examples: '草食动物' },
      { name: '次级消费者', energy: Math.round(producerEnergy * rate * rate), examples: '小型肉食动物' },
      { name: '三级消费者', energy: Math.round(producerEnergy * rate * rate * rate), examples: '大型肉食动物' },
    ]
  }

  const levels = calculateLevels()

  // 图表数据
  const chartData = levels.map(l => ({
    name: l.name,
    能量: l.energy
  }))

  return (
    <div className="space-y-6">
      {/* 说明 */}
      <div className="text-sm text-[var(--text-secondary)]">
        调节参数观察能量在食物链中的流动规律
      </div>

      {/* 控制面板 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[var(--text-primary)]">生产者固定能量</span>
            <span className="text-sm text-[var(--text-secondary)]">{producerEnergy} kJ</span>
          </div>
          <input
            type="range"
            min="1000"
            max="50000"
            step="1000"
            value={producerEnergy}
            onChange={(e) => setProducerEnergy(Number(e.target.value))}
            className="w-full accent-[var(--text-primary)]"
          />
        </div>

        <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[var(--text-primary)]">能量传递效率</span>
            <span className="text-sm text-[var(--text-secondary)]">{transferRate}%</span>
          </div>
          <input
            type="range"
            min="5"
            max="25"
            value={transferRate}
            onChange={(e) => setTransferRate(Number(e.target.value))}
            className="w-full accent-[var(--text-primary)]"
          />
          <div className="flex justify-between text-xs text-[var(--text-tertiary)] mt-1">
            <span>5%</span>
            <span>10-20% (正常范围)</span>
            <span>25%</span>
          </div>
        </div>
      </div>

      {/* 能量金字塔 */}
      <div className="relative py-8">
        <svg viewBox="0 0 400 250" className="w-full h-auto max-w-lg mx-auto">
          {levels.map((level, i) => {
            const width = 350 - i * 80
            const x = (400 - width) / 2
            const y = 20 + i * 55
            const height = 45

            return (
              <motion.g
                key={level.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {/* 能量条 */}
                <rect
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  rx={4}
                  fill={`rgba(82, 82, 82, ${1 - i * 0.2})`}
                />

                {/* 营养级名称 */}
                <text
                  x={200}
                  y={y + 20}
                  textAnchor="middle"
                  fill="var(--bg-primary)"
                  fontSize="12"
                  fontWeight="bold"
                >
                  {level.name}
                </text>

                {/* 能量值 */}
                <text
                  x={200}
                  y={y + 36}
                  textAnchor="middle"
                  fill="var(--bg-primary)"
                  fontSize="10"
                >
                  {level.energy.toLocaleString()} kJ
                </text>

                {/* 传递效率箭头 */}
                {i < levels.length - 1 && (
                  <g>
                    <path
                      d={`M${200} ${y + height + 2} L${200} ${y + height + 8}`}
                      stroke="var(--text-tertiary)"
                      strokeWidth="2"
                      markerEnd="url(#arrowhead)"
                    />
                    <text
                      x={220}
                      y={y + height + 8}
                      fill="var(--text-tertiary)"
                      fontSize="8"
                    >
                      {transferRate}%
                    </text>
                  </g>
                )}
              </motion.g>
            )
          })}

          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="var(--text-tertiary)" />
            </marker>
          </defs>
        </svg>
      </div>

      {/* 柱状图 */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
            <XAxis type="number" stroke="var(--text-tertiary)" tick={{ fill: 'var(--text-tertiary)', fontSize: 12 }} />
            <YAxis dataKey="name" type="category" stroke="var(--text-tertiary)" tick={{ fill: 'var(--text-tertiary)', fontSize: 12 }} width={80} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px'
              }}
              labelStyle={{ color: 'var(--text-primary)' }}
            />
            <Bar dataKey="能量" fill="var(--text-primary)" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 能量去向分析 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
        <h4 className="font-medium text-[var(--text-primary)] mb-3">能量去向分析（以初级消费者为例）</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-sm">
          <div className="p-3 rounded bg-[var(--bg-secondary)]">
            <p className="text-[var(--text-tertiary)]">摄入量</p>
            <p className="font-bold text-[var(--text-primary)]">100%</p>
          </div>
          <div className="p-3 rounded bg-[var(--bg-secondary)]">
            <p className="text-[var(--text-tertiary)]">粪便</p>
            <p className="font-bold text-[var(--text-primary)]">~30%</p>
          </div>
          <div className="p-3 rounded bg-[var(--bg-secondary)]">
            <p className="text-[var(--text-tertiary)]">呼吸消耗</p>
            <p className="font-bold text-[var(--text-primary)]">~50%</p>
          </div>
          <div className="p-3 rounded bg-[var(--bg-secondary)]">
            <p className="text-[var(--text-tertiary)]">生长繁殖</p>
            <p className="font-bold text-[var(--text-primary)]">~20%</p>
          </div>
        </div>
      </div>

      {/* 知识点 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)] text-sm">
        <p className="font-medium text-[var(--text-primary)] mb-2">能量流动特点：</p>
        <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
          <li><strong>单向流动</strong>：能量沿食物链单向传递，不可逆</li>
          <li><strong>逐级递减</strong>：每个营养级只能获得上一级约10%-20%的能量</li>
          <li><strong>能量来源</strong>：生态系统的能量最终来自太阳能</li>
          <li><strong>能量散失</strong>：各营养级通过呼吸作用散失大量能量</li>
          <li><strong>营养级限制</strong>：由于能量递减，食物链一般不超过4-5个营养级</li>
        </ul>
      </div>
    </div>
  )
}
