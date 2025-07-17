import Koneksi from "../../lib/koneksi.js";
import ReturnModel from "../../models/return_model.js";
import { DompetModel } from "../../models/dompet/dompet_model.js";
import FormatData from "../../utils/formatdata.js";

class DompetAEService{
    dompetData = new DompetModel();

    async readData(id){
        let res = new ReturnModel();
        let koneksi = await Koneksi.openDB();
        try{
            let result = await koneksi.get('SELECT * FROM wl_dompet WHERE dompetid = :id',{
                ':id': id
            });
            if(!result){
                res.number = 404;
                res.message = 'Data tidak ditemukan';
                return res;
            }

            this.dompetData.fromJson(result);
            res.message = 'Data ditemukan';
            return res;
        }catch(e){
            res.number = 500;
            res.message = e.message;
            return res;
        }finally{
            await koneksi.close();
        }
    }

    async saveData(){
        const {v4: uuidv4} = require('uuid');
        let res = new ReturnModel();
        let koneksi = await Koneksi.openDB();
        try{
            let result = await koneksi.run("INSERT INTO wl_dompet (dompetid, namadompet, nominal) VALUES (:id, :dompet, :nominal)", {
                ':id': uuidv4(),
                ':dompet': this.dompetData.dompet,
                ':nominal': this.dompetData.nominal
            });
            if(FormatData.isNullorEmpty(result.lastID)){
                res.number = 105;
                res.message = 'gagal simpan, silahkan ulangi kembali';
                return res;
            }

            res.message = 'Dompet berhasil dibuat';
            return res;
        }catch(e){
            res.number = 500;
            res.message = e.message;
            return res;
        }finally{
            await koneksi.close();
        }
    }

    async updateData(id){
        let res = new ReturnModel();
        let koneksi = await Koneksi.openDB();
        try{
            let result = await koneksi.run("UPDATE wl_dompet SET namadompet = :dompet, nominal = :nominal WHERE dompetid = :id", {
                ':dompet': this.dompetData.dompet,
                ':nominal': this.dompetData.nominal,
                ':id': id
            });
            if(result.changes != 1){
                res.number = 105;
                res.message = "Gagal update dompte";
                return res;
            }

            res.message = 'Dompet berhasil diperbarui';
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

export default DompetAEService;