import type { NextPage} from 'next'
import Image from 'next/image'
import Link from 'next/link'
import profilePic from '../public/me.jpg'
import styles from '../styles/Home.module.css'
import { Flex } from '@chakra-ui/react'
import { Stack } from '@chakra-ui/react'
import { motion } from "framer-motion"
import { Icon, IconButton } from '@chakra-ui/react'

import { AiFillGithub } from 'react-icons/ai';
import {AiFillLinkedin} from 'react-icons/ai';
import {RiNewspaperFill} from 'react-icons/ri';
import {RiFolderOpenFill} from 'react-icons/ri';
import dbConnect from './api/util/dbConnect'
import BlogPost from '../models/BlogPost'


const variants = {
    hidden: { opacity: 0, x: 0, y: -150 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
  }



const Blog: NextPage = ({posts}:any) => {
    return (
<Stack spacing={10} className={styles.containerDivBlog}>
      <motion.div
          variants={variants} // Pass the variant object into Framer Motion 
          initial="hidden" // Set the initial state to variants.hidden
          animate="enter" // Animated state to variants.enter
          exit="exit" // Exit state (used later) to variants.exit
          transition={{ type: 'linear', duration: 0.9 }} // Set the transition to linear
          className=""
      >
          {console.log(posts)}
        <Flex direction="column" align="center" justify="center">

            <div className={styles.cardOneBlog} >
                <Link href="/" passHref>
              <div className={styles.imageContainerBlog}>
                  <Image src={profilePic} 
                  alt="me"
                  width="80"
                  height="80"
                  layout="responsive"
                  
                  />
                </div>
                </Link>
            </div>
            <div className={styles.cardOneTextBlog}>
              Guy&apos;s Blog
            </div>
            <div className={styles.cardOneTextLowerBlog}>
              Welcome to my blog! This is a space where I share experiences I have with coding, photography, life events, etc.
              I hope you find something interesting!
            </div>

            <div className={styles.cardOneTextLowerBlogTwo}>
                Under construction, coming soon! ^.^
            </div>
        </Flex>
      </motion.div>

      </Stack>

    );
}


export async function getServerSideProps(){
    await dbConnect();

    const result = await BlogPost.find({});

    const posts = result.map((doc) =>{
        const post = doc.toObject();
        post._id = post._id.toString();
        return post;

    });

    return {props: {posts:posts}};

}


export default Blog;