const createResourceRoutes = (resource: string) => ({
  root: `/${resource}`,
  create: `/${resource}/create`,
  view: `/${resource}/view/:id`,
});
export const routes = {
  root: "/",
  login: '/login',
  setPassword: '/set-password',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password/:token',
  dasboard:createResourceRoutes('dashboard'),
};

export default routes;
