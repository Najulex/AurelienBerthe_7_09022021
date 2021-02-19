import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
	{
		path: "/index",
		name: "index",
		component: () => import("@/pages/Index.vue"),
	},
	{
		path: "/login",
		name: "Login",
		component: () => import("@/pages/Login.vue"),
	},
	{
		path: "/signup",
		name: "Signup",
		component: () => import("@/pages/Signup.vue"),
	},
	{
		path: "/home",
		name: "Home",
		component: () => import("@/pages/Home.vue"),
	},
	{
		path: "/myaccount/:id",
		name: "MyAccount",
		component: () => import("@/pages/MyAccount.vue"),
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
