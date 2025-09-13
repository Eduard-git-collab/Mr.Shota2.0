<template>
  <footer class="relative w-full bg-primary text-secondary overflow-hidden">
    <!-- Background decoration -->
    <div aria-hidden="true" class="absolute inset-0">
      <div class="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-accent/20 to-transparent"></div>
      <div class="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-secondary/10 to-transparent"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16 sm:py-20 md:py-24">
      <!-- Main footer content -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12 sm:mb-16">
        
        <!-- Brand section -->
        <div class="lg:col-span-2">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-8 h-8 sm:w-10 sm:h-10">
              <Brandlogo bgColor="#f6f5f3" accentColor="#28272c"/>
            </div>
            <span class="font-funnel text-xl sm:text-2xl font-thin text-secondary">Nyvo Creative</span>
          </div>
          
          <p class="font-dm text-secondary/80 text-base sm:text-lg leading-relaxed mb-8 max-w-md">
            Video-first content engines for regulated FinTech. Transform expert interviews into decision-accelerating assets.
          </p>
          
          <!-- CTA Button -->
          <button 
          @click.prevent="triggerBookCall"
            class="group relative bg-accent-bold text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-dm font-semibold text-base sm:text-lg transition-all duration-300 hover:bg-accent-strong hover:scale-105"
          >
            Start Your Content Engine
            <div class="absolute inset-0 bg-white/20 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300"></div>
          </button>
        </div>

        <!-- Services -->
        <div>
          <h3 class="font-funnel font-semibold text-lg text-secondary mb-6">Services</h3>
          <ul class="space-y-3">
            <li><RouterLink to="/fincrime" class="font-dm text-secondary/70 hover:text-accent transition-colors">FinCrime Content</RouterLink></li>
            <li><RouterLink to="/security" class="font-dm text-secondary/70 hover:text-accent transition-colors">Security & Privacy</RouterLink></li>
            <li><RouterLink to="/regops" class="font-dm text-secondary/70 hover:text-accent transition-colors">RegOps Solutions</RouterLink></li>
          </ul>
        </div>

        <!-- Company -->
        <div>
          <h3 class="font-funnel font-semibold text-lg text-secondary mb-6">Company</h3>
          <ul class="space-y-3">
            <li><RouterLink to="/about" class="font-dm text-secondary/70 hover:text-accent transition-colors">About</RouterLink></li>
            <li><a @click.prevent="triggerBookCall" target="_blank" rel="noopener noreferrer" class="font-dm text-secondary/70 hover:text-accent transition-colors">Book a Call</a></li>
          </ul>
        </div>
      </div>

      <!-- Bottom section -->
      <div class="border-t border-secondary/20 pt-8">
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p class="font-dm text-secondary/60 text-sm">
            © {{ currentYear }} Nyvo Creative. All rights reserved.
          </p>
          
          <div class="flex items-center gap-6">
            <button 
              @click="openPrivacyModal" 
              class="font-dm text-secondary/60 hover:text-accent transition-colors text-sm"
            >
              Privacy Policy
            </button>
            <button 
              @click="openTermsModal" 
              class="font-dm text-secondary/60 hover:text-accent transition-colors text-sm"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <LegalModal
      :is-open="isPrivacyModalOpen"
      title="Privacy & Cookie Policy"
      :content="PRIVACY_POLICY"
      @close="closePrivacyModal"
    />

    <LegalModal
      :is-open="isTermsModalOpen"
      title="Terms of Service"
      :content="TERMS_OF_SERVICE"
      @close="closeTermsModal"
    />
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useBookCallNavigation } from '../../composables/useBookCallNavigation'
import { useModals } from '../../composables/useModals'
import { PRIVACY_POLICY, TERMS_OF_SERVICE } from '../../legalcontent'
import Brandlogo from '../../assets/logos/brandlogo.vue'
import LegalModal from '../items/LegalModal.vue'

const { triggerBookCall } = useBookCallNavigation()
const { 
  isPrivacyModalOpen, 
  isTermsModalOpen, 
  openPrivacyModal, 
  closePrivacyModal, 
  openTermsModal, 
  closeTermsModal 
} = useModals()

const currentYear = computed(() => new Date().getFullYear())

const handleBookCall = () => {
  triggerBookCall()
}
</script>