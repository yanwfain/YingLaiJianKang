// pages/orderlist/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieList:[],
    page:1,
    pageSize:15,
    tid:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.getMore()
  },
  shopdelit:function(e){
    wx.navigateTo({
      url: '/pages/pagetwo/shopdelit/index?id=' + e.currentTarget.dataset.id,
    })
  },
  collectArticle:function(e){
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    var url = app.globalData.url + '/api/collectArticle';
    var data = {
      userId:app.globalData.user_id,
      articleId:e.currentTarget.dataset.id,
      status:2
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        that.setData({
          movieList:[],
          page:1,
          pageSize:15,
        })
        that.getMore()
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
  givelikeArticle:function(e){
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    var url = app.globalData.url + '/api/givelikeArticle';
    var data = {
      userId:app.globalData.user_id,
      articleId:e.currentTarget.dataset.id,
      status:2
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        that.setData({
          movieList:[],
          page:1,
          pageSize:15,
        })
        that.getMore()
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
  tieshouFn:function(e){
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    var url = app.globalData.url + '/api/collectInvitation';
    var data = {
      userId:app.globalData.user_id,
      articleId:e.currentTarget.dataset.id,
      status:2
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        that.setData({
          movieList:[],
          page:1,
          pageSize:15,
        })
        that.getMore()
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
  tiedianzanFn:function(e){
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    var url = app.globalData.url + '/api/givelikeInvitation';
    var data = {
      userId:app.globalData.user_id,
      articleId:e.currentTarget.dataset.id,
      status:2
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        that.setData({
          movieList:[],
          page:1,
          pageSize:15,
        })
        that.getMore()
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
  shopshou:function(e){
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    var url = app.globalData.url + '/api/shop/collectGoods';
    var data = {
      userId:app.globalData.user_id,
      productId:e.currentTarget.dataset.id,
      status:2
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        that.setData({
          movieList:[],
          page:1,
          pageSize:15,
        })
        that.getMore()
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
  getMore: function (page) {
		wx.showLoading({
			title: '加载中',
		})
    var that = this;
    if(that.data.tid==1){
      var url = app.globalData.url + '/api/selectForCollectArticle';
    }
    if(that.data.tid==4){
      var url = app.globalData.url + '/api/selectForCollectInvitation';
    }
    if(that.data.tid==5){
      var url = app.globalData.url + '/api/selectForCollectGoods';
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
              movieList: movieLists.concat(res.data),
              page: that.data.page + 1
            })
          } else {
            that.setData({
              movieList: res.data,
              page:  that.data.page  + 1
            })
          }
        }
        if(that.data.tid==4){
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
        if(that.data.tid==5){
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