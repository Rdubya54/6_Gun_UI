import React, { useState } from 'react';
import { useInput } from "../hooks";
import { GetUserData } from '../Providers/DisplayProvider';

const SpecialPage = () => {

    const [colorProps] = useInput("#000000");
    //const [usernameProps] = useInput("");
    const { setUserData } = GetUserData();

    const submit = e => {
        e.preventDefault();
        setUserData({ display: colorProps.value });
    };

    return (
        <div>
            <h1>Special Page!</h1>
            <p> This one does dumb shit for the purpose of fucking around with react and getting in some pracy.</p>
            <form onSubmit={submit}>
                {/* <input {...usernameProps} type="text" placeholder="User" /> */}
                <input {...colorProps} type="color" required />
                <button>ADD</button>
            </form>
        </div>

    )

}

export default SpecialPage;