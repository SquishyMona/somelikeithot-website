import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <div className="header">   
          <h1>Some Like It Hot</h1>
          <h2>Fredonia&apos;s Premier All Female A Cappella Group</h2>
      </div>

      <div className="slider">
          <span id="slide-1"></span>
          <span id="slide-2"></span>
          <span id="slide-3"></span>
          <span id="slide-4"></span>
          <span id="slide-5"></span>
          <span id="slide-6"></span>
          <span id="slide-7"></span>
          <span id="slide-8"></span>
          <span id="slide-9"></span>
          <span id="slide-10"></span>
          <span id="slide-11"></span>
          <span id="slide-12"></span>
          <div className="image-container">
              <img src="Images/slide2.jpg" className="slide" />
              <img src="Images/slide1.jpg" className="slide" />
              <img src="Images/slide3.jpg" className="slide" />
              <img src="Images/slide4.jpg" className="slide" />
              <img src="Images/slide5.jpg" className="slide" />
              <img src="Images/slide6.jpg" className="slide" /> 
              <img src="Images/slide7.jpg" className="slide" />
              <img src="Images/slide8.jpg" className="slide" />
              <img src="Images/slide9.jpg" className="slide" />
              <img src="Images/slide10.jpeg" className="slide" />
              <img src="Images/slide11.jpg" className="slide" />
              <img src="Images/slide12.jpg" className="slide" />
          </div>  
      </div>
      <div className="buttons">
          <a href="#slide-1">&hearts;</a>
          <a href="#slide-2">&hearts;</a>
          <a href="#slide-3">&hearts;</a>
          <a href="#slide-4">&hearts;</a>
          <a href="#slide-5">&hearts;</a>
          <a href="#slide-6">&hearts;</a>
          <a href="#slide-7">&hearts;</a>
          <a href="#slide-8">&hearts;</a>
          <a href="#slide-9">&hearts;</a>
          <a href="#slide-10">&hearts;</a>
          <a href="#slide-11">&hearts;</a>
          <a href="#slide-12">&hearts;</a>
      </div>  
    </>  
  );
}
