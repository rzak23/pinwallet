import RouteName from "../../config/routename.js";
import ReturnModel from "../../models/return_model.js";
import DompetAEService from "../../services/dompet/dompetae_service.js";
import FormatData from "../../utils/formatdata.js";

window.addEventListener('load', () => {
    const param = new URLSearchParams(window.location.search);
    let id = param.get('id');
    if(FormatData.isNullorEmpty(id)){
        document.getElementById('title').innerHTML = 'Buat Dompet Baru';
        document.getElementById('btn-save').setAttribute('data-mode', 'add');
        return;
    }

    let dompetAe = new DompetAEController();
    dompetAe.read_data(id);
    
    document.getElementById('title').innerHTML = 'Edit Dompet';
    document.getElementById('btn-save').setAttribute('data-mode', 'edit');
    document.getElementById('btn-save').setAttribute('data-item-id', id);
});

let btnSave = document.getElementById('btn-save');
btnSave.addEventListener('click', () => {
    let dompetAe = new DompetAEController();

    let mode = btnSave.dataset.mode;
    if(mode == 'add'){
        dompetAe.save_data();
        return;
    }

    let id = btnSave.dataset.itemId;
    dompetAe.update_data(id);
})

//#region DompetAEController
class DompetAEController{
    async read_data(id){
        let swal = require('sweetalert2').default;
        let res = new ReturnModel();
        let dompetAeService = new DompetAEService();

        let dompet = FormatData.isHtmlInput(document.getElementById('dompet'));
        let nominal = FormatData.isHtmlInput(document.getElementById('nominal'));
        try{
            res = await dompetAeService.readData(id);
            if(res.number != 0){
                swal.fire(`Error Number : ${res.number}`, res.message, 'success').then((onPress) => {
                    if(onPress.isConfirmed){
                        window.location.href = RouteName.dompetlist;
                    }
                });
                return;
            }

            dompet.value = dompetAeService.dompetData.dompet;
            nominal.value = dompetAeService.dompetData.nominal;
        }catch(e){
            swal.fire('Error Read Data', e.message, 'error');
        }
    }

    async save_data(){
        let swal = require('sweetalert2').default;
        let res = new ReturnModel();
        let dompetAeService = new DompetAEService();

        let dompet = FormatData.isHtmlInput(document.getElementById('dompet'));
        let nominal = FormatData.isHtmlInput(document.getElementById('nominal'));

        try{
            if(FormatData.isNullorEmpty(dompet.value)){
                swal.fire('Validasi', 'Nama Dompet wajib diisi');
                return;
            }

            dompetAeService.dompetData.dompet = dompet.value;
            dompetAeService.dompetData.nominal = nominal.value;
            res = await dompetAeService.saveData();
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
        let dompetAeService = new DompetAEService();

        let dompet = FormatData.isHtmlInput(document.getElementById('dompet'));
        let nominal = FormatData.isHtmlInput(document.getElementById('nominal'));
        try{
            dompetAeService.dompetData.dompet = dompet.value;
            dompetAeService.dompetData.nominal = nominal.value;
            res = await dompetAeService.updateData(id);
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