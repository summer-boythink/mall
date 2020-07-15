<template><div>
  <detailnavbar></detailnavbar>
  <detail-swiper :topimg="topimg"></detail-swiper>
  <p>{{this.iid}}</p></div>
</template>

<script>
  import detailnavbar from "./children/detailnavbar";
  import detailSwiper from "./children/detailSwiper";
  import {getdetail} from "network/detail";

  export default {
        name: "detail",
        data(){
            return{
              iid:null,
              topimg:[]
            }
        },
        created() {
            this.iid = this.$route.params.iid
            getdetail(this.iid).then(res => {
              console.log(res);
              this.topimg = res.result.itemInfo.topImages
            })
        },
        components:{
          detailnavbar,
          detailSwiper
        }
    }
</script>

<style scoped>

</style>
