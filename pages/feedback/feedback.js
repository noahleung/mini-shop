// pages/feedback/feedback.js
Page({

  data: {
    tabs: [{
      id: 0,
      isActive: true,
      value: '体验问题'
    },
    {
      id : 1,
      isActive: false,
      value: '商品、商家投诉'
    }]
  },
  onLoad: function (options) {

  },
  onShow: function () {

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