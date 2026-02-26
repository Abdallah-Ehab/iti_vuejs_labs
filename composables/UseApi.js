import { ref } from 'vue'

export function useApi(baseUrl) {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const getAll = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(baseUrl)

      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }

      data.value = await response.json()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const getById = async (id) => {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(`${baseUrl}/${id}`)
      if (!response.ok) throw new Error('Failed to fetch item by ID')
      const result = await response.json()
      return result
    } catch (err) {
      error.value = err.message
      return null
    } finally {
      loading.value = false
    }
  }

  const update = async (id, fullObject) => {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fullObject)
      })
      if (!response.ok) throw new Error('Failed to update')
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, getAll, getById, update }
}