<template>
  <div class="m-4">
    {{ copyright }}
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Footer",
  computed: {
    ...mapGetters(["copyright"]),
  },
};
</script>