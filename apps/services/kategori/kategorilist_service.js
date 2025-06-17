import ReturnModel from '../../models/return_model.js';
import Koneksi from '../../lib/koneksi.js'
import { KategoriModel } from '../../models/kategori/kategori_model.js';

class KategoriListService{
    constructor(){
        this.kategoriData = new KategoriModel();
    }

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
}

export default KategoriListService;