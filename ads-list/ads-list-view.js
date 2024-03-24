export function buildAd(ad) {
  const typeOfOffer = ad.sale ? "On sale" : "On search";
  const cutInfo = ad.description.length > 50 ? ad.description.slice(0, 50) + '... [Read more]' : ad.description;
  return `
  <a class="ad" href="ad-detail.html?adId=${ad.id}">
  <div class="ad-container">  
  <ul>
    <li><h3>${ad.title}</h3></li>
    <li>Price: ${ad.price} €</li>
    <li>Type of Offer: ${typeOfOffer}</li>
    <li>Info: ${cutInfo}</li>
    </ul>
    <img src="${ad.image}">
    </div>
  </a>
  `
}

export function buildEmptyAdsList() {
  return `<div class="dark-background-text"><h3>Ups, no ads available so far...</h3>
  <p>Be the first and create yours!</p>
  </div>
  `;
}