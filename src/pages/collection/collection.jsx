import React from "react";
import { connect } from "react-redux";
import CollectionItem from "../../components/collection-item/collection-item";
import { selectCollection } from "../../redux/shop/shop.selectors";

import "./collection.scss";


const CollectionPage = ({collection}) => {
    const {title, items} = collection;
    return (
      <div className="collection-page">
          <h2 className="title">{title}</h2>
          <div className="items">
              {
                  items.map(item => (
                      <CollectionItem key={item.id} item={item} />
                   ))
              }
          </div>
      </div>)
};

/* ownProps is the second optional param of mapStateToProps.
It's the props of the component that we're wrapping in our 
connect().
selectCollection(...) returns a createSelector call that takes
a state and runs it through the selector flow that we've gotten
used to write in shop.selectors file. that why we add the 
(state) after we invoked our selectCollection. 

This is necessary because unlile other selectors, this selector
needsa par of the state depending on the Url parameter*/
const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionId)(state)
})

export default connect(mapStateToProps)(CollectionPage);