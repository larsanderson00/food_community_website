import Image from 'next/image';
import { notFound } from 'next/navigation';

import { getMeal } from '@/lib/meals';
import classes from './page.module.css';

export function generateMetadata({ params }) {
    const meal = getMeal(params.mealSlug);

    if (!meal) {
        // Stops component from executing and shows the closest not found or error page.
        notFound();
    }

    return {
        title: meal.title,
        description: meal.summary
    };
}

export default function MealsDetailsPage({ params }) {
    const meal = getMeal(params.mealSlug);

    if (!meal) {
        // Stops component from executing and shows the closest not found or error page.
        notFound();
    }

    // Below when just outputting it as HTML the line breaks are ignored so it doesn't format properly
    // This is just replacing the way they put line breaks in the data (/\n/g) with HTML line breaks (<br>)
    meal.instructions = meal.instructions.replace(/\n/g, '<br>');

    return (
        <>
            <header className={classes.header}>
                <div className={classes.image}>
                    <Image src={meal.image} alt={meal.title} fill />
                </div>
                <div className={classes.headerText}>
                    <h1>{meal.title}</h1>
                    <p className={classes.creator}>
                        by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
                    </p>
                    <p className={classes.summary}>{meal.summary}</p>
                </div>
            </header>
            <main>
                <p className={classes.instructions} dangerouslySetInnerHTML={{
                    __html: meal.instructions
                }}></p>
            </main>
        </>
    );
}