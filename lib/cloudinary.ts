export function mapImageResources(resources:any) {
    return resources.map((resource:any) => {
      const { width, height } = resource;
      return {
        id: resource.asset_id,
        title: resource.public_id,
        image: resource.secure_url,
        width,
        height
      }
    });
  }
  
  export async function getFolders(options:any = {}) {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_API_NAME}/folders`, {
      headers: {
        Authorization: `Basic ${Buffer.from(process.env.CLOUDINARY_API_KEY + ':' + process.env.CLOUDINARY_API_SECRET).toString('base64')}`
      }
    }).then(r => r.json());
  
    return response;
  }



  export async function getFolderThumbs(folder:string) {

    const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_API_NAME}/resources/search`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(process.env.CLOUDINARY_API_KEY + ':' + process.env.CLOUDINARY_API_SECRET).toString('base64')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        expression: `folder:${folder}/*`
      })
    }).then(r => r.json());

    return response.resources[0].url;
  }



  export async function getFolderImages(folder:string) {

  const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_API_NAME}/resources/search`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(process.env.CLOUDINARY_API_KEY + ':' + process.env.CLOUDINARY_API_SECRET).toString('base64')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      expression: `folder:${folder}/*`
    })
  }).then(r => r.json());


  return response.resources;
}