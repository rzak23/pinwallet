class ReturnModel {
    constructor() {
      this.number = 0;
      this.total = 0;
      this.totalUpload = 0;
      this.totalDownload = 0;
      this.totalData = 0;
      this.totalError = 0;
      this.message = "";
      this.data = null;
      this.tag = "";
      this.objectData = [];
      this.boolData = false;
      this.boolSync = false;
      this.success = false;
      this.rerturnIDSave = "";
    }
  
    // Setter untuk properti message
    set message(value) {
      if (typeof value === 'string' /*|| typeof value === 'object' || Array.isArray(value)*/) {
        this._message = value;
      }else{
        this._message = value;
      }
  
      if(typeof value === 'object'){
        this._message = Object.values(value).join(", ");
      }
    }
  
    // Getter untuk properti message
    get message() {
      return this._message;
    }
  
    // Metode setter untuk properti dinamis
    setDynamicProperty(propertyName, value) {
      this[propertyName] = value;
    }
  
    // Metode getter untuk properti dinamis
    getDynamicProperty(propertyName) {
      return this[propertyName];
    }
}
  
// Export class ReturnModel agar dapat diimpor di file lain
export default ReturnModel;