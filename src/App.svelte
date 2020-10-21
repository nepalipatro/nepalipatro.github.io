<script>
  import { onDestroy, onMount } from 'svelte'

  import { themeState, localeState, currentYearMonthState } from './store'
  import { setupI18n, isLocaleLoaded, dir, _ } from './i18n'
  import constants from './utils/constants'
  import en2neNumbers from './utils/en2neNumbers'
  import ne2enNumbers from './utils/ne2enNumbers'
  import getBS from './utils/getBS'
  import Din from './components/Din.svelte'

  const longDays = ['Tuesday', 'Saturday', 'Thursday', 'Wednesday']
  const shortDays = ['बुधवार', 'शुक्रवार', 'शनिवार', 'सोमवार', 'बिहीवार']
  const DEFAULT_LANG = 'ne'
  let today = new Date()
  let currentYearMonth = {}
  let isDark = true
  let loading = false
  let locale = DEFAULT_LANG
  $: data = ''
  $: title = ''
  $: subtitle = ''

  $: document.title = `${locale === 'en' ? 'Nepali Calendar' : 'नेपाली पात्रो'} | ${title} - ${subtitle}`

  today = {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    date: today.getDate(),
  }

  const todayBs = getBS(today.year, today.month, today.date)

  $: if (!$isLocaleLoaded) {
    setupI18n({ withLocale: locale })
  }
  $: {
    document.dir = $dir
  }

  $: if (data) {
    const dateAD = new Date(data[0].ad)
    title = `${constants.monthsBS[+currentYearMonth.month - 1][locale]} ${
      locale === DEFAULT_LANG ? en2neNumbers(currentYearMonth.year) : currentYearMonth.year
    }`
    subtitle = `${constants.monthsAD[dateAD.getMonth()]}/${constants.monthsAD[dateAD.getMonth() + 1]} ${dateAD.getFullYear()}`
  }

  themeState.subscribe((x) => {
    isDark = x === 'dark'
    document.body.setAttribute('data-theme', x)
  })

  localeState.subscribe((value) => {
    setupI18n({ withLocale: value })

    locale = value
    if (!locale === DEFAULT_LANG) {
      document.body.classList.remove('ne')
    } else {
      document.body.classList.add('ne')
    }
  })

  currentYearMonthState.subscribe((yearMonth) => {
    if (yearMonth) {
      const [year, month] = yearMonth.split('-')
      currentYearMonth = { year, month }
      loading = true
      fetch(`/data/${yearMonth}.json`)
        .then((res) => res.json())
        .then((json) => {
          data = json
        })
        .catch(console.error)
        .finally(() => {
          loading = false
        })
    }
  })

  onMount(() => {
    window.addEventListener('hashchange', hashchangeHandler)
    const selected = getSelected()
    if (selected) {
      currentYearMonthState.set(selected)
    } else {
      location.hash = ''
      setToday()
    }
  })

  onDestroy(() => {
    window.removeEventListener('hashchange', hashchangeHandler)
  })

  // Close the dropdown if the user clicks outside of it
  window.onclick = function (event) {
    if (!event.target.matches('.menu-btn')) {
      const dropdownEls = document.getElementsByClassName('dropdown-content')

      for (let i = 0; i < dropdownEls.length; i++) {
        const openDropdown = dropdownEls[i]
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show')
        }
      }
    }
  }

  function hashchangeHandler(e) {
    const selected = getSelected()
    if (selected) {
      currentYearMonthState.set(selected)
    }
  }

  function getSelected() {
    const selected = location.hash.split('/').pop()
    const [year, month] = selected.split('-')
    if (constants.years.includes(+year) && +month < 13 > 0) {
      return selected
    }
  }

  function setToday() {
    const { year, month } = getBS(today.year, today.month, today.date)
    if (year && month) {
      currentYearMonthState.set(`${year}-${padZero(month)}`)
    } else {
      location.hash = ''
    }
  }

  function padZero(n) {
    return +n < 10 ? '0' + n : n + ''
  }

  function menuClickHandler(e) {
    e.target.parentNode.querySelector('.dropdown-content').classList.toggle('show')
  }

  function toggleTheme() {
    themeState.update((x) => (x === 'dark' ? 'light' : 'dark'))
  }

  function toggleLocale() {
    localeState.update((x) => (x === 'ne' ? 'en' : 'ne'))
  }

  function todayClickHandler(e) {
    location.hash = `/${todayBs.year}-${padZero(todayBs.month)}`
  }

  function yearChangeHandler(e) {
    location.hash = `/${e.target.value}-${currentYearMonth.month}`
  }

  function monthChangeHandler(e) {
    location.hash = `/${currentYearMonth.year}-${e.target.value}`
  }

  $: isToday = (ad) => {
    return ad.split('-').filter((x, i) => [today.year, today.month, today.date][i] === parseInt(x)).length === 3
  }

  $: getInDays = (ad) => {
    let daysDiff = Math.round(
      (new Date(`${today.year}-${today.month}-${today.date}`).getTime() - new Date(ad).getTime()) / 8.64e7,
    )
    let inDays = $_(daysDiff === 0 ? 'today' : daysDiff === 1 ? 'yesterday' : daysDiff === -1 ? 'tomorrow' : '')
    inDays =
      inDays ||
      `${locale === 'ne' ? en2neNumbers(Math.abs(daysDiff)) : Math.abs(daysDiff)} ${$_(
        daysDiff > 1 ? 'daysBefore' : 'daysLeft',
      )}`
    return inDays
  }
