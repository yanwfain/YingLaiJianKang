// pages/userdelit/index.js
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
    console.log(app.globalData.userInfo.nickName)
    this.setData({
      nickName: app.globalData.userInfo.nickName,
      head:app.globalData.userInfo.avatarUrl
    })
  },
  notiro: function (e) {
    wx.navigateBack({
      delta: 1,//返回的页面数，如果 delta 大于现有页面数，则返回到首页。
      success: function () { }
    })
  },
  bindfocus1: function (e) {
    this.setData({
      showId: e.currentTarget.dataset.id
    })
  },
  // bindblur1: function (e) {
  //   this.setData({
  //     showId: ''
  //   })
  // },
  resName:function(e){

    this.setData({
      resName:e.detail.value
    })
  },
  tel:function(e){

    this.setData({
      tel:e.detail.value
    })
  },
  tel1:function(e){

    this.setData({
      tel1:e.detail.value
    })
  },
  tel2:function(e){
    this.setData({
      tel2:e.detail.value
    })
  },
  custody1:function(e){
    this.setData({
      custody1:e.detail.value
    })
  },
  relation1:function(e){
    this.setData({
      relation1:e.detail.value
    })
  },
  phone1:function(e){
    this.setData({
      phone1:e.detail.value
    })
  },
  custody2:function(e){
    this.setData({
      custody2:e.detail.value
    })
  },
  relation2:function(e){
    this.setData({
      relation2:e.detail.value
    })
  },
  phone2:function(e){
    this.setData({
      phone2:e.detail.value
    })
  },
  bindfocusone: function (e) {
    if (this.data.showId == 1) {
      this.setData({
        resName: ''
      })
    }
    if (this.data.showId == 2) {
      this.setData({
        tel: ''
      })
    }
    if (this.data.showId == 3) {
      this.setData({
        tel1: ''
      })
    }
    if (this.data.showId == 4) {
      this.setData({
        tel2: ''
      })
    }
  },
  submitens:function(e){
    if(!this.data.resName){
      wx.showToast({
        title: '请输入姓名',
        icon:'none'
      })
      return
    }
    if(!this.data.tel){
      wx.showToast({
        title: '请输入正确手机号',
        icon:'none'
      })
      return
    }
    if(this.data.tel.length!=11){
      wx.showToast({
        title: '请输入11位正确手机号',
        icon:'none'
      })
      return
    }
    if(this.data.phone1){
      if(this.data.phone1.length!=11){
        wx.showToast({
          title: '监护人1请输入正确手机号',
          icon:'none'
        })
        return
      }
    }
    if(this.data.phone2){
      if(this.data.phone2.length!=11){
        wx.showToast({
          title: '监护人2请输入正确手机号',
          icon:'none'
        })
        return
      }
    }
    var that = this
		var url = app.globalData.url + '/joinCamp/saveCustody';
    var data = {
      user_id:app.globalData.user_id,
      user_name:that.data.resName,
      phone:that.data.tel,
      custody1:that.data.custody1?that.data.custody1:'',
      relation1:that.data.relation1?that.data.relation1:'',
      phone1:that.data.phone1?that.data.phone1:'',
      custody2:that.data.custody2?that.data.custody2:'',
      relation2:that.data.relation2?that.data.relation2:'',
      phone2:that.data.phone2?that.data.phone2:'',
      step:1,
      piece:1,
      aim:7,
      id:that.data.jid?that.data.jid:''
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        wx.navigateTo({
          url: '/pages/pagetwo/useraddress/index',
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
		var url = app.globalData.url + '/joinCamp/getCustodyByUser';
    var data = {
      user_id:app.globalData.user_id,
   
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success&&res.data) {
       that.setData({
         jid:res.data.id,
         resName:res.data.user_name,
         tel:res.data.phone,
         custody1:res.data.custody1?res.data.custody1:'',
         relation1:res.data.relation1?res.data.relation1:'',
         phone1:res.data.phone1?res.data.phone1:'',
         custody2:res.data.custody2?res.data.custody2:'',
         relation2:res.data.relation2?res.data.relation2:'',
         phone2:res.data.phone2?res.data.phone2:'',
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