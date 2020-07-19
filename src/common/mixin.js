import {debounce} from "./utils";

export const itemmix = {
  data(){
    return{
      itemlisten:null
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.fresh,200)
    this.itemlisten =() =>{
      // this.$refs.scroll&&this.$refs.scroll.fresh()
      // console.log('aaaa')
      refresh()
    }
    this.$bus.$on('imgload',this.itemlisten)
  },
}
