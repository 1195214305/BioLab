// 高中生物知识点数据 - 人教版
export interface KnowledgePoint {
  id: string
  title: string
  description: string
  category: string
  subcategory: string
  hasSimulation: boolean
  keywords: string[]
}

export interface Category {
  id: string
  name: string
  description: string
  icon: string
  subcategories: Subcategory[]
}

export interface Subcategory {
  id: string
  name: string
  knowledgePoints: KnowledgePoint[]
}

// 必修一：分子与细胞
const molecular: Category = {
  id: 'molecular',
  name: '分子与细胞',
  description: '必修一：探索生命的物质基础和细胞结构',
  icon: 'cell',
  subcategories: [
    {
      id: 'cell-composition',
      name: '细胞的分子组成',
      knowledgePoints: [
        {
          id: 'elements-compounds',
          title: '组成细胞的元素和化合物',
          description: '了解组成细胞的主要元素（C、H、O、N、P、S等）和化合物（水、无机盐、糖类、脂质、蛋白质、核酸）',
          category: 'molecular',
          subcategory: 'cell-composition',
          hasSimulation: true,
          keywords: ['元素', '化合物', '碳', '氢', '氧', '氮']
        },
        {
          id: 'protein-structure',
          title: '蛋白质的结构与功能',
          description: '蛋白质的基本单位是氨基酸，通过脱水缩合形成肽链，具有多种重要功能',
          category: 'molecular',
          subcategory: 'cell-composition',
          hasSimulation: true,
          keywords: ['蛋白质', '氨基酸', '肽键', '脱水缩合']
        },
        {
          id: 'nucleic-acid',
          title: '核酸的结构与功能',
          description: 'DNA和RNA的结构特点、分布位置及功能差异',
          category: 'molecular',
          subcategory: 'cell-composition',
          hasSimulation: true,
          keywords: ['DNA', 'RNA', '核苷酸', '碱基配对']
        }
      ]
    },
    {
      id: 'cell-structure',
      name: '细胞的基本结构',
      knowledgePoints: [
        {
          id: 'cell-membrane',
          title: '细胞膜的结构与功能',
          description: '流动镶嵌模型，磷脂双分子层，膜蛋白的功能',
          category: 'molecular',
          subcategory: 'cell-structure',
          hasSimulation: true,
          keywords: ['细胞膜', '磷脂双分子层', '流动镶嵌模型', '选择透过性']
        },
        {
          id: 'cell-organelles',
          title: '细胞器的结构与功能',
          description: '线粒体、叶绿体、内质网、高尔基体、核糖体、溶酶体、液泡等细胞器',
          category: 'molecular',
          subcategory: 'cell-structure',
          hasSimulation: true,
          keywords: ['线粒体', '叶绿体', '内质网', '高尔基体', '核糖体']
        },
        {
          id: 'cell-nucleus',
          title: '细胞核的结构与功能',
          description: '核膜、核仁、染色质/染色体，细胞核是遗传信息库',
          category: 'molecular',
          subcategory: 'cell-structure',
          hasSimulation: true,
          keywords: ['细胞核', '核膜', '染色质', '染色体']
        }
      ]
    },
    {
      id: 'cell-metabolism',
      name: '细胞的能量供应和利用',
      knowledgePoints: [
        {
          id: 'enzyme',
          title: '酶的作用与特性',
          description: '酶的本质、作用机理、特性（高效性、专一性、多样性）及影响因素',
          category: 'molecular',
          subcategory: 'cell-metabolism',
          hasSimulation: true,
          keywords: ['酶', '催化', '活性', '底物', '专一性']
        },
        {
          id: 'atp',
          title: 'ATP的结构与功能',
          description: 'ATP的分子结构、与ADP的相互转化、在能量代谢中的作用',
          category: 'molecular',
          subcategory: 'cell-metabolism',
          hasSimulation: true,
          keywords: ['ATP', 'ADP', '高能磷酸键', '能量货币']
        },
        {
          id: 'photosynthesis',
          title: '光合作用',
          description: '光反应和暗反应的过程、场所、条件及影响因素',
          category: 'molecular',
          subcategory: 'cell-metabolism',
          hasSimulation: true,
          keywords: ['光合作用', '光反应', '暗反应', '叶绿体', 'CO2固定']
        },
        {
          id: 'respiration',
          title: '细胞呼吸',
          description: '有氧呼吸和无氧呼吸的过程、场所、产物及能量变化',
          category: 'molecular',
          subcategory: 'cell-metabolism',
          hasSimulation: true,
          keywords: ['有氧呼吸', '无氧呼吸', '线粒体', '糖酵解']
        }
      ]
    },
    {
      id: 'cell-lifecycle',
      name: '细胞的生命历程',
      knowledgePoints: [
        {
          id: 'cell-division',
          title: '细胞分裂',
          description: '有丝分裂和减数分裂的过程、特点及意义',
          category: 'molecular',
          subcategory: 'cell-lifecycle',
          hasSimulation: true,
          keywords: ['有丝分裂', '减数分裂', '染色体', '纺锤体']
        },
        {
          id: 'cell-differentiation',
          title: '细胞分化',
          description: '细胞分化的概念、特点、原因及意义',
          category: 'molecular',
          subcategory: 'cell-lifecycle',
          hasSimulation: true,
          keywords: ['细胞分化', '基因表达', '干细胞']
        },
        {
          id: 'cell-aging-death',
          title: '细胞的衰老与凋亡',
          description: '细胞衰老的特征、细胞凋亡的概念及意义',
          category: 'molecular',
          subcategory: 'cell-lifecycle',
          hasSimulation: true,
          keywords: ['细胞衰老', '细胞凋亡', '程序性死亡']
        }
      ]
    }
  ]
}

