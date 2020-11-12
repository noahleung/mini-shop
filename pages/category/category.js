// pages/category/category.js
import { request } from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime/runtime.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList: [],
    rightContent: [],
    currentIndex: 0,
    cates: [],
    scrollTop: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 缓存
    let list = wx.getStorageSync("cates");
    if (!list) {
      this.getCates();
    } else {
      let leftMenuList = list.map(item => item.cat_name);
      let rightContent = list[0].children
      this.setData({
        leftMenuList,
        rightContent,
        cates: list
      })
    }

  },
  async getCates() {
    const res = await request({ url: "/categories" })
    let cates = res;
    wx.setStorageSync("cates", res);
    //构造左侧
    let leftMenuList = cates.map(item => item.cat_name);
    // 构造右侧
    let rightContent = cates[0].children
    this.setData({
      leftMenuList,
      rightContent,
      cates
    })

  },
  handleItemTap(e) {
    let index = e.currentTarget.dataset.index
    let rightContent = this.data.cates[index].children
    this.setData({
      currentIndex: index,
      rightContent,
      scrollTop: 0
    })
  }


})