import mongoose from "mongoose";
import { assessmentTemplates } from "../../utils/assessment.templates.js";

const questionSchema = new mongoose.Schema(
  {
    questionType: {
      type: String,
      enum: ["text", "image"],
      required: true,
    },
    inActive : {
      type : Boolean,
      default : false
    },
    text: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String, // Only required if questionType is 'image'
    },
    options: [
      {
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
        },
      },
    ],
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },
  },
  { timestamps: true }
);

const assessmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    questions: [questionSchema],
    isAvailable: {
      type: Boolean,
      required: true,
      default: true,
    },
    category: {
      type: String,
      enum: [
        "UI UX",
        "Frontend",
        "Design Theory",
        "Tools",
        "General",
        "Motion Designer",
        "3D Designer",
        "Creative Director",
        "Product Designer",
        "Brand Designer",
        "Video Editor",
        "Graphic Designer",
        "Social Media Assets Designer",
      ],
      required: true,
    },
  },
  { timestamps: true }
);

export const Assessment = mongoose.model("Assessment", assessmentSchema);

export const seedTemplates = async () => {
  try {
    const savedAssessmentTemplates = await Assessment.find();
    if (savedAssessmentTemplates?.length > 0) {
      const titlesSet = new Set(
        savedAssessmentTemplates.map((item) => `${item?.title}-${item.category}`)
      );
      const filtered = assessmentTemplates.filter(
        (item) => !titlesSet.has(`${item?.title}-${item.category}`)
      );
      if (filtered?.length > 0) {
        for (let assessment of filtered) {
          await Assessment.create(assessment);
        }
        console.log("New Assessment Templates added");
      }
      // Create a map of templates for faster lookup
      const templateMap = new Map(
        assessmentTemplates.map(template => [`${template.title}-${template.category}`, template])
      );

      for (let saved of savedAssessmentTemplates) {
        const matchingTemplate = templateMap.get(`${saved.title}-${saved.category}`);

        if (matchingTemplate && matchingTemplate.questions?.length > saved.questions.length) {
          const existingTexts = new Set(saved.questions.map(q => q.text));
          const newQuestions = matchingTemplate.questions.filter(q => !existingTexts.has(q.text));

          if (newQuestions.length > 0) {
            console.log(newQuestions.length , " new Questions added on ", matchingTemplate.title ,' - ' , matchingTemplate.category)
            saved.questions.push(...newQuestions);
            await saved.save(); // Only save if something changed
          }
        }
      }

    } else {
      for (let assessment of assessmentTemplates) {
        await Assessment.create(assessment);
      }
      console.log("Assessment Templates added");
    }
  } catch (error) {
    console.log("Assessment template creation error : ", error);
  }
};
