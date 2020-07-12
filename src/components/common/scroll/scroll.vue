<template>
    <div class="wrappar" ref="wrapper">
        <div class="content">
            <slot>

            </slot>
        </div>
    </div>
</template>
          
<script>
import bscroll from 'better-scroll'

export default{
    name:'scroll',
    data(){
        return{
            scroll:null
        }
    },
    mounted(){
        this.scroll=new bscroll(this.$refs.wrapper,{
            click:true
        })
        this.scroll.scrollTo(0,0)
    },
    methods:{
          scrollTo(x,y,time=500){
            this.scroll.scrollTo(x,y,time)
        }
    }
}
</script>
          
<style scoped>
           
</style>