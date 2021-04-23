// pages/delitsriqi/index.js
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
    var nian = []
    var yue = []
    var ri = []
    for(var i = 1940; i <=2050;i++){
      nian.push(i)
    }
    for(var i = 1; i <=12;i++){
      yue.push(i)
    }
    for(var i = 1; i <=31;i++){
      ri.push(i)
    }
    this.setData({
      nian:nian,
      yue:yue,
      ri:ri,
     
    })
  },
  bindChange:function(e){
    console.log(e)
    var val = e.detail.value
    this.setData({
      nianNum:this.data.nian[val]
    })
    console.log(this.data.nianNum)
  },
  bindChanges:function(e){
    var val = e.detail.value
    this.setData({
      yueNum:this.data.yue[val]
    })
    console.log(this.data.yueNum)
  },
  bindChangest:function(e){
    var val = e.detail.value
    this.setData({
      riNum:this.data.ri[val]
    })
    console.log(this.data.riNum)
  },
  submitens:function(e){
    if(!this.data.birthday){
      if(!this.data.nianNum||!this.data.yueNum||!this.data.riNum){
        wx.showToast({
          title: '请完善出生日期',
          icon:'none'
        })
        return
      }
    }
    
    var that = this
		var url = app.globalData.url + '/joinCamp/saveBase';
    var data = {
      user_id:app.globalData.user_id,
      birthday:that.data.nianNum?that.data.nianNum + '年' + that.data.yueNum + '月' + that.data.riNum + '日' : that.data.birthday,
      step:3,
      piece:1,
      aim:7,
      id:that.data.jid?that.data.jid:'',
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        wx.navigateTo({
          url: '/pages/pagetwo/xinbie/index',
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
      title: '加载中',
    })
    var that = this
		var url = app.globalData.url + '/camper/getBaseByUser';
    var data = {
      user_id:app.globalData.user_id,
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success&&res.data) {
       that.setData({
         jid:res.data.id,
         birthday:res.data.birthday,
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