<template>
<div class="tabbar-item" @click="btn">
  <div v-if="!isactive"><slot name="item-icon"></slot></div>
  <div v-else><slot name="item-icon-active"></slot></div>
  <div :style="activestyle"><slot name="item-text"></slot></div>
</div>
</template>

<script>
export default {
    name:"Tabbar",
    // data(){
    //   return{
    //     // isactive:true
    //   }
    // },
    
    props:{
      path:{
        String
      },
      isactivecolor:{
        type:String,
        default(){
          return "red"
        }
      }
    },
    computed:{
      isactive(){
        return this.$route.path.indexOf(this.path) !== -1
      },
      activestyle(){
        return this.isactive?{color:this.isactivecolor}:{}
      }
    },
    methods:{
      btn(){
        this.$router.push(this.path)
      }
    }
}
</script>

<style scoped>
.tabbar-item{
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.tabbar-item img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
}
</style>