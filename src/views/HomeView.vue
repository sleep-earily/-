<template>
  <div>

    <TopNav></TopNav>
    <SwiperTop></SwiperTop>
    <iconList></iconList>
    <musicList></musicList>
  </div>
</template>

<script>

import TopNav from '@/components/home/TopNav'
import SwiperTop from '@/components/home/SwiperTop'
import iconList from '@/components/home/iconList'
import musicList from '@/components/home/musicList'
export default {
  name: 'HomeView',
  components:{
    TopNav,
    SwiperTop,
    iconList,
    musicList
  }
}
</script>
