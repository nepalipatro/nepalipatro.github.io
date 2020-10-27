<script>
</script>
<style>
  .skeleton {
    background-color: var(--secondary-color);
    height: 1em;
    width: 100%;
  }

  .placeholder {
    position: relative;
    max-width: 1280px;
    margin-right: auto;
    margin-left: auto;
  }

  .placeholder .header {
    display: flex;
    justify-content: space-between;
    margin-top: .8em;
  }
  .placeholder .title {
    height: 2em;
    width: 10em;
  }
  .placeholder .subtitle {
    width: 12em;
    height: 1.4em;
    margin-top: .25em;
  }
  .placeholder .menu-btn {
    height: 2em;
    width: 2em;
    border-radius: 50%;
  }
  .placeholder .year-month {
    font-size: 1.5em;
    display: flex;
    justify-content: flex-end;
    margin-top: .25em;
    margin-bottom: 0.8em;
  }
  .placeholder .year-month .skeleton {
    width: 4em;
    height: 1.7em;
    border-radius: 4px;
  }
  .year-month .skeleton:not(:first-child) {
    margin-left: 0.5em;
  }
  .placeholder .year-month .today {
    width: 3em;
  }

  .card {
    font-size: 10.5em;
    border-radius: 4px;
    display: grid;
  }
</style>

<div class="placeholder">
  <div class="header">
    <div>
      <div class="skeleton title"></div>
      <div class="skeleton subtitle"></div>
    </div>
    <div class="skeleton menu-btn"></div>
  </div>
  <div class="year-month">
    <div class="skeleton today"></div>
    <div class="skeleton"></div>
    <div class="skeleton"></div>
  </div>
  <div class="grid">
    {#each new Array(30) as _}
      <div class="skeleton card"></div>
    {/each}
  </div>
</div>
