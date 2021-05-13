// pages/pack/shequdelit/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieList: [],
    page: 1,
    pageSize: 10,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      id: options.id,
      usid:app.globalData.user_id
    })
   
    this.getMore()

  },
  isdeit:function(e){
    var that = this
    var url = app.globalData.url + '/api/college/selectInvitationInfo';
    var data = {
      invitationId: this.data.id,
      userId: app.globalData.user_id,
    }
    app.wxRequest('get', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        res.data.imgs = res.data.imgs.split(',')
        that.setData({
          userList: res.data
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
  gusnabiz: function (e) {
    wx.showLoading({
      title: '加载中',
    })
    var status;
    if (this.data.userList.isAuthorStatus == 0) {
      status = 1
    } else {
      status = 2
    }
    var that = this
    var url = app.globalData.url + '/api/attentionUser';
    var data = {
      attUserId: this.data.userList.userId,
      userId: app.globalData.user_id,
      status: status
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        if (this.data.userList.isAuthorStatus == 0) {
          this.data.userList.isAuthorStatus = 1
        } else {
          this.data.userList.isAuthorStatus = 0
        }
        that.setData({
          userList: that.data.userList
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
  user_delitks: function (e) {
    wx.navigateTo({
      url: '/pages/pack/dongtai/index?userid=' +e.currentTarget.dataset.id + '&typeid=' + 2 ,
    })
  },
  huifus: function (e) {
    this.setData({
      inptxt: true,
      huifuid: e.currentTarget.dataset.id
    })
  },
  shoucangs: function (e) {
    wx.showLoading({
      title: '加载中',
    })
    var status;
    if (e.currentTarget.dataset.collectstatus == 0) {
      status = 1
    } else {
      status = 2
    }
    var that = this
    var url = app.globalData.url + '/api/collectInvitation';
    var data = {
      userId: app.globalData.user_id,
      invitationId: e.currentTarget.dataset.id,
      status: status
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        var userList = that.data.userList
        if (e.currentTarget.dataset.collectstatus == 0) {
          userList.collectStatus = 1
          userList.collectionNum = userList.collectionNum + 1
        } else {
          userList.collectStatus = 0
          userList.collectionNum = userList.collectionNum - 1
        }
        that.setData({
          userList: userList
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
  dianzans: function (e) {
    wx.showLoading({
      title: '加载中',
    })
    var status;
    if (e.currentTarget.dataset.givelikestatus == 0) {
      status = 1
    } else {
      status = 2
    }
    var that = this
    var url = app.globalData.url + '/api/givelikeInvitation';
    var data = {
      userId: app.globalData.user_id,
      invitationId: e.currentTarget.dataset.id,
      status: status,
      type:0
    }
    app.wxRequest('post', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        var userList = that.data.userList
        if (e.currentTarget.dataset.givelikestatus == 0) {
          userList.givelikeStatus = 1
          userList.giveLikeNum = userList.giveLikeNum + 1
        } else {
          userList.givelikeStatus = 0
          userList.giveLikeNum = userList.giveLikeNum - 1
        }
        that.setData({
          userList: userList
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
  dianzanspl:function(e){
    wx.showLoading({
      title: '加载中',
    })
    var status;
    if (e.currentTarget.dataset.givelikestatus == 0) {
      status = 1
    } else {
      status = 2
    }
    var that = this
    var url = app.globalData.url + '/api/givelikeInvitation';
    var data = {
      userId: app.globalData.user_id,
      invitationId: e.currentTarget.dataset.id,
      status: status,
      type:1
    }
    app.wxRequest('post', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        var movieList = that.data.movieList
        for(var index in movieList){
          if(e.currentTarget.dataset.id == movieList[index].id){
            if (e.currentTarget.dataset.givelikestatus == 0) {
              movieList[index].giveLikeStatus = 1
              movieList[index].giveLikeNum =  movieList[index].giveLikeNum  +1
            }else{
              movieList[index].giveLikeStatus = 0
              movieList[index].giveLikeNum =  movieList[index].giveLikeNum -1
            }
          }
        }
     
        that.setData({
          movieList: movieList
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
    var url = app.globalData.url + '/api/college/selectInvitationComment';
    var data = {
      artId:this.data.id,

      uid: app.globalData.user_id,
      pageNum: this.data.page,
      pageSize: this.data.pageSize,
    }

    app.wxRequest('get', url, data, (res) => {
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

  jixsuFn: function (e) {
    this.setData({
      isModels: false
    })
  },
  inpgour: function (e) {
    this.setData({
      inptxt: true
    })
  },
  guanbi: function (e) {
    this.setData({
      inptxt: false
    })
  },
  bindblur: function (e) {
    this.setData({
      inptxt: false
    })
  },
  bindconfirm: function (e) {
    var that = this
    var url = app.globalData.url + '/api/college/insertInvitationComment';
    var data = {

      artId: this.data.id,

      uid: app.globalData.user_id,
      comment: this.data.inptxtval,
      pid: this.data.huifuid ? this.data.huifuid : 0
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        that.setData({
          inptxt: false,
          inptxtval: '',
          isModels: true,
          // movieList: [],
          // page: 1,
        })
        // that.getMore()
        wx.showToast({
          title: '评论成功等待审核',
          icon: 'none'
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
  inptxtval: function (e) {
    console.log(e)
    this.setData({
      inptxtval: e.detail.value
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
    this.isdeit()
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