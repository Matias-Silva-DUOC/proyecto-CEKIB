import React, { useState } from 'react';
import Sidebar from '../../components/Admin/Sidebar';
import GraficosDashboard from '../../components/Admin/Dashboard/GraficosDashboard';

export default function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <main>
            <div className="flex h-screen">
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            </div>
            <div className="hidden lg:fixed lg:inset-y-0 lg:inset-x-0 lg:flex border border-teal-400 rounded-lg my-2 mr-6 ml-40 mx-40 overflow-y-auto">
                <div className="flex-1">
                    <GraficosDashboard />
                </div>
            </div>
        </main >
    );
}