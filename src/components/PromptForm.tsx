import { FaBrain, FaImage, FaTrash, FaPaperPlane, FaRobot, FaTimes } from 'react-icons/fa'

const PromptForm = ({
    prompt,
    onPromptChange,
    onSubmit,
    onClearAll,
    models,
    selectedModel,
    onModelChange,
    isVisionModel,
    onImageChange,
    imageData,
    clearImage,
    loading,
    imageInputRef
}) => {
    const disableSubmit = (!prompt.trim() && !(isVisionModel && imageData) || loading)
    const disableClear = !prompt.trim() && !imageData
  return (
    <div className='bg-linear-to-br from-zinc-900/90 to-zinc-900/90 border border-zinc-700/50 rounded-2xl p-4 backdrop-blur-sm shadow-2xl sm:p-6'>
      <form onSubmit={onSubmit}>
        <div className='relative'>
            <textarea value={prompt} onChange={(e) => onPromptChange(e.target.value)} placeholder='Aske me anything! I can help you build cool stuff' className='w-full bg-transparent border-none outline-none text-zinc-200 placeholder:text-zinc-500 resize-none text-sm leading-relaxed min-h-15 max-h-27.5 focus:placeholder:bg-zinc-600 transition-colors sm:text-base sm:min-h-20' onKeyDown={(e) => e.key === 'Enter' && (e.metaKey || e.ctrlKey) && onSubmit(e)}></textarea>

            <div className='mt-3 mb-2 flex flex-row items-center gap-3 flex-wrap'>
                {isVisionModel && (
                    <UploadButton Icon={FaImage} inputRef={imageInputRef} accept='image/*' onChange={onImageChange} title='Upload image' iconClass='text-blue-300'/>
                )}

                {/* Image attachment Preview */}
                {imageData && (
                    <div className='flex item-center gap-2'>
                        <div className='w-16 h-16 rounded-lg overflow-hidden border border-zinc-700 bg-zinc-900'>
                            <img src={imageData} alt='Uploaded Preview' className='w-full h-full object-cover'/>
                        </div>
                        <Button onClick={clearImage} disabled={disableClear} className='bg-red-500 hover:bg-red-600'><FaTrash className='text-zinc-200'/></Button>
                    </div>
                )}

                <div className='flex flex-col justify-between pt-4 border-t border-zinc-700/50 gap-3 sm:flex-row'>
                    <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3'>
                        <label className='flex items-center gap-2 px-3 py-2 bg-zinc-900/80 border border-zinc-700/50 rounded-xl text-sm text-zinc-200 shadow-inner w-full sm:w-auto'>
                            <FaBrain className='w-3 h-3 text-blue-400 shrink-0 sm:w-4 h-4' />
                            <select value={selectedModel.id} onChange={(e) => onModelChange(e.target.value)} className='bg-transparent border-none focus:outline-none text-sm text-zinc-200 pr-2 cursor-pointer flex-1 min-w-0'>
                                {models.map((model) => (
                                    <option key={model.id} value={model.id} className='bg-zinc-900 text-zinc-200'>{model.name}</option>
                                ))}
                            </select>
                        </label>
                        {/* Keyboard shortcut for desktop only */}
                        <div className='text-sm text-zinc-500 hidden sm:block'>
                            Press <kbd className='px-1.5 py-0 bg-zinc-800 border border-zinc-700 rounded text-zinc-400'>⌘</kbd>{' '} + <kbd className='px-1.5 py-0 bg-zinc-800 border border-zinc-700 rounded text-zinc-400'>Enter</kbd>{' '} to send.
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </form>
    </div>
  )
}
