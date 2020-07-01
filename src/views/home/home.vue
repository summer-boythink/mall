<template>
<div id="home">
    <navbar class="home-nav"><div slot="center">购物</div></navbar>
    <swiper>
        <swiper-item v-for="item in banners" :key ="item">
            <a :href="item.link">
                <img :src="item.image" alt="">
            </a>
        </swiper-item>
    </swiper>
</div>
</template>

<script>
import navbar from 'components/common/navbar/navbar'
import {gethomemultidata} from 'network/home'
import {Swiper,SwiperItem} from 'components/common/swiper/index'
export default {
    name:"home",
    components:{
        navbar,
        Swiper,
        SwiperItem
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