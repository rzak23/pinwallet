import Koneksi from "../lib/koneksi.js";
import ReturnModel from "../models/return_model.js";
import FormatData from "../utils/formatdata.js";
import { UserModelAe } from "../models/user_model.js";

class AuthService{
    constructor(){
        this.userData = new UserModelAe();
    }

    async cekUser(){
        let koneksi = await Koneksi.openDB();
        let res = new ReturnModel();
        try{
            let result = await koneksi.get("SELECT COUNT(userid) AS total FROM wl_user");
            let total = FormatData.readInt(result.total);
            
            res.totalData = total;
            return res;
        }catch(e){
            res.number = 500;
            res.message = e.message;
            return res;
        }finally{
            await koneksi.close();
        }
    }

    async createAkun(){
        const {v4: uuidv4} = require('uuid');

        let koneksi = await Koneksi.openDB();
        let res = new ReturnModel();
        try{
            let result = await koneksi.run("INSERT INTO wl_user (userid, nama, username, password) VALUES (:id, :nama, :uname, :pass)",{
                ':id': uuidv4,
                ':nama': this.userData.nama,
                ':uname': this.userData.username,
                ':pass': await this.#passHash(this.userData.password)
            });

            if(result.lastID == '' || result.lastID == null){
                res.number = 105;
                res.message = 'Terjadi kesalahan saat menyimpan data';
                return res;
            }

            res.message = 'Akun berhasil dibuat';
            return res;
        }catch(e){
            res.number = 500;
            res.message = e.message;
            return res;
        }
    }

    async #passHash(password){
        const bcrypt = require('bcryptjs');

        let salt = await bcrypt.genSalt(15);
        let hash = await bcrypt.hash(password, salt);
        return hash;
    }
}

export default AuthService;