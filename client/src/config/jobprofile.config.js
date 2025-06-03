
export const JOB_PROFILES = {
    "UIUX" : 'UI UX',
    "MOTION_DESIGNER" : 'Motion Designer',
    "3D_DESIGNER" : "3D Designer",
    "CREATIVE_DIRECTOR" : 'Creative Director',
    "PRODUCT_DESIGNER" : 'Product Designer',
    "BRAND_DESIGNER" : 'Brand Designer',
    "VIDEO_EDITOR" : 'Video Editor',
    "GRAPHIC_DESIGNER" : "Graphic Designer",
    // "SOCIAL_MEDIA_ASSETS_DESIGNER" : 'Social Media Assets Designer'
}

export const JOB_PROFILES_DETAILS = {
  [JOB_PROFILES.UIUX]: {
    description: "The UI/UX Designer is responsible for creating intuitive and visually appealing user interfaces. Candidates applying for this role will go through multiple assessment stages including a portfolio review, a team screening round with job-specific evaluation criteria, a design task submission, and two interview rounds. Scoring is done at each stage to assess skills like attitude, communication, and technical expertise relevant to UI/UX design."
  },
  [JOB_PROFILES.MOTION_DESIGNER]: {
    description: "The Motion Designer brings stories to life through motion graphics and animation. Candidates are evaluated through several assessment stages—starting with a portfolio review and continuing through team screening, a design task, and two interviews. The screening stage emphasizes animation and tooling skills alongside communication and narrative ability."
  },
  [JOB_PROFILES["3D_DESIGNER"]]: {
    description: "The 3D Designer is tasked with creating realistic and compelling 3D visualizations. The hiring process includes a portfolio evaluation, role-specific screening, a timed design task, and two interview rounds. Screening focuses on modeling, rendering, creativity, and how effectively the designer communicates their ideas."
  },
  [JOB_PROFILES.CREATIVE_DIRECTOR]: {
    description: "The Creative Director drives the vision and creative strategy across design projects. Applicants are assessed in phases including portfolio review, a specialized screening interview, a strategic design task, and high-level discussions in two interview rounds. Screening evaluates leadership, strategic vision, and communication skills."
  },
  [JOB_PROFILES.PRODUCT_DESIGNER]: {
    description: "The Product Designer focuses on crafting user-centric solutions that align with business goals. The assessment includes a portfolio review, skill-specific screening, a design challenge, and interviews. Screening emphasizes core thinking, UX strategy, and consistency across products."
  },
  [JOB_PROFILES.BRAND_DESIGNER]: {
    description: "The Brand Designer shapes the visual identity of a brand. Candidates are assessed through their portfolio, a targeted screening interview, a creative task, and two interviews. Key screening criteria include consistency, narrative ability, and identity creation."
  },
  [JOB_PROFILES.VIDEO_EDITOR]: {
    description: "The Video Editor crafts compelling visual narratives by editing footage with precision. Applicants progress through a portfolio review, a focused screening, a video-based design task, and two interview rounds. Screening measures timing, editing proficiency, and compositional strength."
  },
  [JOB_PROFILES.GRAPHIC_DESIGNER]: {
    description: "The Graphic Designer is responsible for delivering aesthetic and impactful visual content. Assessments include portfolio analysis, an interview focusing on layout and creativity, a practical design task, and follow-up interviews. Screening evaluates aesthetic sense, layout skills, and creativity."
  },
  // [JOB_PROFILES.SOCIAL_MEDIA_ASSETS_DESIGNER]: {
  //   description: "The Social Media Assets Designer develops engaging content tailored for social platforms. Evaluation involves a portfolio check, a skills-based screening, a creative design task, and interviews. Screening focuses on branding, adaptability, and audience engagement."
  // }
};


export const getJobProfileAsOptions = () => Object.values(JOB_PROFILES).map(profileObj => ({label : profileObj , value : profileObj}))
