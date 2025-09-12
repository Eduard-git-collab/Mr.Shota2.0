<template>
  <div class="w-full bg-secondary text-primary min-h-screen">
    <main class="relative">
      <!-- Hero Section -->
      <section class="relative w-full min-h-screen bg-secondary overflow-hidden">
        <!-- Background decoration -->
        <div aria-hidden="true" class="absolute inset-0">
          <div class="absolute -top-20 sm:-top-40 -right-12 sm:-right-24 w-[40vmax] sm:w-[60vmax] h-[40vmax] sm:h-[60vmax] rounded-full bg-accent/10 blur-2xl sm:blur-3xl"></div>
          <div class="absolute top-1/2 -left-16 sm:-left-32 w-[30vmax] sm:w-[50vmax] h-[30vmax] sm:h-[50vmax] rounded-full bg-primary/5 blur-2xl sm:blur-3xl"></div>
        </div>

        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-20 sm:py-24 md:py-32">
          <!-- Main flex container -->
          <div class="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start" v-stagger="{ delay: 150 }">
            
            <!-- Left side - Content -->
            <div class="flex-1 lg:max-w-2xl">
              <h1 class="font-funnel font-thin text-[clamp(2.5rem,6vw,4.5rem)] text-primary leading-[0.9] tracking-tight mb-6">
                Talk to an expert
              </h1>
              
              <p class="font-dm text-lg sm:text-xl text-primary/80 leading-relaxed mb-12">
                We distill a single expert interview into a <strong class="text-accent-bold">stakeholder-ready content engine</strong> that accelerates approvals across Security, Compliance, Legal, and Finance.
              </p>

              <!-- Outcomes section -->
              <div class="mb-12">
                <h2 class="font-funnel font-semibold text-2xl text-primary mb-4">Outcomes we optimize for</h2>
                <p class="font-dm text-lg text-primary/70 leading-relaxed">
                  3–6 weeks faster approvals • 15–30% shorter supplier onboarding • 12–28 staff hours saved per deal
                </p>
              </div>

              <!-- Built for section -->
              <div class="mb-12">
                <h2 class="font-funnel font-semibold text-2xl text-primary mb-4">Built for regulated fintech</h2>
                <p class="font-dm text-lg text-primary/70 leading-relaxed">
                  RegTech/FinTech vendors selling to banks • FinCrime platforms • Data privacy & security tooling • In-house regulatory operations
                </p>
              </div>
            </div>

            <!-- Right side - Form -->
            <div class="flex-1 lg:max-w-lg w-full">
              <div 
                v-reveal="{ delay: 500, direction: 'scale' }"
                class="bg-background/95 backdrop-blur-sm border border-accent/30 rounded-2xl p-6 sm:p-8 shadow-lg sticky top-24"
              >
                <form @submit.prevent="handleSubmit" class="space-y-6">
                  
                  <!-- Name fields -->
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4" v-stagger="{ delay: 100 }">
                    <div>
                      <label for="firstName" class="block text-sm font-medium text-primary mb-2">First name</label>
                      <input
                        id="firstName"
                        v-model="formData.firstName"
                        type="text"
                        required
                        class="w-full px-3 py-2 border border-accent/30 rounded-lg bg-background/50 text-primary placeholder-primary/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                        placeholder="Enter first name"
                      />
                    </div>
                    <div>
                      <label for="lastName" class="block text-sm font-medium text-primary mb-2">Last name</label>
                      <input
                        id="lastName"
                        v-model="formData.lastName"
                        type="text"
                        required
                        class="w-full px-3 py-2 border border-accent/30 rounded-lg bg-background/50 text-primary placeholder-primary/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                        placeholder="Enter last name"
                      />
                    </div>
                  </div>

                  <!-- Email -->
                  <div v-reveal="{ delay: 200 }">
                    <label for="email" class="block text-sm font-medium text-primary mb-2">Work email address</label>
                    <input
                      id="email"
                      v-model="formData.email"
                      type="email"
                      required
                      class="w-full px-3 py-2 border border-accent/30 rounded-lg bg-background/50 text-primary placeholder-primary/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                      placeholder="Enter work email"
                    />
                  </div>

                  <!-- Company name -->
                  <div v-reveal="{ delay: 300 }">
                    <label for="company" class="block text-sm font-medium text-primary mb-2">Company name</label>
                    <input
                      id="company"
                      v-model="formData.company"
                      type="text"
                      required
                      class="w-full px-3 py-2 border border-accent/30 rounded-lg bg-background/50 text-primary placeholder-primary/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                      placeholder="Enter company name"
                    />
                  </div>

                  <!-- Interest -->
                  <div v-reveal="{ delay: 400 }">
                    <label class="block text-sm font-medium text-primary mb-3">What are you interested in? (pick one)</label>
                    <div class="space-y-3" v-stagger="{ delay: 100 }">
                      <label v-for="option in interestOptions" :key="option.value" class="flex items-start gap-3 cursor-pointer">
                        <input
                          v-model="formData.interest"
                          :value="option.value"
                          type="radio"
                          required
                          class="mt-1 w-4 h-4 text-accent border-accent/30 focus:ring-accent"
                        />
                        <div>
                          <div class="font-medium text-primary">{{ option.title }}</div>
                          <div class="text-sm text-primary/60">{{ option.description }}</div>
                        </div>
                      </label>
                    </div>
                  </div>

                  <!-- Context section -->
                  <div class="border-t border-accent/20 pt-6" v-reveal="{ delay: 600 }">
                    <h3 class="font-funnel font-semibold text-lg text-primary mb-4">Tell us about your context</h3>
                    <p class="text-sm text-primary/60 mb-6 italic">All answers are required.</p>

                    <!-- Location -->
                    <div class="mb-4">
                      <label for="location" class="block text-sm font-medium text-primary mb-2">Location</label>
                      <select
                        id="location"
                        v-model="formData.location"
                        required
                        class="w-full px-3 py-2 border border-accent/30 rounded-lg bg-background/50 text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                      >
                        <option value="">Select</option>
                        <option value="EU/UK">EU/UK</option>
                        <option value="US/Canada">US/Canada</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <!-- Company type -->
                    <div class="mb-4">
                      <label for="companyType" class="block text-sm font-medium text-primary mb-2">Which best describes you? (pick one)</label>
                      <select
                        id="companyType"
                        v-model="formData.companyType"
                        required
                        class="w-full px-3 py-2 border border-accent/30 rounded-lg bg-background/50 text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                      >
                        <option value="">Select</option>
                        <option value="vendor">A software vendor selling to banks/financial institutions</option>
                        <option value="inhouse">An in-house regulatory operations / compliance team</option>
                        <option value="other">Other (tell us in one sentence)</option>
                      </select>
                    </div>

                    <!-- Other description if selected -->
                    <div v-if="formData.companyType === 'other'" class="mb-4" v-reveal="{ delay: 100 }">
                      <input
                        v-model="formData.companyTypeOther"
                        type="text"
                        required
                        placeholder="Please describe in one sentence"
                        class="w-full px-3 py-2 border border-accent/30 rounded-lg bg-background/50 text-primary placeholder-primary/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                      />
                    </div>

                    <!-- Approval slowdowns -->
                    <div class="mb-4">
                      <label class="block text-sm font-medium text-primary mb-3">Where do approvals slow down? (pick up to two)</label>
                      <div class="space-y-2" v-stagger="{ delay: 80 }">
                        <label v-for="option in approvalSlowdowns" :key="option.value" class="flex items-center gap-2 cursor-pointer">
                          <input
                            v-model="formData.approvalSlowdowns"
                            :value="option.value"
                            type="checkbox"
                            :disabled="formData.approvalSlowdowns.length >= 2 && !formData.approvalSlowdowns.includes(option.value)"
                            class="w-4 h-4 text-accent border-accent/30 rounded focus:ring-accent disabled:opacity-50"
                          />
                          <span class="text-sm text-primary">{{ option.label }}</span>
                        </label>
                      </div>
                    </div>

                    <!-- Communication method -->
                    <div class="mb-4">
                      <label for="communication" class="block text-sm font-medium text-primary mb-2">How do you currently explain complex topics? (pick one)</label>
                      <select
                        id="communication"
                        v-model="formData.communication"
                        required
                        class="w-full px-3 py-2 border border-accent/30 rounded-lg bg-background/50 text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                      >
                        <option value="">Select</option>
                        <option value="demos">Live demos</option>
                        <option value="docs">PDF documents</option>
                        <option value="mix">A mix of docs and calls</option>
                      </select>
                    </div>

                    <!-- Sign off stakeholders -->
                    <div class="mb-4">
                      <label class="block text-sm font-medium text-primary mb-3">Who must sign off on claims? (unlimited)</label>
                      <div class="space-y-2" v-stagger="{ delay: 80 }">
                        <label v-for="option in signOffOptions" :key="option.value" class="flex items-center gap-2 cursor-pointer">
                          <input
                            v-model="formData.signOff"
                            :value="option.value"
                            type="checkbox"
                            class="w-4 h-4 text-accent border-accent/30 rounded focus:ring-accent"
                          />
                          <span class="text-sm text-primary">{{ option.label }}</span>
                        </label>
                      </div>
                    </div>

                    <!-- Active deals -->
                    <div class="mb-4">
                      <label for="activeDeals" class="block text-sm font-medium text-primary mb-2">How many enterprise deals or internal initiatives are active right now?</label>
                      <select
                        id="activeDeals"
                        v-model="formData.activeDeals"
                        required
                        class="w-full px-3 py-2 border border-accent/30 rounded-lg bg-background/50 text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                      >
                        <option value="">Select</option>
                        <option value="0-2">0–2</option>
                        <option value="3-5">3–5</option>
                        <option value="6-10">6–10</option>
                        <option value="10+">10+</option>
                      </select>
                    </div>

                    <!-- Team availability -->
                    <div class="mb-4">
                      <label for="availability" class="block text-sm font-medium text-primary mb-2">Your team's monthly availability for this project</label>
                      <select
                        id="availability"
                        v-model="formData.availability"
                        required
                        class="w-full px-3 py-2 border border-accent/30 rounded-lg bg-background/50 text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                      >
                        <option value="">Select</option>
                        <option value="90min">90 min recording only</option>
                        <option value="150min">≤150 min total</option>
                        <option value="more">More than 150 min</option>
                      </select>
                    </div>

                    <!-- Optional notes -->
                    <div class="mb-4">
                      <label for="restrictions" class="block text-sm font-medium text-primary mb-2">Anything we should not show or say? (optional)</label>
                      <textarea
                        id="restrictions"
                        v-model="formData.restrictions"
                        maxlength="300"
                        rows="3"
                        placeholder="Redactions, restricted metrics, customer mentions, etc."
                        class="w-full px-3 py-2 border border-accent/30 rounded-lg bg-background/50 text-primary placeholder-primary/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent resize-none"
                      ></textarea>
                      <div class="text-xs text-primary/50 mt-1">{{ formData.restrictions.length }} / 300</div>
                    </div>

                    <!-- How did you hear -->
                    <div class="mb-6">
                      <label for="hearAbout" class="block text-sm font-medium text-primary mb-2">How did you hear about us?</label>
                      <select
                        id="hearAbout"
                        v-model="formData.hearAbout"
                        required
                        class="w-full px-3 py-2 border border-accent/30 rounded-lg bg-background/50 text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                      >
                        <option value="">Select</option>
                        <option value="search">Web Search</option>
                        <option value="social">Social Media</option>
                        <option value="recommended">Recommended by another service provider</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <!-- Submit button -->
                  <div class="pt-4" v-reveal="{ delay: 800 }">
                    <button
                      type="submit"
                      :disabled="isSubmitting"
                      class="w-full group relative bg-accent-bold text-white px-6 py-4 rounded-xl font-dm font-semibold text-lg transition-all duration-300 hover:bg-accent-strong hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                    >
                      <span v-if="!isSubmitting" class="relative z-10">Book Intro Call</span>
                      <span v-else class="relative z-10">Submitting...</span>
                      
                      <!-- Shimmer effect -->
                      <div class="absolute inset-0 -top-full bg-gradient-to-b from-white/20 to-transparent skew-y-12 transition-all duration-700 group-hover:top-full"></div>
                    </button>
                    
                    <p class="text-xs text-primary/60 mt-3 text-center">
                      By clicking <strong>"Book Intro Call"</strong>, you agree to our <strong>Privacy Policy</strong>.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    
    <FooterSection />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import FooterSection from '../components/layout/FooterSection.vue'
