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

    let kategori = new KategoriAEController();
    kategori.read_data(id);
    document.getElementById('title').innerHTML = 'Edit Kategori';
    document.getElementById('btn-save').setAttribute('data-mode', 'edit');
    document.getElementById('btn-save').setAttribute('data-item-id', id);
});

let btnSave = document.getElementById('btn-save');
btnSave.addEventListener('click', () => {
    let kategori = new KategoriAEController();

    let mode = btnSave.dataset.mode;
    if(mode == "add"){
        kategori.save_data();
        return;
    }

    let id = btnSave.dataset.itemId;
    kategori.update_data(id);
})

//#region KategoriAEController
class KategoriAEController{
    async read_data(id){
        let swal = require('sweetalert2').default;
        let res = new ReturnModel();
        let kategoriAE = new KategoriAEService();

        try{
            res = await kategoriAE.readData(id);
            if(res.number != 0){
                swal.fire(`Error Number : ${res.number}`, res.message, 'error').then((onPress) => {
                    if(onPress.isConfirmed){
                        history.back();
                    }
                })
                return;
            }

            document.getElementById('kategori').value = kategoriAE.kategoriData.kategori;
            document.getElementById('tipe').value = kategoriAE.kategoriData.tipe;
        }catch(e){
            swal.fire('Error Read', e.message, 'error').then((onPress) => {
                if(onPress.isConfirmed){
                    history.back();
                }
            })
        }
    }

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

    async update_data(id){
        let swal = require('sweetalert2').default;
        let res = new ReturnModel();
        let kategoriAE = new KategoriAEService();
        
        try{
            let tipe = document.getElementById('tipe');
            let kategori = FormatData.isHtmlInput(document.getElementById('kategori'));

            kategoriAE.kategoriData.tipe = tipe.value;
            kategoriAE.kategoriData.kategori = kategori.value;
            res = await kategoriAE.updateData(id);
            if(res.number != 0){
                swal.fire(`Error Number : ${res.number}`, res.message, 'error');
                return;
            }

            swal.fire('Update Kategori', res.message, 'success').then((onPress) => {
                if(onPress.isConfirmed){
                    window.location.href = RouteName.kategorilist;
                    return;
                }
            })
        }catch(e){
            swal.fire('Error Update Data', e.message, 'error');
        }
    }
}
//#endregion KategoriAEController