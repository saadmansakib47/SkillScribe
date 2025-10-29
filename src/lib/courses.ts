export type Course = {
  id: number;
  title: string;
  shortDescription?: string;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  durationHours: number;
  price: number; // 0 = free
  totalVideos: number;
  instructorName: string;
  instructorImage: string;
  level?: string;
  modules?: {
    id: number;
    title: string;
    lectures: number;
    duration?: string;
    topics?: {
      id: number;
      title: string;
      resources?: { title: string; size?: string; file?: string }[];
    }[];
  }[];
  whatYouWillLearn?: string[];
  resources?: { title: string; size?: string; file?: string }[];
};

export const COURSES: Course[] = [
  {
    id: 12,
    title: 'Complete Software Testing Mastery',
  shortDescription: 'Master manual & automated testing with hands-on examples. Gain practical skills through labs and sample projects.',
    description: 'Master both manual and automated testing with real-world examples and hands-on practice.This course guides you through writing effective test cases, automating web UI tests with Selenium, testing APIs with Postman, and integrating tests into CI pipelines. Includes practical labs, downloadable resources, and sample projects to help you build a testing portfolio.',
    image: '/Asset/software test.jpg',
    rating: 4.6,
    reviews: 950,
    durationHours: 16,
    price: 20,
    totalVideos: 19,
    instructorName: 'Kate Weber',
    instructorImage: '/Asset/Kate weber.png',
    level: 'Intermediate',
    modules: [
      {
        id: 1,
        title: 'Introduction to Testing',
        lectures: 4,
        duration: '1.5 hr',
        topics: [
          { id: 1, title: 'What is testing?', resources: [{ title: 'Intro slides', size: '200 KB', file: '/Asset/resources/testing/intro-slides.pdf' }] },
          { id: 2, title: 'Testing terminology', resources: [{ title: 'Glossary', size: '120 KB', file: '/Asset/resources/testing/glossary.pdf' }] },
          { id: 3, title: 'Testing lifecycle', resources: [{ title: 'Lifecycle diagram', size: '300 KB', file: '/Asset/resources/testing/lifecycle.pdf' }] },
          { id: 4, title: 'Tools overview', resources: [{ title: 'Tools list', size: '150 KB', file: '/Asset/resources/testing/tools.pdf' }] },
        ],
      },
      {
        id: 2,
        title: 'Manual Testing Techniques',
        lectures: 5,
        duration: '3 hr',
        topics: [
          { id: 1, title: 'Test case design', resources: [{ title: 'Test case template', size: '80 KB', file: '/Asset/resources/testing/testcase.docx' }] },
          { id: 2, title: 'Exploratory testing', resources: [{ title: 'Exploratory checklist', size: '60 KB', file: '/Asset/resources/testing/exploratory.pdf' }] },
          { id: 3, title: 'Bug reporting', resources: [{ title: 'Bug report sample', size: '90 KB', file: '/Asset/resources/testing/bug-report.pdf' }] },
          { id: 4, title: 'Session-based testing', resources: [{ title: 'Session templates', size: '70 KB', file: '/Asset/resources/testing/session-templates.zip' }] },
          { id: 5, title: 'Acceptance criteria', resources: [{ title: 'AC examples', size: '50 KB', file: '/Asset/resources/testing/ac-examples.pdf' }] },
        ],
      },
      {
        id: 3,
        title: 'Automation with Selenium',
        lectures: 6,
        duration: '4 hr',
        topics: [
          { id: 1, title: 'Selenium basics', resources: [{ title: 'Selenium guide', size: '1.2 MB', file: '/Asset/resources/testing/selenium-guide.pdf' }] },
          { id: 2, title: 'Selectors and waits', resources: [{ title: 'Selectors cheatsheet', size: '200 KB', file: '/Asset/resources/testing/selectors.pdf' }] },
          { id: 3, title: 'Page object model', resources: [{ title: 'PO pattern', size: '300 KB', file: '/Asset/resources/testing/po-pattern.pdf' }] },
          { id: 4, title: 'CI integration', resources: [{ title: 'CI guide', size: '400 KB', file: '/Asset/resources/testing/ci-guide.pdf' }] },
          { id: 5, title: 'Best practices', resources: [{ title: 'Automation best practices', size: '150 KB', file: '/Asset/resources/testing/automation-best.pdf' }] },
          { id: 6, title: 'Flaky tests', resources: [{ title: 'Flaky tests', size: '180 KB', file: '/Asset/resources/testing/flaky-tests.pdf' }] },
        ],
      },
      {
        id: 4,
        title: 'API Testing & Postman',
        lectures: 4,
        duration: '2 hr',
        topics: [
          { id: 1, title: 'HTTP basics', resources: [{ title: 'HTTP cheat sheet', size: '90 KB', file: '/Asset/resources/testing/http.pdf' }] },
          { id: 2, title: 'Postman collections', resources: [{ title: 'Postman collection', size: '500 KB', file: '/Asset/resources/testing/postman-collection.json' }] },
          { id: 3, title: 'API assertions', resources: [{ title: 'Assertion examples', size: '120 KB', file: '/Asset/resources/testing/api-assertions.pdf' }] },
          { id: 4, title: 'Mocking APIs', resources: [{ title: 'Mocking guide', size: '80 KB', file: '/Asset/resources/testing/mocking.pdf' }] },
        ],
      },
    ],
    whatYouWillLearn: [
      'Write effective manual test cases',
      'Automate web UI tests with Selenium',
      'Use Postman for API testing',
      'Integrate tests into CI pipelines',
    ],
    resources: [
      { title: 'Course Slides', size: '2.1 MB', file: '/Asset/resources/testing-slides.pdf' },
      { title: 'Sample Test Cases', size: '800 KB', file: '/Asset/resources/testing-cases.pdf' },
    ],
  },
  {
    id: 11,
    title: 'Node.js APIs and Microservices',
  shortDescription: 'Build scalable Node APIs and microservices. Includes hands-on projects for observability and deployment.',
    description: 'Build scalable APIs with Node, Express and microservice patterns. Learn how to design RESTful services, integrate databases, and apply microservice communication patterns. Hands-on projects teach testing, observability, and deployment practices for production-ready services.',
    image: '/Asset/nodejs.jpg',
    rating: 3.3,
    reviews: 480,
    durationHours: 14,
    price: 29,
    totalVideos: 18,
    instructorName: 'Samira Khan',
    instructorImage: '/Asset/samira.jpg',
    level: 'Advanced',
    modules: [
      { id: 1,
        title: 'Node.js Fundamentals',
        lectures: 4,
        duration: '2 hr',
        topics: [
          { id: 1, title: 'Runtime & modules', resources: [{ title: 'Node overview', size: '200 KB', file: '/Asset/resources/node/runtime.pdf' }] },
          { id: 2, title: 'Event loop', resources: [{ title: 'Event loop explainer', size: '150 KB', file: '/Asset/resources/node/event-loop.pdf' }] },
          { id: 3, title: 'Streams', resources: [{ title: 'Streams guide', size: '180 KB', file: '/Asset/resources/node/streams.pdf' }] },
          { id: 4, title: 'Buffers', resources: [{ title: 'Buffers notes', size: '90 KB', file: '/Asset/resources/node/buffers.pdf' }] },
        ] },
      { id: 2,
        title: 'Express & Routing',
        lectures: 5,
        duration: '3 hr',
        topics: [
          { id: 1, title: 'Routing basics', resources: [{ title: 'Routing cheatsheet', size: '80 KB', file: '/Asset/resources/node/routing.pdf' }] },
          { id: 2, title: 'Middleware', resources: [{ title: 'Middleware patterns', size: '120 KB', file: '/Asset/resources/node/middleware.pdf' }] },
          { id: 3, title: 'Error handling', resources: [{ title: 'Error handling', size: '70 KB', file: '/Asset/resources/node/errors.pdf' }] },
          { id: 4, title: 'Security', resources: [{ title: 'Security checklist', size: '140 KB', file: '/Asset/resources/node/security.pdf' }] },
          { id: 5, title: 'Testing APIs', resources: [{ title: 'API testing guide', size: '200 KB', file: '/Asset/resources/node/api-testing.pdf' }] },
        ] },
      { id: 3,
        title: 'Databases & ORMs',
        lectures: 5,
        duration: '3.5 hr',
        topics: [
          { id: 1, title: 'SQL vs NoSQL', resources: [{ title: 'DB comparison', size: '120 KB', file: '/Asset/resources/node/db-compare.pdf' }] },
          { id: 2, title: 'Using ORM', resources: [{ title: 'ORM cheatsheet', size: '200 KB', file: '/Asset/resources/node/orm.pdf' }] },
          { id: 3, title: 'Migrations', resources: [{ title: 'Migration guide', size: '90 KB', file: '/Asset/resources/node/migrations.pdf' }] },
          { id: 4, title: 'Indexing', resources: [{ title: 'Indexing notes', size: '80 KB', file: '/Asset/resources/node/indexing.pdf' }] },
          { id: 5, title: 'Replication', resources: [{ title: 'Replication primer', size: '110 KB', file: '/Asset/resources/node/replication.pdf' }] },
        ] },
      { id: 4,
        title: 'Microservices Patterns',
        lectures: 4,
        duration: '4 hr',
        topics: [
          { id: 1, title: 'Decomposition', resources: [{ title: 'Decomposition guide', size: '150 KB', file: '/Asset/resources/node/decomposition.pdf' }] },
          { id: 2, title: 'Communication', resources: [{ title: 'Comm patterns', size: '200 KB', file: '/Asset/resources/node/communication.pdf' }] },
          { id: 3, title: 'Sagas', resources: [{ title: 'Sagas overview', size: '100 KB', file: '/Asset/resources/node/sagas.pdf' }] },
          { id: 4, title: 'Observability', resources: [{ title: 'Observability notes', size: '130 KB', file: '/Asset/resources/node/observability.pdf' }] },
        ] },
    ],
    whatYouWillLearn: [
      'Create RESTful APIs with Express',
      'Design microservices and communicate between services',
      'Persist data using popular databases',
    ],
    resources: [
      { title: 'API Reference', size: '1.2 MB', file: '/Asset/resources/node-api.pdf' },
    ],
  },
  {
    id: 10,
    title: 'Design Thinking for Product Teams',
  shortDescription: 'User-centric design and rapid prototyping for teams. Learn validation, usability testing, and prototype delivery.',
    description: 'Learn user-centric design and rapid prototyping for product teams. This course covers user research, ideation, and prototyping techniques with practical templates and guided workshops. You will learn to validate ideas, run usability tests, and produce prototype artifacts for stakeholders.',
    image: '/Asset/design think.png',
    rating: 4.1,
    reviews: 390,
    durationHours: 6,
    price: 0,
    totalVideos: 12,
    instructorName: 'John Hamilton',
    instructorImage: '/Asset/john hamilton.jpg',
    level: 'Beginner',
    modules: [
  { id: 1,
    title: 'Empathy & Research',
    lectures: 4,
    duration: '1.5 hr',
    topics: [
          { id: 1, title: 'User interviews', resources: [{ title: 'Interview template', size: '80 KB', file: '/Asset/resources/design/interviews.pdf' }] },
          { id: 2, title: 'Surveys', resources: [{ title: 'Survey tips', size: '60 KB', file: '/Asset/resources/design/surveys.pdf' }] },
          { id: 3, title: 'Affinity mapping', resources: [{ title: 'Affinity examples', size: '90 KB', file: '/Asset/resources/design/affinity.pdf' }] },
          { id: 4, title: 'Personas', resources: [{ title: 'Persona template', size: '70 KB', file: '/Asset/resources/design/persona.pdf' }] },
        ] },
  { id: 2,
    title: 'Ideation',
    lectures: 4,
    duration: '1 hr',
    topics: [
          { id: 1, title: 'Brainstorming', resources: [{ title: 'Brainstorm canvas', size: '120 KB', file: '/Asset/resources/design/brainstorm.pdf' }] },
          { id: 2, title: 'Sketching', resources: [{ title: 'Sketch tips', size: '80 KB', file: '/Asset/resources/design/sketch.pdf' }] },
          { id: 3, title: 'Prioritization', resources: [{ title: 'Prioritization matrix', size: '60 KB', file: '/Asset/resources/design/prioritize.pdf' }] },
          { id: 4, title: 'Idea validation', resources: [{ title: 'Validation guide', size: '100 KB', file: '/Asset/resources/design/validate.pdf' }] },
        ] },
      { id: 3,
        title: 'Prototyping',
        lectures: 4,
        duration: '2 hr',
        topics: [
          { id: 1, title: 'Low-fidelity prototyping', resources: [{ title: 'Lo-fi templates', size: '350 KB', file: '/Asset/resources/design/lofi.zip' }] },
          { id: 2, title: 'High-fidelity prototyping', resources: [{ title: 'Hi-fi samples', size: '1.2 MB', file: '/Asset/resources/design/hifi.zip' }] },
          { id: 3, title: 'User testing', resources: [{ title: 'Test script', size: '80 KB', file: '/Asset/resources/design/test-script.pdf' }] },
          { id: 4, title: 'Iterating', resources: [{ title: 'Iteration checklist', size: '50 KB', file: '/Asset/resources/design/iterate.pdf' }] },
        ] },
    ],
    whatYouWillLearn: [
      'Conduct user research',
      'Generate and validate product ideas',
      'Build low-fidelity prototypes and test them',
    ],
    resources: [
      { title: 'Design Templates', size: '3.1 MB', file: '/Asset/resources/design-templates.zip' },
    ],
  },
  {
  id: 9,
  title: 'Intro to Database',
  shortDescription: 'Practical intro to relational and NoSQL databases. Hands-on labs cover schema design and query patterns.',
  description: 'Understand relational and NoSQL databases and how to model data. Topics include ER modeling, SQL queries, indexing, transactions, and NoSQL patterns with practical examples and exercises. The course includes dataset-driven labs and schema design guidance for real applications.',
  image: '/Asset/database.jpg',
  rating: 4.0,
  reviews: 210,
  durationHours: 7,
  price: 9,
  totalVideos: 15,
  instructorName: 'Daniel Park',
  instructorImage: '/Asset/daniel.jpg',
  level: 'Beginner',
  modules: [
    { 
      id: 1,
      title: 'Data Modeling',
      lectures: 5,
      duration: '2 hr',
      topics: [
        { id: 1, title: 'ER modeling', resources: [{ title: 'ER guide', size: '200 KB', file: '/Asset/resources/db/er-guide.pdf' }] },
        { id: 2, title: 'Normalization', resources: [{ title: 'Normalization notes', size: '120 KB', file: '/Asset/resources/db/normalization.pdf' }] },
        { id: 3, title: 'Relationships', resources: [{ title: 'Relationship types', size: '90 KB', file: '/Asset/resources/db/relationships.pdf' }] },
        { id: 4, title: 'Design tradeoffs', resources: [{ title: 'Design tradeoffs', size: '80 KB', file: '/Asset/resources/db/tradeoffs.pdf' }] },
        { id: 5, title: 'Schema Design', resources: [{ title: 'Schema design principles', size: '150 KB', file: '/Asset/resources/db/schema-design.pdf' }] }  // Added topic
      ]
    },
    { 
      id: 2,
      title: 'SQL Basics',
      lectures: 5,
      duration: '3 hr',
      topics: [
        { id: 1, title: 'SELECT & JOINs', resources: [{ title: 'Query cheatsheet', size: '150 KB', file: '/Asset/resources/db/queries.pdf' }] },
        { id: 2, title: 'Aggregation', resources: [{ title: 'Aggregation examples', size: '120 KB', file: '/Asset/resources/db/aggregation.pdf' }] },
        { id: 3, title: 'Indexes', resources: [{ title: 'Index guide', size: '110 KB', file: '/Asset/resources/db/indexes.pdf' }] },
        { id: 4, title: 'Transactions', resources: [{ title: 'Transactions notes', size: '90 KB', file: '/Asset/resources/db/transactions.pdf' }] },
        { id: 5, title: 'Subqueries', resources: [{ title: 'Subqueries tutorial', size: '130 KB', file: '/Asset/resources/db/subqueries.pdf' }] }  // Added topic
      ]
    },
    { 
      id: 3,
      title: 'NoSQL Patterns',
      lectures: 5, 
      duration: '1.5 hr',
      topics: [
        { id: 1, title: 'Document stores', resources: [{ title: 'Docs primer', size: '140 KB', file: '/Asset/resources/db/document-stores.pdf' }] },
        { id: 2, title: 'Key-value', resources: [{ title: 'KV patterns', size: '100 KB', file: '/Asset/resources/db/kv.pdf' }] },
        { id: 3, title: 'When to choose NoSQL', resources: [{ title: 'Decision guide', size: '120 KB', file: '/Asset/resources/db/when-nosql.pdf' }] },
        { id: 4, title: 'CAP theorem', resources: [{ title: 'CAP summary', size: '80 KB', file: '/Asset/resources/db/cap.pdf' }] },
        { id: 5, title: 'Column-family stores', resources: [{ title: 'Column-family stores overview', size: '110 KB', file: '/Asset/resources/db/column-family.pdf' }] }  // Added topic
      ]
    }
  ],
  whatYouWillLearn: [
    'Model relational data',
    'Write SQL queries',
    'Choose when to use NoSQL',
  ],
  resources: [
    { title: 'Sample ER Diagrams', size: '900 KB', file: '/Asset/resources/er-diagrams.pdf' },
  ],
},
  {
  id: 8,
  title: 'Python Crash Course',
  shortDescription: 'Fast-paced Python for prototyping and scripting. Covers practical scripts, data handling, and real examples.',
  description: 'A fast-paced introduction to Python for beginners and engineers who want to prototype quickly. You will learn core syntax, data structures, scripting tools, and advanced topics like decorators and generators. Each module includes code examples, exercises, and downloadable scripts to practice.',
  image: '/Asset/python.webp',
  rating: 4.6,
  reviews: 890,
  durationHours: 8,
  price: 10,
  totalVideos: 20,
  instructorName: 'Karan Sharma',
  instructorImage: '/Asset/karan.jpg',
  level: 'Beginner',
  modules: [
    { 
      id: 1, 
      title: 'Python Basics', 
      lectures: 5, 
      duration: '2.5 hr', 
      topics: [
        { id: 1, title: 'Syntax & variables', resources: [{ title: 'Syntax cheatsheet', size: '80 KB', file: '/Asset/resources/python/syntax.pdf' }] },
        { id: 2, title: 'Control flow', resources: [{ title: 'Flow examples', size: '90 KB', file: '/Asset/resources/python/flow.pdf' }] },
        { id: 3, title: 'Functions', resources: [{ title: 'Functions guide', size: '110 KB', file: '/Asset/resources/python/functions.pdf' }] },
        { id: 4, title: 'Modules & packages', resources: [{ title: 'Packaging', size: '120 KB', file: '/Asset/resources/python/packages.pdf' }] },
        { id: 5, title: 'Error handling', resources: [{ title: 'Error handling tutorial', size: '90 KB', file: '/Asset/resources/python/errors.pdf' }] } // Added 5th topic
      ]
    },
    { 
      id: 2, 
      title: 'Data Structures', 
      lectures: 5, 
      duration: '2 hr', 
      topics: [
        { id: 1, title: 'Lists & tuples', resources: [{ title: 'Lists examples', size: '100 KB', file: '/Asset/resources/python/lists.pdf' }] },
        { id: 2, title: 'Dictionaries', resources: [{ title: 'Dicts guide', size: '90 KB', file: '/Asset/resources/python/dicts.pdf' }] },
        { id: 3, title: 'Sets', resources: [{ title: 'Sets notes', size: '60 KB', file: '/Asset/resources/python/sets.pdf' }] },
        { id: 4, title: 'Comprehensions', resources: [{ title: 'Comprehensions', size: '80 KB', file: '/Asset/resources/python/comprehensions.pdf' }] },
        { id: 5, title: 'Queues & Stacks', resources: [{ title: 'Queues & Stacks notes', size: '110 KB', file: '/Asset/resources/python/queues-stacks.pdf' }] } // Added 5th topic
      ]
    },
    { 
      id: 3, 
      title: 'Scripting & Tools', 
      lectures: 5, 
      duration: '2 hr', 
      topics: [
        { id: 1, title: 'File I/O', resources: [{ title: 'File examples', size: '70 KB', file: '/Asset/resources/python/file-io.pdf' }] },
        { id: 2, title: 'Virtualenv & pip', resources: [{ title: 'Env guide', size: '60 KB', file: '/Asset/resources/python/env.pdf' }] },
        { id: 3, title: 'argparse', resources: [{ title: 'Argparse cheat', size: '50 KB', file: '/Asset/resources/python/argparse.pdf' }] },
        { id: 4, title: 'Working with libs', resources: [{ title: 'Libraries list', size: '120 KB', file: '/Asset/resources/python/libs.pdf' }] },
        { id: 5, title: 'Debugging Tools', resources: [{ title: 'Debugger guide', size: '80 KB', file: '/Asset/resources/python/debugger.pdf' }] } // Added 5th topic
      ]
    },
    { 
      id: 4, 
      title: 'Advanced Python', 
      lectures: 5, 
      duration: '2 hr', 
      topics: [
        { id: 1, title: 'Decorators', resources: [{ title: 'Decorators tutorial', size: '130 KB', file: '/Asset/resources/python/decorators.pdf' }] },
        { id: 2, title: 'Generators', resources: [{ title: 'Generators guide', size: '120 KB', file: '/Asset/resources/python/generators.pdf' }] },
        { id: 3, title: 'Context Managers', resources: [{ title: 'Context manager notes', size: '110 KB', file: '/Asset/resources/python/context-managers.pdf' }] },
        { id: 4, title: 'Metaprogramming', resources: [{ title: 'Metaprogramming intro', size: '140 KB', file: '/Asset/resources/python/metaprogramming.pdf' }] },
        { id: 5, title: 'Concurrency', resources: [{ title: 'Concurrency in Python', size: '150 KB', file: '/Asset/resources/python/concurrency.pdf' }] } // Added 5th topic
      ]
    },
  ],
  whatYouWillLearn: [
    'Write Python programs',
    'Work with lists, dicts and files',
    'Use standard libraries to automate tasks',
    'Understand advanced Python concepts like decorators, generators, and metaprogramming',
  ],
  resources: [
    { title: 'Code Examples', size: '1.2 MB', file: '/Asset/resources/python-examples.zip' },
  ],
},
  {
    id: 7,
    title: 'Advanced React Patterns',
  shortDescription: 'Advanced React patterns for scaling apps. Learn advanced hooks, state architecture, and profiling techniques.',
  description: 'Take your React skills to the next level with hooks, context, and performance patterns. Focused lessons cover advanced hooks, state architecture, and profiling strategies to scale React applications. Includes pattern libraries, practical refactors, and exercises to optimize real-world apps.',
    image: '/Asset/advance react.jpg',
    rating: 4.4,
    reviews: 640,
    durationHours: 10,
    price: 30,
    totalVideos: 12,
    instructorName: 'Morgan Lee',
    instructorImage: '/Asset/morgan lee.jpg',
    level: 'Advanced',
    modules: [
      { id: 1,
        title: 'Hooks Deep-dive',
        lectures: 4,
        duration: '2.5 hr',
        topics: [
          { id: 1, title: 'useEffect & timing', resources: [{ title: 'useEffect notes', size: '80 KB', file: '/Asset/resources/react/useeffect.pdf' }] },
          { id: 2, title: 'useMemo & useCallback', resources: [{ title: 'Memo patterns', size: '90 KB', file: '/Asset/resources/react/memo.pdf' }] },
          { id: 3, title: 'Custom hooks', resources: [{ title: 'Custom hooks guide', size: '110 KB', file: '/Asset/resources/react/custom-hooks.pdf' }] },
          { id: 4, title: 'Testing hooks', resources: [{ title: 'Testing hooks', size: '100 KB', file: '/Asset/resources/react/test-hooks.pdf' }] },
        ] },
      { id: 2,
        title: 'Context & Patterns',
        lectures: 4,
        duration: '2 hr',
        topics: [
          { id: 1, title: 'Context usage', resources: [{ title: 'Context examples', size: '90 KB', file: '/Asset/resources/react/context.pdf' }] },
          { id: 2, title: 'State colocation', resources: [{ title: 'State strategies', size: '80 KB', file: '/Asset/resources/react/state.pdf' }] },
          { id: 3, title: 'Composition patterns', resources: [{ title: 'Composition', size: '70 KB', file: '/Asset/resources/react/composition.pdf' }] },
          { id: 4, title: 'Render props vs hooks', resources: [{ title: 'Patterns compare', size: '60 KB', file: '/Asset/resources/react/pattern-compare.pdf' }] },
        ] },
      { id: 3,
        title: 'Performance',
        lectures: 4,
        duration: '2 hr',
        topics: [
          { id: 1, title: 'Profiling', resources: [{ title: 'Profiler guide', size: '120 KB', file: '/Asset/resources/react/profiler.pdf' }] },
          { id: 2, title: 'Code-splitting', resources: [{ title: 'Code-splitting', size: '90 KB', file: '/Asset/resources/react/code-split.pdf' }] },
          { id: 3, title: 'Optimizing renders', resources: [{ title: 'Render tips', size: '80 KB', file: '/Asset/resources/react/optimize.pdf' }] },
          { id: 4, title: 'Memoization', resources: [{ title: 'Memo guide', size: '70 KB', file: '/Asset/resources/react/memoization.pdf' }] },
        ] },
    ],
    whatYouWillLearn: [
      'Use advanced hooks patterns',
      'Structure large React apps',
      'Improve runtime performance',
    ],
    resources: [
      { title: 'Pattern Library', size: '2.0 MB', file: '/Asset/resources/react-patterns.pdf' },
    ],
  },
  {
  id: 6,
  title: 'Web Development Bootcamp',
  shortDescription: 'Fullstack web dev — HTML, CSS, JS to deployment. Build and deploy a starter app with guided templates.',
  description: 'Become a fullstack web developer by taking this ONE course, even if you have never coded before. Learn HTML, CSS, JavaScript, Node.js, and deployment through guided projects and starter templates. By the end you will deploy a fullstack app and understand the core workflows used in modern development.',
  image: '/Asset/webdev.jpg',
  rating: 4.9,
  reviews: 3530,
  durationHours: 12,
  price: 0,
  totalVideos: 16,
  instructorName: 'Karim Kabir',
  instructorImage: '/Asset/karim.jpg',
  level: 'Beginner',
  modules: [
    { 
      id: 1, 
      title: 'HTML & CSS', 
      lectures: 4, 
      duration: '3 hr', 
      topics: [
        { id: 1, title: 'HTML semantics', resources: [{ title: 'HTML checklist', size: '80 KB', file: '/Asset/resources/web/html.pdf' }] },
        { id: 2, title: 'CSS basics', resources: [{ title: 'CSS guide', size: '120 KB', file: '/Asset/resources/web/css.pdf' }] },
        { id: 3, title: 'Flexbox & Grid', resources: [{ title: 'Layout cheatsheet', size: '140 KB', file: '/Asset/resources/web/layout.pdf' }] },
        { id: 4, title: 'Responsive design', resources: [{ title: 'Responsive tips', size: '90 KB', file: '/Asset/resources/web/responsive.pdf' }] },
      ] 
    },
    { 
      id: 2, 
      title: 'JavaScript Fundamentals', 
      lectures: 4, 
      duration: '4 hr', 
      topics: [
        { id: 1, title: 'DOM manipulation', resources: [{ title: 'DOM guide', size: '110 KB', file: '/Asset/resources/web/dom.pdf' }] },
        { id: 2, title: 'ES6+', resources: [{ title: 'ES6 features', size: '130 KB', file: '/Asset/resources/web/es6.pdf' }] },
        { id: 3, title: 'Async patterns', resources: [{ title: 'Async patterns', size: '120 KB', file: '/Asset/resources/web/async.pdf' }] },
        { id: 4, title: 'Fetch & AJAX', resources: [{ title: 'Network guide', size: '90 KB', file: '/Asset/resources/web/fetch.pdf' }] },
      ] 
    },
    { 
      id: 3, 
      title: 'Backend with Node', 
      lectures: 4, 
      duration: '4 hr', 
      topics: [
        { id: 1, title: 'Intro to Node', resources: [{ title: 'Node primer', size: '100 KB', file: '/Asset/resources/web/node-primer.pdf' }] },
        { id: 2, title: 'Express basics', resources: [{ title: 'Express cheatsheet', size: '110 KB', file: '/Asset/resources/web/express.pdf' }] },
        { id: 3, title: 'Routing & APIs', resources: [{ title: 'APIs guide', size: '120 KB', file: '/Asset/resources/web/apis.pdf' }] },
        { id: 4, title: 'Deployment', resources: [{ title: 'Deploy notes', size: '150 KB', file: '/Asset/resources/web/deploy.pdf' }] },
      ] 
    },
    { 
      id: 4, 
      title: 'Advanced JavaScript', 
      lectures: 4, 
      duration: '3 hr', 
      topics: [
        { id: 1, title: 'Event Handling', resources: [{ title: 'Event Handling Guide', size: '110 KB', file: '/Asset/resources/web/events.pdf' }] },
        { id: 2, title: 'Asynchronous JS', resources: [{ title: 'Async JS Concepts', size: '120 KB', file: '/Asset/resources/web/asyncjs.pdf' }] },
        { id: 3, title: 'Promises & Callbacks', resources: [{ title: 'Promises and Callbacks', size: '140 KB', file: '/Asset/resources/web/promises.pdf' }] },
        { id: 4, title: 'JavaScript ES6+', resources: [{ title: 'ES6+ Features', size: '130 KB', file: '/Asset/resources/web/es6plus.pdf' }] },
      ] 
    },
  ],
  whatYouWillLearn: [
    'Build responsive websites',
    'Write JavaScript for the browser and server',
    'Deploy fullstack applications',
    'Work with advanced JavaScript concepts',
  ],
  resources: [
    { title: 'Starter Templates', size: '3.5 MB', file: '/Asset/resources/web-templates.zip' },
  ],
},
  {
  id: 5,
  title: 'UI/UX Fundamentals',
  shortDescription: 'Foundations of UI/UX: design, wireframing, prototypes. Hands-on exercises and a ready-to-use UI kit included.',
  description: 'Do you love designing? If so, this course is the perfect one for you. Learn UI/UX foundations, wireframing, and prototyping tools with practical exercises and a complete UI kit. The course emphasizes real design workflows, handoff best practices, and portfolio-ready projects.',
  image: '/Asset/uiux.webp',
  rating: 2.9,
  reviews: 2570,
  durationHours: 5,
  price: 14,
  totalVideos: 14,
  instructorName: 'John Hamilton',
  instructorImage: '/Asset/john hamilton.jpg',
  level: 'Beginner',
  modules: [
    { 
      id: 1, 
      title: 'Design Basics', 
      lectures: 5, 
      duration: '2 hr', 
      topics: [
        { id: 1, title: 'Principles', resources: [{ title: 'Design principles', size: '90 KB', file: '/Asset/resources/ui/principles.pdf' }] },
        { id: 2, title: 'Color theory', resources: [{ title: 'Color guide', size: '80 KB', file: '/Asset/resources/ui/color.pdf' }] },
        { id: 3, title: 'Typography', resources: [{ title: 'Typography notes', size: '60 KB', file: '/Asset/resources/ui/typography.pdf' }] },
        { id: 4, title: 'Layout', resources: [{ title: 'Layout tips', size: '70 KB', file: '/Asset/resources/ui/layout.pdf' }] },
        { id: 5, title: 'Design tools overview', resources: [{ title: 'Tools guide', size: '100 KB', file: '/Asset/resources/ui/tools.pdf' }] },
      ] 
    },
    { 
      id: 2, 
      title: 'Wireframing', 
      lectures: 5, 
      duration: '1.5 hr', 
      topics: [
        { id: 1, title: 'Low-fi patterns', resources: [{ title: 'Lo-fi templates', size: '250 KB', file: '/Asset/resources/ui/lofi.zip' }] },
        { id: 2, title: 'Flow mapping', resources: [{ title: 'Flow samples', size: '120 KB', file: '/Asset/resources/ui/flow.pdf' }] },
        { id: 3, title: 'Annotations', resources: [{ title: 'Annotation guide', size: '60 KB', file: '/Asset/resources/ui/annotations.pdf' }] },
        { id: 4, title: 'Wireframe checklist', resources: [{ title: 'Checklist', size: '40 KB', file: '/Asset/resources/ui/checklist.pdf' }] },
        { id: 5, title: 'Interactive wireframes', resources: [{ title: 'Interactive wireframes guide', size: '150 KB', file: '/Asset/resources/ui/interactives.pdf' }] },
      ] 
    },
    { 
      id: 3, 
      title: 'Prototyping Tools', 
      lectures: 4, 
      duration: '1 hr', 
      topics: [
        { id: 1, title: 'Figma basics', resources: [{ title: 'Figma cheats', size: '200 KB', file: '/Asset/resources/ui/figma.pdf' }] },
        { id: 2, title: 'Prototype interactions', resources: [{ title: 'Interactions guide', size: '120 KB', file: '/Asset/resources/ui/interactions.pdf' }] },
        { id: 3, title: 'Exporting assets', resources: [{ title: 'Export guide', size: '80 KB', file: '/Asset/resources/ui/export.pdf' }] },
        { id: 4, title: 'Design tokens', resources: [{ title: 'Tokens primer', size: '60 KB', file: '/Asset/resources/ui/tokens.pdf' }] },
      ] 
    },
  ],
  whatYouWillLearn: [
    'Design usable interfaces',
    'Create wireframes and prototypes',
    'Design handoff best practices',
    'Use advanced design tools',
  ],
  resources: [
    { title: 'UI Kit', size: '4.2 MB', file: '/Asset/resources/ui-kit.zip' },
  ],
},
  {
  id: 4,
  title: 'Data Science with Python',
  shortDescription: 'Data science with Python: cleaning, modeling, deployment. Learn with notebooks and practical datasets.',
  description: 'Learn data science with python by taking this course, and build your desired career. Covers data cleaning, exploration, modeling basics, and evaluation with hands-on notebooks and practical datasets. You will also get guidance on deploying models and assembling a data-science portfolio.',
  image: '/Asset/data science.jpeg',
  rating: 3.9,
  reviews: 1340,
  durationHours: 18,
  price: 25,
  totalVideos: 15,
  instructorName: 'Jashim Uddin',
  instructorImage: '/Asset/jashim uddin.jpg',
  level: 'Intermediate',
  modules: [
    { 
      id: 1, 
      title: 'Python for Data', 
      lectures: 5, 
      duration: '5 hr', 
      topics: [
        { id: 1, title: 'Jupyter & tooling', resources: [{ title: 'Jupyter tips', size: '120 KB', file: '/Asset/resources/ds/jupyter.pdf' }] },
        { id: 2, title: 'Data cleaning', resources: [{ title: 'Cleaning checklist', size: '140 KB', file: '/Asset/resources/ds/cleaning.pdf' }] },
        { id: 3, title: 'Exploration', resources: [{ title: 'EDA notes', size: '160 KB', file: '/Asset/resources/ds/eda.pdf' }] },
        { id: 4, title: 'Visualization', resources: [{ title: 'Viz examples', size: '200 KB', file: '/Asset/resources/ds/viz.pdf' }] },
        { id: 5, title: 'Advanced Jupyter features', resources: [{ title: 'Advanced Jupyter', size: '180 KB', file: '/Asset/resources/ds/advanced-jupyter.pdf' }] },
      ] 
    },
    { 
      id: 2, 
      title: 'Pandas & NumPy', 
      lectures: 5, 
      duration: '5 hr', 
      topics: [
        { id: 1, title: 'NumPy basics', resources: [{ title: 'NumPy primer', size: '200 KB', file: '/Asset/resources/ds/numpy.pdf' }] },
        { id: 2, title: 'Pandas Series/DataFrame', resources: [{ title: 'Pandas guide', size: '300 KB', file: '/Asset/resources/ds/pandas.pdf' }] },
        { id: 3, title: 'Grouping & joins', resources: [{ title: 'Grouping notes', size: '120 KB', file: '/Asset/resources/ds/grouping.pdf' }] },
        { id: 4, title: 'Performance tips', resources: [{ title: 'Performance', size: '100 KB', file: '/Asset/resources/ds/performance.pdf' }] },
        { id: 5, title: 'Pandas advanced functions', resources: [{ title: 'Advanced pandas', size: '180 KB', file: '/Asset/resources/ds/advanced-pandas.pdf' }] },
      ] 
    },
    { 
      id: 3, 
      title: 'Modeling Basics', 
      lectures: 5, 
      duration: '5 hr', 
      topics: [
        { id: 1, title: 'Supervised learning', resources: [{ title: 'Supervised primer', size: '220 KB', file: '/Asset/resources/ds/supervised.pdf' }] },
        { id: 2, title: 'Model evaluation', resources: [{ title: 'Evaluation guide', size: '150 KB', file: '/Asset/resources/ds/evaluation.pdf' }] },
        { id: 3, title: 'Feature engineering', resources: [{ title: 'Feature tips', size: '130 KB', file: '/Asset/resources/ds/feature.pdf' }] },
        { id: 4, title: 'Model deployment', resources: [{ title: 'Deploy notes', size: '200 KB', file: '/Asset/resources/ds/deploy.pdf' }] },
        { id: 5, title: 'Unsupervised learning basics', resources: [{ title: 'Unsupervised primer', size: '180 KB', file: '/Asset/resources/ds/unsupervised.pdf' }] },
      ] 
    },
  ],
  whatYouWillLearn: [
    'Process data with Pandas',
    'Build basic machine learning models',
    'Evaluate model performance',
    'Apply advanced machine learning concepts',
  ],
  resources: [
    { title: 'Datasets', size: '8.1 MB', file: '/Asset/resources/datasets.zip' },
  ],
},
  {
  id: 3,
  title: 'HTML, CSS, JS Basics',
  shortDescription: 'Frontend basics: HTML, CSS, and vanilla JavaScript. Build small projects and deploy simple applications.',
  description: 'Learn frontend development from the ground up. This course covers semantic HTML, responsive CSS, and vanilla JavaScript with practical projects and deployable examples. You will build small applications to reinforce concepts and prepare for more advanced frontend work.',
  image: '/Asset/html-css-javascript.jpg',
  rating: 3.8,
  reviews: 2200,
  durationHours: 12,
  price: 0,
  totalVideos: 20,
  instructorName: 'Emily Rose',
  instructorImage: '/Asset/emily rose.jpg',
  level: 'Beginner',
  modules: [
    { 
      id: 1, 
      title: 'HTML Essentials', 
      lectures: 5, 
      duration: '4 hr', 
      topics: [
        { id: 1, title: 'Tags & semantics', resources: [{ title: 'Tags reference', size: '110 KB', file: '/Asset/resources/frontend/tags.pdf' }] },
        { id: 2, title: 'Forms', resources: [{ title: 'Forms guide', size: '90 KB', file: '/Asset/resources/frontend/forms.pdf' }] },
        { id: 3, title: 'Accessibility basics', resources: [{ title: 'A11y checklist', size: '80 KB', file: '/Asset/resources/frontend/a11y.pdf' }] },
        { id: 4, title: 'SEO basics', resources: [{ title: 'SEO notes', size: '70 KB', file: '/Asset/resources/frontend/seo.pdf' }] },
        { id: 5, title: 'HTML5 APIs', resources: [{ title: 'HTML5 API overview', size: '100 KB', file: '/Asset/resources/frontend/html5-api.pdf' }] }
      ] 
    },
    { 
      id: 2, 
      title: 'CSS Layouts', 
      lectures: 5, 
      duration: '4.5 hr', 
      topics: [
        { id: 1, title: 'Flexbox', resources: [{ title: 'Flexbox cheatsheet', size: '100 KB', file: '/Asset/resources/frontend/flexbox.pdf' }] },
        { id: 2, title: 'Grid', resources: [{ title: 'Grid examples', size: '120 KB', file: '/Asset/resources/frontend/grid.pdf' }] },
        { id: 3, title: 'Responsive patterns', resources: [{ title: 'Responsive examples', size: '140 KB', file: '/Asset/resources/frontend/responsive.pdf' }] },
        { id: 4, title: 'Utilities', resources: [{ title: 'Utility classes', size: '80 KB', file: '/Asset/resources/frontend/utilities.pdf' }] },
        { id: 5, title: 'Flexbox vs Grid', resources: [{ title: 'Flex vs Grid guide', size: '130 KB', file: '/Asset/resources/frontend/flex-vs-grid.pdf' }] }
      ] 
    },
    { 
      id: 3, 
      title: 'JavaScript Basics', 
      lectures: 5, 
      duration: '4.5 hr', 
      topics: [
        { id: 1, title: 'Variables & types', resources: [{ title: 'Types guide', size: '60 KB', file: '/Asset/resources/frontend/types.pdf' }] },
        { id: 2, title: 'Functions & scope', resources: [{ title: 'Scope notes', size: '70 KB', file: '/Asset/resources/frontend/scope.pdf' }] },
        { id: 3, title: 'Events', resources: [{ title: 'Events guide', size: '90 KB', file: '/Asset/resources/frontend/events.pdf' }] },
        { id: 4, title: 'DOM APIs', resources: [{ title: 'DOM API examples', size: '100 KB', file: '/Asset/resources/frontend/dom-api.pdf' }] },
        { id: 5, title: 'ES6 features', resources: [{ title: 'ES6 syntax', size: '120 KB', file: '/Asset/resources/frontend/es6.pdf' }] }
      ] 
    },
    { 
      id: 4, 
      title: 'Advanced JavaScript Concepts', 
      lectures: 5, 
      duration: '4.5 hr', 
      topics: [
        { id: 1, title: 'Closures', resources: [{ title: 'Closures guide', size: '150 KB', file: '/Asset/resources/frontend/closures.pdf' }] },
        { id: 2, title: 'Asynchronous JS', resources: [{ title: 'Async JS notes', size: '160 KB', file: '/Asset/resources/frontend/async.pdf' }] },
        { id: 3, title: 'Prototypal Inheritance', resources: [{ title: 'Inheritance notes', size: '170 KB', file: '/Asset/resources/frontend/inheritance.pdf' }] },
        { id: 4, title: 'ES6 Classes', resources: [{ title: 'ES6 class overview', size: '140 KB', file: '/Asset/resources/frontend/es6-classes.pdf' }] },
        { id: 5, title: 'JavaScript Design Patterns', resources: [{ title: 'Design patterns', size: '180 KB', file: '/Asset/resources/frontend/design-patterns.pdf' }] }
      ] 
    },
  ],
  whatYouWillLearn: [
    'Build semantic HTML pages',
    'Style responsive layouts with CSS',
    'Add interactivity using vanilla JS',
    'Master advanced JavaScript techniques',
  ],
  resources: [
    { title: 'Boilerplate', size: '1.1 MB', file: '/Asset/resources/frontend-boilerplate.zip' },
  ],
},
  {
    id: 2,
    title: 'Manual and Automated Testing',
  shortDescription: 'Hands-on manual and automated testing fundamentals. Covers tooling, scripting, and CI integration with labs.',
  description: 'Learn testing fundamentals for both manual and automated approaches. This course covers tooling setup, test case design, automation scripting, and CI integration with hands-on labs and example scripts. It is ideal for learners who want practical testing experience and reusable resources.',
    image: '/Asset/testing.jpg',
    rating: 4.7,
    reviews: 1100,
    durationHours: 11,
    price: 12,
    totalVideos: 12,
    instructorName: 'Kate Weber',
    instructorImage: '/Asset/Kate weber.png',
    level: 'Intermediate',
    modules: [
  { id: 1,
    title: 'Intro & Tools',
    lectures: 4,
    duration: '1.5 hr',
    topics: [
          { id: 1, title: 'Testing tools', resources: [{ title: 'Tools list', size: '120 KB', file: '/Asset/resources/testing/tools-list.pdf' }] },
          { id: 2, title: 'Setting up', resources: [{ title: 'Setup guide', size: '150 KB', file: '/Asset/resources/testing/setup.pdf' }] },
          { id: 3, title: 'Test environments', resources: [{ title: 'Env notes', size: '90 KB', file: '/Asset/resources/testing/env.pdf' }] },
          { id: 4, title: 'Local workflow', resources: [{ title: 'Workflow', size: '80 KB', file: '/Asset/resources/testing/workflow-local.pdf' }] },
        ] },
  { id: 2,
    title: 'Manual Testing',
    lectures: 4,
    duration: '3 hr',
    topics: [
          { id: 1, title: 'Test scenarios', resources: [{ title: 'Scenario templates', size: '110 KB', file: '/Asset/resources/testing/scenarios.pdf' }] },
          { id: 2, title: 'Test data', resources: [{ title: 'Data examples', size: '90 KB', file: '/Asset/resources/testing/test-data.pdf' }] },
          { id: 3, title: 'Reporting', resources: [{ title: 'Reporting template', size: '70 KB', file: '/Asset/resources/testing/reporting.pdf' }] },
          { id: 4, title: 'Review process', resources: [{ title: 'Review checklist', size: '60 KB', file: '/Asset/resources/testing/review.pdf' }] },
        ] },
  { id: 3,
    title: 'Test Automation',
    lectures: 4,
    duration: '4 hr',
    topics: [
          { id: 1, title: 'Automation basics', resources: [{ title: 'Automation intro', size: '130 KB', file: '/Asset/resources/testing/auto-intro.pdf' }] },
          { id: 2, title: 'Scripting', resources: [{ title: 'Scripting guide', size: '140 KB', file: '/Asset/resources/testing/scripting.pdf' }] },
          { id: 3, title: 'Frameworks', resources: [{ title: 'Framework list', size: '160 KB', file: '/Asset/resources/testing/frameworks.pdf' }] },
          { id: 4, title: 'CI pipelines', resources: [{ title: 'CI examples', size: '180 KB', file: '/Asset/resources/testing/ci-examples.pdf' }] },
        ] },
    ],
    whatYouWillLearn: [
      'Design manual tests',
      'Automate tests using modern tools',
      'Interpret test reports',
    ],
    resources: [
      { title: 'Test Scripts', size: '900 KB', file: '/Asset/resources/test-scripts.zip' },
    ],
  },
  {
    id: 1,
    title: 'Web Development with MERN',
  shortDescription: 'Project-based MERN stack: build and deploy fullstack apps. Includes auth, data modeling, and deployment exercises.',
  description: 'Master the MERN stack by building real projects and end-to-end features. The course covers React frontend patterns, Node/Express APIs, MongoDB data modeling, authentication, and deployment. Includes starter templates, step-by-step labs, and exercises to reinforce each layer of the stack.',
    image: '/Asset/mern stack.jpg',
    rating: 4.8,
    reviews: 2340,
    durationHours: 19,
    price: 22,
    totalVideos: 16,
    instructorName: 'Sadia Islam',
    instructorImage: '/Asset/sadia islam.jpg',
    level: 'Advanced',
    modules: [
      { id: 1,
        title: 'MERN Overview',
        lectures: 4,
        duration: '2 hr',
        topics: [
          { id: 1, title: 'Stack intro', resources: [{ title: 'MERN overview', size: '200 KB', file: '/Asset/resources/mern/overview.pdf' }] },
          { id: 2, title: 'Project structure', resources: [{ title: 'Structure examples', size: '180 KB', file: '/Asset/resources/mern/structure.pdf' }] },
          { id: 3, title: 'Tooling', resources: [{ title: 'Tooling list', size: '120 KB', file: '/Asset/resources/mern/tooling.pdf' }] },
          { id: 4, title: 'Deployment options', resources: [{ title: 'Deploy options', size: '150 KB', file: '/Asset/resources/mern/deploy.pdf' }] },
        ] },
      { id: 2,
        title: 'React Frontend',
        lectures: 4,
        duration: '6 hr',
        topics: [
          { id: 1, title: 'Component model', resources: [{ title: 'Components guide', size: '200 KB', file: '/Asset/resources/mern/components.pdf' }] },
          { id: 2, title: 'State management', resources: [{ title: 'State patterns', size: '220 KB', file: '/Asset/resources/mern/state.pdf' }] },
          { id: 3, title: 'Routing', resources: [{ title: 'Routing examples', size: '130 KB', file: '/Asset/resources/mern/routing.pdf' }] },
          { id: 4, title: 'Forms & validation', resources: [{ title: 'Forms guide', size: '120 KB', file: '/Asset/resources/mern/forms.pdf' }] },
        ] },
      { id: 3,
        title: 'Node & Express Backend',
        lectures: 4,
        duration: '5 hr',
        topics: [
          { id: 1, title: 'API design', resources: [{ title: 'API design', size: '140 KB', file: '/Asset/resources/mern/api-design.pdf' }] },
          { id: 2, title: 'Database integration', resources: [{ title: 'DB integration', size: '160 KB', file: '/Asset/resources/mern/db-integration.pdf' }] },
          { id: 3, title: 'Auth & security', resources: [{ title: 'Auth guide', size: '150 KB', file: '/Asset/resources/mern/auth.pdf' }] },
          { id: 4, title: 'Testing backend', resources: [{ title: 'Backend tests', size: '130 KB', file: '/Asset/resources/mern/backend-tests.pdf' }] },
        ] },
      { id: 4,
        title: 'MongoDB & Deployment',
        lectures: 6,
        duration: '3.5 hr',
        topics: [
          { id: 1, title: 'Mongo basics', resources: [{ title: 'Mongo primer', size: '120 KB', file: '/Asset/resources/mern/mongo.pdf' }] },
          { id: 2, title: 'Indexes & performance', resources: [{ title: 'Indexes note', size: '110 KB', file: '/Asset/resources/mern/indexes.pdf' }] },
          { id: 3, title: 'Scaling', resources: [{ title: 'Scaling guide', size: '150 KB', file: '/Asset/resources/mern/scaling.pdf' }] },
          { id: 4, title: 'Deploy to cloud', resources: [{ title: 'Cloud deploy', size: '200 KB', file: '/Asset/resources/mern/cloud-deploy.pdf' }] },
        ] },
    ],
    whatYouWillLearn: [
      'Build React single-page applications',
      'Create REST APIs with Node & Express',
      'Persist data with MongoDB and deploy apps',
    ],
    resources: [
      { title: 'Project Starter', size: '5.2 MB', file: '/Asset/resources/mern-starter.zip' },
    ],
  },
];
