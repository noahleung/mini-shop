// pages/goods_detail/goods_detail.js
import { request } from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime/runtime.js"
Page({
  
  data: {
    goods_id: '',
    swiperList: [],
    goodsObj: {},
  },
  goodsInfo: {},
  onLoad: function (options) {
    this.setData({ 
      goods_id : options.goods_id
    })
    this.getGoodsDetail(this.data.goods_id)
  },
  async getGoodsDetail(goodsId) {
    const res =await request({url: '/goods/detail', data: {goods_id: goodsId}})
    this.setData({
      swiperList: res.pics.length != 0?res.pics:[{pics_mid:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605178727695&di=9fbe24c6d3d4f19b4a6393fb3747def7&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F16%2F08%2F26%2F1957c0226aaca58.jpg%2521%2Ffwfh%2F804x1005%2Fquality%2F90%2Funsharp%2Ftrue%2Fcompress%2Ftrue'}],
      goodsObj: {
        goods_name: res.goods_name,
        goods_price: res.goods_price,
        goods_introduce: res.goods_introduce.replace(/\.webp/g,'.jpg')
      }
    })
    this.goodsInfo = {
      goods_name: res.goods_name,
      goods_price: res.goods_price,
      goods_id: this.data.goods_id
    }
    console.log(this.data.goodsObj)
  },
  handlePreviewImage(e){
    let list = this.data.swiperList.map((item)=>{
      return item.pics_mid
    })
    wx.previewImage({
      current: e.currentTarget.dataset.current,
      urls: list
    });
  },
  handleCartAdd(){
    let cart = wx.getStorageSync("cart");
    if (!cart){
      cart = [];
    }
    let selectedIndex = -1;
    let goodsInfo={};

    cart.forEach((item,index) => {
      if (item.goods_id === this.data.goods_id){
        selectedIndex = index;
        goodsInfo = item;
      }
    });

    if (selectedIndex === -1){
      //不存在，新建一个入数组里
      goodsInfo = {...this.goodsInfo,num: 1,
        pics: this.data.swiperList[0].pics_mid,checked: true}
      cart.push(goodsInfo)
      wx.showToast({
        title: '添加购物车成功',
        icon: 'success',
        duration: 2000
      })
    }else{
     //存在，则num+1
     cart[selectedIndex].num+=1
     wx.showToast({
      title: '物品数量+1',
      icon: 'success',
      duration: 2000
    })
    }
    wx.setStorageSync('cart', cart)
  }
})