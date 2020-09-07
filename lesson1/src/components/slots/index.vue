<template>
    <div>
        <h2>插槽</h2>
        <Layout>
            <template v-slot:header>好好学习，天天向上呐</template>
            <template>
                content....
            </template>
            <template v-slot:footer="{fc}">{{fc}}</template>
        </Layout>
    </div>
</template>

<script>
import Layout from '@/components/slots/Layout.vue'
export default {
    components: {
        Layout
    }
}
</script>

<style>

</style>