function parseAd(ad) {

    return {
        owner: ad.userId,
        title: ad.name,
        description: ad.description,
        image: ad.image,
        id: ad.id,
        tag: [ad.tags],
        price: ad.price,
        sale: ad.sale
    };
};

function parseUser(user) {
    return {
        id: user.id
    }
};

export async function getAdDetail(adId) {

    const url = `http://localhost:8000/api/ads/${adId}`;
    let ad = {};
    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log('Esto es data después de response.json: ', data)

        ad = parseAd(data);

        console.log('Esto es ad después de parsear: ', ad)

    } catch (error) {
        throw new Error(`There was an error getting ad with id: ${adId}`)
    }

    return ad;
};

export async function getUserData(token) {
    const url = 'http://localhost:8000/auth/me';

    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        return parseUser(data);

    } catch (error) {
        throw new Error(`There was an error getting user's ID`);
    };
};

export async function deleteAd(adId, token) {
    const url = `http://localhost:8000/api/ads/${adId}`;

    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message);
        };
    } catch (error) {
        throw new Error('Error deleting ad');
    };
};