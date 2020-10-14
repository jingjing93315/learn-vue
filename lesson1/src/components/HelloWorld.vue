<template>
  <div class="hello">
    <h1>{{oneprop}}</h1>
    <!-- <Communication></Communication> -->
    <!-- <SlotExample></SlotExample> -->
    <formExample></formExample>
    <!-- <input type="text" v-model="inputMsg"> -->
    <!-- <div class="share-btn" @click="confirm">确定</div> -->
     <!-- <div class="share-btn" @click="changeMsg">改变msg值</div> -->
  </div>
</template>

<script>
// import Communication from '@/components/communication'
import formExample from '@/components/form1';
// import SlotExample from '@/components/slots'

// model选项用来避免冲突
export default {
  name: 'HelloWorld',
  // props: {
  //   value: {
  //     tyoe: Boolean,
  //     default: false
  //   }
  //   show: {
  //     type: Boolean,
  //     default: false
  //   }
  // },
  props: {            
    oneprop: {                
        type: String,                
        default: 'hello world'
    }        
},        
  data (){
    return {
      inputMsg: ''
    }
  },
  created () {
    console.log(this.oneprop);
  },
  components: {
    // Communication,
    // SlotExample,
    formExample
  },
  methods: {
    // confirm (){
      // 双向数据绑定父组件:value对应的值
      // 通过$emit触发父组件的input事件，第二个参数是传递给父组件的值
      // @input="msg=$event.target.value"
      // 触发父组件的input事件，将传递的值false赋值给msg
      // this.$emit('input', false)
      // this.$emit('changed', false)
    // },
    // changeMsg (){
    //   this.$emit('update:msg', 'hello,一线蓝光')     
    // }
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
