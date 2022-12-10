<template lang="">
    <div>
        <!-- <p>歌单详情</p> -->
        <itemMusicTop :playlist="state.playlist"></itemMusicTop>
        <itemMusicList :itemList="state.itemList" :subscribedCount="state.playlist.subscribedCount"></itemMusicList>
    </div>
</template>
<script>
import { useRoute } from 'vue-router';
import { onMounted, reactive } from 'vue';
import {getMusicItemList, getItemListDetail} from '@/requests/api/item'
import itemMusicTop from '@/components/item/itemMusicTop'
import itemMusicList from '@/components/item/itemMusicList'
export default {
    name:'ItemMusic',
    setup(){
        const state = reactive({
            playlist:{},
            itemList:[]
        })
        onMounted(async()=>{
            // let id = useRoute().query.id
            const {query:{id}} = useRoute()
            // 获取歌单详情
            let res = await getMusicItemList(id);
            // console.log(res);
            state.playlist = res.data.playlist
            // 获取歌单歌曲

            let result = await getItemListDetail(id);
            // console.log(result.data.songs);
            state.itemList = result.data.songs;
            //防止页面刷新后数据丢失，保存数据session
            sessionStorage.setItem('itemDetail', JSON.stringify(state))
        })
        return {state}
    },
    components:{
        itemMusicTop,
        itemMusicList
    }
}
</script>
<style lang="">
    
</style>