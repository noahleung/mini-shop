// pages/index/index.js
// 引用
import {request} from "../../request/index.js"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],
    cateList: [],
    floorList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();
  },
  getSwiperList(){
    request({url:"/home/swiperdata"})
    .then(result=>{
      this.setData({
        swiperList: result
      })
    })
  },
  getCateList(){
    request({url:"/home/catitems"})
    .then(result=>{
      this.setData({
        cateList: result
      })
    })
  },
  getFloorList(){
    request({url:"/home/floordata"})
    .then(result=>{
      this.setData({
        floorList: result
      })
    })
  },
  toNavigate(e){
    let {query} = e.currentTarget.dataset
    query = query.split("?")[1]
    wx.navigateTo({
      url: '/pages/goods_list/goods_list?'+query
    });
  }
})