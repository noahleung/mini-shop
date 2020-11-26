// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShow (){
    //1.获取缓存的收货信息
    let address = wx.getStorageSync("address")||{};
    address.all = address.provinceName+address.cityName+address.countyName+address.detailInfo
    this.setData({
      address
    })
  },
  handleChooseAddress(){
    //1.判断缓存中是否有收货地址
    //2.获取收获地址
    wx.chooseAddress({
      success: (result)=>{
        wx.setStorageSync("address", result);
        this.setData({
          address: result
        })
      }
    });
  }
})