// pages/yinshirj/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tid:1,
    movieList:[],
    page:1
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  click:function(e){
    this.setData({
      tid: e.currentTarget.dataset.id
    })
    if(e.currentTarget.dataset.id==2){
      var that = this;
      this.setData({
        page:1,
        movieList:[],
        startTime:'',
        date_time:''
      })
      wx.showLoading({
        title:'加载中'
      })
      that.getMore()
    }
  },
  getMore: function (page) {
		wx.showLoading({
			title: '加载中',
		})
		var that = this;
    var url = app.globalData.url + '/api/selectTodayDietAll';
    var data = {
      userId:app.globalData.user_id,
      createTime:this.data.date_time?this.data.date_time:'',
      startTime:this.data.startTime?this.data.startTime:''
		}
    app.wxRequest('GET', url, data, (res) => {
			console.log(res)
			wx.hideLoading()
      if (res.success) {
			  for(var index in res.data.timeList){
          for(var inde in res.data.timeList[index].dietList){
            if(res.data.timeList[index].dietList[inde].img){
              res.data.timeList[index].dietList[inde].img = JSON.parse(res.data.timeList[index].dietList[inde].img)
             }
          }
         
        }
        console.log(res.data.timeList)
        if (that.data.page > 1) {
          var movieLists = that.data.movieList;
          that.setData({
            movieList: movieLists.concat(res.data.timeList),
            page: that.data.page + 1,
            startTime:res.data.timeList[res.data.timeList.length-1].createTime
          })
        } else {
          that.setData({
            movieList: res.data.timeList,
            page: that.data.page + 1,
            startTime:res.data.timeList[res.data.timeList.length-1].createTime
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
		console.log(that.data.imglist)
		var id = e.currentTarget.dataset.id;
		var url = e.currentTarget.dataset.url;
    var imglist = []
    for(var index in that.data.list){
      if(id ==that.data.list[index].id ){
        for(var inde in that.data.list[index].img){
          imglist.push(that.data.list[index].img[inde].url2)
        }
      }
    }

		// for(var index in that.data.imglist){
		// 	imglist.push(that.data.imglist[index].imgUrl)
		// }
		//通过循环在数据链里面找到和这个id相同的这一组数据，然后再取出这一组数据当中的图片
		wx.previewImage({
			current: url, // 当前显示图片的http链接
			urls: imglist // 需要预览的图片http链接列表
		})

	},
  jilupageFn:function(e){
    wx.navigateTo({
      url: '/pages/pack/addjilupage/index?id=' + e.currentTarget.dataset.id + '&time=' +e.currentTarget.dataset.time ,
    })
  },
  jilupageFnst:function(e){
    wx.navigateTo({
      url: '/pages/pack/addyinyang/index?id=' + e.currentTarget.dataset.id + '&time=' +e.currentTarget.dataset.time ,
    })
  },
  jilupageFns:function(e){
    wx.navigateTo({
      url: '/pages/pack/addheshuil/index?id=' + e.currentTarget.dataset.id + '&time=' +e.currentTarget.dataset.time ,
    })
  },
  changeDate(e) {
    console.log(e)
    this.setData({ date_time: e.detail.value });
    var that = this;
    this.setData({
      page:1,
      movieList:[],
      startTime:''
    })
    wx.showLoading({
      title:'加载中'
    })
    that.getMore()
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
    var that = this;
      this.setData({
        page:1,
        movieList:[],
        startTime:''
      })
      wx.showLoading({
        title:'加载中'
      })
      that.getMore()
    wx.showLoading({
      title:'加载中'
    })
    var url = app.globalData.url + '/api/selectTodayDietByUserId';
    var data = {
      userId:app.globalData.user_id
    }
    app.wxRequest('get', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
       for(var index in res.data.dietList){
         if(res.data.dietList[index].img){
          res.data.dietList[index].img = JSON.parse(res.data.dietList[index].img)
         }
         var time = res.data.dietList[index].dayTime.split(' ')
         res.data.dietList[index].dayTime =time[0]
       }
       console.log(res.data.dietList)
        that.setData({
          list:res.data.dietList
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

    if(!this.data.date_time){
   
      wx.showLoading({
        title: '加载中',
      })
      var that = this;
      that.getMore(that.data.page)
    }
   
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})