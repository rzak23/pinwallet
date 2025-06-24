import Koneksi from "../../lib/koneksi.js";
import { KategoriModel } from "../../models/kategori/kategori_model.js";
import ReturnModel from "../../models/return_model.js";
import FormatData from "../../utils/formatdata.js";

class KategoriAEService{
    constructor(){
        this.kategoriData = new KategoriModel();
    }

    async readData(id){
        let res = new ReturnModel();
        let koneksi = await Koneksi.openDB();

        try{
            let result = await koneksi.get("SELECT * FROM wl_kategori WHERE kategoriid = :id", {
                ':id': id
            });
            if(!result){
                res.number = 404;
                res.message = 'Data tidak ditemukan';
                return res;
            }

            this.kategoriData.fromJson(result);
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

    async updateData(id){
        let res = new ReturnModel();
        let koneksi = await Koneksi.openDB();

        try{
            let result = await koneksi.run("UPDATE wl_kategori SET namakategori = :kategori, tipeid = :tipe WHERE kategoriid = :id", {
                ':tipe': this.kategoriData.tipe,
                ':kategori': this.kategoriData.kategori,
                ':id': id
            });
            if(result.changes != 1){
                res.number = 105;
                res.message = 'Update gagal, data tidak dikenali';
                return res;
            }

            res.message = 'Kategori berhasil diperbarui';
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

export default KategoriAEService;