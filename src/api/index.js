// 包含n个接口请求函数的模块
import ajax from './ajax'
// const BASE_URL = "http://localhost:4000"
const BASE_URL ='/api'
// export const reqInfo =()=>ajax(BASE_URL + '/info')
// export const reqInfo =()=>ajax(`${BASE_URL}/position/${geohash}`)

//获取店铺内容
export const reqInfo = () => ajax('/info')

//获取店铺内容
export const reqGoods = () => ajax('/goods')

//获取食品分类列表
export const reqCategorys = () => ajax('/categorys')

//根据关键字搜索商铺列表
export const reqSearchShop = (keyword) => ajax(BASE_URL + '/search_shops',{keyword})

//获取店铺列表
export const reqShops = () =>ajax('/shops')

//用户名密码登录
export const reqPwdLogin = ({name,pwd}) => ajax( '/login_pwd',{name,pwd},'POST')

//发送短信验证码
export const reqSendCode = (phone) => ajax(BASE_URL + '/sendcoe',{phone})

//手机号码验证登录
export const reqSmsLogin = ({phone,code}) => ajax(BASE_URL + '/login_sms',{phone,code},'POST')

//根据会话获取用户信息
export const reqUserInfo = () =>ajax('/userinfo')

//用户登出
export const reqLogout = () =>ajax(BASE_URL + '/logout')

//获取评论信息
export const reqRating = () =>ajax('/ratings')


