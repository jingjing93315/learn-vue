<template>
  <div>
    <h2>组件通信</h2>
    <!-- props, 自定义事件 -->
    <Child1 msg="some msg from parent" @some-event="onSomeEvent"></Child1>
    <Child2 msg="some msg from hahhahha" @some-event="onSomeEvent"></Child2>
    
  </div>
</template>

<script>
import Child1 from "@/components/communication/Child1.vue";
import Child2 from "@/components/communication/Child2.vue";
export default {
    provide () {
        return {
            foo: '一线蓝光'
        }
    },
  components: {
    Child1,
    Child2,
  },
  methods: {
      onSomeEvent(msg) {
          console.log('Communication', msg);
      }
  },
};
</script>
<style></style>
