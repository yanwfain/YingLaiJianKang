// pages/formpage/index.js
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
    console.log(options)
    this.setData({
      type: options.type,
      id: options.id
    })
  },
  topic_preview: function (e) {
    var that = this;

    var url = e.currentTarget.dataset.url;
    var imglist = []

    for (var index in that.data.biochemistry) {
      imglist.push(that.data.biochemistry[index].url2)
    }
    //通过循环在数据链里面找到和这个id相同的这一组数据，然后再取出这一组数据当中的图片
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: imglist // 需要预览的图片http链接列表
    })
  },
  routineBlood: function (e) {
    var that = this;

    var url = e.currentTarget.dataset.url;
    var imglist = []

    for (var index in that.data.routineBlood) {
      imglist.push(that.data.routineBlood[index].url2)
    }
    //通过循环在数据链里面找到和这个id相同的这一组数据，然后再取出这一组数据当中的图片
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: imglist // 需要预览的图片http链接列表
    })
  },
  saccharify: function (e) {
    var that = this;

    var url = e.currentTarget.dataset.url;
    var imglist = []

    for (var index in that.data.saccharify) {
      imglist.push(that.data.saccharify[index].url2)
    }
    //通过循环在数据链里面找到和这个id相同的这一组数据，然后再取出这一组数据当中的图片
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: imglist // 需要预览的图片http链接列表
    })
  },
  urinalysis: function (e) {
    var that = this;

    var url = e.currentTarget.dataset.url;
    var imglist = []

    for (var index in that.data.urinalysis) {
      imglist.push(that.data.urinalysis[index].url2)
    }
    //通过循环在数据链里面找到和这个id相同的这一组数据，然后再取出这一组数据当中的图片
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: imglist // 需要预览的图片http链接列表
    })
  },
  serumAlbumin: function (e) {
    var that = this;

    var url = e.currentTarget.dataset.url;
    var imglist = []

    for (var index in that.data.serumAlbumin) {
      imglist.push(that.data.serumAlbumin[index].url2)
    }
    //通过循环在数据链里面找到和这个id相同的这一组数据，然后再取出这一组数据当中的图片
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: imglist // 需要预览的图片http链接列表
    })
  },
  islets: function (e) {
    var that = this;

    var url = e.currentTarget.dataset.url;
    var imglist = []

    for (var index in that.data.islets) {
      imglist.push(that.data.islets[index].url2)
    }
    //通过循环在数据链里面找到和这个id相同的这一组数据，然后再取出这一组数据当中的图片
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: imglist // 需要预览的图片http链接列表
    })
  },
  cReactive: function (e) {
    var that = this;

    var url = e.currentTarget.dataset.url;
    var imglist = []

    for (var index in that.data.cReactive) {
      imglist.push(that.data.cReactive[index].url2)
    }
    //通过循环在数据链里面找到和这个id相同的这一组数据，然后再取出这一组数据当中的图片
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: imglist // 需要预览的图片http链接列表
    })
  },
  genxinFn:function(e){
    wx.navigateTo({
      url: '/pages/pack/huayan/index?id=' + this.data.id + '&type=' + this.data.type,
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
    if (this.data.type == 1) {
      var url = app.globalData.url + '/api/selectTaskBillById';
    }
    if (this.data.type == 0) {
      var url = app.globalData.url + '/api/selectCamperBillById';
    }
    var data = {
      id: this.data.id,
    }
    app.wxRequest('get', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        if (res.data.saccharifyVal) {
          res.data.saccharifyVal = JSON.parse(res.data.saccharifyVal)
          res.data.serumVal = JSON.parse(res.data.serumVal)
          that.setData({


          })
        }
        that.setData({
          testDate: res.data.testDate,
          biochemistry: JSON.parse(res.data.biochemistry),
          routineBlood: JSON.parse(res.data.routineBlood),
          saccharify: JSON.parse(res.data.saccharify),
          urinalysis: JSON.parse(res.data.urinalysis),
          serumAlbumin: JSON.parse(res.data.serumAlbumin),
          islets: JSON.parse(res.data.islets),
          cReactive: JSON.parse(res.data.cReactive),
        })
        console.log(JSON.parse(res.data.biochemistry))
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