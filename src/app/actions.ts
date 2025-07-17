'use server';

import { recommendCars, type RecommendCarsInput } from '@/ai/flows/recommend-cars';

export async function getAiRecommendations(input: RecommendCarsInput) {
  try {
    const result = await recommendCars(input);
    return { success: true, recommendations: result.recommendations };
  } catch (error) {
    console.error('Error getting AI recommendations:', error);
    return { success: false, error: 'No se pudieron obtener las recomendaciones. Inténtalo de nuevo.' };
  }
}
