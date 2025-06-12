import mongoose from "mongoose";
import { JOB_PROFILES } from "../../config/jobStagesStatuses.js";
import { taskTemplates } from "../../utils/designtask.templates.js";
import { sanitizeLexicalHtml } from "../../utils/sanitize-html.js";

const taskSchema = new mongoose.Schema({
    title : {
        type : String,
        trim : true,
        required : true
    },
    level : {
        type : String,
        enum : ["Junior","Mid-Level","Senior"],
        required : true
    },
    category : {
        type : String,
        enum : Object.values(JOB_PROFILES)
    },
    htmlString : { 
        type : String,
        required : true
    }
})

export const Task = mongoose.model("Task",taskSchema)

export const seedTasks = async () => {
    const savedTasks = await Task.find();
    if(savedTasks?.length > 0){
        const uniqueTaskSet = new Set(savedTasks.map(task => `${task?.title?.trim()}-${task?.category}-${task?.level}`));
        const filteredTasks = taskTemplates.filter(task =>  !uniqueTaskSet.has(`${task?.title?.trim()}-${task?.category}-${task?.level}`));
        if(filteredTasks?.length > 0){
            let successCount = 0; 
            for(let template of filteredTasks){
                if(template?.htmlString){
                    const sanitizedString = sanitizeLexicalHtml(template.htmlString);
                    const updatedTemplate = {
                        ...template,
                        htmlString : sanitizedString
                    }
                    const createTask = await Task.create(updatedTemplate);
                    if(createTask){
                        successCount++
                    }
                }
             }
            console.log(`${successCount} new task templates added out of ${filteredTasks?.length}`)
        }

        // Create a map of templates for faster lookup
        const templateMap = new Map(
            taskTemplates.map(template => [`${template.title}-${template.category}-${template?.level}`, template])
        );

        for(let saved of savedTasks){
            const matchingTemplate = templateMap.get(`${saved.title}-${saved.category}-${saved?.level}`);
            if(matchingTemplate?.htmlString){
                const sanitizedHtml = sanitizeLexicalHtml(matchingTemplate?.htmlString);
                if(matchingTemplate && (sanitizedHtml !== saved.htmlString)){
                    saved.htmlString = sanitizedHtml
                    await saved.save();
                    console.log(`${saved.title}-${saved.category}-${saved?.level} Template Modified`)
                }
            }
        }

    }else{
        let successCount = 0; 
        for(let template of taskTemplates){
            if(template?.htmlString){
                const sanitizedString = sanitizeLexicalHtml(template.htmlString);
                const updatedTemplate = {
                    ...template,
                    htmlString : sanitizedString
                }
                const createTask = await Task.create(updatedTemplate);
                if(createTask){
                    successCount++
                }
            }
        }
        console.log(`${successCount} all new task templates added out of ${taskTemplates?.length}`)
    }
}