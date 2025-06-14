class UserModelList{}

class UserModelAe{
    id = '';
    nama = '';
    email = '';
    username = '';
    password = '';

    toJson(){
        return {
            "userid": this.id,
            "nama": this.nama,
            "email": this.email,
            "username": this.username,
            "password": this.password
        };
    }

    fromJson(data){
        this.id = data['userid'];
        this.nama = data['nama'];
        this.email = data['email'];
        this.username = data['username'];
        this.password = data['password'];
    }
}

export {UserModelList, UserModelAe}