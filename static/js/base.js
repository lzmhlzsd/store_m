var validate = {
    Phone: function ( rule, value, callback ) {
        if ( value == '' ) {
            callback();
            return;
        }
        var result = value.match( /^((\(\d{2,3}\))|(\d{3}\-))?((13\d{9})|(15\d{9})|(17\d{9})|(18\d{9})|(19\d{9}))$/ );
        if ( result == null ) {
            callback( new Error( '请输入正确的手机号码' ) );
        }
        else {
            callback();
        }
    }
}

var fetch = function ( url, data, type) {
    if ( type === 'GET' ) {
        return new Promise( ( resolve, reject ) => {
            axios.get( url )
                .then( response => {
                    mUtil.handleResponse( response, function ( res ) {
                        if ( res.ecode === 1000 ) {
                            resolve( res.result )
                        } else {
                            reject( res.emsg )
                        }
                    } )
                } )
                .catch( error => {
                    mUtil.handleError( error )
                } )
        } )
    } else {
        return new Promise( ( resolve, reject ) => {
            axios.post( url, data )
                .then( response => {
                    if ( response.status === 200 ) {
                        resolve( response.data )
                    } else {
                        reject( response.statusText )
                    }
                } )
                .catch( error => {
                    reject( error.message )
                } )
        } )
    }
}