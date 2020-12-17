## 说明

**经过调研 使用UI库的页面推荐依旧使用vue文件开发。目前antd-vue还是以template为主。无法完全兼容tsx**

### 引入Vuex和axios

安装之后新建配置文件shims-tsx.d.ts （文件名随意，扩展名为d.ts）新增如下代码
PS：一开始使用生成的shims-vue.d.ts 文件新增代码，这样引入vue中的对象会报错原因未知

```javascript
import { AxiosInstance } from "axios";
import { Store } from "vuex";
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store;
  }
}
```
否则在代码中使用this.$axios 和 this.$store会报错(**Property '$store' does not exist on type 'ComponentPublicInstance<Readonly**<)，在文件@vue/runtime-core/dist/runtime-core.d.ts中有说明

## 编码相关

参考源码（可以使用插件octotree快捷查看github源码）
[vueComponent/ant-design-vue](https://github.com/vueComponent/ant-design-vue)
[youzan/vant](https://github.com/youzan/vant)

### tsx

- v-bind：直接属性赋值即可

- class/style：直接使用js表达式进行书写，配合三元运算符非常灵活

- v-model：需要自行实现onChange方法和value赋值

- if/for：使用js表达式代替，比如if使用三元运算 for使用map

- 普通事件：onClick这种方式

- 子组件传值事件：

    - 子组件中emits 中进行配置 ['close']

    - 子组件中props 中增加类型 

```javascript
///子组件
const CreateDialog = defineComponent({
emits: ['close'],
props: {
    visible: {
      type: Boolean
    },
    onClose: { /// 重点
      type: Function as PropType<(e: MouseEvent) => void>,
    }
},
})
///父组件
<CreateDialog visible={this.visible} 
onClose={() => { this.visible = false }}></CreateDialog>
```


### 错误处理

Each record in dataSource of table should have a unique `key` prop, or set `rowKey` of Table to an unique primary key 

antd中table需要显示指定rowkey ，在react的tsx 解决方法 增加 `rowKey={(record, index) => index}`在vue的template 中直接赋一个唯一值 `rowKey="id"`

***

Catch all routes ("*") must now be defined using a param with a custom regex

在针对vue3的vue-router中通配符匹配必须使用`/:catchAll(.*)`

***

JSX element type 'XXX' does not have any construct or call signatures

ts中返回的组件需要使用`defineComponent()`



