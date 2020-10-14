<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <slot></slot>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import Schema from 'async-validator'
import emitter from '@/mixins/emitter.js'
export default {
  name: 'GFormItem',
  componentName: 'GFormItem',
  inject: ["form"],
  props: {
    label: {
      // 输入项标签
      type: String,
      default: "",
    },
    prop: {
      // 字段名
      type: String,
      default: "",
    },
  },
  mixins: [emitter],
  data() {
    return {
      error: "",
    };
  },
  mounted() {
    //监听校验事件
    this.$on("validate", () => {
      this.validate();
    });


    // 派发事件，通知GForm新增一个GFormItem实例
    if(this.prop) {
      this.dispatch('GForm', 'kkb.form.addField', [this])
    }
  },
  methods: {
    validate() {
      // 获取对应FormItem校验规则and值
      console.log(this.form.rules[this.prop]);
      console.log(this.form.model[this.prop]);
      const rules = this.form.rules[this.prop]
      const value = this.form.model[this.prop]
      const descriptor = { [this.prop]: rules }
      const schema = new Schema(descriptor)
      // 返回Promise，没有触发catch就说明校验通过
      return schema.validate({[this.prop]: value}, errors => {
          if(errors) {
              this.error = errors[0].message
          } else {
              this.error = ''
          }
      })

    },
  },
};
</script>

<style lang="sass" scoped></style>
