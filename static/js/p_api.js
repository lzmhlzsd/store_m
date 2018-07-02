var baseUrl = '/api'
var API = {
    // 获取所有角色
    getAllRole: ( params ) => fetch( baseUrl + '/getAllRole', params, 'POST' ),
    // 获取账户列表
    getAccountList: ( params ) => fetch( baseUrl + '/getAllAccount', params, 'POST' ),
    // 获取经销商权限
    getMerchantAccess: ( params ) => fetch( baseUrl + '/getMerchantAccess', params, 'POST' ),
    // 获取门店权限
    getStoreAccess: ( params ) => fetch( baseUrl + '/getStoreAccess', params, 'POST' )
}