let ajaxTimes = 0;
export const request = (params) => {
    ajaxTimes++;
    console.log(ajaxTimes)
    //显示加载效果
    wx.showLoading({
        title: '加载中',
        mask: true
    })
    const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1";
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            url: baseUrl + params.url,
            success: (result) => {
                resolve(result)
            },
            file: (err) => {
                reject(err)
            },
            complete: () => {
                ajaxTimes--;
                if (ajaxTimes === 0) {
                    wx.hideLoading()
                }
            }
        })
    })
}
