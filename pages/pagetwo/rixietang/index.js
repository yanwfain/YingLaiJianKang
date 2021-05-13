// pages/rixietang/index.js
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
  tijiaosubm:function(e){
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    var url = app.globalData.url + '/api/updateUserCamperGlucose';
    var data = {
      userId:app.globalData.user_id,
      fasting_s:that.data.fasting_s?that.data.fasting_s:'',
      fasting_l:that.data.fasting_l?that.data.fasting_l:'',
      breakfast_s:that.data.breakfast_s?that.data.breakfast_s:'',
      breakfast_l:that.data.breakfast_l?that.data.breakfast_l:'',
      lunch_s:that.data.lunch_s?that.data.lunch_s:'',
      lunch_l:that.data.lunch_l?that.data.lunch_l:'',
      dinner_s:that.data.dinner_s?that.data.dinner_s:'',
      dinner_l:that.data.dinner_l?that.data.dinner_l:'',
      sleep_s:that.data.sleep_s?that.data.sleep_s:'',
      sleep_l:that.data.sleep_l?that.data.sleep_l:'',
      frequency:that.data.tab1?that.data.tab1:'',
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
  tab1:function(e){
      this.setData({
        tab1:e.currentTarget.dataset.id
      })
  },
  fasting_s:function(e){
    var num = Number(e.detail.value)
    if(50<num||num<2){
      wx.showToast({
        title: '血糖数值范围：小于50大于2之间',
        icon:'none'
      })
      return
    }
    this.setData({
      fasting_s:e.detail.value
    })
  },
  fasting_l:function(e){
    var num = Number(e.detail.value)
    if(50<num||num<2){
      wx.showToast({
        title: '血糖数值范围：小于50大于2之间',
        icon:'none'
      })
      return
    }
    this.setData({
      fasting_l:e.detail.value
    })
  },
  breakfast_s:function(e){
    var num = Number(e.detail.value)
    if(50<num||num<2){
      wx.showToast({
        title: '血糖数值范围：小于50大于2之间',
        icon:'none'
      })
      return
    }
    this.setData({
      breakfast_s:e.detail.value
    })
  },
  breakfast_l:function(e){
    var num = Number(e.detail.value)
    if(50<num||num<2){
      wx.showToast({
        title: '血糖数值范围：小于50大于2之间',
        icon:'none'
      })
      return
    }
    this.setData({
      breakfast_l:e.detail.value
    })
  },
  lunch_s:function(e){
    var num = Number(e.detail.value)
    if(50<num||num<2){
      wx.showToast({
        title: '血糖数值范围：小于50大于2之间',
        icon:'none'
      })
      return
    }
    this.setData({
      lunch_s:e.detail.value
    })
  },
  lunch_l:function(e){
    var num = Number(e.detail.value)
    if(50<num||num<2){
      wx.showToast({
        title: '血糖数值范围：小于50大于2之间',
        icon:'none'
      })
      return
    }
    this.setData({
      lunch_l:e.detail.value
    })
  },
  dinner_s:function(e){
    var num = Number(e.detail.value)
    if(50<num||num<2){
      wx.showToast({
        title: '血糖数值范围：小于50大于2之间',
        icon:'none'
      })
      return
    }
    this.setData({
      dinner_s:e.detail.value
    })
  },
  dinner_l:function(e){
    var num = Number(e.detail.value)
    if(50<num||num<2){
      wx.showToast({
        title: '血糖数值范围：小于50大于2之间',
        icon:'none'
      })
      return
    }
    this.setData({
      dinner_l:e.detail.value
    })
  },
  sleep_s:function(e){
    var num = Number(e.detail.value)
    if(50<num||num<2){
      wx.showToast({
        title: '血糖数值范围：小于50大于2之间',
        icon:'none'
      })
      return
    }
    this.setData({
      sleep_s:e.detail.value
    })
  },
  sleep_l:function(e){
    var num = Number(e.detail.value)
    if(50<num||num<2){
      wx.showToast({
        title: '血糖数值范围：小于50大于2之间',
        icon:'none'
      })
      return
    }
    this.setData({
      sleep_l:e.detail.value
    })
  },
  baocunsx:function(e){
    var that = this
    var url = app.globalData.url + '/joinCamp/saveGlucose';
    var data = {
      user_id:app.globalData.user_id,
      fasting_s:that.data.fasting_s?that.data.fasting_s:'',
      fasting_l:that.data.fasting_l?that.data.fasting_l:'',
      breakfast_s:that.data.breakfast_s?that.data.breakfast_s:'',
      breakfast_l:that.data.breakfast_l?that.data.breakfast_l:'',
      lunch_s:that.data.lunch_s?that.data.lunch_s:'',
      lunch_l:that.data.lunch_l?that.data.lunch_l:'',
      dinner_s:that.data.dinner_s?that.data.dinner_s:'',
      dinner_l:that.data.dinner_l?that.data.dinner_l:'',
      sleep_s:that.data.sleep_s?that.data.sleep_s:'',
      sleep_l:that.data.sleep_l?that.data.sleep_l:'',
      frequency:that.data.tab1?that.data.tab1:'',
      step:2,
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
    if(!this.data.fasting_s||!this.data.fasting_l||!this.data.breakfast_s||!this.data.breakfast_l||!this.data.lunch_s||!this.data.lunch_l||!this.data.dinner_s||!this.data.dinner_l||!this.data.sleep_s||!this.data.sleep_l||!this.data.tab1){
      wx.showToast({
        title: '请完善信息',
        icon:'none'
      })
      return
    }
    var that = this
    var url = app.globalData.url + '/joinCamp/saveGlucose';
    var data = {
      user_id:app.globalData.user_id,
      fasting_s:that.data.fasting_s?that.data.fasting_s:'',
      fasting_l:that.data.fasting_l?that.data.fasting_l:'',
      breakfast_s:that.data.breakfast_s?that.data.breakfast_s:'',
      breakfast_l:that.data.breakfast_l?that.data.breakfast_l:'',
      lunch_s:that.data.lunch_s?that.data.lunch_s:'',
      lunch_l:that.data.lunch_l?that.data.lunch_l:'',
      dinner_s:that.data.dinner_s?that.data.dinner_s:'',
      dinner_l:that.data.dinner_l?that.data.dinner_l:'',
      sleep_s:that.data.sleep_s?that.data.sleep_s:'',
      sleep_l:that.data.sleep_l?that.data.sleep_l:'',
      frequency:that.data.tab1?that.data.tab1:'',
      step:2,
      piece:2,
      aim:7,
      id:that.data.jid?that.data.jid:''
    }

    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        wx.navigateTo({
          url: '/pages/pagetwo/yongyao/index',
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
   
		var url = app.globalData.url + '/camper/getGlucoseByUser';
    var data = {
      user_id:app.globalData.user_id,
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success&&res.data) {
        that.setData({
          jid:res.data.id?res.data.id:'',
          fasting_s:res.data.fasting_s?res.data.fasting_s:'',
          fasting_l:res.data.fasting_l?res.data.fasting_l:'',
          breakfast_s:res.data.breakfast_s?res.data.breakfast_s:'',
          breakfast_l:res.data.breakfast_l?res.data.breakfast_l:'',
          lunch_s:res.data.lunch_s?res.data.lunch_s:'',
          lunch_l:res.data.lunch_l?res.data.lunch_l:'',
          dinner_s:res.data.dinner_s?res.data.dinner_s:'',
          dinner_l:res.data.dinner_l?res.data.dinner_l:'',
          sleep_s:res.data.sleep_s?res.data.sleep_s:'',
          sleep_l:res.data.sleep_l?res.data.sleep_l:'',
          tab1:res.data.frequency?res.data.frequency:'',
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