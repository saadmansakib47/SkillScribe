import { NextRequest, NextResponse } from 'next/server';

// You'll need to install: npm install openai
// Then add OPENAI_API_KEY to your .env.local file

export async function POST(request: NextRequest) {
  let messages: Array<{ role: string; content: string }> = [];
  
  try {
    const body = await request.json();
    messages = body.messages || [];
    
    console.log('Received AI chat request with', messages.length, 'messages');

    // Check if OpenAI API key is configured
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      // Fallback responses if no API key is configured
      console.log('No API key found, using smart fallback responses');
      return getSmartFallbackResponse(messages);
    }
    
    console.log('Using OpenAI API');

    // Call OpenAI API
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are a helpful assistant for SkillScribe, an online learning platform. Keep your responses natural and conversational - do not use markdown formatting like ** or emojis.

Your role:
1. Help learners choose courses based on their goals and current skill level
2. Recommend learning paths for Web Development, Data Science, Design, Business, and Marketing
3. Provide study tips and motivation
4. Answer questions about course content, difficulty levels, and prerequisites
5. Guide users on how to use platform features

Be friendly, encouraging, and concise. Write like a human tutor, not a bot. If you don't know something specific, suggest they browse the All Courses page or check the Community forum.

Available course categories on SkillScribe:
- Web Development (HTML, CSS, JavaScript, React, Node.js, Full Stack)
- Data Science (Python, Machine Learning, Data Analysis, AI)
- Design (UI/UX, Graphic Design, Figma, Adobe Creative Suite)
- Business (Management, Entrepreneurship, Strategy, Leadership)
- Marketing (Digital Marketing, SEO, Social Media, Content Marketing)

Platform features:
- Browse courses by category with filters for price (free/paid), level (Beginner/Intermediate/Advanced), and duration
- Add courses to wishlist or cart
- Track progress in "My Learning" dashboard
- Download resources for each lesson
- Earn certificates upon course completion
- Join Community forum for discussions
- Create and showcase profile with achievements

Keep responses natural, helpful, and avoid using ** for emphasis. Just write clearly.`,
          },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!openAIResponse.ok) {
      const errorData = await openAIResponse.text();
      console.error('OpenAI API Error:', openAIResponse.status, errorData);
      
      // If quota exceeded, log helpful message
      if (openAIResponse.status === 429) {
        console.log('⚠️  OpenAI quota exceeded - using smart fallback responses');
        console.log('💡 To use OpenAI: Add billing at https://platform.openai.com/account/billing');
        console.log('✅ Smart fallbacks work great without API!');
      }
      
      throw new Error(`OpenAI API request failed: ${openAIResponse.status}`);
    }

    const data = await openAIResponse.json();
    const aiMessage = data.choices[0]?.message?.content || 'I apologize, but I couldn\'t generate a response. Please try again.';

    console.log('OpenAI response received');
    return NextResponse.json({ message: aiMessage });

  } catch (error) {
    console.error('AI Chat Error:', error);
    console.log('Using fallback response due to error');
    
    // Return intelligent fallback response with the messages we already parsed
    return getSmartFallbackResponse(messages);
  }
}

// Smart fallback responses when API is not available
function getSmartFallbackResponse(messages: Array<{ role: string; content: string }>) {
  const lastUserMessage = messages[messages.length - 1]?.content.toLowerCase() || '';
  
  console.log('Generating smart fallback for:', lastUserMessage.substring(0, 50));

  let response = '';

  // Specific topics - Web Development
  if (lastUserMessage.includes('web dev') || lastUserMessage.includes('website') || lastUserMessage.includes('frontend') || lastUserMessage.includes('backend') || lastUserMessage.includes('full stack') || lastUserMessage.includes('html') || lastUserMessage.includes('css') || lastUserMessage.includes('javascript') || lastUserMessage.includes('react') || lastUserMessage.includes('node')) {
    response = `Web development is an excellent choice with lots of job opportunities!

For beginners, I recommend starting with:
1. HTML & CSS Basics - Learn to structure and style web pages
2. JavaScript Fundamentals - Add interactivity to your websites
3. Responsive Design - Make sites work on all devices

Once you're comfortable with the basics, you can specialize:

Frontend path: Focus on what users see and interact with. Learn React or Vue.js, modern CSS frameworks like Tailwind, and build beautiful user interfaces.

Backend path: Work with servers and databases. Learn Node.js, Express, MongoDB or PostgreSQL, and API development.

Full stack: Combine both frontend and backend skills to build complete applications from start to finish.

We have courses for all skill levels. Check out our Web Development category at /learner/allcourses to find the perfect course for you.

What area interests you most - frontend, backend, or full stack?`;
  }
  // Data Science, AI, Machine Learning
  else if (lastUserMessage.includes('data science') || lastUserMessage.includes('data analysis') || lastUserMessage.includes('machine learning') || lastUserMessage.includes('ai') || lastUserMessage.includes('artificial intelligence') || lastUserMessage.includes('python') || lastUserMessage.includes('pandas') || lastUserMessage.includes('deep learning')) {
    response = `Data science is one of the hottest fields right now! Here's how to get started:

Begin with the fundamentals:
- Python Programming - The most popular language for data science
- Statistics and Mathematics - Understand the theory behind the algorithms
- SQL - Work with databases and query data efficiently

Then move to data analysis:
- Pandas and NumPy for data manipulation
- Data visualization with Matplotlib and Seaborn
- Working with real datasets to find insights

For machine learning:
- ML fundamentals and algorithms
- Scikit-learn for building models
- Model evaluation and improvement techniques
- Feature engineering

Advanced topics include deep learning with TensorFlow or PyTorch, computer vision, natural language processing, and working with large language models.

Our Data Science courses cover everything from beginner to advanced. Many include hands-on projects with real datasets so you can build your portfolio.

Are you more interested in data analysis or machine learning?`;
  }
  // Design - UI/UX
  else if (lastUserMessage.includes('design') || lastUserMessage.includes('ui') || lastUserMessage.includes('ux') || lastUserMessage.includes('figma') || lastUserMessage.includes('graphic') || lastUserMessage.includes('photoshop') || lastUserMessage.includes('adobe')) {
    response = `Design skills are incredibly valuable and creative! Here's your path:

UI/UX Design fundamentals:
- Design principles - color theory, typography, layout, and composition
- User research - understanding what users actually need
- Wireframing and prototyping - planning before you build
- Figma or Adobe XD - industry-standard design tools

For visual/graphic design:
- Adobe Creative Suite (Photoshop, Illustrator)
- Branding and logo design
- Print and digital media design
- Portfolio development

Web design specifically:
- Responsive design principles
- Mobile-first approach
- Accessibility standards
- Design systems and component libraries

Building a strong portfolio is essential for designers. Include 3-5 of your best projects and explain your design process for each one.

Check out our Design courses to start learning. Many include practical projects you can add to your portfolio.

Are you more interested in UI/UX design or graphic design?`;
  }
  // Business and Marketing
  else if (lastUserMessage.includes('business') || lastUserMessage.includes('marketing') || lastUserMessage.includes('entrepreneur') || lastUserMessage.includes('seo') || lastUserMessage.includes('digital marketing') || lastUserMessage.includes('social media') || lastUserMessage.includes('management')) {
    response = `Business and marketing skills are essential in today's digital world!

For digital marketing:
- SEO (Search Engine Optimization) - Get websites ranked on Google
- Social media marketing - Facebook, Instagram, LinkedIn, TikTok
- Content marketing - Create valuable content that attracts customers
- Email marketing - Build and engage your audience
- Analytics - Track and measure your results

For business and entrepreneurship:
- Business strategy and planning
- Financial management and budgeting
- Project management methodologies
- Leadership and team management
- Starting and scaling a business

These skills are valuable whether you want to:
- Start your own business
- Work in marketing for a company
- Become a freelance consultant
- Grow your existing business

Our Business and Marketing courses include real-world case studies and practical projects. Many students use what they learn to launch successful businesses or advance their careers.

Are you looking to start a business or advance in a marketing career?`;
  }
  // Course recommendations
  else if (lastUserMessage.includes('recommend') || lastUserMessage.includes('suggest') || lastUserMessage.includes('which course')) {
    response = `I'd be happy to help you choose a course! Here are some recommendations based on different goals:

For Beginners:
- Web Development Fundamentals
- Python for Beginners
- Introduction to UI/UX Design

For Career Changers:
- Full Stack Web Development
- Data Science Bootcamp
- Digital Marketing Mastery

Popular Right Now:
- Machine Learning with Python
- React & Next.js Complete Guide
- Advanced JavaScript Patterns

You can browse all our courses at /learner/allcourses or tell me more about what you're interested in learning!`;
  }
  // Learning path and starting
  else if (lastUserMessage.includes('learning path') || lastUserMessage.includes('where to start') || lastUserMessage.includes('how to start') || lastUserMessage.includes('beginner') || lastUserMessage.includes('first course')) {
    response = `Great question! Here's how to get started:

If you're a complete beginner:
1. Choose a field that interests you (Web Development, Data Science, Design, Business, or Marketing)
2. Start with a foundational course marked as "Beginner"
3. Practice what you learn with small projects
4. Move to Intermediate level courses
5. Specialize with Advanced courses in your chosen area

Some tips for success:
- Start with our FREE courses to explore different topics
- Complete one course fully before starting another
- Join our Community forum to connect with other learners
- Track your progress in the "My Learning" section

What field are you most interested in?`;
  }
  // Free courses
  else if (lastUserMessage.includes('free')) {
    response = `We have many excellent FREE courses available!

You can view all free courses by visiting /learner/allcourses?price=free

Some popular free options include:
- HTML & CSS Basics
- Python Fundamentals
- Introduction to Data Science
- Marketing Basics

Free courses are a great way to explore new topics and see what interests you before committing to paid courses. Each one includes full video lessons, resources, and a certificate upon completion.

Would you like recommendations for a specific topic?`;
  }
  // Pricing and payment
  else if (lastUserMessage.includes('price') || lastUserMessage.includes('cost') || lastUserMessage.includes('how much') || lastUserMessage.includes('payment') || lastUserMessage.includes('expensive')) {
    response = `Our courses have flexible pricing to fit different budgets:

We offer many FREE courses perfect for getting started and exploring new topics.

Paid courses are one-time purchases with lifetime access. Prices vary depending on the course length and depth of content.

Benefits of our paid courses:
- Lifetime access to all course materials
- Downloadable resources and exercises
- Quizzes to test your knowledge
- Certificate of completion
- Updates when new content is added

You can filter courses by price on our All Courses page. Add courses to your Cart to see the total before checkout.

Looking for free courses to start with, or interested in a specific paid course?`;
  }
  // Certificates
  else if (lastUserMessage.includes('certificate') || lastUserMessage.includes('certification') || lastUserMessage.includes('credential')) {
    response = `Yes! You earn a certificate when you complete any course on SkillScribe.

How it works:
- Complete all video lessons in the course
- Finish any quizzes or assessments
- Your certificate is automatically generated
- Download it as a PDF from the course page
- Share it on LinkedIn, your resume, or portfolio

Your certificates include:
- Your name
- Course title
- Completion date
- Unique certificate ID for verification
- Instructor signature

Certificates show employers and clients that you've completed professional training and developed real skills.

View all your earned certificates in your Profile or My Learning dashboard.

Working toward a specific certification or career goal?`;
  }
  // Progress tracking
  else if (lastUserMessage.includes('progress') || lastUserMessage.includes('track') || lastUserMessage.includes('dashboard') || lastUserMessage.includes('my learning')) {
    response = `You can track all your learning progress in the "My Learning" section!

Access it by clicking on your profile picture in the top navigation, then selecting "My Learning".

Your dashboard shows:
- All courses you're currently enrolled in
- Progress percentage for each course
- Recently watched videos
- Upcoming quizzes or assignments
- Courses you've completed
- Earned certificates

For each course, you can see:
- Which videos you've watched
- Your quiz scores
- Downloaded resources
- Overall completion percentage

The platform automatically saves your progress as you watch videos and complete activities.

Need help finding a specific course in your dashboard?`;
  }
  // Career and job questions
  else if (lastUserMessage.includes('job') || lastUserMessage.includes('career') || lastUserMessage.includes('hired') || lastUserMessage.includes('salary') || lastUserMessage.includes('get a job') || lastUserMessage.includes('employment')) {
    response = `Looking to build job-ready skills? Here's what works:

Most in-demand skills right now:
- Web Development (React, Node.js, full-stack)
- Data Science and Machine Learning
- UI/UX Design
- Digital Marketing and SEO

Tips for landing a job:
1. Complete full learning paths, not just individual courses
2. Build a portfolio with projects from your courses
3. Earn certificates and add them to your LinkedIn profile
4. Join our Community to network with other learners
5. Practice consistently - even 1-2 hours per day makes a big difference

Many of our learners have successfully transitioned careers by following these steps. What type of role are you interested in?`;
  }
  // Time and duration questions
  else if (lastUserMessage.includes('how long') || lastUserMessage.includes('time') || lastUserMessage.includes('duration') || lastUserMessage.includes('hours') || lastUserMessage.includes('weeks')) {
    response = `Course duration varies depending on the topic and depth:

Short courses (1-3 hours): Quick introductions to specific tools or concepts
Medium courses (5-10 hours): Comprehensive coverage of a topic
Long courses (15+ hours): Complete bootcamp-style programs covering everything from beginner to advanced

Most students study at their own pace:
- 1 hour per day: Finish a 10-hour course in 2 weeks
- 2 hours per day: Complete the same course in 1 week
- Part-time (weekends): Take a month for longer courses

All courses have lifetime access, so you can learn on your own schedule. There are no deadlines or time limits.

You can filter courses by duration on our All Courses page to find ones that fit your available time.

How much time can you dedicate to learning each week?`;
  }
  // Difficulty level
  else if (lastUserMessage.includes('level') || lastUserMessage.includes('difficulty') || lastUserMessage.includes('hard') || lastUserMessage.includes('easy') || lastUserMessage.includes('advanced') || lastUserMessage.includes('intermediate')) {
    response = `We have courses for every skill level:

Beginner: No prior experience required. Start from the very basics and build a strong foundation.

Intermediate: You should have basic knowledge of the topic. These courses go deeper and teach more advanced concepts.

Advanced: For experienced learners who want to master specialized topics or cutting-edge techniques.

Each course page clearly shows the required level. You can also filter by level on the All Courses page.

Not sure which level to choose?
- New to the field entirely: Start with Beginner
- Know the basics: Try Intermediate
- Professional or experienced: Go for Advanced

It's better to start at a slightly easier level and move up quickly than to start too advanced and feel overwhelmed.

What field are you learning, and what's your current experience level?`;
  }
  // Prerequisites
  else if (lastUserMessage.includes('prerequisite') || lastUserMessage.includes('requirement') || lastUserMessage.includes('need to know') || lastUserMessage.includes('before') || lastUserMessage.includes('prior knowledge')) {
    response = `Prerequisites vary by course and are clearly listed on each course page.

Beginner courses typically have no prerequisites - you can start with zero experience.

Intermediate and Advanced courses usually require:
- Completion of beginner courses in the same topic
- Basic knowledge of fundamental concepts
- Familiarity with certain tools or technologies

For example:
- A React course might require JavaScript knowledge
- A Machine Learning course might require Python basics
- An Advanced SEO course might require marketing fundamentals

Always check the "What you'll need" section on the course page before enrolling. If you're missing prerequisites, we'll recommend the right beginner courses to take first.

Looking at a specific course? I can help you understand what you'll need to know.`;
  }
  // Platform features and how to use
  else if (lastUserMessage.includes('how to') || lastUserMessage.includes('feature') || lastUserMessage.includes('use') || lastUserMessage.includes('enroll') || lastUserMessage.includes('buy')) {
    response = `Here's how to use SkillScribe:

Getting Started:
- Browse courses by clicking Categories in the navigation menu
- Use filters to narrow by price, level, or duration
- Click the heart icon to add courses to your Wishlist
- Add courses to your Cart and complete checkout to enroll

Learning:
- Access your enrolled courses from "My Learning" in your profile menu
- Watch video lessons at your own pace
- Download resources for each topic
- Take quizzes to test your knowledge
- Earn a certificate when you complete all course content

Your Profile:
- View your learning progress and achievements
- Edit your profile to showcase your skills
- Join Community discussions to connect with others

Need help with something specific? Just ask!`;
  }
  // Wishlist
  else if (lastUserMessage.includes('wishlist') || lastUserMessage.includes('save') || lastUserMessage.includes('favorite') || lastUserMessage.includes('bookmark')) {
    response = `The Wishlist feature helps you save courses you're interested in!

How to use it:
- Click the heart icon on any course card to add it to your Wishlist
- Access your Wishlist from the navigation bar (heart icon)
- View all your saved courses in one place
- Click the heart again to remove courses you're no longer interested in

Your Wishlist is perfect for:
- Saving courses you want to take later
- Comparing different courses on the same topic
- Keeping a list of courses to buy during sales
- Sharing your learning goals with others

You can add courses to your Wishlist from:
- The All Courses page
- Course detail pages
- Category pages
- Search results

Courses stay in your Wishlist until you remove them or add them to your Cart.

Want to start building your Wishlist? Browse courses at /learner/allcourses`;
  }
  // Cart and checkout
  else if (lastUserMessage.includes('cart') || lastUserMessage.includes('checkout') || lastUserMessage.includes('purchase')) {
    response = `Our shopping cart makes it easy to enroll in courses!

How it works:
1. Add courses to your Cart from any course page
2. Click the shopping cart icon in the navigation to view your cart
3. Review your selected courses and total price
4. Click "Proceed to Checkout"
5. Enter your billing information
6. Complete payment
7. Instantly access all your courses in My Learning

You can add multiple courses to your cart and purchase them all at once. Courses in your cart are saved even if you leave the website.

Your purchase includes:
- Lifetime access to all course content
- All video lessons and resources
- Certificate upon completion
- Future updates to the course

Ready to start learning? Add some courses to your cart!`;
  }
  // Community
  else if (lastUserMessage.includes('community') || lastUserMessage.includes('forum') || lastUserMessage.includes('discussion') || lastUserMessage.includes('ask question') || lastUserMessage.includes('help from others')) {
    response = `Our Community forum is a great place to connect with other learners!

You can:
- Ask questions about course material
- Share your projects and get feedback
- Find study partners
- Discuss industry trends
- Get career advice from experienced professionals
- Help other learners with their questions

Access the Community:
- Click "Community" in the main navigation
- Browse discussions by topic
- Search for specific questions
- Create your own posts
- Reply to others and build your reputation

The Community is most active with:
- Technical help for Web Development
- Project feedback for Design students
- Career transition stories
- Study tips and motivation

Our instructors also participate in Community discussions to help answer questions about their courses.

Have a specific question you'd like to ask the Community?`;
  }
  // Quiz and assessments
  else if (lastUserMessage.includes('quiz') || lastUserMessage.includes('test') || lastUserMessage.includes('assessment') || lastUserMessage.includes('exam')) {
    response = `Many of our courses include quizzes to help you test your knowledge!

How quizzes work:
- Available at the end of course modules
- Multiple choice or coding challenges
- Immediate feedback on your answers
- You can retake quizzes to improve your score
- Your best score is saved

Quizzes help you:
- Confirm you understood the material
- Identify areas that need more review
- Build confidence before moving forward
- Practice applying what you learned

Quiz results are tracked in your course dashboard. Some courses require passing quizzes to earn your certificate.

Don't worry if you don't pass on the first try - the goal is learning, not perfection! Review the material and try again.

Preparing for a specific quiz?`;
  }
  // Resources and downloads
  else if (lastUserMessage.includes('resource') || lastUserMessage.includes('download') || lastUserMessage.includes('material') || lastUserMessage.includes('file')) {
    response = `Most courses include downloadable resources to support your learning!

Common resources include:
- PDF guides and cheat sheets
- Code files and project templates
- Design files and assets
- Exercise worksheets
- Reference materials

How to access resources:
- Look for the "Resources" tab on the course page
- Click the download icon next to each resource
- Files are saved to your computer's Downloads folder
- Access them anytime, even without internet

Resources are included with your course enrollment at no extra cost.

Keep your downloaded resources organized in folders on your computer so you can reference them later.

Looking for resources for a specific course?`;
  }
  // Projects and portfolio
  else if (lastUserMessage.includes('project') || lastUserMessage.includes('portfolio') || lastUserMessage.includes('build') || lastUserMessage.includes('practice')) {
    response = `Building projects is one of the best ways to learn and showcase your skills!

Why projects matter:
- Apply what you learned in real-world scenarios
- Build a portfolio to show potential employers
- Gain confidence in your abilities
- Discover what you enjoy most

Many of our courses include:
- Guided project tutorials
- Project ideas and inspiration
- Source code and templates
- Best practices and tips

Tips for building your portfolio:
- Include 3-5 strong projects that show different skills
- Add descriptions explaining what you built and why
- Show your process, not just the final result
- Keep your projects updated and well-documented
- Share them on GitHub, Behance, or your personal website

The Community forum is great for getting feedback on your projects.

Working on a specific project? I can suggest relevant courses!`;
  }
  // Instructor questions
  else if (lastUserMessage.includes('instructor') || lastUserMessage.includes('teacher') || lastUserMessage.includes('who teaches')) {
    response = `Our instructors are experienced professionals who are passionate about teaching!

All instructors have:
- Real-world industry experience
- Strong teaching skills
- Active engagement with students
- Regularly updated course content

You can learn about each instructor on their course pages, which include:
- Professional background and expertise
- Number of students taught
- Course ratings and reviews
- Other courses they teach

Many instructors also:
- Answer questions in the Community forum
- Provide additional resources
- Update courses with new content
- Engage with student projects

Each course page shows the instructor's profile so you can learn about their experience before enrolling.

Interested in courses from a specific instructor?`;
  }
  // Reviews and ratings
  else if (lastUserMessage.includes('review') || lastUserMessage.includes('rating') || lastUserMessage.includes('feedback')) {
    response = `Student reviews help you choose the right courses!

Every course has:
- Overall star rating (1-5 stars)
- Number of student reviews
- Detailed written feedback from learners
- Ratings breakdown showing how many students gave each star rating

When reading reviews, look for:
- Comments about course content quality
- How well concepts are explained
- If projects and exercises are valuable
- Whether the course met expectations

You can leave your own review after enrolling in a course:
- Rate the course from 1-5 stars
- Write about your experience
- Help future students make informed decisions

Reviews are honest feedback from real students. High ratings and positive reviews generally indicate quality courses.

Looking at reviews for a specific course?`;
  }
  // Refund and guarantee
  else if (lastUserMessage.includes('refund') || lastUserMessage.includes('money back') || lastUserMessage.includes('guarantee') || lastUserMessage.includes('return')) {
    response = `We want you to be completely satisfied with your learning experience!

Before purchasing, you can:
- Preview free lesson samples on course pages
- Read detailed course descriptions
- Check student reviews and ratings
- View the full curriculum

If you have concerns about a course:
- Check the prerequisites to ensure it matches your level
- Read the "What you'll learn" section carefully
- Look at student reviews for honest feedback

For any issues with course access or technical problems, visit the Contact page or reach out to our support team through the Community forum.

Have questions about a specific course before purchasing?`;
  }
  // Support and help
  else if (lastUserMessage.includes('support') || lastUserMessage.includes('contact') || lastUserMessage.includes('help') || lastUserMessage.includes('problem') || lastUserMessage.includes('issue')) {
    response = `I'm here to help! For additional support:

For learning questions:
- Ask in the Community forum - other students and instructors can help
- Review course resources and materials
- Rewatch video lessons at your own pace

For technical issues:
- Visit the Contact page to reach our support team
- Include details about the problem you're experiencing
- Check your internet connection and browser compatibility

For account questions:
- Visit Settings in your profile menu
- Update your profile information
- Manage your learning preferences

Common issues and solutions:
- Video won't play: Try refreshing the page or using a different browser
- Can't find a course: Check your My Learning dashboard
- Password issues: Use the "Forgot Password" link on the sign-in page

What specific issue are you experiencing?`;
  }
  // Motivation and encouragement
  else if (lastUserMessage.includes('difficult') || lastUserMessage.includes('hard') || lastUserMessage.includes('stuck') || lastUserMessage.includes('give up') || lastUserMessage.includes('frustrated') || lastUserMessage.includes('can\'t') || lastUserMessage.includes('impossible')) {
    response = `Don't give up! Learning new skills is challenging, but you're making progress even when it doesn't feel like it.

Here are some strategies that help:
- Break lessons into smaller chunks - 20 minutes is better than trying to do too much at once
- Review previous material if you're stuck
- Take notes while watching videos
- Practice regularly - consistency matters more than long study sessions
- Ask questions in our Community forum - other learners and instructors can help
- Remember that everyone struggles when learning something new

As someone wise once said: "The expert in anything was once a beginner."

Take a short break, come back with fresh eyes, and tackle one small topic at a time. You've got this!

What specific topic is giving you trouble? I might be able to suggest some helpful resources.`;
  }
  // Greetings
  else if (lastUserMessage.includes('hi') || lastUserMessage.includes('hello') || lastUserMessage.includes('hey') || lastUserMessage.includes('good morning') || lastUserMessage.includes('good afternoon') || lastUserMessage.includes('good evening')) {
    response = `Hello! Welcome to SkillScribe!

I'm here to help you find the perfect courses and make the most of your learning journey.

I can help you with:
- Finding courses that match your goals
- Creating a learning path from beginner to advanced
- Understanding how to use the platform
- Getting study tips and staying motivated
- Answering questions about certificates, pricing, and features

Try asking me something like:
"Which courses should I start with?"
"Show me free courses about web development"
"How do I earn a certificate?"
"I want to change careers to tech"

What would you like to learn today?`;
  }
  // Thank you
  else if (lastUserMessage.includes('thank') || lastUserMessage.includes('thanks') || lastUserMessage.includes('appreciate')) {
    response = `You're very welcome! I'm happy to help.

Feel free to ask me anything else about courses, learning paths, or how to use SkillScribe. I'm here whenever you need guidance!

Good luck with your learning journey!`;
  }
  // Goodbye
  else if (lastUserMessage.includes('bye') || lastUserMessage.includes('goodbye') || lastUserMessage.includes('see you') || lastUserMessage.includes('later')) {
    response = `Goodbye! Best of luck with your learning!

I'm here anytime you need help finding courses or have questions about the platform. Happy learning!`;
  }
  // Default helpful response
  else {
    response = `I'm here to help you with:

Course Selection - Find courses that match your learning goals and experience level

Learning Paths - Get guidance on which courses to take in what order

Study Tips - Learn more effectively and stay motivated

Career Advice - Build skills that employers are looking for

Platform Help - Navigate features like My Learning, Wishlist, Cart, and Certificates

Try asking me:
- "Which courses should I start with?"
- "I want to learn [topic], where should I begin?"
- "How do I earn a certificate?"
- "Show me free courses"

What would you like to know?`;
  }

  return NextResponse.json({ message: response });
}
