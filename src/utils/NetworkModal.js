import React from "react";
import { Dialog, DialogContent, Box, Slide } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function NetworkChange({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };
  const networkHandler = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0xa86a" }],
        // params: [{ chainId: "0xa869" }],
      });
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="modal__main__container">
        <Dialog
          open={open}
          keepMounted
          TransitionComponent={Transition}
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent
            className="dialoge__content__section"
            style={{
              border: "2px solid",
              borderImage:
                "linear-gradient(90deg, #E93C50 -1.72%, #F806EF 100%) 1",
              background: "#000",
              boxShadow: "0px 0px 13px rgba(182, 0, 211, 0.7)",
            }}
          >
            <Box component="h3" color="#fff">
              <Box component="span" color="red" fontSize="30px">
                Error!
              </Box>{" "}
              You are on the incorrect network, please switch your network and
              try again.{" "}
            </Box>
            <Box textAlign="center">
              <button
                style={{
                  background:
                    "linear-gradient(90deg, #E93C50 -1.72%, #F806EF 100%)",
                  boxShadow: "0px 0px 13px rgba(182, 0, 211, 0.7)",
                  borderRadius: "34px",
                  padding: "15px 20px",
                  border: "none",
                  outline: "none",
                  color: "#fff",
                  cursor: "pointer",
                  fontSize: "16px",
                  lineHeight: "19px",
                  fontWeight: "bolder",
                  textTransform: "uppercase",
                  marginRight: "10px",
                  "&:hover": {
                    background: "#EB3A5A",
                  },
                }}
                onClick={networkHandler}
              >
                Switch Network
              </button>
            </Box>
          </DialogContent>
        </Dialog>
        {/* </Slide> */}
      </div>
    </div>
  );
}

export default NetworkChange;
