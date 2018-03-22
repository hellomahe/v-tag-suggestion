# v-tag-suggestion

A simple tag component with typeahead ⌨️

![](http://res.cloudinary.com/mahe/image/upload/v1520916559/v-tag-suggestion.gif)


Install via npm

``` bash 
npm install vue-tag-suggestion
```

##### Import and register where you want to use

``` bash
import vue-tag-suggestion from 'vue-tag-suggestion'

components: {
      vue-tag-suggestion
    }
 ```
    
##### Props

  tags(Array of objects) - Selected tags 
  
  suggestions(Array of objects) - Suggestions

```bash 
  props:{
    tags:{
      type:Array,
      required:true
    },
    suggestions:{
      type:Array,
      required:false,
      default:() => {
        return[]
      }
    }
  }
  ```
  Note: Every object has to have a name property.

# Example
``` bash
<template>
  <div>
<tag
 :tags="tags" :suggestions="suggestion" />
  </div>
</template>

<script>
import tag from "../v-tag-suggestion.js"

export default {
  name: "TagInput",
  data() {
    return {
      tags: [
        {
          name: "hello"
        }
      ],
      suggestions: [
        {
          name: "This"
        },
        {
          name: "is"
        },
        {
          name: "a"
        },
        {
          name: "new"
        },
        {
          name: "vue"
        },
        {
          name: "tag"
        },
        {
          name: "component"
        },
        {
          name: "which"
        },
        {
          name: "will"
        },
        {
          name: "give"
        },
        {
          name: "auto"
        },
        {
          name: "suggestion"
        }
      ],
      msg: "Welcome to Your Vue.js App"
    };
  },
  components: {
    tag
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
```

#TODO
-~~Dynamic length for auto-suggestions as a prop~~
- Separators as a prop
