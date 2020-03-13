<template>
  <div class="pdf-preview">
    <process :value="processValue"></process>
    <toolbar 
    :currentPage="currentPage"
     :totalPage="numPages"
     @zoom="zoom"
     @shrink="shrink"
     :href="src"
     :show="toolbar"></toolbar>
    <canvas ref="canvas" class="pdf_page" :style="{width: pageWidth + '%'}" v-for="(item, index) in numPages" :key="index"></canvas>
  </div>
</template>

<script>
import pdfjsLib from 'pdfjs-dist'
import process from './progress'
import toolbar from './toolbar'
export default {
  props: {
    src: {
      type: String,
      default: ''
    },
    toolbar: {
      type: Boolean,
      default: true
    }
  },
  name: "pdf-preview",
  data() {
    return {
      pdf: '',
      numPages: 0,
      currentPage: 1,
      loading: true,
      processValue: "0%",
      scale: 1.5,
      pageWidth: 90,
      pageHeight: 0
    };
  },
  async mounted(){
    let that = this;
    let loadingTask = pdfjsLib.getDocument(this.src);
     loadingTask.onProgress = function(process){
      that.processValue = (process.loaded / process.total) * 100 + "%"
    }
    that.pdf = await loadingTask.promise;
    that.numPages = that.pdf.numPages;
    that.renderPages(that.scale);
  },
  methods: {
    renderPages(scale){
      let that = this;
      for(let i = 0; i < this.numPages; i++){
        let index = i + 1;
        this.pdf.getPage(index).then(function(page){
          that.renderOnePage(page, scale, i);
        })
      }
      that.updatePage();
    },
    renderOnePage(page, scale, index){
      var viewport = page.getViewport({ scale: scale });
      var canvas = document.querySelectorAll('.pdf_page')[index];
      var context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      var renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      page.render(renderContext);
    },
    zoom(){
      if(this.pageWidth < 100){
        this.pageWidth += 10;
        this.calcPageHeight();
      }
    },
    shrink(){
      if(this.pageWidth > 50){
        this.pageWidth -= 10;
        this.calcPageHeight();
      }
    },
    calcPageHeight(){
      let that = this;
      let canvasObjs = that.$refs;
      let canvas = canvasObjs.canvas;
      that.pageHeight = parseFloat(window.getComputedStyle(canvas[0]).blockSize.slice(0, -2)) 
      - parseFloat(window.getComputedStyle(canvas[0]).marginTop.slice(0, -2));
    },
    updatePage(){
      let body = document.body;
      let that = this;
      body.onscroll = function(){
        if(that.pageHeight == 0){
          that.calcPageHeight();
        }
        let scrollHeight = parseFloat(document.documentElement.scrollTop || document.body.scrollTop);
        that.currentPage = Math.floor(scrollHeight / that.pageHeight) + 1;
      }
    }
  },
  components: {
    process,
    toolbar
  }
};
</script>

<style scoped>
.pdf-preview{
  background: #404040;
  overflow: hidden;
}
.pdf_page{
  display: block;
  margin-bottom: 40px;
  margin-top: 40px;
  margin-left: auto;
  margin-right: auto;
}
.loading{
  display: block;
  margin: 500px auto;
  text-align: center;
}
</style>
