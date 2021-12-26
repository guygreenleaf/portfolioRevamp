
import dbConnect from './util/dbConnect';
import blogposts from '../../models/BlogPost';


export default async function handler(req:any, res:any) {
    const {method} = req;
    await dbConnect();

    switch(method){

        case 'GET':
            try {
                const posts = await blogposts.find({});
                res.status(200).json({success:true, data: posts});

            } catch (error:any) {
                res.status(400).json({message: error.message});
            }
    }

}