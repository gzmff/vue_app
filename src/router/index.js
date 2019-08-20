import Vue from 'vue'
import VueRouter from 'vue-router'

// import Msite from '../pages/Msite/Msite'
// import Search from '../pages/Search/Search'
// import Order from '../pages/Order/Order'
// import Profile from '../pages/Profile/Profile'
const Msite = () => import('../pages/Msite/Msite')
const Search = () => import('../pages/Search/Search')
const Order = () => import('../pages/Order/Order')
const Profile = () => import('../pages/Profile/Profile')
import Login from '../pages/Login/Login'
import Shop from '../pages/shop/shop'
import ShopGoods from '../pages/shop/shopFoods/shopGoods'
import ShopInfo from '../pages/shop/shopInfo/shopInfo'
import ShopRatings from '../pages/shop/shopRatings/shopRatings'

Vue.use(VueRouter)

export default new VueRouter({
    routes:[
        {
            path:'/',
            redirect:'/msite'
        },
        {
            path:'/msite',
            component:Msite,
			meta:{
				showFooter:true
			}
        },
        {
            path:'/search',
            component:Search,
			meta:{
				showFooter:true
			}
        },
        {
            path:'/order',
            component:Order,
			meta:{
				showFooter:true
			}
        },
        {
            path:'/profile',
            component:Profile,
			meta:{
				showFooter:true
			}
        },
        {
            path:'/login',
            component:Login,
        },
        {
            path:'/shop',
            component:Shop,
            children:[
                {
                    path:'/login/goods',
                    component:ShopGoods,
                },
                {
                    path:'/login/info',
                    component:ShopInfo,
                },
                {
                    path:'/login/ratings',
                    component:ShopRatings,
                },
                {
                    path:'',
                    redirect:'/login/goods'
                },
            ] 
        },
    ]
})