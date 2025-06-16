import ReturnModel from "../../models/return_model.js";
import DompetListService from "../../services/dompet/dompetlist_service.js";
import RouteName from "../../config/routename.js";
import FormatData from "../../utils/formatdata.js";

window.addEventListener('load', () => {
    let dompet = new DompetListController();
    dompet.list_data();
})

window.onClickTambah = () => {
    window.location.href = RouteName.dompetae;
}

class DompetListController{
    async list_data(){
        let swal = require('sweetalert2').default;
        let res = new ReturnModel();
        let dompetListService = new DompetListService();

        try{
            res = await dompetListService.requestData();
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
                                `<button type="button" class="btn btn-sm btn-info me-3" onclick="onClickEdit('${data[i].id}')">`+
                                    '<i class="fa fa-edit"></i>'+
                                '</button>'+
                                `<button type="button" class="btn btn-sm btn-danger" onclick="onClickHapus('${data[i].id}')">`+
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
}