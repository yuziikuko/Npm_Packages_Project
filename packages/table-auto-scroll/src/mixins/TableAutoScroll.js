/**
 * 表格每秒自动滚动，鼠标移入时暂停，移出后继续滚动
 */
export default {
    data() {
        return {
            // 是否滚动到底部
            isScrollToBottom: false,
            // 当且滚动到的表格行下标
            currentIndex: 0,
            // 定时器
            autoScrollTimer: null,
            userScrollTimer: null, // 用于延迟恢复自动滚动
            // 是否移入表格区域
            isHovering: false,
        };
    },
    created() {
        // 在组件创建时预绑定方法
        this.handleMouseEnter = this.$lodash.throttle(
            () => {
                this.isHovering = true;
                this.stopAllScrolls();
            },
            800,
            { leading: true, trailing: false }, // 立即执行首次调用（例如鼠标快速移入）
        );
        this.handleMouseLeave = this.$lodash.debounce(
            () => {
                this.isHovering = false;
                this.startAutoScroll();
            },
            800,
            { leading: false, trailing: true }, // 最后一次调用（例如鼠标快速移出）
        );
    },
    computed: {
        // 滚动容器
        scrollContainer() {
            return this.$refs.table?.$el?.querySelector(".el-table__body-wrapper");
        },
        // 表格行高
        rowHeight() {
            return document.querySelector(".el-table__header-wrapper")?.clientHeight;
        },
    },
    mounted() {
        this.initScrollEvents();
    },
    methods: {
        /** ==================== 用户交互 ==================== */
        // 绑定用户手动滚动
        initScrollEvents() {
            this.scrollContainer?.addEventListener("scroll", (e) => {
                e.stopPropagation();
                this.handleUserScroll(e);
            });
        },
        // 鼠标进入容器时暂停自动滚动，保持方法签名
        handleMouseEnter() {},
        // 鼠标离开容器时恢复自动滚动，保持方法签名
        handleMouseLeave() {},

        /** ==================== 停止滚动 ==================== */
        stopAllScrolls() {
            this.stopAutoScroll();
            this.stopUserScroll();
        },
        // 自动滚动
        stopAutoScroll() {
            if (this.autoScrollTimer) {
                clearInterval(this.autoScrollTimer);
                this.autoScrollTimer = null;
            }
        },
        // 用户手动滚动
        stopUserScroll() {
            if (this.userScrollTimer) {
                clearTimeout(this.userScrollTimer);
                this.userScrollTimer = null;
            }
        },

        /** ==================== 开始滚动 ==================== */
        // 自动滚动
        startAutoScroll() {
            if (this.isHovering) return;
            this.stopAllScrolls();

            this.autoScrollTimer = setInterval(() => {
                // 循环滚动
                if (this.isScrollToBottom) {
                    this.currentIndex = 0;
                    this.isScrollToBottom = false;
                }

                if (this.currentIndex < this.list.length - 1) {
                    this.currentIndex++;
                }
                this.handleAutoScroll();
            }, 1500);
        },
        handleAutoScroll() {
            const container = this.scrollContainer;
            if (!container) return;

            // 当前数据没有超过容器高度，不需要滚动
            if (container.scrollHeight <= container.clientHeight) {
                this.stopAutoScroll();
                return;
            }

            // 计算滚动到底部的阈值
            const threshold = 5;
            // 判断是否滚动到底部
            const isBottom = container.scrollTop >= container.scrollHeight - container.clientHeight - threshold;
            if (isBottom) {
                this.isScrollToBottom = true;
                this.scrollToPosition(0);
            } else {
                this.scrollToPosition(this.currentIndex * this.rowHeight);
            }
        },
        // 用户手动滚动
        handleUserScroll(e) {
            this.stopAutoScroll();

            const scrollTop = e.target.scrollTop;
            this.currentIndex = Math.round(scrollTop / this.rowHeight);

            // 鼠标移出后恢复自动滚动
            clearTimeout(this.userScrollTimer);
            this.userScrollTimer = setTimeout(() => {
                this.startAutoScroll();
            }, 1000);
        },
        // 统一滚动位置处理
        scrollToPosition(top) {
            const container = this.scrollContainer;
            container && container.scrollTo({ top, behavior: "smooth" });
        },
    },
    beforeRouteLeave() {
        this.stopAllScrolls();

        // 清除Lodash生成的函数缓存
        this.$lodash.cancel(this.handleMouseEnter);
        this.$lodash.cancel(this.handleMouseLeave);
    },
};
