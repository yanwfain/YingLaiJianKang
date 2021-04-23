// pages/alllistpin/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nutid:4,
    movieList:[],
    page:1,
    pageSize:15,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id
    })
    this.getMore()
  },
  getMore: function (page) {
		wx.showLoading({
			title: '加载中',
		})
		var that = this;
    var url = app.globalData.url + '/api/shop/selectGoodsReplyByProductId';
    var data = {
      productId:this.data.id,
      pageNum:this.data.page,
      pageSize:this.data.pageSize,
		}
		console.log(page)
		console.log(url)
    app.wxRequest('GET', url, data, (res) => {
			console.log(res)
			wx.hideLoading()
      if (res.success) {
        for(var index in res.data.list){
          if( res.data.list[index].pics){
            res.data.list[index].pics= JSON.parse(res.data.list[index].pics)
          }
          
        }
        if (that.data.page > 1) {
          var movieLists = that.data.movieList;
          that.setData({
            movieList: movieLists.concat(res.data.list),
            page: that.data.page + 1,
            total:res.data.total
          })
        } else {
          that.setData({
            movieList: res.data.list,
            page:  that.data.page  + 1,
            total:res.data.total

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
  topic_preview: function (e) {
    var that = this;
    var url = e.currentTarget.dataset.url;
    console.log(url)
    //通过循环在数据链里面找到和这个id相同的这一组数据，然后再取出这一组数据当中的图片
 
    var data = []
    for(var index in this.data.movieList){
      if(e.currentTarget.dataset.id==this.data.movieList[index].id){
        console.log(this.data.movieList[index].pics)
          for(var inde in this.data.movieList[index].pics){
            console.log(this.data.movieList[index].pics[inde].url2)
            data.push(this.data.movieList[index].pics[inde].url2)
          }
       
      }
    }
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: data // 需要预览的图片http链接列表
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