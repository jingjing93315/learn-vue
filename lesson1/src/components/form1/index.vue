<template>
  <div>
    <h3>GForm表单</h3>
    <hr />
    <g-form :model="model" :rules="rules" ref="loginForm">
      <g-form-item label="用户名" prop="username">
        <g-input v-model="model.username"></g-input>
      </g-form-item>
      <g-form-item label="确认密码" prop="password">
        <g-input type="password" v-model="model.password"></g-input>
      </g-form-item>
      <g-form-item>
        <button @click="login()">登录</button>
      </g-form-item>
    </g-form>
  </div>
</template>

<script>
import GForm from "@/components/form1/GForm.vue";
import GInput from "@/components/form1/GInput.vue";
import GFormItem from "@/components/form1/GFormItem.vue";
export default {
  components: {
    GForm,
    GInput,
    GFormItem,
  },
  data() {
    return {
      model: { username: "tom", password: "" },
      rules: {
        username: [{ required: true, message: "请输入用户名" }],
        password: [{ required: true, message: "请输入密码" }],
      },
    };
  },
  methods: {
    login() {
      this.$refs.loginForm.validate((valid) => {
        // if(valid) {
        //     alert('请求登录！')
        // } else{
        //     alert('校验失败！')
        // }
        // create(Notice, {
        //   title: "一线蓝光",
        //   message: valid ? "请求登录" : "校验失败",
        //   duration: 5000,
        // }).show();
        this.$notice({
          title: "一线蓝光",
          message: valid ? "请求登录" : "校验失败",
          duration: 1000,
        }).show();
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
