import React, { useState } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import TripList from "./components/TripList";
import Wishlist from "./components/Wishlist";

export default function App() {
    const [wishlist, setWishlist] = useState([]);

    // wishlist functions
    function addToWishlist(trip) {
        try {
            const { id, title, description, startTrip, endTrip } = trip;
            setWishlist((prevWishlist) => {
                const tripInWishlist = prevWishlist.find((t) => t.id === id);
                if (tripInWishlist) {
                    return prevWishlist;
                }
                return [...prevWishlist, { id, title, description, startTrip, endTrip }];
            });
        } catch (error) {
            console.error("Error adding to wishlist", error);
        }
    }

    function removeFromWishlist(item) {
        setWishlist((prevWishlist) => prevWishlist.filter((t) => t.id !== item.id));
    }

    function clearWishlist() {
        setWishlist([]);
    }

    return (
        <>
            <div>
                <Header />
                <main>
                    <h1>Welcome to biztrips Happy New Year - React 2024</h1>
                    <Wishlist
                        wishlist={wishlist}
                        removeFromWishlist={removeFromWishlist}
                        clearWishlist={clearWishlist}
                    />
                    <TripList addToWishlist={addToWishlist} />
                </main>
            </div>
            <Footer />
        </>
    );
}
