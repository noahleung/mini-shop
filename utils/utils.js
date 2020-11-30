
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

export const login = ()=>{
    return new Promise((resolve,reject)=>{
        wx.login({
            timeout:10000,
            success: (result)=>{
                resolve(result.code)
            },
            fail: (err)=>{reject(err)}
        });
    })
};
export const pay = (pay) =>{
    return new Promise((resolve,reject)=>{
        wx.requestPayment({
            ...pay,
            success: (result)=>{
               resolve(result) 
            },
            fail: (err)=>{
                reject(err)
            }
        });
    })
}