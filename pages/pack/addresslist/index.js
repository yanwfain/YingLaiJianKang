// pages/addresslist/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
		movieList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  binaddress: function (e) {
    var that = this;
    wx.getSetting({
      success(res) {
        console.log("vres.authSetting['scope.address']：", res.authSetting['scope.address'])
        if (res.authSetting['scope.address']) {
          console.log("111")
          wx.chooseAddress({
            success(res) {
              that.setData({
                userName:res.userName,
                provinceName:res.provinceName,
                cityName:res.cityName,
                detailInfo:res.detailInfo,
                nationalCode:res.nationalCode,
                telNumber:res.telNumber
              })
              let pages = getCurrentPages(); //获取当前页面pages里的所有信息。
              let prevPage = pages[pages.length - 2]; //prevPage 是获取上一个页面的js里面的pages的所有信息。-2 是上一个页面，-3是上上个页面以此类推。 
                                        
              prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
                userName:res.userName,
                provinceName:res.provinceName,
                cityName:res.cityName,
                detailInfo:res.detailInfo,
                nationalCode:res.nationalCode,
                telNumber:res.telNumber
              })
              var url = app.globalData.url + '/orderc/saveAddress';
              var data = {
                id:that.data.id?that.data.id:'',
                user_id:app.globalData.user_id,
                address:res.detailInfo,
                // console.log(res.provinceName)
                // console.log(res.cityName)
                // console.log(res.countyName)
                zone:res.provinceName +res.cityName  + res.countyName ,
                status:1,
                phone:res.telNumber,
                receiver:res.userName
              }
              app.wxRequest('POST', url, data, (res) => {
                console.log(res)
                wx.hideLoading()
                if (res.success) {
                  wx.navigateBack({
                    delta: 1,  // 返回上一级页面。
                    success: function () {
                      console.log('成功！')
                    }
                  })
                } else {
                  wx.showToast({
                    title: res.data,
                    icon:'none'
                  })
                }
              }, (err) => {
                wx.showToast({
                  title: '提交失败',
                })
                console.log(err.errMsg)
              })
            
              console.log(res.userName)
              console.log(res.postalCode)
              console.log(res.provinceName)
              console.log(res.cityName)
              console.log(res.countyName)
              console.log(res.detailInfo)
              console.log(res.nationalCode)
              console.log(res.telNumber)
            }
          })
    
        } else {
          if (res.authSetting['scope.address'] == false) {
            console.log("222")
            wx.openSetting({
              success(res) {
                console.log(res.authSetting)

              }
            })
          } else {
            console.log("eee")
            wx.chooseAddress({
              success(res) {
                console.log(res.userName)
                console.log(res.postalCode)
                console.log(res.provinceName)
                console.log(res.cityName)
                console.log(res.countyName)
                console.log(res.detailInfo)
                console.log(res.nationalCode)
                console.log(res.telNumber)
              }
            })
          }
        }
      }
    })
  },
  getMore: function (page) {
		wx.showLoading({
			title: '加载中',
		})
		var that = this;
    var url = app.globalData.url + '/orderc/getUserAddressList';
    var data = {
      user_id:app.globalData.user_id,
      page:that.data.page
		}
		console.log(page)
		console.log(url)
    app.wxRequest('POST', url, data, (res) => {
			console.log(res)
			wx.hideLoading()
      if (res.success) {
        if (that.data.page > 1) {
          var movieLists = that.data.movieList;
          that.setData({
            movieList: movieLists.concat(res.data),
            page: page + 1
          })
        } else {
          that.setData({
            movieList: res.data,
            page: page + 1
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
  addressFn:function(e){
    wx.navigateTo({
      url: '/pages/pack/addAddress/index',
    })
  },
  bianjiFn:function(e){
    wx.navigateTo({
      url: '/pages/pack/addAddress/index?goid=' + 1 + '&id=' + e.currentTarget.dataset.id,
    })
  },
  bincheck:function(e){
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    var url = app.globalData.url + '/orderc/updateAddressStatus';
    var data = {
      user_id:app.globalData.user_id,
      status:1,
      id:e.currentTarget.dataset.id
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        wx.navigateBack({
          delta: 1,  // 返回上一级页面。
          success: function () {
            console.log('成功！')
          }
        })
      } else {
        wx.showToast({
          title: res.data,
          icon:'none'
        })
      }
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
      console.log(err.errMsg)
    })
    this.setData({
      ischecked:e.currentTarget.dataset.id
    })
  },
  /*  *
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    console.log(that.data)
    that.getMore()
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