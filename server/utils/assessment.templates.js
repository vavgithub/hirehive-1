export const assessmentTemplates = [
    {
        title : 'Mid-Level UI/UX Designer',
        questions : [
            {
              questionType: 'text',
              text: 'Which of these fonts is considered most suitable for digital interfaces?',
              options: [
                { text: 'Times New Roman', isCorrect: false },
                { text: 'Roboto', isCorrect: true },
                { text: 'Comic Sans', isCorrect: false },
                { text: 'Courier New', isCorrect: false }
              ],
              difficulty: 'easy',
            },
            {
              questionType: 'image',
              text: 'What differences can you identify between the design and the developed version shown?',
              imageUrl: 'https://res.cloudinary.com/djuwzdbwy/image/upload/v1734512546/173dd585-4620-4622-a77d-59e3899a7a8a.png',
              options: [
                { text: 'Color Inconsistencies', isCorrect: false },
                { text: 'Misaligned elements', isCorrect: false },
                { text: 'Font inconsistencies', isCorrect: false },
                { text: 'All of the above', isCorrect: true }
              ],
              difficulty: 'easy',
            },
            {
              questionType: 'image',
              text: 'Are the two displayed colors different ?',
              imageUrl: 'https://res.cloudinary.com/djuwzdbwy/image/upload/v1734512460/da79ac8a-6216-4ae0-a846-ddb7791e7e40.png',
              options: [
                { text: 'Yes, they have different RGB values', isCorrect: true },
                { text: 'No, they are the same', isCorrect: false },
                { text: 'The difference is only in contrast', isCorrect: false },
                { text: 'Only a colorblind test can confirm', isCorrect: false }
              ],
              difficulty: 'easy',
            },
            {
              questionType: 'text',
              text: 'Which of the following is a serif font?',
              options: [
                { text: 'Arial', isCorrect: false },
                { text: 'Times New Roman', isCorrect: true },
                { text: 'Helvetica', isCorrect: false },
                { text: 'Verdana', isCorrect: false }
              ],
              difficulty: 'easy',
            },
            {
              questionType: 'image',
              text: 'What UI issue you can see on this card design for intuitive interfaces?',
              imageUrl: 'https://res.cloudinary.com/djuwzdbwy/image/upload/v1734513853/064adff3-6a43-4d6e-acac-96d6c71287d1.png',
              options: [
                { text: 'Overloaded with text', isCorrect: false },
                { text: 'Uneven alignment', isCorrect: false },
                { text: 'No color contrast', isCorrect: false },
                { text: 'All of the above', isCorrect: true }
              ],
              difficulty: 'easy',
            },
            {
              questionType: 'text',
              text: 'What icon sets feels more cohesive?',
              options: [
                { text: 'Icons with consistent stroke width', isCorrect: true },
                { text: 'Icons with mixed style and thickness', isCorrect: false },
                { text: 'Icons of varying dimensions and resolutions', isCorrect: false },
                { text: 'Icons using random color schemes', isCorrect: false }
              ],
              difficulty: 'easy',
            },
            {
              questionType: 'text',
              text: 'Which illustration style is more visually appealing for a professional interface?',
              options: [
                { text: 'Even stroke width throughput', isCorrect: true },
                { text: 'Uneven stroke width', isCorrect: false },
                { text: 'Highly detailed illustrations', isCorrect: false },
                { text: 'Overly simplified illustrations', isCorrect: false }
              ],
              difficulty: 'easy',
            },
            {
              "questionType": "text",
              "text": "What is the minimum tappable button height recommended for mobile devices?",
              "options": [
                { "text": "32px", "isCorrect": false },
                { "text": "44px", "isCorrect": true },
                { "text": "50px", "isCorrect": false },
                { "text": "60px", "isCorrect": false }
              ],
              "difficulty": "easy",
            },
            {
              "questionType": "text",
              "text": "Which of these tools or features is most crucial for UI/UX design?",
              "options": [
                { "text": "Color Picker Tool", "isCorrect": false },
                { "text": "Prototype Preview", "isCorrect": false },
                { "text": "Typography Scaling Tool", "isCorrect": false },
                { "text": "All of the above", "isCorrect": true }
              ],
              "difficulty": "easy",
            },
            {
              "questionType": "text",
              "text": "Which of these principles should guide daily design decisions?",
              "options": [
                { "text": "Visual Hierarchy", "isCorrect": false },
                { "text": "Consistency", "isCorrect": false },
                { "text": "Accessibility", "isCorrect": false },
                { "text": "All of the above", "isCorrect": true }
              ],
              "difficulty": "easy",
            },
            {
              "questionType": "text",
              "text": "What is a key step in creating a design system?",
              "options": [
                { "text": "Defining color and typography guidelines", "isCorrect": true },
                { "text": "Ignoring developer inputs", "isCorrect": false },
                { "text": "Using random UI components", "isCorrect": false },
                { "text": "Avoiding documentation", "isCorrect": false }
              ],
              "difficulty": "easy",
            },
            {
              "questionType": "text",
              "text": "What is the key difference between UI and UX?",
              "options": [
                { "text": "UX focuses on visuals, UI focuses on user experience", "isCorrect": false },
                { "text": "UI is about interaction design, UX is about aesthetics", "isCorrect": false },
                { "text": "UI deals with visual design, UX focuses on the overall experience", "isCorrect": true },
                { "text": "Both are the same", "isCorrect": false }
              ],
              "difficulty": "easy",
            },
            {
              "questionType": "text",
              "text": "What is the primary benefit of a clickable prototype?",
              "options": [
                { "text": "It reduces development cost", "isCorrect": false },
                { "text": "It helps visualize branding", "isCorrect": false },
                { "text": "It allows users to test interactions", "isCorrect": true },
                { "text": "It creates production-ready code", "isCorrect": false }
              ],
              "difficulty": "easy",
            },
            {
              "questionType": "text",
              "text": "Why is whitespace important in design?",
              "options": [
                { "text": "To reduce load time", "isCorrect": false },
                { "text": "To make the design look incomplete", "isCorrect": false },
                { "text": "To create balance and focus", "isCorrect": true },
                { "text": "To avoid adding content", "isCorrect": false }
              ],
              "difficulty": "easy",
            },
            {
              "questionType": "text",
              "text": "Which of these is an example of a primary navigation system?",
              "options": [
                { "text": "Breadcrumbs", "isCorrect": false },
                { "text": "Hamburger Menu", "isCorrect": true },
                { "text": "Footer links", "isCorrect": false },
                { "text": "Pagination", "isCorrect": false }
              ],
              "difficulty": "easy",
            },
            {
              "questionType": "text",
              "text": "What is the key difference between UI and UX?",
              "options": [
                { "text": "UX focuses on visuals, UI focuses on user experience", "isCorrect": false },
                { "text": "UI is about interaction design, UX is about aesthetics", "isCorrect": false },
                { "text": "UI deals with visual design, UX focuses on the overall experience", "isCorrect": true },
                { "text": "Both are the same", "isCorrect": false }
              ],
              "difficulty": "easy",
            },
            {
              "questionType": "text",
              "text": "Which alignment improves readability?",
              "options": [
                { "text": "Center-aligned", "isCorrect": false },
                { "text": "Left-aligned", "isCorrect": true },
                { "text": "Right-aligned", "isCorrect": false },
                { "text": "Justified", "isCorrect": false }
              ],
              "difficulty": "medium",
            },
            {
              "questionType": "text",
              "text": "When designing for accessibility, how do you test contrast ratios for text? What tools or guidelines do you rely on?",
              "options": [
                { "text": "Use random color contrast combinations", "isCorrect": false },
                { "text": "Manually check colors visually", "isCorrect": false },
                { "text": "Use tools like WCAG Contrast Checker or Stark plugin", "isCorrect": true },
                { "text": "Ignore contrast guidelines", "isCorrect": false }
              ],
              "difficulty": "medium",
            },
            {
              "questionType": "text",
              "text": "How do you decide between using a serif or sans-serif font for body text in a digital product?",
              "options": [
                { "text": "Choose serif fonts for all digital products", "isCorrect": false },
                { "text": "Choose sans-serif fonts for print products", "isCorrect": false },
                { "text": "Sans-serif fonts are generally better for screens; serif is ideal for long-form print", "isCorrect": true },
                { "text": "Always use sans-serif fonts regardless of the medium", "isCorrect": false }
              ],
              "difficulty": "medium",
            },
            {
              "questionType": "text",
              "text": "If you had to design a data-heavy dashboard, what strategies would you use to keep it visually appealing and easy to scan?",
              "options": [
                { "text": "Overload with data without grouping", "isCorrect": false },
                { "text": "Use clear visual hierarchy, charts, and proper spacing", "isCorrect": true },
                { "text": "Avoid labels to make the design clean", "isCorrect": false },
                { "text": "Use only text-based data", "isCorrect": false }
              ],
              "difficulty": "medium",
            },
            {
              "questionType": "text",
              "text": "When setting up a color hierarchy, which color choice would you typically assign to a primary CTA button?",
              "options": [
                { "text": "Background color", "isCorrect": false },
                { "text": "Brand’s accent color", "isCorrect": true },
                { "text": "Gray scale color", "isCorrect": false },
                { "text": "Desaturated secondary color", "isCorrect": false }
              ],
              "difficulty": "medium",
            },
            {
              "questionType": "text",
              "text": "When designing for large screens, which grid structure is generally recommended for creating flexibility in responsive layouts?",
              "options": [
                { "text": "Four-column grid", "isCorrect": false },
                { "text": "Twelve-column grid", "isCorrect": true },
                { "text": "Two-column grid", "isCorrect": false },
                { "text": "Five-column grid", "isCorrect": false }
              ],
              "difficulty": "medium",
            },
            {
              "questionType": "text",
              "text": "Which of the following is not typically included in a design system?",
              "options": [
                { "text": "Typography guidelines", "isCorrect": false },
                { "text": "Color palettes", "isCorrect": false },
                { "text": "Database schema", "isCorrect": true },
                { "text": "Component libraries", "isCorrect": false }
              ],
              "difficulty": "medium",
            },
            {
              "questionType": "text",
              "text": "If you're tasked with designing an application that caters to multiple user types, how do you initiate the project?",
              "options": [
                { "text": "Ignore user research and assume requirements", "isCorrect": false },
                { "text": "Design for one type of user only", "isCorrect": false },
                { "text": "Conduct user research, identify personas, and map user journeys", "isCorrect": true },
                { "text": "Create a design without considering multiple user needs", "isCorrect": false }
              ],
              "difficulty": "medium",
            },
            {
              "questionType": "text",
              "text": "Which is NOT a UX research method?",
              "options": [
                { "text": "Usability Testing", "isCorrect": false },
                { "text": "Contextual Inquiry", "isCorrect": false },
                { "text": "Heatmaps", "isCorrect": false },
                { "text": "Animation Prototyping", "isCorrect": true }
              ],
              "difficulty": "medium",
            },
            {
              "questionType": "text",
              "text": "Which of these best defines accessibility in design?",
              "options": [
                { "text": "Designs optimized for speed", "isCorrect": false },
                { "text": "Ensuring designs are inclusive for all users, including those with disabilities", "isCorrect": true },
                { "text": "Minimalistic design principles", "isCorrect": false },
                { "text": "High-contrast color schemes only", "isCorrect": false }
              ],
              "difficulty": "medium",
            },       
            {
              questionType: 'image',
              text: 'Can you identify and explain the UX issue in this design?',
              imageUrl: 'https://res.cloudinary.com/djuwzdbwy/image/upload/v1734515506/71c11fe2-6967-4762-9c1c-4f2302866000.png',
              options: [
                { text: 'Overuse of color increases engagement', isCorrect: false },
                { text: 'Lack of visual hierarchy and poor differentiation of interactive elements ', isCorrect: true },
                { text: 'CTA elements are not large enough', isCorrect: false },
                { text: 'The text size is too small', isCorrect: false }
              ],
              difficulty: 'hard',
            },{
              questionType: 'image',
              text: 'What would you adjust to make it more readable? ',
              imageUrl: 'https://res.cloudinary.com/djuwzdbwy/image/upload/v1734515738/b2034c6e-131f-4332-aa79-a3d8f59ce19f.png',
              options: [
                { text: 'Increase background contrast', isCorrect: false },
                { text: 'Use a contrasting font color', isCorrect: true },
                { text: 'Decrease text size', isCorrect: false },
                { text: 'Add more decorative fonts', isCorrect: false }
              ],
              difficulty: 'hard',
            },
            {
              "questionType": "text",
              "text": "What are the best practices for creating responsive designs, and how do you ensure that your designs work seamlessly across devices?",
              "options": [
                { "text": "Design for desktop first, then scale up", "isCorrect": false },
                { "text": "Ignore breakpoints and design for one resolution", "isCorrect": false },
                { "text": "Use fluid grids, scalable units, and test designs on multiple devices", "isCorrect": true },
                { "text": "Rely on fixed pixel dimensions for consistency", "isCorrect": false }
              ],
              "difficulty": "hard",
            },
            {
              "questionType": "text",
              "text": "Explain how you would implement a dark mode in your design system. What considerations would you take into account regarding color contrast and user experience?",
              "options": [
                { "text": "Use the same colors as light mode for simplicity", "isCorrect": false },
                { "text": "Optimize contrast for readability, avoid pure black, and test accessibility for all elements", "isCorrect": true },
                { "text": "Ignore accessibility and focus on aesthetics", "isCorrect": false },
                { "text": "Make all elements grayscale", "isCorrect": false }
              ],
              "difficulty": "hard",
            },
            {
              "questionType": "text",
              "text": "Can you explain the importance of grid systems in UI design? How do you implement them in your projects?",
              "options": [
                { "text": "Grid systems limit creativity in design", "isCorrect": false },
                { "text": "Grids provide structure, alignment, and consistency in layouts", "isCorrect": true },
                { "text": "Grids are only important for print design", "isCorrect": false },
                { "text": "Avoid using grids for unique layouts", "isCorrect": false }
              ],
              "difficulty": "hard",
            },
            {
              "questionType": "text",
              "text": "What is the recommended method for handling states in a button component?",
              "options": [
                { "text": "Creating separate components for each state", "isCorrect": false },
                { "text": "Using variants within a single component", "isCorrect": true },
                { "text": "Overwriting the existing button style", "isCorrect": false },
                { "text": "Using fixed pixel sizes for states", "isCorrect": false }
              ],
              "difficulty": "hard",
            },
            {
              "questionType": "text",
              "text": "In Figma, what feature allows you to create variations of a component while maintaining a single source of truth?",
              "options": [
                { "text": "Grouping", "isCorrect": false },
                { "text": "Variants", "isCorrect": true },
                { "text": "Masks", "isCorrect": false },
                { "text": "Frames", "isCorrect": false }
              ],
              "difficulty": "hard",
            },
            {
              "questionType": "text",
              "text": "How can you effectively communicate a brand's personality through UI design?",
              "options": [
                { "text": "Use random design elements for variety", "isCorrect": false },
                { "text": "Utilize consistent typography, color palette, and visual style aligned with brand identity", "isCorrect": true },
                { "text": "Avoid brand guidelines to explore creative freedom", "isCorrect": false },
                { "text": "Focus only on functionality, ignoring visuals", "isCorrect": false }
              ],
              "difficulty": "hard",
            },
            {
              "questionType": "text",
              "text": "Which principle emphasizes reducing user effort in design?",
              "options": [
                { "text": "Cognitive Load", "isCorrect": true },
                { "text": "Affordance", "isCorrect": false },
                { "text": "Fitt’s Law", "isCorrect": false },
                { "text": "Hick’s Law", "isCorrect": false }
              ],
              "difficulty": "hard",
            },
            {
              "questionType": "text",
              "text": "What is the first step in the design thinking process?",
              "options": [
                { "text": "Ideate", "isCorrect": false },
                { "text": "Prototype", "isCorrect": false },
                { "text": "Define", "isCorrect": false },
                { "text": "Empathize", "isCorrect": true }
              ],
              "difficulty": "hard",
            },
            {
              "questionType": "text",
              "text": "Which of the following is primarily used for high-fidelity prototyping?",
              "options": [
                { "text": "Sketch", "isCorrect": false },
                { "text": "Axure RP", "isCorrect": true },
                { "text": "Microsoft Paint", "isCorrect": false },
                { "text": "Notion", "isCorrect": false }
              ],
              "difficulty": "hard",
            },
            {
              "questionType": "text",
              "text": "What is the purpose of a style guide?",
              "options": [
                { "text": "To define the marketing strategy", "isCorrect": false },
                { "text": "To ensure design consistency", "isCorrect": true },
                { "text": "To create prototypes", "isCorrect": false },
                { "text": "To analyze competitors", "isCorrect": false }
              ],
              "difficulty": "hard",
            },
            {
              "questionType": "text",
              "text": "What is A/B testing used for?",
              "options": [
                { "text": "Comparing two designs for effectiveness", "isCorrect": true },
                { "text": "Benchmarking user performance", "isCorrect": false },
                { "text": "Developing wireframes", "isCorrect": false },
                { "text": "Conducting heuristic evaluation", "isCorrect": false }
              ],
              "difficulty": "hard",
            },
            {
              "questionType": "text",
              "text": "What is the purpose of a persona in UX design?",
              "options": [
                { "text": "To analyze competitor products", "isCorrect": false },
                { "text": "To represent target users", "isCorrect": true },
                { "text": "To create prototypes", "isCorrect": false },
                { "text": "To define business goals", "isCorrect": false }
              ],
              "difficulty": "hard",
            },
            {
              "questionType": "text",
              "text": "What does the term 'responsive design' refer to?",
              "options": [
                { "text": "Interaction design responsiveness", "isCorrect": false },
                { "text": "Creating designs that adapt to different devices", "isCorrect": true },
                { "text": "Improving server response times", "isCorrect": false },
                { "text": "Making designs reactive to touch gestures", "isCorrect": false }
              ],
              "difficulty": "hard",
            },
            {
              "questionType": "text",
              "text": "Which of these is an example of a dark UX pattern?",
              "options": [
                { "text": "Simple and clean navigation", "isCorrect": false },
                { "text": "Designing an unsubscribe button that is hard to find", "isCorrect": true },
                { "text": "High-contrast color usage for readability", "isCorrect": false },
                { "text": "A prominent call-to-action button", "isCorrect": false }
              ],
              "difficulty": "hard",
            },
            {
              "questionType": "text",
              "text": "What is the purpose of a heatmap in UX research?",
              "options": [
                { "text": "To show click or scroll activity on a page", "isCorrect": true },
                { "text": "To highlight code inefficiencies", "isCorrect": false },
                { "text": "To analyze brand identity", "isCorrect": false },
                { "text": "To compare website traffic", "isCorrect": false }
              ],
              "difficulty": "hard",
            },
            {
              "questionType": "text",
              "text": "What does a sitemap primarily represent?",
              "options": [
                { "text": "A hierarchy of web pages", "isCorrect": true },
                { "text": "A list of UI components", "isCorrect": false },
                { "text": "A user persona", "isCorrect": false },
                { "text": "A journey map", "isCorrect": false }
              ],
              "difficulty": "hard",
            },
            {
              "questionType": "text",
              "text": "What does Fitt’s Law suggest in UI design?",
              "options": [
                { "text": "Large buttons are easier to click", "isCorrect": false },
                { "text": "The time to interact depends on the size and distance of the target", "isCorrect": true },
                { "text": "Users prefer symmetric layouts", "isCorrect": false },
                { "text": "Navigation should always be at the top", "isCorrect": false }
              ],
              "difficulty": "hard",
            }
          ],
        category : 'UI/UX'
    },
]