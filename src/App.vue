<script setup lang="ts">
  import BaseInput from './components/commons/BaseInput.vue';
  import BaseButton from './components/commons/BaseButton.vue';
</script>

<template>
  <form>
    <BaseInput label="Firstname" type="text" id="firstname-input"/>
    <BaseButton type="submit">Press button</BaseButton>
  </form>

</template>

<style scoped></style>
