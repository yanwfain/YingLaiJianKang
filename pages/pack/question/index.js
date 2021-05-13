// pages/pack/question/index.js
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
    this.setData({
      id:options.id,
      typeid:options.typeid
    })
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    var url = app.globalData.url + '/api/college/selectLiveInfoById';
    var data = {
      id:options.id,
      userId:app.globalData.user_id
    }
    app.wxRequest('get', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        that.setData({
          userList:res.data
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
  gusnabiz:function(e){
    wx.showLoading({
      title: '加载中',
    })
    var status;
    if(this.data.userList.isAuthorStatus==0){
      status = 1
    }else{
      status = 2
    }
    var that = this
    var url = app.globalData.url + '/api/attentionUser';
    var data = {
      attUserId:this.data.userList.doctorId,
      userId:app.globalData.user_id,
      status:status
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
       if(this.data.userList.isAuthorStatus==0){
        this.data.userList.isAuthorStatus=1
       }else{
        this.data.userList.isAuthorStatus=0
       }
        that.setData({
          userList:that.data.userList
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
  submitBtn:function(e){
    this.setData({
      isDvip:false
    })
    wx.navigateTo({
      url: '/pages/pack/kaitongvip/index',
    })
  },
  getMore: function (page) {
		wx.showLoading({
			title: '加载中',
		})
    var that = this;
    var url = app.globalData.url + '/api/college/selectLiveQuestionListById';
    var data = {
      id:this.data.id,
      userId:app.globalData.user_id,
      pageNum:this.data.page,
      pageSize:this.data.pageSize,
		}

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
  shenjiVip:function(e){
    this.setData({
      isDvip:true
    })
  },
  isDvipFn:function(e){
    this.setData({
      isDvip:false
    })
  },
  jixsuFn:function(e){
    this.setData({
      isModels:false
    })
  },
  inpgour:function(e){
    this.setData({
      inptxt:true
    })
  },
  guanbi:function(e){
    this.setData({
      inptxt:false
    })
  },
  bindblur:function(e){
    this.setData({
      inptxt:false
    })
  },
  bindconfirm:function(e){
    var that = this
    var url = app.globalData.url + '/api/college/insertLiveQuestion';
    var data = {
      liveId:this.data.id,
      userId:app.globalData.user_id,
      content:this.data.inptxtval,
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        that.setData({
          inptxt:false,
          inptxtval:'',
          isModels:true,
          movieList:[],
          page:1,
        }) 
        that.getMore()
        wx.showToast({
          title: '评论成功等待审核',
          icon:'none'
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
  inptxtval:function(e){
    console.log(e)
    this.setData({
      inptxtval:e.detail.value
    })
  },
  /**bindconfirm
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
          isMember:res.data.userData.isMember
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
    console.log(e)
    var that = this;
    // 设置菜单中的转发按钮触发转发事件时的转发内容
    var shareObj = {
      title: '',        // 默认是小程序的名称(可以写slogan等)
      path: '/pages/pack/collegedelit/index?id=' + that.data.list_index.id + 'user_uuid=' + app.globalData.user_id,        // 默认是当前页面，必须是以‘/’开头的完整路径
      imageUrl: '',     //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
      success: function (res) {
        // 转发成功之后的回调
        console.log(res)
        if (res.errMsg == 'shareAppMessage:ok') {
        
        }
      },
      fail: function () {
        // 转发失败之后的回调
        if (res.errMsg == 'shareAppMessage:fail cancel') {
          // 用户取消转发
        } else if (res.errMsg == 'shareAppMessage:fail') {
          // 转发失败，其中 detail message 为详细失败信息
        }
      }
    }
    // 来自页面内的按钮的转发
    if (e.from == 'button') {
      var eData = e.target.dataset;
      console.log(that.data.id)
      console.log(that.data.list_index.id)
      console.log(eData.name);     // shareBtn
      // 此处可以修改 shareObj 中的内容
    
      var url = app.globalData.url + '/api/user/addForward';
      var data = {
        user_id: app.globalData.user_id,
        method_id: that.data.list_index.id
      }
      app.wxRequest('POST', url, data, (res) => {
        console.log(res)
        wx.hideLoading()
        if (res.code == 1) {
          shareObj.path = '/pages/pack/collegedelit/index?btn_name=' + eData.name + '&id=' + that.data.id + '&user_uuid=' + app.globalData.user_id +'&forward_id =' + res.data.id;
        } else {
          wx.showToast({
            title: '提交失败',
            icon: 'none'
          })
        }
      }, (err) => {
        wx.showToast({
          title: '提交失败',
        })
        console.log(err.errMsg)
      })
    　　}
    　　// 返回shareObj
    　　return shareObj;
  }
})