import { TestWindow } from '@stencil/core/testing';
import { BvaSongdrawer } from './bva-songdrawer';

describe('bva-songdrawer', () => {
  it('should build', () => {
    expect(new BvaSongdrawer()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLBvaSongdrawerElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [BvaSongdrawer],
        html: '<bva-songdrawer></bva-songdrawer>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
