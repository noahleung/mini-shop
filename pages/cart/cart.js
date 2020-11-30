// pages/cart/cart.js
import {showModel} from '../../utils/utils.js'
import regeneratorRuntime from "../../lib/runtime/runtime.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalNum: 0,
    totalPrice: 0
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
    
    this.recount()
    
    this.setData({
      address
    })
  },
  //数量减一
 async sub(e){
    let index = e.currentTarget.dataset.index
    let cart = this.data.cart
    if (cart[index].num ==1){
     let res = await showModel('是否删除该物品')
     if (res.confirm){
       // 确认删除
       cart.splice(index,1)
       this.setData({
        cart
      })
       wx.setStorageSync('cart',cart)
       this.recount()
     }
    }else{
      if (cart[index].num >0){
        cart[index].num--
        this.setData({
          cart
        })
        wx.setStorageSync('cart',cart)
        this.recount()
      }
    }
   
    
  },
  //数量加一
  add(e){
    let index = e.currentTarget.dataset.index
    let cart = this.data.cart
    cart[index].num++
    this.setData({
      cart
    })
     wx.setStorageSync('cart',cart)
     this.recount()
  },
  //勾选
  handleItemChange(e){
    let index = e.currentTarget.dataset.index
    let cart = this.data.cart
    cart[index].checked = !cart[index].checked

    this.setData({
      cart
    })
    wx.setStorageSync('cart',cart)
    this.recount()
  },
  //选择地址
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
  },
  chooseAllToggle(){
    let {cart,allChecked} = this.data
    allChecked = !allChecked
    cart.forEach((item,index)=>{
      item.checked = allChecked
    })
    this.setData({
      cart
    })
    wx.setStorageSync('cart',cart)
    this.recount()
  },
  //计算数量 金额 判断是否全选
  recount(){
    let cart = wx.getStorageSync("cart")||[];
    let totalNum = 0,totalPrice=0;
       //计算全选
    let allChecked = true
    cart.forEach((item,index)=>{
      if (item.checked){
        //被选中
        totalPrice = totalPrice + (item.goods_price * item.num)
        totalNum = totalNum + item.num
      }else{
        allChecked = false
      }
    });
    allChecked = cart.length!=0?allChecked:false
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    })
    wx.setStorageSync("cart",cart)
  },
  goPay(){
    if (this.data.totalNum == 0){
      wx.showToast({
        title: '你还没有选择商品',
        duration: 1500,
        icon: 'none'
      });
      return;
    }
    if (!this.data.address.userName){
      wx.showToast({
        title: '还没选择收货地址',
        duration: 1500,
        icon:'none'
      });
      return;
    }
    wx.navigateTo({
      url: '/pages/pay/pay',
    });
  }
})