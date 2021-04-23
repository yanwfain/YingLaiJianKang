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
    if(options.pageid){
      this.setData({
        pageid:options.pageid
      })
    }
  },
  notiro: function (e) {
    wx.navigateBack({
      delta: 1,//返回的页面数，如果 delta 大于现有页面数，则返回到首页。
      success: function () { }
    })
  },
  tab1:function(e){
    this.setData({
      tab1:e.currentTarget.dataset.id 
    })
  },
  tab2:function(e){
    this.setData({
      tab2:e.currentTarget.dataset.id 
    })
  },
  tab3:function(e){
    this.setData({
      tab3:e.currentTarget.dataset.id 
    })
  },
  tab4:function(e){
    this.setData({
      tab4:e.currentTarget.dataset.id 
    })
  },
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindDateChange1: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date1: e.detail.value
    })
  },
  tijiaosubm:function(e){
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    var url = app.globalData.url + '/api/updateUserCamperCourse';
    var data = {
      userId:app.globalData.user_id,
      diseaseType:that.data.tab1?that.data.tab1:'',
      diagnosisTime:that.data.date?that.data.date:'',
      hypertension:that.data.tab2?that.data.tab2:'',
      hyperlipemia:that.data.tab3?that.data.tab3:'',
      hyperuricemia:that.data.tab4?that.data.tab4:'',
      diagnosisTime2:that.data.date1?that.data.date1:'',
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
  baocunsx:function(e){
    var that = this
		var url = app.globalData.url + '/joinCamp/saveCourse';
    var data = {
      user_id:app.globalData.user_id,
      disease_type:that.data.tab1?that.data.tab1:'',
      diagnosis_time:that.data.date?that.data.date:'',
      hypertension:that.data.tab2?that.data.tab2:'',
      hyperlipemia:that.data.tab3?that.data.tab3:'',
      hyperuricemia:that.data.tab4?that.data.tab4:'',
      diagnosis_time2:that.data.date1?that.data.date1:'',
      step:1,
      piece:2,
      aim:7,
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
    if(!this.data.tab1||!this.data.date||!this.data.tab2||!this.data.tab3||!this.data.tab4){
      wx.showToast({
        title: '请完善信息',
        icon:'none'
      })
      return
    }
    if(this.data.tab4==1&&!this.data.date1){
      wx.showToast({
        title: '请填写高尿酸确诊年份',
        icon:'none'
      })
      return
    }
    var that = this
		var url = app.globalData.url + '/joinCamp/saveCourse';
    var data = {
      user_id:app.globalData.user_id,
      disease_type:that.data.tab1,
      diagnosis_time:that.data.date,
      hypertension:that.data.tab2,
      hyperlipemia:that.data.tab3,
      hyperuricemia:that.data.tab4,
      diagnosis_time2:that.data.date1,
      step:1,
      piece:2,
      aim:7,
      id:that.data.jid?that.data.jid:''
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        wx.navigateTo({
          url: '/pages/pagetwo/rixietang/index',
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
    var that = this
		var url = app.globalData.url + '/camper/getCourseByUser';
    var data = {
      user_id:app.globalData.user_id,
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success&&res.data) {
        that.setData({
          jid:res.data.id,
          tab1:res.data.disease_type,
          date:res.data.diagnosis_time,
          tab2:res.data.hypertension,
          tab3:res.data.hyperlipemia,
          tab4:res.data.hyperuricemia,
          date1:res.data.diagnosis_time2?res.data.diagnosis_time2:''
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