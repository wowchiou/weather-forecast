import { mount } from "@vue/test-utils";
import { createVuexStore } from "@/store";
import About from "./About.vue";

function mountComponent(config = {}) {
  config.mountOptions = config.mountOptions || {};
  config.plugins = config.plugins || {};
  const store = config.store || createVuexStore();
  return mount(About, {
    global: {
      plugins: [store],
    },
    ...config.mountOptions,
  });
}

let wrapper;

describe("About", () => {
  beforeEach(() => {
    wrapper = mountComponent();
  });

  it("About is exist", () => {
    expect(true).toBe(true);
  });
});
