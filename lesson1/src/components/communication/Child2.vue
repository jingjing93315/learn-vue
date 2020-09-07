<template>
  <div>
      <h3>child2</h3>
      <!-- $attrs -->
      <p>{{$attrs.msg}}</p>
      <!-- 隔代传参 -->
      <!-- 使用v-bind会展开$attrs 透传 -->
      <GrandSon v-bind="$attrs" v-on="$listeners"></GrandSon>
      <button @click="sendToChild1">给child1发送消息</button>
  </div>
</template>

<script>
import GrandSon from '@/components/communication/GrandSon.vue'
export default {
    components: {
        GrandSon
    },
    methods: {
        sendToChild1(){
            // 利用事件总线发送事件
            this.$bus.$emit('event-from-child2', 'some message from child2')
        }
    }

}
</script>

<style>

</style>