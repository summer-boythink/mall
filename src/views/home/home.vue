<template>
<div id="home">
    <navbar class="home-nav"><div slot="center">购物</div></navbar>
    <home-swiper :banners="banners"></home-swiper>
    <recommendview :recommends="recommends"></recommendview>
</div>
</template>

<script>
import navbar from 'components/common/navbar/navbar'
import HomeSwiper from './childs/HomeSwiper'
import recommendview from './childs/Recommendview'

import {gethomemultidata} from 'network/home'

export default {
    name:"home",
    components:{
        navbar,
        HomeSwiper,
        recommendview
    },
    data(){
        return {
            banners:[],
            recommends:[]
        }
    },
    created(){
        gethomemultidata().then(res => {
            console.log(res);
            this.banners = res.data.banner.list
            this.recommends = res.data.recommend.list
        })
    }
}
</script>

<style scoped>
    .home-nav{
        background-color:pink;
        color:#ffffff
    }
</style>