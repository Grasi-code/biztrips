import React, { useState } from "react";
import { testTrips } from "./api"; // Hier ist die Quelle deiner Testdaten

function TripList({ addToWishlist }) {
    const [month, setMonth] = useState("");
    const trips = testTrips;
    const months = ["Idle", "Jan", "Feb", "March", "April", "Mai", "June"];

    const tripsMapped = trips.map((trip) => (
        <Trip addToWishlist={addToWishlist} trip={trip} key={trip.id} />
    ));

    const empty = (
        <section>
            <p className="alert alert-info">Productlist is empty</p>
        </section>
    );

    // Filter trips based on month selected
    const filteredTrips = month
        ? trips.filter((t) => t.startTrip[1] === parseInt(month))
        : tripsMapped;

    return (
        <div className="container">
            <section>
                <h2 className="h4">Triplist-Catalog</h2>
                <section id="filters">
                    <label htmlFor="month">Filter by Month:</label>
                    <select
                        id="month"
                        value={month} // controlled component
                        onChange={(e) => setMonth(e.target.value)}
                    >
                        <option value="">All Months</option>
                        <option value="1">January</option>
                        <option value="2">February</option>
                        <option value="3">March</option>
                        <option value="4">April</option>
                        <option value="5">Mai</option>
                        <option value="6">June</option>
                    </select>
                    {month && (
                        <h2>
                            Found {filteredTrips.length} {filteredTrips.length >= 1 ? "trips" : "trip"} for the month of {months[month]}
                        </h2>
                    )}
                </section>
                <div className="row">
                    {filteredTrips.length > 0 ? tripsMapped : empty}
                </div>
            </section>
        </div>
    );
}

function Trip({ addToWishlist, ...props }) {
    const { trip } = props;
    const { id, title, description, startTrip, endTrip } = trip;

    return (
        <div className="col-sm-6 col-md-4 col-lg-3">
            <figure className="card card-product">
                <div className="img-wrap">
                    <img src={"images/items/" + trip.id + ".jpg"} alt="name " />
                </div>
                <figcaption className="info-wrap">
                    <h6 className="title">
                        {id} {title} {startTrip} {endTrip}
                    </h6>
                    <p className="card-text">{description}</p>
                    <div className="info-wrap row">
                        <button
                            type="button"
                            className="btn btn-link btn-outline"
                            onClick={() => addToWishlist(trip)}
                        >
                            <i className="fa fa-shopping-cart" /> Add to Wishlist
                        </button>
                    </div>
                </figcaption>
            </figure>
        </div>
    );
}

export default TripList;
