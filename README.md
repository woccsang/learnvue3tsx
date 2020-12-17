## 环境搭建

### 创建项目

使用vue-cli。执行命令 vue create xxx ，配置如下

![](https://tcs.teambition.net/storage/3120a44a7050f7027c4ac2f42040c3ee48db?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjU5Mzc3MGZmODM5NjMyMDAyZTAzNThmMSIsIl9hcHBJZCI6IjU5Mzc3MGZmODM5NjMyMDAyZTAzNThmMSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTYwODc3NjE3MiwiaWF0IjoxNjA4MTcxMzcyLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzMxMjBhNDRhNzA1MGY3MDI3YzRhYzJmNDIwNDBjM2VlNDhkYiJ9.Bwf2iyjbMgqxgnkVzv_Cnb8Yg1EUo-isedigh_DlIFE&download=image.png "")

![](https://tcs.teambition.net/storage/3120b78e16a7ab9b4eff2b924e70a64963d5?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjU5Mzc3MGZmODM5NjMyMDAyZTAzNThmMSIsIl9hcHBJZCI6IjU5Mzc3MGZmODM5NjMyMDAyZTAzNThmMSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTYwODc3NjE3MiwiaWF0IjoxNjA4MTcxMzcyLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzMxMjBiNzhlMTZhN2FiOWI0ZWZmMmI5MjRlNzBhNjQ5NjNkNSJ9.fMlqclBDa3Ww9yREDy1_e5zNCHC22DSEQnDRjZYTzHs&download=image.png "")

执行 npm run serve。建立项目成功

![](https://tcs.teambition.net/storage/31208fa83092e844c1d315e9d769102110a5?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjU5Mzc3MGZmODM5NjMyMDAyZTAzNThmMSIsIl9hcHBJZCI6IjU5Mzc3MGZmODM5NjMyMDAyZTAzNThmMSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTYwODc3NjE3MiwiaWF0IjoxNjA4MTcxMzcyLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzMxMjA4ZmE4MzA5MmU4NDRjMWQzMTVlOWQ3NjkxMDIxMTBhNSJ9.4UDxPXl1bWj7qu9c72w3Q536Fw7fXWjY_aPhGN6QOvw&download=image.png "")

### 引入antd

安装：antd

```bash
npm i --save ant-design-vue@next
```

配置按需加载，安装：babel-plugin-import 

```bash
npm install babel-plugin-import --save-dev
```

在babel.config.js中新增配置 (带验证是否真的按需引入)

```javascript
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  "plugins": [
    ["import", { "libraryName": "ant-design-vue", "libraryDirectory": "es", "style": "css" }] // `style: true` 会加载 less 文件
  ]
}
```

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

![](https://tcs.teambition.net/storage/3120ce4bfcdf66e9e831b16b63adff9de282?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjU5Mzc3MGZmODM5NjMyMDAyZTAzNThmMSIsIl9hcHBJZCI6IjU5Mzc3MGZmODM5NjMyMDAyZTAzNThmMSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTYwODc3NjE3MiwiaWF0IjoxNjA4MTcxMzcyLCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzMxMjBjZTRiZmNkZjY2ZTllODMxYjE2YjYzYWRmZjlkZTI4MiJ9.zJJO7URQheR90zVhjg2EnVXnmIsuXkpNbNsbqDwxzw8&download=image.png "")

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
emits: ['close'],
props: {
	visible: {
      type: Boolean
    },
    onClose: { /// 重点
      type: Function as PropType<(e: MouseEvent) => void>,
    }
},
```

    - 父组件

```javascript
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



