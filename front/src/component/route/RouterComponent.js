import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import UserListComponent from '../user/UserListComponent';
import AddUserComponent from "../user/AddUserComponent";
import EditUserComponent from "../user/EditUserComponent";

const AppRouter = () => {
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<UserListComponent/>}/>
                    <Route path="/users" element={<UserListComponent/>}/>
                    <Route path="/add-users" element={<AddUserComponent/>}/>
                    <Route path="/edit-users" element={<EditUserComponent/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default AppRouter;