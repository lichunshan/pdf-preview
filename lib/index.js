import preview from '../src/components/preview'

let pdfPreview = {}

pdfPreview.install = function(Vue){
  Vue.component(preview.name, preview)
}

export default pdfPreview