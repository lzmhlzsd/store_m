
var vue = new Vue( {
    el: '#app',
    data: {
        modal_add: false,
        modal_edit: false,
        modal_loading: true,
        modal_access_merchant: false,
        modal_access_store: false,
        roleList: [],
        total: 0,
        pageIndex: 1,
        pageSize: 10,
        formValidate: {
            account: '',
            name: '',
            phone: '',
            mail: '',
            role: ''
        },
        ruleValidate: {
            account: [
                { required: true, message: '用户名不能为空', trigger: 'blur' }
            ],
            name: [
                { required: true, message: '姓名不能为空', trigger: 'blur' }
            ],
            phone: [
                { validator: validate.Phone, trigger: 'blur' }
            ],
            mail: [
                { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
            ],
            role: [
                { required: true, message: '请选择角色', trigger: 'change' }
            ],
        },
        filter: {
            account: '',
            name: ''
        },
        access_merchant_data: [],
        access_merchant_targetKeys: [],
        columns: [
            {
                title: '用户名',
                key: 'account',
                sortable: true
            },
            {
                title: '真实名',
                key: 'name'
            },
            {
                title: '手机',
                key: 'phone'
            },
            {
                title: '邮箱',
                key: 'mail'
            },
            {
                title: '角色',
                key: 'role'
            },
            {
                title: '权限',
                key: 'action',
                width: 200,
                align: 'center',
                render: ( h, params ) => {
                    return h( 'div', [
                        h( 'Button', {
                            props: {
                                type: 'default',
                                size: 'small'
                            },
                            style: {
                                marginRight: '5px'
                            },
                            on: {
                                click: () => {
                                    // vue.show( params.index )
                                    vue.modal_access_merchant = true;
                                    vue.getMerchantAccess()
                                }
                            }
                        }, '经销商权限' ),
                        h( 'Button', {
                            props: {
                                type: 'default',
                                size: 'small'
                            },
                            style: {
                                marginRight: '5px'
                            },
                            on: {
                                click: () => {
                                    // vue.show( params.index )
                                    vue.modal_access_store = true;
                                }
                            }
                        }, '门店权限' )
                    ] );
                }
            },
            {
                title: '操作',
                key: 'action',
                width: 150,
                align: 'center',
                render: ( h, params ) => {
                    return h( 'div', [
                        h( 'Button', {
                            props: {
                                type: 'primary',
                                size: 'small'
                            },
                            style: {
                                marginRight: '5px'
                            },
                            on: {
                                click: () => {
                                    vue.showEditDialog( params.index )
                                }
                            }
                        }, '修改' ),
                        h( 'Button', {
                            props: {
                                type: 'error',
                                size: 'small'
                            },
                            on: {
                                click: () => {
                                    vue.$Modal.confirm( {
                                        title: '提示',
                                        content: '<p class="f-14">请确认是否删除</p>',
                                        onOk: () => {
                                            vue.delete( params.row )
                                        }
                                    } );
                                }
                            }
                        }, '删除' )
                    ] );
                }
            }
        ],
        data: []
    },
    created: function () {
        this.getAllAccount()
        this.getAllRole()
    },
    methods: {
        // 查询
        seach: function () {
            this.$Message.success( 'seach!' );
        }, 
        // 添加
        showAddDialog: function () {
            this.modal_add = true;
        },
        // 显示编辑对话框
        showEditDialog: function ( index ) {
            this.modal = true;
        },
        // 确认添加
        ok_add: function () {
            this.modal_loading = false
            this.$refs['formValidate'].validate( ( valid ) => {
                this.$nextTick( () => {
                    this.modal_loading = true;
                } );
                if ( valid ) {
                    this.modal_add = false;
                    this.$Message.success( 'Success!' );
                } else {
                    this.$Message.error( 'Fail!' );
                }
            } )
        },
        // 确认编辑
        ok_edit: function () {
            
        },
        // 取消编辑
        cancel_edit: function () {

        },
        // 删除
        delete: function (p) {
            console.log(p)
        },
        ok_access_merchant: function () {
            
        },
        ok_access_store: function () {
            
        },
        // 页码改变
        onChange: function (e) {
            console.log( `pageindex: ${e}` )
            this.pageIndex = e
        },
        // 切换每页条数
        onPageSizeChange: function ( e) {
            console.log( `pagesize: ${e}` )
            this.pageSize = e
        },
        render: function ( item ) {
            return item.name  
        },
        
        // api
        async getAllAccount() {
            try {
                let res = await API.getAccountList( {
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize,
                    filter: this.filte
                })
                if ( res.ecode == 1000 ) {
                    this.data = res.result.list
                    this.total = res.result.total
                    this.pageIndex = res.result.pageIndex
                } else {
                    this.$Modal.error( {
                        title: '提示',
                        content: res.emsg
                    } );
                }
            } catch ( error ) {
                this.$Modal.error( {
                    title: '异常',
                    content: error
                } );
            }
        },
        async getAllRole() {
            try {
                let res = await API.getAllRole()
                if ( res.ecode == 1000 ) {
                    this.roleList = res.result
                } else {
                    this.$Modal.error( {
                        title: '提示',
                        content: res.emsg
                    } );
                }
            } catch ( error) {
                this.$Modal.error( {
                    title: '异常',
                    content: error
                } );
            }
        },
        async getMerchantAccess() {
            try {
                let res = await API.getMerchantAccess()
                if ( res.ecode == 1000 ) {
                    this.access_merchant_data = res.result
                } else {
                    this.$Modal.error( {
                        title: '提示',
                        content: res.emsg
                    } );
                }
            } catch ( error ) {
                this.$Modal.error( {
                    title: '异常',
                    content: error
                } );
            }
        },
        async getStoreAccess() {
            try {
                let res = await API.getStoreAccess()
                if ( res.ecode == 1000 ) {
                    this.roleList = res.result
                } else {
                    this.$Modal.error( {
                        title: '提示',
                        content: res.emsg
                    } );
                }
            } catch ( error ) {
                this.$Modal.error( {
                    title: '异常',
                    content: error
                } );
            }
        }
    }
} )