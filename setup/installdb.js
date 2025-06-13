import AppConfig from '../apps/config/config';
import Koneksi from '../apps/lib/koneksi.js';
import ReturnModel from '../apps/models/return_model.js';

class InstallDB{
    async createDB(){
        const fs = require('fs');

        let res = new ReturnModel();
        let databaseDir = AppConfig.getPathDatabase();
        let databasePath = `${databaseDir}/mywallet.db`;
        if(fs.existsSync(databasePath)){
            res.message = 'Database sudah dibuat';
            return res;
        }

        if(!fs.existsSync(databaseDir)){
            fs.mkdirSync(databaseDir, {recursive: true});
        }

        try{
            res = await this.#createTable();
            if(res.number != 0){
                return res;
            }

            res.message = 'Database berhasil dibuat';
            return res;
        }catch(e){
            res.number = 105;
            res.message = e.message;
            return res;
        }
    }

    async #createTable(){
        let koneksi = await Koneksi.openDB();

        try{
            await koneksi.exec("CREATE TABLE wl_infodb (dbversion integer)");
            await koneksi.exec("CREATE TABLE wl_user (userid text PRIMARY KEY, nama text NOT NULL, email text, username text NOT NULL, password text NOT NULL)");
            await koneksi.exec("CREATE TABLE wl_dompet (dompetid text PRIMARY KEY, namadompet text NOT NULL, nominal real NOT NULL DEFAULT 0)");
            await koneksi.exec("CREATE TABLE wl_kategori (kategoriid integer PRIMARY KEY, namakategori text NOT NULL)");
            await koneksi.exec("");
        }catch(e){
            res.number = 15;
            res.message = e.message;
            return res;
        }finally{
            koneksi.close();
        }
    }
}

export default InstallDB;