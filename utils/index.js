export const isEmpty = (obj) => {
 return Object.keys(obj).length === 0;
}

export const fetcher = (url) => fetch(`/api/getCoffeeStoreById`).then((res) => res.json());
