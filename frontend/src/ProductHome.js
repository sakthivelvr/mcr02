import React from "react";
import MetaData from "./layouts/MetaData";
import { useEffect } from "react";
import { getProducts } from "../actions/productsActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./components/layouts/Loader";

export default function Home() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.productState);
  //{products, loading}
  useEffect(() => {
    dispatch(getProducts);
  }, []);

  if(loading){
    return <Loader/>
}else {
    return (
        <>
          <MetaData title={"Book a Ride"} />
          <div className="container">
            <h3>Latest products</h3>
            <br />
            <br />
    
            <div class="row">
              {products &&
                products.map((product) => (
                  <div class="col-sm-12 col-md-6 col-lg-3 my-3 mx-3">
                    <div className="card" style={{ width: "18rem" }}>
                      <img src={product.images[0].image} className="card-img-top" alt="..." />
                      <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p>
                          Some quick example text to build on the card title and
                          make up the bulk of the card's content.
                        </p>
                        <h4>$53.00</h4>
                        <a
                          href="#"
                          className="btn btn-primary"
                          style={{ width: "100%" }}
                        >
                          Go somewhere
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
      );
}
  
}
