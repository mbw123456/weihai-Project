/** When your routing table is too long, you can split it into small modules **/


const serviceRouter = [
	{
		path: 'service',
		name: 'service-index',
		component: () => import( /* webpackChunkName: "expert" */ '@/views/Service/Index.vue'),
	},
]

export default serviceRouter;