</script>

<style>
  header,
  main,
  footer {
    position: relative;
    max-width: 1280px;
    margin-right: auto;
    margin-left: auto;
  }

  .logo h1 {
    display: inline;
  }
  .logo a {
    display: inline;
    color: var(--color);
    text-decoration: none;
  }

  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }

  .switch:not(:first-child) {
    margin-top: 1em;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--color);
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 34px;
  }

  .lang .slider {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='34' width='60'%3E%3Ctext x='10' y='23' fill='red'%3E🇳🇵%3C/text%3E%3Ctext x='34' y='23' fill='red'%3E🇬🇧%3C/text%3E%3C/svg%3E");
  }

  .theme .slider {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='34' width='60'%3E%3Ctext x='10' y='23' fill='red'%3E🌙%3C/text%3E%3Ctext x='34' y='23' fill='red'%3E🌞%3C/text%3E%3C/svg%3E");
  }

  .slider:before {
    position: absolute;
    content: '';
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: var(--bg-color);
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }

  .switch-input:checked + .slider {
    background-color: var(--color);
  }

  .switch-input:focus + .slider {
    box-shadow: 0 0 1px var(--bg-color);
  }

  .switch-input:checked + .slider:before {
    background-color: var(--bg-color);
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  .dropdown-content {
    opacity: 0;
    visibility: hidden;
    display: flex;
    position: absolute;
    background-color: var(--secondary-bg-color);
    box-shadow: var(--box-shadow);
    flex-direction: column;
    padding: 16px;
    border-radius: 4px;
    right: 0;
    background-color: var(--secondary-bg-color);
    transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    z-index: 100;
    box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.31), 0 24px 36px -8px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
  }
  .source-link {
    text-decoration: none;
    color: var(--color);
    padding: 0.5em;
    margin: 0.5em -0.5em -0.5em -0.5em;
  }
  .source-link pre {
    margin: 0;
  }
  .source-link:hover {
    background-color: var(--hover-bg-color);
  }
  .navigation {
    margin-bottom: 1em;
    display: flex;
    justify-content: flex-end;
  }
  .navigation > *:not(:first-child) {
    margin-left: 0.5em;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(169px, 1fr));
    grid-gap: 1rem;
    margin-bottom: 1em;
  }
</style>

