//通过mutation间接更新state的多个方法的对象
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
import {
  reqCategorys,
  reqShops,
  reqUserInfo,
  reqInfo,
  reqGoods,
  reqRating
} from '../api/index'

export default {
  //异步获取分类
  async getCategorys({commit},callback){
    //发送异步ajax请求
    const result = await reqCategorys()//括号内可传参
    //提交一个mutation
    if(result.code === 0){
      const categorys = result.data
      commit(RECEIVE_CATEGORYS,{categorys})
      callback && callback()
    }
  },

  async getShops({commit}){
    const result = await reqShops()
    if(result.code === 0){
      const shops = result.data
      commit(RECEIVE_SHOPS,{shops})
    }
  },

  async getUserInfo({commit}){
    const result = await reqUserInfo()
    if(result.code === 0){
      const userinfo = result.data
      commit(RECEIVE_USERINFO,{userinfo})
    }
  },

  async getInfo({commit}){
    const result = await reqInfo()
    if(result.code === 0){
      const info =result.data
      commit(RECEIVE_INFO,{info})
    }
  },

  async getGoods({commit},callback){
    const result = await reqGoods()
    if(result.code === 0){
      const goods = result.data
      commit(RECEIVE_GOODS,{goods})

      //数据更新了，通知一下组件
      callback && callback()
    }
  },

  //同步更新food中的cart数量
  updateFoodCount({commit},{isAdd,food}) {
    if(isAdd){
      commit(INCREMENT_FOOD_COUNT,{food})
    }else{
      commit(DECREMENT_FOOD_COUNT,{food})
    }
  },

  //同步清理购物车
  clearCart({commit}){
    commit(CLEAR_CART)
  },

  //获取评论内容
  async getRating({commit},callback){
    const result = await reqRating()
    if(result.code === 0){
      const ratings = result.data
      commit(RECEIVE_RATINGS,{ratings})
      callback && callback()
    }
  }
}
