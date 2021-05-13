// pages/college/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tid:1,
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
    ],
    strategy:[
      {
        image:'http://47.94.16.158:8001/262.png'
      },
      {
        image:'http://47.94.16.158:8001/262.png'
      },
      {
        image:'http://47.94.16.158:8001/262.png'
      },
      {
        image:'http://47.94.16.158:8001/262.png'
      },
    ],
    movieList:[],
    page:1,
    pageSize:10,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  goChannel:function(e){
    wx.navigateTo({
      url: e.currentTarget.dataset.jumppage,
    })
  },

  shequdelit:function(e){
    wx.navigateTo({
      url: '/pages/pack/shequdelit/index?id=' + e.currentTarget.dataset.id,
    })
  },
  kachihua:function(e){
    wx.navigateTo({
      url: '/pages/pack/collegehuati/index?name=' + e.currentTarget.dataset.name,
    })
  },
  fatieFn:function(e){
    wx.navigateTo({
      url: '/pages/pack/collegefatie/index',
    })
  },
  delitvideo:function(e){
    wx.navigateTo({
      url: '/pages/pack/collegevideolist/index?id=' + e.currentTarget.dataset.id,
    })
  },
  delit:function(e){
    wx.navigateTo({
      url: '/pages/pack/collegedelit/index?id=' + e.currentTarget.dataset.id,
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
      page:1,
      movieList:[]
    })
		// that.getMore(that.data.page)
    console.log(this.data.keyword)
  },
  delitcilss:function(e){
    wx.navigateTo({
      url: '/pages/pack/collegecdelit/index?tid=' + e.currentTarget.dataset.id,
    })
  },
  tiwentFn:function(e){
    wx.navigateTo({
      url: '/pages/pack/question/index?id=' + e.currentTarget.dataset.id + '&typeid=' + 1,
    })
  },
  tiwentFn1:function(e){
    wx.navigateTo({
      url: '/pages/pack/question/index?id=' + e.currentTarget.dataset.id + '&typeid=' + 2,
    })
  },
  tiwentFn2:function(e){
    wx.navigateTo({
      url: '/pages/pack/question/index?id=' + e.currentTarget.dataset.id + '&typeid=' + 3,
    })
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
    this.cityUrlcom()
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
  cityUrlcom:function(e){
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    if(this.data.tid==1){
      var url = app.globalData.url + '/api/college/speakingSugarIndex';
    }
    if(this.data.tid==2){
      var url = app.globalData.url + '/api/college/studioIndex';
    }
    if(this.data.tid==3){
      var url = app.globalData.url + '/api/college/selectTopicList';
    }
    var data = {
      userId:app.globalData.user_id,
    }
    app.wxRequest('get', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        if(that.data.tid==1){
          that.setData({
            speaking:res.data
          })
        }
        if(that.data.tid==2){
          that.setData({
            studio:res.data
          })
        }
        if(that.data.tid==3){
          that.setData({
            selectTopicList:res.data
          })
        }
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
    if(this.data.tid==3){
      this.setData({
        movieList:[],
        page:1,
      })
      that.getMore()
    }
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
        that.cityUrlcom()
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