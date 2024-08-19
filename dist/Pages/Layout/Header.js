import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const navigate = useNavigate();
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleLogout = () => {
        localStorage.removeItem("token");
        toast.success("logout succesfully");
        sessionStorage.removeItem("token");
        localStorage.removeItem("profile");
        localStorage.removeItem("username");
        navigate("/login");
    };
    const profileImage = localStorage.getItem("profile") || "";
    const userName = localStorage.getItem("username") || "";
    const token = localStorage.getItem("token");
    const pages = [
        { page: "Products", p: "/products" },
        { page: "Home", p: "/" },
    ];
    const settings = [
        { page: "Register", p: "/register" },
        ...(token
            ? [
                { page: "Update Password", p: "/update-password" },
                { page: "Logout", p: "" },
            ]
            : [{ page: "Login", p: "/login" }]),
    ];
    return (_jsx(AppBar, { position: "static", sx: { bgcolor: "teal" }, children: _jsx(Container, { maxWidth: "xl", children: _jsxs(Toolbar, { disableGutters: true, children: [_jsx(Typography, { variant: "h6", noWrap: true, component: "a", href: "#app-bar-with-responsive-menu", sx: {
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }, children: "CRUD" }), _jsxs(Box, { sx: { flexGrow: 1, display: { xs: "flex", md: "none" } }, children: [_jsx(IconButton, { size: "large", "aria-label": "account of current user", "aria-controls": "menu-appbar", "aria-haspopup": "true", onClick: handleOpenNavMenu, color: "inherit", children: _jsx(MenuIcon, {}) }), _jsx(Menu, { id: "menu-appbar", anchorEl: anchorElNav, anchorOrigin: {
                                    vertical: "bottom",
                                    horizontal: "left",
                                }, keepMounted: true, transformOrigin: {
                                    vertical: "top",
                                    horizontal: "left",
                                }, open: Boolean(anchorElNav), onClose: handleCloseNavMenu, sx: {
                                    display: { xs: "block", md: "none" },
                                }, children: pages.map((page) => (_jsx(Link, { to: page.p, style: { textDecoration: "none" }, children: _jsx(MenuItem, { onClick: handleCloseNavMenu, children: _jsx(Typography, { textAlign: "center", children: page.page }) }) }, page.page))) })] }), _jsx(AdbIcon, { sx: { display: { xs: "flex", md: "none" }, mr: 1 } }), _jsx(Typography, { variant: "h5", noWrap: true, component: "a", href: "#app-bar-with-responsive-menu", sx: {
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }, children: "LOGO" }), _jsx(Box, { sx: { flexGrow: 1, display: { xs: "none", md: "flex" } }, children: pages.map((page) => (_jsx(Link, { to: page.p, style: { textDecoration: "none" }, children: _jsx(Button, { onClick: handleCloseNavMenu, sx: { my: 2, color: "white", display: "block" }, children: page.page }, page.page) }, page.page))) }), _jsx(Typography, { variant: "body1", mx: 1, sx: { textTransform: "capitalize", fontWeight: "500" }, children: userName }), _jsxs(Box, { sx: { flexGrow: 0 }, children: [_jsx(Tooltip, { title: "Open settings", children: _jsx(IconButton, { onClick: handleOpenUserMenu, sx: { p: 0 }, children: _jsx(Avatar, { alt: "profile image", src: profileImage }) }) }), _jsx(Menu, { sx: { mt: "45px" }, id: "menu-appbar", anchorEl: anchorElUser, anchorOrigin: {
                                    vertical: "top",
                                    horizontal: "right",
                                }, keepMounted: true, transformOrigin: {
                                    vertical: "top",
                                    horizontal: "right",
                                }, open: Boolean(anchorElUser), onClose: handleCloseUserMenu, children: settings.map((setting) => setting.page === "Logout" ? (_jsx(MenuItem, { onClick: () => {
                                        handleCloseUserMenu();
                                        handleLogout();
                                    }, children: _jsx(Typography, { textAlign: "center", children: setting.page }) }, setting.page)) : (_jsx(Link, { to: setting.p, style: { textDecoration: "none", color: "black" }, children: _jsx(MenuItem, { onClick: handleCloseUserMenu, children: _jsx(Typography, { textAlign: "center", children: setting.page }) }) }, setting.page))) })] })] }) }) }));
}
export default Navbar;
