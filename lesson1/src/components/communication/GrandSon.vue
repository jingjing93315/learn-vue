<template>
  <div @click="$emit('some-event', 'msg from grandSon')">
    <h3>grandson</h3>
    <p>{{ msg }}</p>
    <!-- inject -->
    <p>{{ name }}</p>
  </div>
</template>

<script>
export default {
  inject: {
      name: {
          from: 'foo'
      }
  },
  props: {
    msg: {
      type: String,
      default: "",
    },
  },
};
</script>

<style></style>
