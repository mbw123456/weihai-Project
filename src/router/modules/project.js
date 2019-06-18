/** When your routing table is too long, you can split it into small modules **/


const projectRouter = [
	{
		path: 'project',
		name: 'project-index',
		component: () => import( /* webpackChunkName: "project" */ '@/views/Project/Index.vue'),
	},
	{
		path: 'projectDetail',
		name: 'project-detail',
		component: () => import( /* webpackChunkName: "project" */ '@/views/Project/Detail.vue'),
	},
]

export default projectRouter;
