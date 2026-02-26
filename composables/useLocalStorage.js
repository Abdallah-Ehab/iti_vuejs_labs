import { ref, watch } from 'vue'

export function useLocalStorage(key, defaultValue) {
  // Read from localStorage on init
  const storedValue = localStorage.getItem(key)
  const initialValue = storedValue ? JSON.parse(storedValue) : defaultValue

  const data = ref(initialValue)

  // Watch for changes and automatically save to localStorage
  watch(
    data,
    (newValue) => {
      localStorage.setItem(key, JSON.stringify(newValue))
    },
    { deep: true },
  )

  return data
}
