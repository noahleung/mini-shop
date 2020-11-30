export const showModel = (param)=>{
    return new Promise((resolve,reject)=>{
        wx.showModal({
            title: '提示',
            content: param,
            success:(result)=>{
                resolve(result);
            },
            fail:(err)=>{
                reject(err);
            },
          })
    })
};
