# Table_Auto_Scroll

## 一、博客

- [GitHub Page](https://yuziikuko.github.io/articles/12.html)
- [稀土掘金](https://juejin.cn/post/7501649816371445798)
- [CSDN](https://blog.csdn.net/qq_41728543/article/details/147797785?spm=1001.2014.3001.5501)

## 二、简介

- Vue2 + ElementUI 实现表格自动向下滚动。

## 三、功能

- 表格每秒自动向下滚动一个表格行的高度。
- 滚动到表格底部时回到顶部，再次自动滚动。
- 鼠标移入表格区域时，暂停自动滚动。
- 鼠标移出表格区域后，开始自动滚动。

<img src="https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/5959a72249574c2fb23917193e96bc78~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6YOB5a2QSUtVS08=:q75.awebp?rk3s=f64ab15b&x-expires=1747301080&x-signature=F%2BVZqnwUShoC%2FXTPQZ8P7RA%2B2hE%3D" alt="表格自动滚动" />

## 四、使用

### 1. 安装

```bash
npm install table-auto-scroll
```

### 2. 前置第三方库

```json
{
    "vue": "^2.6.11",
    "element-ui": "^2.15.14",
    "lodash": "^4.17.21"
}
```

### 3. 全局引入

```js
import TableAutoScroll from "table-auto-scroll";
import "table-auto-scroll/dist/table-auto-scroll.css";
Vue.component("TableAutoScroll", TableAutoScroll);
```

### 4. 局部引入

```js
import TableAutoScroll from "table-auto-scroll";
import "table-auto-scroll/dist/table-auto-scroll.css";
export default {
    components: {
        TableAutoScroll,
    },
};
```

### 5. 基础使用

```vue
<template>
    <div class="table-auto-scroll-wrapper">
        <TableAutoScroll :tableHeader="tableHeader" :tableData="tableData" theme="light" />
        <TableAutoScroll :tableHeader="tableHeader" :tableData="tableData" theme="dark" />
    </div>
</template>

<script>
    import TableAutoScroll from "table-auto-scroll";
    import "table-auto-scroll/dist/table-auto-scroll.css";

    export default {
        name: "TableAutoScroll",
        components: {
            TableAutoScroll,
        },
        data() {
            return {
                tableData: [],
                tableHeader: [
                    {
                        prop: "id",
                        label: "排名",
                        width: "50px",
                    },
                    {
                        prop: "name",
                        label: "名称",
                        width: "150px",
                    },
                    {
                        prop: "amount",
                        label: "收入",
                        width: "100px",
                    },
                    {
                        prop: "address",
                        label: "地址",
                    },
                    {
                        prop: "remark",
                        label: "备注",
                    },
                ],
            };
        },
        mounted() {
            // 模拟接口数据
            setTimeout(() => {
                this.tableData = new Array(15).fill({}).map((_, index) => ({
                    id: index + 1,
                    name: "哈哈哈哈哈哈哈哈哈哈哈" + (index + 1),
                    amount: parseFloat(Math.random() * (9999 - 1000) * (index + 1)).toFixed(2),
                    address: "测试地址测试地址测试地址测试地址测试地址测试地址测试地址测试地址" + index + 1,
                    remark: "测试备注测试备注测试备注测试备注测试备注测试备注测试备注测试备注" + index + 1,
                }));
            }, 1000);
        },
    };
</script>
```

## 五、个性化

### 1. 可选主题色

- dark
- light

```vue
<TableAutoScroll theme="light" />
<TableAutoScroll theme="dark" />
```

### 2. 表格高度

```vue
<TableAutoScroll tableHeight="500px" />
<TableAutoScroll tableHeight="100vh" />
```

### 3. 表头样式

```vue
<TableAutoScroll
    :headStyle="{
        background: 'linear-gradient(90deg, #e1f5fe, #b3e5fc)',
        color: '#0277bd',
    }"
></TableAutoScroll>
<TableAutoScroll
    :headStyle="{
        background: '#b3e5fc',
        color: '#0277bd',
    }"
></TableAutoScroll>
```

### 4. 表格行样式

- firstRow：第一行
- secondRow：第二行
- thirdRow：第三行
- oddRow：奇数行
- evenRow：偶数行

```vue
<TableAutoScroll
    :rowStyle="{
        firstRow: {
            background: 'linear-gradient(90deg, #2e7d32, #4caf50)',
            color: '#ffffff',
        },
        secondRow: {
            background: 'linear-gradient(90deg, #4caf50, #81c784)',
            color: '#1b5e20',
        },
        thirdRow: {
            background: 'linear-gradient(90deg, #81c784, #a5d6a7)',
            color: '#0d47a1',
        },
        oddRow: {
            background: 'linear-gradient(90deg, #eceff1, #cfd8dc)',
            color: '#37474f',
        },
        evenRow: {
            background: 'linear-gradient(90deg, #cfd8dc, #b0bec5)',
            color: '#37474f',
        },
    }"
></TableAutoScroll>
```
