import Link from 'next/link';
import Image from 'next/image';

import classes from './meal-item.module.css';

/*
 * Description: Component with in-depth description on selected meal
 *
 * Args: All are attribute names from each item in meals in the database
 *       title   -> Title of the meal
 *       slug    -> URL extension specific to that meal
 *       image   -> Picture of meal
 *       summary -> Meal description
 *       creator -> Who created meal
 */
export default function MealItem({ title, slug, image, summary, creator }) {
  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          <Image src={image} alt={title} fill />
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}