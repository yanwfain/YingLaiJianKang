// pages/dongtai/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tid:1,
    statusBarHeight: app.globalData.statusBarHeight,//获取导航高度
    movieList:[],
    page:1,
    pageSize:15,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMore()
  },
  getMore: function (page) {
		wx.showLoading({
			title: '加载中',
		})
    var that = this;
    if(that.data.tid==1){
      var url = app.globalData.url + '/api/selectUserInvitation';
    }
    if(that.data.tid==2){
      var url = app.globalData.url + '/api/selectInvitationCommentByArtId';
    }
 
    var data = {
      userId:app.globalData.user_id,
      pageNum:this.data.page,
      pageSize:this.data.pageSize,
		}
		console.log(page)
		console.log(url)
    app.wxRequest('GET', url, data, (res) => {
			console.log(res)
			wx.hideLoading()
      if (res.success) {
        if(that.data.tid==1){
          if (that.data.page > 1) {
            var movieLists = that.data.movieList;
            that.setData({
              movieList: movieLists.concat(res.data.list),
              page: that.data.page + 1
            })
          } else {
            that.setData({
              movieList: res.data.list,
              page:  that.data.page  + 1
            })
          }
        }
        if(that.data.tid==2){
          if (that.data.page > 1) {
            var movieLists = that.data.movieList;
            that.setData({
              movieList: movieLists.concat(res.data.list),
              page: that.data.page + 1
            })
          } else {
            that.setData({
              movieList: res.data.list,
              page:  that.data.page  + 1
            })
          }
        }
      
      } else {
        wx.showToast({
          title: '没有更多数据了！',
          icon: 'none'
        })
      }
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
    })
  },
  shoucangFn:function(e){
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    var url = app.globalData.url + '/api/selectUserGetLikesCollect';
    var data = {
      userId:app.globalData.user_id,
    }
    app.wxRequest('get', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        that.setData({
          numallds:res.data,
          ishows:true
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
  isMOdels:function(e){
    this.setData({
      ishows:false
    })
  },
  linGuanzhu:function(e){
    wx.navigateTo({
      url: '/pages/page/Meguanzhu/index',
    })
   },
   fensiFn:function(e){
    wx.navigateTo({
      url: '/pages/pack/fensiindex/index',
    })
   },
  notiro: function (e) {
    wx.navigateBack({
      delta: 1,//返回的页面数，如果 delta 大于现有页面数，则返回到首页。
      success: function () { }
    })
  },
  clickFn:function(e){
    this.setData({
      tid: e.currentTarget.dataset.id
    })
    this.setData({
      movieList:[],
      page:1,
      pageSize:15,
    })
    this.getMore()
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
		that.getMore(that.data.page)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})