import { ObjectId } from "mongodb";

export default class BlogPost{
    constructor(public title:string, public s3url:string, public id?:ObjectId) {}
}