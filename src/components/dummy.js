import { Form } from "react-bootstrap";
import { CartState } from "../context/Context";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
import { Button } from "react-bootstrap";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import PriceRangeSlider from "./temp";
import { IconName } from "react-icons/ai";
import { FaSort } from "react-icons/ai";
import { MdSort } from "react-icons/md";
import { RiFilter2Fill } from "react-icons/ri";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const SortByPrice = () => {
  const {
    state,
    productDispatch,
    productState: { byStock, byFastDelivery, sort, byRating, byPriceRange },
  } = CartState();

  useEffect(() => {
    productDispatch({
      type: "SORT_BY_PRICE",
      payload: "lowToHigh",
    });
  }, [productDispatch]);

  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 700;
  React.useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    // subscribe to window resize event "onComponentDidMount"
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      // unsubscribe "onComponentDestroy"
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);
  return (
    <div className="responsive">
      {width > breakpoint ? (
        <div className="desktop">
          <div className="container_sortbyprice">
            <span className="sortbyprice_title">Sort by</span>
            <span>
              <Form.Check
                inline
                label="Price_Low_To_High"
                name="group1"
                type="radio"
                id={`inline-1`}
                onChange={() =>
                  productDispatch({
                    type: "SORT_BY_PRICE",
                    payload: "lowToHigh",
                  })
                }
                checked={sort === "lowToHigh" ? true : false}
              />
            </span>
            <span>
              <Form.Check
                inline
                label="Price_High_To_Low"
                name="group1"
                type="radio"
                id={`inline-2`}
                onChange={() =>
                  productDispatch({
                    type: "SORT_BY_PRICE",
                    payload: "highToLow",
                  })
                }
                checked={sort === "highToLow" ? true : false}
              />
            </span>
          </div>
        </div>
      ) : (
        <div className="mobileDevice">
          <div>
            <Button onClick={handleOpen} variant="primary">
              <MdSort /> Sort
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title">
                  <span>
                    <Form.Check
                      inline
                      label="Price_Low_To_High"
                      name="group1"
                      type="radio"
                      id={`inline-1`}
                      onChange={() =>
                        productDispatch({
                          type: "SORT_BY_PRICE",
                          payload: "lowToHigh",
                        })
                      }
                      checked={sort === "lowToHigh" ? true : false}
                    />
                  </span>
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <span>
                    <Form.Check
                      inline
                      label="Price_High_To_Low"
                      name="group1"
                      type="radio"
                      id={`inline-2`}
                      onChange={() =>
                        productDispatch({
                          type: "SORT_BY_PRICE",
                          payload: "highToLow",
                        })
                      }
                      checked={sort === "highToLow" ? true : false}
                    />
                  </span>
                </Typography>
              </Box>
            </Modal>
          </div>
          <div>
            <Button onClick={handleOpen1} variant="primary">
              <RiFilter2Fill />
              Filter
            </Button>
            <Modal
              open={open1}
              onClose={handleClose1}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  <PriceRangeSlider
                    sortedProduct={state}
                    onChange={(data) =>
                      productDispatch({
                        type: "FILTER_BY_PRICE_RANGE",
                        payload: data,
                      })
                    }
                  />
                </Typography>
              </Box>
            </Modal>
          </div>
        </div>
      )}
    </div>
  );
};

export default SortByPrice;
