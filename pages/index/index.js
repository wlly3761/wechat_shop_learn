import { request } from '../../request/index'
//index.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //轮播图数组
    swiperList: [],
    catesList:[],
    floorList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 1 发送异步请求获取轮播图数据
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success:(result)=>{
    //       console.log(result)
    //       this.setData({
    //         swiperList:result.data.message
    //       })
    //   }
    // })
    console.log(options);
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();
  },
  getSwiperList() {
    request(
      { url: '/home/swiperdata' }
    ).then(result => {
      this.setData({
        swiperList: result.data.message
      })
    })
  },
  //获取分类导航数据
  getCateList() {
    request(
      { url: '/home/catitems' }
    ).then(result => {
      this.setData({
        catesList: result.data.message
      })
    })
  },
  //获取分类导航数据
  getFloorList() {
    request(
      { url: '/home/floordata' }
    ).then(result => {
      this.setData({
        floorList: result.data.message
      })
    })
  }
   
})
