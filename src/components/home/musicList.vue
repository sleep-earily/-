<template lang="">
    <div class="musicList">
        <div class="musicTop">
            <div class="title">发现好歌单</div>
            <div class="more">查看更多</div>
        </div>
        <div class="musicContent">
            <van-swipe :loop="false" :width="150" class="my-swipe" :show-indicators="false">
                <van-swipe-item v-for="(item, index) in musicList" :key="index">
                    <router-link :to="{path:'/itemMusic',query:{id:item.id}}">
                    <img :src="item.picUrl" alt="歌单图片">
                    <span class="playCount">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-bofang"></use>
                        </svg>
                        {{changeCount(item.playCount)}}
                    </span>
                    <span class="name">{{item.name}}</span>
                </router-link>
                </van-swipe-item>

            </van-swipe>

        </div>
    </div>
</template>
<script>
import {getMusicList} from '@/requests/api/home'
export default {
    name:'musicList',
    data(){
        return {
            musicList:[],
        }
    },
    methods:{
        async getGnedan(){
            let res = await getMusicList();
            // console.log(res);
            this.musicList = res.data.result
        },
        changeCount(num){
            if(num>=1000000000){
                return (num/1000000000).toFixed(1)+'亿'
            }else if(num>=10000){
                return (num/10000).toFixed(1)+'万'
            }
        }
    },
    mounted(){
        this.getGnedan()
    },
    computed:{

    }
}
</script>
<style lang="less" scoped>
    .musicList{
        width: 100%;
        height: 5rem;
        padding: 10px;
        .musicTop{
            width:100%;
            height: .6rem;
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            .title{
                font-size: 20px;
                font-weight: 900;
            }
            .more{
                border: 1px solid #ccc;
                text-align: center;
                line-height: 30px;
                padding: 0 10px;
                border-radius: 20px;
            }
        }
        .musicContent{
            width: 100%;
            height: 3.6rem;
            .my-swipe{
                height: 100%;
                img{
                    width: 100%;
                    height: 140px;
                }
            }
        }
        .van-swipe-item {
      //   margin-right: 0.14rem;
      padding-right: 0.2rem;
      position: relative;
      height: 3.8rem;
      img {
        width: 100%;
        height: 2.4rem;
        border-radius: 0.2rem;
        //   position: absolute;
      }
      .playCount {
        position: absolute;
        z-index: 100;
        right: 0.3rem;
        color: white;
        margin-top: 0.06rem;
        .icon {
          width: 0.3rem;
          height: 0.3rem;
        }
      }
      .name {
        //   position: absolute;
        bottom: 0px;
        color: black;
      }
    }
    }
    a{
        color: black;
    }
</style>