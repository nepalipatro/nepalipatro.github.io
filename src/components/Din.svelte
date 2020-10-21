<script>
  import { _ } from '../i18n'
  import DinDetails from './DinDetails.svelte'

  export let day
  export let tithi
  export let events
  export let panchanga
  export let dateAd
  export let isToday
  export let eventParts
  export let date
  export let isHoliday
  export let firstTithi
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

  let modalStateRef

  window.onpopstate = function (e) {
    if (modalStateRef.checked) {
      modalStateRef.checked = false
      e.preventDefault()
    }
  }

  function toggleModal() {
    modalStateRef.checked = !modalStateRef.checked
  }
</script>

<style>
  .card {
    background-color: var(--secondary-bg-color);
    transition: background-color 500ms ease;
    padding: 1rem;
    display: grid;
    place-items: center;
    position: relative;
    box-shadow: var(--card-box-shadow);
    border-radius: 4px;
  }
  .date::after {
    content: attr(data-day);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 4.5em;
    -webkit-font-smoothing: antialiased;
    color: var(--color);
    opacity: var(--day-opacity);
    text-transform: uppercase;
  }
  .date * {
    z-index: 1;
  }
  .date:hover,
  .date:active {
    background-color: var(--hover-bg-color) !important;
    cursor: pointer;
  }
  .event {
    width: 100%;
    align-items: start;
    text-align: center;
    line-height: 1.4;
  }
  .date h2 {
    font-size: 3.5em;
    color: var(--header-color);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .date .tithi-date {
    display: flex;
    width: 100%;
    align-items: flex-end;
    justify-content: space-between;
    line-height: 1.2;
  }
  .date .tithi {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: start;
  }
  .date-es {
    font-size: 1.5em;
  }
  .date .event,
  .date .tithi-date {
    color: var(--secondary-color);
    min-height: 68.5px;
  }
  .date.holiday {
    transition: background-color 500ms ease;
    background-color: var(--holiday-bg-color);
  }
  .date.holiday::after,
  .date.holiday .event,
  .date.holiday h2,
  .date.holiday .tithi-date {
    color: var(--holiday-color) !important;
  }
  .holiday::after,
  .today::after {
    opacity: 0.12;
  }
  .date.today {
    transition: background-color 500ms ease;
    background-color: var(--today-bg-color);
  }
  .date.today::after,
  .date.today .event,
  .date.today h2,
  .date.today .tithi-date {
    color: var(--today-color);
  }
</style>

<div on:click={toggleModal} class={`card date ${!isToday && isHoliday ? 'holiday' : isToday ? 'today' : ''}`} data-day={day}>
  <p class="event">{eventParts[0]}<small>{eventParts.length > 1 ? ` (${eventParts[1]}` : ''}</small></p>
  <h2>{date}</h2>
  <div class="tithi-date">
    <div class="tithi"><small>{firstTithi ? chandrama : ''}</small> <span>{tithi}</span></div>
    <span class="date-es">{dateAd}</span>
  </div>
</div>

<input bind:this={modalStateRef} class="modal-state" id={`modal${date}`} type="checkbox" />
<DinDetails
  {tithi}
  {events}
  {panchanga}
  {date}
  {chandrama}
  {chandramaPrefix}
  {yearNe}
  {monthNe}
  {dayNe}
  {dateNe}
  {inDays}
  {saits}
  {sunrise}
  {sunset}
  {ad}
  {monthNs}
  {yearNs}
  {monthNsNe}
  {yearNsNe}
  {birthnames} />
