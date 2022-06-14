import React, { useState } from "react";
import {
  Box,
  Typography,
  TablePagination,
  List,
  useMediaQuery,
} from "@mui/material";
import usePagination from "@mui/material/usePagination/usePagination";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    minHeight: "40px",
    width: "100%",
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "5px",
  },
});
function Pagination({ limit, count, setPage, pageNumber }) {
  const matches = useMediaQuery("(max-width:750px)");

  const classes = useStyles();
  const { items } = usePagination({
    count: Math.ceil(count / limit),
  });
  console.log(items);
  return (
    <Box className={classes.root}>
      <Typography variant="subtitle1" mr={2}>
        Showing 1-{limit} out of {count}
      </Typography>

      <Box display="flex">
        <List sx={{ display: "flex" }}>
          {items.map(({ page, type, selected, ...item }, index) => {
            let children = null;

            if (type === "start-ellipsis" || type === "end-ellipsis") {
              children = "...";
            } else if (type === "page") {
              children = (
                <button
                  type="button"
                  style={{
                    fontWeight: pageNumber === page ? "bold" : undefined,
                    padding: matches ? "4px" : "5px 10px",
                  }}
                  {...item}
                  onClick={() => setPage(page)}
                >
                  {page}
                </button>
              );
            } else {
              if (type === "next") {
                children = (
                  <button
                    type="button"
                    onClick={() =>
                      setPage(
                        pageNumber < Math.ceil(count / limit)
                          ? pageNumber + 1
                          : pageNumber
                      )
                    }
                    {...item}
                  >
                    <ArrowForwardIosIcon
                      fontSize={matches ? "10px" : "20px"}
                      color="#fff"
                      onClick={() =>
                        setPage(
                          pageNumber < Math.ceil(count / limit)
                            ? pageNumber + 1
                            : pageNumber
                        )
                      }
                    />
                  </button>
                );
              } else {
                children = (
                  <button
                    type="button"
                    onClick={() => setPage(pageNumber > 1 ? pageNumber - 1 : 1)}
                    {...item}
                  >
                    <ArrowBackIosIcon
                      fontSize={matches ? "10px" : "20px"}
                      color="#fff"
                      onClick={() =>
                        setPage(pageNumber > 1 ? pageNumber - 1 : 1)
                      }
                    />
                  </button>
                );
              }
            }

            return (
              <li
                style={{ margin: matches ? "0px 1.5px" : "0px 3px" }}
                key={index}
              >
                {children}
              </li>
            );
          })}
        </List>
      </Box>
    </Box>
  );
}

export default Pagination;
