<template>
   <Tabbar>
   <Tabbaritem path="/home" isactivecolor="deepPink">
      <img slot="item-icon" src="~assets/img/tabbar/home.png" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/home_active.png" alt="">
      <div slot="item-text">首页</div>
   </Tabbaritem>
   <Tabbaritem path="/cart" isactivecolor='deepPink'>
     <img slot="item-icon" src="~assets/img/tabbar/cart.png" alt="">
     <img slot="item-icon-active" src="~assets/img/tabbar/cart_active.png" alt="">
      <div slot="item-text">购物车</div>
   </Tabbaritem>
   <Tabbaritem path="/category" isactivecolor='deepPink'>
     <img slot="item-icon" src="~assets/img/tabbar/category.png" alt="">
     <img slot="item-icon-active" src="~assets/img/tabbar/category_active.png" alt="">
      <div slot="item-text">查找</div>
   </Tabbaritem>
   <Tabbaritem path="/profile" isactivecolor='deepPink'>
     <img slot="item-icon" src="~assets/img/tabbar/profile.png" alt="">
     <img slot="item-icon-active" src="~assets/img/tabbar/profile_active.png" alt="">
      <div slot="item-text">主页</div>
   </Tabbaritem>
   </Tabbar>
</template>

<script>
import Tabbar from 'components/common/tabbar/Tabbar'
import Tabbaritem from 'components/common/tabbar/Tabbaritem'
export default {
  name: 'App',
  components:{
    Tabbar,
    Tabbaritem
  }
}
</script>

<style>
@import "../../../assets/css/base.css";

</style>
