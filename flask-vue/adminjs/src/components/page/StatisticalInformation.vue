<template>
    <div>
        <!-- <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 统计信息
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <div style="display: flex;">
            <div class="chart_container">
                <div class="top_view">
                    <span class="title">应用总装机量</span>
                    <el-button type="primary" class="btn"> 导出数据</el-button>
                    <el-select v-model="query.status" placeholder="高德地图" class="select">
                    </el-select>
                </div>
                <schart class="schart" canvasId="bar" :options="options1"></schart>
            </div>
            <div class="chart_container">
                <div class="top_view">
                    <span class="title">详情点击量</span>
                    <el-button type="primary" class="btn"> 导出数据</el-button>
                    <el-select v-model="query.status" placeholder="高德地图" class="select">
                    </el-select>
                </div>
                <schart class="schart" canvasId="line" :options="options2"></schart>
            </div>
        </div>
        
        <div style="display: flex;">
            <div class="chart_container">
                <div class="top_view">
                    <span class="title">设备激活量</span>
                    <el-button type="primary" class="btn"> 导出数据</el-button>
                    <!-- <el-select v-model="query.status" placeholder="高德地图" class="select">
                    </el-select> -->
                </div>
                <schart class="schart" canvasId="pie" :options="options3"></schart>
            </div>
            <div class="chart_container">
                <div class="top_view">
                    <span class="title">设备装机量</span>
                    <el-button type="primary" class="btn"> 导出数据</el-button>
                    <!-- <el-select v-model="query.status" placeholder="高德地图" class="select">
                    </el-select> -->
                </div>
                <schart class="schart" canvasId="ring" :options="options4"></schart>
            </div>
        </div>

    </div>
</template>

<script>
import { fetchData } from '../../api/banner';
import Schart from 'vue-schart';
export default {
    name: 'baseform',
    components: {
        Schart
    },
    data() {
        return {
            options1: {
                type: 'bar',
                // title: {
                //     text: '最近一周各品类销售图'
                // },
                bgColor: '#fbfbfb',
                labels: ['福睿斯', '林肯', '野马', '福睿斯', '福睿斯'],
                datasets: [
                    // {
                    //     label: '家电',
                    //     fillColor: 'rgba(241, 49, 74, 0.5)',
                    //     data: [234, 278, 270, 190, 230]
                    // },
                    // {
                    //     label: '百货',
                    //     data: [164, 178, 190, 135, 160]
                    // },
                    {
                        // label: '食品',
                        data: [45600, 31311, 31313, 2091, 3378]
                    }
                ]
            },
            options2: {
                type: 'line',
                // title: {
                //     text: '最近几个月各品类销售趋势图'
                // },
                bgColor: '#fbfbfb',
                labels: ['福睿斯', '林肯', '野马', '福睿斯', '福睿斯'],
                datasets: [
                    // {
                    //     label: '家电',
                    //     data: [234, 278, 270, 190, 230]
                    // },
                    // {
                    //     label: '百货',
                    //     data: [164, 178, 150, 135, 160]
                    // },
                    {
                        // label: '食品',
                        data: [45600, 31311, 31313, 2091, 3378]
                    }
                ]
            },
            options3: {
                type: 'pie',
                // title: {
                //     text: '服装品类销售饼状图'
                // },
                legend: {
                    position: 'left'
                },
                bgColor: '#fbfbfb',
                labels: ['福睿斯', '林肯', '野马', '福睿斯', '福睿斯'],
                datasets: [
                    {
                        data: [334, 278, 190, 235, 260]
                    }
                ]
            },
            options4: {
                type: 'ring',
                // title: {
                //     text: '环形三等分'
                // },
                showValue: false,
                legend: {
                    position: 'bottom',
                    bottom: 40
                },
                bgColor: '#fbfbfb',
                labels: ['福睿斯', '林肯', '野马'],
                datasets: [
                    {
                        data: [500, 500, 500]
                    }
                ]
            },
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10,
                pageTotal: 1
            },
            form: {
                name: '',
                region: '',
                desc: '',
                options: []
            },
            devicegs: {
                pageIndex: 1,
                pageSize: 20,
                pageTotal: 1,
                list: []
            },
            apps: {
                pageIndex: 1,
                pageSize: 20,
                pageTotal: 1,
                list: []
            },
            addConditionVisible : false

        };
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            fetchData(this.query).then(res => {
                console.log(res);
                this.devicegs.list = res.devicegs;
                //this.devicegs.pageTotal = res.devicegs.size() || 20;
                this.apps.list = res.apps;
                //this.apps.pageTotal = res.apps.size() || 20;
            });
        },
        onSubmit() {
            this.$message.success('提交成功！');
        },
        handleAddCondition() {
            this.addConditionVisible = true;
        }
    }
};
</script>

<style scoped>
.table_margin {
    margin-top: 15px;
}

.form {
    margin-top:15px;
}


</style>