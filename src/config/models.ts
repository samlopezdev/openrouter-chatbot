export const MODELS = [
    { id: 'mistralai/devstral-2512:free', label: 'Devstral 2', shortLabel: 'Devstral 2'},
    { id: 'nex-agi/deepseek-v3.1-nex-n1:free', label: 'DeepSeek V3.1 Nex N1', shortLabel: 'DeepSeek V3.1'},
    { id: 'arcee-ai/trinity-mini:free', label: 'Arcee Trinity Mini', shortLabel: 'Trinity Mini'},
    { id: 'tngtech/deepseek-r1t2-chimera:free', label: 'TNG R1T Chimera', shortLabel: 'R1T Chimera'},
    { id: 'allenai/olmo-3.1-32b-think:free', label: 'Olmno 3 32B Think', shortLabel: 'Olmo 3 Think'},
    { id: 'kwaipilot/kat-coder-pro:free', label: 'KAT-Coder-Pro V1', shortLabel: 'KAT-Coder-Pro'},
    { id: 'nvidia/nemotron-nano-12b-v2-vl:free', label: 'Nenotrom Nano 12B 2 VL', shortLabel: 'Nemotron 12B VL'},
    { id: 'alibaba/tongyi-deepresearch-30b-a3b:free', label: 'Tongyi DeepResearch 30B', shortLabel: 'DeepResearch 30B'},
    { id: 'google/gemma-3-27b-it:free', label: 'Gemma 3 27B', shortLabel: 'Gemma 3'},
    { id: 'openai/gpt-oss-120b:free', label: 'GPT OSS 120B', shortLabel: 'GPT OSS'}
]

// Model IDs that support image analysis
export const VISION_MODEL_IDS = new Set(['nvidia/nemotron-nano-12b-v2-vl:free', 'google/gemma-3-27b-it:free']);
