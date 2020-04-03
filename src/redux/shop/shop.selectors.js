import { createSelector } from "reselect";

/* We're using this object bcoz our URL parameter is a string
 whereas the id we want to match is a number. So we write a 
 map, which is just an object where the string values goes to
 the ID
const COLLECTION_ID_MAP = {
    hats: 1,
    sneakers: 2,
    jackets: 3,
    women: 4,
    mens: 5
} 
IN THIS CASE WE'RE ASSUMING THAT OUR SHOP.MAP FILE IS AN ARRAY*/

const selectShop = state => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
);

export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    //Object.keys() transform our object to an array
    collections => collections ?  Object.keys(collections).map(key =>
        collections[key]
    ) : []
);

/* We match over the collections by selecting it and passing 
into our new selectCollection selector the Url parameter string
and we return createSelector, which is curried function, which
is just a function that returns another function.
find collection.id match the url param of collection id map
*/
// DATA NORMALIZATION is storing of elements as object instead arrays
export const selectCollection = collectionUrlParam =>
createSelector(
    [selectCollections],
    collections => (collections ? collections[collectionUrlParam] : null)
    /* the .find way, assuming our shop.data file is an array not an object, as in this case
    collections => collections.find(
     collection => collection.id === COLLECTION_ID_MAP[collectionUrlParam])*/
);

export const selectIsCollectionFetching = createSelector(
    [selectShop],
    shop => shop.isFetching
);

export const selectIsCollectionsLoaded = createSelector(
    [selectShop],
    // !! transform a value in a boolean
    shop => !!shop.collections
)
