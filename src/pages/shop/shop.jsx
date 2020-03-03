import React from 'react';
import { Route } from "react-router-dom";

import CollectionPage from "../collection/collection";
import CollectionsOverview from "../../components/collections-overview/collections-overview";

/* We have here access to the match prop, bcoz in our app.js
file shopPage is nested in a Route, which gives us access to
the match, location and history props */
const ShopPage = ({match}) => ( 
    <div className='shop-page'>
            <Route exact path={`${match.path}`} component={CollectionsOverview} />
            <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
        </div>
);


export default ShopPage;
