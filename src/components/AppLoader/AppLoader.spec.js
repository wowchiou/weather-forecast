import { shallowMount } from '@vue/test-utils';
import AppLoader from './AppLoader.vue';

function mountComponent(config = {}) {
  config.mountOptions = config.mountOptions || {};
  config.plugins = config.plugins || {};
  return shallowMount(AppLoader, {
    ...config.mountOptions,
  });
}

let wrapper;

describe('AppLoader', () => {
  beforeEach(() => {
    wrapper = mountComponent();
  });

  it('loader is exist', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
