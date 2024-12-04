import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  questionType: {
    type: String,
    enum: ['text', 'image'],
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String, // Only required if questionType is 'image'
  },
  options: [{
    text: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String, // Only required for image-based options
    },
    isCorrect: {
      type: Boolean,
      required: true,
    }
  }],
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true,
  },
  category: {
    type: String,
    enum: ['UI/UX', 'Frontend', 'Design Theory', 'Tools', 'General'],
    required: true,
  }
}, { timestamps: true });

export const Question = mongoose.model('Question', questionSchema);

// Seed data function
export const seedQuestions = async () => {
  const questions = [
    {
      questionType: 'text',
      text: 'What is the primary purpose of white space in UI design?',
      options: [
        { text: 'To reduce development costs', isCorrect: false },
        { text: 'To improve visual hierarchy and readability', isCorrect: true },
        { text: 'To increase the number of elements on screen', isCorrect: false },
        { text: 'To make the interface more colorful', isCorrect: false }
      ],
      difficulty: 'easy',
      category: 'UI/UX'
    },
    {
      questionType: 'text',
      text: 'Which color model should be used for digital design work?',
      options: [
        { text: 'CMYK', isCorrect: false },
        { text: 'RGB', isCorrect: true },
        { text: 'PMS', isCorrect: false },
        { text: 'HSL only', isCorrect: false }
      ],
      difficulty: 'easy',
      category: 'Design Theory'
    },
    {
      questionType: 'image',
      text: 'Which UI pattern is demonstrated in this image?',
      imageUrl: 'https://res.cloudinary.com/djuwzdbwy/image/upload/v1733340478/hbdvu7wbifvxvoz4u56o.png',
      options: [
        { text: 'Card Layout', isCorrect: true },
        { text: 'List View', isCorrect: false },
        { text: 'Grid System', isCorrect: false },
        { text: 'Navigation Bar', isCorrect: false }
      ],
      difficulty: 'medium',
      category: 'UI/UX'
    },
    {
      questionType: 'text',
      text: 'What is the purpose of a design system?',
      options: [
        { text: 'To create standalone applications', isCorrect: false },
        { text: 'To maintain consistency and efficiency across products', isCorrect: true },
        { text: 'To replace developers', isCorrect: false },
        { text: 'To make websites load faster', isCorrect: false }
      ],
      difficulty: 'medium',
      category: 'Design Theory'
    },
    {
      questionType: 'text',
      text: 'Which principle states that related elements should be grouped together?',
      options: [
        { text: 'Contrast', isCorrect: false },
        { text: 'Proximity', isCorrect: true },
        { text: 'Alignment', isCorrect: false },
        { text: 'Repetition', isCorrect: false }
      ],
      difficulty: 'medium',
      category: 'Design Theory'
    },
    // Adding more questions...
    {
      questionType: 'text',
      text: 'What is the recommended maximum number of primary navigation items?',
      options: [
        { text: '3-5 items', isCorrect: false },
        { text: '5-7 items', isCorrect: true },
        { text: '8-10 items', isCorrect: false },
        { text: '10-12 items', isCorrect: false }
      ],
      difficulty: 'easy',
      category: 'UI/UX'
    },
    {
      questionType: 'image',
      text: 'Which accessibility principle is violated in this design?',
      imageUrl: 'https://res.cloudinary.com/djuwzdbwy/image/upload/v1733340478/hbdvu7wbifvxvoz4u56o.png',
      options: [
        { text: 'Color contrast', isCorrect: true },
        { text: 'Font size', isCorrect: false },
        { text: 'Input labels', isCorrect: false },
        { text: 'Button spacing', isCorrect: false }
      ],
      difficulty: 'hard',
      category: 'UI/UX'
    },
    {
        questionType: 'text',
        text: 'Which layout pattern is most suitable for displaying a large collection of similar items?',
        options: [
          { text: 'Hero Section', isCorrect: false },
          { text: 'Grid Layout', isCorrect: true },
          { text: 'Carousel', isCorrect: false },
          { text: 'Modal Dialog', isCorrect: false }
        ],
        difficulty: 'medium',
        category: 'UI/UX'
      },
      {
        questionType: 'text',
        text: 'What is the purpose of a mood board in design?',
        options: [
          { text: 'To showcase final designs', isCorrect: false },
          { text: 'To collect visual inspiration and establish design direction', isCorrect: true },
          { text: 'To create wireframes', isCorrect: false },
          { text: 'To test user interfaces', isCorrect: false }
        ],
        difficulty: 'easy',
        category: 'Design Theory'
      },
      {
        questionType: 'text',
        text: 'Which tool is primarily used for vector graphics design?',
        options: [
          { text: 'Adobe Photoshop', isCorrect: false },
          { text: 'Adobe Illustrator', isCorrect: true },
          { text: 'Microsoft Paint', isCorrect: false },
          { text: 'Adobe Premiere', isCorrect: false }
        ],
        difficulty: 'easy',
        category: 'Tools'
      },
      {
        questionType: 'image',
        text: 'What type of chart is most appropriate for this data visualization?',
        imageUrl: 'https://res.cloudinary.com/djuwzdbwy/image/upload/v1733340478/hbdvu7wbifvxvoz4u56o.png',
        options: [
          { text: 'Bar Chart', isCorrect: false },
          { text: 'Line Chart', isCorrect: true },
          { text: 'Pie Chart', isCorrect: false },
          { text: 'Scatter Plot', isCorrect: false }
        ],
        difficulty: 'medium',
        category: 'UI/UX'
      },
      {
        questionType: 'text',
        text: 'What is the purpose of a style guide in web design?',
        options: [
          { text: 'To list all website content', isCorrect: false },
          { text: 'To document design rules and standards', isCorrect: true },
          { text: 'To plan website navigation', isCorrect: false },
          { text: 'To track project timelines', isCorrect: false }
        ],
        difficulty: 'medium',
        category: 'Design Theory'
      },
      {
        questionType: 'text',
        text: 'Which CSS property is used to create responsive designs?',
        options: [
          { text: 'color', isCorrect: false },
          { text: 'media queries', isCorrect: true },
          { text: 'font-family', isCorrect: false },
          { text: 'position', isCorrect: false }
        ],
        difficulty: 'medium',
        category: 'Frontend'
      },
      {
        questionType: 'text',
        text: 'What is the role of typography in UI design?',
        options: [
          { text: 'Only for decoration', isCorrect: false },
          { text: 'To establish hierarchy and improve readability', isCorrect: true },
          { text: 'To fill empty space', isCorrect: false },
          { text: 'To use all available fonts', isCorrect: false }
        ],
        difficulty: 'easy',
        category: 'Design Theory'
      },
      {
        questionType: 'image',
        text: 'Which design principle is best illustrated in this layout?',
        imageUrl: 'https://res.cloudinary.com/djuwzdbwy/image/upload/v1733340478/hbdvu7wbifvxvoz4u56o.png',
        options: [
          { text: 'Balance', isCorrect: true },
          { text: 'Movement', isCorrect: false },
          { text: 'Pattern', isCorrect: false },
          { text: 'Unity', isCorrect: false }
        ],
        difficulty: 'hard',
        category: 'Design Theory'
      }
    // ... (I'll continue with the remaining questions in the next part due to length)
  ];

  try {
    // First check if questions already exist
    const count = await Question.countDocuments();
    if (count > 0) {
      console.log('Questions already exist. Skipping seed.');
      return;
    }

    const insertedQuestions = await Question.insertMany(questions);
    console.log(`Successfully seeded ${insertedQuestions.length} questions`);
  } catch (error) {
    console.error('Error seeding questions:', error);
    throw error; // Propagate error for handling by caller
  }
};

// Add a function to force reseed (useful for development)
export const forceReseedQuestions = async () => {
  try {
    await Question.deleteMany({});
    return seedQuestions();
  } catch (error) {
    console.error('Error force reseeding questions:', error);
    throw error;
  }
};

// Add a utility function to check if seeding is needed
export const checkAndSeedQuestions = async () => {
  try {
    const count = await Question.countDocuments();
    if (count === 0) {
      console.log('No questions found. Starting seed process...');
      await seedQuestions();
    } else {
      console.log(`Found ${count} existing questions`);
    }
  } catch (error) {
    console.error('Error checking/seeding questions:', error);
    throw error;
  }
};