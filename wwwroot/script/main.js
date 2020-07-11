//new Vue().$mount('#app')

var Main = {
    data() {
        return {
            fit: 'contain',
            url: 'img/WHU.png'
        }
    }
}
var Ctor = Vue.extend(Main)
new Ctor().$mount('#app')