import React, { useState } from 'react';
import { CrudBlog } from '../../components/Admin/Blog/CrudBlog';
import SidebarMed from '../../components/Medica/SidebarMed';

export default function BlogMedico() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <main>
            <div className="flex h-screen">
                <SidebarMed sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            </div>
            <div className="hidden lg:fixed lg:inset-y-0 lg:inset-x-0 lg:flex border border-teal-400 rounded-lg my-2 mr-6 ml-40">
                <div className="flex-1">
                    <CrudBlog />
                </div>
            </div>
        </main >
    );
}