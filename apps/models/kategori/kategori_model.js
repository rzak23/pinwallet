import FormatData from "../../utils/formatdata.js";

class KategoriModel{
    id = '';
    tipe = 1;
    kategori = '';

    toJson(){
        return {
            'kategoriid': this.id,
            'tipeid': this.tipe,
            'namakategori': this.kategori
        }
    }

    fromJson(data){
        if(Array.isArray(data)){
            const newArray = [];
            data.forEach(kategori => {
                const kategoriData = new KategoriModel();
                kategoriData.id = kategori['kategoriid'];
                kategoriData.tipe = kategori['tipeid'];
                kategoriData.kategori = kategori['namakategori'];
                newArray.push(kategoriData);
            });
            return newArray;
        }else{
            this.id = FormatData.readInt(data['kategoriid']);
            this.tipe = FormatData.readInt(data['tipeid']);
            this.kategori = FormatData.readString(data['namakategori']);
        }
    }
}

export {KategoriModel}