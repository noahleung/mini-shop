// pages/cart/cart.js
import { showModel } from '../../utils/utils.js'
import regeneratorRuntime from "../../lib/runtime/runtime.js"
import { request } from '../../request/index.js'
import { pay } from '../../utils/utils.js'
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
    cart = cart.filter(v => v.checked)

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
  async pay() {
    // 看有没有token
    let token = wx.getStorageSync("token");
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/auth'
      });
    }
    let header = {
      Authorization: token
    }
    let order_price = this.data.totalPrice
    let consignee_addr = this.data.address.all
    let goods = []
    let cart = this.data.cart;
    cart.forEach((item, index) => {
      goods.push({
        goods_id: item.goods_id,
        goods_number: item.num,
        goods_price:
          item.goods_price
      })
    })

    let orderParam = {
      order_price, consignee_addr, goods
    }

    try {
      //创建订单
      const res = await request({ url: '/my/orders/create', method: 'POST', data: orderParam, header })
      let order_number = res.order_number

      //获取发起支付所需要的参数
      const res2 = await request({ url: '/my/orders/req_unifiedorder', method: 'POST', data: { order_number } })

      // 发起支付
      const res3 = await pay(res2.pay)

      //查询订单
      const res4 = await request({ url: '/my/orders/chkOrder', method: 'POST', data: { order_number } })

      //支付成功从购物车中删除已完成支付的商品

    } catch (error) {
      console.log(error)

    } finally{
      let realCart = wx.getStorageSync("cart")||[];
      realCart = realCart.filter(v=>!v.checked)
     
      wx.setStorageSync("cart", realCart);

      wx.switchTab({
        url: '/pages/cart/cart',
      });
    }

  }
})