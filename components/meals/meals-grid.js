import MealItem from './meal-item';
import classes from './meals-grid.module.css';

/*
 * Description: Component displayed on the meals page that shows all meal options from website
 *
 * Args: meals -> All meals data from database
 */
export default function MealsGrid({ meals }) {
    return (
        <ul className={classes.meals}>
            {meals.map((meal) => ( 
                <li key={meal.id}>
                    <MealItem {...meal} />
                </li>
            ))}
        </ul>
    );
}