<script>
</script>
<style>
  :root {
    --skeleton-color: #ccc;
  }

  @font-face {
    font-family: 'skeleton';
    src: url('data:application/font-woff;charset=utf-8;base64,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')
      format('woff');
    font-weight: 100, 200, 300, 400, 500, 600, 700, 800, 900;
    font-style: normal, italic;
    font-display: block;
  }

  .skeleton-text {
    font-family: 'skeleton' !important;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .skeleton-text {
    color: var(--skeleton-color) !important;
    letter-spacing: -0.03em !important;
  }

  .skeleton-effect-blink {
    -webkit-mask-image: linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%);
    mask-image: linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%);
    -webkit-mask-size: 200% 100%;
    mask-size: 200% 100%;
    -webkit-mask-repeat: repeat;
    mask-repeat: repeat;
    -webkit-mask-position: 50% top;
    mask-position: 50% top;
    -webkit-animation: skeleton-effect-blink 1s infinite;
    animation: skeleton-effect-blink 1s infinite;
  }

  @keyframes skeleton-effect-fade {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.2;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes skeleton-effect-blink {
    0% {
      -webkit-mask-position: 50% top;
      mask-position: 50% top;
    }
    100% {
      -webkit-mask-position: -150% top;
      mask-position: -150% top;
    }
  }

  @keyframes skeleton-effect-pulse {
    0% {
      transform: scale(1);
    }
    40% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.975);
    }
    100% {
      transform: scale(1);
    }
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
  }
  .placeholder h1 {
    margin: 0;
    padding: 0;
  }
  .placeholder .year-month {
    font-size: 1.5em;
    display: flex;
    justify-content: flex-end;
  }

  .year-month span:not(:first-child) {
    margin-left: 0.5em;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(169px, 1fr));
    grid-gap: 1rem;
    margin-bottom: 1em;
    margin-top: 1em;
  }

  .card {
    font-size: 11em;
    border-radius: 4px;
    display: grid;
    line-height: 1;
  }
</style>

<div class="placeholder">
  <div class="header">
    <div>
      <h1 class="skeleton-text skeleton-effect-blink">***********</h1>
      <span class="skeleton-text skeleton-effect-blink">*********************</span>
    </div>
    <h2 class="skeleton-text skeleton-effect-blink menu-btn">**</h2>
  </div>
  <div class="year-month">
    <span class="skeleton-text skeleton-effect-blink">*****</span>
    <span class="skeleton-text skeleton-effect-blink">******</span>
    <span class="skeleton-text skeleton-effect-blink">******</span>
  </div>
  <div class="grid">
    {#each new Array(30) as _}
      <div class="skeleton-text skeleton-effect-blink card">***</div>
    {/each}
  </div>
</div>
