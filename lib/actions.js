'use server';
import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";
export async function shareMeal(prevState, formData) {
    const isInvalidText = (text) => (!text || text.trim() === '');
    const meal = {
        title: formData.get('title'),
        summary: formData.get('summary'),
        image: formData.get('image'),
        instructions: formData.get('instructions'),
        creator: formData.get('name'),
        creator_email: formData.get('email'),
    };

    if (
        isInvalidText(meal.title) ||
        isInvalidText(meal.summary) ||
        isInvalidText(meal.instructions) ||
        isInvalidText(meal.creator) ||
        isInvalidText(meal.creator_email) ||
        !meal.image
    ) {
        return {
            message: 'Invalid input..',
        };
    }
    await saveMeal(meal);
    revalidatePath('/meals', 'page');
    redirect('/meals');

}