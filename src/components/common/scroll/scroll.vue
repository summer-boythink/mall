<template>
    <div class="wrappar" ref="wrapper">
        <div class="content">
            <slot>

            </slot>
        </div>
    </div>
</template>

<script>
import Bscroll from 'better-scroll'

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
        this.scroll=new Bscroll(this.$refs.wrapper,{
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
        // //监听上拉
        // this.scroll.on('pullingUp',()=>{
        //    this.$emit('pullingUp')
        // })
      //监听scroll滚动到底
        if(this.pullUpLoad){
          this.scroll.on('pullingUp',() =>{
            this.$emit('pullingUp')
          })
        }
    },
    methods:{
          scrollTo(x,y,time=500){
            this.scroll.scrollTo(x,y,time)
        },
          finishPullUps(){
            this.scroll.finishPullUp()
        },
          fresh(){
            this.scroll.refresh()
        },
          getscroll(){
            return this.scroll?this.scroll.y:0
          }
    }
}
</script>

<style scoped>

</style>
