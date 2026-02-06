import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from '../pages/Home';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            {/* Wrap all pages in Layout */}
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
