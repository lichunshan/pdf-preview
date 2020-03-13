# pdf-preview

> 基于pdfjs-dist的移动端vue pdf预览组件

## Install
```bash
npm install @lichunshan/pdf-preview
```
## Usage
在项目的main.js引入入下面代码全局注册组件
```JavaScript
import pdfPreview from '@lichunshan/pdf-preview'
import '@lichunshan/pdf-preview/dist/pdf-preview.common.vendors~pdfjsWorker.js'
import '@lichunshan/pdf-preview/dist/pdf-preview.css'
import '@lichunshan/pdf-preview/src/assets/iconfont.css'
Vue.use(pdfPreview);
```

在.vue文件中使用

```
<pdf-preview src=""></pdf-preview>
```

src为pdf文件路径