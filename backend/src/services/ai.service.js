import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

/**
 * AI Service - handles all AI operations (OpenAI/OpenRouter)
 */
class AIService {
  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (apiKey) {
      this.openai = new OpenAI({ apiKey });
      this.enabled = true;
    } else {
      console.warn('OpenAI API key not found. AI features will be disabled.');
      this.enabled = false;
    }
  }

  /**
   * Extract text from PDF/documents (placeholder - needs actual implementation)
   */
  async extractText(fileUrl) {
    // TODO: Implement actual text extraction using libraries like pdf-parse
    // For now, return placeholder
    return 'Extracted text content will go here...';
  }

  /**
   * Predict exam topics from syllabus and past papers
   */
  async predictExamTopics(syllabusText, pastPapersText) {
    if (!this.enabled) {
      throw new Error('AI service not available. Please configure OpenAI API key.');
    }

    try {
      const prompt = `You are an AI assistant helping students prepare for exams. 

Analyze the following syllabus and past exam papers to predict the most important topics likely to appear on the upcoming exam.

SYLLABUS:
${syllabusText}

PAST PAPERS:
${pastPapersText}

Please provide:
1. Top 10 predicted exam topics
2. Confidence score (0-100%) for each topic
3. Brief reasoning for each prediction

Format your response as a JSON array with this structure:
[
  {
    "topic": "Topic Name",
    "confidence": 85,
    "reasoning": "Brief explanation"
  }
]`;

      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 2000
      });

      const response = completion.choices[0].message.content;
      
      // Try to parse JSON response
      try {
        const predictions = JSON.parse(response);
        return predictions;
      } catch (parseError) {
        // If JSON parsing fails, return raw response
        console.error('Failed to parse AI response as JSON:', parseError);
        return { rawResponse: response, predictions: [] };
      }
    } catch (error) {
      console.error('AI prediction error:', error);
      throw new Error('Failed to generate exam predictions');
    }
  }

  /**
   * Generate study recommendations based on topics
   */
  async generateStudyRecommendations(topics) {
    if (!this.enabled) {
      throw new Error('AI service not available. Please configure OpenAI API key.');
    }

    try {
      const prompt = `Generate study recommendations and key points for the following exam topics:

${topics.map((t, i) => `${i + 1}. ${t}`).join('\n')}

For each topic, provide:
- Key concepts to focus on
- Study strategies
- Estimated study time

Format as a structured response.`;

      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1500
      });

      return completion.choices[0].message.content;
    } catch (error) {
      console.error('AI recommendation error:', error);
      throw new Error('Failed to generate study recommendations');
    }
  }

  /**
   * Analyze content quality and suggest improvements (for creators)
   */
  async analyzeContentQuality(contentText, contentType) {
    if (!this.enabled) {
      return {
        enabled: false,
        message: 'AI analysis not available'
      };
    }

    try {
      const prompt = `Analyze the following ${contentType} educational content and provide quality feedback:

${contentText}

Evaluate:
1. Clarity and structure
2. Completeness of coverage
3. Pedagogical effectiveness
4. Suggestions for improvement

Provide a quality score (0-100) and detailed feedback.`;

      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1000
      });

      return {
        analysis: completion.choices[0].message.content,
        enabled: true
      };
    } catch (error) {
      console.error('Content analysis error:', error);
      return {
        enabled: true,
        error: 'Failed to analyze content'
      };
    }
  }
}

export default new AIService();
