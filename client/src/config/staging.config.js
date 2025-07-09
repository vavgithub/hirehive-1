import { threeDDesignerConfig } from "./3ddesigner.staging";
import { brandDesignerConfig } from "./branddesigner.staging";
import { creativeDirectorConfig } from "./creativedirector.staging";
import { graphicDesignerConfig } from "./graphicdesigner.staging";
import { JOB_PROFILES } from "./jobprofile.config";
import { motionDesignerConfig } from "./motiondesigner.staging";
import { productDesignerConfig } from "./productDesigner.staging";
import { socialMediaDesignerConfig } from "./socialmediadesigner.staging";
import { UIUXConfig } from "./uiux.staging";
import { videoEditorConfig } from "./videoeditor.staging";

export const stagingConfig = {
    [JOB_PROFILES.UIUX] : UIUXConfig,
    [JOB_PROFILES.MOTION_DESIGNER] : motionDesignerConfig,
    [JOB_PROFILES["3D_DESIGNER"]] : threeDDesignerConfig,
    [JOB_PROFILES.BRAND_DESIGNER] : brandDesignerConfig,
    [JOB_PROFILES.CREATIVE_DIRECTOR] : creativeDirectorConfig,
    [JOB_PROFILES.GRAPHIC_DESIGNER] : graphicDesignerConfig,
    [JOB_PROFILES.PRODUCT_DESIGNER] : productDesignerConfig,
    [JOB_PROFILES.VIDEO_EDITOR] : videoEditorConfig,
    // [JOB_PROFILES.SOCIAL_MEDIA_ASSETS_DESIGNER] : socialMediaDesignerConfig,
}

export const getStages = (jobProfile) => {
    return stagingConfig[jobProfile]?.map(stage => stage?.name)
}

export const statusConfig = {
    "Accepted": { 
        bgColor: "#411a22", 
        color: "#FF385C" 
    },
    "Call Scheduled": { 
        bgColor: "#3e3514", 
        color: "#EDBD14" 
    },
    "Cleared": { 
        bgColor: "#123c22", 
        color: "#12D382" 
    },
    "No Show": { 
        bgColor: "#232425", 
        color: "#FFFFFF" 
    },
    "Not Assigned": { 
        bgColor: "#411a22", 
        color: "#FF385C" 
    },
    "Not Submitted": { 
        bgColor: "#411a22", 
        color: "#FF385C" 
    },
    "Offer Sent": { 
        bgColor: "#123c22", 
        color: "#12D382" 
    },
    "Pending": { 
        bgColor: "#411a22", 
        color: "#FF385C" 
    },
    "Rejected": { 
        bgColor: "#411a22", 
        color: "#FF385C" 
    },
    "Reviewed": { 
        bgColor: "#123c22", 
        color: "#12D382" 
    },
    "Sent": { 
        bgColor: "#123c22", 
        color: "#12D382" 
    },
    "Under Review": { 
        bgColor: "#3e3514", 
        color: "#EDBD14" 
    }
  };

export const getStageColor = (stage) => {
    switch (stage.toLowerCase()) {
      case 'portfolio':
        return 'rgb(59, 130, 246)';
      case 'screening':
        return 'rgb(234, 179, 8)';
      case 'design task':
        return 'rgb(168, 85, 247)';
      case 'round 1':
        return 'rgb(34, 197, 94)';
      case 'round 2':
        return 'rgb(249, 115, 22)';
      default:
        return 'rgb(255, 255, 255)';
    }
};
//Blue shade of colors for Doughnut charts
export const getStageColorForChart = (stage) => {
    switch (stage.toLowerCase()) {
        case 'portfolio':
          return 'rgba(2, 75, 202, 1)';
        case 'screening':
          return 'rgba(27, 110, 253, 1)';
        case 'design task':
          return 'rgba(56, 151, 244, 1)';
        case 'round 1':
          return 'rgba(108, 161, 254, 1)';
        case 'round 2':
          return 'rgba(128, 194, 244, 1)';
        default:
          return 'rgb(255, 255, 255)';
      }
}

  export const maxScoreOfEachStage = (stageTitle) => {
    let totalScore = 0;
    stagingConfig["UI UX"].map(eachStage => {
        if(eachStage?.name === stageTitle){
            totalScore = eachStage?.totalScore;
        }
    })
    return totalScore
  }

  export const logConfig = {
    'Portfolio' : {
        'Under Review' : 'Assigned On',
        'Reviewed' : 'Reviewed On',
        'Cleared' : 'Cleared On',
        'Rejected' : 'Rejected On'
    },
    "Screening" : {
        'Pending' : 'Updated On',
        'Call Scheduled' : 'Scheduled On',
        'No Show' : 'Updated On',        
        'Under Review' : 'Call Done On',
        'Reviewed' : 'Reviewed On',
        'Cleared' : 'Cleared On',
        'Rejected' : 'Rejected On'
    },
    "Design Task" : {
        'Pending' : 'Task Scheduled On',
        'Sent' : 'Sent On',
        'Not Assigned' : 'Submitted On',        
        'Under Review' : 'Assigned On',
        'Reviewed' : 'Reviewed On',
        'Cleared' : 'Cleared On',
        'Rejected' : 'Rejected On'
    },
    "Round 1" : {
        'Pending' : 'Assigned On',
        'Call Scheduled' : 'Scheduled On',
        'No Show' : 'Updated On',        
        'Under Review' : 'Call Done On',
        'Reviewed' : 'Reviewed On',
        'Cleared' : 'Cleared On',
        'Rejected' : 'Rejected On'
    },
    "Round 2" : {
        'Pending' : 'Assigned On',
        'Call Scheduled' : 'Scheduled On',
        'No Show' : 'Updated On',        
        'Under Review' : 'Call Done On',
        'Reviewed' : 'Reviewed On',
        'Cleared' : 'Cleared On',
        'Rejected' : 'Rejected On'
    },
    "Hired" : {
        'Under Review' : 'Rejection Scheduled On',
        'Accepted' : 'Hired On',
        'Rejected' : 'Rejected On'
    },
  }