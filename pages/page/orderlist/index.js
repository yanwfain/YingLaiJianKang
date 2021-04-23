// pages/orderlist/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tid: '',
    movieList: [],
    page: 1,
    pageSize: 15,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.tid) {
      this.setData({
        tid: options.tid
      })
    }

   
  },
  querenFn:function(e){
    
    var that = this
    wx.showModal({
      title: '提示',
      content: '是否确认收货',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '加载中',
          })
          var url = app.globalData.url + '/api/takeOrder';
          var data = {
            orderNum: e.currentTarget.dataset.code
          }
          app.wxRequest('POST', url, data, (res) => {
            console.log(res)
            wx.hideLoading()
            if (res.success) {
              that.setData({
                movieList: [],
                page: 1,
                pageSize: 15,
              })
              that.getMore()
            } else {
              wx.showToast({
                title: res.error_message,
                icon: 'none'
              })
            }
          }, (err) => {
            wx.showToast({
              title: '提交失败',
            })
            console.log(err.errMsg)
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  deleFns: function (e) {
  
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定要取消该订单么？',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '加载中',
          })
          var url = app.globalData.url + '/api/cancelOrder';
          var data = {
            orderNum: e.currentTarget.dataset.code
          }
          app.wxRequest('POST', url, data, (res) => {
            console.log(res)
            wx.hideLoading()
            if (res.success) {
              that.setData({
                movieList: [],
                page: 1,
                pageSize: 15,
              })
              that.getMore()
            } else {
              wx.showToast({
                title: res.error_message,
                icon: 'none'
              })
            }
          }, (err) => {
            wx.showToast({
              title: '提交失败',
            })
            console.log(err.errMsg)
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },
  deleFnshan: function (e) {
  
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定要删除该订单么？',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '加载中',
          })
          var url = app.globalData.url + '/api/deleteOrder';
          var data = {
            orderNum: e.currentTarget.dataset.code
          }
          app.wxRequest('POST', url, data, (res) => {
            console.log(res)
            wx.hideLoading()
            if (res.success) {
              that.setData({
                movieList: [],
                page: 1,
                pageSize: 15,
              })
              that.getMore()
            } else {
              wx.showToast({
                title: res.error_message,
                icon: 'none'
              })
            }
          }, (err) => {
            wx.showToast({
              title: '提交失败',
            })
            console.log(err.errMsg)
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },
  wuliu:function(e){
    wx.navigateTo({
      url: '/pages/pagetwo/wuliudelit/index?code=' + e.currentTarget.dataset.code,
    })
  },
  tixinFn: function (e) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    var url = app.globalData.url + '/api/remindDelivery';
    var data = {
      orderNum: e.currentTarget.dataset.code
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        wx.showToast({
          title: '提醒成功',
        })
      } else {
        wx.showToast({
          title: res.error_message,
          icon: 'none'
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
    var url = app.globalData.url + '/api/getOrderListByUserId';
    var data = {
      userId: app.globalData.user_id,
      pageNum: this.data.page,
      pageSize: this.data.pageSize,
      status: this.data.tid ? this.data.tid : 0
    }
    console.log(page)
    console.log(url)
    app.wxRequest('GET', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        if (that.data.page > 1) {
          var movieLists = that.data.movieList;
          that.setData({
            movieList: movieLists.concat(res.data.list),
            page: that.data.page + 1
          })
        } else {
          that.setData({
            movieList: res.data.list,
            page: that.data.page + 1
          })
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
  clickFn: function (e) {
    this.setData({
      tid: e.currentTarget.dataset.id
    })
    this.setData({
      movieList: [],
      page: 1,
      pageSize: 15,
    })
    this.getMore()
  },
  delit: function (e) {
    wx.navigateTo({
      url: '/pages/pack/delit/index?id=' + e.currentTarget.dataset.id,
    })
  },
  pingjiaFn: function (e) {
    var movieList_ = this.data.movieList
    var listcont;
    for(var index in movieList_){
      if(e.currentTarget.dataset.id==movieList_[index].id){
        listcont = JSON.stringify(movieList_[index].productList)
      }
    }
    wx.navigateTo({
      url: '/pages/pagetwo/pingjiasubmit/index?listcont=' + listcont,
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
    this.setData({
      movieList: [],
      page: 1,
      pageSize: 15,
    })
    this.getMore()
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