import type { GetStaticProps, NextPage } from "next";
import Head from 'next/head'

const resume: NextPage = ({resumeURI}: any) => {  
    return(
        <div>
            <Head><title>Résumé</title></Head>
            <div>   
                <iframe style={{height:"100vh", width:"100vw"}} src={resumeURI}></iframe>
            </div>
        </div>
    ) 
};

export default resume;

export const getStaticProps: GetStaticProps = async(context) => {
    var blobLink:string  = `${process.env.NEXT_RESUME_BLOB_URI_PROD}`;
    var uri = "";

    //deprecated
    // const https = require("https");
    // const agent = new https.Agent({
    //   rejectUnauthorized: false
    // })
    //NOTE: For Debug, if needed, need to add agent as second param and @ts-ignore this line 
    const res = await fetch(blobLink);

    uri = await res.text();

    return {
      props: {
        resumeURI: uri
      },
      revalidate:86400 //revalidate every day
    }
  }
