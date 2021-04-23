// pages/college/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tid:2,
    currentSwiper: 0,
    listarr:[
      {
        image:'http://47.94.16.158:8001/168.png'
      },
      {
        image:'http://47.94.16.158:8001/168.png'
      },
      {
        image:'http://47.94.16.158:8001/168.png'
      },
      {
        image:'http://47.94.16.158:8001/168.png'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  swiperChange (e){
    this.setData({
      currentSwiper: e.detail.current
    })
  },
  clickFn:function(e){
    this.setData({
      tid: e.currentTarget.dataset.id
    })
  },
  indexFn:function(e){
    wx.redirectTo({
      url: '/pages/index/index',
    })
  },
  collegeFn:function(e){
    wx.redirectTo({
      url: '/pages/pack/college/index',
    })
  },
  campFn: function (e) {
    // 第一种 默认用户
    // wx.redirectTo({
    //   url: '/pages/pack/campThree/index',
    // })
    
    if(!this.data.userList.status||this.data.userList.status==0){
      wx.redirectTo({
        url: '/pages/pack/camp/index',
      })
    }
    else if(this.data.userList.status==5){
      //购买都信息完善的用户
      wx.redirectTo({
        url: '/pages/pack/campThree/index',
      })
    }
    else if(this.data.userList.status>2&&this.data.userList.status<5){
      wx.reLaunch({
        url: '/pages/page/listxinxi/index',
      })
    }
    else if(this.data.userList.status==6){
      wx.showToast({
        title: '明天正式进入逆转营流程',
        icon:'none'
      })
    }
    else{
      // // 购买完成信息未完善
       wx.redirectTo({
         url: '/pages/pack/campTwo/index',
       })
       }
  },
  shoppingFn:function(e){
    wx.redirectTo({
      url: '/pages/pagetwo/shopping/index',
    })
  },
  myFn:function(e){
    wx.redirectTo({
      url: '/pages/page/my/index',
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
    var url = app.globalData.url + '/api/getUserInfo';
    var data = {
      userId:app.globalData.user_id,
    }
    app.wxRequest('get', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        that.setData({
          userList:res.data.userData
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
    wx.showLoading({
      title: '加载中',
    })
    wx.hideLoading()
    this.onShow()
    wx.stopPullDownRefresh()
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