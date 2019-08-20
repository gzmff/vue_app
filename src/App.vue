<template>
    <div id="app">
        <router-view></router-view>
        <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import FooterGuide from './components/FooterGuide/FooterGuide'
    export default{
        mounted(){
            this.getAddress()
            // this.getCategorys()
            // this.getShops()
            this.getUserInfo()
            // this.$store.dispatch('getCategorys')
            // this.$store.dispatch('getShops')
        },
        methods:{
            ...mapActions(['getAddress','getCategorys','getShops','getUserInfo'])
        },
        components:{
            FooterGuide
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>