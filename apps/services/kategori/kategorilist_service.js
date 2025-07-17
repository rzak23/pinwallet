import ReturnModel from '../../models/return_model.js';
import Koneksi from '../../lib/koneksi.js'
import { KategoriModel } from '../../models/kategori/kategori_model.js';

class KategoriListService{
    kategoriData = new KategoriModel();

    async requestData(){
        let res = new ReturnModel();
        let koneksi = await Koneksi.openDB();
        try{
            let result = await koneksi.all("SELECT * FROM wl_kategori");
            let lstData = [];
            result.forEach(row => {
                this.kategoriData.fromJson(row);
                lstData.push(this.kategoriData.toJson());
            });

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
            let result = await koneksi.run("DELETE FROM wl_kategori WHERE kategoriid = :id", {
                ':id': id
            });
            if(result.changes != 1){
                res.number = 102;
                res.message = 'Gagal hapus kategori';
                return res;
            }

            res.message = 'Kategori berhasil dihapus';
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

export default KategoriListService;