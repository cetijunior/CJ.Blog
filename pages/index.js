// pages/index.js
import React from 'react';
import Head from 'next/head';
import { PostCard, Categories, PostWidget, Header, Layout } from '../Components';
import { getPosts } from '../services';
import { FeaturedPosts } from '../sections';

export default function Home({ posts }) {

  return (
    <div>
      <Head>
        <title>CA.Blog</title>
      </Head>
      <div className='container mx-auto px-10 mb-8'>
        <FeaturedPosts />
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
          <div className='lg:col-span-8 col-span-1'>
            {posts.map((post) => (
              <PostCard post={post.node} key={post.node.title} />
            ))}
          </div>
          <div className='lg:col-span-4 col-span-1'>
            <div className='lg:sticky relative top-8'>
              <PostWidget categories={undefined} slug={undefined} />
              <Categories />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const posts = (await getPosts()) || [];

  return {
    props: { posts },
  };
}

