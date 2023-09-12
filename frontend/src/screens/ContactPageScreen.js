import React, { useState } from 'react';
import FormContainer from '../components/FormContainer';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { FaPinterest,FaFacebook,FaEnvelope } from 'react-icons/fa';

const ContactPageScreen = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can implement the logic to send the form data here
    console.log(formData); // For demonstration purposes, log the form data
  };

  return (
    <div className="contact-page">
    <FormContainer className="contact-page">
      <Row >
        {/* Left Column: Contact Information */}
        <Col md={4} className='align-text-left'>
          
          <a href="mailto:example@gmail.com">
  <FaEnvelope className='icon'/>
</a>

          <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer">
          <FaFacebook className='icon'/>
         </a>
          
          <a href="https://pinterest.com/" target="_blank" rel="noopener noreferrer">
            <FaPinterest className='icon'/>
         </a>
         
           
        </Col>

        {/* Right Column: Contact Form */}
        <Col md={8} style={{marginTop: '30px'}}>
         
          <p>Join the Newsletter</p>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="my-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="my-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

           

            <Button type="submit">Submit</Button>
          </Form>
        </Col>
      </Row>
    </FormContainer>
    </div>
  );
};

export default ContactPageScreen;
