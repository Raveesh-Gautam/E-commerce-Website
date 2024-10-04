import React, { createContext, useEffect, useState } from 'react';

export const ShopContext = createContext(null);

// Initialize cart based on product IDs from all_product
const getDefaultCart = (all_product) => {
    let cart = {};
    all_product.forEach((product) => {
        cart[product.id] = 0;
    });
    return cart;
};

const ShopContextProvider = (props) => {
    const [all_product, setAll_product] = useState([]); // Stores all products
    const [cartItems, setCartItems] = useState({});     // Stores cart items

    // Fetch all products when the component mounts
    useEffect(() => {
        fetch('http://localhost:4000/allproducts')
            .then((resp) => resp.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setAll_product(data);
                    setCartItems(getDefaultCart(data)); // Initialize cart based on product IDs
                } else {
                    console.error('Fetched data is not an array:', data);
                }
            })
            .catch((error) => console.error('Error fetching products:', error));
    }, []);

    // Add item to cart
    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/addtocart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "itemId": itemId }),
            })
                .then((resp) => resp.json())
                .then((data) => console.log(data))
                .catch((error) => console.error('Error adding to cart:', error));
        }
    };

    // Remove item from cart
    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/removefromcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "itemId": itemId }),
            })
                .then((resp) => resp.json())
                .then((data) => console.log(data))
                .catch((error) => console.error('Error removing from cart:', error));
        }
    };

    // Calculate total cart amount
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (parseInt(item) > 0 && cartItems[item] > 0) { // Ensure cartItems[item] > 0
                let itemInfo = all_product.find((product) => product.id === parseInt(item));
                if (itemInfo && itemInfo.new_price) { // Check if itemInfo exists and has new_price
                    totalAmount += itemInfo.new_price * cartItems[item];
                } else {
                    console.error(`Product with id ${item} not found in all_product`);
                }
            }
        }
        return totalAmount;
    };

    // Calculate total cart items
    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    };

    // Context value to be passed to consumers
    const contextValue = {
        getTotalCartItems,
        getTotalCartAmount,
        all_product,
        cartItems,
        addToCart,
        removeFromCart,
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
