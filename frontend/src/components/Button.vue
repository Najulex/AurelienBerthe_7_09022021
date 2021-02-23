<template>
  <button class="w-75 m-4 p-2 btn shadow index-btn">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    text: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
.index-btn {
  font-size: 1.5rem;
} 
</style>