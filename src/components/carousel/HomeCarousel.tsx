import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function HomeCarousel() {
  // Define tus estilos en línea
  const imageStyle = {
    height: '500px', // Ajusta esto a la altura que desees
    objectFit: 'contain' , // Cambia 'cover' a 'contain'
  };

  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./img/tienda1.jpeg"
          alt="Tienda 1"
          style={imageStyle} // Aplica los estilos en línea
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./img/tienda2.jpeg"
          alt="Tienda 2"
          style={imageStyle} // Aplica los estilos en línea
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./img/tienda3.jpeg"
          alt="Tienda 3"
          style={imageStyle} // Aplica los estilos en línea
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default HomeCarousel;