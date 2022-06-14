import React, { useState, useContext } from "react";
import { Box, Container, useMediaQuery, Grid, Hidden } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { AppContext } from "../utils/utils";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import { Paper } from "@mui/material";
import { AvaxAddress } from "../Connectivity/Environment";
import twitter from "../assets/twitter.svg";
import discord from "../assets/discord.svg";
import telegram from "../assets/telegram.svg";

const useStyles = makeStyles({
  list: {
    width: 250,
    paddingTop: "70px",
  },
  fullList: {
    width: "auto",
    alignItems: "center",
  },
  paper: {
    background: "#000 !important",
    justifyContent: "space-between",
  },
  hover: {
    "&:hover": {
      color: "#EB3A5A",
    },
  },
});

function Navbar() {
  const classes = useStyles();
  const [state, setState] = useState(false);
  const { account, connect, disconnect } = useContext(AppContext);
  const matches = useMediaQuery("(max-width:960px)");

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Box mb={5} display="flex" justifyContent="center">
        <Box
          fontFamily="Roboto"
          fontWeight={300}
          fontSize={matches ? "25px" : "30px"}
        >
          <Box
            component="span"
            fontWeight={700}
            sx={{
              background: "linear-gradient(90deg, #E93C51 0%, #F806EF 40.67%)",
              backgroundClip: "text",
              textFillColor: "transparent",
            }}
          >
            AVAX{" "}
          </Box>
          Fortune
        </Box>
      </Box>
      <List>
        {[
          <a
            href="#audit"
            target="_blank"
            style={{
              textDecoration: "none",
              color: "#fff",
            }}
          >
            <Box>Audit</Box>
          </a>,
          <a
            href="./whitepaper.pdf"
            target="_blank"
            style={{
              textDecoration: "none",
              color: "#fff",
            }}
          >
            <Box>Whitepaper</Box>
          </a>,

          <a
            href={`https://snowtrace.io/address/${AvaxAddress}`}
            target="_blank"
            rel="noreferrer"
            style={{
              textDecoration: "none",
              color: "#fff",
            }}
          >
            <Box>Contract</Box>
          </a>,
        ].map((text, index) => (
          <ListItem
            button
            style={{
              justifyContent: "center",
            }}
            key={text}
          >
            <ListItemText
              className={classes.hover}
              style={{
                textTransform: "capitalize",
                textAlign: "center",
                textDecoration: "none",
                cursor: "pointer",
                color: "#ffffff",
                fontSize: "15px",
                fontWeight: 600,
              }}
              primary={text}
            />
          </ListItem>
        ))}
      </List>
      <Box mt={5} display="flex" justifyContent="center">
        {account ? (
          <Box
            sx={{
              background: "linear-gradient(90deg, #EA3B55 0%, #F808E7 100%)",
              cursor: "pointer",
              // boxShadow: "1px -1px 16px 1px rgba(93, 6, 95, 0.8)",
            }}
            width="117px"
            height="44px"
            fontWeight="700"
            borderRadius="6px"
            fontSize="18px"
            color="#ffffff"
            display="flex"
            justifyContent="center"
            alignItems="center"
            letterSpacing="1%"
            onClick={() => disconnect()}
            style={{ zIndex: 1 }}
          >
            {account.slice(0, 4) + "..." + account.slice(-4)}
          </Box>
        ) : (
          <Box
            zIndex={1}
            sx={{
              background: "linear-gradient(90deg, #EA3B55 0%, #F808E7 100%)",
              cursor: "pointer",
              // boxShadow: "1px -1px 16px 1px rgba(93, 6, 95, 0.8)",
            }}
            width="117px"
            height="44px"
            fontWeight="700"
            borderRadius="6px"
            fontSize="18px"
            color="#ffffff"
            display="flex"
            justifyContent="center"
            alignItems="center"
            letterSpacing="1%"
            onClick={() => connect()}
          >
            Connect
          </Box>
        )}
      </Box>
    </div>
  );

  return (
    <Box position="relative">
      <Box
        bgcolor="#000"
        height="100px"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Container maxWidth="lg">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexBasis={matches ? "100%" : "26%"}
            >
              <Grid
                container
                direction="row"
                justifyContent="start"
                alignItems="center"
              >
                <Grid item>
                  <Box
                    fontFamily="Roboto"
                    fontWeight={300}
                    fontSize={matches ? "25px" : "30px"}
                  >
                    <Box
                      component="span"
                      fontWeight={700}
                      sx={{
                        background:
                          "linear-gradient(90deg, #E93C51 22%, #F806EF 63.67%)",
                        backgroundClip: "text",
                        textFillColor: "transparent",
                      }}
                    >
                      AVAX{" "}
                    </Box>
                    Fortune
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box display={{ xs: "none", sm: "block" }}>
              <Hidden mdDown>
                <Box
                  display="flex"
                  justifyContent="space-evenly"
                  alignItems="center"
                >
                  <a
                    href="/audit"
                    target="_blank"
                    style={{
                      textDecoration: "none",
                      color: "#fff",
                    }}
                  >
                    <Box
                      className={classes.hover}
                      fontWeight={400}
                      fontSize="18px"
                      mr={5}
                    >
                      Audit
                    </Box>
                  </a>

                  <a
                    href="./whitepaper.pdf"
                    target="_blank"
                    style={{
                      textDecoration: "none",
                      color: "#fff",
                    }}
                  >
                    <Box
                      className={classes.hover}
                      fontWeight={400}
                      fontSize="18px"
                      mr={5}
                    >
                      Whitepaper
                    </Box>
                  </a>

                  <a
                    href={`https://snowtrace.io/address/${AvaxAddress}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      textDecoration: "none",
                      color: "#fff",
                    }}
                  >
                    <Box
                      className={classes.hover}
                      fontWeight={400}
                      fontSize="18px"
                      mr={5}
                    >
                      Contract
                    </Box>
                  </a>
                </Box>
              </Hidden>
            </Box>

            <Box display={{ xs: "none", sm: "block" }}>
              <Hidden mdDown>
                <Box
                  display="flex"
                  justifyContent="space-evenly"
                  alignItems="center"
                >
                  <a
                    href="https://twitter.com/AvaxFortune"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      textDecoration: "none",
                      color: "#fff",
                      marginRight: "20px",
                    }}
                  >
                    <Box
                    // sx={{
                    //   background:
                    //     "linear-gradient(90deg, #EA3B55 0%, #F808E7 100%)",
                    //   borderRadius: "3px",
                    //   padding: "10px 8px",
                    //   display: "flex",
                    //   justifyContent: "center",
                    //   alignItems: "center",
                    //   "&:hover": {
                    //     background: "#EB3A5A",
                    //   },
                    // }}
                    >
                      <img src={twitter} width="20px" alt="" />
                    </Box>
                  </a>

                  <a
                    href="https://discord.com/invite/nCjCuamwN9"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      textDecoration: "none",
                      color: "#fff",
                      marginRight: "20px",
                    }}
                  >
                    <Box
                    // sx={{
                    //   background:
                    //     "linear-gradient(90deg, #EA3B55 0%, #F808E7 100%)",
                    //   borderRadius: "3px",
                    //   padding: "8px",
                    //   display: "flex",
                    //   justifyContent: "center",
                    //   alignItems: "center",
                    //   "&:hover": {
                    //     background: "#EB3A5A",
                    //   },
                    // }}
                    >
                      <img src={discord} width="18px" alt="" />
                    </Box>
                  </a>

                  <a
                    href="https://t.me/Avax_Fortune"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      textDecoration: "none",
                      color: "#fff",
                      marginRight: "20px",
                    }}
                  >
                    <Box
                    // sx={{
                    //   background:
                    //     "linear-gradient(90deg, #EA3B55 0%, #F808E7 100%)",
                    //   borderRadius: "3px",
                    //   padding: "8px",
                    //   display: "flex",
                    //   justifyContent: "center",
                    //   alignItems: "center",
                    //   "&:hover": {
                    //     background: "#EB3A5A",
                    //   },
                    // }}
                    >
                      <img src={telegram} width="20px" alt="" />
                    </Box>
                  </a>

                  {account ? (
                    <Box
                      zIndex={1}
                      sx={{
                        background:
                          "linear-gradient(90deg, #EA3B55 0%, #F808E7 100%)",
                        // boxShadow: "-1px 3px 3px rgba(1, 100, 246, 0.29)",
                        cursor: "pointer",
                        zIndex: 1,
                        "&:hover": {
                          background: "#EB3A5A",
                        },
                      }}
                      width="117px"
                      height="44px"
                      fontWeight="700"
                      borderRadius="6px"
                      fontSize="18px"
                      color="#ffffff"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      letterSpacing="1%"
                      ml={1}
                      onClick={() => disconnect()}
                    >
                      {account.slice(0, 4) + "..." + account.slice(-4)}
                    </Box>
                  ) : (
                    <Box
                      zIndex={1}
                      sx={{
                        background:
                          "linear-gradient(90deg, #EA3B55 0%, #F808E7 100%)",
                        // boxShadow: "-1px 3px 3px rgba(1, 100, 246, 0.29)",
                        cursor: "pointer",
                        "&:hover": {
                          background: "#EB3A5A",
                        },
                      }}
                      ml={1}
                      width="117px"
                      height="44px"
                      fontWeight="700"
                      borderRadius="6px"
                      fontSize="18px"
                      color="#ffffff"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      letterSpacing="1%"
                      onClick={() => connect()}
                    >
                      Connect
                    </Box>
                  )}
                </Box>
              </Hidden>
            </Box>
            <Hidden mdUp>
              {["left"].map((anchor) => (
                <React.Fragment key={anchor}>
                  <Button
                    onClick={toggleDrawer(anchor, true)}
                    style={{ zIndex: 1, justifyContent: "end", width: "100%" }}
                  >
                    <MenuIcon
                      style={{
                        fontSize: "38px",
                        cursor: "pointer",
                        color: "#fff",
                      }}
                    ></MenuIcon>
                  </Button>
                  <Paper style={{ background: "#1C0D38" }}>
                    <SwipeableDrawer
                      classes={{ paper: classes.paper }}
                      anchor={anchor}
                      open={state[anchor]}
                      onClose={toggleDrawer(anchor, false)}
                      onOpen={toggleDrawer(anchor, true)}
                    >
                      {list(anchor)}
                    </SwipeableDrawer>
                  </Paper>
                </React.Fragment>
              ))}
            </Hidden>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default Navbar;
