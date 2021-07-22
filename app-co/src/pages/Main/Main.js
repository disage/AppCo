import React from 'react';
import { Link } from 'react-router-dom';
import mockup from '../../assets/img/mockup.png';
import workImg1 from '../../assets/img/workImg1.png';
import workImg2 from '../../assets/img/workImg2.png';
import workImg3 from '../../assets/img/workImg3.png';
import WorkCard from '../../components/WorkCard/WorkCard';
import './Main.scss';

const Main = () => {
  return (
    <div className="main">
      <div className="container">
        <section className="infoSection">
          <div className="logo">AppCo</div>
          <div className="infoWrapper">
            <h1>
              <b>Brainstorming</b> for desired perfect Usability
            </h1>
            <p>
              Our design projects are fresh and simple and will benefit your business greatly. Learn
              more about our work!
            </p>
            <Link className="statsBtn" to="/statistics">
              Views Stats
            </Link>
          </div>
          <img src={mockup} alt={'mockup'} />
        </section>
      </div>
      <section className="aboutSection">
        <h2>
          Why small <b>business owners love</b> AppCo?
        </h2>
        <p>
          Our design projects are fresh and simple and will benefit your business greatly. Learn
          more about our work!
        </p>
        <div className="cardsWrapper">
          <WorkCard
            workImg={workImg1}
            workName="Clean Design"
            workDescription="Increase sales by showing true dynamics of your website."
          />
          <WorkCard
            workImg={workImg2}
            workName="Secure Data"
            workDescription="Build your online store’s trust using Social Proof & Urgency."
          />
          <WorkCard
            workImg={workImg3}
            workName="Retina Ready"
            workDescription="Realize importance of social proof in customer’s purchase decision."
          />
        </div>
      </section>
      <footer>
        <div className="emailSubscribe">
          <input type="text" placeholder="Enter you email" />
          <button>Subscribe</button>
        </div>
        <div className="footerInfo">
          <p className="logo">AppCo</p>
          <p>All rights reserved by ThemeTags</p>
          <p>Copyrights © 2019.</p>
        </div>
      </footer>
    </div>
  );
};

export default Main;
