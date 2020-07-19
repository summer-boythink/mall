import {request} from "./request";

export function getdetail(iid) {
  return request({
    url:'/detail',
    params:{
      iid
    }
  })
}

export class BaseInfo {
  constructor (itemInfo,services,columns) {
    this.desc = itemInfo.desc;
    this.discountDesc = itemInfo.discountDesc;  //活动
    this.NowPrice = itemInfo.lowNowPrice;  //现在的价格
    this.oldPrice = itemInfo.oldPrice;  //活动前价格
    this.newPrice = itemInfo.price;  //新价格
    this.title = itemInfo.title;   //标题
    this.columns = columns;
    this.services = services;
  }
}

// 将店铺信息数据获取定义到类里，然后导出去、
export class ShopInfo {
  constructor(shopInfo) {
    this.name = shopInfo.name;
    this.shopLogo = shopInfo.shopLogo;
    this.fans = shopInfo.cFans;
    this.goods = shopInfo.cGoods;
    this.score = shopInfo.score;
    this.cSell = shopInfo.cSells;
  }
}

// 商品尺寸信息
export class SizeInfo {
  constructor (info,rule) {
    // images可能没有值(某些商品有值，有些商品没有)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}

export function getDetailsGoodsList () {
  return request({
    url: '/recommend'
  })
}
