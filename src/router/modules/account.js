/** When your routing table is too long, you can split it into small modules **/


const accountRouter = {
		path: 'account',
		// name: 'account', 
		component: () => import( /* webpackChunkName: "account" */ '@/views/Account/Index.vue'),
		children: [{
				path: '',
				name: 'account-project',
				component: () => import( /* webpackChunkName: "account" */ '@/views/Account/MyProject/Index.vue'),
				meta: {
					requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					custType: ['1','3'],
				},
			},
			{
				path: 'attentionMe',
				name: 'account-attme',
				component: () => import( /* webpackChunkName: "account" */ '@/views/Account/Attention/AttMe.vue'),
				meta: {
					requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
				},
			},
			{
				path: 'myAttention',
				name: 'account-myatt',
				component: () => import( /* webpackChunkName: "account" */ '@/views/Account/Attention/MyAtt.vue'),
				meta: {
					requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
				},
			},
			{
				path: 'message',
				name: 'account-message',
				component: () => import( /* webpackChunkName: "account" */ '@/views/Account/Message/Index.vue'),
				meta: {
					requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
				},
			},
			{
				path: 'set',
				name: 'account-set',
				component: () => import( /* webpackChunkName: "account" */ '@/views/Account/Set/Index.vue'),
				meta: {
					requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
				},
			},


		],
	};


export default accountRouter;
