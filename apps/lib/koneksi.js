import AppConfig from '../config/config.js';

class Koneksi{
    static async openDB(){
        const { open } = require('sqlite');
        const sqlite = require('sqlite3');

        let dbDir = AppConfig.getPathDatabase();
        let database = await open({
            filename: `${dbDir}/mywallet.db`,
            driver: sqlite.Database
        });

        await database.exec("PRAGMA foreign_keys = ON");
        return database;
    }
}

export default Koneksi;