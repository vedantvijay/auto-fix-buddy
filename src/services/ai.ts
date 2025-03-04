
import { AIPrompt, AISolution } from '../types/ai';

class AIService {
  private apiKey: string = '';
  private baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models';
  private model = 'gemini-pro'; // Using Gemini Pro model

  configure(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateSolution(prompt: AIPrompt): Promise<AISolution> {
    if (!this.apiKey) {
      throw new Error('Gemini API key not configured');
    }

    const url = `${this.baseUrl}/${this.model}:generateContent?key=${this.apiKey}`;

    const issueContext = `
GitHub Issue #${prompt.issue.number} in repository ${prompt.issue.repository}
Title: ${prompt.issue.title}
Description: ${prompt.issue.body}
    `;

    const codeContext = prompt.codebase ? `
Relevant code from the repository:
${prompt.codebase}
    ` : '';

    const promptText = `
${issueContext}
${codeContext}

You are an expert programmer tasked with fixing the issue described above.
Please provide a solution that:
1. Explains the root cause of the issue
2. Provides the corrected code
3. Lists all files that need to be modified with their paths
4. Gives a brief explanation for each change

Format your response as valid JSON with the following structure:
{
  "explanation": "A clear explanation of the solution",
  "code": "The main corrected code",
  "filesToModify": [
    {
      "path": "path/to/file.ext",
      "content": "Complete content of the modified file",
      "reason": "Why this file needed to be changed"
    }
  ]
}
`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: promptText }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.2,
            topP: 0.8,
            topK: 40,
            maxOutputTokens: 8192
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Gemini API Error: ${response.status} - ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      
      // Extract the text from the response
      const text = data.candidates[0].content.parts[0].text;
      
      // Find and parse the JSON part of the response
      const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/\{[\s\S]*\}/);
      
      if (jsonMatch) {
        try {
          const solution = JSON.parse(jsonMatch[1] || jsonMatch[0]);
          
          return {
            code: solution.code || '',
            explanation: solution.explanation || '',
            filesToModify: solution.filesToModify || []
          };
        } catch (parseError) {
          console.error('Error parsing AI response:', parseError);
          throw new Error('Could not parse AI response as JSON');
        }
      } else {
        throw new Error('AI response did not contain valid JSON');
      }
    } catch (error) {
      console.error('AI API Request Error:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const aiService = new AIService();
