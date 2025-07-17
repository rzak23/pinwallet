import Koneksi from "../apps/lib/koneksi.js";
import FormatData from "../apps/utils/formatdata.js";
import InstallDB from "../setup/installdb.js";

class PatchDB{
    static async runPatch(){
        let db = await Koneksi.openDB();
        let lastPatchNumber = 2;

        // get last infodb
        let result = await db.get("SELECT * FROM wl_infodb");
        let currentPatchNumber = FormatData.readInt(result.dbversion);
        for(let i = currentPatchNumber + 1; i <= lastPatchNumber; i++){
            await this.#executePatch(i);
        }
    }

    static async #executePatch(number){
        if(number == 1){
            await this.#runPatchNumber_1();
        }else if(number == 2){
            await this.#runPatchNumber_2();
        }
    }

    static async #updatePatch(number, koneksi){
        await koneksi.run("UPDATE wl_infodb SET dbversion = :number", {
            ':number': number
        });
    }

    static async #runPatchNumber_1(){
        let db = await Koneksi.openDB();
        let startDB = new InstallDB();
        try{
            await startDB.runSeeder(db);
            await this.#updatePatch(1, db);
        }catch(e){}finally{
            await db.close();
        }
    }

    static async #runPatchNumber_2(){
        let db = await Koneksi.openDB();
        
        try{
            await db.run("ALTER TABLE wl_kategori  ADD showkategori int default 1");
            await db.run("INSERT INTO wl_kategori (tipeid, namakategori, showkategori) VALUES (:tipe, :nama, :show)", {
                ":tipe": 1,
                ":nama": "Saldo Awal",
                ":show": 0
            });

            await this.#updatePatch(2, db);
        }catch(e){}finally{
            await db.close();
        }
    }
}

export default PatchDB;