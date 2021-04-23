// pages/meportimg/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    var url = app.globalData.url + '/api/selectUserPhotoByUserId';
    var data = {
      userId:app.globalData.user_id,
    }
    app.wxRequest('get', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        for(var index in res.data.photoList){
          var arrimg = res.data.photoList[index].time.split(" ")
          console.log(arrimg)
          var timelist = arrimg[0].split("-")
          res.data.photoList[index].chekend = false
          res.data.photoList[index].time = timelist[1]
          res.data.photoList[index].time1 = timelist[2]
          res.data.photoList[index].positive = JSON.parse( res.data.photoList[index].positive)
          res.data.photoList[index].side = JSON.parse( res.data.photoList[index].side)

        }
        console.log(res.data.photoList)
        that.setData({
          listimg:res.data.photoList,
          indexs:res.data.photoList.length - 1,
          
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
  chekend:function(e){
    var listimg = this.data.listimg
    var list = this.data.list
    for(var index in listimg){
     
      if(e.currentTarget.dataset.id==listimg[index].id){
        if(!e.currentTarget.dataset.chekend){
          listimg[index].chekend  =  true
          list.push(listimg[index].id)
        }
      if (e.currentTarget.dataset.chekend) {
        listimg[index].chekend  =  false
        for (var idx in list) {
          if(listimg[index].id==list[idx]){
            list.splice(index, 1);
          }
        }
      }
    }
    }
    this.setData({
      listimg:listimg,
      list:list
    })
    console.log(list)
  },
  shencheng:function(e){
    wx.navigateTo({
      url: '/pages/pagetwo/shnegchengmeport/index?list=' + this.data.list,
    })
  },
  submitd:function(e){
    this.setData({
      chekend:true
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})