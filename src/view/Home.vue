<template>
  <div class="min-h-screen bg-[#FBFBF7] relative overflow-hidden">
    <!-- Layered Semi-Circle Gradients (same structure, just palette colors) -->
    <div
      class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[150vw] h-[75vh] rounded-t-full opacity-60"
      style="background: linear-gradient(to bottom, #00305666 0%, #D8EFE366 60%, transparent 80%);">
    </div>
    <div
      class="absolute -bottom-5 left-1/2 transform -translate-x-1/2 w-[140vw] h-[70vh] rounded-t-full opacity-70"
      style="background: linear-gradient(to bottom, #003056cc 0%, #D8EFE34d 60%, transparent 65%);">
    </div>
    <div
      class="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-[130vw] h-[65vh] rounded-t-full opacity-80"
      style="background: linear-gradient(to bottom, #003056b3 0%, #D8EFE340 35%, transparent 60%);">
    </div>
    
    <!-- Blurred SVG Background (kept as-is) -->
    <div class="absolute inset-0 -translate-y-2/4 opacity-40 blur-3xl">
      <img src="../assets/media/blurgradient.svg" alt="" class="w-full h-full object-cover blur-3xl" />
    </div>
    
    <!-- Noise Texture Overlay (unchanged) -->
    <div
      class="absolute inset-0 opacity-30 noise-texture"
      style="background: linear-gradient(to bottom, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.015) 50%, transparent 100%);">
    </div>
    
    <!-- Navigation (structure unchanged, colors swapped) -->
    <nav class="relative z-20 flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
      <div class="flex items-center space-x-2">
        <div class="w-14 h-14 flex items-center justify-center">
          <Brandlogo bg-color="" accent-color="#003056" />
        </div>
        <span class="font-semibold text-[#003056] font-figtree">Nyvo Creative</span>
      </div>
      
      <div class="hidden md:flex items-center space-x-8 text-[#00305699] font-poppins">
        <router-link to="/blogs" class="hover:text-[#003056] transition-colors">Blogs</router-link>
        <a href="#" class="hover:text-[#003056] transition-colors">Projects</a>
        <a href="#" class="hover:text-[#003056] transition-colors">Framework</a>
        <a href="#" class="hover:text-[#003056] transition-colors">FAQ</a>
      </div>
      
      <div class="flex items-center space-x-4 font-figtree">
        <router-link to="/login" class="text-[#00305699] hover:text-[#003056] font-poppins transition-colors">Log In</router-link>
        <button 
          @click="handleGetDemo"
          class="px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 bg-[#003056] hover:bg-[#00263f] text-[#FBFBF7]"
        >
          <span>Book a call</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </nav>
    
    <!-- Hero Content (structure unchanged) -->
    <div class="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
      <div class="text-center max-w-4xl mx-auto mb-16">
        <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-normal text-[#003056] font-figtree">
          Turn Your 
          <span class="gradient-text">AI Startup Pitch</span> Into an <span class="gradient-text">Investor Magnet</span>
        </h1>
        
        <p class="text-xl mb-8 max-w-2xl mx-auto text-[#003056cc] font-poppins">
          Founders who work with us walk away with a pitch video that gives them an <span class="gradient-text">8.5X higher chance</span> of hearing back from interested investors.
        </p>
        
        <div class="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 font-figtree">
          <button 
            @click="handleGetStarted"
            class="px-8 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2 bg-[#003056] hover:bg-[#00263f] text-[#FBFBF7]"
          >
            <span>Book a Call</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Video Container -->
      <div class="relative max-w-5xl mx-auto">
        <div class="backdrop-blur-sm border rounded-2xl p-2 shadow-2xl transition-all duration-300 bg-[#d8efe34b] border-[#00305626] hover:shadow-[0_0_0_3px_#00305633]">
          <div class="aspect-video w-full rounded-xl flex items-center justify-center border overflow-hidden bg-[#FBFBF7] border-[#00305633]">
            <video 
              v-if="dashboardVideo"
              :src="dashboardVideo"
              :alt="dashboardVideoAlt"
              class="w-full h-full object-cover"
              muted
              loop
              playsinline
              autoplay
            ></video>
            <div v-else class="text-center text-[#00305699]">
              <svg class="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <p class="text-lg font-medium text-[#003056]">Video Preview</p>
              <p class="text-sm opacity-75">Replace with your video (not cow)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Brandlogo from '../assets/logos/brandlogo.vue'

export default {
    name: 'HeroSection',
    data() {
        return {
            heroDescription: 'Manage teams, track attendance, and unlock smarter decisions — all from one intuitive dashboard.',
            dashboardVideo: 'https://zaprityeqntbqbspwbeq.supabase.co/storage/v1/object/public/blog-media/854315-hd_1920_1080_25fps.mp4',
            dashboardVideoAlt: 'Dashboard Preview'
        };
    },
    methods: {
        handleGetStarted() {
            console.log('Get Started clicked');
        },
        handleGetDemo() {
            console.log('Get Demo clicked');
        },
        handleFreeDemo() {
            console.log('Free Demo clicked');
        }
    },
    components: { Brandlogo }
}
</script>

<style scoped>
/* Gradient text updated to only use provided palette */
.gradient-text {
  background: linear-gradient(10deg, #004277 0%, #014f8f 55%, #D8EFE3 90%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  display: inline-block;
}

/* Noise texture unchanged */
.noise-texture {
  background-image:
    url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  background-size: 200px 200px;
}

.font-figtree {
  font-family: 'Figtree', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", Arial, sans-serif;
}
</style>