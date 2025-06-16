import Koneksi from "../../lib/koneksi.js";
import ReturnModel from "../../models/return_model.js";
import { DompetModel } from "../../models/dompet/dompet_model.js";
import FormatData from "../../utils/formatdata.js";

class DompetAEService{
    constructor(){
        this.dompetData = new DompetModel();
    }

    async readData(){}

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
}

export default DompetAEService;