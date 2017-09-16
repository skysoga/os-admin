<template>
  <div class="panel">
  	<div class="panel-heading">
                文章管理<a class="margin-l10" @click="dialogVisible = true"><span class="el-icon-setting"></span></a>
      <div class="float-right panel-heading-right">
        <el-button size="small" type="success" icon="plus" @click="dialogFormVisible = true">添加文章</el-button>
        <el-button size="small" type="success" icon="plus">创建子部门</el-button>
      </div>
    </div>
    <div class="modal">
      <el-dialog
        title="编辑"
        :visible.sync="dialogVisible"
        size="tiny"
        :before-close="handleClose">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="栏目名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
      
      <!--添加文章-->
      <el-dialog title="添加文章" size="full" :visible.sync="dialogFormVisible">
        <!--普通文章列表-->
        <el-form ref="form1" :model="form1" label-width="80px">
          <div class="large-12">
            <el-form-item label="文章标题">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="是否推荐">
              <el-switch on-text="" off-text="" v-model="form.delivery"></el-switch>
            </el-form-item>
            <el-form-item label="文章描述">
              <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item label="文章详情">
              <el-input type="textarea" v-model="form.detail"></el-input>
            </el-form-item>
          </div>
          
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        dialogVisible: false,
        dialogFormVisible: false,
        form: {
          name: ''
        },
        form1: {
          name: '',
          detail: '',
          delivery: false,
          desc: ''
        },
        formLabelWidth: '120px'
      }
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {})
      }
    }
  }
</script>
<style>
  .panel-heading {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    margin: 0 20px;
    font-size: 16px;
    height: 50px;
    line-height: 50px;
    position: relative;
    & a:not(button){
      color: #cbd3dd;
    }
  }  
</style>
