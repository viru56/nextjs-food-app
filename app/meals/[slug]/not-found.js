import Link from "next/link";

export default function NotFound(){
    return <main className="not-found">
        <h1>Meal Not found</h1>
        <p>Unfortunately, we could not find the requested meal.</p>
        <Link href={'/meals'}>Go to Meals</Link>
    </main>
}