import { useBookCallNavigation } from '../composables/useBookCallNavigation'
import { useAnimations } from '../composables/useAnimations'
import { supabase } from '../lib/supabaseClient'

// Add animation directives
const { vReveal, vStagger } = useAnimations()

const { resetLoading } = useBookCallNavigation()

const isSubmitting = ref(false)

// Form data
const formData = reactive({
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  interest: '',
  location: '',
  companyType: '',
  companyTypeOther: '',
  approvalSlowdowns: [],
  communication: '',
  signOff: [],
  activeDeals: '',
  availability: '',
  restrictions: '',
  hearAbout: ''
})

// Form options
const interestOptions = [
  {
    value: 'faster-approvals',
    title: 'Faster internal approvals',
    description: 'Help compliance, risk, security, legal, and finance say "yes" sooner.'
  },
  {
    value: 'shorter-vendor',
    title: 'Shorter vendor review',
    description: 'Reduce security/privacy diligence loops and questionnaire rounds.'
  },
  {
    value: 'safer-ai',
    title: 'Safer AI & model communication',
    description: 'Explainability, monitoring, overrides—clear and approvable.'
  },
  {
    value: 'clear-finance',
    title: 'Clear finance case',
    description: 'Translate outcomes into unit economics and total cost to integrate.'
  }
]

