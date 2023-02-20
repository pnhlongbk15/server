const User = function (user) {
        this.userId = user.userId;
        this.username = user.username;
        this.sex = user.sex;
        this.birth = user.birth;
        this.phone = user.phone;
        this.email = user.email;
        this.password = user.password;
        this.image = user.image;
}

const Address = function (address) {
        this.addressId = address.addressId;
        this.fullName = address.fullName;
        this.phone = address.phone;
        this.address = address.address;
        this.userId = address.userId;
}

module.exports = { User, Address };