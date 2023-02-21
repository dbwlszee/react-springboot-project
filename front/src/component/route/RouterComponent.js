import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import UserListComponent from '../user/UserListComponent';
import AddUserComponent from "../user/AddUserComponent";
import EditUserComponent from "../user/EditUserComponent";

const AppRouter = () => {
    return(
        <>
            <BrowserRouter>
            <div style={style}>
                <Routes>
                    <Route exact path="/" element={<UserListComponent/>}/>
                    <Route path="/users" element={<UserListComponent/>}/>
                    <Route path="/add-users" element={<AddUserComponent/>}/>
                    <Route path="/edit-users" element={<EditUserComponent/>}/>
                </Routes>
            </div>
            </BrowserRouter>
        </>
    );
}

const style = {
    color: 'red',
    margin: '10px',
}

export default AppRouter;