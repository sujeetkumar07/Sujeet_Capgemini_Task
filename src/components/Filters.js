import { Button, Form } from "react-bootstrap";
import { CartState } from "../context/Context";
import Rating from "./Rating";
import Price from "./Price_Filter";
import PriceRangeSlider from "./temp";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import * as React from "react";

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

const Filters = () => {
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
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
          <div className="filters">
            <span className="title">Filter Products</span>
            {/* <span>
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
            <span>
              <Form.Check
                inline
                label="Include Out of Stock"
                name="group1"
                type="checkbox"
                id={`inline-3`}
                onChange={() =>
                  productDispatch({
                    type: "FILTER_BY_STOCK",
                  })
                }
                checked={byStock}
              />
            </span>
            <span>
              <Form.Check
                inline
                label="Fast Delivery Only"
                name="group1"
                type="checkbox"
                id={`inline-4`}
                onChange={() =>
                  productDispatch({
                    type: "FILTER_BY_DELIVERY",
                  })
                }
                checked={byFastDelivery}
              />
            </span>
            <span>
              <label style={{ paddingRight: 10 }}>Rating: </label>
              <Rating
                rating={byRating}
                onClick={(i) =>
                  productDispatch({
                    type: "FILTER_BY_RATING",
                    payload: i + 1,
                  })
                }
                style={{ cursor: "pointer" }}
              />
            </span> */}
            <span className="sortbyprice_title">Sort by Price</span>
            <PriceRangeSlider
              sortedProduct={state}
              onChange={(data) =>
                productDispatch({
                  type: "FILTER_BY_PRICE_RANGE",
                  payload: data,
                })
              }
            />
            <br />
            <br />
            <br />
            <Button
              variant="light"
              onClick={() =>
                productDispatch({
                  type: "CLEAR_FILTERS",
                })
              }
            >
              Clear Filters
            </Button>
          </div>
        </div>
      ) : (
        <div className="mobileDevice"></div>
      )}
    </div>
  );
};

export default Filters;
