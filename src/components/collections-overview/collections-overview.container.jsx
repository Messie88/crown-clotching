import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { selectIsCollectionFetching } from "../../redux/shop/shop.selectors";

import WithSpinner from "../with-spinner/with-spinner";
import CollectionsOverview from "./collections-overview";

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionFetching
});

/* 
  compose reads from right to left meanning, it reads:
  1st collectionsOverview
  2nd WithSpinner
  3rd connect(mapStateToProps)
*/
const CollectionsOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionsOverview);

/* 
The compose() is equivalent to:
 connect(mapStateToProps)(WithSpinner(collectionsOverview)) 
*/

export default CollectionsOverviewContainer; 