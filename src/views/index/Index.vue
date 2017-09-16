<template>
  <div>
    <side-nav></side-nav> 
  	<div class="product-con">
  	  <content-manage></content-manage>
    </div>
  </div>
</template>
<script>
  import SideNav from './SideNav'
  import ContentManage from './ContentManage'
  export default {
    data () {
      return {}
    },
    components: {
      SideNav,
      ContentManage
    }
  }
</script>
<style>
  @import 'css/variable.css';
  .product-con{
    position: absolute;
    left: 180px;
    top: 0;
    right: 0;
    height: 100%;
    transition: left .3s,transform .3s;
  }
</style>

