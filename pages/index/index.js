const app = getApp()
var httpUtils = require('../../js/httpUtils.js');
Page({
  // pages/timeyuyue/index
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: true,
    isSiuser: false,
    isloadview: true,
    canIUse: wx.canIUse('button.open-type.getUserProfile'),
    canIUseGetUserProfile: false,
    banner: [
      {
        img: 'http://47.94.16.158:8001/13.jpg'
      },
      {
        img: 'http://47.94.16.158:8001/13.jpg'
      },
      {
        img: 'http://47.94.16.158:8001/13.jpg'
      },
      {
        img: 'http://47.94.16.158:8001/13.jpg'
      }
    ],
    swiperCurrent: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (wx.getUserProfile) {
      console.log(wx.getUserProfile)
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    console.log(wx.getUserProfile)
    console.log(app.globalData)
    setTimeout(function () {
      if (app.globalData.userInfo == null) {
        that.setData({
          hasUserInfo: false,

        })
      }
    }, 1000)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,

      })
    } else if (this.data.canIUse) {
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,

        })
      }
    } else {
      // 在没有 open-type=getUserProfile 版本的兼容处理
      wx.getUserProfile({
        success: res => {
          console.log(res)
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
            isUser: true
          })
        }
      })
    }
    wx.showLoading({
      title: '加载中',
    })
    var url = app.globalData.url + '/api/index';
    var data = {
     
    }
    app.wxRequest('get', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        that.setData({
          indexpage:res.data
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
  listxiaoxi:function(e){
    wx.navigateTo({
      url: '/pages/pagetwo/xiaoximessg/index',
    })
  },
  huizhang:function(e){
    wx.navigateTo({
      url: '/pages/pack/huizhang/index',
    })
  },
  //
  shopFn:function(e){
    wx.redirectTo({
      url: '/pages/pagetwo/shopping/index',
    })
  },
  jiaruni:function(e){

    wx.redirectTo({
      url: '/pages/pack/camp/index',
    })
  },
  guanggaoFn:function(e){
    wx.navigateTo({
      url: e.currentTarget.dataset.page,
    })
  },
  mjbind:function(e){
    wx.navigateTo({
      url: e.currentTarget.dataset.page,
    })
  },
  // 手写签名
  // onHnadwritingComplete:function(e){
  //   console.log(e)
  // },
  jinrudeeliship:function(e){
    if(this.data.userList.doctorId){
      app.globalData.doctorId =this.data.userList.doctorId
      wx.navigateTo({
        url: '/pages/pagetwo/shipdeeliwen/index',
      })
    }else{
      wx.showToast({
        title: '暂未分配医师请等候',
        icon:'none'
      })
    }
 
  },
  shopdelit:function(e){
    wx.navigateTo({
      url: '/pages/pagetwo/shopdelit/index?id=' + e.currentTarget.dataset.id,
    })
  },
  pageceshi:function(e){
    wx.navigateTo({
      url: '/pages/pagetwo/tizhongjiance/index',
    })
  },
  zaicile:function(e){
    wx.navigateTo({
      url: '/pages/pagetwo/timeyuyue/index',
    })
  },
  renwuFn: function (e) {
    wx.navigateTo({
      url: '/pages/pack/campThree/index',
    })
  },
  golistxt: function (e) {
    wx.navigateTo({
      url: '/pages/page/listxinxi/index',
    })
  },
  delitdenixFn: function (e) {
    wx.navigateTo({
      url: '/pages/pack/indexdelitstit/index?id=' + e.currentTarget.dataset.id,
    })
  },
  indexFn: function (e) {
    wx.redirectTo({
      url: '/pages/index/index',
    })
  },
  bindelit: function (e) {
    // wx.navigateTo({
    //   url: '/pages/pack/indexldeilt/index',
    // })

    console.log(e.currentTarget.dataset.page.slice(0,1))
    if(e.currentTarget.dataset.page.slice(0,1)=='/'){
      wx.navigateTo({
        url: e.currentTarget.dataset.page,
      })
    }else{
      wx.navigateTo({
        url:'/pages/pack/indexldeilturl/index?url=' + e.currentTarget.dataset.page
      })
    }
  },
  collegeFn: function (e) {
    wx.redirectTo({
      url: '/pages/pack/college/index',
    })
  },
  xieqgoFn: function (e) {
    if(e.currentTarget.dataset.id==1||e.currentTarget.dataset.id==2){
      wx.navigateTo({
        url: '/pages/pagetwo/xuetang/index?id=' + e.currentTarget.dataset.id,
      })
    }
    if(e.currentTarget.dataset.id==3){
      wx.navigateTo({
        url: '/pages/page/jiluxieya/index?id=' + e.currentTarget.dataset.id,
      })
    }
    if(e.currentTarget.dataset.id==4){
      wx.navigateTo({
        url: '/pages/pagetwo/tizhongjiance/index?id=' + e.currentTarget.dataset.id,
      })
    }
    if(e.currentTarget.dataset.id==5){
      wx.navigateTo({
        url: '/pages/page/jilifuwei/index?id=' + e.currentTarget.dataset.id,
      })
    }
    if(e.currentTarget.dataset.id==6){
      wx.navigateTo({
        url: '/pages/page/jiluganshou/index?id=' + e.currentTarget.dataset.id,
      })
    }
  },
  goFnxie: function (e) {
    wx.navigateTo({
      url: '/pages/page/jiluxieya/index',
    })
  },
  qutizhangFn: function (e) {
    wx.navigateTo({
      url: '/pages/pagetwo/tizhongjiance/index',
    })
  },
  quwanchfu: function (e) {
    wx.navigateTo({
      url: '/pages/page/jilifuwei/index',
    })
  },
  subGoganshou: function (e) {
    wx.navigateTo({
      url: '/pages/page/jiluganshou/index',
    })
  },
  campFn: function (e) {
    // 第一种 默认用户
    // wx.redirectTo({
    //   url: '/pages/pack/campThree/index',
    // })
    
    if(!this.data.userList.status||this.data.userList.status==0){
      wx.redirectTo({
        url: '/pages/pack/camp/index',
      })
    }
    else if(this.data.userList.status==5){
      //购买都信息完善的用户
      wx.redirectTo({
        url: '/pages/pack/campThree/index',
      })
    }
    else if(this.data.userList.status>2&&this.data.userList.status<5){
      wx.reLaunch({
        url: '/pages/page/listxinxi/index',
      })
    }
    else if(this.data.userList.status==6){
      wx.showToast({
        title: '明天正式进入逆转营流程',
        icon:'none'
      })
    }
    else{
      // // 购买完成信息未完善
       wx.redirectTo({
         url: '/pages/pack/campTwo/index',
       })
       }
  },
  shoppingFn: function (e) {
    wx.redirectTo({
      url: '/pages/pagetwo/shopping/index',
    })
  },
  myFn: function (e) {
    wx.redirectTo({
      url: '/pages/page/my/index',
    })
  },
  bindchange(e) {
    let current = e.detail.current;
    let that = this;
    that.setData({
      swiperCurrent: current,
    })
  },
  lookgiftFn: function (e) {
    wx.navigateTo({
      url: '/pages/page/lookgift/index',
    })
  },
  startantFn: function (e) {
    var that = this
    setTimeout(function (e) {
      that.setData({
        isload: true
      })
    }, 300)

  },
  bunnotFn: function (e) {
    var that = this
    setTimeout(function () {
      that.setData({
        isload: false
      })
    })
    if (!that.data.isload) {
      this.setData({
        isloadview: false
      })
    }
    wx.navigateTo({
      url: '/pages/pagetwo/startantFn/index',
    })
  },
  bunnotFns: function (e) {
    var that = this
    setTimeout(function () {
      that.setData({
        isload: false
      })
    })
    if (!that.data.isload) {
      this.setData({
        isloadview: false
      })
    }
  },
  getUserProfile(e) {

    console.log("ok")
    var that = this;
    wx.getUserProfile({
      desc: '展示用户信息',
      success: function (res) {
        console.log(res)
        app.globalData.userInfo = res.userInfo
        that.setData({
          encryptedData: res.encryptedData,
          iv: res.iv,
          rawData: res.rawData,
          wxuser: res.userInfo,
          signature: res.signature,
          hasUserInfo: true,
          canIUse: true,
          isUser: true,
          isSiuser: false,
          headimg: res.userInfo.avatarUrl,
          nickName: res.userInfo.nickName
        })
        getOpenid(that, res.userInfo)
      },
      fail: function (res) {console.log(res) },

    })

  },
  ggopfn: function (e) {
    this.setData({
      hasUserInfo: true
    })
  },
  ggopfns: function (e) {
    this.setData({
      isSiuser: false
    })
  },
  getPhoneNumber: function (e) { //点击获取手机号码按钮
    var that = this;
    wx.checkSession({
      success: function () {
        console.log(e)
        console.log(e.detail.errMsg)
        console.log(e.detail.iv)
        console.log(e.detail.encryptedData)
        var ency = e.detail.encryptedData;
        var iv = e.detail.iv;
        var sessionk = that.data.sessionKey;

        if (e.detail.errMsg == 'getPhoneNsumber:fail user deny') {
          wx.showToast({
            title: '用户拒接授权',
            icon: 'none'
          })
        } else { //同意授权
          let url = app.globalData.url + '/login/auth/phone';
          console.log(url)
          let data = {
            encryptedData: ency,
            iv: iv,
            session_key: that.data.session_key,
            openid: app.globalData.openId
          };
          console.log(data)
          app.wxRequest('POST', url, data, (res) => {
            wx.showLoading({
              title: '加载中'
            })
            console.log(res)
            if (res.success) {
              wx.showToast({
                title: '获取成功',
              })
              that.setData({
                mobile: res.data
              })
              that.setData({
                isSiuser: false,
              })
              wx.hideLoading()
            } else {
              that.setData({
                isSiuser: true,
              })
              wx.showToast({
                title: '获取失败',
                icon: 'none'
              })
            }
            that.setData({
              phoneNumber: res.data
            })
          }, (err) => {
            wx.showToast({
              title: '提交失败',
            })
            console.log(err.errMsg)
          })
        }
      },
      fail: function () {
        console.log("session_key 已经失效，需要重新执行登录流程");
        that.wxlogin(); //重新登录
      }
    });
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
    getOpenid(that)
    if(this.data.day){
    
    }
  
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
    wx.showLoading({
      title: '加载中',
    })
    wx.hideLoading()
    this.onShow()
    wx.stopPullDownRefresh()
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
function getOpenid(that, userdelit) {
  var url = app.globalData.url + '/login/getOpenid';
  var url1 = app.globalData.url + '/api/getUserInfoByOpenid';
  var url2 = app.globalData.url + '/login/saveUserInfo';
  var url3 = app.globalData.url + '/camper/getTreatmentByUser';
  var url4 = app.globalData.url + '/api/selectTodayTaskByUserId';
  console.log(that)
  var params = {};
  var wxlogin = httpUtils.httpPromise(wx.login);
  wxlogin().then(function (res) {
    console.log(res)
    params.code = res.code;
    app.wxRequest('POST', url, params, (res) => {
      console.log(res)
      // var that = this;
      app.globalData.openId = res.data.openid
      that.setData({
        session_key: res.data.session_key
      })
      params.openid = res.data.openid;
      // wx.showLoading({
      //   title: '信息获取中',
      // })
      app.wxRequest('GET', url1, params, (res) => {
        console.log(res)
        if (res.success&&res.data) {
          app.globalData.status = res.data.userData.status

          app.globalData.token = res.data.userData.yxToken;
          app.globalData.account = res.data.userData.id;
          var url = app.globalData.url + '/api/selectUserMaterialByUserId';
          var data = {
            userId: res.data.userData.id
          }
          app.wxRequest('get', url, data, (res) => {
            console.log(res)
            wx.hideLoading()
            if (res.success) {
              var ages = res.data.userMaterial.birthday.split('年')
              console.log(ages)
              let userInfo = new app.manager.ICUserInfo();
              userInfo.height = res.data.userMaterial.height; //身高 cm
              userInfo.age = 30; //年龄
              userInfo.sex = res.data.userMaterial.sex; //性别 1 男 2 女
              app.ICDeviceManager.updateUserInfo(userInfo);
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
         

          that.setData({
            hasUserInfo: true,
            userList:res.data.userData
            
          })

          if (!res.data.userData.phone) {
            that.setData({
              isSiuser: true
            })
          } else {
            that.setData({
              isSiuser: false
            })
          }
          app.globalData.user_id = res.data.userData.id
          app.globalData.user_name = res.data.userData.userName
          app.globalData.head_img = res.data.userData.headImg
          var datas = {
            user_id:res.data.userData.id
          }
          app.wxRequest('POST', url3, datas, (res) => {
            console.log(res)
            if(res.success){
              that.setData({
                day:res.data.day,
                clock:res.data.clock,
              })
              var timestamp = Date.parse(new Date());
              var arr = that.data.day + ' ' +that.data.clock
              console.log(arr)
              var date = new Date(arr);
              // 有三种方式获取
              var time1 = date.getTime();
              console.log(time1)
              console.log(timestamp)
              if(time1<timestamp){
                that.setData({
                  isoktrue:true
                })
              }
            }
         
          }, (err) => {
            wx.showToast({
              title: '提交失败',
            })
            console.log(err.errMsg)
          })
          var datas1 = {
            userId:res.data.userData.id
          }
          app.wxRequest('get', url4, datas1, (res) => {
            console.log(res)
            if(res.success){
              that.setData({
                listdaywu:res.data
              })
            }
         
          }, (err) => {
            wx.showToast({
              title: '提交失败',
            })
            console.log(err.errMsg)
          })
        }
        if (!res.data) {
          that.setData({
            hasUserInfo: false
          })
        }
        if (!res.data && userdelit) {
          params.headUrl = that.data.headimg;
          params.userName = that.data.nickName;
          console.log('执行')
          app.wxRequest('POST', url2, params, (res) => {
            console.log(res)
            app.globalData.status = res.data.status
            that.setData({
              hasUserInfo: true,
              userList:res.data
            })
            if (!res.data.phone) {
              that.setData({
                isSiuser: true
              })
            } else {
              that.setData({
                isSiuser: false
              })
            }
          }, (err) => {
            wx.showToast({
              title: '提交失败',
            })
            console.log(err.errMsg)
          })
        }

      }, (err) => {
        wx.showToast({
          title: '提交失败',
        })
        console.log(err.errMsg)
      })
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
      console.log(err.errMsg)
    })
    var params1 = {
      openid: app.globalData.openId
    }


  })

}