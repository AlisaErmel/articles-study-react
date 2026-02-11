import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from '../pages/Home';
import Create_Module from '../pages/Create_Module';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            {/* Wrap all pages in Layout */}
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="createmodule" element={<Create_Module />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
