// pages/collect/collect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        isActive: true,
        value: '商品收藏'
      },
      {
        id: 1,
        isActive: false,
        value: '品牌收藏'
      },
      {
        id: 2,
        isActive: false,
        value: '店铺收藏'
      },
      {
        id: 3,
        isActive: false,
        value: '浏览足迹'
      }
    ],
    collect: []
  },

 
  onLoad: function (options) {
    
  },

  onShow: function () {
    let collect = wx.getStorageSync("collect")||[];

    this.setData({
      collect
    })
  },
  changeItem(e) {
    let selectedIndex = e.detail
    let tabs = this.data.tabs
    tabs.forEach((item, index) => {
      if (index == selectedIndex) {
        item.isActive = true
      } else {
        item.isActive = false
      }
    })

    this.setData({
      tabs
    })
  }
})