import Link from "next/link";
import classess from './page.module.css';
import MealsGrid from "@/components/meals/meals-grid";
import { getmeals } from "@/lib/meals";
import { Suspense } from "react";
import MealsLoadingPage from "./loading-meals";

export const metadata = {
  title: 'All Meals',
  description: 'Delecious meals recipe'
}


// create a loading page if you want a loader for full page 
// here we are showing loader for only meals list and not for header
async function Meals() {
  const meals = await getmeals();
  return <MealsGrid meals={meals} />
}

export default function MealsPage() {

  return (
    <>
      <header className={classess.header}>
        <h1>
          Delicious meals created <span className={classess.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun!
        </p>
        <p className={classess.cta}>
          <Link href='/meals/share'>
            Share your favorite recipe
          </Link>
        </p>
      </header>
      <main className={classess.main}>
        <Suspense fallback={<MealsLoadingPage />}>
          <Meals />
        </Suspense>
      </main>
    </>
  );
}
