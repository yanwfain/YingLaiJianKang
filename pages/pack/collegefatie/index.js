// pages/pack/collegefatie/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgbox: [],//选择图片
    pickerProDataf: [
      {
        name: '请选择'
      },
      {
        name: '控糖知识'
      },
      {
        name: '运动饮食 '
      },
      {
        name: '前沿进展'
      }
    ],
    countryIndex:'',
    pickerProDataf1: [
      {
        name: '请选择'
      },
      {
        name: '话题1'
      },
      {
        name: '话题2 '
      }
    ],
    countryIndex1:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.topicList()
    this.invitationTyp()
  },
  // 查询分类
  invitationTyp:function(e){
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    var url = app.globalData.url + '/api/college/selectInvitationType';
    var data = {
      userId:app.globalData.user_id,
    }
    app.wxRequest('get', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        that.setData({
          pickerProDataf:res.data
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
  // 话题
  topicList:function(e){
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    var url = app.globalData.url + '/api/college/selectTopicList';
    var data = {
      userId:app.globalData.user_id,
    }
    app.wxRequest('get', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        that.setData({
          pickerProDataf1:res.data
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
  // college/selectTopicList
  subite:function(e){
    if(!this.data.title){
      wx.showToast({
        title: '请填写标题',
        icon:'none'
      })
      return
    }
    if(!this.data.inptxtval){
      wx.showToast({
        title: '请填写内容',
        icon:'none'
      })
      return
    }
    if(!this.data.countryIndex){
      wx.showToast({
        title: '请选择分类',
        icon:'none'
      })
      return
    }
    if(!this.data.countryIndex1){
      wx.showToast({
        title: '请选择话题',
        icon:'none'
      })
      return
    }
    var img =[] ;
    if(this.data.imgbox.length>0){
      for(var index in this.data.imgbox){
        img.push(this.data.imgbox[index].url2)
      }
    }
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    var url = app.globalData.url + '/api/college/insertInvitation';
    var data = {
      uid:app.globalData.user_id,
      cid:this.data.pickerProDataf[this.data.countryIndex].id,
      title:this.data.title,
      introduction:this.data.inptxtval + this.data.pickerProDataf1[this.data.countryIndex1].name,
      imgs:img
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        this.setData({
          isModels:true
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
  jixsuFn:function(e){
    this.setData({
      isModels:false
    })
    wx.navigateBack({
      delta: 1,
    })
  },
  title:function(e){
    this.setData({
      title:e.detail.value
    })
  },
  inptxtval:function(e){
    this.setData({
      inptxtval:e.detail.value
    })
  },
  pickerProChangef: function (e) {
    this.setData({ countryIndex: e.detail.value });
    console.log(this.data.countryIndex)
  },
  pickerProChangef1: function (e) {
    this.setData({ countryIndex1: e.detail.value });
    console.log(this.data.countryIndex1)
  },
  topic_preview: function (e) {
    var that = this;
    var url = e.currentTarget.dataset.url;
    console.log(url)
    //通过循环在数据链里面找到和这个id相同的这一组数据，然后再取出这一组数据当中的图片
 
    var data = []
    for(var index in this.data.imgbox){
      data.push(this.data.imgbox[index].url1)
    }
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: data // 需要预览的图片http链接列表
    })
  },
   // 删除照片 &&
   imgDelete1: function (e) {
    console.log('11')
    let that = this;
    let index = e.currentTarget.dataset.deindex;
    for(var indexw in that.data.imgbox){
      if(index==indexw){
        that.data.imgbox.splice(indexw, 1)
      }
    }
    that.setData({
      imgbox: that.data.imgbox,
    });
    console.log(that.data.imgbox)
  },
  // 选择图片 &&&
  addPic1: function (e) {
    // var imgbox_lost ;
    // var idindex ;
    // for(var index in this.data.listcont){
    //   if(e.currentTarget.dataset.id==this.data.listcont[index].id){
    //     imgbox_lost = this.data.listcont[index].imgbox
    //     idindex = index
    //   }
    // }
    // console.log(idindex)
    // var imgbox = imgbox_lost;
    var imgbox = this.data.imgbox;
    console.log(imgbox)
    var that = this;
    var n = 3;
    if (3 > imgbox.length > 0) {
      n = 3 - imgbox.length;
    } else if (imgbox.length == 3) {
      n = 3;
    }
    wx.chooseImage({
      count: 3, // 默认1，设置图片张数
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // console.log(res.tempFilePaths)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        // if(that.data.type){
        //   for(var index in imgbox){
        //     tempFilePaths.unshift(imgbox[index].url1)
        //   }
         
        // }
        console.log(tempFilePaths)
        if (imgbox.length == 0) {
          console.log(123)
          for (var index in tempFilePaths) {
            var youurl = {
              url1: tempFilePaths[index],
              url2: ''
            }
            imgbox.push(youurl)
          }

        } else if (  imgbox.length>0) {
          console.log(456)

          for (var index in tempFilePaths) {
            var youurl = {
              url1: tempFilePaths[index],
              url2: ''
            }
            imgbox.push(youurl)
          }
        }
        for (let index in imgbox) {
          console.log(tempFilePaths[index])
          console.log(index)
          if(!imgbox[index].url2){
            wx.uploadFile({
              url: app.globalData.url + '/imgUpload/upload',      //此处换上你的接口地址
              filePath: imgbox[index].url1,
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
                  console.log('________________________')
                  console.log(datas)
                 imgbox[index].url2 = datas.data
                 console.log(  imgbox[index].url2 )
                //  that.setData({
                //   imgbox: imgbox
                // })
                // console.log(that.data.imgbox)
                // that.data.listcont[idindex].imgbox = imgbox_lost
                that.setData({
                  imgbox: imgbox
                })
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
   
        }
        
        // api / common / upload
      }
    })
    console.log(imgbox)
    console.log(this.data.imgbox)
  },

  //图片
  imgbox: function (e) {
    this.setData({
      imgbox: e.detail.value
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