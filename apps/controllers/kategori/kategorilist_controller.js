import KategoriListService from "../../services/kategori/kategorilist_service.js";
import ReturnModel from "../../models/return_model.js";
import RouteName from "../../config/routename.js";

//#region KategoriListController
class KategoriListController{
    kategoriListService = new KategoriListService();

    async list_data(){
        let swal = require('sweetalert2').default;
        let res = new ReturnModel();

        try{
            res = await this.kategoriListService.requestData();
            if(res.number != 0){
                swal.fire(`Error Number : ${res.number}`, res.message, 'error');
                return;
            }

            let data = res.data;
            let htmlIn = '';
            let htmlOut = '';
            for(var i = 0; i < data.length; i++){
                if(data[i].tipeid == 1){
                    htmlIn += '<tr>'+
                                `<td class="text-star">${data[i].namakategori}</td>`+
                                '<td class="text-end">'+
                                    `<button class="btn btn-sm btn-info me-2" onclick="onClickEdit(${data[i].kategoriid})">`+
                                        '<i class="fa fa-edit"></i>'+
                                    '</button>'+
                                    `<button class="btn btn-sm btn-danger" onclick="onClickHapus(${data[i].kategoriid})">`+
                                        '<i class="fa fa-trash"></i>'+
                                    '</button>'+
                                '</td>'+
                            '</tr>';
                }

                if(data[i].tipeid == 2){
                    htmlOut += '<tr>'+
                                `<td class="text-star">${data[i].namakategori}</td>`+
                                '<td class="text-end">'+
                                    `<button class="btn btn-sm btn-info me-2" onclick="onClickEdit(${data[i].kategoriid})">`+
                                        '<i class="fa fa-edit"></i>'+
                                    '</button>'+
                                    `<button class="btn btn-sm btn-danger" onclick="onClickHapus(${data[i].kategoriid})">`+
                                        '<i class="fa fa-trash"></i>'+
                                    '</button>'+
                                '</td>'+
                            '</tr>';
                }

                document.getElementById('list-pemasukan').innerHTML = htmlIn;
                document.getElementById('list-pengeluaran').innerHTML = htmlOut;
            }
        }catch(e){
            swal.fire('Error List Data', e.message, 'error');
        }
    }

    async hapus(id){
        let swal = require('sweetalert2').default;
        let res = new ReturnModel();

        try{
            res = await this.kategoriListService.deleteData(id);
            if(res.number != 0){
                swal.fire(`Error Number : ${res.number}`, res.message, 'error');
                return;
            }

            swal.fire('Hapus Kategori', res.message, 'success').then((onPress) => {
                if(onPress.isConfirmed){
                    window.location.reload();
                    return;
                }
            });
        }catch(e){
            swal.fire('Error Hapus', e.message, 'error');
        }
    }
}
//#endregion KategoriListController

let kategori = new KategoriListController();
window.addEventListener('load', () => {
    kategori.list_data();
});

document.getElementById('btn-add').addEventListener('click', () => {
    window.location.href = RouteName.kategoriae;
});

window.onClickEdit = (id) => {
    window.location.href = `${RouteName.kategoriae}?id=${id}`;
}

window.onClickHapus = (id) => {
    kategori.hapus(id);
}