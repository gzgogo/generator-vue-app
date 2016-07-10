<style lang="stylus">
@import "./<%= componentName %>.<%= stylesheetExtension %>";
</style>

<template>
  <div class="<%= componentName %>">
    <hello-vue></hello-vue>
    <button type="button" @click="sayHello">{{name}}</button>
  </div>
</template>

<script>
  import helloVue from '../hello-vue/hello-vue.vue';

  export default {
    data () {
      return {
        name: 'Lucy'
      }
    },

    compiled () {

    },

    ready () {
    },

    methods: {
      sayHello() {
        alert('Hello ' + this.name);
      }
    },

    components: {
      helloVue: helloVue
    }
  }
</script>
