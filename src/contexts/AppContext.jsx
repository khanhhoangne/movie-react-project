import { createContext, useContext, useState, useEffect } from "react";
import { getLocalStorageWithExpiration } from "~/utils/localStorageUtils";

// Create the context
const AppContext = createContext();

// Provider component
const AppProvider = ({ children }) => {

    const [movies, setMovies] = useState(() => {
        const storedMovies = getLocalStorageWithExpiration('movies_favorite');
        return storedMovies;
    });

  

    const value = {
        setMovies,
        movies
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useAppContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider, useAppContext };
