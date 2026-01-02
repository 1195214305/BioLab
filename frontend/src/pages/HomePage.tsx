import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { categories } from '../data/knowledge'
import { Microscope, Dna, Leaf, FlaskConical, ChevronRight, BookOpen, Sparkles, LucideIcon } from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  cell: Microscope,
  dna: Dna,
  ecosystem: Leaf,
  biotech: FlaskConical,
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[var(--bg-secondary)] opacity-50" />
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg-tertiary)] text-[var(--text-secondary)] text-sm mb-6">
              <Sparkles size={16} />
              <span>人教版高中生物全覆盖</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-6">
              高中生物知识学习系统
            </h1>
            <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-8">
              交互式动态演示，让生物学习更直观、更有趣。
              涵盖必修一至必修三及选修内容。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/category/molecular"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--text-primary)] text-[var(--bg-primary)] font-medium hover:opacity-90 transition-opacity"
              >
                <BookOpen size={20} />
                开始学习
              </Link>
              <Link
                to="/settings"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[var(--border-color)] text-[var(--text-primary)] font-medium hover:bg-[var(--bg-secondary)] transition-colors"
              >
                配置 AI 辅导
              </Link>
            </div>
          </motion.div>
        </div>

        {/* DNA Animation Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 opacity-5" viewBox="0 0 100 100">
            <path
              d="M30 10 Q50 25 70 10 Q50 40 30 55 Q50 70 70 55 Q50 85 30 90"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="animate-flow"
            />
            <path
              d="M70 10 Q50 25 30 10 Q50 40 70 55 Q50 70 30 55 Q50 85 70 90"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="animate-flow"
            />
          </svg>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-2">
              知识模块
            </h2>
            <p className="text-[var(--text-secondary)] mb-8">
              选择一个模块开始探索
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const Icon = iconMap[category.icon] || Microscope
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * (index + 3) }}
                >
                  <Link
                    to={`/category/${category.id}`}
                    className="block p-6 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)] transition-all group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-[var(--bg-tertiary)] group-hover:bg-[var(--text-primary)] flex items-center justify-center mb-4 transition-colors">
                      <Icon size={24} className="text-[var(--text-primary)] group-hover:text-[var(--bg-primary)] transition-colors" />
                    </div>
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                      {category.name}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-2">
                      {category.description}
                    </p>
                    <div className="flex items-center text-sm text-[var(--text-tertiary)] group-hover:text-[var(--text-primary)] transition-colors">
                      <span>{category.subcategories.reduce((acc, sub) => acc + sub.knowledgePoints.length, 0)} 个知识点</span>
                      <ChevronRight size={16} className="ml-auto" />
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-4">
              核心特性
            </h2>
            <p className="text-[var(--text-secondary)]">
              让生物学习更高效
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: '交互式演示',
                description: '细胞结构、DNA复制、光合作用等知识点都有可交互的动态演示',
                icon: '🔬'
              },
              {
                title: 'AI 智能辅导',
                description: '集成通义千问大模型，随时解答你的生物学问题',
                icon: '🤖'
              },
              {
                title: '移动端适配',
                description: '响应式设计，手机、平板、电脑都能流畅使用',
                icon: '📱'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="p-6 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)]"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-4">
              热门知识点
            </h2>
            <p className="text-[var(--text-secondary)] mb-8">
              快速访问常用知识点
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { id: 'cell-organelles', name: '细胞器', emoji: '🔬' },
              { id: 'photosynthesis', name: '光合作用', emoji: '🌱' },
              { id: 'respiration', name: '细胞呼吸', emoji: '💨' },
              { id: 'dna-replication', name: 'DNA复制', emoji: '🧬' },
              { id: 'segregation-law', name: '分离定律', emoji: '📊' },
              { id: 'energy-flow', name: '能量流动', emoji: '⚡' },
            ].map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.05 * index }}
              >
                <Link
                  to={`/knowledge/${item.id}`}
                  className="block p-4 rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)] transition-colors text-center"
                >
                  <div className="text-2xl mb-2">{item.emoji}</div>
                  <span className="text-sm font-medium text-[var(--text-primary)]">{item.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