// 必修二：遗传与进化
const genetics: Category = {
  id: 'genetics',
  name: '遗传与进化',
  description: '必修二：探索遗传规律和生物进化',
  icon: 'dna',
  subcategories: [
    {
      id: 'mendel-laws',
      name: '遗传的基本规律',
      knowledgePoints: [
        {
          id: 'segregation-law',
          title: '分离定律',
          description: '孟德尔豌豆杂交实验，等位基因的分离',
          category: 'genetics',
          subcategory: 'mendel-laws',
          hasSimulation: true,
          keywords: ['分离定律', '等位基因', '显性', '隐性', '基因型', '表现型']
        },
        {
          id: 'free-combination',
          title: '自由组合定律',
          description: '非同源染色体上非等位基因的自由组合',
          category: 'genetics',
          subcategory: 'mendel-laws',
          hasSimulation: true,
          keywords: ['自由组合', '非等位基因', '9:3:3:1']
        },
        {
          id: 'sex-linked',
          title: '伴性遗传',
          description: 'X染色体和Y染色体上基因的遗传特点',
          category: 'genetics',
          subcategory: 'mendel-laws',
          hasSimulation: true,
          keywords: ['伴性遗传', 'X染色体', '红绿色盲', '血友病']
        }
      ]
    },
    {
      id: 'gene-expression',
      name: '基因的本质与表达',
      knowledgePoints: [
        {
          id: 'dna-replication',
          title: 'DNA复制',
          description: 'DNA半保留复制的过程、条件和特点',
          category: 'genetics',
          subcategory: 'gene-expression',
          hasSimulation: true,
          keywords: ['DNA复制', '半保留复制', '解旋', 'DNA聚合酶']
        },
        {
          id: 'transcription',
          title: '转录',
          description: '以DNA为模板合成RNA的过程',
          category: 'genetics',
          subcategory: 'gene-expression',
          hasSimulation: true,
          keywords: ['转录', 'mRNA', 'RNA聚合酶', '模板链']
        },
        {
          id: 'translation',
          title: '翻译',
          description: '以mRNA为模板合成蛋白质的过程',
          category: 'genetics',
          subcategory: 'gene-expression',
          hasSimulation: true,
          keywords: ['翻译', '核糖体', 'tRNA', '密码子', '反密码子']
        },
        {
          id: 'central-dogma',
          title: '中心法则',
          description: '遗传信息的传递规律：DNA→RNA→蛋白质',
          category: 'genetics',
          subcategory: 'gene-expression',
          hasSimulation: true,
          keywords: ['中心法则', '遗传信息', '逆转录']
        }
      ]
    },
    {
      id: 'mutation-variation',
      name: '变异与进化',
      knowledgePoints: [
        {
          id: 'gene-mutation',
          title: '基因突变',
          description: '基因突变的概念、类型、特点及意义',
          category: 'genetics',
          subcategory: 'mutation-variation',
          hasSimulation: true,
          keywords: ['基因突变', '碱基替换', '插入', '缺失']
        },
        {
          id: 'chromosome-variation',
          title: '染色体变异',
          description: '染色体结构变异和数目变异',
          category: 'genetics',
          subcategory: 'mutation-variation',
          hasSimulation: true,
          keywords: ['染色体变异', '缺失', '重复', '倒位', '易位', '多倍体']
        },
        {
          id: 'evolution',
          title: '生物进化',
          description: '现代生物进化理论，自然选择与物种形成',
          category: 'genetics',
          subcategory: 'mutation-variation',
          hasSimulation: true,
          keywords: ['进化', '自然选择', '基因频率', '物种形成']
        }
      ]
    }
  ]
}

