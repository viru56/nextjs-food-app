import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
import fs from 'node:fs';

const db = sql('meals.db');
import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET, 
});

export async function getmeals() {
   // await new Promise((resolve) => setTimeout(resolve, 2000));
    // throw new Error('Failed to fetch meals');
    return db.prepare('Select * from meals').all();
}

export function getMeal(slug) {
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal) {
    meal.slug = slugify(meal.title, { lower: true });
    meal.instructions = xss(meal.instructions);
    const extension = meal.image.name.split('.').pop();
    const fileName = `public/images/${meal.slug}.${extension}`;
    const stream = fs.createWriteStream(fileName);
    const bufferedImage = await meal.image.arrayBuffer();
    stream.write(Buffer.from(bufferedImage), (error) => {
        if (error) {
            throw new Error('Saving image file failed');
        }
    });
    const fileDes = await cloudinary.uploader.upload(fileName);
   fs.unlink(fileName, (err)=>{
    if(err){
        console.log(err);
    }
   })
    meal.image = fileDes.secure_url;
    const result = db.prepare(`
    Insert into meals (title, summary, instructions, creator, creator_email, image, slug)
    values (
        @title,
        @summary,
        @instructions,
        @creator,
        @creator_email,
        @image,
        @slug)
    `).run(meal);
    return result;
}
