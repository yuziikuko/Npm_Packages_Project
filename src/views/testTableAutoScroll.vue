<template>
    <div class="table-auto-scroll-wrapper">
        <TableAutoScroll :tableHeader="tableHeader" :tableData="tableData" theme="dark"></TableAutoScroll>

        <TableAutoScroll
            :tableHeader="tableHeader"
            :tableData="tableData"
            :headStyle="{
                background: '#b3e5fc',
                color: '#0277bd',
            }"
        ></TableAutoScroll>
    </div>
</template>

<script>
    import TableAutoScroll from "table-auto-scroll";
    import "table-auto-scroll/dist/table-auto-scroll.css";

    export default {
        name: "TestTableAutoScroll",
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

<style></style>
