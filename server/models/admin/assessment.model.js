import mongoose from "mongoose";
import { assessmentTemplates } from "../../utils/assessment.templates.js";

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
}, { timestamps: true });


const assessmentSchema = new mongoose.Schema({
  title : {
    type : String,
    required : true
  },
  questions : [questionSchema],
  category: {
    type: String,
    enum: ['UI/UX', 'Frontend', 'Design Theory', 'Tools', 'General'],
    required: true,
  }
}, { timestamps: true });

export const Assessment = mongoose.model('Assessment', assessmentSchema);

export const seedTemplates = async () => {
    try {
        const savedAssessmentTemplates = await Assessment.find();
        if(savedAssessmentTemplates?.length > 0){
            const titlesSet = new Set(savedAssessmentTemplates.map(item => item?.title));
            const filtered = assessmentTemplates.filter(item => !titlesSet.has(item.title));
            if(filtered?.length > 0){
                for(let assessment of filtered){
                    await Assessment.create(assessment)
                }
                console.log("New Assessment Templates added")
            }
        }else{
            for(let assessment of assessmentTemplates){
                await Assessment.create(assessment)
            }
            console.log("Assessment Templates added");
        }
    } catch (error) {
        console.log("Assessment template creation error : " , error)
    }
}