import Avalon from 'avalon2';

Avalon.parsers.card = (a) => {
  return a.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
};

const vm = Avalon.define({
  $id: 'first',
  template: require('./home.html'),
  tabs: [111, 222, 333],
  activeIndex: 0,
  aaa: '',
  panels: ['面板1', '面板2', '<p>这里可以是复杂的<b>HTML</b></p>'],
  init() {
    // Avalon.log('first init' + _.now());
  },
  formatCard(e) {
    const el = e.target;
    const caret = el.selectionStart;
    const value = el.value;
    const prev = value.slice(0, caret);
    const sp = (prev.match(/\s/) || []).length;
    const curr = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    const now = curr.slice(0, caret);
    const curSp = (now.match(/\s/) || []).length;
    el.value = curr;
    // 同步到ms-duplex中的pos去
    el._ms_duplex_.pos = (caret + curSp) - sp;
  },
});
// 成绩单
// 大家可以对比一下1.*的相同实现
// http://www.cnblogs.com/rubylouvre/p/3213430.html
const model = Avalon.define({
  $id: 'transcript',
  id: '',
  name: '',
  score: 0,
  total: 0,
  array: [],
  add() {
    this.array.push({
      id: this.id,
      name: this.name,
      score: this.score,
    });
  },
});

model.$watch('score', (a) => {
  let b = Number(a) || 0;
  if (b > 100) {
    b = 100;
  } else if (b < 0) {
    b = 0;
  }
  // b = (b > 100) ? 100 : b < 0 ? 0 : b; // 强制转换为0~100间
  model.score = b;
});

model.$watch('array', () => {
  let a = 0;
  model.array.forEach((el) => {
    a += el.score; // 求得总数
  });
  model.total = a;
  model.id = '';
  model.name = '';
  model.score = 0;
});

const ar1 = {
  id: 'd1',
  name: '李世民',
  score: 67,
};
const ar2 = {
  id: 'd2',
  name: '赢政',
  score: 90,
};

model.array = [ar1, ar2];

Avalon.ready(() => {
  Avalon.vmodels.root.headerPage = '<p>this is headerPage,first</p>';
});
module.exports = vm;
