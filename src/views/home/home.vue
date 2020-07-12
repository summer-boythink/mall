<template>
<div id="home">
    <navbar class="home-nav"><div slot="center">购物</div></navbar>
            <scroll class="content" ref="scroll"
                    :probeType="3"
                    @scroll="contentscr"
                    :pull-up-load="true"
                    @pullingUp="loadmore">

                <home-swiper :banners="banners"></home-swiper>
                <recommendview :recommends="recommends"></recommendview>
                <pop></pop>
                <tabcontrol class="tab-con" :titles="titles" @tabclick='tabclick'></tabcontrol>
                <goodslist :goods="goods[this.currentindex].list"></goodslist>

            </scroll>
            <backtop @click.native="toback" v-show="isshowtop"></backtop>
</div>
</template>

<script>
import navbar from 'components/common/navbar/navbar'
import tabcontrol from 'components/content/tabcontrol/tabcontrol'
import goodslist from 'components/content/goods/goodslist'
import backtop from 'components/content/backtop/backtop'

import HomeSwiper from './childs/HomeSwiper'
import recommendview from './childs/Recommendview'
import pop from './childs/pop'

import {gethomemultidata,gethomegoods} from 'network/home'
import scroll from 'components/common/scroll/scroll'

export default {
    name:"home",
    components:{
        navbar,
        HomeSwiper,
        recommendview,
        pop,
        tabcontrol,
        goodslist,
        scroll,
        backtop

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
            },
            currentindex:"pop",
            isshowtop:false
        }
    },
    created(){
        this.gethomemultidata()
        this.gethomegoods('pop')
        this.gethomegoods('new')
        this.gethomegoods('sell')
    },
    methods:{
        contentscr(position){
            this.isshowtop = (-position.y)>500
        },
        //网络请求
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
            this.$refs.scroll.finishPullUp()
        },
        //事件监听
        tabclick(index){
            console.log(index);
            switch(index){
                case 0:
                    this.currentindex='pop'
                    break
                case 1:
                    this.currentindex="new"
                    break
                case 2:
                    this.currentindex='sell'
                    break
            }
        },
        toback(){
            this.$refs.scroll.scrollTo(0,0)
        },
      loadmore(){
            this.gethomegoods(this.currentindex)
      }
    }
}
</script>

<style scoped>
    #home{
        /* padding-top: 44px; */
        height: 100vh;
    }
    .home-nav{
        background-color:pink;
        color: #ffffff;
        position: fixed;
        width:100%;
        left: 0;
        right: 0;
        top: 0;
        z-index: 8;

    }
    .tab-con{
        position: sticky;
        top: 44px;
        background-color: #ffffff;
    }
    .content{

        height: calc(100% - 93px);
        overflow: hidden;
        margin-top:44px ;

    }
</style>
