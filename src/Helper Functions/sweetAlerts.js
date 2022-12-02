import swal from 'sweetalert'

export const handleLogout = (logoutAndRedirect) => {
    swal({
        title : 'Sure you wanna Logout?',
        icon : 'warning',
        buttons : true,
        })
        .then((willLogout)=>{
            if(willLogout) {
                swal({
                    title : 'Logged out Successfully',
                    icon : 'success'
                })
                logoutAndRedirect()
            }
        })
}