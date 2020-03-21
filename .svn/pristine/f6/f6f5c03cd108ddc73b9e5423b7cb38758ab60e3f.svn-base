/*
* @Author: Your name
* @Date:   2019-12-27 12:23:45
* @Last Modified by:   Your name
* @Last Modified time: 2019-12-27 12:23:45
*/
import { shallowMount } from '@vue/test-utils';
import HelloWorld from '@/components/HelloWorld.vue';

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
