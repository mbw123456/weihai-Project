/** When your routing table is too long, you can split it into small modules **/


const expertRouter = [
	{
		path: 'expert',
		name: 'expert-index',
		component: () => import( /* webpackChunkName: "expert" */ '@/views/Expert/Index.vue'),
	},
]

export default expertRouter;
