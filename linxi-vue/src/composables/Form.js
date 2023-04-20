// 响应式api
import { ref, reactive, computed } from 'vue';
// 提示框
import { showModal, toast } from "~/composables/util";


// 接受传入表单数据
export function InitForm(opt = {}) {
    // 页面数据列表
    const Data = ref([])

    // 表单板块加载动画
    const loading = ref(false)
    // 表单新增-0|修改-id(区分) 控制表单标题和表单按钮
    const editId = ref(0)
    // 新增按钮标题--按钮标题传入必须要computed
    const Newtitle = computed(() => opt.Buttontitle_value.title_2)
    // 表单确定按钮的标题
    const Buttontitle = computed(() => editId.value ? opt.Buttontitle_value.title_1 : opt.Buttontitle_value.title_2)
    // 表单标题
    const Formtitle = computed(() => editId.value ? opt.Formtitle_value.title_1 : opt.Formtitle_value.title_2)
    // 表单数据model model="form"
    const form = reactive({})
    // 表单验证规则
    const rules = opt.rules || {}
    // 表单默认状态数据列表
    const DefaultForm = opt.form
    // 表单父级 Formdialog 弹窗表单的ref
    const DialogformRef = ref(null)
    // 表单el-form 的ref
    const formRef = ref(null)


    // list卡片页面-打开页面请求数据
    const GetDataCard = () => {
        loading.value = true
        opt.getdata().then((res) => {
            // 获取响应数据里面的'data',给到listData
            Data.value = res.data
            // console.log(res)
        }).finally(() => {
            loading.value = false
        })
    }

    // 重置表单-传入列表数据(更新:一条数据,新增:不传入)
    function resetForm(row = false) {
        // 重置表单提示信息
        if (formRef.value) formRef.value.clearValidate()
        // 新增：重置表单数据-为空 更新：重置表单数据为传入数据
        // console.log("重置表单")
        // 循环遍历默认表单中的key 键(id,title...)
        for (const key in DefaultForm) {
            // 新增没有传入所以为空
            // 表单数据 = 更新数据的传入
            form[key] = row[key]
        }
    }

    // 新增数据按钮
    const AddData_Button = () => {
        // 新增：没有标识id 控制表单标题和表单按钮
        editId.value = 0
        // 重置表单数据为空
        resetForm(DefaultForm)
        // 打开表单
        DialogformRef.value.open()
    }

    // 更新数据按钮-传入修改的数据
    const UpData_Button = (index) => {
        // 修改：标识id=数据id 控制表单标题和表单按钮
        editId.value = index.id
        // 重置表单数据为需要修改的数据
        resetForm(index)
        // 打开表单
        DialogformRef.value.open()
    }

    // 按钮菜单项删除
    const DelData_Button = (index) => {
        showModal("是否确实要删除该条数据?", "warning", "提示")
            .then(() => {
                Data.value.splice(index, 1)
                opt.deldata(index.id)
                GetData()
            })
            .catch(() => {

            });
    }


    // 表单内按钮控制-点击表单内按钮
    const FormSubmit = () => {
        // 数据提交验证-匹配表单验证规则rules
        formRef.value.validate((valid) => {
            // 如果验证通过
            if (!valid) return
            // 确定按钮变为加载状态
            DialogformRef.value.showLoading()
            // 根据editId判断是新增还是修改   执行不同方式
            const fun = editId.value ? opt.updata(editId.value, form) : opt.adddata(form)
            // 请求完成
            fun.then(res => {
                // 新增|更新(修改)后刷新数据
                GetData()
                // 通知提示
                toast(Formtitle.value + "成功")
                // 重新获取数据
                opt.getdata()
                // 关闭表单
                DialogformRef.value.close()
            }).finally(() => {
                // 关闭按钮加载状态
                DialogformRef.value.hideLoading()
            })
        })
    }


    // ################################ 列表数据 #####################################
    // 搜索
    // let searchForm = null
    // let resetSearchForm = null
    // 分页
    const currentPage = ref(1)
    // 单页数量
    const limit = ref(10)
    // 总数量
    const total = ref(0)
    // table表格页面-打开页面请求数据
    function GetDataTable(p = null) {
        if (typeof p == "number") {
            currentPage.value = p
        }
        loading.value = true
        // console.log(p)
        opt.getdata(currentPage.value)
            .then(res => {
                Data.value = res.data
                // console.log(res)
                total.value = res.total
            })
            .finally(() => {
                loading.value = false
            })
    }
    // ########################################################################


    // 判断获取数据模块----(p 为表格数据传进来的页码)
    function GetData(p = null) {
        if (opt.title == "卡片数据") {
            return GetDataCard()
        }
        if (opt.title == "表格数据") {
            return GetDataTable(p)
        }
        if (opt.title == "列表数据") {
            return GetDataTable(p)
        }
    }

    // GetDefaultData()
    GetData()


    return {
        // 新增按钮标题
        Newtitle,
        // 页面获取的数据
        Data,
        // 数据板块的加载状态
        loading,
        // 表单按钮标题
        Buttontitle,
        // 表单标题
        Formtitle,
        // 区别新增和修改
        editId,
        // 表单model
        form,
        // 表单验证规则
        rules,
        // 父级FormDialog的ref
        DialogformRef,
        // 表单el-form的ref
        formRef,
        // 获取页面数据
        GetData,
        // 新增数据按钮
        AddData_Button,
        // 修改|更新数据按钮
        UpData_Button,
        // 删除数据按钮
        DelData_Button,
        // 绑定FormDialog弹窗表单按钮事件
        FormSubmit,

        // ##### 列表数据分页 #####
        currentPage,
        total,
        limit,
    }
}