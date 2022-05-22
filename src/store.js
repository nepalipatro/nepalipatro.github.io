import { writable, readable } from 'svelte/store'

export const themeState = writable(localStorage.getItem('theme') || 'dark')
themeState.subscribe((theme) => localStorage.setItem('theme', /dark|light/.test(theme) ? theme : 'dark'))

export const localeState = writable(localStorage.getItem('locale') || 'ne')
localeState.subscribe((lang) => localStorage.setItem('locale', /en|ne/.test(lang) ? lang : 'ne'))

export const currentYearMonthState = writable('')

export const yearsState = readable([], async (set) => {
  try {
    const response = await fetch('/data/years.json')
    if (response.ok) {
      const data = await response.json()
      set(data)
    }
  } catch (error) {
    console.error(error)
  }

  // Return the unsubscribe function which doesn't do anything here (but is part of the stores protocol).
  return () => undefined
})
