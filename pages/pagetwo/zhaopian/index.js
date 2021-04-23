// pages/binlist/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: app.globalData.statusBarHeight,//获取导航高度
    imgbox: [],//选择图片
    imgboxs: [],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title:'加载中'
    })
    var that = this
    var url = app.globalData.url + '/camper/getPhotoByUser';
    var data = {
      user_id: app.globalData.user_id,
    
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success&&res.data) {
        that.setData({
          jid:res.data.id?res.data.id:'',
          imgbox : JSON.parse(res.data.positive) ,
          imgboxs : JSON.parse(res.data.side) ,
        })
      } else {
        wx.showToast({
          title: res.msg,
        })
      }
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
      console.log(err.errMsg)
    })
  },
  notiro: function (e) {
    wx.navigateBack({
      delta: 1,//返回的页面数，如果 delta 大于现有页面数，则返回到首页。
      success: function () { }
    })
  },
  tabshowFn:function(e){
    this.setData({
      isshowsd:true
    })
  },
  sislsd:function(e){
    this.setData({
      isshowsd:false
    })
  },
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  baocunsx:function(e){
    var that = this
    var url = app.globalData.url + '/joinCamp/savePhoto';
    var data = {
      user_id: app.globalData.user_id,
      positive: JSON.stringify(that.data.imgbox) ,
      side: JSON.stringify(that.data.imgboxs) ,
      step: 1,
      piece: 5,
      aim: 1,
      id: that.data.jid ? that.data.jid : ''
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        wx.reLaunch({
          url: '/pages/page/listxinxi/index',
        })
      } else {
        wx.showToast({
          title: res.msg,
        })
      }
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
      console.log(err.errMsg)
    })
  
  },
  xiapageFn:function(e){
    if(this.data.imgbox.length==0||this.data.imgboxs.length==0){
      wx.showToast({
        title: '请完善信息后提交',
        icon:'none'
      })
      return
    }
    var that = this
    var url = app.globalData.url + '/joinCamp/savePhoto';
    var data = {
      user_id: app.globalData.user_id,
      positive: JSON.stringify(that.data.imgbox) ,
      side: JSON.stringify(that.data.imgboxs) ,
      step: 1,
      piece: 5,
      aim: 1,
      id: that.data.jid ? that.data.jid : ''
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        wx.navigateTo({
          url: '/pages/pagetwo/timeyuyue/index',
        })
      } else {
        wx.showToast({
          title: res.msg,
        })
      }
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
      console.log(err.errMsg)
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
  topic_preview1: function (e) {
    var that = this;
    var url = e.currentTarget.dataset.url;
    //通过循环在数据链里面找到和这个id相同的这一组数据，然后再取出这一组数据当中的图片
    var data = []
    for (var index in that.data.imgboxs) {
      data.push(that.data.imgboxs[index].url1)
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
    var n = 99;
    if (99 > imgbox.length > 0) {
      n = 99 - imgbox.length;
    } else if (imgbox.length == 99) {
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
  imgDelete1s: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.deindex;
    let imgboxs = this.data.imgboxs;
    imgboxs.splice(index, 1)
    console.log(imgboxs)
    that.setData({
      imgboxs: imgboxs,
    });
  },
  // 选择图片 &&&
  addPic1s: function (e) {
    var imgboxs = this.data.imgboxs;
    console.log(imgboxs)
    var that = this;
    var n = 99;
    if (99 > imgboxs.length > 0) {
      n = 99 - imgboxs.length;
    } else if (imgboxs.length == 99) {
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

        if (imgboxs.length == 0) {
          for (var index in tempFilePaths) {
            var youurl = {
              url1: tempFilePaths[index],
              url2: ''
            }
            imgboxs.push(youurl)
          }

        } else if (99 > imgboxs.length) {
          // imgboxs = imgboxs.concat(tempFilePaths);
          for (var index in tempFilePaths) {
            var youurl = {
              url1: tempFilePaths[index],
              url2: ''
            }
            imgboxs.push(youurl)
          }
        }
        that.setData({
          imgboxs: imgboxs
        });
        console.log(that.data.imgboxs)
        for (var index in that.data.imgboxs) {
          wx.uploadFile({
            url: app.globalData.url + '/imgUpload/upload',      //此处换上你的接口地址
            filePath: tempFilePaths[index],
            name: 'upload',
            // header: {
            //   "Content-Type": "multipart/form-data",
            //   'accept': 'application/json',
            //   'Authorization': 'Bearer ..'    //若有token，此处换上你的token，没有的话省略
            // },
            formData: {
              'user': 'test'  //其他额外的formdata，可不写
            },
            success: function (res) {
              wx.showLoading({
                title: '上传中.',
              })
              if (res.statusCode == 200) {
                wx.hideLoading()
                console.log(res)
                var datas = JSON.parse(res.data);
                console.log(datas)
                imgboxs[index].url2 = datas.data
              }
             
            },

            fail: function (res) {
              console.log('fail');
              wx.hideLoading()
            },
          })
        }
        that.setData({
          imgboxs: imgboxs
        })
        console.log(that.data.imgboxs_list)
      }
    })
  },

  //图片
  imgboxs: function (e) {
    this.setData({
      imgboxs: e.detail.value
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