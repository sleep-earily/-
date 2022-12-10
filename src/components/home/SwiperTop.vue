<template lang="">
    <div id="swipeTop">
        <van-swipe :autoplay="3000" lazy-render>
            <van-swipe-item v-for="image in state.images" :key="image">
                <img :src="image.pic" />
            </van-swipe-item>
        </van-swipe>

    </div>
</template>
<script>
import axios from 'axios'
import {reactive, onMounted } from 'vue';
import {getBanner} from '@/requests/api/home'
export default {
    name:'SwiperTop',
    setup() {
        const state = reactive({
            images:[
            'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
            'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
        ]});
        onMounted(async ()=>{
            // axios.get('http://localhost:3000/banner?type=2')
            //     .then(response=>{
            //         console.log(response.data.banners);
            //         state.images= response.data.banners;
            //     },
            //     error=>{                 
            //     })
            let res = await getBanner();
            // console.log(res);
            state.images = res.data.banners;
        },)
        return { state };
    },
    
}
</script>
<style lang="less">
#swipeTop{
    .van-swipe{
        width: 100%;
        padding:10px;
        .van-swipe-item{
            img{
                width: 100%;
                height: 4rem;
            }
        }
    }
    .van-swipe__indicator--active {
        background: rgb(219, 130, 130);
    }
}

    
</style>