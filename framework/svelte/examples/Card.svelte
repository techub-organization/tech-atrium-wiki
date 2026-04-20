<script lang="ts">
  export let title = "Techrium Card";
  export let description = "Reusable UI block for article and comparison pages.";
</script>

<article class="card">
  <h2>{title}</h2>
  <p>{description}</p>
</article>

<style>
  .card {
    border: 1px solid #d4d4d8;
    border-radius: 12px;
    padding: 1rem;
  }
</style>
