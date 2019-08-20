export default {
  totalCount(state){
    return state.cardFoods.reduce((prev,food)=>{
      return prev + food.count
    },0)
  },
  totalPrice(state){
    return state.cardFoods.reduce((prev,food)=>{
      return prev + food.price*food.count
    },0)
  },
  positiveSize(state){
    return state.ratings.reduce((prev,rating)=>{
      return prev + (rating.rateType===0?1:0)
    },0)
  }
}