import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import * as cheerio from 'cheerio';
import axios from 'axios';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function scrapeWebsiteContent() {
  try {
    const baseUrl = 'https://sarthaksavvy.com';
    const pages = [
      '/',
      '/about-me',
      '/side-projects',
      '/public-speaking',
      '/podcasts'
    ];

    let scrapedContent = '';

    for (const page of pages) {
      try {
        const response = await axios.get(`${baseUrl}${page}`, {
          timeout: 10000,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        });

        const $ = cheerio.load(response.data);
        
        $('script, style, nav, header, footer').remove();
        
        const pageContent = $('body').text()
          .replace(/\s+/g, ' ')
          .trim()
          .substring(0, 2000);

        if (pageContent) {
          scrapedContent += `\n\n=== Content from ${baseUrl}${page} ===\n${pageContent}`;
        }
      } catch (pageError) {
        console.error(`Error scraping ${page}:`, pageError.message);
      }
    }

    const linkedinContent = `
=== LinkedIn Profile Information ===
Sarthak Shrivastava (sarthaksavvy) is a full-stack developer, Docker Captain, and founder of Bitfumes. 
He works as a Software Engineer at Pfizer and is a content creator with 134K+ YouTube subscribers and 100K+ Udemy students.
His expertise includes Laravel, JavaScript, Python, AWS, Docker, AI/LLMs, and he's passionate about building and automating daily tasks.
LinkedIn: https://linkedin.com/in/sarthaksavvy
`;

    return scrapedContent + linkedinContent;
  } catch (error) {
    console.error('Error scraping content:', error);
    return `
=== Fallback Information about Sarthak Shrivastava ===
Sarthak Shrivastava is an India-based founder, content creator, developer and AI enthusiast passionate about building and automating daily tasks.

Professional Background:
- Founder of Bitfumes
- Software Engineer at Pfizer
- Docker Captain
- Content Creator with 134K+ YouTube subscribers
- 100K+ Udemy students

Core Expertise:
- Laravel, JavaScript, Python
- AWS, Docker, AI/LLMs
- Full-stack development
- Content creation and education

Contact:
- Website: https://sarthaksavvy.com
- LinkedIn: https://linkedin.com/in/sarthaksavvy
- YouTube: https://youtube.com/bitfumes
- Email: sarthak@bitfumes.com
- Courses: https://bitfumes.com

Side Projects:
- Mezohub: A centralized platform for connecting developers, designers, and entrepreneurs
- Expensorr: A simple yet powerful expense tracking application
- Various other innovative projects showcasing technical skills
`;
  }
}

export async function POST(request) {
  try {
    const { question } = await request.json();

    if (!question || question.trim().length === 0) {
      return NextResponse.json(
        { error: 'Question is required' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    const websiteContent = await scrapeWebsiteContent();

    const systemPrompt = `You are an AI assistant that answers questions about Sarthak Shrivastava based on the provided information. 

Here's what you know about Sarthak:
${websiteContent}

Instructions:
- Answer questions about Sarthak's background, projects, expertise, and professional journey
- Be conversational and helpful
- If asked about something not covered in the provided information, politely say you don't have that specific information
- Keep responses concise but informative (2-4 paragraphs max)
- Include relevant links when appropriate (website, LinkedIn, YouTube, etc.)
- Maintain a professional yet friendly tone
- If asked about contact information, direct them to his website or LinkedIn

Answer the user's question about Sarthak:`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: question
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const answer = completion.choices[0]?.message?.content || 'Sorry, I could not generate an answer at this time.';

    return NextResponse.json({ answer });

  } catch (error) {
    console.error('Error processing question:', error);
    
    if (error.code === 'insufficient_quota') {
      return NextResponse.json(
        { error: 'OpenAI API quota exceeded. Please try again later.' },
        { status: 429 }
      );
    }
    
    return NextResponse.json(
      { error: 'Sorry, I could not process your question right now. Please try again.' },
      { status: 500 }
    );
  }
}
