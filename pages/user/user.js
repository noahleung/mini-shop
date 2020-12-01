// pages/user/user.js
Page({

  data: {
    userinfo: {}
  },
  onLoad: function (options) {

  },
  onShow: function () {
    let userinfo = wx.getStorageSync("userinfo")||{};
    this.setData({userinfo})
  }
})