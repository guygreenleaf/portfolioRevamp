import type { GetServerSideProps, NextPage } from "next";

const Resume: NextPage = ({resumeURI}: any) => {  
    return(
        <div>
            <div>   
                <iframe style={{height:"100vh", width:"100vw"}} src={resumeURI}></iframe>
            </div>
        </div>
    ) 
};

export default Resume;

export const getServerSideProps: GetServerSideProps = async(context) => {
    var blobLink:string  = "";
    var uri = "";
    
    const https = require("https");
    const agent = new https.Agent({
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
      }
    }
  }