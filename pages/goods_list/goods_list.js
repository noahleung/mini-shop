// pages/goods_list/goods_list.js
import { request } from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime/runtime.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 2,
        value: "价格",
        isActive: false
      }
    ],
    goodsList: []
  },
  queryParam: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },
  totalPages: 1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryParam.cid = options.cid
    this.getGoodsList()
  },
  onReachBottom() {
    if (this.queryParam.pagenum >= this.totalPages) {
      wx.showToast({  title: '没有下一页数据了'  });
    } else {
      this.queryParam.pagenum++
      this.getGoodsList()
    }
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
  },
  async getGoodsList() {
    let res = await request({ url: "/goods/search", data: this.queryParam })
    this.totalPages = Math.ceil(res.total / this.queryParam.pagesize)

    this.setData({
      goodsList: [...this.data.goodsList,...res.goods]
    })
  },
  onPullDownRefresh() {
    this.queryParam = {
      query: '',
      cid: this.queryParam.cid,
      pagenum: 1,
      pagesize: 10
    }
    this.totalPages = 1
    this.setData({
      goodsList: []
    })
    this.getGoodsList()
  }
})