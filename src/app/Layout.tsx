import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Drawer from '../components/Drawer/Drawer';
import Header from '../components/Header/Header';

const Layout: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <>
            <Header onMenuOpen={() => setDrawerOpen(true)} />

            <Drawer
                isOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            />

            <main>
                <Outlet />
            </main>
        </>
    );
};

export default Layout;
