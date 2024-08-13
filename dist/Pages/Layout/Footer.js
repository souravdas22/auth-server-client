import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Box, Typography, Link, Container } from "@mui/material";
var Footer = function () {
    return (_jsx(Box, { sx: {
            backgroundColor: "teal",
            color: "white",
            padding: "1rem 0",
            marginTop: "auto",
            textAlign: "center",
        }, children: _jsxs(Container, { maxWidth: "lg", children: [_jsxs(Typography, { variant: "body2", component: "p", children: ["\u00A9 ", new Date().getFullYear(), " Your Company. All rights reserved."] }), _jsxs(Typography, { variant: "body2", component: "p", children: [_jsx(Link, { href: "/terms", color: "inherit", underline: "hover", children: "Terms of Service" }), " ", "|", " ", _jsx(Link, { href: "/privacy", color: "inherit", underline: "hover", children: "Privacy Policy" })] })] }) }));
};
export default Footer;
