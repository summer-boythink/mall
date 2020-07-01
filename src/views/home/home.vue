<template>
<div id="home">
    <navbar class="home-nav"><div slot="center">购物</div></navbar>
</div>
</template>

<script>
import navbar from 'components/common/navbar/navbar'
import {gethomemultidata} from 'network/home'
export default {
    name:"home",
    components:{
        navbar
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
        color:#fff
    }
</style>