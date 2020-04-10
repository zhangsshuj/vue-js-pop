export default class storageCross {
  constructor(opt) {
    this.type = opt.type
    this.key = opt.key
    this.val = opt.val
    this.callBack = opt.callBack ? opt.callBack.bind(this) : function() {}
    this.map = {
        setItem: (key, value) => window.localStorage['setItem'](key, value),
        getItem: (key) => window.localStorage['getItem'](key)
    }
    this.onMessage()
  }
  postMessage() {
    var req = {
      type: this.type,
      key: this.key,
      val: this.val
    }
   window.parent.postMessage(req, '*')
   this.callBack('cube-success')
  }
  listenFn(e) {
    let _this = this
      console.log('cube-message')
      let obj = e.data
      if (obj.type == 'setItem') {
          _this.map[obj.type](obj.key, obj.val)
      }  else if (obj.type == 'getItem') {
          const val = _this.map['getItem'](obj.key)
          window.parent.postMessage({val: val, type: ''},'*')
      } else {
          _this.callBack(obj)
      }
  }
  onMessage() {
    let _this = this
    // window.addEventListener('message', _this.listenFn.bind(_this))
      window.onmessage = _this.listenFn.bind(_this)
  }
}
