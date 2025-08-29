<template>
    <div class="w-screen h-screen bg-white flex">
        <div class="w-full h-full p-3">
            <div class="w-full h-full rounded-lg">
                <!-- Progress Indicator -->
                <div class="flex justify-center pt-8">
                    <div class="flex items-center space-x-4">
                        <div v-for="step in 5" :key="step" class="flex items-center">
                            <div :class="['w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold', 
                                         currentStep >= step ? 'bg-blue-600' : 'bg-gray-400']">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex gap-3 flex-col h-full">
                    <div class="w-full h-full flex flex-col items-center justify-center gap-5">
                        
                        <!-- Step 1: Question 1 (Select all that apply) -->
                        <div v-if="currentStep === 1" class="w-full flex flex-col items-center gap-5">
                            <h2 class="text-2xl font-bold text-gray-800 mb-2 text-center">
                                What’s your main funding challenge? (Select all that apply)
                            </h2>
                            
                            <div class="w-full max-w-md space-y-3">
                                <div 
                                    v-for="opt in q1Options" 
                                    :key="opt.value" 
                                    class="flex items-start gap-3 p-3 rounded-lg border border-gray-200 hover:border-blue-400 transition cursor-pointer"
                                    @click="toggleQ1(opt.value)"
                                >
                                    <input
                                        type="checkbox"
                                        class="mt-1 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                                        :value="opt.value"
                                        v-model="selectedQ1"
                                        @click.stop
                                        :id="'q1-' + opt.value"
                                    >
                                    <label :for="'q1-' + opt.value" class="flex-1 cursor-pointer">
                                        <span class="font-medium text-gray-800">{{ opt.label }}</span>
                                        <span v-if="opt.desc" class="block text-xs text-gray-500 mt-0.5">{{ opt.desc }}</span>
                                    </label>
                                </div>
                            </div>
                            
                            <button 
                                :class="['inline-flex h-12 items-center justify-center rounded-md  px-6 font-medium text-neutral-50 shadow-lg shadow-neutral-500/20 transition',
                                selectedQ1.length 
                                ?'bg-neutral-950 active:scale-95'
                                :'bg-neutral-500'
                                ]"
                                @click="nextStep"
                                :disabled="!selectedQ1.length"
                            >
                                Next
                            </button>
                        </div>

                        <!-- Step 2: Question 2 -->
                        <div v-if="currentStep === 2" class="w-full flex flex-col items-center gap-5">
                            <h2 class="text-2xl font-bold text-gray-800 mb-6">Question 2</h2>
                            <div class="w-full max-w-md">
                                <input 
                                    type="text" 
                                    v-model="form.q2" 
                                    placeholder="Question 2"
                                    class="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                            </div>
                            <div class="flex gap-4">
                                <button 
                                class="inline-flex h-12 items-center justify-center rounded-md  px-6 font-medium text-neutral-50 shadow-lg shadow-neutral-500/20 transition bg-neutral-950 active:scale-95"
                                @click="prevStep"
                                >
                                    Back
                                </button>
                                <button 
                                :class="['inline-flex h-12 items-center justify-center rounded-md  px-6 font-medium text-neutral-50 shadow-lg shadow-neutral-500/20 transition',
                                form.q2.trim() 
                                ?'bg-neutral-950 active:scale-95'
                                :'bg-neutral-500'
                                ]"
                                @click="nextStep"
                                :disabled="!form.q2.trim()"
                                >
                                    Next
                                </button>
                            </div>
                        </div>

                        <!-- Step 3: Question 3 -->
                        <div v-if="currentStep === 3" class="w-full flex flex-col items-center gap-5">
                            <h2 class="text-2xl font-bold text-gray-800 mb-6">Question 3</h2>
                            <div class="w-full max-w-md">
                                <input 
                                    type="text" 
                                    v-model="form.q3" 
                                    placeholder="Question 3"
                                    class="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                            </div>
                            <div class="flex gap-4">
                                <button 
                                class="inline-flex h-12 items-center justify-center rounded-md  px-6 font-medium text-neutral-50 shadow-lg shadow-neutral-500/20 transition bg-neutral-950 active:scale-95"
                                @click="prevStep"
                                >
                                    Back
                                </button>
                                <button 
                                :class="['inline-flex h-12 items-center justify-center rounded-md  px-6 font-medium text-neutral-50 shadow-lg shadow-neutral-500/20 transition',
                                form.q3.trim() 
                                ?'bg-neutral-950 active:scale-95'
                                :'bg-neutral-500'
                                ]"
                                @click="nextStep"
                                :disabled="!form.q3.trim()"
                                >
                                    Next
                                </button>
                            </div>
                        </div>

                        <!-- Step 4: Question 4 -->
                        <div v-if="currentStep === 4" class="w-full flex flex-col items-center gap-5">
                            <h2 class="text-2xl font-bold text-gray-800 mb-6">Question 4</h2>
                            <div class="w-full max-w-md">
                                <input 
                                    type="text" 
                                    v-model="form.q4" 
                                    placeholder="Question 4"
                                    class="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                            </div>
                            <div class="flex gap-4">
                                <button 
                                class="inline-flex h-12 items-center justify-center rounded-md  px-6 font-medium text-neutral-50 shadow-lg shadow-neutral-500/20 transition bg-neutral-950 active:scale-95"
                                @click="prevStep"
                                >
                                    Back
                                </button>
                                <button 
                                :class="['inline-flex h-12 items-center justify-center rounded-md  px-6 font-medium text-neutral-50 shadow-lg shadow-neutral-500/20 transition',
                                form.q4.trim() 
                                ?'bg-neutral-950 active:scale-95'
                                :'bg-neutral-500'
                                ]"
                                @click="nextStep"
                                :disabled="!form.q4.trim()"
                                >
                                    Next
                                </button>
                            </div>
                        </div>

                        <!-- Step 5: Company & Personal Information -->
                        <div v-if="currentStep === 5" class="w-full flex flex-col items-center gap-5">
                            <h2 class="text-2xl font-bold text-gray-800 mb-6">Company & Personal Information</h2>
                            <div class="space-y-4 w-full max-w-md">
                                <input 
                                    type="text" 
                                    v-model="form.full_name" 
                                    placeholder="Full Name"
                                    class="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                <input 
                                    type="email" 
                                    v-model="form.company_email" 
                                    placeholder="Company Email"
                                    class="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                <input 
                                    type="tel" 
                                    v-model="form.contact_number" 
                                    placeholder="Contact Number"
                                    class="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                <input 
                                    type="text" 
                                    v-model="form.company_name" 
                                    placeholder="Company Name"
                                    class="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                <input 
                                    type="url" 
                                    v-model="form.company_web" 
                                    placeholder="Company Website"
                                    class="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                <textarea 
                                    v-model="form.notes" 
                                    placeholder="Notes"
                                    rows="4"
                                    class="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                ></textarea>
                            </div>
                            <div class="flex gap-4">
                                <button 
                                    @click="prevStep"
                                    class="bg-gray-500 hover:bg-gray-400 text-white px-6 py-3 rounded-full transition-colors duration-200"
                                >
                                    Back
                                </button>
                                <button 
                                    @click="submit"
                                    class="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-full transition-colors duration-200"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { supabase } from '../lib/supabaseClient';

