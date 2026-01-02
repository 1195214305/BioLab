# BioLab - 高中生物知识学习系统

![ESA Logo](https://img.alicdn.com/imgextra/i3/O1CN01H1UU3i1Cti9lYtFrs_!!6000000000139-2-tps-7534-844.png)

**本项目由 https://www.aliyun.com/product/esa 提供加速、计算和保护**

## 项目简介

BioLab 是一款基于阿里云 ESA Pages 边缘计算平台开发的高中生物知识学习系统。涵盖人教版高中生物必修一至必修三及选修内容，提供交互式动态演示，让生物学习更直观、更有趣。

### 核心特性

- **全面覆盖**：涵盖人教版高中生物全部知识点（必修1-3、选修）
- **交互式演示**：每个知识点都有可交互的动态演示
  - 细胞结构：可点击查看各细胞器功能
  - DNA复制/转录/翻译：动画演示过程
  - 光合作用/呼吸作用：可调节参数看曲线变化
  - 遗传规律：输入亲本基因型，自动计算子代比例
  - 生态系统：能量流动、物质循环的动态图
- **AI 智能辅导**：集成通义千问大模型，随时解答生物学问题
- **黑白配色**：简洁专业的黑白主题，支持深色/浅色切换
- **移动端适配**：Mobile First 设计，手机、平板、电脑都能流畅使用

## 技术栈

- **前端框架**：React 18 + TypeScript
- **构建工具**：Vite 5
- **样式方案**：Tailwind CSS
- **动画库**：Framer Motion
- **图表库**：Recharts
- **图标库**：Lucide React
- **状态管理**：Zustand
- **AI 服务**：通义千问 (Qwen)
- **部署平台**：阿里云 ESA Pages

## How we use Edge

BioLab 充分利用阿里云 ESA Pages 的边缘计算能力：

### 1. 边缘函数 (Edge Functions)

- **AI 辅导代理**：通过边缘函数安全代理通义千问 API 调用，保护用户 API Key
- **知识点提示**：边缘函数提供知识点学习提示，减少主服务器负载
- **健康检查**：边缘节点健康状态监控

### 2. 全球加速

- **静态资源 CDN**：前端资源通过 ESA 全球 CDN 加速分发
- **智能路由**：自动选择最优边缘节点，降低访问延迟
- **缓存策略**：合理的缓存配置，提升重复访问速度

### 3. 安全防护

- **DDoS 防护**：ESA 提供的 DDoS 攻击防护
- **WAF 防护**：Web 应用防火墙保护
- **HTTPS 加密**：全站 HTTPS 加密传输

### 4. 性能优化

- **边缘渲染**：利用边缘节点进行部分计算
- **智能压缩**：自动压缩传输内容
- **HTTP/3 支持**：更快的网络协议

## 项目结构

```
14_BioLab_高中生物知识系统/
├── frontend/                 # 前端项目
│   ├── src/
│   │   ├── components/       # 组件
│   │   │   ├── Layout.tsx    # 布局组件
│   │   │   └── simulations/  # 交互式演示组件（38个）
│   │   │       ├── CellOrganellesSimulation.tsx    # 细胞器演示
│   │   │       ├── PhotosynthesisSimulation.tsx    # 光合作用演示
│   │   │       ├── RespirationSimulation.tsx       # 细胞呼吸演示
│   │   │       ├── DNAReplicationSimulation.tsx    # DNA复制演示
│   │   │       ├── TranscriptionSimulation.tsx     # 转录演示
│   │   │       ├── TranslationSimulation.tsx       # 翻译演示
│   │   │       ├── GeneticsSimulation.tsx          # 遗传规律演示
│   │   │       ├── EnergyFlowSimulation.tsx        # 能量流动演示
│   │   │       ├── MatterCycleSimulation.tsx       # 物质循环演示
│   │   │       ├── CellMembraneSimulation.tsx      # 细胞膜演示
│   │   │       ├── CellDifferentiationSimulation.tsx  # 细胞分化演示
│   │   │       ├── CellAgingDeathSimulation.tsx    # 细胞衰老凋亡演示
│   │   │       ├── EvolutionSimulation.tsx         # 生物进化演示
│   │   │       ├── InformationTransferSimulation.tsx  # 信息传递演示
│   │   │       ├── PlantTissueCultureSimulation.tsx   # 植物组织培养演示
│   │   │       ├── AnimalCloningSimulation.tsx     # 动物克隆演示
│   │   │       └── ...更多演示组件
│   │   ├── pages/            # 页面
│   │   │   ├── HomePage.tsx      # 首页
│   │   │   ├── CategoryPage.tsx  # 分类页
│   │   │   ├── KnowledgePage.tsx # 知识点详情页
│   │   │   └── SettingsPage.tsx  # 设置页
│   │   ├── store/            # 状态管理
│   │   │   ├── theme.tsx     # 主题状态
│   │   │   └── settings.ts   # 设置状态
│   │   ├── data/             # 数据
│   │   │   └── knowledge.ts  # 知识点数据
│   │   ├── App.tsx           # 应用入口
│   │   ├── main.tsx          # 主入口
│   │   └── index.css         # 全局样式
│   ├── public/               # 静态资源
│   ├── index.html            # HTML 模板
│   ├── package.json          # 依赖配置
│   ├── vite.config.ts        # Vite 配置
│   ├── tailwind.config.js    # Tailwind 配置
│   └── tsconfig.json         # TypeScript 配置
├── functions/                # 边缘函数
│   └── ai/
│       └── tutor.ts          # AI 辅导函数
└── README.md                 # 项目说明
```

## 知识点覆盖

### 必修一：分子与细胞
- 细胞的分子组成（元素、蛋白质、核酸）
- 细胞的基本结构（细胞膜、细胞器、细胞核）
- 细胞的能量供应（酶、ATP、光合作用、细胞呼吸）
- 细胞的生命历程（分裂、分化、衰老、凋亡）

### 必修二：遗传与进化
- 遗传的基本规律（分离定律、自由组合定律、伴性遗传）
- 基因的本质与表达（DNA复制、转录、翻译、中心法则）
- 变异与进化（基因突变、染色体变异、生物进化）

### 必修三：稳态与环境
- 内环境与稳态
- 生命活动的调节（神经调节、体液调节、免疫调节）
- 植物激素调节
- 生态系统（结构、能量流动、物质循环、信息传递）

### 选修：生物技术与工程
- 基因工程
- 细胞工程
- 发酵工程

## 本地开发

```bash
# 进入前端目录
cd frontend

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 部署

项目通过 GitHub 仓库导入到阿里云 ESA Pages 进行部署：

1. 将代码推送到 GitHub 仓库
2. 在 ESA Pages 控制台导入仓库
3. 配置构建命令：`cd frontend && npm install && npm run build`
4. 配置输出目录：`frontend/dist`
5. 部署完成后即可通过 ESA 提供的域名访问

## 使用说明

1. **浏览知识点**：在首页选择知识模块，进入分类页面浏览具体知识点
2. **交互式学习**：点击知识点进入详情页，通过交互式演示学习
3. **AI 辅导**：点击右下角的聊天按钮，向 AI 提问
4. **配置 API Key**：在设置页面配置通义千问 API Key 以使用 AI 功能
5. **切换主题**：点击顶部的太阳/月亮图标切换深色/浅色主题

## 许可证

MIT License

---

**BioLab** - 让生物学习更直观、更有趣
