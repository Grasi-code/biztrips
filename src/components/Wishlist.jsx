import React from "react";

function Wishlist({ wishlist, removeFromWishlist, clearWishlist }) {
    const itemsMapped = wishlist.map((item) => (
        <WishlistItem
            removeFromWishlist={removeFromWishlist}
            item={item}
            key={item.id}
        />
    ));

    const empty = (
        <tr>
            <td colSpan="4">
                <p className="alert alert-info">Wishlist is empty</p>
            </td>
        </tr>
    );

    return (
        <div className="container">
            <h2 className="h4">Wishlist</h2>
            <div className="row">
                <div className="col-sm-12">
                    <div className="card table-responsive">
                        <table className="table table-hover shopping-cart-wrap">
                            <thead className="text-muted">
                                <tr>
                                    <th scope="col">Trips</th>
                                    <th scope="col" width="120">
                                        Price
                                    </th>
                                    <th scope="col" width="200" className="text-right">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>{itemsMapped.length > 0 ? itemsMapped : empty}</tbody>
                            <tfoot>
                                <tr>
                                    <th scope="col">
                                        <dl className="dlist-align">
                                            <dt>Total</dt>
                                        </dl>
                                    </th>
                                    <th scope="col" />
                                    <th scope="col">
                                        <button
                                            className="btn btn-outline-danger"
                                            onClick={clearWishlist}
                                            disabled={itemsMapped.length === 0}
                                        >
                                            empty wishlist
                                        </button>
                                    </th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

function WishlistItem({ removeFromWishlist, item }) {
    const { id, title, description, startTrip, endTrip } = item;

    return (
        <tr key={id}>
            <td>
                <figure className="media">
                    <div className="img-wrap">
                        <img
                            className="img-thumbnail img-xs"
                            src={"/images/items/" + id + ".jpg"}
                            alt="img"
                            onError={(e) => (e.target.src = "/images/fallback.jpg")}
                        />
                    </div>
                    <figcaption className="media-body">
                        <h6 className="h6">{title}</h6>
                        <dl className="dlist-inline small">
                            <dt>{title}</dt>
                            <dd>{description}</dd>
                        </dl>
                        <dl className="dlist-inline small">
                            <dt>{startTrip.toLocaleString()}</dt>
                            <dd>{endTrip.toLocaleString()}</dd>
                        </dl>
                    </figcaption>
                </figure>
            </td>
            <td className="price-wrap price"></td>
            <td className="text-right">
                <button
                    className="btn btn-outline-danger"
                    onClick={() => removeFromWishlist(item)}
                >
                    delete Item
                </button>
            </td>
        </tr>
    );
}

export default Wishlist;
