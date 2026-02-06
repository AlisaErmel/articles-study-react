import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Drawer from '../components/Drawer/Drawer';
import Header from '../components/Header/Header';
import '../styles/App.css';

const Layout: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <>
            {/* Layout wrapper: header and drawer */}
            <div className="layout-container">
                <Header onMenuOpen={() => setDrawerOpen(true)} />
                <Drawer
                    isOpen={drawerOpen}
                    onClose={() => setDrawerOpen(false)}
                />
            </div>

            {/* Main content wrapper: pages */}
            <main className="pages-container">
                <Outlet />
            </main>
        </>
    );
};

export default Layout;
