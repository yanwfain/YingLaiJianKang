// pages/binlist/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: app.globalData.statusBarHeight,//获取导航高度
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      pageid:options.pageid
    })
  },
  submiiti:function(e){
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    var url = app.globalData.url + '/api/updateUserCamperPersonal';
    var data = {
      userId:app.globalData.user_id,
      smoking:that.data.tab1,
      drinking:that.data.tab2,
      spirit:that.data.spirit?that.data.spirit:'',
      beer:that.data.beer?that.data.beer:'',
      wine:that.data.wine?that.data.wine:'',
      other:that.data.other?that.data.other:'',
    }
    app.wxRequest('post', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
      wx.navigateBack({
        delta: 1,
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
  tab1: function (e) {
    this.setData({
      tab1: e.currentTarget.dataset.id

    })
  },
  tab2: function (e) {
    this.setData({
      tab2:e.currentTarget.dataset.id
    })
  },
  spirit:function(e){
    this.setData({
      spirit:e.detail.value
    })
  },
  beer:function(e){
    this.setData({
      beer:e.detail.value
    })
  },
  wine:function(e){
    this.setData({
      wine:e.detail.value
    })
  },
  other:function(e){
    this.setData({
      other:e.detail.value
    })
  },
  baocunsx:function(e){
    var that = this
		var url = app.globalData.url + '/joinCamp/savePersonal';
    var data = {
      user_id:app.globalData.user_id,
      smoking:that.data.tab1,
      drinking:that.data.tab2,
      spirit:that.data.spirit?that.data.spirit:'',
      beer:that.data.beer?that.data.beer:'',
      wine:that.data.wine?that.data.wine:'',
      other:that.data.other?that.data.other:'',
      step:1,
      piece:3,
      aim:4,
      id:that.data.jid?that.data.jid:''
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        wx.reLaunch({
          url: '/pages/page/listxinxi/index',
        })
				
      } else {
        wx.showToast({
          title: res.msg,
        })
      }
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
      console.log(err.errMsg)
    })
  },
  xiapageFn:function(e){
    if(!this.data.tab1||!this.data.tab2){
      wx.showToast({
        title: '请完善信息后提交',
        icon:'none'
      })
      return
    }
    var that = this
		var url = app.globalData.url + '/joinCamp/savePersonal';
    var data = {
      user_id:app.globalData.user_id,
      smoking:that.data.tab1,
      drinking:that.data.tab2,
      spirit:that.data.spirit?that.data.spirit:'',
      beer:that.data.beer?that.data.beer:'',
      wine:that.data.wine?that.data.wine:'',
      other:that.data.other?that.data.other:'',
      step:1,
      piece:3,
      aim:4,
      id:that.data.jid?that.data.jid:''

    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        wx.navigateTo({
          url: '/pages/pagetwo/yinshi/index',
        })
				
      } else {
        wx.showToast({
          title: res.msg,
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
    wx.showLoading({
      title:'加载中'
    })
    var that = this
		var url = app.globalData.url + '/camper/getPersonalByUser';
    var data = {
      user_id:app.globalData.user_id,
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success&&res.data) {
        that.setData({
          jid:res.data.id?res.data.id:'',
          tab1:res.data.smoking,
          tab2:res.data.drinking,
          spirit:res.data.spirit?res.data.spirit:'',
          beer:res.data.beer?res.data.beer:'',
          wine:res.data.wine?res.data.wine:'',
          other:res.data.other?res.data.other:'',
        })
      } else {
        wx.showToast({
          title: res.msg,
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