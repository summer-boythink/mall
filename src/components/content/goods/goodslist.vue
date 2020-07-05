<template>
<div class="goods">
    <goodslistitem v-for="item in goods" :key="item" :goodsitem="item"></goodslistitem>
</div>
</template>
          
<script>
import goodslistitem from './goodslistitem'
export default{
    name:'goodlist',
    props:{
        goods:{
            type:Array,
            default(){
                return []
            }
        }
    },
    components:{
        goodslistitem
    }
}
</script>
          
<style scoped>
    .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }        
</style>