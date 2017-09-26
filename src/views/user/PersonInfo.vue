<template>
  <div>
    <h1>头像</h1>
    <img src="../../assets/img/logo.png" class="addon">
    <croppa 
      v-model="croppa"
      :zoom-speed="30"
      :width="300"
      :height="300"

      :prevent-white-space="true"

      crossOrigin="anonymous"
      initial-image="http://localhost:8082/static/img/bg.9c26351.png"

      @file-choose="change()"
      :file-size-limit="102400"
      @file-type-mismatch="onFileTypeMismatch"
      @file-size-exceed="onFileSizeExceed"

      @draw="onDraw"
      @move="handleCroppaMove"
      ></croppa>
      <img :src="dataUrl" />
      <el-button @click="croppa.moveUpwards(10)">move up</el-button>
      <el-button @click="croppa.moveDownwards(10)">move down</el-button>
      <el-button @click="croppa.moveLeftwards(10)">move left</el-button>
      <el-button @click="croppa.moveRightwards(10)">move right</el-button>
      <el-button @click="croppa.zoomIn()">zoom in</el-button>
      <el-button @click="croppa.zoomOut()">zoom out</el-button>
      <el-button @click="croppa.rotate()">rotate 90deg</el-button>
      <el-button @click="croppa.rotate(2)">rotate 180deg</el-button>
      <el-button @click="croppa.rotate(-1)">rotate -90deg</el-button>
      <el-button @click="croppa.flipX()">flip horizontally</el-button>
      <el-button @click="croppa.flipY()">flip vertically</el-button>
      <el-button @click="upload" type="primary">upload</el-button>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        croppa: {},
        dataUrl: ''
      }
    },
    mounted () {
    },
    methods: {
      change () {
        console.log(1111)
      },
      onDraw: (ctx) => {
        ctx.save()
        ctx.globalAlpha = 0.7
        ctx.drawImage(document.querySelector('.addon'), 450, 450, 100, 100)
        ctx.restore()
      },
      uploadCroppaedImage () {
        this.croppa.generateBlob((blob) => {
          console.log('aaa', blob)
        }, 'image/*', 0.8)
      },
      onFileTypeMismatch (file) {
        alert('Invalid file type. Please choose a jpeg or png file.')
      },
      onFileSizeExceed (file) {
        alert('File size exceeds. Please choose a file smaller than 100kb.')
      },
      handleCroppaMove () {
        this.uploadCroppaedImage()
        this.dataUrl = this.croppa.generateDataUrl('image/jpeg', 0.8)
      },
      upload() {
        if (!this.croppa.hasImage()) {
          alert('no image to upload')
          return
        }
        
        this.croppa.generateBlob((blob) => {
          var fd = new FormData()
          fd.append('file', blob)
          fd.append('other', 'blahblahblah')
//        $.ajax({
//          url: 'http://www.xxx.com/api/upload',
//          data: fd,
//          type: 'POST',
//          processData: false,
//          contentType: false,
//          success: function(data) {
//            alert(data)
//          }
//        })
        })
      }
    }
  }
</script>