//直接更新state的多个方法的对象
import {
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USERINFO,
  RECEIVE_INFO,
  RECEIVE_GOODS,
  DECREMENT_FOOD_COUNT,
  INCREMENT_FOOD_COUNT,
  CLEAR_CART,
  RECEIVE_RATINGS
} from './mutations-types'
import Vue from 'vue'
export default {
  [RECEIVE_CATEGORYS](state,{categorys}){
    state.categorys = categorys
  },

  [RECEIVE_SHOPS](state,{shops}){
    state.shops = shops
  },

  [RECEIVE_USERINFO](state,{userinfo}){
    state.userinfo = userinfo
  },

  [RECEIVE_INFO](state,{info}){
    state.info = info
  },

  [RECEIVE_GOODS](state,{goods}){
    state.goods = goods
  },

  [DECREMENT_FOOD_COUNT](state,{food}){
    if(food.count){//只要有值才去减1
      food.count--
      if(food.count===0){
        //将food从cartFoods中移除
        state.cartFoods.splice(state.cartFoods.indexOf(food),1)
      }
    }
  },

  [INCREMENT_FOOD_COUNT](state,{food}){
    if(!food.count){//每一次增加
      Vue.set(food,'count',1)//让新增属性也有数据绑定
      state.cartFoods.push(food)
    }else{
      food.count++
    }
  },

  [CLEAR_CART](state){
    //清除food中的count
    state.cartFoods.forEach(food=>food.count = 0)
    //清除购物车中所有购物项
    state.cartFoods = []
  },

  [RECEIVE_RATINGS](state,{ratings}){
    state.ratings = ratings
  }

}

