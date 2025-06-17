import Koneksi from "../../lib/koneksi.js";
import { KategoriModel } from "../../models/kategori/kategori_model.js";
import ReturnModel from "../../models/return_model.js";
import FormatData from "../../utils/formatdata.js";

class KategoriAEService{
    constructor(){
        this.kategoriData = new KategoriModel();
    }

    async readData(id){}
    
    async saveData(){
        let res = new ReturnModel();
        let koneksi = await Koneksi.openDB();
        try{
            let result = await koneksi.run("INSERT INTO wl_kategori (tipeid, namakategori) VALUES (:tipe, :kategori)", {
                ':tipe': this.kategoriData.tipe,
                ':kategori': this.kategoriData.kategori
            });
            if(FormatData.isNullorEmpty(result.lastID)){
                res.number = 105;
                res.message = 'Gagal simpan kategori';
                return res;
            }

            res.message = 'Kategori berhasil ditambahkan';
            return res;
        }catch(e){
            res.number = 500;
            res.message = e.message;
            return res;
        }finally{
            await koneksi.close();
        }
    }

    async updateData(id){}
}

export default KategoriAEService;