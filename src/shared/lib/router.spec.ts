import { expect } from 'chai';
import { router } from './router';
import { Block } from './block';

class PageOne extends Block {
  constructor() {
    super({});
  }
}

class PageTwo extends Block {
  constructor() {
    super({});
  }
}

class PageThree extends Block {
  constructor() {
    super({});
  }
}
enum TestRoutePaths {
  one = '/',
  two = '/two',
  three = '/three',
}

const routePathPageMap: Record<TestRoutePaths, typeof Block> = {
  [TestRoutePaths.one]: PageOne,
  [TestRoutePaths.two]: PageTwo,
  [TestRoutePaths.three]: PageThree,
};

describe('Router', () => {
  beforeEach(() => {
    router
      .use(TestRoutePaths.one, routePathPageMap[TestRoutePaths.one])
      .use(TestRoutePaths.two, routePathPageMap[TestRoutePaths.two])
      .start();
  });

  it('Router create 2 pages', () => {
    expect(router.routes.length).to.equal(2);
  });

  it('Router go', () => {
    router.go(TestRoutePaths.two);
    expect(window.location.pathname).to.equal(TestRoutePaths.two);
  });

  it('Router back', () => {
    router.go(TestRoutePaths.two);

    setTimeout(() => {
      router.back();
      expect(window.location.pathname).to.equal(TestRoutePaths.two);
    }, 3000);
  });

  it('Router use', () => {
    router.use(TestRoutePaths.three, routePathPageMap[TestRoutePaths.three]);
    expect(router.getRoute(TestRoutePaths.three) !== undefined).to.equal(true);
  });
});
