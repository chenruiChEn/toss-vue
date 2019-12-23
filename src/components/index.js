import Vue from 'vue'

// 自动加载目录下的 .js 结尾的文件
const componentsContext = require.context('./', true, /index\.js$/)
componentsContext.keys().forEach(component => {
  const componentConfig = componentsContext(component)
  if (component.startsWith('./index')) {
    return
  }
  const ctrl = componentConfig.default || componentConfig
  //全局组建  组建name
  if(ctrl.name)
    Vue.component(ctrl.name, ctrl)
})
