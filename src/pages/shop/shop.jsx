import React from 'react';
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import CollectionPage from "../collection/collection";

import { updateCollections } from "../../redux/shop/shop.actions";

import WithSpinner from "../../components/with-spinner/with-spinner";

import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utilities";
import collectionsOverview from '../../components/collections-overview/collections-overview';


const CollectionsOverviewWithSpinner = WithSpinner(collectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

/* We have here access to the match prop, bcoz in our app.js
file shopPage is nested in a Route, which gives us access to
the match, location and history props */
class ShopPage extends React.Component {
  state = {
      loading: true
  };

  unsubscribeFromSnapshot = null;

  componentDidMount() {
      const { updateCollections } = this.props;
      const collectionRef = firestore.collection('collection');

      /* get() make a API call to fetch back the data associated 
      to this collectionRef; which will be the exact same as the 
      snapshot object that we're getting back from our backend. 
      The only difference is that instead now we call .then()(
        because it's a promise) and we pass our snapshot */
      collectionRef.get().then( snapshot => {
        const collectionsMap =  convertCollectionsSnapshotToMap(snapshot)
        updateCollections(collectionsMap);
        this.setState({ loading: false });
      });
  }
  render(){
      const { match } = this.props;
      const { loading } = this.state;
      return (
        <div className='shop-page'>
           <Route exact path={`${match.path}`} render={(props) =>
               <CollectionsOverviewWithSpinner isLoading={loading} {...props} />} />
           <Route path={`${match.path}/:collectionId`} render={(props) =>
               <CollectionPageWithSpinner isLoading={loading} {...props} /> } />
        </div>
      )
  }
} 

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap =>
      dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);
