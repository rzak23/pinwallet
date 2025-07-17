import RouteName from "../../config/routename.js";
import ReturnModel from "../../models/return_model.js";
import KategoriAEService from "../../services/kategori/kategoriae_service.js";
import FormatData from "../../utils/formatdata.js";

//#region KategoriAEController
class KategoriAEController{
    kategoriAEService = new KategoriAEService();

    async read_data(id){
        let swal = require('sweetalert2').default;
        let res = new ReturnModel();

        try{
            res = await this.kategoriAEService.readData(id);
            if(res.number != 0){
                swal.fire(`Error Number : ${res.number}`, res.message, 'error').then((onPress) => {
                    if(onPress.isConfirmed){
                        history.back();
                    }
                })
                return;
            }

            document.getElementById('kategori').value = this.kategoriAEService.kategoriData.kategori;
            document.getElementById('tipe').value = this.kategoriAEService.kategoriData.tipe;
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

        try{
            if(FormatData.isNullorEmpty(this.kategoriAEService.kategoriData.kategori)){
                swal.fire('Validasi', 'Nama Kategori wajib diisi', 'warning');
                return;
            }

            res = await this.kategoriAEService.saveData();
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
        
        try{
            if(FormatData.isNullorEmpty(this.kategoriAEService.kategoriData.kategori)){
                swal.fire('Validasi', 'Nama Kategori wajib diisi', 'warning');
                return;
            }
            
            res = await this.kategoriAEService.updateData(id);
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

let kategori = new KategoriAEController();

window.addEventListener('load', () => {
    const param = new URLSearchParams(window.location.search);
    let id = param.get('id');
    if(FormatData.isNullorEmpty(id)){
        document.getElementById('title').innerHTML = 'Tambah Kategori';
        document.getElementById('btn-save').setAttribute('data-mode', 'add');
        return;
    }

    kategori.read_data(id);
    document.getElementById('title').innerHTML = 'Edit Kategori';
    document.getElementById('btn-save').setAttribute('data-mode', 'edit');
    document.getElementById('btn-save').setAttribute('data-item-id', id);
});

document.getElementById('kategori').addEventListener('keyup', (form) => {
    kategori.kategoriAEService.kategoriData.kategori = form.target.value;
});
document.getElementById('tipe').addEventListener('change', (form) => {
    kategori.kategoriAEService.kategoriData.tipe = form.target.value;
});

let btnSave = document.getElementById('btn-save');
btnSave.addEventListener('click', () => {
    let mode = btnSave.dataset.mode;
    if(mode == "add"){
        kategori.save_data();
        return;
    }

    let id = btnSave.dataset.itemId;
    kategori.update_data(id);
})