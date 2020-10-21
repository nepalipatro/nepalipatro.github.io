import { writable } from 'svelte/store'

export const themeState = writable(localStorage.getItem('theme') || 'dark')
themeState.subscribe((theme) => localStorage.setItem('theme', /dark|light/.test(theme) ? theme : 'dark'))

export const localeState = writable(localStorage.getItem('locale') || 'ne')
localeState.subscribe((lang) => localStorage.setItem('locale', /en|ne/.test(lang) ? lang : 'ne'))

export const currentYearMonthState = writable('')
