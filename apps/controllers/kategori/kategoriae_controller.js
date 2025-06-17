import RouteName from "../../config/routename.js";
import ReturnModel from "../../models/return_model.js";
import KategoriAEService from "../../services/kategori/kategoriae_service.js";
import FormatData from "../../utils/formatdata.js";

window.addEventListener('load', () => {
    const param = new URLSearchParams(window.location.search);
    let id = param.get('id');
    if(FormatData.isNullorEmpty(id)){
        document.getElementById('title').innerHTML = 'Tambah Kategori';
        document.getElementById('btn-save').setAttribute('data-mode', 'add');
        return;
    }
});

let btnSave = document.getElementById('btn-save');
btnSave.addEventListener('click', () => {
    let kategori = new KategoriAEController();

    let mode = btnSave.dataset.mode;
    if(mode == "add"){
        kategori.save_data();
        return;
    }
})

//#region KategoriAEController
class KategoriAEController{
    async save_data(){
        let swal = require('sweetalert2').default;
        let res = new ReturnModel();
        let kategoriAE = new KategoriAEService();
        try{
            let tipe = document.getElementById('tipe');
            let kategori = FormatData.isHtmlInput(document.getElementById('kategori'));

            kategoriAE.kategoriData.tipe = tipe.value;
            kategoriAE.kategoriData.kategori = kategori.value;
            res = await kategoriAE.saveData();
            if(res.number != 0){
                swal.fire(`Error Number : ${res.number}`, res.message, 'error');
                return;
            }

            swal.fire('Tambah Kategori', res.message, 'success').then((onPress) => {
                if(onPress.isConfirmed){
                    window.location.href = RouteName.kategorilist;
                }
            });
        }catch(e){
            swal.fire('Gagal Simpan', e.message, 'error');
        }
    }
}
//#endregion KategoriAEController