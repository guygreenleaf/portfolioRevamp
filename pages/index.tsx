import type { NextPage} from 'next'
import Image from 'next/image'
import profilePic from '../public/me.jpg'
import styles from '../styles/Home.module.css'
import { Flex } from '@chakra-ui/react'
import { Stack } from '@chakra-ui/react'
import { motion } from "framer-motion"
import { Icon, IconButton } from '@chakra-ui/react'
import { AiFillGithub } from 'react-icons/ai';
import {AiFillLinkedin} from 'react-icons/ai';

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
}


const Home: NextPage = () => {
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
      transition={{ type: 'linear', duration: 1 }} // Set the transition to linear
      className=""
      >
        <Flex direction="row" align="center" justify="center">
          <div className={styles.cardTwoContainer}>
            <div className={styles.cardTwoText}>
              Sometimes I make software. I like to tinker with things.
            </div>
            <div className={styles.cardTwoText}>
              Currenly working for the county of SLO as a Software Engineer. 
            </div>
          </div>
        </Flex>
      </motion.div>

      <motion.div
          variants={variants} // Pass the variant object into Framer Motion 
          initial="hidden" // Set the initial state to variants.hidden
          animate="enter" // Animated state to variants.enter
          exit="exit" // Exit state (used later) to variants.exit
          transition={{ type: 'linear', duration: 1.25 }} // Set the transition to linear
          className=""
      >
        <Flex direction="row" align="center" justify="center">
          <div className={styles.cardThreeContainer}>
            <div className={styles.cardThreeButtonContainer}>
                <a href="https://github.com/guygreenleaf" >
                  <IconButton
                  colorScheme='blackAlpha'
                  aria-label='GitHub'
                  size='md'
                  icon={<Icon as = {AiFillGithub} />}
                  />
                </a>
            </div>
            <div className={styles.cardThreeLinkedInContainer}>
                <a href="https://www.linkedin.com/in/guy-greenleaf/" >
                  <IconButton
                  colorScheme='linkedin'
                  aria-label='GitHub'
                  size='md'
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
