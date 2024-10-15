<script setup lang="ts">
const props = defineProps({
  src: {
    type: String,
    required: true
  },
  tip: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <img class="icon" :src="props.src" :title="props.tip" />
</template>

<style>
.icon {
  display: inline;
  width: 1.3rem;
  height: 1.3rem;
  transform: translateY(0.3rem);
  cursor: default;
}
</style>
