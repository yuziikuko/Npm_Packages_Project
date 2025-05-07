import Vue from "vue";
import App from "./App.vue";
import router from "@/router";

/**
 * ElementUI
 */
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

/**
 * 全局工具方法
 */
import lodash from "lodash";
Vue.prototype.$lodash = lodash;

Vue.config.productionTip = false;

new Vue({
    router,
    render: (h) => h(App),
}).$mount("#app");
