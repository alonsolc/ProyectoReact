import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import MainUsersComponent from '../pages/MainUsers';
import DashboardComponent from '../pages/Dashboard';
import NotFoundComponent from '../pages/NotFound';

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route exact path="/" element={<MainUsersComponent/>} />
                    <Route exact path="/dashboard" element={<DashboardComponent/>} />
                    <Route path="*" element={<NotFoundComponent/>} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;