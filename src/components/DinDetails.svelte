<script>
  import { onMount, onDestroy } from 'svelte'
  import { _ } from '../i18n'
  import Panchanga from './Panchanga.svelte'

  export let tithi
  export let events
  export let panchanga
  export let date
  export let chandrama
  export let chandramaPrefix
  export let yearNe
  export let monthNe
  export let dayNe
  export let dateNe
  export let inDays
  export let saits
  export let sunrise
  export let sunset
  export let ad
  export let monthNs
  export let yearNs
  export let monthNsNe
  export let yearNsNe
  export let birthnames

  function toggleAccordion(e) {
    if (e.target.classList.contains('accordion')) {
      e.target.classList.toggle('active')
      var panel = e.target.nextElementSibling
      if (panel.style.display === 'block') {
        panel.style.display = 'none'
        e.target.parentNode.parentNode.classList.remove('modal__inner-extended')
      } else {
        panel.style.display = 'block'
        e.target.parentNode.parentNode.classList.add('modal__inner-extended')
        e.target.parentNode.parentNode.scrollTo(0, e.target.offsetTop)
      }
    }
  }
  onMount(() => {
    document.addEventListener('click', toggleAccordion)
  })
  onDestroy(() => {
    document.removeEventListener('click', toggleAccordion)
  })
</script>

<style>
  .col-11 {
    flex: 0 0 91.666667%;
    max-width: 91.666667%;
  }
  .mt-2 {
    margin-top: 0.5rem !important;
  }
  .key {
    display: inline-block;
    font-weight: bold;
  }
  .panchang .key {
    width: 84px;
  }
  .inline {
    display: inline;
  }
  .sun svg {
    stroke: transparent;
  }
</style>

<div class="modal">
  <label class="modal__bg" for={`modal${date}`} />
  <div class="modal__inner">
    <div class="modal__content">
      <div class="row">
        <div class="col-11">
          <h2>{yearNe} {monthNe} {dateNe}, {dayNe}</h2><span>({inDays})</span>
        </div>
        <label for={`modal${date}`} class="icon-btn modal__close"><svg viewBox="0 0 24 24" style="height:20px;width:20px"><path
              d="M19 6.4L17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12 19 6.4Z"
              fill="currentColor" /></svg></label>
      </div>
      <div class="row">
        <span class="col">{tithi}, {chandramaPrefix}{chandrama}</span>
        <span
          class="col text-right">{new Intl.DateTimeFormat('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }).format(new Date(ad))}</span>
      </div>
      <div class="row">
        <span class="col">{monthNs}, {yearNs} {$_('ns')}</span>
        <div class="col text-right inline sun">
          <svg title="सूर्योदय" viewBox="0 0 24 24" style="height:16px;width:16px"><path
              d="M3 12H7A5 5 0 0 1 12 7 5 5 0 0 1 17 12H21A1 1 0 0 1 22 13 1 1 0 0 1 21 14H3A1 1 0 0 1 2 13 1 1 0 0 1 3 12M15 12A3 3 0 0 0 12 9 3 3 0 0 0 9 12H15M12 2L14.4 5.4C13.7 5.2 12.8 5 12 5 11.2 5 10.4 5.2 9.6 5.4L12 2M3.3 7L7.5 6.7C6.9 7.2 6.4 7.8 5.9 8.5 5.5 9.2 5.3 10 5.1 10.8L3.3 7M20.7 7L18.9 10.8C18.7 10 18.5 9.2 18.1 8.5 17.6 7.8 17.1 7.2 16.5 6.6L20.7 7M12.7 16.3L15.8 19.4C16.2 19.8 16.2 20.4 15.8 20.8 15.4 21.2 14.8 21.2 14.4 20.8L12 18.4 9.6 20.8C9.2 21.2 8.6 21.2 8.2 20.8 7.8 20.4 7.8 19.8 8.2 19.4L11.3 16.3C11.5 16.1 11.7 16 12 16 12.3 16 12.5 16.1 12.7 16.3Z"
              fill="currentColor" /></svg>
          <span> {sunrise || '--:--'}</span>
          <svg title="सूर्यास्त" viewBox="0 0 24 24" style="height:16px;width:16px"><path
              d="M3 12H7A5 5 0 0 1 12 7 5 5 0 0 1 17 12H21A1 1 0 0 1 22 13 1 1 0 0 1 21 14H3A1 1 0 0 1 2 13 1 1 0 0 1 3 12M15 12A3 3 0 0 0 12 9 3 3 0 0 0 9 12H15M12 2L14.4 5.4C13.7 5.2 12.8 5 12 5 11.2 5 10.4 5.2 9.6 5.4L12 2M3.3 7L7.5 6.7C6.9 7.2 6.4 7.8 5.9 8.5 5.5 9.2 5.3 10 5.1 10.8L3.3 7M20.7 7L18.9 10.8C18.7 10 18.5 9.2 18.1 8.5 17.6 7.8 17.1 7.2 16.5 6.6L20.7 7M12.7 20.7L15.8 17.6C16.2 17.2 16.2 16.6 15.8 16.2 15.4 15.8 14.8 15.8 14.4 16.2L12 18.6 9.6 16.2C9.2 15.8 8.6 15.8 8.2 16.2 7.8 16.6 7.8 17.2 8.2 17.6L11.3 20.7C11.5 20.9 11.7 21 12 21 12.3 21 12.5 20.9 12.7 20.7Z"
              fill="currentColor" /></svg><span> {sunset || '--:--'}</span>
        </div>
      </div>
      <hr class="border-light" />
      <div><span class="key">{$_('events')}: </span> <span>{events || $_('noEvents')}</span></div>
      <hr class="border-light" />
      <div><span class="key">{$_('sait')}: </span> <span>{saits || $_('noSait')}</span></div>
      <hr class="border-light" />
      <h3 class="mt-0">{$_('panchanga')}</h3>
      <div class="grow-div mb-2">
        <div class="panchang">
          <div><span class="key">{$_('day')}: </span><span>{dayNe}</span></div>
          <div><span class="key">{$_('nakshatra')}: </span><span>{panchanga.nakshatra}</span></div>
          <div><span class="key">{$_('tithi')}: </span><span>{panchanga.tithi_name}</span></div>
          <div><span class="key">{$_('karan')}: </span><span>{panchanga.karan}</span></div>
          <div><span class="key">{$_('yog')}: </span><span>{panchanga.yog}</span></div>
        </div>
      </div>
      <div class="accordion mt-2">
        <svg viewBox="0 0 24 24" style="height:20px;width:20px"><path
            d="M7.4 8.6L12 13.2 16.6 8.6 18 10 12 16 6 10 7.4 8.6Z"
            fill="currentColor" /></svg>
      </div>
      <Panchanga {panchanga} {yearNe} {monthNe} {dayNe} {dateNe} {ad} {monthNsNe} {yearNsNe} {birthnames} />
    </div>
  </div>
</div>
