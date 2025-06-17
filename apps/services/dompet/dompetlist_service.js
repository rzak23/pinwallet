import Koneksi from '../../lib/koneksi.js';
import ReturnModel from '../../models/return_model.js';
import { DompetModel } from '../../models/dompet/dompet_model.js';

class DompetListService{
    constructor(){
        this.dompetData = new DompetModel();
    }

    async requestData(){
        let res = new ReturnModel();
        let koneksi = await Koneksi.openDB();
        try{
            let result = await koneksi.all("SELECT * FROM wl_dompet");
            let lstData = [];
            result.forEach(row => {
                this.dompetData.fromJson(row);
                lstData.push(this.dompetData.toJson());
            })

            res.data = lstData;
            return res;
        }catch(e){
            res.number = 500;
            res.message = e.message;
            return res;
        }finally{
            await koneksi.close();
        }
    }

    async deleteData(id){
        let res = new ReturnModel();
        let koneksi = await Koneksi.openDB();
        try{
            let result = await koneksi.run("DELETE FROM wl_dompet WHERE dompetid = :id", {
                ':id': id
            });
            if(result.changes != 1){
                res.number = 102;
                res.message = 'Gagal hapus dompet';
                return res;
            }

            res.message = 'Dompet berhasil dihapus';
            return res;
        }catch(e){
            res.number = 500;
            res.message = e.message;
            return res;
        }finally{
            await koneksi.close();
        }
    }
}

export default DompetListService;