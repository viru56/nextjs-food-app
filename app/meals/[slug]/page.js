import Link from "next/link";
import classess from './page.module.css';

import { getMeal } from '@/lib/meals'
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const meal = getMeal(params.slug);

  if(!meal){
    notFound();
  }
  return {
    title: meal.title,
    description: meal.summary
  }
}
export default function MealPage({ params }) {
  const meal = getMeal(params.slug);

  if(!meal){
    notFound();
  }

  return (
    <>
      <header className={classess.header}>
        <div className={classess.image}>
          <Image src={meal.image} alt={meal.title} priority={false} fill />
        </div>
        <div className={classess.headerText}>
          <h1>{meal.title}</h1>
          <p className={classess.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classess.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p className={classess.instructions}
          dangerouslySetInnerHTML={{
            __html: meal.instructions
          }}
        />

      </main>
    </>
  );
}
