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
        this.product = product;
        this.color = color;
        this.quantity = quantity;
    }

    generateId() {
        const id =
            Math.random().toString(36).substring(2) +
            new Date().getTime().toString(36);
        return id;
    }

    validateItem({ firstName, lastName, address, city, email }) {
        //Verify names
        //Verify city
        //Verify email
        if (
            !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                email
            )
        ) {
            throw new Error("The email entered is not valid.");
        }
    }
}
