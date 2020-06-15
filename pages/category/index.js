// pages/category/index.js
import { request } from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftCategory: [],//左侧商品数据
    rightCategory: [],//右侧商品数据
    currentIndex: 0
  },
  Cates: [],//所有商品分类数据
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const Cates = wx.getStorageSync('cates');
    if (!Cates) {
      this.getCategory(this.data.currentIndex);
    } else {
      if (Date.now() - Cates.time > 1000 * 60 * 5) {
        this.getCategory(this.data.currentIndex);
      } else {
        //左侧数据
        let leftCategory = Cates.data.map(v => v.cat_name);
        let rightCategory = Cates.data[this.data.currentIndex].children;
        this.setData({
          leftCategory: leftCategory,
          rightCategory: rightCategory
        })
      }
    }
    // this.getCategory(this.data.currentIndex);
  },
  /**
   * 获取分类数据
   */
  async getCategory(index) {
    // request({ url: "/categories" })
    //   .then(res => {
    //     this.Cates = res.data.message;
    //     //左侧数据
    //     let leftCategory = this.Cates.map(v => v.cat_name);
    //     let rightCategory = this.Cates[index].children;
    //     this.setData({
    //       leftCategory: leftCategory,
    //       rightCategory: rightCategory
    //     })
    //     wx.setStorageSync('cates', { time: Date.now(),data: this.Cates })
    //   })
    const res = await request({ url: "/categories" });
    this.Cates = res.data.message;
    //左侧数据
    let leftCategory = this.Cates.map(v => v.cat_name);
    let rightCategory = this.Cates[index].children;
    this.setData({
      leftCategory: leftCategory,
      rightCategory: rightCategory
    })
    wx.setStorageSync('cates', { time: Date.now(), data: this.Cates })
  },
  /**
   * 左侧商品分类单击事件
   * @param {} param 
   */
  handleItemTap: function (e) {
    const Cates = wx.getStorageSync('cates');
    let rightCategory = Cates.data[e.currentTarget.dataset.index].children;
    this.setData({
      currentIndex: e.currentTarget.dataset.index,
      rightCategory: rightCategory
    })
  }
})