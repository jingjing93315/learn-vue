export default {
  render(h) {
    // let component = null;
    // this.$router.$options.routes.forEach((route) => {
    //   if (route.path === this.$router.current) {
    //     component = route.component;
    //   }
    // });
    const {routerMap, current} = this.$router
    const component = routerMap[current] ? routerMap[current].component: null

    return h(component);
  },
};
