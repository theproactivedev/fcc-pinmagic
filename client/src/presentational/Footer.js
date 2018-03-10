import React from 'react';

const Footer = () => {
  return(
    <footer>
    <div className="container">
      <div className="row">
        <div className="col-xs-12 col-md-4">
          <h4>JavaScript Project</h4>
          <p>Pinterest Clone</p>
          <p>Free Code Camp Full Stack App</p>
          <p>Check user stories <a href="https://www.freecodecamp.org/challenges/build-a-pinterest-clone">here.</a></p>
        </div>
        <div className="col-xs-12 col-md-4">
          <h4>Tech Stack</h4>
          <p>Front End: React, Redux, React-Bootstrap, React-Masonry-Component</p>
          <p>Back End: Express.js, Mongoose, mLab</p>
          <p>Assets: Google Fonts, Credits to the Images&#39; Owners</p>
        </div>
        <div className="col-xs-12 col-md-4">
          <h4>Developer</h4>
          <p>Eirin Gonzales</p>
          <p>Get in touch with me: <a href="https://twitter.com/theproactivedev">Twitter</a> | <a href="https://www.linkedin.com/in/eirin-gonzales-5951aa9b">Linkedin</a> | <a href="https://theproactivedeveloper.wordpress.com/">Blog</a></p>
          <p>View my portfolio <a href="http://eiringonzales.com/portfolio.php">here.</a></p>
        </div>
      </div>
      <p>By <a href="http://eiringonzales.com/">Eirin Gonzales</a> | <a href="https://github.com/theproactivedev/fcc-pinmagic">Github Repo</a></p>
      <p className="small">All images and gifs are not mine. All media sources are written in the page source. (Right Click on the page and Click 'View Page Source'.) All credits to the respective owners.</p>
    </div>
    </footer>
  );
};

export default Footer;
