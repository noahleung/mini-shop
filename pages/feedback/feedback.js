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
    }],
    choosImgs: [],
    textVal: '' //文本域的内容
  },
  uploadImgs: [],
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
  },
  // 选择图片
  handleChooseImage(){
    wx.chooseImage({
      count: 5,
      sizeType: ['original','compressed'],
      sourceType: ['album','camera'],
      success: (result)=>{
        console.log(result)
        this.setData({
          choosImgs: [...this.data.choosImgs,...result.tempFilePaths]
        })
        
      }
    });
  },
  //删除图片
  handleRemoveImage(e){
    let {index} = e.currentTarget.dataset
    let {choosImgs} = this.data
    choosImgs.splice(index,1)

    this.setData({
      choosImgs
    })
  },
  //文本域输入
  handleTextInput(e){
    this.setData({
      textVal: e.detail.value
    })
  },
  handleFormSubmit(){
    let {textVal,choosImgs} = this.data

    if (!textVal.trim()){
      //不合法
      wx.showToast({
        title: '输入不合法',
        icon: 'none',
        duration: 1500
      });
      return;
    }

    if (this.data.choosImgs.length != 0){
      wx.showToast({
        title: '正在上传',
        icon: 'none',
        mask: true
      });
      choosImgs.forEach((v,i)=>{
      //不支持多文件上传，只能遍历数组
      var upTask = wx.uploadFile({
        url: 'https://img.coolcr.cn/api/upload',   //上传到哪
        filePath: v, //被上传的文件的路径
        name: 'image', // 文件的名称
        formData: {}, //上传文件时顺带的数据
        success: (result)=>{
          let url = JSON.parse(result.data).data.url
          this.uploadImgs.push(url)
          //所有图片上传完毕
          if (i==choosImgs.length-1){
            //上传完毕
            console.log("提交")
            wx.hideLoading();
            wx.navigateBack({
              delta: 1
            });
          }
        }
      });
      })
    }else{
      console.log('只是提交了表单')
    }
  }

})