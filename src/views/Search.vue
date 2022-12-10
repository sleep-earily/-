<template>
    <div class="searchTop">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <input type="text" placeholder="陈奕迅"  v-model.trim="searchKey" @keydown.enter="enterKey">
        <br>
    </div>
        <div class="searchHistory">
            <span class="searchSpan">历史</span>
            <span v-for="item in keyWorldList" :key="item" class="spanKey" @click="searchHistory(item)">
                {{item}}</span>
            <svg class="icon" aria-hidden="true" @click="clearList">
                <use xlink:href="#icon-shanchu"></use>
            </svg>
        </div>
        <div class="itemList">
            <div class="item" v-for="(item, index) in searchList" :key="index">
                <div class="itemLeft" @click="updateIndex(item)">
                    <span class="leftSpan">{{index+1}}</span>
                    <div>
                        <p>{{item.name}}</p>
                        <span v-for="(ar, i) in item.ar" :key="i">
                        {{ar.name}}</span>
                    </div>
                </div>
                <div class="itemRight">
                    <svg class="icon" aria-hidden="true" v-if="item.mv !=0">
                        <use xlink:href="#icon-icon_shipinbofang"></use>
                    </svg>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-31liebiao"></use>
                    </svg>
                </div>
            </div>
        </div>
    
</template>
<script>
import {getSearchList} from '@/requests/api/home'
export default {
    data() {
        return {
            keyWorldList:[],
            searchKey:"",
            searchList:[],
        }
    },
    mounted(){
        this.keyWorldList = JSON.parse(localStorage.getItem("keyWorldList"))||[]
    }, 
    methods:{
        enterKey(){
            if(this.searchKey === ''){
                return
            }
            this.keyWorldList.unshift(this.searchKey)
            this.keyWorldList = [...new Set(this.keyWorldList)];
            localStorage.setItem("keyWorldList", JSON.stringify(this.keyWorldList))
            if(this.keyWorldList.length >=5){
                this.keyWorldList.pop()
            }
            this.getSearchListme(this.searchKey);
            
            this.searchKey = ""
        },
        clearList(){
            this.keyWorldList = [];
            localStorage.setItem("keyWorldList", "")
        },
        searchHistory(item){
            this.getSearchListme(item);
        },
        async getSearchListme(item){
            console.log('sssss');
            let res = await getSearchList(item);
            this.searchList = res.data.result.songs;
            // console.log(this.searchList);
        },
        updateIndex(item){
            this.$store.commit('pushPlayList', item);
            this.$store.commit('updatePlayListIndex', this.$store.state.playList.length-1)
        }
        
    },
    
    
}
</script>
<style lang="less" scoped>
    .searchTop{
        width: 100%;
        height: 1rem;
        padding: 10px;
        display: flex;
        align-items: center;
        input{
            margin-left: 20px;
            border: none;
            width: 95%;
            padding: 5px;
        }
    }
    .searchHistory{
        width: 100%;
        padding: 10px;
        .searchHistory{
            font-weight: 700;
        }
        .spanKey{
            background: rgb(158, 151, 151);
            padding: 5px, 10px;
            border-radius: 20px;
            margin: 0.1rem 10px;
            display: inline-block;
        }
        .icon{
            width: 23px;
            height: 23px;
            position: absolute;
            right: 10px;
        }
    }
    .itemList {
    width: 100%;
    padding: 10px;
    .item {
      width: 100%;
      height: 1.4rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .itemLeft {
        width: 85%;
        height: 100%;
        display: flex;
        align-items: center;
        .leftSpan {
          display: inline-block;
          width: 0.2rem;
          text-align: center;
        }
        div {
          p {
            width: 4.54rem;
            height: .4rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-weight: 700;
          }
          span{
            font-weight: 400;
            font-size: .24rem;
            color: #999;
          }
          margin-left: 0.3rem;
        }
      }
      .itemRight{
        width: 15%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        .icon{
          fill: #999;
        }
         .bofang{
            position: absolute;
            left: 0;
          }
         .liebiao{
            position: absolute;
            right: 0;
          }
      }
    }
  }
</style>