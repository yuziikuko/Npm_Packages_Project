<template>
    <div @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave" class="table-wrapper">
        <el-table
            :data="list"
            :header-row-style="calcHeadStyle"
            :row-style="calcRowStyle"
            :highlight-current-row="false"
            :height="tableHeight"
            border
            ref="table"
        >
            <el-table-column
                v-for="header in tableHeader"
                :key="header.prop"
                :prop="header.prop"
                :label="header.label"
                :width="header.width"
                show-overflow-tooltip
            ></el-table-column>
        </el-table>
    </div>
</template>

<script>
    import TableAutoScroll from "../mixins/TableAutoScroll.js";

    export default {
        name: "TableAutoScroll",
        mixins: [TableAutoScroll],
        props: {
            // 表格头
            tableHeader: {
                type: Array,
                required: true,
            },
            // 表格数据
            tableData: {
                type: Array,
                required: true,
            },
            // 主题色
            theme: {
                type: String,
                default: "light",
                validator(value) {
                    return ["dark", "light"].includes(value);
                },
            },
            // 表格高度
            tableHeight: {
                type: String,
                default: "40vh",
            },
            // 表头样式
            headStyle: {
                type: Object,
                default: null,
            },
            // 表格行样式
            rowStyle: {
                type: Object,
                default: null,
            },
        },
        data() {
            return {
                list: [],
                container: null,
            };
        },
        watch: {
            tableData: {
                handler(val) {
                    if (val && val.length) {
                        this.updateListData(val);
                    } else {
                        this.list = [];
                    }
                },
                deep: true,
            },
        },
        methods: {
            /** ==================== 表格样式 ==================== */
            calcHeadStyle({ row, rowIndex }) {
                const themeColor = {
                    light: {
                        background: "linear-gradient(90deg, #e1f5fe, #b3e5fc)",
                        color: "#0277bd",
                    },
                    dark: {
                        background: "linear-gradient(90deg, #0a3b5c, #1a4d7c)",
                        color: "#e0f2fe",
                    },
                };
                return {
                    background: this.headStyle?.background || themeColor[this.theme].background,
                    color: this.headStyle?.color || themeColor[this.theme].color,
                };
            },
            calcRowStyle({ row, rowIndex }) {
                const themeColor = {
                    light: {
                        firstRow: {
                            background: "linear-gradient(90deg, #a5d6a7, #c8e6c9)",
                            color: "#1b5e20",
                        },
                        secondRow: {
                            background: "linear-gradient(90deg, #c8e6c9, #e8f5e9)",
                            color: "#2e7d32",
                        },
                        thirdRow: {
                            background: "linear-gradient(90deg, #e8f5e9, #bbdefb)",
                            color: "#0d47a1",
                        },
                        oddRow: {
                            background: "linear-gradient(90deg, #fafafa, #f5f5f5)",
                            color: "#333333",
                        },
                        evenRow: {
                            background: "linear-gradient(90deg, #f5f5f5, #eeeeee)",
                            color: "#333333",
                        },
                    },
                    dark: {
                        firstRow: {
                            background: "linear-gradient(90deg, #2e7d32, #4caf50)",
                            color: "#ffffff",
                        },
                        secondRow: {
                            background: "linear-gradient(90deg, #4caf50, #81c784)",
                            color: "#1b5e20",
                        },
                        thirdRow: {
                            background: "linear-gradient(90deg, #81c784, #a5d6a7)",
                            color: "#0d47a1",
                        },
                        oddRow: {
                            background: "linear-gradient(90deg, #eceff1, #cfd8dc)",
                            color: "#37474f",
                        },
                        evenRow: {
                            background: "linear-gradient(90deg, #cfd8dc, #b0bec5)",
                            color: "#37474f",
                        },
                    },
                };
                if (rowIndex === 0) {
                    return {
                        background: this.rowStyle?.firstRow?.background || themeColor[this.theme].firstRow.background,
                        color: this.rowStyle?.firstRow?.color || themeColor[this.theme].firstRow.color,
                    };
                } else if (rowIndex === 1) {
                    return {
                        background: this.rowStyle?.secondRow?.background || themeColor[this.theme].secondRow.background,
                        color: this.rowStyle?.secondRow?.color || themeColor[this.theme].secondRow.color,
                    };
                } else if (rowIndex === 2) {
                    return {
                        background: this.rowStyle?.thirdRow?.background || themeColor[this.theme].thirdRow.background,
                        color: this.rowStyle?.thirdRow?.color || themeColor[this.theme].thirdRow.color,
                    };
                } else if (rowIndex % 2 !== 0) {
                    return {
                        background: this.rowStyle?.oddRow?.background || themeColor[this.theme].oddRow.background,
                        color: this.rowStyle?.oddRow?.color || themeColor[this.theme].oddRow.color,
                    };
                } else if (rowIndex % 2 === 0) {
                    return {
                        background: this.rowStyle?.evenRow?.background || themeColor[this.theme].evenRow.background,
                        color: this.rowStyle?.evenRow?.color || themeColor[this.theme].evenRow.color,
                    };
                }
            },

            /** ==================== 数据更新 ==================== */
            // 更新表格数据
            updateListData(list) {
                this.list = list;

                // 重置滚动位置
                this.$nextTick(() => {
                    this.startAutoScroll();
                });
            },
        },
    };
</script>

<style lang="scss" scoped>
    ::v-deep .el-table,
    ::v-deep .el-table .el-table__expanded-cell,
    ::v-deep .el-table tr,
    ::v-deep .el-table th.el-table__cell,
    ::v-deep .el-table td.el-table__cell {
        background: transparent;
        background-color: transparent;
    }

    .table-wrapper {
        width: 100%;
        height: 100%;
        padding: 16px;
    }
</style>
