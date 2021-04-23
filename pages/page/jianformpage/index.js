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
  electrocardiogram: function (e) {
    var that = this;

    var url = e.currentTarget.dataset.url;
    var imglist = []

    for (var index in that.data.electrocardiogram) {
      imglist.push(that.data.electrocardiogram[index].url2)
    }
    //通过循环在数据链里面找到和这个id相同的这一组数据，然后再取出这一组数据当中的图片
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: imglist // 需要预览的图片http链接列表
    })
  },
  neck: function (e) {
    var that = this;

    var url = e.currentTarget.dataset.url;
    var imglist = []

    for (var index in that.data.neck) {
      imglist.push(that.data.neck[index].url2)
    }
    //通过循环在数据链里面找到和这个id相同的这一组数据，然后再取出这一组数据当中的图片
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: imglist // 需要预览的图片http链接列表
    })
  },
  abdomen: function (e) {
    var that = this;

    var url = e.currentTarget.dataset.url;
    var imglist = []

    for (var index in that.data.abdomen) {
      imglist.push(that.data.abdomen[index].url2)
    }
    //通过循环在数据链里面找到和这个id相同的这一组数据，然后再取出这一组数据当中的图片
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: imglist // 需要预览的图片http链接列表
    })
  },
  fundus: function (e) {
    var that = this;

    var url = e.currentTarget.dataset.url;
    var imglist = []

    for (var index in that.data.fundus) {
      imglist.push(that.data.fundus[index].url2)
    }
    //通过循环在数据链里面找到和这个id相同的这一组数据，然后再取出这一组数据当中的图片
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: imglist // 需要预览的图片http链接列表
    })
  },
  other: function (e) {
    var that = this;

    var url = e.currentTarget.dataset.url;
    var imglist = []

    for (var index in that.data.other) {
      imglist.push(that.data.other[index].url2)
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
      url: '/pages/page/jianchan/index?id=' + this.data.id + '&type=' + this.data.type,
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
      var url = app.globalData.url + '/api/selectTaskReportById';
    }
    if (this.data.type == 0) {
      var url = app.globalData.url + '/api/selectCamperReportById';
    }
    var data = {
      id: this.data.id,
    }
    app.wxRequest('get', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {

        that.setData({
          inspectDate: res.data.inspectDate,
          abdomen: JSON.parse(res.data.abdomen),
          electrocardiogram: JSON.parse(res.data.electrocardiogram),
          fundus: JSON.parse(res.data.fundus),
          neck: JSON.parse(res.data.neck),
          other: JSON.parse(res.data.other),

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