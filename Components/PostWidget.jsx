/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Link from 'next/link';
import { getSimilarPosts, getRecentPosts } from '../services';
import Image from 'next/image';

const PostWidget = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((result) => {
        setRelatedPosts(result);
      });
    } else {
      getRecentPosts().then((result) => {
        setRelatedPosts(result);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  return (
    <div className='bg-gray-100 shadow-lg rounded-lg p-8 mb-8'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
        {slug ? 'Related Posts' : 'Recent Posts'}  
      </h3>
      {relatedPosts.map((post) => (
        <div key={post.title} className='flex items-center w-full mb-4'>
           <div className='w-16 flex-none'>
              <Image 
                src={post.featuredImage.url}
                alt={post.title}
                height={100}
                width={100}
                className='align-middle rounded-full'
              />
           </div>
           <div className='flex-grow ml-4'>
              <p className='text-gray-500 font-xs'>
                {moment(post.createdAt).format('MMM DD, YYYY')}
              </p>
              <Link href={`/post/${post.slug}`} key={post.title} className='text-md'>
                {post.title}
              </Link>
           </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidget;
