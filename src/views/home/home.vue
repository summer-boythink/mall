<template>
<div id="home">
    <navbar class="home-nav"><div slot="center">购物</div></navbar>
  <tabcontrol :titles="titles" @tabclick='tabclick' v-show="isswiperfix" class="isfix" ref="tabcontrol1"></tabcontrol>
            <scroll class="content" ref="scroll"
                    :probeType="3"
                    @scroll="contentscr"
                    :pull-up-load="true"
                    @pullingUp="loadmore"
            >

                <home-swiper :banners="banners" @swiperimgload = "swiperok"></home-swiper>
                <recommendview :recommends="recommends"></recommendview>
                <pop></pop>
                <tabcontrol :titles="titles" @tabclick='tabclick' ref="tabcontrol2"></tabcontrol>
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
import {debounce} from 'common/utils'

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
            isshowtop:false,
            taboffset:0,
            isswiperfix:false,
            saveY:0
        }
    },
    activated() {
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.fresh()
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getscroll()
    },
  created(){
          this.gethomemultidata()
          this.gethomegoods('pop')
          this.gethomegoods('new')
          this.gethomegoods('sell')
      },
    mounted() {
          const refresh = debounce(this.$refs.scroll.fresh,200)
          this.$bus.$on('imgload',() =>{
          // this.$refs.scroll&&this.$refs.scroll.fresh()
          // console.log('aaaa')
            refresh()
        })

    },
  methods:{
        contentscr(position){
            this.isshowtop = (-position.y)>500
            // console.log(-position.y)
            this.isswiperfix = (-position.y)>=this.taboffset
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
            this.$refs.scroll&&this.$refs.scroll.finishPullUps()
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
            this.$refs.tabcontrol1.currentindex = index;
          this.$refs.tabcontrol2.currentindex = index;
        },
        toback(){
            this.$refs.scroll.scrollTo(0,0)
        },
        loadmore(){
            this.gethomegoods(this.currentindex)
      },
        swiperok(){
          this.taboffset = this.$refs.tabcontrol2.$el.offsetTop
        }
    }
}
</script>

<style scoped>
    #home{
        /* padding-top: 44px; */
        height: 100vh;
      position: relative;
    }
    .home-nav{
        background-color:pink;
        color: #ffffff;
        /*width:100%;*/
        /*position: fixed;*/
        /*left: 0;*/
        /*right: 0;*/
        /*top: 0;*/
        /*z-index: 8;*/

    }
    /*.tab-con{*/
    /*    position: sticky;*/
    /*    top: 44px;*/
    /*    background-color: #ffffff;*/
    /*}*/
    .content{

        height: calc(100% - 93px);
        overflow: hidden;
        position: absolute;
        top: 44px;
        left: 0;
        right: 0;

        /*margin-top:44px ;*/
    }
    .isfix{
        position: relative;
        z-index: 99;
      background-color:white;
    }
</style>
