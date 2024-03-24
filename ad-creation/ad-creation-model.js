export const insertAd = async (insertAd) => {
    const url = "http://localhost:8000/api/ads";
    const token = localStorage.getItem('token');

    const dummyData = {
        image: 'https://res.cloudinary.com/douaatasp/image/upload/v1711022809/Articles/Interrogaci%C3%B3n_ibz69o.jpg',
        tags: 'Not defined by the owner of the ad, sorry.'
    };

    const body = {
        name: insertAd.name,
        sale: insertAd.sale,
        price: insertAd.price,
        description: insertAd.description,
        image: insertAd.image ? insertAd.image : dummyData.image,
        tags: insertAd.category ? insertAd.category : dummyData.tags,
    };

    let response;

    try {
        response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const data = await response.json()
            throw new Error(data.message);
        }

    } catch (error) {
        if (error.message) {
            throw error.message;
        } else {
            throw error;
        };
    };

};