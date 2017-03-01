/**
 * 通用交互
 */
import Cookie from 'js-cookie';

const authURL = 'https://user.niuguwang.com/api_wap/wechat/oauthLogin.aspx?oauthtype=wechat&back=';

/**
 * 获取queryString中的key
 */
export const search = (key) => {
  let res;
  let ss;
  let i;
  let sss;
  let s = window.location.search;
  if (s) {
    s = s.substr(1);
    if (s) {
      ss = s.split('&');
      for (i = 0; i < ss.length; i += 1) {
        sss = ss[i].split('=');
        if (sss && sss[0] === key) {
          res = sss[1];
        }
      }
    }
  }
  return res;
};

export const auth = () => {
  return new Promise((resolve, reject) => {
    const token = search('userToken');
    if (resolve) {
      Cookie.set('userToken', token);
      resolve(token);
    } else {
      reject();
    }
  });
};

export function wechatLogin(url) {
  window.location.href = `${authURL}${url}`;
}
