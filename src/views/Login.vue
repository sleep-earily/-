<template lang="">
<div class="login">
    <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-zuojiantou"></use>
    </svg>
    <div class="loginTop">欢迎登录</div>
    <div class="loginContent">
      <input
        type="text"
        name="phone"
        class="phone"
        v-model="phone"
        placeholder="请输入手机号码"
      />
      <input
        type="password"
        name="passworld"
        class="passworld"
        v-model.lazy="password"
        placeholder="请输入密码"
      />
      <button class="btn" @click="Login">登录</button>
      <button @click="getyam">验证码</button>
    </div>
  </div>
</template>
<script>
    export default {
        data() {
            return {
                phone:'',
                password:'',
            }
        },
        methods: {
            Login(){
                let res = this.$store.dispatch('getLogin', {phone:this.phone, password:this.password})
                console.log(res);
                if(res.date.code === '200'){
                    this.$store.commit('updateisLogin', true);
                    this.$storre.commit('updatetoken', res.data.token)
                    this.$router.push('/infoUser')

                }else{
                    alert('手机或秘法错误')
                    this.password=''
                }
            },
            getyam(){
                this.$store.dispatch('getyzm', {phone:this.phone})
            }
        },
    }
</script>
<style lang="less">
.login {
  width: 100%;
  height: 13.34rem;
  padding: 0.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(248, 97, 97);
  .loginTop {
    margin-top: 1rem;
    font-size: 1rem;
    color: #fff;
  }
  .loginContent {
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    margin-top: 2rem;
    .phone,
    .passworld {
      width: 5rem;
      height: 1rem;
      border: 0.02rem solid #999;
    }
    .btn{
        width: 2rem;
        height: .6rem;
    }
  }
}
</style>