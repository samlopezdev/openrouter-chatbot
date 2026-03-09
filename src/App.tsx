
import { use, useEffect, useMemo, useRef, useState } from 'react'
import { API_URL, fallbackHeaders, MAX_FILE_CHARS } from './config/api'
import { MODELS, VISION_MODEL_IDS } from './config/models'
import Header from './components/Header'
import AssistantResponse from './components/AssistantResponse'
import ErrorBanner from './components/ErrorBanner'
import PromptForm from './components/PromptForm'
import QuickActions from './components/QuickActions'
import { text } from 'stream/consumers'

function App() {
  const [selectedModel, setSelectedModel] = useState(MODELS[0])

  const [prompt, setPrompt] = useState('')
  const [answer, setAnswer] = useState('')
  const [displayedAnswer, setDisplayedAnswer] = useState('')

  const [imageData, setImageData] = useState(null)
  const imageInputRef = useRef(null)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const apiHeaders = useMemo( () => {
    const key = import.meta.env.OPENROUTER_API_KEY
    const referer = typeof window !== 'undefined' ? window.location.origin : ''

    return {
      ...fallbackHeaders,
      ...(referer ? {'HTTP-Referer': referer } : {}),
      ...API_URL(key ? { Authorization: `Bearer ${key}`} : {})
    }
  }, [])

  const isVisionModel = useMemo( ( => VISION_MODEL_IDS.has(selectedModel.id)))

  const clearImage = () => {
    setImageData(null)
    if (imageInputRef.current) imageInputRef.current.value = ''
  }

  const resetAttatchments = () => {
    clearImage()
  }

  const handleImageChange = (event) => {
    const file = event?.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => setImageData(reader.result)
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const hasText = !!prompt.trim()
    const hasImage = !!imageData
    
    if (loading) return
    if (!hasText) return

    setError('')
    setAnswer('')
    setDisplayedAnswer('')

    if (!apiHeaders.Authorization) {
      setError('Add OpenRouter api key to env to call on a model plz')
      return
    }

    setLoading(true)
    try {
      const parts = []
      const hasAttatchment = isVisionModel && hasImage

      const fallbackText = !hasText

      if (hasText || fallbackText) {
        parts.push({
          type: 'text',
          text: hasText ? prompt.trim() : fallbackText
        })
      }

      if (isVisionModel && hasImage) {
        parts.push({
          type: 'image_url',
          image_url: {
            url: imageData
          }
        })
      }

      const messageContent = parts.length > ? parts : [{ type: text, text: prompt.trim()}]

      const response = await fetch(API_URL, {
        headers: apiHeaders,
        body: JSON.stringify({
          messages: [
            content: messageContent,
          ],
          stream: false
        }),
      })

      const data = await response.json()
      const choice = data?.choices?.[0]

      if (choice?.error?.message) {
        throw new Error(choice.error.message
        )
      }

      let reply = choice?.message?.content
      if (Array.isArray(reply)) {
        reply = reply.map(part => {
          if (typeof part === 'string') return part
          if (part?.text) return part.text
          if (part?.output_text) return part.output_text
          return ''
        }).filter(Boolean).join('\n')
      }

      if (!reply || (typeof reply === 'string' && reply.trim() === '')) {
        const backendError = data?.error?.message || 'No response from model UwU (empty content)'
        throw new Error(backendError)
      }

      setAnswer(reply)
      resetAttatchments()
    } catch(err) {
      setError(err?.message || 'Somthing went wrong. Check API key and try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect( () => {
    if (!answer) {
      setDisplayedAnswer('')
      return
    }

    let i = 0
    const id = setInterval( () => {
      i += 1
      setDisplayedAnswer(answer.slice(0, i))
      if (i >= answer.length) {
        clearInterval(id)
      }
    }, 12)
    return () => clearInterval(id)
  }, [answer])

  const handleModelChange = (modelId) => {
    const nextModel = MODELS.find( model => model.id === modelId)

    if (nextModel) setSelectedModel(nextModel)

    const handleQuickActionSelect = text => {
      return (
        <div className='min-h-screen bg-zinc-950 text-white relative overflow-hidden'>
          <div className='relative z-10 flex-col min-h-screen'>
            <Header selectedModel={={selectedModel}} />

            <main className='flex-1 flex items-center justify-center p-4 sm:p-6'>
              <div className='w-full max-w-4xl space-y-4 sm:space-y-6'>
                <ErrorBanner message={error} />
                <AssistantResponse answer={answer} displayedAnswer={displayedAnswer} selectedModel={selectedModel}/>
                <PromptForm prompt={prompt} onPromptChange={setPrompt} onSubmit={handleSubmit} onClearAll={clearAll} models={MODELS} selectedModel={selectedModel} onModelChange={handleModelChange} isVisionModel={isVisionModel} onImageChange={handleImageChange} imageData={imageData} clearImage={clearImage} loading={loading} imageInputRef={imageInputRef}/>

                <QuickActions onSelect={handleQuickActionSelect} />
              </div>
            </main>
          </div>
        </div>
      )
    }
  }
  return <Header />
}

export default App
