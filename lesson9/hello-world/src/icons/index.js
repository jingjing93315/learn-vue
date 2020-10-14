import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'

// require.context 提供上下文 context返回的函数是指定了上下文路径的
const req = require.context('./svg', false, /\.svg$/)
// keys返回文件名集合(数组)
req.keys().map(req);

Vue.component('svg-icon', SvgIcon)