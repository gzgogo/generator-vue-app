<style lang="stylus">
@import "./<%= componentName %>.<%= stylesheetExtension %>";
</style>

<template>
  <div class="<%= componentName %>">
    <hello-vue></hello-vue>
    <button type="button" @click="changeName">{{name}}</button>
    <div>{{msg}}</div>
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

    created () {
    },

    compiled () {

    },

    ready () {
    },

    props: {
      msg: {
        type: String, //[String, Number, Object]
        default: 'i am a prop from parent component'
      }
    },

    watch: {
      name (newVal, oldVal) {
        console.log(oldVal + ' changed to ' + newVal);
      }
    },

    methods: {
      changeName() {
        this.name = 'Jack';
        alert('Name is changed to ' + this.name);
      }
    },

    components: {
      helloVue: helloVue
    }
  }
</script>
