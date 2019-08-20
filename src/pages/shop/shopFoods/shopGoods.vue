<template>
    <div>
        <div class="goods">
            <div class="menu-wrapper">
                <ul>
                    <li class="menu-item" v-for="(good,index) in goods" :key="index" 
												:class="{current:currentIndex===index}" @click="changeMenuItem(index)">
                        <span class="text bottom-border-1px">
                            <img v-show="good.icon" :src="good.icon" alt="" class="icon">
                            {{good.name}}        
                        </span>
                    </li>
                </ul>
            </div>
            <div class="foods-wrapper">
                <ul ref="foodUl">
                    <li class="food-list-hook" v-for="(good,index) in goods" :key="index">
                        <h1 class="title">{{good.name}}</h1>
                        <ul>
                            <li class="food-item bottom-border-1px" 
															v-for="(food,index) in good.foods" :key="index" @click="showFoodContent(food)">
                                <div class="icon">
                                    <img width="57" height="57" :src="food.icon" alt="" >
                                </div>
                                <div class="content">
                                    <h2 class="name">{{food.name}}</h2>
                                    <p class="desc">{{food.description}}</p>
                                    <div class="extra">
                                        <span class="count">月售{{food.sellCount}}份</span>
                                        <span>好评率{{food.rating}}%</span>
                                    </div>
                                    <div class="price">
                                        <span class="now">￥{{food.price}}</span>
                                    </div>
                                    <div class="cartcontrol-wrapper">
                                        <CartControl :food="food"></CartControl>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <ShopCart></ShopCart>
        </div>
				<FoodContent :food="food" ref="foodcontent"></FoodContent>
    </div>
</template>

<script>
		import BScroll from 'better-scroll'
		import {mapState} from 'vuex'
		import CartControl from '../../../components/CartControl/CartControl'
		import ShopCart from '../../../components/ShopCart/ShopCart'
		import FoodContent from '../../../components/FoodContent/FoodContent'
    export default{
			data(){
			return {
					scrollY:0,//右侧y轴滑动坐标
					tops:[],//包含右侧所有分类小列表的top值
					food:{}
			}
		},
		components:{
			CartControl,
			ShopCart,
			FoodContent
		},
		methods:{
			_initScroll(){
				new BScroll('.menu-wrapper',{
					click:true
				})
				this.foodsScroll =  new BScroll('.foods-wrapper',{//click事件由Bscroll分发
					probeType:2,	//手指滑动（惯性滑动和编码滑动不监视）
					click:true
				})
				//监视滑动过程
				this.foodsScroll.on('scroll',({x,y})=>{
					// console.log(y)
					this.scrollY = Math.abs(y)
				})
				//监视滑动结束
				this.foodsScroll.on('scrollEnd',({x,y})=>{
					// console.log(y)
					this.scrollY = Math.abs(y)
				})
			},
			_initTops(){
				const tops = []
				let top = 0
				//计算各个top，并保存到tops
				tops.push(top)
				//得到ul下所有的子li
				const lis = this.$refs.foodUl.children//.getElementsByClassName('food-list-hook')
				Array.prototype.slice.call(lis).forEach((li,index) => {
					top += li.clientHeight
					tops.push(top)
				})
				//保存tops
				this.tops = tops
			},
			changeMenuItem(index){
				//得到滚动目标函数
					const top = this.tops[index]
				//跟新目标scrollY值
					this.scrollY = top
				//平滑滚动到制动位置
				this.foodsScroll.scrollTo(0,-top,300)
			},
			//显示点击的foodcontent
			showFoodContent(food){
				this.food = food
				// 显示foodcontent（父组件调用子组件的方法）
				this.$refs.foodcontent.toggleShow()
			}
		},
        computed:{
						...mapState(['goods']),
						currentIndex(){
							//得到条件数据
							const {scrollY,tops} = this
							//根据条件计算出一个结果
							const index = tops.findIndex((top,index)=>{
								return scrollY>=top && scrollY<tops[index+1]
							})
							//返回结果
							return index
						}
        },
        mounted(){
            this.$store.dispatch('getShopGoods',()=>{
							this.$nextTick(()=>{//列表数据显示后执行
								this._initScroll()//初始化滚动
								this._initTops()//初始化tops
							})
            })
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../../common/stylus/mixins"
		.goods
			display flex
			position absolute
			top 195px
			bottom 46px
			width 100%
			background #fff
			overflow hidden
			.menu-wrapper
				width 88px
				flex 0 0 80px
				background #f3f5f7
				.menu-item
					display table
					height 54px
					width 56px
					padding 0 12px
					line-height 14px
					&.current
						position relative
						z-index 10
						margin-top -0.0625rem
						background #FFFFFF
						color :$green
						font-weight 700
						.test
							border-none()
					.text
						display table-cell
						vertical-align middle
						width 56px
						bottom-border-1px(rgba(7,17,27,0.1))
						font-size 12px
						.icon
							display inline-block
							vertical-align top
							width 12px
							height 12px
							background-size 12px 12px
							background-repeat no-repeat
			.foods-wrapper
				flex 1
				.title
					padding-left 14px
					height 26px
					line-height 26px
					border-left 2px solid #d9dde1
					color rgb(147,153,159)
					background #F3F5F7
				.food-item
					display flex
					margin 18px
					padding-bottom 18px
					bottom-border-1px(rgba(7,17,27,0.1))
					&:last-child
						border-none()
						margin-bottom 0
					.icon
						flex 0 0 57px
						margin-right 10px
					.content
						flex 1
						.name
							margin 2px 0 8px 0
							height 14px
							line-height 14px
							font-size 10px
							color rgb(7,17,27)
						.desc,.extra
							line-height 10px
							font-size 10px
							color rgb(147,153,159)
						.desc
							line-height 12px
							margin-bottom 8px
						.price
							font-weight 700
							line-height 24px
							.now
								margin-right 14px
								font-size 14px
								color rgb(147,153,159)
						.cartcontrol-wrapper
							position absolute
							right 0
							bottom 12px
</style>