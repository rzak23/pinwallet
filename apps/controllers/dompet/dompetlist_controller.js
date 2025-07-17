import ReturnModel from "../../models/return_model.js";
import DompetListService from "../../services/dompet/dompetlist_service.js";
import RouteName from "../../config/routename.js";
import FormatData from "../../utils/formatdata.js";

//#region DompetListController
class DompetListController{ 
    dompetListService = new DompetListService();

    async list_data(){
        let swal = require('sweetalert2').default;
        let res = new ReturnModel();

        try{
            res = await this.dompetListService.requestData();
            if(res.number != 0){
                swal.fire(`Error Number : ${res.number}`, res.message, 'error');
                return;
            }

            let html = '';
            let data = res.data;
            for(let i = 0; i < data.length; i++){
                html += '<tr>'+
                            `<td>${data[i].namadompet}</td>`+
                            `<td>${FormatData.harga(data[i].nominal)}</td>`+
                            '<td class="text-center">'+
                                `<button type="button" class="btn btn-sm btn-info me-2" onclick="onClickEdit('${data[i].dompetid}')">`+
                                    '<i class="fa fa-edit"></i>'+
                                '</button>'+
                                `<button type="button" class="btn btn-sm btn-danger" onclick="onClickHapus('${data[i].dompetid}')">`+
                                    '<i class="fa fa-trash"></i>'+
                                '</button>'+
                            '</td>'+
                        '</tr>';
            }

            document.getElementById('list-data').innerHTML = html;
        }catch(e){
            swal.fire('Error List Data', e.message, 'error');
        }
    }

    async hapus_data(id){
        let swal = require('sweetalert2').default;
        let res = new ReturnModel();

        try{
            res = await this.dompetListService.deleteData(id);
            if(res.number != 0){
                swal.fire(`Error Number : ${res.number}`, res.message, 'error');
                return;
            }

            swal.fire('Hapus Dompet', res.message, 'success').then((onPress) => {
                if(onPress.isConfirmed){
                    window.location.reload();
                    return;
                }
            });
        }catch(e){
            swal.fire('Error Hapus Data', e.message, 'error');
        }
    }
}
//#endregion DompetListController

let dompet = new DompetListController();
window.addEventListener('load', () => {
    dompet.list_data();
})

window.onClickTambah = () => {
    window.location.href = RouteName.dompetae;
}

window.onClickEdit = (id) => {
    window.location.href = `${RouteName.dompetae}?id=${id}`;
}

window.onClickHapus = (id) => {
    dompet.hapus_data(id);
}
