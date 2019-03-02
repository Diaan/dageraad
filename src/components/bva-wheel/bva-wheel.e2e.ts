import { newE2EPage } from '@stencil/core/testing';

describe('bva-wheel', () => {
  it('renders', async () => {
    const page = await newE2EPage({ url: '/wheel' });

    const element = await page.find('bva-wheel');
    expect(element).toHaveClass('hydrated');
  });

  it('renders the title', async () => {
    const page = await newE2EPage({ url: '/' });

    const element = await page.find('bva-wheel >>> h1');
    expect(element.textContent).toEqual('Stencil App Starter');
  });
});
