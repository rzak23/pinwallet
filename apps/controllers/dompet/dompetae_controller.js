import RouteName from "../../config/routename.js";
import ReturnModel from "../../models/return_model.js";
import DompetAEService from "../../services/dompet/dompetae_service.js";
import FormatData from "../../utils/formatdata.js";

window.addEventListener('load', () => {
    document.getElementById('title').innerHTML = 'Buat Dompet Baru';
});

document.getElementById('btn-save').addEventListener('click', () => {
    let dompetAe = new DompetAEController();
    dompetAe.save_data();
})

//#region DompetAEController
class DompetAEController{
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
}
//#endregion DompetAEController