<template>
<div class="tabcontrol">
    <div v-for="(item,index) in titles" :key="index" class="tab-item" :class="{active:index==currentindex}" @click="change(index)">
        <span>{{item}}</span>    
    </div> 
</div>
</template>
          
<script>
export default{
    name:'tabcontrol',
    props:{
        titles:{
          type:Array,
          default(){
                return []
            }  
        }
    },
    data(){
        return{
            currentindex:0
        }
    },
    methods:{
        change(index){
            this.currentindex=index
        }
    }
}
</script>
          
<style scoped>
    .tabcontrol{
        display: flex;
        text-align: center;
        font-size: 15px;
        height: 40px;
        line-height: 40px;
    }
    .tab-item{
        flex: 1;
    }
    .tab-item span{
        padding: 5px;
    }
    .active{
        color: pink;
    }
    .active span{
        border-bottom: 2px solid pink;
    }       
</style>