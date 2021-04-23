// pages/addjilupage/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
    imgbox: [],//选择图片
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      time:options.time
    })
    wx.showLoading({
      title:'加载中'
    })
    var url = app.globalData.url + '/api/selectTodayDietType';
    var data = {
      userId:app.globalData.user_id
    }
    app.wxRequest('get', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
      
        that.setData({
          list:res.data.list
        })
        if(options.id){
          that.setData({
            tid:options.id
          })
          var list = res.data.list
          for(var index in list){
            if(options.id==list[index].id){
              that.setData({
                text:list[index].text
              })
            }
          }
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
 
  
  },
  binclick:function(e){
    if(this.data.imgbox.length<1){
      wx.showToast({
        title: '请上传图片',
        icon:'none'
      })
      return
    }
    if(!this.data.date_tim&&!this.data.value_time){
      wx.showToast({
        title: '请选择用餐时间',
        icon:'none'
      })
      return
    }
    var that = this;
   
    wx.showLoading({
      title:'加载中'
    })
    var url = app.globalData.url + '/api/saveTodayDietRecord';
    var data = {
      userId:app.globalData.user_id,
      dietId:this.data.tid,
      img:JSON.stringify(this.data.imgbox) ,
      createTime:this.data.date_time + ' ' + this.data.value_time
    }
    app.wxRequest('post', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
          wx.navigateBack({
            delta: 1,
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
  changeDate(e) {
    console.log(e)
    this.setData({ date_time: e.detail.value });
  },
  bindTimeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      value_time: e.detail.value
    })
  },
  topic_preview: function (e) {
    var that = this;
    var url = e.currentTarget.dataset.url;
    console.log(url)
    //通过循环在数据链里面找到和这个id相同的这一组数据，然后再取出这一组数据当中的图片
    console.log(that.data.imgbox)
    var data = []
    for (var index in that.data.imgbox) {
      data.push(that.data.imgbox[index].url1)
      data = data
    }

    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: data // 需要预览的图片http链接列表
    })
  },
  
   // 删除照片 &&
   imgDelete1: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.deindex;
    let imgbox = this.data.imgbox;
    imgbox.splice(index, 1)
    console.log(imgbox)
    that.setData({
      imgbox: imgbox,
    });
  },
  // 选择图片 &&&
  addPic1: function (e) {
    var imgbox = this.data.imgbox;
    console.log(imgbox)
    var that = this;
    var n =1;
    if (n > imgbox.length > 0) {
      n = n - imgbox.length;
    } else if (imgbox.length == n) {
      n = 1;
    }

    wx.chooseImage({
      count: n, // 默认99，设置图片张数
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // console.log(res.tempFilePaths)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        if (imgbox.length == 0) {
          for (var index in tempFilePaths) {
            var youurl = {
              url1: tempFilePaths[index],
              url2: ''
            }
            imgbox.push(youurl)
          }

        } else if (99 > imgbox.length) {
          for (var index in tempFilePaths) {
            var youurl = {
              url1: tempFilePaths[index],
              url2: ''
            }
            imgbox.push(youurl)
          }
        }
        that.setData({
          imgbox: imgbox
        });
        console.log(that.data.imgbox)
        for (var index in that.data.imgbox) {
          console.log(tempFilePaths[index])
          console.log(index)
          wx.uploadFile({
            url: app.globalData.url + '/imgUpload/upload',      //此处换上你的接口地址
            filePath: tempFilePaths[index],
            name: 'upload',
            formData: {
              'user': 'test'  //其他额外的formdata，可不写
            },
            success: function (res) {
              wx.showLoading({
                title: '上传中.',
              })
              if (res.statusCode == 200) {
                wx.hideLoading()
                var datas = JSON.parse(res.data);
               imgbox[index].url2 = datas.data
              }
            },
            fail: function (res) {
              console.log('fail');
              wx.hideLoading({
                success: (res) => { },
              })
            },
          })
        }
        that.setData({
          imgbox: imgbox
        })
        console.log(that.data.imgbox)
        // api / common / upload
      }
    })
  },

  //图片
  imgbox: function (e) {
    this.setData({
      imgbox: e.detail.value
    })
  },
  click:function(e){
    this.setData({
      tid:e.currentTarget.dataset.id,
      text:e.currentTarget.dataset.txt
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