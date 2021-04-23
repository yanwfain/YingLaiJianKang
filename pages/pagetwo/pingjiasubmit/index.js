// pages/pingjiasubmit/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nutid:0,
    numsl:0,
    list:[],
    imgbox: [],//选择图片
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      listcont:JSON.parse(options.listcont)
    })
    for(var index in this.data.listcont){
      this.data.listcont[index].productScore = 0
      this.data.listcont[index].comment = ''
      this.data.listcont[index].numsl = 0
      this.data.listcont[index].pics = []
      this.data.listcont[index].imgbox = []
    }
    this.setData({
      listcont: this.data.listcont
    })
    console.log(this.data.listcont)
  },
  topic_preview: function (e) {
    var that = this;
    var url = e.currentTarget.dataset.url;
    console.log(url)
    //通过循环在数据链里面找到和这个id相同的这一组数据，然后再取出这一组数据当中的图片
 
    var data = []
    for(var index in this.data.listcont){
      if(e.currentTarget.dataset.id==this.data.listcont[index].id){

        for(var inde in this.data.listcont[index].imgbox){
          data.push(this.data.listcont[index].imgbox[inde].url1)
        }
      }
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

    let imgbox;
    for(var indexw in that.data.listcont){
      if(e.currentTarget.dataset.id==that.data.listcont[indexw].id){
        that.data.listcont[indexw].imgbox.splice(index, 1)
      }
    }
    that.setData({
      listcont: that.data.listcont,
    });

  },
  // 选择图片 &&&
  addPic1: function (e) {
    var imgbox_lost ;
    var idindex ;
    for(var index in this.data.listcont){
      if(e.currentTarget.dataset.id==this.data.listcont[index].id){
        imgbox_lost = this.data.listcont[index].imgbox
        idindex = index
      }
    }
    console.log(idindex)
    var imgbox = imgbox_lost;
    console.log(imgbox)
    var that = this;
    var n = 99;
    if (99 > imgbox.length > 0) {
      n = 99 - imgbox.length;
    } else if (imgbox.length == 99) {
      n = 99;
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
                that.data.listcont[idindex].imgbox = imgbox_lost
                that.setData({
                  listcont: that.data.listcont
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
    // this.data.listcont[idindex].imgbox = imgbox_lost
    // this.setData({
    //   listcont: this.data.listcont
    // })
    // console.log(this.data.listcont)
  },

  //图片
  imgbox: function (e) {
    this.setData({
      imgbox: e.detail.value
    })
  },
  clicxinFn:function(e){
    for(var index in this.data.listcont){
      if(e.currentTarget.dataset.code == this.data.listcont[index].id){
        this.data.listcont[index].productScore = e.currentTarget.dataset.id
      }
    }
    this.setData({
      listcont:  this.data.listcont,
    })
  },
  inptext:function(e){
    console.log(e)
    if(e.detail.value.length>=500){
      wx.showToast({
        title: '最多500个字',
        icon:'none'
      })
      return
    }
    for(var index in this.data.listcont){
      if(e.target.dataset.id == this.data.listcont[index].id){
        this.data.listcont[index].comment = e.detail.value
        this.data.listcont[index].numsl = e.detail.value.length
      }
    }
    this.setData({
      listcont:  this.data.listcont,
    })
 
  },
  submit:function(e){
    wx.showLoading({
      title: '加载中',
    })
    var listcont = this.data.listcont
    var that = this
    for(var index in listcont){
      var url = app.globalData.url + '/api/shop/saveGoodsReply';
      var data = {
        userId:app.globalData.user_id,
        oid: listcont[index].oid,
        productId: listcont[index].productId,
        productScore: listcont[index].productScore,
        comment: listcont[index].comment,
        pics:JSON.stringify(listcont[index].imgbox)
      }
      app.wxRequest('POST', url, data, (res) => {
        console.log(res)
        wx.hideLoading()
        if (res.success) {
          if(index==listcont.length-1){
            wx.navigateBack({
              delta: 1,
            })
          }
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
    }
  
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