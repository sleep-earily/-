import service from "..";
//获取歌单详情页数据
export function getMusicItemList(id){
    return service({
        method:'GET',
        url:`/playlist/detail?id=${id}`
    })
}
//获取歌单歌曲
export function getItemListDetail(id){
    return service({
        method:'GET',
        url:`/playlist/track/all?id=${id}&limit=20&offset=0`
    })
}

//获取歌词
export function getMUsicLyric(id){
    return service({
        method:'GET',
        url:`/lyric?id=${id}`
    })
}