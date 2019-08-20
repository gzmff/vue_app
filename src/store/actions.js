import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS,
    RECEIVE_USERINFO,
    RESET_USERINFO,
    RECEIVE_GOODS,
    RECEIVE_INFO,
    RECEIVE_RATINGS,
	INCREMENT_FOOD_COUNT,
    DECREMENT_FOOD_COUNT,
    CLEAR_CART,
    SEARCH_SHOPS
} from './mutation-types'
import {
        reqAddress,
        reqFoodCategorys,
        reqShops,
        reqUserInfo,
        reqLogout,
        reqShopGoods,
        reqShopInfo,
        reqSearchShop,
        reqShopRatings,
    } from '../api'

export default {
    //异步获取地址
    async getAddress({commit,state}){
        const geohash = state.latitude+','+state.longitude
        const result = await reqAddress(geohash)
        if(result.code===0){
            const address = result.data 
            commit(RECEIVE_ADDRESS,{address})
        }
    },
    //异步获取分类列表
    async getCategorys({commit}){
        const result = await reqFoodCategorys()
        if(result.code===0){
            const categorys = result.data 
            commit(RECEIVE_CATEGORYS,{categorys})
        }
    },
    //异步获取商家列表
    async getShops({commit,state}){
        const {longitude,latitude} = state
        const result = await reqShops({latitude,longitude})
        if(result.code===0){
            const shops = result.data 
            commit(RECEIVE_SHOPS,{shops})
        }
    },
    //同步保存用户信息
    recordUser({commit},userinfo){
        commit(RECEIVE_USERINFO,{userinfo})
    },
    //异步记录用户信息
    async getUserInfo({commit}){
        const result = await reqUserInfo()
        if(result.code === 0){
            const userinfo = result.data
            commit(RECEIVE_USERINFO,{userinfo})
        } 
    },
    //登出
    async Logout({commit}){
        const result = await reqLogout()
        if(result.code === 0){
            const userinfo = result.data
            commit(RESET_USERINFO)
        } 
    },
    //异步获取商品列表
    async getShopGoods({commit},callback){
        const result = await reqShopGoods()
        if(result.code===0){
            const goods = result.data 
            commit(RECEIVE_GOODS,{goods})
            //数据跟新了，通知以下组件
            callback && callback() 
        }
    },
    //异步获取商家信息
    async getShopRatings({commit},callback){
        const result = await reqShopRatings()
        if(result.code===0){
            const ratings = result.data 
            commit(RECEIVE_RATINGS,{ratings})
             //数据跟新了，通知以下组件
             callback && callback() 
        }
    },
    //异步获取商家评论列表
    async getShopInfo({commit}){
        const result = await reqShopInfo()
        if(result.code===0){
            const info = result.data 
            commit(RECEIVE_INFO,{info})
        }
    },
	//同步更新food的count
	updateFoodCount({commit},{food,isAdd}){
		if(isAdd){//增加
			commit(INCREMENT_FOOD_COUNT,{food})
		}else{
			commit(DECREMENT_FOOD_COUNT,{food})
		}
    },
    //同步清空购物车
    clearCart({commit}){
        commit(CLEAR_CART)
    },
    //异步获取商铺列表
    async searchShops({commit,state},keyword){
        const geohash = state.latitude+','+state.longitude
        const result = await reqSearchShop(geohash,keyword)
        if(result.code===0){
            const searchshops = result.data 
            commit(SEARCH_SHOPS,{searchshops})
        }
    },
}