import "../cssFiles/SingleOrderPage.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function SingleOrderPage(props) {
  const [load, setLoad] = useState(null);
  const { orderId } = useParams();
  const [totalPrice, setTotalPrice] = useState(0);
  const getData = async () => {
    try {
      const data = await axios(`http://localhost:3001/orders/${orderId}`, {
        headers: { authorization: localStorage.getItem("shamazon_token") },
      });

      console.log(data);
      orderTotalPrice(data.data.plants);
      setLoad(data);
    } catch (err) {
      console.log(err);
    }
  };

  const displayOrders = () => {
    return (
      <>
        <li>Ordered on : {load.data.orderInfo.createdAt.slice(0, 10)}</li>
        <li>OrderId : {load.data.orderInfo.id}</li>
        <li>Total: ${totalPrice}</li>
        {load.data.plants.map((plant, i) => {
          return (
            <>
              <li key={plant.id}>
                <img src={plant.image} />
              </li>
              <li>Price: {plant.price}</li>
            </>
          );
        })}
      </>
    );
  };

  function orderTotalPrice(plants) {
    let tempTotal = 0;
    plants.forEach((plant) => {
      let slicedPrice = Number(plant.price.slice(1, plant.price.length));
      tempTotal += slicedPrice;
    });
    setTotalPrice(tempTotal);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='card'>
      <ul>{load ? displayOrders() : <p>Loading</p>}</ul>
    </div>
  );
}

export default SingleOrderPage;
