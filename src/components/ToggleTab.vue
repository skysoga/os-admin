<template>
	<li>
		<a @click="itemToggle">
			<slot></slot>
		</a>
		<transition name="tree-fade">
		<div v-show="itemShow"> 
			<slot name="content"></slot>
		</div>
		</transition>
	</li>
</template>

<script>
export default {
  data () {
    return {
      itemShow: true
    }
  },
  methods: {
    itemToggle () {
      this.itemShow = !this.itemShow
    }
  }
}
</script>
