<template>
  <navbar>
    <div slot="left" class="left" @click="back"><img src="~assets/img/common/back.svg"></div>
    <div slot="center" class="navbar">
      <div v-for="(item,index) in title" class="navbar-item"
           :class="{active:currentindex == index}"
           @click="changeindex(index)">{{item}}</div>
    </div>
  </navbar>
</template>

<script>
  import navbar from "components/common/navbar/navbar"

    export default {
      name: "detailnavbar",
      components:{
          navbar
      },
      data(){
        return{
          title:['商品','参数','评论','推荐'],
          currentindex:0
        }
      },
      methods:{
        changeindex(index){
          this.currentindex = index
          this.$emit('titleclick',index)
        },
        back(){
          this.$router.back()
        }
      }
    }
</script>

<style scoped>
  .navbar{
    display: flex;
  }
  .navbar-item{
    flex: 1;
    font-size: 12px;
  }
  .active{
    color: red;
  }
  .left{
    padding-top: 5px;
  }
</style>
