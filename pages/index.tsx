import type { NextPage} from 'next'
import {useState} from 'react';
import Image from 'next/image'
import Link from 'next/link'
import profilePic from '../public/me.jpg'
import styles from '../styles/Home.module.css'
import { Flex } from '@chakra-ui/react'
import { Stack } from '@chakra-ui/react'
import { motion } from "framer-motion"
import { Icon, IconButton } from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/react'

import { AiFillGithub } from 'react-icons/ai';
import {AiFillCamera} from 'react-icons/ai';

import {AiFillLinkedin} from 'react-icons/ai';
import {RiNewspaperFill} from 'react-icons/ri';
import {RiFolderOpenFill} from 'react-icons/ri';


const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
}

const variantSpinner = {
  hidden: { opacity: 0, x: 0, y: -100 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
}

const Home: NextPage = () => {

  let [loadingCircle, showLoadingCircle] = useState(false);

  let pageLoading = () => {
    showLoadingCircle(true);
  }

  if(loadingCircle){return (<div className={styles.containerDiv}>
   <motion.div
    variants={variantSpinner} // Pass the variant object into Framer Motion 
    initial="hidden" // Set the initial state to variants.hidden
    animate="enter" // Animated state to variants.enter
    exit="exit" // Exit state (used later) to variants.exit
    transition={{ type: 'linear', duration: 0.6 }} // Set the transition to linear
    className={styles.containerDiv}
    >
      <div className={styles.containerDiv}>
        <Flex direction="column" align="center" justify="center">
          <div className={styles.titleTextBlog}>
            Loading my photo log, just a sec...😄 📷
          </div>
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
          />
        </Flex>
      </div>
  </motion.div>
  </div>)}

  return (
          <Stack spacing={10} className={styles.containerDiv}>
            <motion.div
                variants={variants} // Pass the variant object into Framer Motion 
                initial="hidden" // Set the initial state to variants.hidden
                animate="enter" // Animated state to variants.enter
                exit="exit" // Exit state (used later) to variants.exit
                transition={{ type: 'linear', duration: 0.5 }} // Set the transition to linear
                className=""
            >
              <Flex direction="row" align="center" justify="center">
                <div className={styles.cardContainer}>
                  <div className={styles.cardOne} >
                    <div className={styles.imageContainer}>
                        <Image src={profilePic} 
                        alt="me"
                        width="80"
                        height="80"
                        layout="responsive"
                        />
                      </div>
                  </div>
                  <div className={styles.cardOneText}>
                    Hi there 👋 I&lsquo;m Guy <span className={styles.cityStateText}>Greenleaf</span> <br />  SLO, California🌊 
                  </div>
                </div>
              </Flex>
            </motion.div>

            <motion.div
            variants={variants} // Pass the variant object into Framer Motion 
            initial="hidden" // Set the initial state to variants.hidden
            animate="enter" // Animated state to variants.enter
            exit="exit" // Exit state (used later) to variants.exit
            transition={{ type: 'linear', duration: 0.75 }} // Set the transition to linear
            className=""
            >
              <Flex direction="row" align="center" justify="center" >
                <div className={styles.cardTwoContainer}>
                  <div className={styles.cardTwoText}>
                    Sometimes I make software. I like to tinker with things.
                  </div>
                  <div className={styles.cardTwoText}>
                    Currenly working for the <a href='https://slocounty.ca.gov/' className={styles.countyText}>county of SLO </a>as a Software Engineer. 
                  </div>
                </div>
              </Flex>
            </motion.div>


            <Link href="/blog" passHref>
              <motion.div
              variants={variants} // Pass the variant object into Framer Motion 
              initial="hidden" // Set the initial state to variants.hidden
              animate="enter" // Animated state to variants.enter
              exit="exit" // Exit state (used later) to variants.exit
              transition={{ type: 'linear', duration: 1 }} // Set the transition to linear
              className=""
              >
                <Flex direction="column" align="center" justify="center">
                  <div className={styles.cardBlogContainer}>
                    <div>
                      <Icon  boxSize="1.4em"  as={RiNewspaperFill}/>
                    </div>
                    <div className={styles.cardBlogText}>  
                      Blog
                    </div>
                  </div>
                </Flex>
              </motion.div>
            </Link>

            <div onClick={() => {pageLoading()}}>
              <Link href="/photography" passHref>
                <motion.div
                variants={variants} // Pass the variant object into Framer Motion 
                initial="hidden" // Set the initial state to variants.hidden
                animate="enter" // Animated state to variants.enter
                exit="exit" // Exit state (used later) to variants.exit
                transition={{ type: 'linear', duration: 1 }} // Set the transition to linear
                className=""
                >
                  <Flex direction="column" align="center" justify="center">
                    <div className={styles.cardBlogContainer}>
                      <div>
                        <Icon  boxSize="1.4em"  as={AiFillCamera}/>
                      </div>
                      <div className={styles.cardBlogText}>  
                        Photography Log
                      </div>
                    </div>
                  </Flex>
                </motion.div>
              </Link>
            </div>



            <Link  href="https://publicfilesggreenleaf.s3.us-west-1.amazonaws.com/resume21.pdf" passHref>
            <a target="_blank">
              <motion.div
              variants={variants} // Pass the variant object into Framer Motion 
              initial="hidden" // Set the initial state to variants.hidden
              animate="enter" // Animated state to variants.enter
              exit="exit" // Exit state (used later) to variants.exit
              transition={{ type: 'linear', duration: 1.25 }} // Set the transition to linear
              className=""
              >
                <Flex direction="column" align="center" justify="center">
                  <div className={styles.cardBlogContainer}>
                    <div>
                      <Icon  boxSize="1.4em"  as={RiFolderOpenFill}/>
                    </div>
                    <div className={styles.cardBlogText}>  
                      Résumé               
                    </div>
                  </div>
                </Flex>
              </motion.div>
              </a>
            </Link>


            <motion.div
                variants={variants} // Pass the variant object into Framer Motion 
                initial="hidden" // Set the initial state to variants.hidden
                animate="enter" // Animated state to variants.enter
                exit="exit" // Exit state (used later) to variants.exit
                transition={{ type: 'linear', duration: 1.50 }} // Set the transition to linear
                className=""
            >
              <Flex direction="row" align="center" justify="center">
                <div className={styles.cardThreeContainer}>
                  <div className={styles.cardThreeButtonContainer}>
                      <a href="https://github.com/guygreenleaf" >
                        <IconButton
                        colorScheme='blackAlpha'
                        aria-label='GitHub'
                        size='lg'
                        fontSize="40px"
                        icon={<Icon as = {AiFillGithub} />}
                        />
                      </a>
                  </div>
                  <div className={styles.cardThreeLinkedInContainer}>
                      <a href="https://www.linkedin.com/in/guy-greenleaf/" >
                        <IconButton
                        colorScheme='linkedin'
                        aria-label='GitHub'
                        size='lg'
                        fontSize="40px"
                        icon={<Icon as = {AiFillLinkedin} />}
                        />
                      </a>
                  </div>
                </div>
              </Flex>
          </motion.div>
        </Stack>
  )
}

export default Home
