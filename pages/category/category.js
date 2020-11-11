// pages/category/category.js
import {request} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList: [],
    rightContent: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCates();
  },
  getCates(){
    request({url:"https://api-hmugo-web.itheima.net/api/public/v1/categories"})
    .then(res=>{
      let cates = res.data.message;
      //构造左侧
      let leftMenuList = cates.map(item=>item.cat_name);
      // 构造右侧
      let rightContent = cates[0].children
      this.setData({
        leftMenuList,
        rightContent
      })
    })
  }


})