import { ref } from 'vue'

const isPrivacyModalOpen = ref(false)
const isTermsModalOpen = ref(false)

export function useModals() {
  const openPrivacyModal = () => {
    isPrivacyModalOpen.value = true
  }

  const closePrivacyModal = () => {
    isPrivacyModalOpen.value = false
  }

  const openTermsModal = () => {
    isTermsModalOpen.value = true
  }

  const closeTermsModal = () => {
    isTermsModalOpen.value = false
  }

  return {
    isPrivacyModalOpen,
    isTermsModalOpen,
    openPrivacyModal,
    closePrivacyModal,
    openTermsModal,
    closeTermsModal
  }
}