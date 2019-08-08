import Mock from 'mockjs'
import data from './data'

Mock.mock('/info',{code:0,data:data.info})
Mock.mock('/goods',{code:0,data:data.goods})
Mock.mock('/ratings',{code:0,data:data.ratings})
Mock.mock('/categorys',{code:0,data:data.categorys})
Mock.mock('/shops',{code:0,data:data.shops})
Mock.mock('/userinfo',{code:0,data:data.userinfo})
// Mock.mock('/login_pwd',{code:0,data:data.user})
