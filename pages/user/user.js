// pages/user/user.js
Page({

  data: {
    userinfo: {},
    collectNum: 0
  },
  onLoad: function (options) {

  },
  onShow: function () {
    let userinfo = wx.getStorageSync("userinfo")||{};
    this.setData({userinfo})

    let collectNum = wx.getStorageSync("collect").length||0;
    this.setData({
      collectNum
    })
  }
})