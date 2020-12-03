import { request } from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime/runtime.js"
Page({

  data: {
    goods: [],
    isFocus: false,
    inputValue: ''
  },
  time: -1,

  onLoad: function (options) {

  },
  onShow: function () {

  },
   handleChange(e){
    let {value} = e.detail;

    if (!value.trim()) {
      this.setData({
        isFocus: false,
        goods: []
      })
      return ;
    }
    this.setData({
      isFocus: true,
      goods: []
    })
    //防抖
    clearTimeout(this.time)
    this.time = setTimeout(() => {
      this.qsearch(value)
    }, 1500);
  },
  async qsearch(query){
    const res = await request({url: '/goods/qsearch',data: {query}})
    this.setData({
      goods: res
    })
  },
  handleClickButton(){
    this.setData({
      isFocus: false,
      goods: [],
      inputValue: ''
    })
  }


 
})