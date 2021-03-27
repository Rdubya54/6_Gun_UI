import React, { createContext, useState, useContext } from "react";

const DisplayContext = createContext();
export const GetUserData = () => useContext(DisplayContext);

export default function DisplayProvider({ children }) {

    const [userdata, setUserData] = useState({ username: "", display: "#000000" });

    return (
        <DisplayContext.Provider value={{ userdata, setUserData }}>
            {children}
        </DisplayContext.Provider>
    );
}