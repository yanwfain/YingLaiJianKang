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
    console.log(options)
    this.setData({
      typeid:options.typeid,
      uid:options.userid,
      user_id:app.globalData.user_id
    })
    if(this.data.typeid){
      wx.showLoading({
        title: '加载中',
      })
      var that = this
      var url = app.globalData.url + '/api/selectUserAttentionStatus';
      var data = {
        userId:app.globalData.user_id,
        attUserId:this.data.uid
      }
      app.wxRequest('get', url, data, (res) => {
        console.log(res)
        wx.hideLoading()
        if (res.success) {
          that.setData({
            isGuan:res.data
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
    }
    this.getMore()
  },
  isGuan:function(e){
    wx.showLoading({
      title: '加载中',
    })
    var status;
    if (this.data.isGuan==0) {
      status = 1
    } else {
      status = 2
    }
    var that = this
    var url = app.globalData.url + '/api/attentionUser';
    var data = {
      attUserId: this.data.uid,
      userId: app.globalData.user_id,
      status: status
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        if(this.data.isGuan==0){
          this.setData({
            isGuan:1
          })
        }else{
          this.setData({
            isGuan:0
          })
        }
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
    if(that.data.tid==1){
      var url = app.globalData.url + '/api/selectUserInvitation';
    }
    if(that.data.tid==2){
      var url = app.globalData.url + '/api/selectInvitationCommentByArtId';
    }
    if(that.data.tid==3){
      var url = app.globalData.url + '/api/selectUserGiveLikeInvitation';
    }
    var data = {
      userId:this.data.uid?this.data.uid:app.globalData.user_id,
      pageNum:this.data.page,
      pageSize:this.data.pageSize,
    }
    if(this.data.uid){
      data.userIdTwo = app.globalData.user_id
    }
		console.log(page)
		console.log(url)
    app.wxRequest('GET', url, data, (res) => {
			console.log(res)
			wx.hideLoading()
      if (res.success) {
        if(that.data.tid==1||that.data.tid==3){
          for(var index in res.data.list){
            res.data.list[index].imgs = res.data.list[index].imgs.split(",")
          }
          console.log(res.data.list)
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
  TiezanFn:function(e){
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    
    if(e.currentTarget.dataset.givelikestatus==0){
      var url = app.globalData.url + '/api/givelikeInvitation';
      var data = {
        userId:app.globalData.user_id,
        invitationId:e.currentTarget.dataset.id,
        status:1
      }
      app.wxRequest('POST', url, data, (res) => {
        console.log(res)
        wx.hideLoading()
        if (res.success) {
          var movieList = that.data.movieList
         for(var index in movieList){
           if(e.currentTarget.dataset.id == movieList[index].id){
            movieList[index].giveLikeStatus = 1
            movieList[index].giveLikeNum = movieList[index].giveLikeNum+1
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
    }
    if(e.currentTarget.dataset.givelikestatus>0){
      var url = app.globalData.url + '/api/givelikeInvitation';
      var data = {
        userId:app.globalData.user_id,
        invitationId:e.currentTarget.dataset.id,
        status:2
      }
      app.wxRequest('POST', url, data, (res) => {
        console.log(res)
        wx.hideLoading()
        if (res.success) {
          var movieList = that.data.movieList
         for(var index in movieList){
           if(e.currentTarget.dataset.id == movieList[index].id){
            movieList[index].giveLikeStatus = 0
            movieList[index].giveLikeNum = movieList[index].giveLikeNum-1

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
    }
  },
  TiezanFn1:function(e){
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
              movieList[index].giveLikeTwoStatus = 1
              movieList[index].giveLikeNum =  movieList[index].giveLikeNum +1
            }else{
              movieList[index].giveLikeTwoStatus = 0
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
  shouTFn:function(e){
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    if(e.currentTarget.dataset.collectionstatus==0){
      var url = app.globalData.url + '/api/collectInvitation';
      var data = {
        userId:app.globalData.user_id,
        invitationId:e.currentTarget.dataset.id,
        status:1
      }
      app.wxRequest('POST', url, data, (res) => {
        console.log(res)
        wx.hideLoading()
        if (res.success) {
          var movieList = that.data.movieList
         for(var index in movieList){
           if(e.currentTarget.dataset.id == movieList[index].id){
            movieList[index].collectionStatus = 1
            movieList[index].collectionNum = movieList[index].collectionNum+1
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
    }
    if(e.currentTarget.dataset.collectionstatus>0){
      var url = app.globalData.url + '/api/collectInvitation';
      var data = {
        userId:app.globalData.user_id,
        invitationId:e.currentTarget.dataset.id,
        status:2
      }
      app.wxRequest('POST', url, data, (res) => {
        console.log(res)
        wx.hideLoading()
        if (res.success) {
          var movieList = that.data.movieList
         for(var index in movieList){
           if(e.currentTarget.dataset.id == movieList[index].id){
            movieList[index].collectionStatus = 0
            movieList[index].collectionNum = movieList[index].collectionNum-1

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
    }
  },
  shouTFn2:function(e){
    wx.showLoading({
      title: '加载中',
    })
    var status;
    if(e.currentTarget.dataset.collectionstatus==0){
      status = 1
    }else{
      status = 2
    }
    var that = this
    var url = app.globalData.url + '/api/collectInvitation';
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
            if(e.currentTarget.dataset.collectionstatus==0){
              movieList[index].collectionTwoStatus = 1
              movieList[index].collectionNum =  movieList[index].collectionNum +1
            }else{
              movieList[index].collectionTwoStatus = 0
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
  zanquFn:function(e){
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    var url = app.globalData.url + '/api/givelikeInvitation';
    var data = {
      userId:app.globalData.user_id,
      invitationId:e.currentTarget.dataset.id,
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
      userId:this.data.uid?this.data.uid:app.globalData.user_id
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