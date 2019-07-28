/** When your routing table is too long, you can split it into small modules **/


const innovationRouter = [
	{
		path: 'innovation',
		name: 'innovation-index',
		component: () => import( /* webpackChunkName: "project" */ '@/views/Innovation/Index.vue'),
	},
	{
		path: 'innovationList',
		name: 'innovation-list',
		component: () => import( /* webpackChunkName: "project" */ '@/views/Innovation/List.vue'),
	},
	{
		path: 'innovationDetail',
		name: 'innovation-detail',
		component: () => import( /* webpackChunkName: "project" */ '@/views/Innovation/Detail.vue'),
	},
]

export default innovationRouter;
