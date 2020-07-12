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
    props:{
        probeType:{
            type:Number,
            default:0
        },
        pullUpLoad:{
            type:Boolean,
            default:false
        }
    },
    mounted(){
        this.scroll=new bscroll(this.$refs.wrapper,{
            click:true,
            probeType:this.probeType,
            pullUpLoad:this.pullUpLoad
        })
        // this.scroll.scrollTo(0,0)
        //监听位置
        this.scroll.on('scroll',(position) => {
            // console.log(position);
            this.$emit('scroll',position)
        })
        //监听上拉
        this.scroll.on('pullingUp',()=>{
            console.log('上拉')
        })
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
