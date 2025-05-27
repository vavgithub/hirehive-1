//Don't remove , modify or change the title of an existing template,
//It will create unwanted duplicate entries.(Unique Title-basad seeding of questions)
const newUiUxTemplates = [
  {
    title : 'Level 1',
    questions : [
      {
        "questionType": "text",
        "text": "What is the primary purpose of a wireframe in the UI/UX design process?",
        "options": [
          { "text": "To finalize color schemes and imagery.", "isCorrect": false },
          { "text": "To outline the layout and structure of a design without detailed visuals.", "isCorrect": true },
          { "text": "To test the back-end functionality of the product.", "isCorrect": false },
          { "text": "To gather user feedback after launching the product.", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which statement best describes the difference between UI design and UX design?",
        "options": [
          { "text": "UI design is about coding the interface, whereas UX design is about graphic art.", "isCorrect": false },
          { "text": "UI design only concerns mobile apps, and UX design only concerns websites.", "isCorrect": false },
          { "text": "UI design focuses on the visual layout and interactive elements, while UX design focuses on the overall user experience and satisfaction.", "isCorrect": true },
          { "text": "UI design and UX design are identical terms.", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "In the context of UI/UX, what does \"usability\" primarily refer to?",
        "options": [
          { "text": "How easy and efficient it is for users to accomplish tasks using the product.", "isCorrect": true },
          { "text": "The visual appeal and beauty of the product’s interface.", "isCorrect": false },
          { "text": "The use of the latest technology frameworks in a product.", "isCorrect": false },
          { "text": "How unique or unusual the design looks.", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "To maintain good usability, a user interface should generally:",
        "options": [
          { "text": "Surprise users with new layouts and navigation on each page.", "isCorrect": false },
          { "text": "Behave consistently and predictably across the application.", "isCorrect": true },
          { "text": "Prioritize artistic design over clarity of function.", "isCorrect": false },
          { "text": "Hide important controls to reduce clutter.", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What is a recommended UX practice when a user enters incorrect information into a form field?",
        "options": [
          { "text": "Prevent the user from proceeding without any explanation.", "isCorrect": false },
          { "text": "Erase all the user's inputs and reset the form immediately.", "isCorrect": false },
          { "text": "Ignore the error and allow the user to continue.", "isCorrect": false },
          { "text": "Display a clear error message next to the field explaining the issue.", "isCorrect": true },
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "The \"hamburger\" icon (☰) with three horizontal lines typically indicates:",
        "options": [
          { "text": "A button to reorder list items by dragging.", "isCorrect": false },
          { "text": "A menu or navigation drawer, especially on mobile devices.", "isCorrect": true },
          { "text": "A placeholder for an image that failed to load.", "isCorrect": false },
          { "text": "A command to open a food delivery app.", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "In many interfaces, a magnifying glass icon is commonly used to represent:",
        "options": [
          { "text": "Search functionality.", "isCorrect": true },
          { "text": "Zooming out of an image or map.", "isCorrect": false },
          { "text": "A settings or configuration menu.", "isCorrect": false },
          { "text": "A save or download action.", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which of the following is a popular tool used for creating UI designs and prototypes?",
        "options": [
          { "text": "Microsoft Excel.", "isCorrect": false },
          { "text": "Visual Studio Code.", "isCorrect": false },
          { "text": "Figma.", "isCorrect": true },
          { "text": "GitHub.", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which of these is NOT primarily a UI/UX design or prototyping tool?",
        "options": [
          { "text": "Sketch.", "isCorrect": false },
          { "text": "Adobe XD.", "isCorrect": false },
          { "text": "Figma.", "isCorrect": false },
          { "text": "Jenkins.", "isCorrect": true }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "\"Responsive design\" refers to designing websites so that they:",
        "options": [
          { "text": "Automatically adapt their layout to different screen sizes and devices.", "isCorrect": true },
          { "text": "Respond only to voice commands.", "isCorrect": false },
          { "text": "Require the latest hardware to display correctly.", "isCorrect": false },
          { "text": "Use animations to respond to every user action.", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What does designing with a \"mobile-first\" approach entail?",
        "options": [
          { "text": "Creating a mobile app before thinking about any website.", "isCorrect": false },
          { "text": "Starting with the mobile layout/design first, then scaling up to larger screens.", "isCorrect": true },
          { "text": "Designing the mobile app interface and ignoring desktop design.", "isCorrect": false },
          { "text": "Prioritizing phone call features in a mobile app design.", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Why is providing alternative text (alt text) for images important in UI design?",
        "options": [
          { "text": "It doubles the loading time of images, acting as a deliberate delay.", "isCorrect": false },
          { "text": "It automatically translates images into multiple languages.", "isCorrect": false },
          { "text": "It is only used for storing image copyrights.", "isCorrect": false },
          { "text": "It makes content accessible to users with visual impairments or those using screen readers.", "isCorrect": true },
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Ensuring sufficient color contrast in a user interface is important because:",
        "options": [
          { "text": "It helps users with low vision or color blindness read text and see interface elements clearly.", "isCorrect": true },
          { "text": "It makes the interface look more vibrant and colorful.", "isCorrect": false },
          { "text": "It allows more content to fit on the screen.", "isCorrect": false },
          { "text": "It eliminates the need for text labels on buttons.", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Making sure that all functions of a website can be used with only a keyboard primarily benefits:",
        "options": [
          { "text": "Users who cannot use a mouse or touchscreen due to disabilities.", "isCorrect": true },
          { "text": "Developers debugging the site using keyboard shortcuts.", "isCorrect": false },
          { "text": "SEO, by improving search engine indexing.", "isCorrect": false },
          { "text": "Graphic designers working on high-resolution screens.", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "In form design, what is one way to improve accessibility for screen reader users?",
        "options": [
          { "text": "Use only placeholder text inside form fields instead of labels.", "isCorrect": false },
          { "text": "Indicate required fields by coloring them red without any other cues.", "isCorrect": false },
          { "text": "Remove all focus outlines from fields to create a cleaner look.", "isCorrect": false },
          { "text": "Include explicit text labels for form fields that are programmatically associated with each input.", "isCorrect": true },
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What is the main goal of conducting a usability test during the design process?",
        "options": [
          { "text": "To get public ratings for the product before it launches.", "isCorrect": false },
          { "text": "To observe real users using the product to identify any usability problems or confusion.", "isCorrect": true },
          { "text": "To stress-test the server under high load using scripts.", "isCorrect": false },
          { "text": "To ensure the code meets performance benchmarks.", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which of the following is a common UX research method for gathering user feedback?",
        "options": [
          { "text": "User interviews.", "isCorrect": true },
          { "text": "Writing unit tests for the software.", "isCorrect": false },
          { "text": "Creating marketing campaigns.", "isCorrect": false },
          { "text": "Compiling sales reports.", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "A design system is best described as:",
        "options": [
          { "text": "The codebase that engineers use to build the front-end of an application.", "isCorrect": false },
          { "text": "A series of user research reports about a product.", "isCorrect": false },
          { "text": "A collection of reusable components, guidelines, and standards that define the look and feel of a product.", "isCorrect": true },
          { "text": "A cloud-based tool for storing design files.", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Google’s Material Design is an example of:",
        "options": [
          { "text": "A project management methodology.", "isCorrect": false },
          { "text": "An e-commerce platform.", "isCorrect": false },
          { "text": "A comprehensive design system and style guide.", "isCorrect": true },
          { "text": "A database design technique.", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What is one major benefit of using a design system in a large product team?",
        "options": [
          { "text": "It allows each designer to use completely different styles freely.", "isCorrect": false },
          { "text": "It guarantees that no usability testing is required.", "isCorrect": false },
          { "text": "It slows down the design process significantly.", "isCorrect": false },
          { "text": "It ensures consistency across different parts of the application and among different designers.", "isCorrect": true },
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "In UI/UX, interaction design mainly deals with:",
        "options": [
          { "text": "Defining how the interface behaves in response to user actions (e.g., button clicks, gestures).", "isCorrect": true },
          { "text": "Designing the database interaction for saving user data.", "isCorrect": false },
          { "text": "The color theory and branding aspects of the interface.", "isCorrect": false },
          { "text": "The budgeting and project management aspects of design.", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which of the following is an example of providing good feedback to the user in an interface?",
        "options": [
          { "text": "Freezing the interface until the action completes with no indication.", "isCorrect": false },
          { "text": "Showing a loading spinner or progress bar when a page is loading or an action is processing.", "isCorrect": true },
          { "text": "Playing a loud sound for every button click regardless of context.", "isCorrect": false },
          { "text": "Restarting the app automatically after an action to show it completed.", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What is a \"microinteraction\" in UI design?",
        "options": [
          { "text": "A short meeting between team members to discuss interactions.", "isCorrect": false },
          { "text": "A miniature prototype for testing hardware.", "isCorrect": false },
          { "text": "A single pixel interaction on a screen.", "isCorrect": false },
          { "text": "A small interactive feedback or animation in response to a user action (e.g., a button press animation).", "isCorrect": true },
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which of the following is an example of a common UI component or element?",
        "options": [
          { "text": "A navigation menu with buttons or links.", "isCorrect": true },
          { "text": "A JavaScript algorithm for sorting data.", "isCorrect": false },
          { "text": "A user journey map describing user emotions.", "isCorrect": false },
          { "text": "A marketing plan document.", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "When should radio buttons be used in an interface?",
        "options": [
          { "text": "When multiple options can be selected at once.", "isCorrect": false },
          { "text": "When entering free-form text data.", "isCorrect": false },
          { "text": "When only one option can be selected from a small list of options.", "isCorrect": true },
          { "text": "When toggling a single setting on or off frequently.", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "When is it best to use checkboxes in a form interface?",
        "options": [
          { "text": "When only one exclusive choice is allowed among options.", "isCorrect": false },
          { "text": "When the user can select more than one option from a set of choices.", "isCorrect": true },
          { "text": "For submitting the form data.", "isCorrect": false },
          { "text": "For initiating a file download.", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "A toggle switch (on/off switch) UI element is commonly used for:",
        "options": [
          { "text": "Enabling or disabling a single setting (turning it on or off).", "isCorrect": true },
          { "text": "Selecting one item from a list of multiple options.", "isCorrect": false },
          { "text": "Navigating to a new page or screen.", "isCorrect": false },
          { "text": "Opening a group of checkbox options.", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What is a modal dialog (modal window) in UI design?",
        "options": [
          { "text": "A secondary monitor used by designers.", "isCorrect": false },
          { "text": "A mode in a software that changes all colors to grayscale.", "isCorrect": false },
          { "text": "A code editor window for developers.", "isCorrect": false },
          { "text": "A pop-up window that appears on top of the main interface and requires the user to interact with it before returning to the main content.", "isCorrect": true },
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "In mobile app UI design, what is a common gesture used to refresh the content of a page or feed?",
        "options": [
          { "text": "Double-tapping with two fingers.", "isCorrect": false },
          { "text": "Shaking the device three times.", "isCorrect": false },
          { "text": "Long-pressing on the home button.", "isCorrect": false },
          { "text": "Pulling down on the screen and releasing (pull-to-refresh).", "isCorrect": true },
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which UI navigation pattern is commonly used in mobile apps to switch between different main sections (typically 3 to 5 sections)?",
        "options": [
          { "text": "A floating drop-down list of sections that appears on tap.", "isCorrect": false },
          { "text": "A bottom navigation bar (tab bar) with icons for each section.", "isCorrect": true },
          { "text": "A permanently visible sidebar menu on the left.", "isCorrect": false },
          { "text": "Multiple home screens that the user cycles through automatically.", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "When designing for touch screens (like smartphones), which of the following practices is important?",
        "options": [
          { "text": "Use the smallest possible buttons to save screen space even if they are hard to tap.", "isCorrect": false },
          { "text": "Make interactive elements (buttons, links, etc.) large enough and spaced well so they are easy to tap with a finger.", "isCorrect": true },
          { "text": "Assume users have a stylus and design very tiny targets.", "isCorrect": false },
          { "text": "Place interactive elements very close together to fit more in a small area.", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What does the acronym “UX” stand for in the context of design?",
        "options": [
          { "text": "User Experience.", "isCorrect": true },
          { "text": "Unified XML.", "isCorrect": false },
          { "text": "Ultra eXtreme.", "isCorrect": false },
          { "text": "User eXpectation.", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "In UX design, what is an A/B test?",
        "options": [
          { "text": "A test performed by two designers (Designer A and Designer B) on the same project.", "isCorrect": false },
          { "text": "An experiment where two versions of a design (A and B) are compared to see which one performs better with users.", "isCorrect": true },
          { "text": "A checklist used to evaluate accessibility and branding (A for Accessibility, B for Branding).", "isCorrect": false },
          { "text": "A test to ensure a design looks good on both Apple (A) and BlackBerry (B) devices.", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "According to Gestalt principles in visual design, what does the principle of \"proximity\" state?",
        "options": [
          { "text": "Elements that are close to each other tend to be perceived as a related group.", "isCorrect": true },
          { "text": "Users should be placed physically close to the screen for better engagement.", "isCorrect": false },
          { "text": "The most important element should always be in the top-left corner.", "isCorrect": false },
          { "text": "Interactive elements should change color when the cursor is near them.", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What is a prototype in the context of UI/UX design?",
        "options": [
          { "text": "The final coded implementation of the design.", "isCorrect": false },
          { "text": "A static image with no interactive elements and no relation to user testing.", "isCorrect": false },
          { "text": "A style guide for visual design elements.", "isCorrect": false },
          { "text": "An early sample or interactive model of a design used to test concepts and gather feedback.", "isCorrect": true },
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "The image shows a rough sketch of a mobile app interface drawn on paper. What type of design artifact is this?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748264578/ChatGPT_Image_May_26_2025_06_20_38_PM_lo4hme.png",
        "options": [
          { "text": "A high-fidelity visual mockup.", "isCorrect": false },
          { "text": "A low-fidelity wireframe.", "isCorrect": true },
          { "text": "A fully developed app screen.", "isCorrect": false },
          { "text": "A usability testing scenario.", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "The image displays a form where an email field is outlined in red and an error message is shown. What UX design principle is demonstrated by showing this message?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748264579/ChatGPT_Image_May_26_2025_06_24_58_PM_dzzf0t.png",
        "options": [
          { "text": "Ensuring aesthetic consistency.", "isCorrect": false },
          { "text": "Using gamification in forms.", "isCorrect": false },
          { "text": "Providing clear feedback for user errors.", "isCorrect": true },
          { "text": "Hiding errors from the user.", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "The image shows a website adapting its layout on a desktop screen and a mobile phone. Which design approach does this illustrate?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748265036/10730f5f-b83a-42f2-a9be-e110f395c792_woirs8.png",
        "options": [
          { "text": "Print-friendly design.", "isCorrect": false },
          { "text": "Static fixed-width design.", "isCorrect": false },
          { "text": "Responsive web design.", "isCorrect": true },
          { "text": "Desktop-only design.", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "Based on the image, which UX research method is being depicted (with a user interacting with a product under observation)?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748264872/ChatGPT_Image_May_26_2025_06_25_40_PM_l4gevb.png",
        "options": [
          { "text": "A moderated usability test.", "isCorrect": true },
          { "text": "An online user survey.", "isCorrect": false },
          { "text": "A focus group discussion.", "isCorrect": false },
          { "text": "A heuristic evaluation by an expert.", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "The image is a page showing buttons, colors, and text styles with guidelines. This page is an example of:",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748265118/f5d371fd-21ea-4eb0-8d67-5501a8c5de0e_lu6vi5.png",
        "options": [
          { "text": "A user analytics dashboard.", "isCorrect": false },
          { "text": "A wireframe for a new app.", "isCorrect": false },
          { "text": "A design system style guide.", "isCorrect": true },
          { "text": "An error logging interface.", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "The image shows a UI control where a user can drag a knob along a track to select a value (e.g., adjusting volume). What kind of UI component is this?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748265191/4495b734-a579-4886-9221-82586b485064_kov7mu.png",
        "options": [
          { "text": "A progress bar.", "isCorrect": false },
          { "text": "A slider (range slider).", "isCorrect": true },
          { "text": "A text input field.", "isCorrect": false },
          { "text": "A toggle switch.", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "In the image, which side demonstrates better adherence to accessibility guidelines for color contrast?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748264577/da385ab3-d5a0-4b89-8b1f-ae0c6ac9c9f2_o9ivwv.png",
        "options": [
          { "text": "The left side (light gray text on white).", "isCorrect": false },
          { "text": "The right side (white text on black).", "isCorrect": true },
          { "text": "Both sides equally meet contrast guidelines.", "isCorrect": false },
          { "text": "Neither side meets any contrast guidelines.", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "The image shows a form field labeled \"Country\" with a list of options expanded. What kind of UI element is this?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748265309/3217d2aa-7147-497c-973c-e7e49aa0bb22_mgvtpu.png",
        "options": [
          { "text": "A text input field.", "isCorrect": false },
          { "text": "A dropdown menu (select list).", "isCorrect": true },
          { "text": "A radio button group.", "isCorrect": false },
          { "text": "A modal dialog.", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "The image shows a gear icon commonly found in apps and websites. What does this icon usually represent?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748265376/48972c5d-6dad-410e-a3fb-0cdc90e974bc_ki3ujq.png",
        "options": [
          { "text": "A loading or syncing action.", "isCorrect": false },
          { "text": "Location services.", "isCorrect": false },
          { "text": "Logging out.", "isCorrect": false },
          { "text": "Settings or configuration.", "isCorrect": true },
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "The image compares two designs. Which design principle is highlighted by the clearer layout on the right side?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748265698/e4281f49-820d-483c-b0d0-14f1d40c5035_chbrcn.png",
        "options": [
          { "text": "Adding as much content as possible on one screen improves user engagement.", "isCorrect": false },
          { "text": "Aesthetic simplicity and minimalist design leads to better usability.", "isCorrect": true },
          { "text": "Cluttering the interface makes it more intuitive.", "isCorrect": false },
          { "text": "Using no text at all regardless of context.", "isCorrect": false }
        ],
        "difficulty": "easy"
      }
    ],
    isAvailable : true,
    category : 'UI UX'
  },
  {
    title : 'Level 2',
    questions : [
      {
        "questionType": "text",
        "text": "Why are low-fidelity wireframes useful early in the design process?",
        "options": [
          { "text": "Because they contain finalized content and branding to impress stakeholders.", "isCorrect": false },
          { "text": "Because they are quick to create and focus on layout and ideas rather than visual details.", "isCorrect": true },
          { "text": "Because they eliminate the need for any further prototyping or user testing.", "isCorrect": false },
          { "text": "Because they use complex code to demonstrate functionality.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Which of the following correctly describes the difference between a low-fidelity wireframe and a high-fidelity mockup?",
        "options": [
          { "text": "A wireframe is always interactive, whereas a high-fidelity mockup is always static.", "isCorrect": false },
          { "text": "A wireframe is created after development, but a high-fidelity mockup comes before development.", "isCorrect": false },
          { "text": "A wireframe is a basic outline of layout with placeholders and minimal detail, while a high-fidelity mockup includes detailed visual design (colors, typography, images).", "isCorrect": true },
          { "text": "There is no difference; they are two terms for the same thing.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "In UI design tools like Figma or Sketch, what is the purpose of using components (called \"Symbols\" in Sketch)?",
        "options": [
          { "text": "To randomly generate color palettes for a design.", "isCorrect": false },
          { "text": "To create reusable UI elements (like buttons or icons) that can be updated globally from one source.", "isCorrect": true },
          { "text": "To restrict collaboration by locking parts of a design.", "isCorrect": false },
          { "text": "To automatically write the code for the design.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "One key difference between Figma and Sketch is:",
        "options": [
          { "text": "Figma cannot create interactive prototypes while Sketch can.", "isCorrect": false },
          { "text": "Sketch is free and browser-based, while Figma is expensive and offline-only.", "isCorrect": false },
          { "text": "Figma is cloud-based and allows real-time collaborative editing across platforms, whereas Sketch is a Mac-only app without built-in real-time collaboration.", "isCorrect": true },
          { "text": "Sketch runs on any operating system, while Figma only runs on iOS.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Adaptive design and responsive design are different in that:",
        "options": [
          { "text": "Adaptive design uses multiple fixed layouts for different screen sizes, while responsive design fluidly adapts a single layout using flexible grids and media queries.", "isCorrect": true },
          { "text": "Adaptive design automatically reads the user's mind, while responsive design does not.", "isCorrect": false },
          { "text": "Responsive design requires separate URLs for mobile and desktop, whereas adaptive design uses one URL.", "isCorrect": false },
          { "text": "Responsive design is an outdated approach and adaptive design is the only recommended method now.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What is a \"breakpoint\" in responsive web design?",
        "options": [
          { "text": "A tool for debugging code in the browser.", "isCorrect": false },
          { "text": "A pause in a user’s interaction flow.", "isCorrect": false },
          { "text": "A graphic element that breaks up content on a page.", "isCorrect": false },
          { "text": "A specific screen width (or range) at which the website’s layout changes to accommodate a different screen size or orientation.", "isCorrect": true },
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Which of the following is a recommended accessibility practice?",
        "options": [
          { "text": "Use images of text instead of actual text for important labels.", "isCorrect": false },
          { "text": "Require users to navigate using a mouse only, disabling keyboard navigation.", "isCorrect": false },
          { "text": "Auto-play audio without a way to pause or stop it.", "isCorrect": false },
          { "text": "Avoid using color alone to convey important information (use text or symbols as well).", "isCorrect": true },
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What does the acronym WCAG stand for in the context of web accessibility?",
        "options": [
          { "text": "Web Content Accessibility Guidelines.", "isCorrect": true },
          { "text": "World Committee on Accessible Graphics.", "isCorrect": false },
          { "text": "Wide Collaboration for Accessible Growth.", "isCorrect": false },
          { "text": "Web Compliance and Accessibility Group.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "In UX design, what is a \"persona\"?",
        "options": [
          { "text": "The personality of the brand’s mascot.", "isCorrect": false },
          { "text": "A fictional profile that represents a typical user, including their goals, needs, and behaviors.", "isCorrect": true },
          { "text": "A specific user who tested the product.", "isCorrect": false },
          { "text": "A list of features planned for the product.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Card sorting is a UX research technique used to:",
        "options": [
          { "text": "Prioritize features by having users sort feature cards by importance.", "isCorrect": false },
          { "text": "Learn how users group and categorize information, which helps in designing intuitive navigation or information architecture.", "isCorrect": true },
          { "text": "Test the color preferences of users using colored cards.", "isCorrect": false },
          { "text": "Determine the optimal number of steps in a user flow by sorting step cards.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What is a heuristic evaluation in the context of UX?",
        "options": [
          { "text": "A randomized A/B test with users in a live environment.", "isCorrect": false },
          { "text": "A security audit of the user interface code.", "isCorrect": false },
          { "text": "A review of an interface by UX experts who identify usability issues based on established principles (heuristics).", "isCorrect": true },
          { "text": "A focus group where users design the interface themselves.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Jakob Nielsen’s research suggests that testing with approximately how many users will uncover the majority of common usability issues?",
        "options": [
          { "text": "1 user.", "isCorrect": false },
          { "text": "25 users.", "isCorrect": false },
          { "text": "5 users.", "isCorrect": true },
          { "text": "50+ users.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Which of the following methods is an example of quantitative UX research?",
        "options": [
          { "text": "A/B testing that measures conversion rates for two different designs.", "isCorrect": true },
          { "text": "One-on-one user interviews about how users feel about a design.", "isCorrect": false },
          { "text": "Observing a user in their natural environment without counting metrics.", "isCorrect": false },
          { "text": "An open-ended survey asking for user opinions.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "In UX research, “guerrilla testing” refers to:",
        "options": [
          { "text": "Testing an interface in a jungle environment for extreme conditions.", "isCorrect": false },
          { "text": "Conducting quick, low-cost usability tests in informal settings (like a cafe) with random people.", "isCorrect": true },
          { "text": "Using military personnel as test users for security applications.", "isCorrect": false },
          { "text": "A rigorous lab-based testing method with extensive equipment.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "According to the principle of “recognition rather than recall” in usability, interfaces should:",
        "options": [
          { "text": "Force users to memorize keyboard shortcuts for efficiency.", "isCorrect": false },
          { "text": "Require users to recall exact file names or paths to access content.", "isCorrect": false },
          { "text": "Hide navigation menus to test if users remember how to find pages.", "isCorrect": false },
          { "text": "Present users with options and cues so they don’t have to remember information from one screen to another.", "isCorrect": true },
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Providing an easy “Undo” option for a destructive action primarily supports which usability heuristic?",
        "options": [
          { "text": "User control and freedom.", "isCorrect": true },
          { "text": "Match between system and real world.", "isCorrect": false },
          { "text": "Aesthetic and minimalist design.", "isCorrect": false },
          { "text": "Error prevention.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "A user interface that uses unfamiliar jargon instead of terms users know (for example, labeling the shopping cart as “Item Receptacle”) is failing which usability principle?",
        "options": [
          { "text": "Match between system and the real world (speaking the users’ language).", "isCorrect": true },
          { "text": "Flexibility and efficiency of use.", "isCorrect": false },
          { "text": "Error recovery support.", "isCorrect": false },
          { "text": "Consistency and standards.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Fitts’s Law is relevant to UI design because it predicts that:",
        "options": [
          { "text": "Users will prefer interfaces with fewer color choices.", "isCorrect": false },
          { "text": "The likelihood of user error increases over time spent on a task.", "isCorrect": false },
          { "text": "People can recall only 7±2 items at once in short-term memory.", "isCorrect": false },
          { "text": "The time to move to and select a target (e.g., a button) is shorter when the target is larger and closer to the starting point of the cursor or finger.", "isCorrect": true },
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Hick’s Law implies that:",
        "options": [
          { "text": "The first click on a page is the most important for user success.", "isCorrect": false },
          { "text": "Users will make a mistake if navigation is not at the top of the page.", "isCorrect": false },
          { "text": "Increasing the number of choices or options will increase the time it takes for a user to make a decision.", "isCorrect": true },
          { "text": "The aesthetic appeal of an interface is directly proportional to its complexity.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "The “7 ± 2” rule (Miller’s Law) often discussed in UX suggests that:",
        "options": [
          { "text": "Every page should have no more than 7 links.", "isCorrect": false },
          { "text": "A user interface should have exactly 7 main menu items.", "isCorrect": false },
          { "text": "People can typically only hold about 5 to 9 items in their short-term memory at once.", "isCorrect": true },
          { "text": "Users need to see something 7 times to remember it.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What is meant by “affordance” in interaction design?",
        "options": [
          { "text": "The monetary cost to build a feature in the UI.", "isCorrect": false },
          { "text": "A property of an object or UI element that suggests how it should be used (e.g., a button looks clickable).", "isCorrect": true },
          { "text": "The trendiness or visual appeal of a design.", "isCorrect": false },
          { "text": "A hidden easter egg in the interface.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "In design terminology, what is an \"accordion\" component used for?",
        "options": [
          { "text": "To play an audio sound when clicked.", "isCorrect": false },
          { "text": "To show or hide sections of content by expanding/collapsing them when headers are clicked.", "isCorrect": true },
          { "text": "To automatically scroll the page up and down.", "isCorrect": false },
          { "text": "To allow users to draw on the screen.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "A “toast” notification in a UI is typically:",
        "options": [
          { "text": "A full-screen alert that blocks the user until dismissed.", "isCorrect": false },
          { "text": "A pop-up that asks the user to make a toast via social media.", "isCorrect": false },
          { "text": "A permanent banner at the top of the interface.", "isCorrect": false },
          { "text": "A small, temporary message that pops up (often at the bottom of the screen) to inform the user of an action (and then fades away on its own).", "isCorrect": true },
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Infinite scrolling (continuously loading content as the user scrolls) is especially useful for:",
        "options": [
          { "text": "Keeping users engaged in content feeds (like social media) without forcing them to click for the next page.", "isCorrect": true },
          { "text": "Making the footer of a page easily accessible at all times.", "isCorrect": false },
          { "text": "Ensuring users can precisely navigate to page 10 of results quickly.", "isCorrect": false },
          { "text": "Improving the printability of a webpage.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "The UX pattern \"progressive disclosure\" is intended to:",
        "options": [
          { "text": "Reveal the entire navigation menu progressively as the user spends more time on the site.", "isCorrect": false },
          { "text": "Gradually increase the font size as the user reads to reduce eye strain.", "isCorrect": false },
          { "text": "Present only essential information or options up front and reveal additional details or options upon user interaction (e.g., clicking “More” or an advanced settings toggle).", "isCorrect": true },
          { "text": "Disclose user data to stakeholders progressively over time.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "When designing a complex form or multi-step process (like a checkout), what UI/UX approach can improve usability?",
        "options": [
          { "text": "Presenting all form fields on one very long page to avoid clicking.", "isCorrect": false },
          { "text": "Splitting the process into a series of steps or screens (wizard) with a progress indicator, instead of one long form.", "isCorrect": true },
          { "text": "Asking for information in random order to keep users alert.", "isCorrect": false },
          { "text": "Requiring the user to restart the process if they make any error.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "When designing for iOS and Android, which statement is true about their design guidelines?",
        "options": [
          { "text": "Android apps should never use bottom navigation, only side drawers.", "isCorrect": false },
          { "text": "iOS encourages hamburger menu navigation for core app sections.", "isCorrect": false },
          { "text": "iOS typically uses a bottom tab bar for primary navigation, whereas Android (Material Design) often uses either a bottom bar or a navigation drawer depending on the number of sections.", "isCorrect": true },
          { "text": "Both platforms have identical UI guidelines and components.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What is one advantage of conducting remote unmoderated usability tests (using tools like UserTesting.com) versus in-person moderated tests?",
        "options": [
          { "text": "They can gather feedback from a larger number of users more quickly, often at lower cost, though they may provide less qualitative insight per user.", "isCorrect": true },
          { "text": "They guarantee more insightful feedback than any in-person test.", "isCorrect": false },
          { "text": "They eliminate the need to plan tasks or questions ahead of time.", "isCorrect": false },
          { "text": "They ensure the facilitator can help the user if they get stuck.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "During a usability test, you notice all participants hesitating to click a certain button. As a UX designer, what is the most likely cause?",
        "options": [
          { "text": "The button’s design or label does not afford a clear understanding of its function (users are unsure what it will do).", "isCorrect": true },
          { "text": "The users all happened to be unqualified.", "isCorrect": false },
          { "text": "The test environment was too noisy, so they couldn't focus.", "isCorrect": false },
          { "text": "There is no issue; users often hesitate randomly.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What is a \"customer journey map\" in UX design used to illustrate?",
        "options": [
          { "text": "The site navigation structure (sitemap).", "isCorrect": false },
          { "text": "The end-to-end experience of a user achieving a goal, mapping each step and their feelings/pain points along the way.", "isCorrect": true },
          { "text": "The screen flow of a user interface (wireflow).", "isCorrect": false },
          { "text": "The roadmap of product features planned for development.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Which of the following is a common usability metric that might be collected during user testing?",
        "options": [
          { "text": "Number of lines of code in the product.", "isCorrect": false },
          { "text": "The salary of test participants.", "isCorrect": false },
          { "text": "The amount of time developers spent on a feature.", "isCorrect": false },
          { "text": "Task success rate (the percentage of users who can complete a given task successfully).", "isCorrect": true },
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "When handing off a design to developers, what can a UX designer provide to ensure the implementation matches the design?",
        "options": [
          { "text": "Only a rough sketch and let developers interpret it.", "isCorrect": false },
          { "text": "Just the raw Photoshop or Sketch file without context.", "isCorrect": false },
          { "text": "A list of user names who gave feedback.", "isCorrect": false },
          { "text": "A style guide and detailed specifications (measurements, colors, assets) or a design system documentation for the components.", "isCorrect": true },
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What is the purpose of usability heuristics (such as Nielsen’s heuristics) in the design process?",
        "options": [
          { "text": "They apply only to mobile app design and not web design.", "isCorrect": false },
          { "text": "They serve as guidelines or best practices for evaluating and improving a user interface’s usability.", "isCorrect": true },
          { "text": "They are strict rules that every design must follow exactly.", "isCorrect": false },
          { "text": "They replace the need for user testing entirely.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "During a design critique, a stakeholder suggests adding more images and animations to a simple form page. What principle might you cite to argue against adding unnecessary elements?",
        "options": [
          { "text": "Error tolerance – too many images prevent user errors.", "isCorrect": false },
          { "text": "Aesthetic and minimalist design – interfaces are more usable when they contain only relevant elements and content.", "isCorrect": true },
          { "text": "Flexibility – adding more elements always makes a design flexible.", "isCorrect": false },
          { "text": "Consistency – every page must have identical content.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Which statement about design systems is true?",
        "options": [
          { "text": "A design system is basically a long document listing all past design decisions without examples.", "isCorrect": false },
          { "text": "Only developers use design systems; designers do not.", "isCorrect": false },
          { "text": "A robust design system includes not just style guidelines, but also reusable components and possibly code snippets, helping designers and developers maintain consistency.", "isCorrect": true },
          { "text": "Design systems eliminate the need for any creativity or iteration in design.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "The image shows a detailed, polished design of an app screen (with real colors, images, and text). This kind of deliverable is best described as:",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748267192/a88fb014-fe6c-426a-a5f5-50507378ac09_rxm1wn.png",
        "options": [
          { "text": "A low-fidelity wireframe.", "isCorrect": false },
          { "text": "A high-fidelity mockup of the UI.", "isCorrect": true },
          { "text": "A command-line interface prototype.", "isCorrect": false },
          { "text": "A text-only storyboard.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "The image shows several screen designs connected by arrows in a design tool. What does this setup represent?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748267191/460b01fb-9b18-4b0d-8029-a8330e7e7470_aiyr3h.png",
        "options": [
          { "text": "An interactive prototype or user flow, demonstrating navigation between screens.", "isCorrect": true },
          { "text": "A database schema linking data tables.", "isCorrect": false },
          { "text": "An organizational chart for the design team.", "isCorrect": false },
          { "text": "A low-level code diagram of the app.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "In the image, a message confirms an action with an option to \"Undo\". Which usability principle does offering an \"Undo\" button support?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748267187/6404728b-b9ec-4505-8fa8-499d415570d4_xti9cp.png",
        "options": [
          { "text": "Consistency and standards.", "isCorrect": false },
          { "text": "Aesthetic and minimalist design.", "isCorrect": false },
          { "text": "User control and freedom (letting users easily reverse actions).", "isCorrect": true },
          { "text": "Error prevention through disabling features.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "The image shows two screens from one app that look inconsistently styled. Which usability heuristic is being violated here?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748267186/7cce87a9-af0d-4398-b760-57a445137906_bmhovk.png",
        "options": [
          { "text": "Error recovery.", "isCorrect": false },
          { "text": "User control and freedom.", "isCorrect": false },
          { "text": "Consistency and standards.", "isCorrect": true },
          { "text": "Accelerators for expert users.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "The image shows a website on a phone that requires zooming and scrolling to use. What design issue does this illustrate?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748267186/76da71e4-0c8f-45d3-bd67-6aea640aadcc_hp4ewj.png",
        "options": [
          { "text": "The site is not using responsive design for mobile devices.", "isCorrect": true },
          { "text": "The site has too much content to ever display on a phone.", "isCorrect": false },
          { "text": "The phone’s browser is broken.", "isCorrect": false },
          { "text": "The site uses a mobile-first approach correctly.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "The image displays text subtitles on a video. Which accessibility feature is shown that benefits users who are deaf or hard of hearing?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748267193/29094336-8213-49a2-ae19-b49811d00436_nhspol.png",
        "options": [
          { "text": "ALT text.", "isCorrect": false },
          { "text": "Closed captions.", "isCorrect": true },
          { "text": "High contrast mode.", "isCorrect": false },
          { "text": "Screen reader output.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "The image shows a document with a user photo, background information, goals, and pain points. This document is known as:",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748267504/bb862fdc-b6ee-43a4-8f8f-321267e5dae9_jepgnr.png",
        "options": [
          { "text": "A user persona.", "isCorrect": true },
          { "text": "A usability test report.", "isCorrect": false },
          { "text": "A mood board.", "isCorrect": false },
          { "text": "An org chart.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "This door is an example often cited in UX discussions. What design problem does it illustrate?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748267185/ee917806-3ab9-4d1d-8658-276f9f0488ca_kvfxtk.png",
        "options": [
          { "text": "Excellent intuitive design with clear cues.", "isCorrect": false },
          { "text": "A security issue in physical design.", "isCorrect": false },
          { "text": "A successful application of minimalist design.", "isCorrect": false },
          { "text": "A misleading affordance or signifier – the door’s handle suggests pulling (affordance) even though it needs to be pushed.", "isCorrect": true },
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "The image shows a colored heatmap over a webpage indicating where users focus or click the most. This kind of visualization is typically the result of:",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748267187/a1743ac0-48bc-43c5-9284-acc353b15fec_nhe3wv.png",
        "options": [
          { "text": "A print preview showing ink usage.", "isCorrect": false },
          { "text": "An eye-tracking or click-tracking study analyzing user attention on the page.", "isCorrect": true },
          { "text": "A graphic design trend applied to the page.", "isCorrect": false },
          { "text": "A user journey map illustration.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "The image depicts screens connected by arrows to illustrate navigation paths. What kind of UX artifact is this?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748267190/6ff82e1a-2fb1-47b4-bbbb-2eec365ecf0b_jubxnf.png",
        "options": [
          { "text": "A site’s organizational chart.", "isCorrect": false },
          { "text": "A UML class diagram for the code.", "isCorrect": false },
          { "text": "A user flow diagram (showing how a user moves through the app’s screens).", "isCorrect": true },
          { "text": "A marketing funnel chart.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
    ],
    isAvailable : true,
    category : "UI UX"
  },
  {
    title : 'Level 3',
    questions : [
      {
        "questionType": "text",
        "text": "What does the acronym ARIA (in web accessibility) stand for?",
        "options": [
          { "text": "Assistive Resource for Interface Adaptation.", "isCorrect": false },
          { "text": "Automated Reachability Interface API.", "isCorrect": false },
          { "text": "Accessible Rich Internet Applications.", "isCorrect": true },
          { "text": "Advanced Accessibility Rating Index.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Which WCAG (Web Content Accessibility Guidelines) conformance level is most commonly mandated by regulations (such as legal requirements for websites in many countries)?",
        "options": [
          { "text": "Level AA.", "isCorrect": true },
          { "text": "Level A.", "isCorrect": false },
          { "text": "Level AAA.", "isCorrect": false },
          { "text": "There is no standard conformance level in regulations.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "WCAG 2.1 guidelines recommend a minimum contrast ratio for normal text of:",
        "options": [
          { "text": "3.0:1.", "isCorrect": false },
          { "text": "4.5:1 (text color to background color).", "isCorrect": true },
          { "text": "7.0:1.", "isCorrect": false },
          { "text": "10:1.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "If an image is purely decorative and conveys no important information, what is the best practice to ensure it doesn’t interfere with screen reader users?",
        "options": [
          { "text": "Provide a detailed alt text description regardless.", "isCorrect": false },
          { "text": "Hide the image using CSS (display: none) – that is sufficient for screen readers.", "isCorrect": false },
          { "text": "Place the image in a separate section labeled “Decorative Images.”", "isCorrect": false },
          { "text": "Use an empty alt attribute (alt=\"\") or mark it as decorative so screen readers skip it.", "isCorrect": true },
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "In UX research, what is a contextual inquiry (field study)?",
        "options": [
          { "text": "A survey sent out to users via email.", "isCorrect": false },
          { "text": "A method where researchers observe and interview users in the user’s own environment while they use the product, to understand context of use.", "isCorrect": true },
          { "text": "A usability test conducted in a lab with eye-tracking.", "isCorrect": false },
          { "text": "A method where users are given tasks to perform in a controlled environment without observers.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What is the primary difference between formative and summative usability testing?",
        "options": [
          { "text": "Formative testing is only for form interfaces, summative is for summaries.", "isCorrect": false },
          { "text": "Formative testing is done during the design process to discover and fix problems (for improvement), while summative testing is done at the end to evaluate the overall usability (often for a score or benchmark).", "isCorrect": true },
          { "text": "Formative testing uses qualitative feedback, summative uses only quantitative metrics.", "isCorrect": false },
          { "text": "They are two terms for the same process.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "In user research, “attitudinal” methods differ from “behavioral” methods in that:",
        "options": [
          { "text": "Attitudinal methods collect what people say (their opinions, feelings, intentions), while behavioral methods observe what people do (their actions).", "isCorrect": true },
          { "text": "Attitudinal methods are always quantitative, while behavioral are always qualitative.", "isCorrect": false },
          { "text": "Behavioral methods involve users acting out attitudes physically.", "isCorrect": false },
          { "text": "Attitudinal is about user posture and body language analysis, behavioral is about spoken feedback.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "In UX design, what is a “mental model”?",
        "options": [
          { "text": "The way a user internally expects or believes a system to work based on their experience and prior knowledge.", "isCorrect": true },
          { "text": "A diagram of the code modules in a system.", "isCorrect": false },
          { "text": "The designer’s detailed model of the system architecture.", "isCorrect": false },
          { "text": "A prototype of the user’s brain used in cognitive testing.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "The term “dark pattern” in UI/UX refers to:",
        "options": [
          { "text": "Using dark colors and themes in a user interface.", "isCorrect": false },
          { "text": "A design pattern intended for night-time use of an app.", "isCorrect": false },
          { "text": "UI design tricks that intentionally mislead or manipulate users into taking actions they might not intend.", "isCorrect": true },
          { "text": "A deprecated design trend from early GUIs.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Which of the following is an example of a dark pattern on a website or app?",
        "options": [
          { "text": "A clear and simple privacy settings page.", "isCorrect": false },
          { "text": "A tutorial that guides users through app features honestly.", "isCorrect": false },
          { "text": "A confusing opt-out checkbox that is pre-checked to subscribe users to a newsletter without clear consent.", "isCorrect": true },
          { "text": "An accessible form with helpful error messages.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "When designing a user interface for touch, Apple’s Human Interface Guidelines and Google’s Material Design guidelines suggest a minimum touch target size of approximately:",
        "options": [
          { "text": "20 pixels, assuming users have pinpoint accuracy.", "isCorrect": false },
          { "text": "72 points, to match print typography standards.", "isCorrect": false },
          { "text": "44–48 points/pixels (around 7–10 mm) in diameter for tappable elements.", "isCorrect": true },
          { "text": "There is no recommended minimum size for touch targets.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What are “design tokens” in the context of a design system?",
        "options": [
          { "text": "Basic named design values (like colors, font sizes, spacing units) that can be referenced throughout designs and code, allowing consistent theming and easy updates.", "isCorrect": true },
          { "text": "Physical coins given to designers for each successful project.", "isCorrect": false },
          { "text": "Icons used as placeholders in a design.", "isCorrect": false },
          { "text": "User authentication keys in a secure system.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "How does progressive enhancement differ from graceful degradation in web design strategy?",
        "options": [
          { "text": "Progressive enhancement focuses on page load speed, while graceful degradation focuses on aesthetics.", "isCorrect": false },
          { "text": "Progressive enhancement starts with a basic version for older/limited devices and adds more features for better browsers/devices; graceful degradation starts with a full-featured design for modern browsers and then scales back functionality for older ones.", "isCorrect": true },
          { "text": "They are actually the same approach, just different names.", "isCorrect": false },
          { "text": "Progressive enhancement is only about images, graceful degradation only about text.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What is the System Usability Scale (SUS)?",
        "options": [
          { "text": "A method for measuring system performance under load.", "isCorrect": false },
          { "text": "A checklist of UI components for design systems.", "isCorrect": false },
          { "text": "A scale used to measure screen size for responsive design.", "isCorrect": false },
          { "text": "A standardized 10-item questionnaire that yields a numeric score (0–100) reflecting the overall usability of a system, based on user feedback.", "isCorrect": true },
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Inclusive design is best described as:",
        "options": [
          { "text": "Adding every feature request from all users into one product.", "isCorrect": false },
          { "text": "Designing only for the average user, assuming others will adapt.", "isCorrect": false },
          { "text": "Creating separate versions of a product for every single user group.", "isCorrect": false },
          { "text": "Designing products that are usable by a wide range of people, regardless of age, ability, or circumstance, thus including as many people as possible (often by considering diverse needs from the start).", "isCorrect": true },
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "When collaborating with developers on a design system, what is one benefit of providing coded UI components (e.g., React/Vue components) as part of the system?",
        "options": [
          { "text": "It makes designers responsible for writing all front-end code.", "isCorrect": false },
          { "text": "It ensures that developers can implement the design consistently and efficiently by reusing pre-built, tested UI elements directly.", "isCorrect": true },
          { "text": "It locks the product into a single technology forever.", "isCorrect": false },
          { "text": "It slows down development since developers must use the provided code.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "The \"aesthetic-usability effect\" refers to the observation that:",
        "options": [
          { "text": "Users often perceive interfaces that are visually attractive as more usable or trustworthy, even if the actual usability is the same.", "isCorrect": true },
          { "text": "A design must sacrifice aesthetics to achieve high usability.", "isCorrect": false },
          { "text": "Only ugly interfaces end up being very usable.", "isCorrect": false },
          { "text": "Usability can be ignored if the design is very beautiful.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "During user testing, you notice a user repeatedly trying to tap a non-clickable element thinking it’s a button. What UX issue does this indicate?",
        "options": [
          { "text": "A performance issue with the device.", "isCorrect": false },
          { "text": "The user is not paying attention.", "isCorrect": false },
          { "text": "A signifier problem: the design makes a non-interactive element look interactive (misleading the user).", "isCorrect": true },
          { "text": "A content issue: the text is too long.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Which statement about usability is true according to Jakob Nielsen’s usability quality components?",
        "options": [
          { "text": "Usability is multi-dimensional, including attributes like learnability, efficiency, memorability, error tolerance (few errors), and user satisfaction.", "isCorrect": true },
          { "text": "Usability is solely determined by aesthetic appeal.", "isCorrect": false },
          { "text": "Usability only matters if the user is not tech-savvy.", "isCorrect": false },
          { "text": "If a product is usable, no further user research is needed.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What is a “cognitive walkthrough” in UX evaluation?",
        "options": [
          { "text": "A meditation technique for designers to imagine they are the user.", "isCorrect": false },
          { "text": "A method where UX experts go through tasks step-by-step in the interface, asking a set of questions at each step to identify usability issues (with focus on ease of learning for new users).", "isCorrect": true },
          { "text": "A brain activity scan done while users use an interface.", "isCorrect": false },
          { "text": "A quick tour feature built into an app for onboarding.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "If you have a very long list of items for users to select one from (for example, a country list), which solution provides the best usability?",
        "options": [
          { "text": "A searchable dropdown or autocomplete field that lets users type to filter options.", "isCorrect": true },
          { "text": "A huge scrollable list of radio buttons showing all items at once.", "isCorrect": false },
          { "text": "A single text field where users must type the exact item with no suggestions.", "isCorrect": false },
          { "text": "Splitting the list into multiple pages for the user to click through.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "When might using traditional pagination be more user-friendly than infinite scrolling?",
        "options": [
          { "text": "Never – infinite scrolling is always superior to pagination.", "isCorrect": false },
          { "text": "Only on mobile devices, not on desktop.", "isCorrect": false },
          { "text": "When the content is very short.", "isCorrect": false },
          { "text": "When users may need to find or return to specific positions in a list (like search results) or access footer information – pagination provides structure and a sense of progress.", "isCorrect": true },
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What is the “peak-end rule” and how does it relate to UX design?",
        "options": [
          { "text": "It refers to the peak number of users on a site at the end of the day for load testing.", "isCorrect": false },
          { "text": "It means the tallest element should be at the end of a page for emphasis.", "isCorrect": false },
          { "text": "It suggests that the first and last screens of an app are the only ones that matter for UX.", "isCorrect": false },
          { "text": "Users judge an experience largely based on how they felt at its most intense moment (peak) and at the end, rather than the average of every moment. Designers should ensure key moments and the final interactions are positive.", "isCorrect": true },
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "In a design system, what is meant by a “single source of truth”?",
        "options": [
          { "text": "Having one designer who finalizes all design decisions.", "isCorrect": false },
          { "text": "A centralized, version-controlled set of design assets and guidelines that everyone on the team references to ensure consistency (one definitive reference for the current design).", "isCorrect": true },
          { "text": "Storing all design files on a single computer.", "isCorrect": false },
          { "text": "Using one type of software for all design tasks.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Don Norman’s concept of “mapping” in design refers to:",
        "options": [
          { "text": "Creating sitemaps for website content.", "isCorrect": false },
          { "text": "GPS features in mobile apps.", "isCorrect": false },
          { "text": "The relationship between controls and their effects in the world – good mapping means controls are arranged in a way that corresponds naturally to what they affect (e.g., stove knobs aligned with their respective burners).", "isCorrect": true },
          { "text": "The way a user’s eyes move on the screen (eye mapping).", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What is one challenge of using a hamburger menu (hidden drawer navigation) in a mobile app that UX designers have identified?",
        "options": [
          { "text": "It takes up too much screen space with icons.", "isCorrect": false },
          { "text": "Important features may get hidden from users, leading to lower discoverability and engagement compared to visible navigation options.", "isCorrect": true },
          { "text": "Users confuse it with a shopping cart icon.", "isCorrect": false },
          { "text": "It makes the app incompatible with iOS guidelines.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "The “80/20 rule” (Pareto principle) when applied to product design means:",
        "options": [
          { "text": "Designers should spend 80% of time on aesthetics and 20% on usability.", "isCorrect": false },
          { "text": "Users can complete 80% of tasks in 20% of the time.", "isCorrect": false },
          { "text": "Only 20% of users will ever use the product extensively.", "isCorrect": false },
          { "text": "80% of the usage comes from 20% of the features, so focus on those high-value features to satisfy most user needs.", "isCorrect": true },
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "A UX team wants to measure the emotional response of users after completing a key task. Which method might specifically capture users’ subjective satisfaction?",
        "options": [
          { "text": "Measuring the time it took to complete the task.", "isCorrect": false },
          { "text": "Counting the number of clicks the user made.", "isCorrect": false },
          { "text": "Reviewing server logs for error codes.", "isCorrect": false },
          { "text": "Administering a post-task questionnaire like the Single Ease Question (SEQ) or an emotion rating scale (e.g., asking users to rate their satisfaction or frustration on a scale, or choose an emotion that reflects their feeling).", "isCorrect": true },
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What is an empathy map in UX and how does it differ from a persona?",
        "options": [
          { "text": "It’s a site map made from the user’s perspective.", "isCorrect": false },
          { "text": "An empathy map is a collaborative visualization of what a user says, thinks, does, and feels about a product or scenario, helping the team empathize with the user’s mindset. A persona is a detailed user archetype (fictional user profile); the empathy map breaks down the user’s perspective in a specific context.", "isCorrect": true },
          { "text": "It is a physical map used during ethnographic studies to mark user locations.", "isCorrect": false },
          { "text": "It is a map showing user journeys across an interface.", "isCorrect": false },
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What is a key consideration when designing for internationalization (i18n) and localization (l10n) in a UI?",
        "options": [
          { "text": "Using only English in all interfaces to maintain consistency.", "isCorrect": false },
          { "text": "Text expansion and layout flexibility: Translated text can be longer or in different scripts (and some languages are right-to-left), so the design must accommodate varying text lengths and directions.", "isCorrect": true },
          { "text": "Avoiding any icons because they don’t translate.", "isCorrect": false },
          { "text": "Hard-coding text in images since images are universal.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "When evaluating the efficiency of a UI, which metric would be most appropriate?",
        "options": [
          { "text": "Number of registered users.", "isCorrect": false },
          { "text": "Average time on task (how long it takes a user to complete a given task).", "isCorrect": true },
          { "text": "Aesthetic rating given by stakeholders.", "isCorrect": false },
          { "text": "Lines of code in the UI implementation.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "A/B testing on a live product can have pitfalls. Which of the following is a key consideration to ensure valid A/B test results?",
        "options": [
          { "text": "You need a sufficient sample size and a clear success metric; otherwise, differences might not be statistically significant (results could be due to chance).", "isCorrect": true },
          { "text": "Always run tests for at least one day and then declare a winner.", "isCorrect": false },
          { "text": "Users should not be randomly assigned; instead let them choose Version A or B.", "isCorrect": false },
          { "text": "Only test trivial changes, never significant design differences.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What is the main purpose of using heatmaps or clickmaps in UX analysis?",
        "options": [
          { "text": "To visually identify areas of a UI that receive the most user attention or interaction, helping to understand where users focus on a page.", "isCorrect": true },
          { "text": "To test color contrast on a webpage.", "isCorrect": false },
          { "text": "To warm up the screen before user testing.", "isCorrect": false },
          { "text": "To find security vulnerabilities by seeing where users click.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "A UX designer mentions the “gulf of execution” and “gulf of evaluation” when analyzing an interface. What is she referring to?",
        "options": [
          { "text": "The difference between novice and expert users in task execution time.", "isCorrect": false },
          { "text": "The time delay between user actions and system responses.", "isCorrect": false },
          { "text": "The gaps between what a user wants to do (their goal/intention) and what the interface allows them to do (execution gap), and between what the user expects to see and what the interface actually shows (evaluation gap). Good UX design tries to bridge these gaps by making actions intuitive and feedback clear.", "isCorrect": true },
          { "text": "The cultural differences in user expectations between regions.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "When conducting a heuristic evaluation, experts sometimes use a severity rating for usability issues found. What factors typically determine an issue’s severity?",
        "options": [
          { "text": "The personal mood of the evaluator that day.", "isCorrect": false },
          { "text": "The number of developers needed to fix the issue.", "isCorrect": false },
          { "text": "The impact of the issue on the user’s experience (how much it hinders task completion), the frequency with which users will encounter the issue, and sometimes the ease of fixing it.", "isCorrect": true },
          { "text": "The financial cost of the project.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "The image shows a mobile UI element with a bold focus highlight and a voiceover hint. Which accessibility feature is being used?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748269079/b65a9c5b-91b1-4cb3-b878-c546d859361c_dibjge.png",
        "options": [
          { "text": "A high-contrast display mode.", "isCorrect": false },
          { "text": "A screen reader (voiceover) navigating the interface.", "isCorrect": true },
          { "text": "A magnification tool.", "isCorrect": false },
          { "text": "Voice recognition for commands.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "The comparison image highlights which accessibility concern for designers?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748269076/bd293c8f-258e-4af1-91b8-aad8ab3ad048_p6pwf9.png",
        "options": [
          { "text": "Screen resolution differences.", "isCorrect": false },
          { "text": "Icon design consistency.", "isCorrect": false },
          { "text": "Motion sickness from animations.", "isCorrect": false },
          { "text": "Color blindness – ensuring that important information isn’t conveyed by color alone, since some users can’t distinguish certain colors.", "isCorrect": true },
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "The image shows part of a design system documentation with a UI component example and code. What does this illustrate?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748269072/843e07c9-9473-4582-ae5a-67fcd9630671_cwpe19.png",
        "options": [
          { "text": "A user analytics dashboard tracking button clicks.", "isCorrect": false },
          { "text": "A design system’s component documentation that includes both design specifications and code for developers.", "isCorrect": true },
          { "text": "A wireframe with annotations.", "isCorrect": false },
          { "text": "A version control commit history.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "The right screen shows text overflowing due to longer words in another language. Which internationalization issue does this highlight?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748269073/f8aff3a5-bc2e-49f1-acc6-8b80b91b8f17_erwuhq.png",
        "options": [
          { "text": "Font corruption for non-English text.", "isCorrect": false },
          { "text": "Text expansion in localization – designs must accommodate longer translations (e.g., German often has longer words than English).", "isCorrect": true },
          { "text": "Using the wrong character encoding.", "isCorrect": false },
          { "text": "Improper color settings for different regions.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "The design of this dialog suggests a deceptive UX technique. What is this an example of?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748269074/a0711177-c6ea-4c41-9bf2-b0179d812177_p6ggzm.png",
        "options": [
          { "text": "A dark pattern – the design is trying to nudge users to click \"Accept\" by making \"Decline\" less visible.", "isCorrect": true },
          { "text": "A high-contrast mode for accessibility.", "isCorrect": false },
          { "text": "A multi-factor authentication prompt.", "isCorrect": false },
          { "text": "An A/B test in progress.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "The image shows a collaborative chart with sections for what a user says, thinks, does, and feels. This artifact is known as:",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748269075/5774331b-410a-4bdd-8e83-d38647999ce1_msinmu.png",
        "options": [
          { "text": "A service blueprint.", "isCorrect": false },
          { "text": "An empathy map.", "isCorrect": true },
          { "text": "A user journey map.", "isCorrect": false },
          { "text": "A kanban board.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "Usability experts often use stove controls as an analogy. What design concept does this image illustrate when controls (knobs) don’t intuitively match their effects (burners)?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748269084/c6a4f403-4324-4d3c-9aec-479c7f2a7927_ltzftq.png",
        "options": [
          { "text": "Lack of error prevention.", "isCorrect": false },
          { "text": "Low fidelity prototyping.", "isCorrect": false },
          { "text": "Poor mapping between controls and their outcomes.", "isCorrect": true },
          { "text": "A security flaw in design.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "The differences between the two images demonstrate what important design consideration?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748269082/f18a6aed-5591-47cf-8be0-87be663f3f02_altxem.png",
        "options": [
          { "text": "Right-to-left (RTL) language support – the UI needs to adapt layout and alignment for languages like Arabic.", "isCorrect": true },
          { "text": "A printing stylesheet.", "isCorrect": false },
          { "text": "A responsive design breakpoint.", "isCorrect": false },
          { "text": "A color scheme change.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "What loading UI pattern is shown by the gray placeholder boxes in the image?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748269081/a9043d35-b3e9-4eb9-ba3a-a037e228b3c0_kwx1tt.png",
        "options": [
          { "text": "A progress bar that failed to load.", "isCorrect": false },
          { "text": "A custom font preview.", "isCorrect": false },
          { "text": "A skeleton screen loading indicator.", "isCorrect": true },
          { "text": "An error state for missing content.", "isCorrect": false }
        ],
        "difficulty": "hard"
      }
    ],
    isAvailable : true,
    category : 'UI UX'
  }
]

const newMotionDesTemplates = [
  {
    title : 'Level 1',
    questions : [
      {
        "questionType": "text",
        "text": "Which panel in Adobe Premiere Pro is used to assemble and arrange video clips into a sequence?",
        "options": [
          { "text": "Project Panel", "isCorrect": false },
          { "text": "Timeline (Sequence) Panel", "isCorrect": true },
          { "text": "Effects Panel", "isCorrect": false },
          { "text": "Media Browser", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "In video editing, what does it mean to “trim” a clip?",
        "options": [
          { "text": "Split the clip into two parts", "isCorrect": false },
          { "text": "Adjust the clip’s in-point and/or out-point to shorten or lengthen it", "isCorrect": true },
          { "text": "Apply a filter effect to the clip", "isCorrect": false },
          { "text": "Change the clip’s playback speed", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which tool in Premiere Pro is used to split a clip at a specific point on the timeline?",
        "options": [
          { "text": "Selection Tool", "isCorrect": false },
          { "text": "Pen Tool", "isCorrect": false },
          { "text": "Razor Tool (Cut tool)", "isCorrect": true },
          { "text": "Hand Tool", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What is the approximate frame rate for NTSC standard video (North America)?",
        "options": [
          { "text": "24 frames per second", "isCorrect": false },
          { "text": "25 frames per second", "isCorrect": false },
          { "text": "60 frames per second", "isCorrect": false },
          { "text": "~30 frames per second", "isCorrect": true }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What does “FPS” stand for in the context of video?",
        "options": [
          { "text": "Frames Per Second", "isCorrect": true },
          { "text": "Focus Point Shift", "isCorrect": false },
          { "text": "File Protocol Standard", "isCorrect": false },
          { "text": "Fast Playback Sequence", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "A video resolution labeled “1080p Full HD” corresponds to what pixel dimensions?",
        "options": [
          { "text": "1280 × 720", "isCorrect": false },
          { "text": "1920 × 1080", "isCorrect": true },
          { "text": "3840 × 2160", "isCorrect": false },
          { "text": "1024 × 1080", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "The aspect ratio of a 1920×1080 video frame is:",
        "options": [
          { "text": "4:3", "isCorrect": false },
          { "text": "1:1", "isCorrect": false },
          { "text": "16:9", "isCorrect": true },
          { "text": "21:9", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which of the following is a common video file format (container)?",
        "options": [
          { "text": "JPEG", "isCorrect": false },
          { "text": "MP3", "isCorrect": false },
          { "text": "PSD", "isCorrect": false },
          { "text": "MP4", "isCorrect": true }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What is the main purpose of the Project Panel in Premiere Pro?",
        "options": [
          { "text": "To organize and access all media assets (video, audio, images) in the project", "isCorrect": true },
          { "text": "To adjust color and visual effects on clips", "isCorrect": false },
          { "text": "To preview the video output on an external monitor", "isCorrect": false },
          { "text": "To perform cutting and trimming directly on the timeline", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "In a video editing timeline, if a video clip on Track 2 overlaps a clip on Track 1 at the same time, what will the audience see by default?",
        "options": [
          { "text": "Both tracks will blend together equally", "isCorrect": false },
          { "text": "The video on Track 2 will cover the video on Track 1", "isCorrect": true },
          { "text": "The video on Track 1 will appear on top of Track 2", "isCorrect": false },
          { "text": "A split-screen showing both Track 1 and Track 2", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "By default, what does pressing the spacebar do in most video editing software (e.g. Premiere Pro)?",
        "options": [
          { "text": "Cut the selected clip", "isCorrect": false },
          { "text": "Toggle fullscreen preview", "isCorrect": false },
          { "text": "Play or pause the video playback", "isCorrect": true },
          { "text": "Add a marker on the timeline", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which transition creates a gradual fade of one clip into another?",
        "options": [
          { "text": "Hard Cut", "isCorrect": false },
          { "text": "Wipe", "isCorrect": false },
          { "text": "Slide", "isCorrect": false },
          { "text": "Cross Dissolve", "isCorrect": true }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What does it mean to “export” a video project?",
        "options": [
          { "text": "Render and output the edited sequence as a final video file", "isCorrect": true },
          { "text": "Save the project file for future editing", "isCorrect": false },
          { "text": "Import new media into the project", "isCorrect": false },
          { "text": "Transfer the project file to another editing software", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which of the following is a commonly used video codec for high-quality online video?",
        "options": [
          { "text": "MP3", "isCorrect": false },
          { "text": "H.264", "isCorrect": true },
          { "text": "PNG", "isCorrect": false },
          { "text": "RAW", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "In video production, “resolution” refers to:",
        "options": [
          { "text": "The loudness level of the audio track", "isCorrect": false },
          { "text": "The length of the video in minutes", "isCorrect": false },
          { "text": "The number of pixels in the video frame (width × height)", "isCorrect": true },
          { "text": "The playback speed of the video", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which Premiere Pro panel allows you to adjust a clip’s properties (e.g. position, scale, opacity) or applied effects?",
        "options": [
          { "text": "Program Monitor", "isCorrect": false },
          { "text": "Tools Panel", "isCorrect": false },
          { "text": "Audio Meters Panel", "isCorrect": false },
          { "text": "Effect Controls Panel", "isCorrect": true }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What is a “keyframe” in the context of animation or video effects?",
        "options": [
          { "text": "A marker indicating a change in a layer property at a specific time", "isCorrect": true },
          { "text": "The first frame of a video clip or animation", "isCorrect": false },
          { "text": "A thumbnail image representing a video file", "isCorrect": false },
          { "text": "A type of transition effect between shots", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Enabling “snapping” on the timeline (magnet icon) does what?",
        "options": [
          { "text": "Loops the playback continuously from start to end", "isCorrect": false },
          { "text": "Makes clips and the playhead align automatically to cut points or markers when moved", "isCorrect": true },
          { "text": "Locks the selected clip so it cannot be moved accidentally", "isCorrect": false },
          { "text": "Toggles full-screen mode when previewing the timeline", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What is the file extension of Adobe Premiere Pro project files?",
        "options": [
          { "text": ".aep", "isCorrect": false },
          { "text": ".mov", "isCorrect": false },
          { "text": ".prproj", "isCorrect": true },
          { "text": ".proj", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What is the file extension of Adobe After Effects project files?",
        "options": [
          { "text": ".prproj", "isCorrect": false },
          { "text": ".ae", "isCorrect": false },
          { "text": ".aefx", "isCorrect": false },
          { "text": ".aep", "isCorrect": true }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which software is most commonly used to create motion graphics and animations for video?",
        "options": [
          { "text": "Adobe After Effects", "isCorrect": true },
          { "text": "Adobe Audition", "isCorrect": false },
          { "text": "Adobe InDesign", "isCorrect": false },
          { "text": "Adobe Lightroom", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which software is typically used for non-linear editing of video footage into a sequence?",
        "options": [
          { "text": "Adobe Illustrator", "isCorrect": false },
          { "text": "Adobe Premiere Pro", "isCorrect": true },
          { "text": "Adobe Media Encoder", "isCorrect": false },
          { "text": "Adobe Photoshop", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What is a “fade to black” transition?",
        "options": [
          { "text": "Cutting abruptly between two clips with no transition", "isCorrect": false },
          { "text": "Sliding one clip off-screen as the next clip slides in", "isCorrect": false },
          { "text": "A transition where the video gradually darkens to a black screen (or emerges from black)", "isCorrect": true },
          { "text": "Inserting a single black frame between shots to simulate a flash", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "To smooth out an audio cut between two clips, an editor would typically:",
        "options": [
          { "text": "Increase the volume on the second clip significantly", "isCorrect": false },
          { "text": "Mute one of the clips during the transition", "isCorrect": false },
          { "text": "Use a color correction effect on the cut", "isCorrect": false },
          { "text": "Add an audio crossfade (fade-out/fade-in) between the clips", "isCorrect": true }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Setting “In” and “Out” points on a source clip before editing serves to:",
        "options": [
          { "text": "Define the portion of the clip that will be used in the edit", "isCorrect": true },
          { "text": "Mark where a transition effect will be applied", "isCorrect": false },
          { "text": "Synchronize two clips on the timeline automatically", "isCorrect": false },
          { "text": "Adjust the clip’s playback speed between those points", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What is “scrubbing” through video?",
        "options": [
          { "text": "Removing unwanted noise from the audio track", "isCorrect": false },
          { "text": "Moving the playhead across the timeline/footage to preview the video quickly", "isCorrect": true },
          { "text": "Cleaning up pixelation in a low-quality video", "isCorrect": false },
          { "text": "Exporting the video at a lower quality for preview purposes", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "In the timeline, how can you tell if a video’s audio is linked or unlinked from the video?",
        "options": [
          { "text": "Linked video and audio clips show a chain/link icon and are selected together; unlinked clips can be moved independently", "isCorrect": false },
          { "text": "The audio waveform turns red when it’s unlinked from its video", "isCorrect": false },
          { "text": "Unlinked audio clips cannot be moved on the timeline at all", "isCorrect": false },
          { "text": "Linked video and audio clips often appear grouped and move together, while unlinked clips can be manipulated separately.", "isCorrect": true }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which tool in Premiere Pro is used to add text titles directly onto the video?",
        "options": [
          { "text": "Pen Tool", "isCorrect": false },
          { "text": "Razor Tool", "isCorrect": false },
          { "text": "Slip Tool", "isCorrect": false },
          { "text": "Type (Text) Tool", "isCorrect": true }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What is the function of the timeline zoom slider in an editing program?",
        "options": [
          { "text": "Zooming in/out of the timeline view to see clips in more detail or see more of the sequence", "isCorrect": true },
          { "text": "Zooming into the video image in the preview monitor", "isCorrect": false },
          { "text": "Scaling up the video resolution for export", "isCorrect": false },
          { "text": "Increasing the audio volume on the timeline", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "How can you quickly lower the volume of an audio clip in the timeline?",
        "options": [
          { "text": "Cut the clip into many smaller pieces", "isCorrect": false },
          { "text": "Drag down the clip’s audio level line (gain/volume) on the timeline", "isCorrect": true },
          { "text": "Increase the height of the audio track", "isCorrect": false },
          { "text": "Apply a Warp Stabilizer effect to the clip", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "If your video preview is choppy or lagging during editing, what is one way to improve playback performance?",
        "options": [
          { "text": "Increase the project’s frame rate beyond the source footage’s frame rate", "isCorrect": false },
          { "text": "Turn off the autosave feature while editing", "isCorrect": false },
          { "text": "Lower the playback resolution of the preview (e.g., from Full to 1/2 or 1/4 quality)", "isCorrect": true },
          { "text": "Fully render the entire project after every edit before playback", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What does pressing Ctrl+Z (Windows) or Command+Z (Mac) typically do in editing software?",
        "options": [
          { "text": "Split the clip at the playhead position", "isCorrect": false },
          { "text": "Zoom into the timeline at the playhead", "isCorrect": false },
          { "text": "Save the project", "isCorrect": false },
          { "text": "Undo the last action performed", "isCorrect": true }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "In Premiere Pro, how can you reverse the playback direction of a clip (make it play backward)?",
        "options": [
          { "text": "Use the “Reverse Speed” option in the clip’s Speed/Duration settings", "isCorrect": true },
          { "text": "Rotate the clip 180 degrees on the timeline", "isCorrect": false },
          { "text": "Lower the clip’s frame rate to 0 fps", "isCorrect": false },
          { "text": "Press a “reverse playback” button on the Program Monitor", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "In Premiere Pro, what is a “bin” in the Project Panel?",
        "options": [
          { "text": "A video file format supported by Premiere", "isCorrect": false },
          { "text": "A folder used to organize media assets within the project", "isCorrect": true },
          { "text": "A type of transition effect between clips", "isCorrect": false },
          { "text": "The location where deleted clips are stored", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which of the following is a dedicated 3D animation software (as opposed to a video editor)?",
        "options": [
          { "text": "Adobe Premiere Pro", "isCorrect": false },
          { "text": "Adobe After Effects", "isCorrect": false },
          { "text": "Blender", "isCorrect": true },
          { "text": "Adobe Photoshop", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "What is the purpose of the highlighted tool (the Razor Tool) in video editing?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748324070/c03cee79-b586-4aa6-a390-86abc88f56e5_oijrhk.png",
        "options": [
          { "text": "To cut or split a clip at the specified point on the timeline", "isCorrect": true },
          { "text": "To move the playhead to a different time", "isCorrect": false },
          { "text": "To adjust the audio levels of a clip", "isCorrect": false },
          { "text": "To apply a color correction filter to a clip", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "In the situation shown (two clips overlapping on two tracks), what will the viewer see during the overlapping section?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748324070/fea7382c-5657-4b67-85fa-9806f7f0a7d2_oubck5.png",
        "options": [
          { "text": "Both clips will be visible, blended together evenly", "isCorrect": false },
          { "text": "The video from the top track (Track 2) will cover and be seen instead of the bottom track", "isCorrect": true },
          { "text": "The video from the bottom track (Track 1) will show through on top of Track 2", "isCorrect": false },
          { "text": "The scene will switch to a split-screen showing both clips simultaneously", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "What do the markers at the start and end of the clip (as shown in the image) represent?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748324068/888e5d7f-d9f0-443b-86d9-aa7e0b30cf5f_j9qczt.png",
        "options": [
          { "text": "The video’s frame rate indicators", "isCorrect": false },
          { "text": "Points where the audio volume changes", "isCorrect": false },
          { "text": "The In-point and Out-point defining the portion of the clip to use", "isCorrect": true },
          { "text": "A section of the clip set for slow-motion", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "What is the name of the highlighted element on the timeline that indicates the current playback position in the sequence?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748324070/8cc6df09-107a-4a8c-836c-ec967256ad5f_rw8scd.png",
        "options": [
          { "text": "End Marker", "isCorrect": false },
          { "text": "Transition Cursor", "isCorrect": false },
          { "text": "Cut Line", "isCorrect": false },
          { "text": "The Playhead (Current Time Indicator)", "isCorrect": true }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "Which transition effect appears to be applied between the two clips in the image?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748324069/522f3455-2c4a-4de5-a04f-a13cded0eabe_wdbbaq.png",
        "options": [
          { "text": "Cross Dissolve", "isCorrect": true },
          { "text": "Wipe Transition", "isCorrect": false },
          { "text": "Fade to Black", "isCorrect": false },
          { "text": "Slide Transition", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "In the timeline image, what do the waveform shapes on the audio track represent?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748324068/e009dfa7-7e41-4a30-9fdc-98d6ec24e4b7_mlblxo.png",
        "options": [
          { "text": "The brightness or luminance of the video over time", "isCorrect": false },
          { "text": "The audio signal (volume and sound waves) of the clip’s audio track", "isCorrect": true },
          { "text": "A visual effect applied to the audio", "isCorrect": false },
          { "text": "Changes in the frame rate of the video", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "Which composition guideline is illustrated by the placement of the subject at the intersection of the grid lines in the image?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748324068/8ccae248-1564-4e00-8c13-192f4075acbf_fhwyco.png",
        "options": [
          { "text": "Golden Ratio", "isCorrect": false },
          { "text": "Center Framing", "isCorrect": false },
          { "text": "Rule of Thirds", "isCorrect": true },
          { "text": "Leading Lines", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "The style shown in the image is an example of what type of animation?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748324068/2d4f441f-6fa4-4076-9323-dc8d3b5d7a82_ec0evz.png",
        "options": [
          { "text": "Photorealistic 3D animation", "isCorrect": false },
          { "text": "Stop-motion animation", "isCorrect": false },
          { "text": "Traditional hand-drawn animation", "isCorrect": false },
          { "text": "Flat 2D vector graphic motion animation", "isCorrect": true }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "What is the common name of the text animation shown in the image, where text moves upward vertically to list information?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748324068/7ae1e438-bd86-4359-b0bd-837492e6bd69_aaxgnn.png",
        "options": [
          { "text": "Rolling credits", "isCorrect": true },
          { "text": "Typewriter text effect", "isCorrect": false },
          { "text": "Kinetic typography", "isCorrect": false },
          { "text": "Lower-third title", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "What do the diamond-shaped icons on the timeline (as shown in the image) signify in animation?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748324070/179cd39b-14bb-455c-a52c-ab9b63f69dd0_a17pjl.png",
        "options": [
          { "text": "Markers denoting where a new scene begins", "isCorrect": false },
          { "text": "Keyframes indicating points where a layer’s property value changes", "isCorrect": true },
          { "text": "Points where the audio reaches peak volume", "isCorrect": false },
          { "text": "An error or drop frame in the footage", "isCorrect": false }
        ],
        "difficulty": "easy"
      }
    ],
    isAvailable : true,
    category : 'Motion Designer'
  },
  {
    title : 'Level 2',
    questions : [
      {
        "questionType": "text",
        "text": "Which of the following is NOT one of the traditional “12 Principles of Animation”?",
        "options": [
          { "text": "Chromatic Aberration", "isCorrect": true },
          { "text": "Squash and Stretch", "isCorrect": false },
          { "text": "Anticipation", "isCorrect": false },
          { "text": "Follow-Through and Overlapping Action", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "The principle of Anticipation in animation refers to:",
        "options": [
          { "text": "The follow-through motion that happens after the main action", "isCorrect": false },
          { "text": "Small preparatory actions before a main action, to prepare the audience for what’s about to happen", "isCorrect": true },
          { "text": "Immediately accelerating an object at the start of a movement", "isCorrect": false },
          { "text": "Making a character’s pose more appealing to the audience", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Which principle of animation involves extra movements that continue after the main action is completed (such as a character’s hair or clothing still moving after the character stops)?",
        "options": [
          { "text": "Squash and Stretch", "isCorrect": false },
          { "text": "Anticipation", "isCorrect": false },
          { "text": "Follow-Through and Overlapping Action", "isCorrect": true },
          { "text": "Timing and Spacing", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Which principle is demonstrated when an animated object changes shape (elongates or flattens) to emphasize speed, weight, or impact?",
        "options": [
          { "text": "Staging", "isCorrect": false },
          { "text": "Secondary Action", "isCorrect": false },
          { "text": "Exaggeration", "isCorrect": false },
          { "text": "Squash and Stretch", "isCorrect": true }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "“Slow In” and “Slow Out” (Ease-In/Ease-Out) in animation means:",
        "options": [
          { "text": "Movements start slowly, then accelerate, and slow down again at the end (gradual acceleration and deceleration)", "isCorrect": true },
          { "text": "An object moves at a constant slow speed during the entire motion", "isCorrect": false },
          { "text": "A scene begins and ends with a long pause on a still frame", "isCorrect": false },
          { "text": "Using fewer total frames to make an action appear slower", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "In animation, Timing and Spacing primarily affect:",
        "options": [
          { "text": "The synchronization of audio with the animation", "isCorrect": false },
          { "text": "The perceived weight and realism of an object’s movement", "isCorrect": true },
          { "text": "The brightness and color accuracy of each frame", "isCorrect": false },
          { "text": "The layer ordering of elements in a scene", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Which animation principle is about the path of action, preferring natural curved trajectories over straight lines (as shown by how objects move)?",
        "options": [
          { "text": "Staging", "isCorrect": false },
          { "text": "Appeal", "isCorrect": false },
          { "text": "Arcs", "isCorrect": true },
          { "text": "Straight-Ahead Action", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "The principle of Exaggeration in animation is used to:",
        "options": [
          { "text": "Overstate the audio volume of a scene", "isCorrect": false },
          { "text": "Add as many elements as possible to a scene for richness", "isCorrect": false },
          { "text": "Extend the length of an action far beyond realistic timing", "isCorrect": false },
          { "text": "Push motions or poses beyond realistic limits to increase clarity and impact", "isCorrect": true }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "In computer animation, what does keyframe interpolation refer to?",
        "options": [
          { "text": "Capturing live motion data to use in an animation", "isCorrect": false },
          { "text": "The software automatically calculating the in-between frames between two keyframes", "isCorrect": true },
          { "text": "Converting an animation into a different video format", "isCorrect": false },
          { "text": "The way layers are blended together during compositing", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "In Adobe After Effects, clicking the stopwatch icon next to a layer property (e.g. “Position”) will:",
        "options": [
          { "text": "Set a timeline marker at that frame for reference", "isCorrect": false },
          { "text": "Enable animation for that property, allowing you to create keyframes over time", "isCorrect": true },
          { "text": "Loop the animation for that property continuously", "isCorrect": false },
          { "text": "Lock the property so its value cannot change", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What does “easing” an animation do?",
        "options": [
          { "text": "Adds motion blur to fast-moving objects automatically", "isCorrect": false },
          { "text": "Makes the animation loop continuously back and forth", "isCorrect": false },
          { "text": "Adjusts the motion so that it gradually accelerates or decelerates, rather than moving at a constant speed", "isCorrect": true },
          { "text": "Aligns the movement of an object perfectly with the beats of background music", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Which After Effects editor allows you to adjust the speed curves (acceleration/deceleration) of animated properties visually?",
        "options": [
          { "text": "Layer Editor", "isCorrect": false },
          { "text": "Node Graph Editor", "isCorrect": false },
          { "text": "Sequence Editor", "isCorrect": false },
          { "text": "Graph Editor (for editing keyframe speed/velocity curves)", "isCorrect": true }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What is a “motion path” in 2D animation software like After Effects?",
        "options": [
          { "text": "The order in which layers are stacked in the timeline", "isCorrect": false },
          { "text": "A type of file format for exporting animations", "isCorrect": false },
          { "text": "The trajectory or curve that an object follows as it moves across the screen", "isCorrect": true },
          { "text": "A color gradient applied to a moving object to indicate speed", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What is the purpose of adding motion blur to an animation?",
        "options": [
          { "text": "To decrease the video’s resolution and file size", "isCorrect": false },
          { "text": "To simulate the blur of fast movement, making the motion appear smoother and more realistic", "isCorrect": true },
          { "text": "To fade an object in and out of the scene", "isCorrect": false },
          { "text": "To add a glowing trail behind moving objects", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "In Adobe After Effects, what is a Composition (comp)?",
        "options": [
          { "text": "A type of layer blending mode used for compositing", "isCorrect": false },
          { "text": "The process of merging multiple rendered passes together", "isCorrect": false },
          { "text": "A container that includes its own timeline, layers, and settings for a specific scene or animation", "isCorrect": true },
          { "text": "An audio mixing technique used in post-production", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What does it mean to pre-compose (pre-comp) in After Effects?",
        "options": [
          { "text": "Pre-rendering a part of the composition to speed up previews", "isCorrect": false },
          { "text": "Opening a smaller preview window of your composition", "isCorrect": false },
          { "text": "Using a preset template for a new composition", "isCorrect": false },
          { "text": "Nesting selected layers into their own sub-composition to simplify the main timeline or apply effects to the group collectively", "isCorrect": true }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Parenting layers in After Effects allows you to:",
        "options": [
          { "text": "Link one layer’s transformations (movement, scaling, etc.) to another layer, so the “child” layer follows the “parent” layer", "isCorrect": true },
          { "text": "Group layers into a folder in the project panel", "isCorrect": false },
          { "text": "Apply the same effect to multiple layers at once automatically", "isCorrect": false },
          { "text": "Lock multiple layers together so they can’t be edited", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "In After Effects, what is a mask primarily used for?",
        "options": [
          { "text": "Tracking the motion of an object in a video clip", "isCorrect": false },
          { "text": "Defining a region on a layer to hide or reveal specific parts of that layer", "isCorrect": true },
          { "text": "Changing the overall dimensions of a composition", "isCorrect": false },
          { "text": "Applying a uniform color adjustment to an entire layer", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What is a storyboard in the context of motion design?",
        "options": [
          { "text": "A text script that contains dialogue and voice-over for the animation", "isCorrect": false },
          { "text": "A physical board where concept art is pinned during production", "isCorrect": false },
          { "text": "A sequence of drawn panels or images that visually outlines the scenes and progression of the animation before production", "isCorrect": true },
          { "text": "A timeline of keywords and ideas for the narrative", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What is an animatic?",
        "options": [
          { "text": "A type of animation style characterized by mechanical movements", "isCorrect": false },
          { "text": "A device used for capturing motion data from actors", "isCorrect": false },
          { "text": "The process of automatically generating character animations with AI", "isCorrect": false },
          { "text": "A preliminary version of the animation that uses storyboard images (often with rough motion and audio) to preview timing and scene flow", "isCorrect": true }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "The term “2D motion graphics” typically refers to:",
        "options": [
          { "text": "Animating flat graphics (like text, shapes, and illustrations) in a two-dimensional space (usually using software like After Effects)", "isCorrect": true },
          { "text": "Creating stereoscopic 3D animations viewable with 3D glasses", "isCorrect": false },
          { "text": "Filming a scene with two cameras side by side", "isCorrect": false },
          { "text": "Drawing every frame by hand on paper for a traditional cartoon", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "“Straight-Ahead Action” versus “Pose-to-Pose” is an animation principle that describes:",
        "options": [
          { "text": "A difference between animating characters versus animating objects", "isCorrect": false },
          { "text": "Two animation techniques: one involves animating frame-by-frame straight through from start to finish, and the other involves planning key poses first and then filling in the in-between frames", "isCorrect": true },
          { "text": "The distinction between forward camera movement and sideways camera movement", "isCorrect": false },
          { "text": "Working on animation as an individual versus as part of a team", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "The principle of Secondary Action in animation is:",
        "options": [
          { "text": "The main, primary action that occurs in a scene", "isCorrect": false },
          { "text": "A background action that loops independently of the main action", "isCorrect": false },
          { "text": "An additional action that complements and reinforces the main action (for example, a character’s facial expression or a swinging arm that adds to the primary movement)", "isCorrect": true },
          { "text": "A method of animating background elements separately from foreground elements", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What does the principle of Staging refer to in animation and film?",
        "options": [
          { "text": "Building physical stage sets for characters to perform on", "isCorrect": false },
          { "text": "The sequence in which scenes are animated and completed", "isCorrect": false },
          { "text": "Presenting an idea in a clear and focused way, through composition, timing, and cinematography, so that the audience easily understands the story point", "isCorrect": true },
          { "text": "Animating a scene in multiple passes or stages (e.g., rough pass, cleanup pass)", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "“Appeal” as one of the principles of animation means:",
        "options": [
          { "text": "Having characters directly address the audience (appealing to the fourth wall)", "isCorrect": false },
          { "text": "Adding sparkles, shine, or other effects to make a scene look attractive", "isCorrect": false },
          { "text": "Designing and animating characters and objects in a way that is interesting and engaging to the audience", "isCorrect": true },
          { "text": "Using only cute or conventionally attractive characters in the animation", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What is a track matte used for in After Effects?",
        "options": [
          { "text": "Tracking the movement of an object in a video clip", "isCorrect": false },
          { "text": "Using one layer’s alpha (transparency) or luminance to mask another layer (thereby showing/hiding the second layer in the shape of the first)", "isCorrect": true },
          { "text": "Matching the movement of the camera between two shots", "isCorrect": false },
          { "text": "Converting a 2D layer into a 3D layer with depth", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "To make an object fade out over time in an animation, which property would you animate?",
        "options": [
          { "text": "Position", "isCorrect": false },
          { "text": "Scale", "isCorrect": false },
          { "text": "Opacity", "isCorrect": true },
          { "text": "Rotation", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Which feature in After Effects helps stabilize a shaky video clip?",
        "options": [
          { "text": "Enabling Motion Blur for the layer", "isCorrect": false },
          { "text": "Using the Keyframe Assistant", "isCorrect": false },
          { "text": "Applying a Track Matte to the footage", "isCorrect": false },
          { "text": "Applying the “Warp Stabilizer” effect to the clip", "isCorrect": true }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Why are vector graphics (from software like Adobe Illustrator) often used for motion graphics elements like logos or illustrations?",
        "options": [
          { "text": "Vector artwork can be scaled to any size without loss of quality, which is ideal for animations that may zoom or resize elements", "isCorrect": true },
          { "text": "Vector files automatically generate basic animations due to their mathematical nature", "isCorrect": false },
          { "text": "Vector graphics use fewer colors, making it easier to recolor them during animation", "isCorrect": false },
          { "text": "Vector graphics are much easier to import into video software than bitmap images", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What does the alpha channel of a video or image represent?",
        "options": [
          { "text": "The overall brightness or gamma of the image", "isCorrect": false },
          { "text": "The transparency information of the image (which parts are transparent vs. opaque)", "isCorrect": true },
          { "text": "The primary audio channel in a video file", "isCorrect": false },
          { "text": "The first frame (start frame) of a video clip", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "In After Effects, enabling the 3D layer switch on a layer allows you to:",
        "options": [
          { "text": "Automatically convert that layer into a fully 3D modeled object", "isCorrect": false },
          { "text": "Render the layer using a real-time 3D game engine", "isCorrect": false },
          { "text": "Move, rotate, and position the layer in three dimensions (adding X, Y, and Z axes for that layer)", "isCorrect": true },
          { "text": "Animate the layer without setting any keyframes manually", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What is the Render Queue in After Effects used for?",
        "options": [
          { "text": "It’s the main composition timeline where you arrange your layers", "isCorrect": false },
          { "text": "A networked system of computers for distributed rendering", "isCorrect": false },
          { "text": "A list of frames waiting to be previewed in RAM", "isCorrect": false },
          { "text": "A queue where you add compositions and set export settings in order to render out final video files", "isCorrect": true }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "In motion graphics, what is a blending mode (e.g., Multiply, Screen) used for?",
        "options": [
          { "text": "Changing how a layer’s pixels blend with the layers beneath it (for example, making blacks transparent or lightening the underlying layers)", "isCorrect": true },
          { "text": "Toggling a layer between 2D and 3D space", "isCorrect": false },
          { "text": "Fading a layer’s audio in or out", "isCorrect": false },
          { "text": "Automatically generating in-between keyframes for a layer’s motion", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "In video editing, what is a “J-cut”?",
        "options": [
          { "text": "A cut made precisely on the beat of background music", "isCorrect": false },
          { "text": "A cut where the audio of the next scene begins to play before the current scene’s visual has cut away (audio leads into the next scene)", "isCorrect": true },
          { "text": "A cut hidden by inserting a single-frame flash between scenes", "isCorrect": false },
          { "text": "A technique of cutting a clip into many quick, consecutive shots", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What is onion skinning in animation?",
        "options": [
          { "text": "A layering mode that makes drawn lines semi-transparent like an onion skin", "isCorrect": false },
          { "text": "A filter effect used to smooth line art in animations", "isCorrect": false },
          { "text": "A feature that displays faint images of preceding and following frames (frames before and after the current frame) to help the animator create smooth motion", "isCorrect": true },
          { "text": "A method of peeling away background layers during compositing to see the underlying elements", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "Which principle of animation is illustrated by the ball in the image squashing on impact and stretching as it bounces?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748325073/10dd2a11-97dd-4b03-8a6a-72e2baed0ff1_fhvye2.png",
        "options": [
          { "text": "Anticipation", "isCorrect": false },
          { "text": "Squash and Stretch", "isCorrect": true },
          { "text": "Follow-Through", "isCorrect": false },
          { "text": "Exaggeration", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "Which animation principle is demonstrated by the curved path of motion shown in the image (as opposed to a straight-line movement)?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748325072/60569312-e633-4e5e-bc3c-1abeff912439_aypyye.png",
        "options": [
          { "text": "Staging", "isCorrect": false },
          { "text": "Exaggeration", "isCorrect": false },
          { "text": "Arcs", "isCorrect": true },
          { "text": "Straight Ahead Action", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "Which principle of animation is illustrated by the character’s preparatory pose shown in the image (gathering energy before a big action)?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748325073/06ebb5fc-eb9e-4464-a326-bbb502201ab0_bxwo3z.png",
        "options": [
          { "text": "Follow-Through", "isCorrect": false },
          { "text": "Secondary Action", "isCorrect": false },
          { "text": "Squash and Stretch", "isCorrect": false },
          { "text": "Anticipation", "isCorrect": true }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "Which principle of animation is depicted by the character’s hair and clothes continuing to move forward after the character’s body has come to a stop?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748325072/358d8842-7240-462b-9559-8e225f1031d2_dnwr5p.png",
        "options": [
          { "text": "Follow-Through (and Overlapping Action)", "isCorrect": true },
          { "text": "Anticipation", "isCorrect": false },
          { "text": "Squash and Stretch", "isCorrect": false },
          { "text": "Solid Drawing", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "What does the increasing distance between each consecutive position of the moving object in the image suggest about the object’s motion?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748325071/8c402736-64f7-4d03-8a9e-d44172c13069_jcazbe.png",
        "options": [
          { "text": "It is moving at a constant speed", "isCorrect": false },
          { "text": "It is accelerating (speeding up over time)", "isCorrect": true },
          { "text": "It is decelerating (slowing down gradually)", "isCorrect": false },
          { "text": "It is frequently reversing direction", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "Which software’s interface is shown in the image, commonly used for 2D motion design and compositing?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748325077/69671d7c-537d-4fa0-8856-debb38567cb7_o3mupz.png",
        "options": [
          { "text": "Adobe Premiere Pro", "isCorrect": false },
          { "text": "Blender", "isCorrect": false },
          { "text": "Adobe After Effects", "isCorrect": true },
          { "text": "Adobe Photoshop", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "What is the series of images shown in the example used for during the animation planning process?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748325076/9fa9b102-2b3e-4085-80cb-6d1535373983_pthodn.png",
        "options": [
          { "text": "Final animation frames ready for export", "isCorrect": false },
          { "text": "A style frame sequence to define visual style", "isCorrect": false },
          { "text": "A color grading reference sheet for the project", "isCorrect": false },
          { "text": "A storyboard to visualize and plan the animation’s sequence and camera work before production", "isCorrect": true }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "What technique or effect is visible on the moving car in the image that helps convey a sense of fast motion?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748325071/856b592a-c604-45c0-9b05-0eedc23a888e_jftnkv.png",
        "options": [
          { "text": "Motion Blur", "isCorrect": true },
          { "text": "Depth of Field", "isCorrect": false },
          { "text": "Color Grading", "isCorrect": false },
          { "text": "Freeze Frame", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "What type of animation medium is depicted by the object in the image (given the presence of lighting, shading, and perspective on the object)?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748325074/87b2a84c-0507-40cd-8aef-19698913a988_xseenm.png",
        "options": [
          { "text": "2D vector animation", "isCorrect": false },
          { "text": "3D computer animation", "isCorrect": true },
          { "text": "Stop-motion animation", "isCorrect": false },
          { "text": "Traditional hand-drawn animation", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "In Adobe After Effects, what does the symbol shown (the target-like icon on the object) represent for that layer?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748325073/77667334-c884-4694-b17b-962f9c8565e9_smzqse.png",
        "options": [
          { "text": "The layer’s position in the composition", "isCorrect": false },
          { "text": "The midpoint of the entire timeline", "isCorrect": false },
          { "text": "The layer’s anchor point (the pivot around which it rotates/scales)", "isCorrect": true },
          { "text": "The center of the composition frame", "isCorrect": false }
        ],
        "difficulty": "medium"
      }
    ],
    isAvailable : true,
    category : 'Motion Designer'
  },
  {
    title : 'Level 3',
    questions : [
      {
        "questionType": "text",
        "text": "Which of the following software is NOT typically used for 3D modeling and animation?",
        "options": [
          { "text": "Adobe After Effects", "isCorrect": true },
          { "text": "Blender", "isCorrect": false },
          { "text": "Autodesk Maya", "isCorrect": false },
          { "text": "Maxon Cinema 4D", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What does “rigging” refer to in 3D animation?",
        "options": [
          { "text": "Setting up the lighting and cameras in a 3D scene", "isCorrect": false },
          { "text": "Creating a digital skeleton of bones and controls for a 3D model so it can be posed and animated", "isCorrect": true },
          { "text": "Combining multiple rendered layers into a final composite", "isCorrect": false },
          { "text": "Stabilizing shaky live-action footage in post-production", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "In 3D animation, what is Inverse Kinematics (IK)?",
        "options": [
          { "text": "A method to invert the colors of a 3D object’s texture", "isCorrect": false },
          { "text": "A special technique for moving the camera around a target object", "isCorrect": false },
          { "text": "An animation technique where moving the end part of a chain (for example, a character’s hand) causes the preceding bones (forearm, upper arm) to move accordingly", "isCorrect": true },
          { "text": "A way to make objects automatically turn transparent when they move beyond a certain distance", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What is a particle system in the context of animation/VFX?",
        "options": [
          { "text": "A feature for organizing and grouping layers in a project", "isCorrect": false },
          { "text": "A network of computers used for rendering frames", "isCorrect": false },
          { "text": "Using multiple cameras to capture an object from all angles simultaneously", "isCorrect": false },
          { "text": "A system that simulates numerous small objects (particles) such as sparks, smoke, or rain, often following physics properties", "isCorrect": true }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What is motion capture (mocap)?",
        "options": [
          { "text": "Recording real human (or creature) movements via sensors/cameras and applying that data to a digital character", "isCorrect": true },
          { "text": "Filming a sequence of motion graphics for a demo reel", "isCorrect": false },
          { "text": "Capturing motion blur on a camera sensor by using a slow shutter", "isCorrect": false },
          { "text": "A technique for recording your computer screen as you animate", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "In video production and VFX, “chroma keying” refers to:",
        "options": [
          { "text": "Adjusting the overall color balance of a video shot", "isCorrect": false },
          { "text": "Using a green or blue screen to film, and later removing that colored background to composite the subject onto a new background", "isCorrect": true },
          { "text": "Synchronizing video cuts to the key of background music", "isCorrect": false },
          { "text": "Changing the color of an object by painting over it frame-by-frame", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Which of these best describes compositing in the context of video and animation?",
        "options": [
          { "text": "Editing together a sequence of shots into a final video", "isCorrect": false },
          { "text": "Designing and modeling 3D characters for animation", "isCorrect": false },
          { "text": "Combining multiple visual elements from different sources (footage, graphics, 3D renders) into a single, cohesive image or scene", "isCorrect": true },
          { "text": "Recording sound effects and mixing audio for a film", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "When integrating 3D graphics into live-action footage, which technique ensures the 3D elements move in sync with the camera motion of the original footage?",
        "options": [
          { "text": "Color grading", "isCorrect": false },
          { "text": "Keyframe easing", "isCorrect": false },
          { "text": "Chroma keying", "isCorrect": false },
          { "text": "Camera tracking (Matchmoving)", "isCorrect": true }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What is a morph cut transition?",
        "options": [
          { "text": "A transition where one image/shape smoothly transforms into another, making it appear as if one scene morphs into the next", "isCorrect": true },
          { "text": "A cut hidden by a rapid camera pan or motion blur", "isCorrect": false },
          { "text": "A jump cut that occurs while a character is in a morph suit", "isCorrect": false },
          { "text": "An editing cut where the audio from the first scene continues under the next scene", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "A match cut in editing is:",
        "options": [
          { "text": "A cut made precisely on a strong musical beat for impact", "isCorrect": false },
          { "text": "A cut where two consecutive shots are linked by a similar compositional element or action, creating a smooth visual transition", "isCorrect": true },
          { "text": "A transition achieved by a flash of white or a lens flare", "isCorrect": false },
          { "text": "Cutting two scenes at exactly the same timecode or duration as each other", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Motion typography that involves text dynamically moving to express an idea is called:",
        "options": [
          { "text": "Motion capture text", "isCorrect": false },
          { "text": "Moving typeface", "isCorrect": false },
          { "text": "Kinetic typography", "isCorrect": true },
          { "text": "Animated calligraphy", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "When creating kinetic typography, an important consideration is:",
        "options": [
          { "text": "Using as many different fonts and styles as possible to catch attention", "isCorrect": false },
          { "text": "Ensuring the text remains legible and clear to read even while it’s moving", "isCorrect": true },
          { "text": "Avoiding synchronization of text movement with any audio or music", "isCorrect": false },
          { "text": "Using low contrast colors between text and background for a subtle effect", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Which 3D software is known for its “MoGraph” toolset, which is specifically useful for motion graphics (cloners, effectors, etc.)?",
        "options": [
          { "text": "Maxon Cinema 4D", "isCorrect": true },
          { "text": "Blender", "isCorrect": false },
          { "text": "Adobe Premiere Pro", "isCorrect": false },
          { "text": "Autodesk AutoCAD", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What is a key advantage of using Cinema 4D alongside After Effects in motion design?",
        "options": [
          { "text": "It automatically color-corrects all 3D content to match your footage", "isCorrect": false },
          { "text": "It integrates directly with After Effects (for example, via Cineware), allowing you to import 3D scenes and layers into After Effects compositions", "isCorrect": true },
          { "text": "It removes the need to create any keyframes in After Effects for animations", "isCorrect": false },
          { "text": "It is the only way to create 3D text or 3D objects for use in After Effects", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "In 3D animation, what does UV mapping accomplish?",
        "options": [
          { "text": "It sets up the lighting and shadows for a 3D scene based on sun position", "isCorrect": false },
          { "text": "It defines a path for the camera to move along in the scene", "isCorrect": false },
          { "text": "It unwraps a 3D model’s surface onto a 2D plane so that textures can be painted or applied accurately", "isCorrect": true },
          { "text": "It calculates physics collisions between objects, like a ball bouncing on a floor", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What is “rendering” in the context of 3D animation?",
        "options": [
          { "text": "Exporting the project file so others can open it in their software", "isCorrect": false },
          { "text": "Combining multiple layers of video in a compositing program", "isCorrect": false },
          { "text": "Recording motion capture data to be applied to a rig", "isCorrect": false },
          { "text": "Calculating the final image (or sequence of images) from a 3D scene, including lighting, shading, and effects, to produce the finished visuals", "isCorrect": true }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What does a render farm refer to?",
        "options": [
          { "text": "A single high-powered computer with multiple GPUs used for rendering", "isCorrect": false },
          { "text": "A network of computers that share the workload of rendering an animation, to significantly speed up the render process", "isCorrect": true },
          { "text": "A storage facility where rendered frames are kept", "isCorrect": false },
          { "text": "A method of planting render tasks that will “grow” over time", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "In 3D rendering, what is a render pass?",
        "options": [
          { "text": "The final compiled movie file after rendering", "isCorrect": false },
          { "text": "A camera movement that goes through a scene for each take", "isCorrect": false },
          { "text": "A separate layer of visual information (such as diffuse color, shadows, reflections, etc.) exported from a 3D scene to be combined later in compositing", "isCorrect": true },
          { "text": "Restarting a render from the beginning after a pause or error", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What is a style frame in motion design?",
        "options": [
          { "text": "The very first frame of an animation sequence, often used as a thumbnail", "isCorrect": false },
          { "text": "A preset filter that gives the video a particular look or “style”", "isCorrect": false },
          { "text": "A single, detailed image that shows the intended visual style and design of the project (used as a reference before animation)", "isCorrect": true },
          { "text": "The path of motion an object will take, drawn out frame by frame", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "In the pre-production of a motion design project, a moodboard is used to:",
        "options": [
          { "text": "Detail each character’s emotional state in each scene", "isCorrect": false },
          { "text": "Block out actor movements on a physical set", "isCorrect": false },
          { "text": "Automatically generate background music that fits the mood of the animation", "isCorrect": false },
          { "text": "Compile visual inspiration (images, color palettes, reference art) to define the intended aesthetic and tone of the project", "isCorrect": true }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Maintaining design consistency in a motion graphics project means:",
        "options": [
          { "text": "Keeping visual elements (like colors, fonts, and graphic styles) uniform and on-brand throughout the video", "isCorrect": true },
          { "text": "Reusing the exact same animation sequence in every scene for continuity", "isCorrect": false },
          { "text": "Never changing the camera angle or perspective once established", "isCorrect": false },
          { "text": "Using only one type of motion (e.g., only fades or only slides) for all transitions", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Which approach can help create complex, seamless transitions between scenes in motion design?",
        "options": [
          { "text": "Always fading through black between each scene to reset the visual", "isCorrect": false },
          { "text": "Designing transitions so that an element or motion from the end of one scene is carried into the beginning of the next scene, tying them together", "isCorrect": true },
          { "text": "Using completely different art styles between scenes for contrast", "isCorrect": false },
          { "text": "Inserting random unrelated frames between scenes to surprise the viewer", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What is frame blending in video/animation?",
        "options": [
          { "text": "Playing two video sources side by side in one frame as a transition", "isCorrect": false },
          { "text": "Averaging the colors of each frame with the next to reduce flicker", "isCorrect": false },
          { "text": "A technique of generating intermediate frames by blending the surrounding frames (often used when slowing footage, creating a slight ghosting to make motion look smoother)", "isCorrect": true },
          { "text": "A method of anti-aliasing text in animations to prevent flicker", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "In After Effects, expressions are used for:",
        "options": [
          { "text": "Adjusting a character’s facial expressions with automated morphs", "isCorrect": false },
          { "text": "Exporting individual frames as still images", "isCorrect": false },
          { "text": "Synchronizing animations precisely to an audio waveform", "isCorrect": false },
          { "text": "Writing snippets of code (in JavaScript) to dynamically control layer properties or create automatic animations", "isCorrect": true }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What is GPU rendering and why is it beneficial?",
        "options": [
          { "text": "Rendering using lower quality settings to speed up exports (Good Partial Utilization)", "isCorrect": false },
          { "text": "Using the graphics processing unit (GPU) to render images, which can greatly speed up rendering for certain tasks compared to using the CPU", "isCorrect": true },
          { "text": "A way to offload rendering tasks to mobile devices", "isCorrect": false },
          { "text": "A one-click plugin that optimizes and renders your project automatically", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What is rotoscoping in the context of VFX and animation?",
        "options": [
          { "text": "A style of 2D vector animation used for explainer videos", "isCorrect": false },
          { "text": "Manually tracing over footage frame-by-frame to isolate an element or create a matte (often to remove a background or create a silhouette of an object)", "isCorrect": true },
          { "text": "A method of rotating a 3D object around multiple axes in a single motion", "isCorrect": false },
          { "text": "Using a rotating rig of cameras to capture an object from all angles simultaneously", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "In cinematography/3D graphics, Depth of Field refers to:",
        "options": [
          { "text": "The maximum distance an object can travel in the scene along the Z-axis", "isCorrect": false },
          { "text": "The total number of layers or levels of depth present in a composite", "isCorrect": false },
          { "text": "The range of distance within a shot that appears acceptably sharp and in focus (controlled by the camera’s aperture and lens settings)", "isCorrect": true },
          { "text": "A special render pass that outputs the distance of objects from the camera", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What is a LUT (Look-Up Table) used for in post-production?",
        "options": [
          { "text": "A tool to match audio loudness levels between different clips", "isCorrect": false },
          { "text": "A technique for generating 3D texture maps from photographs", "isCorrect": false },
          { "text": "A feature for quickly locating and jumping to timeline markers by color", "isCorrect": false },
          { "text": "A preset file that applies a specific color grade or “look” to footage, transforming the colors based on a defined table of values", "isCorrect": true }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What does HDR stand for, and why is it relevant in motion graphics or VFX?",
        "options": [
          { "text": "High Definition Rendering – it refers to rendering at 4K or higher resolutions for clarity", "isCorrect": false },
          { "text": "Heavy Data Rate – it indicates very large file sizes for high quality video", "isCorrect": false },
          { "text": "Horizontal Dual Recording – it’s a technique for capturing two simultaneous video streams for VR", "isCorrect": false },
          { "text": "High Dynamic Range – it allows for a greater range of color and brightness in imagery, preserving detail in very dark and very bright areas for more realistic visuals", "isCorrect": true }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "One key difference between layer-based compositing (e.g. in After Effects) and node-based compositing (e.g. in Nuke) is:",
        "options": [
          { "text": "They are essentially the same, just presented with different interface layouts", "isCorrect": false },
          { "text": "Layer-based compositing stacks elements in a sequence/timeline, whereas node-based compositing uses a flowchart of connected nodes to combine elements, allowing more complex branching and reusing of elements", "isCorrect": true },
          { "text": "Node-based compositing is only used for audio, while layer-based is used for video", "isCorrect": false },
          { "text": "Layer-based compositing cannot handle high-resolution footage, whereas node-based can", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Many advanced animation workflows involve physics simulations. Which of the following is an example of a physics simulation in animation?",
        "options": [
          { "text": "Manually keyframing a character’s jump to follow a perfect arc", "isCorrect": false },
          { "text": "Doubling the frame rate of an animation to make it smoother", "isCorrect": false },
          { "text": "Using a rigid body simulation so objects collide and bounce off each other realistically (obeying gravity and forces)", "isCorrect": true },
          { "text": "Applying the same color effect uniformly across all frames for consistency", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "When discussing video encoding, what does bitrate refer to?",
        "options": [
          { "text": "The color depth (bits per channel) used in the video", "isCorrect": false },
          { "text": "The speed at which the video plays (frames per second)", "isCorrect": false },
          { "text": "The number of audio channels in the video file", "isCorrect": false },
          { "text": "The amount of data processed per second of video (affecting both quality and file size)", "isCorrect": true }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What does color grading involve in post-production?",
        "options": [
          { "text": "Ranking scenes or shots by their quality or importance", "isCorrect": false },
          { "text": "Sorting video clips in the project by their predominant color", "isCorrect": false },
          { "text": "Adjusting the colors and contrast of footage to achieve a desired mood or to ensure consistency across multiple shots", "isCorrect": true },
          { "text": "Adding colorful graphical overlays to the video", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "In filmmaking and animation, the 180-degree rule is a guideline that helps maintain:",
        "options": [
          { "text": "Continuous camera movement in a 180-degree arc around a subject for dynamic shots", "isCorrect": false },
          { "text": "Consistent screen direction by keeping the camera on one side of an imaginary line between two characters, so each character stays on the same side of the frame", "isCorrect": true },
          { "text": "A camera tilt limit of 180 degrees to avoid upside-down shots", "isCorrect": false },
          { "text": "That an animated object never rotates more than 180 degrees in either direction in a single shot", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "In After Effects, what does enabling Time Remapping on a layer allow you to do?",
        "options": [
          { "text": "Animate the layer along a drawn motion path automatically", "isCorrect": false },
          { "text": "Instantly reverse a layer’s playback with one click", "isCorrect": false },
          { "text": "Keyframe the playback time of the layer, so you can speed up, slow down, or freeze the video at specific moments", "isCorrect": true },
          { "text": "Edit that layer in an external video editing application and update it in real-time", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "What is the purpose of the marked patterns visible on the wall in the image (commonly used during filming for VFX work)?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748325551/93af9a47-37ed-48d8-b6d8-d7831b12f683_psun9w.png",
        "options": [
          { "text": "To measure the scene’s lighting and brightness levels", "isCorrect": false },
          { "text": "To give the camera a point to focus on for sharpness", "isCorrect": false },
          { "text": "To allow the camera movement to be tracked in post-production so CGI elements can be added (the markers serve as reference points for motion tracking)", "isCorrect": true },
          { "text": "To decorate the set background with interesting symbols", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "Which post-production technique does using the solid green background (as shown in the image) enable?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748325551/7b6062f5-a3cc-48ae-a2bb-338a8d0b84ec_emhfhz.png",
        "options": [
          { "text": "Motion capture of the actor’s movements", "isCorrect": false },
          { "text": "Advanced color grading of the scene", "isCorrect": false },
          { "text": "Rotoscoping the actor out by hand later", "isCorrect": false },
          { "text": "Chroma key compositing – the green can be keyed out to insert a different background behind the subject", "isCorrect": true }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "Which technique is being demonstrated by the performer in the special suit with markers, as shown in the image?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748325551/8de30b88-c1e9-42d0-a6d7-34dffe409f3a_ckjvxl.png",
        "options": [
          { "text": "Motion Capture", "isCorrect": true },
          { "text": "Chroma Keying", "isCorrect": false },
          { "text": "Rotoscoping", "isCorrect": false },
          { "text": "Facial Tracking", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "Which software interface is shown in the image, widely used for 3D modeling and animation?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748325554/15176d56-6635-4169-9809-37cbc3e2b56a_yqebvi.png",
        "options": [
          { "text": "Adobe After Effects", "isCorrect": false },
          { "text": "Blender", "isCorrect": true },
          { "text": "Maxon Cinema 4D", "isCorrect": false },
          { "text": "Unreal Engine", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "What type of animation is depicted in the image, which focuses on animated text to convey a message dynamically?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748325555/d51ac8f7-2f06-4e78-bdbe-57214bb06bff_ezon5k.png",
        "options": [
          { "text": "Motion Tracking", "isCorrect": false },
          { "text": "Rolling Credits", "isCorrect": false },
          { "text": "Kinetic Typography", "isCorrect": true },
          { "text": "Stop-Motion Title Cards", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "What do we call a single detailed image like the one shown, which defines the intended visual style of a motion design project before the animation is produced?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748325554/197b9049-f6eb-482f-98fe-ae9eb93d4b7a_nti3xs.png",
        "options": [
          { "text": "Keyframe", "isCorrect": false },
          { "text": "Moodboard", "isCorrect": false },
          { "text": "Final Render", "isCorrect": false },
          { "text": "Style Frame", "isCorrect": true }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "In pre-production, what is the collection of images and colors shown in the image used for?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748325556/0e0d7bab-889e-4fe7-8b80-d98f6ea8690b_hmqtuv.png",
        "options": [
          { "text": "A storyboard to plan out scene-by-scene actions", "isCorrect": true },
          { "text": "A reference for audio mood and soundtrack choices", "isCorrect": false },
          { "text": "A color grading chart for matching camera footage", "isCorrect": false },
          { "text": "A moodboard to establish the visual inspiration and style direction for the project", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "What 3D animation process is illustrated by the skeleton (bones and joints) visible on the character model in the image?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748325553/4df566de-cdb6-4328-a35e-8ad72c5567ee_qgcb1e.png",
        "options": [
          { "text": "Modeling", "isCorrect": false },
          { "text": "Rigging", "isCorrect": true },
          { "text": "Texturing", "isCorrect": false },
          { "text": "Motion Tracking", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "Which animation technique is being demonstrated by the effect in the image, commonly used to create phenomena like sparks, rain, or smoke?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748325552/f435fb3d-3f54-40f3-9fa6-0244a0b035f4_lgzyco.png",
        "options": [
          { "text": "Keyframe Animation", "isCorrect": false },
          { "text": "Motion Blur Effect", "isCorrect": false },
          { "text": "Particle System Simulation", "isCorrect": true },
          { "text": "Time-Lapse Photography", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "What process allowed the 3D object (the UFO) to be believably inserted into the real scene as shown in the image?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748325556/990a046b-ea3b-4e4f-89cf-3dabefdfe65b_tqizlc.png",
        "options": [
          { "text": "3D Modeling", "isCorrect": false },
          { "text": "Rendering", "isCorrect": false },
          { "text": "Storyboarding", "isCorrect": false },
          { "text": "Compositing (integrating CG elements into live footage)", "isCorrect": true }
        ],
        "difficulty": "hard"
      }
    ],
    isAvailable : true,
    category : 'Motion Designer'
  },
]

const newProductDesTemplates = [
  {
    title : 'Level 1',
    questions : [
      {
        "questionType": "text",
        "text": "In product design, what do UI and UX stand for?",
        "options": [
          { "text": "Unified Interaction; User Experiment", "isCorrect": false },
          { "text": "User Interface; User Experience", "isCorrect": true },
          { "text": "User Interaction; User Execution", "isCorrect": false },
          { "text": "Unique Interface; User Experiment", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What is the primary focus of UX design compared to UI design?",
        "options": [
          { "text": "UX focuses on visuals; UI focuses on usability", "isCorrect": false },
          { "text": "UX focuses on coding; UI focuses on testing", "isCorrect": false },
          { "text": "UX focuses on user journey and usability; UI focuses on screen layout and visual elements", "isCorrect": true },
          { "text": "UX focuses on marketing; UI focuses on content writing", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "In design, what is a wireframe?",
        "options": [
          { "text": "A fully coded prototype of the final product", "isCorrect": false },
          { "text": "A low-fidelity layout sketch of an interface", "isCorrect": true },
          { "text": "A step-by-step user instruction guide", "isCorrect": false },
          { "text": "A marketing presentation deck", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What is a prototype in the design process?",
        "options": [
          { "text": "The final product released to users", "isCorrect": false },
          { "text": "A rough model or simulation of the product for testing", "isCorrect": true },
          { "text": "A documentation of user requirements", "isCorrect": false },
          { "text": "A brand style guide", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What does the design principle of consistency refer to?",
        "options": [
          { "text": "Using bright colors throughout the design", "isCorrect": false },
          { "text": "Keeping UI elements uniform so they look and behave the same", "isCorrect": true },
          { "text": "Changing layout on every page for variety", "isCorrect": false },
          { "text": "Rotating through different fonts and styles", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What does alignment mean in UI design?",
        "options": [
          { "text": "Centering all text on the screen", "isCorrect": false },
          { "text": "Randomly placing buttons", "isCorrect": false },
          { "text": "Lining up elements along a common edge or baseline", "isCorrect": true },
          { "text": "Using different colors for each element", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Why is contrast important in UI/UX design?",
        "options": [
          { "text": "It improves usability by making text and elements stand out", "isCorrect": true },
          { "text": "It makes the interface look monochrome", "isCorrect": false },
          { "text": "It hides unimportant details", "isCorrect": false },
          { "text": "It always looks visually pleasing", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "According to accessibility guidelines, what is the minimum recommended contrast ratio for normal text?",
        "options": [
          { "text": "1.0:1", "isCorrect": false },
          { "text": "3:1", "isCorrect": false },
          { "text": "4.5:1", "isCorrect": true },
          { "text": "10:1", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "In design terminology, what is white space (negative space)?",
        "options": [
          { "text": "The white areas of the color palette", "isCorrect": false },
          { "text": "Empty area between and around UI elements", "isCorrect": true },
          { "text": "The amount of blank pages in a document", "isCorrect": false },
          { "text": "Space reserved for advertisements", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which design tool is browser-based and supports real-time collaborative interface design?",
        "options": [
          { "text": "Photoshop", "isCorrect": false },
          { "text": "Figma", "isCorrect": true },
          { "text": "Sketch", "isCorrect": false },
          { "text": "InVision Studio", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which UI design tool is exclusively available on macOS?",
        "options": [
          { "text": "Figma", "isCorrect": false },
          { "text": "Adobe XD", "isCorrect": false },
          { "text": "Sketch", "isCorrect": true },
          { "text": "Affinity Designer", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What is user-centered design (UCD)?",
        "options": [
          { "text": "Designing mainly for the client’s preferences", "isCorrect": false },
          { "text": "An approach focusing on users’ needs at each phase", "isCorrect": true },
          { "text": "A design method using only user reviews for feedback", "isCorrect": false },
          { "text": "A process that skips user testing", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which of the following practices improves web accessibility?",
        "options": [
          { "text": "Using placeholder text instead of labels", "isCorrect": false },
          { "text": "Ensuring form fields have visible, descriptive labels", "isCorrect": true },
          { "text": "Relying on color alone to indicate required fields", "isCorrect": false },
          { "text": "Disabling keyboard navigation", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which color combination should generally be avoided to accommodate users with color blindness?",
        "options": [
          { "text": "Blue text on yellow", "isCorrect": false },
          { "text": "Red text on green", "isCorrect": true },
          { "text": "Black text on white", "isCorrect": false },
          { "text": "Purple text on orange", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which UI component allows the user to select only one option from a small list?",
        "options": [
          { "text": "Checkbox", "isCorrect": false },
          { "text": "Radio button", "isCorrect": true },
          { "text": "Dropdown list", "isCorrect": false },
          { "text": "Text input field", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which UI component allows the user to select multiple options from a list?",
        "options": [
          { "text": "Radio button", "isCorrect": false },
          { "text": "Checkbox", "isCorrect": true },
          { "text": "Slider", "isCorrect": false },
          { "text": "Button", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which UI element should be used to trigger an action (e.g. submitting a form)?",
        "options": [
          { "text": "Text input field", "isCorrect": false },
          { "text": "Button", "isCorrect": true },
          { "text": "Image placeholder", "isCorrect": false },
          { "text": "Label", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which of the following is a typical UX deliverable?",
        "options": [
          { "text": "A fully-coded web page", "isCorrect": false },
          { "text": "A set of user flows or site map", "isCorrect": true },
          { "text": "A brand logo design", "isCorrect": false },
          { "text": "A marketing email", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What is the main benefit of creating wireframes early in the design process?",
        "options": [
          { "text": "It finalizes all design details quickly", "isCorrect": false },
          { "text": "It speeds up coding automatically", "isCorrect": false },
          { "text": "It lets stakeholders see content layout without visual design", "isCorrect": true },
          { "text": "It replaces the need for user testing", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which statement is true about prototypes?",
        "options": [
          { "text": "They must be coded in HTML to be useful", "isCorrect": false },
          { "text": "They can be sketches or clickable models used to validate ideas", "isCorrect": true },
          { "text": "They are released to end-users without testing", "isCorrect": false },
          { "text": "They are only created after coding the product", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Why is consistency important in UI design?",
        "options": [
          { "text": "It restricts designers’ creativity", "isCorrect": false },
          { "text": "It creates familiarity and reliability for users", "isCorrect": true },
          { "text": "It forces the use of identical fonts everywhere", "isCorrect": false },
          { "text": "It makes pages load faster", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "How does proper alignment help a user interface?",
        "options": [
          { "text": "It automatically adjusts to screen orientation", "isCorrect": false },
          { "text": "It arranges elements in an orderly way, improving clarity", "isCorrect": true },
          { "text": "It aligns text to be bold", "isCorrect": false },
          { "text": "It distributes colors evenly", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which of the following tools uses vector graphics and supports live collaboration on UI designs?",
        "options": [
          { "text": "Microsoft PowerPoint", "isCorrect": false },
          { "text": "Figma", "isCorrect": true },
          { "text": "Adobe Flash", "isCorrect": false },
          { "text": "CorelDRAW", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which is NOT typically a UX designer’s responsibility?",
        "options": [
          { "text": "Conducting user interviews", "isCorrect": false },
          { "text": "Analyzing user behavior", "isCorrect": false },
          { "text": "Developing backend APIs", "isCorrect": true },
          { "text": "Creating user flows", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "How does effective use of white space impact a design?",
        "options": [
          { "text": "It’s wasted space that should be filled with content", "isCorrect": false },
          { "text": "It balances layout and prevents clutter, making content easier to focus on", "isCorrect": true },
          { "text": "It increases page load times", "isCorrect": false },
          { "text": "It forces all content to one side of the page", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which of the following is an accessibility best practice?",
        "options": [
          { "text": "Only using color differences to indicate errors", "isCorrect": false },
          { "text": "Making text large and ensuring high contrast", "isCorrect": true },
          { "text": "Removing all labels from forms", "isCorrect": false },
          { "text": "Disabling zoom on the page", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Why use a high-contrast color for a call-to-action (CTA) button?",
        "options": [
          { "text": "To make it blend into the background", "isCorrect": false },
          { "text": "To ensure the button stands out and grabs attention", "isCorrect": true },
          { "text": "To save ink in printing", "isCorrect": false },
          { "text": "To meet color scheme requirements", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "If a UI has many elements but everything seems to blend together, which principle is likely insufficient?",
        "options": [
          { "text": "Consistency", "isCorrect": false },
          { "text": "Alignment", "isCorrect": false },
          { "text": "Contrast", "isCorrect": true },
          { "text": "White space", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which tool is used for interactive app and web UI prototyping and is part of Adobe Creative Cloud?",
        "options": [
          { "text": "Adobe XD", "isCorrect": true },
          { "text": "Photoshop", "isCorrect": false },
          { "text": "Illustrator", "isCorrect": false },
          { "text": "InDesign", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which is NOT a navigational UI control?",
        "options": [
          { "text": "Hamburger menu icon", "isCorrect": false },
          { "text": "Tab bar", "isCorrect": false },
          { "text": "Slider control", "isCorrect": true },
          { "text": "Breadcrumb links", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What is the purpose of using a grid layout in UI design?",
        "options": [
          { "text": "To create aligned rows and columns for orderly layout", "isCorrect": true },
          { "text": "To make everything center-aligned by default", "isCorrect": false },
          { "text": "To automatically generate images", "isCorrect": false },
          { "text": "To sort data in a table", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "How can you ensure text is readable when overlaid on an image?",
        "options": [
          { "text": "Use the same color for text as the image", "isCorrect": false },
          { "text": "Place text without checking contrast", "isCorrect": false },
          { "text": "Add a contrasting background or outline behind the text", "isCorrect": true },
          { "text": "Make the text very small", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which task is primarily the responsibility of a UX designer, not a UI designer?",
        "options": [
          { "text": "Choosing button colors", "isCorrect": false },
          { "text": "Conducting user testing to refine user flows", "isCorrect": true },
          { "text": "Designing icon graphics", "isCorrect": false },
          { "text": "Setting font styles", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "A UI component that allows free-form text entry by the user is called:",
        "options": [
          { "text": "Checkbox", "isCorrect": false },
          { "text": "Radio button", "isCorrect": false },
          { "text": "Text field", "isCorrect": true },
          { "text": "Dropdown menu", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which practice improves form usability?",
        "options": [
          { "text": "Grouping related fields with clear headings", "isCorrect": true },
          { "text": "Removing labels to save space", "isCorrect": false },
          { "text": "Using only color to mark errors", "isCorrect": false },
          { "text": "Hiding instructions", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "The image above shows early-stage design sketches of a website layout. What is this step called in UI/UX design?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748328046/709a8cc6-dec1-4062-b95f-58d24c8b5957_gff4xm.png",
        "options": [
          { "text": "Prototype", "isCorrect": false },
          { "text": "Wireframe", "isCorrect": true },
          { "text": "Final design", "isCorrect": false },
          { "text": "User research report", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "Which design principle is illustrated by the difference between these icon sets?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748328042/b4d49f25-a39b-46b2-b9af-a6f9786b3674_spxeyv.png",
        "options": [
          { "text": "Alignment", "isCorrect": false },
          { "text": "Hierarchy", "isCorrect": false },
          { "text": "Consistency", "isCorrect": true },
          { "text": "Contrast", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "Which design principle is being demonstrated here?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748328043/fba6e50f-9d3c-4dc1-b99e-a4be6329fef0_hrmhpq.png",
        "options": [
          { "text": "Contrast", "isCorrect": false },
          { "text": "Consistency", "isCorrect": false },
          { "text": "Proximity", "isCorrect": false },
          { "text": "Alignment", "isCorrect": true }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "Which screen demonstrates better use of color contrast for readability?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748328044/91ed3f06-7dae-4ba3-9be5-f15b0aaaec61_vmjjnh.png",
        "options": [
          { "text": "Left (light grey text)", "isCorrect": false },
          { "text": "Right (high purple/white contrast)", "isCorrect": true },
          { "text": "Both are equally readable", "isCorrect": false },
          { "text": "Neither has readable text", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "Which form design provides a better user experience?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748328043/ae4de796-69db-4e4b-b6cf-eb2bc5cab702_nef6jf.png",
        "options": [
          { "text": "Left (generic error)", "isCorrect": false },
          { "text": "Right (clear, descriptive error)", "isCorrect": true },
          { "text": "Neither; both are equally poor", "isCorrect": false },
          { "text": "Both are equally good", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "Which design is better for mobile touch interactions?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748328045/9b2d57ee-0643-4144-a8c2-9380de9a6aee_mid2ur.png",
        "options": [
          { "text": "Left (small buttons)", "isCorrect": false },
          { "text": "Right (large, spaced buttons)", "isCorrect": true },
          { "text": "Both are fine", "isCorrect": false },
          { "text": "Neither; buttons should be text-only", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "What is the typical function of this icon in mobile UI?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748328041/e82b4884-f6f1-4258-9604-67f037e0ab37_eubaf8.png",
        "options": [
          { "text": "Refresh the content", "isCorrect": false },
          { "text": "Open the main navigation menu", "isCorrect": true },
          { "text": "Enable search", "isCorrect": false },
          { "text": "Close the app", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "What is this UI element called?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748328041/ab2d6be6-14e0-4780-bdbc-3af34fe23e88_mibr4m.png",
        "options": [
          { "text": "Footer", "isCorrect": false },
          { "text": "Sidebar", "isCorrect": false },
          { "text": "Top navigation bar", "isCorrect": true },
          { "text": "Modal window", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "What usability issue does this interface likely have?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748328049/2ec6533c-885e-408a-90f0-88d206cab180_cwyvun.png",
        "options": [
          { "text": "The login button is too colorful", "isCorrect": false },
          { "text": "The form has no input fields", "isCorrect": false },
          { "text": "The “Login” button appears disabled and cannot be clicked", "isCorrect": true },
          { "text": "The placeholder text is too large", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "Which UI component is shown for text input in this form?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748328047/7b53d69f-60cc-4d50-b7b0-a2ab3880f0c3_vup19e.png",
        "options": [
          { "text": "Checkbox", "isCorrect": false },
          { "text": "Radio button", "isCorrect": false },
          { "text": "Text field", "isCorrect": true },
          { "text": "Dropdown", "isCorrect": false }
        ],
        "difficulty": "easy"
      }
    ],
    isAvailable : true,
    category : 'Product Designer'
  },
  {
    title : 'Level 2',
    questions : [
      {
        "questionType": "text",
        "text": "When designing a user flow, why should a flow focus on only one goal at a time?",
        "options": [
          { "text": "It allows multiple objectives to be handled together.", "isCorrect": false },
          { "text": "It keeps the process simple and clear, letting users achieve one objective before another.", "isCorrect": true },
          { "text": "It enables the use of more colors in the flow.", "isCorrect": false },
          { "text": "It ensures the flow covers all user tasks in one diagram.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Why is it important to use clear labels in user flow diagrams?",
        "options": [
          { "text": "To make the diagram look more colorful.", "isCorrect": false },
          { "text": "To avoid ambiguity so all users understand each step.", "isCorrect": true },
          { "text": "To reduce the number of icons needed.", "isCorrect": false },
          { "text": "To hide unnecessary details from stakeholders.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What is the purpose of including a legend (key) in a user flow diagram?",
        "options": [
          { "text": "To show a table of contents for the website.", "isCorrect": false },
          { "text": "To ensure users understand what each symbol or shape means.", "isCorrect": true },
          { "text": "To provide step-by-step instructions.", "isCorrect": false },
          { "text": "To list all error messages in the flow.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "In a user flow, what defines the “entry point” and “final interaction”?",
        "options": [
          { "text": "Entry is any button click; final is closing the browser.", "isCorrect": false },
          { "text": "Entry is when a user opens the homepage; final is when they reach a specified end goal (e.g. order confirmation).", "isCorrect": true },
          { "text": "Entry and final points can be anywhere in the product without relation.", "isCorrect": false },
          { "text": "Entry is sign-in; final is error page.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "How can web analytics tools (like Google Analytics) improve user flows?",
        "options": [
          { "text": "They automatically redesign the flow for you.", "isCorrect": false },
          { "text": "They identify where users enter the site and help plan flows from those real entry points.", "isCorrect": true },
          { "text": "They replace the need for user feedback.", "isCorrect": false },
          { "text": "They remove confusing elements from the interface.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What is a recommended way to refine a user flow?",
        "options": [
          { "text": "Assume it’s correct if it “looks good.”", "isCorrect": false },
          { "text": "Gather user feedback by involving a UX researcher to test and improve the flow.", "isCorrect": true },
          { "text": "Only rely on development team’s opinions.", "isCorrect": false },
          { "text": "Add as many steps as possible to cover all cases.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Why should you regularly test a user flow?",
        "options": [
          { "text": "To justify longer development timelines.", "isCorrect": false },
          { "text": "To ensure it remains user-friendly and catches any issues early.", "isCorrect": true },
          { "text": "To replace the need for a design review.", "isCorrect": false },
          { "text": "To train new users on the product.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Which practice is recommended for form design within a user flow?",
        "options": [
          { "text": "Use as many fields as possible for detailed data.", "isCorrect": false },
          { "text": "Ensure forms are as short as possible, removing unnecessary steps.", "isCorrect": true },
          { "text": "Require users to enter all information at once.", "isCorrect": false },
          { "text": "Randomize field order each time for security.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What type of guidance should a user flow include for each step?",
        "options": [
          { "text": "Vague hints, leaving users to guess.", "isCorrect": false },
          { "text": "Clear, concise instructions so users complete tasks without confusion.", "isCorrect": true },
          { "text": "Technical jargon only developers understand.", "isCorrect": false },
          { "text": "Decorative images instead of text.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "In user flows and screens, why should content be kept short and concise?",
        "options": [
          { "text": "Because users prefer minimal reading and too much content can overwhelm them.", "isCorrect": true },
          { "text": "To reduce server load.", "isCorrect": false },
          { "text": "To look modern.", "isCorrect": false },
          { "text": "To trick users into doing tasks faster.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Which microcopy style is least recommended in UX writing?",
        "options": [
          { "text": "Using conversational, everyday language.", "isCorrect": false },
          { "text": "Speaking directly to the user (using “you”).", "isCorrect": false },
          { "text": "Using technical jargon and third-person statements (e.g. “The user has not logged in”).", "isCorrect": true },
          { "text": "Short, friendly sentences.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What is a best practice for writing error messages according to usability guidelines?",
        "options": [
          { "text": "Include technical error codes without explanation.", "isCorrect": false },
          { "text": "Use plain, human-readable language and avoid jargon.", "isCorrect": true },
          { "text": "Blame the user for mistakes.", "isCorrect": false },
          { "text": "Keep the messages vague to avoid specifics.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Which tone should an error message take?",
        "options": [
          { "text": "Judgmental or blaming (e.g. “Invalid input.”).", "isCorrect": false },
          { "text": "Positive and non-judgmental, offering constructive solutions.", "isCorrect": true },
          { "text": "Sarcastic or humorous.", "isCorrect": false },
          { "text": "Completely silent (no message).", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "When an error occurs (e.g. “Out of stock”), what should a good error message do?",
        "options": [
          { "text": "Simply state “Error”.", "isCorrect": false },
          { "text": "Offer constructive advice or alternatives (e.g. “notify me” or suggest related items).", "isCorrect": true },
          { "text": "Tell the user to try again later with no detail.", "isCorrect": false },
          { "text": "Redirect the user without explanation.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "In the WCAG accessibility guidelines, what does “POUR” stand for?",
        "options": [
          { "text": "Perform, Operate, Understand, Release.", "isCorrect": false },
          { "text": "Perceivable, Operable, Understandable, Robust.", "isCorrect": true },
          { "text": "Perceptive, Observable, Usable, Responsive.", "isCorrect": false },
          { "text": "None of the above.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Which of the following is an example of ensuring content is Perceivable under WCAG?",
        "options": [
          { "text": "Designing all buttons in one size.", "isCorrect": false },
          { "text": "Providing text alternatives (alt text) for non-text content (like images).", "isCorrect": true },
          { "text": "Using an invisible CAPTCHA.", "isCorrect": false },
          { "text": "Hiding content until user actions.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Which practice makes a UI more Operable according to WCAG?",
        "options": [
          { "text": "Ensuring all functionality is available via keyboard (e.g. tab navigation).", "isCorrect": true },
          { "text": "Using tiny touch targets.", "isCorrect": false },
          { "text": "Designing only for mouse users.", "isCorrect": false },
          { "text": "Forcing fast timed interactions with no pause.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Which guideline improves Understandability of content?",
        "options": [
          { "text": "Using complex jargon without explanation.", "isCorrect": false },
          { "text": "Providing clear labels and instructions on forms so users know what to do.", "isCorrect": true },
          { "text": "Creating random navigation paths.", "isCorrect": false },
          { "text": "Displaying long paragraphs of text.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What does “Robust” mean in WCAG?",
        "options": [
          { "text": "The site uses heavy animations.", "isCorrect": false },
          { "text": "Content is coded so current and future technologies (including assistive tech) can reliably interpret it.", "isCorrect": true },
          { "text": "The website never changes once built.", "isCorrect": false },
          { "text": "Pages load in under 2 seconds.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What is the minimum color contrast ratio required for normal text under WCAG 2.1 Level AA?",
        "options": [
          { "text": "3:1", "isCorrect": false },
          { "text": "4.5:1", "isCorrect": true },
          { "text": "7:1", "isCorrect": false },
          { "text": "10:1", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "For large-scale text (18pt+ or bold 14pt+), what is the WCAG AA contrast requirement?",
        "options": [
          { "text": "2:1", "isCorrect": false },
          { "text": "3:1", "isCorrect": true },
          { "text": "5:1", "isCorrect": false },
          { "text": "7:1", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Which component would you expect to find in a design system’s component library?",
        "options": [
          { "text": "Logo vector file only.", "isCorrect": false },
          { "text": "Reusable UI elements like buttons, form fields, and navigation menus.", "isCorrect": true },
          { "text": "The company’s financial reports.", "isCorrect": false },
          { "text": "Raw photos from marketing.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What does a style guide in a design system typically include?",
        "options": [
          { "text": "Corporate mission statement.", "isCorrect": false },
          { "text": "Visual branding rules (colors, typography, logos) and content tone guidelines.", "isCorrect": true },
          { "text": "User email addresses.", "isCorrect": false },
          { "text": "Legacy code snippets.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "In UI design, what is an example of an affordance?",
        "options": [
          { "text": "A change in cursor when hovering over text.", "isCorrect": false },
          { "text": "A button’s shape and placement that suggest it can be pressed (e.g. a raised button affords pressing).", "isCorrect": true },
          { "text": "A legend explaining icons.", "isCorrect": false },
          { "text": "White space around elements.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What is a signifier in a user interface?",
        "options": [
          { "text": "A hidden function.", "isCorrect": false },
          { "text": "A visual cue (like an icon or highlight) that indicates affordances (e.g. an underline under text indicating it’s a link).", "isCorrect": true },
          { "text": "A background image.", "isCorrect": false },
          { "text": "Page load speed.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Which of the following is an example of feedback in an interactive UI?",
        "options": [
          { "text": "The default color of a button.", "isCorrect": false },
          { "text": "A button briefly changing shade or showing a spinner after being clicked (indicating the system is processing).", "isCorrect": true },
          { "text": "An irrelevant image on the page.", "isCorrect": false },
          { "text": "Page content loading instantly with no indicator.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Which practice aligns with Nielsen’s “visibility of system status” heuristic?",
        "options": [
          { "text": "Do nothing after a button press.", "isCorrect": false },
          { "text": "Provide immediate visual or textual feedback after each user action so users know the system is processing.", "isCorrect": true },
          { "text": "Display all content at once to avoid scrolling.", "isCorrect": false },
          { "text": "Use confusing jargon to describe system states.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "According to Nielsen’s heuristics, what is the best approach to error handling?",
        "options": [
          { "text": "Only show errors after submission.", "isCorrect": false },
          { "text": "Prevent errors from happening (e.g. disable invalid options, provide confirmations) rather than just telling users afterwards.", "isCorrect": true },
          { "text": "Display cryptic error codes to encourage developer fixes.", "isCorrect": false },
          { "text": "Let users start over each time.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What does the “recognition rather than recall” heuristic recommend?",
        "options": [
          { "text": "Require users to memorize information from previous screens.", "isCorrect": false },
          { "text": "Keep necessary options and information visible so users don’t have to remember details between interactions.", "isCorrect": true },
          { "text": "Hide all menus under an advanced settings tab.", "isCorrect": false },
          { "text": "Use very small fonts.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What issue is shown by a cluttered interface with too much information competing for attention?",
        "options": [
          { "text": "Good use of space.", "isCorrect": false },
          { "text": "Violation of “Aesthetic and minimalist design” – irrelevant information distracts from important content.", "isCorrect": true },
          { "text": "Proper content prioritization.", "isCorrect": false },
          { "text": "Enhanced user engagement.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What is the main purpose of an A/B test in UX research?",
        "options": [
          { "text": "To run the same design with two different URLs.", "isCorrect": false },
          { "text": "To compare two or more design variations live with users and measure which one performs better on a chosen metric.", "isCorrect": true },
          { "text": "To test the server load capacity.", "isCorrect": false },
          { "text": "To conduct one-on-one interviews.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Why is it important to start an A/B test with a strong hypothesis?",
        "options": [
          { "text": "It makes results automatically significant.", "isCorrect": false },
          { "text": "Without a hypothesis, most tests fail to find meaningful improvements. Tests with data-driven hypotheses have higher success rates.", "isCorrect": true },
          { "text": "Hypotheses determine test color themes.", "isCorrect": false },
          { "text": "Hypotheses are optional and not useful.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What common mistake should be avoided when running an A/B test?",
        "options": [
          { "text": "Using more than two variants.", "isCorrect": false },
          { "text": "Stopping the test too early before enough data is collected, which leads to unreliable results.", "isCorrect": true },
          { "text": "Testing only after analyzing qualitative feedback.", "isCorrect": false },
          { "text": "Sharing the results publicly.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Which feature is a primary advantage of using Figma over Sketch for team design work?",
        "options": [
          { "text": "Figma requires installing on Mac only.", "isCorrect": false },
          { "text": "Figma is web-based and allows real-time collaborative editing with the team.", "isCorrect": true },
          { "text": "Figma only designs mobile apps, not web.", "isCorrect": false },
          { "text": "Figma has no plugin support.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What is a limitation of Sketch compared to some other design tools?",
        "options": [
          { "text": "Sketch only exports to PDF.", "isCorrect": false },
          { "text": "Sketch is only available as a macOS application.", "isCorrect": true },
          { "text": "Sketch cannot create wireframes.", "isCorrect": false },
          { "text": "Sketch has no color tools.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "For what purpose would a design team use Maze?",
        "options": [
          { "text": "Managing code repositories.", "isCorrect": false },
          { "text": "Performing automated or remote usability tests on prototypes to gather user insights (e.g. task completion and feedback).", "isCorrect": true },
          { "text": "Creating high-fidelity visual mockups from scratch.", "isCorrect": false },
          { "text": "Tracking back-end server metrics.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "According to UX writing best practices, what is wrong with this message?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748330049/0637f494-0500-465f-88ae-7180461f5479_ccggjo.png",
        "options": [
          { "text": "It is too specific and detailed.", "isCorrect": false },
          { "text": "It blames the user for the lack of data.", "isCorrect": false },
          { "text": "It uses third-person language and lacks a conversational tone.", "isCorrect": true },
          { "text": "It is too concise.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "Which usability heuristic is violated by the lack of feedback?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748330053/c642dd79-8f73-45f3-9691-38ef92e482b9_ava0zm.png",
        "options": [
          { "text": "Recognition rather than recall.", "isCorrect": false },
          { "text": "Match between system and real world.", "isCorrect": false },
          { "text": "Visibility of system status.", "isCorrect": true },
          { "text": "User control and freedom.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "What is the main design problem illustrated?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748330058/f5041af9-bdfd-4421-8c64-a29e8c601c39_fw7sd7.png",
        "options": [
          { "text": "Poor color contrast.", "isCorrect": false },
          { "text": "Inconsistency in UI components.", "isCorrect": true },
          { "text": "Excessive whitespace.", "isCorrect": false },
          { "text": "Slow loading time.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "Which accessibility issue does this illustrate?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748330056/c78db83d-19fb-4273-bc23-56beb0b4bf20_nvbtde.png",
        "options": [
          { "text": "Missing keyboard navigation.", "isCorrect": false },
          { "text": "Insufficient color contrast for text, failing WCAG guidelines.", "isCorrect": true },
          { "text": "Lack of focus indicators.", "isCorrect": false },
          { "text": "Overuse of animations.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "According to UX writing guidelines, how could this error message be improved?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748330058/800380f2-dab2-4508-b620-42f4cef0d7e4_afj9gr.png",
        "options": [
          { "text": "By adding more technical details and codes.", "isCorrect": false },
          { "text": "By using friendly, plain language and explaining the issue (e.g. “Something went wrong. Please try again later.”).", "isCorrect": true },
          { "text": "By blaming the user for refreshing too fast.", "isCorrect": false },
          { "text": "By removing the title “Error” to make it less alarming.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "What usability principle is being violated by this design?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748330060/70519547-1eec-43da-ae57-42cbca288268_ltmyyg.png",
        "options": [
          { "text": "Aesthetic and minimalist design.", "isCorrect": true },
          { "text": "User control and freedom.", "isCorrect": false },
          { "text": "Flexibility and efficiency.", "isCorrect": false },
          { "text": "Error prevention.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "What visual design principle is missing here?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748330050/552517dd-0771-47dc-9fcf-7fb1bd50858b_vhw64u.png",
        "options": [
          { "text": "Color variety.", "isCorrect": false },
          { "text": "Visual hierarchy through spacing and text size.", "isCorrect": true },
          { "text": "Animation.", "isCorrect": false },
          { "text": "Sound.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "Which accessibility mistake does this show?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748330051/943f8c28-92e9-4cc9-a5fd-3bcfe5fdeba5_yj8isg.png",
        "options": [
          { "text": "Underlined links should be green.", "isCorrect": false },
          { "text": "Relying solely on color (red) to indicate links violates the rule that color is not the only visual means.", "isCorrect": true },
          { "text": "Using too many menu items.", "isCorrect": false },
          { "text": "Menu should be at the bottom of the page.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "What guideline is this inconsistency violating?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748330035/5db97ba8-2cb4-4d9e-95af-95d93b6419ef_jv5n2f.png",
        "options": [
          { "text": "Match between system and real world.", "isCorrect": false },
          { "text": "Consistency and standards.", "isCorrect": true },
          { "text": "Fitts’s Law.", "isCorrect": false },
          { "text": "Progressive disclosure.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "What key accessibility requirement is being ignored?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748330041/5380c77a-43c0-4570-9421-a3e2f7614bc0_zjt6c0.png",
        "options": [
          { "text": "High contrast text.", "isCorrect": false },
          { "text": "Text alternatives for non-text content (missing alt text).", "isCorrect": true },
          { "text": "Consistent branding.", "isCorrect": false },
          { "text": "Responsive layout.", "isCorrect": false }
        ],
        "difficulty": "medium"
      }
    ],
    isAvailable : true,
    category : 'Product Designer'
  },
  {
    title : 'Level 3',
    questions : [
      {
        "questionType": "text",
        "text": "Why should a product designer be involved in defining success metrics and business goals?",
        "options": [
          { "text": "Because design skills alone guarantee market success.", "isCorrect": false },
          { "text": "To ensure design decisions directly support business objectives and allow measurement of outcomes.", "isCorrect": true },
          { "text": "Only developers need to define metrics.", "isCorrect": false },
          { "text": "Metrics are irrelevant to design work.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "A team uses an impact vs. effort matrix to rank projects. Which statement describes this approach?",
        "options": [
          { "text": "It sorts tasks by alphabetical order.", "isCorrect": false },
          { "text": "It plots each project by its expected business impact against the effort required, helping to “ruthlessly prioritize” work.", "isCorrect": true },
          { "text": "It delays all low-impact projects indefinitely.", "isCorrect": false },
          { "text": "It eliminates user research.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Besides design skill, what key ability helps a UX leader “sell” their work internally?",
        "options": [
          { "text": "Graphic design expertise.", "isCorrect": false },
          { "text": "Storytelling and business communication skills that translate design value into business terms.", "isCorrect": true },
          { "text": "Memorizing user manuals.", "isCorrect": false },
          { "text": "Extensive coding knowledge.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Which research method is generative (strategic) rather than evaluative?",
        "options": [
          { "text": "Usability testing a final prototype.", "isCorrect": false },
          { "text": "Conducting field interviews or diary studies to discover user needs.", "isCorrect": true },
          { "text": "Measuring page load times.", "isCorrect": false },
          { "text": "Counting click-through rates.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Card sorting and tree testing are best used in which phase of design?",
        "options": [
          { "text": "After release to measure user success.", "isCorrect": false },
          { "text": "During design (formative), to improve information architecture and navigation.", "isCorrect": true },
          { "text": "Only in marketing analysis.", "isCorrect": false },
          { "text": "They are not research methods.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Which of the following is a summative research method?",
        "options": [
          { "text": "Field study in a user’s home.", "isCorrect": false },
          { "text": "Unmoderated UX testing or A/B testing for performance measurement.", "isCorrect": true },
          { "text": "Concept sketching sessions.", "isCorrect": false },
          { "text": "Exploratory interviews.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What does the “RICE” acronym stand for in product feature prioritization?",
        "options": [
          { "text": "Risk, Impact, Cost, Effort.", "isCorrect": false },
          { "text": "Reach, Impact, Confidence, Effort.", "isCorrect": true },
          { "text": "Rapid, Immediate, Certified, Essential.", "isCorrect": false },
          { "text": "Random, Impossible, Complex, External.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "In the Kano model, which category is not one of the three parts?",
        "options": [
          { "text": "Must-have (basic) features.", "isCorrect": false },
          { "text": "Performance (one-dimensional) features.", "isCorrect": false },
          { "text": "Delighters (exciters).", "isCorrect": false },
          { "text": "Mandatory (required by law).", "isCorrect": true }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What does “MoSCoW” stand for in feature prioritization?",
        "options": [
          { "text": "Must, Should, Could, Will (not).", "isCorrect": true },
          { "text": "More, Some, Complete, Wish.", "isCorrect": false },
          { "text": "Manual, Shortcut, Core, Walkthrough.", "isCorrect": false },
          { "text": "Mission, Strategy, Change, Win.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Given the error message “Invalid input. Please check your data.”, which revision follows best practice?",
        "options": [
          { "text": "“Your input is wrong.”", "isCorrect": false },
          { "text": "“Oops, something went wrong. Can you double-check your information and try again?”", "isCorrect": true },
          { "text": "“Error 400.”", "isCorrect": false },
          { "text": "“Stop messing up!”", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What is the Task Success Rate in usability metrics?",
        "options": [
          { "text": "Time it takes to complete tasks.", "isCorrect": false },
          { "text": "Percentage of tasks that users can complete successfully.", "isCorrect": true },
          { "text": "Number of features a user tries.", "isCorrect": false },
          { "text": "Number of user clicks per task.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "How is Conversion Rate defined in UX analytics?",
        "options": [
          { "text": "Total visitors minus users.", "isCorrect": false },
          { "text": "(Users who complete a specified goal / total visitors) × 100.", "isCorrect": true },
          { "text": "Number of sign-ups per hour.", "isCorrect": false },
          { "text": "Average session duration.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "If a redesign has a statistically significant higher conversion rate but user task times are much longer, what should a designer consider?",
        "options": [
          { "text": "Just push the change, ignoring task time.", "isCorrect": false },
          { "text": "That other metrics (like efficiency or user satisfaction) might have been negatively affected, so measure multiple KPIs.", "isCorrect": true },
          { "text": "Drop all qualitative research.", "isCorrect": false },
          { "text": "Blame the users.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What is a usability audit (heuristic evaluation)?",
        "options": [
          { "text": "Running automated performance tests.", "isCorrect": false },
          { "text": "Experts systematically reviewing the interface using established heuristics to find usability issues.", "isCorrect": true },
          { "text": "Surveying end-users without observation.", "isCorrect": false },
          { "text": "Counting the number of clicks needed for a task.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What strategy helps maintain consistency as a product grows?",
        "options": [
          { "text": "Designing each new screen from scratch.", "isCorrect": false },
          { "text": "Building a design system with reusable components (so you don’t reinvent elements).", "isCorrect": true },
          { "text": "Allowing each team to make its own style.", "isCorrect": false },
          { "text": "Only using third-party templates.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What design practice improves accessibility for color-blind users?",
        "options": [
          { "text": "Use red and green exclusively to differentiate items.", "isCorrect": false },
          { "text": "Use additional cues (textures, patterns, text labels) so that information isn’t conveyed by color alone.", "isCorrect": true },
          { "text": "Remove all colors from the interface.", "isCorrect": false },
          { "text": "Change content language automatically.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "How can you make a UI more accessible for users with cognitive impairments (e.g. ADHD, dyslexia)?",
        "options": [
          { "text": "Use lots of animated distractions.", "isCorrect": false },
          { "text": "Break up text with headings, use simple fonts, and minimize unnecessary information.", "isCorrect": true },
          { "text": "Require lengthy form filling before any content.", "isCorrect": false },
          { "text": "Use very small text and low contrast.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Which practice improves keyboard accessibility?",
        "options": [
          { "text": "Not providing any focus indicators.", "isCorrect": false },
          { "text": "Ensuring interactive elements have a visible focus state (outline) and a logical tab order.", "isCorrect": true },
          { "text": "Removing tab navigation to simplify.", "isCorrect": false },
          { "text": "Only supporting mouse input.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "According to visual design principles, how should important UI elements be distinguished?",
        "options": [
          { "text": "By making them smaller and less noticeable.", "isCorrect": false },
          { "text": "By using larger scale, brighter color or bolder typography so they stand out.", "isCorrect": true },
          { "text": "By hiding them behind menus.", "isCorrect": false },
          { "text": "By making everything look identical.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "How can a team ensure UI consistency across web, iOS, and Android versions of a product?",
        "options": [
          { "text": "Use totally different designs for each platform.", "isCorrect": false },
          { "text": "Build a design system with platform-specific component variations and clear guidelines, using shared design tokens for core style.", "isCorrect": true },
          { "text": "Ignore brand guidelines on mobile.", "isCorrect": false },
          { "text": "Leave UI decisions to each developer.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "Which usability principle is violated here?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748331279/ChatGPT_Image_May_27_2025_01_00_19_PM_gvdllq.png",
        "options": [
          { "text": "Recognition rather than recall.", "isCorrect": false },
          { "text": "Error prevention.", "isCorrect": false },
          { "text": "Visibility of system status (the user isn’t informed why the button is disabled).", "isCorrect": true },
          { "text": "User control and freedom.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "Which improvement is suggested by UX writing guidelines?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748331728/d3ba78ce-d9e9-4225-8c64-debcd5cb6467_zmhimp.png",
        "options": [
          { "text": "Use more legal language to justify.", "isCorrect": false },
          { "text": "Apologize and explain the issue in user-friendly terms (e.g. “Oops, you need to log in first.”).", "isCorrect": true },
          { "text": "Show an error code and terminate the app.", "isCorrect": false },
          { "text": "Remove the message entirely.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "What design problem is evident?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748331320/ChatGPT_Image_May_27_2025_01_01_18_PM_jfr5zr.png",
        "options": [
          { "text": "Insufficient content.", "isCorrect": false },
          { "text": "Visual clutter – too many competing elements, violating minimalist design.", "isCorrect": true },
          { "text": "Inadequate branding colors.", "isCorrect": false },
          { "text": "Slow load time (not visible).", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "What principle is being violated?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748331277/ChatGPT_Image_May_27_2025_01_01_48_PM_dypwfj.png",
        "options": [
          { "text": "Visual hierarchy.", "isCorrect": false },
          { "text": "Consistency and standards (the navigation mechanism should be consistent across screens).", "isCorrect": true },
          { "text": "Error prevention.", "isCorrect": false },
          { "text": "Matching the system to the real world.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "How could this be improved?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748331896/524ba19a-1c81-4c4a-92a2-12e40571eed3_toupwm.png",
        "options": [
          { "text": "By adding more technical details.", "isCorrect": false },
          { "text": "By rewriting labels in plain language and addressing the user, making it conversational.", "isCorrect": true },
          { "text": "By translating into Latin for formality.", "isCorrect": false },
          { "text": "By removing labels and using placeholders only.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "Which heuristic does this violate?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748331285/ChatGPT_Image_May_27_2025_01_02_27_PM_uabs0f.png",
        "options": [
          { "text": "Recognition rather than recall.", "isCorrect": false },
          { "text": "Aesthetic and minimalist design.", "isCorrect": false },
          { "text": "Consistency and standards – the same visual style is used for different actions, which can confuse users.", "isCorrect": true },
          { "text": "User control and freedom.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "What issue is shown here?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748331470/ChatGPT_Image_May_27_2025_01_07_10_PM_owanxf.png",
        "options": [
          { "text": "Platform inconsistency.", "isCorrect": false },
          { "text": "Lack of localization support (UI elements not accommodating longer localized text).", "isCorrect": true },
          { "text": "Bad color contrast.", "isCorrect": false },
          { "text": "Missing icons.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "What usability flaw does this represent?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748331475/ChatGPT_Image_May_27_2025_01_07_20_PM_dou13l.png",
        "options": [
          { "text": "Too much information.", "isCorrect": false },
          { "text": "Poor visibility of system status (users aren’t informed of progress or error states).", "isCorrect": true },
          { "text": "Inconsistent branding.", "isCorrect": false },
          { "text": "Color blindness issue.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "What key UX guideline is being breached?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748331472/ChatGPT_Image_May_27_2025_01_07_23_PM_pbduhp.png",
        "options": [
          { "text": "Visual hierarchy.", "isCorrect": false },
          { "text": "Cross-platform consistency – the same content is presented inconsistently across devices (detail lost on mobile).", "isCorrect": true },
          { "text": "Minimalist design.", "isCorrect": false },
          { "text": "Aesthetic design.", "isCorrect": false }
        ],
        "difficulty": "hard"
      }
    ],
    isAvailable : true,
    category : 'Product Designer'
  },
]

const newBrandDesTemplates = [
  {
    title : 'Level 1',
    questions : [
      {
        "questionType": "text",
        "text": "Which design principle ensures that a composition feels evenly weighted on both sides?",
        "options": [
          { "text": "Contrast", "isCorrect": false },
          { "text": "Repetition", "isCorrect": false },
          { "text": "Alignment", "isCorrect": false },
          { "text": "Balance", "isCorrect": true }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which design principle uses differences in size, color, or typography to draw attention to key elements?",
        "options": [
          { "text": "Alignment", "isCorrect": false },
          { "text": "Proximity", "isCorrect": false },
          { "text": "Repetition", "isCorrect": false },
          { "text": "Contrast", "isCorrect": true }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Grouping related items close together in a design primarily leverages which principle?",
        "options": [
          { "text": "Proximity", "isCorrect": true },
          { "text": "Hierarchy", "isCorrect": false },
          { "text": "Alignment", "isCorrect": false },
          { "text": "Contrast", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Using a consistent color or shape throughout a design is an example of which principle?",
        "options": [
          { "text": "Symmetry", "isCorrect": false },
          { "text": "Contrast", "isCorrect": false },
          { "text": "Repetition", "isCorrect": true },
          { "text": "Alignment", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Maintaining a structured arrangement of elements (e.g., centering or edge aligning) refers to which principle?",
        "options": [
          { "text": "Balance", "isCorrect": false },
          { "text": "Emphasis", "isCorrect": false },
          { "text": "Alignment", "isCorrect": true },
          { "text": "Proximity", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which of the following describes a wordmark logo?",
        "options": [
          { "text": "It uses an image to symbolize the brand", "isCorrect": false },
          { "text": "It uses only the company’s name in stylized text", "isCorrect": true },
          { "text": "It contains the company’s founding date", "isCorrect": false },
          { "text": "It uses a mascot character", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "A logo that uses letters or initials as its design (e.g., \"IBM\") is called a what?",
        "options": [
          { "text": "Wordmark", "isCorrect": false },
          { "text": "Lettermark", "isCorrect": true },
          { "text": "Emblem", "isCorrect": false },
          { "text": "Mascot", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "The Nike “swoosh” is an example of which type of logo?",
        "options": [
          { "text": "Lettermark", "isCorrect": false },
          { "text": "Pictorial mark", "isCorrect": false },
          { "text": "Wordmark", "isCorrect": false },
          { "text": "Abstract mark", "isCorrect": true }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which logo type combines a symbol with text in one mark (like a symbol above or beside the word)?",
        "options": [
          { "text": "Wordmark", "isCorrect": false },
          { "text": "Combination mark", "isCorrect": true },
          { "text": "Abstract mark", "isCorrect": false },
          { "text": "Emblem", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What is an emblem logo?",
        "options": [
          { "text": "A logo where text is inside a symbol or seal shape", "isCorrect": true },
          { "text": "A logo using only initials", "isCorrect": false },
          { "text": "A logo made of stylized text only", "isCorrect": false },
          { "text": "A logo with an animal mascot", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What type of logo is a realistic image of an object or animal (e.g., the Twitter bird)?",
        "options": [
          { "text": "Pictorial mark", "isCorrect": true },
          { "text": "Lettermark", "isCorrect": false },
          { "text": "Emblem", "isCorrect": false },
          { "text": "Abstract mark", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which set of colors are considered the primary colors in traditional paint?",
        "options": [
          { "text": "Red, Green, Blue", "isCorrect": false },
          { "text": "Orange, Green, Purple", "isCorrect": false },
          { "text": "Red, Blue, Yellow", "isCorrect": true },
          { "text": "Cyan, Magenta, Yellow", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which set of colors are the additive primaries for digital screens?",
        "options": [
          { "text": "Red, Blue, Yellow", "isCorrect": false },
          { "text": "Cyan, Magenta, Yellow", "isCorrect": false },
          { "text": "Red, Green, Blue", "isCorrect": true },
          { "text": "Orange, Purple, Green", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What is the complementary color of blue on the color wheel?",
        "options": [
          { "text": "Orange", "isCorrect": true },
          { "text": "Purple", "isCorrect": false },
          { "text": "Red", "isCorrect": false },
          { "text": "Green", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What color scheme is defined by three colors that sit side-by-side on the color wheel?",
        "options": [
          { "text": "Complementary", "isCorrect": false },
          { "text": "Triadic", "isCorrect": false },
          { "text": "Analogous", "isCorrect": true },
          { "text": "Monochromatic", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Warm colors like red and orange typically evoke which emotion?",
        "options": [
          { "text": "Excitement or energy", "isCorrect": true },
          { "text": "Calmness", "isCorrect": false },
          { "text": "Sadness", "isCorrect": false },
          { "text": "Professionalism", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "A monochromatic color scheme uses which of the following?",
        "options": [
          { "text": "Colors directly opposite each other (complementary)", "isCorrect": false },
          { "text": "Variations (shades/tones) of a single hue", "isCorrect": true },
          { "text": "Three colors equally spaced (triadic)", "isCorrect": false },
          { "text": "Two adjacent colors and the opposite (split complementary)", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "If a designer wants to create a calm, relaxing feel, which color is most appropriate?",
        "options": [
          { "text": "Bright red", "isCorrect": false },
          { "text": "Cool blue", "isCorrect": true },
          { "text": "Neon green", "isCorrect": false },
          { "text": "Orange", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which color is often associated with creativity and luxury in branding?",
        "options": [
          { "text": "Orange", "isCorrect": false },
          { "text": "Green", "isCorrect": false },
          { "text": "Purple", "isCorrect": true },
          { "text": "Brown", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "In a text-heavy design, which typographic element would most likely help create hierarchy?",
        "options": [
          { "text": "Font size", "isCorrect": true },
          { "text": "Character count", "isCorrect": false },
          { "text": "Page numbers", "isCorrect": false },
          { "text": "Line breaks", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Larger text or bolder fonts for titles relative to body text is used to achieve what?",
        "options": [
          { "text": "Color balance", "isCorrect": false },
          { "text": "Typographic unity", "isCorrect": false },
          { "text": "Visual hierarchy", "isCorrect": true },
          { "text": "Texture variation", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "In a poster design, which action would most effectively emphasize the main headline?",
        "options": [
          { "text": "Decreasing the font size", "isCorrect": false },
          { "text": "Using a bright, contrasting color for the headline", "isCorrect": true },
          { "text": "Lowering the opacity of the headline", "isCorrect": false },
          { "text": "Placing the headline in a corner", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What is the difference between serif and sans-serif fonts?",
        "options": [
          { "text": "Serif fonts have small strokes at the ends of characters, sans-serif do not", "isCorrect": true },
          { "text": "Sans-serif fonts have strokes, serif do not", "isCorrect": false },
          { "text": "Serif fonts are always cursive, sans-serif are always bold", "isCorrect": false },
          { "text": "There is no difference", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which of these is an example of a script font?",
        "options": [
          { "text": "Times New Roman", "isCorrect": false },
          { "text": "Arial", "isCorrect": false },
          { "text": "Brush Script", "isCorrect": true },
          { "text": "Courier New", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "For body text in printed materials, which font style is usually preferred for readability?",
        "options": [
          { "text": "Sans-serif", "isCorrect": false },
          { "text": "Serif", "isCorrect": true },
          { "text": "Handwritten", "isCorrect": false },
          { "text": "Decorative", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Kerning is the adjustment of what in typography?",
        "options": [
          { "text": "The space between lines of text", "isCorrect": false },
          { "text": "The space between individual letters", "isCorrect": true },
          { "text": "The angle of italic text", "isCorrect": false },
          { "text": "The size of the font", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What does “leading” refer to?",
        "options": [
          { "text": "Space between lines of text", "isCorrect": true },
          { "text": "Space between letters", "isCorrect": false },
          { "text": "Space between words", "isCorrect": false },
          { "text": "A style of quotation marks", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which font would best convey a formal, professional tone?",
        "options": [
          { "text": "Comic Sans", "isCorrect": false },
          { "text": "A serif font like Times New Roman", "isCorrect": true },
          { "text": "A decorative novelty font", "isCorrect": false },
          { "text": "A heavy comic-style font", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which software is primarily used for creating vector graphics?",
        "options": [
          { "text": "Adobe Illustrator", "isCorrect": true },
          { "text": "Adobe Photoshop", "isCorrect": false },
          { "text": "Adobe InDesign", "isCorrect": false },
          { "text": "SketchUp", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which software is best suited for editing and retouching photographs?",
        "options": [
          { "text": "Illustrator", "isCorrect": false },
          { "text": "Photoshop", "isCorrect": true },
          { "text": "Figma", "isCorrect": false },
          { "text": "Premiere Pro", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "In Figma, which feature is commonly used for collaboration among designers?",
        "options": [
          { "text": "Artboards", "isCorrect": false },
          { "text": "Cloud-based real-time editing", "isCorrect": true },
          { "text": "Matte painting", "isCorrect": false },
          { "text": "Sheet music composition", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What file format is typically used for scalable, editable vector logos?",
        "options": [
          { "text": ".JPG", "isCorrect": false },
          { "text": ".PNG", "isCorrect": false },
          { "text": ".EPS", "isCorrect": true },
          { "text": ".GIF", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which Photoshop tool is commonly used to cut out an object from its background?",
        "options": [
          { "text": "Magic Wand tool", "isCorrect": true },
          { "text": "Crop tool", "isCorrect": false },
          { "text": "Brush tool", "isCorrect": false },
          { "text": "Pen tool", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which Figma feature allows you to reuse the same design element across multiple frames?",
        "options": [
          { "text": "Components", "isCorrect": true },
          { "text": "Layers", "isCorrect": false },
          { "text": "Artboards", "isCorrect": false },
          { "text": "Filters", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What is the purpose of saving a logo with transparency (e.g., as a PNG file)?",
        "options": [
          { "text": "To reduce file size", "isCorrect": false },
          { "text": "To allow the logo to appear correctly on any background", "isCorrect": true },
          { "text": "To add a watermark", "isCorrect": false },
          { "text": "To encrypt the logo data", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "Which logo is an example of a wordmark?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748336851/baf08a43-23fc-42a5-a725-16dcced702e2_yydqb1.png",
        "options": [
          { "text": "Logo A", "isCorrect": true },
          { "text": "Logo B", "isCorrect": false },
          { "text": "Logo C", "isCorrect": false },
          { "text": "Logo D", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "Which logo is an example of a lettermark?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748336850/1e10559a-2346-4203-8e4b-289a319c9eb2_qvpxoo.png",
        "options": [
          { "text": "Logo A", "isCorrect": false },
          { "text": "Logo B", "isCorrect": true },
          { "text": "Logo C", "isCorrect": false },
          { "text": "Logo D", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "Which poster uses a more harmonious font pairing?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748336854/b33501e6-c054-401c-8a34-dd1338a215b4_gtcfe1.png",
        "options": [
          { "text": "Poster A", "isCorrect": true },
          { "text": "Poster B", "isCorrect": false },
          { "text": "Both posters", "isCorrect": false },
          { "text": "Neither poster", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "Which flyer uses a more professional font combination?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748336856/f63440d3-0805-4e29-9ced-d678a1e500dd_u9vx67.png",
        "options": [
          { "text": "Left flyer", "isCorrect": false },
          { "text": "Right flyer", "isCorrect": true },
          { "text": "Both", "isCorrect": false },
          { "text": "Neither", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "What color scheme do these colors represent?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748336858/db59b7a1-e317-4a67-b1c7-de4b95fa1150_z3yhyz.png",
        "options": [
          { "text": "Primary colors", "isCorrect": false },
          { "text": "Secondary colors", "isCorrect": true },
          { "text": "Tertiary colors", "isCorrect": false },
          { "text": "Complementary colors", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "What is the main alignment issue in this layout?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748336852/b5417370-1324-4ac8-a8ab-3026f7bab583_xbm4yr.png",
        "options": [
          { "text": "All text is center-aligned", "isCorrect": false },
          { "text": "The text boxes are inconsistently aligned", "isCorrect": true },
          { "text": "The font sizes are misaligned", "isCorrect": false },
          { "text": "The image placement is off-grid", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "What design problem does this illustrate?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748337050/a30a63b1-135e-4cf2-9427-b4293c8fe1e3_kyf2dc.png",
        "options": [
          { "text": "Inconsistent use of the brand color", "isCorrect": false },
          { "text": "Poor alignment", "isCorrect": true },
          { "text": "Improper font pairing", "isCorrect": false },
          { "text": "Lack of visual hierarchy", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "Which word is set in a sans-serif typeface?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748336848/20803b53-fc36-45d4-870b-01838122f89b_pn3dm9.png",
        "options": [
          { "text": "Design", "isCorrect": true },
          { "text": "Artistry", "isCorrect": false },
          { "text": "Both", "isCorrect": false },
          { "text": "Neither", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
    ],
    isAvailable : true,
    category : 'Brand Designer'
  },
  {
    title : 'Level 2',
    questions : [
      {
        "questionType": "text",
        "text": "Which of the following is NOT typically included in a brand identity system?",
        "options": [
          { "text": "Logo", "isCorrect": false },
          { "text": "Color palette", "isCorrect": false },
          { "text": "Marketing budget", "isCorrect": true },
          { "text": "Typography", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "The primary purpose of a brand identity is to do what?",
        "options": [
          { "text": "Establish a consistent visual language", "isCorrect": true },
          { "text": "Set financial goals", "isCorrect": false },
          { "text": "Manage customer relationships", "isCorrect": false },
          { "text": "Organize the office layout", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "A brand style guide often includes guidelines on which of the following?",
        "options": [
          { "text": "How to use the logo", "isCorrect": true },
          { "text": "Employee work hours", "isCorrect": false },
          { "text": "Pricing strategy", "isCorrect": false },
          { "text": "Supply chain details", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Brand identity systems usually ensure consistency in what?",
        "options": [
          { "text": "Color usage (logo, palette)", "isCorrect": false },
          { "text": "Typography usage", "isCorrect": false },
          { "text": "Visual elements and messaging", "isCorrect": false },
          { "text": "All of the above", "isCorrect": true }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Which action best supports building a strong brand identity?",
        "options": [
          { "text": "Using inconsistent logos on different products", "isCorrect": false },
          { "text": "Changing brand colors frequently", "isCorrect": false },
          { "text": "Applying the brand’s visual elements consistently", "isCorrect": true },
          { "text": "Ignoring customer feedback on design", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What is visual consistency in branding?",
        "options": [
          { "text": "Using a consistent visual style across all brand materials", "isCorrect": true },
          { "text": "Changing design styles frequently", "isCorrect": false },
          { "text": "Using only black and white", "isCorrect": false },
          { "text": "Having multiple conflicting logos", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Which scenario best demonstrates consistency in visual style?",
        "options": [
          { "text": "A company using the same fonts and colors on its website and brochures", "isCorrect": true },
          { "text": "A brand using different fonts for each campaign", "isCorrect": false },
          { "text": "Random selection of colors for each product", "isCorrect": false },
          { "text": "Changing the logo tagline monthly", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Why is consistency in a brand’s visual style important?",
        "options": [
          { "text": "To confuse customers", "isCorrect": false },
          { "text": "To save printing costs", "isCorrect": false },
          { "text": "To build brand recognition", "isCorrect": true },
          { "text": "To allow unlimited creativity", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Which practice helps maintain visual consistency across branded materials?",
        "options": [
          { "text": "Using the brand’s color palette for all graphics", "isCorrect": true },
          { "text": "Changing logo position on each page", "isCorrect": false },
          { "text": "Using different typefaces in every design", "isCorrect": false },
          { "text": "Varying image styles randomly", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "A logo appears blurry and pixelated when printed on a flyer. What is the most likely cause?",
        "options": [
          { "text": "The logo was created in vector format", "isCorrect": false },
          { "text": "The logo was a low-resolution raster image", "isCorrect": true },
          { "text": "The logo has too many colors", "isCorrect": false },
          { "text": "The logo has a transparent background", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "If a logo’s fine details disappear when scaled down to a small size, what design issue does this illustrate?",
        "options": [
          { "text": "The logo has too many small details", "isCorrect": true },
          { "text": "Incorrect color space", "isCorrect": false },
          { "text": "Low contrast colors", "isCorrect": false },
          { "text": "An outdated typeface", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "A logo printed on a dark shirt looks faded compared to one on a white background. Why?",
        "options": [
          { "text": "Wrong file format", "isCorrect": false },
          { "text": "Inadequate color contrast", "isCorrect": true },
          { "text": "Printer malfunction", "isCorrect": false },
          { "text": "Faulty computer monitor", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Which aspect of a logo design is crucial for creating a memorable brand symbol?",
        "options": [
          { "text": "Simplicity", "isCorrect": true },
          { "text": "Complexity", "isCorrect": false },
          { "text": "Random colors", "isCorrect": false },
          { "text": "Lack of hierarchy", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "A company logo features an icon that looks similar to a competitor’s logo. What is the primary issue here?",
        "options": [
          { "text": "Lack of originality", "isCorrect": true },
          { "text": "Too colorful design", "isCorrect": false },
          { "text": "Excessive whitespace", "isCorrect": false },
          { "text": "Too many fonts", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Which color is often associated with trust and reliability?",
        "options": [
          { "text": "Blue", "isCorrect": true },
          { "text": "Red", "isCorrect": false },
          { "text": "Orange", "isCorrect": false },
          { "text": "Black", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What emotion is typically evoked by the color red in branding?",
        "options": [
          { "text": "Calmness", "isCorrect": false },
          { "text": "Excitement or urgency", "isCorrect": true },
          { "text": "Luxury", "isCorrect": false },
          { "text": "Sadness", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "In branding, green is commonly associated with which concept?",
        "options": [
          { "text": "Wealth and energy", "isCorrect": false },
          { "text": "Nature and health", "isCorrect": true },
          { "text": "Passion", "isCorrect": false },
          { "text": "Youth", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "A tech company wants to appear innovative; which color might best convey that attribute?",
        "options": [
          { "text": "Blue", "isCorrect": false },
          { "text": "Green", "isCorrect": false },
          { "text": "Red", "isCorrect": false },
          { "text": "Orange", "isCorrect": true }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What feeling is most likely conveyed by the color black in a luxury brand identity?",
        "options": [
          { "text": "Sophistication or elegance", "isCorrect": true },
          { "text": "Playfulness", "isCorrect": false },
          { "text": "Youthfulness", "isCorrect": false },
          { "text": "Energy", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Which color combination would likely feel harmonious according to color theory?",
        "options": [
          { "text": "Red and green", "isCorrect": false },
          { "text": "Blue and purple", "isCorrect": true },
          { "text": "Yellow and blue", "isCorrect": false },
          { "text": "Orange and aqua", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What is \"clear space\" around a logo?",
        "options": [
          { "text": "The amount of blank area that must be kept around the logo", "isCorrect": true },
          { "text": "The actual white color used in the logo", "isCorrect": false },
          { "text": "The name of the logo file", "isCorrect": false },
          { "text": "The tagline below the logo", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Brand usage guidelines often specify a minimum logo size to ensure what?",
        "options": [
          { "text": "That it looks pixelated", "isCorrect": false },
          { "text": "That it remains legible", "isCorrect": true },
          { "text": "That it uses less ink", "isCorrect": false },
          { "text": "That it’s flexible", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Which practice is typically prohibited by brand usage guidelines?",
        "options": [
          { "text": "Changing the logo’s color to one of the approved brand palette", "isCorrect": false },
          { "text": "Skewing or stretching the logo", "isCorrect": true },
          { "text": "Adding clear space around the logo", "isCorrect": false },
          { "text": "Using the logo on a brand-approved background", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Why do brand usage guidelines exist?",
        "options": [
          { "text": "To allow each team member to use any logo version", "isCorrect": false },
          { "text": "To ensure consistent presentation of the brand", "isCorrect": true },
          { "text": "To change the logo annually", "isCorrect": false },
          { "text": "To restrict use of certain fonts", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What should you check before applying the brand logo to a dark background?",
        "options": [
          { "text": "That the text is smaller", "isCorrect": false },
          { "text": "That the alternate (light) logo version is used", "isCorrect": true },
          { "text": "That the logo is rotated 90 degrees", "isCorrect": false },
          { "text": "That the logo colors are changed to match background", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Using white space effectively in a layout helps to achieve what?",
        "options": [
          { "text": "A cluttered appearance", "isCorrect": false },
          { "text": "Better readability and focus", "isCorrect": true },
          { "text": "A distracting design", "isCorrect": false },
          { "text": "More content per page", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "A grid system in layout design primarily helps with:",
        "options": [
          { "text": "Color selection", "isCorrect": false },
          { "text": "Organizing content", "isCorrect": true },
          { "text": "Choosing fonts", "isCorrect": false },
          { "text": "Writing copy", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Why is hierarchy important in layout design?",
        "options": [
          { "text": "To ensure all text is the same size", "isCorrect": false },
          { "text": "To guide the viewer’s eye through content", "isCorrect": true },
          { "text": "To make the design symmetrical", "isCorrect": false },
          { "text": "To use as many fonts as possible", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "In a multi-column layout, failing to align the columns on a common baseline will cause:",
        "options": [
          { "text": "A sense of imbalance", "isCorrect": true },
          { "text": "Too much white space", "isCorrect": false },
          { "text": "Loss of color contrast", "isCorrect": false },
          { "text": "Typography errors", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Which layout practice improves readability?",
        "options": [
          { "text": "Increasing line spacing (leading)", "isCorrect": true },
          { "text": "Decreasing line spacing", "isCorrect": false },
          { "text": "Center-aligning all text", "isCorrect": false },
          { "text": "Using only one font for everything", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What is the \"rule of thirds\" in layout design?",
        "options": [
          { "text": "A principle to create balanced compositions by dividing the layout into thirds", "isCorrect": true },
          { "text": "A rule for using one-third of the brand colors", "isCorrect": false },
          { "text": "A guideline for limiting typefaces to three", "isCorrect": false },
          { "text": "It is part of CMYK printing", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Which type of grid is commonly used for modern print layouts?",
        "options": [
          { "text": "CSS Grid", "isCorrect": false },
          { "text": "Modular grid", "isCorrect": true },
          { "text": "Quilted grid", "isCorrect": false },
          { "text": "8-point grid", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "You receive a brand design brief stating: “Target audience is eco-conscious millennials; brand values are sustainability and innovation.” Which color scheme would best match these values?",
        "options": [
          { "text": "Greens and earth tones", "isCorrect": true },
          { "text": "Neon brights and pastels", "isCorrect": false },
          { "text": "Monochrome black & white", "isCorrect": false },
          { "text": "Traditional red and gold", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "A brand brief requests a “playful and friendly” tone. Which design element would least align with this request?",
        "options": [
          { "text": "Rounded fonts", "isCorrect": false },
          { "text": "Bright, vibrant colors", "isCorrect": false },
          { "text": "Comic-style illustrations", "isCorrect": false },
          { "text": "A dark, sharp-edged font", "isCorrect": true }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "If a client’s brand brief emphasizes luxury and exclusivity, which style would you avoid?",
        "options": [
          { "text": "Minimalist design", "isCorrect": false },
          { "text": "Ornate decorative imagery", "isCorrect": false },
          { "text": "Simple monochrome color scheme", "isCorrect": false },
          { "text": "Cartoonish characters", "isCorrect": true }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "What brand consistency issue is illustrated?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748337622/b33e7730-a929-47c3-aa95-099e52c5b7e4_vf5p7s.png",
        "options": [
          { "text": "Inconsistent use of brand colors", "isCorrect": true },
          { "text": "Inconsistent slogan wording", "isCorrect": false },
          { "text": "Inconsistent logo shape", "isCorrect": false },
          { "text": "Inconsistent product placement", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "What brand consistency issue is shown?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748337618/27493f37-4af0-44af-ada4-e99dd61cea12_xkyfqr.png",
        "options": [
          { "text": "The logo design is incorrect", "isCorrect": false },
          { "text": "The brand font usage is inconsistent", "isCorrect": true },
          { "text": "The color scheme is inconsistent", "isCorrect": false },
          { "text": "The logo spacing is incorrect", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "Which variation most likely violates the brand guidelines?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748337617/900fd3bf-0d88-4f4f-9664-0826a17d3a26_uufqdp.png",
        "options": [
          { "text": "Logo A", "isCorrect": false },
          { "text": "Logo B", "isCorrect": false },
          { "text": "Logo C", "isCorrect": false },
          { "text": "Logo D", "isCorrect": true }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "Which logo usage is not appropriate according to brand guidelines?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748337612/6b751623-febd-46d6-bab9-8d790e8a602b_y3f0z8.png",
        "options": [
          { "text": "Full-color logo on white", "isCorrect": false },
          { "text": "Reverse logo (white on black)", "isCorrect": false },
          { "text": "Logo on a yellow background", "isCorrect": true },
          { "text": "All are appropriate", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "Which issue is present in the second logo version?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748337611/ccb3bf4e-761a-469e-965b-6c4630ca4086_mcuuqb.png",
        "options": [
          { "text": "The logo has too many colors", "isCorrect": false },
          { "text": "The logo is not using the official font", "isCorrect": false },
          { "text": "The logo lacks clear space around it", "isCorrect": true },
          { "text": "The logo alignment is off", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "Which choice best matches the intended audience with typography?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748337614/871722d8-08b7-412e-86af-ec4d15055d60_hnwhub.png",
        "options": [
          { "text": "The font on the left is suitable for the children’s magazine", "isCorrect": true },
          { "text": "The font on the right is suitable for the children’s magazine", "isCorrect": false },
          { "text": "Both fonts are equally appropriate for both magazines", "isCorrect": false },
          { "text": "Neither font is suitable for its magazine", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "Which design problem does this illustrate?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748337896/e6e79130-326c-4074-9e15-8e9520f7c73d_1_nop6rb.png",
        "options": [
          { "text": "Unbalanced layout", "isCorrect": true },
          { "text": "Poor typography", "isCorrect": false },
          { "text": "Low image quality", "isCorrect": false },
          { "text": "Clashing colors", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "Which layout issue does this illustrate?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748337622/3fa7a470-6a24-4363-902c-ed3c2e655261_rfmysa.png",
        "options": [
          { "text": "Too much symmetry", "isCorrect": false },
          { "text": "Uneven distribution of content", "isCorrect": true },
          { "text": "Too many contrasting colors", "isCorrect": false },
          { "text": "Overuse of imagery", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
    ],
    isAvailable : true,
    category : 'Brand Designer'
  },
  {
    title : 'Level 3',
    questions : [
      {
        "questionType": "text",
        "text": "What factor is unique to digital branding compared to print branding?",
        "options": [
          { "text": "Interactivity and screen responsiveness", "isCorrect": true },
          { "text": "Use of color", "isCorrect": false },
          { "text": "Typography", "isCorrect": false },
          { "text": "Logo design", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Which of the following best describes a “responsive logo”?",
        "options": [
          { "text": "A logo that changes depending on user interactions", "isCorrect": false },
          { "text": "A logo that adapts its form or complexity for different device sizes", "isCorrect": true },
          { "text": "A logo that uses responsive colors", "isCorrect": false },
          { "text": "A logo that remains static", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Why is it important to consider multiple screen sizes in digital branding?",
        "options": [
          { "text": "To ensure logos and design elements scale properly", "isCorrect": true },
          { "text": "It’s not important; only desktop matters", "isCorrect": false },
          { "text": "Only images need scaling", "isCorrect": false },
          { "text": "It’s only for print", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What does “digital asset management” refer to in branding?",
        "options": [
          { "text": "Storage of design files and brand assets in a system", "isCorrect": true },
          { "text": "Investment portfolio for designers", "isCorrect": false },
          { "text": "Website hosting service", "isCorrect": false },
          { "text": "Social media scheduling", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What is the primary benefit of a responsive logo system?",
        "options": [
          { "text": "The logo looks different on each page", "isCorrect": false },
          { "text": "Ensures brand consistency at various sizes", "isCorrect": true },
          { "text": "Allows any color usage", "isCorrect": false },
          { "text": "Requires more graphic designers", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Which logo variation would be most appropriate on a small mobile screen?",
        "options": [
          { "text": "The full logo with tagline", "isCorrect": false },
          { "text": "A simplified icon-only logo", "isCorrect": true },
          { "text": "A text-only logo with a long tagline", "isCorrect": false },
          { "text": "An animated logo", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "If a logo has a horizontal and a vertical version, what is this an example of?",
        "options": [
          { "text": "Logo flexibility in responsive design", "isCorrect": true },
          { "text": "Unclear branding strategy", "isCorrect": false },
          { "text": "Outdated design system", "isCorrect": false },
          { "text": "Printing error", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Which challenge arises if a logo isn’t designed for scaling?",
        "options": [
          { "text": "It becomes too modern", "isCorrect": false },
          { "text": "It might lose legibility when small", "isCorrect": true },
          { "text": "It uses too few colors", "isCorrect": false },
          { "text": "It won’t print on business cards", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What is a scalable identity system in branding?",
        "options": [
          { "text": "A brand system that grows with the company and allows for variation", "isCorrect": true },
          { "text": "A set of small logos", "isCorrect": false },
          { "text": "Only logos that can print on stamps", "isCorrect": false },
          { "text": "A system with fixed single logo usage", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Why might a brand create a set of icons or patterns as part of its identity?",
        "options": [
          { "text": "To decorate company vehicles only", "isCorrect": false },
          { "text": "To extend the brand’s visual language across media", "isCorrect": true },
          { "text": "It’s only for digital use", "isCorrect": false },
          { "text": "To avoid using the logo", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Which statement about color palettes in a scalable identity system is true?",
        "options": [
          { "text": "Only one shade of each color should be used", "isCorrect": false },
          { "text": "They include multiple shades (tints/tones) of brand colors", "isCorrect": true },
          { "text": "They ignore accessibility", "isCorrect": false },
          { "text": "They must include black and white", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "If a company expands into new product lines, what is crucial for the brand identity?",
        "options": [
          { "text": "Creating a separate brand identity for each line", "isCorrect": false },
          { "text": "Maintaining core brand elements across all lines", "isCorrect": true },
          { "text": "Changing the logo color for each line", "isCorrect": false },
          { "text": "Using different names with no relation", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Which example shows cross-platform consistency?",
        "options": [
          { "text": "A brand uses the same font and logo on its website, app, and print ads", "isCorrect": true },
          { "text": "The brand uses a different color for each platform", "isCorrect": false },
          { "text": "The brand logo looks different on mobile versus desktop intentionally", "isCorrect": false },
          { "text": "The brand only exists online", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What is one sign of poor cross-platform consistency?",
        "options": [
          { "text": "Matching typography and colors on all materials", "isCorrect": false },
          { "text": "Using the same logo and tagline everywhere", "isCorrect": false },
          { "text": "The brand uses one theme color on the website but a different one in its store signage", "isCorrect": true },
          { "text": "Coordinated social media and packaging design", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Which tool can help manage cross-platform design consistency?",
        "options": [
          { "text": "A physical sketchbook", "isCorrect": false },
          { "text": "A digital design system or style guide", "isCorrect": true },
          { "text": "Individual designers working separately", "isCorrect": false },
          { "text": "Many unrelated software", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Cross-platform consistency is important because:",
        "options": [
          { "text": "It increases production costs", "isCorrect": false },
          { "text": "It confuses the customer", "isCorrect": false },
          { "text": "It strengthens brand recognition", "isCorrect": true },
          { "text": "It allows unlimited creative freedom", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What are design tokens?",
        "options": [
          { "text": "Company shares traded on the stock market", "isCorrect": false },
          { "text": "Variables (like colors and spacing) used in a design system", "isCorrect": true },
          { "text": "Cryptocurrency for designers", "isCorrect": false },
          { "text": "Tokens used at brand events", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Why use a component library in a design system?",
        "options": [
          { "text": "To reinvent the wheel every time", "isCorrect": false },
          { "text": "To store prints physically", "isCorrect": false },
          { "text": "To maintain reusable, consistent UI elements", "isCorrect": true },
          { "text": "To block copywriters", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Which of the following is a benefit of a digital design system?",
        "options": [
          { "text": "Faster development with consistency", "isCorrect": true },
          { "text": "More graphic design variances", "isCorrect": false },
          { "text": "Less need for prototyping", "isCorrect": false },
          { "text": "Random brand updates", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What is a design token often stored as?",
        "options": [
          { "text": "CSS custom property", "isCorrect": true },
          { "text": "JPEG image", "isCorrect": false },
          { "text": "Word document", "isCorrect": false },
          { "text": "Video file", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "A brand’s digital style guide might include all EXCEPT:",
        "options": [
          { "text": "Color hex codes", "isCorrect": false },
          { "text": "Typography scale", "isCorrect": false },
          { "text": "Server backups", "isCorrect": true },
          { "text": "Guidelines for imagery", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What is behavioral branding?",
        "options": [
          { "text": "Giving employees branded wearables", "isCorrect": false },
          { "text": "Designing brand interactions that influence user behavior", "isCorrect": true },
          { "text": "The brand acting in commercials", "isCorrect": false },
          { "text": "Tracking user behavior for ads", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Which example illustrates behavioral branding?",
        "options": [
          { "text": "A brand’s chatbot reflects its personality", "isCorrect": true },
          { "text": "A logo changes color daily", "isCorrect": false },
          { "text": "Using no images in marketing", "isCorrect": false },
          { "text": "Printing the same brochure for years", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "In behavioral branding, how might a website encourage brand engagement?",
        "options": [
          { "text": "By ignoring user feedback", "isCorrect": false },
          { "text": "By using gamified elements consistent with brand", "isCorrect": true },
          { "text": "By having static, slow-loading pages", "isCorrect": false },
          { "text": "By using no call-to-action buttons", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Why is understanding user behavior important for brand designers?",
        "options": [
          { "text": "It isn’t relevant to design", "isCorrect": false },
          { "text": "It helps create designs that resonate with users", "isCorrect": true },
          { "text": "It increases the website’s file size", "isCorrect": false },
          { "text": "It allows designers to avoid research", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What is the minimum contrast ratio recommended by WCAG for normal text?",
        "options": [
          { "text": "3:1", "isCorrect": false },
          { "text": "4.5:1", "isCorrect": true },
          { "text": "1.5:1", "isCorrect": false },
          { "text": "7:1", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Which color combination fails accessibility for color-blind users?",
        "options": [
          { "text": "Red text on green background", "isCorrect": true },
          { "text": "Blue text on yellow background", "isCorrect": false },
          { "text": "Black text on white background", "isCorrect": false },
          { "text": "Gray text on white background", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Which change improves readability for visually impaired users?",
        "options": [
          { "text": "Using small font sizes", "isCorrect": false },
          { "text": "Ensuring high contrast", "isCorrect": true },
          { "text": "Using thin, light fonts", "isCorrect": false },
          { "text": "Placing text over busy images", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What should be included for all brand images on a website to improve accessibility?",
        "options": [
          { "text": "Detailed alt text descriptions", "isCorrect": true },
          { "text": "Metadata tags", "isCorrect": false },
          { "text": "Copyright info", "isCorrect": false },
          { "text": "File size annotations", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Which font style is generally easier to read for users with dyslexia?",
        "options": [
          { "text": "Handwritten script", "isCorrect": false },
          { "text": "Dense serif", "isCorrect": false },
          { "text": "Simple sans-serif", "isCorrect": true },
          { "text": "Very condensed font", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Which design feature helps users with low vision?",
        "options": [
          { "text": "Low contrast text", "isCorrect": false },
          { "text": "Small buttons", "isCorrect": false },
          { "text": "Large clickable targets", "isCorrect": true },
          { "text": "Tiny icons", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "To ensure color accessibility, you should:",
        "options": [
          { "text": "Only use brand colors exactly", "isCorrect": false },
          { "text": "Test color combinations for sufficient contrast", "isCorrect": true },
          { "text": "Avoid text altogether", "isCorrect": false },
          { "text": "Use as many colors as possible", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "In a dark mode version of a website, what should designers be mindful of?",
        "options": [
          { "text": "Keeping the same background color as in light mode", "isCorrect": false },
          { "text": "Adjusting colors to maintain contrast", "isCorrect": true },
          { "text": "Reducing font sizes", "isCorrect": false },
          { "text": "Removing images", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Which tool can assist with checking color contrast?",
        "options": [
          { "text": "Social media analytics", "isCorrect": false },
          { "text": "A contrast ratio checker", "isCorrect": true },
          { "text": "Email marketing software", "isCorrect": false },
          { "text": "A printer calibration tool", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What is the purpose of accessibility guidelines in branding?",
        "options": [
          { "text": "To create barriers for some users", "isCorrect": false },
          { "text": "To ensure all audiences can perceive brand messages", "isCorrect": true },
          { "text": "To make design more complex", "isCorrect": false },
          { "text": "To restrict use of color", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "Which inconsistency is illustrated?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748338476/e26fecb0-b5d4-4a85-bc90-8941fd1883e2_xzmivo.png",
        "options": [
          { "text": "The logo colors are not consistent across platforms", "isCorrect": true },
          { "text": "The logo shapes are identical", "isCorrect": false },
          { "text": "Both use the same monogram", "isCorrect": false },
          { "text": "The font sizes are identical", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "What inconsistency is shown?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748338473/60a77623-9e95-4ba3-96bc-64d718d5c25d_om6mep.png",
        "options": [
          { "text": "The icon is missing on the flyer", "isCorrect": true },
          { "text": "The color of text is consistent", "isCorrect": false },
          { "text": "The wordmark font is changed", "isCorrect": false },
          { "text": "The tagline font is different", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "Which accessibility issue is present?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748338470/c05e00f1-e9ff-4404-832e-bfcaf5952258_frmhwi.png",
        "options": [
          { "text": "The fonts are too large", "isCorrect": false },
          { "text": "The layout is symmetrical", "isCorrect": false },
          { "text": "The text contrast is too low", "isCorrect": true },
          { "text": "The button color is too bright", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "What should be checked for this palette?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748338468/e994d4fb-af7e-41d4-9590-038ffbc1a8ea_hvh3np.png",
        "options": [
          { "text": "Number of colors for printing", "isCorrect": false },
          { "text": "Color contrast for readability", "isCorrect": true },
          { "text": "Font choices", "isCorrect": false },
          { "text": "Asset file formats", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "If the brand voice is playful, which notification matches it?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748338467/d30b1fa6-d69a-41c3-91d1-d5971491be40_nndslp.png",
        "options": [
          { "text": "The left notification", "isCorrect": true },
          { "text": "The right notification", "isCorrect": false },
          { "text": "Both notifications", "isCorrect": false },
          { "text": "Neither notification", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "Which CTA better reflects a casual, friendly brand voice?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748338465/99d686bd-337f-41a3-a854-172f3ec99fdb_tvbeaz.png",
        "options": [
          { "text": "\"Learn More\"", "isCorrect": false },
          { "text": "\"Join the fun!\"", "isCorrect": true },
          { "text": "Both are equally casual", "isCorrect": false },
          { "text": "Neither is appropriate", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "What accessibility issue might this cause?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748338507/18448c02-7ac2-4824-97bb-24e3927f653b_bffyfz.png",
        "options": [
          { "text": "Too much text on screen", "isCorrect": false },
          { "text": "Buttons are too large", "isCorrect": false },
          { "text": "Icons might be unclear without text labels", "isCorrect": true },
          { "text": "Color scheme is too bright", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "This is an example of what practice?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748338503/b6689b58-6e4c-4c97-94c4-ae1c0f6045bb_ce9z7v.png",
        "options": [
          { "text": "Confusing branding", "isCorrect": false },
          { "text": "Using a simplified logo icon for small sizes", "isCorrect": true },
          { "text": "Random logo changes", "isCorrect": false },
          { "text": "Logo misuse", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "What is demonstrated here?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748338501/fc527d3c-16be-4626-92f7-9192f7d4712b_j4vow4.png",
        "options": [
          { "text": "Confusing branding", "isCorrect": false },
          { "text": "Incompatible color use", "isCorrect": false },
          { "text": "Layout imbalance", "isCorrect": false },
          { "text": "A responsive logo system adapting to context", "isCorrect": true },
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "What can be said about the brand voice consistency across these tweets?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748338478/1825dcd2-26ca-468a-82b9-2cabf20342b2_mbhgqb.png",
        "options": [
          { "text": "The tweets have conflicting tones", "isCorrect": false },
          { "text": "Both tweets use a similar friendly tone", "isCorrect": true },
          { "text": "Only the first tweet matches the brand voice", "isCorrect": false },
          { "text": "Only the second tweet matches the brand voice", "isCorrect": false }
        ],
        "difficulty": "hard"
      }
    ],
    isAvailable : true,
    category : 'Brand Designer'
  },

]

const newVideoEditorTemplates = [
  {
    title : 'Level 1',
    questions : [
      {
        "questionType": "text",
        "text": "What is the first step to trim a clip in a timeline?",
        "options": [
          { "text": "Click the Razor Tool icon in the toolbar", "isCorrect": false },
          { "text": "Move the playhead to the cut point", "isCorrect": false },
          { "text": "Hover the mouse over the edge of the clip and drag the edge to shorten or lengthen it", "isCorrect": true },
          { "text": "Select the clip and press Ctrl+T", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "In a typical video editing interface, what is the panel that displays your media files (videos, images, audio) called?",
        "options": [
          { "text": "Timeline panel", "isCorrect": false },
          { "text": "Project panel", "isCorrect": true },
          { "text": "Effects panel", "isCorrect": false },
          { "text": "Preview monitor", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which keyboard shortcut is commonly used to split (cut) a clip at the playhead location in many NLEs (e.g., Premiere Pro)?",
        "options": [
          { "text": "Ctrl+K (Windows) / Command+K (macOS)", "isCorrect": true },
          { "text": "Ctrl+X", "isCorrect": false },
          { "text": "Ctrl+Shift+Z", "isCorrect": false },
          { "text": "Ctrl+Alt+S", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What is the default frame size (aspect ratio) for Full HD video?",
        "options": [
          { "text": "720×576 (4:3)", "isCorrect": false },
          { "text": "1920×1080 (16:9)", "isCorrect": true },
          { "text": "1280×720 (16:9)", "isCorrect": false },
          { "text": "3840×2160 (16:9)", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which tool or mode would you use to insert video clips into the timeline without overwriting existing clips?",
        "options": [
          { "text": "Overwrite mode", "isCorrect": false },
          { "text": "Insert mode (when dragging or using the Insert button)", "isCorrect": true },
          { "text": "Razor tool", "isCorrect": false },
          { "text": "Slip tool", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "When exporting a video for web playback (e.g. YouTube), which container format is most common?",
        "options": [
          { "text": "AVI", "isCorrect": false },
          { "text": "MP4 (H.264)", "isCorrect": true },
          { "text": "MOV (QuickTime)", "isCorrect": false },
          { "text": "FLV", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What is the function of the Program Monitor in editing software?",
        "options": [
          { "text": "It shows the list of imported media.", "isCorrect": false },
          { "text": "It allows live previewing of your final rendered export.", "isCorrect": false },
          { "text": "It displays the video playback of the timeline sequence.", "isCorrect": true },
          { "text": "It shows tool icons (e.g., razor, hand, etc.).", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which workspace view allows you to see multiple camera angles at once for multicam editing?",
        "options": [
          { "text": "Montage mode", "isCorrect": false },
          { "text": "Multicam or Multi-camera view", "isCorrect": true },
          { "text": "Color grading mode", "isCorrect": false },
          { "text": "Audio mixer mode", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What does it mean to “ripple delete” a gap between clips?",
        "options": [
          { "text": "Delete the gap without moving any other clips.", "isCorrect": false },
          { "text": "Delete the gap and automatically close the space by shifting later clips left.", "isCorrect": true },
          { "text": "Delete only the audio in the gap.", "isCorrect": false },
          { "text": "Apply a ripple dissolve transition.", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What is a cross-dissolve used for in video editing?",
        "options": [
          { "text": "Merging audio tracks", "isCorrect": false },
          { "text": "Fading one clip into the next clip (transition)", "isCorrect": true },
          { "text": "Adjusting color balance", "isCorrect": false },
          { "text": "Splicing two clips sharply (hard cut)", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which menu would you access to export your edited video from Adobe Premiere Pro?",
        "options": [
          { "text": "File > Export > Media", "isCorrect": true },
          { "text": "Window > Project", "isCorrect": false },
          { "text": "Edit > Export", "isCorrect": false },
          { "text": "Sequence > Render", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "In most NLEs, what happens if you move the playhead while holding the Shift key and then make a cut?",
        "options": [
          { "text": "It creates a subclip.", "isCorrect": false },
          { "text": "It locks the cut to keyframes.", "isCorrect": false },
          { "text": "It applies a transition.", "isCorrect": false },
          { "text": "Nothing special; Shift generally doesn’t change playhead behavior for cuts.", "isCorrect": true }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What are “safe margins” (title-safe and action-safe) used for?",
        "options": [
          { "text": "Adding borders to video", "isCorrect": false },
          { "text": "Ensuring overlays stay within visible area on all displays", "isCorrect": false },
          { "text": "Guidelines to keep important text/graphics visible on all screens", "isCorrect": true },
          { "text": "Reducing color gamut for broadcast", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What is the purpose of an adjustment layer in Premiere Pro or DaVinci Resolve?",
        "options": [
          { "text": "To lock the duration of clips", "isCorrect": false },
          { "text": "To apply effects (e.g., color correction) uniformly to underlying clips", "isCorrect": true },
          { "text": "To generate keyframes", "isCorrect": false },
          { "text": "To import media assets", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which file format is commonly used for an image sequence export (frames)?",
        "options": [
          { "text": "JPG", "isCorrect": false },
          { "text": "PNG or TIFF sequence", "isCorrect": true },
          { "text": "DOCX", "isCorrect": false },
          { "text": "MP3", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What does “keyframing” allow you to do in video editing?",
        "options": [
          { "text": "Encrypt your project file", "isCorrect": false },
          { "text": "Animate changes (e.g., position, opacity) over time by setting start/end values", "isCorrect": true },
          { "text": "Automatically color-correct footage", "isCorrect": false },
          { "text": "Merge multiple audio tracks", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "When syncing external audio with footage, which action helps align clips?",
        "options": [
          { "text": "Playing them backward", "isCorrect": false },
          { "text": "Aligning waveforms or using sync markers", "isCorrect": true },
          { "text": "Converting audio to mono", "isCorrect": false },
          { "text": "Changing the project frame rate", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What color is typically used to indicate a disabled track or muted clip? (In many timelines)",
        "options": [
          { "text": "Green", "isCorrect": false },
          { "text": "Red", "isCorrect": false },
          { "text": "Blue", "isCorrect": false },
          { "text": "Gray (often grayed-out)", "isCorrect": true }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which aspect ratio corresponds to “1.85:1”, common in feature films?",
        "options": [
          { "text": "16:9", "isCorrect": false },
          { "text": "1.33:1", "isCorrect": false },
          { "text": "2.39:1 (approx 2.40:1)", "isCorrect": false },
          { "text": "1.85:1 itself (the question already states it)", "isCorrect": true }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What does it mean to “nest” a sequence/clip in Premiere Pro?",
        "options": [
          { "text": "To compress it in H.264.", "isCorrect": false },
          { "text": "To place one sequence inside another, treating it like a single clip.", "isCorrect": true },
          { "text": "To convert it to a proxy.", "isCorrect": false },
          { "text": "To apply 3D effects.", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "In Premiere Pro, what panel shows the video frames of clips in your project when you click on them (or press F)?",
        "options": [
          { "text": "Program Monitor", "isCorrect": false },
          { "text": "Audio Meters", "isCorrect": false },
          { "text": "Source Monitor", "isCorrect": true },
          { "text": "Effects Controls", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What is the primary purpose of the “Rolling Edit” tool?",
        "options": [
          { "text": "Delete gaps between clips.", "isCorrect": false },
          { "text": "Adjust the edit point between two clips without changing overall duration.", "isCorrect": true },
          { "text": "Slip the clip contents.", "isCorrect": false },
          { "text": "Move a clip along the timeline.", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which transition is most appropriate for showing a passage of time?",
        "options": [
          { "text": "Hard cut", "isCorrect": false },
          { "text": "Dissolve (fade)", "isCorrect": true },
          { "text": "Jump cut", "isCorrect": false },
          { "text": "Wipe", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What does it mean if an audio track shows “peaking” in the level meter?",
        "options": [
          { "text": "It is silent.", "isCorrect": false },
          { "text": "It has no audio.", "isCorrect": false },
          { "text": "It is too loud (clipping) and distorting.", "isCorrect": true },
          { "text": "It is stereo instead of mono.", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What is the difference between a codec and a container?",
        "options": [
          { "text": "Container holds files, codec holds devices.", "isCorrect": false },
          { "text": "Codec is hardware, container is software.", "isCorrect": false },
          { "text": "Codec compresses video/audio, container is the file format holding the streams (e.g., MP4, MOV).", "isCorrect": true },
          { "text": "No difference; they are synonyms.", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which export setting affects quality most when targeting web streaming?",
        "options": [
          { "text": "Frame rate", "isCorrect": false },
          { "text": "Bitrate", "isCorrect": true },
          { "text": "Pixel aspect ratio", "isCorrect": false },
          { "text": "Resolution display only", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What is typically the last step before delivering a video project?",
        "options": [
          { "text": "Importing media", "isCorrect": false },
          { "text": "Logging footage", "isCorrect": false },
          { "text": "Exporting/rendering the final sequence", "isCorrect": true },
          { "text": "Syncing audio", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "How would you speed up a clip to be 2× faster in the timeline?",
        "options": [
          { "text": "Drag the clip while holding Shift.", "isCorrect": false },
          { "text": "Right-click clip and choose Speed/Duration, then set to 200%.", "isCorrect": true },
          { "text": "Duplicate it.", "isCorrect": false },
          { "text": "Create a nested sequence.", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What does “rendering in/working area” do in most editors?",
        "options": [
          { "text": "Deletes selected clips", "isCorrect": false },
          { "text": "Pre-renders effects/compositions for smoother playback in that region", "isCorrect": true },
          { "text": "Exports the entire project", "isCorrect": false },
          { "text": "Creates a backup of the project", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What is “J-Cut” or “L-Cut” editing?",
        "options": [
          { "text": "Overlaying text", "isCorrect": false },
          { "text": "Audio from the next/previous clip overlaps onto the current clip before/after the cut", "isCorrect": true },
          { "text": "Cutting off video heads", "isCorrect": false },
          { "text": "A type of transition effect", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which of these is a common keyboard shortcut to undo an edit?",
        "options": [
          { "text": "Ctrl+Y (Windows) / Command+Shift+Z (macOS)", "isCorrect": false },
          { "text": "Ctrl+S (Windows) / Command+S (macOS)", "isCorrect": false },
          { "text": "Ctrl+Z (Windows) / Command+Z (macOS)", "isCorrect": true },
          { "text": "Ctrl+U (Windows) / Command+U (macOS)", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "In Premiere Pro, where do you adjust clip opacity or blend modes?",
        "options": [
          { "text": "Effects Controls panel", "isCorrect": false },
          { "text": "Audio Mixer panel", "isCorrect": false },
          { "text": "Effect Controls panel (Opacity section)", "isCorrect": true },
          { "text": "Lumetri Color panel", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What is the purpose of “color wheels” in color grading tools like DaVinci Resolve?",
        "options": [
          { "text": "To rotate the image", "isCorrect": false },
          { "text": "To apply color LUTs", "isCorrect": false },
          { "text": "To adjust contrast curves", "isCorrect": false },
          { "text": "To balance and adjust shadows, midtones, and highlights in color", "isCorrect": true }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which panel in DaVinci Resolve shows video transitions and generators?",
        "options": [
          { "text": "Media Pool", "isCorrect": false },
          { "text": "Timeline", "isCorrect": false },
          { "text": "Inspector", "isCorrect": false },
          { "text": "Effects Library (with categories like Transitions)", "isCorrect": true }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "If you see a yellow triangle on a clip in the timeline, what does it usually mean?",
        "options": [
          { "text": "The clip is locked.", "isCorrect": false },
          { "text": "The clip is muted.", "isCorrect": false },
          { "text": "A render (pre-render) is required for real-time playback.", "isCorrect": true },
          { "text": "The clip is offline.", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "Which video editing software is shown in the image?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748344786/4559636e-0095-4ed8-9794-1e246540c900_ysv99k.png",
        "options": [
          { "text": "Adobe Premiere Pro", "isCorrect": false },
          { "text": "Final Cut Pro X", "isCorrect": false },
          { "text": "DaVinci Resolve", "isCorrect": true },
          { "text": "Sony Vegas Pro", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "In the image, what does the white rectangular overlay around the video frame indicate?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748344782/8fcaf528-22ca-4671-a4a6-51fa92b58067_vio1q6.png",
        "options": [
          { "text": "Zoom marquee selection", "isCorrect": false },
          { "text": "Color correction scope", "isCorrect": false },
          { "text": "Title/action safe areas", "isCorrect": true },
          { "text": "Crop boundaries", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "Which software is the person using for video editing in this image?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748344779/6f9d7abd-862f-476c-be2f-92f8b9f9b3fe_jvabat.png",
        "options": [
          { "text": "Adobe Premiere Pro", "isCorrect": true },
          { "text": "Final Cut Pro X", "isCorrect": false },
          { "text": "DaVinci Resolve", "isCorrect": false },
          { "text": "iMovie", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "What is the name of the highlighted panel (outlined in green) at the bottom of this editing interface?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748344776/5a90885f-8304-43e4-9ae9-197747d8260b_tdu8iu.png",
        "options": [
          { "text": "Source Monitor", "isCorrect": false },
          { "text": "Timeline", "isCorrect": true },
          { "text": "Program Monitor", "isCorrect": false },
          { "text": "Media Library", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "In the timeline shown, what do the green bars on the lower track represent?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748344773/9a65c69d-72e7-43f9-94f0-0ac4a749ce54_feeyyw.png",
        "options": [
          { "text": "Video clips", "isCorrect": false },
          { "text": "Audio waveforms (audio tracks)", "isCorrect": true },
          { "text": "Adjustment layers", "isCorrect": false },
          { "text": "Placeholders", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "What is the purpose of the three color wheels labeled “Lift, Gamma, Gain” in the image?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748344770/89ee89e0-557b-4c93-ab99-0890d493be36_pxvfan.png",
        "options": [
          { "text": "Adjusting audio levels", "isCorrect": false },
          { "text": "Navigating the timeline", "isCorrect": false },
          { "text": "Applying transitions", "isCorrect": false },
          { "text": "Adjusting shadows (Lift), midtones (Gamma), and highlights (Gain) color balance", "isCorrect": true }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "What is the purpose of the pink “Adjustment Layer” clip visible in the timeline?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748344769/1651d84c-3796-4064-8be1-67cfd135f254_fvdibv.png",
        "options": [
          { "text": "It marks a chapter point.", "isCorrect": false },
          { "text": "It is a color swatch.", "isCorrect": false },
          { "text": "It applies effects or color correction to all clips underneath it.", "isCorrect": true },
          { "text": "It duplicates the underlying clip.", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "What does the scissor (razor) icon on the timeline indicate?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748344766/0ccc6941-bbbe-48f3-b186-fa5583f2341c_i3zkdf.png",
        "options": [
          { "text": "Rendering in progress", "isCorrect": false },
          { "text": "A transition point", "isCorrect": false },
          { "text": "That the editor is using the Razor (Cut) tool to split the clip", "isCorrect": true },
          { "text": "A disabled clip", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "What is the name of the color panel on the right with three color wheels?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748344790/c0eceace-4cac-4440-a496-55578a908c50_kxojsx.png",
        "options": [
          { "text": "Effects", "isCorrect": false },
          { "text": "Lumetri Color", "isCorrect": true },
          { "text": "Audio Mixer", "isCorrect": false },
          { "text": "Media Browser", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "In the toolbar below the video preview (transport controls), what function does the triangle “Play” button perform?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748344787/08be2653-103a-4472-a0bf-81cf96c9f2b8_bn40mz.png",
        "options": [
          { "text": "Pause playback", "isCorrect": false },
          { "text": "Play or resume playback", "isCorrect": true },
          { "text": "Stop playback", "isCorrect": false },
          { "text": "Step forward one frame", "isCorrect": false }
        ],
        "difficulty": "easy"
      }
    ],
    isAvailable : true,
    category : 'Video Editor'
  },
  {
    title : 'Level 2',
    questions : [
      {
        "questionType": "text",
        "text": "Which transition is typically smoother for combining two clips without a noticeable cut?",
        "options": [
          { "text": "Hard Cut", "isCorrect": false },
          { "text": "Fade to Black", "isCorrect": false },
          { "text": "Cross Dissolve (Transition)", "isCorrect": true },
          { "text": "Instant Cut", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "How do you add a text overlay (title) on top of the video in Premiere Pro?",
        "options": [
          { "text": "Use the Razor tool on the clip.", "isCorrect": false },
          { "text": "Drag the clip above the video.", "isCorrect": false },
          { "text": "Use the Graphics/Text tool to place text on a new layer above the video track.", "isCorrect": true },
          { "text": "Increase the clip’s opacity.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "If your camera footage was shot at 24 fps and you add 30 fps b-roll on top, how should you interpret the frame rates?",
        "options": [
          { "text": "It won’t play at all.", "isCorrect": false },
          { "text": "Premiere will refuse to mix frame rates.", "isCorrect": false },
          { "text": "The project timeline dictates playback speed; mixing is allowed but clips may be interpreted (e.g., dropped frames).", "isCorrect": true },
          { "text": "Both clips play at 60 fps automatically.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Which shortcut toggles the Razor tool in Premiere Pro?",
        "options": [
          { "text": "R (Razor Tool)", "isCorrect": false },
          { "text": "C (Razor Tool)", "isCorrect": true },
          { "text": "X (Rate Stretch Tool)", "isCorrect": false },
          { "text": "D (in DaVinci Resolve)", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "How can you quickly add a keyframe for audio volume in the timeline?",
        "options": [
          { "text": "Right-click the timeline and select “Add Keyframe.”", "isCorrect": false },
          { "text": "Expand the audio track and Ctrl-click (Cmd-click) on the rubber band line.", "isCorrect": true },
          { "text": "Use the Razor tool on the audio track.", "isCorrect": false },
          { "text": "Hold Alt and press V.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What is a good method to ensure audio clips are kept in sync after trimming video?",
        "options": [
          { "text": "Lock the video track.", "isCorrect": false },
          { "text": "Use only one camera.", "isCorrect": false },
          { "text": "Link the audio and video clips before trimming.", "isCorrect": true },
          { "text": "Convert them to mono.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "When editing multicam footage, what is a common step after creating a multicam sequence?",
        "options": [
          { "text": "Export immediately.", "isCorrect": false },
          { "text": "Enable multi-camera playback and use the number keys to switch angles during playback.", "isCorrect": true },
          { "text": "Delete all but one angle.", "isCorrect": false },
          { "text": "Flatten the sequence.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What does the “fit to fill” edit in Premiere Pro do?",
        "options": [
          { "text": "It crops the clip.", "isCorrect": false },
          { "text": "Adjusts clip speed to fill a set duration on the timeline.", "isCorrect": true },
          { "text": "Rotates the clip.", "isCorrect": false },
          { "text": "Adds a black border.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Which timeline preview is ideal for ensuring continuity between two shots?",
        "options": [
          { "text": "Audio waveforms only", "isCorrect": false },
          { "text": "Frame-by-frame stepping around the cut point", "isCorrect": true },
          { "text": "Timeline zoomed out fully", "isCorrect": false },
          { "text": "The Effects panel", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What aspect ratio does “9:16” refer to?",
        "options": [
          { "text": "Standard 16:9 landscape", "isCorrect": false },
          { "text": "Vertical video (taller than wide), often for phone/portrait video", "isCorrect": true },
          { "text": "Square video", "isCorrect": false },
          { "text": "Widescreen cinema scope", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Which of these is a common keyboard shortcut to cut (delete) a clip selection?",
        "options": [
          { "text": "Delete (or Backspace)", "isCorrect": true },
          { "text": "Ctrl+K", "isCorrect": false },
          { "text": "Ctrl+M", "isCorrect": false },
          { "text": "Ctrl+U", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "If an audio track’s meter shows red, what action is typically needed?",
        "options": [
          { "text": "Increase the gain.", "isCorrect": false },
          { "text": "Lower the volume to avoid clipping.", "isCorrect": true },
          { "text": "Duplicate the track.", "isCorrect": false },
          { "text": "Mute the track.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "You need to quickly add a transition between two clips. Where do you drag a “Cross Dissolve” effect?",
        "options": [
          { "text": "Onto the clips in the timeline, straddling the cut.", "isCorrect": true },
          { "text": "Into the Project panel.", "isCorrect": false },
          { "text": "Above the clips on a higher track.", "isCorrect": false },
          { "text": "On the program monitor.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Which timeline tool allows you to trim the In and Out points of a clip without changing its position?",
        "options": [
          { "text": "Razor tool", "isCorrect": false },
          { "text": "Ripple Edit tool", "isCorrect": false },
          { "text": "Slip tool", "isCorrect": true },
          { "text": "Slide tool", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What is the function of “Waveform” and “Vectorscope” in color grading?",
        "options": [
          { "text": "They generate transitions.", "isCorrect": false },
          { "text": "They display the luminance and color distribution of the image for accurate color correction.", "isCorrect": true },
          { "text": "They encode video.", "isCorrect": false },
          { "text": "They control audio volume.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "In DaVinci Resolve, what is the default color space for HD output?",
        "options": [
          { "text": "Rec.601", "isCorrect": false },
          { "text": "Rec.709", "isCorrect": true },
          { "text": "Rec.2020", "isCorrect": false },
          { "text": "sRGB", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Which keyboard shortcut opens the “Export Media” dialog in Premiere Pro?",
        "options": [
          { "text": "Ctrl+S", "isCorrect": false },
          { "text": "Ctrl+M (Windows) / Cmd+M (macOS)", "isCorrect": true },
          { "text": "F12", "isCorrect": false },
          { "text": "Ctrl+E", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What is the purpose of “nesting” tracks in Premiere?",
        "options": [
          { "text": "To create a stop-motion animation.", "isCorrect": false },
          { "text": "To flatten audio tracks.", "isCorrect": false },
          { "text": "To group multiple clips into a single nested sequence for easier editing.", "isCorrect": true },
          { "text": "To zoom into timeline.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Which codec would you choose for the highest-quality archival export?",
        "options": [
          { "text": "H.264 (MP4)", "isCorrect": false },
          { "text": "ProRes (or DNxHD)", "isCorrect": true },
          { "text": "FLV", "isCorrect": false },
          { "text": "GIF", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "When performing multi-camera editing, what indicates which camera angle is active on a track?",
        "options": [
          { "text": "The color of the track", "isCorrect": false },
          { "text": "A highlight around the camera number", "isCorrect": false },
          { "text": "A colored badge or tally on the clip in the timeline", "isCorrect": true },
          { "text": "Nothing; all angles look identical", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "If your project settings are 1080p but you drag a 4K clip into the timeline, what happens by default?",
        "options": [
          { "text": "It forces the timeline to 4K.", "isCorrect": false },
          { "text": "The 4K clip is downscaled to 1080p in the timeline view (but retains original quality for export).", "isCorrect": true },
          { "text": "It won’t import.", "isCorrect": false },
          { "text": "The clip plays in 4:3.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What is a “marker” used for on a timeline?",
        "options": [
          { "text": "To save the project", "isCorrect": false },
          { "text": "To denote important points (like sync points or edits) with notes.", "isCorrect": true },
          { "text": "To fade audio", "isCorrect": false },
          { "text": "To annotate color grade", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "How can you quickly disable (mute) a video track in the timeline?",
        "options": [
          { "text": "Press Ctrl+L", "isCorrect": false },
          { "text": "Click the eye icon next to the track name.", "isCorrect": false },
          { "text": "Click the FX icon (or Toggle Track Output) to disable it.", "isCorrect": true },
          { "text": "Drag clips out of it.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Which aspect ratio is used for vertical phone videos (like Instagram Stories)?",
        "options": [
          { "text": "16:9", "isCorrect": false },
          { "text": "9:16", "isCorrect": true },
          { "text": "4:3", "isCorrect": false },
          { "text": "1:1", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What is the common function of the “A1, A2” or “V1, V2” labels in a timeline?",
        "options": [
          { "text": "They mark effect presets.", "isCorrect": false },
          { "text": "They indicate different audio (A) or video (V) tracks.", "isCorrect": true },
          { "text": "They are markers.", "isCorrect": false },
          { "text": "They are file names.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "If an audio clip’s end is not aligned with its waveform peak, what likely happened?",
        "options": [
          { "text": "The clip is corrupted.", "isCorrect": false },
          { "text": "The clip was trimmed at a non-silent point, causing a pop/click.", "isCorrect": true },
          { "text": "It’s reverse.", "isCorrect": false },
          { "text": "It’s been pitched.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "In Premiere Pro, where do you find common transition effects like “Cross Dissolve” and “Dip to Black”?",
        "options": [
          { "text": "Effects panel under Video Transitions category.", "isCorrect": true },
          { "text": "Media Browser", "isCorrect": false },
          { "text": "The timeline menu", "isCorrect": false },
          { "text": "File menu", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What is the primary difference between “Cut” and “Dissolve” transitions?",
        "options": [
          { "text": "Cut is free, dissolve costs money.", "isCorrect": false },
          { "text": "Cut is immediate; dissolve gradually blends two clips.", "isCorrect": true },
          { "text": "Cut changes audio, dissolve does not.", "isCorrect": false },
          { "text": "No difference; they are synonyms.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "How do you usually make a multicam sequence in Premiere Pro?",
        "options": [
          { "text": "Edit manually side-by-side.", "isCorrect": false },
          { "text": "Import as one file.", "isCorrect": false },
          { "text": "Select multiple clips and choose “Create Multi-camera Source Sequence.”", "isCorrect": true },
          { "text": "Use the Warp Stabilizer.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Which shortcut toggles the Snap (magnet) function in the timeline?",
        "options": [
          { "text": "S", "isCorrect": true },
          { "text": "N", "isCorrect": false },
          { "text": "M", "isCorrect": false },
          { "text": "P", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "When are “proxy” files used in editing?",
        "options": [
          { "text": "Exporting only.", "isCorrect": false },
          { "text": "During editing to replace high-res footage with lower-res versions for smoother playback.", "isCorrect": true },
          { "text": "Recording camera.", "isCorrect": false },
          { "text": "Audio mixing.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "In DaVinci Resolve, what is the “Deliver” page used for?",
        "options": [
          { "text": "Editing timeline", "isCorrect": false },
          { "text": "Color grading", "isCorrect": false },
          { "text": "Exporting/rendering the final video", "isCorrect": true },
          { "text": "Adding effects", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What happens if you apply an effect to an adjustment layer instead of directly to a clip?",
        "options": [
          { "text": "Only the adjustment layer is affected.", "isCorrect": false },
          { "text": "The effect is pre-rendered.", "isCorrect": false },
          { "text": "The effect applies to all clips under that adjustment layer.", "isCorrect": true },
          { "text": "It crashes.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Which metric indicates color saturation and intensity in a waveform monitor?",
        "options": [
          { "text": "Luminance", "isCorrect": false },
          { "text": "Hue", "isCorrect": false },
          { "text": "Vectorscope", "isCorrect": true },
          { "text": "Alpha channel", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "When multicam editing, what key do you press to cut and switch to camera 2 while playing?",
        "options": [
          { "text": "1", "isCorrect": false },
          { "text": "2", "isCorrect": true },
          { "text": "5", "isCorrect": false },
          { "text": "Shift+2", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "What editing technique is likely being used in the timeline shown?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748345734/a39d7924-b5b9-4a8c-a436-7cf862bfa39d_hidduh.png",
        "options": [
          { "text": "Color grading", "isCorrect": false },
          { "text": "Multi-camera editing", "isCorrect": true },
          { "text": "Single-camera narrative", "isCorrect": false },
          { "text": "Stop-motion animation", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "What does this image illustrate?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748345724/02afc62c-32dd-4cc0-85f0-1845a3aeb0e6_ah5cyr.png",
        "options": [
          { "text": "A glitch in playback", "isCorrect": false },
          { "text": "Before and after color grading (desaturated vs color-corrected)", "isCorrect": true },
          { "text": "A lens aperture comparison", "isCorrect": false },
          { "text": "A stereo video setup", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "Which post-production process is happening in this setup?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748345720/a1fbf37b-4cbf-4bdd-8909-70c3507d4bbb_jawupr.png",
        "options": [
          { "text": "Audio mixing", "isCorrect": false },
          { "text": "Editing cuts", "isCorrect": false },
          { "text": "Color correction/grading", "isCorrect": true },
          { "text": "Final rendering", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "What does the purple color of the clips most likely represent?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748345718/18a56208-3b22-4265-91f4-b588fb34809a_ekni6h.png",
        "options": [
          { "text": "Adjustment layers", "isCorrect": false },
          { "text": "Video clips", "isCorrect": true },
          { "text": "Audio tracks", "isCorrect": false },
          { "text": "Title overlays", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "Which piece of equipment is shown in the foreground?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748345716/aa367dca-ddc6-46b5-bfb1-dac9e89e0f13_roa3o1.png",
        "options": [
          { "text": "Camera", "isCorrect": false },
          { "text": "Loudspeaker", "isCorrect": false },
          { "text": "Microphone", "isCorrect": true },
          { "text": "MIDI controller", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "What type of editing is being performed by the person in this image?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748345732/f4082222-5a1d-46bd-9b96-705ae585abe8_aurt8d.png",
        "options": [
          { "text": "Video editing", "isCorrect": false },
          { "text": "Music/audio editing", "isCorrect": true },
          { "text": "Photo editing", "isCorrect": false },
          { "text": "Text editing", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "What activity is the person most likely performing?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748345742/9d89906c-4a1d-4b5d-9e96-27f763504ee6_isrpdp.png",
        "options": [
          { "text": "Filming a movie scene", "isCorrect": false },
          { "text": "Conducting a live concert", "isCorrect": false },
          { "text": "Recording a voiceover or podcast", "isCorrect": true },
          { "text": "Playing an instrument", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "What is the primary purpose of this room?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748345739/ee33191a-0f23-4f9b-a453-0f2229945e4d_vofjyp.png",
        "options": [
          { "text": "Home office", "isCorrect": false },
          { "text": "Photography studio", "isCorrect": false },
          { "text": "Audio mixing/recording studio", "isCorrect": true },
          { "text": "Editing bay for video", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "Which role does this person most likely have?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748345736/35e5d73b-b709-4b61-be75-8df966866bce_ibqor4.png",
        "options": [
          { "text": "Director", "isCorrect": false },
          { "text": "Cameraman", "isCorrect": false },
          { "text": "Audio engineer or producer", "isCorrect": true },
          { "text": "Actor", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "What is the device shown?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748345727/82dcaf39-0f46-441d-94ca-76596bbe6244_fsjybr.png",
        "options": [
          { "text": "Video camera", "isCorrect": false },
          { "text": "Film projector", "isCorrect": false },
          { "text": "Reel-to-reel tape recorder (audio tape machine)", "isCorrect": true },
          { "text": "VHS player", "isCorrect": false }
        ],
        "difficulty": "medium"
      }
    ],
    isAvailable : true,
    category : 'Video Editor'
  },
  {
    title : "Level 3",
    questions : [
      {
        "questionType": "text",
        "text": "What narrative role does “pacing” play in video editing?",
        "options": [
          { "text": "It dictates color grading style.", "isCorrect": false },
          { "text": "It determines the rhythm of cuts and scenes to affect storytelling flow.", "isCorrect": true },
          { "text": "It affects audio compression.", "isCorrect": false },
          { "text": "It chooses camera angles.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "When preparing a video for Netflix or broadcast, which color space is often required?",
        "options": [
          { "text": "Rec.601", "isCorrect": false },
          { "text": "sRGB", "isCorrect": false },
          { "text": "Rec.709 (for HD) or Rec.2020 (for UHD) depending on specs", "isCorrect": true },
          { "text": "Adobe RGB", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What is an LUT (Lookup Table) used for in color grading?",
        "options": [
          { "text": "Audio equalization", "isCorrect": false },
          { "text": "Time remapping", "isCorrect": false },
          { "text": "Applying a preset color transformation (e.g., camera log to Rec.709)", "isCorrect": true },
          { "text": "Compression", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Why might an editor export using a “two-pass” encoding rather than “one-pass”?",
        "options": [
          { "text": "To double the frame rate.", "isCorrect": false },
          { "text": "To use twice as much disk space.", "isCorrect": false },
          { "text": "To improve quality for a given bitrate by analyzing first, encoding second.", "isCorrect": true },
          { "text": "It is faster.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What is the significance of matching “depth of field” between shots in continuity editing?",
        "options": [
          { "text": "It ensures audio sync.", "isCorrect": false },
          { "text": "It maintains visual consistency; mismatch can distract the viewer.", "isCorrect": true },
          { "text": "It changes frame rate.", "isCorrect": false },
          { "text": "It adjusts color profile.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Which editing strategy helps maintain “story continuity” through cuts?",
        "options": [
          { "text": "Jump cuts", "isCorrect": false },
          { "text": "Cut on motion or action", "isCorrect": false },
          { "text": "Cut on content (e.g., matching action or eye line)", "isCorrect": true },
          { "text": "Random transitions", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What is the purpose of a “preview render” on the timeline?",
        "options": [
          { "text": "To convert to black & white.", "isCorrect": false },
          { "text": "To create a smoother playback preview for complex effects.", "isCorrect": true },
          { "text": "To export the whole project.", "isCorrect": false },
          { "text": "To split audio.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What does “bitrate” influence in a final export?",
        "options": [
          { "text": "Color depth", "isCorrect": false },
          { "text": "Image/audio quality and file size", "isCorrect": true },
          { "text": "Resolution", "isCorrect": false },
          { "text": "Length of video", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Which parameter would you adjust to prevent clipping in exported video?",
        "options": [
          { "text": "Increase the frame rate.", "isCorrect": false },
          { "text": "Lower the bitrate or use a higher-quality codec.", "isCorrect": true },
          { "text": "Change resolution.", "isCorrect": false },
          { "text": "Remove audio.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What is an advantage of using embedded (in-camera) LUTs during shooting vs applying LUT in post?",
        "options": [
          { "text": "LUTs always damage footage quality.", "isCorrect": false },
          { "text": "In-camera LUTs reduce file size.", "isCorrect": false },
          { "text": "In-camera LUTs let the director preview color looks on-set, but post-LUT retains flexibility in grading.", "isCorrect": true },
          { "text": "There is no difference.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "When exporting for a mobile platform, why might you choose H.265 (HEVC) over H.264?",
        "options": [
          { "text": "H.265 isn’t supported anywhere.", "isCorrect": false },
          { "text": "It has worse quality at same file size.", "isCorrect": false },
          { "text": "Better compression (smaller file at same quality), but requires compatible playback.", "isCorrect": true },
          { "text": "It automatically adds subtitles.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "If after color grading your image looks too green on some monitors, what might be the cause?",
        "options": [
          { "text": "The file is corrupted.", "isCorrect": false },
          { "text": "Different color profile/gamut not accounted for (monitor not Rec.709 calibrated).", "isCorrect": true },
          { "text": "Too low bitrate.", "isCorrect": false },
          { "text": "Multi-cam sync issue.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What is the function of a waveform monitor’s parade display?",
        "options": [
          { "text": "To show RGB channels separately (Red, Green, Blue levels).", "isCorrect": true },
          { "text": "To optimize frame rate.", "isCorrect": false },
          { "text": "To align audio channels.", "isCorrect": false },
          { "text": "To list clip names.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "In a multicam workflow, what does “sync by timecode” do?",
        "options": [
          { "text": "It changes the project frame rate.", "isCorrect": false },
          { "text": "Aligns clips on the timeline based on embedded timecode, instead of audio.", "isCorrect": true },
          { "text": "It speeds up the timeline.", "isCorrect": false },
          { "text": "It creates a mirror image.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Which export setting is important for ensuring compatibility with social media platforms (e.g., Instagram)?",
        "options": [
          { "text": "Use black & white video.", "isCorrect": false },
          { "text": "Frame size and aspect ratio (e.g., 1080×1920 for vertical video)", "isCorrect": true },
          { "text": "Set frame rate to 120fps.", "isCorrect": false },
          { "text": "Include HDR.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What editing strategy can enhance a sense of urgency in a scene?",
        "options": [
          { "text": "Long static shots", "isCorrect": false },
          { "text": "Fast-paced cuts and quick reaction shots", "isCorrect": true },
          { "text": "Monologue with no cuts", "isCorrect": false },
          { "text": "Fade to black", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What is the purpose of “time remapping” or “speed ramping” in editing?",
        "options": [
          { "text": "Audio normalization.", "isCorrect": false },
          { "text": "Changing the playback speed of a clip over time (e.g., slow-motion ramp).", "isCorrect": true },
          { "text": "Cloning a clip.", "isCorrect": false },
          { "text": "Rotating the video orientation.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Why is it important to deliver an edit with the correct audio sample rate (e.g., 48 kHz) for video?",
        "options": [
          { "text": "It affects the color accuracy.", "isCorrect": false },
          { "text": "Most video standards (broadcast, film) use 48 kHz for sync purposes.", "isCorrect": true },
          { "text": "It changes the video resolution.", "isCorrect": false },
          { "text": "It speeds up playback.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What does “multicam cutting in realtime” mean?",
        "options": [
          { "text": "The project plays at 120 fps.", "isCorrect": false },
          { "text": "Switching angles live as the sequence plays, creating cuts automatically.", "isCorrect": true },
          { "text": "Rendering overnight.", "isCorrect": false },
          { "text": "Editing without looking at the screen.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What are “scopes” used for in color grading?",
        "options": [
          { "text": "Previewing video on different devices.", "isCorrect": false },
          { "text": "Automating cuts.", "isCorrect": false },
          { "text": "Measuring image properties (brightness, color distribution) objectively.", "isCorrect": true },
          { "text": "Mapping 3D transformations.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "In color grading, what is the “Rec.709” standard?",
        "options": [
          { "text": "A file format.", "isCorrect": false },
          { "text": "A color space and gamma standard for HDTV.", "isCorrect": true },
          { "text": "An audio codec.", "isCorrect": false },
          { "text": "A codec container.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Why might an editor use a “histogram” during grading?",
        "options": [
          { "text": "To check audio levels.", "isCorrect": false },
          { "text": "To adjust timeline zoom.", "isCorrect": false },
          { "text": "To see the distribution of brightness levels (exposure) in the image.", "isCorrect": true },
          { "text": "To generate subtitles.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What is one advantage of editing with proxy media when dealing with high-resolution footage?",
        "options": [
          { "text": "It improves final quality.", "isCorrect": false },
          { "text": "It allows smooth editing performance by using lower-res files.", "isCorrect": true },
          { "text": "It increases file size.", "isCorrect": false },
          { "text": "It removes the need for color grading.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "When exporting video for YouTube, which two-pass variable bitrate (VBR 2-pass) setting helps?",
        "options": [
          { "text": "It automatically picks the best music.", "isCorrect": false },
          { "text": "It focuses on keyframes only.", "isCorrect": false },
          { "text": "It provides higher consistent quality and smaller file size than single-pass at the same target.", "isCorrect": true },
          { "text": "It zips the file.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What is “rolling shutter” and how do editors mitigate its effects?",
        "options": [
          { "text": "A type of lens.", "isCorrect": false },
          { "text": "A camera sensor artifact causing skew; mitigated by stabilization or filters.", "isCorrect": true },
          { "text": "A timeline transition.", "isCorrect": false },
          { "text": "A shutter speed technique.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What file format is recommended for lossless archival of video projects?",
        "options": [
          { "text": "MP4/H.264", "isCorrect": false },
          { "text": "FLV", "isCorrect": false },
          { "text": "MOV/ProRes 4444 or uncompressed formats", "isCorrect": true },
          { "text": "GIF", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What does “beat matching” mean in video editing?",
        "options": [
          { "text": "Conforming to broadcast law.", "isCorrect": false },
          { "text": "Cutting and synchronizing edits to the tempo of the background music.", "isCorrect": true },
          { "text": "Color grading on music videos.", "isCorrect": false },
          { "text": "Equalizing audio tracks.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Why is it important to maintain a consistent white balance across shots?",
        "options": [
          { "text": "To ensure smooth camera movement.", "isCorrect": false },
          { "text": "To avoid jarring color shifts between shots and keep them looking natural.", "isCorrect": true },
          { "text": "It’s not important; random is fine.", "isCorrect": false },
          { "text": "To increase file compression.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What might cause a “jagged” or “stuttery” look in a slowed-down clip?",
        "options": [
          { "text": "High bitrate", "isCorrect": false },
          { "text": "Insufficient frame blending or interpolation when slowing footage.", "isCorrect": true },
          { "text": "Incorrect audio format.", "isCorrect": false },
          { "text": "Too much color saturation.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Which export codec is best for preserving maximum visual detail at the cost of larger files?",
        "options": [
          { "text": "MPEG-4 Part 2", "isCorrect": false },
          { "text": "ProRes 4444 or ProRes 422 HQ (Apple ProRes)", "isCorrect": true },
          { "text": "H.263", "isCorrect": false },
          { "text": "VP8", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What is “dynamic range” and why is it important?",
        "options": [
          { "text": "The length of a timeline.", "isCorrect": false },
          { "text": "The difference between darkest and brightest parts; higher range means more detail in shadows/highlights.", "isCorrect": true },
          { "text": "The number of color presets.", "isCorrect": false },
          { "text": "The zoom level in the editor.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "When compositing graphics onto video, what key factor ensures they blend naturally?",
        "options": [
          { "text": "Matching the frame rate.", "isCorrect": false },
          { "text": "Consistent perspective, lighting, and color grading.", "isCorrect": true },
          { "text": "Exporting as GIF.", "isCorrect": false },
          { "text": "Using black & white only.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Which parameter would you prioritize adjusting to reduce banding in a color-graded video?",
        "options": [
          { "text": "Video speed", "isCorrect": false },
          { "text": "Color bit depth (e.g., use 10-bit color) and dithering", "isCorrect": true },
          { "text": "Audio bitrate", "isCorrect": false },
          { "text": "Exposure time", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Why is consistency in audio loudness important across different shots or scenes?",
        "options": [
          { "text": "To save audio space.", "isCorrect": false },
          { "text": "To ensure a constant perceived volume for viewer comfort.", "isCorrect": true },
          { "text": "It’s not important.", "isCorrect": false },
          { "text": "To speed up export.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What does a J-cut achieve in storytelling?",
        "options": [
          { "text": "It is a special color effect.", "isCorrect": false },
          { "text": "It lets the sound of the upcoming scene start before the visual cut, easing transitions.", "isCorrect": true },
          { "text": "It triples the video speed.", "isCorrect": false },
          { "text": "It merges two shots seamlessly.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "In this image, the person is likely engaged in which stage of post-production?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748346986/ee4cd680-9e18-4c76-a3e3-a320040f50b7_clp4s9.png",
        "options": [
          { "text": "Final rendering", "isCorrect": false },
          { "text": "Color grading/checking edit against script", "isCorrect": true },
          { "text": "Foley recording", "isCorrect": false },
          { "text": "Lighting setup", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "Which panel is visible on the left laptop screen?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748346995/3790599b-290d-4e97-bc01-a839c15972b2_udmp9d.png",
        "options": [
          { "text": "Effects panel", "isCorrect": false },
          { "text": "Audio Mixer", "isCorrect": false },
          { "text": "Project/Media bin (clip thumbnails)", "isCorrect": true },
          { "text": "Color wheels", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "What device is the editor using to critically listen to the audio while editing?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748346989/a2946b50-0da6-4e2b-9e35-947b8e0fc47f_nt3nua.png",
        "options": [
          { "text": "Speakers", "isCorrect": false },
          { "text": "Headphones", "isCorrect": true },
          { "text": "The microphone", "isCorrect": false },
          { "text": "Audio interface", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "What is the editor most likely reviewing based on this image?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748346991/497c4ff5-0563-47ff-8f1a-4a9a9d38b405_twirvl.png",
        "options": [
          { "text": "Camera settings", "isCorrect": false },
          { "text": "Scene script or storyboard", "isCorrect": true },
          { "text": "Audio mixing levels", "isCorrect": false },
          { "text": "Raw footage metadata", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
    ],
    isAvailable : true,
    category : 'Video Editor'
  }
]

const newGraphicDesTemplates = [
  {
    title : 'Level 1',
    questions : [
      {
        "questionType": "text",
        "text": "Which Photoshop tool is used to select and move an entire layer or selection?",
        "options": [
          { "text": "Marquee Tool", "isCorrect": false },
          { "text": "Move Tool", "isCorrect": true },
          { "text": "Lasso Tool", "isCorrect": false },
          { "text": "Magic Wand Tool", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "In Adobe Illustrator, what is the purpose of artboards?",
        "options": [
          { "text": "To create 3D objects", "isCorrect": false },
          { "text": "To define separate design canvases within one document", "isCorrect": true },
          { "text": "To adjust color settings", "isCorrect": false },
          { "text": "To export vector files", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which image file format supports full transparency and is commonly used for web graphics?",
        "options": [
          { "text": "JPEG", "isCorrect": false },
          { "text": "PNG", "isCorrect": true },
          { "text": "GIF", "isCorrect": false },
          { "text": "BMP", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which of the following is a vector file format commonly used for logos?",
        "options": [
          { "text": "JPEG", "isCorrect": false },
          { "text": "SVG", "isCorrect": true },
          { "text": "PNG", "isCorrect": false },
          { "text": "TIFF", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "In Adobe InDesign, what is the purpose of master pages?",
        "options": [
          { "text": "To apply consistent elements (like headers and footers) to multiple pages", "isCorrect": true },
          { "text": "To adjust color modes", "isCorrect": false },
          { "text": "To create a new book", "isCorrect": false },
          { "text": "To rasterize images", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which tool would you use to draw a perfect circle in Adobe Illustrator?",
        "options": [
          { "text": "Pen Tool", "isCorrect": false },
          { "text": "Ellipse Tool", "isCorrect": true },
          { "text": "Polygon Tool", "isCorrect": false },
          { "text": "Free Transform Tool", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What does RGB stand for, and where is it primarily used?",
        "options": [
          { "text": "Red, Green, Blue – used in digital screens", "isCorrect": true },
          { "text": "Raster, Grid, Bitmap – used in print", "isCorrect": false },
          { "text": "Red, Green, Blue – used in printing", "isCorrect": false },
          { "text": "Raster, Greyscale, Black – used in photography", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which panel in Photoshop allows you to change the visibility of layers?",
        "options": [
          { "text": "History Panel", "isCorrect": false },
          { "text": "Layers Panel", "isCorrect": true },
          { "text": "Navigator Panel", "isCorrect": false },
          { "text": "Properties Panel", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "In vector graphic editing, what is an \"anchor point\"?",
        "options": [
          { "text": "A point that connects lines or curves in a vector shape", "isCorrect": true },
          { "text": "A security lock on a layer", "isCorrect": false },
          { "text": "A color reference swatch", "isCorrect": false },
          { "text": "A file format", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which keyboard shortcut is commonly used to duplicate a layer in Photoshop?",
        "options": [
          { "text": "Ctrl + D", "isCorrect": false },
          { "text": "Ctrl + J", "isCorrect": true },
          { "text": "Ctrl + C", "isCorrect": false },
          { "text": "Ctrl + S", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which file format preserves layers and is the native format for Adobe Photoshop?",
        "options": [
          { "text": "JPEG", "isCorrect": false },
          { "text": "PNG", "isCorrect": false },
          { "text": "PSD", "isCorrect": true },
          { "text": "GIF", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What does CMYK stand for in printing?",
        "options": [
          { "text": "Cyan, Magenta, Yellow, Key (Black)", "isCorrect": true },
          { "text": "Chartreuse, Magenta, Yellow, Key", "isCorrect": false },
          { "text": "Cyan, Magenta, Yellow, Kilobyte", "isCorrect": false },
          { "text": "Color, Magenta, Yellow, Key", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which of the following shapes is drawn when you use the Rectangle tool in Illustrator?",
        "options": [
          { "text": "Star", "isCorrect": false },
          { "text": "Rectangle", "isCorrect": true },
          { "text": "Blob", "isCorrect": false },
          { "text": "Arrow", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "In Photoshop, which tool would you use to pick a color from your image?",
        "options": [
          { "text": "Eyedropper Tool", "isCorrect": true },
          { "text": "Paintbrush Tool", "isCorrect": false },
          { "text": "Gradient Tool", "isCorrect": false },
          { "text": "Eraser Tool", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What is the purpose of the Crop tool in image editing?",
        "options": [
          { "text": "To adjust image brightness", "isCorrect": false },
          { "text": "To remove unwanted outer areas of an image", "isCorrect": true },
          { "text": "To select objects for editing", "isCorrect": false },
          { "text": "To blur the edges of an image", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which image file format is commonly used for high-quality printing of photographs?",
        "options": [
          { "text": "JPEG", "isCorrect": false },
          { "text": "GIF", "isCorrect": false },
          { "text": "TIFF", "isCorrect": true },
          { "text": "SVG", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What does the Layers panel in Photoshop allow you to do?",
        "options": [
          { "text": "Track the history of edits", "isCorrect": false },
          { "text": "Organize and stack parts of your design into separate layers", "isCorrect": true },
          { "text": "Store and manage color swatches", "isCorrect": false },
          { "text": "Adjust brightness and contrast of the image", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "When preparing an image for print, which color mode should you choose?",
        "options": [
          { "text": "RGB", "isCorrect": false },
          { "text": "CMYK", "isCorrect": true },
          { "text": "Grayscale", "isCorrect": false },
          { "text": "Indexed Color", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "In Adobe Illustrator, which tool would you use to create a curved line by specifying anchor points?",
        "options": [
          { "text": "Direct Selection Tool", "isCorrect": false },
          { "text": "Pen Tool", "isCorrect": true },
          { "text": "Type Tool", "isCorrect": false },
          { "text": "Eraser Tool", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which aspect ratio is commonly used for Instagram posts?",
        "options": [
          { "text": "16:9", "isCorrect": false },
          { "text": "4:3", "isCorrect": false },
          { "text": "1:1", "isCorrect": true },
          { "text": "2:1", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which file format is best for a logo that needs to be scaled without losing quality?",
        "options": [
          { "text": "JPEG", "isCorrect": false },
          { "text": "BMP", "isCorrect": false },
          { "text": "SVG", "isCorrect": true },
          { "text": "PNG", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What does the \"Horizontal Align Center\" option do to selected objects?",
        "options": [
          { "text": "Moves them to the left edge of the canvas", "isCorrect": false },
          { "text": "Centers them horizontally relative to each other", "isCorrect": true },
          { "text": "Rotates them in place", "isCorrect": false },
          { "text": "Groups them together", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "In Photoshop, which menu would you use to flatten all layers into a single layer?",
        "options": [
          { "text": "File", "isCorrect": false },
          { "text": "Image", "isCorrect": false },
          { "text": "Edit", "isCorrect": false },
          { "text": "Layer", "isCorrect": true }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What is the function of the keyboard shortcut Ctrl+T in Photoshop?",
        "options": [
          { "text": "Save the file", "isCorrect": false },
          { "text": "Free Transform the selected layer or object", "isCorrect": true },
          { "text": "Duplicate the selected layer", "isCorrect": false },
          { "text": "Deselect the current selection", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What is the primary function of the Pen tool in Illustrator?",
        "options": [
          { "text": "Create freehand drawings", "isCorrect": false },
          { "text": "Draw precise paths and shapes using anchor points", "isCorrect": true },
          { "text": "Erase parts of an object", "isCorrect": false },
          { "text": "Fill shapes with color", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which image file format would you choose for a scalable graphic with transparency for the web?",
        "options": [
          { "text": "SVG", "isCorrect": true },
          { "text": "JPEG", "isCorrect": false },
          { "text": "PNG", "isCorrect": false },
          { "text": "BMP", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What is the purpose of a layer mask in Photoshop?",
        "options": [
          { "text": "To lock the layer from editing", "isCorrect": false },
          { "text": "To hide or reveal parts of a layer without deleting pixels", "isCorrect": true },
          { "text": "To apply filters to a layer", "isCorrect": false },
          { "text": "To increase the layer’s brightness", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which panel in Adobe InDesign is commonly used to change the font and size of text?",
        "options": [
          { "text": "Paragraph Panel", "isCorrect": false },
          { "text": "Character Panel", "isCorrect": true },
          { "text": "Layers Panel", "isCorrect": false },
          { "text": "Stroke Panel", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "In graphic design, what does DPI stand for?",
        "options": [
          { "text": "Dots Per Inch", "isCorrect": true },
          { "text": "Digital Pixel Image", "isCorrect": false },
          { "text": "Design Panel Interface", "isCorrect": false },
          { "text": "Data Print Inking", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which of the following is a benefit of using vector graphics?",
        "options": [
          { "text": "They are best for photo editing", "isCorrect": false },
          { "text": "They can be scaled without losing quality", "isCorrect": true },
          { "text": "They always have smaller file sizes", "isCorrect": false },
          { "text": "They cannot be printed", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which tool in Photoshop is best for selecting an object with a freeform outline?",
        "options": [
          { "text": "Rectangle Marquee Tool", "isCorrect": false },
          { "text": "Magic Wand Tool", "isCorrect": false },
          { "text": "Lasso Tool", "isCorrect": true },
          { "text": "Crop Tool", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What is the standard resolution in DPI for high-quality print output?",
        "options": [
          { "text": "72 DPI", "isCorrect": false },
          { "text": "150 DPI", "isCorrect": false },
          { "text": "300 DPI", "isCorrect": true },
          { "text": "600 DPI", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which feature in Adobe InDesign helps align text lines across columns?",
        "options": [
          { "text": "Snap to Grid", "isCorrect": false },
          { "text": "Master Pages", "isCorrect": false },
          { "text": "Baseline Grid", "isCorrect": true },
          { "text": "Paragraph Styles", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which term refers to the space between lines of text?",
        "options": [
          { "text": "Kerning", "isCorrect": false },
          { "text": "Tracking", "isCorrect": false },
          { "text": "Leading", "isCorrect": true },
          { "text": "Ligature", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What color mode is typically used for images displayed on digital screens?",
        "options": [
          { "text": "CMYK", "isCorrect": false },
          { "text": "RGB", "isCorrect": true },
          { "text": "Grayscale", "isCorrect": false },
          { "text": "Indexed Color", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "In the image above, what does the missing eye icon next to a layer indicate?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748348118/b65a72cc-420d-4300-b085-994d2776f912_hnezth.png",
        "options": [
          { "text": "The layer is locked", "isCorrect": false },
          { "text": "The layer is hidden", "isCorrect": true },
          { "text": "The layer is merged", "isCorrect": false },
          { "text": "The layer is visible", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "In the image above, which file format should be selected to preserve layers when saving a Photoshop document?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748348138/fea577c2-c7f1-483f-87ea-ba641114fa61_ubt1pk.png",
        "options": [
          { "text": "JPEG", "isCorrect": false },
          { "text": "PNG", "isCorrect": false },
          { "text": "PSD", "isCorrect": true },
          { "text": "GIF", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "In the layout above, what design principle is not properly applied?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748348755/1ca6e834-ba32-4250-83aa-b705cfff86e5_o2enat.png",
        "options": [
          { "text": "Color harmony", "isCorrect": false },
          { "text": "Symmetry or balance", "isCorrect": true },
          { "text": "Contrast", "isCorrect": false },
          { "text": "Typography pairing", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "In the image above, what is the main reason for using multiple artboards?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748348837/5ceea454-6828-4982-86e0-8f20b8428659_xqryud.png",
        "options": [
          { "text": "To create different designs or pages within one file", "isCorrect": true },
          { "text": "To increase the image resolution", "isCorrect": false },
          { "text": "To lock design elements", "isCorrect": false },
          { "text": "To switch between color modes", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "If the 'Horizontal Align Center' option is applied to the selected objects, what will occur?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748348155/ad8684bb-9da5-4d0b-b9bb-7b84ee4af980_btxdsn.png",
        "options": [
          { "text": "All objects align to the left edge of the artboard", "isCorrect": false },
          { "text": "All objects share the same horizontal center relative to each other", "isCorrect": true },
          { "text": "Objects are evenly spaced out", "isCorrect": false },
          { "text": "Objects change their rotation", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "In the image above, which color mode is most appropriate for a document intended for professional printing?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748348152/1d76b325-3b0a-43f8-986d-429fb3a1cd84_acuah9.png",
        "options": [
          { "text": "RGB", "isCorrect": false },
          { "text": "CMYK", "isCorrect": true },
          { "text": "Grayscale", "isCorrect": false },
          { "text": "Indexed Color", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "In the image above, which tool is highlighted in the toolbar?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748348148/38340e12-c86c-44f8-a69b-cfb6668afa8d_uke6z6.png",
        "options": [
          { "text": "Move Tool", "isCorrect": true },
          { "text": "Lasso Tool", "isCorrect": false },
          { "text": "Magic Wand Tool", "isCorrect": false },
          { "text": "Crop Tool", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "If you need to export a logo with a transparent background, which format from the list should you choose?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748348144/86375a4f-56ef-4e57-8d06-cfd40c7cfa4c_bd17h3.png",
        "options": [
          { "text": "JPEG", "isCorrect": false },
          { "text": "PNG", "isCorrect": true },
          { "text": "BMP", "isCorrect": false },
          { "text": "GIF", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "In the image above, what does the lock icon next to a layer name indicate?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748348161/313f19c6-a08f-444b-b816-285a09f625f3_czxrqf.png",
        "options": [
          { "text": "The layer is hidden", "isCorrect": false },
          { "text": "The layer is locked and cannot be edited", "isCorrect": true },
          { "text": "The layer has an effect applied", "isCorrect": false },
          { "text": "The layer is selected", "isCorrect": false }
        ],
        "difficulty": "easy"
      }
    ],
    isAvailable : true,
    category : 'Graphic Designer'
  },
  {
    title : 'Level 2',
    questions : [
      {
        "questionType": "text",
        "text": "Which of these fonts is a sans-serif typeface?",
        "options": [
          { "text": "Times New Roman", "isCorrect": false },
          { "text": "Arial", "isCorrect": true },
          { "text": "Courier", "isCorrect": false },
          { "text": "Georgia", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What color scheme uses colors opposite each other on the color wheel?",
        "options": [
          { "text": "Monochromatic", "isCorrect": false },
          { "text": "Complementary", "isCorrect": true },
          { "text": "Analogous", "isCorrect": false },
          { "text": "Triadic", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What does the term 'leading' refer to in typography?",
        "options": [
          { "text": "Space between lines of text", "isCorrect": true },
          { "text": "Space between letters", "isCorrect": false },
          { "text": "The first line of a paragraph", "isCorrect": false },
          { "text": "Font style of headings", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "At 300 DPI, an image printed at 4 inches wide has how many pixels in width?",
        "options": [
          { "text": "600", "isCorrect": false },
          { "text": "1200", "isCorrect": true },
          { "text": "2400", "isCorrect": false },
          { "text": "300", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What is a bleed in print design?",
        "options": [
          { "text": "An area where color extends beyond the trim line", "isCorrect": true },
          { "text": "A security feature for printing", "isCorrect": false },
          { "text": "A file format for printing", "isCorrect": false },
          { "text": "A way to lock image layers", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Which of these is a vector editing tool for combining and editing shapes in Illustrator?",
        "options": [
          { "text": "Lasso Tool", "isCorrect": false },
          { "text": "Shape Builder Tool", "isCorrect": true },
          { "text": "Quick Selection Tool", "isCorrect": false },
          { "text": "Eyedropper Tool", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What is the main purpose of a grid system in layout design?",
        "options": [
          { "text": "To set the color scheme", "isCorrect": false },
          { "text": "To align elements consistently", "isCorrect": true },
          { "text": "To compress images", "isCorrect": false },
          { "text": "To choose fonts", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Which color mode is typically used for professional printing?",
        "options": [
          { "text": "RGB", "isCorrect": false },
          { "text": "CMYK", "isCorrect": true },
          { "text": "HSL", "isCorrect": false },
          { "text": "Grayscale", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "In digital imagery, what is the smallest unit of a raster image?",
        "options": [
          { "text": "Vector", "isCorrect": false },
          { "text": "Pixel", "isCorrect": true },
          { "text": "Node", "isCorrect": false },
          { "text": "Layer", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Which typographic term refers to adjusting the spacing between a pair of letters?",
        "options": [
          { "text": "Leading", "isCorrect": false },
          { "text": "Tracking", "isCorrect": false },
          { "text": "Kerning", "isCorrect": true },
          { "text": "Alignment", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Which scenario is appropriate for using CMYK color mode?",
        "options": [
          { "text": "Designing a website layout", "isCorrect": false },
          { "text": "Working on an online advertisement", "isCorrect": false },
          { "text": "Creating an advertisement for print publication", "isCorrect": true },
          { "text": "Digital photo editing for social media", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Which Photoshop feature allows you to apply effects to multiple layers without altering the original pixels?",
        "options": [
          { "text": "Adjustment Layer", "isCorrect": true },
          { "text": "Merge Layers", "isCorrect": false },
          { "text": "Clone Stamp Tool", "isCorrect": false },
          { "text": "Lasso Tool", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What is the advantage of saving artwork as a PDF for print?",
        "options": [
          { "text": "It reduces file size by 90%", "isCorrect": false },
          { "text": "It preserves vector and text quality while embedding fonts", "isCorrect": true },
          { "text": "It automatically rasterizes all images", "isCorrect": false },
          { "text": "It converts all colors to RGB", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Which of the following can affect visual hierarchy in a design?",
        "options": [
          { "text": "Color", "isCorrect": false },
          { "text": "Size of elements", "isCorrect": false },
          { "text": "Typography (font choice)", "isCorrect": false },
          { "text": "All of the above", "isCorrect": true }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What is a Pantone color?",
        "options": [
          { "text": "A web-safe color", "isCorrect": false },
          { "text": "A standardized spot color from a color matching system", "isCorrect": true },
          { "text": "An RGB color code", "isCorrect": false },
          { "text": "A grayscale value", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Which of the following vector file formats is commonly used in professional print workflows?",
        "options": [
          { "text": "PSD", "isCorrect": false },
          { "text": "EPS", "isCorrect": true },
          { "text": "JPEG", "isCorrect": false },
          { "text": "PNG", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Which Adobe program is best suited for designing multi-page print layouts like magazines?",
        "options": [
          { "text": "Photoshop", "isCorrect": false },
          { "text": "Illustrator", "isCorrect": false },
          { "text": "InDesign", "isCorrect": true },
          { "text": "Premiere Pro", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "When designing a logo for digital use, which color space should be considered for accurate display on screens?",
        "options": [
          { "text": "CMYK", "isCorrect": false },
          { "text": "RGB", "isCorrect": true },
          { "text": "Pantone", "isCorrect": false },
          { "text": "Grayscale", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Which term describes uniform spacing adjustment across all letters in a block of text?",
        "options": [
          { "text": "Leading", "isCorrect": false },
          { "text": "Tracking", "isCorrect": true },
          { "text": "Kerning", "isCorrect": false },
          { "text": "Alignment", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "In print layout, what does setting a 'bleed' ensure?",
        "options": [
          { "text": "Critical content is safe from being cut off during trimming", "isCorrect": false },
          { "text": "Color extends beyond the trim edge to avoid white margins", "isCorrect": true },
          { "text": "The document will only use RGB colors", "isCorrect": false },
          { "text": "There is extra blank space in the design", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Which design element is best to use for adding structure and alignment in a layout?",
        "options": [
          { "text": "Random decorative shapes", "isCorrect": false },
          { "text": "A grid system", "isCorrect": true },
          { "text": "Multiple fonts", "isCorrect": false },
          { "text": "High saturation colors", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What is an advantage of converting layers to Smart Objects in Photoshop?",
        "options": [
          { "text": "It flattens the image into one layer", "isCorrect": false },
          { "text": "It preserves the original data for non-destructive editing", "isCorrect": true },
          { "text": "It reduces the number of layers in the document", "isCorrect": false },
          { "text": "It automatically merges all layers", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Which typographic term describes the decorative element added to letters at the ends of strokes?",
        "options": [
          { "text": "Serif", "isCorrect": true },
          { "text": "X-height", "isCorrect": false },
          { "text": "Stem", "isCorrect": false },
          { "text": "Baseline", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What does 'responsive design' refer to in web graphics?",
        "options": [
          { "text": "Using vibrant colors", "isCorrect": false },
          { "text": "A design that adapts to various screen sizes and devices", "isCorrect": true },
          { "text": "Creating high DPI images", "isCorrect": false },
          { "text": "Adding interactive animations", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What is the purpose of a baseline grid in InDesign?",
        "options": [
          { "text": "To align graphics", "isCorrect": false },
          { "text": "To align text lines consistently across columns", "isCorrect": true },
          { "text": "To set margins", "isCorrect": false },
          { "text": "To create master pages", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What is an analogous color scheme?",
        "options": [
          { "text": "Colors opposite each other on the color wheel", "isCorrect": false },
          { "text": "Colors next to each other on the color wheel", "isCorrect": true },
          { "text": "All shades and tints of a single color", "isCorrect": false },
          { "text": "Three colors evenly spaced", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "In layout design, what does 'visual hierarchy' refer to?",
        "options": [
          { "text": "The order in which elements are seen based on their importance", "isCorrect": true },
          { "text": "The physical stacking order of layers", "isCorrect": false },
          { "text": "A series of color values from dark to light", "isCorrect": false },
          { "text": "A type of grid system", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Which program would you use to create scalable vector graphics?",
        "options": [
          { "text": "Photoshop", "isCorrect": false },
          { "text": "Illustrator", "isCorrect": true },
          { "text": "Premiere Pro", "isCorrect": false },
          { "text": "After Effects", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Which statement correctly differentiates raster graphics from vector graphics?",
        "options": [
          { "text": "Raster images can scale without losing quality", "isCorrect": false },
          { "text": "Vector images are composed of mathematical paths and points", "isCorrect": true },
          { "text": "Raster images always use Pantone colors", "isCorrect": false },
          { "text": "Vector images can only be saved as JPEG", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What defines a triadic color scheme?",
        "options": [
          { "text": "Three adjacent colors on the color wheel", "isCorrect": false },
          { "text": "Three colors evenly spaced around the color wheel", "isCorrect": true },
          { "text": "One color plus its shades and tints", "isCorrect": false },
          { "text": "Opposite color pairs plus one tertiary color", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "When converting a photo to grayscale, which color mode would you choose?",
        "options": [
          { "text": "RGB", "isCorrect": false },
          { "text": "CMYK", "isCorrect": false },
          { "text": "Grayscale", "isCorrect": true },
          { "text": "LAB", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Which image file format uses lossless compression suitable for detailed web graphics?",
        "options": [
          { "text": "JPEG", "isCorrect": false },
          { "text": "PNG", "isCorrect": true },
          { "text": "GIF", "isCorrect": false },
          { "text": "TIFF", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What does 'x-height' refer to in typography?",
        "options": [
          { "text": "The height of capital letters", "isCorrect": false },
          { "text": "The height of lowercase letters excluding ascenders/descenders", "isCorrect": true },
          { "text": "The width of the letter 'x'", "isCorrect": false },
          { "text": "The spacing between lines", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "In multi-page document design, what feature helps maintain consistent layout elements across pages?",
        "options": [
          { "text": "Master Pages", "isCorrect": true },
          { "text": "Layers", "isCorrect": false },
          { "text": "Save as Template", "isCorrect": false },
          { "text": "Character Styles", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "When designing a logo for the web on high-resolution displays, which format ensures crisp scaling?",
        "options": [
          { "text": "JPEG", "isCorrect": false },
          { "text": "PNG", "isCorrect": false },
          { "text": "SVG", "isCorrect": true },
          { "text": "GIF", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "Which of the following correctly identifies the fonts shown in the image?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748349474/cdabe399-78f6-4549-ad43-f3b865fc6fbb_p5fcty.png",
        "options": [
          { "text": "Times New Roman (left) is a serif font; Arial (right) is a sans-serif font", "isCorrect": true },
          { "text": "Times New Roman (left) is sans-serif; Arial (right) is serif", "isCorrect": false },
          { "text": "Both fonts shown are serif fonts", "isCorrect": false },
          { "text": "Both fonts shown are sans-serif fonts", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "What is the primary design problem shown in the above layout?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748349466/8020647d-e68c-4e54-bb75-1097b86c826c_hzy2rd.png",
        "options": [
          { "text": "Poor color contrast", "isCorrect": false },
          { "text": "Imbalanced composition", "isCorrect": true },
          { "text": "Low image quality", "isCorrect": false },
          { "text": "Misaligned text", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "In the image above, what does the warning icon most likely mean for the image?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748349478/8169b395-4321-4a32-9d57-903f6f87f635_h6a6rm.png",
        "options": [
          { "text": "The image is above the maximum file size", "isCorrect": false },
          { "text": "The image may appear pixelated or blurry when printed at the current size", "isCorrect": true },
          { "text": "The image has too many layers", "isCorrect": false },
          { "text": "The image is using too many colors", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "In the image above, what functionality does the Layers panel provide?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748349469/bdaf7a87-3c76-49d8-9480-11849f6aaccb_j4n63y.png",
        "options": [
          { "text": "It allows stacking and organizing objects on separate layers", "isCorrect": true },
          { "text": "It changes the document’s color mode", "isCorrect": false },
          { "text": "It applies filters to images", "isCorrect": false },
          { "text": "It adjusts stroke and fill colors", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "Why is the typography choice in this example problematic?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748349485/708072ed-d4f9-4925-979f-466e05c277a3_lgdf5n.png",
        "options": [
          { "text": "The fonts are too similar in style, causing confusion", "isCorrect": false },
          { "text": "Both fonts are highly decorative, reducing readability for body text", "isCorrect": true },
          { "text": "The font sizes are inconsistent", "isCorrect": false },
          { "text": "The text color is too dark", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "What is the primary benefit of the grid system illustrated in the image?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748349488/77d2a097-6d81-4911-9761-65b49989c33f_j1o7sw.png",
        "options": [
          { "text": "It enforces consistent alignment and spacing of elements", "isCorrect": true },
          { "text": "It increases the page’s loading speed", "isCorrect": false },
          { "text": "It automatically adjusts font sizes", "isCorrect": false },
          { "text": "It applies color schemes to sections", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "Which image (left or right) will produce a sharper print, and why?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748349501/4cda5e0a-ed2c-41ee-a1fd-54feddd8c4f0_po6cxr.png",
        "options": [
          { "text": "Left image (72 DPI), because DPI doesn't matter", "isCorrect": false },
          { "text": "Left image, because 72 DPI is standard", "isCorrect": false },
          { "text": "Right image (300 DPI), because it has higher resolution", "isCorrect": true },
          { "text": "Right image, because it is a vector", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "What is the visual hierarchy issue in this design?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748349497/8ee71fc4-4ff3-4014-906a-643e6399100f_ifsqlb.png",
        "options": [
          { "text": "The headline is not prominent because it is smaller than body text", "isCorrect": true },
          { "text": "The color contrast is too high", "isCorrect": false },
          { "text": "The body text font is inappropriate", "isCorrect": false },
          { "text": "The layout is using too many fonts", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "Which tool is being used to combine the selected shapes as shown in the image?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748349492/c040418b-0b60-4dc6-9bb1-1a91a437d8f7_ofrfoq.png",
        "options": [
          { "text": "Shape Builder Tool", "isCorrect": true },
          { "text": "Pathfinder panel", "isCorrect": false },
          { "text": "Live Paint Bucket", "isCorrect": false },
          { "text": "Selection Tool", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "According to the image above, how should the designer address this warning?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748349483/68bab927-cefa-4b63-b911-97776d7bbb33_iwzr2q.png",
        "options": [
          { "text": "Ignore it, as it has no effect", "isCorrect": false },
          { "text": "Ensure the image is replaced with one at higher resolution for print", "isCorrect": true },
          { "text": "Convert the document to RGB color mode", "isCorrect": false },
          { "text": "Reduce the document’s dimensions", "isCorrect": false }
        ],
        "difficulty": "medium"
      }
    ],
    isAvailable : true,
    category : 'Graphic Designer'
  },
  {
    title : 'Level 3',
    questions : [
      {
        "questionType": "text",
        "text": "What does \"accessibility\" in graphic design generally refer to?",
        "options": [
          { "text": "Making designs visually appealing", "isCorrect": false },
          { "text": "Making designs usable by people with disabilities", "isCorrect": true },
          { "text": "The portability of design files", "isCorrect": false },
          { "text": "The use of accessible fonts only", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What is a dieline in packaging design?",
        "options": [
          { "text": "A template showing where to cut, fold, and glue the package", "isCorrect": true },
          { "text": "A specific Pantone color for packaging", "isCorrect": false },
          { "text": "A print proof checklist", "isCorrect": false },
          { "text": "A type of die-cut machine", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "In web design, which font size is commonly recommended for body text on mobile devices for readability?",
        "options": [
          { "text": "12px", "isCorrect": false },
          { "text": "14px", "isCorrect": false },
          { "text": "16px", "isCorrect": true },
          { "text": "18px", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Which type of typeface is usually preferred for body text on digital screens for better readability?",
        "options": [
          { "text": "Serif", "isCorrect": false },
          { "text": "Sans-serif", "isCorrect": true },
          { "text": "Decorative script", "isCorrect": false },
          { "text": "Symbol", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "According to color psychology, the color blue most commonly evokes which emotion or concept in branding?",
        "options": [
          { "text": "Trust and reliability", "isCorrect": true },
          { "text": "Urgency and excitement", "isCorrect": false },
          { "text": "Danger and warning", "isCorrect": false },
          { "text": "Creativity and fun", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Which practice improves accessibility in a color scheme?",
        "options": [
          { "text": "Using very low contrast between text and background", "isCorrect": false },
          { "text": "Using high contrast between text and background", "isCorrect": true },
          { "text": "Using only pastel colors", "isCorrect": false },
          { "text": "Using many different colors together", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "On a website, what is the purpose of \"alt text\" for images?",
        "options": [
          { "text": "To apply decorative filters", "isCorrect": false },
          { "text": "To improve SEO ranking only", "isCorrect": false },
          { "text": "To describe images for screen readers and improve accessibility", "isCorrect": true },
          { "text": "To adjust image brightness", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What is a branding style guide (or branding system)?",
        "options": [
          { "text": "A document outlining the rules for logo use, color palettes, typography, and other brand elements", "isCorrect": true },
          { "text": "A style filter in Photoshop", "isCorrect": false },
          { "text": "A set of stock images for marketing", "isCorrect": false },
          { "text": "A social media strategy plan", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What does \"responsive design\" ensure for a website or digital product?",
        "options": [
          { "text": "It runs faster on all browsers", "isCorrect": false },
          { "text": "The design layout adapts to different screen sizes and devices", "isCorrect": true },
          { "text": "It automatically changes color based on time of day", "isCorrect": false },
          { "text": "It only works on mobile devices", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Which aspect ratio should an Instagram Story image use for best fit?",
        "options": [
          { "text": "1:1", "isCorrect": false },
          { "text": "16:9", "isCorrect": false },
          { "text": "9:16", "isCorrect": true },
          { "text": "4:5", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Which design choice negatively impacts accessibility?",
        "options": [
          { "text": "Low contrast between text and background", "isCorrect": true },
          { "text": "Providing descriptive alt text for images", "isCorrect": false },
          { "text": "Using large, legible fonts", "isCorrect": false },
          { "text": "Including captions on videos", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "To ensure brand consistency across different materials, a designer should:",
        "options": [
          { "text": "Frequently change the logo and colors for variety", "isCorrect": false },
          { "text": "Use the same logo, color palette, and typography consistently", "isCorrect": true },
          { "text": "Use a different color palette for each material", "isCorrect": false },
          { "text": "Only focus on one platform at a time", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Why is color psychology important in branding and design?",
        "options": [
          { "text": "It helps influence customers’ emotions and perceptions of the brand", "isCorrect": true },
          { "text": "It guarantees the colors will match Pantone for printing", "isCorrect": false },
          { "text": "It reduces the overall printing cost", "isCorrect": false },
          { "text": "It standardizes all materials to black and white", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What is an important accessibility practice for people with color vision deficiencies?",
        "options": [
          { "text": "Using red and green together without any text", "isCorrect": false },
          { "text": "Using texture or labels in addition to color coding", "isCorrect": true },
          { "text": "Using only bright, saturated colors", "isCorrect": false },
          { "text": "Using thin, light fonts", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "If a brand’s logo appears blurry on high-resolution displays, what should the designer use instead?",
        "options": [
          { "text": "A vector version of the logo (such as SVG)", "isCorrect": true },
          { "text": "A JPEG with higher resolution", "isCorrect": false },
          { "text": "A PNG with more colors", "isCorrect": false },
          { "text": "A black and white version", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "According to mobile design guidelines, what is the recommended minimum size for touch targets (like buttons) to ensure accessibility?",
        "options": [
          { "text": "24 x 24 pixels", "isCorrect": false },
          { "text": "44 x 44 pixels", "isCorrect": true },
          { "text": "30 x 30 pixels", "isCorrect": false },
          { "text": "60 x 60 pixels", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Which practice is recommended when designing text-heavy social media graphics?",
        "options": [
          { "text": "Use small, decorative fonts for text", "isCorrect": false },
          { "text": "Use high-contrast large fonts with minimal text", "isCorrect": true },
          { "text": "Use script fonts for body text", "isCorrect": false },
          { "text": "Avoid images entirely", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "To maintain brand consistency, designers should use:",
        "options": [
          { "text": "A different logo on each material", "isCorrect": false },
          { "text": "The same logo, color palette, and typography across materials", "isCorrect": true },
          { "text": "Only one color and font for all designs", "isCorrect": false },
          { "text": "No guidelines, allowing full creativity", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What contrast ratio is recommended by WCAG guidelines for normal (body) text to meet AA accessibility standards?",
        "options": [
          { "text": "3:1", "isCorrect": false },
          { "text": "4.5:1", "isCorrect": true },
          { "text": "7:1", "isCorrect": false },
          { "text": "10:1", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Which practice should be avoided to ensure accessibility for color-blind viewers?",
        "options": [
          { "text": "Using multiple ways (color + icon/text) to convey information", "isCorrect": false },
          { "text": "Using color alone to indicate information without additional cues", "isCorrect": true },
          { "text": "Testing designs in grayscale to check contrast", "isCorrect": false },
          { "text": "Using high contrast between foreground and background", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Which design choice enhances accessibility for users with visual impairments?",
        "options": [
          { "text": "Decorative fonts for all text", "isCorrect": false },
          { "text": "Providing descriptive alternative text for images", "isCorrect": true },
          { "text": "Low-contrast text", "isCorrect": false },
          { "text": "Tiny clickable areas", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What is a style guide in the context of branding?",
        "options": [
          { "text": "A plan for a website’s layout", "isCorrect": false },
          { "text": "A document that defines logo use, color palettes, fonts, and imagery guidelines", "isCorrect": true },
          { "text": "A user manual for a design software", "isCorrect": false },
          { "text": "A template for graphic elements", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What should typically be included in a brand style guide?",
        "options": [
          { "text": "Only the company’s logo", "isCorrect": false },
          { "text": "Logo usage, color palette, typography, and image style guidelines", "isCorrect": true },
          { "text": "Only font names", "isCorrect": false },
          { "text": "Only social media images", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What is an 'orphan' in typesetting?",
        "options": [
          { "text": "A single line of a paragraph at the top of a new page or column", "isCorrect": true },
          { "text": "A single line at the bottom of a page or column", "isCorrect": false },
          { "text": "A blank space at the top of a page", "isCorrect": false },
          { "text": "A misaligned image", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What is the 'safe area' or 'margin' in print design?",
        "options": [
          { "text": "The area beyond the bleed", "isCorrect": false },
          { "text": "The zone where critical content is placed away from the page edges", "isCorrect": true },
          { "text": "The exact trim line of the page", "isCorrect": false },
          { "text": "The area where color cannot be printed", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Which file format is most appropriate for submitting dieline artwork to a printer?",
        "options": [
          { "text": "JPEG", "isCorrect": false },
          { "text": "PNG", "isCorrect": false },
          { "text": "PDF", "isCorrect": true },
          { "text": "GIF", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Why is whitespace (negative space) important in design?",
        "options": [
          { "text": "It creates more blank space to fill", "isCorrect": false },
          { "text": "It helps improve readability and focus by giving elements room to breathe", "isCorrect": true },
          { "text": "It prevents printing errors", "isCorrect": false },
          { "text": "It’s not important in modern design", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Which design principle helps link related elements together visually?",
        "options": [
          { "text": "Alignment", "isCorrect": false },
          { "text": "Proximity (grouping)", "isCorrect": true },
          { "text": "Contrast", "isCorrect": false },
          { "text": "Randomness", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Which practice should be avoided for accessible designs?",
        "options": [
          { "text": "Using only color to convey information without labels or patterns", "isCorrect": true },
          { "text": "Providing text labels in addition to color", "isCorrect": false },
          { "text": "Checking color contrast in grayscale", "isCorrect": false },
          { "text": "Ensuring text is legible at small sizes", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Which of the following is an accessibility feature for assistive technologies?",
        "options": [
          { "text": "High-resolution images", "isCorrect": false },
          { "text": "ARIA labels on interactive elements", "isCorrect": true },
          { "text": "Parallax scrolling", "isCorrect": false },
          { "text": "Decorative animations", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Which of the following best describes a brand style guide?",
        "options": [
          { "text": "A single color and font to use for all designs", "isCorrect": false },
          { "text": "A set of rules for how a brand’s visual elements should be used", "isCorrect": true },
          { "text": "A list of trending design patterns", "isCorrect": false },
          { "text": "A style of clothing for company employees", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Why are SVG files often used for web icons and logos?",
        "options": [
          { "text": "They rasterize the image at high resolution", "isCorrect": false },
          { "text": "They scale without pixelation and usually have small file sizes", "isCorrect": true },
          { "text": "They only support grayscale", "isCorrect": false },
          { "text": "They are easier to compress to low quality", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Which of the following best practices ensures text is legible on social media thumbnails?",
        "options": [
          { "text": "Use very small fonts to fit more text", "isCorrect": false },
          { "text": "Use thin, light gray fonts", "isCorrect": false },
          { "text": "Use large, bold fonts and high contrast", "isCorrect": true },
          { "text": "Always use script fonts", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Which of the following describes the goal of mobile-first design?",
        "options": [
          { "text": "Designing for mobile devices before adapting to larger screens", "isCorrect": true },
          { "text": "Designing only for desktop screens", "isCorrect": false },
          { "text": "Ignoring mobile layouts entirely", "isCorrect": false },
          { "text": "Prioritizing print design over digital", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "When adapting a print design for the web, which modifications are generally required?",
        "options": [
          { "text": "Switch to RGB color mode and use lower resolution (e.g. ~72 DPI)", "isCorrect": true },
          { "text": "Keep CMYK and high DPI (300) because it prints better", "isCorrect": false },
          { "text": "Switch to CMYK and increase resolution", "isCorrect": false },
          { "text": "No changes are needed; print and web use the same settings", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "What accessibility issue is highlighted in the image?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748350261/3f4b7207-2985-410b-b2b2-b23939cf2c48_lvessx.png",
        "options": [
          { "text": "Poor contrast between text and background", "isCorrect": true },
          { "text": "Incorrect font usage", "isCorrect": false },
          { "text": "Wrong page layout orientation", "isCorrect": false },
          { "text": "Overlapping design elements", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "Which logo likely represents outdated branding compared to current design trends?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748350279/3b6a9c69-5bc3-45b5-916c-21dff03ffb1e_tjxtf3.png",
        "options": [
          { "text": "The left logo (1990s style)", "isCorrect": true },
          { "text": "The right logo (modern minimalist)", "isCorrect": false },
          { "text": "Both logos are equally modern", "isCorrect": false },
          { "text": "Neither logo is outdated", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "What is the packaging design issue shown in the image?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748350267/af5e1471-6da5-46d0-9203-1b6c13473753_dbekxq.png",
        "options": [
          { "text": "A fold flap extends outside the trim area", "isCorrect": true },
          { "text": "A fold line is missing", "isCorrect": false },
          { "text": "The dieline uses the wrong color for cut lines", "isCorrect": false },
          { "text": "The design has no bleed", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "What is the issue depicted with the mobile layout?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748350259/a0eb315b-2e70-4187-9306-7ff720cc9695_rgeyal.png",
        "options": [
          { "text": "The mobile version lacks necessary margins", "isCorrect": false },
          { "text": "An interactive element is not fully visible or accessible on mobile", "isCorrect": true },
          { "text": "The color scheme is inverted", "isCorrect": false },
          { "text": "The font size is too large on mobile", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "Why might the color combination in the image be problematic for some users?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748350256/2f069724-60e0-4651-b6af-cd939fd2fae4_lsagvy.png",
        "options": [
          { "text": "Red and green are difficult to distinguish for many people with color vision deficiencies", "isCorrect": true },
          { "text": "The colors clash aesthetically", "isCorrect": false },
          { "text": "Red does not stand out against green", "isCorrect": false },
          { "text": "Green is not a trendy color in UI design", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "Which accessibility principle is most directly violated by the design shown?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748350271/224a55e5-7a66-4c5b-bf20-087c1f32b3b3_lchguw.png",
        "options": [
          { "text": "Inadequate text contrast", "isCorrect": false },
          { "text": "Insufficient text size for readability", "isCorrect": true },
          { "text": "Incorrect use of color", "isCorrect": false },
          { "text": "Missing alt text", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "Why might this design be ineffective for social media?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748350276/8736eb38-35a6-42d5-b506-014309c33dbc_a2z2lh.png",
        "options": [
          { "text": "Instagram prefers only images without text", "isCorrect": false },
          { "text": "Text is too small and dense to read easily on a mobile device", "isCorrect": true },
          { "text": "Colors are too bright for social platforms", "isCorrect": false },
          { "text": "The post dimensions are incorrect", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "What is the likely problem with placing the barcode as shown?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748350292/1c6ca1b4-f7a1-4993-950e-15d4d0780879_q3mqic.png",
        "options": [
          { "text": "It will be cut off or distorted when the box is assembled", "isCorrect": true },
          { "text": "It uses the wrong color for barcodes", "isCorrect": false },
          { "text": "Barcodes must always be on the top surface", "isCorrect": false },
          { "text": "The barcode should be moved to a corner", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "What issue is illustrated by the way the logo is displayed?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748350286/2f841faf-b95d-4b34-8962-a0a127a1f44b_apq3x9.png",
        "options": [
          { "text": "The logo has been scaled non-proportionally, distorting its appearance", "isCorrect": true },
          { "text": "The logo is correctly scaled maintaining its aspect ratio", "isCorrect": false },
          { "text": "The logo has too much padding", "isCorrect": false },
          { "text": "The logo colors are incorrect for the brand", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "What accessibility problem does this cause?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748350283/0bbb92e6-4f90-4737-bce1-260e9a631dc0_wbiju1.png",
        "options": [
          { "text": "The lack of visible input labels can confuse screen readers and users", "isCorrect": true },
          { "text": "The icons are too decorative", "isCorrect": false },
          { "text": "The form is missing a submit button", "isCorrect": false },
          { "text": "The color scheme is incorrect", "isCorrect": false }
        ],
        "difficulty": "hard"
      }
    ],
    isAvailable : true,
    category : 'Graphic Designer'
  }
]

const newCreativeDirTemplates = [
  {
    title : 'Level 1',
    questions : [
      {
        "questionType": "text",
        "text": "In developing a brand’s identity, key elements typically include the brand name, logo, color palette, typography, and tone of voice. Which of the following is NOT considered a core brand element?",
        "options": [
          { "text": "Logo", "isCorrect": false },
          { "text": "Color palette", "isCorrect": false },
          { "text": "Typography", "isCorrect": false },
          { "text": "Employee benefits", "isCorrect": true }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "A Creative Director often oversees teams including art directors, copywriters, content strategists, and various designers. Which of the following roles typically reports to a Creative Director?",
        "options": [
          { "text": "Marketing Manager", "isCorrect": false },
          { "text": "Copywriter", "isCorrect": true },
          { "text": "HR Specialist", "isCorrect": false },
          { "text": "Sales Associate", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "In creative agencies, the terms “Creative Director” and “Art Director” describe different roles. The Creative Director focuses on the overall vision and manages both copywriters and designers, whereas the Art Director handles only visual elements (such as color and fonts). Based on this distinction, which statement is true?",
        "options": [
          { "text": "Creative Directors only work with designers, Art Directors work with writers", "isCorrect": false },
          { "text": "Art Directors lead creative strategy, Creative Directors handle technical tasks", "isCorrect": false },
          { "text": "Creative Directors manage concept and both visual and messaging aspects; Art Directors focus on visual details", "isCorrect": true },
          { "text": "There is no difference between the roles", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which image file format uses lossless compression and supports transparency, making it ideal for graphics with sharp edges or logos?",
        "options": [
          { "text": "JPEG", "isCorrect": false },
          { "text": "PNG", "isCorrect": true },
          { "text": "GIF", "isCorrect": false },
          { "text": "TIFF", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "For a company logo that must be scaled to any size (from a business card to a billboard) without losing quality, which file format is most appropriate?",
        "options": [
          { "text": "JPEG", "isCorrect": false },
          { "text": "PNG", "isCorrect": false },
          { "text": "SVG", "isCorrect": true },
          { "text": "GIF", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Designers often use complementary color pairs to enhance readability and focus in a layout. Which of the following color combinations is an example of complementary colors?",
        "options": [
          { "text": "Blue and Orange", "isCorrect": true },
          { "text": "Blue and Green", "isCorrect": false },
          { "text": "Red and Orange", "isCorrect": false },
          { "text": "Yellow and Green", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "A creative brief typically includes the project’s objectives, target audience, key messaging, and deliverables. Which of the following elements is NOT usually part of a creative brief?",
        "options": [
          { "text": "Project objectives", "isCorrect": false },
          { "text": "Target audience", "isCorrect": false },
          { "text": "Engineering schematics", "isCorrect": true },
          { "text": "Key messaging", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Creative Directors generally do not handle technical development tasks. Which of the following is least likely to be a responsibility of a Creative Director?",
        "options": [
          { "text": "Leading the creative vision", "isCorrect": false },
          { "text": "Supervising the creative team", "isCorrect": false },
          { "text": "Writing website code", "isCorrect": true },
          { "text": "Presenting ideas to stakeholders", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "In print production, which color mode is typically used for designing materials like brochures or flyers?",
        "options": [
          { "text": "RGB (Red, Green, Blue)", "isCorrect": false },
          { "text": "CMYK (Cyan, Magenta, Yellow, Black)", "isCorrect": true },
          { "text": "Pantone (PMS)", "isCorrect": false },
          { "text": "HSV", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "In the CMYK color model used for printing, what does the 'K' represent?",
        "options": [
          { "text": "Key (Black)", "isCorrect": true },
          { "text": "Kale (Green)", "isCorrect": false },
          { "text": "Keyline", "isCorrect": false },
          { "text": "Knockout", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which of the following terms refers to a short, memorable phrase used to convey a brand’s essence (often called a slogan or tagline)?",
        "options": [
          { "text": "Logo", "isCorrect": false },
          { "text": "Tagline", "isCorrect": true },
          { "text": "Color palette", "isCorrect": false },
          { "text": "Letterhead", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which of the following is an example of a serif font (one that has small decorative strokes on the letters)?",
        "options": [
          { "text": "Arial", "isCorrect": false },
          { "text": "Helvetica", "isCorrect": false },
          { "text": "Times New Roman", "isCorrect": true },
          { "text": "Verdana", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Alignment is a key design principle that organizes elements along invisible lines or grids. Which principle does this describe?",
        "options": [
          { "text": "Balance", "isCorrect": false },
          { "text": "Proximity", "isCorrect": false },
          { "text": "Alignment", "isCorrect": true },
          { "text": "Repetition", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Brand architectures vary in how sub-brands relate to the parent brand. In a House of Brands model, sub-brands have completely distinct identities with no visual linkage to the parent. Which brand architecture fits this description?",
        "options": [
          { "text": "Branded House (Monolithic)", "isCorrect": false },
          { "text": "Endorsed Brands", "isCorrect": false },
          { "text": "House of Brands (Pluralistic)", "isCorrect": true },
          { "text": "Hybrid Model", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which of the following is a creative deliverable (an actual piece of creative work) rather than a distribution channel?",
        "options": [
          { "text": "Instagram", "isCorrect": false },
          { "text": "Television", "isCorrect": false },
          { "text": "Print Advertisement", "isCorrect": true },
          { "text": "Website", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "In brand communications, \"tone and voice\" refer to the style in which a brand speaks to its audience. Which example best illustrates a brand’s voice?",
        "options": [
          { "text": "A friendly and conversational writing style", "isCorrect": true },
          { "text": "The company’s logo design", "isCorrect": false },
          { "text": "A pricing strategy", "isCorrect": false },
          { "text": "The office color scheme", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What file format is commonly used for animated images?",
        "options": [
          { "text": "JPEG", "isCorrect": false },
          { "text": "PNG", "isCorrect": false },
          { "text": "GIF", "isCorrect": true },
          { "text": "TIFF", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which color scheme consists of variations of a single hue (one color with different shades and tints)?",
        "options": [
          { "text": "Complementary", "isCorrect": false },
          { "text": "Analogous", "isCorrect": false },
          { "text": "Triadic", "isCorrect": false },
          { "text": "Monochromatic", "isCorrect": true }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Blue and green are adjacent on the color wheel and form which type of color scheme?",
        "options": [
          { "text": "Complementary", "isCorrect": false },
          { "text": "Analogous", "isCorrect": true },
          { "text": "Triadic", "isCorrect": false },
          { "text": "Split-complementary", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which of the following font sizes is typically used for body text on a printed page?",
        "options": [
          { "text": "8pt", "isCorrect": false },
          { "text": "10pt", "isCorrect": true },
          { "text": "24pt", "isCorrect": false },
          { "text": "72pt", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What role does a copywriter play in a creative team?",
        "options": [
          { "text": "Writes the visual storyboard", "isCorrect": false },
          { "text": "Generates written content and messaging", "isCorrect": true },
          { "text": "Directs the film shoots", "isCorrect": false },
          { "text": "Programs interactive prototypes", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which of these design principles is primarily about arranging elements to create emphasis by making certain parts stand out?",
        "options": [
          { "text": "Contrast", "isCorrect": true },
          { "text": "Alignment", "isCorrect": false },
          { "text": "Proximity", "isCorrect": false },
          { "text": "Repetition", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What does 'UX' stand for in the context of product design?",
        "options": [
          { "text": "User Experience", "isCorrect": true },
          { "text": "Ultimate X-factor", "isCorrect": false },
          { "text": "Unified eXtension", "isCorrect": false },
          { "text": "User X-interface", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which file extension is used for vector graphics that can be scaled without loss of quality?",
        "options": [
          { "text": ".jpg", "isCorrect": false },
          { "text": ".png", "isCorrect": false },
          { "text": ".svg", "isCorrect": true },
          { "text": ".gif", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "If you want to preserve layers in an image for future editing, which file format should you use?",
        "options": [
          { "text": ".jpg", "isCorrect": false },
          { "text": ".png", "isCorrect": false },
          { "text": ".psd", "isCorrect": true },
          { "text": ".gif", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "RGB and CMYK are two common color models. Which one uses light (additive) and is best for digital screens?",
        "options": [
          { "text": "RGB", "isCorrect": true },
          { "text": "CMYK", "isCorrect": false },
          { "text": "HSV", "isCorrect": false },
          { "text": "LAB", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What is the typical DPI (dots per inch) resolution recommended for high-quality print images?",
        "options": [
          { "text": "72 DPI", "isCorrect": false },
          { "text": "150 DPI", "isCorrect": false },
          { "text": "300 DPI", "isCorrect": true },
          { "text": "1200 DPI", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which of these is a key purpose of a mood board in design?",
        "options": [
          { "text": "To present the final product", "isCorrect": false },
          { "text": "To organize project finances", "isCorrect": false },
          { "text": "To establish a visual style and inspiration", "isCorrect": true },
          { "text": "To measure user metrics", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What does the term 'proximity' refer to in design layout?",
        "options": [
          { "text": "Using similar colors", "isCorrect": false },
          { "text": "Grouping related elements closely", "isCorrect": true },
          { "text": "Aligning items to the center", "isCorrect": false },
          { "text": "Repeating a grid pattern", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which of the following is an example of a monochromatic color scheme?",
        "options": [
          { "text": "Blue, orange, and green", "isCorrect": false },
          { "text": "Red, yellow, and blue", "isCorrect": false },
          { "text": "Shades of green only", "isCorrect": true },
          { "text": "Red and green", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "When preparing images for the web, which file format is generally recommended for photographs?",
        "options": [
          { "text": "PNG", "isCorrect": false },
          { "text": "JPEG", "isCorrect": true },
          { "text": "GIF", "isCorrect": false },
          { "text": "SVG", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which creative deliverable typically involves motion and sound?",
        "options": [
          { "text": "Billboard", "isCorrect": false },
          { "text": "Print flyer", "isCorrect": false },
          { "text": "Web banner", "isCorrect": false },
          { "text": "Video advertisement", "isCorrect": true }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What is the primary purpose of a project brief?",
        "options": [
          { "text": "To document legal contracts", "isCorrect": false },
          { "text": "To outline creative goals and requirements", "isCorrect": true },
          { "text": "To detail every design change", "isCorrect": false },
          { "text": "To file tax reports", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which file format is best for saving a multi-page document with both text and vector graphics?",
        "options": [
          { "text": "PNG", "isCorrect": false },
          { "text": "TIFF", "isCorrect": false },
          { "text": "PDF", "isCorrect": true },
          { "text": "GIF", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which role in a creative agency typically leads the hiring and management of the creative team?",
        "options": [
          { "text": "Project Manager", "isCorrect": false },
          { "text": "Creative Director", "isCorrect": true },
          { "text": "Art Director", "isCorrect": false },
          { "text": "Account Executive", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "What mood or brand positioning does this mood board most likely convey?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748351270/c6b4c087-c17c-4c75-9507-a08833aa1351_vwoyjw.png",
        "options": [
          { "text": "High-tech innovation", "isCorrect": false },
          { "text": "Rustic and cozy", "isCorrect": true },
          { "text": "Corporate professionalism", "isCorrect": false },
          { "text": "Futuristic", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "What issue does this example illustrate?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748351259/bf68c125-a97b-4088-b8ef-a40e21a097c7_m4g4pq.png",
        "options": [
          { "text": "Consistent branding", "isCorrect": false },
          { "text": "Branding inconsistency", "isCorrect": true },
          { "text": "Effective use of color", "isCorrect": false },
          { "text": "Balanced design", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "Which design principle is violated in this poster?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748351256/1afbf2a7-7738-4779-a601-35fa1d5f4bfb_sgzr44.png",
        "options": [
          { "text": "Alignment", "isCorrect": true },
          { "text": "Proximity", "isCorrect": false },
          { "text": "Repetition", "isCorrect": false },
          { "text": "Contrast", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "Which banner demonstrates a branding error?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748351250/1d17a523-9fdf-4be1-bfd8-0e834ca3aef9_eadwzs.png",
        "options": [
          { "text": "First banner", "isCorrect": false },
          { "text": "Second banner", "isCorrect": false },
          { "text": "Third banner", "isCorrect": true },
          { "text": "No error", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "What layout problem is illustrated by the off-grid headline?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748351245/9ef281c7-7ff7-42d4-8539-655b864ea0f3_tzibbb.png",
        "options": [
          { "text": "Poor color choice", "isCorrect": false },
          { "text": "Unaligned elements", "isCorrect": true },
          { "text": "Lack of contrast", "isCorrect": false },
          { "text": "Overuse of whitespace", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "What visual inconsistency is present?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748351263/d11401b2-2086-40c7-91f2-8d4f2b30dca1_fjywkc.png",
        "options": [
          { "text": "Missing icon", "isCorrect": false },
          { "text": "Inconsistent style", "isCorrect": true },
          { "text": "Monochrome palette", "isCorrect": false },
          { "text": "Excessive detail", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "Which descriptive word best fits the style of this mood board?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748351272/e8a18bcf-10f6-43ab-b6e7-cfe1599880af_q89fsg.png",
        "options": [
          { "text": "Urban", "isCorrect": false },
          { "text": "Nature-inspired", "isCorrect": true },
          { "text": "Futuristic", "isCorrect": false },
          { "text": "Luxury", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "Which design principle is violated here?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748351235/ca72e701-473f-4603-a65c-6cf6629ae852_tkg3wp.png",
        "options": [
          { "text": "Contrast", "isCorrect": false },
          { "text": "Alignment", "isCorrect": true },
          { "text": "Hierarchy", "isCorrect": false },
          { "text": "Balance", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "What is the main issue with the second mockup?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748351241/7041c3cc-72d3-41f8-b7b3-6ae4a2a57ac0_khyslo.png",
        "options": [
          { "text": "Adheres to brand guidelines", "isCorrect": false },
          { "text": "Minimalistic design", "isCorrect": false },
          { "text": "Inconsistent branding", "isCorrect": true },
          { "text": "Too much whitespace", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "What layout problem is shown in the second example?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748351237/1234a7da-381f-4d66-80ee-5b859cfeaf8c_tdppu1.png",
        "options": [
          { "text": "Good use of negative space", "isCorrect": false },
          { "text": "Misalignment of elements", "isCorrect": true },
          { "text": "Consistent typography", "isCorrect": false },
          { "text": "Proper grid usage", "isCorrect": false }
        ],
        "difficulty": "easy"
      }
    ],
    isAvailable : true,
    category : 'Creative Director'
  },
  {
    title : 'Level 2',
    questions : [
      {
        "questionType": "text",
        "text": "In a \"Branded House\" brand architecture, sub-brands share the master brand's identity (often with minor variations). Which of the following is an example of a \"Branded House\" company?",
        "options": [
          { "text": "Procter & Gamble (individual brands)", "isCorrect": false },
          { "text": "Virgin Group", "isCorrect": false },
          { "text": "FedEx and its divisions", "isCorrect": true },
          { "text": "Unilever (distinct brands)", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Nestle markets KitKat using the Nestle name (e.g. \"KitKat by Nestle\"). This is an example of which brand architecture model?",
        "options": [
          { "text": "Branded House", "isCorrect": false },
          { "text": "Endorsed Brand", "isCorrect": true },
          { "text": "House of Brands", "isCorrect": false },
          { "text": "Hybrid Brand", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "A creative brief outlines the objectives, audience, key message, and deliverables of a project. What is it NOT intended to do?",
        "options": [
          { "text": "Align the creative team", "isCorrect": false },
          { "text": "Define success metrics", "isCorrect": false },
          { "text": "Include the project’s creative requirements", "isCorrect": false },
          { "text": "Serve as a legal contract", "isCorrect": true }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "When running a marketing campaign across multiple platforms, what is crucial to maintain for brand recognition?",
        "options": [
          { "text": "Identical visuals on every channel", "isCorrect": false },
          { "text": "A unified creative theme", "isCorrect": true },
          { "text": "Launching on all channels simultaneously", "isCorrect": false },
          { "text": "Unlimited budget", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "In a creative review process, when is the design cycle considered complete?",
        "options": [
          { "text": "When the designer feels it is done", "isCorrect": false },
          { "text": "After the first review round", "isCorrect": false },
          { "text": "When the final approver signs off", "isCorrect": true },
          { "text": "When the budget is exhausted", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "In product design, User Interface (UI) refers to the product’s look and interactivity, while User Experience (UX) refers to the overall experience. Based on this, what does UX stand for?",
        "options": [
          { "text": "User Interaction", "isCorrect": false },
          { "text": "User Experience", "isCorrect": true },
          { "text": "Ultimate eXperience", "isCorrect": false },
          { "text": "User Exchange", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Inclusive design encourages solving for one individual's needs and extending the benefit to many. What principle does this illustrate?",
        "options": [
          { "text": "Solve for one, extend to many", "isCorrect": true },
          { "text": "One size fits all", "isCorrect": false },
          { "text": "Ignore edge cases", "isCorrect": false },
          { "text": "Design exclusively", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Which of these ensures consistency in typography, colors, and components across a multi-platform campaign?",
        "options": [
          { "text": "Brand guidelines", "isCorrect": true },
          { "text": "Viral marketing", "isCorrect": false },
          { "text": "Open source fonts", "isCorrect": false },
          { "text": "Ad-hoc approvals", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Which creative team member is typically responsible for translating marketing objectives into creative strategy documents?",
        "options": [
          { "text": "Graphic Designer", "isCorrect": false },
          { "text": "Content Strategist", "isCorrect": true },
          { "text": "Art Director", "isCorrect": false },
          { "text": "Printer", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "When estimating a campaign’s budget, which of the following costs should be included?",
        "options": [
          { "text": "Shooting stock video footage", "isCorrect": true },
          { "text": "Competitor advertising spend", "isCorrect": false },
          { "text": "Company stock price", "isCorrect": false },
          { "text": "Weather forecast", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What is a \"media mix\" in campaign planning?",
        "options": [
          { "text": "Combination of marketing channels used", "isCorrect": true },
          { "text": "Budget allocation method", "isCorrect": false },
          { "text": "Color scheme selection", "isCorrect": false },
          { "text": "Typography choice", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "How does a creative brief differ from a project brief?",
        "options": [
          { "text": "It focuses on the creative requirements and inspiration for designers", "isCorrect": true },
          { "text": "It details every technical specification", "isCorrect": false },
          { "text": "It is only used for film production", "isCorrect": false },
          { "text": "It outlines legal regulations", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What is a common benefit of gathering user feedback throughout the design process?",
        "options": [
          { "text": "Slows down project completion", "isCorrect": false },
          { "text": "Aligns the product with user needs", "isCorrect": true },
          { "text": "Eliminates all design errors", "isCorrect": false },
          { "text": "Increases marketing budget", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "As a Creative Director, what is a best practice when collaborating with copywriters?",
        "options": [
          { "text": "Provide them with clear brand tone guidelines and feedback", "isCorrect": true },
          { "text": "Ignore copy until final design", "isCorrect": false },
          { "text": "Let them write anything with no direction", "isCorrect": false },
          { "text": "Hire only AI writers", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What is the primary responsibility of an Art Director on a campaign?",
        "options": [
          { "text": "Managing the budget", "isCorrect": false },
          { "text": "Overseeing the visual design elements", "isCorrect": true },
          { "text": "Writing the brand story", "isCorrect": false },
          { "text": "Scheduling meetings", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "When designing a multi-screen user flow, what should be consistent to ensure a smooth experience?",
        "options": [
          { "text": "Inconsistent color palettes", "isCorrect": false },
          { "text": "Placement of key messages", "isCorrect": true },
          { "text": "Completely different themes", "isCorrect": false },
          { "text": "Random navigation labels", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "For responsive design, how should font sizes be handled across devices?",
        "options": [
          { "text": "Use absolute points for all devices", "isCorrect": false },
          { "text": "Scale font sizes (e.g., via em or rem units)", "isCorrect": true },
          { "text": "Keep text the same pixel size", "isCorrect": false },
          { "text": "Use images for all text", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "In multi-platform design, which color contrast ratio is recommended for text readability on digital screens?",
        "options": [
          { "text": "1:1 (black on black)", "isCorrect": false },
          { "text": "4.5:1 or higher", "isCorrect": true },
          { "text": "0.5:1 (very low contrast)", "isCorrect": false },
          { "text": "No contrast required", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What is typically lower fidelity: a wireframe or a polished prototype?",
        "options": [
          { "text": "Wireframe", "isCorrect": true },
          { "text": "Prototype", "isCorrect": false },
          { "text": "Final product", "isCorrect": false },
          { "text": "Mockup", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What file format might you share for a high-fidelity interactive prototype?",
        "options": [
          { "text": "ZIP file", "isCorrect": false },
          { "text": "Interactive PDF or HTML", "isCorrect": true },
          { "text": "Plain text", "isCorrect": false },
          { "text": "JPEG image", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "In creative agencies, who usually approves the final creative work before client presentation?",
        "options": [
          { "text": "Creative Director", "isCorrect": true },
          { "text": "Graphic Designer", "isCorrect": false },
          { "text": "Competitor", "isCorrect": false },
          { "text": "Junior Intern", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Which of these tools is commonly used to create collaborative design mockups?",
        "options": [
          { "text": "Photoshop", "isCorrect": false },
          { "text": "Figma", "isCorrect": true },
          { "text": "Excel", "isCorrect": false },
          { "text": "Notepad", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What is the purpose of a brand visual audit?",
        "options": [
          { "text": "To ensure consistency of brand visuals across all media", "isCorrect": true },
          { "text": "To calculate ROI", "isCorrect": false },
          { "text": "To increase social media likes", "isCorrect": false },
          { "text": "To launch a new product", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Why must a Creative Director consider copyright law when commissioning new artwork?",
        "options": [
          { "text": "To avoid legal issues for using unlicensed material", "isCorrect": true },
          { "text": "Because clients always ignore it", "isCorrect": false },
          { "text": "It's not their responsibility", "isCorrect": false },
          { "text": "It increases profit margins", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Which metric might a Creative Director track to evaluate a campaign’s engagement?",
        "options": [
          { "text": "Click-through rate", "isCorrect": true },
          { "text": "Number of drafts created", "isCorrect": false },
          { "text": "Emails sent to team", "isCorrect": false },
          { "text": "Coffee consumed", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "How should a Creative Director handle conflicting feedback from multiple stakeholders?",
        "options": [
          { "text": "Align feedback with project goals and mediate the discussion", "isCorrect": true },
          { "text": "Implement all feedback simultaneously", "isCorrect": false },
          { "text": "Ignore feedback and proceed", "isCorrect": false },
          { "text": "Blame the copywriter", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "When a design includes user flow diagrams, which team member likely contributed to this artifact?",
        "options": [
          { "text": "Art Director", "isCorrect": false },
          { "text": "UX Designer", "isCorrect": true },
          { "text": "Copywriter", "isCorrect": false },
          { "text": "Accountant", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What is a benefit of using a version control system (like Git) for creative files?",
        "options": [
          { "text": "Track changes and enable rollback if needed", "isCorrect": true },
          { "text": "Automatically design the project", "isCorrect": false },
          { "text": "Remove the need for backups", "isCorrect": false },
          { "text": "Create random color palettes", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Which practice fosters better collaboration between designers and developers?",
        "options": [
          { "text": "Late hand-offs", "isCorrect": false },
          { "text": "Using a shared design system", "isCorrect": true },
          { "text": "Working in isolation", "isCorrect": false },
          { "text": "Frequent last-minute changes", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Why include alt text for images in digital campaign assets?",
        "options": [
          { "text": "To improve SEO and accessibility for users with screen readers", "isCorrect": true },
          { "text": "For no reason", "isCorrect": false },
          { "text": "To increase file size", "isCorrect": false },
          { "text": "To distract users", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What should a Creative Director consider when targeting an international audience?",
        "options": [
          { "text": "Local cultural norms and language differences", "isCorrect": true },
          { "text": "Only the color red", "isCorrect": false },
          { "text": "Using only global memes", "isCorrect": false },
          { "text": "Avoiding any testing", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Which element reflects a brand’s personality beyond its visual identity?",
        "options": [
          { "text": "Copywriting tone", "isCorrect": true },
          { "text": "Ink composition", "isCorrect": false },
          { "text": "Pixel density", "isCorrect": false },
          { "text": "Server location", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "How can a design team reduce the environmental impact of campaign materials?",
        "options": [
          { "text": "Use recycled materials and minimize waste", "isCorrect": true },
          { "text": "Use the heaviest paper", "isCorrect": false },
          { "text": "Ignore environmental concerns", "isCorrect": false },
          { "text": "Print endless proofs", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "What is a Gantt chart used for in creative project management?",
        "options": [
          { "text": "Tracking project tasks and timelines", "isCorrect": true },
          { "text": "Color scheme planning", "isCorrect": false },
          { "text": "Writing design copy", "isCorrect": false },
          { "text": "Scheduling social media posts", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Why is it beneficial to have multiple design review rounds?",
        "options": [
          { "text": "To refine the creative through iterative feedback", "isCorrect": true },
          { "text": "To slow down the project", "isCorrect": false },
          { "text": "To confuse team members", "isCorrect": false },
          { "text": "To reduce final quality", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "What aspect of the campaign is flawed?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748352034/e03ada2d-ce41-45a3-979c-1861c2323b93_uxzfcx.png",
        "options": [
          { "text": "Consistent branding", "isCorrect": false },
          { "text": "Typos in copy", "isCorrect": false },
          { "text": "Brand inconsistency", "isCorrect": true },
          { "text": "Balanced design", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "What problem is shown in the second mockup?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748352008/07831c97-e0d5-4223-a7c4-ff19bb130b6c_mohmzr.png",
        "options": [
          { "text": "Strong hierarchy", "isCorrect": false },
          { "text": "Content hierarchy issue", "isCorrect": true },
          { "text": "Perfect usability", "isCorrect": false },
          { "text": "Color mismatch", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "What storytelling issue is depicted here?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748352029/7104c61f-6f8d-4551-9984-35414eb02a80_plorf7.png",
        "options": [
          { "text": "Strong narrative flow", "isCorrect": false },
          { "text": "Poor storytelling consistency", "isCorrect": true },
          { "text": "Excellent pacing", "isCorrect": false },
          { "text": "Strong alignment", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "Which design principle is being violated in the second version?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748352042/9cb4fc4e-439b-434a-b09e-b4634bcebe5f_p9neyj.png",
        "options": [
          { "text": "Balance", "isCorrect": false },
          { "text": "Alignment", "isCorrect": true },
          { "text": "Contrast", "isCorrect": false },
          { "text": "Proximity", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "What branding problem does the second template have?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748352053/cd70d62e-ebb4-4d02-8ae0-6b5c313360e6_uz7xik.png",
        "options": [
          { "text": "Strong branding", "isCorrect": false },
          { "text": "Inconsistent brand identity", "isCorrect": true },
          { "text": "Effective segmentation", "isCorrect": false },
          { "text": "Personalization", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "What design inconsistency is present?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748352037/2b7dd042-f4e4-4343-81e8-337f29008dae_jg5i2r.png",
        "options": [
          { "text": "Icon interactivity", "isCorrect": false },
          { "text": "Style inconsistency", "isCorrect": true },
          { "text": "Color palette issue", "isCorrect": false },
          { "text": "Typography", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "What is the main problem with the second poster?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748352024/70e4e155-29e6-48a8-929b-152705265c89_nbkx0z.png",
        "options": [
          { "text": "Balanced composition", "isCorrect": false },
          { "text": "Lack of visual hierarchy", "isCorrect": true },
          { "text": "Good use of images", "isCorrect": false },
          { "text": "Proper whitespace", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "What issue is shown in the second sequence?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748352019/446877b7-ce2c-4f9d-86b4-ec222808d6e5_dlbbqd.png",
        "options": [
          { "text": "Logical flow", "isCorrect": false },
          { "text": "Broken user flow", "isCorrect": true },
          { "text": "Consistent design", "isCorrect": false },
          { "text": "High engagement", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "Which logo is violating brand guidelines?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748352010/378c5c1a-8b93-4915-a5c9-26d768f9ff5d_amum4k.png",
        "options": [
          { "text": "Left logo", "isCorrect": false },
          { "text": "Right logo", "isCorrect": true },
          { "text": "Both are correct", "isCorrect": false },
          { "text": "Neither is correct", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "What is the main issue on page 2?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748352015/399bbd8e-8f39-44ce-98c9-1ac18a7489a0_zhccgf.png",
        "options": [
          { "text": "Poor font choice", "isCorrect": false },
          { "text": "Inconsistent typography size", "isCorrect": true },
          { "text": "Strong consistency", "isCorrect": false },
          { "text": "Alignment error", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "This is an example of which storytelling approach?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748352049/f219ec8c-674b-48bb-a17e-173e37bca85f_yvd4ho.png",
        "options": [
          { "text": "Literal depiction", "isCorrect": false },
          { "text": "Metaphorical storytelling", "isCorrect": true },
          { "text": "Copy-heavy design", "isCorrect": false },
          { "text": "Data visualization", "isCorrect": false }
        ],
        "difficulty": "medium"
      }
    ],
    isAvailable : true,
    category : 'Creative Director'
  },
  {
    title : 'Level 3',
    questions : [
      {
        "questionType": "text",
        "text": "Vision setting in leadership involves defining a clear and inspiring strategic direction. What is one key benefit of effective vision setting?",
        "options": [
          { "text": "Fosters employee motivation and innovation", "isCorrect": true },
          { "text": "Garantees immediate profit", "isCorrect": false },
          { "text": "Removes need for a strategy", "isCorrect": false },
          { "text": "Limits creativity", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Brand stewardship refers to the commitment to nurture and safeguard a brand’s essence. Which action exemplifies brand stewardship?",
        "options": [
          { "text": "Treating the brand as your own and ensuring consistency", "isCorrect": true },
          { "text": "Changing logos frequently", "isCorrect": false },
          { "text": "Ignoring brand values", "isCorrect": false },
          { "text": "Focusing only on sales", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Brand stewardship depends on cross-functional alignment. Who should act as a brand steward in an organization?",
        "options": [
          { "text": "Only the marketing team", "isCorrect": false },
          { "text": "Designers only", "isCorrect": false },
          { "text": "Every employee and stakeholder", "isCorrect": true },
          { "text": "Only the CEO", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "If an organization wants to protect its logo, which form of intellectual property should it register?",
        "options": [
          { "text": "Patent", "isCorrect": false },
          { "text": "Trademark", "isCorrect": true },
          { "text": "Copyright", "isCorrect": false },
          { "text": "Trade secret", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "A Creative Director is considering adding diverse models to an ad campaign. This is primarily an example of which strategy?",
        "options": [
          { "text": "Inclusive design strategy", "isCorrect": true },
          { "text": "Cost reduction strategy", "isCorrect": false },
          { "text": "Narrow targeting", "isCorrect": false },
          { "text": "Low-budget production", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "A design review uncovered that international colors might be misinterpreted in some markets. This best reflects consideration of which concept?",
        "options": [
          { "text": "Inclusive design", "isCorrect": true },
          { "text": "Brand guidelines", "isCorrect": false },
          { "text": "Marketing ROI", "isCorrect": false },
          { "text": "Client preferences", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What is the purpose of a visual brand audit?",
        "options": [
          { "text": "To evaluate how the brand is shared across all platforms and materials", "isCorrect": true },
          { "text": "To design new assets", "isCorrect": false },
          { "text": "To calculate budget", "isCorrect": false },
          { "text": "To hire new team members", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Which of the following is NOT typically considered an intangible asset?",
        "options": [
          { "text": "Trademark", "isCorrect": false },
          { "text": "Brand name", "isCorrect": false },
          { "text": "Customer loyalty", "isCorrect": false },
          { "text": "Office furniture", "isCorrect": true }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "When defending a creative campaign’s tagline from infringement, which law is most relevant?",
        "options": [
          { "text": "Patent law", "isCorrect": false },
          { "text": "Trademark law", "isCorrect": true },
          { "text": "Real estate law", "isCorrect": false },
          { "text": "Admiralty law", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Stakeholder feedback on a campaign is conflicting. What is the best approach for a Creative Director?",
        "options": [
          { "text": "Schedule a meeting to align feedback with the original vision", "isCorrect": true },
          { "text": "Implement all requested changes immediately", "isCorrect": false },
          { "text": "Ignore the feedback", "isCorrect": false },
          { "text": "Make changes randomly", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Measuring a brand’s health often involves assessing long-term metrics. Which metric is commonly used?",
        "options": [
          { "text": "Click-through rate", "isCorrect": false },
          { "text": "Brand awareness or recall", "isCorrect": true },
          { "text": "Immediate sales only", "isCorrect": false },
          { "text": "Number of designers", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What is a risk of not respecting intellectual property when using stock images in a campaign?",
        "options": [
          { "text": "Faster design process", "isCorrect": false },
          { "text": "Potential legal action and penalties", "isCorrect": true },
          { "text": "Higher user engagement", "isCorrect": false },
          { "text": "Better search engine ranking", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "An advanced creative strategy might include co-creation with other departments. This is known as what?",
        "options": [
          { "text": "Isolated workflow", "isCorrect": false },
          { "text": "Cross-functional innovation", "isCorrect": true },
          { "text": "Individual work", "isCorrect": false },
          { "text": "Vertical integration", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "How should a Creative Director evaluate the effectiveness of creative messaging across social, print, and web channels?",
        "options": [
          { "text": "Track consistent KPIs like brand lift or engagement across channels", "isCorrect": true },
          { "text": "Use a different completely isolated strategy for each channel", "isCorrect": false },
          { "text": "Ignore channel differences", "isCorrect": false },
          { "text": "Only focus on print metrics", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "A brand campaign uses images that are culturally sensitive. What practice is this an example of?",
        "options": [
          { "text": "Ignoring the audience", "isCorrect": false },
          { "text": "Cultural inclusivity in design", "isCorrect": true },
          { "text": "Standard branding", "isCorrect": false },
          { "text": "Universal design", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "When rebranding a company, what is a key step a Creative Director should take first?",
        "options": [
          { "text": "Review existing brand equity and how stakeholders perceive the brand", "isCorrect": true },
          { "text": "Change all marketing materials immediately", "isCorrect": false },
          { "text": "Remove the old logo overnight", "isCorrect": false },
          { "text": "Surprise the CEO with a random design", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Creative leadership often involves mentoring team members. Which approach is most effective?",
        "options": [
          { "text": "Providing constructive feedback and development opportunities", "isCorrect": true },
          { "text": "Assigning tasks without explanation", "isCorrect": false },
          { "text": "Changing leaders frequently", "isCorrect": false },
          { "text": "Setting unrealistic deadlines", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "If user feedback indicates that a product concept is confusing, what should be the Creative Director’s next step?",
        "options": [
          { "text": "Revisit and refine the concept based on insights", "isCorrect": true },
          { "text": "Blame the UX team", "isCorrect": false },
          { "text": "Cancel the project immediately", "isCorrect": false },
          { "text": "Ignore the feedback", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "How does the Creative Director ensure brand cohesion during a rebranding?",
        "options": [
          { "text": "Conduct a thorough brand audit and update all assets according to new guidelines", "isCorrect": true },
          { "text": "Only redesign the logo", "isCorrect": false },
          { "text": "Update social media only", "isCorrect": false },
          { "text": "Change colors randomly", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "A viral social campaign unexpectedly causes public confusion about the brand. What skill is critical for the Creative Director to manage this situation?",
        "options": [
          { "text": "Crisis communication and brand stewardship", "isCorrect": true },
          { "text": "Graphic design proficiency", "isCorrect": false },
          { "text": "Personal photography", "isCorrect": false },
          { "text": "Coding ability", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What is one way a Creative Director can encourage a culture of innovation?",
        "options": [
          { "text": "Allocate time for team members to experiment and explore new ideas", "isCorrect": true },
          { "text": "Maintain strict control over all ideas", "isCorrect": false },
          { "text": "Discourage risk-taking", "isCorrect": false },
          { "text": "Focus only on past successes", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Which of these is a consideration when designing for accessibility?",
        "options": [
          { "text": "Ignoring color contrast", "isCorrect": false },
          { "text": "Providing alternative text for images", "isCorrect": true },
          { "text": "Using only one font for all content", "isCorrect": false },
          { "text": "Avoiding user testing", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "How should a Creative Director address intellectual property for user-submitted content in a campaign?",
        "options": [
          { "text": "Obtain appropriate release forms or licenses before use", "isCorrect": true },
          { "text": "Assume the user owns it", "isCorrect": false },
          { "text": "Use it freely without permission", "isCorrect": false },
          { "text": "Ask the user later", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Why might a Creative Director choose to create an internal brand style guide for a company?",
        "options": [
          { "text": "To ensure all teams maintain consistent visual and verbal identity across initiatives", "isCorrect": true },
          { "text": "To add more documents", "isCorrect": false },
          { "text": "To replace external marketing", "isCorrect": false },
          { "text": "To confuse new hires", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "In evaluating multiple concept boards for a high-stakes pitch, what criteria should the Creative Director prioritize?",
        "options": [
          { "text": "Alignment with brand strategy and target audience appeal", "isCorrect": true },
          { "text": "Random personal preferences", "isCorrect": false },
          { "text": "Cost of printing only", "isCorrect": false },
          { "text": "Number of slides", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What role does storytelling play in advanced creative strategy?",
        "options": [
          { "text": "It helps connect brand message to audience emotions and values", "isCorrect": true },
          { "text": "It's not important", "isCorrect": false },
          { "text": "It only applies to movies", "isCorrect": false },
          { "text": "It replaces the need for design", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Which of the following best reflects an inclusive design approach in marketing?",
        "options": [
          { "text": "Using diverse models and accessible formats to reach a broad audience", "isCorrect": true },
          { "text": "Ignoring minority groups", "isCorrect": false },
          { "text": "Using niche slang", "isCorrect": false },
          { "text": "Designing for the average user only", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What is a key difference between a patent and a trademark in the creative industry?",
        "options": [
          { "text": "A patent protects inventions, whereas a trademark protects brand identifiers", "isCorrect": true },
          { "text": "A patent is indefinite, a trademark expires", "isCorrect": false },
          { "text": "A trademark protects inventions, a patent brand name", "isCorrect": false },
          { "text": "They are the same", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "How can a Creative Director ensure that a campaign remains relevant over time?",
        "options": [
          { "text": "Continuously gather audience feedback and adjust creative elements", "isCorrect": true },
          { "text": "Launch and never update", "isCorrect": false },
          { "text": "Use only trends", "isCorrect": false },
          { "text": "Ignore performance data", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "If a particular visual motif is overused in the market, what strategy might a Creative Director take?",
        "options": [
          { "text": "Innovate with a unique visual approach to stand out", "isCorrect": true },
          { "text": "Copy it more closely", "isCorrect": false },
          { "text": "Remove all visuals", "isCorrect": false },
          { "text": "Abandon the campaign", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What is the significance of \"brand voice\" in high-level creative leadership?",
        "options": [
          { "text": "It defines how the brand communicates its personality and values consistently across content", "isCorrect": true },
          { "text": "It's just marketing jargon", "isCorrect": false },
          { "text": "It only matters for social media", "isCorrect": false },
          { "text": "It means choosing the correct font", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "When a new competitor enters the market, what strategic action should the Creative Director take with brand messaging?",
        "options": [
          { "text": "Assess and refine messaging to emphasize unique brand value", "isCorrect": true },
          { "text": "Ignore the competitor", "isCorrect": false },
          { "text": "Reduce creative efforts", "isCorrect": false },
          { "text": "Immediately lower prices", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "What does a \"golden thread\" mean in the context of a multi-phase campaign?",
        "options": [
          { "text": "A consistent narrative or theme tying all phases together", "isCorrect": true },
          { "text": "A color scheme", "isCorrect": false },
          { "text": "A printing technique", "isCorrect": false },
          { "text": "A literal thread", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Which metric might a Creative Director use to gauge cross-channel campaign impact?",
        "options": [
          { "text": "Brand lift studies or multi-touch attribution", "isCorrect": true },
          { "text": "Number of design variants", "isCorrect": false },
          { "text": "Ink usage", "isCorrect": false },
          { "text": "Daily coffee consumption", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "In strategic creative planning, why is it important to consider both customer insights and business goals?",
        "options": [
          { "text": "To ensure campaigns are both relevant to the audience and aligned with company objectives", "isCorrect": true },
          { "text": "To complicate the process", "isCorrect": false },
          { "text": "To use all available data", "isCorrect": false },
          { "text": "To avoid creative ideas", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "What is a potential risk of this rebranding change?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748352791/c70e52c4-b371-4b70-80dc-dbde29a9de53_zpqv7p.png",
        "options": [
          { "text": "Enhances brand recognition", "isCorrect": false },
          { "text": "Alienating existing customers", "isCorrect": true },
          { "text": "Following traditional branding", "isCorrect": false },
          { "text": "Lower printing costs", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "Which concept is an example of conceptual storytelling?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748352779/b4e62ab8-3d69-4ce8-9f9a-73e92f10d0d0_ukxvpi.png",
        "options": [
          { "text": "The photo of the product", "isCorrect": false },
          { "text": "The metaphorical illustration", "isCorrect": true },
          { "text": "Neither", "isCorrect": false },
          { "text": "Both", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "What aspect is most critical for maintaining a unified campaign across channels?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748352782/d9a89546-883a-4c51-bf5c-74e454e9810e_x8woka.png",
        "options": [
          { "text": "Same color palette and theme", "isCorrect": true },
          { "text": "Different messaging on each", "isCorrect": false },
          { "text": "Random fonts", "isCorrect": false },
          { "text": "Multiple unrelated taglines", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "What issue does the fourth ad exhibit?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748352796/be809d6a-c730-437f-ac77-91a920ded09e_o4ciek.png",
        "options": [
          { "text": "Strong theme consistency", "isCorrect": false },
          { "text": "Inconsistency in visual theme", "isCorrect": true },
          { "text": "Excellent creativity", "isCorrect": false },
          { "text": "Proper target audience", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "What critique could be made about mixing these visual styles?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748352802/42992f8e-7979-43a6-b4f3-3e1ec438653f_kfbu1w.png",
        "options": [
          { "text": "Cluttered design", "isCorrect": false },
          { "text": "Mixed messaging and lack of cohesive style", "isCorrect": true },
          { "text": "Enhanced engagement", "isCorrect": false },
          { "text": "Professional consistency", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "Which version is more aligned with narrative brand-building?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748352806/db7d367e-2146-4cc6-a6c9-5ea971a1f3a8_shxgcv.png",
        "options": [
          { "text": "The product-focused layout", "isCorrect": false },
          { "text": "The heritage storytelling layout", "isCorrect": true },
          { "text": "Both equally", "isCorrect": false },
          { "text": "Neither", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "What is the main critique of the campaign ad design?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748352787/f2728954-0894-4a23-950e-2a155109c876_xhvwkx.png",
        "options": [
          { "text": "On-brand humor", "isCorrect": false },
          { "text": "Tone inconsistency", "isCorrect": true },
          { "text": "Strict adherence to guidelines", "isCorrect": false },
          { "text": "Perfect alignment", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "Which approach likely has more timeless appeal and why?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748352822/53b04f48-57fa-4cc1-9722-e2e19292b5a8_v6nk8i.png",
        "options": [
          { "text": "Minimalist geometric – it tends to be more timeless", "isCorrect": true },
          { "text": "Detailed illustration – shows creativity", "isCorrect": false },
          { "text": "Neither – both are seasonal", "isCorrect": false },
          { "text": "Both have equal appeal", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "Which element indicates strong cross-platform cohesion?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748352816/a203db9d-62fb-470e-be96-04b78c336a8b_gj2dfe.png",
        "options": [
          { "text": "Consistent use of brand elements (logo, color, typography)", "isCorrect": true },
          { "text": "Different layouts on each device", "isCorrect": false },
          { "text": "Unrelated imagery", "isCorrect": false },
          { "text": "Varying calls to action", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "What is a valid observation about the new design approach?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748352812/57b181e3-008c-4eae-a687-e18267643024_ywddjv.png",
        "options": [
          { "text": "It maintains the exact style", "isCorrect": false },
          { "text": "It introduces a more minimalist look", "isCorrect": true },
          { "text": "It reverts to old fonts", "isCorrect": false },
          { "text": "It uses more colors", "isCorrect": false }
        ],
        "difficulty": "hard"
      }
    ],
    isAvailable : true,
    category : 'Creative Director'
  },
]

const new3dDestemplates = [
  {
    title : 'Level 1',
    questions : [
      {
        "questionType": "text",
        "text": "In Blender’s Edit Mode, which key extrudes selected faces or edges?",
        "options": [
          { "text": "G", "isCorrect": false },
          { "text": "E", "isCorrect": true },
          { "text": "X", "isCorrect": false },
          { "text": "S", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which keyboard shortcut in Blender activates the scale tool?",
        "options": [
          { "text": "S", "isCorrect": true },
          { "text": "R", "isCorrect": false },
          { "text": "X", "isCorrect": false },
          { "text": "M", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which key activates rotation of a selected object in Blender?",
        "options": [
          { "text": "G", "isCorrect": false },
          { "text": "R", "isCorrect": true },
          { "text": "E", "isCorrect": false },
          { "text": "B", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which key moves (grabs) an object in Blender’s 3D Viewport?",
        "options": [
          { "text": "M", "isCorrect": false },
          { "text": "V", "isCorrect": false },
          { "text": "G", "isCorrect": true },
          { "text": "T", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What is Blender’s native file extension for scene files?",
        "options": [
          { "text": ".blend", "isCorrect": true },
          { "text": ".c4d", "isCorrect": false },
          { "text": ".fbx", "isCorrect": false },
          { "text": ".obj", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What file extension is specific to Cinema 4D projects?",
        "options": [
          { "text": ".c4d", "isCorrect": true },
          { "text": ".blend", "isCorrect": false },
          { "text": ".max", "isCorrect": false },
          { "text": ".3ds", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which of the following is a neutral/interchangeable 3D file format?",
        "options": [
          { "text": ".blend", "isCorrect": false },
          { "text": ".c4d", "isCorrect": false },
          { "text": ".obj", "isCorrect": true },
          { "text": ".max", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "In Blender viewport shading, what does the Wireframe mode display?",
        "options": [
          { "text": "Full shaded geometry", "isCorrect": false },
          { "text": "Only edges of objects", "isCorrect": true },
          { "text": "Textured view", "isCorrect": false },
          { "text": "Material preview", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which viewport shading mode in Blender uses the Workbench renderer for flat lighting?",
        "options": [
          { "text": "Material Preview", "isCorrect": false },
          { "text": "Rendered", "isCorrect": false },
          { "text": "Wireframe", "isCorrect": false },
          { "text": "Solid", "isCorrect": true }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Pressing Z in the Blender 3D Viewport does what?",
        "options": [
          { "text": "Opens the shading mode pie menu", "isCorrect": true },
          { "text": "Toggles X-Ray on/off", "isCorrect": false },
          { "text": "Centers the view on the object", "isCorrect": false },
          { "text": "Switches to camera view", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What shortcut toggles between Perspective and Orthographic view in Blender?",
        "options": [
          { "text": "Numpad 0", "isCorrect": false },
          { "text": "Numpad 5", "isCorrect": true },
          { "text": "Numpad 1", "isCorrect": false },
          { "text": "Numpad 9", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which Numpad key switches to the Front view in Blender?",
        "options": [
          { "text": "3", "isCorrect": false },
          { "text": "7", "isCorrect": false },
          { "text": "1", "isCorrect": true },
          { "text": "0", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which keys rotate the 3D View by small increments in Blender?",
        "options": [
          { "text": "Arrow keys", "isCorrect": false },
          { "text": "2, 4, 6, 8 on Numpad", "isCorrect": true },
          { "text": "Shift + arrow keys", "isCorrect": false },
          { "text": "Ctrl + W, A, S, D", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "In Blender Edit Mode, which number keys switch between vertex, edge, and face select modes?",
        "options": [
          { "text": "4, 5, 6", "isCorrect": false },
          { "text": "1, 2, 3", "isCorrect": true },
          { "text": "7, 8, 9", "isCorrect": false },
          { "text": "F1, F2, F3", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What is the default hotkey for Loop Cut and Slide in Blender?",
        "options": [
          { "text": "Ctrl+E", "isCorrect": false },
          { "text": "Ctrl+R", "isCorrect": true },
          { "text": "Alt+R", "isCorrect": false },
          { "text": "Shift+E", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "How do you select an entire edge loop in Blender?",
        "options": [
          { "text": "Ctrl+Click an edge", "isCorrect": false },
          { "text": "Shift+Click an edge", "isCorrect": false },
          { "text": "Alt+Click an edge", "isCorrect": true },
          { "text": "Alt+Click a face", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What is the hotkey for beveling edges in Blender?",
        "options": [
          { "text": "Ctrl+B", "isCorrect": true },
          { "text": "Ctrl+Shift+B", "isCorrect": false },
          { "text": "Alt+B", "isCorrect": false },
          { "text": "B", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which hotkey in Blender insets faces?",
        "options": [
          { "text": "I", "isCorrect": true },
          { "text": "O", "isCorrect": false },
          { "text": "P", "isCorrect": false },
          { "text": "U", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What is the default shortcut to duplicate an object in Blender?",
        "options": [
          { "text": "Shift+D", "isCorrect": true },
          { "text": "Ctrl+D", "isCorrect": false },
          { "text": "Alt+D", "isCorrect": false },
          { "text": "D", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which shortcut joins selected objects into one in Blender?",
        "options": [
          { "text": "Ctrl+L", "isCorrect": false },
          { "text": "Ctrl+J", "isCorrect": true },
          { "text": "Ctrl+Shift+J", "isCorrect": false },
          { "text": "Alt+J", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which key deselects all in Blender?",
        "options": [
          { "text": "A", "isCorrect": true },
          { "text": "B", "isCorrect": false },
          { "text": "C", "isCorrect": false },
          { "text": "D", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What panel in Blender lists all objects in the scene?",
        "options": [
          { "text": "Properties", "isCorrect": false },
          { "text": "Outliner", "isCorrect": true },
          { "text": "UV/Image Editor", "isCorrect": false },
          { "text": "Graph Editor", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which workspace would you use for animating keyframes in Blender?",
        "options": [
          { "text": "Animation workspace (Dopesheet/Timeline)", "isCorrect": true },
          { "text": "Sculpt workspace", "isCorrect": false },
          { "text": "Texture Paint workspace", "isCorrect": false },
          { "text": "Compositing workspace", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which of the following is NOT a primitive shape provided in Blender’s Add menu by default?",
        "options": [
          { "text": "Cube", "isCorrect": false },
          { "text": "Sphere", "isCorrect": false },
          { "text": "Pyramid", "isCorrect": true },
          { "text": "Cylinder", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "In Blender, what happens when you press X?",
        "options": [
          { "text": "Apply scale", "isCorrect": false },
          { "text": "Delete selected", "isCorrect": true },
          { "text": "Extrude faces", "isCorrect": false },
          { "text": "Snap to grid", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which shading mode would you use for a quick material preview in Blender?",
        "options": [
          { "text": "Wireframe", "isCorrect": false },
          { "text": "Solid", "isCorrect": false },
          { "text": "Material Preview", "isCorrect": true },
          { "text": "Outline", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which icon in the Blender toolbar allows switching between Object and Edit mode?",
        "options": [
          { "text": "Rectangle icon", "isCorrect": false },
          { "text": "Cube/Mesh icon with a dot", "isCorrect": false },
          { "text": "Mode selector dropdown at top-left of 3D View", "isCorrect": true },
          { "text": "Search icon", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What file format would you use to export a model for general interchange?",
        "options": [
          { "text": ".blend", "isCorrect": false },
          { "text": ".c4d", "isCorrect": false },
          { "text": ".fbx", "isCorrect": true },
          { "text": ".blend1", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which menu in Blender’s 3D Viewport contains View manipulation shortcuts?",
        "options": [
          { "text": "File", "isCorrect": false },
          { "text": "Edit", "isCorrect": false },
          { "text": "View", "isCorrect": true },
          { "text": "Object", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which gizmo (widget) handles object movement in the 3D View?",
        "options": [
          { "text": "Rotate gizmo (circle)", "isCorrect": false },
          { "text": "Scale gizmo (square handles)", "isCorrect": false },
          { "text": "Move gizmo (arrow handles)", "isCorrect": true },
          { "text": "Resize gizmo (diagonal arrows)", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Where do you set render resolution and output in Blender?",
        "options": [
          { "text": "Viewport shading menu", "isCorrect": false },
          { "text": "Properties Editor > Output settings", "isCorrect": true },
          { "text": "File > Export", "isCorrect": false },
          { "text": "Preferences", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which mode would you use to sculpt organic shapes in Blender?",
        "options": [
          { "text": "Edit Mode", "isCorrect": false },
          { "text": "Sculpt Mode", "isCorrect": true },
          { "text": "Vertex Paint Mode", "isCorrect": false },
          { "text": "Grease Pencil Mode", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What does the Outliner’s funnel (filter) icon do?",
        "options": [
          { "text": "Hides all cameras", "isCorrect": false },
          { "text": "Filters which object types are visible", "isCorrect": true },
          { "text": "Starts a render", "isCorrect": false },
          { "text": "Saves the file", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "Which of these is NOT a default object type in Blender?",
        "options": [
          { "text": "Camera", "isCorrect": false },
          { "text": "Light", "isCorrect": false },
          { "text": "Sun", "isCorrect": false },
          { "text": "River", "isCorrect": true }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "text",
        "text": "What keyboard shortcuts open and close the side-panel (N-panel) in the 3D View?",
        "options": [
          { "text": "N", "isCorrect": true },
          { "text": "T", "isCorrect": false },
          { "text": "V", "isCorrect": false },
          { "text": "M", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "In the image above, all the objects share the same fundamental shape. What primitive shape are they?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748353645/63142e88-b50a-45de-8c8b-da43b4272dbd_zcpl8i.png",
        "options": [
          { "text": "Sphere", "isCorrect": false },
          { "text": "Cylinder", "isCorrect": false },
          { "text": "Cube", "isCorrect": true },
          { "text": "Cone", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "What type of object is shown in the wireframe image?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748353640/4266a367-07c2-49d8-938c-0fe6eb8c3103_fheuzr.png",
        "options": [
          { "text": "A sphere", "isCorrect": false },
          { "text": "A cylinder", "isCorrect": false },
          { "text": "A torus (donut)", "isCorrect": true },
          { "text": "A cube", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "Identify the primitive shape displayed in this wireframe image.",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748353632/269fdd99-0810-49c9-b8a0-8c6c35ffdf43_orthx2.png",
        "options": [
          { "text": "Sphere", "isCorrect": false },
          { "text": "Cylinder", "isCorrect": true },
          { "text": "Pyramid", "isCorrect": false },
          { "text": "Torus", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "Which Blender shortcut is used to toggle this quad-view layout?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748353635/415a420a-cd45-46a3-beb0-b4c88e1ed0cd_qiqytu.png",
        "options": [
          { "text": "Ctrl + Alt + Q", "isCorrect": true },
          { "text": "Ctrl + Q", "isCorrect": false },
          { "text": "Alt + Q", "isCorrect": false },
          { "text": "Shift + Q", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "If you wanted to evenly scale all the cubes upward on the Z-axis only in Blender, which key would you press after selecting them?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748353655/bac96efb-62e7-4653-b881-634af205de28_aexehc.png",
        "options": [
          { "text": "X", "isCorrect": false },
          { "text": "Y", "isCorrect": false },
          { "text": "S then Z", "isCorrect": true },
          { "text": "Alt+S", "isCorrect": false }
        ],
        "difficulty": "easy"
      },
      {
        "questionType": "image",
        "text": "Suppose one cube is highlighted in orange (selected) and you switch to Edit Mode. Which key would let you switch back to Object Mode?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748353650/642a547f-3893-487d-b779-9e53b228e9eb_izfpnx.png",
        "options": [
          { "text": "Tab", "isCorrect": true },
          { "text": "Z", "isCorrect": false },
          { "text": "E", "isCorrect": false },
          { "text": "Ctrl+Tab", "isCorrect": false }
        ],
        "difficulty": "easy"
      }
    ],
    isAvailable : true,
    category : '3D Designer'
  },
  {
    title : 'Level 2',
    questions : [
      {
        "questionType": "text",
        "text": "Mirror Modifier Axes: Blender’s Mirror modifier can mirror a mesh along multiple local axes. If a modeler enables both the X and Y axes in the Mirror modifier, how many mirrored copies of the original mesh are produced?",
        "options": [
          { "text": "2", "isCorrect": false },
          { "text": "3", "isCorrect": false },
          { "text": "4", "isCorrect": true },
          { "text": "5", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Subdivision Surface Settings: In Blender’s Subdivision Surface modifier, the Viewport and Render subdivision levels control mesh smoothness in the 3D View and final render respectively. What happens if the Viewport subdivision level is set higher than the Render subdivision level?",
        "options": [
          { "text": "The viewport appears smoother than the rendered image (viewport quality is higher).", "isCorrect": true },
          { "text": "The viewport and render quality are the same regardless of settings.", "isCorrect": false },
          { "text": "The render will be smoother than the viewport view.", "isCorrect": false },
          { "text": "Blender automatically resets the values to match.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "UV Unwrapping – Mirror Axis: When UV unwrapping a bilaterally symmetric model (like a head or body), where should you place a seam to optimize the UV layout?",
        "options": [
          { "text": "Along the model’s top-bottom axis", "isCorrect": false },
          { "text": "Along the model’s mirror (central) axis", "isCorrect": true },
          { "text": "Randomly, as long as the mesh is connected", "isCorrect": false },
          { "text": "You should not place seams on symmetric objects", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "UV Seams Purpose: In Blender, UV seams mark edges to “cut” the mesh for unwrapping (like cutting fabric). What is the primary purpose of marking a seam on an edge?",
        "options": [
          { "text": "To ensure the texture image is applied twice on each side.", "isCorrect": false },
          { "text": "To define where the 3D model is “cut” so faces can unfold flat.", "isCorrect": true },
          { "text": "To increase the resolution of the UV map in that area.", "isCorrect": false },
          { "text": "To lock that edge during UV editing.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Three-Point Lighting – Fill Light: In a standard three-point lighting setup, what is the main function of the fill light?",
        "options": [
          { "text": "To serve as the brightest key light illuminating the subject.", "isCorrect": false },
          { "text": "To create the subject’s silhouette by shining from behind.", "isCorrect": false },
          { "text": "To soften and illuminate shadows cast by the key light.", "isCorrect": true },
          { "text": "To provide colored ambience to the entire scene.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Render Noise in Cycles: Blender’s Cycles engine uses path tracing, which can produce noise if bright spots are missed. Which of the following is the best way to reduce noise in a Cycles render?",
        "options": [
          { "text": "Lower the number of render samples.", "isCorrect": false },
          { "text": "Increase the number of render samples (more sample rays).", "isCorrect": true },
          { "text": "Turn off motion blur.", "isCorrect": false },
          { "text": "Switch the camera to orthographic.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Keyframe Interpolation: What is the default interpolation mode between keyframes in Blender’s Graph Editor?",
        "options": [
          { "text": "Linear", "isCorrect": false },
          { "text": "Constant (step)", "isCorrect": false },
          { "text": "Bezier (smooth)", "isCorrect": true },
          { "text": "Exponential", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Parent-Child Transform: In Blender, if Object A is parent of Object B, how does transforming Object A affect Object B?",
        "options": [
          { "text": "Transforming A also moves/rotates/scales B (child follows parent).", "isCorrect": true },
          { "text": "Transforming A has no effect on B.", "isCorrect": false },
          { "text": "Only Object B’s rotation is affected.", "isCorrect": false },
          { "text": "Object B’s scale inverts.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Keep Transform in Parenting: When parenting an object in Blender, the Keep Transform option does what?",
        "options": [
          { "text": "Resets the child’s location to the parent’s origin.", "isCorrect": false },
          { "text": "Maintains the child’s current world position/rotation/scale.", "isCorrect": true },
          { "text": "Aligns the child’s orientation to match the parent exactly.", "isCorrect": false },
          { "text": "Unparents the child but preserves parent’s transform.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Camera Focal Length: Adjusting a camera’s Focal Length in Blender primarily changes which aspect of the camera?",
        "options": [
          { "text": "The field of view (angle of view)", "isCorrect": true },
          { "text": "The focus distance of the depth of field", "isCorrect": false },
          { "text": "The camera’s clipping range", "isCorrect": false },
          { "text": "The exposure brightness", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Material Assignment: If you assign a new material to some faces of a mesh in Blender (in Edit Mode), what happens to the rest of the mesh?",
        "options": [
          { "text": "It automatically receives the same material as the newly assigned faces.", "isCorrect": false },
          { "text": "It keeps its previous material(s); only selected faces change.", "isCorrect": true },
          { "text": "It becomes invisible.", "isCorrect": false },
          { "text": "All materials on the mesh are replaced.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Principled BSDF: In Cycles, which shader node combines base color, metallic, specular, and roughness into a final surface output?",
        "options": [
          { "text": "Diffuse BSDF", "isCorrect": false },
          { "text": "Emission Shader", "isCorrect": false },
          { "text": "Principled BSDF", "isCorrect": true },
          { "text": "Texture Coordinate", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Decimate Modifier: In Blender’s Decimate modifier (Collapse mode), setting Ratio = 0.5 does what?",
        "options": [
          { "text": "Removes half of the vertices but keeps faces.", "isCorrect": false },
          { "text": "Keeps half of the original number of faces.", "isCorrect": true },
          { "text": "Doubles the face count.", "isCorrect": false },
          { "text": "Unsubdivides the mesh once.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Edge Creases & Subsurf: What effect do edge crease values have when using a Subdivision Surface modifier?",
        "options": [
          { "text": "They cause the modifier to ignore certain edges.", "isCorrect": false },
          { "text": "They sharpen edges (reduce smoothing) at those creases.", "isCorrect": true },
          { "text": "They automatically mark edges as seams.", "isCorrect": false },
          { "text": "They have no effect on the Subsurf modifier.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Cloner Object (C4D): In Cinema 4D’s MoGraph, which object clones/multiplies a source object according to a specified distribution (grid, radial, etc.)?",
        "options": [
          { "text": "Symmetry", "isCorrect": false },
          { "text": "Cloner", "isCorrect": true },
          { "text": "Array", "isCorrect": false },
          { "text": "PolyFX", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Extrude Tool (C4D): In Cinema 4D, how can you make an extruded shape’s edges automatically bevelled?",
        "options": [
          { "text": "By using the Edge Cut tool.", "isCorrect": false },
          { "text": "By enabling the “Fillet” option in the Extrude tool.", "isCorrect": true },
          { "text": "By adding a Bevel deformer.", "isCorrect": false },
          { "text": "By switching to the Knife tool.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Phong Tag (C4D): In Cinema 4D, what does a Phong Tag do on a polygonal object?",
        "options": [
          { "text": "It applies a default material.", "isCorrect": false },
          { "text": "It smooths shading across polygons to remove faceting.", "isCorrect": true },
          { "text": "It bakes textures into vertex colors.", "isCorrect": false },
          { "text": "It converts polygons to NURBS.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Subdivision (C4D): What is the purpose of the Subdivision Surface (formerly HyperNURBS) generator in Cinema 4D?",
        "options": [
          { "text": "To bake lighting into textures.", "isCorrect": false },
          { "text": "To divide and smooth the mesh surfaces for higher detail.", "isCorrect": true },
          { "text": "To create particle fields.", "isCorrect": false },
          { "text": "To export low-res meshes to other formats.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "XPresso (C4D): What is XPresso in Cinema 4D primarily used for?",
        "options": [
          { "text": "Rendering animations faster.", "isCorrect": false },
          { "text": "Expressing objects in camera view.", "isCorrect": false },
          { "text": "Creating node-based relationships between object properties.", "isCorrect": true },
          { "text": "Texturing objects procedurally.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Camera vs Light Tags (C4D): In Cinema 4D, an Object can have tags like Compositing or Protection. What does assigning a Protection tag to an object do?",
        "options": [
          { "text": "Prevents it from being rendered.", "isCorrect": false },
          { "text": "Locks its position/rotation/scale from accidental changes.", "isCorrect": true },
          { "text": "Makes it invisible in the editor.", "isCorrect": false },
          { "text": "Converts it into a Cloner target.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Boole Object (C4D): Which Cinema 4D object or tool is used to perform Boolean operations (union, subtract, intersect) on polygonal meshes?",
        "options": [
          { "text": "Extrude", "isCorrect": false },
          { "text": "Boole", "isCorrect": true },
          { "text": "Loft", "isCorrect": false },
          { "text": "Connect", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Layer Shader vs Material (C4D): Cinema 4D’s Layer shader allows stacking multiple shaders and images. Which Blender concept is roughly similar to using multiple image textures blended together?",
        "options": [
          { "text": "A layered Material node group.", "isCorrect": true },
          { "text": "The Texture Paint mode.", "isCorrect": false },
          { "text": "The Node Editor’s Add shader.", "isCorrect": false },
          { "text": "Duplicate materials on top of each other.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Mirror vs Symmetry (C4D): In Cinema 4D modeling, what is the difference between the Mirror command and the Symmetry object?",
        "options": [
          { "text": "Mirror flips selected polygons immediately; Symmetry is a generator that updates.", "isCorrect": true },
          { "text": "Mirror works on points; Symmetry only on objects.", "isCorrect": false },
          { "text": "Mirror applies to lights only; Symmetry to geometry.", "isCorrect": false },
          { "text": "They are two names for the same function.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Render Effects (C4D): Which of the following is NOT a built-in render effect in Cinema 4D’s Physical Renderer?",
        "options": [
          { "text": "Depth of Field", "isCorrect": false },
          { "text": "Global Illumination", "isCorrect": false },
          { "text": "Ambient Occlusion", "isCorrect": false },
          { "text": "Subsurface Scattering (SSS)", "isCorrect": true }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Animation Keyframes (C4D): In Cinema 4D’s Timeline, how do you add a keyframe to an object’s position or other parameter?",
        "options": [
          { "text": "By switching to Record mode and hitting Play.", "isCorrect": false },
          { "text": "By clicking the small circle next to the parameter (or using Auto-Key).", "isCorrect": true },
          { "text": "By right-clicking the object and selecting “Add Keyframe.”", "isCorrect": false },
          { "text": "By pressing Ctrl+K.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Parenting (C4D): In Cinema 4D’s object hierarchy, if Object A is the parent of Object B, what happens when you move Object A?",
        "options": [
          { "text": "Only Object A moves; Object B stays in place.", "isCorrect": false },
          { "text": "Object B moves together with Object A (child follows parent).", "isCorrect": true },
          { "text": "Object B rotates instead of translating.", "isCorrect": false },
          { "text": "Object B receives an inverse transform.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Clipping Planes (Blender): What do the “Start” and “End” clipping distance settings of a camera control?",
        "options": [
          { "text": "The range in which objects are visible by the camera (near/far plane).", "isCorrect": true },
          { "text": "The limits of the camera’s depth of field blur.", "isCorrect": false },
          { "text": "The range of motion blur effect.", "isCorrect": false },
          { "text": "The maximum size of the rendered image.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "UV Overlap Consequence: What is a common issue if UV islands overlap accidentally on a mesh that’s meant to have unique texturing?",
        "options": [
          { "text": "The mesh will have no shading.", "isCorrect": false },
          { "text": "Textures will appear mirrored or repeated on the wrong faces.", "isCorrect": true },
          { "text": "The model will not export.", "isCorrect": false },
          { "text": "The UV editor will crash.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Lights in Blender: Which Blender light type is generally best used as a distant key light (like sunlight)?",
        "options": [
          { "text": "Point Light", "isCorrect": false },
          { "text": "Spot Light", "isCorrect": false },
          { "text": "Area Light", "isCorrect": false },
          { "text": "Sun Lamp", "isCorrect": true }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Eevee vs Cycles: Which setting in Blender’s Eevee renderer can help eliminate flickering noise from shadows and reflections?",
        "options": [
          { "text": "Enable Ambient Occlusion only.", "isCorrect": false },
          { "text": "Increase the Sample Count for shadows and reflections.", "isCorrect": true },
          { "text": "Use only Spot lights.", "isCorrect": false },
          { "text": "Decrease the viewport size.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Animation Curves: In Blender’s Graph Editor, what does a steep slope of a curve between keyframes represent?",
        "options": [
          { "text": "Rapid change in value (fast motion).", "isCorrect": true },
          { "text": "Slow, gradual change in value.", "isCorrect": false },
          { "text": "A break in the curve.", "isCorrect": false },
          { "text": "No change; flat motion.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Rigging – Constraints: In Blender rigging, what is the purpose of an IK constraint on a bone chain?",
        "options": [
          { "text": "It locks the bone to world coordinates.", "isCorrect": false },
          { "text": "It causes the end of the bone chain to follow a target, automatically bending other bones.", "isCorrect": true },
          { "text": "It inverts the bone’s normal.", "isCorrect": false },
          { "text": "It creates a new mesh as part of the rig.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Procedural Material (Nodes): In Blender’s shader nodes, what is the function of the Noise Texture node?",
        "options": [
          { "text": "Generates random grayscale or color patterns for procedural textures.", "isCorrect": true },
          { "text": "Generates audio noise data.", "isCorrect": false },
          { "text": "Mixes two color inputs randomly.", "isCorrect": false },
          { "text": "Compresses image textures into noise patterns.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Scene Optimization: What is one recommended method to optimize a high-poly scene for faster rendering?",
        "options": [
          { "text": "Increase texture resolution.", "isCorrect": false },
          { "text": "Apply a Decimate or Reduce modifier to lower polygon count.", "isCorrect": true },
          { "text": "Disable all shadows.", "isCorrect": false },
          { "text": "Duplicate all objects to spread load.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "text",
        "text": "Rendering Engine Choice: Which Blender renderer is most suitable for fast preview rendering and real-time viewport?",
        "options": [
          { "text": "Cycles", "isCorrect": false },
          { "text": "Eevee", "isCorrect": true },
          { "text": "Workbench", "isCorrect": false },
          { "text": "Freestyle", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "What is the primary lighting issue depicted in this scene?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748354255/5f1b4428-6a9c-4d5b-b44a-51e2fcc6639d_so2mf3.png",
        "options": [
          { "text": "The scene uses too many light sources, making it overexposed.", "isCorrect": false },
          { "text": "The single light creates high contrast shadows and poor fill lighting.", "isCorrect": true },
          { "text": "The lamps are incorrectly switched off.", "isCorrect": false },
          { "text": "The color temperature of the light is unnatural.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "Based on the node setup shown, what is likely wrong with the resulting material appearance?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748354233/12571ad8-daa8-42f9-b3ef-22da62e234ec_fxbcdo.png",
        "options": [
          { "text": "The material has no texture because the Color input is disconnected.", "isCorrect": false },
          { "text": "The object appears entirely black due to low base color.", "isCorrect": false },
          { "text": "The contrast is too high, washing out midtones of the texture.", "isCorrect": true },
          { "text": "The material’s metallic value is set to 0, so it’s non-metallic.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "Which material property likely produces the sharp highlights and reflections seen on this blue crystal surface?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748354238/fe7559e2-e479-4db0-8dd1-da224e2664a3_lyvu3i.png",
        "options": [
          { "text": "Low roughness with metallic=0 (glossy non-metal)", "isCorrect": false },
          { "text": "High roughness with metallic=1 (matte metal)", "isCorrect": false },
          { "text": "Low roughness with metallic=1 (smooth metal)", "isCorrect": true },
          { "text": "Full transparency (invisible material)", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "What is the most likely reason only the one cube is gold?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748354244/a373d003-40e8-4ef3-bbbc-f0329ade6a65_x4bonk.png",
        "options": [
          { "text": "The gold cube is using a different material slot than the others.", "isCorrect": true },
          { "text": "The render engine failed to calculate gold color on others.", "isCorrect": false },
          { "text": "The gold color comes from a light shining on that cube only.", "isCorrect": false },
          { "text": "Blender does not allow multiple colors on one mesh.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "The small reflective spheres have blurred reflections of the background. What feature in the render likely caused the background to appear blurred?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748354218/20af2cb1-f218-4c89-af4e-3c0c2574c10e_gqusgi.png",
        "options": [
          { "text": "Using Spotlights instead of Point lights.", "isCorrect": false },
          { "text": "A low sampling rate causing noise.", "isCorrect": false },
          { "text": "Depth of Field enabled on the camera.", "isCorrect": true },
          { "text": "Motion blur from animation.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "In this interior render, the overall lighting is very bright. What common lighting technique is likely used to simulate the natural daylight?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748354229/23621892-5249-423a-8290-c37578200160_qu5rfl.png",
        "options": [
          { "text": "Emissive materials on the windows.", "isCorrect": false },
          { "text": "A Sun lamp (or HDRI environment) for outdoor light.", "isCorrect": true },
          { "text": "Exclusive use of point lights.", "isCorrect": false },
          { "text": "Ambient Occlusion only.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "The scene has noticeable dark shadows under furniture and behind the piano. What is likely missing from the lighting setup to reduce these shadows?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748354265/92113513-e02f-4c97-a76a-0761b5ce9c5c_b95g0u.png",
        "options": [
          { "text": "A fill light or ambient illumination.", "isCorrect": true },
          { "text": "More Point lights above the ceiling.", "isCorrect": false },
          { "text": "Turning off shadows in render settings.", "isCorrect": false },
          { "text": "Removing the piano from the scene.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "What is the main issue with the lighting in this render?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748354260/d03d5c46-ce5a-4c22-bb5a-22fa763555f8_cezbme.png",
        "options": [
          { "text": "Too many lights causing overexposure.", "isCorrect": false },
          { "text": "Only a few weak lights, making the scene under-lit and noisy.", "isCorrect": true },
          { "text": "Using HDRI instead of direct lights.", "isCorrect": false },
          { "text": "Lights are too warm in color.", "isCorrect": false }
        ],
        "difficulty": "medium"
      },
      {
        "questionType": "image",
        "text": "The room appears almost completely dark and gray. Which solution would brighten this scene realistically?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748354249/42a63111-4454-4636-90c4-a4e7b7887628_mjrkrq.png",
        "options": [
          { "text": "Increase the strength of the distant light source (e.g. moonlight).", "isCorrect": true },
          { "text": "Enable volumetric lighting in Eevee.", "isCorrect": false },
          { "text": "Change the wall materials to brighter colors.", "isCorrect": false },
          { "text": "Invert normals on the ceiling mesh.", "isCorrect": false }
        ],
        "difficulty": "medium"
      }
    ],
    isAvailable : true,
    category : '3D Designer'
  },
  {
    title : 'Level 3',
    questions : [
      {
        "questionType": "text",
        "text": "Topology Optimization: What is a good practice for creating clean game/production topology?",
        "options": [
          { "text": "Randomly dense geometry everywhere.", "isCorrect": false },
          { "text": "Use mostly quads, minimize poles, and concentrate detail only where needed.", "isCorrect": true },
          { "text": "Always use all triangles for faster rendering.", "isCorrect": false },
          { "text": "Over-extrude surfaces for strength.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Complex Rigging: In advanced character rigging, what is the purpose of a “Pole Target” in an IK chain?",
        "options": [
          { "text": "To fix the end effector to a world location.", "isCorrect": false },
          { "text": "To control the bending direction of the joint chain (like a knee/elbow direction).", "isCorrect": true },
          { "text": "To add random jitter to animation.", "isCorrect": false },
          { "text": "To bake the IK to keyframes.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Procedural Animation: What advantage do procedural (node-based) animation tools like Blender’s Geometry Nodes or C4D’s Fields offer?",
        "options": [
          { "text": "They are slower than manual keyframing.", "isCorrect": false },
          { "text": "They allow non-destructive, easily adjustable pattern-based motion.", "isCorrect": true },
          { "text": "They can only animate particle systems.", "isCorrect": false },
          { "text": "They disable physics simulations.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Realistic Lighting: To achieve photorealistic lighting in a 3D scene, which combination is typically needed?",
        "options": [
          { "text": "Single point light with deep shadows.", "isCorrect": false },
          { "text": "Global Illumination (GI), high dynamic range environment maps, and physically correct light sources.", "isCorrect": true },
          { "text": "Only Emission shaders on all objects.", "isCorrect": false },
          { "text": "Ambient Occlusion only.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Cycles vs Eevee: What is one key difference between Blender’s Cycles and Eevee render engines?",
        "options": [
          { "text": "Cycles is real-time; Eevee uses ray tracing.", "isCorrect": false },
          { "text": "Cycles uses path tracing (slow but accurate GI); Eevee is raster-based (fast, uses approximations).", "isCorrect": true },
          { "text": "Both use the exact same algorithms under the hood.", "isCorrect": false },
          { "text": "Eevee can render subdivisions without compute.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Storytelling Composition: In cinematic 3D scenes, which of these principles helps guide the viewer’s eye?",
        "options": [
          { "text": "Random clutter.", "isCorrect": false },
          { "text": "Balanced composition (rule of thirds, leading lines) and focal lighting.", "isCorrect": true },
          { "text": "Only using primary colors.", "isCorrect": false },
          { "text": "Rendering all objects with the same brightness.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Render Engine Choice: When rendering product visuals requiring high realism, why might one choose Cycles over Eevee?",
        "options": [
          { "text": "Because Cycles ignores lighting.", "isCorrect": false },
          { "text": "Because Cycles can handle realistic refractions, caustics and full GI more accurately.", "isCorrect": true },
          { "text": "Eevee cannot render animations.", "isCorrect": false },
          { "text": "Cycles only renders non-metallic surfaces.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Node-Based Shader Graph: A complex shader graph shows many mixed shaders and math nodes. How can one manage and organize this complexity?",
        "options": [
          { "text": "By combining nodes into node-groups and labeling inputs/outputs.", "isCorrect": true },
          { "text": "By deleting unnecessary nodes randomly.", "isCorrect": false },
          { "text": "By converting to a single Principled shader always.", "isCorrect": false },
          { "text": "By not using nodes at all.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Lighting Balance Critique: An artist renders a scene where the character is underexposed despite bright ambient light. What might be the cause?",
        "options": [
          { "text": "The camera aperture is too large.", "isCorrect": false },
          { "text": "The character’s material does not have reflective surfaces.", "isCorrect": false },
          { "text": "Key light intensity is too low relative to ambient, so the subject is in shadow.", "isCorrect": true },
          { "text": "The ambient light is too yellow.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Rendered Output Quality: A final frame has a grainy area where there’s a bright highlight. What rendering strategy fixes this without simply increasing overall samples?",
        "options": [
          { "text": "Enable denoising or increase light samples, use clamping or portals.", "isCorrect": true },
          { "text": "Turn off color management.", "isCorrect": false },
          { "text": "Switch to Orthographic camera.", "isCorrect": false },
          { "text": "Delete that bright object from the scene.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Subdivision vs Remesh: When is it more appropriate to use a Remesh modifier (voxel remesher) instead of Subdivision?",
        "options": [
          { "text": "When the mesh needs smooth rounded detail from a high-res sculpt.", "isCorrect": true },
          { "text": "When you want to maintain your original topology.", "isCorrect": false },
          { "text": "When creating low-poly game assets.", "isCorrect": false },
          { "text": "When the object must become a NURBS surface.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Complex Rig Error: If a Blender rig’s IK chain is snapping strangely, which hidden matrix might need clearing?",
        "options": [
          { "text": "Pivot Point matrix", "isCorrect": false },
          { "text": "Parent Inverse matrix", "isCorrect": true },
          { "text": "Projection matrix", "isCorrect": false },
          { "text": "User Transform matrix", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Physical-Based Rendering: What is the advantage of a physical sky/environment texture over a plain color sky in Blender?",
        "options": [
          { "text": "It automatically generates sun and accurate skylight for realistic lighting.", "isCorrect": true },
          { "text": "It disables shadows.", "isCorrect": false },
          { "text": "It makes the world background black.", "isCorrect": false },
          { "text": "It increases render speed.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "HDRI Use: Why use an HDRI (High Dynamic Range Image) for lighting a scene?",
        "options": [
          { "text": "To store more animation frames.", "isCorrect": false },
          { "text": "To light the scene with real-world illumination and reflections.", "isCorrect": true },
          { "text": "HDRI is only for texturing ground.", "isCorrect": false },
          { "text": "It prevents any shadowing.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Light Probes (Eevee): In Eevee, what are Irradiance Volume probes used for?",
        "options": [
          { "text": "Baking physics simulations.", "isCorrect": false },
          { "text": "Capturing indirect lighting (GI) for dynamic objects.", "isCorrect": true },
          { "text": "Emitting constant light.", "isCorrect": false },
          { "text": "Subdividing meshes at render time.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Topology Critique: An organic model has many long thin triangles. What problem might this cause?",
        "options": [
          { "text": "Easier UV mapping.", "isCorrect": false },
          { "text": "Unpredictable shading; better use quads and avoid long skinny polys.", "isCorrect": true },
          { "text": "Automatically smooth normals.", "isCorrect": false },
          { "text": "Reduced render time.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Complex Shader Graph Issue: If a material is black in Cycles but looks correct in Eevee, what might be wrong?",
        "options": [
          { "text": "A node used (like emission) is unsupported by Cycles.", "isCorrect": true },
          { "text": "The material’s blend mode is set to Add.", "isCorrect": false },
          { "text": "The lights are disabled in Cycles.", "isCorrect": false },
          { "text": "The scene is in Edit Mode.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Render Engine Settings (C4D): In Cinema 4D’s Physical Renderer, enabling Global Illumination does what?",
        "options": [
          { "text": "Produces realistic bounce lighting between surfaces.", "isCorrect": true },
          { "text": "Removes all shadows.", "isCorrect": false },
          { "text": "Only adds ambient light.", "isCorrect": false },
          { "text": "Switches to wireframe mode.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Double Transform (Both Blender & C4D): Applying transforms (scale/rotation) to a parent and using “Apply” can fix which issue?",
        "options": [
          { "text": "It removes the parent.", "isCorrect": false },
          { "text": "It prevents child from inheriting negative scaling or rotation offsets.", "isCorrect": true },
          { "text": "It turns the parent into a mesh.", "isCorrect": false },
          { "text": "It clears all animations.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "text",
        "text": "Performance Optimization: What is a major way to optimize a scene with many materials?",
        "options": [
          { "text": "Use a single multi-layer material with masks rather than dozens of separate materials.", "isCorrect": true },
          { "text": "Increase all texture sizes.", "isCorrect": false },
          { "text": "Combine all objects into one mesh.", "isCorrect": false },
          { "text": "Remove shadow casting from all lights.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "Which mistake is likely causing the knee to bend the wrong way?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748354679/6bcfa55d-2f34-4f53-ba1d-d14ccc5c3a92_zdcful.png",
        "options": [
          { "text": "The pole target for the IK is missing or pointed incorrectly.", "isCorrect": true },
          { "text": "The bone has no weight paint on it.", "isCorrect": false },
          { "text": "The light intensity is too high.", "isCorrect": false },
          { "text": "The mesh normals are inverted.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "What is wrong with the node setup such that the material looks uniform?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748354665/66acf1ec-e7fb-4867-bf03-da0a702d602d_igucyv.png",
        "options": [
          { "text": "The color outputs are all disconnected.", "isCorrect": false },
          { "text": "The Mix node factors are clamped at 0 or 1, so only one texture shows.", "isCorrect": true },
          { "text": "The object has no material slot.", "isCorrect": false },
          { "text": "Blender’s viewport shading mode is off.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "What visual problem will this cause?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748354660/0ade2cda-f9c5-4b3b-8e60-d994aab53d51_f458wz.png",
        "options": [
          { "text": "The object will emit its texture’s colors (glow), ignoring actual lighting.", "isCorrect": true },
          { "text": "The object will appear invisible.", "isCorrect": false },
          { "text": "The render engine will crash.", "isCorrect": false },
          { "text": "The object will be mirrored automatically.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "Why would a 3D artist likely add a small dim light in front of the tree in this scenario?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748354657/a15ebf70-0c3e-4502-be5c-07c0e1ea00cb_qp7unn.png",
        "options": [
          { "text": "To animate the lights.", "isCorrect": false },
          { "text": "To ensure the ornaments and tree structure are not completely lost in shadow.", "isCorrect": true },
          { "text": "To make the Christmas lights invisible.", "isCorrect": false },
          { "text": "To increase the scene’s color saturation.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "How will the material appear under this setting?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748354676/018cb279-b876-4071-86e0-fc198c9dfc7f_b4pels.png",
        "options": [
          { "text": "Perfectly mirror-like and shiny.", "isCorrect": false },
          { "text": "Completely transparent.", "isCorrect": false },
          { "text": "Dull and non-reflective (no shininess).", "isCorrect": true },
          { "text": "Glowing bright.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "What UV issue causes the texture to appear reversed on the mesh?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748354686/39870112-f45a-417d-88bd-24421dfef3e9_wcaxz9.png",
        "options": [
          { "text": "The UV island for that face is mirrored (flipped) in the UV Editor.", "isCorrect": true },
          { "text": "The texture image is corrupted.", "isCorrect": false },
          { "text": "The mesh’s normals are reversed.", "isCorrect": false },
          { "text": "The camera uses a mirror projection.", "isCorrect": false }
        ],
        "difficulty": "hard"
      },
      {
        "questionType": "image",
        "text": "Which principle of scene composition is being used here to highlight the plant?",
        "imageUrl": "https://res.cloudinary.com/dx9ilrkoe/image/upload/v1748354680/5f1ad00f-273e-4474-9122-dee874357e72_ijomha.png",
        "options": [
          { "text": "Rule of Thirds (plant placed at a point of interest)", "isCorrect": true },
          { "text": "Depth of Field (everything is in focus equally)", "isCorrect": false },
          { "text": "High contrast with no focus (everything equally lit)", "isCorrect": false },
          { "text": "Off-screen reading (plant outside camera)", "isCorrect": false }
        ],
        "difficulty": "hard"
      }
    ],
    isAvailable : true,
    category : '3D Designer'
  },
]

//Entries are based on assessment.model.js
export const assessmentTemplates = [
  ...newUiUxTemplates,
  ...newMotionDesTemplates,
  ...newProductDesTemplates,
  ...newBrandDesTemplates,
  ...newVideoEditorTemplates,
  ...newGraphicDesTemplates,
  ...newCreativeDirTemplates,
  ...new3dDestemplates
]
