<template>
<div id="home">
    <navbar class="home-nav"><div slot="center">购物</div></navbar>
    <home-swiper :banners="banners"></home-swiper>
    <recommendview :recommends="recommends"></recommendview>
    <pop></pop>
    <tabcontrol class="tab-con" :titles="titles" @tabclick='tabclick'></tabcontrol>
    <goodslist :goods="goods[this.currentindex].list"></goodslist>
    <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        <li>8</li>
        <li>9</li>
        <li>10</li>
        <li>11</li>
        <li>12</li>
        <li>13</li>
        <li>14</li>
        <li>15</li>
        <li>16</li>
        <li>17</li>
        <li>18</li>
        <li>19</li>
        <li>20</li>
    </ul> 
</div>
</template>

<script>
import navbar from 'components/common/navbar/navbar'
import tabcontrol from 'components/content/tabcontrol/tabcontrol'
import goodslist from 'components/content/goods/goodslist'                   

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
        tabcontrol,
        goodslist

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
            currentindex:"pop"
        }
    },
    created(){
        this.gethomemultidata()
        this.gethomegoods('pop')
        this.gethomegoods('new')
        this.gethomegoods('sell')
    },
    methods:{

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
        width:100%;
        left: 0;
        right: 0;
        top: 0;
        z-index: 8;
        
    }
    .tab-con{
        position: sticky;
        top: 44px;
        background-color: white;
    }
</style>