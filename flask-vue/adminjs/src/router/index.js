import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/statistical_information'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/account_management',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/account/AccountManagement.vue'),
                    meta: { title: 'Account Management' }
                },
                {
                    path: '/app_management',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/app/AppManagement.vue'),
                    meta: { title: 'App Management' }
                },
                {
                    path:'/app_category_management',
                    component: ()=> import('../components/page/app/AppCategoryManagement.vue'),
                    meta: {title: 'App Category'}
                },
                {
                    path: '/banner_management',
                    component: () => import('../components/page/banner/BannerManagement.vue'),
                    meta: { title: 'Banner Management' }
                },
                {
                    path: '/banner_new',
                    component: () => import('../components/page/banner/BannerNew.vue'),
                    meta: { title: 'New Banner' }
                },
                {
                    path: '/banner_detail',
                    component: () => import('../components/page/banner/BannerDetail.vue'),
                    meta: { title: 'New Banner' }
                },                
                {
                    path: '/banner_edit',
                    component: () => import('../components/page/banner/BannerEdit.vue'),
                    meta: { title: 'New Banner' }
                },                
                {
                    path: '/upload_application',
                    component: () => import(/* webpackChunkName: "upload_application" */ '../components/page/app/UploadApp.vue'),
                    meta: { title: 'Upload Application' }
                },
                {
                    path: '/app_version_list',
                    component: () => import(/* webpackChunkName: "upload_application" */ '../components/page/app/AppVersionList.vue'),
                    meta: { title: 'App Version List' }
                },
                {
                    path: '/app_version_history',
                    component: () => import(/* webpackChunkName: "upload_application" */ '../components/page/app/AppVersionHistory.vue'),
                    meta: { title: 'App Version List' }
                },                
                {
                    path: '/app_detail',
                    component: () => import(/* webpackChunkName: "upload_application" */ '../components/page/app/AppDetail.vue'),
                    meta: { title: 'App Detail' }
                },
                {
                    path: '/app_on_shelf',
                    component: () => import(/* webpackChunkName: "upload_application" */ '../components/page/app/AppOnShelf.vue'),
                    meta: { title: 'App On Shelf' }
                },
                {
                    path: '/topic_recommendation',
                    component: () => import(/* webpackChunkName: "upload_application" */ '../components/page/recommend/TopicRecommendation.vue'),
                    meta: { title: '专题推荐' }
                },
                {
                    path: '/topic_new',
                    component: () => import(/* webpackChunkName: "upload_application" */ '../components/page/recommend/TopicNew.vue'),
                    meta: { title: 'Topic New' }
                },
                {
                    path: '/topic_detail',
                    component: () => import(/* webpackChunkName: "upload_application" */ '../components/page/recommend/TopicDetail.vue'),
                    meta: { title: 'Topic Detail' }
                },
                {
                    path: '/account_new',
                    component: () => import(/* webpackChunkName: "upload_application" */ '../components/page/account/AccountNew.vue'),
                    meta: { title: 'Account New' }
                },
                {
                    path: '/account_edit',
                    component: () => import(/* webpackChunkName: "upload_application" */ '../components/page/account/AccountEdit.vue'),
                    meta: { title: 'Account Edit' }
                },
                {
                    path:'/device_group_management',
                    component: ()=> import(/* webpackChunkName: "upload_application" */ '../components/page/device_group/DeviceGroupManagement.vue'),
                    meta: {title: 'Device Group Management'}
                },
                {
                    path:'/device_group_new',
                    component: ()=> import(/* webpackChunkName: "upload_application" */ '../components/page/device_group/DeviceGroupNew.vue'),
                    meta: {title: 'Device Group New'}
                },
                {
                    path:'/vehicle_brand',
                    component: ()=> import('../components/page/vehicle/VehicleBrand.vue'),
                    meta: {title: 'Vehicle Brand'}
                },
                {
                    path:'/vehicle_kind',
                    component: ()=> import('../components/page/vehicle/VehicleKind.vue'),
                    meta: {title: 'Vehicle Kind'}
                },
                {
                    path:'/vehicle_model',
                    component: ()=> import('../components/page/vehicle/VehicleModel.vue'),
                    meta: {title: 'Vehicle Model'}
                },
                {
                    path:'/device_group_detail',
                    component: ()=> import(/* webpackChunkName: "upload_application" */ '../components/page/device_group/DeviceGroupDetail.vue'),
                    meta: {title: 'Device Group Detail'}
                },
                {
                    path:'/statistical_information',
                    component: ()=> import(/* webpackChunkName: "upload_application" */ '../components/page/StatisticalInformation.vue'),
                    meta: {title: 'Statistical Information'}
                },
                {
                    path: '/top_recommendation',
                    component: () => import(/* webpackChunkName: "upload_application" */ '../components/page/recommend/TopRecommendation.vue'),
                    meta: { title: '专题推荐' }
                },
                {
                    path: '/change_password',
                    component: () => import(/* webpackChunkName: "upload_application" */ '../components/page/ChangePassword.vue'),
                    meta: { title: '修改密码' }
                },
                {
                    path: '/category_recommendation',
                    component: () => import(/* webpackChunkName: "upload_application" */ '../components/page/recommend/CategoryRecommendation.vue'),
                    meta: { title: '专题推荐' }
                },
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/icon',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/Icon.vue'),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/table',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/tabs',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/VueEditor.vue'),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: () => import(/* webpackChunkName: "markdown" */ '../components/page/Markdown.vue'),
                    meta: { title: 'markdown编辑器' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: () => import(/* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
                    meta: { title: '文件上传' }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: () => import(/* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: () => import(/* webpackChunkName: "drag" */ '../components/page/DragList.vue'),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DragDialog.vue'),
                    meta: { title: '拖拽弹框' }
                },
                {
                    // 国际化组件
                    path: '/i18n',
                    component: () => import(/* webpackChunkName: "i18n" */ '../components/page/I18n.vue'),
                    meta: { title: '国际化' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },
                {
                    path: '/donate',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/Donate.vue'),
                    meta: { title: '支持作者' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
