<template>
	<div>
		<tag-input v-model="mytags"  :suggestions="mysug" ></tag-input>
	</div>
</template>

<script>
import TagInput from './TagInput'
	export default{
		name:'TagIt',
		data(){
			return{
				mytags:[{
					name:'Hello'
				},{
					name:'check'
				}],
				mysug:[
				{
					name:'Hell'
				},{
					name:ch
				}]
			}
		},
		components:{
			TagInput
		}
		watch:{

		},
		computed:{

		},
		created(){

		},
		mounted(){

		},
		methods:{

		}
	}
</script>

<style lang="scss" scoped>
	
</style>