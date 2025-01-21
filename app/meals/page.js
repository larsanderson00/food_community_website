import Link from 'next/link';
import { Suspense } from 'react';

import MealsGrid from '@/components/meals/meals-grid';
import { getMeals } from '@/lib/meals';
import classes from './page.module.css';

export const metadata = {
    title: 'All Meals',
    description: 'Browse the delicious meals shared by our vibrant community.',
};

/*
 * Description: Gets meals from the database, the advantage f
 */
function Meals() {
    const meals = getMeals();
    return <MealsGrid meals={ meals } />;
}

/*
 * Description: Page component that displays information found at /meals
 */
export default function MealsPage() {
    // Since this is a server component instead of needing to fetch we can directly reach out to the database
    // To keep things clean, going into a new folder

    return (
        <>
            <header className={classes.header}>
                <h1>Delicious meals, created{' '}
                    <span className={classes.highlight}>by you</span>
                </h1>
                <p>Choose your favourite recipe and cook it yourself. It is easy and fun!</p>
                <p className={classes.cta}>
                    <Link href="/meals/share">
                        Share Your Favourite Recipe
                    </Link>
                </p>
            </header>
            <main className={classes.main}>
                <Suspense fallback={<p className={classes.loading}>Fetching meals...</p>}>
                    <Meals />
                </Suspense>
            </main>
        </>
    );
}