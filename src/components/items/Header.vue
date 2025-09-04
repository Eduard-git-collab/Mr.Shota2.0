<script setup>
import { RouterLink } from 'vue-router';
import Brandlogo from '../../assets/logos/brandlogo.vue';
</script>

<template>
    <header class="top-0 w-full z-50 bg-secondary fixed">
      <div class="w-full h-fit">
        <div class="p-2 sm:p-3">
            <div class="max-w-11/12 flex mx-auto items-center justify-between text-sm h-12 sm:h-14 md:h-16">
                <!-- Logo Section - Responsive sizing -->
                <div class="flex items-center justify-center gap-1 sm:gap-2 h-12 sm:h-14 md:h-16">
                    <!-- Logo scales with container -->
                    <div class="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12">
                        <Brandlogo bgColor="" accentColor="#28272c"/>
                    </div>
                    <!-- Brand text - responsive sizing and visibility -->
                    <span class="text-primary font-funnel text-lg sm:text-xl md:text-2xl font-thin xs:block">
                        <span class="hidden sm:inline">Nyvo Creative</span>
                        <span class="sm:hidden">Nyvo</span>
                    </span>
                </div>
                
                <!-- CTA Button - Responsive sizing and text -->
                <div class="flex items-center space-x-4 font-dm">
                    <button class="group relative inline-flex h-10 sm:h-12 md:h-[calc(48px+8px)] items-center justify-center rounded-lg sm:rounded-xl border border-dashed border-primary py-1 pl-3 sm:pl-4 md:pl-6 pr-10 sm:pr-12 md:pr-14 font-medium text-primary cursor-pointer group text-xs sm:text-sm">
                        <!-- Button text - responsive -->
                        <span class="z-10 pr-1 sm:pr-2 group-hover:text-secondary transition-all duration-200">
                            <span class="hidden sm:inline">Book a call</span>
                            <span class="sm:hidden">Call</span>
                        </span>
                        
                        <!-- Animated background - responsive sizing -->
                        <div class="absolute right-0.5 sm:right-1 inline-flex h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 items-center justify-end rounded-md sm:rounded-lg bg-accent transition-[width] group-hover:w-[calc(100%-4px)] sm:group-hover:w-[calc(100%-8px)]">
                            <div class="mr-2 sm:mr-2.5 md:mr-3.5 flex items-center justify-center">
                                <!-- Arrow icon - responsive sizing -->
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-[#28272c] transition-all duration-200">
                                    <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                                </svg>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
      </div>
    </header>
</template>