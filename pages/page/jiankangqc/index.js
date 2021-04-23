// pages/jiankangqc/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tid:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  chongxFn1:function(e){
    wx.navigateTo({
      url: '/pages/pack/binlist/index?pageid=' +1 ,
    })
  },  
  chongxFn2:function(e){
    wx.navigateTo({
      url: '/pages/pagetwo/rixietang/index?pageid=' +1 ,
    })
  }, 
  chongxFn3:function(e){
    wx.navigateTo({
      url: '/pages/pagetwo/tangniaobfz/index?pageid=' +1 ,
    })
  }, 
  chongxFn4:function(e){
    wx.navigateTo({
      url: '/pages/page/jiwang/index?pageid=' +1 ,
    })
  }, 
  chongxFn5:function(e){
    wx.navigateTo({
      url: '/pages/page/jiazu/index?pageid=' +1 ,
    })
  }, 
  chongxFn6:function(e){
    wx.navigateTo({
      url: '/pages/pagetwo/zhongyi/index?pageid=' +1 ,
    })
  }, 
  chongxFn7:function(e){
    wx.navigateTo({
      url: '/pages/pack/geren/index?pageid=' +1 ,
    })
  }, 
  chongxFn8:function(e){
    wx.navigateTo({
      url: '/pages/pagetwo/yinshi/index?pageid=' +1 ,
    })
  }, 
  chongxFn9:function(e){
    wx.navigateTo({
      url: '/pages/pagetwo/yundong/index?pageid=' +1 ,
    })
  }, 
  chongxFn10:function(e){
    wx.navigateTo({
      url: '/pages/pagetwo/xinli/index?pageid=' +1 ,
    })
  }, 
  binchenlist:function(e){
    this.setData({
      tid:e.currentTarget.dataset.id
    })
    this.onshiwld()
  },
  onshiwld:function(){
    var that = this;
  
    wx.showLoading({
      title:'加载中'
    })
    if(this.data.tid==1){
      var url = app.globalData.url + '/api/selectUserCamperCourseByUserId';
    }
    if(this.data.tid==2){
      var url = app.globalData.url + '/api/selectUserCamperGlucoseByUserId';
    }
    if(this.data.tid==3){
      var url = app.globalData.url + '/api/selectUserCamperComplicationByUserId';
    }
    if(this.data.tid==4){
      var url = app.globalData.url + '/api/selectUserCamperHistoryByUserId';
    }
    if(this.data.tid==5){
      var url = app.globalData.url + '/api/selectUserCamperFamilyByUserId';
    }
    if(this.data.tid==6){
      var url = app.globalData.url + '/api/selectUserCamperMedicineByUserId';
    }
    if(this.data.tid==7){
      var url = app.globalData.url + '/api/selectUserCamperPersonalByUserId';
    }
    if(this.data.tid==8){
      var url = app.globalData.url + '/api/selectUserCamperHabitsByUserId';
    }
    if(this.data.tid==9){
      var url = app.globalData.url + '/api/selectUserCamperExerciseByUserId';
    }
    if(this.data.tid==10){
      var url = app.globalData.url + '/api/selectUserCamperPsychologyByUserId';
    }
    var data = {
      userId:app.globalData.user_id,
    }
    app.wxRequest('get', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        if(that.data.tid==1){
          that.setData({
            listuser:res.data.userCourse,
          })
        }
        if(that.data.tid==2){
          that.setData({
            listuser:res.data.camperGlucose,
          })
        }
        if(that.data.tid==3){
          that.setData({
   
            retinopathy:JSON.parse(res.data.camperComplication.retinopathy),//视网膜病变
            numbness:JSON.parse(res.data.camperComplication.numbness),//糖尿病神经病变
            pain:JSON.parse(res.data.camperComplication.pain),//糖尿病肾病
            urination:JSON.parse(res.data.camperComplication.urination),//下肢血管病变
            abdominalDistention:res.data.camperComplication.abdominalDistention,//糖尿病神经病变其他
            sweating:res.data.camperComplication.sweating,//肾病其他
            peripheralNeuropathy:res.data.camperComplication.peripheralNeuropathy,//视网膜其他
            impotentia:res.data.camperComplication.impotentia,//下肢血管病变其他
          })
        }
        if(that.data.tid==4){
          that.setData({
     
            coronary:JSON.parse(res.data.camperHistory.coronary),//既往
            other:res.data.camperHistory.other,//其他
          })
        }
        if(that.data.tid==5){
          that.setData({
            diabetes:JSON.parse(res.data.camperFamily.diabetes),//家族史
            other:res.data.camperFamily.other,//其他
          })
        }
        if(that.data.tid==6){
          that.setData({
            listuser:res.data.camperMedicine,
          })
        }
        if(that.data.tid==7){
          that.setData({
            listuser:res.data.camperPersonal,
          })
        }
        if(that.data.tid==8){
          that.setData({
            listuser:JSON.parse(res.data.camperHabits.flourRice),
          })
        }
        if(that.data.tid==9){
          that.setData({
            slot:JSON.parse(res.data.camperExercise.slot),
            sportType:JSON.parse(res.data.camperExercise.sport_type),
            days:res.data.camperExercise.days,
            feeling:res.data.camperExercise.feeling,
            duration:res.data.camperExercise.duration,
          })
        }
          if(that.data.tid==10){
            that.setData({
              emotion:JSON.parse(res.data.camperPsychology.emotion),
              pressure:res.data.camperPsychology.pressure,
              duration:res.data.camperPsychology.duration,
              energy:res.data.camperPsychology.energy,
              sleep:res.data.camperPsychology.sleep,
              sleepTime:res.data.camperPsychology.sleepTime,
            })
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onshiwld()
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