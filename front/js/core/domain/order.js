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
        this.validateOrder({ firstName, lastName, address, city, email });
        // Les informations client sont formatés
        this.id = id;
        this.firstName = firstName.trim().toUpperCase();
        this.lastName = lastName.trim().toUpperCase();
        this.address = address.trim().toUpperCase();
        this.city = city.trim().toUpperCase();
        this.email = email.trim();
        this.items = items;
    }

    // Génère un identifiant unique
    generateId() {
        const id =
            Math.random().toString(36).substring(2) +
            new Date().getTime().toString(36);
        return id;
    }

    // Valide la commande: le contenu des informations clients
    // doit être cohérent sinon une erreur est renvoyé
    validateOrder({ firstName, lastName, address, city, email }) {
        let errorMsg = "";

        if (!this.isValidName(firstName.toUpperCase())) {
            errorMsg += "Ce prénom n'est pas valide.";
        }
        if (!this.isValidName(lastName.toUpperCase())) {
            errorMsg += "Ce nom n'est pas valide.";
        }
        if (!this.isValidAddress(address)) {
            errorMsg += "Cette addresse n'est pas valide.";
        }
        if (!this.isValidCity(city.toUpperCase())) {
            errorMsg += "Cette ville n'est pas valide.";
        }
        if (!this.isValidEmail(email.toUpperCase())) {
            errorMsg += "Cet email n'est pas valide.";
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
