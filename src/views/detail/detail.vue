<template>
  <div id="detail">
  <detailnavbar class="nav"></detailnavbar>
  <scroll class="content" ref="scroll">
    <detail-swiper :topimg="topimg"></detail-swiper>
    <detail-base-info :baseInfo="baseInfo"></detail-base-info>
    <detail-shop-info :shop-info="shopInfo"></detail-shop-info>
    <detail-goods-info :goods-info="dataInfo" @imageLoadOk="imgok"></detail-goods-info>
    <detail-size :size-info="sizeInfo"></detail-size>
  </scroll>
  </div>

</template>

<script>
  import detailnavbar from "./children/detailnavbar";
  import detailSwiper from "./children/detailSwiper";
  import detailBaseInfo from "./children/detailBaseInfo";
  import detailShopInfo from "./children/DetailShopInfo";
  import detailGoodsInfo from "./children/DetailGoodsInfo";
  import DetailSize from "./children/DetailSize";

  import {getdetail,BaseInfo,ShopInfo,SizeInfo} from "network/detail";
  import scroll from "components/common/scroll/scroll";

  export default {
        name: "detail",
        data(){
            return{
              iid:null,
              topimg:[],
              baseInfo:{},
              shopInfo:{},
              dataInfo:{},
              sizeInfo:{}
            }
        },
        created() {
            this.iid = this.$route.params.iid

            getdetail(this.iid).then(res => {
              console.log(res);
              const data = res.result;
              this.topimg = res.result.itemInfo.topImages;
              //获取商品信息
              this.baseInfo = new BaseInfo(data.itemInfo,data.shopInfo.services,data.columns)
              // 4、保存店铺信息数据
              this.shopInfo = new ShopInfo(data.shopInfo);
              //保存商品详情数据
              this.dataInfo = data.detailInfo
              // 6、商品尺寸信息
              this.sizeInfo = new SizeInfo(data.itemParams.info,data.itemParams.rule);
            })


        },
        components:{
          detailnavbar,
          detailSwiper,
          detailBaseInfo,
          detailShopInfo,
          detailGoodsInfo,
          DetailSize,
          scroll
        },
        methods:{
          imgok(){
            this.$refs.scroll.fresh()
          }
        }
    }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: white;
    height: 100vh;
  }
  .content{
    height: calc(100% - 44px);
  }
  .nav{
    position: relative;
    z-index: 9;
    background-color: white;
  }
</style>
