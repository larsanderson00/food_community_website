'use client';

// Next.js automatically passes in some props to give more info
// Including { error } which will give more details about error
export default function Error() {
    return (
        <main className="error">
            <h1>An error occurred!</h1>
            <p>Failed to fetch meal data, please try again later</p>
        </main>
    );
}