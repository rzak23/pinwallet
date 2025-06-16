import FormatData from "../../utils/formatdata.js";

class DompetModel{
    id = '';
    dompet = '';
    nominal = 0;

    toJson(){
        return {
            "dompetid": this.id,
            "namadompet": this.dompet,
            "nominal": this.nominal
        }
    }

    fromJson(data){
        if(Array.isArray(data)){
            const newArray = [];
            data.forEach(dompet => {
                const dompetData = new DompetListModel();
                dompetData.id = FormatData.readString(dompet['dompetid']);
                dompetData.dompet = FormatData.readString(dompet['namadompet']);
                dompetData.nominal = FormatData.readDouble(dompet['nominal']);
                newArray.push(dompetData);
            });

            return newArray;
        }else{
            this.id = FormatData.readString(data['dompetid']);
            this.dompet = FormatData.readString(data['namadompet']);
            this.nominal = FormatData.readDouble(data['nominal']);
        }
    }
}

export {DompetModel}