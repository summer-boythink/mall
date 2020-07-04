<template>
<div id="home">
    <navbar class="home-nav"><div slot="center">购物</div></navbar>
    <home-swiper :banners="banners"></home-swiper>
    <recommendview :recommends="recommends"></recommendview>
    <pop></pop>
    <tabcontrol class="tab-con" :titles="titles"></tabcontrol>
<ul>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
</ul>  
</div>
</template>

<script>
import navbar from 'components/common/navbar/navbar'
import tabcontrol from 'components/content/tabcontrol/tabcontrol'                   

import HomeSwiper from './childs/HomeSwiper'
import recommendview from './childs/Recommendview'
import pop from './childs/pop'

import {gethomemultidata,gethomegoods} from 'network/home'

export default {
    name:"home",
    components:{
        navbar,
        HomeSwiper,
        recommendview,
        pop,
        tabcontrol

    },
    data(){
        return {
            banners:[],
            recommends:[],
            titles:["流行","新款","精选"],
            goods:{
                'pop':{page:0,list:[]},
                'new':{page:0,list:[]},
                'sell':{page:0,list:[]}
            }
        }
    },
    created(){
        this.gethomemultidata()
        this.gethomegoods('pop')
        this.gethomegoods('new')
        this.gethomegoods('sell')
    },
    methods:{
        gethomemultidata(){
            gethomemultidata().then(res => {
                console.log(res);
                this.banners = res.data.banner.list
                this.recommends = res.data.recommend.list
            })
        },
        gethomegoods(type){
            const page = this.goods[type].page+1
            gethomegoods(type,page).then(res => {
                this.goods[type].list.push(...res.data.list)
            })
            this.goods[type].page++
        }
    }
}
</script>

<style scoped>
    #home{
        padding-top: 44px;
    }
    .home-nav{
        background-color:pink;
        color:#ffffff;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 8;
        
    }
    .tab-con{
        position: sticky;
        top: 44px;
    }
</style>