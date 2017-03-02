/**
 * 路由配置
 */

import Avalon from 'avalon2';
import 'mmRouter';
// 记录所有路由
const routeStates = {};


const routeConfig = [{
  path: '/home',
  vmodel: require('../components/home/home.js'),
}];

function getPage(path) {
  return `<xmp is="ms-view" class="view-container" ms-widget="{path:'${path}',page: @page}"><xmp>`;
}

function initRoute(root) {
  routeConfig.map((item) => {
    routeStates[item.path] = {
      vm: item.vmodel,
      html: item.vmodel.template,
    };
    Avalon.router.add(`${item.path}`, () => {
      root.currentPath = item.path;
      root.currentView = getPage(item.path);
    });
    return item;
  });
}

export {
  routeStates,
  initRoute,
};
