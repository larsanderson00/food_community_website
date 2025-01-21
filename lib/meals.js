// Code that reaches out to database and gets information from database
import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
import fs from 'node:fs';

const db = sql('meals.db');

export function getMeals() {
    // We don't need to make function async but will be good for testing loading handling later
    // So basically could remove all below code except for the return
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simulate database error
    // throw new Error('Loading meals failed');

    // .all() is used if you are fetching data
    // .run() is used if you are changing data
    // if fetching single row can use .get()
    return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug) {
    // Could write it like this but this leaves you vulnerable to SQL injections
    // return db.prepare('SELECT * FROM meals WHERE slug = ' + slug)

    // This is a more secure why of sending that request, the better-sqlite3 package will now protect you against those attacks
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal) {
    // Changes meal title into the slug and puts it all lowercase
    meal.slug = slugify(meal.title, { lower: true });
    // Sanitizes and cleans data
    meal.instructions = xss(meal.instructions);

    // Adds the actual image file to the file system
    // Get extension of image
    const extension = meal.image.name.split('.').pop();
    // Creates new image name
    const fileName = `${meal.slug}.${extension}`;
    const stream = fs.createWriteStream(`public/images/${fileName}`);
    // Image needs to be buffer to use the above create write stream
    const bufferedImage = await meal.image.arrayBuffer();
    stream.write(Buffer.from(bufferedImage), (error) => {
        if (error) {
            throw new Error('Saving image failed!');
        }
    });

    // Adds the image file path to database
    // Don't need to include public because public is treated as root in server
    meal.image = `/images/${fileName}`;
    db.prepare(`
        INSERT INTO meals
            (title, summary, instructions, creator, creator_email, image, slug)
        VALUES
            (@title, @summary, @instructions, @creator, @creator_email, @image, @slug)
    `).run(meal);
}