import Vue from 'vue'
import dialog from './dialog.vue'
const dialogConstructor = Vue.extend(dialog)
const dialogPull = []
let getInstance = () => {
    if(dialogPull.length>0) {
        let instance = dialogPull[0]
        dialogPull.slice(0,1)
        return instance
    }
    return new dialogConstructor({
        el:document.createElement('div')
    })
}
let removeDom = (event) => {
    if (event.target.parentNode) {
        event.target.parentNode.remove()
    }
}

let returnAnInstance = instance => {
    if (instance) {
        dialogPull.push(instance);
    }
}

dialogConstructor.prototype.close = function () {
    this.visible = false
    this.$el.addEventListener('transitionend',removeDom)
    returnAnInstance(this);
}

let Dialog = (options={}) => {
    let instance = getInstance()
    instance.close()
    instance.visible = true
    instance.propsData = options
    if (options.appendElement) {
        options.appendElement.appendChild(instance.$el)
    } else {
        document.body.appendChild(instance.$el)
    }
    return instance
}


export default Dialog