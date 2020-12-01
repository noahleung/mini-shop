let ajaxTimes = 0;
export const request = (params)=>{
    let header = {...params.header}
    if (params.url.includes("/my/")){
        
        // 加请求头
        header["Authorization"] = wx.getStorageSync("token");
    }
    ajaxTimes++
    // 显示加载中的效果
    wx.showLoading({
        title: '加载中',
        mask: true
    });
    const baseUrl= 'https://api-hmugo-web.itheima.net/api/public/v1'
    return new Promise((resolve,reject)=>{
        var reqTask = wx.request({
          ...params,
          header,
          url: baseUrl+params.url,
          success:(result)=>{
              resolve(result.data.message);
          },
          fail:(err)=>{
              reject(err);
          },
          complete: ()=>{
              ajaxTimes--
              if (ajaxTimes==0){
              wx.hideLoading();
              }
          }
        });
    })
}