import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function AuxinSimulation() {
  const [lightDirection, setLightDirection] = useState<'left' | 'right' | 'top'>('right')
  const [auxinConcentration, setAuxinConcentration] = useState(50)
  const [showPhototropism] = useState(true)
  const [time, setTime] = useState(0)

  useEffect(() => {
    if (!showPhototropism) return
    const interval = setInterval(() => {
      setTime(prev => (prev + 1) % 100)
    }, 100)
    return () => clearInterval(interval)
  }, [showPhototropism])

  // 计算弯曲角度
  const getBendAngle = () => {
    if (lightDirection === 'top') return 0
    const baseAngle = lightDirection === 'right' ? -30 : 30
    return baseAngle * Math.sin(time / 20)
  }

  // 生长素浓度与生长效应
  const getGrowthEffect = (conc: number, organ: 'stem' | 'root') => {
    if (organ === 'stem') {
      if (conc < 10) return '促进（弱）'
      if (conc < 50) return '促进（中）'
      if (conc < 80) return '促进（强）'
      return '抑制'
    } else {
      if (conc < 5) return '促进（弱）'
      if (conc < 20) return '促进（强）'
      if (conc < 40) return '促进（弱）'
      return '抑制'
    }
  }

  return (
    <div className="space-y-6">
      {/* 说明 */}
      <div className="text-sm text-[var(--text-secondary)]">
        生长素是第一个被发现的植物激素，具有促进生长的作用
      </div>

      {/* 向光性演示 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
        <h3 className="font-medium text-[var(--text-primary)] mb-4">向光性实验</h3>

        {/* 光源方向选择 */}
        <div className="flex gap-2 mb-4">
          <span className="text-sm text-[var(--text-secondary)]">光源方向：</span>
          {(['left', 'top', 'right'] as const).map((dir) => (
            <button
              key={dir}
              onClick={() => setLightDirection(dir)}
              className={`px-3 py-1 rounded text-sm ${
                lightDirection === dir
                  ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
                  : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)]'
              }`}
            >
              {dir === 'left' ? '左侧' : dir === 'right' ? '右侧' : '顶部'}
            </button>
          ))}
        </div>

        <div className="relative h-64 rounded-lg bg-[var(--bg-secondary)] overflow-hidden">
          <svg viewBox="0 0 400 220" className="w-full h-full">
            {/* 光源 */}
            <motion.g
              animate={{
                x: lightDirection === 'left' ? 0 : lightDirection === 'right' ? 300 : 150,
                y: lightDirection === 'top' ? 0 : 80
              }}
            >
              <circle cx="50" cy="50" r="25" fill="var(--text-primary)" opacity="0.8" />
              <text x="50" y="55" textAnchor="middle" fill="var(--bg-primary)" fontSize="10">光</text>
              {/* 光线 */}
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.line
                  key={i}
                  x1="75"
                  y1={35 + i * 8}
                  x2="120"
                  y2={35 + i * 8}
                  stroke="var(--text-primary)"
                  strokeWidth="2"
                  opacity="0.5"
                  animate={{ x2: [120, 140, 120] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                />
              ))}
            </motion.g>

            {/* 花盆 */}
            <path d="M170 200 L180 180 L220 180 L230 200 Z" fill="var(--text-tertiary)" />
            <rect x="175" y="165" width="50" height="15" fill="var(--text-secondary)" rx="2" />

            {/* 植物茎 */}
            <motion.g
              style={{ transformOrigin: '200px 165px' }}
              animate={{ rotate: getBendAngle() }}
            >
              <rect x="195" y="100" width="10" height="65" fill="var(--text-secondary)" rx="2" />
              {/* 叶子 */}
              <ellipse cx="185" cy="120" rx="15" ry="8" fill="var(--text-secondary)" transform="rotate(-30, 185, 120)" />
              <ellipse cx="215" cy="130" rx="15" ry="8" fill="var(--text-secondary)" transform="rotate(30, 215, 130)" />
              {/* 顶端 */}
              <ellipse cx="200" cy="95" rx="8" ry="12" fill="var(--text-secondary)" />
            </motion.g>

            {/* 生长素分布标注 */}
            {lightDirection !== 'top' && (
              <g>
                <text x="200" y="75" textAnchor="middle" fill="var(--text-tertiary)" fontSize="9">
                  生长素向背光侧移动
                </text>
                <motion.rect
                  x={lightDirection === 'right' ? 190 : 200}
                  y="100"
                  width="5"
                  height="50"
                  fill="var(--text-primary)"
                  opacity="0.5"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </g>
            )}
          </svg>
        </div>

        <p className="text-xs text-center text-[var(--text-tertiary)] mt-2">
          单侧光照射 → 生长素向背光侧移动 → 背光侧生长快 → 植物向光弯曲
        </p>
      </div>

      {/* 生长素作用的两重性 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
        <h3 className="font-medium text-[var(--text-primary)] mb-4">生长素作用的两重性</h3>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[var(--text-secondary)]">生长素浓度</span>
            <span className="text-sm text-[var(--text-primary)]">{auxinConcentration} μmol/L</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={auxinConcentration}
            onChange={(e) => setAuxinConcentration(Number(e.target.value))}
            className="w-full accent-[var(--text-primary)]"
          />
        </div>

        {/* 浓度-效应曲线 */}
        <div className="relative h-48 mb-4">
          <svg viewBox="0 0 300 160" className="w-full h-full">
            {/* 坐标轴 */}
            <line x1="40" y1="130" x2="280" y2="130" stroke="var(--text-secondary)" strokeWidth="2" />
            <line x1="40" y1="130" x2="40" y2="20" stroke="var(--text-secondary)" strokeWidth="2" />

            {/* 轴标签 */}
            <text x="160" y="150" textAnchor="middle" fill="var(--text-tertiary)" fontSize="10">生长素浓度</text>
            <text x="15" y="75" textAnchor="middle" fill="var(--text-tertiary)" fontSize="10" transform="rotate(-90, 15, 75)">生长效应</text>

            {/* 零线 */}
            <line x1="40" y1="90" x2="280" y2="90" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="3 3" />
            <text x="35" y="93" textAnchor="end" fill="var(--text-tertiary)" fontSize="8">0</text>

            {/* 茎的曲线 */}
            <path
              d="M40 90 Q80 50 120 40 Q160 35 200 60 Q240 90 280 120"
              fill="none"
              stroke="var(--text-primary)"
              strokeWidth="2"
            />
            <text x="120" y="30" fill="var(--text-primary)" fontSize="9">茎</text>

            {/* 根的曲线 */}
            <path
              d="M40 90 Q60 70 80 65 Q100 60 120 75 Q140 90 160 110 Q200 130 280 135"
              fill="none"
              stroke="var(--text-secondary)"
              strokeWidth="2"
            />
            <text x="80" y="55" fill="var(--text-secondary)" fontSize="9">根</text>

            {/* 当前浓度指示线 */}
            <motion.line
              x1={40 + auxinConcentration * 2.4}
              y1="20"
              x2={40 + auxinConcentration * 2.4}
              y2="130"
              stroke="var(--text-primary)"
              strokeWidth="1"
              strokeDasharray="5 3"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }}
            />

            {/* 促进/抑制区域标注 */}
            <text x="100" y="115" fill="var(--text-tertiary)" fontSize="8">促进</text>
            <text x="250" y="115" fill="var(--text-tertiary)" fontSize="8">抑制</text>
          </svg>
        </div>

        {/* 当前效果显示 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-lg bg-[var(--bg-secondary)] text-center">
            <div className="text-sm text-[var(--text-tertiary)]">对茎的作用</div>
            <div className="text-lg font-medium text-[var(--text-primary)]">
              {getGrowthEffect(auxinConcentration, 'stem')}
            </div>
          </div>
          <div className="p-3 rounded-lg bg-[var(--bg-secondary)] text-center">
            <div className="text-sm text-[var(--text-tertiary)]">对根的作用</div>
            <div className="text-lg font-medium text-[var(--text-secondary)]">
              {getGrowthEffect(auxinConcentration, 'root')}
            </div>
          </div>
        </div>

        <p className="text-xs text-center text-[var(--text-tertiary)] mt-3">
          低浓度促进生长，高浓度抑制生长；根对生长素更敏感
        </p>
      </div>

      {/* 顶端优势 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
        <h3 className="font-medium text-[var(--text-primary)] mb-3">顶端优势</h3>
        <div className="flex items-center justify-around">
          <div className="text-center">
            <svg viewBox="0 0 80 100" className="w-20 h-24">
              <rect x="35" y="30" width="10" height="60" fill="var(--text-secondary)" />
              <circle cx="40" cy="25" r="10" fill="var(--text-primary)" />
              <text x="40" y="28" textAnchor="middle" fill="var(--bg-primary)" fontSize="8">顶芽</text>
              <circle cx="25" cy="50" r="5" fill="var(--text-tertiary)" opacity="0.5" />
              <circle cx="55" cy="60" r="5" fill="var(--text-tertiary)" opacity="0.5" />
              <text x="40" y="98" textAnchor="middle" fill="var(--text-tertiary)" fontSize="8">侧芽受抑制</text>
            </svg>
          </div>
          <div className="text-2xl text-[var(--text-tertiary)]">→</div>
          <div className="text-center">
            <svg viewBox="0 0 80 100" className="w-20 h-24">
              <rect x="35" y="40" width="10" height="50" fill="var(--text-secondary)" />
              <line x1="40" y1="35" x2="40" y2="40" stroke="var(--text-tertiary)" strokeWidth="2" strokeDasharray="2 2" />
              <circle cx="25" cy="50" r="8" fill="var(--text-secondary)" />
              <circle cx="55" cy="60" r="8" fill="var(--text-secondary)" />
              <text x="40" y="98" textAnchor="middle" fill="var(--text-tertiary)" fontSize="8">去顶后侧芽生长</text>
            </svg>
          </div>
        </div>
        <p className="text-sm text-[var(--text-secondary)] text-center mt-2">
          顶芽产生的生长素向下运输，抑制侧芽生长
        </p>
      </div>

      {/* 知识点 */}
      <div className="p-4 rounded-lg bg-[var(--bg-tertiary)] text-sm">
        <p className="font-medium text-[var(--text-primary)] mb-2">生长素要点：</p>
        <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
          <li><strong>化学本质</strong>：吲哚乙酸（IAA）</li>
          <li><strong>产生部位</strong>：幼嫩的芽、叶、发育中的种子</li>
          <li><strong>运输方式</strong>：极性运输（从形态学上端到下端）</li>
          <li><strong>两重性</strong>：低浓度促进，高浓度抑制</li>
          <li><strong>应用</strong>：促进扦插生根、无籽果实、除草剂</li>
        </ul>
      </div>
    </div>
  )
}
