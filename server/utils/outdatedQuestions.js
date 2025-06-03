const outdated = [
    {
        title : 'UX Design Level 1: Figma Skill',
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
            },
            {
              "questionType": "text",
              "text": "Which frame rate is standard for smooth motion graphics in most digital platforms?",
              "options": [
                { "text": "12 fps", "isCorrect": false },
                { "text": "24 fps", "isCorrect": false },
                { "text": "30 fps", "isCorrect": true },
                { "text": "60 fps", "isCorrect": false }
              ],
              "difficulty": "easy"
            },
          ],
        isAvailable : true,
        category : 'UI UX'
    },
    {
        title : 'UX Design Level 2',
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
            },
            {
              "questionType": "text",
              "text": "Which frame rate is standard for smooth motion graphics in most digital platforms?",
              "options": [
                { "text": "12 fps", "isCorrect": false },
                { "text": "24 fps", "isCorrect": false },
                { "text": "30 fps", "isCorrect": true },
                { "text": "60 fps", "isCorrect": false }
              ],
              "difficulty": "easy"
            },
          ],
        isAvailable : true,
        category : 'UI UX'
    },
    {
      title : 'Motion Designer Level 1',
      questions : [
        {
          "questionType": "text",
          "text": "Which software is primarily used for creating 2D motion graphics?",
          "options": [
            { "text": "Adobe Premiere Pro", "isCorrect": false },
            { "text": "Adobe After Effects", "isCorrect": "true" },
            { "text": "Blender", "isCorrect": false },
            { "text": "Autodesk Maya", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What is the purpose of keyframing in motion design?",
          "options": [
            { "text": "To adjust audio levels", "isCorrect": false },
            { "text": "To create smooth transitions between animation states", "isCorrect": true },
            { "text": "To render the final output", "isCorrect": false },
            { "text": "To import assets into a project", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "Which file format is best for exporting a motion graphic with a transparent background?",
          "options": [
            { "text": "MP4", "isCorrect": false },
            { "text": "MOV with ProRes 4444", "isCorrect": true },
            { "text": "AVI", "isCorrect": false },
            { "text": "WMV", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What does the term 'easing' refer to in motion design?",
          "options": [
            { "text": "Adjusting color gradients", "isCorrect": false },
            { "text": "Smoothing the speed of animations for natural motion", "isCorrect": true },
            { "text": "Adding audio effects", "isCorrect": false },
            { "text": "Rendering 3D models", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "Which After Effects feature allows you to reuse animations across multiple projects?",
          "options": [
            { "text": "Compositions", "isCorrect": false },
            { "text": "Motion Presets", "isCorrect": true },
            { "text": "Layer Styles", "isCorrect": false },
            { "text": "Render Queue", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the primary advantage of using Cinema 4D for motion graphics?",
          "options": [
            { "text": "Advanced video editing", "isCorrect": false },
            { "text": "Creating 3D animations and models", "isCorrect": true },
            { "text": "Audio synchronization", "isCorrect": false },
            { "text": "2D vector illustration", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "Which plugin is commonly used to create particle effects in After Effects?",
          "options": [
            { "text": "Element 3D", "isCorrect": false },
            { "text": "Trapcode Particular", "isCorrect": true },
            { "text": "Optical Flares", "isCorrect": false },
            { "text": "Saber", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the purpose of a storyboard in motion design?",
          "options": [
            { "text": "To write the project script", "isCorrect": false },
            { "text": "To plan the visual sequence and timing", "isCorrect": true },
            { "text": "To edit audio tracks", "isCorrect": false },
            { "text": "To export the final video", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What does the term 'motion tracking' refer to in motion design?",
          "options": [
            { "text": "Adjusting animation speed", "isCorrect": false },
            { "text": "Aligning graphics to moving objects in video footage", "isCorrect": true },
            { "text": "Creating 3D models", "isCorrect": false },
            { "text": "Rendering high-quality outputs", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "Which frame rate is standard for smooth motion graphics in most digital platforms?",
          "options": [
            { "text": "12 fps", "isCorrect": false },
            { "text": "24 fps", "isCorrect": false },
            { "text": "30 fps", "isCorrect": true },
            { "text": "60 fps", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you ensure your motion designs align with a brand’s identity?",
          "options": [
            { "text": "Use random colors and fonts", "isCorrect": false },
            { "text": "Follow the brand’s style guide for colors, fonts, and tone", "isCorrect": true },
            { "text": "Copy competitor designs", "isCorrect": false },
            { "text": "Ignore brand guidelines for creativity", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What is the first step in your creative process for a new motion design project?",
          "options": [
            { "text": "Start animating immediately", "isCorrect": false },
            { "text": "Research the project brief and audience", "isCorrect": true },
            { "text": "Export the final video", "isCorrect": false },
            { "text": "Choose random assets", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you incorporate storytelling into motion graphics?",
          "options": [
            { "text": "Use complex animations only", "isCorrect": false },
            { "text": "Create a narrative arc with visuals and pacing", "isCorrect": true },
            { "text": "Focus on audio only", "isCorrect": false },
            { "text": "Avoid text elements", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you stay updated with the latest motion design trends?",
          "options": [
            { "text": "Ignore trends and focus on old techniques", "isCorrect": false },
            { "text": "Follow industry blogs, tutorials, and conferences", "isCorrect": true },
            { "text": "Copy other designers’ work", "isCorrect": false },
            { "text": "Avoid learning new tools", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What role does audio play in motion graphics?",
          "options": [
            { "text": "It’s optional and unimportant", "isCorrect": false },
            { "text": "It enhances pacing and emotional impact", "isCorrect": true },
            { "text": "It replaces visuals", "isCorrect": false },
            { "text": "It’s only used for background music", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you balance creativity with client expectations?",
          "options": [
            { "text": "Ignore client feedback", "isCorrect": false },
            { "text": "Communicate and align creative ideas with client goals", "isCorrect": true },
            { "text": "Use only pre-made templates", "isCorrect": false },
            { "text": "Focus on creativity without constraints", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of using a mood board in motion design?",
          "options": [
            { "text": "To edit the final video", "isCorrect": false },
            { "text": "To define the visual style and tone early", "isCorrect": true },
            { "text": "To write the script", "isCorrect": false },
            { "text": "To render animations", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How would you handle a client requesting last-minute changes to a motion graphic?",
          "options": [
            { "text": "Refuse the changes", "isCorrect": false },
            { "text": "Assess feasibility and communicate timelines", "isCorrect": true },
            { "text": "Ignore the request", "isCorrect": false },
            { "text": "Start the project from scratch", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What would you do if a render fails due to insufficient system resources?",
          "options": [
            { "text": "Ignore the issue and deliver incomplete work", "isCorrect": false },
            { "text": "Optimize the project or use a more powerful system", "isCorrect": true },
            { "text": "Restart the software", "isCorrect": false },
            { "text": "Delete keyframes", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you address feedback that conflicts with design principles?",
          "options": [
            { "text": "Ignore the feedback", "isCorrect": false },
            { "text": "Explain design principles and propose alternatives", "isCorrect": true },
            { "text": "Follow the feedback blindly", "isCorrect": false },
            { "text": "Abandon the project", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What steps would you take if a client dislikes your motion design draft?",
          "options": [
            { "text": "Defend your design without discussion", "isCorrect": false },
            { "text": "Ask for specific feedback and revise accordingly", "isCorrect": true },
            { "text": "Ignore the client’s opinion", "isCorrect": false },
            { "text": "Use a different designer’s work", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you manage tight deadlines without compromising quality?",
          "options": [
            { "text": "Skip quality checks", "isCorrect": false },
            { "text": "Prioritize tasks and streamline workflows", "isCorrect": true },
            { "text": "Deliver incomplete work", "isCorrect": false },
            { "text": "Avoid client communication", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What would you do if a project requires a skill you’re less experienced in, like 3D animation?",
          "options": [
            { "text": "Decline the project", "isCorrect": false },
            { "text": "Learn the skill or collaborate with an expert", "isCorrect": true },
            { "text": "Fake the skill", "isCorrect": false },
            { "text": "Ignore the requirement", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you ensure a motion graphic is optimized for mobile devices?",
          "options": [
            { "text": "Use high-resolution assets only", "isCorrect": false },
            { "text": "Test on mobile and optimize file size and resolution", "isCorrect": true },
            { "text": "Ignore mobile compatibility", "isCorrect": false },
            { "text": "Use desktop settings", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the difference between motion graphics and traditional animation?",
          "options": [
            { "text": "Motion graphics focus on graphic design in motion, while animation includes broader storytelling", "isCorrect": true },
            { "text": "They are the same", "isCorrect": false },
            { "text": "Motion graphics are only 3D", "isCorrect": false },
            { "text": "Animation is only for web design", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "Which industry trend is currently influencing motion design?",
          "options": [
            { "text": "Minimalist 2D animations", "isCorrect": true },
            { "text": "Black-and-white designs only", "isCorrect": false },
            { "text": "Static graphics", "isCorrect": false },
            { "text": "Low-resolution videos", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of a Motion Designer in a marketing campaign?",
          "options": [
            { "text": "Write the campaign script", "isCorrect": false },
            { "text": "Create engaging visuals to communicate the message", "isCorrect": true },
            { "text": "Manage the campaign budget", "isCorrect": false },
            { "text": "Handle social media posting", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "Why is understanding typography important for motion designers?",
          "options": [
            { "text": "It’s irrelevant to motion design", "isCorrect": false },
            { "text": "It ensures text is legible and enhances design", "isCorrect": true },
            { "text": "It’s only for print design", "isCorrect": false },
            { "text": "It replaces animation", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of using vector graphics in motion design?",
          "options": [
            { "text": "They are smaller in file size", "isCorrect": false },
            { "text": "They scale without losing quality", "isCorrect": true },
            { "text": "They are easier to animate", "isCorrect": false },
            { "text": "They are only for 3D design", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What is the significance of the 12 Principles of Animation in motion design?",
          "options": [
            { "text": "They are outdated rules", "isCorrect": false },
            { "text": "They guide natural and appealing motion", "isCorrect": true },
            { "text": "They apply only to 3D animation", "isCorrect": false },
            { "text": "They are for audio design", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "Which platform is increasingly using motion graphics for user engagement?",
          "options": [
            { "text": "Print media", "isCorrect": false },
            { "text": "Social media", "isCorrect": true },
            { "text": "Radio", "isCorrect": false },
            { "text": "Billboards", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What should a mid-level Motion Designer’s portfolio primarily showcase?",
          "options": [
            { "text": "Only personal projects", "isCorrect": false },
            { "text": "A variety of professional and creative projects", "isCorrect": true },
            { "text": "Only 3D animations", "isCorrect": false },
            { "text": "Static graphic designs", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How should a Motion Designer present their portfolio during an interview?",
          "options": [
            { "text": "Show all projects without explanation", "isCorrect": false },
            { "text": "Explain the context, process, and impact of key projects", "isCorrect": true },
            { "text": "Focus only on technical skills", "isCorrect": false },
            { "text": "Avoid showing recent work", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "Why is it important to include client feedback in a motion design portfolio?",
          "options": [
            { "text": "It’s unnecessary", "isCorrect": false },
            { "text": "It shows collaboration and client satisfaction", "isCorrect": true },
            { "text": "It replaces the need for visuals", "isCorrect": false },
            { "text": "It’s only for senior designers", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "Which After Effects tool is used to create smooth transitions between keyframes?",
          "options": [
            { "text": "Pen Tool", "isCorrect": false },
            { "text": "Graph Editor", "isCorrect": true },
            { "text": "Brush Tool", "isCorrect": false },
            { "text": "Clone Stamp", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the purpose of pre-composing layers in After Effects?",
          "options": [
            { "text": "To export the project", "isCorrect": false },
            { "text": "To organize and simplify complex compositions", "isCorrect": true },
            { "text": "To add audio effects", "isCorrect": false },
            { "text": "To adjust color settings", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you optimize a motion graphic for faster rendering?",
          "options": [
            { "text": "Increase resolution", "isCorrect": false },
            { "text": "Reduce effects and simplify compositions", "isCorrect": true },
            { "text": "Add more keyframes", "isCorrect": false },
            { "text": "Use high-resolution assets", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of using expressions in After Effects?",
          "options": [
            { "text": "To create 3D models", "isCorrect": false },
            { "text": "To automate animations with code", "isCorrect": true },
            { "text": "To edit audio tracks", "isCorrect": false },
            { "text": "To render videos", "isCorrect": false }
          ],
          "difficulty": "hard"
        },
        {
          "questionType": "text",
          "text": "How do you ensure accessibility in motion graphics?",
          "options": [
            { "text": "Use low-contrast colors", "isCorrect": false },
            { "text": "Include captions and high-contrast visuals", "isCorrect": true },
            { "text": "Avoid text elements", "isCorrect": false },
            { "text": "Use complex animations only", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of a null object in After Effects?",
          "options": [
            { "text": "To add text layers", "isCorrect": false },
            { "text": "To control multiple layers as a parent", "isCorrect": true },
            { "text": "To adjust audio levels", "isCorrect": false },
            { "text": "To export assets", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you approach collaboration with a video editor on a project?",
          "options": [
            { "text": "Work independently without communication", "isCorrect": false },
            { "text": "Share assets and align on project goals", "isCorrect": true },
            { "text": "Take over their tasks", "isCorrect": false },
            { "text": "Ignore their feedback", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the advantage of using shape layers in After Effects?",
          "options": [
            { "text": "They are only for 3D animation", "isCorrect": false },
            { "text": "They are vector-based and easily editable", "isCorrect": true },
            { "text": "They replace audio tracks", "isCorrect": false },
            { "text": "They are used for rendering", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you handle a situation where a client’s budget is too low for the project scope?",
          "options": [
            { "text": "Agree to the budget and overwork", "isCorrect": false },
            { "text": "Negotiate scope or suggest alternatives", "isCorrect": true },
            { "text": "Reject the project immediately", "isCorrect": false },
            { "text": "Ignore the budget issue", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the purpose of a style frame in motion design?",
          "options": [
            { "text": "To edit the final video", "isCorrect": false },
            { "text": "To establish the visual aesthetic before animation", "isCorrect": true },
            { "text": "To write the script", "isCorrect": false },
            { "text": "To adjust audio levels", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you test the effectiveness of a motion graphic before delivery?",
          "options": [
            { "text": "Deliver without testing", "isCorrect": false },
            { "text": "Preview on multiple devices and gather feedback", "isCorrect": true },
            { "text": "Only test on one device", "isCorrect": false },
            { "text": "Avoid client input", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of using a dynamic link between After Effects and Premiere Pro?",
          "options": [
            { "text": "To create 3D models", "isCorrect": false },
            { "text": "To edit compositions without re-rendering", "isCorrect": true },
            { "text": "To adjust audio only", "isCorrect": false },
            { "text": "To export static images", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you approach creating a motion graphic for a global audience?",
          "options": [
            { "text": "Use only local cultural references", "isCorrect": false },
            { "text": "Use universal visuals and avoid culture-specific elements", "isCorrect": true },
            { "text": "Ignore audience diversity", "isCorrect": false },
            { "text": "Use complex jargon", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of timing in creating impactful motion graphics?",
          "options": [
            { "text": "It’s irrelevant", "isCorrect": false },
            { "text": "It ensures animations align with pacing and audience attention", "isCorrect": true },
            { "text": "It’s only for audio", "isCorrect": false },
            { "text": "It replaces visual design", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the advantage of using Lottie animations in motion design?",
          "options": [
            { "text": "They are only for 3D animation", "isCorrect": false },
            { "text": "They are lightweight and scalable for web and apps", "isCorrect": true },
            { "text": "They replace video files", "isCorrect": false },
            { "text": "They are used for audio editing", "isCorrect": false }
          ],
          "difficulty": "medium"
        }
      ],
      isAvailable : true,
      category : "Motion Designer"
    },
    {
      title : 'Motion Designer Level 2',
      questions : [
        {
          "questionType": "text",
          "text": "Which software is primarily used for creating 2D motion graphics?",
          "options": [
            { "text": "Adobe Premiere Pro", "isCorrect": false },
            { "text": "Adobe After Effects", "isCorrect": "true" },
            { "text": "Blender", "isCorrect": false },
            { "text": "Autodesk Maya", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What is the purpose of keyframing in motion design?",
          "options": [
            { "text": "To adjust audio levels", "isCorrect": false },
            { "text": "To create smooth transitions between animation states", "isCorrect": true },
            { "text": "To render the final output", "isCorrect": false },
            { "text": "To import assets into a project", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "Which file format is best for exporting a motion graphic with a transparent background?",
          "options": [
            { "text": "MP4", "isCorrect": false },
            { "text": "MOV with ProRes 4444", "isCorrect": true },
            { "text": "AVI", "isCorrect": false },
            { "text": "WMV", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What does the term 'easing' refer to in motion design?",
          "options": [
            { "text": "Adjusting color gradients", "isCorrect": false },
            { "text": "Smoothing the speed of animations for natural motion", "isCorrect": true },
            { "text": "Adding audio effects", "isCorrect": false },
            { "text": "Rendering 3D models", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "Which After Effects feature allows you to reuse animations across multiple projects?",
          "options": [
            { "text": "Compositions", "isCorrect": false },
            { "text": "Motion Presets", "isCorrect": true },
            { "text": "Layer Styles", "isCorrect": false },
            { "text": "Render Queue", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the primary advantage of using Cinema 4D for motion graphics?",
          "options": [
            { "text": "Advanced video editing", "isCorrect": false },
            { "text": "Creating 3D animations and models", "isCorrect": true },
            { "text": "Audio synchronization", "isCorrect": false },
            { "text": "2D vector illustration", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "Which plugin is commonly used to create particle effects in After Effects?",
          "options": [
            { "text": "Element 3D", "isCorrect": false },
            { "text": "Trapcode Particular", "isCorrect": true },
            { "text": "Optical Flares", "isCorrect": false },
            { "text": "Saber", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the purpose of a storyboard in motion design?",
          "options": [
            { "text": "To write the project script", "isCorrect": false },
            { "text": "To plan the visual sequence and timing", "isCorrect": true },
            { "text": "To edit audio tracks", "isCorrect": false },
            { "text": "To export the final video", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What does the term 'motion tracking' refer to in motion design?",
          "options": [
            { "text": "Adjusting animation speed", "isCorrect": false },
            { "text": "Aligning graphics to moving objects in video footage", "isCorrect": true },
            { "text": "Creating 3D models", "isCorrect": false },
            { "text": "Rendering high-quality outputs", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "Which frame rate is standard for smooth motion graphics in most digital platforms?",
          "options": [
            { "text": "12 fps", "isCorrect": false },
            { "text": "24 fps", "isCorrect": false },
            { "text": "30 fps", "isCorrect": true },
            { "text": "60 fps", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you ensure your motion designs align with a brand’s identity?",
          "options": [
            { "text": "Use random colors and fonts", "isCorrect": false },
            { "text": "Follow the brand’s style guide for colors, fonts, and tone", "isCorrect": true },
            { "text": "Copy competitor designs", "isCorrect": false },
            { "text": "Ignore brand guidelines for creativity", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What is the first step in your creative process for a new motion design project?",
          "options": [
            { "text": "Start animating immediately", "isCorrect": false },
            { "text": "Research the project brief and audience", "isCorrect": true },
            { "text": "Export the final video", "isCorrect": false },
            { "text": "Choose random assets", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you incorporate storytelling into motion graphics?",
          "options": [
            { "text": "Use complex animations only", "isCorrect": false },
            { "text": "Create a narrative arc with visuals and pacing", "isCorrect": true },
            { "text": "Focus on audio only", "isCorrect": false },
            { "text": "Avoid text elements", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you stay updated with the latest motion design trends?",
          "options": [
            { "text": "Ignore trends and focus on old techniques", "isCorrect": false },
            { "text": "Follow industry blogs, tutorials, and conferences", "isCorrect": true },
            { "text": "Copy other designers’ work", "isCorrect": false },
            { "text": "Avoid learning new tools", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What role does audio play in motion graphics?",
          "options": [
            { "text": "It’s optional and unimportant", "isCorrect": false },
            { "text": "It enhances pacing and emotional impact", "isCorrect": true },
            { "text": "It replaces visuals", "isCorrect": false },
            { "text": "It’s only used for background music", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you balance creativity with client expectations?",
          "options": [
            { "text": "Ignore client feedback", "isCorrect": false },
            { "text": "Communicate and align creative ideas with client goals", "isCorrect": true },
            { "text": "Use only pre-made templates", "isCorrect": false },
            { "text": "Focus on creativity without constraints", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of using a mood board in motion design?",
          "options": [
            { "text": "To edit the final video", "isCorrect": false },
            { "text": "To define the visual style and tone early", "isCorrect": true },
            { "text": "To write the script", "isCorrect": false },
            { "text": "To render animations", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How would you handle a client requesting last-minute changes to a motion graphic?",
          "options": [
            { "text": "Refuse the changes", "isCorrect": false },
            { "text": "Assess feasibility and communicate timelines", "isCorrect": true },
            { "text": "Ignore the request", "isCorrect": false },
            { "text": "Start the project from scratch", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What would you do if a render fails due to insufficient system resources?",
          "options": [
            { "text": "Ignore the issue and deliver incomplete work", "isCorrect": false },
            { "text": "Optimize the project or use a more powerful system", "isCorrect": true },
            { "text": "Restart the software", "isCorrect": false },
            { "text": "Delete keyframes", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you address feedback that conflicts with design principles?",
          "options": [
            { "text": "Ignore the feedback", "isCorrect": false },
            { "text": "Explain design principles and propose alternatives", "isCorrect": true },
            { "text": "Follow the feedback blindly", "isCorrect": false },
            { "text": "Abandon the project", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What steps would you take if a client dislikes your motion design draft?",
          "options": [
            { "text": "Defend your design without discussion", "isCorrect": false },
            { "text": "Ask for specific feedback and revise accordingly", "isCorrect": true },
            { "text": "Ignore the client’s opinion", "isCorrect": false },
            { "text": "Use a different designer’s work", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you manage tight deadlines without compromising quality?",
          "options": [
            { "text": "Skip quality checks", "isCorrect": false },
            { "text": "Prioritize tasks and streamline workflows", "isCorrect": true },
            { "text": "Deliver incomplete work", "isCorrect": false },
            { "text": "Avoid client communication", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What would you do if a project requires a skill you’re less experienced in, like 3D animation?",
          "options": [
            { "text": "Decline the project", "isCorrect": false },
            { "text": "Learn the skill or collaborate with an expert", "isCorrect": true },
            { "text": "Fake the skill", "isCorrect": false },
            { "text": "Ignore the requirement", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you ensure a motion graphic is optimized for mobile devices?",
          "options": [
            { "text": "Use high-resolution assets only", "isCorrect": false },
            { "text": "Test on mobile and optimize file size and resolution", "isCorrect": true },
            { "text": "Ignore mobile compatibility", "isCorrect": false },
            { "text": "Use desktop settings", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the difference between motion graphics and traditional animation?",
          "options": [
            { "text": "Motion graphics focus on graphic design in motion, while animation includes broader storytelling", "isCorrect": true },
            { "text": "They are the same", "isCorrect": false },
            { "text": "Motion graphics are only 3D", "isCorrect": false },
            { "text": "Animation is only for web design", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "Which industry trend is currently influencing motion design?",
          "options": [
            { "text": "Minimalist 2D animations", "isCorrect": true },
            { "text": "Black-and-white designs only", "isCorrect": false },
            { "text": "Static graphics", "isCorrect": false },
            { "text": "Low-resolution videos", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of a Motion Designer in a marketing campaign?",
          "options": [
            { "text": "Write the campaign script", "isCorrect": false },
            { "text": "Create engaging visuals to communicate the message", "isCorrect": true },
            { "text": "Manage the campaign budget", "isCorrect": false },
            { "text": "Handle social media posting", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "Why is understanding typography important for motion designers?",
          "options": [
            { "text": "It’s irrelevant to motion design", "isCorrect": false },
            { "text": "It ensures text is legible and enhances design", "isCorrect": true },
            { "text": "It’s only for print design", "isCorrect": false },
            { "text": "It replaces animation", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of using vector graphics in motion design?",
          "options": [
            { "text": "They are smaller in file size", "isCorrect": false },
            { "text": "They scale without losing quality", "isCorrect": true },
            { "text": "They are easier to animate", "isCorrect": false },
            { "text": "They are only for 3D design", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What is the significance of the 12 Principles of Animation in motion design?",
          "options": [
            { "text": "They are outdated rules", "isCorrect": false },
            { "text": "They guide natural and appealing motion", "isCorrect": true },
            { "text": "They apply only to 3D animation", "isCorrect": false },
            { "text": "They are for audio design", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "Which platform is increasingly using motion graphics for user engagement?",
          "options": [
            { "text": "Print media", "isCorrect": false },
            { "text": "Social media", "isCorrect": true },
            { "text": "Radio", "isCorrect": false },
            { "text": "Billboards", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What should a mid-level Motion Designer’s portfolio primarily showcase?",
          "options": [
            { "text": "Only personal projects", "isCorrect": false },
            { "text": "A variety of professional and creative projects", "isCorrect": true },
            { "text": "Only 3D animations", "isCorrect": false },
            { "text": "Static graphic designs", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How should a Motion Designer present their portfolio during an interview?",
          "options": [
            { "text": "Show all projects without explanation", "isCorrect": false },
            { "text": "Explain the context, process, and impact of key projects", "isCorrect": true },
            { "text": "Focus only on technical skills", "isCorrect": false },
            { "text": "Avoid showing recent work", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "Why is it important to include client feedback in a motion design portfolio?",
          "options": [
            { "text": "It’s unnecessary", "isCorrect": false },
            { "text": "It shows collaboration and client satisfaction", "isCorrect": true },
            { "text": "It replaces the need for visuals", "isCorrect": false },
            { "text": "It’s only for senior designers", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "Which After Effects tool is used to create smooth transitions between keyframes?",
          "options": [
            { "text": "Pen Tool", "isCorrect": false },
            { "text": "Graph Editor", "isCorrect": true },
            { "text": "Brush Tool", "isCorrect": false },
            { "text": "Clone Stamp", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the purpose of pre-composing layers in After Effects?",
          "options": [
            { "text": "To export the project", "isCorrect": false },
            { "text": "To organize and simplify complex compositions", "isCorrect": true },
            { "text": "To add audio effects", "isCorrect": false },
            { "text": "To adjust color settings", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you optimize a motion graphic for faster rendering?",
          "options": [
            { "text": "Increase resolution", "isCorrect": false },
            { "text": "Reduce effects and simplify compositions", "isCorrect": true },
            { "text": "Add more keyframes", "isCorrect": false },
            { "text": "Use high-resolution assets", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of using expressions in After Effects?",
          "options": [
            { "text": "To create 3D models", "isCorrect": false },
            { "text": "To automate animations with code", "isCorrect": true },
            { "text": "To edit audio tracks", "isCorrect": false },
            { "text": "To render videos", "isCorrect": false }
          ],
          "difficulty": "hard"
        },
        {
          "questionType": "text",
          "text": "How do you ensure accessibility in motion graphics?",
          "options": [
            { "text": "Use low-contrast colors", "isCorrect": false },
            { "text": "Include captions and high-contrast visuals", "isCorrect": true },
            { "text": "Avoid text elements", "isCorrect": false },
            { "text": "Use complex animations only", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of a null object in After Effects?",
          "options": [
            { "text": "To add text layers", "isCorrect": false },
            { "text": "To control multiple layers as a parent", "isCorrect": true },
            { "text": "To adjust audio levels", "isCorrect": false },
            { "text": "To export assets", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you approach collaboration with a video editor on a project?",
          "options": [
            { "text": "Work independently without communication", "isCorrect": false },
            { "text": "Share assets and align on project goals", "isCorrect": true },
            { "text": "Take over their tasks", "isCorrect": false },
            { "text": "Ignore their feedback", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the advantage of using shape layers in After Effects?",
          "options": [
            { "text": "They are only for 3D animation", "isCorrect": false },
            { "text": "They are vector-based and easily editable", "isCorrect": true },
            { "text": "They replace audio tracks", "isCorrect": false },
            { "text": "They are used for rendering", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you handle a situation where a client’s budget is too low for the project scope?",
          "options": [
            { "text": "Agree to the budget and overwork", "isCorrect": false },
            { "text": "Negotiate scope or suggest alternatives", "isCorrect": true },
            { "text": "Reject the project immediately", "isCorrect": false },
            { "text": "Ignore the budget issue", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the purpose of a style frame in motion design?",
          "options": [
            { "text": "To edit the final video", "isCorrect": false },
            { "text": "To establish the visual aesthetic before animation", "isCorrect": true },
            { "text": "To write the script", "isCorrect": false },
            { "text": "To adjust audio levels", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you test the effectiveness of a motion graphic before delivery?",
          "options": [
            { "text": "Deliver without testing", "isCorrect": false },
            { "text": "Preview on multiple devices and gather feedback", "isCorrect": true },
            { "text": "Only test on one device", "isCorrect": false },
            { "text": "Avoid client input", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of using a dynamic link between After Effects and Premiere Pro?",
          "options": [
            { "text": "To create 3D models", "isCorrect": false },
            { "text": "To edit compositions without re-rendering", "isCorrect": true },
            { "text": "To adjust audio only", "isCorrect": false },
            { "text": "To export static images", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you approach creating a motion graphic for a global audience?",
          "options": [
            { "text": "Use only local cultural references", "isCorrect": false },
            { "text": "Use universal visuals and avoid culture-specific elements", "isCorrect": true },
            { "text": "Ignore audience diversity", "isCorrect": false },
            { "text": "Use complex jargon", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of timing in creating impactful motion graphics?",
          "options": [
            { "text": "It’s irrelevant", "isCorrect": false },
            { "text": "It ensures animations align with pacing and audience attention", "isCorrect": true },
            { "text": "It’s only for audio", "isCorrect": false },
            { "text": "It replaces visual design", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the advantage of using Lottie animations in motion design?",
          "options": [
            { "text": "They are only for 3D animation", "isCorrect": false },
            { "text": "They are lightweight and scalable for web and apps", "isCorrect": true },
            { "text": "They replace video files", "isCorrect": false },
            { "text": "They are used for audio editing", "isCorrect": false }
          ],
          "difficulty": "medium"
        }
      ],
      isAvailable : true,
      category : "Motion Designer"
    },
    {
      title : 'Motion Designer Level 3',
      questions : [
        {
          "questionType": "text",
          "text": "Which software is primarily used for creating 2D motion graphics?",
          "options": [
            { "text": "Adobe Premiere Pro", "isCorrect": false },
            { "text": "Adobe After Effects", "isCorrect": "true" },
            { "text": "Blender", "isCorrect": false },
            { "text": "Autodesk Maya", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What is the purpose of keyframing in motion design?",
          "options": [
            { "text": "To adjust audio levels", "isCorrect": false },
            { "text": "To create smooth transitions between animation states", "isCorrect": true },
            { "text": "To render the final output", "isCorrect": false },
            { "text": "To import assets into a project", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "Which file format is best for exporting a motion graphic with a transparent background?",
          "options": [
            { "text": "MP4", "isCorrect": false },
            { "text": "MOV with ProRes 4444", "isCorrect": true },
            { "text": "AVI", "isCorrect": false },
            { "text": "WMV", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What does the term 'easing' refer to in motion design?",
          "options": [
            { "text": "Adjusting color gradients", "isCorrect": false },
            { "text": "Smoothing the speed of animations for natural motion", "isCorrect": true },
            { "text": "Adding audio effects", "isCorrect": false },
            { "text": "Rendering 3D models", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "Which After Effects feature allows you to reuse animations across multiple projects?",
          "options": [
            { "text": "Compositions", "isCorrect": false },
            { "text": "Motion Presets", "isCorrect": true },
            { "text": "Layer Styles", "isCorrect": false },
            { "text": "Render Queue", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the primary advantage of using Cinema 4D for motion graphics?",
          "options": [
            { "text": "Advanced video editing", "isCorrect": false },
            { "text": "Creating 3D animations and models", "isCorrect": true },
            { "text": "Audio synchronization", "isCorrect": false },
            { "text": "2D vector illustration", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "Which plugin is commonly used to create particle effects in After Effects?",
          "options": [
            { "text": "Element 3D", "isCorrect": false },
            { "text": "Trapcode Particular", "isCorrect": true },
            { "text": "Optical Flares", "isCorrect": false },
            { "text": "Saber", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the purpose of a storyboard in motion design?",
          "options": [
            { "text": "To write the project script", "isCorrect": false },
            { "text": "To plan the visual sequence and timing", "isCorrect": true },
            { "text": "To edit audio tracks", "isCorrect": false },
            { "text": "To export the final video", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What does the term 'motion tracking' refer to in motion design?",
          "options": [
            { "text": "Adjusting animation speed", "isCorrect": false },
            { "text": "Aligning graphics to moving objects in video footage", "isCorrect": true },
            { "text": "Creating 3D models", "isCorrect": false },
            { "text": "Rendering high-quality outputs", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "Which frame rate is standard for smooth motion graphics in most digital platforms?",
          "options": [
            { "text": "12 fps", "isCorrect": false },
            { "text": "24 fps", "isCorrect": false },
            { "text": "30 fps", "isCorrect": true },
            { "text": "60 fps", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you ensure your motion designs align with a brand’s identity?",
          "options": [
            { "text": "Use random colors and fonts", "isCorrect": false },
            { "text": "Follow the brand’s style guide for colors, fonts, and tone", "isCorrect": true },
            { "text": "Copy competitor designs", "isCorrect": false },
            { "text": "Ignore brand guidelines for creativity", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What is the first step in your creative process for a new motion design project?",
          "options": [
            { "text": "Start animating immediately", "isCorrect": false },
            { "text": "Research the project brief and audience", "isCorrect": true },
            { "text": "Export the final video", "isCorrect": false },
            { "text": "Choose random assets", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you incorporate storytelling into motion graphics?",
          "options": [
            { "text": "Use complex animations only", "isCorrect": false },
            { "text": "Create a narrative arc with visuals and pacing", "isCorrect": true },
            { "text": "Focus on audio only", "isCorrect": false },
            { "text": "Avoid text elements", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you stay updated with the latest motion design trends?",
          "options": [
            { "text": "Ignore trends and focus on old techniques", "isCorrect": false },
            { "text": "Follow industry blogs, tutorials, and conferences", "isCorrect": true },
            { "text": "Copy other designers’ work", "isCorrect": false },
            { "text": "Avoid learning new tools", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What role does audio play in motion graphics?",
          "options": [
            { "text": "It’s optional and unimportant", "isCorrect": false },
            { "text": "It enhances pacing and emotional impact", "isCorrect": true },
            { "text": "It replaces visuals", "isCorrect": false },
            { "text": "It’s only used for background music", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you balance creativity with client expectations?",
          "options": [
            { "text": "Ignore client feedback", "isCorrect": false },
            { "text": "Communicate and align creative ideas with client goals", "isCorrect": true },
            { "text": "Use only pre-made templates", "isCorrect": false },
            { "text": "Focus on creativity without constraints", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of using a mood board in motion design?",
          "options": [
            { "text": "To edit the final video", "isCorrect": false },
            { "text": "To define the visual style and tone early", "isCorrect": true },
            { "text": "To write the script", "isCorrect": false },
            { "text": "To render animations", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How would you handle a client requesting last-minute changes to a motion graphic?",
          "options": [
            { "text": "Refuse the changes", "isCorrect": false },
            { "text": "Assess feasibility and communicate timelines", "isCorrect": true },
            { "text": "Ignore the request", "isCorrect": false },
            { "text": "Start the project from scratch", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What would you do if a render fails due to insufficient system resources?",
          "options": [
            { "text": "Ignore the issue and deliver incomplete work", "isCorrect": false },
            { "text": "Optimize the project or use a more powerful system", "isCorrect": true },
            { "text": "Restart the software", "isCorrect": false },
            { "text": "Delete keyframes", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you address feedback that conflicts with design principles?",
          "options": [
            { "text": "Ignore the feedback", "isCorrect": false },
            { "text": "Explain design principles and propose alternatives", "isCorrect": true },
            { "text": "Follow the feedback blindly", "isCorrect": false },
            { "text": "Abandon the project", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What steps would you take if a client dislikes your motion design draft?",
          "options": [
            { "text": "Defend your design without discussion", "isCorrect": false },
            { "text": "Ask for specific feedback and revise accordingly", "isCorrect": true },
            { "text": "Ignore the client’s opinion", "isCorrect": false },
            { "text": "Use a different designer’s work", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you manage tight deadlines without compromising quality?",
          "options": [
            { "text": "Skip quality checks", "isCorrect": false },
            { "text": "Prioritize tasks and streamline workflows", "isCorrect": true },
            { "text": "Deliver incomplete work", "isCorrect": false },
            { "text": "Avoid client communication", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What would you do if a project requires a skill you’re less experienced in, like 3D animation?",
          "options": [
            { "text": "Decline the project", "isCorrect": false },
            { "text": "Learn the skill or collaborate with an expert", "isCorrect": true },
            { "text": "Fake the skill", "isCorrect": false },
            { "text": "Ignore the requirement", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you ensure a motion graphic is optimized for mobile devices?",
          "options": [
            { "text": "Use high-resolution assets only", "isCorrect": false },
            { "text": "Test on mobile and optimize file size and resolution", "isCorrect": true },
            { "text": "Ignore mobile compatibility", "isCorrect": false },
            { "text": "Use desktop settings", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the difference between motion graphics and traditional animation?",
          "options": [
            { "text": "Motion graphics focus on graphic design in motion, while animation includes broader storytelling", "isCorrect": true },
            { "text": "They are the same", "isCorrect": false },
            { "text": "Motion graphics are only 3D", "isCorrect": false },
            { "text": "Animation is only for web design", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "Which industry trend is currently influencing motion design?",
          "options": [
            { "text": "Minimalist 2D animations", "isCorrect": true },
            { "text": "Black-and-white designs only", "isCorrect": false },
            { "text": "Static graphics", "isCorrect": false },
            { "text": "Low-resolution videos", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of a Motion Designer in a marketing campaign?",
          "options": [
            { "text": "Write the campaign script", "isCorrect": false },
            { "text": "Create engaging visuals to communicate the message", "isCorrect": true },
            { "text": "Manage the campaign budget", "isCorrect": false },
            { "text": "Handle social media posting", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "Why is understanding typography important for motion designers?",
          "options": [
            { "text": "It’s irrelevant to motion design", "isCorrect": false },
            { "text": "It ensures text is legible and enhances design", "isCorrect": true },
            { "text": "It’s only for print design", "isCorrect": false },
            { "text": "It replaces animation", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of using vector graphics in motion design?",
          "options": [
            { "text": "They are smaller in file size", "isCorrect": false },
            { "text": "They scale without losing quality", "isCorrect": true },
            { "text": "They are easier to animate", "isCorrect": false },
            { "text": "They are only for 3D design", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What is the significance of the 12 Principles of Animation in motion design?",
          "options": [
            { "text": "They are outdated rules", "isCorrect": false },
            { "text": "They guide natural and appealing motion", "isCorrect": true },
            { "text": "They apply only to 3D animation", "isCorrect": false },
            { "text": "They are for audio design", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "Which platform is increasingly using motion graphics for user engagement?",
          "options": [
            { "text": "Print media", "isCorrect": false },
            { "text": "Social media", "isCorrect": true },
            { "text": "Radio", "isCorrect": false },
            { "text": "Billboards", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What should a mid-level Motion Designer’s portfolio primarily showcase?",
          "options": [
            { "text": "Only personal projects", "isCorrect": false },
            { "text": "A variety of professional and creative projects", "isCorrect": true },
            { "text": "Only 3D animations", "isCorrect": false },
            { "text": "Static graphic designs", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How should a Motion Designer present their portfolio during an interview?",
          "options": [
            { "text": "Show all projects without explanation", "isCorrect": false },
            { "text": "Explain the context, process, and impact of key projects", "isCorrect": true },
            { "text": "Focus only on technical skills", "isCorrect": false },
            { "text": "Avoid showing recent work", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "Why is it important to include client feedback in a motion design portfolio?",
          "options": [
            { "text": "It’s unnecessary", "isCorrect": false },
            { "text": "It shows collaboration and client satisfaction", "isCorrect": true },
            { "text": "It replaces the need for visuals", "isCorrect": false },
            { "text": "It’s only for senior designers", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "Which After Effects tool is used to create smooth transitions between keyframes?",
          "options": [
            { "text": "Pen Tool", "isCorrect": false },
            { "text": "Graph Editor", "isCorrect": true },
            { "text": "Brush Tool", "isCorrect": false },
            { "text": "Clone Stamp", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the purpose of pre-composing layers in After Effects?",
          "options": [
            { "text": "To export the project", "isCorrect": false },
            { "text": "To organize and simplify complex compositions", "isCorrect": true },
            { "text": "To add audio effects", "isCorrect": false },
            { "text": "To adjust color settings", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you optimize a motion graphic for faster rendering?",
          "options": [
            { "text": "Increase resolution", "isCorrect": false },
            { "text": "Reduce effects and simplify compositions", "isCorrect": true },
            { "text": "Add more keyframes", "isCorrect": false },
            { "text": "Use high-resolution assets", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of using expressions in After Effects?",
          "options": [
            { "text": "To create 3D models", "isCorrect": false },
            { "text": "To automate animations with code", "isCorrect": true },
            { "text": "To edit audio tracks", "isCorrect": false },
            { "text": "To render videos", "isCorrect": false }
          ],
          "difficulty": "hard"
        },
        {
          "questionType": "text",
          "text": "How do you ensure accessibility in motion graphics?",
          "options": [
            { "text": "Use low-contrast colors", "isCorrect": false },
            { "text": "Include captions and high-contrast visuals", "isCorrect": true },
            { "text": "Avoid text elements", "isCorrect": false },
            { "text": "Use complex animations only", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of a null object in After Effects?",
          "options": [
            { "text": "To add text layers", "isCorrect": false },
            { "text": "To control multiple layers as a parent", "isCorrect": true },
            { "text": "To adjust audio levels", "isCorrect": false },
            { "text": "To export assets", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you approach collaboration with a video editor on a project?",
          "options": [
            { "text": "Work independently without communication", "isCorrect": false },
            { "text": "Share assets and align on project goals", "isCorrect": true },
            { "text": "Take over their tasks", "isCorrect": false },
            { "text": "Ignore their feedback", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the advantage of using shape layers in After Effects?",
          "options": [
            { "text": "They are only for 3D animation", "isCorrect": false },
            { "text": "They are vector-based and easily editable", "isCorrect": true },
            { "text": "They replace audio tracks", "isCorrect": false },
            { "text": "They are used for rendering", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you handle a situation where a client’s budget is too low for the project scope?",
          "options": [
            { "text": "Agree to the budget and overwork", "isCorrect": false },
            { "text": "Negotiate scope or suggest alternatives", "isCorrect": true },
            { "text": "Reject the project immediately", "isCorrect": false },
            { "text": "Ignore the budget issue", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the purpose of a style frame in motion design?",
          "options": [
            { "text": "To edit the final video", "isCorrect": false },
            { "text": "To establish the visual aesthetic before animation", "isCorrect": true },
            { "text": "To write the script", "isCorrect": false },
            { "text": "To adjust audio levels", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you test the effectiveness of a motion graphic before delivery?",
          "options": [
            { "text": "Deliver without testing", "isCorrect": false },
            { "text": "Preview on multiple devices and gather feedback", "isCorrect": true },
            { "text": "Only test on one device", "isCorrect": false },
            { "text": "Avoid client input", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of using a dynamic link between After Effects and Premiere Pro?",
          "options": [
            { "text": "To create 3D models", "isCorrect": false },
            { "text": "To edit compositions without re-rendering", "isCorrect": true },
            { "text": "To adjust audio only", "isCorrect": false },
            { "text": "To export static images", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you approach creating a motion graphic for a global audience?",
          "options": [
            { "text": "Use only local cultural references", "isCorrect": false },
            { "text": "Use universal visuals and avoid culture-specific elements", "isCorrect": true },
            { "text": "Ignore audience diversity", "isCorrect": false },
            { "text": "Use complex jargon", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of timing in creating impactful motion graphics?",
          "options": [
            { "text": "It’s irrelevant", "isCorrect": false },
            { "text": "It ensures animations align with pacing and audience attention", "isCorrect": true },
            { "text": "It’s only for audio", "isCorrect": false },
            { "text": "It replaces visual design", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the advantage of using Lottie animations in motion design?",
          "options": [
            { "text": "They are only for 3D animation", "isCorrect": false },
            { "text": "They are lightweight and scalable for web and apps", "isCorrect": true },
            { "text": "They replace video files", "isCorrect": false },
            { "text": "They are used for audio editing", "isCorrect": false }
          ],
          "difficulty": "medium"
        }
      ],
      isAvailable : true,
      category : "Motion Designer"
    },
    {
      title : '3D Designer Level 1',
      questions : [
        {
          "questionType": "text",
          "text": "Which software is primarily used for 3D modeling and animation?",
          "options": [
            { "text": "Adobe After Effects", "isCorrect": false },
            { "text": "Blender", "isCorrect": true },
            { "text": "Adobe Premiere Pro", "isCorrect": false },
            { "text": "Final Cut Pro", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What is the purpose of UV mapping in 3D design?",
          "options": [
            { "text": "To animate objects", "isCorrect": false },
            { "text": "To apply textures to a 3D model", "isCorrect": true },
            { "text": "To adjust lighting", "isCorrect": false },
            { "text": "To rig a character", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "Which file format is best for exporting a 3D model with textures and animations?",
          "options": [
            { "text": "OBJ", "isCorrect": false },
            { "text": "FBX", "isCorrect": true },
            { "text": "STL", "isCorrect": false },
            { "text": "PNG", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What does the term 'normal mapping' refer to in 3D design?",
          "options": [
            { "text": "Adjusting object colors", "isCorrect": false },
            { "text": "Simulating lighting of bumps and dents on a surface", "isCorrect": true },
            { "text": "Creating animations", "isCorrect": false },
            { "text": "Rigging a model", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "Which feature in Blender allows you to reuse 3D assets across projects?",
          "options": [
            { "text": "Node Editor", "isCorrect": false },
            { "text": "Asset Browser", "isCorrect": true },
            { "text": "Render Layers", "isCorrect": false },
            { "text": "Outliner", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the primary advantage of using Autodesk Maya for 3D animation?",
          "options": [
            { "text": "2D motion graphics", "isCorrect": false },
            { "text": "Advanced character rigging and animation", "isCorrect": true },
            { "text": "Video editing", "isCorrect": false },
            { "text": "Audio synchronization", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "Which tool is commonly used for sculpting high-detail 3D models?",
          "options": [
            { "text": "Cinema 4D", "isCorrect": false },
            { "text": "ZBrush", "isCorrect": true },
            { "text": "Houdini", "isCorrect": false },
            { "text": "3ds Max", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the purpose of a rigging process in 3D design?",
          "options": [
            { "text": "To apply textures", "isCorrect": false },
            { "text": "To create a skeleton for animating a model", "isCorrect": true },
            { "text": "To render the final output", "isCorrect": false },
            { "text": "To adjust camera settings", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What does the term 'topology' refer to in 3D modeling?",
          "options": [
            { "text": "The color scheme of a model", "isCorrect": false },
            { "text": "The arrangement of vertices, edges, and faces", "isCorrect": true },
            { "text": "The animation keyframes", "isCorrect": false },
            { "text": "The lighting setup", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "Which render engine is known for its photorealistic output in Blender?",
          "options": [
            { "text": "Eevee", "isCorrect": false },
            { "text": "Cycles", "isCorrect": true },
            { "text": "Workbench", "isCorrect": false },
            { "text": "Freestyle", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you ensure a 3D design aligns with a client’s brand identity?",
          "options": [
            { "text": "Use random colors and shapes", "isCorrect": false },
            { "text": "Follow the brand’s style guide for colors and aesthetics", "isCorrect": true },
            { "text": "Copy competitor designs", "isCorrect": false },
            { "text": "Ignore brand guidelines", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What is the first step in your creative process for a new 3D design project?",
          "options": [
            { "text": "Start rendering immediately", "isCorrect": false },
            { "text": "Research the project brief and references", "isCorrect": true },
            { "text": "Export the model", "isCorrect": false },
            { "text": "Choose random assets", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you incorporate storytelling into 3D animations?",
          "options": [
            { "text": "Use complex models only", "isCorrect": false },
            { "text": "Create a narrative with visuals and camera work", "isCorrect": true },
            { "text": "Focus on lighting only", "isCorrect": false },
            { "text": "Avoid character animation", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you stay updated with the latest 3D design trends?",
          "options": [
            { "text": "Ignore trends and use old techniques", "isCorrect": false },
            { "text": "Follow industry blogs, tutorials, and forums", "isCorrect": true },
            { "text": "Copy other designers’ work", "isCorrect": false },
            { "text": "Avoid learning new tools", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What role does lighting play in 3D design?",
          "options": [
            { "text": "It’s optional", "isCorrect": false },
            { "text": "It enhances mood and realism", "isCorrect": true },
            { "text": "It replaces textures", "isCorrect": false },
            { "text": "It’s only for animations", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you balance creativity with client expectations in 3D design?",
          "options": [
            { "text": "Ignore client feedback", "isCorrect": false },
            { "text": "Align creative ideas with client goals", "isCorrect": true },
            { "text": "Use only pre-made models", "isCorrect": false },
            { "text": "Focus on creativity without constraints", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of using a reference board in 3D design?",
          "options": [
            { "text": "To render the final model", "isCorrect": false },
            { "text": "To define the visual style and inspiration", "isCorrect": true },
            { "text": "To write the project script", "isCorrect": false },
            { "text": "To adjust audio", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How would you handle a client requesting last-minute changes to a 3D model?",
          "options": [
            { "text": "Refuse the changes", "isCorrect": false },
            { "text": "Assess feasibility and communicate timelines", "isCorrect": true },
            { "text": "Ignore the request", "isCorrect": false },
            { "text": "Restart the project", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What would you do if a render fails due to insufficient system resources?",
          "options": [
            { "text": "Deliver incomplete work", "isCorrect": false },
            { "text": "Optimize the scene or use a render farm", "isCorrect": true },
            { "text": "Restart the software", "isCorrect": false },
            { "text": "Delete textures", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you address feedback that conflicts with 3D design best practices?",
          "options": [
            { "text": "Ignore the feedback", "isCorrect": false },
            { "text": "Explain best practices and propose alternatives", "isCorrect": true },
            { "text": "Follow the feedback blindly", "isCorrect": false },
            { "text": "Abandon the project", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What steps would you take if a client dislikes your 3D design draft?",
          "options": [
            { "text": "Defend the design without discussion", "isCorrect": false },
            { "text": "Ask for specific feedback and revise", "isCorrect": true },
            { "text": "Ignore the client’s opinion", "isCorrect": false },
            { "text": "Use a different designer’s work", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you manage tight deadlines without compromising 3D design quality?",
          "options": [
            { "text": "Skip quality checks", "isCorrect": false },
            { "text": "Prioritize tasks and optimize workflows", "isCorrect": true },
            { "text": "Deliver incomplete models", "isCorrect": false },
            { "text": "Avoid client communication", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What would you do if a project requires a skill you’re less experienced in, like fluid simulation?",
          "options": [
            { "text": "Decline the project", "isCorrect": false },
            { "text": "Learn the skill or collaborate with an expert", "isCorrect": true },
            { "text": "Fake the skill", "isCorrect": false },
            { "text": "Ignore the requirement", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you ensure a 3D model is optimized for real-time applications like games?",
          "options": [
            { "text": "Use high-polygon models", "isCorrect": false },
            { "text": "Reduce polygon count and optimize textures", "isCorrect": true },
            { "text": "Ignore performance", "isCorrect": false },
            { "text": "Use complex shaders", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the difference between 3D modeling and 3D sculpting?",
          "options": [
            { "text": "Modeling uses polygons, sculpting uses digital clay-like techniques", "isCorrect": true },
            { "text": "They are the same", "isCorrect": false },
            { "text": "Sculpting is only for animation", "isCorrect": false },
            { "text": "Modeling is only for games", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "Which industry trend is currently influencing 3D design?",
          "options": [
            { "text": "Real-time rendering", "isCorrect": true },
            { "text": "Black-and-white models", "isCorrect": false },
            { "text": "Static 2D graphics", "isCorrect": false },
            { "text": "Low-polygon designs only", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of a 3D Designer in a film production?",
          "options": [
            { "text": "Write the screenplay", "isCorrect": false },
            { "text": "Create models, environments, or animations", "isCorrect": true },
            { "text": "Manage the budget", "isCorrect": false },
            { "text": "Handle sound design", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "Why is understanding materials important for 3D designers?",
          "options": [
            { "text": "It’s irrelevant", "isCorrect": false },
            { "text": "It ensures realistic textures and lighting", "isCorrect": true },
            { "text": "It’s only for 2D design", "isCorrect": false },
            { "text": "It replaces animation", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of using procedural textures in 3D design?",
          "options": [
            { "text": "They increase file size", "isCorrect": false },
            { "text": "They are generated mathematically and highly customizable", "isCorrect": true },
            { "text": "They are only for animations", "isCorrect": false },
            { "text": "They replace models", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the significance of the 12 Principles of Animation in 3D design?",
          "options": [
            { "text": "They are outdated", "isCorrect": false },
            { "text": "They guide natural and appealing motion", "isCorrect": true },
            { "text": "They apply only to 2D animation", "isCorrect": false },
            { "text": "They are for texturing", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "Which platform is increasingly using 3D design for user engagement?",
          "options": [
            { "text": "Print media", "isCorrect": false },
            { "text": "Virtual reality", "isCorrect": true },
            { "text": "Radio", "isCorrect": false },
            { "text": "Newspapers", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What should a mid-level 3D Designer’s portfolio primarily showcase?",
          "options": [
            { "text": "Only personal projects", "isCorrect": false },
            { "text": "A variety of models, animations, and renders", "isCorrect": true },
            { "text": "Only 2D designs", "isCorrect": false },
            { "text": "Static images only", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How should a 3D Designer present their portfolio during an interview?",
          "options": [
            { "text": "Show all projects without explanation", "isCorrect": false },
            { "text": "Explain the process and impact of key projects", "isCorrect": true },
            { "text": "Focus only on technical skills", "isCorrect": false },
            { "text": "Avoid showing recent work", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "Why is it important to include client feedback in a 3D design portfolio?",
          "options": [
            { "text": "It’s unnecessary", "isCorrect": false },
            { "text": "It shows collaboration and client satisfaction", "isCorrect": true },
            { "text": "It replaces visuals", "isCorrect": false },
            { "text": "It’s only for senior designers", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "Which tool in Maya is used to create smooth animations?",
          "options": [
            { "text": "Hypershade", "isCorrect": false },
            { "text": "Graph Editor", "isCorrect": true },
            { "text": "Paint Effects", "isCorrect": false },
            { "text": "Node Editor", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the purpose of baking textures in 3D design?",
          "options": [
            { "text": "To animate models", "isCorrect": false },
            { "text": "To precompute lighting and shadows for performance", "isCorrect": true },
            { "text": "To rig characters", "isCorrect": false },
            { "text": "To export models", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you optimize a 3D scene for faster rendering?",
          "options": [
            { "text": "Increase polygon count", "isCorrect": false },
            { "text": "Reduce lights and simplify shaders", "isCorrect": true },
            { "text": "Add more textures", "isCorrect": false },
            { "text": "Use high-resolution models", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of using nodes in 3D software like Blender?",
          "options": [
            { "text": "To create animations", "isCorrect": false },
            { "text": "To create complex materials procedurally", "isCorrect": true },
            { "text": "To rig models", "isCorrect": false },
            { "text": "To export files", "isCorrect": false }
          ],
          "difficulty": "hard"
        },
        {
          "questionType": "text",
          "text": "How do you ensure accessibility in 3D animations for diverse audiences?",
          "options": [
            { "text": "Use low-contrast colors", "isCorrect": false },
            { "text": "Use clear visuals and descriptive audio", "isCorrect": true },
            { "text": "Avoid animations", "isCorrect": false },
            { "text": "Use complex models only", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of a proxy model in 3D design?",
          "options": [
            { "text": "To add textures", "isCorrect": false },
            { "text": "To use a low-poly model for faster workflows", "isCorrect": true },
            { "text": "To adjust lighting", "isCorrect": false },
            { "text": "To export animations", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you approach collaboration with a game developer on a 3D project?",
          "options": [
            { "text": "Work independently", "isCorrect": false },
            { "text": "Share optimized assets and align on specs", "isCorrect": true },
            { "text": "Take over their tasks", "isCorrect": false },
            { "text": "Ignore their feedback", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the advantage of using instancing in 3D design?",
          "options": [
            { "text": "It increases file size", "isCorrect": false },
            { "text": "It duplicates objects efficiently without extra memory", "isCorrect": true },
            { "text": "It’s only for animations", "isCorrect": false },
            { "text": "It replaces textures", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you handle a client’s budget that’s too low for a 3D project scope?",
          "options": [
            { "text": "Agree and overwork", "isCorrect": false },
            { "text": "Negotiate scope or suggest alternatives", "isCorrect": true },
            { "text": "Reject the project", "isCorrect": false },
            { "text": "Ignore the budget", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the purpose of a concept sculpt in 3D design?",
          "options": [
            { "text": "To render the final model", "isCorrect": false },
            { "text": "To establish the design before detailed modeling", "isCorrect": true },
            { "text": "To animate the model", "isCorrect": false },
            { "text": "To adjust lighting", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you test a 3D model’s compatibility with a game engine?",
          "options": [
            { "text": "Render it in high resolution", "isCorrect": false },
            { "text": "Import and test in the engine", "isCorrect": true },
            { "text": "Only test in the 3D software", "isCorrect": false },
            { "text": "Avoid testing", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of using a real-time render engine like Unreal Engine?",
          "options": [
            { "text": "It’s only for static images", "isCorrect": false },
            { "text": "It allows instant visualization and iteration", "isCorrect": true },
            { "text": "It replaces texturing", "isCorrect": false },
            { "text": "It’s for audio editing", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you approach creating a 3D model for a global audience?",
          "options": [
            { "text": "Use local cultural references", "isCorrect": false },
            { "text": "Use universal designs and avoid specific symbols", "isCorrect": true },
            { "text": "Ignore audience diversity", "isCorrect": false },
            { "text": "Use complex details", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of camera work in 3D animation?",
          "options": [
            { "text": "It’s irrelevant", "isCorrect": false },
            { "text": "It guides the viewer’s perspective and storytelling", "isCorrect": true },
            { "text": "It’s only for texturing", "isCorrect": false },
            { "text": "It replaces models", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you prioritize tasks in a multi-project 3D design workflow?",
          "options": [
            { "text": "Work on all projects simultaneously", "isCorrect": false },
            { "text": "Set priorities based on deadlines and complexity", "isCorrect": true },
            { "text": "Focus only on one project", "isCorrect": false },
            { "text": "Avoid planning", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the advantage of using PBR (Physically Based Rendering) in 3D design?",
          "options": [
            { "text": "It’s only for 2D design", "isCorrect": false },
            { "text": "It ensures realistic lighting and materials", "isCorrect": true },
            { "text": "It replaces animation", "isCorrect": false },
            { "text": "It increases render time", "isCorrect": false }
          ],
          "difficulty": "medium"
        }
      ],
      isAvailable : true,
      category : "3D Designer"
    },
    {
      title : '3D Designer Level 2',
      questions : [
        {
          "questionType": "text",
          "text": "Which software is primarily used for 3D modeling and animation?",
          "options": [
            { "text": "Adobe After Effects", "isCorrect": false },
            { "text": "Blender", "isCorrect": true },
            { "text": "Adobe Premiere Pro", "isCorrect": false },
            { "text": "Final Cut Pro", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What is the purpose of UV mapping in 3D design?",
          "options": [
            { "text": "To animate objects", "isCorrect": false },
            { "text": "To apply textures to a 3D model", "isCorrect": true },
            { "text": "To adjust lighting", "isCorrect": false },
            { "text": "To rig a character", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "Which file format is best for exporting a 3D model with textures and animations?",
          "options": [
            { "text": "OBJ", "isCorrect": false },
            { "text": "FBX", "isCorrect": true },
            { "text": "STL", "isCorrect": false },
            { "text": "PNG", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What does the term 'normal mapping' refer to in 3D design?",
          "options": [
            { "text": "Adjusting object colors", "isCorrect": false },
            { "text": "Simulating lighting of bumps and dents on a surface", "isCorrect": true },
            { "text": "Creating animations", "isCorrect": false },
            { "text": "Rigging a model", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "Which feature in Blender allows you to reuse 3D assets across projects?",
          "options": [
            { "text": "Node Editor", "isCorrect": false },
            { "text": "Asset Browser", "isCorrect": true },
            { "text": "Render Layers", "isCorrect": false },
            { "text": "Outliner", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the primary advantage of using Autodesk Maya for 3D animation?",
          "options": [
            { "text": "2D motion graphics", "isCorrect": false },
            { "text": "Advanced character rigging and animation", "isCorrect": true },
            { "text": "Video editing", "isCorrect": false },
            { "text": "Audio synchronization", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "Which tool is commonly used for sculpting high-detail 3D models?",
          "options": [
            { "text": "Cinema 4D", "isCorrect": false },
            { "text": "ZBrush", "isCorrect": true },
            { "text": "Houdini", "isCorrect": false },
            { "text": "3ds Max", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the purpose of a rigging process in 3D design?",
          "options": [
            { "text": "To apply textures", "isCorrect": false },
            { "text": "To create a skeleton for animating a model", "isCorrect": true },
            { "text": "To render the final output", "isCorrect": false },
            { "text": "To adjust camera settings", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What does the term 'topology' refer to in 3D modeling?",
          "options": [
            { "text": "The color scheme of a model", "isCorrect": false },
            { "text": "The arrangement of vertices, edges, and faces", "isCorrect": true },
            { "text": "The animation keyframes", "isCorrect": false },
            { "text": "The lighting setup", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "Which render engine is known for its photorealistic output in Blender?",
          "options": [
            { "text": "Eevee", "isCorrect": false },
            { "text": "Cycles", "isCorrect": true },
            { "text": "Workbench", "isCorrect": false },
            { "text": "Freestyle", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you ensure a 3D design aligns with a client’s brand identity?",
          "options": [
            { "text": "Use random colors and shapes", "isCorrect": false },
            { "text": "Follow the brand’s style guide for colors and aesthetics", "isCorrect": true },
            { "text": "Copy competitor designs", "isCorrect": false },
            { "text": "Ignore brand guidelines", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What is the first step in your creative process for a new 3D design project?",
          "options": [
            { "text": "Start rendering immediately", "isCorrect": false },
            { "text": "Research the project brief and references", "isCorrect": true },
            { "text": "Export the model", "isCorrect": false },
            { "text": "Choose random assets", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you incorporate storytelling into 3D animations?",
          "options": [
            { "text": "Use complex models only", "isCorrect": false },
            { "text": "Create a narrative with visuals and camera work", "isCorrect": true },
            { "text": "Focus on lighting only", "isCorrect": false },
            { "text": "Avoid character animation", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you stay updated with the latest 3D design trends?",
          "options": [
            { "text": "Ignore trends and use old techniques", "isCorrect": false },
            { "text": "Follow industry blogs, tutorials, and forums", "isCorrect": true },
            { "text": "Copy other designers’ work", "isCorrect": false },
            { "text": "Avoid learning new tools", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What role does lighting play in 3D design?",
          "options": [
            { "text": "It’s optional", "isCorrect": false },
            { "text": "It enhances mood and realism", "isCorrect": true },
            { "text": "It replaces textures", "isCorrect": false },
            { "text": "It’s only for animations", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you balance creativity with client expectations in 3D design?",
          "options": [
            { "text": "Ignore client feedback", "isCorrect": false },
            { "text": "Align creative ideas with client goals", "isCorrect": true },
            { "text": "Use only pre-made models", "isCorrect": false },
            { "text": "Focus on creativity without constraints", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of using a reference board in 3D design?",
          "options": [
            { "text": "To render the final model", "isCorrect": false },
            { "text": "To define the visual style and inspiration", "isCorrect": true },
            { "text": "To write the project script", "isCorrect": false },
            { "text": "To adjust audio", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How would you handle a client requesting last-minute changes to a 3D model?",
          "options": [
            { "text": "Refuse the changes", "isCorrect": false },
            { "text": "Assess feasibility and communicate timelines", "isCorrect": true },
            { "text": "Ignore the request", "isCorrect": false },
            { "text": "Restart the project", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What would you do if a render fails due to insufficient system resources?",
          "options": [
            { "text": "Deliver incomplete work", "isCorrect": false },
            { "text": "Optimize the scene or use a render farm", "isCorrect": true },
            { "text": "Restart the software", "isCorrect": false },
            { "text": "Delete textures", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you address feedback that conflicts with 3D design best practices?",
          "options": [
            { "text": "Ignore the feedback", "isCorrect": false },
            { "text": "Explain best practices and propose alternatives", "isCorrect": true },
            { "text": "Follow the feedback blindly", "isCorrect": false },
            { "text": "Abandon the project", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What steps would you take if a client dislikes your 3D design draft?",
          "options": [
            { "text": "Defend the design without discussion", "isCorrect": false },
            { "text": "Ask for specific feedback and revise", "isCorrect": true },
            { "text": "Ignore the client’s opinion", "isCorrect": false },
            { "text": "Use a different designer’s work", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you manage tight deadlines without compromising 3D design quality?",
          "options": [
            { "text": "Skip quality checks", "isCorrect": false },
            { "text": "Prioritize tasks and optimize workflows", "isCorrect": true },
            { "text": "Deliver incomplete models", "isCorrect": false },
            { "text": "Avoid client communication", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What would you do if a project requires a skill you’re less experienced in, like fluid simulation?",
          "options": [
            { "text": "Decline the project", "isCorrect": false },
            { "text": "Learn the skill or collaborate with an expert", "isCorrect": true },
            { "text": "Fake the skill", "isCorrect": false },
            { "text": "Ignore the requirement", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you ensure a 3D model is optimized for real-time applications like games?",
          "options": [
            { "text": "Use high-polygon models", "isCorrect": false },
            { "text": "Reduce polygon count and optimize textures", "isCorrect": true },
            { "text": "Ignore performance", "isCorrect": false },
            { "text": "Use complex shaders", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the difference between 3D modeling and 3D sculpting?",
          "options": [
            { "text": "Modeling uses polygons, sculpting uses digital clay-like techniques", "isCorrect": true },
            { "text": "They are the same", "isCorrect": false },
            { "text": "Sculpting is only for animation", "isCorrect": false },
            { "text": "Modeling is only for games", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "Which industry trend is currently influencing 3D design?",
          "options": [
            { "text": "Real-time rendering", "isCorrect": true },
            { "text": "Black-and-white models", "isCorrect": false },
            { "text": "Static 2D graphics", "isCorrect": false },
            { "text": "Low-polygon designs only", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of a 3D Designer in a film production?",
          "options": [
            { "text": "Write the screenplay", "isCorrect": false },
            { "text": "Create models, environments, or animations", "isCorrect": true },
            { "text": "Manage the budget", "isCorrect": false },
            { "text": "Handle sound design", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "Why is understanding materials important for 3D designers?",
          "options": [
            { "text": "It’s irrelevant", "isCorrect": false },
            { "text": "It ensures realistic textures and lighting", "isCorrect": true },
            { "text": "It’s only for 2D design", "isCorrect": false },
            { "text": "It replaces animation", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of using procedural textures in 3D design?",
          "options": [
            { "text": "They increase file size", "isCorrect": false },
            { "text": "They are generated mathematically and highly customizable", "isCorrect": true },
            { "text": "They are only for animations", "isCorrect": false },
            { "text": "They replace models", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the significance of the 12 Principles of Animation in 3D design?",
          "options": [
            { "text": "They are outdated", "isCorrect": false },
            { "text": "They guide natural and appealing motion", "isCorrect": true },
            { "text": "They apply only to 2D animation", "isCorrect": false },
            { "text": "They are for texturing", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "Which platform is increasingly using 3D design for user engagement?",
          "options": [
            { "text": "Print media", "isCorrect": false },
            { "text": "Virtual reality", "isCorrect": true },
            { "text": "Radio", "isCorrect": false },
            { "text": "Newspapers", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What should a mid-level 3D Designer’s portfolio primarily showcase?",
          "options": [
            { "text": "Only personal projects", "isCorrect": false },
            { "text": "A variety of models, animations, and renders", "isCorrect": true },
            { "text": "Only 2D designs", "isCorrect": false },
            { "text": "Static images only", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How should a 3D Designer present their portfolio during an interview?",
          "options": [
            { "text": "Show all projects without explanation", "isCorrect": false },
            { "text": "Explain the process and impact of key projects", "isCorrect": true },
            { "text": "Focus only on technical skills", "isCorrect": false },
            { "text": "Avoid showing recent work", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "Why is it important to include client feedback in a 3D design portfolio?",
          "options": [
            { "text": "It’s unnecessary", "isCorrect": false },
            { "text": "It shows collaboration and client satisfaction", "isCorrect": true },
            { "text": "It replaces visuals", "isCorrect": false },
            { "text": "It’s only for senior designers", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "Which tool in Maya is used to create smooth animations?",
          "options": [
            { "text": "Hypershade", "isCorrect": false },
            { "text": "Graph Editor", "isCorrect": true },
            { "text": "Paint Effects", "isCorrect": false },
            { "text": "Node Editor", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the purpose of baking textures in 3D design?",
          "options": [
            { "text": "To animate models", "isCorrect": false },
            { "text": "To precompute lighting and shadows for performance", "isCorrect": true },
            { "text": "To rig characters", "isCorrect": false },
            { "text": "To export models", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you optimize a 3D scene for faster rendering?",
          "options": [
            { "text": "Increase polygon count", "isCorrect": false },
            { "text": "Reduce lights and simplify shaders", "isCorrect": true },
            { "text": "Add more textures", "isCorrect": false },
            { "text": "Use high-resolution models", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of using nodes in 3D software like Blender?",
          "options": [
            { "text": "To create animations", "isCorrect": false },
            { "text": "To create complex materials procedurally", "isCorrect": true },
            { "text": "To rig models", "isCorrect": false },
            { "text": "To export files", "isCorrect": false }
          ],
          "difficulty": "hard"
        },
        {
          "questionType": "text",
          "text": "How do you ensure accessibility in 3D animations for diverse audiences?",
          "options": [
            { "text": "Use low-contrast colors", "isCorrect": false },
            { "text": "Use clear visuals and descriptive audio", "isCorrect": true },
            { "text": "Avoid animations", "isCorrect": false },
            { "text": "Use complex models only", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of a proxy model in 3D design?",
          "options": [
            { "text": "To add textures", "isCorrect": false },
            { "text": "To use a low-poly model for faster workflows", "isCorrect": true },
            { "text": "To adjust lighting", "isCorrect": false },
            { "text": "To export animations", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you approach collaboration with a game developer on a 3D project?",
          "options": [
            { "text": "Work independently", "isCorrect": false },
            { "text": "Share optimized assets and align on specs", "isCorrect": true },
            { "text": "Take over their tasks", "isCorrect": false },
            { "text": "Ignore their feedback", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the advantage of using instancing in 3D design?",
          "options": [
            { "text": "It increases file size", "isCorrect": false },
            { "text": "It duplicates objects efficiently without extra memory", "isCorrect": true },
            { "text": "It’s only for animations", "isCorrect": false },
            { "text": "It replaces textures", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you handle a client’s budget that’s too low for a 3D project scope?",
          "options": [
            { "text": "Agree and overwork", "isCorrect": false },
            { "text": "Negotiate scope or suggest alternatives", "isCorrect": true },
            { "text": "Reject the project", "isCorrect": false },
            { "text": "Ignore the budget", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the purpose of a concept sculpt in 3D design?",
          "options": [
            { "text": "To render the final model", "isCorrect": false },
            { "text": "To establish the design before detailed modeling", "isCorrect": true },
            { "text": "To animate the model", "isCorrect": false },
            { "text": "To adjust lighting", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you test a 3D model’s compatibility with a game engine?",
          "options": [
            { "text": "Render it in high resolution", "isCorrect": false },
            { "text": "Import and test in the engine", "isCorrect": true },
            { "text": "Only test in the 3D software", "isCorrect": false },
            { "text": "Avoid testing", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of using a real-time render engine like Unreal Engine?",
          "options": [
            { "text": "It’s only for static images", "isCorrect": false },
            { "text": "It allows instant visualization and iteration", "isCorrect": true },
            { "text": "It replaces texturing", "isCorrect": false },
            { "text": "It’s for audio editing", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you approach creating a 3D model for a global audience?",
          "options": [
            { "text": "Use local cultural references", "isCorrect": false },
            { "text": "Use universal designs and avoid specific symbols", "isCorrect": true },
            { "text": "Ignore audience diversity", "isCorrect": false },
            { "text": "Use complex details", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of camera work in 3D animation?",
          "options": [
            { "text": "It’s irrelevant", "isCorrect": false },
            { "text": "It guides the viewer’s perspective and storytelling", "isCorrect": true },
            { "text": "It’s only for texturing", "isCorrect": false },
            { "text": "It replaces models", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you prioritize tasks in a multi-project 3D design workflow?",
          "options": [
            { "text": "Work on all projects simultaneously", "isCorrect": false },
            { "text": "Set priorities based on deadlines and complexity", "isCorrect": true },
            { "text": "Focus only on one project", "isCorrect": false },
            { "text": "Avoid planning", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the advantage of using PBR (Physically Based Rendering) in 3D design?",
          "options": [
            { "text": "It’s only for 2D design", "isCorrect": false },
            { "text": "It ensures realistic lighting and materials", "isCorrect": true },
            { "text": "It replaces animation", "isCorrect": false },
            { "text": "It increases render time", "isCorrect": false }
          ],
          "difficulty": "medium"
        }
      ],
      isAvailable : true,
      category : "3D Designer"
    },
    {
      title : 'Creative Director Level 1',
      questions : [
        {
          "questionType": "text",
          "text": "What is the primary role of a Creative Director in a project?",
          "options": [
            { "text": "Managing budgets only", "isCorrect": false },
            { "text": "Guiding the creative vision and team", "isCorrect": true },
            { "text": "Coding the project", "isCorrect": false },
            { "text": "Handling logistics", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you ensure a creative project aligns with a client’s brand identity?",
          "options": [
            { "text": "Use random aesthetics", "isCorrect": false },
            { "text": "Follow the brand’s style guide and values", "isCorrect": true },
            { "text": "Copy competitor campaigns", "isCorrect": false },
            { "text": "Ignore brand guidelines", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What is the first step in developing a creative strategy for a new campaign?",
          "options": [
            { "text": "Start designing immediately", "isCorrect": false },
            { "text": "Research the client, audience, and goals", "isCorrect": true },
            { "text": "Launch the campaign", "isCorrect": false },
            { "text": "Choose random visuals", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you balance creativity with business objectives?",
          "options": [
            { "text": "Focus only on creativity", "isCorrect": false },
            { "text": "Align creative ideas with client goals and metrics", "isCorrect": true },
            { "text": "Ignore business goals", "isCorrect": false },
            { "text": "Use pre-made templates only", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the purpose of a creative brief?",
          "options": [
            { "text": "To finalize the budget", "isCorrect": false },
            { "text": "To outline project goals, audience, and deliverables", "isCorrect": true },
            { "text": "To design the visuals", "isCorrect": false },
            { "text": "To manage team schedules", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you motivate a creative team during a challenging project?",
          "options": [
            { "text": "Ignore their concerns", "isCorrect": false },
            { "text": "Provide clear direction and recognize contributions", "isCorrect": true },
            { "text": "Micromanage every task", "isCorrect": false },
            { "text": "Reduce project scope", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of conducting a competitor analysis before a campaign?",
          "options": [
            { "text": "To copy their work", "isCorrect": false },
            { "text": "To identify gaps and opportunities", "isCorrect": true },
            { "text": "To reduce project costs", "isCorrect": false },
            { "text": "To avoid creative work", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you handle a client who dislikes your team’s creative proposal?",
          "options": [
            { "text": "Defend the proposal without discussion", "isCorrect": false },
            { "text": "Seek specific feedback and propose revisions", "isCorrect": true },
            { "text": "Ignore the client", "isCorrect": false },
            { "text": "Abandon the project", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "Which tool is commonly used for collaborative creative project management?",
          "options": [
            { "text": "Microsoft Word", "isCorrect": false },
            { "text": "Trello", "isCorrect": true },
            { "text": "Adobe Photoshop", "isCorrect": false },
            { "text": "Windows Explorer", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What does the term 'art direction' refer to in creative projects?",
          "options": [
            { "text": "Managing budgets", "isCorrect": false },
            { "text": "Defining the visual style and aesthetics", "isCorrect": true },
            { "text": "Writing copy", "isCorrect": false },
            { "text": "Scheduling tasks", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you ensure a campaign resonates with a diverse audience?",
          "options": [
            { "text": "Use local cultural references only", "isCorrect": false },
            { "text": "Incorporate inclusive visuals and messaging", "isCorrect": true },
            { "text": "Ignore audience diversity", "isCorrect": false },
            { "text": "Use complex jargon", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of storytelling in a creative campaign?",
          "options": [
            { "text": "It’s optional", "isCorrect": false },
            { "text": "It engages audiences emotionally", "isCorrect": true },
            { "text": "It replaces visuals", "isCorrect": false },
            { "text": "It’s only for print media", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you measure the success of a creative campaign?",
          "options": [
            { "text": "By personal opinion", "isCorrect": false },
            { "text": "By KPIs like engagement and ROI", "isCorrect": true },
            { "text": "By team size", "isCorrect": false },
            { "text": "By project budget", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of a mood board in creative direction?",
          "options": [
            { "text": "To finalize the budget", "isCorrect": false },
            { "text": "To establish the visual tone and inspiration", "isCorrect": true },
            { "text": "To write the script", "isCorrect": false },
            { "text": "To manage timelines", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you handle conflicting feedback from multiple stakeholders?",
          "options": [
            { "text": "Follow the loudest voice", "isCorrect": false },
            { "text": "Facilitate discussion to align on priorities", "isCorrect": true },
            { "text": "Ignore all feedback", "isCorrect": false },
            { "text": "Delay the project", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the importance of typography in a creative campaign?",
          "options": [
            { "text": "It’s irrelevant", "isCorrect": false },
            { "text": "It enhances readability and brand identity", "isCorrect": true },
            { "text": "It’s only for print", "isCorrect": false },
            { "text": "It replaces visuals", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you stay updated with creative industry trends?",
          "options": [
            { "text": "Ignore trends", "isCorrect": false },
            { "text": "Follow blogs, awards, and conferences", "isCorrect": true },
            { "text": "Copy competitors", "isCorrect": false },
            { "text": "Avoid new tools", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What is the role of a Creative Director in managing a budget?",
          "options": [
            { "text": "Solely responsible for finances", "isCorrect": false },
            { "text": "Align creative deliverables with budget constraints", "isCorrect": true },
            { "text": "Ignore the budget", "isCorrect": false },
            { "text": "Handle all accounting", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you approach a project with a tight deadline?",
          "options": [
            { "text": "Skip planning", "isCorrect": false },
            { "text": "Prioritize tasks and streamline processes", "isCorrect": true },
            { "text": "Reduce team size", "isCorrect": false },
            { "text": "Ignore quality", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of cross-department collaboration in creative projects?",
          "options": [
            { "text": "It slows down the process", "isCorrect": false },
            { "text": "It ensures holistic and effective outcomes", "isCorrect": true },
            { "text": "It’s unnecessary", "isCorrect": false },
            { "text": "It replaces creative work", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you ensure a creative team meets project deadlines?",
          "options": [
            { "text": "Micromanage every task", "isCorrect": false },
            { "text": "Set clear milestones and track progress", "isCorrect": true },
            { "text": "Avoid timelines", "isCorrect": false },
            { "text": "Reduce project scope", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of user feedback in shaping a creative campaign?",
          "options": [
            { "text": "It’s irrelevant", "isCorrect": false },
            { "text": "It refines the campaign for better engagement", "isCorrect": true },
            { "text": "It replaces the creative vision", "isCorrect": false },
            { "text": "It’s only for final stages", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you handle a team member who underperforms creatively?",
          "options": [
            { "text": "Ignore the issue", "isCorrect": false },
            { "text": "Provide constructive feedback and support", "isCorrect": true },
            { "text": "Replace them immediately", "isCorrect": false },
            { "text": "Reduce their tasks", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the significance of a creative pitch to a client?",
          "options": [
            { "text": "To finalize the budget", "isCorrect": false },
            { "text": "To sell the creative vision and strategy", "isCorrect": true },
            { "text": "To deliver the final product", "isCorrect": false },
            { "text": "To manage timelines", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you incorporate data-driven insights into creative decisions?",
          "options": [
            { "text": "Ignore data", "isCorrect": false },
            { "text": "Use data to inform audience targeting and design", "isCorrect": true },
            { "text": "Rely only on data", "isCorrect": false },
            { "text": "Avoid analytics", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of color theory in creative direction?",
          "options": [
            { "text": "It’s optional", "isCorrect": false },
            { "text": "It evokes emotions and reinforces branding", "isCorrect": true },
            { "text": "It’s only for print", "isCorrect": false },
            { "text": "It replaces storytelling", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you approach a project requiring a new skill, like AR design?",
          "options": [
            { "text": "Decline the project", "isCorrect": false },
            { "text": "Learn or collaborate with specialists", "isCorrect": true },
            { "text": "Fake the expertise", "isCorrect": false },
            { "text": "Ignore the requirement", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of A/B testing in creative campaigns?",
          "options": [
            { "text": "It increases costs", "isCorrect": false },
            { "text": "It identifies the most effective creative elements", "isCorrect": true },
            { "text": "It’s unnecessary", "isCorrect": false },
            { "text": "It replaces the creative brief", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you ensure accessibility in creative campaigns?",
          "options": [
            { "text": "Use low-contrast designs", "isCorrect": false },
            { "text": "Incorporate captions and high-contrast visuals", "isCorrect": true },
            { "text": "Ignore accessibility", "isCorrect": false },
            { "text": "Use complex visuals only", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of a Creative Director in a rebranding project?",
          "options": [
            { "text": "Handle logistics only", "isCorrect": false },
            { "text": "Define the new brand identity and visuals", "isCorrect": true },
            { "text": "Manage finances only", "isCorrect": false },
            { "text": "Write press releases", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you prioritize tasks in a multi-campaign workflow?",
          "options": [
            { "text": "Work on all campaigns simultaneously", "isCorrect": false },
            { "text": "Set priorities based on deadlines and impact", "isCorrect": true },
            { "text": "Focus on one campaign only", "isCorrect": false },
            { "text": "Avoid planning", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the advantage of using a style guide in creative projects?",
          "options": [
            { "text": "It slows down the process", "isCorrect": false },
            { "text": "It ensures consistency across deliverables", "isCorrect": true },
            { "text": "It’s only for print", "isCorrect": false },
            { "text": "It replaces the creative brief", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you handle a client with unrealistic expectations?",
          "options": [
            { "text": "Agree to everything", "isCorrect": false },
            { "text": "Educate them and propose feasible solutions", "isCorrect": true },
            { "text": "Ignore their requests", "isCorrect": false },
            { "text": "Abandon the project", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of prototyping in creative direction?",
          "options": [
            { "text": "To finalize the budget", "isCorrect": false },
            { "text": "To test and refine concepts early", "isCorrect": true },
            { "text": "To deliver the final product", "isCorrect": false },
            { "text": "To manage team schedules", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you foster innovation within a creative team?",
          "options": [
            { "text": "Enforce strict guidelines", "isCorrect": false },
            { "text": "Encourage experimentation and brainstorming", "isCorrect": true },
            { "text": "Limit team input", "isCorrect": false },
            { "text": "Use only existing ideas", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of post-campaign analysis?",
          "options": [
            { "text": "It’s unnecessary", "isCorrect": false },
            { "text": "It identifies strengths and areas for improvement", "isCorrect": true },
            { "text": "It increases costs", "isCorrect": false },
            { "text": "It replaces the creative brief", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you approach a campaign for a global market?",
          "options": [
            { "text": "Use local references only", "isCorrect": false },
            { "text": "Use universal themes and cultural sensitivity", "isCorrect": true },
            { "text": "Ignore global audiences", "isCorrect": false },
            { "text": "Use complex visuals", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of a Creative Director in a pitch presentation?",
          "options": [
            { "text": "Handle logistics only", "isCorrect": false },
            { "text": "Communicate the vision and strategy", "isCorrect": true },
            { "text": "Manage finances", "isCorrect": false },
            { "text": "Avoid client interaction", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you ensure a creative campaign is sustainable?",
          "options": [
            { "text": "Use high-cost materials", "isCorrect": false },
            { "text": "Incorporate eco-friendly practices and messaging", "isCorrect": true },
            { "text": "Ignore sustainability", "isCorrect": false },
            { "text": "Focus only on visuals", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What should a Creative Director’s portfolio primarily showcase?",
          "options": [
            { "text": "Only personal projects", "isCorrect": false },
            { "text": "Diverse campaigns with measurable impact", "isCorrect": true },
            { "text": "Only technical skills", "isCorrect": false },
            { "text": "Static designs only", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you present your creative work during an interview?",
          "options": [
            { "text": "Show all work without context", "isCorrect": false },
            { "text": "Explain the strategy and results of key projects", "isCorrect": true },
            { "text": "Focus only on visuals", "isCorrect": false },
            { "text": "Avoid discussing recent work", "isCorrect": false }
          ],
          "difficulty": "medium"
        }
      ],
      isAvailable : true,
      category : "Creative Director"
    },
    {
      title : 'Creative Director Level 2',
      questions : [
        {
          "questionType": "text",
          "text": "What is the primary role of a Creative Director in a project?",
          "options": [
            { "text": "Managing budgets only", "isCorrect": false },
            { "text": "Guiding the creative vision and team", "isCorrect": true },
            { "text": "Coding the project", "isCorrect": false },
            { "text": "Handling logistics", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you ensure a creative project aligns with a client’s brand identity?",
          "options": [
            { "text": "Use random aesthetics", "isCorrect": false },
            { "text": "Follow the brand’s style guide and values", "isCorrect": true },
            { "text": "Copy competitor campaigns", "isCorrect": false },
            { "text": "Ignore brand guidelines", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What is the first step in developing a creative strategy for a new campaign?",
          "options": [
            { "text": "Start designing immediately", "isCorrect": false },
            { "text": "Research the client, audience, and goals", "isCorrect": true },
            { "text": "Launch the campaign", "isCorrect": false },
            { "text": "Choose random visuals", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you balance creativity with business objectives?",
          "options": [
            { "text": "Focus only on creativity", "isCorrect": false },
            { "text": "Align creative ideas with client goals and metrics", "isCorrect": true },
            { "text": "Ignore business goals", "isCorrect": false },
            { "text": "Use pre-made templates only", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the purpose of a creative brief?",
          "options": [
            { "text": "To finalize the budget", "isCorrect": false },
            { "text": "To outline project goals, audience, and deliverables", "isCorrect": true },
            { "text": "To design the visuals", "isCorrect": false },
            { "text": "To manage team schedules", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you motivate a creative team during a challenging project?",
          "options": [
            { "text": "Ignore their concerns", "isCorrect": false },
            { "text": "Provide clear direction and recognize contributions", "isCorrect": true },
            { "text": "Micromanage every task", "isCorrect": false },
            { "text": "Reduce project scope", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of conducting a competitor analysis before a campaign?",
          "options": [
            { "text": "To copy their work", "isCorrect": false },
            { "text": "To identify gaps and opportunities", "isCorrect": true },
            { "text": "To reduce project costs", "isCorrect": false },
            { "text": "To avoid creative work", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you handle a client who dislikes your team’s creative proposal?",
          "options": [
            { "text": "Defend the proposal without discussion", "isCorrect": false },
            { "text": "Seek specific feedback and propose revisions", "isCorrect": true },
            { "text": "Ignore the client", "isCorrect": false },
            { "text": "Abandon the project", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "Which tool is commonly used for collaborative creative project management?",
          "options": [
            { "text": "Microsoft Word", "isCorrect": false },
            { "text": "Trello", "isCorrect": true },
            { "text": "Adobe Photoshop", "isCorrect": false },
            { "text": "Windows Explorer", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What does the term 'art direction' refer to in creative projects?",
          "options": [
            { "text": "Managing budgets", "isCorrect": false },
            { "text": "Defining the visual style and aesthetics", "isCorrect": true },
            { "text": "Writing copy", "isCorrect": false },
            { "text": "Scheduling tasks", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you ensure a campaign resonates with a diverse audience?",
          "options": [
            { "text": "Use local cultural references only", "isCorrect": false },
            { "text": "Incorporate inclusive visuals and messaging", "isCorrect": true },
            { "text": "Ignore audience diversity", "isCorrect": false },
            { "text": "Use complex jargon", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of storytelling in a creative campaign?",
          "options": [
            { "text": "It’s optional", "isCorrect": false },
            { "text": "It engages audiences emotionally", "isCorrect": true },
            { "text": "It replaces visuals", "isCorrect": false },
            { "text": "It’s only for print media", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you measure the success of a creative campaign?",
          "options": [
            { "text": "By personal opinion", "isCorrect": false },
            { "text": "By KPIs like engagement and ROI", "isCorrect": true },
            { "text": "By team size", "isCorrect": false },
            { "text": "By project budget", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of a mood board in creative direction?",
          "options": [
            { "text": "To finalize the budget", "isCorrect": false },
            { "text": "To establish the visual tone and inspiration", "isCorrect": true },
            { "text": "To write the script", "isCorrect": false },
            { "text": "To manage timelines", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you handle conflicting feedback from multiple stakeholders?",
          "options": [
            { "text": "Follow the loudest voice", "isCorrect": false },
            { "text": "Facilitate discussion to align on priorities", "isCorrect": true },
            { "text": "Ignore all feedback", "isCorrect": false },
            { "text": "Delay the project", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the importance of typography in a creative campaign?",
          "options": [
            { "text": "It’s irrelevant", "isCorrect": false },
            { "text": "It enhances readability and brand identity", "isCorrect": true },
            { "text": "It’s only for print", "isCorrect": false },
            { "text": "It replaces visuals", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you stay updated with creative industry trends?",
          "options": [
            { "text": "Ignore trends", "isCorrect": false },
            { "text": "Follow blogs, awards, and conferences", "isCorrect": true },
            { "text": "Copy competitors", "isCorrect": false },
            { "text": "Avoid new tools", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What is the role of a Creative Director in managing a budget?",
          "options": [
            { "text": "Solely responsible for finances", "isCorrect": false },
            { "text": "Align creative deliverables with budget constraints", "isCorrect": true },
            { "text": "Ignore the budget", "isCorrect": false },
            { "text": "Handle all accounting", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you approach a project with a tight deadline?",
          "options": [
            { "text": "Skip planning", "isCorrect": false },
            { "text": "Prioritize tasks and streamline processes", "isCorrect": true },
            { "text": "Reduce team size", "isCorrect": false },
            { "text": "Ignore quality", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of cross-department collaboration in creative projects?",
          "options": [
            { "text": "It slows down the process", "isCorrect": false },
            { "text": "It ensures holistic and effective outcomes", "isCorrect": true },
            { "text": "It’s unnecessary", "isCorrect": false },
            { "text": "It replaces creative work", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you ensure a creative team meets project deadlines?",
          "options": [
            { "text": "Micromanage every task", "isCorrect": false },
            { "text": "Set clear milestones and track progress", "isCorrect": true },
            { "text": "Avoid timelines", "isCorrect": false },
            { "text": "Reduce project scope", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of user feedback in shaping a creative campaign?",
          "options": [
            { "text": "It’s irrelevant", "isCorrect": false },
            { "text": "It refines the campaign for better engagement", "isCorrect": true },
            { "text": "It replaces the creative vision", "isCorrect": false },
            { "text": "It’s only for final stages", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you handle a team member who underperforms creatively?",
          "options": [
            { "text": "Ignore the issue", "isCorrect": false },
            { "text": "Provide constructive feedback and support", "isCorrect": true },
            { "text": "Replace them immediately", "isCorrect": false },
            { "text": "Reduce their tasks", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the significance of a creative pitch to a client?",
          "options": [
            { "text": "To finalize the budget", "isCorrect": false },
            { "text": "To sell the creative vision and strategy", "isCorrect": true },
            { "text": "To deliver the final product", "isCorrect": false },
            { "text": "To manage timelines", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you incorporate data-driven insights into creative decisions?",
          "options": [
            { "text": "Ignore data", "isCorrect": false },
            { "text": "Use data to inform audience targeting and design", "isCorrect": true },
            { "text": "Rely only on data", "isCorrect": false },
            { "text": "Avoid analytics", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of color theory in creative direction?",
          "options": [
            { "text": "It’s optional", "isCorrect": false },
            { "text": "It evokes emotions and reinforces branding", "isCorrect": true },
            { "text": "It’s only for print", "isCorrect": false },
            { "text": "It replaces storytelling", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you approach a project requiring a new skill, like AR design?",
          "options": [
            { "text": "Decline the project", "isCorrect": false },
            { "text": "Learn or collaborate with specialists", "isCorrect": true },
            { "text": "Fake the expertise", "isCorrect": false },
            { "text": "Ignore the requirement", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of A/B testing in creative campaigns?",
          "options": [
            { "text": "It increases costs", "isCorrect": false },
            { "text": "It identifies the most effective creative elements", "isCorrect": true },
            { "text": "It’s unnecessary", "isCorrect": false },
            { "text": "It replaces the creative brief", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you ensure accessibility in creative campaigns?",
          "options": [
            { "text": "Use low-contrast designs", "isCorrect": false },
            { "text": "Incorporate captions and high-contrast visuals", "isCorrect": true },
            { "text": "Ignore accessibility", "isCorrect": false },
            { "text": "Use complex visuals only", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of a Creative Director in a rebranding project?",
          "options": [
            { "text": "Handle logistics only", "isCorrect": false },
            { "text": "Define the new brand identity and visuals", "isCorrect": true },
            { "text": "Manage finances only", "isCorrect": false },
            { "text": "Write press releases", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you prioritize tasks in a multi-campaign workflow?",
          "options": [
            { "text": "Work on all campaigns simultaneously", "isCorrect": false },
            { "text": "Set priorities based on deadlines and impact", "isCorrect": true },
            { "text": "Focus on one campaign only", "isCorrect": false },
            { "text": "Avoid planning", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the advantage of using a style guide in creative projects?",
          "options": [
            { "text": "It slows down the process", "isCorrect": false },
            { "text": "It ensures consistency across deliverables", "isCorrect": true },
            { "text": "It’s only for print", "isCorrect": false },
            { "text": "It replaces the creative brief", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you handle a client with unrealistic expectations?",
          "options": [
            { "text": "Agree to everything", "isCorrect": false },
            { "text": "Educate them and propose feasible solutions", "isCorrect": true },
            { "text": "Ignore their requests", "isCorrect": false },
            { "text": "Abandon the project", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of prototyping in creative direction?",
          "options": [
            { "text": "To finalize the budget", "isCorrect": false },
            { "text": "To test and refine concepts early", "isCorrect": true },
            { "text": "To deliver the final product", "isCorrect": false },
            { "text": "To manage team schedules", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you foster innovation within a creative team?",
          "options": [
            { "text": "Enforce strict guidelines", "isCorrect": false },
            { "text": "Encourage experimentation and brainstorming", "isCorrect": true },
            { "text": "Limit team input", "isCorrect": false },
            { "text": "Use only existing ideas", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of post-campaign analysis?",
          "options": [
            { "text": "It’s unnecessary", "isCorrect": false },
            { "text": "It identifies strengths and areas for improvement", "isCorrect": true },
            { "text": "It increases costs", "isCorrect": false },
            { "text": "It replaces the creative brief", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you approach a campaign for a global market?",
          "options": [
            { "text": "Use local references only", "isCorrect": false },
            { "text": "Use universal themes and cultural sensitivity", "isCorrect": true },
            { "text": "Ignore global audiences", "isCorrect": false },
            { "text": "Use complex visuals", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of a Creative Director in a pitch presentation?",
          "options": [
            { "text": "Handle logistics only", "isCorrect": false },
            { "text": "Communicate the vision and strategy", "isCorrect": true },
            { "text": "Manage finances", "isCorrect": false },
            { "text": "Avoid client interaction", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you ensure a creative campaign is sustainable?",
          "options": [
            { "text": "Use high-cost materials", "isCorrect": false },
            { "text": "Incorporate eco-friendly practices and messaging", "isCorrect": true },
            { "text": "Ignore sustainability", "isCorrect": false },
            { "text": "Focus only on visuals", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What should a Creative Director’s portfolio primarily showcase?",
          "options": [
            { "text": "Only personal projects", "isCorrect": false },
            { "text": "Diverse campaigns with measurable impact", "isCorrect": true },
            { "text": "Only technical skills", "isCorrect": false },
            { "text": "Static designs only", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you present your creative work during an interview?",
          "options": [
            { "text": "Show all work without context", "isCorrect": false },
            { "text": "Explain the strategy and results of key projects", "isCorrect": true },
            { "text": "Focus only on visuals", "isCorrect": false },
            { "text": "Avoid discussing recent work", "isCorrect": false }
          ],
          "difficulty": "medium"
        }
      ],
      isAvailable : true,
      category : "Creative Director"
    },
    {
      title : 'Product Designer Level 1',
      questions : [
        {
          "questionType": "text",
          "text": "What is the primary goal of a Product Designer?",
          "options": [
            { "text": "To create visually appealing designs", "isCorrect": false },
            { "text": "To solve user problems through intuitive design", "isCorrect": true },
            { "text": "To manage project budgets", "isCorrect": false },
            { "text": "To code the product", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What is the first step in the product design process?",
          "options": [
            { "text": "Start prototyping immediately", "isCorrect": false },
            { "text": "Conduct user research to understand needs", "isCorrect": true },
            { "text": "Launch the product", "isCorrect": false },
            { "text": "Choose colors and fonts", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "Which tool is commonly used for creating wireframes and prototypes?",
          "options": [
            { "text": "Adobe Photoshop", "isCorrect": false },
            { "text": "Figma", "isCorrect": true },
            { "text": "Microsoft Excel", "isCorrect": false },
            { "text": "Notion", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What does the term 'user persona' refer to in product design?",
          "options": [
            { "text": "A final product prototype", "isCorrect": false },
            { "text": "A fictional representation of the target user", "isCorrect": true },
            { "text": "A design system component", "isCorrect": false },
            { "text": "A project timeline", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you ensure a product design aligns with user needs?",
          "options": [
            { "text": "Use personal assumptions", "isCorrect": false },
            { "text": "Validate designs through user testing", "isCorrect": true },
            { "text": "Copy competitor designs", "isCorrect": false },
            { "text": "Ignore user feedback", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the purpose of a design system in product design?",
          "options": [
            { "text": "To manage budgets", "isCorrect": false },
            { "text": "To ensure consistency across interfaces", "isCorrect": true },
            { "text": "To code the product", "isCorrect": false },
            { "text": "To schedule tasks", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you prioritize features in a product design?",
          "options": [
            { "text": "Based on personal preference", "isCorrect": false },
            { "text": "Based on user needs and business goals", "isCorrect": true },
            { "text": "By adding all features", "isCorrect": false },
            { "text": "By ignoring user input", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of conducting usability testing?",
          "options": [
            { "text": "It increases design costs", "isCorrect": false },
            { "text": "It identifies user pain points", "isCorrect": true },
            { "text": "It’s unnecessary", "isCorrect": false },
            { "text": "It replaces prototyping", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you handle feedback that conflicts with user research findings?",
          "options": [
            { "text": "Ignore the feedback", "isCorrect": false },
            { "text": "Present research data and propose solutions", "isCorrect": true },
            { "text": "Follow the feedback blindly", "isCorrect": false },
            { "text": "Abandon the project", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What does the term 'wireframe' refer to in product design?",
          "options": [
            { "text": "A final product design", "isCorrect": false },
            { "text": "A low-fidelity layout of the interface", "isCorrect": true },
            { "text": "A coding framework", "isCorrect": false },
            { "text": "A marketing plan", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you ensure a product design is accessible?",
          "options": [
            { "text": "Use low-contrast colors", "isCorrect": false },
            { "text": "Follow WCAG guidelines and test with users", "isCorrect": true },
            { "text": "Ignore accessibility standards", "isCorrect": false },
            { "text": "Use complex visuals only", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of prototyping in product design?",
          "options": [
            { "text": "To finalize the budget", "isCorrect": false },
            { "text": "To test and iterate on design concepts", "isCorrect": true },
            { "text": "To launch the product", "isCorrect": false },
            { "text": "To manage timelines", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you collaborate with developers during product design?",
          "options": [
            { "text": "Work independently", "isCorrect": false },
            { "text": "Share specs and align on feasibility", "isCorrect": true },
            { "text": "Take over coding tasks", "isCorrect": false },
            { "text": "Ignore their input", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of user journey mapping?",
          "options": [
            { "text": "It slows down the process", "isCorrect": false },
            { "text": "It visualizes user interactions and pain points", "isCorrect": true },
            { "text": "It’s only for marketing", "isCorrect": false },
            { "text": "It replaces prototyping", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you stay updated with product design trends?",
          "options": [
            { "text": "Ignore trends", "isCorrect": false },
            { "text": "Follow design blogs and communities", "isCorrect": true },
            { "text": "Copy competitors", "isCorrect": false },
            { "text": "Avoid new tools", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What is the role of A/B testing in product design?",
          "options": [
            { "text": "It increases costs", "isCorrect": false },
            { "text": "It compares design variations for effectiveness", "isCorrect": true },
            { "text": "It’s unnecessary", "isCorrect": false },
            { "text": "It replaces user research", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you handle a tight deadline without compromising design quality?",
          "options": [
            { "text": "Skip user testing", "isCorrect": false },
            { "text": "Prioritize tasks and streamline workflows", "isCorrect": true },
            { "text": "Deliver incomplete designs", "isCorrect": false },
            { "text": "Avoid stakeholder input", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the importance of typography in product design?",
          "options": [
            { "text": "It’s irrelevant", "isCorrect": false },
            { "text": "It enhances readability and user experience", "isCorrect": true },
            { "text": "It’s only for print", "isCorrect": false },
            { "text": "It replaces functionality", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you approach designing for a diverse global audience?",
          "options": [
            { "text": "Use local cultural references only", "isCorrect": false },
            { "text": "Use inclusive and universal design principles", "isCorrect": true },
            { "text": "Ignore diversity", "isCorrect": false },
            { "text": "Use complex jargon", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of conducting competitor analysis in product design?",
          "options": [
            { "text": "To copy their designs", "isCorrect": false },
            { "text": "To identify gaps and opportunities", "isCorrect": true },
            { "text": "To reduce costs", "isCorrect": false },
            { "text": "To avoid user research", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you ensure a design aligns with a company’s brand identity?",
          "options": [
            { "text": "Use random colors", "isCorrect": false },
            { "text": "Follow the brand’s style guide", "isCorrect": true },
            { "text": "Ignore brand guidelines", "isCorrect": false },
            { "text": "Copy competitor branding", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What is the role of user feedback in product design?",
          "options": [
            { "text": "It’s irrelevant", "isCorrect": false },
            { "text": "It refines the design for better usability", "isCorrect": true },
            { "text": "It replaces the design process", "isCorrect": false },
            { "text": "It’s only for final stages", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you handle conflicting stakeholder requirements?",
          "options": [
            { "text": "Follow the loudest voice", "isCorrect": false },
            { "text": "Facilitate discussion to align on priorities", "isCorrect": true },
            { "text": "Ignore all requirements", "isCorrect": false },
            { "text": "Delay the project", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the purpose of a style guide in product design?",
          "options": [
            { "text": "To manage budgets", "isCorrect": false },
            { "text": "To define consistent visual and interaction rules", "isCorrect": true },
            { "text": "To code the product", "isCorrect": false },
            { "text": "To schedule tasks", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you measure the success of a product design?",
          "options": [
            { "text": "By personal opinion", "isCorrect": false },
            { "text": "By user engagement and usability metrics", "isCorrect": true },
            { "text": "By team size", "isCorrect": false },
            { "text": "By project budget", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of low-fidelity prototyping?",
          "options": [
            { "text": "It’s time-consuming", "isCorrect": false },
            { "text": "It allows quick iteration of ideas", "isCorrect": true },
            { "text": "It’s only for final designs", "isCorrect": false },
            { "text": "It replaces user testing", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you approach a project requiring a new skill, like motion design?",
          "options": [
            { "text": "Decline the project", "isCorrect": false },
            { "text": "Learn or collaborate with specialists", "isCorrect": true },
            { "text": "Fake the expertise", "isCorrect": false },
            { "text": "Ignore the requirement", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role heraus of color theory in product design?",
          "options": [
            { "text": "It’s optional", "isCorrect": false },
            { "text": "It guides user emotions and hierarchy", "isCorrect": true },
            { "text": "It’s only for print", "isCorrect": false },
            { "text": "It replaces functionality", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you ensure a product design is optimized for mobile devices?",
          "options": [
            { "text": "Use desktop-first design", "isCorrect": false },
            { "text": "Test on mobile and optimize interactions", "isCorrect": true },
            { "text": "Ignore mobile users", "isCorrect": false },
            { "text": "Use high-resolution assets only", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of iterative design in product development?",
          "options": [
            { "text": "It slows down the process", "isCorrect": false },
            { "text": "It refines the product through feedback", "isCorrect": true },
            { "text": "It’s only for final designs", "isCorrect": false },
            { "text": "It replaces research", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you collaborate with product managers on a design project?",
          "options": [
            { "text": "Work independently", "isCorrect": false },
            { "text": "Align on goals and share progress", "isCorrect": true },
            { "text": "Take over their tasks", "isCorrect": false },
            { "text": "Ignore their input", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of a Product Designer in a sprint planning session?",
          "options": [
            { "text": "Manage the budget", "isCorrect": false },
            { "text": "Define design tasks and priorities", "isCorrect": true },
            { "text": "Code the product", "isCorrect": false },
            { "text": "Handle marketing", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you handle a client with unrealistic design expectations?",
          "options": [
            { "text": "Agree to everything", "isCorrect": false },
            { "text": "Educate them and propose feasible solutions", "isCorrect": true },
            { "text": "Ignore their requests", "isCorrect": false },
            { "text": "Abandon the project", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the advantage of using a design sprint in product design?",
          "options": [
            { "text": "It increases costs", "isCorrect": false },
            { "text": "It accelerates problem-solving and prototyping", "isCorrect": true },
            { "text": "It’s only for final designs", "isCorrect": false },
            { "text": "It replaces user testing", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you ensure a product design supports business goals?",
          "options": [
            { "text": "Focus only on aesthetics", "isCorrect": false },
            { "text": "Align design with KPIs and user needs", "isCorrect": true },
            { "text": "Ignore business metrics", "isCorrect": false },
            { "text": "Use random features", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of data-driven design in product development?",
          "options": [
            { "text": "It’s irrelevant", "isCorrect": false },
            { "text": "It informs decisions with user behavior data", "isCorrect": true },
            { "text": "It replaces creativity", "isCorrect": false },
            { "text": "It’s only for marketing", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you approach designing for accessibility in a product?",
          "options": [
            { "text": "Use complex interactions", "isCorrect": false },
            { "text": "Incorporate screen reader support and contrast", "isCorrect": true },
            { "text": "Ignore accessibility", "isCorrect": false },
            { "text": "Focus only on visuals", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What should a Product Designer’s portfolio primarily showcase?",
          "options": [
            { "text": "Only personal projects", "isCorrect": false },
            { "text": "Case studies with process and impact", "isCorrect": true },
            { "text": "Only final designs", "isCorrect": false },
            { "text": "Static visuals only", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you present your design work during an interview?",
          "options": [
            { "text": "Show visuals without context", "isCorrect": false },
            { "text": "Explain the problem, process, and results", "isCorrect": true },
            { "text": "Focus only on aesthetics", "isCorrect": false },
            { "text": "Avoid discussing recent work", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of post-launch user testing?",
          "options": [
            { "text": "It’s unnecessary", "isCorrect": false },
            { "text": "It identifies areas for improvement", "isCorrect": true },
            { "text": "It increases costs", "isCorrect": false },
            { "text": "It replaces initial research", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you prioritize accessibility in a product design project?",
          "options": [
            { "text": "Treat it as optional", "isCorrect": false },
            { "text": "Integrate it from the start", "isCorrect": true },
            { "text": "Focus only on visuals", "isCorrect": false },
            { "text": "Address it post-launch", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of a Product Designer in defining a product’s MVP?",
          "options": [
            { "text": "Handle marketing", "isCorrect": false },
            { "text": "Design core features for user value", "isCorrect": true },
            { "text": "Manage the budget", "isCorrect": false },
            { "text": "Code the product", "isCorrect": false }
          ],
          "difficulty": "medium"
        }
      ],
      isAvailable : true,
      category : "Product Designer"
    },
    {
      title : 'Product Designer Level 2',
      questions : [
        {
          "questionType": "text",
          "text": "What is the primary goal of a Product Designer?",
          "options": [
            { "text": "To create visually appealing designs", "isCorrect": false },
            { "text": "To solve user problems through intuitive design", "isCorrect": true },
            { "text": "To manage project budgets", "isCorrect": false },
            { "text": "To code the product", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What is the first step in the product design process?",
          "options": [
            { "text": "Start prototyping immediately", "isCorrect": false },
            { "text": "Conduct user research to understand needs", "isCorrect": true },
            { "text": "Launch the product", "isCorrect": false },
            { "text": "Choose colors and fonts", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "Which tool is commonly used for creating wireframes and prototypes?",
          "options": [
            { "text": "Adobe Photoshop", "isCorrect": false },
            { "text": "Figma", "isCorrect": true },
            { "text": "Microsoft Excel", "isCorrect": false },
            { "text": "Notion", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What does the term 'user persona' refer to in product design?",
          "options": [
            { "text": "A final product prototype", "isCorrect": false },
            { "text": "A fictional representation of the target user", "isCorrect": true },
            { "text": "A design system component", "isCorrect": false },
            { "text": "A project timeline", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you ensure a product design aligns with user needs?",
          "options": [
            { "text": "Use personal assumptions", "isCorrect": false },
            { "text": "Validate designs through user testing", "isCorrect": true },
            { "text": "Copy competitor designs", "isCorrect": false },
            { "text": "Ignore user feedback", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the purpose of a design system in product design?",
          "options": [
            { "text": "To manage budgets", "isCorrect": false },
            { "text": "To ensure consistency across interfaces", "isCorrect": true },
            { "text": "To code the product", "isCorrect": false },
            { "text": "To schedule tasks", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you prioritize features in a product design?",
          "options": [
            { "text": "Based on personal preference", "isCorrect": false },
            { "text": "Based on user needs and business goals", "isCorrect": true },
            { "text": "By adding all features", "isCorrect": false },
            { "text": "By ignoring user input", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of conducting usability testing?",
          "options": [
            { "text": "It increases design costs", "isCorrect": false },
            { "text": "It identifies user pain points", "isCorrect": true },
            { "text": "It’s unnecessary", "isCorrect": false },
            { "text": "It replaces prototyping", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you handle feedback that conflicts with user research findings?",
          "options": [
            { "text": "Ignore the feedback", "isCorrect": false },
            { "text": "Present research data and propose solutions", "isCorrect": true },
            { "text": "Follow the feedback blindly", "isCorrect": false },
            { "text": "Abandon the project", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What does the term 'wireframe' refer to in product design?",
          "options": [
            { "text": "A final product design", "isCorrect": false },
            { "text": "A low-fidelity layout of the interface", "isCorrect": true },
            { "text": "A coding framework", "isCorrect": false },
            { "text": "A marketing plan", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you ensure a product design is accessible?",
          "options": [
            { "text": "Use low-contrast colors", "isCorrect": false },
            { "text": "Follow WCAG guidelines and test with users", "isCorrect": true },
            { "text": "Ignore accessibility standards", "isCorrect": false },
            { "text": "Use complex visuals only", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of prototyping in product design?",
          "options": [
            { "text": "To finalize the budget", "isCorrect": false },
            { "text": "To test and iterate on design concepts", "isCorrect": true },
            { "text": "To launch the product", "isCorrect": false },
            { "text": "To manage timelines", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you collaborate with developers during product design?",
          "options": [
            { "text": "Work independently", "isCorrect": false },
            { "text": "Share specs and align on feasibility", "isCorrect": true },
            { "text": "Take over coding tasks", "isCorrect": false },
            { "text": "Ignore their input", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of user journey mapping?",
          "options": [
            { "text": "It slows down the process", "isCorrect": false },
            { "text": "It visualizes user interactions and pain points", "isCorrect": true },
            { "text": "It’s only for marketing", "isCorrect": false },
            { "text": "It replaces prototyping", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you stay updated with product design trends?",
          "options": [
            { "text": "Ignore trends", "isCorrect": false },
            { "text": "Follow design blogs and communities", "isCorrect": true },
            { "text": "Copy competitors", "isCorrect": false },
            { "text": "Avoid new tools", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What is the role of A/B testing in product design?",
          "options": [
            { "text": "It increases costs", "isCorrect": false },
            { "text": "It compares design variations for effectiveness", "isCorrect": true },
            { "text": "It’s unnecessary", "isCorrect": false },
            { "text": "It replaces user research", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you handle a tight deadline without compromising design quality?",
          "options": [
            { "text": "Skip user testing", "isCorrect": false },
            { "text": "Prioritize tasks and streamline workflows", "isCorrect": true },
            { "text": "Deliver incomplete designs", "isCorrect": false },
            { "text": "Avoid stakeholder input", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the importance of typography in product design?",
          "options": [
            { "text": "It’s irrelevant", "isCorrect": false },
            { "text": "It enhances readability and user experience", "isCorrect": true },
            { "text": "It’s only for print", "isCorrect": false },
            { "text": "It replaces functionality", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you approach designing for a diverse global audience?",
          "options": [
            { "text": "Use local cultural references only", "isCorrect": false },
            { "text": "Use inclusive and universal design principles", "isCorrect": true },
            { "text": "Ignore diversity", "isCorrect": false },
            { "text": "Use complex jargon", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of conducting competitor analysis in product design?",
          "options": [
            { "text": "To copy their designs", "isCorrect": false },
            { "text": "To identify gaps and opportunities", "isCorrect": true },
            { "text": "To reduce costs", "isCorrect": false },
            { "text": "To avoid user research", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you ensure a design aligns with a company’s brand identity?",
          "options": [
            { "text": "Use random colors", "isCorrect": false },
            { "text": "Follow the brand’s style guide", "isCorrect": true },
            { "text": "Ignore brand guidelines", "isCorrect": false },
            { "text": "Copy competitor branding", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What is the role of user feedback in product design?",
          "options": [
            { "text": "It’s irrelevant", "isCorrect": false },
            { "text": "It refines the design for better usability", "isCorrect": true },
            { "text": "It replaces the design process", "isCorrect": false },
            { "text": "It’s only for final stages", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you handle conflicting stakeholder requirements?",
          "options": [
            { "text": "Follow the loudest voice", "isCorrect": false },
            { "text": "Facilitate discussion to align on priorities", "isCorrect": true },
            { "text": "Ignore all requirements", "isCorrect": false },
            { "text": "Delay the project", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the purpose of a style guide in product design?",
          "options": [
            { "text": "To manage budgets", "isCorrect": false },
            { "text": "To define consistent visual and interaction rules", "isCorrect": true },
            { "text": "To code the product", "isCorrect": false },
            { "text": "To schedule tasks", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you measure the success of a product design?",
          "options": [
            { "text": "By personal opinion", "isCorrect": false },
            { "text": "By user engagement and usability metrics", "isCorrect": true },
            { "text": "By team size", "isCorrect": false },
            { "text": "By project budget", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of low-fidelity prototyping?",
          "options": [
            { "text": "It’s time-consuming", "isCorrect": false },
            { "text": "It allows quick iteration of ideas", "isCorrect": true },
            { "text": "It’s only for final designs", "isCorrect": false },
            { "text": "It replaces user testing", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you approach a project requiring a new skill, like motion design?",
          "options": [
            { "text": "Decline the project", "isCorrect": false },
            { "text": "Learn or collaborate with specialists", "isCorrect": true },
            { "text": "Fake the expertise", "isCorrect": false },
            { "text": "Ignore the requirement", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role heraus of color theory in product design?",
          "options": [
            { "text": "It’s optional", "isCorrect": false },
            { "text": "It guides user emotions and hierarchy", "isCorrect": true },
            { "text": "It’s only for print", "isCorrect": false },
            { "text": "It replaces functionality", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you ensure a product design is optimized for mobile devices?",
          "options": [
            { "text": "Use desktop-first design", "isCorrect": false },
            { "text": "Test on mobile and optimize interactions", "isCorrect": true },
            { "text": "Ignore mobile users", "isCorrect": false },
            { "text": "Use high-resolution assets only", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of iterative design in product development?",
          "options": [
            { "text": "It slows down the process", "isCorrect": false },
            { "text": "It refines the product through feedback", "isCorrect": true },
            { "text": "It’s only for final designs", "isCorrect": false },
            { "text": "It replaces research", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you collaborate with product managers on a design project?",
          "options": [
            { "text": "Work independently", "isCorrect": false },
            { "text": "Align on goals and share progress", "isCorrect": true },
            { "text": "Take over their tasks", "isCorrect": false },
            { "text": "Ignore their input", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of a Product Designer in a sprint planning session?",
          "options": [
            { "text": "Manage the budget", "isCorrect": false },
            { "text": "Define design tasks and priorities", "isCorrect": true },
            { "text": "Code the product", "isCorrect": false },
            { "text": "Handle marketing", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you handle a client with unrealistic design expectations?",
          "options": [
            { "text": "Agree to everything", "isCorrect": false },
            { "text": "Educate them and propose feasible solutions", "isCorrect": true },
            { "text": "Ignore their requests", "isCorrect": false },
            { "text": "Abandon the project", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the advantage of using a design sprint in product design?",
          "options": [
            { "text": "It increases costs", "isCorrect": false },
            { "text": "It accelerates problem-solving and prototyping", "isCorrect": true },
            { "text": "It’s only for final designs", "isCorrect": false },
            { "text": "It replaces user testing", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you ensure a product design supports business goals?",
          "options": [
            { "text": "Focus only on aesthetics", "isCorrect": false },
            { "text": "Align design with KPIs and user needs", "isCorrect": true },
            { "text": "Ignore business metrics", "isCorrect": false },
            { "text": "Use random features", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of data-driven design in product development?",
          "options": [
            { "text": "It’s irrelevant", "isCorrect": false },
            { "text": "It informs decisions with user behavior data", "isCorrect": true },
            { "text": "It replaces creativity", "isCorrect": false },
            { "text": "It’s only for marketing", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you approach designing for accessibility in a product?",
          "options": [
            { "text": "Use complex interactions", "isCorrect": false },
            { "text": "Incorporate screen reader support and contrast", "isCorrect": true },
            { "text": "Ignore accessibility", "isCorrect": false },
            { "text": "Focus only on visuals", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What should a Product Designer’s portfolio primarily showcase?",
          "options": [
            { "text": "Only personal projects", "isCorrect": false },
            { "text": "Case studies with process and impact", "isCorrect": true },
            { "text": "Only final designs", "isCorrect": false },
            { "text": "Static visuals only", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you present your design work during an interview?",
          "options": [
            { "text": "Show visuals without context", "isCorrect": false },
            { "text": "Explain the problem, process, and results", "isCorrect": true },
            { "text": "Focus only on aesthetics", "isCorrect": false },
            { "text": "Avoid discussing recent work", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of post-launch user testing?",
          "options": [
            { "text": "It’s unnecessary", "isCorrect": false },
            { "text": "It identifies areas for improvement", "isCorrect": true },
            { "text": "It increases costs", "isCorrect": false },
            { "text": "It replaces initial research", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you prioritize accessibility in a product design project?",
          "options": [
            { "text": "Treat it as optional", "isCorrect": false },
            { "text": "Integrate it from the start", "isCorrect": true },
            { "text": "Focus only on visuals", "isCorrect": false },
            { "text": "Address it post-launch", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of a Product Designer in defining a product’s MVP?",
          "options": [
            { "text": "Handle marketing", "isCorrect": false },
            { "text": "Design core features for user value", "isCorrect": true },
            { "text": "Manage the budget", "isCorrect": false },
            { "text": "Code the product", "isCorrect": false }
          ],
          "difficulty": "medium"
        }
      ],
      isAvailable : true,
      category : "Product Designer"
    },
    {
      title : 'Product Designer Level 3',
      questions : [
        {
          "questionType": "text",
          "text": "What is the primary goal of a Product Designer?",
          "options": [
            { "text": "To create visually appealing designs", "isCorrect": false },
            { "text": "To solve user problems through intuitive design", "isCorrect": true },
            { "text": "To manage project budgets", "isCorrect": false },
            { "text": "To code the product", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What is the first step in the product design process?",
          "options": [
            { "text": "Start prototyping immediately", "isCorrect": false },
            { "text": "Conduct user research to understand needs", "isCorrect": true },
            { "text": "Launch the product", "isCorrect": false },
            { "text": "Choose colors and fonts", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "Which tool is commonly used for creating wireframes and prototypes?",
          "options": [
            { "text": "Adobe Photoshop", "isCorrect": false },
            { "text": "Figma", "isCorrect": true },
            { "text": "Microsoft Excel", "isCorrect": false },
            { "text": "Notion", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What does the term 'user persona' refer to in product design?",
          "options": [
            { "text": "A final product prototype", "isCorrect": false },
            { "text": "A fictional representation of the target user", "isCorrect": true },
            { "text": "A design system component", "isCorrect": false },
            { "text": "A project timeline", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you ensure a product design aligns with user needs?",
          "options": [
            { "text": "Use personal assumptions", "isCorrect": false },
            { "text": "Validate designs through user testing", "isCorrect": true },
            { "text": "Copy competitor designs", "isCorrect": false },
            { "text": "Ignore user feedback", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the purpose of a design system in product design?",
          "options": [
            { "text": "To manage budgets", "isCorrect": false },
            { "text": "To ensure consistency across interfaces", "isCorrect": true },
            { "text": "To code the product", "isCorrect": false },
            { "text": "To schedule tasks", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you prioritize features in a product design?",
          "options": [
            { "text": "Based on personal preference", "isCorrect": false },
            { "text": "Based on user needs and business goals", "isCorrect": true },
            { "text": "By adding all features", "isCorrect": false },
            { "text": "By ignoring user input", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of conducting usability testing?",
          "options": [
            { "text": "It increases design costs", "isCorrect": false },
            { "text": "It identifies user pain points", "isCorrect": true },
            { "text": "It’s unnecessary", "isCorrect": false },
            { "text": "It replaces prototyping", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you handle feedback that conflicts with user research findings?",
          "options": [
            { "text": "Ignore the feedback", "isCorrect": false },
            { "text": "Present research data and propose solutions", "isCorrect": true },
            { "text": "Follow the feedback blindly", "isCorrect": false },
            { "text": "Abandon the project", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What does the term 'wireframe' refer to in product design?",
          "options": [
            { "text": "A final product design", "isCorrect": false },
            { "text": "A low-fidelity layout of the interface", "isCorrect": true },
            { "text": "A coding framework", "isCorrect": false },
            { "text": "A marketing plan", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you ensure a product design is accessible?",
          "options": [
            { "text": "Use low-contrast colors", "isCorrect": false },
            { "text": "Follow WCAG guidelines and test with users", "isCorrect": true },
            { "text": "Ignore accessibility standards", "isCorrect": false },
            { "text": "Use complex visuals only", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of prototyping in product design?",
          "options": [
            { "text": "To finalize the budget", "isCorrect": false },
            { "text": "To test and iterate on design concepts", "isCorrect": true },
            { "text": "To launch the product", "isCorrect": false },
            { "text": "To manage timelines", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you collaborate with developers during product design?",
          "options": [
            { "text": "Work independently", "isCorrect": false },
            { "text": "Share specs and align on feasibility", "isCorrect": true },
            { "text": "Take over coding tasks", "isCorrect": false },
            { "text": "Ignore their input", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of user journey mapping?",
          "options": [
            { "text": "It slows down the process", "isCorrect": false },
            { "text": "It visualizes user interactions and pain points", "isCorrect": true },
            { "text": "It’s only for marketing", "isCorrect": false },
            { "text": "It replaces prototyping", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you stay updated with product design trends?",
          "options": [
            { "text": "Ignore trends", "isCorrect": false },
            { "text": "Follow design blogs and communities", "isCorrect": true },
            { "text": "Copy competitors", "isCorrect": false },
            { "text": "Avoid new tools", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What is the role of A/B testing in product design?",
          "options": [
            { "text": "It increases costs", "isCorrect": false },
            { "text": "It compares design variations for effectiveness", "isCorrect": true },
            { "text": "It’s unnecessary", "isCorrect": false },
            { "text": "It replaces user research", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you handle a tight deadline without compromising design quality?",
          "options": [
            { "text": "Skip user testing", "isCorrect": false },
            { "text": "Prioritize tasks and streamline workflows", "isCorrect": true },
            { "text": "Deliver incomplete designs", "isCorrect": false },
            { "text": "Avoid stakeholder input", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the importance of typography in product design?",
          "options": [
            { "text": "It’s irrelevant", "isCorrect": false },
            { "text": "It enhances readability and user experience", "isCorrect": true },
            { "text": "It’s only for print", "isCorrect": false },
            { "text": "It replaces functionality", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you approach designing for a diverse global audience?",
          "options": [
            { "text": "Use local cultural references only", "isCorrect": false },
            { "text": "Use inclusive and universal design principles", "isCorrect": true },
            { "text": "Ignore diversity", "isCorrect": false },
            { "text": "Use complex jargon", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of conducting competitor analysis in product design?",
          "options": [
            { "text": "To copy their designs", "isCorrect": false },
            { "text": "To identify gaps and opportunities", "isCorrect": true },
            { "text": "To reduce costs", "isCorrect": false },
            { "text": "To avoid user research", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you ensure a design aligns with a company’s brand identity?",
          "options": [
            { "text": "Use random colors", "isCorrect": false },
            { "text": "Follow the brand’s style guide", "isCorrect": true },
            { "text": "Ignore brand guidelines", "isCorrect": false },
            { "text": "Copy competitor branding", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What is the role of user feedback in product design?",
          "options": [
            { "text": "It’s irrelevant", "isCorrect": false },
            { "text": "It refines the design for better usability", "isCorrect": true },
            { "text": "It replaces the design process", "isCorrect": false },
            { "text": "It’s only for final stages", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you handle conflicting stakeholder requirements?",
          "options": [
            { "text": "Follow the loudest voice", "isCorrect": false },
            { "text": "Facilitate discussion to align on priorities", "isCorrect": true },
            { "text": "Ignore all requirements", "isCorrect": false },
            { "text": "Delay the project", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the purpose of a style guide in product design?",
          "options": [
            { "text": "To manage budgets", "isCorrect": false },
            { "text": "To define consistent visual and interaction rules", "isCorrect": true },
            { "text": "To code the product", "isCorrect": false },
            { "text": "To schedule tasks", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you measure the success of a product design?",
          "options": [
            { "text": "By personal opinion", "isCorrect": false },
            { "text": "By user engagement and usability metrics", "isCorrect": true },
            { "text": "By team size", "isCorrect": false },
            { "text": "By project budget", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of low-fidelity prototyping?",
          "options": [
            { "text": "It’s time-consuming", "isCorrect": false },
            { "text": "It allows quick iteration of ideas", "isCorrect": true },
            { "text": "It’s only for final designs", "isCorrect": false },
            { "text": "It replaces user testing", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you approach a project requiring a new skill, like motion design?",
          "options": [
            { "text": "Decline the project", "isCorrect": false },
            { "text": "Learn or collaborate with specialists", "isCorrect": true },
            { "text": "Fake the expertise", "isCorrect": false },
            { "text": "Ignore the requirement", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role heraus of color theory in product design?",
          "options": [
            { "text": "It’s optional", "isCorrect": false },
            { "text": "It guides user emotions and hierarchy", "isCorrect": true },
            { "text": "It’s only for print", "isCorrect": false },
            { "text": "It replaces functionality", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you ensure a product design is optimized for mobile devices?",
          "options": [
            { "text": "Use desktop-first design", "isCorrect": false },
            { "text": "Test on mobile and optimize interactions", "isCorrect": true },
            { "text": "Ignore mobile users", "isCorrect": false },
            { "text": "Use high-resolution assets only", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of iterative design in product development?",
          "options": [
            { "text": "It slows down the process", "isCorrect": false },
            { "text": "It refines the product through feedback", "isCorrect": true },
            { "text": "It’s only for final designs", "isCorrect": false },
            { "text": "It replaces research", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you collaborate with product managers on a design project?",
          "options": [
            { "text": "Work independently", "isCorrect": false },
            { "text": "Align on goals and share progress", "isCorrect": true },
            { "text": "Take over their tasks", "isCorrect": false },
            { "text": "Ignore their input", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of a Product Designer in a sprint planning session?",
          "options": [
            { "text": "Manage the budget", "isCorrect": false },
            { "text": "Define design tasks and priorities", "isCorrect": true },
            { "text": "Code the product", "isCorrect": false },
            { "text": "Handle marketing", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you handle a client with unrealistic design expectations?",
          "options": [
            { "text": "Agree to everything", "isCorrect": false },
            { "text": "Educate them and propose feasible solutions", "isCorrect": true },
            { "text": "Ignore their requests", "isCorrect": false },
            { "text": "Abandon the project", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the advantage of using a design sprint in product design?",
          "options": [
            { "text": "It increases costs", "isCorrect": false },
            { "text": "It accelerates problem-solving and prototyping", "isCorrect": true },
            { "text": "It’s only for final designs", "isCorrect": false },
            { "text": "It replaces user testing", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you ensure a product design supports business goals?",
          "options": [
            { "text": "Focus only on aesthetics", "isCorrect": false },
            { "text": "Align design with KPIs and user needs", "isCorrect": true },
            { "text": "Ignore business metrics", "isCorrect": false },
            { "text": "Use random features", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of data-driven design in product development?",
          "options": [
            { "text": "It’s irrelevant", "isCorrect": false },
            { "text": "It informs decisions with user behavior data", "isCorrect": true },
            { "text": "It replaces creativity", "isCorrect": false },
            { "text": "It’s only for marketing", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you approach designing for accessibility in a product?",
          "options": [
            { "text": "Use complex interactions", "isCorrect": false },
            { "text": "Incorporate screen reader support and contrast", "isCorrect": true },
            { "text": "Ignore accessibility", "isCorrect": false },
            { "text": "Focus only on visuals", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What should a Product Designer’s portfolio primarily showcase?",
          "options": [
            { "text": "Only personal projects", "isCorrect": false },
            { "text": "Case studies with process and impact", "isCorrect": true },
            { "text": "Only final designs", "isCorrect": false },
            { "text": "Static visuals only", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you present your design work during an interview?",
          "options": [
            { "text": "Show visuals without context", "isCorrect": false },
            { "text": "Explain the problem, process, and results", "isCorrect": true },
            { "text": "Focus only on aesthetics", "isCorrect": false },
            { "text": "Avoid discussing recent work", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of post-launch user testing?",
          "options": [
            { "text": "It’s unnecessary", "isCorrect": false },
            { "text": "It identifies areas for improvement", "isCorrect": true },
            { "text": "It increases costs", "isCorrect": false },
            { "text": "It replaces initial research", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you prioritize accessibility in a product design project?",
          "options": [
            { "text": "Treat it as optional", "isCorrect": false },
            { "text": "Integrate it from the start", "isCorrect": true },
            { "text": "Focus only on visuals", "isCorrect": false },
            { "text": "Address it post-launch", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of a Product Designer in defining a product’s MVP?",
          "options": [
            { "text": "Handle marketing", "isCorrect": false },
            { "text": "Design core features for user value", "isCorrect": true },
            { "text": "Manage the budget", "isCorrect": false },
            { "text": "Code the product", "isCorrect": false }
          ],
          "difficulty": "medium"
        }
      ],
      isAvailable : true,
      category : "Product Designer"
    },
    {
      title : 'Graphic Designer Level 1',
      questions : [
        {
          "questionType": "text",
          "text": "What is the primary role of a Graphic Designer?",
          "options": [
            { "text": "To code websites", "isCorrect": false },
            { "text": "To create visually compelling designs", "isCorrect": true },
            { "text": "To manage project budgets", "isCorrect": false },
            { "text": "To handle marketing campaigns", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "Which software is most commonly used for vector-based graphic design?",
          "options": [
            { "text": "Adobe Photoshop", "isCorrect": false },
            { "text": "Adobe Illustrator", "isCorrect": true },
            { "text": "Adobe Premiere Pro", "isCorrect": false },
            { "text": "Blender", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What does the term 'kerning' refer to in typography?",
          "options": [
            { "text": "Adjusting font size", "isCorrect": false },
            { "text": "Adjusting spacing between letters", "isCorrect": true },
            { "text": "Changing font color", "isCorrect": false },
            { "text": "Adding text effects", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What is the purpose of a mood board in graphic design?",
          "options": [
            { "text": "To manage project timelines", "isCorrect": false },
            { "text": "To establish visual style and inspiration", "isCorrect": true },
            { "text": "To write project briefs", "isCorrect": false },
            { "text": "To export final designs", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you ensure a design aligns with a client’s brand identity?",
          "options": [
            { "text": "Use random colors and fonts", "isCorrect": false },
            { "text": "Follow the brand’s style guide", "isCorrect": true },
            { "text": "Copy competitor designs", "isCorrect": false },
            { "text": "Ignore brand guidelines", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What is the first step in your creative process for a new design project?",
          "options": [
            { "text": "Start designing immediately", "isCorrect": false },
            { "text": "Research the client and audience", "isCorrect": true },
            { "text": "Export the final design", "isCorrect": false },
            { "text": "Choose random assets", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "Which file format is best for printing high-quality graphic designs?",
          "options": [
            { "text": "JPEG", "isCorrect": false },
            { "text": "PDF", "isCorrect": true },
            { "text": "PNG", "isCorrect": false },
            { "text": "GIF", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of color theory in graphic design?",
          "options": [
            { "text": "It’s optional", "isCorrect": false },
            { "text": "It guides emotional impact and harmony", "isCorrect": true },
            { "text": "It’s only for digital design", "isCorrect": false },
            { "text": "It replaces typography", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you handle a client who dislikes your design draft?",
          "options": [
            { "text": "Defend the design without discussion", "isCorrect": false },
            { "text": "Ask for specific feedback and revise", "isCorrect": true },
            { "text": "Ignore the client", "isCorrect": false },
            { "text": "Abandon the project", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What does the term 'hierarchy' refer to in graphic design?",
          "options": [
            { "text": "The project timeline", "isCorrect": false },
            { "text": "The arrangement of elements by importance", "isCorrect": true },
            { "text": "The color palette", "isCorrect": false },
            { "text": "The software used", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "Which Adobe tool is best for editing raster images?",
          "options": [
            { "text": "Adobe Illustrator", "isCorrect": false },
            { "text": "Adobe Photoshop", "isCorrect": true },
            { "text": "Adobe InDesign", "isCorrect": false },
            { "text": "Adobe After Effects", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you ensure a design is effective for a diverse audience?",
          "options": [
            { "text": "Use local cultural references only", "isCorrect": false },
            { "text": "Use inclusive visuals and clear messaging", "isCorrect": true },
            { "text": "Ignore audience diversity", "isCorrect": false },
            { "text": "Use complex designs", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the purpose of a grid system in graphic design?",
          "options": [
            { "text": "To adjust colors", "isCorrect": false },
            { "text": "To ensure alignment and consistency", "isCorrect": true },
            { "text": "To manage budgets", "isCorrect": false },
            { "text": "To animate designs", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you stay updated with graphic design trends?",
          "options": [
            { "text": "Ignore trends", "isCorrect": false },
            { "text": "Follow design blogs and platforms", "isCorrect": true },
            { "text": "Copy competitors", "isCorrect": false },
            { "text": "Avoid new tools", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of using vector graphics in design?",
          "options": [
            { "text": "They are smaller in file size", "isCorrect": false },
            { "text": "They scale without losing quality", "isCorrect": true },
            { "text": "They are easier to animate", "isCorrect": false },
            { "text": "They are only for print", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you handle tight deadlines without compromising quality?",
          "options": [
            { "text": "Skip quality checks", "isCorrect": false },
            { "text": "Prioritize tasks and streamline workflows", "isCorrect": true },
            { "text": "Deliver incomplete designs", "isCorrect": false },
            { "text": "Avoid client communication", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of typography in graphic design?",
          "options": [
            { "text": "It’s irrelevant", "isCorrect": false },
            { "text": "It enhances readability and tone", "isCorrect": true },
            { "text": "It’s only for digital design", "isCorrect": false },
            { "text": "It replaces imagery", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you approach a project requiring a new skill, like UI design?",
          "options": [
            { "text": "Decline the project", "isCorrect": false },
            { "text": "Learn or collaborate with experts", "isCorrect": true },
            { "text": "Fake the expertise", "isCorrect": false },
            { "text": "Ignore the requirement", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of creating mockups for a design project?",
          "options": [
            { "text": "To increase costs", "isCorrect": false },
            { "text": "To visualize the design in context", "isCorrect": true },
            { "text": "To replace final designs", "isCorrect": false },
            { "text": "To manage budgets", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you ensure a design is optimized for digital platforms?",
          "options": [
            { "text": "Use high-resolution images only", "isCorrect": false },
            { "text": "Optimize file sizes and test on devices", "isCorrect": true },
            { "text": "Ignore digital constraints", "isCorrect": false },
            { "text": "Use print settings", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the significance of white space in graphic design?",
          "options": [
            { "text": "It’s wasted space", "isCorrect": false },
            { "text": "It improves clarity and focus", "isCorrect": true },
            { "text": "It’s only for print", "isCorrect": false },
            { "text": "It replaces color", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you handle conflicting feedback from multiple stakeholders?",
          "options": [
            { "text": "Follow the loudest voice", "isCorrect": false },
            { "text": "Facilitate discussion to align priorities", "isCorrect": true },
            { "text": "Ignore all feedback", "isCorrect": false },
            { "text": "Delay the project", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "Which tool is best for creating multi-page layouts, like magazines?",
          "options": [
            { "text": "Adobe Illustrator", "isCorrect": false },
            { "text": "Adobe InDesign", "isCorrect": true },
            { "text": "Adobe Photoshop", "isCorrect": false },
            { "text": "Figma", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What is the purpose of a style guide in graphic design?",
          "options": [
            { "text": "To manage budgets", "isCorrect": false },
            { "text": "To ensure consistency in visuals", "isCorrect": true },
            { "text": "To animate designs", "isCorrect": false },
            { "text": "To schedule tasks", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you measure the success of a graphic design project?",
          "options": [
            { "text": "By personal opinion", "isCorrect": false },
            { "text": "By client satisfaction and engagement", "isCorrect": true },
            { "text": "By team size", "isCorrect": false },
            { "text": "By project budget", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of using a design brief?",
          "options": [
            { "text": "To increase costs", "isCorrect": false },
            { "text": "To clarify project goals and scope", "isCorrect": true },
            { "text": "To replace final designs", "isCorrect": false },
            { "text": "To manage timelines", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you collaborate with a marketing team on a design project?",
          "options": [
            { "text": "Work independently", "isCorrect": false },
            { "text": "Align on campaign goals and visuals", "isCorrect": true },
            { "text": "Take over marketing tasks", "isCorrect": false },
            { "text": "Ignore their input", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of contrast in graphic design?",
          "options": [
            { "text": "It’s irrelevant", "isCorrect": false },
            { "text": "It highlights key elements and improves readability", "isCorrect": true },
            { "text": "It’s only for digital design", "isCorrect": false },
            { "text": "It replaces imagery", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you ensure accessibility in graphic designs?",
          "options": [
            { "text": "Use low-contrast colors", "isCorrect": false },
            { "text": "Use high-contrast and legible fonts", "isCorrect": true },
            { "text": "Ignore accessibility", "isCorrect": false },
            { "text": "Use complex visuals only", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the advantage of using a mockup in client presentations?",
          "options": [
            { "text": "It slows down the process", "isCorrect": false },
            { "text": "It shows the design in real-world context", "isCorrect": true },
            { "text": "It replaces the final design", "isCorrect": false },
            { "text": "It manages budgets", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you approach designing for both print and digital media?",
          "options": [
            { "text": "Use the same settings for both", "isCorrect": false },
            { "text": "Adjust formats and resolutions for each", "isCorrect": true },
            { "text": "Ignore digital requirements", "isCorrect": false },
            { "text": "Use print-only settings", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of a Graphic Designer in a branding project?",
          "options": [
            { "text": "Manage finances", "isCorrect": false },
            { "text": "Create logos and visual identity", "isCorrect": true },
            { "text": "Write marketing copy", "isCorrect": false },
            { "text": "Handle logistics", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you handle a client with unrealistic expectations?",
          "options": [
            { "text": "Agree to everything", "isCorrect": false },
            { "text": "Educate and propose feasible solutions", "isCorrect": true },
            { "text": "Ignore their requests", "isCorrect": false },
            { "text": "Abandon the project", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of sketching before digital design?",
          "options": [
            { "text": "It’s time-consuming", "isCorrect": false },
            { "text": "It explores ideas quickly", "isCorrect": true },
            { "text": "It replaces final designs", "isCorrect": false },
            { "text": "It manages budgets", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you prioritize tasks in a multi-project workflow?",
          "options": [
            { "text": "Work on all projects simultaneously", "isCorrect": false },
            { "text": "Set priorities based on deadlines", "isCorrect": true },
            { "text": "Focus on one project only", "isCorrect": false },
            { "text": "Avoid planning", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the significance of balance in graphic design?",
          "options": [
            { "text": "It’s irrelevant", "isCorrect": false },
            { "text": "It creates visual stability", "isCorrect": true },
            { "text": "It’s only for digital design", "isCorrect": false },
            { "text": "It replaces color", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you approach a rebranding project for a client?",
          "options": [
            { "text": "Use random visuals", "isCorrect": false },
            { "text": "Research brand history and audience", "isCorrect": true },
            { "text": "Copy competitor branding", "isCorrect": false },
            { "text": "Ignore client input", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of feedback in the design process?",
          "options": [
            { "text": "It’s unnecessary", "isCorrect": false },
            { "text": "It refines and improves the design", "isCorrect": true },
            { "text": "It replaces the design brief", "isCorrect": false },
            { "text": "It delays the project", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What should a Graphic Designer’s portfolio primarily showcase?",
          "options": [
            { "text": "Only personal projects", "isCorrect": false },
            { "text": "Diverse projects with context", "isCorrect": true },
            { "text": "Only final designs", "isCorrect": false },
            { "text": "Static images only", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you present your design work during an interview?",
          "options": [
            { "text": "Show visuals without explanation", "isCorrect": false },
            { "text": "Explain the process and impact", "isCorrect": true },
            { "text": "Focus only on aesthetics", "isCorrect": false },
            { "text": "Avoid recent work", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of competitor analysis in graphic design?",
          "options": [
            { "text": "To copy their work", "isCorrect": false },
            { "text": "To identify unique opportunities", "isCorrect": true },
            { "text": "To reduce costs", "isCorrect": false },
            { "text": "To avoid design work", "isCorrect": false }
          ],
          "difficulty": "medium"
        }
      ],
      isAvailable : true,
      category : "Graphic Designer"
    },
    {
      title : 'Graphic Designer Level 2',
      questions : [
        {
          "questionType": "text",
          "text": "What is the primary role of a Graphic Designer?",
          "options": [
            { "text": "To code websites", "isCorrect": false },
            { "text": "To create visually compelling designs", "isCorrect": true },
            { "text": "To manage project budgets", "isCorrect": false },
            { "text": "To handle marketing campaigns", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "Which software is most commonly used for vector-based graphic design?",
          "options": [
            { "text": "Adobe Photoshop", "isCorrect": false },
            { "text": "Adobe Illustrator", "isCorrect": true },
            { "text": "Adobe Premiere Pro", "isCorrect": false },
            { "text": "Blender", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What does the term 'kerning' refer to in typography?",
          "options": [
            { "text": "Adjusting font size", "isCorrect": false },
            { "text": "Adjusting spacing between letters", "isCorrect": true },
            { "text": "Changing font color", "isCorrect": false },
            { "text": "Adding text effects", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What is the purpose of a mood board in graphic design?",
          "options": [
            { "text": "To manage project timelines", "isCorrect": false },
            { "text": "To establish visual style and inspiration", "isCorrect": true },
            { "text": "To write project briefs", "isCorrect": false },
            { "text": "To export final designs", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you ensure a design aligns with a client’s brand identity?",
          "options": [
            { "text": "Use random colors and fonts", "isCorrect": false },
            { "text": "Follow the brand’s style guide", "isCorrect": true },
            { "text": "Copy competitor designs", "isCorrect": false },
            { "text": "Ignore brand guidelines", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What is the first step in your creative process for a new design project?",
          "options": [
            { "text": "Start designing immediately", "isCorrect": false },
            { "text": "Research the client and audience", "isCorrect": true },
            { "text": "Export the final design", "isCorrect": false },
            { "text": "Choose random assets", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "Which file format is best for printing high-quality graphic designs?",
          "options": [
            { "text": "JPEG", "isCorrect": false },
            { "text": "PDF", "isCorrect": true },
            { "text": "PNG", "isCorrect": false },
            { "text": "GIF", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of color theory in graphic design?",
          "options": [
            { "text": "It’s optional", "isCorrect": false },
            { "text": "It guides emotional impact and harmony", "isCorrect": true },
            { "text": "It’s only for digital design", "isCorrect": false },
            { "text": "It replaces typography", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you handle a client who dislikes your design draft?",
          "options": [
            { "text": "Defend the design without discussion", "isCorrect": false },
            { "text": "Ask for specific feedback and revise", "isCorrect": true },
            { "text": "Ignore the client", "isCorrect": false },
            { "text": "Abandon the project", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What does the term 'hierarchy' refer to in graphic design?",
          "options": [
            { "text": "The project timeline", "isCorrect": false },
            { "text": "The arrangement of elements by importance", "isCorrect": true },
            { "text": "The color palette", "isCorrect": false },
            { "text": "The software used", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "Which Adobe tool is best for editing raster images?",
          "options": [
            { "text": "Adobe Illustrator", "isCorrect": false },
            { "text": "Adobe Photoshop", "isCorrect": true },
            { "text": "Adobe InDesign", "isCorrect": false },
            { "text": "Adobe After Effects", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you ensure a design is effective for a diverse audience?",
          "options": [
            { "text": "Use local cultural references only", "isCorrect": false },
            { "text": "Use inclusive visuals and clear messaging", "isCorrect": true },
            { "text": "Ignore audience diversity", "isCorrect": false },
            { "text": "Use complex designs", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the purpose of a grid system in graphic design?",
          "options": [
            { "text": "To adjust colors", "isCorrect": false },
            { "text": "To ensure alignment and consistency", "isCorrect": true },
            { "text": "To manage budgets", "isCorrect": false },
            { "text": "To animate designs", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you stay updated with graphic design trends?",
          "options": [
            { "text": "Ignore trends", "isCorrect": false },
            { "text": "Follow design blogs and platforms", "isCorrect": true },
            { "text": "Copy competitors", "isCorrect": false },
            { "text": "Avoid new tools", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of using vector graphics in design?",
          "options": [
            { "text": "They are smaller in file size", "isCorrect": false },
            { "text": "They scale without losing quality", "isCorrect": true },
            { "text": "They are easier to animate", "isCorrect": false },
            { "text": "They are only for print", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you handle tight deadlines without compromising quality?",
          "options": [
            { "text": "Skip quality checks", "isCorrect": false },
            { "text": "Prioritize tasks and streamline workflows", "isCorrect": true },
            { "text": "Deliver incomplete designs", "isCorrect": false },
            { "text": "Avoid client communication", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of typography in graphic design?",
          "options": [
            { "text": "It’s irrelevant", "isCorrect": false },
            { "text": "It enhances readability and tone", "isCorrect": true },
            { "text": "It’s only for digital design", "isCorrect": false },
            { "text": "It replaces imagery", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you approach a project requiring a new skill, like UI design?",
          "options": [
            { "text": "Decline the project", "isCorrect": false },
            { "text": "Learn or collaborate with experts", "isCorrect": true },
            { "text": "Fake the expertise", "isCorrect": false },
            { "text": "Ignore the requirement", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of creating mockups for a design project?",
          "options": [
            { "text": "To increase costs", "isCorrect": false },
            { "text": "To visualize the design in context", "isCorrect": true },
            { "text": "To replace final designs", "isCorrect": false },
            { "text": "To manage budgets", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you ensure a design is optimized for digital platforms?",
          "options": [
            { "text": "Use high-resolution images only", "isCorrect": false },
            { "text": "Optimize file sizes and test on devices", "isCorrect": true },
            { "text": "Ignore digital constraints", "isCorrect": false },
            { "text": "Use print settings", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the significance of white space in graphic design?",
          "options": [
            { "text": "It’s wasted space", "isCorrect": false },
            { "text": "It improves clarity and focus", "isCorrect": true },
            { "text": "It’s only for print", "isCorrect": false },
            { "text": "It replaces color", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you handle conflicting feedback from multiple stakeholders?",
          "options": [
            { "text": "Follow the loudest voice", "isCorrect": false },
            { "text": "Facilitate discussion to align priorities", "isCorrect": true },
            { "text": "Ignore all feedback", "isCorrect": false },
            { "text": "Delay the project", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "Which tool is best for creating multi-page layouts, like magazines?",
          "options": [
            { "text": "Adobe Illustrator", "isCorrect": false },
            { "text": "Adobe InDesign", "isCorrect": true },
            { "text": "Adobe Photoshop", "isCorrect": false },
            { "text": "Figma", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What is the purpose of a style guide in graphic design?",
          "options": [
            { "text": "To manage budgets", "isCorrect": false },
            { "text": "To ensure consistency in visuals", "isCorrect": true },
            { "text": "To animate designs", "isCorrect": false },
            { "text": "To schedule tasks", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you measure the success of a graphic design project?",
          "options": [
            { "text": "By personal opinion", "isCorrect": false },
            { "text": "By client satisfaction and engagement", "isCorrect": true },
            { "text": "By team size", "isCorrect": false },
            { "text": "By project budget", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of using a design brief?",
          "options": [
            { "text": "To increase costs", "isCorrect": false },
            { "text": "To clarify project goals and scope", "isCorrect": true },
            { "text": "To replace final designs", "isCorrect": false },
            { "text": "To manage timelines", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you collaborate with a marketing team on a design project?",
          "options": [
            { "text": "Work independently", "isCorrect": false },
            { "text": "Align on campaign goals and visuals", "isCorrect": true },
            { "text": "Take over marketing tasks", "isCorrect": false },
            { "text": "Ignore their input", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of contrast in graphic design?",
          "options": [
            { "text": "It’s irrelevant", "isCorrect": false },
            { "text": "It highlights key elements and improves readability", "isCorrect": true },
            { "text": "It’s only for digital design", "isCorrect": false },
            { "text": "It replaces imagery", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you ensure accessibility in graphic designs?",
          "options": [
            { "text": "Use low-contrast colors", "isCorrect": false },
            { "text": "Use high-contrast and legible fonts", "isCorrect": true },
            { "text": "Ignore accessibility", "isCorrect": false },
            { "text": "Use complex visuals only", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the advantage of using a mockup in client presentations?",
          "options": [
            { "text": "It slows down the process", "isCorrect": false },
            { "text": "It shows the design in real-world context", "isCorrect": true },
            { "text": "It replaces the final design", "isCorrect": false },
            { "text": "It manages budgets", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you approach designing for both print and digital media?",
          "options": [
            { "text": "Use the same settings for both", "isCorrect": false },
            { "text": "Adjust formats and resolutions for each", "isCorrect": true },
            { "text": "Ignore digital requirements", "isCorrect": false },
            { "text": "Use print-only settings", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of a Graphic Designer in a branding project?",
          "options": [
            { "text": "Manage finances", "isCorrect": false },
            { "text": "Create logos and visual identity", "isCorrect": true },
            { "text": "Write marketing copy", "isCorrect": false },
            { "text": "Handle logistics", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you handle a client with unrealistic expectations?",
          "options": [
            { "text": "Agree to everything", "isCorrect": false },
            { "text": "Educate and propose feasible solutions", "isCorrect": true },
            { "text": "Ignore their requests", "isCorrect": false },
            { "text": "Abandon the project", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of sketching before digital design?",
          "options": [
            { "text": "It’s time-consuming", "isCorrect": false },
            { "text": "It explores ideas quickly", "isCorrect": true },
            { "text": "It replaces final designs", "isCorrect": false },
            { "text": "It manages budgets", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you prioritize tasks in a multi-project workflow?",
          "options": [
            { "text": "Work on all projects simultaneously", "isCorrect": false },
            { "text": "Set priorities based on deadlines", "isCorrect": true },
            { "text": "Focus on one project only", "isCorrect": false },
            { "text": "Avoid planning", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the significance of balance in graphic design?",
          "options": [
            { "text": "It’s irrelevant", "isCorrect": false },
            { "text": "It creates visual stability", "isCorrect": true },
            { "text": "It’s only for digital design", "isCorrect": false },
            { "text": "It replaces color", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you approach a rebranding project for a client?",
          "options": [
            { "text": "Use random visuals", "isCorrect": false },
            { "text": "Research brand history and audience", "isCorrect": true },
            { "text": "Copy competitor branding", "isCorrect": false },
            { "text": "Ignore client input", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of feedback in the design process?",
          "options": [
            { "text": "It’s unnecessary", "isCorrect": false },
            { "text": "It refines and improves the design", "isCorrect": true },
            { "text": "It replaces the design brief", "isCorrect": false },
            { "text": "It delays the project", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What should a Graphic Designer’s portfolio primarily showcase?",
          "options": [
            { "text": "Only personal projects", "isCorrect": false },
            { "text": "Diverse projects with context", "isCorrect": true },
            { "text": "Only final designs", "isCorrect": false },
            { "text": "Static images only", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you present your design work during an interview?",
          "options": [
            { "text": "Show visuals without explanation", "isCorrect": false },
            { "text": "Explain the process and impact", "isCorrect": true },
            { "text": "Focus only on aesthetics", "isCorrect": false },
            { "text": "Avoid recent work", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of competitor analysis in graphic design?",
          "options": [
            { "text": "To copy their work", "isCorrect": false },
            { "text": "To identify unique opportunities", "isCorrect": true },
            { "text": "To reduce costs", "isCorrect": false },
            { "text": "To avoid design work", "isCorrect": false }
          ],
          "difficulty": "medium"
        }
      ],
      isAvailable : true,
      category : "Graphic Designer"
    },
    {
      title : 'Brand Designer Level 1',
      questions : [
        {
          "questionType": "text",
          "text": "What is the primary role of a Brand Designer?",
          "options": [
            { "text": "To manage marketing campaigns", "isCorrect": false },
            { "text": "To create cohesive visual identities", "isCorrect": true },
            { "text": "To code brand websites", "isCorrect": false },
            { "text": "To handle project budgets", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What is the first step in developing a brand identity?",
          "options": [
            { "text": "Create a logo immediately", "isCorrect": false },
            { "text": "Research the brand’s values and audience", "isCorrect": true },
            { "text": "Launch the brand", "isCorrect": false },
            { "text": "Choose random colors", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "Which element is essential to a brand’s visual identity?",
          "options": [
            { "text": "Project timeline", "isCorrect": false },
            { "text": "Logo and typography", "isCorrect": true },
            { "text": "Team size", "isCorrect": false },
            { "text": "Budget allocation", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What does a brand style guide ensure?",
          "options": [
            { "text": "Higher project costs", "isCorrect": false },
            { "text": "Consistency across brand touchpoints", "isCorrect": true },
            { "text": "Faster design completion", "isCorrect": false },
            { "text": "Simplified coding", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you ensure a brand resonates with its target audience?",
          "options": [
            { "text": "Use personal preferences", "isCorrect": false },
            { "text": "Align visuals with audience values", "isCorrect": true },
            { "text": "Copy competitor brands", "isCorrect": false },
            { "text": "Ignore audience research", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "Which software is commonly used for creating brand logos?",
          "options": [
            { "text": "Adobe Photoshop", "isCorrect": false },
            { "text": "Adobe Illustrator", "isCorrect": true },
            { "text": "Adobe Premiere Pro", "isCorrect": false },
            { "text": "Microsoft Excel", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What is the purpose of a brand audit?",
          "options": [
            { "text": "To design a new logo", "isCorrect": false },
            { "text": "To assess brand consistency and perception", "isCorrect": true },
            { "text": "To manage budgets", "isCorrect": false },
            { "text": "To code brand assets", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you handle a client who dislikes your brand identity proposal?",
          "options": [
            { "text": "Defend the proposal without discussion", "isCorrect": false },
            { "text": "Seek specific feedback and revise", "isCorrect": true },
            { "text": "Ignore the client", "isCorrect": false },
            { "text": "Abandon the project", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What does the term 'brand voice' refer to?",
          "options": [
            { "text": "The visual style of the brand", "isCorrect": false },
            { "text": "The tone and personality in communication", "isCorrect": true },
            { "text": "The logo design", "isCorrect": false },
            { "text": "The budget allocation", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you differentiate a brand from its competitors?",
          "options": [
            { "text": "Use similar visuals", "isCorrect": false },
            { "text": "Highlight unique values and visuals", "isCorrect": true },
            { "text": "Ignore competitors", "isCorrect": false },
            { "text": "Reduce design quality", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of color psychology in brand design?",
          "options": [
            { "text": "It’s irrelevant", "isCorrect": false },
            { "text": "It evokes emotions aligned with the brand", "isCorrect": true },
            { "text": "It’s only for digital design", "isCorrect": false },
            { "text": "It replaces typography", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you approach a rebranding project?",
          "options": [
            { "text": "Start with a new logo", "isCorrect": false },
            { "text": "Analyze current brand and audience needs", "isCorrect": true },
            { "text": "Copy competitor branding", "isCorrect": false },
            { "text": "Ignore client input", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of a mood board in brand design?",
          "options": [
            { "text": "To manage timelines", "isCorrect": false },
            { "text": "To define visual tone and inspiration", "isCorrect": true },
            { "text": "To write brand copy", "isCorrect": false },
            { "text": "To export assets", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you ensure brand consistency across digital and print media?",
          "options": [
            { "text": "Use different visuals for each", "isCorrect": false },
            { "text": "Follow a style guide for all assets", "isCorrect": true },
            { "text": "Ignore print requirements", "isCorrect": false },
            { "text": "Use digital-only settings", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the purpose of a brand archetype?",
          "options": [
            { "text": "To design logos", "isCorrect": false },
            { "text": "To define the brand’s personality", "isCorrect": true },
            { "text": "To manage budgets", "isCorrect": false },
            { "text": "To animate brand assets", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you collaborate with a marketing team on a branding project?",
          "options": [
            { "text": "Work independently", "isCorrect": false },
            { "text": "Align on brand messaging and visuals", "isCorrect": true },
            { "text": "Take over marketing tasks", "isCorrect": false },
            { "text": "Ignore their input", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of typography in brand identity?",
          "options": [
            { "text": "It’s optional", "isCorrect": false },
            { "text": "It reinforces brand personality", "isCorrect": true },
            { "text": "It’s only for print", "isCorrect": false },
            { "text": "It replaces logos", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you handle tight deadlines in a branding project?",
          "options": [
            { "text": "Skip research", "isCorrect": false },
            { "text": "Prioritize tasks and streamline workflows", "isCorrect": true },
            { "text": "Deliver incomplete designs", "isCorrect": false },
            { "text": "Avoid client communication", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of competitor analysis in brand design?",
          "options": [
            { "text": "To copy their visuals", "isCorrect": false },
            { "text": "To identify differentiation opportunities", "isCorrect": true },
            { "text": "To reduce costs", "isCorrect": false },
            { "text": "To avoid branding", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you measure the success of a brand identity?",
          "options": [
            { "text": "By personal opinion", "isCorrect": false },
            { "text": "By audience recognition and engagement", "isCorrect": true },
            { "text": "By team size", "isCorrect": false },
            { "text": "By project budget", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of a brand designer in a product launch?",
          "options": [
            { "text": "Manage logistics", "isCorrect": false },
            { "text": "Create cohesive packaging and visuals", "isCorrect": true },
            { "text": "Write marketing copy", "isCorrect": false },
            { "text": "Handle finances", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you ensure a brand design is accessible?",
          "options": [
            { "text": "Use low-contrast colors", "isCorrect": false },
            { "text": "Use legible fonts and high contrast", "isCorrect": true },
            { "text": "Ignore accessibility", "isCorrect": false },
            { "text": "Use complex visuals", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of sketching during the brand design process?",
          "options": [
            { "text": "It’s time-consuming", "isCorrect": false },
            { "text": "It explores ideas quickly", "isCorrect": true },
            { "text": "It replaces final designs", "isCorrect": false },
            { "text": "It manages budgets", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you approach designing for a global brand?",
          "options": [
            { "text": "Use local references only", "isCorrect": false },
            { "text": "Use universal visuals and cultural sensitivity", "isCorrect": true },
            { "text": "Ignore global audiences", "isCorrect": false },
            { "text": "Use complex symbols", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the significance of a brand’s logo?",
          "options": [
            { "text": "It’s optional", "isCorrect": false },
            { "text": "It serves as a recognizable symbol", "isCorrect": true },
            { "text": "It’s only for digital use", "isCorrect": false },
            { "text": "It replaces typography", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you handle conflicting stakeholder feedback on a brand design?",
          "options": [
            { "text": "Follow the loudest voice", "isCorrect": false },
            { "text": "Facilitate discussion to align priorities", "isCorrect": true },
            { "text": "Ignore all feedback", "isCorrect": false },
            { "text": "Delay the project", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of storytelling in brand design?",
          "options": [
            { "text": "It’s irrelevant", "isCorrect": false },
            { "text": "It builds emotional connections", "isCorrect": true },
            { "text": "It’s only for marketing", "isCorrect": false },
            { "text": "It replaces visuals", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you stay updated with branding trends?",
          "options": [
            { "text": "Ignore trends", "isCorrect": false },
            { "text": "Follow industry blogs and case studies", "isCorrect": true },
            { "text": "Copy competitors", "isCorrect": false },
            { "text": "Avoid new tools", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of a brand positioning statement?",
          "options": [
            { "text": "To design logos", "isCorrect": false },
            { "text": "To clarify the brand’s unique value", "isCorrect": true },
            { "text": "To manage budgets", "isCorrect": false },
            { "text": "To animate assets", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you ensure a brand design is adaptable across platforms?",
          "options": [
            { "text": "Use fixed designs", "isCorrect": false },
            { "text": "Create flexible assets and test variations", "isCorrect": true },
            { "text": "Ignore platform differences", "isCorrect": false },
            { "text": "Use print-only formats", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of a Brand Designer in a social media campaign?",
          "options": [
            { "text": "Manage ad budgets", "isCorrect": false },
            { "text": "Create consistent visuals and messaging", "isCorrect": true },
            { "text": "Write campaign copy", "isCorrect": false },
            { "text": "Handle analytics", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you approach a project requiring a new skill, like motion branding?",
          "options": [
            { "text": "Decline the project", "isCorrect": false },
            { "text": "Learn or collaborate with specialists", "isCorrect": true },
            { "text": "Fake the expertise", "isCorrect": false },
            { "text": "Ignore the requirement", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of mockups in brand design presentations?",
          "options": [
            { "text": "They increase costs", "isCorrect": false },
            { "text": "They show designs in real-world contexts", "isCorrect": true },
            { "text": "They replace final assets", "isCorrect": false },
            { "text": "They manage timelines", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you prioritize tasks in a multi-brand project workflow?",
          "options": [
            { "text": "Work on all brands simultaneously", "isCorrect": false },
            { "text": "Set priorities based on deadlines", "isCorrect": true },
            { "text": "Focus on one brand only", "isCorrect": false },
            { "text": "Avoid planning", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of feedback in the brand design process?",
          "options": [
            { "text": "It’s unnecessary", "isCorrect": false },
            { "text": "It refines and strengthens the identity", "isCorrect": true },
            { "text": "It replaces the brand brief", "isCorrect": false },
            { "text": "It delays the project", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you handle a client with unrealistic branding expectations?",
          "options": [
            { "text": "Agree to everything", "isCorrect": false },
            { "text": "Educate and propose feasible solutions", "isCorrect": true },
            { "text": "Ignore their requests", "isCorrect": false },
            { "text": "Abandon the project", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the significance of brand equity?",
          "options": [
            { "text": "It’s irrelevant", "isCorrect": false },
            { "text": "It reflects the brand’s value and perception", "isCorrect": true },
            { "text": "It’s only for logos", "isCorrect": false },
            { "text": "It replaces marketing", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you ensure a brand design supports business goals?",
          "options": [
            { "text": "Focus only on aesthetics", "isCorrect": false },
            { "text": "Align visuals with brand strategy", "isCorrect": true },
            { "text": "Ignore business objectives", "isCorrect": false },
            { "text": "Use random designs", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What should a Brand Designer’s portfolio primarily showcase?",
          "options": [
            { "text": "Only personal projects", "isCorrect": false },
            { "text": "Diverse brand identities with context", "isCorrect": true },
            { "text": "Only logos", "isCorrect": false },
            { "text": "Static visuals only", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you present your branding work during an interview?",
          "options": [
            { "text": "Show visuals without explanation", "isCorrect": false },
            { "text": "Explain the strategy and impact", "isCorrect": true },
            { "text": "Focus only on aesthetics", "isCorrect": false },
            { "text": "Avoid recent work", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of a brand refresh versus a full rebrand?",
          "options": [
            { "text": "It’s more expensive", "isCorrect": false },
            { "text": "It updates the brand while retaining equity", "isCorrect": true },
            { "text": "It replaces the brand entirely", "isCorrect": false },
            { "text": "It avoids client input", "isCorrect": false }
          ],
          "difficulty": "medium"
        }
      ],
      isAvailable : true,
      category : "Brand Designer"
    },
    {
      title : 'Video Editor Level 1',
      questions : [
        {
          "questionType": "text",
          "text": "What is the primary role of a Video Editor?",
          "options": [
            { "text": "To write scripts", "isCorrect": false },
            { "text": "To assemble and refine video footage", "isCorrect": true },
            { "text": "To manage project budgets", "isCorrect": false },
            { "text": "To design animations", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "Which software is most commonly used for professional video editing?",
          "options": [
            { "text": "Adobe Photoshop", "isCorrect": false },
            { "text": "Adobe Premiere Pro", "isCorrect": true },
            { "text": "Adobe Illustrator", "isCorrect": false },
            { "text": "Blender", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What does the term 'cut' refer to in video editing?",
          "options": [
            { "text": "Adding visual effects", "isCorrect": false },
            { "text": "Transitioning between two shots", "isCorrect": true },
            { "text": "Adjusting audio levels", "isCorrect": false },
            { "text": "Exporting the final video", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What is the purpose of a rough cut in the editing process?",
          "options": [
            { "text": "To finalize the video", "isCorrect": false },
            { "text": "To create an initial draft of the edit", "isCorrect": true },
            { "text": "To add special effects", "isCorrect": false },
            { "text": "To manage project timelines", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you ensure a video edit aligns with a client’s vision?",
          "options": [
            { "text": "Use personal preferences", "isCorrect": false },
            { "text": "Follow the creative brief and client feedback", "isCorrect": true },
            { "text": "Copy competitor videos", "isCorrect": false },
            { "text": "Ignore client input", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "Which tool is best for color grading in video editing?",
          "options": [
            { "text": "Adobe After Effects", "isCorrect": false },
            { "text": "DaVinci Resolve", "isCorrect": true },
            { "text": "Final Cut Pro", "isCorrect": false },
            { "text": "Adobe Audition", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of a timeline in video editing software?",
          "options": [
            { "text": "To manage budgets", "isCorrect": false },
            { "text": "To arrange and edit clips sequentially", "isCorrect": true },
            { "text": "To design graphics", "isCorrect": false },
            { "text": "To export videos", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you handle a client requesting last-minute changes to a video edit?",
          "options": [
            { "text": "Refuse the changes", "isCorrect": false },
            { "text": "Assess feasibility and adjust timelines", "isCorrect": true },
            { "text": "Ignore the request", "isCorrect": false },
            { "text": "Restart the edit", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What does the term 'frame rate' refer to in video editing?",
          "options": [
            { "text": "The resolution of the video", "isCorrect": false },
            { "text": "The number of frames per second", "isCorrect": true },
            { "text": "The audio bitrate", "isCorrect": false },
            { "text": "The export format", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you ensure audio syncs properly with video footage?",
          "options": [
            { "text": "Ignore audio timing", "isCorrect": false },
            { "text": "Align waveforms and use sync markers", "isCorrect": true },
            { "text": "Use random audio clips", "isCorrect": false },
            { "text": "Export without checking", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the purpose of a storyboard in video editing?",
          "options": [
            { "text": "To finalize the budget", "isCorrect": false },
            { "text": "To guide the editing process visually", "isCorrect": true },
            { "text": "To export the video", "isCorrect": false },
            { "text": "To manage team schedules", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you approach editing a video for a diverse audience?",
          "options": [
            { "text": "Use local references only", "isCorrect": false },
            { "text": "Incorporate inclusive visuals and subtitles", "isCorrect": true },
            { "text": "Ignore audience diversity", "isCorrect": false },
            { "text": "Use complex jargon", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "Which file format is best for delivering high-quality video edits?",
          "options": [
            { "text": "GIF", "isCorrect": false },
            { "text": "MP4", "isCorrect": true },
            { "text": "JPEG", "isCorrect": false },
            { "text": "PNG", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you stay updated with video editing trends?",
          "options": [
            { "text": "Ignore trends", "isCorrect": false },
            { "text": "Follow tutorials and industry blogs", "isCorrect": true },
            { "text": "Copy competitors", "isCorrect": false },
            { "text": "Avoid new tools", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of using keyframes in video editing?",
          "options": [
            { "text": "To increase file size", "isCorrect": false },
            { "text": "To animate properties over time", "isCorrect": true },
            { "text": "To export videos", "isCorrect": false },
            { "text": "To manage audio", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you handle tight deadlines without compromising edit quality?",
          "options": [
            { "text": "Skip quality checks", "isCorrect": false },
            { "text": "Prioritize tasks and optimize workflows", "isCorrect": true },
            { "text": "Deliver incomplete edits", "isCorrect": false },
            { "text": "Avoid client communication", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of transitions in video editing?",
          "options": [
            { "text": "To adjust audio levels", "isCorrect": false },
            { "text": "To smoothly connect different scenes", "isCorrect": true },
            { "text": "To export videos", "isCorrect": false },
            { "text": "To design graphics", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you approach a project requiring a new skill, like motion graphics?",
          "options": [
            { "text": "Decline the project", "isCorrect": false },
            { "text": "Learn or collaborate with specialists", "isCorrect": true },
            { "text": "Fake the expertise", "isCorrect": false },
            { "text": "Ignore the requirement", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of using a proxy workflow in video editing?",
          "options": [
            { "text": "It increases render time", "isCorrect": false },
            { "text": "It speeds up editing with low-res files", "isCorrect": true },
            { "text": "It replaces final exports", "isCorrect": false },
            { "text": "It manages audio", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you ensure a video edit is optimized for social media platforms?",
          "options": [
            { "text": "Use high-resolution files only", "isCorrect": false },
            { "text": "Adjust aspect ratios and file sizes", "isCorrect": true },
            { "text": "Ignore platform specs", "isCorrect": false },
            { "text": "Use broadcast settings", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the significance of pacing in video editing?",
          "options": [
            { "text": "It’s irrelevant", "isCorrect": false },
            { "text": "It controls the rhythm and engagement", "isCorrect": true },
            { "text": "It’s only for audio", "isCorrect": false },
            { "text": "It replaces visuals", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you handle conflicting feedback from multiple stakeholders?",
          "options": [
            { "text": "Follow the loudest voice", "isCorrect": false },
            { "text": "Facilitate discussion to align priorities", "isCorrect": true },
            { "text": "Ignore all feedback", "isCorrect": false },
            { "text": "Delay the project", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "Which tool is best for editing audio within a video project?",
          "options": [
            { "text": "Adobe After Effects", "isCorrect": false },
            { "text": "Adobe Audition", "isCorrect": true },
            { "text": "Adobe Illustrator", "isCorrect": false },
            { "text": "Figma", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What is the purpose of a LUT in video editing?",
          "options": [
            { "text": "To adjust audio levels", "isCorrect": false },
            { "text": "To apply consistent color grading", "isCorrect": true },
            { "text": "To animate text", "isCorrect": false },
            { "text": "To export videos", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you measure the success of a video edit?",
          "options": [
            { "text": "By personal opinion", "isCorrect": false },
            { "text": "By audience engagement and feedback", "isCorrect": true },
            { "text": "By team size", "isCorrect": false },
            { "text": "By project budget", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of using a shot list during editing?",
          "options": [
            { "text": "It increases costs", "isCorrect": false },
            { "text": "It organizes footage for efficient editing", "isCorrect": true },
            { "text": "It replaces the final edit", "isCorrect": false },
            { "text": "It manages audio", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you collaborate with a director on a video project?",
          "options": [
            { "text": "Work independently", "isCorrect": false },
            { "text": "Align on creative vision and feedback", "isCorrect": true },
            { "text": "Take over directing tasks", "isCorrect": false },
            { "text": "Ignore their input", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of sound design in video editing?",
          "options": [
            { "text": "It’s optional", "isCorrect": false },
            { "text": "It enhances mood and immersion", "isCorrect": true },
            { "text": "It’s only for visuals", "isCorrect": false },
            { "text": "It replaces footage", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you ensure accessibility in video edits?",
          "options": [
            { "text": "Use low-contrast text", "isCorrect": false },
            { "text": "Add captions and descriptive audio", "isCorrect": true },
            { "text": "Ignore accessibility", "isCorrect": false },
            { "text": "Use complex visuals only", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the advantage of multi-cam editing in video production?",
          "options": [
            { "text": "It slows down the process", "isCorrect": false },
            { "text": "It syncs multiple angles efficiently", "isCorrect": true },
            { "text": "It replaces audio editing", "isCorrect": false },
            { "text": "It manages budgets", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you approach editing for different platforms, like TV and YouTube?",
          "options": [
            { "text": "Use the same settings for all", "isCorrect": false },
            { "text": "Adjust formats and pacing for each", "isCorrect": true },
            { "text": "Ignore platform specs", "isCorrect": false },
            { "text": "Use TV-only settings", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of a Video Editor in a marketing campaign?",
          "options": [
            { "text": "Manage ad budgets", "isCorrect": false },
            { "text": "Create engaging and branded videos", "isCorrect": true },
            { "text": "Write campaign copy", "isCorrect": false },
            { "text": "Handle analytics", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you handle a client with unrealistic editing expectations?",
          "options": [
            { "text": "Agree to everything", "isCorrect": false },
            { "text": "Educate and propose feasible solutions", "isCorrect": true },
            { "text": "Ignore their requests", "isCorrect": false },
            { "text": "Abandon the project", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of organizing footage before editing?",
          "options": [
            { "text": "It’s time-consuming", "isCorrect": false },
            { "text": "It streamlines the editing process", "isCorrect": true },
            { "text": "It replaces the final edit", "isCorrect": false },
            { "text": "It manages audio", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you prioritize tasks in a multi-video project workflow?",
          "options": [
            { "text": "Work on all videos simultaneously", "isCorrect": false },
            { "text": "Set priorities based on deadlines", "isCorrect": true },
            { "text": "Focus on one video only", "isCorrect": false },
            { "text": "Avoid planning", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the significance of narrative structure in video editing?",
          "options": [
            { "text": "It’s irrelevant", "isCorrect": false },
            { "text": "It guides the story and engagement", "isCorrect": true },
            { "text": "It’s only for audio", "isCorrect": false },
            { "text": "It replaces visuals", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you approach editing a promotional video?",
          "options": [
            { "text": "Use random clips", "isCorrect": false },
            { "text": "Highlight key messages and brand", "isCorrect": true },
            { "text": "Ignore the brief", "isCorrect": false },
            { "text": "Use long takes only", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of feedback in the video editing process?",
          "options": [
            { "text": "It’s unnecessary", "isCorrect": false },
            { "text": "It refines and improves the edit", "isCorrect": true },
            { "text": "It replaces the creative brief", "isCorrect": false },
            { "text": "It delays the project", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What should a Video Editor’s portfolio primarily showcase?",
          "options": [
            { "text": "Only personal projects", "isCorrect": false },
            { "text": "Diverse edits with context and impact", "isCorrect": true },
            { "text": "Only raw footage", "isCorrect": false },
            { "text": "Static visuals only", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you present your editing work during an interview?",
          "options": [
            { "text": "Show clips without explanation", "isCorrect": false },
            { "text": "Explain the process and creative choices", "isCorrect": true },
            { "text": "Focus only on visuals", "isCorrect": false },
            { "text": "Avoid recent work", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of competitor analysis in video editing?",
          "options": [
            { "text": "To copy their edits", "isCorrect": false },
            { "text": "To identify unique storytelling approaches", "isCorrect": true },
            { "text": "To reduce costs", "isCorrect": false },
            { "text": "To avoid editing", "isCorrect": false }
          ],
          "difficulty": "medium"
        }
      ],
      isAvailable : true,
      category : "Video Editor"
    },
    {
      title : 'Video Editor Level 2',
      questions : [
        {
          "questionType": "text",
          "text": "What is the primary role of a Video Editor?",
          "options": [
            { "text": "To write scripts", "isCorrect": false },
            { "text": "To assemble and refine video footage", "isCorrect": true },
            { "text": "To manage project budgets", "isCorrect": false },
            { "text": "To design animations", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "Which software is most commonly used for professional video editing?",
          "options": [
            { "text": "Adobe Photoshop", "isCorrect": false },
            { "text": "Adobe Premiere Pro", "isCorrect": true },
            { "text": "Adobe Illustrator", "isCorrect": false },
            { "text": "Blender", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What does the term 'cut' refer to in video editing?",
          "options": [
            { "text": "Adding visual effects", "isCorrect": false },
            { "text": "Transitioning between two shots", "isCorrect": true },
            { "text": "Adjusting audio levels", "isCorrect": false },
            { "text": "Exporting the final video", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What is the purpose of a rough cut in the editing process?",
          "options": [
            { "text": "To finalize the video", "isCorrect": false },
            { "text": "To create an initial draft of the edit", "isCorrect": true },
            { "text": "To add special effects", "isCorrect": false },
            { "text": "To manage project timelines", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you ensure a video edit aligns with a client’s vision?",
          "options": [
            { "text": "Use personal preferences", "isCorrect": false },
            { "text": "Follow the creative brief and client feedback", "isCorrect": true },
            { "text": "Copy competitor videos", "isCorrect": false },
            { "text": "Ignore client input", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "Which tool is best for color grading in video editing?",
          "options": [
            { "text": "Adobe After Effects", "isCorrect": false },
            { "text": "DaVinci Resolve", "isCorrect": true },
            { "text": "Final Cut Pro", "isCorrect": false },
            { "text": "Adobe Audition", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of a timeline in video editing software?",
          "options": [
            { "text": "To manage budgets", "isCorrect": false },
            { "text": "To arrange and edit clips sequentially", "isCorrect": true },
            { "text": "To design graphics", "isCorrect": false },
            { "text": "To export videos", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you handle a client requesting last-minute changes to a video edit?",
          "options": [
            { "text": "Refuse the changes", "isCorrect": false },
            { "text": "Assess feasibility and adjust timelines", "isCorrect": true },
            { "text": "Ignore the request", "isCorrect": false },
            { "text": "Restart the edit", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What does the term 'frame rate' refer to in video editing?",
          "options": [
            { "text": "The resolution of the video", "isCorrect": false },
            { "text": "The number of frames per second", "isCorrect": true },
            { "text": "The audio bitrate", "isCorrect": false },
            { "text": "The export format", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you ensure audio syncs properly with video footage?",
          "options": [
            { "text": "Ignore audio timing", "isCorrect": false },
            { "text": "Align waveforms and use sync markers", "isCorrect": true },
            { "text": "Use random audio clips", "isCorrect": false },
            { "text": "Export without checking", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the purpose of a storyboard in video editing?",
          "options": [
            { "text": "To finalize the budget", "isCorrect": false },
            { "text": "To guide the editing process visually", "isCorrect": true },
            { "text": "To export the video", "isCorrect": false },
            { "text": "To manage team schedules", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you approach editing a video for a diverse audience?",
          "options": [
            { "text": "Use local references only", "isCorrect": false },
            { "text": "Incorporate inclusive visuals and subtitles", "isCorrect": true },
            { "text": "Ignore audience diversity", "isCorrect": false },
            { "text": "Use complex jargon", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "Which file format is best for delivering high-quality video edits?",
          "options": [
            { "text": "GIF", "isCorrect": false },
            { "text": "MP4", "isCorrect": true },
            { "text": "JPEG", "isCorrect": false },
            { "text": "PNG", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you stay updated with video editing trends?",
          "options": [
            { "text": "Ignore trends", "isCorrect": false },
            { "text": "Follow tutorials and industry blogs", "isCorrect": true },
            { "text": "Copy competitors", "isCorrect": false },
            { "text": "Avoid new tools", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of using keyframes in video editing?",
          "options": [
            { "text": "To increase file size", "isCorrect": false },
            { "text": "To animate properties over time", "isCorrect": true },
            { "text": "To export videos", "isCorrect": false },
            { "text": "To manage audio", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you handle tight deadlines without compromising edit quality?",
          "options": [
            { "text": "Skip quality checks", "isCorrect": false },
            { "text": "Prioritize tasks and optimize workflows", "isCorrect": true },
            { "text": "Deliver incomplete edits", "isCorrect": false },
            { "text": "Avoid client communication", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of transitions in video editing?",
          "options": [
            { "text": "To adjust audio levels", "isCorrect": false },
            { "text": "To smoothly connect different scenes", "isCorrect": true },
            { "text": "To export videos", "isCorrect": false },
            { "text": "To design graphics", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you approach a project requiring a new skill, like motion graphics?",
          "options": [
            { "text": "Decline the project", "isCorrect": false },
            { "text": "Learn or collaborate with specialists", "isCorrect": true },
            { "text": "Fake the expertise", "isCorrect": false },
            { "text": "Ignore the requirement", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of using a proxy workflow in video editing?",
          "options": [
            { "text": "It increases render time", "isCorrect": false },
            { "text": "It speeds up editing with low-res files", "isCorrect": true },
            { "text": "It replaces final exports", "isCorrect": false },
            { "text": "It manages audio", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you ensure a video edit is optimized for social media platforms?",
          "options": [
            { "text": "Use high-resolution files only", "isCorrect": false },
            { "text": "Adjust aspect ratios and file sizes", "isCorrect": true },
            { "text": "Ignore platform specs", "isCorrect": false },
            { "text": "Use broadcast settings", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the significance of pacing in video editing?",
          "options": [
            { "text": "It’s irrelevant", "isCorrect": false },
            { "text": "It controls the rhythm and engagement", "isCorrect": true },
            { "text": "It’s only for audio", "isCorrect": false },
            { "text": "It replaces visuals", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you handle conflicting feedback from multiple stakeholders?",
          "options": [
            { "text": "Follow the loudest voice", "isCorrect": false },
            { "text": "Facilitate discussion to align priorities", "isCorrect": true },
            { "text": "Ignore all feedback", "isCorrect": false },
            { "text": "Delay the project", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "Which tool is best for editing audio within a video project?",
          "options": [
            { "text": "Adobe After Effects", "isCorrect": false },
            { "text": "Adobe Audition", "isCorrect": true },
            { "text": "Adobe Illustrator", "isCorrect": false },
            { "text": "Figma", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What is the purpose of a LUT in video editing?",
          "options": [
            { "text": "To adjust audio levels", "isCorrect": false },
            { "text": "To apply consistent color grading", "isCorrect": true },
            { "text": "To animate text", "isCorrect": false },
            { "text": "To export videos", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you measure the success of a video edit?",
          "options": [
            { "text": "By personal opinion", "isCorrect": false },
            { "text": "By audience engagement and feedback", "isCorrect": true },
            { "text": "By team size", "isCorrect": false },
            { "text": "By project budget", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of using a shot list during editing?",
          "options": [
            { "text": "It increases costs", "isCorrect": false },
            { "text": "It organizes footage for efficient editing", "isCorrect": true },
            { "text": "It replaces the final edit", "isCorrect": false },
            { "text": "It manages audio", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you collaborate with a director on a video project?",
          "options": [
            { "text": "Work independently", "isCorrect": false },
            { "text": "Align on creative vision and feedback", "isCorrect": true },
            { "text": "Take over directing tasks", "isCorrect": false },
            { "text": "Ignore their input", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of sound design in video editing?",
          "options": [
            { "text": "It’s optional", "isCorrect": false },
            { "text": "It enhances mood and immersion", "isCorrect": true },
            { "text": "It’s only for visuals", "isCorrect": false },
            { "text": "It replaces footage", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you ensure accessibility in video edits?",
          "options": [
            { "text": "Use low-contrast text", "isCorrect": false },
            { "text": "Add captions and descriptive audio", "isCorrect": true },
            { "text": "Ignore accessibility", "isCorrect": false },
            { "text": "Use complex visuals only", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the advantage of multi-cam editing in video production?",
          "options": [
            { "text": "It slows down the process", "isCorrect": false },
            { "text": "It syncs multiple angles efficiently", "isCorrect": true },
            { "text": "It replaces audio editing", "isCorrect": false },
            { "text": "It manages budgets", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you approach editing for different platforms, like TV and YouTube?",
          "options": [
            { "text": "Use the same settings for all", "isCorrect": false },
            { "text": "Adjust formats and pacing for each", "isCorrect": true },
            { "text": "Ignore platform specs", "isCorrect": false },
            { "text": "Use TV-only settings", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of a Video Editor in a marketing campaign?",
          "options": [
            { "text": "Manage ad budgets", "isCorrect": false },
            { "text": "Create engaging and branded videos", "isCorrect": true },
            { "text": "Write campaign copy", "isCorrect": false },
            { "text": "Handle analytics", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you handle a client with unrealistic editing expectations?",
          "options": [
            { "text": "Agree to everything", "isCorrect": false },
            { "text": "Educate and propose feasible solutions", "isCorrect": true },
            { "text": "Ignore their requests", "isCorrect": false },
            { "text": "Abandon the project", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of organizing footage before editing?",
          "options": [
            { "text": "It’s time-consuming", "isCorrect": false },
            { "text": "It streamlines the editing process", "isCorrect": true },
            { "text": "It replaces the final edit", "isCorrect": false },
            { "text": "It manages audio", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you prioritize tasks in a multi-video project workflow?",
          "options": [
            { "text": "Work on all videos simultaneously", "isCorrect": false },
            { "text": "Set priorities based on deadlines", "isCorrect": true },
            { "text": "Focus on one video only", "isCorrect": false },
            { "text": "Avoid planning", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the significance of narrative structure in video editing?",
          "options": [
            { "text": "It’s irrelevant", "isCorrect": false },
            { "text": "It guides the story and engagement", "isCorrect": true },
            { "text": "It’s only for audio", "isCorrect": false },
            { "text": "It replaces visuals", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you approach editing a promotional video?",
          "options": [
            { "text": "Use random clips", "isCorrect": false },
            { "text": "Highlight key messages and brand", "isCorrect": true },
            { "text": "Ignore the brief", "isCorrect": false },
            { "text": "Use long takes only", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of feedback in the video editing process?",
          "options": [
            { "text": "It’s unnecessary", "isCorrect": false },
            { "text": "It refines and improves the edit", "isCorrect": true },
            { "text": "It replaces the creative brief", "isCorrect": false },
            { "text": "It delays the project", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What should a Video Editor’s portfolio primarily showcase?",
          "options": [
            { "text": "Only personal projects", "isCorrect": false },
            { "text": "Diverse edits with context and impact", "isCorrect": true },
            { "text": "Only raw footage", "isCorrect": false },
            { "text": "Static visuals only", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you present your editing work during an interview?",
          "options": [
            { "text": "Show clips without explanation", "isCorrect": false },
            { "text": "Explain the process and creative choices", "isCorrect": true },
            { "text": "Focus only on visuals", "isCorrect": false },
            { "text": "Avoid recent work", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of competitor analysis in video editing?",
          "options": [
            { "text": "To copy their edits", "isCorrect": false },
            { "text": "To identify unique storytelling approaches", "isCorrect": true },
            { "text": "To reduce costs", "isCorrect": false },
            { "text": "To avoid editing", "isCorrect": false }
          ],
          "difficulty": "medium"
        }
      ],
      isAvailable : true,
      category : "Video Editor"
    },
    {
      title : 'Video Editor Level 3',
      questions : [
        {
          "questionType": "text",
          "text": "What is the primary role of a Video Editor?",
          "options": [
            { "text": "To write scripts", "isCorrect": false },
            { "text": "To assemble and refine video footage", "isCorrect": true },
            { "text": "To manage project budgets", "isCorrect": false },
            { "text": "To design animations", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "Which software is most commonly used for professional video editing?",
          "options": [
            { "text": "Adobe Photoshop", "isCorrect": false },
            { "text": "Adobe Premiere Pro", "isCorrect": true },
            { "text": "Adobe Illustrator", "isCorrect": false },
            { "text": "Blender", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What does the term 'cut' refer to in video editing?",
          "options": [
            { "text": "Adding visual effects", "isCorrect": false },
            { "text": "Transitioning between two shots", "isCorrect": true },
            { "text": "Adjusting audio levels", "isCorrect": false },
            { "text": "Exporting the final video", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What is the purpose of a rough cut in the editing process?",
          "options": [
            { "text": "To finalize the video", "isCorrect": false },
            { "text": "To create an initial draft of the edit", "isCorrect": true },
            { "text": "To add special effects", "isCorrect": false },
            { "text": "To manage project timelines", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you ensure a video edit aligns with a client’s vision?",
          "options": [
            { "text": "Use personal preferences", "isCorrect": false },
            { "text": "Follow the creative brief and client feedback", "isCorrect": true },
            { "text": "Copy competitor videos", "isCorrect": false },
            { "text": "Ignore client input", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "Which tool is best for color grading in video editing?",
          "options": [
            { "text": "Adobe After Effects", "isCorrect": false },
            { "text": "DaVinci Resolve", "isCorrect": true },
            { "text": "Final Cut Pro", "isCorrect": false },
            { "text": "Adobe Audition", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of a timeline in video editing software?",
          "options": [
            { "text": "To manage budgets", "isCorrect": false },
            { "text": "To arrange and edit clips sequentially", "isCorrect": true },
            { "text": "To design graphics", "isCorrect": false },
            { "text": "To export videos", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you handle a client requesting last-minute changes to a video edit?",
          "options": [
            { "text": "Refuse the changes", "isCorrect": false },
            { "text": "Assess feasibility and adjust timelines", "isCorrect": true },
            { "text": "Ignore the request", "isCorrect": false },
            { "text": "Restart the edit", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What does the term 'frame rate' refer to in video editing?",
          "options": [
            { "text": "The resolution of the video", "isCorrect": false },
            { "text": "The number of frames per second", "isCorrect": true },
            { "text": "The audio bitrate", "isCorrect": false },
            { "text": "The export format", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you ensure audio syncs properly with video footage?",
          "options": [
            { "text": "Ignore audio timing", "isCorrect": false },
            { "text": "Align waveforms and use sync markers", "isCorrect": true },
            { "text": "Use random audio clips", "isCorrect": false },
            { "text": "Export without checking", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the purpose of a storyboard in video editing?",
          "options": [
            { "text": "To finalize the budget", "isCorrect": false },
            { "text": "To guide the editing process visually", "isCorrect": true },
            { "text": "To export the video", "isCorrect": false },
            { "text": "To manage team schedules", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you approach editing a video for a diverse audience?",
          "options": [
            { "text": "Use local references only", "isCorrect": false },
            { "text": "Incorporate inclusive visuals and subtitles", "isCorrect": true },
            { "text": "Ignore audience diversity", "isCorrect": false },
            { "text": "Use complex jargon", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "Which file format is best for delivering high-quality video edits?",
          "options": [
            { "text": "GIF", "isCorrect": false },
            { "text": "MP4", "isCorrect": true },
            { "text": "JPEG", "isCorrect": false },
            { "text": "PNG", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you stay updated with video editing trends?",
          "options": [
            { "text": "Ignore trends", "isCorrect": false },
            { "text": "Follow tutorials and industry blogs", "isCorrect": true },
            { "text": "Copy competitors", "isCorrect": false },
            { "text": "Avoid new tools", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of using keyframes in video editing?",
          "options": [
            { "text": "To increase file size", "isCorrect": false },
            { "text": "To animate properties over time", "isCorrect": true },
            { "text": "To export videos", "isCorrect": false },
            { "text": "To manage audio", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you handle tight deadlines without compromising edit quality?",
          "options": [
            { "text": "Skip quality checks", "isCorrect": false },
            { "text": "Prioritize tasks and optimize workflows", "isCorrect": true },
            { "text": "Deliver incomplete edits", "isCorrect": false },
            { "text": "Avoid client communication", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of transitions in video editing?",
          "options": [
            { "text": "To adjust audio levels", "isCorrect": false },
            { "text": "To smoothly connect different scenes", "isCorrect": true },
            { "text": "To export videos", "isCorrect": false },
            { "text": "To design graphics", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you approach a project requiring a new skill, like motion graphics?",
          "options": [
            { "text": "Decline the project", "isCorrect": false },
            { "text": "Learn or collaborate with specialists", "isCorrect": true },
            { "text": "Fake the expertise", "isCorrect": false },
            { "text": "Ignore the requirement", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of using a proxy workflow in video editing?",
          "options": [
            { "text": "It increases render time", "isCorrect": false },
            { "text": "It speeds up editing with low-res files", "isCorrect": true },
            { "text": "It replaces final exports", "isCorrect": false },
            { "text": "It manages audio", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you ensure a video edit is optimized for social media platforms?",
          "options": [
            { "text": "Use high-resolution files only", "isCorrect": false },
            { "text": "Adjust aspect ratios and file sizes", "isCorrect": true },
            { "text": "Ignore platform specs", "isCorrect": false },
            { "text": "Use broadcast settings", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the significance of pacing in video editing?",
          "options": [
            { "text": "It’s irrelevant", "isCorrect": false },
            { "text": "It controls the rhythm and engagement", "isCorrect": true },
            { "text": "It’s only for audio", "isCorrect": false },
            { "text": "It replaces visuals", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you handle conflicting feedback from multiple stakeholders?",
          "options": [
            { "text": "Follow the loudest voice", "isCorrect": false },
            { "text": "Facilitate discussion to align priorities", "isCorrect": true },
            { "text": "Ignore all feedback", "isCorrect": false },
            { "text": "Delay the project", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "Which tool is best for editing audio within a video project?",
          "options": [
            { "text": "Adobe After Effects", "isCorrect": false },
            { "text": "Adobe Audition", "isCorrect": true },
            { "text": "Adobe Illustrator", "isCorrect": false },
            { "text": "Figma", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What is the purpose of a LUT in video editing?",
          "options": [
            { "text": "To adjust audio levels", "isCorrect": false },
            { "text": "To apply consistent color grading", "isCorrect": true },
            { "text": "To animate text", "isCorrect": false },
            { "text": "To export videos", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you measure the success of a video edit?",
          "options": [
            { "text": "By personal opinion", "isCorrect": false },
            { "text": "By audience engagement and feedback", "isCorrect": true },
            { "text": "By team size", "isCorrect": false },
            { "text": "By project budget", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of using a shot list during editing?",
          "options": [
            { "text": "It increases costs", "isCorrect": false },
            { "text": "It organizes footage for efficient editing", "isCorrect": true },
            { "text": "It replaces the final edit", "isCorrect": false },
            { "text": "It manages audio", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you collaborate with a director on a video project?",
          "options": [
            { "text": "Work independently", "isCorrect": false },
            { "text": "Align on creative vision and feedback", "isCorrect": true },
            { "text": "Take over directing tasks", "isCorrect": false },
            { "text": "Ignore their input", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of sound design in video editing?",
          "options": [
            { "text": "It’s optional", "isCorrect": false },
            { "text": "It enhances mood and immersion", "isCorrect": true },
            { "text": "It’s only for visuals", "isCorrect": false },
            { "text": "It replaces footage", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you ensure accessibility in video edits?",
          "options": [
            { "text": "Use low-contrast text", "isCorrect": false },
            { "text": "Add captions and descriptive audio", "isCorrect": true },
            { "text": "Ignore accessibility", "isCorrect": false },
            { "text": "Use complex visuals only", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the advantage of multi-cam editing in video production?",
          "options": [
            { "text": "It slows down the process", "isCorrect": false },
            { "text": "It syncs multiple angles efficiently", "isCorrect": true },
            { "text": "It replaces audio editing", "isCorrect": false },
            { "text": "It manages budgets", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you approach editing for different platforms, like TV and YouTube?",
          "options": [
            { "text": "Use the same settings for all", "isCorrect": false },
            { "text": "Adjust formats and pacing for each", "isCorrect": true },
            { "text": "Ignore platform specs", "isCorrect": false },
            { "text": "Use TV-only settings", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of a Video Editor in a marketing campaign?",
          "options": [
            { "text": "Manage ad budgets", "isCorrect": false },
            { "text": "Create engaging and branded videos", "isCorrect": true },
            { "text": "Write campaign copy", "isCorrect": false },
            { "text": "Handle analytics", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you handle a client with unrealistic editing expectations?",
          "options": [
            { "text": "Agree to everything", "isCorrect": false },
            { "text": "Educate and propose feasible solutions", "isCorrect": true },
            { "text": "Ignore their requests", "isCorrect": false },
            { "text": "Abandon the project", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of organizing footage before editing?",
          "options": [
            { "text": "It’s time-consuming", "isCorrect": false },
            { "text": "It streamlines the editing process", "isCorrect": true },
            { "text": "It replaces the final edit", "isCorrect": false },
            { "text": "It manages audio", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you prioritize tasks in a multi-video project workflow?",
          "options": [
            { "text": "Work on all videos simultaneously", "isCorrect": false },
            { "text": "Set priorities based on deadlines", "isCorrect": true },
            { "text": "Focus on one video only", "isCorrect": false },
            { "text": "Avoid planning", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the significance of narrative structure in video editing?",
          "options": [
            { "text": "It’s irrelevant", "isCorrect": false },
            { "text": "It guides the story and engagement", "isCorrect": true },
            { "text": "It’s only for audio", "isCorrect": false },
            { "text": "It replaces visuals", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you approach editing a promotional video?",
          "options": [
            { "text": "Use random clips", "isCorrect": false },
            { "text": "Highlight key messages and brand", "isCorrect": true },
            { "text": "Ignore the brief", "isCorrect": false },
            { "text": "Use long takes only", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of feedback in the video editing process?",
          "options": [
            { "text": "It’s unnecessary", "isCorrect": false },
            { "text": "It refines and improves the edit", "isCorrect": true },
            { "text": "It replaces the creative brief", "isCorrect": false },
            { "text": "It delays the project", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What should a Video Editor’s portfolio primarily showcase?",
          "options": [
            { "text": "Only personal projects", "isCorrect": false },
            { "text": "Diverse edits with context and impact", "isCorrect": true },
            { "text": "Only raw footage", "isCorrect": false },
            { "text": "Static visuals only", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you present your editing work during an interview?",
          "options": [
            { "text": "Show clips without explanation", "isCorrect": false },
            { "text": "Explain the process and creative choices", "isCorrect": true },
            { "text": "Focus only on visuals", "isCorrect": false },
            { "text": "Avoid recent work", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of competitor analysis in video editing?",
          "options": [
            { "text": "To copy their edits", "isCorrect": false },
            { "text": "To identify unique storytelling approaches", "isCorrect": true },
            { "text": "To reduce costs", "isCorrect": false },
            { "text": "To avoid editing", "isCorrect": false }
          ],
          "difficulty": "medium"
        }
      ],
      isAvailable : true,
      category : "Video Editor"
    },
    {
      title : 'Social Media Assets Designer Level 1',
      questions : [
        {
          "questionType": "text",
          "text": "What is the primary role of a Social Media Assets Designer?",
          "options": [
            { "text": "To manage social media accounts", "isCorrect": false },
            { "text": "To create engaging visuals for social platforms", "isCorrect": true },
            { "text": "To write marketing copy", "isCorrect": false },
            { "text": "To analyze campaign data", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "Which tool is commonly used for designing social media graphics?",
          "options": [
            { "text": "Adobe Premiere Pro", "isCorrect": false },
            { "text": "Canva", "isCorrect": true },
            { "text": "Microsoft Excel", "isCorrect": false },
            { "text": "Blender", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What is the ideal aspect ratio for Instagram posts?",
          "options": [
            { "text": "16:9", "isCorrect": false },
            { "text": "1:1", "isCorrect": true },
            { "text": "4:3", "isCorrect": false },
            { "text": "9:16", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you ensure a social media asset aligns with a brand’s identity?",
          "options": [
            { "text": "Use random colors", "isCorrect": false },
            { "text": "Follow the brand’s style guide", "isCorrect": true },
            { "text": "Copy competitor designs", "isCorrect": false },
            { "text": "Ignore brand guidelines", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What is the purpose of a social media content calendar in design planning?",
          "options": [
            { "text": "To manage budgets", "isCorrect": false },
            { "text": "To schedule and organize visual content", "isCorrect": true },
            { "text": "To edit videos", "isCorrect": false },
            { "text": "To analyze metrics", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you optimize a graphic for fast loading on social media?",
          "options": [
            { "text": "Use high-resolution images only", "isCorrect": false },
            { "text": "Compress files and use appropriate formats", "isCorrect": true },
            { "text": "Ignore file size", "isCorrect": false },
            { "text": "Use print settings", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "Which file format is best for static social media graphics?",
          "options": [
            { "text": "MP4", "isCorrect": false },
            { "text": "PNG", "isCorrect": true },
            { "text": "PDF", "isCorrect": false },
            { "text": "GIF", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you handle a client requesting changes that conflict with platform best practices?",
          "options": [
            { "text": "Agree to all changes", "isCorrect": false },
            { "text": "Explain best practices and propose solutions", "isCorrect": true },
            { "text": "Ignore the client", "isCorrect": false },
            { "text": "Abandon the project", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What does the term 'thumbnail' refer to in social media design?",
          "options": [
            { "text": "A full-size graphic", "isCorrect": false },
            { "text": "A small preview image for videos", "isCorrect": true },
            { "text": "A budget plan", "isCorrect": false },
            { "text": "A font style", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you design assets to increase audience engagement?",
          "options": [
            { "text": "Use complex visuals", "isCorrect": false },
            { "text": "Incorporate bold visuals and clear CTAs", "isCorrect": true },
            { "text": "Ignore audience preferences", "isCorrect": false },
            { "text": "Use low-contrast text", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of typography in social media assets?",
          "options": [
            { "text": "It’s irrelevant", "isCorrect": false },
            { "text": "It enhances readability and brand identity", "isCorrect": true },
            { "text": "It’s only for print", "isCorrect": false },
            { "text": "It replaces imagery", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you stay updated with social media design trends?",
          "options": [
            { "text": "Ignore trends", "isCorrect": false },
            { "text": "Follow platforms and design communities", "isCorrect": true },
            { "text": "Copy competitors", "isCorrect": false },
            { "text": "Avoid new tools", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of using templates for social media design?",
          "options": [
            { "text": "They slow down the process", "isCorrect": false },
            { "text": "They ensure consistency and save time", "isCorrect": true },
            { "text": "They replace creativity", "isCorrect": false },
            { "text": "They increase file size", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you design for Instagram Stories versus TikTok videos?",
          "options": [
            { "text": "Use the same assets for both", "isCorrect": false },
            { "text": "Adjust aspect ratios and pacing", "isCorrect": true },
            { "text": "Ignore platform differences", "isCorrect": false },
            { "text": "Use print formats", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the purpose of a mockup in social media design?",
          "options": [
            { "text": "To manage budgets", "isCorrect": false },
            { "text": "To show assets in a real-world context", "isCorrect": true },
            { "text": "To edit videos", "isCorrect": false },
            { "text": "To analyze metrics", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you ensure accessibility in social media assets?",
          "options": [
            { "text": "Use low-contrast colors", "isCorrect": false },
            { "text": "Use high-contrast text and alt text", "isCorrect": true },
            { "text": "Ignore accessibility", "isCorrect": false },
            { "text": "Use complex visuals", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of color psychology in social media design?",
          "options": [
            { "text": "It’s optional", "isCorrect": false },
            { "text": "It influences emotions and engagement", "isCorrect": true },
            { "text": "It’s only for print", "isCorrect": false },
            { "text": "It replaces typography", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you handle tight deadlines for multiple social media campaigns?",
          "options": [
            { "text": "Skip quality checks", "isCorrect": false },
            { "text": "Prioritize tasks and use templates", "isCorrect": true },
            { "text": "Deliver incomplete assets", "isCorrect": false },
            { "text": "Avoid client communication", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of A/B testing in social media asset design?",
          "options": [
            { "text": "It increases costs", "isCorrect": false },
            { "text": "It identifies the most engaging visuals", "isCorrect": true },
            { "text": "It’s unnecessary", "isCorrect": false },
            { "text": "It replaces creativity", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you collaborate with a social media manager on asset creation?",
          "options": [
            { "text": "Work independently", "isCorrect": false },
            { "text": "Align on campaign goals and specs", "isCorrect": true },
            { "text": "Take over content planning", "isCorrect": false },
            { "text": "Ignore their input", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the ideal duration for a TikTok video to maximize engagement?",
          "options": [
            { "text": "5 minutes", "isCorrect": false },
            { "text": "15–60 seconds", "isCorrect": true },
            { "text": "10 minutes", "isCorrect": false },
            { "text": "2 hours", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you design assets for a diverse global audience?",
          "options": [
            { "text": "Use local references only", "isCorrect": false },
            { "text": "Use inclusive and universal visuals", "isCorrect": true },
            { "text": "Ignore diversity", "isCorrect": false },
            { "text": "Use complex jargon", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of a call-to-action (CTA) in social media assets?",
          "options": [
            { "text": "To increase file size", "isCorrect": false },
            { "text": "To prompt user interaction", "isCorrect": true },
            { "text": "To replace visuals", "isCorrect": false },
            { "text": "To manage budgets", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you approach designing for a new social media platform?",
          "options": [
            { "text": "Use existing assets", "isCorrect": false },
            { "text": "Research platform specs and audience", "isCorrect": true },
            { "text": "Ignore platform guidelines", "isCorrect": false },
            { "text": "Copy competitors", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of using GIFs in social media campaigns?",
          "options": [
            { "text": "They slow down loading", "isCorrect": false },
            { "text": "They add motion and engagement", "isCorrect": true },
            { "text": "They replace static images", "isCorrect": false },
            { "text": "They increase costs", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you handle conflicting feedback from multiple stakeholders?",
          "options": [
            { "text": "Follow the loudest voice", "isCorrect": false },
            { "text": "Facilitate discussion to align priorities", "isCorrect": true },
            { "text": "Ignore all feedback", "isCorrect": false },
            { "text": "Delay the project", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "Which Adobe tool is best for creating social media animations?",
          "options": [
            { "text": "Adobe Illustrator", "isCorrect": false },
            { "text": "Adobe After Effects", "isCorrect": true },
            { "text": "Adobe InDesign", "isCorrect": false },
            { "text": "Adobe Audition", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What is the purpose of a style guide in social media design?",
          "options": [
            { "text": "To manage budgets", "isCorrect": false },
            { "text": "To ensure consistent visuals", "isCorrect": true },
            { "text": "To edit videos", "isCorrect": false },
            { "text": "To schedule posts", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you measure the success of a social media asset?",
          "options": [
            { "text": "By personal opinion", "isCorrect": false },
            { "text": "By engagement metrics like likes", "isCorrect": true },
            { "text": "By team size", "isCorrect": false },
            { "text": "By project budget", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of competitor analysis in social media design?",
          "options": [
            { "text": "To copy their assets", "isCorrect": false },
            { "text": "To identify unique visual strategies", "isCorrect": true },
            { "text": "To reduce costs", "isCorrect": false },
            { "text": "To avoid design work", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you design assets for a time-sensitive campaign, like a holiday promotion?",
          "options": [
            { "text": "Use generic visuals", "isCorrect": false },
            { "text": "Create timely and relevant designs", "isCorrect": true },
            { "text": "Ignore the deadline", "isCorrect": false },
            { "text": "Use outdated assets", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of a Social Media Assets Designer in a product launch?",
          "options": [
            { "text": "Manage ad budgets", "isCorrect": false },
            { "text": "Create branded promotional visuals", "isCorrect": true },
            { "text": "Write product descriptions", "isCorrect": false },
            { "text": "Handle analytics", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you approach a project requiring a new skill, like video editing for Reels?",
          "options": [
            { "text": "Decline the project", "isCorrect": false },
            { "text": "Learn or collaborate with specialists", "isCorrect": true },
            { "text": "Fake the expertise", "isCorrect": false },
            { "text": "Ignore the requirement", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of using user-generated content in social media design?",
          "options": [
            { "text": "It increases costs", "isCorrect": false },
            { "text": "It builds authenticity and engagement", "isCorrect": true },
            { "text": "It replaces professional assets", "isCorrect": false },
            { "text": "It slows down design", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you ensure a social media asset is mobile-friendly?",
          "options": [
            { "text": "Use desktop-only settings", "isCorrect": false },
            { "text": "Test on mobile and optimize visuals", "isCorrect": true },
            { "text": "Ignore mobile users", "isCorrect": false },
            { "text": "Use high-resolution assets only", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of storytelling in social media assets?",
          "options": [
            { "text": "It’s irrelevant", "isCorrect": false },
            { "text": "It creates emotional connections", "isCorrect": true },
            { "text": "It’s only for videos", "isCorrect": false },
            { "text": "It replaces visuals", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you handle a client with unrealistic design expectations?",
          "options": [
            { "text": "Agree to everything", "isCorrect": false },
            { "text": "Educate and propose feasible solutions", "isCorrect": true },
            { "text": "Ignore their requests", "isCorrect": false },
            { "text": "Abandon the project", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of creating platform-specific assets?",
          "options": [
            { "text": "It increases workload", "isCorrect": false },
            { "text": "It maximizes engagement and compatibility", "isCorrect": true },
            { "text": "It replaces creativity", "isCorrect": false },
            { "text": "It slows down delivery", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you prioritize tasks in a multi-platform campaign?",
          "options": [
            { "text": "Work on all platforms simultaneously", "isCorrect": false },
            { "text": "Set priorities based on deadlines", "isCorrect": true },
            { "text": "Focus on one platform only", "isCorrect": false },
            { "text": "Avoid planning", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What should a Social Media Assets Designer’s portfolio primarily showcase?",
          "options": [
            { "text": "Only personal projects", "isCorrect": false },
            { "text": "Platform-specific designs with impact", "isCorrect": true },
            { "text": "Only static images", "isCorrect": false },
            { "text": "Generic visuals only", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you present your social media design work during an interview?",
          "options": [
            { "text": "Show assets without context", "isCorrect": false },
            { "text": "Explain the strategy and results", "isCorrect": true },
            { "text": "Focus only on aesthetics", "isCorrect": false },
            { "text": "Avoid recent work", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of analyzing engagement metrics in social media design?",
          "options": [
            { "text": "It’s unnecessary", "isCorrect": false },
            { "text": "It informs future design decisions", "isCorrect": true },
            { "text": "It increases costs", "isCorrect": false },
            { "text": "It replaces creativity", "isCorrect": false }
          ],
          "difficulty": "medium"
        }
      ],
      isAvailable : true,
      category : "Social Media Assets Designer"
    },
    {
      title : 'Social Media Assets Designer Level 2',
      questions : [
        {
          "questionType": "text",
          "text": "What is the primary role of a Social Media Assets Designer?",
          "options": [
            { "text": "To manage social media accounts", "isCorrect": false },
            { "text": "To create engaging visuals for social platforms", "isCorrect": true },
            { "text": "To write marketing copy", "isCorrect": false },
            { "text": "To analyze campaign data", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "Which tool is commonly used for designing social media graphics?",
          "options": [
            { "text": "Adobe Premiere Pro", "isCorrect": false },
            { "text": "Canva", "isCorrect": true },
            { "text": "Microsoft Excel", "isCorrect": false },
            { "text": "Blender", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What is the ideal aspect ratio for Instagram posts?",
          "options": [
            { "text": "16:9", "isCorrect": false },
            { "text": "1:1", "isCorrect": true },
            { "text": "4:3", "isCorrect": false },
            { "text": "9:16", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you ensure a social media asset aligns with a brand’s identity?",
          "options": [
            { "text": "Use random colors", "isCorrect": false },
            { "text": "Follow the brand’s style guide", "isCorrect": true },
            { "text": "Copy competitor designs", "isCorrect": false },
            { "text": "Ignore brand guidelines", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What is the purpose of a social media content calendar in design planning?",
          "options": [
            { "text": "To manage budgets", "isCorrect": false },
            { "text": "To schedule and organize visual content", "isCorrect": true },
            { "text": "To edit videos", "isCorrect": false },
            { "text": "To analyze metrics", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you optimize a graphic for fast loading on social media?",
          "options": [
            { "text": "Use high-resolution images only", "isCorrect": false },
            { "text": "Compress files and use appropriate formats", "isCorrect": true },
            { "text": "Ignore file size", "isCorrect": false },
            { "text": "Use print settings", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "Which file format is best for static social media graphics?",
          "options": [
            { "text": "MP4", "isCorrect": false },
            { "text": "PNG", "isCorrect": true },
            { "text": "PDF", "isCorrect": false },
            { "text": "GIF", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you handle a client requesting changes that conflict with platform best practices?",
          "options": [
            { "text": "Agree to all changes", "isCorrect": false },
            { "text": "Explain best practices and propose solutions", "isCorrect": true },
            { "text": "Ignore the client", "isCorrect": false },
            { "text": "Abandon the project", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What does the term 'thumbnail' refer to in social media design?",
          "options": [
            { "text": "A full-size graphic", "isCorrect": false },
            { "text": "A small preview image for videos", "isCorrect": true },
            { "text": "A budget plan", "isCorrect": false },
            { "text": "A font style", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you design assets to increase audience engagement?",
          "options": [
            { "text": "Use complex visuals", "isCorrect": false },
            { "text": "Incorporate bold visuals and clear CTAs", "isCorrect": true },
            { "text": "Ignore audience preferences", "isCorrect": false },
            { "text": "Use low-contrast text", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of typography in social media assets?",
          "options": [
            { "text": "It’s irrelevant", "isCorrect": false },
            { "text": "It enhances readability and brand identity", "isCorrect": true },
            { "text": "It’s only for print", "isCorrect": false },
            { "text": "It replaces imagery", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you stay updated with social media design trends?",
          "options": [
            { "text": "Ignore trends", "isCorrect": false },
            { "text": "Follow platforms and design communities", "isCorrect": true },
            { "text": "Copy competitors", "isCorrect": false },
            { "text": "Avoid new tools", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of using templates for social media design?",
          "options": [
            { "text": "They slow down the process", "isCorrect": false },
            { "text": "They ensure consistency and save time", "isCorrect": true },
            { "text": "They replace creativity", "isCorrect": false },
            { "text": "They increase file size", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you design for Instagram Stories versus TikTok videos?",
          "options": [
            { "text": "Use the same assets for both", "isCorrect": false },
            { "text": "Adjust aspect ratios and pacing", "isCorrect": true },
            { "text": "Ignore platform differences", "isCorrect": false },
            { "text": "Use print formats", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the purpose of a mockup in social media design?",
          "options": [
            { "text": "To manage budgets", "isCorrect": false },
            { "text": "To show assets in a real-world context", "isCorrect": true },
            { "text": "To edit videos", "isCorrect": false },
            { "text": "To analyze metrics", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you ensure accessibility in social media assets?",
          "options": [
            { "text": "Use low-contrast colors", "isCorrect": false },
            { "text": "Use high-contrast text and alt text", "isCorrect": true },
            { "text": "Ignore accessibility", "isCorrect": false },
            { "text": "Use complex visuals", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of color psychology in social media design?",
          "options": [
            { "text": "It’s optional", "isCorrect": false },
            { "text": "It influences emotions and engagement", "isCorrect": true },
            { "text": "It’s only for print", "isCorrect": false },
            { "text": "It replaces typography", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you handle tight deadlines for multiple social media campaigns?",
          "options": [
            { "text": "Skip quality checks", "isCorrect": false },
            { "text": "Prioritize tasks and use templates", "isCorrect": true },
            { "text": "Deliver incomplete assets", "isCorrect": false },
            { "text": "Avoid client communication", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of A/B testing in social media asset design?",
          "options": [
            { "text": "It increases costs", "isCorrect": false },
            { "text": "It identifies the most engaging visuals", "isCorrect": true },
            { "text": "It’s unnecessary", "isCorrect": false },
            { "text": "It replaces creativity", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you collaborate with a social media manager on asset creation?",
          "options": [
            { "text": "Work independently", "isCorrect": false },
            { "text": "Align on campaign goals and specs", "isCorrect": true },
            { "text": "Take over content planning", "isCorrect": false },
            { "text": "Ignore their input", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the ideal duration for a TikTok video to maximize engagement?",
          "options": [
            { "text": "5 minutes", "isCorrect": false },
            { "text": "15–60 seconds", "isCorrect": true },
            { "text": "10 minutes", "isCorrect": false },
            { "text": "2 hours", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you design assets for a diverse global audience?",
          "options": [
            { "text": "Use local references only", "isCorrect": false },
            { "text": "Use inclusive and universal visuals", "isCorrect": true },
            { "text": "Ignore diversity", "isCorrect": false },
            { "text": "Use complex jargon", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of a call-to-action (CTA) in social media assets?",
          "options": [
            { "text": "To increase file size", "isCorrect": false },
            { "text": "To prompt user interaction", "isCorrect": true },
            { "text": "To replace visuals", "isCorrect": false },
            { "text": "To manage budgets", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you approach designing for a new social media platform?",
          "options": [
            { "text": "Use existing assets", "isCorrect": false },
            { "text": "Research platform specs and audience", "isCorrect": true },
            { "text": "Ignore platform guidelines", "isCorrect": false },
            { "text": "Copy competitors", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of using GIFs in social media campaigns?",
          "options": [
            { "text": "They slow down loading", "isCorrect": false },
            { "text": "They add motion and engagement", "isCorrect": true },
            { "text": "They replace static images", "isCorrect": false },
            { "text": "They increase costs", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you handle conflicting feedback from multiple stakeholders?",
          "options": [
            { "text": "Follow the loudest voice", "isCorrect": false },
            { "text": "Facilitate discussion to align priorities", "isCorrect": true },
            { "text": "Ignore all feedback", "isCorrect": false },
            { "text": "Delay the project", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "Which Adobe tool is best for creating social media animations?",
          "options": [
            { "text": "Adobe Illustrator", "isCorrect": false },
            { "text": "Adobe After Effects", "isCorrect": true },
            { "text": "Adobe InDesign", "isCorrect": false },
            { "text": "Adobe Audition", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "What is the purpose of a style guide in social media design?",
          "options": [
            { "text": "To manage budgets", "isCorrect": false },
            { "text": "To ensure consistent visuals", "isCorrect": true },
            { "text": "To edit videos", "isCorrect": false },
            { "text": "To schedule posts", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you measure the success of a social media asset?",
          "options": [
            { "text": "By personal opinion", "isCorrect": false },
            { "text": "By engagement metrics like likes", "isCorrect": true },
            { "text": "By team size", "isCorrect": false },
            { "text": "By project budget", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of competitor analysis in social media design?",
          "options": [
            { "text": "To copy their assets", "isCorrect": false },
            { "text": "To identify unique visual strategies", "isCorrect": true },
            { "text": "To reduce costs", "isCorrect": false },
            { "text": "To avoid design work", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you design assets for a time-sensitive campaign, like a holiday promotion?",
          "options": [
            { "text": "Use generic visuals", "isCorrect": false },
            { "text": "Create timely and relevant designs", "isCorrect": true },
            { "text": "Ignore the deadline", "isCorrect": false },
            { "text": "Use outdated assets", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of a Social Media Assets Designer in a product launch?",
          "options": [
            { "text": "Manage ad budgets", "isCorrect": false },
            { "text": "Create branded promotional visuals", "isCorrect": true },
            { "text": "Write product descriptions", "isCorrect": false },
            { "text": "Handle analytics", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you approach a project requiring a new skill, like video editing for Reels?",
          "options": [
            { "text": "Decline the project", "isCorrect": false },
            { "text": "Learn or collaborate with specialists", "isCorrect": true },
            { "text": "Fake the expertise", "isCorrect": false },
            { "text": "Ignore the requirement", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of using user-generated content in social media design?",
          "options": [
            { "text": "It increases costs", "isCorrect": false },
            { "text": "It builds authenticity and engagement", "isCorrect": true },
            { "text": "It replaces professional assets", "isCorrect": false },
            { "text": "It slows down design", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you ensure a social media asset is mobile-friendly?",
          "options": [
            { "text": "Use desktop-only settings", "isCorrect": false },
            { "text": "Test on mobile and optimize visuals", "isCorrect": true },
            { "text": "Ignore mobile users", "isCorrect": false },
            { "text": "Use high-resolution assets only", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the role of storytelling in social media assets?",
          "options": [
            { "text": "It’s irrelevant", "isCorrect": false },
            { "text": "It creates emotional connections", "isCorrect": true },
            { "text": "It’s only for videos", "isCorrect": false },
            { "text": "It replaces visuals", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you handle a client with unrealistic design expectations?",
          "options": [
            { "text": "Agree to everything", "isCorrect": false },
            { "text": "Educate and propose feasible solutions", "isCorrect": true },
            { "text": "Ignore their requests", "isCorrect": false },
            { "text": "Abandon the project", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of creating platform-specific assets?",
          "options": [
            { "text": "It increases workload", "isCorrect": false },
            { "text": "It maximizes engagement and compatibility", "isCorrect": true },
            { "text": "It replaces creativity", "isCorrect": false },
            { "text": "It slows down delivery", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "How do you prioritize tasks in a multi-platform campaign?",
          "options": [
            { "text": "Work on all platforms simultaneously", "isCorrect": false },
            { "text": "Set priorities based on deadlines", "isCorrect": true },
            { "text": "Focus on one platform only", "isCorrect": false },
            { "text": "Avoid planning", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What should a Social Media Assets Designer’s portfolio primarily showcase?",
          "options": [
            { "text": "Only personal projects", "isCorrect": false },
            { "text": "Platform-specific designs with impact", "isCorrect": true },
            { "text": "Only static images", "isCorrect": false },
            { "text": "Generic visuals only", "isCorrect": false }
          ],
          "difficulty": "easy"
        },
        {
          "questionType": "text",
          "text": "How do you present your social media design work during an interview?",
          "options": [
            { "text": "Show assets without context", "isCorrect": false },
            { "text": "Explain the strategy and results", "isCorrect": true },
            { "text": "Focus only on aesthetics", "isCorrect": false },
            { "text": "Avoid recent work", "isCorrect": false }
          ],
          "difficulty": "medium"
        },
        {
          "questionType": "text",
          "text": "What is the benefit of analyzing engagement metrics in social media design?",
          "options": [
            { "text": "It’s unnecessary", "isCorrect": false },
            { "text": "It informs future design decisions", "isCorrect": true },
            { "text": "It increases costs", "isCorrect": false },
            { "text": "It replaces creativity", "isCorrect": false }
          ],
          "difficulty": "medium"
        }
      ],
      isAvailable : true,
      category : "Social Media Assets Designer"
    }
]