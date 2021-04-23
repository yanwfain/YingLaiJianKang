// pages/jkjiancha/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  delitFn:function(e){
    var listimg = this.data.listimg
    // var array ;
    // for(var index in listimg){
    //   if(e.currentTarget.dataset.id == listimg[index].id){
    //     array =  JSON.stringify(listimg[index]) 
    //   }
    // }
    wx.navigateTo({
      url: '/pages/pack/formpage/index?id=' + e.currentTarget.dataset.id + '&type=' + e.currentTarget.dataset.type,
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
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    var url = app.globalData.url + '/api/selectBillByUserId';
    var data = {
      userId:app.globalData.user_id,
    }
    app.wxRequest('get', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        for(var index in res.data.billList){
          res.data.billList[index].biochemistry = JSON.parse(res.data.billList[index].biochemistry)
          res.data.billList[index].cReactive = JSON.parse(res.data.billList[index].cReactive)
          res.data.billList[index].islets = JSON.parse(res.data.billList[index].islets)
          res.data.billList[index].routineBlood = JSON.parse(res.data.billList[index].routineBlood)
          res.data.billList[index].saccharify = JSON.parse(res.data.billList[index].saccharify)
          res.data.billList[index].serumAlbumin = JSON.parse(res.data.billList[index].serumAlbumin)
          res.data.billList[index].urinalysis = JSON.parse(res.data.billList[index].urinalysis)
          if( res.data.billList[index].saccharifyVal ){
            res.data.billList[index].saccharifyVal = JSON.parse(res.data.billList[index].saccharifyVal)
            res.data.billList[index].serumVal = JSON.parse(res.data.billList[index].serumVal)
          }
        }

        that.setData({
          listimg:res.data.billList,
          allnun:  res.data.billList[index].biochemistry.length + res.data.billList[index].cReactive.length+res.data.billList[index].islets.length+res.data.billList[index].routineBlood.length+res.data.billList[index].saccharify.length+res.data.billList[index].serumAlbumin.length+res.data.billList[index].urinalysis.length
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})