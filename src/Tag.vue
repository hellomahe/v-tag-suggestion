<template>
  <div>
  <ul class="tag-with-autosuggestion el-input el-input--small" @click="focusInput">
    <li class="tag-name" v-for="(tag,index) in tags">
      {{tag.name}}
      <i class="el-icon-close" @click="remove(index)"></i>
    </li>
    <li class="tag-input">
      <input type="text" ref="input" class="tag-input-inner" name="tag" v-model="name" @keyup.enter.prevent="checkAndAdd" autocomplete="off" autofocus="on" @keyup="validateKeyStroke" @keydown="select" @keyup.delete="removeLastItem">
      <div class="tag-suggestions-list" v-if="listSuggestions.length">
        <!-- <div class="suggestions-wrapper"> -->
          <li v-for="(tag,index) in listSuggestions" :class="highlight==index?'sugessted-tags sugessted-tags--highlight ' : 'sugessted-tags'" @click="add(tag.name)" ref="results" v-if="tag.name">
              {{tag.name}}
          </li>
        <!-- </div> -->
      </div>
    </li>
    <li class="a-lb show-suggestion-btn" @click="showAll =!showAll ">{{showAll ? 'Click To Show suggestions': 'Click To Show suggestions'}}
    </li>
  </ul>
  <div v-if="showAll">
    <ul class="all-suggesions tag-with-autosuggestion el-input el-input--small">
       <li class="tag-name " v-for="(tag,index) in top" @click="addFromSuggestion(tag.name, $event)">
        {{tag.name}}
       </li>
       <li class="a-lb show-suggestion-btn" @click="filter=!filter" v-if="top.length>8">
         {{suggestionsLen}}
       </li>
    </ul>
  </div>
</div>
</template>

<script>
  export default{
    name:'Tag',
      model: {
    prop: 'tags',
    event: 'change'
  },
  props:['tags','suggestions'],
    data(){
      return{
        name:'',
        highlight:-1,
        pause:true,
        filter:true,
        showAll:false
      }
    },
    watch:{
      listSuggestions(newVal){
        if(!this.listSuggestions){
          this.highlight=-1;
        }
        if(typeof(this.listSuggestions)=='object' && this.highlight ==-1){
          this.highlight=0;
        }
        // if(this.listSuggestions.length > 0 && this.highlight==-1){
        //   this.highlight=0; 
        //   // console.log("s")
        // }
      },
      highlight(newVal, oldVal){
        if(newVal <= -2){
          this.highlight=-1;
        }
      }
    },
    computed:{
      suggestionsLen(){
      return this.filter ? `Click To see ${this.suggestions.length-8} More Tags`:'Click To hide Tags'
      },
      top(){
        return this.filter ? this.suggestions.slice(0,8) : this.suggestions
      },
      listSuggestions(){  
        if(this.name.trim()==''){
          return false;
        }
        let tags = new Set()
        tags = this.suggestions.filter(x => {
          if(x.name.toString().toLowerCase().includes(this.name.toString().toLowerCase())){
            return x
          }
        })
        let isExist;
        if(tags.length!=0){
           isExist = this.tags.findIndex(x=>{
            if(!x.name){
              return
            }
            return x.name.toString().toLowerCase()==this.name.toString().toLowerCase()
          })
        }
        
        let currentTag = {
         name:this.name
        }
        let suggestions = tags.filter(x => {
          let findIndex = this.tags.findIndex(tag=> tag.name.toString().toLowerCase() == x.name.toString().toLowerCase());
          if(findIndex==-1){
            return x
          }
        }
          )

        suggestions.unshift(currentTag)
        return suggestions
      }
    },
    created(){

    },
    mounted(){

    },
    methods:{
      validateKeyStroke(e){
        if(this.highlight > this.listSuggestions.length || !this.listSuggestions){
          this.highlight=-1;
        }
        if(e.keyCode == 188) {
          this.name = this.name.split(',')[0]
          this.checkAndAdd()
          return false
        }
      },
      addFromSuggestion(name,event){
          const isExist = this.tags.findIndex(x=>{
            if(!x.name){
              return
            }
            return x.name.toString().toLowerCase()==name.toString().toLowerCase()
          })

          if(isExist==-1){
            this.tags.push({name})
          }
          else {
            event.target.classList.add('shake')
            setTimeout( () => {
            event.target.classList.remove('shake')
                      } , 1000)
          }
      },
      checkAndAdd(){
        this.name=this.name.trim()
        if(this.name==''){
          return
        }

        const isExist = (name) => this.tags.findIndex(x=>x.name.toLowerCase()==name.toLowerCase())

        if(this.highlight<1){
          if(isExist(this.name)!==-1){
          this.$refs.input.style.color='red'
            setTimeout( () => {
              this.$refs.input.style.color='initial'
                      } , 1000)
            return
          }
          this.add(this.name);
        }

        else{
          if(this.listSuggestions.length==0){
            this.add(name);
            return
          }
          let name = this.listSuggestions[this.highlight].name || false;
          if(isExist(name)==-1){
            this.add(name)
          }
          return
        }
      },
      select(e){
        if(!this.listSuggestions || this.highlight < -1 || !this.listSuggestions.length){
          return
        }
        if (e.keyCode == 40) 
        {
          if(this.listSuggestions.length-1 == this.highlight){
            this.highlight=0;
            return
          }
          this.highlight++;
        }
        if(e.keyCode==38)
        {
          if(this.highlight==0){
            this.highlight = this.listSuggestions.length;
          }
          this.highlight--;
        }
      },
      remove(i){
        this.$emit('removeItem',i)
      },
      add(name){
        this.$emit('addItem',{
          name
        })
        this.name='';
        this.highlight =-1;
        this.pause=true;
      },
      removeLastItem(){
        if(this.name.length<=0 && this.pause){
          this.pause=false
          return
        }
        // this.pause=true
        if(this.tags.length && this.name.length<=0){
          this.remove(this.tags.length-1)
          this.pause=true
        }
      },
      focusInput(){
        this.$refs.input.focus();
      }
    }
  }
