// pages/cart/cart.js
import { showModel } from '../../utils/utils.js'
import regeneratorRuntime from "../../lib/runtime/runtime.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    totalNum: 0,
    totalPrice: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShow() {
    let address = wx.getStorageSync("address") || {};
    let cart = wx.getStorageSync("cart") || [];

    address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
    cart = cart.filter(v=>v.checked)

    let totalNum = 0, totalPrice = 0;
    //计算全选
    cart.forEach((item, index) => {
        totalPrice = totalPrice + (item.goods_price * item.num)
        totalNum = totalNum + item.num
    });

    this.setData({
      address,
      cart,
      totalPrice,
      totalNum
    })
  },
  //计算数量 金额 判断是否全选
  recount() {

  },
  pay() {

  }
})