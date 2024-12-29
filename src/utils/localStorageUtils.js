const setLocalStorageWithExpiration = (key, newValue, expirationMinutes = 60) => {
    const now = new Date();
    const existingItemStr = localStorage.getItem(key);

    let existingValue = [];
    if (existingItemStr) {
        try {
            const existingItem = JSON.parse(existingItemStr);
            // Ensure the existing value is still valid and within its expiration
            if (now.getTime() <= existingItem.expiration) {
                existingValue = Array.isArray(existingItem.value) ? existingItem.value : [existingItem.value];
            }
        } catch (error) {
            console.error("Failed to parse existing localStorage item:", error);
        }
    }

    // Remove duplicate entry if it exists
    const updatedValue = existingValue.filter(item => item._id !== newValue._id);

    const isExisting = existingValue.some(item => item._id === newValue._id);

    

    // Add the new value to the array

    if(!isExisting) {
        updatedValue.push(newValue);
    }

    const item = {
        value: updatedValue,
        expiration: now.getTime() + expirationMinutes * 60 * 1000,
    };

    localStorage.setItem(key, JSON.stringify(item));
};



const getLocalStorageWithExpiration = (key) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
        return null;
    }
    try {
        const item = JSON.parse(itemStr);
        const now = new Date();
        if (now.getTime() > item.expiration) {
            localStorage.removeItem(key);
            return null;
        }
        return item.value;
    } catch (error) {
        console.error("Failed to parse localStorage item:", error);
        return null;
    }
};

export {
    setLocalStorageWithExpiration,
    getLocalStorageWithExpiration
};
