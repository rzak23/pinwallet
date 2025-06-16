class FormatData{
    static isHtmlInput(htmlElement){
        if(htmlElement instanceof HTMLInputElement){
            return htmlElement;
        }

        return null;
    }

    static readInt(value){
        let sInt = 0;
        if(value != '' || value != null){
            sInt = parseInt(value);
        }

        return sInt;
    }

    static readDouble(value){
        let sDouble = 0;
        if(value != '' || value != null){
            sDouble = parseFloat(value);
        }

        return sDouble;
    }

    static readString(value){
        let sRes = null;
        if(value != '' || value != null){
            sRes = value.toString();
        }

        return sRes;
    }

    static isNullorEmpty(value){
        let sBool = false;
        if(value == '' || value == null){
            sBool = true;
        }

        return sBool;
    }

        static harga(num){
        let harga = new Intl.NumberFormat("id-ID", {style: "currency", "currency": "IDR"}).format(num);
        return harga;
    }
}

export default FormatData;