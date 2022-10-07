const itemsArray = [
    {
        id: "48j9rftr9",
        colors: ["Blue", "Offwhite", "Grey"],
        name: "Canapé d'angle",
        price: 2990,
        image: {
            src: "https://robohash.org/canapedangle",
            alt: "Photo d'un canapé d'angle",
        },
        description:
            "Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto",
    },
    {
        id: "450tsdksh9pk1v",
        colors: ["Red", "Green", "Black", "Grey"],
        name: "Lampe ronde",
        price: 75,
        image: {
            src: "https://robohash.org/lamperonde",
            alt: "Photo d'une lampe ronde",
        },
        description:
            "Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid.",
    },
];

async function normalizeItemsArray(array) {
    console.log(array);
    const newArray = array.map((item) => {
        const newItem = {
            id: item.id,
            colors: item.colors,
            name: item.name,
            price: item.price,
            img: { src: item.image.src, alt: item.image.alt },
            desc: item.description,
        };
        return newItem;
    });

    return newArray;
}

export async function getItems() {
    return normalizeItemsArray(itemsArray);
}

export async function getItem(id) {
    const wantedItem = normalizeItemsArray(itemsArray).map((item) => {
        if (item.id === id) {
            return item;
        }
        return null;
    });
    return wantedItem;
}
