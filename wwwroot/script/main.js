//new Vue().$mount('#app')

var Main = {
    data() {
        return {
            activeIndex: '1',
            activeIndex2: '2'
        };
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}
var Ctor = Vue.extend(Main)
new Ctor().$mount('#app')

//var Main = {
//    data() {
//        return {
//            fit: 'contain',
//            url: 'img/WHU.png'
//        }
//    }
//}
//var Ctor = Vue.extend(Main)
//new Ctor().$mount('#app')

