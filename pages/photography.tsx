import type { NextPage} from 'next'
import React, {useState, Fragment} from 'react';
import Image from 'next/image'
import Link from 'next/link'
import profilePic from '../public/me.jpg'
import styles from '../styles/Home.module.css'
import { Flex } from '@chakra-ui/react'
import { Stack } from '@chakra-ui/react'
import { motion } from "framer-motion"
import { Spinner } from '@chakra-ui/react'

import {getFolders, getFolderThumbs } from '../lib/cloudinary';

// cloudinary.v2.api.resources(function(error:string, result:string) {console.log(result, error); });



function handleOnFolderClick(e:any) {
    const folderPath = e.target.dataset.folderPath;
    //console.log(folderPath);
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

  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  export const formatDate = (ts: number) => {
      return new Date(ts).toLocaleDateString('en-US', options as any);
  };


const Photography: NextPage = ({folders, images}:any) => {
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
                 Loading photos, just a sec...???? ????
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

    //console.log(images);
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
                        <div className={styles.titleTextBlog}>
                          Guy&apos;s Photography Log
                        </div>
                        <div className={styles.cardOneTextLowerBlog}>
                          Welcome to my photo log! This is a space where I share adventures I have and the photography associated with them. Enjoy!
                        </div>                  
                        

                        <div className={styles.cloudFoldersContainer}>
                            
                            {folders.map((folder:any) => {
                        
                            return (
                                
                                <React.Fragment key={folder.path} >
                                <Link href={{
                                    pathname: `/photography/[id]`,
                                    query: { 
                                        id: folder.name,
                                        date:ParseFolderName(folder.name)
                                    }
                                    }} as={`/photography/${folder.name}`} passHref key={folder.path} >
                                    <div className={styles.cloudFolders} onClick={() => {pageLoading()}}>    
                                        <div className={styles.cloudFolderThumbnails}>                                           
                                            <Image src={folder.imageUrl}
                                            alt="folderURI"
                                            height="100"
                                            width="100"
                                            layout="responsive"
                                            blurDataURL='https://images.freeimages.com/images/large-previews/bdb/free-blurry-background-1636594.jpg'
                                            priority
                                            ></Image>
                                        </div>
                                        <div className={styles.cloudFolderNames}> 
                                            {ParseFolderName(folder.name)}
                                        </div>
                                    </div>
                                </Link>                                
                                </React.Fragment>                     
                            )                            
                            })}
                        </div>
                    </Flex>
                  </motion.div>
                </Stack>
    );
}

export default Photography;

export async function getServerSideProps(){
    
    const {folders} = await getFolders();

    const images:any = [];

    for(const link of folders){
        const uri = await getFolderThumbs(link.name);
        link["imageUrl"] = uri;
        images.push(uri);
    }
        
    return {
        props: { 
            folders,
            images
        }
    }
}