<template>
  <div class="footer">
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

<style>
.footer {
  margin-top: 3rem;
}
</style>