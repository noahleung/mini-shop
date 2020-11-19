// pages/goods_detail/goods_detail.js
import { request } from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime/runtime.js"
Page({
  
  data: {
    goods_id: '',
    swiperList: [],
    goodsObj: {}
  },

  onLoad: function (options) {
    this.setData({ 
      goods_id : options.goods_id
    })
    this.getGoodsDetail(this.data.goods_id)
  },
  async getGoodsDetail(goodsId) {
    const res =await request({url: '/goods/detail', data: {goods_id: goodsId}})
    this.setData({
      swiperList: res.pics,
      goodsObj: {
        goods_name: res.goods_name,
        goods_price: res.goods_price,
        goods_introduce: res.goods_introduce.replace(/\.webp/g,'.jpg')
      }
    })
    console.log(this.data.goodsObj)
  },
  handlePreviewImage(e){
    console.log(e)
    let list = this.data.swiperList.map((item)=>{
      return item.pics_mid
    })
    wx.previewImage({
      current: e.currentTarget.dataset.current,
      urls: list
    });
  }
})