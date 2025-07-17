import RouteName from "../../config/routename.js";
import ReturnModel from "../../models/return_model.js";
import DompetAEService from "../../services/dompet/dompetae_service.js";
import FormatData from "../../utils/formatdata.js";

//#region DompetAEController
class DompetAEController{
    dompetAeService = new DompetAEService();

    async read_data(id){
        let swal = require('sweetalert2').default;
        let res = new ReturnModel();

        let dompet = FormatData.isHtmlInput(document.getElementById('dompet'));
        let nominal = FormatData.isHtmlInput(document.getElementById('nominal'));
        try{
            res = await this.dompetAeService.readData(id);
            if(res.number != 0){
                swal.fire(`Error Number : ${res.number}`, res.message, 'success').then((onPress) => {
                    if(onPress.isConfirmed){
                        window.location.href = RouteName.dompetlist;
                    }
                });
                return;
            }

            dompet.value = this.dompetAeService.dompetData.dompet;
            nominal.value = this.dompetAeService.dompetData.nominal;
        }catch(e){
            swal.fire('Error Read Data', e.message, 'error');
        }
    }

    async save_data(){
        let swal = require('sweetalert2').default;
        let res = new ReturnModel();

        try{
            if(FormatData.isNullorEmpty(this.dompetAeService.dompetData.dompet)){
                swal.fire('Validasi', 'Nama Dompet wajib diisi', 'warning');
                return;
            }

            res = await this.dompetAeService.saveData();
            if(res.number != 0){
                swal.fire(`Error Number : ${res.number}`, res.message, 'error');
                return;
            }

            swal.fire('Tambah Dompet', res.message, 'success').then((onPress) => {
                if(onPress.isConfirmed){
                    window.location.href = RouteName.dompetlist;
                }

                return;
            });
        }catch(e){
            swal.fire('Error Save Data', e.message, 'error');
        }
    }

    async update_data(id){
        let swal = require('sweetalert2').default;
        let res = new ReturnModel();

        try{
            if(FormatData.isNullorEmpty(this.dompetAeService.dompetData.dompet)){
                swal.fire('Validasi', 'Nama Dompet wajib diisi', 'warning');
                return;
            }

            res = await this.dompetAeService.updateData(id);
            if(res.number != 0){
                swal.fire(`Error Number : ${res.number}`, res.message, 'error');
                return;
            }

            swal.fire('Update Dompet', res.message, 'success').then((onPress) => {
                if(onPress.isConfirmed){
                    window.location.href = RouteName.dompetlist;
                }
            });
        }catch(e){
            swal.fire('Erro Update', e.message, 'error');
        }
    }
}
//#endregion DompetAEController

let dompetAe = new DompetAEController();
window.addEventListener('load', () => {
    const param = new URLSearchParams(window.location.search);
    let id = param.get('id');
    if(FormatData.isNullorEmpty(id)){
        document.getElementById('title').innerHTML = 'Buat Dompet Baru';
        document.getElementById('btn-save').setAttribute('data-mode', 'add');
        return;
    }

    dompetAe.read_data(id);
    
    document.getElementById('title').innerHTML = 'Edit Dompet';
    document.getElementById('btn-save').setAttribute('data-mode', 'edit');
    document.getElementById('btn-save').setAttribute('data-item-id', id);
});

document.getElementById('dompet').addEventListener('keyup', (form) => {
    dompetAe.dompetAeService.dompetData.dompet = form.target.value;
});
document.getElementById('nominal').addEventListener('keyup', (form) => {
    dompetAe.dompetAeService.dompetData.nominal = form.target.value;
});

let btnSave = document.getElementById('btn-save');
btnSave.addEventListener('click', () => {
    let mode = btnSave.dataset.mode;
    if(mode == 'add'){
        dompetAe.save_data();
        return;
    }

    let id = btnSave.dataset.itemId;
    dompetAe.update_data(id);
})