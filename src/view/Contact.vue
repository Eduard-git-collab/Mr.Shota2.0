<template>
    <div class="min-h-screen bg-background">
      <!-- Hero Section -->
      <section class="relative pt-24 sm:pt-32 pb-12 sm:pb-16 overflow-hidden">
        <!-- Background Elements -->
        <div aria-hidden="true" class="absolute inset-0">
          <div class="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-accent/5 blur-3xl"></div>
          <div class="absolute bottom-1/3 left-1/5 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
        </div>
  
        <div class="relative max-w-4xl mx-auto px-4 sm:px-6 md:px-8 text-center">
          <div v-reveal="{ delay: 200 }">
            <div class="inline-flex items-center gap-3 mb-6">
              <div class="w-8 h-px bg-gradient-to-r from-transparent to-accent"></div>
              <span class="font-dm text-accent font-medium tracking-wide">CONTACT</span>
              <div class="w-8 h-px bg-gradient-to-r from-accent to-transparent"></div>
            </div>
            
            <h1 class="font-funnel font-bold text-4xl sm:text-5xl md:text-6xl text-primary mb-6">
              Contact Nyvo Creative
            </h1>
            
            <div class="bg-accent-soft/20 rounded-2xl p-6 sm:p-8 border border-accent/30 inline-block">
              <p class="font-dm text-xl sm:text-2xl text-primary font-medium">
                We reply within one business day.
              </p>
            </div>
          </div>
        </div>
      </section>
  
      <div class="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pb-20 sm:pb-28">
        
        <!-- Quick Info Section -->
        <section class="mb-16" v-reveal="{ delay: 400 }">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Quick Contact Info -->
            <div class="space-y-6">
              <div>
                <p class="font-dm text-lg text-primary/80 mb-6">
                  If you're exploring a project, the fit-call form routes you straight to production. For anything else, use the contact form below.
                </p>
                
                <!-- CTA for Project Fit Call -->
                <div class="bg-gradient-to-br from-accent-soft/20 to-accent/10 rounded-xl p-6 border border-accent/30 mb-6">
                  <h3 class="font-funnel font-semibold text-xl text-primary mb-3">Ready for a project?</h3>
                  <a href="/book-a-fit-call" class="inline-flex items-center gap-2 font-dm font-semibold text-accent-bold hover:text-accent transition-colors">
                    Book a fit call
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                    </svg>
                  </a>
                </div>
              </div>
              
              <!-- Contact Details -->
              <div class="space-y-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                    <svg class="w-5 h-5 text-accent-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div>
                    <div class="font-dm font-semibold text-primary">Email</div>
                    <div class="font-dm text-primary/70">support@nyvocreative.co</div>
                  </div>
                </div>
                
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <div>
                    <div class="font-dm font-semibold text-primary">Office</div>
                    <div class="font-dm text-primary/70">Ymer Kurti St. Tirana, Albania (EU/Tirane time)</div>
                  </div>
                </div>
              </div>
            </div>
  
            <!-- When to Use Each Path -->
            <div class="bg-background border-2 border-accent/30 rounded-2xl p-6 sm:p-8">
              <h3 class="font-funnel font-bold text-2xl text-primary mb-6">When to use each path</h3>
              <div class="space-y-4">
                <div class="flex items-start gap-3">
                  <div class="w-2 h-2 rounded-full bg-accent-bold flex-shrink-0 mt-2"></div>
                  <div>
                    <strong class="font-dm font-semibold text-primary">New project / pricing / timelines:</strong>
                    <span class="font-dm text-primary/70"> book a fit call.</span>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <div class="w-2 h-2 rounded-full bg-accent-bold flex-shrink-0 mt-2"></div>
                  <div>
                    <strong class="font-dm font-semibold text-primary">Press & partnerships, billing, general questions:</strong>
                    <span class="font-dm text-primary/70"> use the contact form.</span>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <div class="w-2 h-2 rounded-full bg-accent-bold flex-shrink-0 mt-2"></div>
                  <div>
                    <strong class="font-dm font-semibold text-primary">Privacy/data requests:</strong>
                    <span class="font-dm text-primary/70"> email <strong>support@nyvocreative.co</strong> with subject <strong>"Data request"</strong>.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
  
        <!-- Contact Form -->
        <section class="mb-16" v-reveal="{ delay: 600 }">
          <div class="max-w-3xl mx-auto">
            <div class="bg-background border-2 border-accent/30 rounded-2xl p-8 sm:p-12">
              <div class="text-center mb-8">
                <h2 class="font-funnel font-bold text-3xl text-primary mb-4">Contact form</h2>
                <p class="font-dm text-primary/70">
                  <strong>We use your details only to answer your message.</strong> (See Privacy & Cookie Policy.)
                </p>
              </div>
  
              <form class="space-y-6">
                <!-- Name and Email Row -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label class="block font-dm font-semibold text-primary mb-2">
                      Full name <span class="text-accent-bold">*</span>
                    </label>
                    <input 
                      type="text" 
                      required
                      class="w-full px-4 py-3 border border-accent/30 rounded-lg bg-background text-primary placeholder-primary/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                      placeholder="Your full name"
                    >
                  </div>
                  <div>
                    <label class="block font-dm font-semibold text-primary mb-2">
                      Work email address <span class="text-accent-bold">*</span>
                    </label>
                    <input 
                      type="email" 
                      required
                      class="w-full px-4 py-3 border border-accent/30 rounded-lg bg-background text-primary placeholder-primary/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                      placeholder="your.email@company.com"
                    >
                  </div>
                </div>
  
                <!-- Company and Role Row -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label class="block font-dm font-semibold text-primary mb-2">
                      Company name <span class="text-accent-bold">*</span>
                    </label>
                    <input 
                      type="text" 
                      required
                      class="w-full px-4 py-3 border border-accent/30 rounded-lg bg-background text-primary placeholder-primary/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                      placeholder="Your company"
                    >
                  </div>
                  <div>
                    <label class="block font-dm font-semibold text-primary mb-2">
                      Role / title <span class="text-primary/50">(optional)</span>
                    </label>
                    <input 
                      type="text"
                      class="w-full px-4 py-3 border border-accent/30 rounded-lg bg-background text-primary placeholder-primary/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                      placeholder="Your role"
                    >
                  </div>
                </div>
  
                <!-- Location -->
                <div>
                  <label class="block font-dm font-semibold text-primary mb-2">
                    Location <span class="text-accent-bold">*</span>
                  </label>
                  <select 
                    required
                    class="w-full px-4 py-3 border border-accent/30 rounded-lg bg-background text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                  >
                    <option value="">Select your location</option>
                    <option value="eu-uk">EU/UK</option>
                    <option value="us-canada">US/Canada</option>
                    <option value="other">Other</option>
                  </select>
                </div>
  
                <!-- How Can We Help -->
                <div>
                  <label class="block font-dm font-semibold text-primary mb-2">
                    How can we help? <span class="text-accent-bold">*</span>
                  </label>
                  <select 
                    required
                    class="w-full px-4 py-3 border border-accent/30 rounded-lg bg-background text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                  >
                    <option value="">Select one</option>
                    <option value="partnership">New partnership inquiry</option>
                    <option value="press">Press/media</option>
                    <option value="billing">Billing/support</option>
                    <option value="general">General question</option>
                  </select>
                </div>
  
                <!-- Message -->
                <div>
                  <label class="block font-dm font-semibold text-primary mb-2">
                    Message <span class="text-accent-bold">*</span>
                  </label>
                  <p class="font-dm text-sm text-primary/60 mb-3 italic">
                    What's the goal, timeline, or link we should see?
                  </p>
                  <textarea 
                    required
                    rows="5"
                    class="w-full px-4 py-3 border border-accent/30 rounded-lg bg-background text-primary placeholder-primary/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors resize-vertical"
                    placeholder="Tell us about your project, question, or how we can help..."
                  ></textarea>
                </div>
  
                <!-- File Attachment -->
                <div>
                  <label class="block font-dm font-semibold text-primary mb-2">
                    Attach a file <span class="text-primary/50">(optional)</span>
                  </label>
                  <p class="font-dm text-sm text-primary/60 mb-3">
                    PDF/PNG/MP4 up to 25MB
                  </p>
                  <div class="relative">
                    <input 
                      type="file" 
                      accept=".pdf,.png,.mp4"
                      class="w-full px-4 py-3 border border-accent/30 rounded-lg bg-background text-primary file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-accent-soft file:text-accent-bold hover:file:bg-accent/20 transition-colors"
                    >
                  </div>
                </div>
  
                <!-- Consent -->
                <div class="flex items-start gap-3">
                  <input 
                    type="checkbox" 
                    required
                    class="mt-1 w-4 h-4 text-accent-bold border border-accent/30 rounded focus:ring-accent focus:ring-2"
                  >
                  <label class="font-dm text-sm text-primary/80">
                    I agree to be contacted about my enquiry and understand Nyvo Creative will process my data according to the <strong class="text-accent-bold">Privacy & Cookie Policy</strong>.
                  </label>
                </div>
  
                <!-- Submit Button -->
                <div class="pt-4">
                  <button 
                    type="submit"
                    class="w-full bg-accent-bold text-white px-8 py-4 rounded-xl font-dm font-semibold text-lg hover:bg-accent-strong hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Send message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
  
        <!-- What to Expect -->
        <section class="mb-16" v-reveal="{ delay: 800 }">
          <div class="max-w-4xl mx-auto">
            <h2 class="font-funnel font-bold text-3xl text-primary mb-8 text-center">What to expect</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6" v-stagger="{ delay: 100 }">
              <div class="text-center p-6 bg-background border border-accent/30 rounded-xl">
                <div class="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                  <svg class="w-8 h-8 text-accent-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 class="font-funnel font-semibold text-lg text-primary mb-2">Response time</h3>
                <p class="font-dm text-primary/70">Under <strong class="text-accent-bold">1 business day</strong></p>
              </div>
              
              <div class="text-center p-6 bg-background border border-accent/30 rounded-xl">
                <div class="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 class="font-funnel font-semibold text-lg text-primary mb-2">Project inquiries</h3>
                <p class="font-dm text-primary/70">We'll point you to the fit-call flow</p>
              </div>
              
              <div class="text-center p-6 bg-background border border-accent/30 rounded-xl">
                <div class="w-16 h-16 rounded-full bg-accent-strong/20 flex items-center justify-center mx-auto mb-4">
                  <svg class="w-8 h-8 text-accent-strong" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 class="font-funnel font-semibold text-lg text-primary mb-2">Support issues</h3>
                <p class="font-dm text-primary/70">Resolution within <strong class="text-accent-bold">2–3 business days</strong></p>
              </div>
            </div>
            
            <div class="mt-8 p-6 bg-accent-soft/10 rounded-xl border border-accent/20 text-center">
              <p class="font-dm text-primary/80">
                <strong class="text-accent-bold">Production-day issues:</strong> write <strong>"URGENT"</strong> in the subject to prioritise.
              </p>
            </div>
          </div>
        </section>
  
        <!-- Office & Hours + Accessibility -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12" v-reveal="{ delay: 1000 }">
          <section>
            <h2 class="font-funnel font-bold text-3xl text-primary mb-6">Office & hours</h2>
            <div class="space-y-4">
              <div>
                <h3 class="font-funnel font-semibold text-lg text-primary">Nyvo Creative</h3>
                <p class="font-dm text-primary/70">Rr. Ymer Kurti, Albania</p>
              </div>
              <div>
                <h3 class="font-funnel font-semibold text-lg text-primary">Hours</h3>
                <p class="font-dm text-primary/70">Mon–Fri, 09:00–18:00 (Europe/Tirane)</p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 class="font-funnel font-bold text-3xl text-primary mb-6">Accessibility & alternatives</h2>
            <p class="font-dm text-primary/80 leading-relaxed">
              If the form doesn't work for you, write to <strong class="text-accent-bold">support@nyvocreative.co</strong>. We can also schedule via your calendar link on request.
            </p>
          </section>
        </div>
      </div>
    </div>
    <FooterSection />
  </template>
  
  <script setup>
  import FooterSection from '../components/layout/FooterSection.vue'
  import { useAnimations } from '../composables/useAnimations'
  const { vReveal, vStagger } = useAnimations()
  </script>