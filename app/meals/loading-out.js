// Renamed because we aren't using it anymore so now it isn't using a reserved name

import classes from './loading.module.css';

export default function MealsLoadingPage() {
    return (
        <p className={classes.loading}>Fetching meals...</p>
    );
}