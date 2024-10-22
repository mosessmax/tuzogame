import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('missing supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Type definitions
export type QuestionType = 'multiple_choice' | 'text';

export interface BaseQuestion {
  id: number;
  question: string;
  question_type: QuestionType;
  difficulty: number;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  question_type: 'multiple_choice';
  options: string[];
  correct_answer: string;
}

export interface TextQuestion extends BaseQuestion {
  question_type: 'text';
  correct_answer: string;
  answer_aliases: string[];
}

export type Question = MultipleChoiceQuestion | TextQuestion;

export async function GET() {
  try {
    console.log('attempting to fetch questions from supabase');

    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .order('RANDOM()')
      .limit(10);

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    if (!data || data.length === 0) {
      console.log('No questions found in the database');
      return NextResponse.json(
        { error: 'No questions found' }, 
        { status: 404 }
      );
    }

    console.log(`Successfully fetched ${data.length} questions`);
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('Error in GET function:', error);
    return NextResponse.json(
      { error: 'Failed to fetch questions', details: (error as Error).message },
      { status: 500 }
    );
  }
}