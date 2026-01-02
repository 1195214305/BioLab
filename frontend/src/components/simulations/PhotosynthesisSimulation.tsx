import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function PhotosynthesisSimulation() {
  const [lightIntensity, setLightIntensity] = useState(50)
  const [co2Concentration, setCo2Concentration] = useState(50)
  const [temperature, setTemperature] = useState(25)
  const [isRunning, setIsRunning] = useState(false)
  const [data, setData] = useState<{ time: number; rate: number }[]>([])

  // 计算光合作用速率
  const calculateRate = () => {
    // 光照影响（0-100）
    const lightFactor = lightIntensity < 20 ? lightIntensity / 20 :
                        lightIntensity < 80 ? 1 :
                        1 - (lightIntensity - 80) / 100

    // CO2影响（0-100）
    const co2Factor = co2Concentration < 10 ? co2Concentration / 10 :
                      co2Concentration < 60 ? 1 :
                      1 - (co2Concentration - 60) / 200

    // 温度影响（最适温度25-30°C）
    const tempFactor = temperature < 10 ? temperature / 10 :
                       temperature < 25 ? 0.8 + (temperature - 10) / 75 :
                       temperature < 35 ? 1 :
                       Math.max(0, 1 - (temperature - 35) / 20)

    // 综合速率（取最小限制因子）
    const rate = Math.min(lightFactor, co2Factor, tempFactor) * 100
    return Math.max(0, Math.round(rate))
  }

  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      setData(prev => {
        const newTime = prev.length > 0 ? prev[prev.length - 1].time + 1 : 0
        const newData = [...prev, { time: newTime, rate: calculateRate() }]
        return newData.slice(-20) // 保留最近20个数据点
      })
    }, 500)

    return () => clearInterval(interval)
  }, [isRunning, lightIntensity, co2Concentration, temperature])

  const currentRate = calculateRate()

  return (
    <div className="space-y-6">
      {/* 说明 */}
      <div className="text-sm text-[var(--text-secondary)]">
        调节光照强度、CO₂浓度和温度，观察光合作用速率的变化
      </div>

      {/* 控制面板 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* 光照强度 */}
        <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[var(--text-primary)]">光照强度</span>
            <span className="text-sm text-[var(--text-secondary)]">{lightIntensity}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={lightIntensity}
            onChange={(e) => setLightIntensity(Number(e.target.value))}
            className="w-full accent-[var(--text-primary)]"
          />
          <div className="flex justify-between text-xs text-[var(--text-tertiary)] mt-1">
            <span>暗</span>
            <span>强光</span>
          </div>
        </div>

        {/* CO2浓度 */}
        <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[var(--text-primary)]">CO₂浓度</span>
            <span className="text-sm text-[var(--text-secondary)]">{co2Concentration}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={co2Concentration}
            onChange={(e) => setCo2Concentration(Number(e.target.value))}
            className="w-full accent-[var(--text-primary)]"
          />
          <div className="flex justify-between text-xs text-[var(--text-tertiary)] mt-1">
            <span>低</span>
            <span>高</span>
          </div>
        </div>

        {/* 温度 */}
        <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[var(--text-primary)]">温度</span>
            <span className="text-sm text-[var(--text-secondary)]">{temperature}°C</span>
          </div>
          <input
            type="range"
            min="0"
            max="50"
            value={temperature}
            onChange={(e) => setTemperature(Number(e.target.value))}
            className="w-full accent-[var(--text-primary)]"
          />
          <div className="flex justify-between text-xs text-[var(--text-tertiary)] mt-1">
            <span>0°C</span>
            <span>50°C</span>
          </div>
        </div>
      </div>

      {/* 当前速率显示 */}
      <div className="flex items-center justify-center gap-8 py-6">
        <div className="text-center">
          <div className="text-4xl font-bold text-[var(--text-primary)]">{currentRate}%</div>
          <div className="text-sm text-[var(--text-secondary)]">光合作用速率</div>
        </div>
        <button
          onClick={() => {
            setIsRunning(!isRunning)
            if (!isRunning) setData([])
          }}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            isRunning
              ? 'bg-[var(--bg-tertiary)] text-[var(--text-primary)] border border-[var(--border-color)]'
              : 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
          }`}
        >
          {isRunning ? '停止记录' : '开始记录'}
        </button>
      </div>

      {/* 图表 */}
      {data.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="h-64"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis
                dataKey="time"
                stroke="var(--text-tertiary)"
                tick={{ fill: 'var(--text-tertiary)', fontSize: 12 }}
              />
              <YAxis
                domain={[0, 100]}
                stroke="var(--text-tertiary)"
                tick={{ fill: 'var(--text-tertiary)', fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px'
                }}
                labelStyle={{ color: 'var(--text-primary)' }}
              />
              <Line
                type="monotone"
                dataKey="rate"
                stroke="var(--text-primary)"
                strokeWidth={2}
                dot={false}
                name="光合作用速率"
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      )}

      {/* 叶绿体动画 */}
      <div className="relative h-48 rounded-lg bg-[var(--bg-tertiary)] overflow-hidden">
        <svg viewBox="0 0 200 100" className="w-full h-full">
          {/* 叶绿体外膜 */}
          <ellipse cx="100" cy="50" rx="80" ry="40" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <ellipse cx="100" cy="50" rx="75" ry="37" fill="none" stroke="var(--text-secondary)" strokeWidth="1" />

          {/* 基粒（类囊体堆叠） */}
          {[30, 60, 90, 120, 150].map((x, i) => (
            <g key={i}>
              {[0, 1, 2, 3].map((j) => (
                <ellipse
                  key={j}
                  cx={x}
                  cy={45 + j * 5}
                  rx={12}
                  ry={3}
                  fill="var(--text-tertiary)"
                  opacity={0.6 + (lightIntensity / 100) * 0.4}
                />
              ))}
            </g>
          ))}

          {/* 光反应箭头 */}
          <motion.g
            animate={{ opacity: lightIntensity > 10 ? [0.3, 1, 0.3] : 0.1 }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <path d="M20 20 L40 35" stroke="var(--text-primary)" strokeWidth="2" markerEnd="url(#arrow)" />
            <text x="10" y="15" fill="var(--text-secondary)" fontSize="8">光</text>
          </motion.g>

          {/* CO2 进入 */}
          <motion.g
            animate={{ x: co2Concentration > 10 ? [0, 10, 0] : 0 }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <text x="160" y="30" fill="var(--text-secondary)" fontSize="8">CO₂</text>
            <path d="M175 35 L155 45" stroke="var(--text-secondary)" strokeWidth="1" strokeDasharray="3 2" />
          </motion.g>

          {/* O2 释放 */}
          <motion.g
            animate={{ y: currentRate > 20 ? [0, -5, 0] : 0, opacity: currentRate > 20 ? [0.5, 1, 0.5] : 0.2 }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <text x="160" y="75" fill="var(--text-secondary)" fontSize="8">O₂</text>
            <path d="M155 65 L175 60" stroke="var(--text-secondary)" strokeWidth="1" />
          </motion.g>

          {/* 葡萄糖生成 */}
          <motion.text
            x="100"
            y="85"
            textAnchor="middle"
            fill="var(--text-primary)"
            fontSize="10"
            animate={{ opacity: currentRate > 30 ? [0.5, 1, 0.5] : 0.2 }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            C₆H₁₂O₆
          </motion.text>

          <defs>
            <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="var(--text-primary)" />
            </marker>
          </defs>
        </svg>
      </div>

      {/* 知识点提示 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)] text-sm text-[var(--text-secondary)]">
        <p className="font-medium text-[var(--text-primary)] mb-2">限制因子原理：</p>
        <ul className="list-disc list-inside space-y-1">
          <li>光合作用速率受多个因素影响，取决于最不足的那个因素（限制因子）</li>
          <li>光照不足时，增加CO₂浓度不能提高光合速率</li>
          <li>温度过高或过低都会降低酶活性，影响光合作用</li>
        </ul>
      </div>
    </div>
  )
}
