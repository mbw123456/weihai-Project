/** When your routing table is too long, you can split it into small modules **/


const accountRouter = {
		path: 'account',
		// name: 'account', 
		component: () => import( /* webpackChunkName: "account" */ '@/views/Account/Index.vue'),
		children: [{
				path: 'need',
				name: 'account-project',
				component: () => import( /* webpackChunkName: "account" */ '@/views/Account/MyProject/Index.vue'),
				meta: {
					requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					custType: ['1','3'],
				},
			},
			{
				path: 'need/needDetail',
				name: 'need-detail',
				component: () => import( /* webpackChunkName: "account" */ '@/views/Account/MyProject/Detail.vue'),
				meta: {
					requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					keepAlive: false,
					// custType: ['1','3'],
				},
			},
			{
				path: 'need/needPublish',
				name: 'need-publish',
				component: () => import( /* webpackChunkName: "account" */ '@/views/Account/MyProject/Publish.vue'),
				meta: {
					requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					keepAlive: false,
					// custType: ['1','3'],
				},
			},
			{
				path: 'gain',
				name: 'gain-index',
				component: () => import( /* webpackChunkName: "account" */ '@/views/Account/MyGain/Index.vue'),
				meta: {
					requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
				},
			},
			{
				path: 'gain/gainPublish',
				name: 'gain-publish',
				component: () => import( /* webpackChunkName: "account" */ '@/views/Account/MyGain/Publish.vue'),
				meta: {
					requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					keepAlive: false,
					// custType: ['1','3'],
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
