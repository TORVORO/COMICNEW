import { ComicStyle, ComicPanel } from "./types";

/**
 * Generates a mock comic with the specified parameters
 * This simulates what would normally be an API call to an AI service
 */
export async function generateMockComic(
  prompt: string,
  style: ComicStyle,
  panelCount: number
): Promise<ComicPanel[]> {
  // Add artificial delay to simulate API call
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Generate mock panels
  const panels: ComicPanel[] = [];
  
  for (let i = 0; i < panelCount; i++) {
    panels.push({
      id: `panel-${Date.now()}-${i}`,
      imageUrl: `/panel-${style}-${i % 5 + 1}.jpg`, // This would be a real image URL from the AI
      order: i
    });
  }
  
  return panels;
}

/**
 * Regenerates a specific panel
 */
export async function regeneratePanel(
  prompt: string,
  style: ComicStyle,
  panelIndex: number
): Promise<string> {
  // Add artificial delay to simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Return mock image URL
  return `/panel-${style}-${Math.floor(Math.random() * 5) + 1}.jpg`;
}