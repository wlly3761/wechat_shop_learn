import { request } from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 1,
        value: "综合",
        isActive: true
      },
      {
        id: 2,
        value: "销量",
        isActive: false
      },
      {
        id: 3,
        value: "价格",
        isActive: false
      }

    ],
    QueryParam: {
      query: "",
      cid: "",
      pagenum: 1,
      pagesize: 10
    },
    goodsList: []
  },
  pageTotal: 0,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.QueryParam.cid = options.cid
    this.getGoodsList();
  },
  //标题点击事件
  handletabsItemChange: function (e) {
    const { index } = e.detail;
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    })
  },
  async getGoodsList() {
    const res = await request(
      { url: "/goods/search", data: this.data.QueryParam })
    let resultData = res.data.message;
    this.pageTotal = Math.ceil(resultData.total / this.data.QueryParam.pagesize)
    this.setData({
      goodsList:[...this.data.goodsList,...resultData.goods]
    })
    //关闭下拉刷新的窗口
    wx.stopPullDownRefresh();
  },
  //页面上滑 页面触底事件
  onReachBottom() {
    if (this.data.QueryParam.pagenum > this.pageTotal) {
      wx.showToast({
        title: '到底啦！',
        icon:"success",
        duration:2000
      })
    } else {
      this.data.QueryParam.pagenum++;
      this.getGoodsList();
    }
  },
  /**
   * 下拉刷新事件
   */
  onPullDownRefresh(){
       this.setData({
         goodsList:[]
       })
       this.data.QueryParam.pagenum=1;
       this.getGoodsList();
  }
})