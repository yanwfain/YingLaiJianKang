// pages/jiangkangda/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  huayanFn:function(e){
    wx.navigateTo({
      url: '/pages/pack/huayanpage/index',
    })
  },  
  jianchabg:function(e){
    wx.navigateTo({
      url: '/pages/page/jkjiancha/index',
    })
  },
  jialilist:function(e){
    wx.reLaunch({
      url: '/pages/page/jiapage/index',
    })
  },
  meporrtimg:function(e){
    wx.navigateTo({
      url: '/pages/page/meportimg/index',
    })
  },
  jiankangqc:function(e){
    wx.navigateTo({
      url: '/pages/page/jiankangqc/index',
    })
  },
  gerenzil:function(e){
    wx.navigateTo({
      url: '/pages/pack/gerenziliaoYin/index',
    })
  },
  jiakang:function(e){
    wx.reLaunch({
      url: '/pages/page/jiangkangda/index',
    })
  },
  nizhuan:function(e){
    wx.reLaunch({
      url: '/pages/pack/campThree/index',
    })
  },
  foedsIndex:function(e){
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },
  memysql:function(e){
    wx.reLaunch({
      url: '/pages/page/mesqlistshu/index',
    })
  },
  // jialilist:function(e){
  //   wx.reLaunch({
  //     url: '/pages/page/jianilst/index',
  //   })
  // },
  zaixianFn:function(e){
    wx.reLaunch({
      url: '/pages/pagetwo/zaixianzixun/index',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})