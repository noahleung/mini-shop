import {login} from '../../utils/utils.js'
import regeneratorRuntime from "../../lib/runtime/runtime.js"
import { request } from '../../request/index.js'
Page({

  data: {
  },

  onLoad: function (options) {

  },

  onShow: function () {

  },
  async getUserInfo(e){
    const {encryptedData,rawData,iv,signature} = e.detail;

    // let code =await login()
    // let loginParam = {
    //   encryptedData,rawData,iv,signature,code
    // }
    // // console.log(loginParam)
    // let res = await request({url: '/users/wxlogin',data: loginParam,method:'POST'})
    wx.setStorageSync("token", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo");
    wx.navigateBack({
      delta: 1
    });
  }

})