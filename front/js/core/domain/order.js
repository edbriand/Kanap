export class Order {
    constructor({
        id = this.generateId(),
        firstName,
        lastName,
        address,
        city,
        email,
        items,
    }) {
        this.validateItem({ firstName, lastName, address, city, email });
        this.id = id;
        this.firstName = firstName.toUpperCase();
        this.lastName = lastName.toUpperCase();
        this.address = address.toUpperCase();
        this.city = city.toUpperCase();
        this.email = email;
        this.items = items;
    }

    generateId() {
        const id =
            Math.random().toString(36).substring(2) +
            new Date().getTime().toString(36);
        return id;
    }

    validateItem({ firstName, lastName, address, city, email }) {
        let errorMsg = "";
        //Verify names
        if (!this.isValidName(firstName.toUpperCase())) {
            errorMsg += "The first name entered is not valid.";
        }
        if (!this.isValidName(lastName.toUpperCase())) {
            errorMsg += "The last name entered is not valid.";
        }
        //Verify address
        if (!this.isValidAddress(address)) {
            errorMsg += "The address entered is not valid.";
        }
        //Verify city
        if (!this.isValidCity(city.toUpperCase())) {
            errorMsg += "The city entered is not valid.";
        }
        //Verify email
        if (!this.isValidEmail(email.toUpperCase())) {
            errorMsg += "The email entered is not valid.";
        }

        if (errorMsg === "") return;

        throw new Error(errorMsg);
    }

    isValidName(name) {
        return /^[a-z ,.'-]+$/i.test(name);
    }

    isValidAddress(address) {
        return address.length != 0;
    }

    isValidCity(city) {
        return /^[a-zA-Z',.\s-]{1,25}$/.test(city);
    }

    isValidEmail(email) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            email
        );
    }
}
