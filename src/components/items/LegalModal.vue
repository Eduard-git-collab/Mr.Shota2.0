<template>
    <Teleport to="body">
      <Transition
        enter-active-class="duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isOpen"
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
          @click="closeModal"
        >
          <!-- Backdrop -->
          <div class="absolute inset-0 bg-primary/80 backdrop-blur-sm"></div>
          
          <!-- Modal -->
          <Transition
            enter-active-class="duration-300 ease-out"
            enter-from-class="scale-95 opacity-0"
            enter-to-class="scale-100 opacity-100"
            leave-active-class="duration-200 ease-in"
            leave-from-class="scale-100 opacity-100"
            leave-to-class="scale-95 opacity-0"
          >
            <div
              v-if="isOpen"
              class="relative w-full max-w-4xl max-h-[90vh] bg-background border-2 border-accent/30 rounded-2xl shadow-2xl"
              @click.stop
            >
              <!-- Header -->
              <div class="flex items-center justify-between p-6 border-b border-accent/20">
                <h2 class="font-funnel font-bold text-2xl sm:text-3xl text-primary">
                  {{ title }}
                </h2>
                <button
                  @click="closeModal"
                  class="w-10 h-10 rounded-full bg-accent/10 hover:bg-accent/20 flex items-center justify-center transition-colors group"
                >
                  <svg class="w-5 h-5 text-primary group-hover:text-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
              
              <!-- Content -->
              <div class="p-6 overflow-y-auto max-h-[calc(90vh-120px)] prose prose-lg max-w-none">
                <div class="font-dm text-primary/90 leading-relaxed space-y-6">
                  <component :is="'div'" v-html="formattedContent"></component>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  </template>
  
  <script setup>
  import { computed, watch } from 'vue'
  
  const props = defineProps({
    isOpen: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    }
  })
  
  const emit = defineEmits(['close'])
  
  const closeModal = () => {
    emit('close')
  }
  
  // Convert markdown-style content to HTML
  const formattedContent = computed(() => {
    return props.content
      // Headers
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-funnel font-bold text-primary mb-6 mt-8 first:mt-0">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-funnel font-semibold text-primary mb-4 mt-8">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-funnel font-semibold text-primary mb-3 mt-6">$1</h3>')
      
      // Bold text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-accent-bold">$1</strong>')
      
      // Horizontal rules
      .replace(/^---$/gm, '<hr class="border-accent/20 my-8">')
      
      // Lists
      .replace(/^- (.*$)/gm, '<li class="mb-2">$1</li>')
      .replace(/(<li.*<\/li>)/gs, '<ul class="list-disc pl-6 mb-4 space-y-2">$1</ul>')
      
      // Paragraphs
      .replace(/^(?!<[h|u|l])(.*$)/gm, (match, p1) => {
        if (p1.trim() === '' || p1.includes('<')) return p1
        return `<p class="mb-4">${p1}</p>`
      })
  })
  
  // Handle ESC key
  const handleEscape = (e) => {
    if (e.key === 'Escape' && props.isOpen) {
      closeModal()
    }
  }
  
  // Prevent body scroll when modal is open
  watch(() => props.isOpen, (isOpen) => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', handleEscape)
    } else {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleEscape)
    }
  })
  </script>