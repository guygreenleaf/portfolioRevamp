import type { NextPage } from "next";

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

export async function getServerSideProps(){
    var blobLink:string  = "";
    var uri = "";
    
    const https = require("https");
    const agent = new https.Agent({
      rejectUnauthorized: false
    })

    if(process.env.NODE_ENV == "development"){
        blobLink = `${process.env.NEXT_RESUME_BLOB_URI_DEV}`;

        //@ts-ignore
        const res = await fetch(blobLink, {agent});
        uri = await res.text();
    } else {     
        blobLink = `${process.env.NEXT_RESUME_BLOB_URI_PROD}`;
        //@ts-ignore
        const res = await fetch(blobLink, {agent});
        console.log(await res.text());
        uri = await res.text();
    }

    return {
      props: {
        resumeURI: uri
      }
    }
  }