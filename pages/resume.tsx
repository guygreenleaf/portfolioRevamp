import type { GetStaticProps, NextPage } from "next";
import Head from 'next/head'

let resume: NextPage = ({resumeURI}: any) => {  
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

export let getStaticProps: GetStaticProps = async(context) => {
    var blobLink:string  = "";
    var uri = "";
    
    let https = require("https");
    let agent = new https.Agent({
      rejectUnauthorized: false
    })

    if(process.env.NODE_ENV == "development"){
        blobLink = `${process.env.NEXT_RESUME_BLOB_URI_DEV}`;
    } else {     
        blobLink = `${process.env.NEXT_RESUME_BLOB_URI_PROD}`;
    }
    //NOTE: For Debug, need to add agent as second param and @ts-ignore this line 
    const res = await fetch(blobLink);

    uri = await res.text();

    return {
      props: {
        resumeURI: uri
      },
      revalidate:86400 //revalidate every day
    }
  }