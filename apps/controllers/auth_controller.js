import RouteName from '../config/routename.js';
import ReturnModel from '../models/return_model.js';
import AuthService from '../services/auth_service.js';
import DialogApp from '../utils/dialogapp.js';
import FormatData from '../utils/formatdata.js';

//#region AuthController
class AuthController{
    authService = new AuthService();

    async create_akun(){
        const swal = require('sweetalert2').default;
        let res = new ReturnModel();
        
        try{
            if(FormatData.isNullorEmpty(this.authService.userData.username)){
                swal.fire('Validasi', 'Username wajib diisi', 'warning');
                return;
            }

            if(FormatData.isNullorEmpty(this.authService.userData.nama)){
                swal.fire('Validasi', 'Nama wajib diisi', 'warning');
                return;
            }

            if(FormatData.isNullorEmpty(this.authService.userData.password)){
                swal.fire('Validasi', 'Password wajib diisi', 'warning');
                return;
            }

            DialogApp.showLoading();
            res = await this.authService.createAkun();
            DialogApp.hideLoading();
            if(res.number != 0){
                swal.fire(`Error Number : ${res.number}`, res.message, 'error');
                return;
            }

            swal.fire('Akun', res.message, 'success').then((onPress) => {
                if(onPress.isConfirmed){
                    window.location.href = `../auth/${RouteName.login}`;
                    return;
                }
            });
        }catch(e){
            swal.fire('Error Buat Akun', e.message, 'error');
        }
    }

    async login(){
        const swal = require('sweetalert2').default;
        let res = new ReturnModel();

        try{
            if(FormatData.isNullorEmpty(this.authService.userData.username)){
                swal.fire('Validasi', 'Username wajib diisi', 'warning');
                return;
            }

            if(FormatData.isNullorEmpty(this.authService.userData.password)){
                swal.fire('Validasi', 'Password wajib diisi', 'warning');
                return;
            }

            DialogApp.showLoading();
            res = await this.authService.verify();
            DialogApp.hideLoading();
            if(res.number != 0){
                swal.fire(`Error Number : ${res.number}`, res.message, 'error');
                return;
            }

            swal.fire('Login', res.message, 'success').then((onPress) => {
                if(onPress.isConfirmed){
                    window.location.href = `../${RouteName.dashboard}`;
                    return;
                }
            })
        }catch(e){
            swal.fire('Error Login', e.message, 'error');
        }
    }
}
//#endregion AuthController

let auth = new AuthController();

let btnRegis = document.getElementById('btn-regis');
let btnLogin = document.getElementById('btn-login');
window.addEventListener('keydown', async (event) => {
    if(event.key === 'Enter'){
        if(btnRegis) await auth.create_akun();
        if(btnLogin) await auth.login();
        event.preventDefault();
        return;
    }
});

if(btnRegis){
    document.getElementById('username').addEventListener('keyup', (form) => {
        auth.authService.userData.username = form.target.value;
    });
    document.getElementById('nama').addEventListener('keyup', (form) => {
        auth.authService.userData.nama = form.target.value;
    });
    document.getElementById('pass').addEventListener('keyup', (form) => {
        auth.authService.userData.password = form.target.value;
    });

    btnRegis.addEventListener('click', async () => {
        await auth.create_akun();
    });
}

if(btnLogin){
    document.getElementById('username').addEventListener('keyup', (form) => {
        auth.authService.userData.username = form.target.value;
    });
    document.getElementById('pass').addEventListener('keyup', (form) => {
        auth.authService.userData.password = form.target.value;
    })

    btnLogin.addEventListener('click', async () => {
        await auth.login();
    });
}