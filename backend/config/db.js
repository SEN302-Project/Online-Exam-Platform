import { MongoClient } from "mongodb";
import { config } from "dotenv";

config()

const client = new MongoClient(process.env.MONGODB_URI)
let db

export const connectDB = async () => {
    await client.connect()
    db = client.db("oep_db")
    console.log("MongoDB connected")
}

export const getDB = () => db