{#if $isLocaleLoaded}
  <header class="row">
    <div class="col logo">
      <a href="/">
        <h1>{title}</h1>
      </a>
      <p>{subtitle}</p>
    </div>
    <div class="text-right">
      <div class="dropdown">
        <button on:click={menuClickHandler} class="menu-btn icon-btn"><svg
            viewBox="0 0 24 24"
            style="height:20px;width:20px"><path
              d="M12 8A4 4 0 0 1 16 12 4 4 0 0 1 12 16 4 4 0 0 1 8 12 4 4 0 0 1 12 8M12 10A2 2 0 0 0 10 12 2 2 0 0 0 12 14 2 2 0 0 0 14 12 2 2 0 0 0 12 10M10 22C9.8 22 9.5 21.8 9.5 21.6L9.1 18.9C8.5 18.7 8 18.3 7.4 17.9L5 19C4.7 19 4.5 19 4.3 18.7L2.3 15.3C2.2 15.1 2.3 14.8 2.5 14.6L4.6 13 4.5 12 4.6 11 2.5 9.4C2.3 9.2 2.2 9 2.3 8.7L4.3 5.3C4.5 5.1 4.7 5 5 5.1L7.4 6.1C8 5.7 8.5 5.3 9.1 5.1L9.5 2.4C9.5 2.2 9.8 2 10 2H14C14.3 2 14.5 2.2 14.5 2.4L14.9 5.1C15.5 5.3 16 5.7 16.6 6.1L19.1 5.1C19.3 5 19.5 5.1 19.7 5.3L21.7 8.7C21.8 9 21.7 9.2 21.5 9.4L19.4 11 19.5 12 19.4 13 21.5 14.6C21.7 14.8 21.8 15.1 21.7 15.3L19.7 18.7C19.5 19 19.3 19 19.1 19L16.6 18C16 18.3 15.5 18.7 14.9 18.9L14.5 21.6C14.5 21.8 14.3 22 14 22H10M11.3 4L10.9 6.6C9.7 6.9 8.6 7.5 7.9 8.4L5.4 7.4 4.7 8.7 6.8 10.2C6.4 11.4 6.4 12.6 6.8 13.8L4.7 15.4 5.4 16.7 7.9 15.6C8.6 16.5 9.7 17.1 10.9 17.4L11.2 20H12.8L13.1 17.4C14.3 17.1 15.4 16.5 16.1 15.6L18.6 16.7 19.3 15.4 17.2 13.8C17.6 12.6 17.6 11.4 17.2 10.2L19.3 8.7 18.6 7.4 16.2 8.4C15.4 7.5 14.3 6.9 13.1 6.6L12.8 4H11.3Z"
              fill="currentColor" /></svg></button>
        <div class="dropdown-content">
          <label class="switch theme">
            <input class="switch-input" type="checkbox" checked={isDark} on:change={toggleTheme} />
            <span class="slider" />
          </label>
          <label class="switch lang">
            <input class="switch-input" type="checkbox" checked={locale === DEFAULT_LANG} on:change={toggleLocale} />
            <span class="slider" />
          </label>
          <a
            class="source-link"
            href="https://github.com/nepalipatro/nepalipatro.github.io"
            target="_blank"><pre>&lt;Source/&gt;</pre></a>
        </div>
      </div>
    </div>
  </header>
  <main>
    <div class="navigation">
      <button title="आज" class="outlined-btn" on:click={todayClickHandler}>{$_('today')}</button>
      <select name="year" class="outlined-select" on:input={yearChangeHandler}>
        {#each constants.years as year}
          <option value={year} selected={currentYearMonth.year === year + ''}>
            {locale === DEFAULT_LANG ? en2neNumbers(year) : year}
          </option>
        {/each}
      </select>
      <select name="month" class="outlined-select" on:input={monthChangeHandler}>
        {#each constants.monthsBS as month, i}
          <option value={padZero(i + 1)} selected={currentYearMonth.month === padZero(i + 1)}>{month[locale]}</option>
        {/each}
      </select>
    </div>
    <div class="grid">
      {#each data as { day, date, events, panchanga, tithi, ad, gh, chandrama, saits, nsMonth, nsYear }}
        <Din
          day={constants.daysShort[day][locale]}
          events={(events || []).map((x) => x.name[locale]).join('; ')}
          {panchanga}
          {ad}
          eventParts={events.length ? events[0].name[locale].split(' (') : ['']}
          date={locale === 'ne' ? en2neNumbers(date) : date}
          tithi={constants.tithis[tithi < 29 ? tithi : 14][locale]}
          firstTithi={tithi === 0 || tithi === 23}
          chandrama={constants.chandramas[Math.floor(parseInt(chandrama))][locale]}
          chandramaPrefix={chandrama > parseInt(chandrama) ? constants.extraMonth[locale] : ''}
          isHoliday={gh || day === 6}
          isToday={isToday(ad)}
          yearNe={en2neNumbers(+currentYearMonth.year)}
          monthNe={constants.monthsBS[+currentYearMonth.month - 1].ne}
          monthNs={constants.monthNS[nsMonth][locale]}
          yearNs={locale === 'ne' ? en2neNumbers(nsYear) : nsYear}
          monthNsNe={constants.monthNS[nsMonth].ne}
          yearNsNe={en2neNumbers(nsYear)}
          dayNe={constants.days[day].ne}
          dateNe={en2neNumbers(date)}
          dateAd={ad.split('-')[2]}
          saits={saits.map((x) => constants.saits[x][locale]).join('; ')}
          sunrise={locale === 'ne' ? panchanga.sunrise : ne2enNumbers('०६:१२')}
          sunset={locale === 'ne' ? panchanga.sunset : ne2enNumbers(panchanga.sunset)}
          birthnames={(panchanga.birthname || []).map(({ dt, nakshatra }) => ({
            nakshatra,
            dt: locale === 'ne' ? en2neNumbers(dt) : dt,
          }))}
          inDays={getInDays(ad)} />
      {/each}
    </div>
  </main>
  <footer />
{:else}
  <p>Loading...</p>
{/if}
