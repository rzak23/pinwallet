import RouteName from "../config/routename.js";
import FormatData from "../utils/formatdata.js";

window.pageLocation = function (menu = null){
    let menuNav = new NavigasiController();

    if(menu === null){
        return;
    }

    menuNav.openPage(menu);
}

class NavigasiController{
    async openPage(menu){
        let path = require('path');
        let swal = require('sweetalert2').default;

        let sPage = "";
        if(menu == 'dashboard'){
            sPage = RouteName.dashboard;
        }else if(menu == 'dompet'){
            sPage = `dompet/${RouteName.dompetlist}`;
        }else if(menu == 'kategori'){
            sPage = `kategori/${RouteName.kategorilist}`;
        }

        if(FormatData.isNullorEmpty(sPage)){
            swal.fire('Error Number : 404', 'Permintaan tidak dikenali', 'error');
            return;
        }

        let basePath = path.dirname(__dirname);
        let baseName = path.basename(basePath);
        if(baseName !== 'pages'){
            sPage = `pages/${sPage}`;
        }

        let targetPath = path.join(basePath, sPage);
        window.location.href = targetPath;
    }
}