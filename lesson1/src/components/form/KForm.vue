<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "KForm",
  componentName: "KForm",
  provide() {
    return {
      form: this,
    };
  },
  props: {
    model: {
      type: Object,
      required: true,
    },
    rules: Object,
  },
  created() {
    this.fields = [];
    this.$on("kkb.form.addField", (item) => {
      this.fields.push(item);
    });
  },
  methods: {
    validate(cb) {
      // 检查所有表单项目
      // 都要校验通过
      // 获得一个promsie数组
    //   const tasks = this.fields
    //     .filter((item) => item.prop) // 必须拥有prop属性
    //     .map((item) => item.validate());
    const tasks = this.fields.map(item => item.validate())
    //统一处理所有Promsie结果
      Promise.all(tasks)
        .then(() => {
          cb(true);
        })
        .catch(() => cb(false));
    },
  },
};
</script>

<style scoped></style>
