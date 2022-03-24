import { shallowMount } from '@vue/test-utils';
import AppSwitch from './AppSwitch.vue';

const propsData = {
  active: false,
};

function mountComponent(config = {}) {
  config.mountOptions = config.mountOptions || {};
  config.plugins = config.plugins || {};
  return shallowMount(AppSwitch, {
    propsData,
    ...config.mountOptions,
  });
}

let wrapper;

describe('AppSwitch', () => {
  beforeEach(() => {
    wrapper = mountComponent();
  });

  it('props active false, button without active class', () => {
    const $SWITCH_BUTTON = wrapper.find('[data-test="switch-btn"]');
    expect($SWITCH_BUTTON.classes()).not.toContain('active');
  });

  it('props active true, button with active class', async () => {
    await wrapper.setProps({ active: true });
    let $SWITCH_BUTTON = wrapper.find('[data-test="switch-btn"]');
    expect($SWITCH_BUTTON.classes()).toContain('active');
  });
});
