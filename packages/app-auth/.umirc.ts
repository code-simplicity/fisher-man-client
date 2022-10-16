export default {
  npmClient: 'pnpm',
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      component: './Login',
    },
  ],
};
