// pages/pack/collegehuati/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieList:[],
    page:1,
    pageSize:10,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var name = options.name.split('#')
    this.setData({
      name:name[1]

    })
    this.getMore()
  },
  shoucangs:function(e){
    wx.showLoading({
      title: '加载中',
    })
    var status;
    if(e.currentTarget.dataset.collectstatus==0){
      status = 1
    }else{
      status = 2
    }
    var that = this
    var url = app.globalData.url + '/api/collectInvitation';
    var data = {
      userId:app.globalData.user_id,
      invitationId:e.currentTarget.dataset.id,
      status:status
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        var movieList = this.data.movieList
        for(var index in movieList) {
          if(e.currentTarget.dataset.id == movieList[index].id){
            if(e.currentTarget.dataset.collectstatus==0){
              movieList[index].collectStatus = 1
              movieList[index].collectionNum =  movieList[index].collectionNum +1
            }else{
              movieList[index].collectStatus = 0
              movieList[index].collectionNum =  movieList[index].collectionNum -1
            }
          }
         
        }
        that.setData({
          movieList:movieList
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
  dianzans:function(e){
    wx.showLoading({
      title: '加载中',
    })
    var status;
    if(e.currentTarget.dataset.givelikestatus==0){
      status = 1
    }else{
      status = 2
    }
    var that = this
    var url = app.globalData.url + '/api/givelikeInvitation';
    var data = {
      userId:app.globalData.user_id,
      invitationId:e.currentTarget.dataset.id,
      status:status,
      type:0
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        var movieList = this.data.movieList
        for(var index in movieList) {
          if(e.currentTarget.dataset.id == movieList[index].id){
            if(e.currentTarget.dataset.givelikestatus==0){
              movieList[index].givelikeStatus = 1
              movieList[index].giveLikeNum =  movieList[index].giveLikeNum +1
            }else{
              movieList[index].givelikeStatus = 0
              movieList[index].giveLikeNum =  movieList[index].giveLikeNum -1
            }
          }
         
        }
        that.setData({
          movieList:movieList
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
  shequdelit:function(e){
    wx.navigateTo({
      url: '/pages/pack/shequdelit/index?id=' + e.currentTarget.dataset.id,
    })
  },

  fatieFn:function(e){
    wx.navigateTo({
      url: '/pages/pack/collegefatie/index',
    })
  },
  getMore: function (page) {
		wx.showLoading({
			title: '加载中',
		})
    var that = this;
    var url = app.globalData.url + '/api/college/selectInvitationList';
    var data = {
      userId:app.globalData.user_id,
      pageNum:this.data.page,
      pageSize:this.data.pageSize,
      topic:this.data.name
		}

    app.wxRequest('POST', url, data, (res) => {
			console.log(res)
			wx.hideLoading()
      if (res.success) {
        for(var index in res.data.list){
          res.data.list[index].imgs = res.data.list[index].imgs.split(',')
        }
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