import FormatData from "../../utils/formatdata";

class TransaksiListModel{
    id = "";
    kategori = "";
    nominal = 0;
    tanggal = "";

    toJson(){
        return {
            'id': this.id,
            'kategori': this.kategori,
            'nominal': this.nominal,
            'tanggal': this.tanggal
        };
    }

    fromJson(data){
        if(Array.isArray(data)){
            const newArray = [];
            data.forEach(transaksi => {
                const transaksiList = new TransaksiListModel();
                transaksiList.id = FormatData.readString(transaksi['arus_id']);
                transaksiList.kategori = FormatData.readString(transaksi['kategori']);
                transaksiList.nominal = FormatData.readDouble(transaksi['nominal']);
                transaksiList.tanggal = FormatData.readString(transaksi['tanggal']);
                newArray.push(transaksiList);
            });
            return newArray;
        }else{
            this.id = FormatData.readInt(data['kategoriid']);
            this.tipe = FormatData.readInt(data['tipeid']);
            this.kategori = FormatData.readString(data['namakategori']);
        }
    }
}

class TransaksiAEModel{}

export default {TransaksiListModel, TransaksiAEModel};