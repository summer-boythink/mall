<template>
<div class="goods">
    <goodslistitem v-for="(item) in goods" :key="item.index" :goodsitem="item" :isDetailMsg='isDetailMsg'></goodslistitem>
</div>
</template>

<script>
import goodslistitem from './goodslistitem'
export default{
    name:'goodslist',
    props:{
        goods:{
            type:Array,
            default(){
                return []
            }
        },
        isDetailMsg: {
          type: Boolean,
          default: false
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
