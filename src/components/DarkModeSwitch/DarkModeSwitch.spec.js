import { mount } from '@vue/test-utils';
import DarkModeSwitch from './DarkModeSwitch.vue';
import { WEATHER_DARK_MODE } from '@/storage.js';

let wrapper;

describe('DarkModeSwitch', () => {
  beforeEach(() => {
    wrapper = mount(DarkModeSwitch);
  });

  it('has sun icon', () => {
    const $SUN_ICON = wrapper.find('[data-test="dark-sun"]');
    expect($SUN_ICON.html()).toContain('wb_sunny');
  });

  it('has moon icon', () => {
    const $MOON_ICON = wrapper.find('[data-test="dark-moon"]');
    expect($MOON_ICON.html()).toContain('nightlight_round');
  });

  it(`switch button is exists`, () => {
    const $SWITCH_BUTTON = wrapper.find('[data-test="dark-switch"]');
    expect($SWITCH_BUTTON.exists()).toBeTruthy();
  });

  it(`click switch button, toggle dark mode`, async () => {
    const $SWITCH_BUTTON = wrapper.find('[data-test="dark-switch"]');
    await $SWITCH_BUTTON.trigger('click');
    expect(wrapper.vm.dark).toBe(true);
    expect(localStorage.getItem(WEATHER_DARK_MODE)).toContain('on');

    await $SWITCH_BUTTON.trigger('click');
    expect(wrapper.vm.dark).toBe(false);
    expect(localStorage.getItem(WEATHER_DARK_MODE)).toContain('off');
  });
});
