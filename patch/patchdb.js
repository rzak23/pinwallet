import Koneksi from "../apps/lib/koneksi.js";
import FormatData from "../apps/utils/formatdata.js";
import InstallDB from "../setup/installdb.js";

class PatchDB{
    static async runPatch(){
        let db = await Koneksi.openDB();
        let lastPatchNumber = 1;

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
}

export default PatchDB;