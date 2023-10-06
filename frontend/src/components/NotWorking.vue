<script>
export default {
  props: {
    message: String,
  },
};
</script>

<template>
  <div class="d-flex justify-content-center align-items-center border border-danger m-3 rounded-2 flex-column text-center">
    <img src="src/assets/image/fofa.png" alt="" height="300">
    <h2>{{ message }}</h2>
  </div>
</template>

<style></style>
