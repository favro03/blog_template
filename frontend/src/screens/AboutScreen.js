import React from 'react';

const AboutScreen = () => {
  return (
    <div className="about-page">
      <header className="about-header">
        <h1>About Us</h1>
      </header>

      <div className="about-content">
        <section className="about-section">
          <h2>Our Blog</h2>
          <p>Welcome to <strong>Your Blog Name</strong>, a place where we share our thoughts, ideas, and knowledge on various topics. Our mission is to provide valuable content to our readers and create a community of like-minded individuals.</p>
        </section>

        <section className="about-section">
          <h2>Our Team</h2>
          <p>We are a team of passionate writers and experts in our respective fields. Our goal is to deliver informative and engaging articles that inspire and educate our readers.</p>
        </section>

        <section className="about-section">
          <h2>Contact Us</h2>
          <p>If you have any questions, feedback, or would like to collaborate with us, please feel free to contact us at <a href="mailto:contact@yourblogname.com">contact@yourblogname.com</a>.</p>
        </section>
      </div>
    </div>
  );
};

export default AboutScreen;
