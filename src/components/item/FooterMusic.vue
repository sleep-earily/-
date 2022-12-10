<template lang="">
    <div class="FooterMusic">
        <div class="footLeft" @click="updateDetailShow">
            <img :src="playList[playListIndex].al.picUrl" alt="歌曲图片" srcset="">
            <div>
                <!-- <p>{{playList[playListIndex].al}}</p> -->
                <p>{{playList[playListIndex].name}}</p>
                <p>横滑切换上下首</p>
            </div>

        </div>
        <div class="footRight">
            <svg class="icon" aria-hidden="true"  v-show="isbtnShow"  @click="play">
                <use xlink:href="#icon-bofang"></use>
            </svg>
            <svg class="icon" aria-hidden="true" v-show="!isbtnShow"  @click="play">
                <use xlink:href="#icon-weibiaoti--"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-31liebiao"></use>
            </svg> 
        </div>
        <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}`" @timeupdate="updateTime"></audio>
        <van-popup v-model:show="detailsShow" position="right" :style="{ height: '100%', width:'100%' }" >
            <MusicDetail :musicList="playList[playListIndex]" :play="play" :isbtnShow="isbtnShow" :addDuration="addDuration" :updateCurrentMusicTime="updateCurrentMusicTime"></MusicDetail>
        </van-popup>

    </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
import MusicDetail from '@/components/item/MusicDetail'
export default {
    name:'FooterMusic',
    data() {
        return {
            interVal:0,
        }
    },
    computed:{
        ...mapState(['playList', 'playListIndex', 'isbtnShow', 'detailsShow'])
    },
    mounted(){
        console.log(this.$refs);
        // this.updateTime();//播放就调用函数更新播放时间
    },
    // updated(){
    //     this.$store.dispatch('getLyric', this.playList[this.playListIndex].id)
    // },
    methods:{
        play:function(){//修改音乐是否播放
            if(this.$refs.audio.paused){
                this.$refs.audio.play();
                this.updateIsbtnShow(false);
                // this.updateTime()//播放就调用函数更新播放时间
            }else{
                this.$refs.audio.pause();
                this.updateIsbtnShow(true);
                clearInterval(this.interVal)//暂停后清除定时器
            }
        },
        ...mapMutations(['updateIsbtnShow', 'updateDetailShow', 'updateCurrentTime', 'updateDuration']),
        updateTime(){
            this.interVal = setInterval(()=>{
                this.updateCurrentTime(this.$refs.audio.currentTime)
            }, 1000)
        },
        addDuration(){
            this.updateDuration(this.$refs.audio.duration);
        },
        updateCurrentMusicTime(value){
            this.$refs.audio.currentTime = value;
        },
    },
    watch:{
        playListIndex(){
            //如果下标发生更改，自动播放音乐
            this.updateIsbtnShow(false)
            this.$refs.audio.autoplay = true;

            if(!this.$refs.audio.pause){
                this.updateIsbtnShow(false);
            }
            this.$store.dispatch('getLyric', this.playList[this.playListIndex].id)
            this.addDuration()
        },
        playList(){
            if(this.isbtnShow){
                this.$refs.audio.autoplay = true;
                this.updateIsbtnShow(false);
            }
            this.$store.dispatch('getLyric', this.playList[this.playListIndex].id)
        }
    }
}
</script>
<style lang="less" scoped>
    .FooterMusic{
        width: 100%;
        height: 1.4rem;
        background: white;
        position: fixed;
        bottom: 0;
        border-top: 1px solid #999;
        display: flex;
        padding: 10px;
        justify-content: space-between;
        .footLeft{
            width: 60%;
            height: 100%;
            display: flex;
            justify-content: space-around;
            align-content: center;
            img{
                width: 1rem;
                height: 50px;
                border-radius: 50%;
            }
            
        }
        .footRight{
                width:20%;
                height: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .icon{
                    width: 30px;
                    height: 30px;
                }
            }
    }
</style>