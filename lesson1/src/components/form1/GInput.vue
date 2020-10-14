<template>
    <div>
        <input :value="value" @input="onInput" v-bind="$attrs">
    </div>
</template>

<script>
import emitter from '@/mixins/emitter.js'
    export default {
        inheritAttrs: false,
        props: {
            value: {
                type: String,
                default: ''
            },
        },
        mixins: [emitter],
        methods: {
            onInput(e){
                this.$emit('input', e.target.value)
                // this.$parent.$emit('validate')
                this.dispatch('GFormItem', 'validate')
            }
        }
        
    }
</script>

<style lang="scss" scoped>

</style>