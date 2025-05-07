import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export const routes = [
    {
        path: "/",
        name: "TestTableAutoScroll",
        component: () => import("@/views/testTableAutoScroll"),
    },
];

const createRouter = () =>
    new VueRouter({
        scrollBehavior: () => ({ y: 0 }),
        routes,
    });

const router = createRouter();

export default router;
