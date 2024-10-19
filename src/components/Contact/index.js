import React, { useState, useRef } from 'react'
import styled from 'styled-components'
// import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Snackbar } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
position: relative;
z-index: 1;
align-items: center;
@media (max-width: 960px) {
    padding: 0px;
}
`

const Wrapper = styled.div`
position: relative;
display: flex;
justify-content: space-between;
align-items: center;
flex-direction: column;
width: 100%;
max-width: 1350px;
padding: 0px 0px 80px 0px;
gap: 12px;
@media (max-width: 960px) {
    flex-direction: column;
}
`

const Title = styled.div`
font-size: 42px;
text-align: center;
font-weight: 600;
margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
      margin-top: 12px;
      font-size: 32px;
  }
`;

const Desc = styled.div`
    font-size: 18px;
    text-align: center;
    max-width: 600px;
    color: ${({ theme }) => theme.text_secondary};
    @media (max-width: 768px) {
        margin-top: 12px;
        font-size: 16px;
    }
`;


const ContactForm = styled.form`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.card};
  padding: 32px;
  border-radius: 16px;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  margin-top: 28px;
  gap: 12px;
`

const ContactTitle = styled.div`
  font-size: 24px;
  margin-bottom: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`

const ContactInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`

const ContactInputMessage = styled.textarea`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`

const ContactButton = styled.input`
  width: 100%;
  text-decoration: none;
  text-align: center;
  background: hsla(271, 100%, 50%, 1);
  background: linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
  background: -moz-linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
  background: -webkit-linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
  padding: 13px 16px;
  margin-top: 2px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  font-weight: 600;
`



const Contact = () => {

  //hooks
  const [open, setOpen] = useState(false);
  const form = useRef();

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   emailjs
  //     .sendForm('service_2xuf074', 'template_ldhh5uc', form.current, 'Y-AM2ot_qCynvbSdf') // Use Public Key
  //     .then(
  //       () => {
  //         console.log('SUCCESS!');
  //         setOpen(true); 
  //         form.current.reset(); 
  //       },
  //       (error) => {
  //         console.log('FAILED...', error.text);
  //       },
  //     );
  // };
  const formik = useFormik({
    initialValues: {
      from_email: '',
      from_name: '',
      subject: '',
      message: ''
    },
    validationSchema: Yup.object({
      from_email: Yup.string()
        .email('Invalid email address..!')
        .required('required..!'),
      from_name: Yup.string()
      .required('required..!'),
      subject: Yup.string()
      .required('required..!'),
      message: Yup.string()
      .required('required..!'),
    }),
    validateOnChange: true,   // Enable validation on field change
    validateOnBlur: true, 
    onSubmit: (values, { resetForm }) => {
      emailjs
        .sendForm('service_2xuf074', 'template_ldhh5uc', form.current, 'Y-AM2ot_qCynvbSdf')
        .then(
          () => {
            console.log('SUCCESS!');
            setOpen(true);
            resetForm(); 
          },
          (error) => {
            console.log('FAILED...', error.text);
          }
        );
    }
  });


  return (
    <Container id='contact'>
      <Wrapper>
        <Title >Contact</Title>
        <Desc>Feel free to reach out to me for any questions or opportunities!</Desc>
        <ContactForm ref={form} onSubmit={formik.handleSubmit}>
        {/* <form ref={form} onSubmit={formik.handleSubmit}> */}
          <ContactTitle>Email Me 🚀</ContactTitle>
          {/* <ContactInput placeholder="Your Email" name="from_email" />
          <ContactInput placeholder="Your Name" name="from_name" />
          <ContactInput placeholder="Subject" name="subject" />
          <ContactInputMessage placeholder="Message" rows="4" name="message" /> */}
          <ContactInput
            placeholder="Your Email"
            name="from_email"
            value={formik.values.from_email}  
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.from_email && formik.errors.from_email ? (
            <div style={{ color: 'red' }}>{formik.errors.from_email}</div>
          ) : null}

          <ContactInput
            placeholder="Your Name"
            name="from_name"
            value={formik.values.from_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.from_name && formik.errors.from_name ? (
            <div style={{ color: 'red' }}>{formik.errors.from_name}</div>
          ) : null}

          <ContactInput
            placeholder="Subject"
            name="subject"
            value={formik.values.subject}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.subject && formik.errors.subject ? (
            <div style={{ color: 'red' }}>{formik.errors.subject}</div>
          ) : null}

          <ContactInputMessage
            placeholder="Message"
            rows="4"
            name="message"
            value={formik.values.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.message && formik.errors.message ? (
            <div style={{ color: 'red' }}>{formik.errors.message}</div>
          ) : null}
          <ContactButton type="submit" value="Send" disabled={!formik.isValid || formik.isSubmitting} style={{cursor:'pointer'}}/>
          {/* <ContactButton type="submit" value="Send" /> */}
        {/* </form> */}
        </ContactForm>

        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
          message="Email sent successfully!"
          severity="success"
        />
      </Wrapper>
    </Container>
  )
}

export default Contact