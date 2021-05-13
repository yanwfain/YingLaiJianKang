// pages/shipdeeliwen/index.js
import IMController from '../../../controller/im.js'
import { connect } from '../../../redux/index.js'
let app = getApp()
let store = app.store
let pageConfig = {

  /**
   * 页面的初始数据
   */
  data: {
    tit:'插件准备中...',
    isbtn:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

   
    wx.showLoading({
      title: '等待医师发起',
    })
    var that = this
    setTimeout(function(){
      that.setData({
        doctorId:app.globalData.doctorId,
        isbtn:true,
        tit:'准备就绪'
      })
      wx.hideLoading({
        success: (res) => {},
      })
    },2000)
    this.resetStore()
    this.doLogin()
  },

  switchToChating(e) {
    console.log(e)
    let account = this.data.doctorId
    let unread = 0
    
    let session = 'p2p-'+account
    // 更新会话对象
    store.dispatch({
      type: 'CurrentChatTo_Change',
      payload: session
    })
    let typeAndAccount = session.split('-')
    var chatType
    if (typeAndAccount[0] === 'team') {
      let card = this.data.groupList[typeAndAccount[1]] || {}
      chatType = card.type || 'team'
      store.dispatch({
        type: 'Set_Current_Group',
        payload: account
      })
    } else {
      chatType = 'p2p'
    }
    // 告知服务器，标记会话已读
    console.log(session)
    if(unread>0){
      app.globalData.nim.resetSessionUnread(session)
    }
   
    // 跳转
    wx.redirectTo({
      url: `/partials/chating/chating?chatTo=${account}&type=${chatType}&fid=1`,
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
  onShow(){
    var that = this
    this.resetStore()
 
  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
  },


  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
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

  },
/**
   * 重置store数据
   */
  resetStore: function () {
    store.dispatch({
      type: 'Reset_All_State'
    })
  },
  /**
   * 用户输入事件：dataset区分输入框类别
   */
  inputHandler: function (e) {
    let temp = {}
    temp[e.currentTarget.dataset.type] = e.detail.value
    this.setData(temp)
  },

  /**
   * 执行登录逻辑
   */
  doLogin: function () {
    new IMController({
      token: app.globalData.token,
      account: app.globalData.account 
    })
  }
}

let mapStateToData = (state) => {
  return {
    isLogin: state.isLogin || store.getState().isLogin
  }
}
const mapDispatchToPage = (dispatch) => ({
  loginClick: function() {
    this.doLogin()
    return
  }
})
let connectedPageConfig = connect(mapStateToData, mapDispatchToPage)(pageConfig)

Page(connectedPageConfig)