const currentStep = ref(1);

const q1Options = [
    { value: 'A', label: 'Option A', desc: 'Description for option A' },
    { value: 'B', label: 'Option B', desc: 'Description for option B' },
    { value: 'C', label: 'Option C', desc: 'Description for option C' },
    { value: 'D', label: 'Option D', desc: 'Description for option D' },
];


const selectedQ1 = ref([]);

const form = ref({
    company_email: '',
    full_name: '',
    contact_number: '',
    company_name: '',
    company_web: '',
    notes: '',
    q1: '', 
    q2: '',
    q3: '',
    q4: '',
});

watch(selectedQ1, (vals) => {
    form.value.q1 = vals.join(',');
});

const toggleQ1 = (val) => {
    if (selectedQ1.value.includes(val)) {
        selectedQ1.value = selectedQ1.value.filter(v => v !== val);
    } else {
        selectedQ1.value.push(val);
    }
};

const nextStep = () => {
    if (currentStep.value < 5) {
        currentStep.value++;
    }
};

const prevStep = () => {
    if (currentStep.value > 1) {
        currentStep.value--;
    }
};

async function submit() {
    const { data, error } = await supabase
        .from('form_answers')
        .insert([{
            company_email: form.value.company_email,
            full_name: form.value.full_name,
            contact_number: form.value.contact_number,
            company_name: form.value.company_name,
            company_web: form.value.company_web,
            notes: form.value.notes,
            q1: form.value.q1, 
            q2: form.value.q2,
            q3: form.value.q3,
            q4: form.value.q4,
        }]);

    if (error) {
        console.error('Error inserting data:', error.message);
    } else {
        console.log('Data inserted successfully:', data);

        // Reset form & selections
        selectedQ1.value = [];
        form.value = {
            company_email: '',
            full_name: '',
            contact_number: '',
            company_name: '',
            company_web: '',
            notes: '',
            q1: '',
            q2: '',
            q3: '',
            q4: '',
        };

        currentStep.value = 1;
    }
}
</script>