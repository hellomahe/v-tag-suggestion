<template>
  <div>
    <tag :tags="tags" :suggestions="suggestions" :suggestionLength="suggestionLength" @removeItem="removeTag" @addItem="addTag"/>
  </div>
</template>

<script>
import Tag from './Tag.vue';

  export default{
    name:'v-tag-suggestion',
    props:['tags','suggestions','suggestionLength'],
    components:{
      Tag
    },
    methods:{
      removeTag(i){
        this.tags.splice(i,1)
      },
       addTag(tag){
        this.tags.push(tag);
      }
    }
  }
</script>