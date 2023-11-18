import React, { useRef, useState, useEffect } from 'react';
import { submitComment } from '../services/index'

const CommentsForm = ({ slug }) => {
  const [error, setErrors] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const commentEl = useRef();
  const nameEl = useRef();
  const emailEl = useRef();
  const storeDataEl = useRef();

  useEffect(() => {
    nameEl.current.value = window.localStorage.getItem('name') || '';
    emailEl.current.value = window.localStorage.getItem('email') || '';
  }, []);

  const handleCommentSubmission = () => {
    setErrors(false);

    const comment = commentEl.current.value;
    const name = nameEl.current.value;
    const email = emailEl.current.value;
    const storeData = storeDataEl.current.checked;

    if (!comment || !name || !email) {
      setErrors(true);
      return;
    }

    const commentObj = {
      name,
      email,
      comment,
      slug,
    };

    if (storeData) {
      window.localStorage.setItem('name', name);
      window.localStorage.setItem('email', email);
    } else {
      window.localStorage.removeItem('name');
      window.localStorage.removeItem('email');
    }

    submitComment(commentObj)
      .then((res) => {
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      })
      .catch((error) => {
        console.error('Error submitting comment:', error);
        // Handle error if needed
      });
  };

  return (
    <div className='bg-gray-100 shadow-lg rounded-lg p-8 pb-20 mb-8'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>Leave a Comment</h3>
      <div className='grid grid-cols-1 gap-4 mb-4'>
        <textarea 
          ref={commentEl} 
          className='p-4 outline-none w-full rounded-lg
          focus:ring-2 focus:ring-gray-400 bg-gray-300 
                      text-gray-700'
          name='comment'
          placeholder='Comment'
        />
      </div>

      <div className='grid grid-cols-1 gap-4 mb-4'>
        <input
          type='text'
          ref={nameEl}
          className='py-2 px-4 outline-none w-full rounded-lg
          focus:ring-2 focus:ring-gray-400 bg-gray-300 
          text-gray-700'
          name='name'
          placeholder='Name'
        />
      </div>

      <div className='grid grid-cols-1 gap-4 mb-4'>
        <input
            type='text'
            ref={emailEl}
            className='py-2 px-4 outline-none w-full rounded-lg
            focus:ring-2 focus:ring-gray-400 bg-gray-300 
            text-gray-700'
            name='email'
            placeholder='Email'
          />
      </div>
      <div className='grid grid-cols-1 gap-4 mb-4'>
        <div>
          <input 
            ref={storeDataEl}
            type='checkbox'
            id='storeData'
            name='storeData'
          />
          <label className='text-gray-500 cursor-pointer ml-2' htmlFor='storeData'>Save Name and Email</label>
        </div>
      </div>
        {error && <p className='text-xs pb-3 text-red-500'>All Fields are required</p>}
        <div>
            <button 
            type='button' 
            onClick={handleCommentSubmission}
            className='transition duration-200 ease hover:bg-lime-800 cursor-pointer
            inline-block bg-yellow-600 text-lg rounded-full text-white px-8 py-3'
            >
              Post Comment
            </button>
            {showSuccessMessage && <span className='text-xl float-right overflow-hidden font-semibold mt-3 text-green-600'>Comment Submitted for review</span>}
        </div>
    </div>
  );
};

export default CommentsForm;
