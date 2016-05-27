/**
 * Created by G.zhen on 2016/5/25.
 */
//var Vue = require('vue');

require("../stylesheets/common-style.styl");

Vue.component('hello-vue', require("./components/hello-vue/hello-vue.vue"));

var appVM = new Vue({
    el: "#app"
  }
);
