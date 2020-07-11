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
    }
}
</script>
          
<style scoped>
           
</style>