// pages/binlist/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: app.globalData.statusBarHeight,//获取导航高度
    xui:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(app.globalData.userInfo)
    wx.showLoading({
      title:'加载中'
    })
    var url = app.globalData.url + '/api/selectUserMaterialByUserId';
    var data = {
      userId:app.globalData.user_id,
    
    }
    app.wxRequest('get', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
       that.setData({
         listuser:res.data.userMaterial,
         nickName:app.globalData.userInfo
       })
      } else {
        wx.showToast({
          title: res.error_message,
          icon:'none'
        })
      }
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
      console.log(err.errMsg)
    })
  },
  notiro: function (e) {
    wx.navigateBack({
      delta: 1,//返回的页面数，如果 delta 大于现有页面数，则返回到首页。
      success: function () { }
    })
  },
  name:function(e){
    this.setData({
      'listuser.name':e.detail.value
    })

  },
  nickName:function(e){
    this.setData({
      'listuser.nickName':e.detail.value
    })

  },
  phone:function(e){
    this.setData({
      'listuser.phone':e.detail.value
    })
  },
  custody1:function(e){
    this.setData({
      'listuser.custody1':e.detail.value
    })
  },
  custody2:function(e){
    this.setData({
      'listuser.custody2':e.detail.value
    })
  },
  custody3:function(e){
    this.setData({
      'listuser.height':e.detail.value
    })
  },
  custody4:function(e){
    this.setData({
      'listuser.waist':e.detail.value
    })
  },
  xuigaiFns:function(e){
    this.setData({
      xui:2
    })
  },
  submitbao:function(e){
    var that = this;
    wx.showLoading({
      title:'加载中'
    })
    var url = app.globalData.url + '/api/updateUserMaterial';
    var data = {
      userId:app.globalData.user_id,
      name:this.data.listuser.name,
      nickName:this.data.listuser.nickName,
      phone:this.data.listuser.phone,
      custody1:this.data.listuser.custody1,
      custody2:this.data.listuser.custody2,
      height:this.data.listuser.height,
      waist:this.data.listuser.waist,
    }
    app.wxRequest('post', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        wx.showToast({
          title: '修改成功',
        })
        that.setData({
          xui:1
        })
      } else {
        wx.showToast({
          title: res.error_message,
          icon:'none'
        })
      }
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
      console.log(err.errMsg)
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