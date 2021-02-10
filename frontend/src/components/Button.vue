<template>
  <div class="container">
    <button
      style="font-size: 1.4rem"
      class="w-75 m-4 pr-3 pl-3 btn btn-primary"
    >
      {{ text }}
    </button>
  </div>
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