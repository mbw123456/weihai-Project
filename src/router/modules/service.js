/** When your routing table is too long, you can split it into small modules **/


const serviceRouter = [
	{
		path: 'service',
		name: 'service-index',
		component: () => import( /* webpackChunkName: "expert" */ '@/views/Service/Index.vue'),
	},
	{
		path: 'serviceDetail',
		name: 'service-detail',
		component: () => import( /* webpackChunkName: "project" */ '@/views/Service/Detail.vue'),
	},
]

export default serviceRouter;