// 必修三：稳态与环境
const homeostasis: Category = {
  id: 'homeostasis',
  name: '稳态与环境',
  description: '必修三：探索生命活动的调节和生态系统',
  icon: 'ecosystem',
  subcategories: [
    {
      id: 'internal-environment',
      name: '内环境与稳态',
      knowledgePoints: [
        {
          id: 'internal-env',
          title: '内环境的组成与稳态',
          description: '细胞外液的组成、理化性质及稳态的调节',
          category: 'homeostasis',
          subcategory: 'internal-environment',
          hasSimulation: true,
          keywords: ['内环境', '细胞外液', '血浆', '组织液', '淋巴']
        }
      ]
    },
    {
      id: 'regulation',
      name: '生命活动的调节',
      knowledgePoints: [
        {
          id: 'nerve-regulation',
          title: '神经调节',
          description: '反射弧的结构、兴奋的传导和传递',
          category: 'homeostasis',
          subcategory: 'regulation',
          hasSimulation: true,
          keywords: ['神经调节', '反射弧', '突触', '神经递质']
        },
        {
          id: 'hormone-regulation',
          title: '体液调节',
          description: '激素的种类、作用特点及反馈调节',
          category: 'homeostasis',
          subcategory: 'regulation',
          hasSimulation: true,
          keywords: ['激素', '体液调节', '反馈调节', '甲状腺激素']
        },
        {
          id: 'immune-regulation',
          title: '免疫调节',
          description: '免疫系统的组成、特异性免疫的过程',
          category: 'homeostasis',
          subcategory: 'regulation',
          hasSimulation: true,
          keywords: ['免疫', '抗原', '抗体', 'T细胞', 'B细胞']
        },
        {
          id: 'blood-sugar',
          title: '血糖调节',
          description: '胰岛素和胰高血糖素对血糖的调节',
          category: 'homeostasis',
          subcategory: 'regulation',
          hasSimulation: true,
          keywords: ['血糖', '胰岛素', '胰高血糖素', '糖尿病']
        }
      ]
    },
    {
      id: 'plant-hormone',
      name: '植物激素调节',
      knowledgePoints: [
        {
          id: 'auxin',
          title: '生长素的作用',
          description: '生长素的发现、作用特点及应用',
          category: 'homeostasis',
          subcategory: 'plant-hormone',
          hasSimulation: true,
          keywords: ['生长素', '向光性', '顶端优势', '两重性']
        },
        {
          id: 'other-hormones',
          title: '其他植物激素',
          description: '赤霉素、细胞分裂素、脱落酸、乙烯的作用',
          category: 'homeostasis',
          subcategory: 'plant-hormone',
          hasSimulation: true,
          keywords: ['赤霉素', '细胞分裂素', '脱落酸', '乙烯']
        }
      ]
    },
    {
      id: 'ecosystem',
      name: '生态系统',
      knowledgePoints: [
        {
          id: 'ecosystem-structure',
          title: '生态系统的结构',
          description: '生态系统的组成成分和营养结构',
          category: 'homeostasis',
          subcategory: 'ecosystem',
          hasSimulation: true,
          keywords: ['生产者', '消费者', '分解者', '食物链', '食物网']
        },
        {
          id: 'energy-flow',
          title: '能量流动',
          description: '能量流动的过程、特点及效率',
          category: 'homeostasis',
          subcategory: 'ecosystem',
          hasSimulation: true,
          keywords: ['能量流动', '营养级', '能量传递效率', '10%-20%']
        },
        {
          id: 'matter-cycle',
          title: '物质循环',
          description: '碳循环、氮循环等物质循环过程',
          category: 'homeostasis',
          subcategory: 'ecosystem',
          hasSimulation: true,
          keywords: ['物质循环', '碳循环', '氮循环', '温室效应']
        },
        {
          id: 'information-transfer',
          title: '信息传递',
          description: '生态系统中信息的种类和作用',
          category: 'homeostasis',
          subcategory: 'ecosystem',
          hasSimulation: true,
          keywords: ['信息传递', '物理信息', '化学信息', '行为信息']
        }
      ]
    }
  ]
}