</script>

<style scoped>
.tag-with-autosuggestion {
  min-width: 100px;
  min-height: 90px;
  border: 1px solid #68717A;
  list-style: none;
  padding: 0;
  margin: 0;
  display: inline-block;
  margin-top: 1rem;
  width: 100%;
  border-radius: 4px;
  padding-bottom: 1rem;
}
.tag-with-autosuggestion .a-lb {
  cursor: pointer;
}
.tag-with-autosuggestion .tag-name {
  background-color: #DDF5FC;
  width: auto;
  display: inline-block;
  margin: 10px;
  padding: 0rem 1rem;
  border-radius: 5px;
  cursor: pointer;
}
.tag-with-autosuggestion .tag-name:first-letter {
  text-transform: uppercase;
}
.tag-with-autosuggestion .tag-input {
  display: inline-flex;
  position: relative;
  margin: 10px;
  min-width: 85px;
  min-height: 30px;
}
.tag-with-autosuggestion .tag-input .tag-input-inner {
  border: none;
  outline: none;
  box-shadow: none;
}
.tag-with-autosuggestion .tag-input .tag-suggestions-list {
  border-radius: 3px;
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  border: 1px solid #E0E0E0;
  margin-top: 10px;
  z-index: 100;
}
.tag-with-autosuggestion .tag-input .tag-suggestions-list .sugessted-tags {
  overflow: hidden;
  text-overflow: ellipsis;
  background: #fff;
  padding: 5px;
}
.tag-with-autosuggestion .tag-input .tag-suggestions-list .sugessted-tags--highlight {
  background: #DDF5FC;
}
.tag-with-autosuggestion .show-suggestion-btn {
  margin-right: 10px;
}

.all-suggesions .tag-name {
  background: #E0E0E0;
  border-radius: 25px;
}

.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
  color: red;
}

@keyframes shake {
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }
  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
}

</style>