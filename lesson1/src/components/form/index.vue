<template>
  <div>
    <!-- KForm -->
    <KForm :model="model" :rules="rules" ref="loginForm">
      <KFormItem label="用户名" prop="username">
        <KInput v-model="model.username" placeholder="请输入账户"></KInput>
      </KFormItem>
      <KFormItem label="密码" prop="password">
        <KInput
          v-model="model.password"
          placeholder="请输入密码"
          type="password"
        ></KInput>
      </KFormItem>
      <KFormItem>
        <button @click="login">登录</button>
      </KFormItem>
    </KForm>
  </div>
</template>

<script>
import KForm from "@/components/form/KForm.vue";
import KInput from "@/components/form/KInput.vue";
import KFormItem from "@/components/form/KFormItem.vue";
import Notice from "@/components/Notice.vue";
import create from "@/utils/create";

export default {
  components: {
    KForm,
    KInput,
    KFormItem,
  },
  data() {
    return {
      model: {
        username: "tom",
        password: "",
      },
      rules: {
        username: [{ required: true, message: "请输入用户名" }],
        password: [{ required: true, message: "请输入密码" }],
      },
    };
  },
  methods: {
    login() {
      this.$refs.loginForm.validate((isValid) => {
        create(Notice, {
          title: "一线蓝光",
          message: isValid ? `请求登录` : `校验失败`,
        }).show();
        // if(isValid) {
        //     console.log('提交登录');
        // } else{
        //     alert('登录失败')
        // }
      });
    },
  },
};
</script>

<style></style>
