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
    imgboxs1: [],
    imgboxs12: [],
    imgboxs13: [],
    imgboxs14: [],
    imgboxs15: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type:options.type,
      id:options.id
    })
    var that = this
   
    // if(this.data.type){
    //   wx.showLoading({
    //     title: '加载中',
    //   })
    //   if (this.data.type == 1) {
    //     var url = app.globalData.url + '/api/selectTaskReportById';
    //   }
    //   if (this.data.type == 0) {
    //     var url = app.globalData.url + '/api/selectCamperReportById';
    //   }
    //   var data = {
    //     id: this.data.id,
    //   }
    //   app.wxRequest('get', url, data, (res) => {
    //     console.log(res)
    //     wx.hideLoading()
    //     if (res.success) {

    //       that.setData({
    //         date: res.data.inspectDate,
    //         imgbox: JSON.parse(res.data.electrocardiogram),
    //         imgboxs: JSON.parse(res.data.neck),
    //         imgboxs1: JSON.parse(res.data.abdomen),
    //         imgboxs12: JSON.parse(res.data.fundus),
    //         imgboxs13: JSON.parse(res.data.other),
  
    //       })
    //     } else {
    //       wx.showToast({
    //         title: res.error_message,
    //         icon: 'none'
    //       })
    //     }
    //   }, (err) => {
    //     wx.showToast({
    //       title: '提交失败',
    //     })
    //     console.log(err.errMsg)
    //   })
    // }
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
  notiro: function (e) {
    wx.navigateBack({
      delta: 1,//返回的页面数，如果 delta 大于现有页面数，则返回到首页。
      success: function () { }
    })
  },
  baocunsx:function(e){
    wx.reLaunch({
      url: '/pages/page/listxinxi/index',
    })
  },
  xiapageFn:function(e){
    if(!this.data.date){
      wx.showToast({
        title: '请填写日期',
        icon:'none'
      })
      return
    }
    var that = this;
    wx.showLoading({
      title:'加载中'
    })
    if(!this.data.type){
      var url = app.globalData.url + '/api/saveTaskReport';
    }
    if(this.data.type){
      var url = app.globalData.url + '/api/updateReportByUserId';
    }
    var data = {
      inspectDate:this.data.date,
      electrocardiogram:JSON.stringify(this.data.imgbox),
      neck:JSON.stringify(this.data.imgboxs),
      abdomen:JSON.stringify(this.data.imgboxs1),
      fundus:JSON.stringify(this.data.imgboxs12),
      other:JSON.stringify(this.data.imgboxs13),
      userId:app.globalData.user_id,
      type:this.data.type?this.data.type:'',
      id:this.data.id?this.data.id:''
    }
    app.wxRequest('post', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        wx.showToast({
          title: '保存成功',
        })
        setTimeout(function(){
          wx.navigateBack({
            delta: 1,
          })
        },500)
        
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
  topic_preview2: function (e) {
    var that = this;
    var url = e.currentTarget.dataset.url;
    //通过循环在数据链里面找到和这个id相同的这一组数据，然后再取出这一组数据当中的图片
    var data = []
    for (var index in that.data.imgboxs1) {
      data.push(that.data.imgboxs1[index].url1)
      data = data
    }
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: data // 需要预览的图片http链接列表
    })
  },
  topic_preview3: function (e) {
    var that = this;
    var url = e.currentTarget.dataset.url;
    //通过循环在数据链里面找到和这个id相同的这一组数据，然后再取出这一组数据当中的图片
    var data = []
    for (var index in that.data.imgboxs12) {
      data.push(that.data.imgboxs12[index].url1)
      data = data
    }
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: data // 需要预览的图片http链接列表
    })
  },
  topic_preview4: function (e) {
    var that = this;
    var url = e.currentTarget.dataset.url;
    //通过循环在数据链里面找到和这个id相同的这一组数据，然后再取出这一组数据当中的图片
    var data = []
    for (var index in that.data.imgboxs13) {
      data.push(that.data.imgboxs13[index].url1)
      data = data
    }
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: data // 需要预览的图片http链接列表
    })
  },
  topic_preview5: function (e) {
    var that = this;
    var url = e.currentTarget.dataset.url;
    //通过循环在数据链里面找到和这个id相同的这一组数据，然后再取出这一组数据当中的图片
    var data = []
    for (var index in that.data.imgboxs14) {
      data.push(that.data.imgboxs14[index].url1)
      data = data
    }
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: data // 需要预览的图片http链接列表
    })
  },
  topic_preview6: function (e) {
    var that = this;
    var url = e.currentTarget.dataset.url;
    //通过循环在数据链里面找到和这个id相同的这一组数据，然后再取出这一组数据当中的图片
    var data = []
    for (var index in that.data.imgboxs15) {
      data.push(that.data.imgboxs15[index].url1)
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
      n = 99;
    }

    wx.chooseImage({
      count: n, // 默认1，设置图片张数
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
        console.log(imgbox)
        for (var index in imgbox) {
          console.log(tempFilePaths[index])
          console.log(index)
          if(!imgbox[index].url2){

            console.log(tempFilePaths[index])
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
                 that.setData({
                  imgbox: imgbox
                })
                console.log(that.data.imgbox)
                console.log(imgbox)
                }
              },
              
              fail: function (res) {
                console.log(res)
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
    } else if (imgboxs.length == 1) {
      n =99;
    }

    wx.chooseImage({
      count: n, // 默认1，设置图片张数
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

        } else if ( imgboxs.length>0) {
          // imgboxs = imgboxs.concat(tempFilePaths);
          for (var index in tempFilePaths) {
            var youurl = {
              url1: tempFilePaths[index],
              url2: ''
            }
            imgboxs.push(youurl)
          }
        }

        console.log(that.data.imgboxs)
        for (let index in imgboxs) {
          wx.uploadFile({
            url: app.globalData.url + '/imgUpload/upload',      //此处换上你的接口地址
            filePath:imgboxs[index].url1,
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
  imgDelete1s1: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.deindex;
    let imgboxs1 = this.data.imgboxs1;

    imgboxs1.splice(index, 1)

    that.setData({
      imgboxs1: imgboxs1,
    });
  },
  // 选择图片 &&&
  addPic1s1: function (e) {
    var imgboxs1 = this.data.imgboxs1;
    console.log(imgboxs1)
    var that = this;
    var n = 99;
    if (99 > imgboxs1.length > 0) {
      n = 99 - imgboxs1.length;
    } else if (imgboxs1.length == 99) {
      n =99;
    }

    wx.chooseImage({
      count: n, // 默认1，设置图片张数
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // console.log(res.tempFilePaths)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths

        if (imgboxs1.length == 0) {

          for (var index in tempFilePaths) {
            var youurl = {
              url1: tempFilePaths[index],
              url2: ''
            }
            imgboxs1.push(youurl)
          }
        } else if (1 > imgboxs1.length) {
          for (var index in tempFilePaths) {
            var youurl = {
              url1: tempFilePaths[index],
              url2: ''
            }
            imgboxs1.push(youurl)
          }
        }
    
        for (let index in imgboxs1) {
          wx.uploadFile({
            url: app.globalData.url + '/imgUpload/upload',      //此处换上你的接口地址
            filePath: imgboxs1[index].url1,
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
                var datas = JSON.parse(res.data);
                console.log(datas)
                imgboxs1[index].url2 = datas.data
              }
              console.log(res)
              console.log(that.data.imgboxs1)

            },

            fail: function (res) {
              console.log('fail');
              wx.hideLoading()
            },
          })
        }
        that.setData({
          imgboxs1: imgboxs1
        })
      }
    })
  },

  //图片
  imgboxs1: function (e) {
    this.setData({
      imgboxs1: e.detail.value
    })
  },
  imgDelete1s12: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.deindex;
    let imgboxs12 = this.data.imgboxs12;
    imgboxs12.splice(index, 1)
    that.setData({
      imgboxs12: imgboxs12,

    });
  },
  // 选择图片 &&&
  addPic1s12: function (e) {
    var imgboxs12 = this.data.imgboxs12;
    console.log(imgboxs12)
    var that = this;
    var n = 99;
    if (99 > imgboxs12.length > 0) {
      n = 99 - imgboxs12.length;
    } else if (imgboxs12.length == 99) {
      n = 99;
    }

    wx.chooseImage({
      count: n, // 默认1，设置图片张数
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // console.log(res.tempFilePaths)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths

        if (imgboxs12.length == 0) {

          for (var index in tempFilePaths) {
            var youurl = {
              url1: tempFilePaths[index],
              url2: ''
            }
            imgboxs12.push(youurl)
          }

        } else if (1 > imgboxs12.length) {

          for (var index in tempFilePaths) {
            var youurl = {
              url1: tempFilePaths[index],
              url2: ''
            }
            imgboxs12.push(youurl)
          }
        }
  
        for (let index in imgboxs12) {
          wx.uploadFile({
            url: app.globalData.url + '/imgUpload/upload',      //此处换上你的接口地址
            filePath: imgboxs12[index].url1,
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
                var datas = JSON.parse(res.data);
                console.log(datas)
                imgboxs12[index].url2 = datas.data
      
              }
              console.log(res)
              console.log(that.data.imgboxs12)
            },
            fail: function (res) {
              console.log('fail');
              wx.hideLoading()
            },
          })
        }
        that.setData({
          imgboxs12: imgboxs12
        })
        console.log(that.data.imgboxs12)
      }
    })
  },

  //图片
  imgboxs12: function (e) {
    this.setData({
      imgboxs12: e.detail.value
    })
  },

  imgDelete1s13: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.deindex;
    let imgboxs13 = this.data.imgboxs13;

    imgboxs13.splice(index, 1)

    that.setData({
      imgboxs13: imgboxs13,


    });
  },
  // 选择图片 &&&
  addPic1s13: function (e) {
    var imgboxs13 = this.data.imgboxs13;
    console.log(imgboxs13)
    var that = this;
    var n = 99;
    if (99 > imgboxs13.length > 0) {
      n = 99 - imgboxs13.length;
    } else if (imgboxs13.length == 99) {
      n = 99;
    }

    wx.chooseImage({
      count: n, // 默认1，设置图片张数
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // console.log(res.tempFilePaths)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths

        if (imgboxs13.length == 0) {

          for (var index in tempFilePaths) {
            var youurl = {
              url1: tempFilePaths[index],
              url2: ''
            }
            imgboxs13.push(youurl)
          }
        } else if (1 > imgboxs13.length) {

          for (var index in tempFilePaths) {
            var youurl = {
              url1: tempFilePaths[index],
              url2: ''
            }
            imgboxs13.push(youurl)
          }
        }
   
        for (let index in imgboxs13) {
          wx.uploadFile({
            url: app.globalData.url + '/imgUpload/upload',      //此处换上你的接口地址
            filePath: imgboxs13[index].url1,
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
                var datas = JSON.parse(res.data);
                console.log(datas)
                imgboxs13[index].url2 = datas.data
              }
              console.log(res)

            
            },

            fail: function (res) {
              console.log('fail');
              wx.hideLoading()
            },
          })
        }
        that.setData({
          imgboxs13: imgboxs13
        })
        console.log(that.data.imgboxs13)
      }
    })
  },

  //图片
  imgboxs13: function (e) {
    this.setData({
      imgboxs13: e.detail.value
    })
  },
  imgDelete1s14: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.deindex;
    let imgboxs14 = this.data.imgboxs14;

    imgboxs14.splice(index, 1)

    that.setData({
      imgboxs14: imgboxs14,
    });
  },
  // 选择图片 &&&
  addPic1s14: function (e) {
    var imgboxs14 = this.data.imgboxs14;
    console.log(imgboxs14)
    var that = this;
    var n = 99;
    if (99 > imgboxs14.length > 0) {
      n = 99 - imgboxs14.length;
    } else if (imgboxs14.length == 99) {
      n = 99;
    }
    wx.chooseImage({
      count: n, // 默认1，设置图片张数
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // console.log(res.tempFilePaths)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths

        if (imgboxs14.length == 0) {

          for (var index in tempFilePaths) {
            var youurl = {
              url1: tempFilePaths[index],
              url2: ''
            }
            imgboxs14.push(youurl)
          }
        } else if (1 > imgboxs14.length) {

          for (var index in tempFilePaths) {
            var youurl = {
              url1: tempFilePaths[index],
              url2: ''
            }
            imgboxs14.push(youurl)
          }
        }
    
        for (let index in imgboxs14) {
          wx.uploadFile({
            url: app.globalData.url + '/imgUpload/upload',      //此处换上你的接口地址
            filePath:  imgboxs14[index].url1,
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
                var datas = JSON.parse(res.data);
                console.log(datas)
                imgboxs14[index].url2 = datas.data
             
              
              }
              console.log(res)


             
            },

            fail: function (res) {
              console.log('fail');
              wx.hideLoading()
            },
          })
        }
        that.setData({
          imgboxs14: imgboxs14
        })
        console.log(that.data.imgboxs14)
      }
    })
  },

  //图片
  imgboxs14: function (e) {
    this.setData({
      imgboxs14: e.detail.value
    })
  },
  imgDelete1s15: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.deindex;
    let imgboxs15 = this.data.imgboxs15;

    imgboxs15.splice(index, 1)

    that.setData({
      imgboxs15: imgboxs15,


    });
  },
  // 选择图片 &&&
  addPic1s15: function (e) {
    var imgboxs15 = this.data.imgboxs15;
    console.log(imgboxs15)
    var that = this;
    var n = 99;
    if (99 > imgboxs15.length > 0) {
      n =99 - imgboxs15.length;
    } else if (imgboxs15.length ==99) {
      n = 99
    }
    wx.chooseImage({
      count: n, // 默认1，设置图片张数
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // console.log(res.tempFilePaths)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        if (imgboxs15.length == 0) {
          for (var index in tempFilePaths) {
            var youurl = {
              url1: tempFilePaths[index],
              url2: ''
            }
            imgboxs15.push(youurl)
          }
        } else if (1 > imgboxs15.length) {

          for (var index in tempFilePaths) {
            var youurl = {
              url1: tempFilePaths[index],
              url2: ''
            }
            imgboxs15.push(youurl)
          }
        }
        for (let index in imgboxs15) {
          wx.uploadFile({
            url: app.globalData.url + '/imgUpload/upload',      //此处换上你的接口地址
            filePath: imgboxs15[index].url1,
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
                var datas = JSON.parse(res.data);
                console.log(datas)
                imgboxs15[index].url2 = datas.data
              
              
              }
              console.log(res)
            },

            fail: function (res) {
              console.log('fail');
              wx.hideLoading()
            },
          })
        }
        that.setData({
          imgboxs15: imgboxs15
        })
        console.log(that.data.imgboxs15)
      }
    })
  },

  //图片
  imgboxs15: function (e) {
    this.setData({
      imgboxs15: e.detail.value
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