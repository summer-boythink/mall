<template>
<div class="goods-item">
<img :src="goodsitem.show.img" alt="" @load="imgok" @click="todetail">
<div class="context">
    <p>{{goodsitem.title}}</p>
    <span class="price">{{goodsitem.price}}</span>
    <span class="cafv">{{goodsitem.cfav}}</span>
</div>
</div>
</template>

<script>
export default{
    name:'goodslistitem',
    props:{
        goodsitem:{
            type:Object,
            default(){
                return {}
            }
        }
    },
  methods:{
      imgok(){
        this.$bus.$emit('imgload')
      },
      todetail(){
        this.$router.push('/detail/'+this.goodsitem.iid)
      }
  }
}
</script>

<style scoped>
   .goods-item {
    position: relative;
    padding-bottom: 40px;
    width: 40%;
  }
  .goods-item img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }
  .goods-item .context {
    position: absolute;
    bottom: 5px;
    left: 0px;
    right: 0px;
    font-size: 7px;
    text-align: center;
  }
  .context p {
    width: 100%;
    /* 文字超过点点隐藏 */
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .price {
    color: var(--color-tint);
    padding-right: 20px;
  }
  .cafv {
    position: relative;
  }
  .cafv::before {
    display: inline-block;
    content: ' ';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url(~assets/img/common/collect.svg) 0 0/14px 14px;
  }
</style>
