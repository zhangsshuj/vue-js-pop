export default {
    install: Vue => {
        var timer = null,
            fn = function(el) {
                timer = setInterval(() => {
                    let r = Math.ceil(Math.random()*255)
                    let g = Math.ceil(Math.random()*255)
                    let b = Math.ceil(Math.random()*255)
                    el.style.background = `rgba(${r},${g},${b})`
                    el.style.width = `${r}px`
                    el.style.height = `${g}px`
                    el.style.margin = 'auto'
                    // el.style.transform = `rotate3d(${r},${g},${b},${r}deg)`
                    el.style.transform = `perspective(500px) rotate3d(${r},${g},${b},${r}deg)`
                    el.style.transition = 'all .5s linear'
                },1000);
            }
        /**
         * 解决微信ios中input失去焦点不回弹问题
         * v-wxBlur
         */
        Vue.directive('wxBlur', {
            inserted: function (el) {

                // 获取微信版本号
                function getWxVersion () {
                    var wechatInfo = navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/i);
                    if (wechatInfo && wechatInfo instanceof Array && wechatInfo.length > 1) {
                        let wxVersion = wechatInfo[1];
                        return wxVersion;
                    }
                }

                // 微信版本号对比
                function isVersion (v1, v2) {
                    if (typeof v1 !== "string" || typeof v2 !== "string") return false;
                    var vs = [v1, v2].map(function (v) {
                        return v
                            .split(".")
                            .map(function (n) {
                                return ("00000" + n).slice(-5);
                            })
                            .join("");
                    });
                    return vs[0] > vs[1];
                }

                var isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                // 解决微信浏览器ios版本 6.7.4版本以上出现的input失去焦点后不回弹的bug
                if (isiOS && isVersion(getWxVersion(), "6.7.3")) {
                    let $el = el.tagName == "INPUT" ? el : el.querySelector("input");
                    $el.onblur = function () {
                        setTimeout(function () {
                            var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
                            window.scrollTo(0, Math.max(scrollHeight - 1, 0));
                        }, 100)
                    }
                }
            }
        })

        Vue.directive('tipBak', {
            bind: function(el,binding) {
                console.log('bind')
                let bind  = binding.value
                if (binding.arg) {
                    console.log('timer1')
                    fn(el)
                } else {
                    console.log('timer2')
                    if (timer) window.clearInterval(timer)
                    el.style.width = '100%'
                    el.style.height = '100px'
                    el.style.background = bind.color
                }
            },
            inserted: function (el) {
                console.log('inserted')
            },
            update: function (el,binding) {
                console.log('update')
                let bind  = binding.value
                if (timer) window.clearInterval(timer)
                if (binding.arg) {
                    fn(el)
                } else {
                    el.style.width = '100%'
                    el.style.height = '100px'
                    el.style.background = bind.color
                }
            },
            componentUpdated: function (el) {
               console.log('componentUpdated')
            },
            unbind: function (el) {
                console.log('unbind')
            }
        })

        Vue.directive("scroll", {
            inserted: function (el, binding) {
                console.log('div-div')
                let fn = binding.value;
                window.addEventListener('scroll', function (e) {
                    console.log('top:'+ el.getBoundingClientRect().top);
                    console.log('scrollHeight:'+el.scrollHeight);
                    console.log('scrollTop:'+el.scrollTop);
                    console.log('offsetHeight:'+el.offsetHeight);
                    console.log('offsetTop:'+el.offsetTop);
                    console.log('scrollTop:'+ el.scrollTop);
                })
            }
        })

    }
}
