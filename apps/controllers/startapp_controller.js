import PatchDB from '../../patch/patchdb.js';
import InstallDB from '../../setup/installdb.js';
import RouteName from '../config/routename.js';
import ReturnModel from '../models/return_model.js';
import AuthService from '../services/auth_service.js';

window.addEventListener('load', () => {
    let startApp = new StartAppController();
    startApp.initial_db();
});

//#region class StartAppController
class StartAppController{
    async initial_db(){
        const swal = require('sweetalert2').default;

        let install = new InstallDB();
        let res = new ReturnModel();
        try{
            res = await install.createDB();
            if(res.number !== 0){
                swal.fire('Error Create DB', res.message, 'error');
                return;
            }

            await this.run_patch();
            this.cek_user();
        }catch(e){
            swal.fire('Error Inital DB', e.message, 'error');
        }
    }

    async cek_user(){
        const swal = require('sweetalert2').default;

        let authService = new AuthService();
        let res = new ReturnModel();
        try{
            res = await authService.cekUser();
            if(res.number !== 0){
                swal.fire(`Error Number : ${res.number}`, res.message, 'error');
                return;
            }

            if(res.totalData === 0){
                window.location.href = RouteName.register;
                return;
            }

            window.location.href = RouteName.login;
        }catch(e){
            swal.fire('Error Cek User', e.message, 'error');
        }
    }

    async run_patch(){
        await PatchDB.runPatch();
    }
}
//#endregion StartAppController