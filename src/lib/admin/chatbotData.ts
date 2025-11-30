// Chatbot conversation data based on actual learners

export interface Message {
  id: number;
  sender: "learner" | "chatbot";
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: number;
  learnerName: string;
  learnerId: string;
  learnerAvatar: string;
  course: string;
  topics: string[];
  timestamp: string;
  sentiment: "Positive" | "Negative";
  messages: Message[];
}

export const chatbotConversations: Conversation[] = [
  {
    id: 1,
    learnerName: "Sarah Johnson",
    learnerId: "L-001",
    learnerAvatar: "/Asset/Emily.jpg",
    course: "Web Development with MERN",
    topics: ["React", "State Management", "Hooks"],
    timestamp: "2025-11-28  09:15pm",
    sentiment: "Positive",
    messages: [
      {
        id: 1,
        sender: "learner",
        text: "Hi! I'm confused about when to use useState vs useReducer in React. Can you explain?",
        timestamp: "09:15 pm"
      },
      {
        id: 2,
        sender: "chatbot",
        text: "Great question! useState is perfect for simple state like toggles or single values. useReducer is better when you have complex state logic with multiple sub-values or when the next state depends on the previous one.",
        timestamp: "09:16 pm"
      },
      {
        id: 3,
        sender: "learner",
        text: "Can you show me an example of when useReducer would be better?",
        timestamp: "09:17 pm"
      },
      {
        id: 4,
        sender: "chatbot",
        text: "Sure! Imagine a shopping cart - you need to add items, remove items, update quantities, clear the cart. Instead of multiple useState calls, useReducer lets you handle all these actions in one place with a reducer function.",
        timestamp: "09:17 pm"
      },
      {
        id: 5,
        sender: "learner",
        text: "That makes so much sense now! Thank you, this really helps with my project.",
        timestamp: "09:18 pm"
      }
    ]
  },
  {
    id: 2,
    learnerName: "Alex Chen",
    learnerId: "L-002",
    learnerAvatar: "/Asset/Michael.jpg",
    course: "Node.js APIs and Microservices",
    topics: ["Express", "API Design", "Error Handling"],
    timestamp: "2025-11-28  07:30pm",
    sentiment: "Negative",
    messages: [
      {
        id: 1,
        sender: "learner",
        text: "My Express API keeps crashing when I send invalid data. How do I handle errors properly?",
        timestamp: "07:30 pm"
      },
      {
        id: 2,
        sender: "chatbot",
        text: "You should implement error handling middleware in Express. You can create a middleware function that catches errors and sends appropriate responses.",
        timestamp: "07:31 pm"
      },
      {
        id: 3,
        sender: "learner",
        text: "I tried that but my app still crashes on database errors. What am I missing?",
        timestamp: "07:32 pm"
      },
      {
        id: 4,
        sender: "chatbot",
        text: "Make sure you're using try-catch blocks in your async route handlers and passing errors to next(). Also check if your database connection has error handlers.",
        timestamp: "07:33 pm"
      },
      {
        id: 5,
        sender: "learner",
        text: "I don't understand what you mean by passing to next(). This is too confusing.",
        timestamp: "07:34 pm"
      }
    ]
  },
  {
    id: 3,
    learnerName: "Maria Garcia",
    learnerId: "L-003",
    learnerAvatar: "/Asset/Sophia.jpg",
    course: "HTML, CSS, JS Basics",
    topics: ["CSS", "Flexbox", "Layout"],
    timestamp: "2025-11-28  06:45pm",
    sentiment: "Positive",
    messages: [
      {
        id: 1,
        sender: "learner",
        text: "How do I center a div both horizontally and vertically using flexbox?",
        timestamp: "06:45 pm"
      },
      {
        id: 2,
        sender: "chatbot",
        text: "Use display: flex on the parent, then justify-content: center for horizontal and align-items: center for vertical centering!",
        timestamp: "06:45 pm"
      },
      {
        id: 3,
        sender: "learner",
        text: "Perfect! What if I want the parent to take full viewport height?",
        timestamp: "06:46 pm"
      },
      {
        id: 4,
        sender: "chatbot",
        text: "Add min-height: 100vh to the parent container. This makes it at least as tall as the viewport, allowing your content to center properly.",
        timestamp: "06:46 pm"
      },
      {
        id: 5,
        sender: "learner",
        text: "Excellent! That worked perfectly. Thanks!",
        timestamp: "06:47 pm"
      }
    ]
  },
  {
    id: 4,
    learnerName: "David Miller",
    learnerId: "L-004",
    learnerAvatar: "/Asset/James.jpg",
    course: "Data Science with Python",
    topics: ["Pandas", "Data Cleaning", "Analysis"],
    timestamp: "2025-11-27  10:20pm",
    sentiment: "Positive",
    messages: [
      {
        id: 1,
        sender: "learner",
        text: "What's the best way to handle missing values in a pandas DataFrame?",
        timestamp: "10:20 pm"
      },
      {
        id: 2,
        sender: "chatbot",
        text: "It depends on your data! You can use dropna() to remove rows with missing values, fillna() to replace them with specific values, or interpolate() for numerical data to estimate missing values.",
        timestamp: "10:20 pm"
      },
      {
        id: 3,
        sender: "learner",
        text: "When should I use fillna vs interpolate?",
        timestamp: "10:21 pm"
      },
      {
        id: 4,
        sender: "chatbot",
        text: "Use fillna() when you want to replace with a constant (like 0, mean, or 'Unknown'). Use interpolate() for time-series or ordered numerical data where you want to estimate values based on surrounding data points.",
        timestamp: "10:21 pm"
      },
      {
        id: 5,
        sender: "learner",
        text: "Got it! That's really helpful for my analysis project.",
        timestamp: "10:22 pm"
      }
    ]
  },
  {
    id: 5,
    learnerName: "Emma Wilson",
    learnerId: "L-005",
    learnerAvatar: "/Asset/Ava.jpg",
    course: "Complete Software Testing Mastery",
    topics: ["Selenium", "Automation", "Selectors"],
    timestamp: "2025-11-27  08:15pm",
    sentiment: "Negative",
    messages: [
      {
        id: 1,
        sender: "learner",
        text: "My Selenium tests keep failing because elements aren't found. How do I fix this?",
        timestamp: "08:15 pm"
      },
      {
        id: 2,
        sender: "chatbot",
        text: "This usually happens when elements load dynamically. You need to use explicit waits like WebDriverWait to wait for elements to be present before interacting with them.",
        timestamp: "08:16 pm"
      },
      {
        id: 3,
        sender: "learner",
        text: "I tried adding time.sleep() but it still fails sometimes.",
        timestamp: "08:17 pm"
      },
      {
        id: 4,
        sender: "chatbot",
        text: "Don't use time.sleep()! Use WebDriverWait with expected_conditions. This waits intelligently until the condition is met, making tests faster and more reliable.",
        timestamp: "08:17 pm"
      },
      {
        id: 5,
        sender: "learner",
        text: "I don't know how to use WebDriverWait. This is frustrating.",
        timestamp: "08:18 pm"
      }
    ]
  },
  {
    id: 6,
    learnerName: "Liam O'Brien",
    learnerId: "L-006",
    learnerAvatar: "/Asset/William.jpg",
    course: "Java Spring Boot Masterclass",
    topics: ["Spring Boot", "JPA", "Database"],
    timestamp: "2025-11-27  07:00pm",
    sentiment: "Positive",
    messages: [
      {
        id: 1,
        sender: "learner",
        text: "How do I define relationships between entities in Spring Data JPA?",
        timestamp: "07:00 pm"
      },
      {
        id: 2,
        sender: "chatbot",
        text: "Use @OneToMany, @ManyToOne, @OneToOne, or @ManyToMany annotations on your entity fields. For example, if a User has many Orders, add @OneToMany on the orders field in User class.",
        timestamp: "07:00 pm"
      },
      {
        id: 3,
        sender: "learner",
        text: "What about bidirectional relationships? Do I need to define both sides?",
        timestamp: "07:01 pm"
      },
      {
        id: 4,
        sender: "chatbot",
        text: "Yes! Use mappedBy on the non-owning side to avoid duplicate foreign keys. For example: @OneToMany(mappedBy=\"user\") in User class, and @ManyToOne with @JoinColumn in Order class.",
        timestamp: "07:01 pm"
      },
      {
        id: 5,
        sender: "learner",
        text: "Perfect explanation! That clears up my confusion completely.",
        timestamp: "07:02 pm"
      }
    ]
  },
  {
    id: 7,
    learnerName: "Sophia Lee",
    learnerId: "L-007",
    learnerAvatar: "/Asset/Grace.jpg",
    course: "JavaScript ES6+ Deep Dive",
    topics: ["Async", "Promises", "Error Handling"],
    timestamp: "2025-11-26  09:45pm",
    sentiment: "Positive",
    messages: [
      {
        id: 1,
        sender: "learner",
        text: "How do I properly handle errors in async/await functions?",
        timestamp: "09:45 pm"
      },
      {
        id: 2,
        sender: "chatbot",
        text: "Wrap your await calls in try-catch blocks! The catch block will handle any rejected promises, giving you a clean way to manage errors.",
        timestamp: "09:45 pm"
      },
      {
        id: 3,
        sender: "learner",
        text: "Should I have one try-catch for multiple await calls or separate ones?",
        timestamp: "09:46 pm"
      },
      {
        id: 4,
        sender: "chatbot",
        text: "It depends on your needs! One try-catch is simpler and works if you want the same error handling. Separate try-catch blocks give you more control to handle different errors differently.",
        timestamp: "09:46 pm"
      },
      {
        id: 5,
        sender: "learner",
        text: "Makes sense! I'll use separate ones for different API calls. Thanks!",
        timestamp: "09:47 pm"
      }
    ]
  },
  {
    id: 8,
    learnerName: "Mohammed Hassan",
    learnerId: "L-008",
    learnerAvatar: "/Asset/Joseph.jpg",
    course: "C++ Modern Programming",
    topics: ["Smart Pointers", "Memory", "RAII"],
    timestamp: "2025-11-26  08:30pm",
    sentiment: "Negative",
    messages: [
      {
        id: 1,
        sender: "learner",
        text: "I'm getting memory leaks in my C++ program. How do smart pointers help?",
        timestamp: "08:30 pm"
      },
      {
        id: 2,
        sender: "chatbot",
        text: "Smart pointers automatically manage memory! Use unique_ptr for exclusive ownership, shared_ptr for shared ownership, and weak_ptr to break circular references.",
        timestamp: "08:31 pm"
      },
      {
        id: 3,
        sender: "learner",
        text: "Which one should I use for my class member variables?",
        timestamp: "08:32 pm"
      },
      {
        id: 4,
        sender: "chatbot",
        text: "Generally start with unique_ptr for exclusive ownership. Only use shared_ptr when multiple objects need to share ownership of the same resource.",
        timestamp: "08:32 pm"
      },
      {
        id: 5,
        sender: "learner",
        text: "But my program still crashes. I don't understand what's wrong with my code.",
        timestamp: "08:33 pm"
      }
    ]
  },
  {
    id: 9,
    learnerName: "Isabella Martinez",
    learnerId: "L-009",
    learnerAvatar: "/Asset/Olivia.jpg",
    course: "Web Development with MERN",
    topics: ["MongoDB", "Schemas", "Mongoose"],
    timestamp: "2025-11-26  07:15pm",
    sentiment: "Positive",
    messages: [
      {
        id: 1,
        sender: "learner",
        text: "What's the difference between embedding and referencing in MongoDB?",
        timestamp: "07:15 pm"
      },
      {
        id: 2,
        sender: "chatbot",
        text: "Embedding stores related data within a document (good for one-to-few relationships). Referencing stores ObjectIds that link to other documents (better for one-to-many or many-to-many).",
        timestamp: "07:15 pm"
      },
      {
        id: 3,
        sender: "learner",
        text: "When should I choose one over the other?",
        timestamp: "07:16 pm"
      },
      {
        id: 4,
        sender: "chatbot",
        text: "Use embedding when data is frequently accessed together and doesn't grow unbounded (like user profile details). Use referencing when data is large, frequently updated separately, or has many-to-many relationships.",
        timestamp: "07:16 pm"
      },
      {
        id: 5,
        sender: "learner",
        text: "Excellent! That helps me design my schema better. Thank you!",
        timestamp: "07:17 pm"
      }
    ]
  },
  {
    id: 10,
    learnerName: "James Anderson",
    learnerId: "L-010",
    learnerAvatar: "/Asset/Thomas.jpg",
    course: "Python Crash Course",
    topics: ["Functions", "Arguments", "Scope"],
    timestamp: "2025-11-25  10:00pm",
    sentiment: "Negative",
    messages: [
      {
        id: 1,
        sender: "learner",
        text: "Why is my function not updating the variable I pass to it?",
        timestamp: "10:00 pm"
      },
      {
        id: 2,
        sender: "chatbot",
        text: "Python passes immutable objects (like integers, strings, tuples) by value. Changes inside the function don't affect the original variable. For mutable objects like lists, changes do affect the original.",
        timestamp: "10:01 pm"
      },
      {
        id: 3,
        sender: "learner",
        text: "So how do I return the updated value?",
        timestamp: "10:02 pm"
      },
      {
        id: 4,
        sender: "chatbot",
        text: "Use the return statement to send back the new value, then assign it: result = my_function(value). Or pass mutable objects like lists if you need to modify in place.",
        timestamp: "10:02 pm"
      },
      {
        id: 5,
        sender: "learner",
        text: "I still don't get it. Why doesn't Python just update the variable?",
        timestamp: "10:03 pm"
      }
    ]
  },
  {
    id: 11,
    learnerName: "Sarah Johnson",
    learnerId: "L-001",
    learnerAvatar: "/Asset/Emily.jpg",
    course: "Advanced React Patterns",
    topics: ["Performance", "useMemo", "Optimization"],
    timestamp: "2025-11-25  08:45pm",
    sentiment: "Positive",
    messages: [
      {
        id: 1,
        sender: "learner",
        text: "My React app is re-rendering too much. When should I use useMemo?",
        timestamp: "08:45 pm"
      },
      {
        id: 2,
        sender: "chatbot",
        text: "Use useMemo when you have expensive calculations that shouldn't run on every render. It memoizes the result and only recalculates when dependencies change.",
        timestamp: "08:46 pm"
      },
      {
        id: 3,
        sender: "learner",
        text: "How is it different from useCallback?",
        timestamp: "08:47 pm"
      },
      {
        id: 4,
        sender: "chatbot",
        text: "useMemo memoizes a calculated value, useCallback memoizes a function. Use useCallback when passing functions as props to prevent child re-renders, useMemo for expensive computations.",
        timestamp: "08:47 pm"
      },
      {
        id: 5,
        sender: "learner",
        text: "Perfect! That's exactly what I needed to know. Thank you!",
        timestamp: "08:48 pm"
      }
    ]
  },
  {
    id: 12,
    learnerName: "Alex Chen",
    learnerId: "L-002",
    learnerAvatar: "/Asset/Michael.jpg",
    course: "Go Language",
    topics: ["Goroutines", "Channels", "Concurrency"],
    timestamp: "2025-11-25  07:20pm",
    sentiment: "Positive",
    messages: [
      {
        id: 1,
        sender: "learner",
        text: "How do I safely communicate between goroutines?",
        timestamp: "07:20 pm"
      },
      {
        id: 2,
        sender: "chatbot",
        text: "Use channels! Channels are Go's way of safely passing data between goroutines. Create a channel with make(chan Type) and use <- operator to send/receive.",
        timestamp: "07:20 pm"
      },
      {
        id: 3,
        sender: "learner",
        text: "Should I use buffered or unbuffered channels?",
        timestamp: "07:21 pm"
      },
      {
        id: 4,
        sender: "chatbot",
        text: "Unbuffered channels block until both sender and receiver are ready (good for synchronization). Buffered channels allow sending without blocking until full (good for async work queues).",
        timestamp: "07:21 pm"
      },
      {
        id: 5,
        sender: "learner",
        text: "Great explanation! That makes channels much clearer now.",
        timestamp: "07:22 pm"
      }
    ]
  },
  {
    id: 13,
    learnerName: "Maria Garcia",
    learnerId: "L-003",
    learnerAvatar: "/Asset/Sophia.jpg",
    course: "UI/UX Fundamentals",
    topics: ["Design", "Color Theory", "Accessibility"],
    timestamp: "2025-11-24  09:30pm",
    sentiment: "Positive",
    messages: [
      {
        id: 1,
        sender: "learner",
        text: "How do I choose colors that are accessible for colorblind users?",
        timestamp: "09:30 pm"
      },
      {
        id: 2,
        sender: "chatbot",
        text: "Great question! Don't rely on color alone to convey information. Use text labels, icons, or patterns. Aim for WCAG contrast ratios (4.5:1 for text) and test with colorblind simulators.",
        timestamp: "09:30 pm"
      },
      {
        id: 3,
        sender: "learner",
        text: "Are there specific color combinations I should avoid?",
        timestamp: "09:31 pm"
      },
      {
        id: 4,
        sender: "chatbot",
        text: "Avoid red-green combinations for critical info (most common colorblindness). Also avoid low contrast like light gray on white. Use tools like Stark or Color Oracle to test your designs!",
        timestamp: "09:31 pm"
      },
      {
        id: 5,
        sender: "learner",
        text: "Thank you! I'll use those tools for my design project.",
        timestamp: "09:32 pm"
      }
    ]
  },
  {
    id: 14,
    learnerName: "David Miller",
    learnerId: "L-004",
    learnerAvatar: "/Asset/James.jpg",
    course: "Machine Learning with Python",
    topics: ["Neural Networks", "Training", "Overfitting"],
    timestamp: "2025-11-24  08:15pm",
    sentiment: "Negative",
    messages: [
      {
        id: 1,
        sender: "learner",
        text: "My neural network has 99% training accuracy but only 60% validation accuracy. What's wrong?",
        timestamp: "08:15 pm"
      },
      {
        id: 2,
        sender: "chatbot",
        text: "That's a clear case of overfitting! Your model memorized the training data instead of learning patterns. Try adding dropout layers, reducing model complexity, or getting more training data.",
        timestamp: "08:16 pm"
      },
      {
        id: 3,
        sender: "learner",
        text: "I added dropout but it's still overfitting. What else can I do?",
        timestamp: "08:17 pm"
      },
      {
        id: 4,
        sender: "chatbot",
        text: "Try data augmentation to artificially increase your dataset, use L2 regularization, or implement early stopping. Also reduce the number of layers or neurons in your network.",
        timestamp: "08:17 pm"
      },
      {
        id: 5,
        sender: "learner",
        text: "I've tried all that and nothing works. This is too complicated.",
        timestamp: "08:18 pm"
      }
    ]
  },
  {
    id: 15,
    learnerName: "Emma Wilson",
    learnerId: "L-005",
    learnerAvatar: "/Asset/Ava.jpg",
    course: "Manual and Automated Testing",
    topics: ["Test Cases", "Bug Reports", "Documentation"],
    timestamp: "2025-11-24  06:50pm",
    sentiment: "Positive",
    messages: [
      {
        id: 1,
        sender: "learner",
        text: "What should I include in a good bug report?",
        timestamp: "06:50 pm"
      },
      {
        id: 2,
        sender: "chatbot",
        text: "A good bug report needs: clear title, steps to reproduce, expected vs actual results, environment details (browser, OS), severity/priority, and screenshots if relevant.",
        timestamp: "06:50 pm"
      },
      {
        id: 3,
        sender: "learner",
        text: "How detailed should the steps to reproduce be?",
        timestamp: "06:51 pm"
      },
      {
        id: 4,
        sender: "chatbot",
        text: "Detailed enough that someone unfamiliar with the feature can reproduce it! Include all clicks, inputs, and preconditions. Think of it as a recipe - every step matters.",
        timestamp: "06:51 pm"
      },
      {
        id: 5,
        sender: "learner",
        text: "Perfect! That helps me write better bug reports. Thanks!",
        timestamp: "06:52 pm"
      }
    ]
  },
  {
    id: 16,
    learnerName: "Sophia Lee",
    learnerId: "L-007",
    learnerAvatar: "/Asset/Grace.jpg",
    course: "TypeScript Complete Guide",
    topics: ["Generics", "Types", "Functions"],
    timestamp: "2025-11-23  09:00pm",
    sentiment: "Positive",
    messages: [
      {
        id: 1,
        sender: "learner",
        text: "What are generics and when should I use them?",
        timestamp: "09:00 pm"
      },
      {
        id: 2,
        sender: "chatbot",
        text: "Generics let you write reusable code that works with multiple types while maintaining type safety. Use them when you want the same logic for different types, like a generic array filter or API wrapper.",
        timestamp: "09:00 pm"
      },
      {
        id: 3,
        sender: "learner",
        text: "Can you show me a simple example?",
        timestamp: "09:01 pm"
      },
      {
        id: 4,
        sender: "chatbot",
        text: "Sure! function identity<T>(value: T): T { return value; } - This works with any type and returns the same type. Call it like identity<string>('hello') or let TypeScript infer the type.",
        timestamp: "09:01 pm"
      },
      {
        id: 5,
        sender: "learner",
        text: "That's so clear! Generics make sense now. Thank you!",
        timestamp: "09:02 pm"
      }
    ]
  },
  {
    id: 17,
    learnerName: "Mohammed Hassan",
    learnerId: "L-008",
    learnerAvatar: "/Asset/Joseph.jpg",
    course: "Rust Programming",
    topics: ["Ownership", "Borrowing", "Lifetimes"],
    timestamp: "2025-11-23  07:40pm",
    sentiment: "Negative",
    messages: [
      {
        id: 1,
        sender: "learner",
        text: "I keep getting borrow checker errors. What am I doing wrong?",
        timestamp: "07:40 pm"
      },
      {
        id: 2,
        sender: "chatbot",
        text: "Rust's ownership rules are strict! You can't have mutable and immutable references at the same time, and references must always be valid. Can you share the specific error?",
        timestamp: "07:41 pm"
      },
      {
        id: 3,
        sender: "learner",
        text: "It says 'cannot borrow as mutable because it is also borrowed as immutable'.",
        timestamp: "07:42 pm"
      },
      {
        id: 4,
        sender: "chatbot",
        text: "You're trying to modify data while an immutable reference exists. Make sure all immutable borrows finish before creating a mutable borrow, or restructure your code to avoid overlapping borrows.",
        timestamp: "07:42 pm"
      },
      {
        id: 5,
        sender: "learner",
        text: "I tried that and now I get lifetime errors. Rust is too hard!",
        timestamp: "07:43 pm"
      }
    ]
  },
  {
    id: 18,
    learnerName: "Isabella Martinez",
    learnerId: "L-009",
    learnerAvatar: "/Asset/Olivia.jpg",
    course: "PostgreSQL Mastery",
    topics: ["Indexes", "Performance", "Query Optimization"],
    timestamp: "2025-11-23  06:25pm",
    sentiment: "Positive",
    messages: [
      {
        id: 1,
        sender: "learner",
        text: "My queries are slow on large tables. When should I add indexes?",
        timestamp: "06:25 pm"
      },
      {
        id: 2,
        sender: "chatbot",
        text: "Add indexes on columns used in WHERE clauses, JOIN conditions, and ORDER BY. But don't over-index - each index slows down INSERT/UPDATE operations!",
        timestamp: "06:25 pm"
      },
      {
        id: 3,
        sender: "learner",
        text: "Should I use B-tree or hash indexes?",
        timestamp: "06:26 pm"
      },
      {
        id: 4,
        sender: "chatbot",
        text: "B-tree (default) works for most cases including ranges and sorting. Hash indexes only for equality (=) comparisons. For text search, use GIN or GiST indexes instead.",
        timestamp: "06:26 pm"
      },
      {
        id: 5,
        sender: "learner",
        text: "Excellent advice! I'll add B-tree indexes on my foreign keys. Thanks!",
        timestamp: "06:27 pm"
      }
    ]
  },
  {
    id: 19,
    learnerName: "James Anderson",
    learnerId: "L-010",
    learnerAvatar: "/Asset/Thomas.jpg",
    course: "Intro to Database",
    topics: ["SQL", "Joins", "Relationships"],
    timestamp: "2025-11-22  08:50pm",
    sentiment: "Negative",
    messages: [
      {
        id: 1,
        sender: "learner",
        text: "I don't understand the difference between INNER JOIN and LEFT JOIN.",
        timestamp: "08:50 pm"
      },
      {
        id: 2,
        sender: "chatbot",
        text: "INNER JOIN returns only rows where there's a match in both tables. LEFT JOIN returns all rows from the left table, plus matched rows from the right (NULL if no match).",
        timestamp: "08:51 pm"
      },
      {
        id: 3,
        sender: "learner",
        text: "But when do I use each one in real projects?",
        timestamp: "08:52 pm"
      },
      {
        id: 4,
        sender: "chatbot",
        text: "Use INNER JOIN when you only want data that exists in both tables (like getting orders WITH customer info). Use LEFT JOIN when you want all records from one table even if there's no match (like all customers even those with no orders).",
        timestamp: "08:52 pm"
      },
      {
        id: 5,
        sender: "learner",
        text: "I still don't get it. Can you just tell me which one to use?",
        timestamp: "08:53 pm"
      }
    ]
  },
  {
    id: 20,
    learnerName: "Liam O'Brien",
    learnerId: "L-006",
    learnerAvatar: "/Asset/William.jpg",
    course: "Database Design",
    topics: ["Normalization", "Schema Design", "Performance"],
    timestamp: "2025-11-22  07:30pm",
    sentiment: "Positive",
    messages: [
      {
        id: 1,
        sender: "learner",
        text: "Should I always normalize my database to 3NF?",
        timestamp: "07:30 pm"
      },
      {
        id: 2,
        sender: "chatbot",
        text: "Not always! 3NF eliminates redundancy, but sometimes controlled denormalization improves read performance. It depends on your read/write patterns and query performance needs.",
        timestamp: "07:30 pm"
      },
      {
        id: 3,
        sender: "learner",
        text: "When would denormalization be better?",
        timestamp: "07:31 pm"
      },
      {
        id: 4,
        sender: "chatbot",
        text: "When you have heavy read loads and complex joins slow down queries. For example, storing calculated totals or frequently accessed joined data. But be careful - you'll need to keep denormalized data in sync!",
        timestamp: "07:31 pm"
      },
      {
        id: 5,
        sender: "learner",
        text: "Makes sense! I'll normalize first, then denormalize if needed. Thanks!",
        timestamp: "07:32 pm"
      }
    ]
  }
];

export const chatbotStats = {
  totalConversations: 156,
  flaggedIssues: 12,
  averageSatisfaction: "4.2/5",
  averageResponseTime: "10 min"
};
