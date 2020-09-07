<template>
    <div>
        <div class="header">
            <slot name="header"></slot>
        </div>
        <div class="body">
            <slot></slot>
        </div>
        <div class="footer">
            <slot name="footer" :fc="footerContent"></slot>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            remark: [
                '一线蓝光',
                '想成为一个学识渊博的人',
                '一心只想学习技术，成为大神的技术小白',
                '我对这个世界一无所知',
                '王小波',
                '战争与和平',
                '列夫托尔斯泰',
            ]
        }
    },
    computed: {
        footerContent () {
            return this.remark[new Date().getDay() - 1]
        }
    }

}
</script>

<style>

</style>