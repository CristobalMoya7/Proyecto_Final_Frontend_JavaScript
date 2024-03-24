export function buildAdDetail(ad) {
    const typeOfOffer = ad.sale ? "On sale" : "On search";
    const adTags = ad.tag.length > 0
        ? `<p> Category: ${ad.tag.join(', ')} </p>`
        : '';

    return `
    <div>
    <img src="${ad.image}" />
    <div class="ad-detail-container">
    <p><h3>${ad.title}</h3></p>
    <p> Type of Offer: ${typeOfOffer}</p>
    <p>Price: ${ad.price} €</p>
    <p>Description from the owner:<p>
    <p><i>"${ad.description}"</i></p>
    ${adTags}
    </div>
    `
};