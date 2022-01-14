import type { NextPage} from 'next'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Image from 'next/image'
import Link from 'next/link'
import profilePic from '../public/me.jpg'
import styles from '../styles/Home.module.css'
import { Flex } from '@chakra-ui/react'
import { Stack } from '@chakra-ui/react'
import { motion } from "framer-motion"

const variants = {
    hidden: { opacity: 0, x: 0, y: -150 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
  }

  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  export const formatDate = (ts: number) => {
      return new Date(ts).toLocaleDateString('en-US', options as any);
  };


const Blog: NextPage = ({posts}:any) => {
    return (
              <Stack spacing={10} className={styles.containerDivBlog}>
                  <motion.div
                      variants={variants} // Pass the variant object into Framer Motion 
                      initial="hidden" // Set the initial state to variants.hidden
                      animate="enter" // Animated state to variants.enter
                      exit="exit" // Exit state (used later) to variants.exit
                      transition={{ type: 'linear', duration: 0.9 }} // Set the transition to linear
                  >
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
                        </div>                     
                        {posts.map((post:any) =>(
                          <Link key={post.slug} href={"/blog/" + post.slug} passHref>
                            <div key={post.slug} className={styles.blogCardContainer}>
                              
                                <div className='thumbnail' >
                                  <style jsx>{`
                                    .thumbnail {
                                      background-image: ${"url(" + post.frontmatter.cover_image + ")"};
                                      max-width:100%;
                                      min-width:35%;
                                      background-size: cover;
                                      background-position: 50%;
                                      border-radius:12px;
                                    }

                                    @media only screen and (max-width: 1000px){
                                      .thumbnail {
                                        width: 100%;
                                        height: 120px;
                                        background-size: cover;
                                        background-position: 50%;
                                        border-radius:12px;
                                      }
                                    }
                                  `}</style>                             
                                </div>
                                <div className={styles.blogMetaContainer}>
                                  <div className={styles.blogTitleText}>{post.frontmatter.title}</div>
                                  <div className={styles.blogSummaryText}>{post.frontmatter.summary}</div>
                                  <div className={styles.blogDate}>{formatDate(post.frontmatter.published)} </div>
                                  <div className={styles.blogTags}>                                  
                                    {post.frontmatter.tags.map((tag:any) => (                                    
                                      <a key={tag} className={styles.blogTag} href={"/blog?tag=" + tag}>{tag}</a>                              
                                    ))}                                  
                                  </div>
                                </div>
                            </div>
                          </Link>
                        ))}            
                    </Flex>
                  </motion.div>
                </Stack>
    );
}

export default Blog;

export async function getStaticProps(){
  //Get files from posts dir
  const files = fs.readdirSync(path.join('public/blogposts'))
  //Get slug + frontmatter
  const posts = files.map(filename => {
    //slug 
  const slug = filename.replace('.md', '');
    //fm
  const markdownWithMeta = fs.readFileSync(path.join('public/blogposts/', filename), 'utf-8');
  const {data:frontmatter} = matter(markdownWithMeta)
   
  return{
    slug,
    frontmatter  
  }})

  return{
    props:{
      posts,
    }
  }
}