const approvalSlowdowns = [
  { value: 'security-privacy', label: 'Security & privacy review back-and-forth' },
  { value: 'compliance-risk', label: 'Compliance & risk clarification cycles' },
  { value: 'legal-redlines', label: 'Legal redlines and wording rework' },
  { value: 'finance-procurement', label: 'Finance/procurement clarity and total cost to integrate' }
]

const signOffOptions = [
  { value: 'compliance', label: 'Compliance/MLRO' },
  { value: 'security', label: 'Security/Privacy' },
  { value: 'legal', label: 'Legal' },
  { value: 'finance', label: 'Finance/Procurement' }
]

// Handle form submission
const handleSubmit = async () => {
  isSubmitting.value = true
  
  try {
    // Prepare data for the new booking_answers table
    const submissionData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      company_email: formData.email,
      company_name: formData.company,
      interest: formData.interest,
      location: formData.location,
      company_type: formData.companyType,
      company_type_other: formData.companyTypeOther || null,
      approval_slowdowns: formData.approvalSlowdowns,
      communication_method: formData.communication,
      sign_off_stakeholders: formData.signOff,
      active_deals: formData.activeDeals,
      team_availability: formData.availability,
      restrictions: formData.restrictions || null,
      how_heard: formData.hearAbout
    }

    console.log('Submitting form data to booking_answers:', submissionData)

    // Insert into the new booking_answers table
    const { data, error } = await supabase
      .from('booking_answers')
      .insert([submissionData])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      throw error
    }

    console.log('Form submitted successfully:', data)
  
  // Redirect to Calendly upon successful submission in a new tab
  window.open('https://calendly.com/eduard-nyvocreative/30min', '_blank')
    
  } catch (error) {
    console.error('Error submitting form:', error)
    alert(`There was an error submitting your form: ${error.message}. Please try again.`)
  } finally {
    isSubmitting.value = false
  }
}

// Reset loading state when this page loads
onMounted(() => {
  console.log('Book page mounted, resetting loading state')
  setTimeout(() => {
    resetLoading()
  }, 100)
})

// Page metadata
if (typeof useHead !== 'undefined') {
  useHead({
    title: 'Talk to an Expert - Nyvo Creative',
    meta: [
      { name: 'description', content: 'Book a strategy call to discuss your stakeholder-ready content engine needs.' }
    ]
  })
}
</script>