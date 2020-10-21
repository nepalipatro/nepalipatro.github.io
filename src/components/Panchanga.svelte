<script>
  import { _ } from '../i18n'

  export let panchanga
  export let yearNe
  export let monthNe
  export let dayNe
  export let dateNe
  export let ad
  export let monthNsNe
  export let yearNsNe
  export let birthnames
</script>

<style>
  .mb-8 {
    margin-bottom: 2rem !important;
  }
  .panel {
    padding: 0 18px;
    display: none;
    overflow: hidden;
    background-color: var(--bg-color);
  }
  .row.border [class*='col'] {
    border: 1px solid #666;
  }
  .col-2 {
    flex: 0 0 16.666667%;
    max-width: 16.666667%;
  }
  .col-4 {
    flex: 0 0 33.333333%;
    max-width: 33.333333%;
  }
  .col-6 {
    flex: 0 0 50%;
    max-width: 50%;
  }
  .col-8 {
    flex: 0 0 66.666667%;
    max-width: 66.666667%;
  }
  .mx-2 {
    margin-right: 0.5rem !important;
  }

  .p-1 {
    padding: 0.25rem !important;
  }

  .py-1 {
    padding-top: 0.25rem !important;
  }
</style>

<div class="panel mb-8">
  <div class="panchanga-details text-center mb-8">
    <div class="row border panchanga mx-2">
      <div class="py-1 col-6"><b>वि.सं.</b><br />{monthNe} {dateNe}, {yearNe}</div>
      <div class="py-1 col-6">
        <b>ई.सं.</b><br />{new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }).format(new Date(ad))}
      </div>
    </div>
    <div class="row border panchanga mx-2">
      <div class="py-1 col-6"><b>शक संवत्</b><br />{panchanga.saksambat}</div>
      <div class="py-1 col-6"><b>नेपाल संवत्</b><br />{yearNsNe} {monthNsNe}</div>
    </div>
    <div class="row border panchanga mx-2">
      <div class="py-1 col-4">{panchanga.sambatsar}</div>
      <div class="py-1 col-4">{panchanga.ayen}</div>
      <div class="py-1 col-4">{panchanga.ritu}</div>
    </div>
    <div class="row border panchanga mx-2">
      <div class="py-1 col-6">{dayNe}</div>
      <div class="py-1 col-6">{panchanga.chandramasa}</div>
    </div>
    <div class="row border panchanga mx-2">
      <div class="py-1 col-4"><b>तिथि</b></div>
      <div class="py-1 col-8">{panchanga.tithi_name}</div>
    </div>
    <div class="row border panchanga mx-2">
      <div class="py-1 col-4"><b>नक्षत्र</b></div>
      <div class="py-1 col-8">{panchanga.nakshatra}</div>
    </div>
    <div class="row border panchanga mx-2">
      <div class="py-1 col-4"><b>योग</b></div>
      <div class="py-1 col-8">{panchanga.yog}</div>
    </div>
    <div class="row border panchanga mx-2">
      <div class="py-1 col-4"><b>करण</b></div>
      <div class="py-1 col-8">{panchanga.karan}</div>
    </div>
    <div class="row border panchanga mx-2">
      <div class="py-1 col-6"><b>चन्द्रराशि</b><br />{panchanga.chandrarashi}</div>
      <div class="py-1 col-6"><b>आनन्दादि योग</b><br />{panchanga.anandiyog}</div>
    </div>
    <div class="row border panchanga mx-2">
      <div class="py-1 col-4"><b>दिनमान</b><br />{panchanga.dinman}</div>
      <div class="py-1 col-4"><b>सूर्योदय</b><br />{panchanga.sunrise}</div>
      <div class="py-1 col-4"><b>सूर्यास्त</b><br />{panchanga.sunset}</div>
    </div>
    <div class="row border panchanga mx-2">
      <div class="py-1 col-2 break-word"><b>राशिनाम</b></div>
      {#each birthnames as { nakshatra }}
        <div class="p-1 col break-word">{nakshatra}</div>
      {/each}
    </div>
    <div class="row border panchanga mx-2">
      <div class="py-1 col-2 break-word"><b>बजेसम्म</b></div>
      {#each birthnames as { dt }}
        <div class="p-1 col break-word">{dt}</div>
      {/each}
    </div>
    <div class="row border panchanga mx-2">
      <div class="py-1 col">{panchanga.parba}</div>
    </div>
    <div class="row border panchanga mx-2">
      <div class="py-1 col"><b>सूर्योदयकालीन स्पस्ट ग्रहहरू</b></div>
    </div>
    <div class="row border panchanga mx-2">
      <div class="py-1 col-6"><b>सूर्य</b><br />{panchanga.surya}</div>
      <div class="py-1 col-6"><b>चन्द्र</b><br />{panchanga.chandra}</div>
    </div>
    <div class="row border panchanga mx-2">
      <div class="py-1 col-6"><b>मंगल</b><br />{panchanga.mangal}</div>
      <div class="py-1 col-6"><b>बुध</b><br />{panchanga.budha}</div>
    </div>
    <div class="row border panchanga mx-2">
      <div class="py-1 col-6"><b>बृहस्पति</b><br />{panchanga.brihaspati}</div>
      <div class="py-1 col-6"><b>शुक्र</b><br />{panchanga.sukra}</div>
    </div>
    <div class="row border panchanga mx-2">
      <div class="py-1 col-6"><b>शनि</b><br />{panchanga.sani}</div>
      <div class="py-1 col-6"><b>राहु </b><br />{panchanga.rahu}</div>
    </div>
    <div class="row border panchanga mx-2">
      <div class="py-1 col-6"><b>क्रान्ति</b><br />{panchanga.kranti}</div>
      <div class="py-1 col-6"><b>वेलान्तर </b><br />{panchanga.belantar}</div>
    </div>
  </div>
</div>
