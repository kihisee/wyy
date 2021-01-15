// pages/songlist/songlist.js
Page({
  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'page/component/pages/swiper/swiper'
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    imgUrls:[
      'http://p1.music.126.net/XDhXKZ_MXrtmpF0TirgS4w==/109951165603162901.jpg?imageView&quality=89',
      'http://p1.music.126.net/MgYPKk4icLAP093ynNRdWg==/109951165603250362.jpg?imageView&quality=89',
      'http://p1.music.126.net/ZtaPwpy3QykGl9Px-spGLQ==/109951165603281785.jpg?imageView&quality=89'
    ],
    songs:[
      {
        id:"446247878",
        name:"",
        album:{
          picUrl:"",
          name:"",
        },
        artists:"333"
      }
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  gotoPlay:function(event){
    console.log(234)
    var songid = event.currentTarget.dataset.songid;
    console.log(event)
    // wx.navigateTo({
    //   url: '../play/play?id='+songid,
    // })
  },
  getkeyword:function(e){
   
    var keyword = e.detail.value;
    console.log(keyword)
  }
})