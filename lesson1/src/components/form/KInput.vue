<template>
  <div>
      <!-- 自定义组件的双绑 value, @input -->
      <input :type="type" :value="value" @input="onInput" v-bind="$attrs">
  </div>
</template>

<script>
import emitter from '@/mixins/emitter.js'
export default {
    // 取消继承
    inheritAttrs: false,
    props: {
        type: {
            type: String,
            default: 'text'
        },
        value: {
            type: String,
            default: ''
        }
    },
    mixins: [emitter],
    methods: {
        onInput(e) {
            this.$emit('input', e.target.value)
            // 触发校验
            // this.$parent.$emit('validate')   
            this.dispatch('KFormItem', 'validate') 
        }
    }

}
</script>

<style>

</style>