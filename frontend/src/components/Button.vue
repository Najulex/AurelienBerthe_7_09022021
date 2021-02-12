<template>
  <button style="font-size: 1.6rem" class="w-75 m-4 p-2 btn btn-primary shadow">
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