import InstallDB from '../../setup/installdb.js';
import ReturnModel from '../models/return_model.js';

class StartAppController{
    async initialDB(){
        const swal = require('sweetalert2').default;

        let install = new InstallDB();
        let res = new ReturnModel();
        try{
            res = await install.createDB();
            if(res.number != 0){
                swal.fire('Error Create DB', res.message, 'error');
                return;
            }

            await this.runPatch();
        }catch(e){
            swal.fire('Error Inital DB', e.message, 'error');
        }
    }

    async runPatch(){}
}

window.StartAppController = StartAppController