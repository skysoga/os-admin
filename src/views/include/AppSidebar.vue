<template>
  <section class="side-nav">
    <div>
      <ul>
        <toggle-tab v-for="(menu, index) in menus" :key="index">
          <span class="el-icon-caret-bottom has-tip  tip-right radius" title="Dashboard"  data-tooltip="" aria-haspopup="true" data-options="show_on:large"></span><span>{{menu.name}}</span>
          <span class="el-icon-setting has-tip  tip-right radius"  title="自定义Dashboard" data-reveal-id="myModal"  data-tooltip aria-haspopup="true" data-options="disable_for_touch:true"></span>
          <ul slot="content">
            <li v-for="item in menu.menus" :key="item.path" :class="{ curr_target: matchPath(item.path) }">
              <a v-bind:to="item.path" data-href="media-manage.html"><span class="el-icon-edit has-tip  tip-right radius" title="Dashbord1" data-tooltip aria-haspopup="true" data-options="show_on:large"></span><span>{{item.name}}</span></a>
            </li>
          </ul>
        </toggle-tab>
      </ul>
    </div>
  </section>
</template>

<script>
import ToggleTab from '@/components/ToggleTab'
export default {
  components: {
    ToggleTab
  },
  computed: {
  },
  data () {
    return {
      menus: [
        {
          name: '平台管理',
          menus: [
            {
              name: '内容管理',
              path: '/cm'
            },
            {
              name: '用户管理',
              path: '/user'
            }
          ]
        }
      ],
      itemShow: true
    }
  },
  created () {
  },
  methods: {
    matchPath (part) {
      return this.$route.path.indexOf(part) === 0
    }
  }
}
</script>

<style>
@import 'css/variable.css';
.side-nav {
    width: 180px;
    position: fixed;
    left: 0;
    top: 0;
    margin-top: 50px;
    height: 100%;
    overflow: hidden;
    transition: width 0.3s,transform 0.3s;
    background: #293038;
}
.side-nav > div {
    width: 200px;
    overflow-x: hidden;
    overflow-y: auto;
    height: 100%;
    padding-right: 15px;
}
.side-nav ul {
    margin: 0 !important;
    width: 180px;
}
.side-nav ul li {
  list-style: none;
  &  a{
    height: 50px;
    line-height: 50px;
    color: #fff;
    display: block;
    height: 100%;
  }
  & a:hover{
    background: #007ca6;
  }
}
.side-nav > div > ul > li > a {
    background: #13171b;
    color: #fff;
}
.side-nav ul li a > span {
    font-size: 14px;
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    &.el-icon-setting{
      float:right;
    }
}
</style>
