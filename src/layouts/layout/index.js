import React from "react"
import Footer from "../../entities/footer"
import Header from "../../entities/header"
import Sidebar from "../../entities/sidebar"
import "./Layout.css"

/**
 * @typedef {Object} LayoutProps
 * @property {React.ReactNode} children
 */

/**
 * @param {LayoutProps} props
 */

export const Layout = ({ children }) => {
    return (
        <div className="layout-container">
            <Header />
            <div className="layout-body">
                <Sidebar />
                <main className="layout-main">
                    {children}
                </main>
            </div>
            <Footer />
        </div>
    );
};
