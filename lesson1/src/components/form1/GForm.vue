<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'GForm',
        componentName: 'GForm',
        provide(){
            return {
                form: this // 将组件作为提供者，子代组件可方便获取
            }
        },
        props: {
            model: {
                type: Object,
                required: true
            },
            rules: {type: Object}
        },
        created () {
            this.fields = []
            this.$on('kkb.form.addField', (item)=> {
                this.fields.push(item)
            })
        },
        methods: {
            validate(cb) {
                const tasks = this.$children
                    .filter(item => item.prop)
                    .map(item => item.validate())
                Promise.all(tasks)
                .then(()=> cb(true))
                .catch(()=> cb(false))

            }
        }
    }
</script>

<style lang="scss" scoped>

</style>