// 选修：生物技术与工程
const biotech: Category = {
  id: 'biotech',
  name: '生物技术与工程',
  description: '选修：探索现代生物技术的原理与应用',
  icon: 'biotech',
  subcategories: [
    {
      id: 'gene-engineering',
      name: '基因工程',
      knowledgePoints: [
        {
          id: 'gene-tools',
          title: '基因工程的工具',
          description: '限制性内切酶、DNA连接酶、载体',
          category: 'biotech',
          subcategory: 'gene-engineering',
          hasSimulation: true,
          keywords: ['限制酶', 'DNA连接酶', '载体', '质粒']
        },
        {
          id: 'gene-operation',
          title: '基因工程的操作步骤',
          description: '目的基因的获取、重组、导入和检测',
          category: 'biotech',
          subcategory: 'gene-engineering',
          hasSimulation: true,
          keywords: ['PCR', '重组DNA', '转化', '筛选']
        }
      ]
    },
    {
      id: 'cell-engineering',
      name: '细胞工程',
      knowledgePoints: [
        {
          id: 'plant-tissue-culture',
          title: '植物组织培养',
          description: '植物组织培养的原理、过程和应用',
          category: 'biotech',
          subcategory: 'cell-engineering',
          hasSimulation: true,
          keywords: ['组织培养', '脱分化', '再分化', '愈伤组织']
        },
        {
          id: 'animal-cloning',
          title: '动物克隆',
          description: '体细胞核移植技术的原理和应用',
          category: 'biotech',
          subcategory: 'cell-engineering',
          hasSimulation: true,
          keywords: ['克隆', '核移植', '多利羊']
        }
      ]
    },
    {
      id: 'fermentation',
      name: '发酵工程',
      knowledgePoints: [
        {
          id: 'fermentation-principle',
          title: '发酵原理与应用',
          description: '微生物发酵的原理、条件控制和应用',
          category: 'biotech',
          subcategory: 'fermentation',
          hasSimulation: true,
          keywords: ['发酵', '微生物', '酵母菌', '乳酸菌']
        }
      ]
    }
  ]
}

export const categories: Category[] = [molecular, genetics, homeostasis, biotech]

export const getAllKnowledgePoints = (): KnowledgePoint[] => {
  const points: KnowledgePoint[] = []
  categories.forEach(cat => {
    cat.subcategories.forEach(sub => {
      points.push(...sub.knowledgePoints)
    })
  })
  return points
}

export const getKnowledgePointById = (id: string): KnowledgePoint | undefined => {
  return getAllKnowledgePoints().find(p => p.id === id)
}

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(c => c.id === id)
}

export const searchKnowledgePoints = (query: string): KnowledgePoint[] => {
  const lowerQuery = query.toLowerCase()
  return getAllKnowledgePoints().filter(p =>
    p.title.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.keywords.some(k => k.toLowerCase().includes(lowerQuery))
  )
}
