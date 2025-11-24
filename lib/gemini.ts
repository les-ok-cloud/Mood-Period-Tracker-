import { GoogleGenAI } from '@google/genai';

// Initialize the GoogleGenAI client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

/**
 * Generates content using the Gemini API.
 * @param prompt The text prompt to send to the model.
 * @returns The generated text response.
 */
export async function generateContent(prompt: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error('Error generating content with Gemini:', error);
    // Re-throwing a more generic error to be handled by the caller.
    throw new Error('Failed to generate content from AI model.');
  }
}
