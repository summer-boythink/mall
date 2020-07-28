<template>
  <div id="detail">
  <detailnavbar class="nav" @titleclick="titleclick" ref="nav"></detailnavbar>
  <scroll class="content" ref="scroll" @scroll="fontchange" :probeType="3">
    <detail-swiper :topimg="topimg"></detail-swiper>
    <detail-base-info :baseInfo="baseInfo"></detail-base-info>
    <detail-shop-info :shop-info="shopInfo"></detail-shop-info>
    <detail-goods-info :goods-info="dataInfo" @imageLoadOk="imgok"></detail-goods-info>
    <detail-size :size-info="sizeInfo" ref="param"></detail-size>
    <detail-comment-info :commemt-info="commemtInfo" ref="comment"></detail-comment-info>
    <goodslist :goods="goodsInfoList" :is-detail-msg='isDetailMsg' ref="shops"></goodslist>
  </scroll>
    <detailbottombar></detailbottombar>
  </div>

</template>

<script>
  import detailnavbar from "./children/detailnavbar";
  import detailSwiper from "./children/detailSwiper";
  import detailBaseInfo from "./children/detailBaseInfo";
  import detailShopInfo from "./children/DetailShopInfo";
  import detailGoodsInfo from "./children/DetailGoodsInfo";
  import DetailSize from "./children/DetailSize";
  import DetailCommentInfo from "./children/DetailCommentInfo";
  import goodslist from "../../components/content/goods/goodslist";

  import {getdetail,BaseInfo,ShopInfo,SizeInfo,getDetailsGoodsList} from "network/detail";
  import scroll from "components/common/scroll/scroll";
  import {debounce} from "../../common/utils";
  import {itemmix} from "../../common/mixin";
  import detailbottombar from "./children/detailbottombar";

  export default {
        name: "detail",
        data(){
            return{
              iid:null,
              topimg:[],
              baseInfo:{},
              shopInfo:{},
              dataInfo:{},
              sizeInfo:{},
              commemtInfo:{},
              goodsInfoList:[],
              isDetailMsg: true,  //因为我们推荐数据的组件是用同一个的，所以用来区分数据,
              topY:[],
              currentindex:0
            }
        },
        mixins:[itemmix],
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
              this.dataInfo = data.detailInfo;
              // 6、商品尺寸信息
              this.sizeInfo = new SizeInfo(data.itemParams.info,data.itemParams.rule);
              // 7、评论信息
              // 判断是否有评论，因为存在没有评论的情况
              if (data.rate.cRate !== 0) this.commemtInfo = data.rate;

              // 这个时候$el已成功挂载，但图片还未被全部加载
              // this.$nextTick(() => {
              //   this.topY = []
              //   this.topY.push(0);
              //   this.topY.push(this.$refs.param.$el.offsetTop);
              //   this.topY.push(this.$refs.comment.$el.offsetTop);
              //   this.topY.push(this.$refs.shops.$el.offsetTop);
              //   console.log(this.topY)
              // })
            })
            getDetailsGoodsList().then(res => {
              //  获取商品列表数据
              // console.log(res)
              this.goodsInfoList = res.data.list;
            })

        },
        components:{
          detailnavbar,
          detailSwiper,
          detailBaseInfo,
          detailShopInfo,
          detailGoodsInfo,
          DetailSize,
          DetailCommentInfo,
          scroll,
          goodslist,
          detailbottombar
        },
        methods:{
          imgok(){
            this.$refs.scroll.fresh()
            this.topY = []
            this.topY.push(0);
            this.topY.push(this.$refs.param.$el.offsetTop);
            this.topY.push(this.$refs.comment.$el.offsetTop);
            this.topY.push(this.$refs.shops.$el.offsetTop);
            console.log(this.topY)
          },
          titleclick(index){
            this.$refs.scroll.scrollTo(0,-this.topY[index],200)
          },
          fontchange(position){
            const posY = -position.y

            let length = this.topY.length
            for (let i = 0;i < length;i++){
              if((this.currentindex!==i)
                && (i<length-1 && posY>this.topY[i] && posY<=this.topY[i+1])
                ||(this.currentindex!==i)&&(i==length-1&&posY>=this.topY[i])){
                this.currentindex = i;
                this.$refs.nav.currentindex = this.currentindex
              }
            }
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
