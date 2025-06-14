import AppConfig from '../apps/config/config.js';
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
        let res = new ReturnModel();

        try{
            await koneksi.exec("CREATE TABLE wl_infodb (dbversion integer)");
            await koneksi.exec("CREATE TABLE wl_user (userid text PRIMARY KEY, nama text NOT NULL, email text, username text NOT NULL, password text NOT NULL)");
            await koneksi.exec("CREATE TABLE wl_dompet (dompetid text PRIMARY KEY, namadompet text NOT NULL, nominal real NOT NULL DEFAULT 0)");
            await koneksi.exec("CREATE TABLE wl_kategori (kategoriid integer PRIMARY KEY, tipeid integer NOT NULL, namakategori text NOT NULL)");
            await koneksi.exec("CREATE TABLE wl_dompet_arus (arus_id text PRIMARY_KEY, dompetid text NOT NULL, kategoriid integer NOT NULL, nominal real DEFAULT 0, tgl_arus text NOT NULL, keterangan text, CONSTRAINT fk_dompet FOREIGN KEY (dompetid) REFERENCES wl_dompet(dompetid) ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT fk_kategori FOREIGN KEY (kategoriid) REFERENCES wl_kategori(kategoriid) ON DELETE CASCADE ON UPDATE NO ACTION)");
            await this.#insertInfodb(koneksi);

            res.message = 'Created DB';
            return res;
        }catch(e){
            res.number = 15;
            res.message = e.message;
            return res;
        }finally{
            koneksi.close();
        }
    }

    async runSeeder(db){
        await this.#insertKategori(db);
    }

    async #insertInfodb(db){
        await db.run("INSERT INTO wl_infodb (dbversion) VALUES (0)");
    }

    async #insertKategori(db){
        await db.run("INSERT INTO wl_kategori (tipeid, namakategori) VALUES (1, 'Gaji')");
        await db.run("INSERT INTO wl_kategori (tipeid, namakategori) VALUES (2, 'Belanja')");
        await db.run("INSERT INTO wl_kategori (tipeid, namakategori) VALUES (2, 'Internet')");
    }
}

export default InstallDB;