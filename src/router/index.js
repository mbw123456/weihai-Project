import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Base from '@/views/Base/Base.vue'
import projectRouter from './modules/project'
import expertRouter from './modules/expert'
import serviceRouter from './modules/service'
import accountRouter from './modules/account'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [{
			path: '/',
			// name: 'home',
			component: Home,
			children: [
				{
					path: '',
					name: 'base',
					component: Base, //默认一级路由
					// redirect:'/home/base',
				},
				{
					path: 'baseDetail',
					name: 'base-detail',
					component: () => import( /* webpackChunkName: "account" */ '@/views/Base/Detail.vue'),
					meta: {
						keepAlive: false,
					},
				},
				...projectRouter,
				...expertRouter,
				...serviceRouter,
				accountRouter,
				
				// {
				// 	path: 'risk',
				// 	name: 'risk',
				// 	component: () => import( /* webpackChunkName: "account" */ '@/views/Account/Risk.vue'),
				// 	meta: {
				// 		requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
				// 	},
				// },
				// {
				// 	path: 'bankcard',
				// 	name: 'bankcard',
				// 	component: () => import( /* webpackChunkName: "account" */ '@/views/Account/Bankcard.vue'),
				// 	meta: {
				// 		requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
				// 	},
				// },
				// {
				// 	path: 'changebankcard',
				// 	name: 'changebankcard',
				// 	component: () => import( /* webpackChunkName: "account" */ '@/views/Account/ChangeBankcard.vue'),
				// 	meta: {
				// 		requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
				// 	},
				// },
				// {
				// 	path: 'purchase',
				// 	name: 'purchase',
				// 	component: () => import( /* webpackChunkName: "account" */ '@/views/Account/Purchase.vue'),
				// 	meta: {
				// 		requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
				// 	},
				// },
				// {
				// 	path: 'invest',
				// 	name: 'invest',
				// 	component: () => import( /* webpackChunkName: "account" */ '@/views/Account/Invest.vue'),
				// 	meta: {
				// 		requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
				// 	},
				// },
				
			]
		},
		{
			path: '/login',
			name: 'login',
			component: () => import( /* webpackChunkName: "login" */ '@/views/Login.vue')
		},
		{
			path: '/register',
			name: 'register',
			component: () => import( /* webpackChunkName: "login" */ '@/views/Register.vue')
		},
		{
			path: '/forget',
			name: 'forget',
			component: () => import( /* webpackChunkName: "login" */ '@/views/Forget.vue')
		},
		{
			path: '/404',
			name: 'notFound',
			component: () => import( /* webpackChunkName: "login" */ '@/views/404.vue')
		},
		{
			path: '*',
			redirect: {
				path: '/404'
			},
			/*默认跳转路由*/
		},


	]
})