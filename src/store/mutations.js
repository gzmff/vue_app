import Vue from 'vue'
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

export default{
    [RECEIVE_ADDRESS](state,{address}){
        state.address = address
    },
    [RECEIVE_CATEGORYS](state,{categorys}){
        state.categorys = categorys
    },
    [RECEIVE_SHOPS](state,{shops}){
        state.shops = shops
    },
    [RECEIVE_USERINFO](state,{userinfo}){
        state.userinfo = userinfo
    },
    [RESET_USERINFO](state){
        state.userinfo = {}
    },
    [RECEIVE_GOODS](state,{goods}){
        state.goods = goods
    },
    [RECEIVE_INFO](state,{info}){
        state.info = info
    },
    [RECEIVE_RATINGS](state,{ratings}){
        state.ratings = ratings
    },
	[INCREMENT_FOOD_COUNT](state,{food}){
	    if(!food.count){
			//新添加的属性没有数据劫持==>数据绑定==>跟新了数据但界面不变
			Vue.set(food,'count',1)//给有数据绑定的对象添加指定属性名和值的属性（有绑定）
            state.cardFoods.push(food)
        }else{
			food.count++
		}
	},
	[DECREMENT_FOOD_COUNT](state,{food}){
	    if(food.count){
            food.count--
            if(food.count ===0){
                state.cardFoods.splice(state.cardFoods.indexOf(food,1))
            }
	    }
    },
    [CLEAR_CART](state){
        //将所有food的count重置为0
        state.shopCart.forEach(food => {
            food.count = 0
        })
        //将购物车重置为空数组
        state.cardFoods = []
    },
    [SEARCH_SHOPS](state,{searchshops}){
        state.searchshops = searchshops
    },
}