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
    request({url:"https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata"})
    .then(result=>{
      this.setData({
        swiperList: result.data.message
      })
    })
  },
  getCateList(){
    request({url:"https://api-hmugo-web.itheima.net/api/public/v1/home/catitems"})
    .then(result=>{
      this.setData({
        cateList: result.data.message
      })
    })
  },
  getFloorList(){
    request({url:"https://api-hmugo-web.itheima.net/api/public/v1/home/floordata"})
    .then(result=>{
      this.setData({
        floorList: result.data.message
      })
    })
  }
})