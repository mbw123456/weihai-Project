import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Base from './views/Base/Base.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [{
			path: '/',
			// name: 'home',
			component: Home,
			children: [{
					path: '',
					name: 'base',
					component: Base, //默认一级路由
					// redirect:'/home/base',
				},
				{
					path: 'need',
					name: 'need',
					component: () => import( /* webpackChunkName: "shop" */ '@/views/Need/Need.vue'),
				},
				{
					path: 'service',
					name: 'service',
					component: () => import( /* webpackChunkName: "shop" */ '@/views/Service/Service.vue'),
				},
				{
					path: 'funddetails',
					name: 'funddetails',
					component: () => import( /* webpackChunkName: "shop" */ '@/views/Need/FundDetails.vue'),
				},
				{
					path: 'companydetails/:aid',
					name: 'companydetails',
					component: () => import( /* webpackChunkName: "shop" */ '@/views/Need/CompanyDetails.vue'),
				},
				{
					path: 'fundAnno',
					name: 'fundAnno',
					component: () => import( /* webpackChunkName: "shop" */ '@/views/Need/FundAnno.vue'),
				},
				{
					path: 'risk',
					name: 'risk',
					component: () => import( /* webpackChunkName: "account" */ '@/views/Account/Risk.vue'),
					meta: {
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
				},
				{
					path: 'bankcard',
					name: 'bankcard',
					component: () => import( /* webpackChunkName: "account" */ '@/views/Account/Bankcard.vue'),
					meta: {
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
				},
				{
					path: 'changebankcard',
					name: 'changebankcard',
					component: () => import( /* webpackChunkName: "account" */ '@/views/Account/ChangeBankcard.vue'),
					meta: {
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
				},
				{
					path: 'purchase',
					name: 'purchase',
					component: () => import( /* webpackChunkName: "account" */ '@/views/Account/Purchase.vue'),
					meta: {
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
				},
				{
					path: 'invest',
					name: 'invest',
					component: () => import( /* webpackChunkName: "account" */ '@/views/Account/Invest.vue'),
					meta: {
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
				},
				{
					path: 'account',
					// name: 'account', 
					component: () => import( /* webpackChunkName: "account" */ '@/views/Account/Account.vue'),
					children: [{
							path: '',
							name: 'asset',
							component: () => import( /* webpackChunkName: "account" */ '@/views/Account/Asset.vue'),
							meta: {
								requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
							},
						},
						{
							path: 'plan',
							name: 'plan',
							component: () => import( /* webpackChunkName: "account" */ '@/views/Account/Plan.vue'),
							meta: {
								requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
							},
						},
						{
							path: 'detail',
							name: 'detail',
							component: () => import( /* webpackChunkName: "account" */ '@/views/Account/Detail.vue'),
							meta: {
								requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
							},
						},
						{
							path: 'invite',
							name: 'invite',
							component: () => import( /* webpackChunkName: "account" */ '@/views/Account/Invite.vue'),
							meta: {
								requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
							},
						},
						{
							path: 'set',
							name: 'set',
							component: () => import( /* webpackChunkName: "account" */ '@/views/Account/Set.vue'),
							meta: {
								requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
							},
						},
					],
				},
				{
					path: 'case',
					// name: 'about',
					component: () => import( /* webpackChunkName: "about" */ '@/views/Case/Case.vue'),
					children: [
						{
							path: '/',
							name: 'caseAll',
							component: () => import( /* webpackChunkName: "about" */ '@/views/Case/CaseAll.vue')
						}
						,{
							path: 'help',
							name: 'about_help',
							component: () => import( /* webpackChunkName: "about" */ '@/views/Case/Help.vue')
						}
						,{
							path: 'optionGuide',
							name: 'about_optionGuide',
							component: () => import( /* webpackChunkName: "about" */ '@/views/Case/OptionGuide.vue')
						}
						,{
							path: 'complain',
							name: 'about_complain',
							component: () => import( /* webpackChunkName: "about" */ '@/views/Case/Complain.vue')
						}
					]
				}
			]
		},
		{
			path: '/login',
			name: 'login',
			component: () => import( /* webpackChunkName: "login" */ './views/Login.vue')
		},
		{
			path: '/register',
			name: 'register',
			component: () => import( /* webpackChunkName: "login" */ './views/Register.vue')
		},
		{
			path: '/forget',
			name: 'forget',
			component: () => import( /* webpackChunkName: "login" */ './views/Forget.vue')
		},
		{
			path: '/404',
			name: 'notFound',
			component: () => import( /* webpackChunkName: "login" */ './views/404.vue')
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