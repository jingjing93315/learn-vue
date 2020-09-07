<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <slot></slot>
    <!-- 错误信息 -->
    <p class="error" v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import Schema from "async-validator";
import emitter from "@/mixins/emitter";
// 思考是属性还是状态
export default {
  name: "KFormItem",
  componentName: "KFormItem",
  inject: ["form"],
  props: {
    label: {
      type: String,
      default: "",
    },
    prop: String,
  },
  mixins: [emitter],
  data() {
    return {
      error: "",
    };
  },
  mounted() {
    this.$on("validate", () => {
      this.validate();
    });

    // 派发事件，通知KForm新增一个KFormItem实例
    if (this.prop) {
      this.dispatch("KForm", "kkb.form.addField", [this]);
    }
  },
  methods: {
    validate() {
      // 校验规则
      // 当前的值
      const rules = this.form.rules[this.prop];
      const value = this.form.model[this.prop];

      // 创建一个校验器的实例

      // 计算属性[this.prop]值做对象的key
      const schema = new Schema({ [this.prop]: rules });
      // 校验 //返回一个Promise
      return schema.validate({ [this.prop]: value }, (errors) => {
        if (errors) {
          this.error = errors[0].message;
        } else {
          this.error = "";
        }
      });
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
}
</style>
