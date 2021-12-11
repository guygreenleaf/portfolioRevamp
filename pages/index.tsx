import type { NextPage} from 'next'
import Image from 'next/image'
import profilePic from '../public/me.jpg'
import styles from '../styles/Home.module.css'
import { Flex, Spacer } from '@chakra-ui/react'
import { Stack, HStack, VStack } from '@chakra-ui/react'


const Home: NextPage = () => {
  return (
    <Stack spacing={10} className={styles.containerDiv}>
      <Flex direction="row" align="center" justify="center">
        <div className={styles.cardContainer}>
          <div className={styles.cardOne} >
            <div className={styles.imageContainer}>
                <Image src={profilePic} 
                alt="me"
                width="80"
                height="80"
                />
              </div>
          </div>
          <div className={styles.cardOneText}>
            Hi there 👋 I'm Guy Greenleaf <br /> 🌊 SLO, California 
          </div>
        </div>
      </Flex>

  <Flex direction="row" align="center" justify="center">
     <div className={styles.cardOne} >
        Card Text
    </div>
  </Flex>


  </Stack>

    // <div className={styles.containerDiv} >
    //   <Flex direction="row" align="center" justify="center">
    //     <div className={styles.cardOne} >
    //         Card Text
    //     </div>
    //   </Flex>
    // </div>
  )
}

export default Home
