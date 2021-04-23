// pages/binlist/index.js
var app = getApp()
const innerAudioContext = wx.getBackgroundAudioManager();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    audiolist: [
      {
        audiosrc: '',
        coverimg: "https://goss.veer.com/creative/vcg/veer/800water/veer-146156021.jpg"
      }
    ],
    statusBarHeight: app.globalData.statusBarHeight,//获取导航高度
    isPlayAudio: true,
    audioSeek: 0,
    audioDuration: 0,
    showTime1: '00:00',
    showTime2: '00:00',
    audioTime: 0,
    islist: false,
    index: 0,
    audiosrc:"https://edu.baike360.cn/uploads/20200228/a428a883fc951a37ee7e278ddbdc143c.mp3",
    isaudios_start: false,
    heights:wx.getSystemInfoSync().windowHeight
    // https://edu.baike360.cn/uploads/20200228/a428a883fc951a37ee7e278ddbdc143c.mp3
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      id:options.id,
      name:options.name,
      'audiolist[0].audiosrc':options.audio,
      audiosrc:options.audio,
      img:options.img,
      type:options.type,
      audioSeek: 0,
      audioDuration: 0,
      day:options.day
    })
    clearInterval(this.data.durationIntval);
    // this.setData({
    //   name:'心灵放松',
    //   'audiolist[0].audiosrc': 'https://edu.baike360.cn/uploads/20200228/a428a883fc951a37ee7e278ddbdc143c.mp3',
    //   audioSeek: 0,
    //   audioDuration: 0,
    // })
    innerAudioContext.autoplay = true
    innerAudioContext.title = this.data.name
    innerAudioContext.src = this.data.audiosrc
    
    this.loadaudio();
    var that = this
    if(!options.type){
      this.setData({
        indeurl: setTimeout(function(){
          var url = app.globalData.url + '/api/saveHealingHeartRecord';
          var data = {
            userId:app.globalData.user_id,
            heartId:options.id
          }
          app.wxRequest('post', url, data, (res) => {
            console.log(res)
            wx.hideLoading()
            if (res.success) {
           
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
        },6000)
      })
    }
  
  
   
  },
  notiro: function (e) {
    wx.navigateBack({
      delta: 1,//返回的页面数，如果 delta 大于现有页面数，则返回到首页。
      success: function () { }
    })
  },
  // audioPlayed: function () {
  //   myAudio.play()
  //   setTimeout(() => {

  //     myAudio.currentTime

  //     myAudio.onTimeUpdate(() => {
  //       console.log(myAudio.duration)   //总时长
  //       console.log(myAudio.currentTime)   //当前播放进度
  //     })
  //   }, 500)
  // },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          systemInfo: res,
        })
        if (res.platform == "devtools") {
          console.log('pc')
        } else if (res.platform == "ios") {
          console.log('ios')
        } else if (res.platform == "android") {
          console.log('android')
        }
      }
    })

    this.audioCtx = wx.createAudioContext('myAudio')
    console.log(this.audioCtx)
    this.audioCtx.play()
  },
  //初始化播放器，获取duration
  // Initialization() {

  //   // if (this.data.audiolist[0].audiosrc.length != 0) {
  //   //设置src

  //   // if (this.data.url_id != 2) {
  //     // innerAudioContext.src = this.data.audiolist[0].audiosrc;
  //     //运行一次
  //     innerAudioContext.play();
  //     // innerAudioContext.pause();
  //     innerAudioContext.autoplay = true
  //     innerAudioContext.src = this.data.audiolist[0].audiosrc
  //     innerAudioContext.title = this.data.name
  //     innerAudioContext.onPlay(() => {
  //       console.log('开始播放')
  //       this.setData({
  //         isaudios_start: true
  //       })
  //       console.log('hhh')
  //       if (this.data.isaudios_start) {
  //         console.log('eeee')
  //         var that = this

  //         this.data.durationIntval = setInterval(function () {
  //           //当歌曲在播放时执行
  //           if (that.data.isPlayAudio == true) {
  //             //获取歌曲的播放时间，进度百分比
  //             var seek = that.data.audioSeek;
  //             var duration = innerAudioContext.duration;
  //             var time = that.data.audioTime;
  //             time = parseInt(100 * seek / duration);
  //             //当歌曲在播放时，每隔一秒歌曲播放时间+1，并计算分钟数与秒数
  //             var min = parseInt((seek + 1) / 60);
  //             var sec = parseInt((seek + 1) % 60);
  //             //填充字符串，使3:1这种呈现出 03：01 的样式
  //             if (min.toString().length == 1) {
  //               min = `0${min}`;
  //             }
  //             if (sec.toString().length == 1) {
  //               sec = `0${sec}`;
  //             }
  //             var min1 = parseInt(duration / 60);
  //             var sec1 = parseInt(duration % 60);
  //             if (min1.toString().length == 1) {
  //               min1 = `0${min1}`;
  //             }
  //             if (sec1.toString().length == 1) {
  //               sec1 = `0${sec1}`;
  //             }
           
            
  //             //当进度条完成，停止播放，并重设播放时间和进度条
  //             if (time >= 100) {
  //               innerAudioContext.stop();
  //               that.setData({ audioSeek: 0, audioTime: 0, audioDuration: duration, isPlayAudio: false, showTime1: `00:00` });
  //               that.botFn()
  //               console.log(that.data.showTime1)

  //               return false;

  //             }
  //             //正常播放，更改进度信息，更改播放时间信息
  //             that.setData({ audioSeek: seek + 1, audioTime: time, audioDuration: duration, showTime1: `${min}:${sec}`, showTime2: `${min1}:${sec1}` });

  //           }
  //         }, 1000);
  //       }
  //       this.setData({
  //         showTime1: '00:00',
  //         audioSeek: 0,
  //         audioDuration: 0,
  //       })

  //     })

  // },
  //拖动进度条事件
  sliderChange(e) {
    var that = this;
    // innerAudioContext.src = this.data.audiolist[0].audiosrc;
    // innerAudioContext.title = this.data.name;
    //获取进度条百分比
    var value = e.detail.value;
    this.setData({ audioTime: value });
    var duration = this.data.audioDuration;
    //根据进度条百分比及歌曲总时间，计算拖动位置的时间
    value = parseInt(value * duration / 100);
    //更改状态
    this.setData({ audioSeek: value, isPlayAudio: true });
    //调用seek方法跳转歌曲时间
    innerAudioContext.seek(value);
    //播放歌曲
    innerAudioContext.play();
  },
  //播放、暂停按钮
  playAudio() {
    //获取播放状态和当前播放时间

    var isPlayAudio = this.data.isPlayAudio;
    var seek = this.data.audioSeek;
    innerAudioContext.pause();
    // clearInterval(this.data.durationIntval);
    //更改播放状态
    this.setData({ isPlayAudio: !isPlayAudio })
    if (isPlayAudio) {
      //如果在播放则记录播放的时间seek，暂停
      // innerAudioContext.pause();
      this.audioCtx.pause()
      this.setData({ audioSeek: innerAudioContext.currentTime });
      console.log(this.data.audioSeek)

    } else {
      // clearInterval(this.data.durationIntval);
      console.log(this.data.audioSeek)
      // this.setData({
      //   showTime1: this.data.audioSeek
      // })
      console.log(this.data.showTime1)
      this.audioCtx.play()
      // innerAudioContext.play();
      //如果在暂停，获取播放时间并继续播放
      // innerAudioContext.src = this.data.audiolist[0].audiosrc;
      // innerAudioContext.title = this.data.name;
      if (innerAudioContext.duration != 0) {
        this.setData({ audioDuration: innerAudioContext.duration });
      }
      //跳转到指定时间播放
      innerAudioContext.seek(this.data.audioSeek);
      innerAudioContext.play();
      // var seek = this.data.audioSeek;
      // var duration = innerAudioContext.duration;
      // var time = this.data.audioTime;
      // time = parseInt(100 * seek / duration);
      // //当歌曲在播放时，每隔一秒歌曲播放时间+1，并计算分钟数与秒数
      // var min = parseInt((seek + 1) / 60);
      // var sec = parseInt((seek + 1) % 60);
      // //填充字符串，使3:1这种呈现出 03：01 的样式
      // if (min.toString().length == 1) {
      //   min = `0${min}`;
      // }
      // if (sec.toString().length == 1) {
      //   sec = `0${sec}`;
      // }
      // var min1 = parseInt(duration / 60);
      // var sec1 = parseInt(duration % 60);
      // if (min1.toString().length == 1) {
      //   min1 = `0${min1}`;
      // }
      // if (sec1.toString().length == 1) {
      //   sec1 = `0${sec1}`;
      // }
      // this.setData({
      //   showTime1: `${min}:${sec}`
      // })
      console.log(this.data.showTime1)
    }
  },
  loadaudio() {
    var that = this;
    //设置一个计步器
    // if (that.data.isaudios_start)
    console.log(innerAudioContext)
    this.data.durationIntval = setInterval(function () {
      //当歌曲在播放时执行
      if (that.data.isPlayAudio == true) {
        //获取歌曲的播放时间，进度百分比
        var seek = that.data.audioSeek;
        var duration = innerAudioContext.duration;
        var time = that.data.audioTime;
        console.log(time)
        console.log(seek)
        console.log(duration)
        time = parseInt(100 * seek / duration);
        //当歌曲在播放时，每隔一秒歌曲播放时间+1，并计算分钟数与秒数
        var min = parseInt((seek + 1) / 60);
        var sec = parseInt((seek + 1) % 60);
        //填充字符串，使3:1这种呈现出 03：01 的样式
        if (min.toString().length == 1) {
          min = `0${min}`;
        }
        if (sec.toString().length == 1) {
          sec = `0${sec}`;
        }
        var min1 = parseInt(duration / 60);
        var sec1 = parseInt(duration % 60);
        if (min1.toString().length == 1) {
          min1 = `0${min1}`;
        }
        if (sec1.toString().length == 1) {
          sec1 = `0${sec1}`;
        }
        // if(time =='')
        if(seek>=duration){
          that.botFn()
         
          that.setData({ audioSeek: 0, audioTime: 0, audioDuration: duration, isPlayAudio: false, showTime1: `00:00` });
          console.log(that.data.audiosrc)
          innerAudioContext.title = that.data.name
          innerAudioContext.src = that.data.audiosrc
          innerAudioContext.pause();
          return false;
        }
        //当进度条完成，停止播放，并重设播放时间和进度条
        if (time >= 100 ) {
          console.log(time)
          innerAudioContext.stop();
          that.setData({ audioSeek: 0, audioTime: 0, audioDuration: duration, isPlayAudio: false, showTime1: `00:00` });
          that.botFn()
          console.log(that.data.showTime1)
          return false;
        }
        //正常播放，更改进度信息，更改播放时间信息
        that.setData({ audioSeek: seek + 1, audioTime: time, audioDuration: duration, showTime1: `${min}:${sec}`, showTime2: `${min1}:${sec1}` });
      }
    }, 1000);

  },
  botFn:function(e){
    var that = this
    
    clearInterval(this.data.durationIntval);
    this.setData({
      audioSeek: 0,
      audioDuration: 0,
      isPlayAudio:true
    })
    console.log(that.data.audiosrc)
    innerAudioContext.title = that.data.name
    innerAudioContext.src = that.data.audiosrc
    innerAudioContext.pause();
    that.playAudio()
    this.loadaudio();
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
    innerAudioContext.stop();
    clearInterval(this.data.durationIntval);
    clearInterval(this.data.indeurl);
    
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