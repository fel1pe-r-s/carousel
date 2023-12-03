import { useEffect, useRef } from "react";
import "./App.css";
import logo from "./assets/super-shoes.png";
import chevron from "./assets/chevron_icon.png";
import { useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const carousel = useRef(null);

  useEffect(() => {
    fetch("http://localhost:3000/shoots")
      .then((response) => response.json())
      .then(setData);
  }, []);

  if (!data || !data.length) return null;

  const handleLeftClick = (e) => {
    e.preventDefault();
    carousel.current.scrollLeft -= carousel.current.offsetWidth;
  };
  const handleRightClick = (e) => {
    e.preventDefault();
    carousel.current.scrollLeft += carousel.current.offsetWidth;
  };
  return (
    <div className="container">
      <div className="logo">
        <img src={logo} alt="Logo super shoes" />
      </div>
      <div className="pai">
        <div className="right-gradient ">
          <div className="buttons">
            <button className="left" onClick={handleRightClick} r>
              <img src={chevron} alt="scroll Left" />
            </button>
          </div>
        </div>
        <div className="left-gradient">
          <div className="buttons">
            <button onClick={handleLeftClick}>
              <img src={chevron} alt="scroll Left" />
            </button>
          </div>
        </div>
        <div className="carousel" ref={carousel}>
          {data.map(({ id, name, price, oldPrice, image }) => (
            <div className="item" key={id}>
              <div className="image">
                <img src={image} alt="shoe" />
              </div>
              <div className="info">
                <span className="name">{name}</span>
                <span className="oldPrice">U$ {oldPrice}</span>
                <span className="price">U$ {price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
