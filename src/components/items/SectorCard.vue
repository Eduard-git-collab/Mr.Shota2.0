<template>
    <router-link 
      :to="card.route" 
      custom
      v-slot="{ navigate }"
    >
      <div 
        class="
          card-item relative block h-auto sm:h-80 md:h-80 lg:h-96
          w-full sm:basis-1/3
          transition-all duration-300 ease-out
          transform-gpu cursor-pointer
          group
        "
        :class="{ 'mobile-expanded': isMobileExpanded }"
        @click="handleClick($event, navigate)"
      >
        <!-- Dashed border shadow -->
        <span class="absolute translate-2 inset-0 border-2 border-dashed border-primary/60"></span>
        
        <div class="
          relative flex flex-col h-full transform
          border-2 border-primary bg-background/90 
          transition-all duration-300 ease-out
          shadow-lg
          group-hover:translate-x-[-0.25rem] group-hover:translate-y-[-0.25rem]
          sm:group-hover:translate-x-[-0.5rem] sm:group-hover:translate-y-[-0.5rem]
        "
        :class="{ 
          'translate-x-[-0.25rem] translate-y-[-0.25rem] sm:translate-x-[-0.5rem] sm:translate-y-[-0.5rem]': isMobileExpanded 
        }"
        >
          <div class="p-4 sm:p-5 md:p-6 flex flex-col h-full">
            <!-- Icon -->
            <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-accent/60 flex items-center justify-center mb-3 sm:mb-4">
              <component :is="card.icon" class="w-5 h-5 sm:w-6 sm:h-6 text-primary/30" />
            </div>
  
            <!-- Title - Key text: font-funnel -->
            <h2 class="text-lg sm:text-xl md:text-xl font-funnel font-semibold text-primary leading-tight mb-3 sm:mb-4">
              {{ card.title }}
            </h2>
  
            <!-- Category - Longer text: font-dm -->
            <div class="
              transition-all duration-300 ease-out
              opacity-0 max-h-0 overflow-hidden mb-0
              group-hover:opacity-100 group-hover:max-h-32 group-hover:mb-4
            "
            :class="{ 
              'opacity-100 max-h-32 mb-4': isMobileExpanded 
            }"
            >
              <p class="text-xs sm:text-sm text-primary/70 font-dm leading-relaxed">
                {{ card.category }}
              </p>
            </div>
  
            <!-- Description - Longer text: font-dm -->
            <div class="
              transition-all duration-300 ease-out
              opacity-0 max-h-0 overflow-hidden mb-0
              group-hover:opacity-100 group-hover:max-h-24 group-hover:mb-4
            "
            :class="{ 
              'opacity-100 max-h-24 mb-4': isMobileExpanded 
            }"
            >
              <p class="text-xs sm:text-sm md:text-base text-primary/80 font-dm leading-relaxed">
                {{ card.description }}
              </p>
            </div>
  
            <!-- Spacer to push bottom content down -->
            <div class="flex-grow"></div>
  
            <!-- Bottom section - Default state content (hides on hover/click) -->
            <div class="
              mt-auto transition-all duration-300 ease-out
              group-hover:opacity-0 group-hover:max-h-0 group-hover:overflow-hidden
            "
            :class="{ 
              'opacity-0 max-h-0 overflow-hidden': isMobileExpanded 
            }"
            >
              <!-- Category - Longer text: font-dm -->
              <p class="text-xs sm:text-sm text-primary/70 font-dm leading-relaxed">
                {{ card.category }}
              </p>
              <!-- Mobile tap indicator - Key text: font-funnel -->
              <p class="text-xs text-accent-bold font-funnel mt-2 sm:hidden"
                 :class="{ 'opacity-0': isMobileExpanded }"
              >
                {{ isMobileExpanded ? '' : 'Tap to learn more' }}
              </p>
            </div>
  
            <!-- Learn more link - Key text: font-funnel -->
            <div class="
              transition-all duration-300 ease-out
              opacity-0 max-h-0 overflow-hidden mt-0
              group-hover:opacity-100 group-hover:max-h-8 group-hover:mt-auto
            "
            :class="{ 
              'opacity-100 max-h-8 mt-auto': isMobileExpanded 
            }"
            >
              <div class="flex justify-between items-center">
                <span class="font-funnel font-semibold text-accent flex items-center gap-2 text-sm sm:text-base">
                  Learn more 
                  <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </span>
                
                <!-- Close button for mobile when expanded -->
                <button 
                  v-if="isMobileExpanded"
                  @click.stop="closeMobileCard"
                  class="text-primary/50 hover:text-primary/80 sm:hidden ml-4"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </router-link>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  const props = defineProps({
    card: {
      type: Object,
      required: true
    }
  })
  
  const emit = defineEmits(['mobileToggle'])
  
  const isMobileExpanded = ref(false)
  const isMobile = ref(false)
  
  // Check if device is mobile/touch
  onMounted(() => {
    isMobile.value = window.matchMedia('(hover: none)').matches || window.innerWidth < 640
  })
  
  const handleClick = (event, navigate) => {
    // On mobile/touch devices, toggle expansion on first click
    if (isMobile.value || window.matchMedia('(hover: none)').matches) {
      if (!isMobileExpanded.value) {
        event.preventDefault()
        isMobileExpanded.value = true
        emit('mobileToggle', true)
      } else {
        // If already expanded, navigate to the route
        navigate()
      }
    } else {
      // On desktop, navigate immediately
      navigate()
    }
  }
  
  const closeMobileCard = () => {
    isMobileExpanded.value = false
    emit('mobileToggle', false)
  }
  </script>
  
  <style scoped>
  /* Desktop hover effects - only on devices that support hover */
  @media (hover: hover) and (pointer: fine) {
    /* Desktop card expansion on hover */
    @media (min-width: 640px) {
      .card-item:hover {
        flex-basis: calc(50% - 1rem) !important;
      }
    }
  
    @media (min-width: 1024px) {
      .card-item:hover {
        flex-basis: calc(50% - 1rem) !important;
      }
      
      .card-item:hover + .card-item,
      .card-item:has(+ .card-item:hover) {
        flex-basis: calc(25% - 1rem) !important;
      }
    }
  }
  
  /* Touch device optimizations */
  @media (hover: none) {
    .card-item {
      -webkit-tap-highlight-color: transparent;
      touch-action: manipulation;
    }
  }
  
  /* Card transitions */
  .card-item {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  </style>