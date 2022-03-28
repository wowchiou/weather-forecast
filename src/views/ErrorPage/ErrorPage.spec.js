import { mount } from '@vue/test-utils';
import { createRouter, createWebHashHistory } from 'vue-router';
import { routes } from '@/router';
import ErrorPage from './ErrorPage.vue';

let wrapper;

describe('ErrorPage', () => {
  beforeEach(() => {
    wrapper = mount(ErrorPage);
  });

  it('show error title', () => {
    expect(wrapper.find('[data-test="error-title"]').text()).toBe(
      'Oops!Something went wrong!'
    );
  });

  it(`show page not found when message props undefined`, () => {
    expect(wrapper.find('[data-test="error-404"]').exists()).toBeTruthy();
  });

  it(`show error message when message props exists`, () => {
    wrapper = mount(ErrorPage, {
      props: { message: 'this is error message.' },
    });
    expect(wrapper.find('[data-test="error-404"]').exists()).toBeFalsy();
    expect(wrapper.find('[data-test="error-message"]').exists()).toBeTruthy();
    expect(wrapper.find('[data-test="error-message"]').text()).toBe(
      'this is error message.'
    );
  });

  it(`click home button routes to home page`, async () => {
    const router = createRouter({
      history: createWebHashHistory(process.env.BASE_URL),
      routes,
    });
    wrapper = mount(ErrorPage, {
      global: { plugins: [router] },
    });
    await wrapper.find('[data-test="home-button"]').trigger('click');
    await router.isReady();
    expect(wrapper.vm.$route.name).toBe('home');
  });
});
