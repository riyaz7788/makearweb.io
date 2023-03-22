import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

import { styles } from '../styles';
import { EarthCanvas } from './canvas';
import { SectionWrapper } from '../hoc';
import { slideIn } from '../utils/motion';

const Contact = () => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.send(
      'service_lqpyxd1', 
      'template_3ty9whb', 
      {
        from_name: form.name,
        to_name: 'Eugene',
        from_email: form.email,
        to_email: 'fromzpcity@gmail.com',
        message: form.message
      },
      'kk5oM2vPMYsBD367x'
      ).then(() => {
        setLoading(false);
        alert("Thank you for letter");

        setForm({
          name: '',
          email: '',
          message: '',
        });
      }, (error) => {
        setLoading(false);
        console.log(error);
        alert("Something went wrong..");
      });
  };

  return (
    <div className='xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden'>
      <motion.div
        variants={slideIn('left', 'tween', 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form ref={formRef} onSubmit={handleSubmit} className="mt-12 flex flex-col gap-8">
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Name</span>
            <input
              type="text" name="name" placeholder="What's your name?"
              onChange={handleChange}
              value={form.name} 
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white 
                rounded-lg outlined-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Email</span>
            <input
              type="text" name="email" placeholder="What's your email?"
              onChange={handleChange}
              value={form.email} 
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white 
                rounded-lg outlined-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Message</span>
            <textarea
              name="message" placeholder="What's your message?" rows={7}
              onChange={handleChange}
              value={form.message} 
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white 
                rounded-lg outlined-none border-none font-medium'
            ></textarea>
          </label>

          <button 
            type="submit" 
            className='bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold 
            shadow-md shadow-primary rounded-xl'
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn('right', 'tween', 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
}

export default SectionWrapper(Contact, "contact");