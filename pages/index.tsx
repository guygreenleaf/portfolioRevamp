import type { NextPage} from 'next'
import React, {useState, useRef} from 'react';
import Image from 'next/image'
import Link from 'next/link'
import profilePic from '../public/me.jpg'
import styles from '../styles/Home.module.css'
import { Flex, Box } from '@chakra-ui/react'
import { Stack } from '@chakra-ui/react'
import { motion } from "framer-motion"
import { Icon, IconButton } from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/react'
import { AiFillGithub } from 'react-icons/ai';
import {AiFillCamera} from 'react-icons/ai';
import {AiFillLinkedin} from 'react-icons/ai';
import {RiNewspaperFill} from 'react-icons/ri';
import {RiFolderOpenFill} from 'react-icons/ri';
import { useToast } from '@chakra-ui/react'
import cameraIco  from '../media/camera.png';
import contract from '../media/contract.png'
import email  from '../media/email.png';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button
} from '@chakra-ui/react'
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'quill/dist/quill.snow.css'; // Add css for snow theme
import { SMTPClient } from 'emailjs';
import ReCAPTCHA from "react-google-recaptcha";
import * as emailjs from 'emailjs-com'


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
  const [emailMessage, setEmailMessage] = useState('');
  const [isModalOpen, changeModalOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [from, setFrom] = useState('');
  const [fromEmail, setFromEmail] = useState('');
  let [validationErrors, setValidationErrors] = useState<string[]>([]);

  const recaptchaRef:any = React.createRef();

  const [isPreviewing, setPreviewing] = useState(false);

  let previewChangeHandler = () => {

    if(isPreviewing === false){
      setValidationErrors([]);
      if(verifyEmail() === true){
        setPreviewing(true);
      }
      return;
    }   

    recaptchaRef.current.reset();
    resetState();
    setPreviewing(false);
  }

  let modalChangeHandler = () => {
    changeModalOpen(!isModalOpen);
  }

  let onModalClose = () => {
    setEmailMessage('');
    changeModalOpen(false);
  }

  let nameChangeHandler = (e:any) => {  
    e.preventDefault();
    setFrom(e.target.value);
  }

  let emailChangeHandler = (e:any) => {  
    e.preventDefault();
    setFromEmail(e.target.value);
  }

  let resetState = () => {
    setIsVerified(false);
    setFrom('');
    setFromEmail('');
    setEmailMessage('');
  }

  const onReCAPTCHAChange = (captchaCode:any) => {
    if(!captchaCode) {
      return;
    }
    setIsVerified(true);
    recaptchaRef.current.reset();
  }

  let verifyEmail = ():boolean => {
    var isValid = true;

    setValidationErrors([]);

    if(emailMessage.length === 0){
      setValidationErrors(curr => [...curr, "Please enter a message."]);
      isValid = false;
    }
    if(from.length === 0){
      setValidationErrors(curr => [...curr, "Please enter your name."]);
      isValid = false;
    }
    if(fromEmail.length === 0 || !fromEmail.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )){
        setValidationErrors(curr => [...curr, "Please enter a valid email address."]);
      isValid = false;
    }
    return isValid;
  };

  const toast:any = useToast()

  function sendEmail() {
    const templateParams = {
      from_name: from,
      from_email: fromEmail,
      to_name: 'Guy Greenleaf',
      message: emailMessage,
    }

    if(isVerified && verifyEmail()===true) {
      console.log("AAA!!!")
      emailjs.send(
        process.env.NEXT_PUBLIC_SERVICE_ID ?? 'error',
        process.env.NEXT_PUBLIC_TEMPLATE_ID ?? 'error',
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID
      )
        .then((result:any) => {
          if(result.text === "OK"){
            
            resetState();
            setPreviewing(false);
            changeModalOpen(false);

            toast({
              title: 'Email Sent!',
              description: "I'll reach out to you soon!",
              status: 'success',
              duration: 9000,
              isClosable: true,
            })
          }
         
        }, (error:any) => {
          toast({
            title: `Error sending email - ${error}.`,
            description: "Please Contact Me - contact@guygreenleaf.com.",
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
        });
      } else {
        validationErrors.forEach(element => {
          toast({
            title: 'Error Sending Email.',
            description: `Error - ${element}`,
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
        });
      }
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
                    Thanks for stopping by. I like to tinker with things and take cool photos.
                  </div>
                  <div className={styles.cardTwoText}>
                    I&apos;m currently working for the <a href='https://slocounty.ca.gov/' target="_blank" rel="noreferrer" className={styles.countyText}>county of SLO </a>as a Software Engineer. 
                  </div>
                </div>
              </Flex>
            </motion.div>


            {/* <Link href="/blog" passHref>
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
            </Link> */}

            <div >
              <a href="https://www.flickr.com/photos/195923393@N02/" rel="noopener noreferrer" target="_blank">
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
                      <div style={{marginBottom: '5px'}}>
                        <Image src={cameraIco} alt="FlickerLogo" height="40px" width="40px">
                        </Image>
                      </div>
                      <div className={styles.cardBlogText}>  
                      Photography 
                      </div>
                    </div>
                  </Flex>
                </motion.div>
              </a>
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
                      <Image src={contract} alt="ResumeIcon" height="40px" width="40px">
                      </Image>
                    </div>
                    <div className={styles.cardBlogText}>  
                      Résumé               
                    </div>
                  </div>
                </Flex>
              </motion.div>
              </a>
            </Link>

            <div onClick={() => modalChangeHandler()}>           
              <motion.div
              variants={variants} // Pass the variant object into Framer Motion 
              initial="hidden" // Set the initial state to variants.hidden
              animate="enter" // Animated state to variants.enter
              exit="exit" // Exit state (used later) to variants.exit
              transition={{ type: 'linear', duration: 1.5 }} // Set the transition to linear
              className=""
              >
                <Flex direction="column" align="center" justify="center">
                  <div className={styles.cardBlogContainer}>
                    <div style={{marginBottom: '5px'}}>
                      <Image src={email} alt="FlickerLogo" height="40px" width="40px">
                      </Image>
                    </div>
                    <div className={styles.cardBlogText}>  
                    Contact
                    </div>
                  </div>
                </Flex>
              </motion.div>     
            </div>


            <motion.div
                variants={variants} // Pass the variant object into Framer Motion 
                initial="hidden" // Set the initial state to variants.hidden
                animate="enter" // Animated state to variants.enter
                exit="exit" // Exit state (used later) to variants.exit
                transition={{ type: 'linear', duration: 1.75 }} // Set the transition to linear
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

      <Modal isOpen={isModalOpen} onClose={onModalClose} size="xl">
        <ModalOverlay />
        <ModalContent>

          {isPreviewing===false ? 
          <div>
            <ModalHeader>Send Me An Email</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <div style={{marginBottom:'1rem'}}>
              {validationErrors.length > 0 && (<h5 style={{textDecoration:"underline", fontWeight:"bold", color:'red'}}>Please resolve the following:</h5>)}           
              {validationErrors.map((err:string, index:number) => {return (<p style={{color:'red'}} key={index}>{err}</p>)})}
            </div>
            <div style={{display:"flex", flexDirection:"row", marginBottom:'1rem'}}>
              <div style={{width:'5rem'}}><span style={{float:'right'}}>Your Name</span></div>
              <input type="text" placeholder='Your Name' style={{marginLeft:'1rem', border:'1px solid black', borderRadius:'4px', width:'80%'}} value={from} onChange={nameChangeHandler}></input>
            </div>
            <div style={{display:"flex", flexDirection:"row", marginBottom:'1rem'}}>
              <div style={{width:'5rem'}}><span style={{float:'right'}}>Your Email</span></div>
              <input type="text" placeholder='Your Email' style={{marginLeft:'1rem', border:'1px solid black', borderRadius:'4px', width:'80%'}} value={fromEmail} onChange={emailChangeHandler}></input>
            </div>
              <div style={{"height": "18rem"}}>
                {/* @ts-ignore */}
                <ReactQuill theme="snow" value={emailMessage} onChange={setEmailMessage} style={{"height": "15rem"}}/>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='green' mr={0} onClick={() => previewChangeHandler()}>Preview & Send</Button>
            </ModalFooter>
          </div> 
          :   
          <div>
            <ModalHeader>Send Me An Email</ModalHeader>
            <ModalCloseButton />
            <ModalBody>        
              <div style={{border:"solid 1px black", borderRadius: "7px"}}>
                {/* @ts-ignore */}
                <ReactQuill
                  value={emailMessage}
                  readOnly={true}
                  theme={"bubble"}
                />
              </div>
              <div>          
                <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY : 'error'}                   
                    onChange={onReCAPTCHAChange}
                    
                  />
              </div>
              <Box mt="4">
                </Box>
            </ModalBody>           
            <ModalFooter>
              <Button colorScheme='yellow' mr={3} onClick={() => previewChangeHandler()}>Back</Button>
              <Button colorScheme='green' mr={0} onClick={sendEmail}>Send</Button>
            </ModalFooter>
          </div>
          }        
        </ModalContent>
      </Modal>
    </Stack>
  )
}

export default Home
