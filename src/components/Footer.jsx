import React from "react";
import { Box } from "@mui/material";

function Footer() {
  return (
    <Box
      textAlign="center"
      fontSize={{ xs: "11px", sm: "16px" }}
      fontWeight={400}
      mt={15}
      py={2}
      color="text.secondary"
    >
      © Copyright 2022 AVAX Fortune. All Rights Reserved.
    </Box>
  );
}

export default Footer;
