import RouteName from '../config/routename.js';
import ReturnModel from '../models/return_model.js';
import AuthService from '../services/auth_service.js';
import FormatData from '../utils/formatdata.js';

window.addEventListener('keydown', async (event) => {
    let auth = new AuthController();
    if(event.key === 'Enter'){
        await auth.create_akun();
        event.preventDefault();
    }
});

document.getElementById('btn-regis').addEventListener('click', async () => {
    let auth = new AuthController();
    await auth.create_akun();
});

//#region AuthController
class AuthController{
    async create_akun(){
        const swal = require('sweetalert2').default;

        let authService = new AuthService();
        let res = new ReturnModel();
        try{
            let username = FormatData.isHtmlInput(document.getElementById('username')).value;
            let nama = FormatData.isHtmlInput(document.getElementById('nama')).value;
            let pass = FormatData.isHtmlInput(document.getElementById('pass')).value;
            if(FormatData.isNullorEmpty(username)){
                swal.fire('Validasi', 'Username wajib diisi', 'warning');
                return;
            }

            if(FormatData.isNullorEmpty(nama)){
                swal.fire('Validasi', 'Nama wajib diisi', 'warning');
                return;
            }

            if(FormatData.isNullorEmpty(pass)){
                swal.fire('Validasi', 'Password wajib diisi', 'warning');
                return;
            }

            authService.userData.nama = nama;
            authService.userData.username = username;
            authService.userData.password = pass;
            res = await authService.createAkun();
            if(res.number != 0){
                swal.fire(`Error Number : ${res.number}`, res.message, 'error');
                return;
            }

            swal.fire('Akun', res.message, 'success').then((onPress) => {
                if(onPress.isConfirmed){
                    window.location.href = RouteName.login;
                    return;
                }
            });
        }catch(e){
            swal.fire('Error Buat Akun', e.message, 'error');
        }
    }
}
//#endregion AuthController