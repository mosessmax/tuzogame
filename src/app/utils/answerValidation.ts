export type Answer = {
    text: string;
    aliases: string[];
  };
  
  export function validateAnswer(userAnswer: string, correctAnswer: Answer): boolean {
    const normalizedUserAnswer = normalizeText(userAnswer);
    const normalizedCorrectAnswer = normalizeText(correctAnswer.text);
    
    // Check main answer
    if (normalizedUserAnswer === normalizedCorrectAnswer) return true;
    
    // Check aliases
    if (correctAnswer.aliases.some(alias => 
      normalizeText(alias) === normalizedUserAnswer)) return true;
    
    // Check if answer is contained within correct answer
    if (normalizedCorrectAnswer.includes(normalizedUserAnswer) && 
        userAnswer.length > 3) return true;
    
    // Check for partial matches (e.g., "Leonardo" matches "Leonardo da Vinci")
    const correctWords = normalizedCorrectAnswer.split(' ');
    const userWords = normalizedUserAnswer.split(' ');
    
    return userWords.every(word => 
      word.length > 2 && correctWords.some(correct => correct.includes(word))
    );
  }
  
  function normalizeText(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '') // Remove punctuation
      .replace(/\s+/g, ' '); // Normalize whitespace
  }
  
  // Example database structure:
  type Question = {
    id: number;
    question: string;
    answer: Answer;
  };
  
  // Example data:
  const sampleQuestion = {
    id: 1,
    question: "Who painted the Mona Lisa?",
    answer: {
      text: "Leonardo da Vinci",
      aliases: [
        "Leonardo",
        "da Vinci",
        "Leonardo di ser Piero da Vinci"
      ]
    }
  };