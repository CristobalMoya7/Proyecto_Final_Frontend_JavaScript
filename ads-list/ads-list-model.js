function parseAds(data) {
    return data.map(data => ({
        owner: data.userId,
        title: data.name,
        description: data.description,
        sale: data.sale,
        price: data.price,
        image: data.image,
        tag: data.tags,
        id: data.id
    }))
};

export async function getAds() {

    const url = 'http://localhost:8000/api/ads';
    let ads = [];

    try {
        const response = await fetch(url);
        const data = await response.json();
        ads = parseAds(data);

    } catch (error) {
        throw new Error('There was an error getting ads')
    }

    return ads;
}