import service from "..";
//获取首页轮播图
export function getBanner(){
    return service({
        method:'GET',
        url:'/banner?type=2'
    })
}
//获取好歌单
export function getMusicList(){
    return service({
        method:"GET",
        url:'/personalized?limit=10'
    })
}
//获取搜索
export function getSearchList(name){
    return service({
        method:"GET",
        url:`/cloudsearch?keywords=${name}`
    })
}
//手机登陆
export function getLoginstate(phone){
    console.log(phone);
    return service({
        method:"GET",
        // url:`/login?email=${phone.phone}&password=${phone.password}`,
        // url:`/login/cellphone?phone=${phone.phone}&md5_password=${phone.password}`,
        url:`/login/cellphone?phone=${phone.phone}&password=${phone.password}`
        // url:`/login/cellphone?phone=${phone.phone}&captcha=${phone.password}`
        // url:'/register/anonimous'//游客登录,
    })
}
//发送验证码
export function getLoginyzm(phone){
    return service({
        method:"GET",
        // url:`/login?email=${phone.phone}password=${phone.password}`,
        // url:`/login/cellphone?phone=${phone.phone}&md5_password=${phone.password}`,
        url:`/captcha/sent?phone=${phone.phone}`
        
    })
}

//获取用户详情
export function getLoginUser(id){
    return service({
        method:"GET",
        url:`/user/detail?uid=${id}`,
        
    })
}