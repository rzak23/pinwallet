class AppConfig{
    static modeDevelopment = 1;
    static tglRilis = '13-06-2025';

    static tipeIn = 1;
    static tipeOut = 2;

    static getPathDatabase(){
        if(this.modeDevelopment == 1){
            return './database';
        }else{
            const os = require('os');
            const path = require('path');

            const appDataDir = path.join(os.homedir(), 'AppData', 'Local', 'PinWallet', 'database');
            return appDataDir;
        }
    }
}

export default AppConfig;