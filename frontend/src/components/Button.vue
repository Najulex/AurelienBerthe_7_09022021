<template>
  <button>{{ text }}</button>
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

<style lang="scss">
button {
  border: none;
  box-shadow: 1px 1px 2px gray;
  cursor: pointer;
  font-size: 1.2rem;
  width: 65%;
  height: 40px;
  margin: 0.4rem;
  border-radius: 1.1rem;
  &:focus {
    text-decoration: underline;
    font-weight: bold;
  }
}
.login-btn {
  background-color: rgb(68, 151, 230);
  color: white;
}
.signup-btn {
  background-color: #fff;
  columns: rgb(22, 85, 145);
}
</style>
