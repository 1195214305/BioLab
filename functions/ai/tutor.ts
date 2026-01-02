/**
 * BioLab Edge Function - AI 生物辅导
 * 基于阿里云 ESA Pages 边缘计算
 */

export default async function handler(request: Request): Promise<Response> {
  // CORS 头
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  }

  // 处理 OPTIONS 请求
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  const url = new URL(request.url)
  const path = url.pathname

  try {
    // AI 生物辅导接口
    if (path === '/api/ai/tutor' && request.method === 'POST') {
      const body = await request.json()
      const { question, knowledgeId, context, apiKey } = body

      if (!apiKey) {
        return new Response(
          JSON.stringify({ error: 'API Key is required' }),
          { status: 400, headers: corsHeaders }
        )
      }

      // 调用通义千问 API
      const response = await callQwenAPI(question, knowledgeId, context, apiKey)

      return new Response(JSON.stringify(response), { headers: corsHeaders })
    }

    // 获取知识点提示
    if (path === '/api/hints' && request.method === 'GET') {
      const knowledgeId = url.searchParams.get('knowledgeId')

      if (!knowledgeId) {
        return new Response(
          JSON.stringify({ error: 'knowledgeId is required' }),
          { status: 400, headers: corsHeaders }
        )
      }

      const hints = getKnowledgeHints(knowledgeId)

      return new Response(JSON.stringify(hints), { headers: corsHeaders })
    }

    // 健康检查
    if (path === '/api/health') {
      return new Response(
        JSON.stringify({
          status: 'ok',
          service: 'BioLab Edge Function',
          timestamp: new Date().toISOString(),
          region: 'edge'
        }),
        { headers: corsHeaders }
      )
    }

    // 404
    return new Response(
      JSON.stringify({ error: 'Not Found' }),
      { status: 404, headers: corsHeaders }
    )

  } catch (error) {
    console.error('Edge function error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500, headers: corsHeaders }
    )
  }
}

// 调用通义千问 API
async function callQwenAPI(question: string, knowledgeId: string, context: any, apiKey: string) {
  const systemPrompt = `你是一位专业的高中生物老师，正在辅导学生学习生物知识。
当前知识点：${getKnowledgeName(knowledgeId)}

请根据学生的问题，提供清晰、准确的生物学知识解答。
- 使用简洁易懂的语言
- 结合具体例子解释原理
- 适当使用专业术语，但要解释其含义
- 鼓励学生思考和探索
- 如果涉及实验，说明实验原理和注意事项

上下文信息：${JSON.stringify(context)}`

  try {
    const response = await fetch('https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'qwen-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: question }
        ],
        max_tokens: 800,
        temperature: 0.7
      })
    })

    if (!response.ok) {
      throw new Error('API request failed')
    }

    const data = await response.json()
    return {
      success: true,
      answer: data.choices[0]?.message?.content || '抱歉，我暂时无法回答这个问题。',
      knowledgeId
    }
  } catch (error) {
    // 返回预设回答
    return {
      success: true,
      answer: getPresetAnswer(knowledgeId, question),
      knowledgeId,
      isPreset: true
    }
  }
}

// 获取知识点名称
function getKnowledgeName(knowledgeId: string): string {
  const names: Record<string, string> = {
    'cell-organelles': '细胞器的结构与功能',
    'photosynthesis': '光合作用',
    'respiration': '细胞呼吸',
    'dna-replication': 'DNA复制',
    'transcription': '转录',
    'translation': '翻译',
    'segregation-law': '分离定律',
    'free-combination': '自由组合定律',
    'energy-flow': '能量流动',
    'matter-cycle': '物质循环',
    'cell-membrane': '细胞膜的结构与功能'
  }
  return names[knowledgeId] || '生物知识'
}

// 预设回答
function getPresetAnswer(knowledgeId: string, question: string): string {
  const answers: Record<string, Record<string, string>> = {
    'photosynthesis': {
      default: '光合作用是绿色植物利用光能，将CO₂和H₂O转化为有机物并释放O₂的过程。分为光反应（在类囊体薄膜上）和暗反应（在叶绿体基质中）两个阶段。',
      '光反应': '光反应发生在类囊体薄膜上，需要光照。水在光下分解产生O₂、[H]和ATP。',
      '暗反应': '暗反应发生在叶绿体基质中，不需要光照但需要光反应的产物。CO₂被固定并还原为有机物。'
    },
    'respiration': {
      default: '细胞呼吸是细胞内有机物氧化分解释放能量的过程。有氧呼吸产生38个ATP，无氧呼吸只产生2个ATP。',
      '有氧呼吸': '有氧呼吸分三个阶段：糖酵解（细胞质基质）、柠檬酸循环（线粒体基质）、氧化磷酸化（线粒体内膜）。',
      '无氧呼吸': '无氧呼吸只有糖酵解阶段，产物因生物不同而异：酵母菌产生酒精和CO₂，肌肉细胞产生乳酸。'
    },
    'dna-replication': {
      default: 'DNA复制是半保留复制，每个子代DNA分子都含有一条亲代链和一条新合成链。复制时遵循碱基互补配对原则：A-T，G-C。',
      '半保留': '半保留复制意味着每个子代DNA分子保留了亲代的一条链，这保证了遗传信息的准确传递。',
      '酶': 'DNA复制需要解旋酶（解开双螺旋）、DNA聚合酶（合成新链）、DNA连接酶（连接冈崎片段）等。'
    }
  }

  const knowledgeAnswers = answers[knowledgeId] || {}

  // 简单关键词匹配
  for (const [keyword, answer] of Object.entries(knowledgeAnswers)) {
    if (keyword !== 'default' && question.includes(keyword)) {
      return answer
    }
  }

  return knowledgeAnswers.default || '这是一个很好的问题！建议你仔细观察演示动画，结合课本上的知识进行分析。如果还有疑问，可以尝试调整参数，观察结果的变化。'
}

// 获取知识点提示
function getKnowledgeHints(knowledgeId: string) {
  const hints: Record<string, string[]> = {
    'photosynthesis': [
      '光合作用的场所是叶绿体',
      '光反应需要光照，暗反应不需要光照但需要光反应的产物',
      '影响光合作用的因素：光照强度、CO₂浓度、温度',
      '光合作用的产物是有机物和O₂'
    ],
    'respiration': [
      '有氧呼吸的场所是细胞质基质和线粒体',
      '无氧呼吸只在细胞质基质中进行',
      '有氧呼吸产生的ATP远多于无氧呼吸',
      '呼吸作用释放的能量大部分以热能形式散失'
    ],
    'dna-replication': [
      'DNA复制是半保留复制',
      '复制时遵循碱基互补配对原则',
      '复制需要解旋酶、DNA聚合酶等',
      '复制发生在细胞分裂间期'
    ],
    'segregation-law': [
      '等位基因在形成配子时分离',
      '杂合子自交后代基因型比例为1:2:1',
      '表现型比例为3:1（完全显性时）',
      '测交可以验证分离定律'
    ]
  }

  return {
    knowledgeId,
    hints: hints[knowledgeId] || ['仔细观察演示动画', '结合课本知识理解', '尝试调整参数观察变化']
  }
}
