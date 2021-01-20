const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  auth: state => "state.auth.user",
  avatar: () =>
    "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
};
export default getters;
