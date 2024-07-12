const setLocalStorageWithExpiration = (key, value, expirationMinutes) => {
    const now = new Date();
    const item = {
        value: value,
        expiration: now.getTime() + expirationMinutes * 60 * 1000
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
        return null;
    }
};

export {
    setLocalStorageWithExpiration,
    getLocalStorageWithExpiration
}