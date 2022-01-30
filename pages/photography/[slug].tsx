import type { NextPage} from 'next'
import {useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import profilePic from '../../public/me.jpg'
import styles from '../../styles/Home.module.css'
import { Flex } from '@chakra-ui/react'
import { Stack } from '@chakra-ui/react'
import { motion } from "framer-motion"
import { ArrowBackIcon } from '@chakra-ui/icons'
import { Spinner } from '@chakra-ui/react'


import { getFolderImages } from '../../lib/cloudinary';

const variants = {
    hidden: { opacity: 0, x: 0, y: -150 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
  }

const variantSpinner = {
    hidden: { opacity: 0, x: 0, y: -100 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
  }


  function ParseFolderName(folderName:string){
    let monthAbrev:string = folderName[0] + folderName[1] + folderName[2];
    let monthname:string = '';
    switch (monthAbrev) {
        case 'Jan':
            monthname = 'January'
            break;

          case 'Feb':
              monthname = 'February'
          break;

          case 'Mar':
              monthname = 'March'
          break;

          case 'Apr':
              monthname = 'April'
          break;
          
          case 'May':
              monthname = 'May'
          break;

          case 'Jun':
              monthname = 'June'
          break;

          case 'Jul':
              monthname = 'July'
          break;

          case 'Aug':
              monthname = 'August'
          break;
          
          case 'Sep':
              monthname = 'September'
          break;

          case 'Oct':
              monthname = 'October'
          break;


          case 'Nov':
          monthname = 'November'
          break;
                  
          case 'Dec':
              monthname = 'December'
              break;
                                      
        default:
            monthname='ERROR PARSING NAME'
            break;
      
    }

    let monthDate:string = folderName[3] + folderName[4];

    let monthYear:string = folderName[5] + folderName[6] + folderName[7] + folderName[8];

    return `${monthname} ${monthDate}, ${monthYear}`;

}



const PhotosPage: NextPage = ({photos}:any) => {
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
      <Stack spacing={2} className={styles.photoWrapper}>
      <Flex direction="column" align="center" justify="center">

      {/* Back Button + Prof Pic */}
        <Link href="/photography" passHref>
          <div className={styles.topLeftHome} onClick={() => {pageLoading()}}>
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


   {/* images */}
      <motion.div
                      variants={variants} // Pass the variant object into Framer Motion 
                      initial="hidden" // Set the initial state to variants.hidden
                      animate="enter" // Animated state to variants.enter
                      exit="exit" // Exit state (used later) to variants.exit
                      transition={{ type: 'linear', duration: 0.9 }} // Set the transition to linear
                  >
                      <div className={styles.folderNameContainer}>
                        <div className={styles.folderName}>
                            {ParseFolderName(photos[0].folder)}
                        </div> 
                    </div>
                        <div className={styles.cloudFoldersContainer}>                           
                            {photos.map((image:any) => {                       
                            return (                               
                                <>                              
                                <Link href={`${image.url}`}  passHref>
                                <a target="_blank" className={styles.aref}>
                                    <div key={image.asset_id} className={styles.cloudImages}>    
                                        <div className={styles.cloudImageThumbnails}>                                           
                                            <Image src={image.url}
                                            alt="folderURI"
                                            height="100"
                                            width="100"
                                            layout="responsive"
                                            priority
                                            ></Image>
                                        </div>
                                    </div>
                                    </a>  
                                </Link>                                                            
                                </>                     
                            )                            
                            })}
                        </div>           
        </motion.div>
      </Flex>
      </Stack>
    );
}

export default PhotosPage;


export async function getServerSideProps(context:any){
  return {
      props: { 
         photos: await getFolderImages(context.query.slug),//pass it to the page props
      }
  }
}
