<template>
    <div>
        <shopHead></shopHead>
        <div class="tab">
            <div class="tab-item">
                <router-link to="/login/goods" replace>点餐</router-link><!--以replace模式实现路由跳转-->
            </div>
            <div class="tab-item">
                <router-link to="/login/ratings" replace>评价</router-link>
            </div>
            <div class="tab-item">
                <router-link to="/login/info" replace>商家</router-link>
            </div>
        </div>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
    import shopHead from '../../components/shopHead/shopHead'
    export default{
        mounted(){
            this.$store.dispatch('getShopRatings')
            this.$store.dispatch('getShopInfo')
        },
        components:{
            shopHead
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixins"
    .tab
        height 40px
        line-height 40px
        background #FFFFFF
        bottom-border-1px(rgba(7,17,27,0.1))
        .tab-item
            float left
            width:33.3333%
            text-align center
            font-size 14px
            color rgb(77,85,93)
            a
                display block
                position relative
                &.router-link-active
                    color #02A774
                    &::after
                        content ''
                        position absolute
                        left 50%
                        bottom 1px
                        width 35px
                        height 2px
                        transform translateX(-50%)
                        background #02A774
				
</style>