// pages/play/play.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    action:{
      method:'play'
    },
    id:'',
    state:"play",
    song:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var mid = options.mid
    this.setData({
      id:mid
    })
    this.getSongInfoById()
  },

  getSongInfoById:function(){
    var curId=this.data.id
    var _this = this
    wx.request({
      url: 'https://music.163.com/api/song/detail/?id='+curId+'&ids=['+curId+']',
     
      success:function(res){
        var msong=res.data.songs[0];
        _this.setData({
          song:msong
        })
        console.log(_this.data.song)
      },
      fail:function(){
        console.log(111)
      }

    })
  },

  playOrPause:function(){
    var musicState = this.data.state
    if(musicState=="play"){
      this.setData({
        action:{
          method:"pause"
        },
        state:"pause"
      })
    }else{
      this.setData({
        action:{
          method:"play"
        },
        state:"play"
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