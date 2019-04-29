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
					path: 'shop',
					name: 'shop',
					component: () => import( /* webpackChunkName: "shop" */ '@/views/Shop/Shop.vue'),
				},
				{
					path: 'funddetails',
					name: 'funddetails',
					component: () => import( /* webpackChunkName: "shop" */ '@/views/Shop/FundDetails.vue'),
				},
				{
					path: 'companydetails/:aid',
					name: 'companydetails',
					component: () => import( /* webpackChunkName: "shop" */ '@/views/Shop/CompanyDetails.vue'),
				},
				{
					path: 'fundAnno',
					name: 'fundAnno',
					component: () => import( /* webpackChunkName: "shop" */ '@/views/Shop/FundAnno.vue'),
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
					path: 'about',
					// name: 'about',
					component: () => import( /* webpackChunkName: "about" */ '@/views/About/About.vue'),
					children: [
						{
							path: '/',
							name: 'about_root',
							component: () => import( /* webpackChunkName: "about" */ '@/views/About/Aboutus.vue')
						}
						// ,{
						// 	path: '/aboutus',
						// 	name: 'about_aboutus',
						// 	component: Aboutus
						// }
						,{
							path: 'anno',
							name: 'about_anno',
							component: () => import( /* webpackChunkName: "about" */ '@/views/About/Anno.vue')
						}
						,{
							path: 'annoDetail/:aid',
							name: 'about_annoDetail',
							component: () => import( /* webpackChunkName: "about" */ '@/views/About/AnnoDetail.vue')
						}
						,{
							path: 'legal',
							name: 'about_legal',
							component: () => import( /* webpackChunkName: "about" */ '@/views/About/Legal.vue')
						}
						,{
							path: 'document',
							name: 'about_document',
							component: () => import( /* webpackChunkName: "about" */ '@/views/About/Document.vue')
						}
						,{
							path: 'help',
							name: 'about_help',
							component: () => import( /* webpackChunkName: "about" */ '@/views/About/Help.vue')
						}
						,{
							path: 'investorEducation',
							name: 'about_investorEducation',
							component: () => import( /* webpackChunkName: "about" */ '@/views/About/InvestorEducation.vue')
						}
						,{
							path: 'optionGuide',
							name: 'about_optionGuide',
							component: () => import( /* webpackChunkName: "about" */ '@/views/About/OptionGuide.vue')
						}
						,{
							path: 'complain',
							name: 'about_complain',
							component: () => import( /* webpackChunkName: "about" */ '@/views/About/Complain.vue')
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