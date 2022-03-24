import { mount } from '@vue/test-utils';
import AppIcon from './AppIcon.vue';

const propsData = {
  icon: 'test',
};

function mountComponent(config = {}) {
  config.mountOptions = config.mountOptions || {};
  config.plugins = config.plugins || {};
  return mount(AppIcon, {
    propsData,
    ...config.mountOptions,
  });
}

let wrapper;

describe('AppIcon', () => {
  beforeEach(() => {
    wrapper = mountComponent();
  });

  it('has icon text', () => {
    const icon = wrapper.find('[data-test="icon"]');
    expect(icon.text()).toContain(propsData.icon);
  });
});
