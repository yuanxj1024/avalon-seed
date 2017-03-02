import 'babel-polyfill';
import Avalon from 'avalon2';
// import cookie from 'js-cookie';
// import header from './components/header/header';
import {
  initRoute,
  routeStates,
} from './service/route-config.js';

// console.log('index', Avalon, '\r\ncookie\r\n', cookie, header);

Avalon.config({
  debug: true,
});

// 记录所有路由
// const routeStates = {};

const RootView = Avalon.define({
  $id: 'root',
  currentPath: '',
  currentView: '22',
});

// console.log(RootView);

Avalon.component('ms-view', {
  template: '<div ms-html="@page" class="route-view"></div>',
  defaults: {
    page: '111111111',
    path: 'no',
    onReady(e) {
      const path = e.vmodel.path;
      const state = routeStates[path];
      if (state && path) {
        Avalon.vmodels[state.vm.$id] = state.vm;
        Avalon.vmodels[state.vm.$id].init();
        setTimeout(() => {
          e.vmodel.page = state.html;
        }, 200);
      }
    },
    onDispose(e) {
      const path = e.vmodel.paht;
      const state = routeStates[path];
      const vm = state.vm;
      const render = vm.render;
      if (render) {
        render.dispose();
        delete Avalon.vmodels[vm.$id];
      }
    },
  },
});

function createRouter() {
  initRoute(RootView);

  Avalon.history.start({
    root: '/home',
  });

  const hash = location.hash.replace(/#!?/, '');
  Avalon.router.navigate(hash || '/home', 2); // 默认打开
}

createRouter();


// 启动扫描机制,让avalon接管页面
Avalon.ready(() => {
  Avalon.scan(document.body);
});
