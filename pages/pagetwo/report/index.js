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
    wx.showLoading({
      title:'加载中'
    })
    var that = this
    var url = app.globalData.url + '/camper/getBillByUser';
    var data = {
      user_id: app.globalData.user_id,

    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success&&res.data) {
        that.setData({
          jid:res.data.id?res.data.id:'',
          date : res.data.test_date ? res.data.test_date : '',
          imgbox : JSON.parse(res.data.biochemistry) ,
          imgboxs : JSON.parse(res.data.routine_blood) ,
          imgboxs1 : JSON.parse(res.data.saccharify) ,
          imgboxs15 : JSON.parse(res.data.urinalysis) ,
          imgboxs12 : JSON.parse(res.data.serum_albumin) ,
          imgboxs13 : JSON.parse(res.data.islets) ,
          imgboxs14 : JSON.parse(res.data.c_reactive) ,
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
  tabshowFn: function (e) {
    this.setData({
      isshowsd: true
    })
  },
  sislsd: function (e) {
    this.setData({
      isshowsd: false
    })
  },
  bindDateChange: function (e) {
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
  baocunsx: function (e) {
    var that = this
    var url = app.globalData.url + '/joinCamp/saveBill';
    var data = {
      user_id: app.globalData.user_id,
      test_date: that.data.date ? that.data.date : '',
      biochemistry: JSON.stringify(that.data.imgbox) ,
      routine_blood: JSON.stringify(that.data.imgboxs) ,
      saccharify: JSON.stringify(that.data.imgboxs1) ,
      urinalysis: JSON.stringify(that.data.imgboxs15) ,
      serum_albumin: JSON.stringify(that.data.imgboxs12) ,
      Islets: JSON.stringify(that.data.imgboxs13) ,
      c_reactive: JSON.stringify(that.data.imgboxs14) ,
      step: 1,
      piece: 4,
      aim: 2,
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
  xiapageFn: function (e) {
    if(!this.data.date||this.data.imgbox.length==0||this.data.imgboxs.length==0||this.data.imgboxs1.length==0||this.data.imgboxs15.length==0||this.data.imgboxs12.length==0||this.data.imgboxs13.length==0||this.data.imgboxs14.length==0){
      wx.showToast({
        title: '请完善信息后提交',
        icon:'none'
      })
      return
    }
    var that = this
    var url = app.globalData.url + '/joinCamp/saveBill';
    var data = {
      user_id: app.globalData.user_id,
      test_date: that.data.date ? that.data.date : '',
      biochemistry: JSON.stringify(that.data.imgbox) ,
      routine_blood: JSON.stringify(that.data.imgboxs) ,
      saccharify: JSON.stringify(that.data.imgboxs1) ,
      urinalysis: JSON.stringify(that.data.imgboxs15) ,
      serum_albumin: JSON.stringify(that.data.imgboxs12) ,
      islets: JSON.stringify(that.data.imgboxs13) ,
      c_reactive: JSON.stringify(that.data.imgboxs14) ,
      step: 1,
      piece: 4,
      aim: 2,
      id: that.data.jid ? that.data.jid : ''
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        wx.navigateTo({
          url: '/pages/page/jiancha/index',
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
        for (let index in imgbox) {
          console.log(tempFilePaths[index])
          console.log(index)
          if(!imgbox[index].url2){
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
                  console.log('________________________')
                  console.log(datas)
                 imgbox[index].url2 = datas.data
                 console.log(  imgbox[index].url2 )
                 that.setData({
                  imgbox: imgbox
                })
                console.log(that.data.imgbox)
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