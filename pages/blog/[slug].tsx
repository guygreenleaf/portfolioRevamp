import type { NextPage} from 'next'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import marked from 'marked'
import Image from 'next/image'
import Link from 'next/link'
import profilePic from '../../public/me.jpg'
import styles from '../../styles/Home.module.css'
import { Flex } from '@chakra-ui/react'
import { Stack } from '@chakra-ui/react'
import { motion } from "framer-motion"
import { ArrowBackIcon } from '@chakra-ui/icons'


const variants = {
    hidden: { opacity: 0, x: 0, y: -150 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
  }


const PostPage: NextPage = ({frontmatter: {title, published, cover_image, live}, slug, content}:any) => {
  console.log(cover_image);
   cover_image = "/" + cover_image;

    return (
      <Stack spacing={2} className={styles.blogWrapper}>
      <Flex direction="column" align="center" justify="center">

      {/* Back Button + Prof Pic */}
        <Link href="/blog" passHref>
          <div className={styles.topLeftHome}>
            <ArrowBackIcon w={8} h={8} color='white' className={styles.hoverArrow}></ArrowBackIcon>
              <div className={styles.topRightImageContainer}>
                <Image src={profilePic} 
                                      alt="me"
                                      width="60"
                                      height="60"
                                      layout="fixed" 
                                      priority                            
                /> 
            </div>      
          </div>
        </Link>


   {/* blog posting */}
      <motion.div
                      variants={variants} // Pass the variant object into Framer Motion 
                      initial="hidden" // Set the initial state to variants.hidden
                      animate="enter" // Animated state to variants.enter
                      exit="exit" // Exit state (used later) to variants.exit
                      transition={{ type: 'linear', duration: 0.9 }} // Set the transition to linear
                      className=""
                  >
      <div className={styles.blogContentContainer}>
          <div className={styles.slugImageContainer}> 
             <Image src={cover_image}
                alt="me"
                layout="fill"
                className={styles.image}
                priority
          /> 
           </div>


        <div className={styles.metaCardContainer}>
          <h1 style={{color:'black', fontWeight:'bold', fontSize:'20px'}}>{title}</h1>
          <h2 style={{opacity:'0.5'}}>{formatDate(published)}</h2>
        </div>

        {live ? <>
        <div style={{color:'whitesmoke'}}>
          {content}
        </div>
        </> : <h1 style={{color:'white', textAlign:'center', fontSize:'20px', marginTop:'20px;', fontWeight:'bold'}}>Coming soon!</h1>}

      </div>
            
        </motion.div>
      </Flex>
      </Stack>
    );
}

export default PostPage;

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('public/blogposts'))
  const paths = files.map(filename => ({
    params: {
      slug: filename.replace('.md', '')
    }
  }))

  return{
    paths,
    fallback: false
  }
}


export async function getStaticProps({params: {slug}}:any) {
  const markdownWithMeta = fs.readFileSync(path.join('public/blogposts/', slug + '.md'), 'utf-8');
  const {data:frontmatter, content} = matter(markdownWithMeta)

  return {
    props: {
      frontmatter,
      slug,
      content
    },
  }
}

const options = { year: 'numeric', month: 'long', day: 'numeric' };

export const formatDate = (ts: number) => {
    return new Date(ts).toLocaleDateString('en-US', options as any);
};

