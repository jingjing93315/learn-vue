<template>
  <div class="hello">
    <h1>{{msg}}</h1>
    <!-- <Communication></Communication> -->
    <!-- <SlotExample></SlotExample> -->
    <formExample></formExample>
  </div>
</template>

<script>
// import Communication from '@/components/communication'
import formExample from '@/components/form';
// import SlotExample from '@/components/slots'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    // Communication,
    // SlotExample,
    formExample
  }
}
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
