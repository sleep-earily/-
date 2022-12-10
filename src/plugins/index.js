//对引用的组件进行集中管理

import { Swipe, SwipeItem, Button, Popup } from 'vant';
//把需要引用的组件放入数组

let plugins=[
    Swipe, SwipeItem, Button, Popup
]

export default function getVant(app){
    plugins.forEach(item=>{
        app.use(item)
    })
}