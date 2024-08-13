// src/components/Footer.tsx

import React from "react";
import { Box, Typography, Link, Container } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: "teal",
        color: "white",
        padding: "1rem 0",
        marginTop: "auto",
        textAlign: "center",
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" component="p">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </Typography>
        <Typography variant="body2" component="p">
          <Link href="/terms" color="inherit" underline="hover">
            Terms of Service
          </Link>{" "}
          |{" "}
          <Link href="/privacy" color="inherit" underline="hover">
            Privacy Policy
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
