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

    static readString(value){
        let sRes = null;
        if(value != '' || value != null){
            sRes = value;
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
}

export default FormatData;