import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import UserListComponent from '../user/UserListComponentFunction';
import AddUserComponent from "../user/AddUserComponentFunction";
import EditUserComponent from "../user/EditUserComponentFunction";

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