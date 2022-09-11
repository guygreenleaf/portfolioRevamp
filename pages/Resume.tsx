import type { NextPage } from "next";

const resume: NextPage = ({resumeURI}: any) => {  
    return(
        <div>
            <div>   
                <iframe style={{height:"100vh", width:"100vw"}} src={resumeURI}></iframe>
            </div>
        </div>
    ) 
};

export default resume;

export async function getServerSideProps() {
    var blobLink:string  = "";
    var uri = "";
    
    if(process.env.NODE_ENV == "development"){
        blobLink = `${process.env.NEXT_RESUME_BLOB_URI_DEV}`;
        const https = require("https");
        const agent = new https.Agent({
          rejectUnauthorized: false
        })
        //@ts-ignore
        const res = await fetch(blobLink, {agent});
        uri = await res.text();
        console.log(uri);
    } else {
        blobLink = `${process.env.NEXT_RESUME_BLOB_URI_PROD}`;
        const res = await fetch(blobLink);
        uri = await res.text();
    }

    return {
      props: {
        resumeURI: uri
      }
    }
  }