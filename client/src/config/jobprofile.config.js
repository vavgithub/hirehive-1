
export const JOB_PROFILES = {
    "UIUX" : 'UI UX',
    "MOTION_DESIGNER" : 'Motion Designer',
    "3D_DESIGNER" : "3D Designer",
    "CREATIVE_DIRECTOR" : 'Creative Director',
    "PRODUCT_DESIGNER" : 'Product Designer',
    "BRAND_DESIGNER" : 'Brand Designer',
    "VIDEO_EDITOR" : 'Video Editor',
    "GRAPHIC_DESIGNER" : "Graphic Designer",
    "SOCIAL_MEDIA_ASSETS_DESIGNER" : 'Social Media Assets Designer'
}

export const getJobProfileAsOptions = () => Object.values(JOB_PROFILES).map(profileObj => ({label : profileObj , value : profileObj}))
