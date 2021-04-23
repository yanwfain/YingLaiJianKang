// pages/classcity/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieList:[],
    page:1,
    pageSize:15,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    var url = app.globalData.url + '/api/shop/selectGoodsCategory';
    var data = {

    }
    app.wxRequest('get', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        that.setData({
          list:res.data,
          tabid:res.data[0].id
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
  },
  getMore: function (page) {
		wx.showLoading({
			title: '加载中',
		})
    var that = this;
    var url = app.globalData.url + '/api/shop/selectGoodsList';

    var data = {
      goodType:this.data.tabid?this.data.tabid:this.data.list[0].id,
      pageNum:this.data.page,
      pageSize:this.data.pageSize,
      name:this.data.keyword?this.data.keyword:''
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
            page:  that.data.page  + 1
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
  bindconfirm:function(e){
    var that = this;
    var discountName = e.detail.value['search - input'] ? e.detail.value['search - input'] : e.detail.value
    console.log('内容为', discountName)
    this.setData({
      keyword: discountName,
		})
    this.setData({
      movieList:[],
      page:1,
      pageSize:15,
    })
		that.getMore(that.data.page)
    console.log(this.data.keyword)
  },
  tabFn:function(e){
    console.log(e)
    console.log(e.currentTarget.dataset.id)
    this.setData({
      tabid: e.currentTarget.dataset.id,
      movieList:[],
      page:1,
      pageSize:15,
      // toView: e.currentTarget.dataset.id
    })
    
    var that = this;
		that.getMore(that.data.page)
  },
  shopdelit:function(e){
    wx.navigateTo({
      url: '/pages/pagetwo/shopdelit/index?id= ' + e.currentTarget.dataset.id,
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