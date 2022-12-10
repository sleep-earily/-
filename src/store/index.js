import { createStore } from 'vuex'
import {getMUsicLyric} from '@/requests/api/item'
import {getLoginstate, getLoginyzm} from '@/requests/api/home'
export default createStore({
  state: {
    playList:[{
      al:{//为播放列表添加默认值
        id: 121630728,
        name: "星辰大海",
        pic: 109951167277470400,
        picUrl: "https://p1.music.126.net/0mRcGJSq93o83Q32i7EuIw==/109951167277470394.jpg",
        pic_str: "109951167277470394"
      },
      ar:[{
        name:'黄霄雲'
      }],
      name: "星辰大海",
      id:1811921555
    }],
    playListIndex:0,
    isbtnShow:true,//暂停按钮的显示
    detailsShow:false,
    lyricList:{
    
    },//歌词
    currentTime:0,
    duration:0,//歌曲时长
    isLogin:false,//是否登陆
    isFooterMusic:false,
    token:'',
  },
  getters: {
  },
  mutations: {
    updateIsbtnShow(state, value){
      state.isbtnShow = value;
    },
    updatePlayList(state, value){
      state.playList = value
    },
    pushPlayList(state, value){
      state.playList.push(value)
    },
    updatePlayListIndex(state, value){
      state.playListIndex = value
    },
    updateDetailShow(state){
      state.detailsShow = !state.detailsShow;
    },
    updatelyricList(state, value){
      state.lyricList = value;
    },
    updateCurrentTime(state, value){
      // console.log(state.currentTime);
      state.currentTime = value;
    },
    updateDuration(state, value){
      state.duration = value
    },
    updateisFooterMusic(state, value){
      // console.log(value);
      state.isFooterMusic = value
    },
    updateisLogin(state, value){
      state.isLogin = value
    },
    updatetoken(state, value){
      state.token = value
      localStorage.setItem('token', value)
    },
  },
  actions: {
    async getLyric(context, value){
      let res = await getMUsicLyric(value)
      // console.log(res);
      context.commit("updatelyricList", res.data.lrc)
    },
    async getLogin(context, value){
      let res = await getLoginstate(value)
      console.log(res);
    },
    async getyzm(context, value){
      let res = await getLoginyzm(value);
      console.log('获取验证码');
    }
  },
  
  modules: {
  }
})
