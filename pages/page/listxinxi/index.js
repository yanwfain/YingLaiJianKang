// pages/listxinxi/index.js
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
  tabsclick:function(e){
    if(e.currentTarget.dataset.id==1){
      wx.navigateTo({
        url: '/pages/pagetwo/userdelit/index',
      })
    }
    if(e.currentTarget.dataset.id==2){
      if(this.data.listuser.piece<2){
        wx.showToast({
          title: '完成前一步后解锁',
          icon:'none'
        })
        return
      }
      wx.navigateTo({
        url: '/pages/pack/binlist/index',
      })
    }
    if(e.currentTarget.dataset.id==3){
      if(this.data.listuser.piece<3){
        wx.showToast({
          title: '完成前一步后解锁',
          icon:'none'
        })
        return
      }
      wx.navigateTo({
        url: '/pages/pack/geren/index',
      })
    }
    if(e.currentTarget.dataset.id==4){
      if(this.data.listuser.piece<4){
        wx.showToast({
          title: '完成前一步后解锁',
          icon:'none'
        })
        return
      }
      wx.navigateTo({
        url: '/pages/pagetwo/report/index',
      })
    }
    if(e.currentTarget.dataset.id==5){
      if(this.data.listuser.piece<5){
        wx.showToast({
          title: '完成前一步后解锁',
          icon:'none'
        })
        return
      }
      wx.navigateTo({
        url: '/pages/pagetwo/zhaopian/index',
      })
    }
  },
  lookgiftFn:function(e){
    wx.navigateTo({
      url: '/pages/pagetwo/timeyuyue/index',
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
    that.setData({
      wuid:''
    })
		var url = app.globalData.url + '/joinCamp/getUserFromPro';
    var data = {
      user_id:app.globalData.user_id,
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        that.setData({
          listuser:res.data
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
    var url = app.globalData.url + '/api/getUserInfo';
    var data = {
      userId:app.globalData.user_id,
    }
    app.wxRequest('get', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        that.setData({
          user:res.data.userData
        })
				
      } else {
        wx.showToast({
          title: res.error_message,
        })
      }
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
      console.log(err.errMsg)
    })
  },
  lookchaknas:function(e){
    wx.navigateTo({
      url: '/pages/page/lookgift/index',
    })
  },
  lokiaqi:function(e){
    wx.navigateTo({
      url: '/pages/pagetwo/startantFn/index',
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