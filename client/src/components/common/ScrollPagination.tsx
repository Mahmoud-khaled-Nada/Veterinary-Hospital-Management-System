import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

const EditPage = () => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [index, setIndex] = useState(2);

  const fetchMoreData = () => {
    axios
      .get(`https://api.escuelajs.co/api/v1/products?offset=${index}0&limit=12`)
      .then((res) => {
        console.log(res.data);
        setItems((prevItems) => [...prevItems, ...res.data]);

        res.data.length > 0 ? setHasMore(true) : setHasMore(false);
      })
      .catch((err) => console.log(err));

    setIndex((prevIndex) => prevIndex + 1);
  };

  console.log(items);

  useEffect(() => {
    fetchMoreData();
  }, []);

  return (
    <InfiniteScroll dataLength={items.length} next={fetchMoreData} hasMore={hasMore} loader="Loader...">
      <div className="container">
        <div className="row">
          {items &&
            items.map((item, index) => (
              <div className="col-md-4" key={index}>
                <div className="card">
                  <div className="card-body">
                    {index}
                    {/* <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.description}</p> */}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </InfiniteScroll>
  );
};

export default EditPage;
