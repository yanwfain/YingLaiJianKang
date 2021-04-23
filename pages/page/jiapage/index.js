// pages/page/jiapage/index.js
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
  zaixianFn:function(e){
    wx.reLaunch({
      url: '/pages/pagetwo/zaixianzixun/index',
    })
  },
  shujutimeFn:function(e){
    wx.navigateTo({
      url: '/pages/pagetwo/timesetimeo/index',
    })
  },
  foedsIndex:function(e){
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },
  xieqgoFn: function (e) {
    if(e.currentTarget.dataset.id==1||e.currentTarget.dataset.id==2){
      wx.navigateTo({
        url: '/pages/pagetwo/xuetang/index?id=' + e.currentTarget.dataset.id,
      })
    }
    if(e.currentTarget.dataset.id==3){
      wx.navigateTo({
        url: '/pages/page/jiluxieya/index?id=' + e.currentTarget.dataset.id,
      })
    }
    if(e.currentTarget.dataset.id==4){
      wx.navigateTo({
        url: '/pages/pagetwo/tizhongjiance/index?id=' + e.currentTarget.dataset.id,
      })
    }
    if(e.currentTarget.dataset.id==5){
      wx.navigateTo({
        url: '/pages/page/jilifuwei/index?id=' + e.currentTarget.dataset.id,
      })
    }
    if(e.currentTarget.dataset.id==6){
      wx.navigateTo({
        url: '/pages/page/jiluganshou/index?id=' + e.currentTarget.dataset.id,
      })
    }
  },
  memysql:function(e){
    wx.reLaunch({
      url: '/pages/page/mesqlistshu/index',
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