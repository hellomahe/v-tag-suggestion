import tag from './v-tag-suggestion.vue';

module.exports = {
  install: function (Vue, options) {
    Vue.component('v-tag-suggestion', tag);
  }
};