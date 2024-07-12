import { createContext, useContext } from "react";


const AppContext = createContext();


const AppProvider = ({ children })  => {
    const theme = "light";
    const value = {
        theme
    }

    return (
        <AppContext.Provider value={value}>
            { children }
        </AppContext.Provider>
    ) 
}

export { AppContext, AppProvider }