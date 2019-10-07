import App from "@/App.vue";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import VueRouter from "vue-router";

const localVue = createLocalVue();
localVue.use(VueRouter);

describe("App.vue", () => {
  const wrapperApp = shallowMount(App, {
    localVue
  });

  test("It match the snapshot", () => {
    expect(wrapperApp.vm.$el).toMatchSnapshot();
  });
});
