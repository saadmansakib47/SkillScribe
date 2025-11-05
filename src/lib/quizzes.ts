export type QuizQuestion = {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number; // 1-based index of the correct option (1, 2, 3, or 4)
};

export type Quiz = {
  id: number;
  courseId: number;
  title: string;
  description?: string;
  questions: QuizQuestion[];
};

// Sample quizzes for all courses
export const QUIZZES: Quiz[] = [
  // Course 1: Web Development with MERN
  {
  id: 1,
  courseId: 1,
  title: 'MERN Stack Basics Quiz',
  description: 'Test your understanding of MongoDB, Express, React, and Node.js fundamentals.',
  questions: [
    {
      id: 1,
      text: 'What does MERN stand for?',
      options: [
        'MySQL, Express, React, Node',
        'MongoDB, Express, React, Node',
        'MongoDB, Ember, React, Next',
        'MySQL, Express, Redux, Node',
      ],
      correctAnswer: 1,
    },
    {
      id: 2,
      text: 'Which part of the MERN stack handles the database?',
      options: ['Express', 'React', 'Node.js', 'MongoDB'],
      correctAnswer: 3,
    },
    {
      id: 3,
      text: 'What is the primary purpose of Express.js in the MERN stack?',
      options: [
        'Frontend rendering',
        'Database management',
        'Server-side routing and middleware',
        'State management',
      ],
      correctAnswer: 2,
    },
    {
      id: 4,
      text: 'In React, what hook is used to manage component state?',
      options: ['useEffect', 'useState', 'useContext', 'useReducer'],
      correctAnswer: 1,
    },
    {
      id: 5,
      text: 'Which HTTP method is used to create a new resource in a RESTful API?',
      options: ['GET', 'PUT', 'POST', 'DELETE'],
      correctAnswer: 2,
    },
    {
      id: 6,
      text: 'What is the primary benefit of using React\'s useState hook?',
      options: [
        'Manages side effects',
        'Stores the value of a component’s state',
        'Allows for faster component rendering',
        'Makes API calls to the backend',
      ],
      correctAnswer: 1,
    },
    {
      id: 7,
      text: 'Which method is used to update a document in MongoDB?',
      options: ['insert()', 'find()', 'update()', 'delete()'],
      correctAnswer: 2,
    },
    {
      id: 8,
      text: 'Which part of the MERN stack is responsible for handling requests on the backend?',
      options: ['MongoDB', 'Express', 'Node.js', 'React'],
      correctAnswer: 1,
    },
    {
      id: 9,
      text: 'What does Node.js allow developers to do?',
      options: [
        'Create web pages',
        'Build and deploy apps',
        'Write server-side JavaScript code',
        'Manage frontend state',
      ],
      correctAnswer: 2,
    },
    {
      id: 10,
      text: 'What feature of React allows for the creation of reusable components?',
      options: ['JSX', 'Props and state', 'Virtual DOM', 'useEffect'],
      correctAnswer: 1,
    },
  ],
},
  {
  id: 2,
  courseId: 1,
  title: 'React & MongoDB Quiz',
  description: 'Advanced questions on React components and MongoDB operations.',
  questions: [
    {
      id: 1,
      text: 'What is the Virtual DOM in React?',
      options: [
        'A physical copy of the DOM',
        'A lightweight JavaScript representation of the real DOM',
        'A database for storing DOM elements',
        'A browser extension',
      ],
      correctAnswer: 1,
    },
    {
      id: 2,
      text: 'Which MongoDB operation is used to retrieve documents?',
      options: ['insert()', 'find()', 'update()', 'delete()'],
      correctAnswer: 1,
    },
    {
      id: 3,
      text: 'What is JSX in React?',
      options: [
        'A database query language',
        'A syntax extension for JavaScript',
        'A CSS framework',
        'A testing library',
      ],
      correctAnswer: 1,
    },
    {
      id: 4,
      text: 'In MongoDB, what is a collection?',
      options: [
        'A group of databases',
        'A single document',
        'A group of documents',
        'A type of index',
      ],
      correctAnswer: 2,
    },
    {
      id: 5,
      text: 'What does the useEffect hook do in React?',
      options: [
        'Manages component state',
        'Handles side effects in functional components',
        'Creates new components',
        'Styles components',
      ],
      correctAnswer: 1,
    },
    {
      id: 6,
      text: 'What is the purpose of the useContext hook in React?',
      options: [
        'To handle component state',
        'To allow for global state management',
        'To manage side effects',
        'To create a new component',
      ],
      correctAnswer: 1,
    },
    {
      id: 7,
      text: 'What does the map() function do in JavaScript?',
      options: [
        'Loops through an array and returns a new array',
        'Finds an item in an array',
        'Sorts an array in ascending order',
        'Filters an array based on a condition',
      ],
      correctAnswer: 1,
    },
    {
      id: 8,
      text: 'In React, what does the componentDidMount lifecycle method do?',
      options: [
        'It’s called when the component is created',
        'It’s called after the component renders for the first time',
        'It’s called when the component’s state is updated',
        'It’s called before the component unmounts',
      ],
      correctAnswer: 1,
    },
    {
      id: 9,
      text: 'Which MongoDB feature allows you to define relationships between documents?',
      options: ['Collections', 'Documents', 'Embedded documents', 'Foreign keys'],
      correctAnswer: 3,
    },
    {
      id: 10,
      text: 'Which of the following is a valid JSX syntax?',
      options: [
        '<div>Content</div>',
        '<div>Content</p>',
        '<p>Content</div>',
        '<div class="content">Content</div>',
      ],
      correctAnswer: 1,
    },
  ],
},

  // Course 2: Manual and Automated Testing
  {
  id: 3,
  courseId: 2,
  title: 'Testing Fundamentals Quiz',
  description: 'Assess your knowledge of manual and automated testing concepts.',
  questions: [
    {
      id: 1,
      text: 'What is the main difference between manual and automated testing?',
      options: [
        'Manual testing is faster',
        'Automated testing uses scripts and tools to execute tests',
        'Manual testing finds more bugs',
        'Automated testing is always better',
      ],
      correctAnswer: 2,
    },
    {
      id: 2,
      text: 'What is regression testing?',
      options: [
        'Testing new features only',
        'Testing to ensure existing functionality still works after changes',
        'Testing for performance issues',
        'Testing user interfaces',
      ],
      correctAnswer: 2,
    },
    {
      id: 3,
      text: 'Which tool is commonly used for automated UI testing?',
      options: ['JUnit', 'Selenium', 'Postman', 'Jenkins'],
      correctAnswer: 2,
    },
    {
      id: 4,
      text: 'What is a test case?',
      options: [
        'A container for storing test files',
        'A specific set of conditions to verify functionality',
        'A bug report',
        'A testing tool',
      ],
      correctAnswer: 2,
    },
    {
      id: 5,
      text: 'What does CI/CD stand for?',
      options: [
        'Code Integration / Code Deployment',
        'Continuous Integration / Continuous Deployment',
        'Critical Issues / Critical Defects',
        'Code Inspection / Code Documentation',
      ],
      correctAnswer: 2,
    },
    {
      id: 6,
      text: 'What is the goal of performance testing?',
      options: [
        'To evaluate system speed and responsiveness under load',
        'To find bugs',
        'To assess usability',
        'To check code quality',
      ],
      correctAnswer: 1,
    },
    {
      id: 7,
      text: 'Which of the following is NOT a valid type of testing?',
      options: ['Unit testing', 'Integration testing', 'Performance testing', 'Database scripting'],
      correctAnswer: 4,
    },
    {
      id: 8,
      text: 'What is a test environment?',
      options: [
        'A set of conditions for running tests',
        'A machine for writing test cases',
        'A place where tests are deployed',
        'A testing script',
      ],
      correctAnswer: 1,
    },
    {
      id: 9,
      text: 'Why is test automation useful?',
      options: [
        'To speed up repetitive testing tasks',
        'To replace developers',
        'To avoid using manual testers',
        'To reduce the number of test cases',
      ],
      correctAnswer: 1,
    },
    {
      id: 10,
      text: 'What is meant by “Test Driven Development” (TDD)?',
      options: [
        'Writing tests before code',
        'Testing after development is done',
        'Manual testing done by developers',
        'Automated testing without planning',
      ],
      correctAnswer: 1,
    },
  ],
},
  {
  id: 4,
  courseId: 2,
  title: 'Manual Testing Quiz',
  description: 'Test your understanding of manual testing concepts and practices.',
  questions: [
    {
      id: 1,
      text: 'What is the main goal of manual testing?',
      options: [
        'To automate test scripts',
        'To simulate user behavior and find bugs manually',
        'To perform automated regression testing',
        'To deploy code to production',
      ],
      correctAnswer: 2,
    },
    {
      id: 2,
      text: 'Which of the following is a common type of manual test?',
      options: [
        'Unit tests',
        'Regression tests',
        'Integration tests',
        'Exploratory tests',
      ],
      correctAnswer: 4,
    },
    {
      id: 3,
      text: 'What is the role of a test case in manual testing?',
      options: [
        'To automate tests',
        'To document expected behavior for verification',
        'To generate test scripts',
        'To compile test data',
      ],
      correctAnswer: 2,
    },
    {
      id: 4,
      text: 'What is exploratory testing?',
      options: [
        'Testing based on predefined scripts and test cases',
        'Testing without any documentation or formal plans',
        'Testing for performance',
        'Testing with automated tools only',
      ],
      correctAnswer: 2,
    },
    {
      id: 5,
      text: 'What type of testing is used to validate if a new feature works as expected?',
      options: ['Integration testing', 'Sanity testing', 'Regression testing', 'Alpha testing'],
      correctAnswer: 2,
    },
    {
      id: 6,
      text: 'Which of these best defines a test scenario?',
      options: [
        'A single step in the test process',
        'A set of test cases to check one feature',
        'A list of actions to simulate in an application',
        'A report after completing a test',
      ],
      correctAnswer: 2,
    },
    {
      id: 7,
      text: 'In manual testing, what is the purpose of bug reporting?',
      options: [
        'To update the test plan',
        'To document a problem found during testing',
        'To write code',
        'To automate tests',
      ],
      correctAnswer: 2,
    },
    {
      id: 8,
      text: 'Which of these is NOT a phase in the software testing life cycle?',
      options: ['Test planning', 'Test execution', 'Test deployment', 'Test closure'],
      correctAnswer: 3,
    },
    {
      id: 9,
      text: 'Which of the following describes “smoke testing”?',
      options: [
        'Testing all functions after a code update',
        'Initial testing to check if the build is stable enough for further testing',
        'Testing database queries',
        'Testing the user interface only',
      ],
      correctAnswer: 2,
    },
    {
      id: 10,
      text: 'What is the purpose of creating a test plan?',
      options: [
        'To outline the scope, strategy, and objectives of testing',
        'To automate tests',
        'To deploy code to production',
        'To fix bugs found during testing',
      ],
      correctAnswer: 1,
    },
  ],
},
  {
  id: 5,
  courseId: 2,
  title: 'Automated Testing Quiz',
  description: 'Test your knowledge of automation frameworks and best practices.',
  questions: [
    {
      id: 1,
      text: 'What is the Page Object Model (POM)?',
      options: [
        'A testing framework',
        'A design pattern for organizing test code',
        'A type of test case',
        'A bug tracking system',
      ],
      correctAnswer: 2,
    },
    {
      id: 2,
      text: 'Which framework is used for behavior-driven development (BDD)?',
      options: ['Selenium', 'Cucumber', 'JUnit', 'TestNG'],
      correctAnswer: 2,
    },
    {
      id: 3,
      text: 'What is a flaky test?',
      options: [
        'A test that always fails',
        'A test that passes and fails intermittently',
        'A test that runs slowly',
        'A test without assertions',
      ],
      correctAnswer: 2,
    },
    {
      id: 4,
      text: 'What is the purpose of test data management?',
      options: [
        'To delete test results',
        'To prepare and maintain data used in testing',
        'To write test scripts',
        'To generate bug reports',
      ],
      correctAnswer: 2,
    },
    {
      id: 5,
      text: 'Which is NOT a benefit of test automation?',
      options: [
        'Faster execution',
        'Reusability',
        'Eliminates need for manual testing',
        'Consistency',
      ],
      correctAnswer: 3,
    },
    {
      id: 6,
      text: 'What does continuous integration (CI) mean in automated testing?',
      options: [
        'Running tests once after the entire project is complete',
        'Automatically running tests whenever code changes are pushed',
        'Testing the UI after every build',
        'Testing only after production deployment',
      ],
      correctAnswer: 2,
    },
    {
      id: 7,
      text: 'What is the primary purpose of using an automation framework?',
      options: [
        'To manage test data',
        'To organize and standardize automated test scripts',
        'To execute tests manually',
        'To fix bugs in the application',
      ],
      correctAnswer: 2,
    },
    {
      id: 8,
      text: 'Which of these is a commonly used tool for test automation?',
      options: ['JUnit', 'Postman', 'Jenkins', 'Selenium'],
      correctAnswer: 4,
    },
    {
      id: 9,
      text: 'What is the main advantage of using Selenium for automated testing?',
      options: [
        'Works only with Python',
        'Can interact with web browsers for automated testing',
        'Works with only one type of browser',
        'Can test mobile applications only',
      ],
      correctAnswer: 2,
    },
    {
      id: 10,
      text: 'What is the main goal of a test suite in automated testing?',
      options: [
        'To automate the execution of tests on every build',
        'To document test results',
        'To manually test individual features',
        'To store logs and errors',
      ],
      correctAnswer: 1,
    },
  ],
},

  // Course 3: HTML, CSS, JS Basics
  {
  id: 6,
  courseId: 3,
  title: 'HTML & CSS Fundamentals Quiz',
  description: 'Test your knowledge of HTML structure and CSS styling.',
  questions: [
    {
      id: 1,
      text: 'What does HTML stand for?',
      options: [
        'Hyper Text Markup Language',
        'High Tech Modern Language',
        'Home Tool Markup Language',
        'Hyperlinks and Text Markup Language',
      ],
      correctAnswer: 1,
    },
    {
      id: 2,
      text: 'Which HTML tag is used to display an image?',
      options: ['<image>', '<src>', '<img>', '<pic>'],
      correctAnswer: 3,
    },
    {
      id: 3,
      text: 'What is the correct HTML tag for the largest heading?',
      options: ['<heading>', '<h6>', '<h1>', '<head>'],
      correctAnswer: 3,
    },
    {
      id: 4,
      text: 'Which HTML tag is used for hyperlinks?',
      options: ['<link>', '<a>', '<hyperlink>', '<url>'],
      correctAnswer: 2,
    },
    {
      id: 5,
      text: 'Which attribute is used to specify the destination of a hyperlink?',
      options: ['href', 'link', 'src', 'target'],
      correctAnswer: 1,
    },
    {
      id: 6,
      text: 'Which CSS property is used to change text color?',
      options: ['font-color', 'text-color', 'color', 'text-style'],
      correctAnswer: 3,
    },
    {
      id: 7,
      text: 'What is the correct CSS syntax to select all <p> elements?',
      options: ['p {}', 'p[] {}', '#p {}', '.p {}'],
      correctAnswer: 1,
    },
    {
      id: 8,
      text: 'Which CSS property is used to set the background color of an element?',
      options: ['bg-color', 'background-color', 'color', 'bg'],
      correctAnswer: 2,
    },
    {
      id: 9,
      text: 'Which CSS layout model is best for creating responsive designs?',
      options: ['Float', 'Table', 'Flexbox', 'Inline'],
      correctAnswer: 3,
    },
    {
      id: 10,
      text: 'Which CSS property is used to change the font size?',
      options: ['text-size', 'font-size', 'text-font', 'font-weight'],
      correctAnswer: 2,
    },
  ],
},
  {
    id: 7,
    courseId: 3,
    title: 'JavaScript Essentials Quiz',
    description: 'Evaluate your understanding of JavaScript fundamentals.',
    questions: [
      {
        id: 1,
        text: 'Which keyword is used to declare a variable that cannot be reassigned?',
        options: ['var', 'let', 'const', 'static'],
        correctAnswer: 3,
      },
      {
        id: 2,
        text: 'What will typeof null return?',
        options: ['"null"', '"undefined"', '"object"', '"number"'],
        correctAnswer: 3,
      },
      {
        id: 3,
        text: 'Which method is used to add elements to the end of an array?',
        options: ['push()', 'pop()', 'shift()', 'unshift()'],
        correctAnswer: 1,
      },
      {
        id: 4,
        text: 'What is a closure in JavaScript?',
        options: [
          'A loop that ends',
          'A function with access to outer scope variables',
          'A closed array',
          'A finished promise',
        ],
        correctAnswer: 2,
      },
      {
        id: 5,
        text: 'Which operator is used for strict equality comparison?',
        options: ['==', '===', '=', '!='],
        correctAnswer: 2,
      },
    ],
  },

  // Course 4: Data Science with Python
  {
  id: 8,
  courseId: 4,
  title: 'Python & Data Science Basics Quiz',
  description: 'Test your knowledge of Python fundamentals for data science.',
  questions: [
    {
      id: 1,
      text: 'Which Python library is primarily used for data manipulation?',
      options: ['NumPy', 'Pandas', 'Matplotlib', 'Scikit-learn'],
      correctAnswer: 2,
    },
    {
      id: 2,
      text: 'What data structure does Pandas use to store tabular data?',
      options: ['List', 'Dictionary', 'DataFrame', 'Array'],
      correctAnswer: 3,
    },
    {
      id: 3,
      text: 'Which NumPy function is used to create an array?',
      options: ['array()', 'list()', 'create()', 'new()'],
      correctAnswer: 1,
    },
    {
      id: 4,
      text: 'What does EDA stand for in data science?',
      options: [
        'Exploratory Data Analysis',
        'Extracted Data Archive',
        'Estimated Data Assessment',
        'Enhanced Data Application',
      ],
      correctAnswer: 1,
    },
    {
      id: 5,
      text: 'Which library is commonly used for data visualization in Python?',
      options: ['Pandas', 'NumPy', 'Matplotlib', 'Requests'],
      correctAnswer: 3,
    },
    {
      id: 6,
      text: 'Which function in Pandas is used to read data from a CSV file?',
      options: ['read_csv()', 'import_csv()', 'load_csv()', 'open_csv()'],
      correctAnswer: 1,
    },
    {
      id: 7,
      text: 'Which of these is the primary data structure in NumPy?',
      options: ['DataFrame', 'Series', 'Array', 'Matrix'],
      correctAnswer: 3,
    },
    {
      id: 8,
      text: 'Which Python library is used for statistical modeling and hypothesis testing?',
      options: ['NumPy', 'SciPy', 'Scikit-learn', 'Pandas'],
      correctAnswer: 2,
    },
    {
      id: 9,
      text: 'What is the purpose of the groupby() function in Pandas?',
      options: [
        'To split the data into groups based on some criteria',
        'To join two DataFrames together',
        'To merge data from multiple sources',
        'To perform a mathematical operation on a DataFrame',
      ],
      correctAnswer: 1,
    },
    {
      id: 10,
      text: 'Which of these Python libraries is primarily used for machine learning?',
      options: ['Matplotlib', 'Pandas', 'SciPy', 'Scikit-learn'],
      correctAnswer: 4,
    },
  ],
},
  {
  id: 9,
  courseId: 4,
  title: 'Machine Learning Fundamentals Quiz',
  description: 'Assess your understanding of basic ML concepts.',
  questions: [
    {
      id: 1,
      text: 'What is supervised learning?',
      options: [
        'Learning without labeled data',
        'Learning from labeled training data',
        'Learning by trial and error',
        'Learning from clustering',
      ],
      correctAnswer: 2,
    },
    {
      id: 2,
      text: 'Which algorithm is used for classification problems?',
      options: ['Linear Regression', 'Logistic Regression', 'K-Means', 'PCA'],
      correctAnswer: 2,
    },
    {
      id: 3,
      text: 'What is overfitting in machine learning?',
      options: [
        'Model performs well on training and test data',
        'Model performs well on training but poorly on test data',
        'Model performs poorly on all data',
        'Model is too simple',
      ],
      correctAnswer: 2,
    },
    {
      id: 4,
      text: 'Which metric is used to evaluate classification models?',
      options: ['R-squared', 'RMSE', 'Accuracy', 'MAE'],
      correctAnswer: 3,
    },
    {
      id: 5,
      text: 'What is feature engineering?',
      options: [
        'Building machine learning models',
        'Creating or transforming variables for better model performance',
        'Testing model accuracy',
        'Deploying models',
      ],
      correctAnswer: 2,
    },
    {
      id: 6,
      text: 'What is an example of an unsupervised learning algorithm?',
      options: ['K-Means Clustering', 'Logistic Regression', 'Decision Tree', 'Support Vector Machine'],
      correctAnswer: 1,
    },
    {
      id: 7,
      text: 'What is the purpose of cross-validation in machine learning?',
      options: [
        'To evaluate the model on the training data',
        'To tune hyperparameters',
        'To improve the model’s accuracy',
        'To estimate the performance of the model on unseen data',
      ],
      correctAnswer: 4,
    },
    {
      id: 8,
      text: 'What does PCA (Principal Component Analysis) do?',
      options: [
        'It reduces the number of features in the dataset',
        'It increases the number of features in the dataset',
        'It performs feature scaling',
        'It is a classification algorithm',
      ],
      correctAnswer: 1,
    },
    {
      id: 9,
      text: 'Which of these algorithms is used for regression tasks?',
      options: ['K-Nearest Neighbors', 'Support Vector Machine', 'Linear Regression', 'K-Means'],
      correctAnswer: 3,
    },
    {
      id: 10,
      text: 'What does the term "bias-variance tradeoff" refer to?',
      options: [
        'Balancing the speed of training and model performance',
        'Balancing the complexity of the model with the data fit',
        'Balancing the amount of data collected and the model accuracy',
        'Balancing the training time and computational resources',
      ],
      correctAnswer: 2,
    },
  ],
},

  // Course 5: UI/UX Fundamentals
  {
  id: 10,
  courseId: 5,
  title: 'UI/UX Design Principles Quiz',
  description: 'Test your understanding of user interface and user experience design.',
  questions: [
    {
      id: 1,
      text: 'What does UX stand for?',
      options: [
        'User Experience',
        'Universal Export',
        'Unique Extension',
        'User Execution',
      ],
      correctAnswer: 1,
    },
    {
      id: 2,
      text: 'Which principle suggests that similar elements should be grouped together?',
      options: ['Contrast', 'Proximity', 'Alignment', 'Repetition'],
      correctAnswer: 2,
    },
    {
      id: 3,
      text: 'What is a wireframe?',
      options: [
        'A final design mockup',
        'A low-fidelity sketch of a design layout',
        'A coding framework',
        'A color palette',
      ],
      correctAnswer: 2,
    },
    {
      id: 4,
      text: 'What is the purpose of user personas?',
      options: [
        'To represent target user groups',
        'To create animations',
        'To write code',
        'To test software',
      ],
      correctAnswer: 1,
    },
    {
      id: 5,
      text: 'Which tool is commonly used for UI/UX prototyping?',
      options: ['GitHub', 'Figma', 'Jenkins', 'Docker'],
      correctAnswer: 2,
    },
    // New questions
    {
      id: 6,
      text: 'What does the term “responsive design” refer to?',
      options: [
        'Designing websites to automatically adjust for different screen sizes',
        'Designing web pages with high color contrast',
        'Designing animations for a website',
        'Designing websites with fixed layouts',
      ],
      correctAnswer: 1,
    },
    {
      id: 7,
      text: 'Which of the following is a good practice in UX design?',
      options: [
        'Complicating the navigation to increase engagement',
        'Placing important elements above the fold for easy access',
        'Using many different colors to attract attention',
        'Overloading the page with information',
      ],
      correctAnswer: 2,
    },
    {
      id: 8,
      text: 'What is the purpose of user testing in UI/UX design?',
      options: [
        'To check if the design can be coded',
        'To assess the usability and effectiveness of the design with real users',
        'To optimize the website’s SEO ranking',
        'To review code quality',
      ],
      correctAnswer: 2,
    },
    {
      id: 9,
      text: 'Which of the following is a key factor in creating a positive user experience?',
      options: [
        'Providing fast loading times and intuitive navigation',
        'Using lots of animations and complex layouts',
        'Focusing on aesthetics only without usability testing',
        'Maximizing the number of elements on the page',
      ],
      correctAnswer: 1,
    },
    {
      id: 10,
      text: 'What does the term “color contrast” in UI/UX design refer to?',
      options: [
        'The difference between background color and text color to improve readability',
        'The colors used to design the logo',
        'The aesthetic use of colors in a design without considering usability',
        'The choice of colors for a website’s navigation menu',
      ],
      correctAnswer: 1,
    },
  ],
},
  {
    id: 11,
    courseId: 5,
    title: 'Design Thinking Quiz',
    description: 'Assess your knowledge of the design thinking process.',
    questions: [
      {
        id: 1,
        text: 'What are the five stages of design thinking?',
        options: [
          'Plan, Design, Build, Test, Deploy',
          'Empathize, Define, Ideate, Prototype, Test',
          'Research, Analyze, Create, Review, Release',
          'Discover, Design, Develop, Deliver, Done',
        ],
        correctAnswer: 1,
      },
      {
        id: 2,
        text: 'What is the main goal of the empathize stage?',
        options: [
          'To create designs',
          'To understand user needs and problems',
          'To test prototypes',
          'To write code',
        ],
        correctAnswer: 1,
      },
      {
        id: 3,
        text: 'What is an MVP in product design?',
        options: [
          'Most Valuable Player',
          'Minimum Viable Product',
          'Maximum Visual Prototype',
          'Main Visual Pattern',
        ],
        correctAnswer: 1,
      },
      {
        id: 4,
        text: 'What is usability testing?',
        options: [
          'Testing code functionality',
          'Observing users interact with a product',
          'Testing server performance',
          'Testing database queries',
        ],
        correctAnswer: 1,
      },
      {
        id: 5,
        text: 'What is the purpose of affinity mapping?',
        options: [
          'To create color schemes',
          'To organize and group research findings',
          'To write test cases',
          'To deploy applications',
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
  id: 12,
  courseId: 5,
  title: 'Wireframing Fundamentals Quiz',
  description: 'Test your knowledge of wireframing techniques and tools in UI/UX design.',
  questions: [
    {
      id: 1,
      text: 'What is the primary purpose of a wireframe in UI/UX design?',
      options: [
        'To create a high-fidelity final design',
        'To sketch out the layout and functionality of a website or app',
        'To define color schemes and branding elements',
        'To write user stories and personas',
      ],
      correctAnswer: 2,
    },
    {
      id: 2,
      text: 'Which of the following is NOT typically represented in a wireframe?',
      options: [
        'Layout structure',
        'User interface elements',
        'Content placement',
        'Final graphics and images',
      ],
      correctAnswer: 4,
    },
    {
      id: 3,
      text: 'What level of detail is typically included in a wireframe?',
      options: [
        'High-fidelity graphics and animations',
        'Low to medium-fidelity, focusing on structure and functionality',
        'Detailed descriptions of text content and branding',
        'Fully interactive elements with user inputs',
      ],
      correctAnswer: 2,
    },
    {
      id: 4,
      text: 'What does “low-fidelity” wireframing mean?',
      options: [
        'Highly detailed designs with full color and branding',
        'Simple sketches that represent basic layout and content',
        'Complex, high-interaction elements with full functionality',
        'Finalized designs ready for development',
      ],
      correctAnswer: 2,
    },
    {
      id: 5,
      text: 'Which of the following wireframing tools is commonly used for creating digital wireframes?',
      options: ['Figma', 'Photoshop', 'Sublime Text', 'Visual Studio Code'],
      correctAnswer: 1,
    },
    {
      id: 6,
      text: 'What is the difference between a wireframe and a prototype?',
      options: [
        'A wireframe shows detailed interactions, while a prototype shows only layout',
        'A wireframe is a high-fidelity design, while a prototype is a sketch',
        'A wireframe represents the structure and functionality, while a prototype is an interactive version of the design',
        'A wireframe is interactive, while a prototype is static',
      ],
      correctAnswer: 3,
    },
    {
      id: 7,
      text: 'Which of the following wireframe types focuses on layout and content placement without interaction?',
      options: ['High-fidelity wireframe', 'Low-fidelity wireframe', 'Clickable prototype', 'Interactive wireframe'],
      correctAnswer: 2,
    },
    {
      id: 8,
      text: 'What does “responsive” wireframing refer to?',
      options: [
        'Designing wireframes that adjust according to the user’s device or screen size',
        'Designing wireframes with full-color designs',
        'Designing wireframes with only one screen size in mind',
        'Creating wireframes for static websites only',
      ],
      correctAnswer: 1,
    },
    {
      id: 9,
      text: 'Which of the following is a benefit of wireframing in the early stages of design?',
      options: [
        'It helps visualize the final look and feel of a website or app',
        'It allows for user testing before any coding begins',
        'It provides an opportunity for detailed animations',
        'It includes the final graphics and images to be used',
      ],
      correctAnswer: 2,
    },
    {
      id: 10,
      text: 'What is an example of a commonly used wireframe layout?',
      options: [
        'Grid layout for responsive web design',
        'Masonry layout for content-heavy sites',
        'Card-based layout for displaying product details',
        'All of the above',
      ],
      correctAnswer: 4,
    },
  ],
},

  // Course 6: Web Development Bootcamp
  {
  id: 13,
  courseId: 6,
  title: 'Web Development & Deployment Quiz',
  description: 'Test your comprehensive understanding of web development and deployment practices.',
  questions: [
    {
      id: 1,
      text: 'What is the difference between frontend and backend?',
      options: [
        'Frontend is the server, backend is the client',
        'Frontend is what users see, backend handles server logic',
        'They are the same thing',
        'Frontend uses databases, backend uses HTML',
      ],
      correctAnswer: 2,
    },
    {
      id: 2,
      text: 'Which HTTP status code indicates a successful request?',
      options: ['404', '500', '200', '301'],
      correctAnswer: 3,
    },
    {
      id: 3,
      text: 'What is responsive design?',
      options: [
        'Fast-loading websites',
        'Designs that adapt to different screen sizes',
        'Interactive animations',
        'Server-side rendering',
      ],
      correctAnswer: 2,
    },
    {
      id: 4,
      text: 'What is an API?',
      options: [
        'A programming language',
        'Application Programming Interface',
        'A database system',
        'A web browser',
      ],
      correctAnswer: 2,
    },
    {
      id: 5,
      text: 'Which Node.js framework is popular for building web servers?',
      options: ['React', 'Angular', 'Express', 'Vue'],
      correctAnswer: 3,
    },
    {
      id: 6,
      text: 'What is version control?',
      options: [
        'A way to track changes in code over time',
        'A type of database',
        'A testing framework',
        'A design tool',
      ],
      correctAnswer: 1,
    },
    {
      id: 7,
      text: 'Which platform is commonly used for hosting static websites?',
      options: ['MySQL', 'MongoDB', 'Netlify', 'Docker'],
      correctAnswer: 3,
    },
    {
      id: 8,
      text: 'What does Git do?',
      options: [
        'Hosts websites',
        'Manages version control',
        'Compiles code',
        'Tests applications',
      ],
      correctAnswer: 2,
    },
    {
      id: 9,
      text: 'What is a domain name?',
      options: [
        'A type of server',
        'The human-readable address of a website',
        'A programming language',
        'A database table',
      ],
      correctAnswer: 2,
    },
    {
      id: 10,
      text: 'What is HTTPS?',
      options: [
        'A programming language',
        'Secure version of HTTP',
        'A database protocol',
        'A CSS framework',
      ],
      correctAnswer: 2,
    },
    {
      id: 11,
      text: 'Which of the following is a key feature of a single-page application (SPA)?',
      options: [
        'The page reloads for every new user interaction',
        'All data is loaded from the server for every request',
        'The application dynamically updates the page without reloading',
        'The application uses traditional server-side rendering only',
      ],
      correctAnswer: 3,
    },
    {
      id: 12,
      text: 'What is the purpose of a content delivery network (CDN)?',
      options: [
        'To store content on a central server only',
        'To distribute website content across geographically distributed servers for faster access',
        'To perform security scans on websites',
        'To provide real-time customer support',
      ],
      correctAnswer: 2,
    },
    {
      id: 13,
      text: 'What is the main advantage of using a CSS preprocessor like SASS?',
      options: [
        'It allows for faster page load times',
        'It offers advanced features like variables, mixins, and nested selectors for more organized CSS code',
        'It automatically compiles JavaScript code',
        'It allows HTML files to be written in a more readable format',
      ],
      correctAnswer: 2,
    },
    {
      id: 14,
      text: 'Which of the following is the correct way to link an external CSS file in an HTML document?',
      options: [
        '<style src="styles.css">',
        '<link href="styles.css" rel="stylesheet">',
        '<css href="styles.css">',
        '<stylesheet src="styles.css">',
      ],
      correctAnswer: 2,
    },
    {
      id: 15,
      text: 'Which command is used to initialize a new Node.js project?',
      options: [
        'node init',
        'npm create',
        'npm init',
        'node start',
      ],
      correctAnswer: 3,
    },
  ],
},

  // Course 7: Advanced React Patterns
  {
    id: 14,
    courseId: 7,
    title: 'React Hooks Deep Dive Quiz',
    description: 'Test your advanced knowledge of React hooks.',
    questions: [
      {
        id: 1,
        text: 'What is the purpose of useMemo?',
        options: [
          'To manage state',
          'To memoize expensive calculations',
          'To handle side effects',
          'To create refs',
        ],
        correctAnswer: 1,
      },
      {
        id: 2,
        text: 'When should you use useCallback?',
        options: [
          'To fetch data',
          'To memoize functions and prevent unnecessary re-renders',
          'To manage global state',
          'To handle forms',
        ],
        correctAnswer: 1,
      },
      {
        id: 3,
        text: 'What is the difference between useEffect and useLayoutEffect?',
        options: [
          'No difference',
          'useLayoutEffect runs synchronously before browser paint',
          'useEffect is deprecated',
          'useLayoutEffect is for styling only',
        ],
        correctAnswer: 1,
      },
      {
        id: 4,
        text: 'What is a custom hook?',
        options: [
          'A built-in React hook',
          'A reusable function that uses React hooks',
          'A CSS styling method',
          'A testing utility',
        ],
        correctAnswer: 1,
      },
      {
        id: 5,
        text: 'What does useRef return?',
        options: [
          'A state value',
          'A mutable ref object that persists across renders',
          'A callback function',
          'A context provider',
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: 15,
    courseId: 7,
    title: 'React Performance Optimization Quiz',
    description: 'Assess your understanding of React performance techniques.',
    questions: [
      {
        id: 1,
        text: 'What is React.memo used for?',
        options: [
          'Managing state',
          'Preventing unnecessary re-renders of components',
          'Handling side effects',
          'Creating contexts',
        ],
        correctAnswer: 1,
      },
      {
        id: 2,
        text: 'What is code splitting in React?',
        options: [
          'Splitting code into multiple files',
          'Loading code on demand to reduce initial bundle size',
          'Dividing components into folders',
          'Separating CSS from JavaScript',
        ],
        correctAnswer: 1,
      },
      {
        id: 3,
        text: 'Which tool can you use to profile React components?',
        options: [
          'Redux DevTools',
          'React DevTools Profiler',
          'Chrome Console',
          'Webpack',
        ],
        correctAnswer: 1,
      },
      {
        id: 4,
        text: 'What is lazy loading in React?',
        options: [
          'Delaying all component renders',
          'Loading components only when needed',
          'Slow network simulation',
          'Server-side rendering',
        ],
        correctAnswer: 1,
      },
      {
        id: 5,
        text: 'What causes unnecessary re-renders in React?',
        options: [
          'Using hooks',
          'Parent component re-rendering without memoization',
          'Using JSX',
          'Importing libraries',
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
  id: 16,
  courseId: 7,
  title: 'Context & Patterns Quiz',
  description: 'Test your understanding of React context, state management, and design patterns.',
  questions: [
    {
      id: 1,
      text: 'What is the purpose of React Context?',
      options: [
        'To store global styles',
        'To share data between components without passing props',
        'To manage local component state',
        'To optimize performance of components',
      ],
      correctAnswer: 2,
    },
    {
      id: 2,
      text: 'How do you create a context in React?',
      options: [
        'By using useContext hook',
        'By calling React.createContext()',
        'By using the Context.Provider component',
        'By using React.useState()',
      ],
      correctAnswer: 2,
    },
    {
      id: 3,
      text: 'Which of the following is a pattern for managing state in React?',
      options: [
        'Context API and state colocation',
        'Passing props down only',
        'Using refs for global state',
        'Directly manipulating the DOM',
      ],
      correctAnswer: 1,
    },
    {
      id: 4,
      text: 'What is the benefit of using the Composition pattern in React?',
      options: [
        'It allows you to use hooks in non-function components',
        'It helps reduce code duplication and improves component reusability',
        'It manages the global state',
        'It directly manipulates the DOM',
      ],
      correctAnswer: 2,
    },
    {
      id: 5,
      text: 'What is the primary difference between render props and hooks?',
      options: [
        'Render props are used for styling, while hooks are used for state management',
        'Render props pass components as functions, while hooks provide reusable logic',
        'Render props are more efficient than hooks',
        'Render props only work in class components, while hooks work only in functional components',
      ],
      correctAnswer: 2,
    },
  ],
},
{
  id: 17,
  courseId: 7,
  title: 'React Performance Optimization Quiz',
  description: 'Evaluate your knowledge of performance optimization techniques in React.',
  questions: [
    {
      id: 1,
      text: 'What does React.memo do?',
      options: [
        'Caches components to improve rendering performance',
        'Prevents state updates',
        'Manages global state',
        'Changes the component lifecycle',
      ],
      correctAnswer: 1,
    },
    {
      id: 2,
      text: 'Which of the following is a technique to reduce React app bundle size?',
      options: [
        'Using context instead of props',
        'Code splitting using React.lazy and Suspense',
        'Avoiding hooks',
        'Storing all data in a global state',
      ],
      correctAnswer: 2,
    },
    {
      id: 3,
      text: 'What is the purpose of useCallback?',
      options: [
        'To avoid re-creating functions on every render',
        'To cache the result of a function call',
        'To fetch data asynchronously',
        'To handle side effects in components',
      ],
      correctAnswer: 1,
    },
    {
      id: 4,
      text: 'What is the benefit of lazy loading components in React?',
      options: [
        'To load components in parallel to speed up initial rendering',
        'To load components only when they are needed, reducing initial bundle size',
        'To optimize state management',
        'To improve the performance of animations',
      ],
      correctAnswer: 2,
    },
    {
      id: 5,
      text: 'How can React’s Virtual DOM improve performance?',
      options: [
        'By reducing the amount of JavaScript needed to load a page',
        'By optimizing the actual DOM updates by using a virtual representation first',
        'By minimizing the number of components rendered',
        'By directly manipulating the DOM instead of using the React tree',
      ],
      correctAnswer: 2,
    },
  ],
},

  // Course 8: Python Crash Course
  {
  id: 18,
  courseId: 8,
  title: 'Python Basics Quiz',
  description: 'Test your knowledge of Python fundamentals.',
  questions: [
    {
      id: 1,
      text: 'Which data type is mutable in Python?',
      options: ['String', 'Tuple', 'List', 'Integer'],
      correctAnswer: 3,
    },
    {
      id: 2,
      text: 'What is the output of: print(type([]))?',
      options: ["<class 'array'>", "<class 'list'>", "<class 'tuple'>", "<class 'dict'>"],
      correctAnswer: 2,
    },
    {
      id: 3,
      text: 'Which keyword is used to define a function in Python?',
      options: ['function', 'def', 'func', 'define'],
      correctAnswer: 2,
    },
    {
      id: 4,
      text: 'What does the len() function do?',
      options: [
        'Returns the length of an object',
        'Creates a list',
        'Sorts elements',
        'Deletes items',
      ],
      correctAnswer: 1,
    },
    {
      id: 5,
      text: 'What is a dictionary in Python?',
      options: [
        'An ordered list',
        'A collection of key-value pairs',
        'A set of unique values',
        'A string array',
      ],
      correctAnswer: 2,
    },
    {
      id: 6,
      text: 'How do you create a variable in Python?',
      options: [
        'variable_name = value',
        'var(value) = name',
        'create variable name = value',
        'value = variable_name',
      ],
      correctAnswer: 1,
    },
    {
      id: 7,
      text: 'Which of the following is used for single-line comments in Python?',
      options: ['//', '#', '/*', '<--'],
      correctAnswer: 2,
    },
    {
      id: 8,
      text: 'What type of loop would you use for iterating over a sequence in Python?',
      options: ['for loop', 'while loop', 'do-while loop', 'foreach loop'],
      correctAnswer: 1,
    },
    {
      id: 9,
      text: 'What will the expression 3 * 2 ** 3 evaluate to?',
      options: ['24', '48', '21', '17'],
      correctAnswer: 1,
    },
    {
      id: 10,
      text: 'How can you create a tuple in Python?',
      options: [
        'tuple = [1, 2, 3]',
        'tuple = {1, 2, 3}',
        'tuple = (1, 2, 3)',
        'tuple = 1, 2, 3',
      ],
      correctAnswer: 3,
    },
  ],
},
  {
  id: 19,
  courseId: 8,
  title: 'Python Advanced Concepts Quiz',
  description: 'Evaluate your understanding of advanced Python topics.',
  questions: [
    {
      id: 1,
      text: 'What is a decorator in Python?',
      options: [
        'A design pattern',
        'A function that modifies another function',
        'A class method',
        'A loop statement',
      ],
      correctAnswer: 2,
    },
    {
      id: 2,
      text: 'What is a generator in Python?',
      options: [
        'A function that creates random numbers',
        'A function that yields values lazily',
        'A class constructor',
        'A module importer',
      ],
      correctAnswer: 2,
    },
    {
      id: 3,
      text: 'What does *args allow in a function?',
      options: [
        'Fixed number of arguments',
        'Variable number of positional arguments',
        'Keyword arguments only',
        'No arguments',
      ],
      correctAnswer: 2,
    },
    {
      id: 4,
      text: 'What is list comprehension?',
      options: [
        'A way to sort lists',
        'A concise way to create lists',
        'A method to delete lists',
        'A list function',
      ],
      correctAnswer: 2,
    },
    {
      id: 5,
      text: 'What is the purpose of __init__ in a class?',
      options: [
        'To delete objects',
        'To initialize object attributes',
        'To end the program',
        'To import modules',
      ],
      correctAnswer: 2,
    },
    {
      id: 6,
      text: 'Which of the following allows you to define a class method in Python?',
      options: [
        '@staticmethod',
        '@classmethod',
        'def method_name(cls)',
        '@property',
      ],
      correctAnswer: 2,
    },
    {
      id: 7,
      text: 'What does the yield keyword do in Python?',
      options: [
        'Terminates the function immediately',
        'Returns a value and pauses the function',
        'Prints a value to the console',
        'Calls another function',
      ],
      correctAnswer: 2,
    },
    {
      id: 8,
      text: 'Which of the following is used for error handling in Python?',
      options: ['try-except', 'throw-catch', 'assert', 'log'],
      correctAnswer: 1,
    },
    {
      id: 9,
      text: 'What is the output of the following code: len("hello")?',
      options: ['5', '6', 'hello', 'None'],
      correctAnswer: 1,
    },
    {
      id: 10,
      text: 'What is the purpose of the with statement in Python?',
      options: [
        'To handle exceptions',
        'To simplify file handling by automatically closing files',
        'To loop through data',
        'To define classes and functions',
      ],
      correctAnswer: 2,
    },
  ],
},

  // Course 9: Intro to Database
  {
  id: 20,
  courseId: 9,
  title: 'Relational Database Fundamentals Quiz',
  description: 'Test your understanding of relational database concepts and SQL basics.',
  questions: [
    {
      id: 1,
      text: 'What does SQL stand for?',
      options: [
        'Structured Query Language',
        'Simple Question Language',
        'Standard Quality Language',
        'System Query Logic',
      ],
      correctAnswer: 1,
    },
    {
      id: 2,
      text: 'What is a primary key?',
      options: [
        'A key that opens databases',
        'A unique identifier for a table row',
        'A foreign key reference',
        'An index type',
      ],
      correctAnswer: 2,
    },
    {
      id: 3,
      text: 'What is normalization in databases?',
      options: [
        'Making data normal',
        'Organizing data to reduce redundancy',
        'Backing up data',
        'Encrypting data',
      ],
      correctAnswer: 2,
    },
    {
      id: 4,
      text: 'What type of relationship connects one record to many records?',
      options: [
        'One-to-One',
        'One-to-Many',
        'Many-to-Many',
        'None-to-One',
      ],
      correctAnswer: 2,
    },
    {
      id: 5,
      text: 'What is a foreign key?',
      options: [
        'A key that can uniquely identify a record in a table',
        'A key that refers to a primary key in another table',
        'A type of index used in databases',
        'A unique key in a column',
      ],
      correctAnswer: 2,
    },
  ],
},
  {
    id: 21,
    courseId: 9,
    title: 'NoSQL Databases Quiz',
    description: 'Assess your understanding of NoSQL database systems.',
    questions: [
      {
        id: 1,
        text: 'What does NoSQL stand for?',
        options: [
          'No Structured Query Language',
          'Not Only SQL',
          'New SQL',
          'Non-Standard Query Language',
        ],
        correctAnswer: 2,
      },
      {
        id: 2,
        text: 'Which is an example of a NoSQL database?',
        options: ['MySQL', 'PostgreSQL', 'MongoDB', 'Oracle'],
        correctAnswer: 3,
      },
      {
        id: 3,
        text: 'What is a document in MongoDB?',
        options: [
          'A text file',
          'A JSON-like data structure',
          'A table row',
          'A database schema',
        ],
        correctAnswer: 2,
      },
      {
        id: 4,
        text: 'When should you choose NoSQL over SQL?',
        options: [
          'Always',
          'When you need flexible schema and horizontal scaling',
          'Never',
          'Only for small projects',
        ],
        correctAnswer: 2,
      },
      {
        id: 5,
        text: 'What does CAP theorem stand for?',
        options: [
          'Consistency, Availability, Partition tolerance',
          'Capacity, Access, Performance',
          'Cache, API, Protocol',
          'Create, Alter, Partition',
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
  id: 22,
  courseId: 9,
  title: 'SQL Basics & Queries Quiz',
  description: 'Assess your skills in SQL queries, including SELECT, JOINs, and Aggregation.',
  questions: [
    {
      id: 1,
      text: 'Which SQL command is used to retrieve data?',
      options: ['GET', 'SELECT', 'FETCH', 'RETRIEVE'],
      correctAnswer: 2,
    },
    {
      id: 2,
      text: 'Which of the following SQL clauses is used to filter results?',
      options: ['WHERE', 'FROM', 'JOIN', 'SELECT'],
      correctAnswer: 1,
    },
    {
      id: 3,
      text: 'What is the purpose of an SQL JOIN?',
      options: [
        'To combine multiple tables into one result set',
        'To delete duplicate data',
        'To sort data',
        'To aggregate results',
      ],
      correctAnswer: 1,
    },
    {
      id: 4,
      text: 'What does the SQL GROUP BY clause do?',
      options: [
        'Groups rows that have the same values into summary rows',
        'Filters results based on a condition',
        'Combines multiple tables into one',
        'Sorts data in ascending or descending order',
      ],
      correctAnswer: 1,
    },
    {
      id: 5,
      text: 'Which SQL function is used to count the number of rows?',
      options: ['SUM()', 'COUNT()', 'MAX()', 'MIN()'],
      correctAnswer: 2,
    },
  ],
},

  // Course 10: Design Thinking for Product Teams
  {
  id: 23,
  courseId: 10,
  title: 'Design Thinking Process Quiz',
  description: 'Test your understanding of the design thinking methodology and techniques.',
  questions: [
    {
      id: 1,
      text: 'What is the first stage of design thinking?',
      options: ['Define', 'Ideate', 'Empathize', 'Prototype'],
      correctAnswer: 3,
    },
    {
      id: 2,
      text: 'What is brainstorming used for in design thinking?',
      options: [
        'To test prototypes',
        'To generate many ideas without judgment',
        'To analyze data',
        'To write code',
      ],
      correctAnswer: 2,
    },
    {
      id: 3,
      text: 'What is the purpose of creating a prototype?',
      options: [
        'To finalize the product',
        'To explore and test ideas quickly',
        'To write documentation',
        'To deploy the solution',
      ],
      correctAnswer: 2,
    },
    {
      id: 4,
      text: 'What is user journey mapping?',
      options: [
        'Creating a map app',
        'Visualizing the user experience over time',
        'Drawing floor plans',
        'Writing user stories',
      ],
      correctAnswer: 2,
    },
    {
      id: 5,
      text: 'What does iteration mean in design thinking?',
      options: [
        'Doing something once',
        'Repeating and refining based on feedback',
        'Completing the final design',
        'Skipping steps',
      ],
      correctAnswer: 2,
    },
    {
      id: 6,
      text: 'What is the main goal of the empathize stage?',
      options: [
        'To create designs',
        'To understand user needs and problems',
        'To test prototypes',
        'To write code',
      ],
      correctAnswer: 2,
    },
    {
      id: 7,
      text: 'What is a low-fidelity prototype?',
      options: [
        'A fully functional app',
        'A simple sketch or wireframe',
        'A high-quality mockup',
        'Production code',
      ],
      correctAnswer: 2,
    },
    {
      id: 8,
      text: 'What is the purpose of conducting surveys in user research?',
      options: [
        'To gather quantitative data from many users',
        'To write code',
        'To design interfaces',
        'To test servers',
      ],
      correctAnswer: 1,
    },
    {
      id: 9,
      text: 'What does "fail fast" mean in design thinking?',
      options: [
        'Give up quickly',
        'Test ideas early to learn and improve rapidly',
        'Work slowly',
        'Avoid testing',
      ],
      correctAnswer: 2,
    },
    {
      id: 10,
      text: 'What is A/B testing?',
      options: [
        'Testing with users named A and B',
        'Comparing two versions to see which performs better',
        'Testing alphabetically',
        'A type of unit test',
      ],
      correctAnswer: 2,
    },
    {
      id: 11,
      text: 'What is the purpose of personas in design thinking?',
      options: [
        'To represent target user groups',
        'To create animations',
        'To write code',
        'To test software',
      ],
      correctAnswer: 1,
    },
    {
      id: 12,
      text: 'What is a prototype used for in design thinking?',
      options: [
        'To visualize final product features',
        'To test concepts and ideas with real users',
        'To conduct user interviews',
        'To deploy applications',
      ],
      correctAnswer: 2,
    },
    {
      id: 13,
      text: 'What does "user-centric design" mean?',
      options: [
        'Designing products that focus on the developers’ needs',
        'Designing products that prioritize user experience and needs',
        'Designing products based on market trends',
        'Designing products for stakeholders only',
      ],
      correctAnswer: 2,
    },
    {
      id: 14,
      text: 'What is idea validation?',
      options: [
        'Testing prototypes in a real environment',
        'Creating user personas',
        'Confirming that an idea meets user needs',
        'Analyzing competitor products',
      ],
      correctAnswer: 3,
    },
    {
      id: 15,
      text: 'What is affinity mapping used for?',
      options: [
        'To collect design feedback',
        'To organize and group research findings',
        'To write user stories',
        'To prioritize features',
      ],
      correctAnswer: 2,
    },
    {
      id: 16,
      text: 'What does ideation refer to in design thinking?',
      options: [
        'The process of designing final visuals',
        'The process of generating and exploring ideas',
        'The process of testing prototypes',
        'The process of writing code',
      ],
      correctAnswer: 2,
    },
    {
      id: 17,
      text: 'Which of the following is an example of a high-fidelity prototype?',
      options: [
        'A hand-drawn sketch',
        'A digital mockup with color, typography, and interactive elements',
        'A wireframe',
        'A 3D model',
      ],
      correctAnswer: 2,
    },
    {
      id: 18,
      text: 'What is the final stage of the design thinking process?',
      options: [
        'Prototype',
        'Test',
        'Define',
        'Empathize',
      ],
      correctAnswer: 2,
    },
    {
      id: 19,
      text: 'What is the main focus of the testing phase in design thinking?',
      options: [
        'Finalizing the product for release',
        'Iterating designs based on user feedback',
        'Scaling the product to mass production',
        'Analyzing market trends',
      ],
      correctAnswer: 2,
    },
    {
      id: 20,
      text: 'What is the importance of rapid prototyping?',
      options: [
        'To create final products',
        'To test and refine concepts quickly and iteratively',
        'To deploy solutions faster',
        'To manage product launch',
      ],
      correctAnswer: 2,
    },
  ],
},

  // Course 11: Node.js APIs and Microservices
  {
  id: 24,
  courseId: 11,
  title: 'Node.js Fundamentals Quiz',
  description: 'Test your knowledge of Node.js core concepts.',
  questions: [
    {
      id: 1,
      text: 'What is Node.js?',
      options: [
        'A programming language',
        'A JavaScript runtime built on Chrome V8 engine',
        'A database',
        'A web browser',
      ],
      correctAnswer: 2,
    },
    {
      id: 2,
      text: 'What is the event loop in Node.js?',
      options: [
        'A loop statement',
        'A mechanism that handles asynchronous operations',
        'A debugging tool',
        'A package manager',
      ],
      correctAnswer: 2,
    },
    {
      id: 3,
      text: 'Which module is used to work with the file system in Node.js?',
      options: ['http', 'fs', 'path', 'url'],
      correctAnswer: 2,
    },
    {
      id: 4,
      text: 'What is npm?',
      options: [
        'Node Package Manager',
        'New Programming Method',
        'Node Process Module',
        'Network Protocol Manager',
      ],
      correctAnswer: 1,
    },
    {
      id: 5,
      text: 'What is middleware in Express.js?',
      options: [
        'A database layer',
        'Functions that execute during the request-response cycle',
        'A routing method',
        'A testing framework',
      ],
      correctAnswer: 2,
    },
    {
      id: 6,
      text: 'What is the default port for a Node.js Express server?',
      options: ['3000', '8080', '5000', '80'],
      correctAnswer: 1,
    },
    {
      id: 7,
      text: 'What is the primary function of Express.js in a Node.js application?',
      options: [
        'To handle HTTP requests and routing',
        'To manage user authentication',
        'To monitor server performance',
        'To connect to the database',
      ],
      correctAnswer: 1,
    },
    {
      id: 8,
      text: 'What does the .then() method in Promises in Node.js do?',
      options: [
        'Catches errors in promises',
        'Handles the successful result of a promise',
        'Returns the initial promise object',
        'Delays the execution of a promise',
      ],
      correctAnswer: 2,
    },
    {
      id: 9,
      text: 'Which tool is used to monitor the performance of Node.js applications?',
      options: ['Node DevTools', 'Nginx', 'PM2', 'MongoDB'],
      correctAnswer: 3,
    },
    {
      id: 10,
      text: 'What is the difference between SQL and NoSQL databases?',
      options: [
        'SQL is for large datasets, NoSQL is for small datasets',
        'SQL uses tables, NoSQL uses documents or key-value pairs',
        'SQL is faster than NoSQL',
        'NoSQL has a schema, SQL does not',
      ],
      correctAnswer: 2,
    },
  ],
},
  {
  id: 25,
  courseId: 11,
  title: 'Microservices Architecture Quiz',
  description: 'Assess your understanding of microservices patterns.',
  questions: [
    {
      id: 1,
      text: 'What is a microservice?',
      options: [
        'A small service fee',
        'An independently deployable service focused on a specific business capability',
        'A small database',
        'A mini application',
      ],
      correctAnswer: 2,
    },
    {
      id: 2,
      text: 'What is service discovery in microservices?',
      options: [
        'Finding bugs in services',
        'Automatically detecting available service instances',
        'Discovering new features',
        'Creating new services',
      ],
      correctAnswer: 2,
    },
    {
      id: 3,
      text: 'What is an API Gateway?',
      options: [
        'A door to a building',
        'A single entry point for all client requests',
        'A database connector',
        'A testing tool',
      ],
      correctAnswer: 2,
    },
    {
      id: 4,
      text: 'What is the main advantage of microservices?',
      options: [
        'Independent deployment and scaling',
        'Easier to write',
        'No need for testing',
        'Faster development always',
      ],
      correctAnswer: 1,
    },
    {
      id: 5,
      text: 'What is a circuit breaker pattern?',
      options: [
        'An electrical component',
        'A design tool',
        'A pattern to prevent cascading failures',
        'A database pattern',
      ],
      correctAnswer: 3,
    },
    {
      id: 6,
      text: 'What is service orchestration in microservices?',
      options: [
        'Managing interactions between services to achieve a business goal',
        'Creating new services from scratch',
        'Managing a central database',
        'Running tests on services',
      ],
      correctAnswer: 1,
    },
    {
      id: 7,
      text: 'What is a microservice architecture?',
      options: [
        'A monolithic approach to software design',
        'A centralized application',
        'A single application architecture',
        'A distributed system of loosely coupled services',
      ],
      correctAnswer: 4,
    },
    {
      id: 8,
      text: 'What is the purpose of a service registry in microservices?',
      options: [
        'To store the source code of microservices',
        'To track the health and availability of services',
        'To store the configuration settings of services',
        'To log the service requests',
      ],
      correctAnswer: 2,
    },
    {
      id: 9,
      text: 'What is the main disadvantage of microservices architecture?',
      options: [
        'Increased complexity',
        'Better performance',
        'Easier scaling',
        'Less testing required',
      ],
      correctAnswer: 1,
    },
    {
      id: 10,
      text: 'Which pattern is used to ensure high availability in microservices?',
      options: [
        'Singleton pattern',
        'Saga pattern',
        'Circuit breaker pattern',
        'Observer pattern',
      ],
      correctAnswer: 3,
    },
  ],
},

  // Course 12: Complete Software Testing Mastery
  {
    id: 26,
    courseId: 12,
    title: 'Testing Fundamentals Quiz',
    description: 'Test your knowledge of basic testing concepts and terminology.',
    questions: [
      {
        id: 1,
        text: 'What is the primary goal of software testing?',
        options: [
          'To find as many bugs as possible',
          'To ensure the software meets requirements and works correctly',
          'To delay the release date',
          'To increase project costs',
        ],
        correctAnswer: 2,
      },
      {
        id: 2,
        text: 'Which testing technique involves testing without looking at the internal code structure?',
        options: [
          'White-box testing',
          'Gray-box testing',
          'Black-box testing',
          'Unit testing',
        ],
        correctAnswer: 3,
      },
      {
        id: 3,
        text: 'What does the acronym "CI/CD" stand for in modern software development?',
        options: [
          'Code Integration / Code Deployment',
          'Continuous Integration / Continuous Deployment',
          'Critical Issues / Critical Defects',
          'Code Inspection / Code Documentation',
        ],
        correctAnswer: 2,
      },
      {
        id: 4,
        text: 'Which of the following is NOT a benefit of automated testing?',
        options: [
          'Faster feedback on code changes',
          'Reduced human error in repetitive tests',
          'Complete elimination of all bugs',
          'Ability to run tests more frequently',
        ],
        correctAnswer: 3,
      },
      {
        id: 5,
        text: 'What is a test case?',
        options: [
          'A container for storing test files',
          'A specific set of conditions and inputs to verify a particular feature',
          'A bug report template',
          'The time allocated for testing',
        ],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: 27,
    courseId: 12,
    title: 'Selenium & Automation Quiz',
    description: 'Assess your understanding of Selenium WebDriver and test automation best practices.',
    questions: [
      {
        id: 1,
        text: 'What is Selenium WebDriver primarily used for?',
        options: [
          'Database testing',
          'API testing',
          'Browser automation and UI testing',
          'Performance testing',
        ],
        correctAnswer: 3,
      },
      {
        id: 2,
        text: 'Which design pattern is commonly recommended for organizing Selenium tests?',
        options: [
          'Singleton Pattern',
          'Page Object Model',
          'Factory Pattern',
          'Observer Pattern',
        ],
        correctAnswer: 2,
      },
      {
        id: 3,
        text: 'What is the purpose of explicit waits in Selenium?',
        options: [
          'To make tests run slower for debugging',
          'To wait for a specific condition to be true before proceeding',
          'To pause the entire test suite',
          'To wait for user input',
        ],
        correctAnswer: 2,
      },
      {
        id: 4,
        text: 'Which locator strategy is generally considered most reliable in Selenium?',
        options: [
          'XPath using absolute paths',
          'CSS selectors with complex hierarchies',
          'ID attribute',
          'Class name',
        ],
        correctAnswer: 3,
      },
      {
        id: 5,
        text: 'What is a common cause of flaky tests in Selenium?',
        options: [
            'Timing issues and race conditions',
          'Using too many assertions',
          'Having too many test cases',
          'Using the latest browser version',
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: 28,
    courseId: 12,
    title: 'API Testing with Postman Quiz',
    description: 'Evaluate your knowledge of API testing concepts and Postman usage.',
    questions: [
      {
        id: 1,
        text: 'Which HTTP method is typically used to retrieve data from an API?',
        options: ['POST', 'GET', 'PUT', 'DELETE'],
        correctAnswer: 2,
      },
      {
        id: 2,
        text: 'What does a 404 status code indicate?',
        options: [
          'Server error',
          'Unauthorized access',
          'Resource not found',
          'Request successful',
        ],
        correctAnswer: 3,
      },
      {
        id: 3,
        text: 'In Postman, what are Collections used for?',
        options: [
          'Storing API responses',
          'Organizing and grouping related API requests',
          'Creating mock servers',
          'Generating API documentation only',
        ],
        correctAnswer: 2,
      },
      {
        id: 4,
        text: 'Which status code range indicates a successful HTTP response?',
        options: ['100-199', '200-299', '300-399', '400-499'],
        correctAnswer: 2,
      },
      {
        id: 5,
        text: 'What is the purpose of API assertions in testing?',
        options: [
          'To make the API run faster',
          'To authenticate the user',
          'To encrypt the data',
          'To verify that the API response matches expected values',
        ],
        correctAnswer: 4,
      },
    ],
  },

  // Course 13: PostgreSQL Mastery
  {
    id: 29,
    courseId: 13,
    title: 'PostgreSQL Fundamentals Quiz',
    description: 'Test your knowledge of PostgreSQL basics and core concepts.',
    questions: [
      {
        id: 1,
        text: 'What type of database is PostgreSQL?',
        options: [
          'Relational database',
          'NoSQL database',
          'Key-value store',
          'Graph database',
        ],
        correctAnswer: 1,
      },
      {
        id: 2,
        text: 'Which PostgreSQL data type is best for storing JSON documents?',
        options: ['TEXT', 'JSONB', 'VARCHAR', 'BLOB'],
        correctAnswer: 2,
      },
      {
        id: 3,
        text: 'What is a PRIMARY KEY in PostgreSQL?',
        options: [
          'A key that unlocks the database',
          'A unique identifier for each row in a table',
          'A password for database access',
          'A foreign key reference',
        ],
        correctAnswer: 2,
      },
      {
        id: 4,
        text: 'Which command is used to retrieve data from a PostgreSQL table?',
        options: ['INSERT', 'UPDATE', 'DELETE', 'SELECT'],
        correctAnswer: 4,
      },
      {
        id: 5,
        text: 'What does ACID stand for in database transactions?',
        options: [
          'Atomicity, Consistency, Isolation, Durability',
          'Access, Control, Integration, Data',
          'Authentication, Credentials, Identity, Directory',
          'Automatic, Cached, Indexed, Distributed',
        ],
        correctAnswer: 1,
      },
    ],
  },

  // Course 13: PostgreSQL Mastery
  {
    id: 30,
    courseId: 13,
    title: 'PostgreSQL Advanced Features Quiz',
    description: 'Test your understanding of advanced PostgreSQL features.',
    questions: [
      {
        id: 1,
        text: 'What are window functions in PostgreSQL?',
        options: [
          'Functions that open new database connections',
          'Functions that perform calculations across rows related to the current row',
          'Functions that create GUI windows',
          'Functions that manage database windows',
        ],
        correctAnswer: 2,
      },
      {
        id: 2,
        text: 'What is the purpose of EXPLAIN ANALYZE in PostgreSQL?',
        options: [
          'To create documentation',
          'To backup the database',
          'To show query execution plan and actual runtime statistics',
          'To encrypt data',
        ],
        correctAnswer: 3,
      },
      {
        id: 3,
        text: 'Which index type is best for full-text search in PostgreSQL?',
        options: ['B-tree', 'Hash', 'GIN', 'BRIN'],
        correctAnswer: 3,
      },
      {
        id: 4,
        text: 'What is a CTE (Common Table Expression) in PostgreSQL?',
        options: [
          'A compressed table entity',
          'A temporary result set that can be referenced within a SELECT, INSERT, UPDATE, or DELETE',
          'A cached table entry',
          'A column type extension',
        ],
        correctAnswer: 2,
      },
      {
        id: 5,
        text: 'What is the purpose of VACUUM in PostgreSQL?',
        options: [
          'To delete all data',
          'To compress files',
          'To reclaim storage and update statistics',
          'To create backups',
        ],
        correctAnswer: 3,
      },
      {
        id: 6,
        text: 'Which PostgreSQL feature allows you to store and query JSON data efficiently?',
        options: ['TEXT columns', 'JSONB data type', 'VARCHAR fields', 'BLOB storage'],
        correctAnswer: 2,
      },
      {
        id: 7,
        text: 'What is the difference between JSONB and JSON in PostgreSQL?',
        options: [
          'No difference',
          'JSONB is stored in binary format and supports indexing',
          'JSON is faster',
          'JSONB only stores numbers',
        ],
        correctAnswer: 2,
      },
      {
        id: 8,
        text: 'What is table partitioning in PostgreSQL?',
        options: [
          'Splitting large tables into smaller, more manageable pieces',
          'Creating backup copies',
          'Encrypting table data',
          'Compressing table storage',
        ],
        correctAnswer: 1,
      },
      {
        id: 9,
        text: 'Which PostgreSQL extension provides additional data types for geometric data?',
        options: ['PostGIS', 'pgAdmin', 'pg_stat', 'pg_dump'],
        correctAnswer: 1,
      },
      {
        id: 10,
        text: 'What is the purpose of connection pooling in PostgreSQL?',
        options: [
          'To store connections in a pool',
          'To manage and reuse database connections for better performance',
          'To create multiple databases',
          'To backup connections',
        ],
        correctAnswer: 2,
      },
    ],
  },

  // Course 14: Database Design 
  {
    id: 31,
    courseId: 14,
    title: 'Database Design Principles Quiz',
    description: 'Test your knowledge of database design fundamentals.',
    questions: [
      {
        id: 1,
        text: 'What is normalization in database design?',
        options: [
          'Making all values normal',
          'Organizing data to reduce redundancy and improve data integrity',
          'Converting data to standard format',
          'Backing up the database',
        ],
        correctAnswer: 2,
      },
      {
        id: 2,
        text: 'What is the First Normal Form (1NF) requirement?',
        options: [
          'All attributes must be atomic (indivisible)',
          'All tables must have primary keys',
          'No duplicate rows allowed',
          'Foreign keys must be defined',
        ],
        correctAnswer: 1,
      },
      {
        id: 3,
        text: 'What is a foreign key?',
        options: [
          'A key from another database',
          'A field that links to the primary key of another table',
          'An encrypted key',
          'A backup key',
        ],
        correctAnswer: 2,
      },
      {
        id: 4,
        text: 'What does denormalization mean?',
        options: [
          'Removing all normalization',
          'Intentionally introducing redundancy to improve query performance',
          'Deleting normalized data',
          'Converting to NoSQL',
        ],
        correctAnswer: 2,
      },
      {
        id: 5,
        text: 'What is an ER diagram?',
        options: [
          'Error Recovery diagram',
          'Entity-Relationship diagram showing database structure',
          'Encrypted Record diagram',
          'External Resource diagram',
        ],
        correctAnswer: 2,
      },
      {
        id: 6,
        text: 'What type of relationship exists when one record in Table A relates to many records in Table B?',
        options: [
          'One-to-one',
          'One-to-many',
          'Many-to-many',
          'Many-to-one',
        ],
        correctAnswer: 2,
      },
      {
        id: 7,
        text: 'What is a composite key?',
        options: [
          'A key made of multiple columns',
          'A key that is very complex',
          'An encrypted key',
          'A backup key',
        ],
        correctAnswer: 1,
      },
      {
        id: 8,
        text: 'What is referential integrity?',
        options: [
          'Keeping references to external documents',
          'Ensuring relationships between tables remain consistent',
          'Encrypting data references',
          'Backing up table relationships',
        ],
        correctAnswer: 2,
      },
      {
        id: 9,
        text: 'What is the purpose of indexing in databases?',
        options: [
          'To organize files',
          'To speed up data retrieval operations',
          'To backup data',
          'To encrypt data',
        ],
        correctAnswer: 2,
      },
      {
        id: 10,
        text: 'What is a junction table used for?',
        options: [
          'Connecting two databases',
          'Implementing many-to-many relationships',
          'Storing temporary data',
          'Creating backups',
        ],
        correctAnswer: 2,
      },
    ],
  },

  // Course 14: Database Design
  {
    id: 32,
    courseId: 14,
    title: 'Query Optimization Quiz',
    description: 'Test your understanding of database query optimization techniques.',
    questions: [
      {
        id: 1,
        text: 'What is a query execution plan?',
        options: [
          'A plan for when to run queries',
          'A step-by-step strategy the database uses to execute a query',
          'A backup plan for failed queries',
          'A query scheduling system',
        ],
        correctAnswer: 2,
      },
      {
        id: 2,
        text: 'Which index type is most commonly used in relational databases?',
        options: ['B-tree', 'Hash', 'Bitmap', 'Full-text'],
        correctAnswer: 1,
      },
      {
        id: 3,
        text: 'What is the main disadvantage of having too many indexes?',
        options: [
          'Takes up too much memory',
          'Slows down write operations (INSERT, UPDATE, DELETE)',
          'Makes queries slower',
          'Increases security risks',
        ],
        correctAnswer: 2,
      },
      {
        id: 4,
        text: 'What does query caching do?',
        options: [
          'Deletes old queries',
          'Stores query results for faster retrieval of repeated queries',
          'Compresses queries',
          'Encrypts queries',
        ],
        correctAnswer: 2,
      },
      {
        id: 5,
        text: 'What is database sharding?',
        options: [
          'Breaking glass',
          'Horizontally partitioning data across multiple database instances',
          'Encrypting data',
          'Compressing data',
        ],
        correctAnswer: 2,
      },
    ],
  },

  // Course 15: JavaScript ES6+ Deep Dive
  {
    id: 33,
    courseId: 15,
    title: 'Modern JavaScript Features Quiz',
    description: 'Test your knowledge of ES6+ JavaScript features.',
    questions: [
      {
        id: 1,
        text: 'What does the spread operator (...) do?',
        options: [
          'Spreads butter',
          'Expands an iterable into individual elements',
          'Creates new variables',
          'Deletes array elements',
        ],
        correctAnswer: 2,
      },
      {
        id: 2,
        text: 'What is the difference between let and var?',
        options: [
          'No difference',
          'let has block scope, var has function scope',
          'var is faster',
          'let cannot be reassigned',
        ],
        correctAnswer: 2,
      },
      {
        id: 3,
        text: 'What does destructuring allow you to do?',
        options: [
          'Delete objects',
          'Extract values from arrays or objects into distinct variables',
          'Destroy variables',
          'Compress data',
        ],
        correctAnswer: 2,
      },
      {
        id: 4,
        text: 'What is an arrow function?',
        options: [
          'A function that points',
          'A concise syntax for writing functions with implicit return and lexical this',
          'A faster function',
          'A decorative function',
        ],
        correctAnswer: 2,
      },
      {
        id: 5,
        text: 'What are template literals in JavaScript?',
        options: [
          'Pre-made code templates',
          'String literals allowing embedded expressions using backticks',
          'Design templates',
          'Function templates',
        ],
        correctAnswer: 2,
      },
      {
        id: 6,
        text: 'What is the purpose of the const keyword?',
        options: [
          'To create constant functions',
          'To declare variables that cannot be reassigned',
          'To make code faster',
          'To create constructors',
        ],
        correctAnswer: 2,
      },
      {
        id: 7,
        text: 'What are default parameters in ES6?',
        options: [
          'Parameters that are always used',
          'Parameters with predefined fallback values',
          'Required parameters',
          'Optional parameters only',
        ],
        correctAnswer: 2,
      },
      {
        id: 8,
        text: 'What is the rest parameter in JavaScript?',
        options: [
          'A sleeping parameter',
          'Syntax to represent an indefinite number of arguments as an array',
          'The last parameter only',
          'A backup parameter',
        ],
        correctAnswer: 2,
      },
      {
        id: 9,
        text: 'What are ES6 modules?',
        options: [
          'Hardware modules',
          'A way to organize and share code using import/export',
          'Software packages',
          'Code libraries',
        ],
        correctAnswer: 2,
      },
      {
        id: 10,
        text: 'What is the purpose of the class keyword in ES6?',
        options: [
          'To classify data',
          'To create constructor functions with cleaner syntax',
          'To grade code quality',
          'To group variables',
        ],
        correctAnswer: 2,
      },
    ],
  },

  // Course 15: JavaScript ES6+ Deep Dive 
  {
    id: 34,
    courseId: 15,
    title: 'Async JavaScript Quiz',
    description: 'Test your understanding of asynchronous JavaScript concepts.',
    questions: [
      {
        id: 1,
        text: 'What is a Promise in JavaScript?',
        options: [
          'A guarantee',
          'An object representing the eventual completion or failure of an async operation',
          'A function type',
          'A variable type',
        ],
        correctAnswer: 2,
      },
      {
        id: 2,
        text: 'What are the three states of a Promise?',
        options: [
          'Start, Middle, End',
          'Pending, Fulfilled, Rejected',
          'New, Running, Completed',
          'Open, Processing, Closed',
        ],
        correctAnswer: 2,
      },
      {
        id: 3,
        text: 'What does the async keyword do?',
        options: [
          'Makes functions run faster',
          'Declares a function as asynchronous, always returning a Promise',
          'Delays function execution',
          'Creates multiple threads',
        ],
        correctAnswer: 2,
      },
      {
        id: 4,
        text: 'What is the purpose of the await keyword?',
        options: [
          'To wait for user input',
          'To pause execution until a Promise is resolved',
          'To delay code',
          'To create timeouts',
        ],
        correctAnswer: 2,
      },
      {
        id: 5,
        text: 'What is the event loop in JavaScript?',
        options: [
          'A loop that creates events',
          'A mechanism that handles asynchronous operations by managing callback queue',
          'An infinite loop',
          'A for loop for events',
        ],
        correctAnswer: 2,
      },
    ],
  },

  // Course 16: TypeScript Complete Guide 
  {
    id: 35,
    courseId: 16,
    title: 'TypeScript Basics Quiz',
    description: 'Test your knowledge of TypeScript fundamentals.',
    questions: [
      {
        id: 1,
        text: 'What is TypeScript?',
        options: [
          'A new programming language',
          'A typed superset of JavaScript that compiles to plain JavaScript',
          'A JavaScript library',
          'A database language',
        ],
        correctAnswer: 2,
      },
      {
        id: 2,
        text: 'What is the purpose of type annotations in TypeScript?',
        options: [
          'To make code colorful',
          'To explicitly specify the type of variables, parameters, and return values',
          'To add comments',
          'To format code',
        ],
        correctAnswer: 2,
      },
      {
        id: 3,
        text: 'What is an interface in TypeScript?',
        options: [
          'A user interface',
          'A way to define the shape of an object',
          'A network interface',
          'A class type',
        ],
        correctAnswer: 2,
      },
      {
        id: 4,
        text: 'What does the "any" type mean in TypeScript?',
        options: [
          'Any number',
          'A type that can be anything, disabling type checking',
          'Any string',
          'Any array',
        ],
        correctAnswer: 2,
      },
      {
        id: 5,
        text: 'What is a union type in TypeScript?',
        options: [
          'A type for unions',
          'A type that can be one of several types (e.g., string | number)',
          'A combined type',
          'A special class',
        ],
        correctAnswer: 2,
      },
    ],
  },

  // Course 16: TypeScript Complete Guide 
  {
    id: 36,
    courseId: 16,
    title: 'Advanced TypeScript Quiz',
    description: 'Test your understanding of advanced TypeScript features.',
    questions: [
      {
        id: 1,
        text: 'What are generics in TypeScript?',
        options: [
          'Generic functions',
          'A way to create reusable components that work with multiple types',
          'General types',
          'Default types',
        ],
        correctAnswer: 2,
      },
      {
        id: 2,
        text: 'What is a type guard?',
        options: [
          'Security for types',
          'A way to narrow down the type of a variable within a conditional block',
          'A type protector',
          'An error handler',
        ],
        correctAnswer: 2,
      },
      {
        id: 3,
        text: 'What does the "readonly" modifier do?',
        options: [
          'Makes code readable',
          'Prevents properties from being modified after initialization',
          'Creates read-only files',
          'Enables read operations',
        ],
        correctAnswer: 2,
      },
      {
        id: 4,
        text: 'What are utility types in TypeScript?',
        options: [
          'Useful types',
          'Built-in types that help transform existing types (e.g., Partial, Pick, Omit)',
          'Helper functions',
          'Special classes',
        ],
        correctAnswer: 2,
      },
      {
        id: 5,
        text: 'What is the difference between "type" and "interface"?',
        options: [
          'No difference',
          'Interfaces can be extended and merged, types are more flexible with unions/intersections',
          'Types are faster',
          'Interfaces are deprecated',
        ],
        correctAnswer: 2,
      },
    ],
  },

  // Course 17: Rust Programming
  {
    id: 37,
    courseId: 17,
    title: 'Rust Fundamentals Quiz',
    description: 'Test your knowledge of Rust programming basics.',
    questions: [
      {
        id: 1,
        text: 'What is Rust\'s key feature for memory safety?',
        options: [
          'Garbage collection',
          'Ownership system',
          'Manual memory management',
          'Automatic cleanup',
        ],
        correctAnswer: 2,
      },
      {
        id: 2,
        text: 'What are the three rules of ownership in Rust?',
        options: [
          'Copy, Move, Drop',
          'Each value has an owner, only one owner at a time, value dropped when owner goes out of scope',
          'Borrow, Own, Share',
          'Create, Use, Delete',
        ],
        correctAnswer: 2,
      },
      {
        id: 3,
        text: 'What is borrowing in Rust?',
        options: [
          'Taking code from others',
          'Temporarily accessing data without taking ownership',
          'Copying values',
          'Sharing memory',
        ],
        correctAnswer: 2,
      },
      {
        id: 4,
        text: 'What is a mutable reference in Rust?',
        options: [
          'A changeable variable',
          'A reference that allows modification of borrowed data',
          'A constant reference',
          'An immutable pointer',
        ],
        correctAnswer: 2,
      },
      {
        id: 5,
        text: 'What does the Result type represent in Rust?',
        options: [
          'Test results',
          'Either a success value (Ok) or an error value (Err)',
          'Return values',
          'Output data',
        ],
        correctAnswer: 2,
      },
    ],
  },

  // Course 17: Rust Programming
  {
    id: 38,
    courseId: 17,
    title: 'Advanced Rust Quiz',
    description: 'Test your understanding of advanced Rust concepts.',
    questions: [
      {
        id: 1,
        text: 'What are lifetimes in Rust?',
        options: [
          'How long a program runs',
          'Annotations that help the compiler ensure references are valid',
          'Variable duration',
          'Memory lifespan',
        ],
        correctAnswer: 2,
      },
      {
        id: 2,
        text: 'What is a trait in Rust?',
        options: [
          'A personality feature',
          'A collection of methods that types can implement',
          'A data structure',
          'A variable type',
        ],
        correctAnswer: 2,
      },
      {
        id: 3,
        text: 'What is pattern matching in Rust?',
        options: [
          'Text matching',
          'A powerful control flow construct that matches values against patterns',
          'String comparison',
          'Regex matching',
        ],
        correctAnswer: 2,
      },
      {
        id: 4,
        text: 'What does the Option type represent?',
        options: [
          'Configuration options',
          'A value that can be either Some(value) or None',
          'User choices',
          'Program settings',
        ],
        correctAnswer: 2,
      },
      {
        id: 5,
        text: 'What is unsafe Rust?',
        options: [
          'Dangerous code',
          'Code that bypasses Rust\'s safety guarantees for low-level operations',
          'Untested code',
          'Deprecated code',
        ],
        correctAnswer: 2,
      },
      {
        id: 6,
        text: 'What are closures in Rust?',
        options: [
          'Code endings',
          'Anonymous functions that can capture their environment',
          'Class destructors',
          'Loop terminators',
        ],
        correctAnswer: 2,
      },
      {
        id: 7,
        text: 'What is the purpose of the Box type?',
        options: [
          'To box data',
          'To allocate data on the heap instead of the stack',
          'To compress data',
          'To encrypt data',
        ],
        correctAnswer: 2,
      },
      {
        id: 8,
        text: 'What does Rust\'s "fearless concurrency" mean?',
        options: [
          'No fear in coding',
          'Rust\'s ownership system prevents data races at compile time',
          'Fast threading',
          'Easy parallelism',
        ],
        correctAnswer: 2,
      },
      {
        id: 9,
        text: 'What is a smart pointer in Rust?',
        options: [
          'An intelligent pointer',
          'A data structure that acts like a pointer with additional metadata and capabilities',
          'A fast pointer',
          'A safe pointer',
        ],
        correctAnswer: 2,
      },
      {
        id: 10,
        text: 'What is the difference between String and &str in Rust?',
        options: [
          'No difference',
          'String is owned and growable, &str is a borrowed string slice',
          'String is faster',
          '&str is deprecated',
        ],
        correctAnswer: 2,
      },
    ],
  },

  // Course 18: Java Spring Boot Masterclass 
  {
    id: 39,
    courseId: 18,
    title: 'Spring Boot Basics Quiz',
    description: 'Test your knowledge of Spring Boot fundamentals.',
    questions: [
      {
        id: 1,
        text: 'What is Spring Boot?',
        options: [
          'A shoe brand',
          'A framework that simplifies Spring application development',
          'A Java library',
          'A database tool',
        ],
        correctAnswer: 2,
      },
      {
        id: 2,
        text: 'What is dependency injection in Spring?',
        options: [
          'Adding libraries',
          'A design pattern where objects receive their dependencies from external sources',
          'Installing packages',
          'Importing modules',
        ],
        correctAnswer: 2,
      },
      {
        id: 3,
        text: 'What annotation is used to mark a class as a Spring REST controller?',
        options: [
          '@Controller',
          '@RestController',
          '@Service',
          '@Component',
        ],
        correctAnswer: 2,
      },
      {
        id: 4,
        text: 'What is the purpose of @Autowired annotation?',
        options: [
          'To wire hardware',
          'To automatically inject dependencies',
          'To create wires',
          'To connect databases',
        ],
        correctAnswer: 2,
      },
      {
        id: 5,
        text: 'What file format does Spring Boot use for configuration?',
        options: [
          'XML only',
          'application.properties or application.yml',
          'JSON only',
          'INI files',
        ],
        correctAnswer: 2,
      },
    ],
  },

  // Course 18: Java Spring Boot Masterclass
  {
    id: 40,
    courseId: 18,
    title: 'Spring Boot Advanced Quiz',
    description: 'Test your understanding of advanced Spring Boot concepts.',
    questions: [
      {
        id: 1,
        text: 'What is Spring Data JPA?',
        options: [
          'A data format',
          'A framework that simplifies database access using JPA',
          'A database type',
          'A Java library',
        ],
        correctAnswer: 2,
      },
      {
        id: 2,
        text: 'What is the purpose of @Entity annotation?',
        options: [
          'To create entities',
          'To mark a class as a JPA entity mapped to a database table',
          'To define objects',
          'To create services',
        ],
        correctAnswer: 2,
      },
      {
        id: 3,
        text: 'What is Spring Security used for?',
        options: [
          'Physical security',
          'Providing authentication and authorization for applications',
          'Encrypting files',
          'Securing hardware',
        ],
        correctAnswer: 2,
      },
      {
        id: 4,
        text: 'What is a microservice?',
        options: [
          'A small service',
          'An independently deployable service that focuses on a single business capability',
          'A mini application',
          'A tiny function',
        ],
        correctAnswer: 2,
      },
      {
        id: 5,
        text: 'What is the purpose of @Transactional annotation?',
        options: [
          'To make transactions',
          'To manage database transactions declaratively',
          'To transfer data',
          'To translate data',
        ],
        correctAnswer: 2,
      },
      {
        id: 6,
        text: 'What is Spring Cloud?',
        options: [
          'Cloud storage',
          'A framework for building cloud-native applications with distributed system patterns',
          'A weather service',
          'A backup service',
        ],
        correctAnswer: 2,
      },
      {
        id: 7,
        text: 'What is the purpose of @RequestMapping?',
        options: [
          'To create maps',
          'To map HTTP requests to handler methods',
          'To request data',
          'To route traffic',
        ],
        correctAnswer: 2,
      },
      {
        id: 8,
        text: 'What is Hibernate in Spring Boot?',
        options: [
          'Sleep mode',
          'An ORM framework for mapping Java objects to database tables',
          'A caching system',
          'A storage solution',
        ],
        correctAnswer: 2,
      },
      {
        id: 9,
        text: 'What is the purpose of application.properties file?',
        options: [
          'To list properties',
          'To configure Spring Boot application settings',
          'To store data',
          'To define classes',
        ],
        correctAnswer: 2,
      },
      {
        id: 10,
        text: 'What is a RESTful API?',
        options: [
          'A sleeping API',
          'An API that follows REST architectural principles using HTTP methods',
          'A relaxed API',
          'A retired API',
        ],
        correctAnswer: 2,
      },
    ],
  },

  // Course 19: Go Language
  {
    id: 41,
    courseId: 19,
    title: 'Go Basics Quiz',
    description: 'Test your knowledge of Go programming fundamentals.',
    questions: [
      {
        id: 1,
        text: 'What is a goroutine in Go?',
        options: [
          'A Go library',
          'A lightweight thread managed by the Go runtime',
          'A function type',
          'A data structure',
        ],
        correctAnswer: 2,
      },
      {
        id: 2,
        text: 'How do you declare a variable in Go?',
        options: [
          'var name type',
          'let name type',
          'dim name type',
          'declare name type',
        ],
        correctAnswer: 1,
      },
      {
        id: 3,
        text: 'What is a channel in Go?',
        options: [
          'A TV channel',
          'A mechanism for goroutines to communicate and synchronize',
          'A data pipe',
          'A network connection',
        ],
        correctAnswer: 2,
      },
      {
        id: 4,
        text: 'What keyword is used to define a function in Go?',
        options: [
          'function',
          'func',
          'def',
          'fn',
        ],
        correctAnswer: 2,
      },
      {
        id: 5,
        text: 'What is the purpose of the defer statement?',
        options: [
          'To delay execution',
          'To schedule a function call to run after the surrounding function returns',
          'To postpone code',
          'To create timeouts',
        ],
        correctAnswer: 2,
      },
    ],
  },

  // Course 19: Go Language
  {
    id: 42,
    courseId: 19,
    title: 'Go Concurrency Quiz',
    description: 'Test your understanding of Go concurrency patterns.',
    questions: [
      {
        id: 1,
        text: 'What does the select statement do in Go?',
        options: [
          'Selects data',
          'Waits on multiple channel operations',
          'Chooses variables',
          'Picks functions',
        ],
        correctAnswer: 2,
      },
      {
        id: 2,
        text: 'What is a buffered channel?',
        options: [
          'A channel with storage',
          'A channel that can hold a limited number of values without a receiver',
          'A fast channel',
          'A large channel',
        ],
        correctAnswer: 2,
      },
      {
        id: 3,
        text: 'What is the purpose of sync.WaitGroup?',
        options: [
          'To create groups',
          'To wait for a collection of goroutines to finish',
          'To synchronize time',
          'To group data',
        ],
        correctAnswer: 2,
      },
      {
        id: 4,
        text: 'What is a mutex in Go?',
        options: [
          'A musical term',
          'A mutual exclusion lock to protect shared resources',
          'A multiplexer',
          'A data type',
        ],
        correctAnswer: 2,
      },
      {
        id: 5,
        text: 'What happens when you close a channel in Go?',
        options: [
          'Channel is deleted',
          'No more values can be sent, but receivers can still read remaining values',
          'All data is lost',
          'Channel becomes unusable',
        ],
        correctAnswer: 2,
      },
      {
        id: 6,
        text: 'What is the difference between buffered and unbuffered channels?',
        options: [
          'Speed',
          'Buffered channels can store values; unbuffered require sender and receiver to be ready',
          'Size',
          'Performance',
        ],
        correctAnswer: 2,
      },
      {
        id: 7,
        text: 'What does the go keyword do?',
        options: [
          'Starts the program',
          'Launches a new goroutine',
          'Goes to a line',
          'Continues execution',
        ],
        correctAnswer: 2,
      },
      {
        id: 8,
        text: 'What is a deadlock in Go?',
        options: [
          'A locked door',
          'A situation where goroutines are waiting for each other indefinitely',
          'A security lock',
          'A database lock',
        ],
        correctAnswer: 2,
      },
      {
        id: 9,
        text: 'What is sync.Mutex used for?',
        options: [
          'Music synchronization',
          'Protecting shared resources from concurrent access',
          'Time synchronization',
          'Data multiplication',
        ],
        correctAnswer: 2,
      },
      {
        id: 10,
        text: 'What is the purpose of context package in Go?',
        options: [
          'To add context',
          'To carry deadlines, cancellation signals, and request-scoped values',
          'To create documentation',
          'To manage state',
        ],
        correctAnswer: 2,
      },
    ],
  },

  // Course 20: C++ Modern Programming
  {
    id: 43,
    courseId: 20,
    title: 'Modern C++ Fundamentals Quiz',
    description: 'Test your knowledge of modern C++ features.',
    questions: [
      {
        id: 1,
        text: 'What is a smart pointer in C++?',
        options: [
          'An intelligent pointer',
          'A pointer that automatically manages memory',
          'A fast pointer',
          'A safe pointer',
        ],
        correctAnswer: 2,
      },
      {
        id: 2,
        text: 'What is move semantics in C++?',
        options: [
          'Moving code',
          'Transferring ownership of resources without copying',
          'Relocating memory',
          'Shifting data',
        ],
        correctAnswer: 2,
      },
      {
        id: 3,
        text: 'What is an rvalue reference?',
        options: [
          'A right-side reference',
          'A reference to a temporary object using &&',
          'A return value reference',
          'A recursive reference',
        ],
        correctAnswer: 2,
      },
      {
        id: 4,
        text: 'What is RAII in C++?',
        options: [
          'A design pattern',
          'Resource Acquisition Is Initialization - managing resources through object lifetime',
          'A memory model',
          'A programming style',
        ],
        correctAnswer: 2,
      },
      {
        id: 5,
        text: 'What is the auto keyword used for?',
        options: [
          'Automatic cars',
          'Automatic type deduction',
          'Automatic functions',
          'Automatic variables',
        ],
        correctAnswer: 2,
      },
    ],
  },

  // Course 20: C++ Modern Programming 
  {
    id: 44,
    courseId: 20,
    title: 'C++ STL and Templates Quiz',
    description: 'Test your understanding of the Standard Template Library.',
    questions: [
      {
        id: 1,
        text: 'What is the STL in C++?',
        options: [
          'Standard Type Library',
          'Standard Template Library - a collection of template classes and functions',
          'Static Type Library',
          'System Template Library',
        ],
        correctAnswer: 2,
      },
      {
        id: 2,
        text: 'What is a vector in C++ STL?',
        options: [
          'A math vector',
          'A dynamic array that can resize automatically',
          'A pointer array',
          'A static array',
        ],
        correctAnswer: 2,
      },
      {
        id: 3,
        text: 'What is a lambda expression in C++?',
        options: [
          'A Greek letter',
          'An anonymous function that can capture variables from its scope',
          'A template function',
          'A macro',
        ],
        correctAnswer: 2,
      },
      {
        id: 4,
        text: 'What does std::unique_ptr guarantee?',
        options: [
          'Uniqueness',
          'Exclusive ownership of a dynamically allocated object',
          'Fast access',
          'Thread safety',
        ],
        correctAnswer: 2,
      },
      {
        id: 5,
        text: 'What is the difference between std::vector and std::array?',
        options: [
          'No difference',
          'vector is dynamic and heap-allocated, array is fixed-size and stack-allocated',
          'vector is faster',
          'array is deprecated',
        ],
        correctAnswer: 2,
      },
      {
        id: 6,
        text: 'What is a template in C++?',
        options: [
          'A code template',
          'A blueprint for creating generic functions or classes',
          'A design pattern',
          'A pre-made class',
        ],
        correctAnswer: 2,
      },
      {
        id: 7,
        text: 'What is std::shared_ptr?',
        options: [
          'A shared pointer',
          'A smart pointer with shared ownership using reference counting',
          'A fast pointer',
          'A thread-safe pointer',
        ],
        correctAnswer: 2,
      },
      {
        id: 8,
        text: 'What does the constexpr keyword do?',
        options: [
          'Makes constants',
          'Enables compile-time evaluation of expressions',
          'Creates expressions',
          'Defines constraints',
        ],
        correctAnswer: 2,
      },
      {
        id: 9,
        text: 'What is std::map used for?',
        options: [
          'Creating maps',
          'Storing key-value pairs in sorted order',
          'Navigation',
          'Data mapping',
        ],
        correctAnswer: 2,
      },
      {
        id: 10,
        text: 'What is the purpose of iterators in C++ STL?',
        options: [
          'To repeat code',
          'To traverse and access elements in containers',
          'To create loops',
          'To iterate numbers',
        ],
        correctAnswer: 2,
      },
    ],
  },

  // Course 21: Machine Learning with Python 
  {
    id: 45,
    courseId: 21,
    title: 'Machine Learning Fundamentals Quiz',
    description: 'Test your knowledge of ML basics and concepts.',
    questions: [
      {
        id: 1,
        text: 'What is supervised learning?',
        options: [
          'Learning with supervision',
          'Learning from labeled data with input-output pairs',
          'Watching tutorials',
          'Teacher-led training',
        ],
        correctAnswer: 2,
      },
      {
        id: 2,
        text: 'What is the difference between classification and regression?',
        options: [
          'No difference',
          'Classification predicts categories, regression predicts continuous values',
          'Classification is faster',
          'Regression is more accurate',
        ],
        correctAnswer: 2,
      },
      {
        id: 3,
        text: 'What is overfitting in machine learning?',
        options: [
          'Too much data',
          'When a model learns training data too well and performs poorly on new data',
          'Model is too big',
          'Training too long',
        ],
        correctAnswer: 2,
      },
      {
        id: 4,
        text: 'What is cross-validation?',
        options: [
          'Validating twice',
          'A technique to assess model performance by splitting data into multiple folds',
          'Checking answers',
          'Comparing models',
        ],
        correctAnswer: 2,
      },
      {
        id: 5,
        text: 'What is feature engineering?',
        options: [
          'Building features',
          'The process of selecting and transforming variables for ML models',
          'Engineering software',
          'Creating functions',
        ],
        correctAnswer: 2,
      },
    ],
  },

  // Course 21: Machine Learning with Python 
  {
    id: 46,
    courseId: 21,
    title: 'Deep Learning Quiz',
    description: 'Test your understanding of neural networks and deep learning.',
    questions: [
      {
        id: 1,
        text: 'What is a neural network?',
        options: [
          'A network of neurons',
          'A computational model inspired by biological neural networks',
          'A brain scan',
          'A connection network',
        ],
        correctAnswer: 2,
      },
      {
        id: 2,
        text: 'What is backpropagation?',
        options: [
          'Moving backwards',
          'An algorithm for computing gradients to update neural network weights',
          'Reversing predictions',
          'Going back in time',
        ],
        correctAnswer: 2,
      },
      {
        id: 3,
        text: 'What is a CNN (Convolutional Neural Network) best used for?',
        options: [
          'Text processing',
          'Image recognition and computer vision tasks',
          'Time series',
          'Audio processing',
        ],
        correctAnswer: 2,
      },
      {
        id: 4,
        text: 'What is an activation function?',
        options: [
          'A starting function',
          'A function that introduces non-linearity into neural networks',
          'An activator',
          'A trigger function',
        ],
        correctAnswer: 2,
      },
      {
        id: 5,
        text: 'What is transfer learning?',
        options: [
          'Transferring data',
          'Using a pre-trained model as a starting point for a new task',
          'Moving models',
          'Sharing weights',
        ],
        correctAnswer: 2,
      },
      {
        id: 6,
        text: 'What is the purpose of dropout in neural networks?',
        options: [
          'Dropping data',
          'A regularization technique to prevent overfitting by randomly dropping neurons',
          'Removing layers',
          'Stopping training',
        ],
        correctAnswer: 2,
      },
      {
        id: 7,
        text: 'What is an epoch in training?',
        options: [
          'A time period',
          'One complete pass through the entire training dataset',
          'An era',
          'A training session',
        ],
        correctAnswer: 2,
      },
      {
        id: 8,
        text: 'What is gradient descent?',
        options: [
          'Going downhill',
          'An optimization algorithm that minimizes loss by updating parameters',
          'Descending gradients',
          'Slope calculation',
        ],
        correctAnswer: 2,
      },
      {
        id: 9,
        text: 'What is an RNN (Recurrent Neural Network) used for?',
        options: [
          'Recurring tasks',
          'Processing sequential data like text or time series',
          'Repeated training',
          'Recursive functions',
        ],
        correctAnswer: 2,
      },
      {
        id: 10,
        text: 'What is the difference between batch and online learning?',
        options: [
          'Speed',
          'Batch learns from all data at once, online learns incrementally',
          'Batch is better',
          'Online is faster',
        ],
        correctAnswer: 2,
      },
    ],
  },
];

/**
 * Get all quizzes for a specific course
 */
export function getQuizzesForCourse(courseId: number): Quiz[] {
  return QUIZZES.filter((quiz) => quiz.courseId === courseId);
}

/**
 * Get a specific quiz by ID
 */
export function getQuizById(quizId: number): Quiz | undefined {
  return QUIZZES.find((quiz) => quiz.id === quizId);
}
