<template>
  <div class="hello">
    <h1 @click="showNotice">{{ msg }}</h1>
    <Recursion></Recursion>
  </div>
</template>

<script>
import Recursion from "@/components/recursion";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  components: {
    Recursion,
  },
  methods: {
    showNotice() {
      this.$notice({
        title: "一线蓝光哦",
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
