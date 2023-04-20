// ref、reactive 响应式API(ref操作普通类型:int... reactive操作方法)
import { ref, reactive } from 'vue'
// 退出登陆和修改密码接口
import { logout, updatepassword } from "~/api/manager"
// 消息提醒和弹出消息提示框
import { showModal, toast } from "~/composables/util"
// 路由
import { useRouter } from "vue-router"
// 状态管理
import { useStore } from "vuex"

// 修改密码方法
export function useRepassword() {
    const router = useRouter()
    const store = useStore()
    // 修改密码
    const formDrawerRef = ref(null)
    const form = reactive({
        oldpassword: "",
        password: "",
        repassword: ""
    })

    const rules = {
        oldpassword: [
            {
                // 必填
                required: true,
                // 提示
                message: '旧密码不能为空',
                trigger: 'blur'
            },
        ],
        password: [
            {
                required: true,
                message: '新密码不能为空',
                trigger: 'blur'
            },
        ],
        repassword: [
            {
                required: true,
                message: '确认密码不能为空',
                trigger: 'blur'
            },
        ]
    }

    const formRef = ref(null)
    const onSubmit = () => {
        formRef.value.validate((valid) => {
            if (!valid) {
                return false
            }
            formDrawerRef.value.showLoading()
            updatepassword(form)
                .then(res => {
                    toast("修改密码成功，请重新登录")
                    // 修改完重新登陆
                    store.dispatch("logout")
                    // 跳转回登录页
                    router.push("/login")
                })
                .finally(() => {
                    formDrawerRef.value.hideLoading()
                })

        })
    }

    const openRePasswordForm = () => formDrawerRef.value.open()

    return {
        formDrawerRef,
        form,
        rules,
        formRef,
        onSubmit,
        openRePasswordForm
    }
}

// 退出登陆提示框
export function useLogout() {
    const router = useRouter()
    const store = useStore()
    function handleLogout() {
        showModal("是否要退出登录？").then(res => {
            logout().finally(() => {
                store.dispatch("logout")
                // 跳转回登录页
                router.push("/login")
                // 提示退出登录成功
                toast("退出登录成功")
            })
        })
    }

    return {
        handleLogout
    }
}