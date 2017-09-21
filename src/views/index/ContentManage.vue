<template>
  <div class="panel">
  	<div class="panel-heading">
                文章管理<a class="margin-l10" @click="dialogVisible = true"><span class="el-icon-setting"></span></a>
      <div class="float-right panel-heading-right">
        <el-button
          size="small" 
          type="success" 
          icon="plus" 
          @click="addAr(2)"
           >
                          添加文章
        </el-button>
        <el-button size="small" type="success" icon="plus" @click="catalogVisible = true">创建子部门</el-button>
      </div>
    </div>
    <div class="panel-body">
      <el-table
        ref="multipleTable"
        :data="tableData3"
        border
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="日期"
          width="120">
          <template scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="作者"
          width="120">
        </el-table-column>
        <el-table-column
          prop="arTitle"
          label="文章标题"
          >
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="120">
          <template scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData3)"
              type="text"
              size="small">
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-button>删除</el-button>
        <el-button @click="toggleSelection()">取消选择</el-button>
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
      <el-dialog ref="articleDialog" title="添加文章" size="small" :visible.sync="dialogFormVisible">
        <!--普通文章列表-->
        <el-form ref="form1" :model="form1" label-width="80px">
          <div class="large-12">
            <el-form-item label="文章标题">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="是否推荐">
              <el-switch on-text="" off-text="" v-model="form.delivery"></el-switch>
            </el-form-item>
            <el-form-item label="关键字">
              <el-tag
                :key="tag"
                v-for="tag in form1.dynamicTags"
                :closable="true"
                :close-transition="false"
                @close="handleClose(tag)"
              >
                {{tag}}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="mini"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
              ></el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加</el-button>
              <p class="color-secondary">按Ｅｎｔｅｒ键盘键确定</p>
            </el-form-item>
          </div>
          <el-form-item label="文章附件">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="文章详情">
            <quill-editor ref="myTextEditor"
              v-model="content"
              :config="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @ready="onEditorReady($event)">
            </quill-editor>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
      <!--创建子栏目-->
      <el-dialog
        title="创建子栏目"
        :visible.sync="catalogVisible"
        size="tiny"
        >
          <el-form ref="form3" :model="form3" label-width="80px">
            <el-form-item label="栏目名称">
              <el-input v-model="form3.subCatalog"></el-input>
            </el-form-item>
          </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button>取 消</el-button>
          <el-button type="primary" >确 定</el-button>
        </span>
      </el-dialog>
      <!--添加产品-->
      <el-dialog
        title="添加产品"
        :visible.sync="productVisible"
        size="small">
        <el-form ref="productFrom" :model="productFrom" label-width="80px">
          <el-form-item label="品名">
            <el-input v-model="productFrom.name"></el-input>
          </el-form-item>
          <el-form-item label="酒精度">
            <el-input v-model="productFrom.als"></el-input>
          </el-form-item>
          <el-form-item label="规格">
            <el-input v-model="productFrom.spec"></el-input>
          </el-form-item>
          <el-form-item label="产品特点">
            <el-input type="textarea" v-model="productFrom.feature"></el-input>
          </el-form-item>
          <el-form-item label="产品附件">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="产品详情">
            <quill-editor ref="myTextEditor"
              v-model="productFrom.content"
              :config="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @ready="onEditorReady($event)">
            </quill-editor>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
//      附件
        dialogImageUrl: '',
        imgVisible: false,
//      子栏目
        catalogVisible: false,
        form3: {
          subCatalog: ''
        },

        dialogVisible: false,
        dialogFormVisible: false,
        form: {
          name: ''
        },
        inputVisible: false,
        inputValue: '',
        form1: {
          name: '',
          detail: '',
          delivery: false,
          desc: '',
          dynamicTags: ['标签一'],
        },
        formLabelWidth: '120px',
//      编辑器配置
        content: '你好',
        editorOption: {
         // something config
        },
//      表格
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          arTitle: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          arTitle: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          arTitle: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          arTitle: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          arTitle: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          arTitle: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          arTitle: '上海市普陀区金沙江路 1518 弄'
        }],
        multipleSelection: [],
//      产品表单
        productVisible: false,
        productFrom: {
          name: '',
          als: '',
          spec: '',
          feature: '',
          content: ''
        }
      }
    },
    methods: {
      addAr (i) {
        if (i === 1) {
          this.dialogFormVisible = true
        } else {
          this.productVisible = true
        }
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {})
      },
//    文章附件
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
//    编辑器
      onEditorBlur(editor) {
        console.log('editor blur!', editor)
      },
      onEditorFocus(editor) {
        console.log('editor focus!', editor)
      },
      onEditorReady(editor) {
        console.log('editor ready!', editor)
      },
      onEditorChange({ editor, html, text }) {
        // console.log('editor change!', editor, html, text)
        this.content = html
      },
//    表格
      toggleSelection (rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row)
          });
        } else {
          this.$refs.multipleTable.clearSelection()
        }
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      deleteRow(index, rows) {
        rows.splice(index, 1)
      },
//    添加关键字
      handleClose(tag) {
        this.form1.dynamicTags.splice(this.form1.dynamicTags.indexOf(tag), 1)
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
      },

      handleInputConfirm () {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.form1.dynamicTags.push(inputValue)
        }
        this.inputVisible = false
        this.inputValue = ''
      },
//    添加封面
      handleRemove(file, fileList) {
        console.log(file, fileList);
      }
    },
    computed: {
      editor() {
//      return this.$refs.myTextEditor.quillEditor
      }
    },
    mounted() {
      console.log('this is my editor', this.editor)
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
  .panel-body {
    padding: 20px;
    min-height: 250px;
    height: -moz-calc(100vh - 120px);
    height: -webkit-calc(100vh - 120px);
    height: calc(100vh - 120px);
    overflow: auto;
    width: 100%;
}
.panel-body .is-hidden{
  display: table-cell !important;
}
</style>
