import React from 'react'

const PostedIcon = () => {
    return (

        <svg width="66" height="66" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_bi_1259_40089)">
                <rect x="1" y="1" width="64" height="64" rx="32" stroke="#E1E2EA" />
                <g clip-path="url(#clip0_1259_40089)">
                    <path d="M33 27V33L37 35M43 33C43 38.5228 38.5228 43 33 43C27.4772 43 23 38.5228 23 33C23 27.4772 27.4772 23 33 23C38.5228 23 43 27.4772 43 33Z" stroke="#6A6F95" stroke-width="2.13333" stroke-linecap="round" stroke-linejoin="round" />
                </g>
            </g>
            <defs>
                <filter id="filter0_bi_1259_40089" x="-13.836" y="-13.836" width="93.672" height="93.672" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feGaussianBlur in="BackgroundImageFix" stdDeviation="7.168" />
                    <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1259_40089" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_1259_40089" result="shape" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dx="-2.56" dy="-2.56" />
                    <feGaussianBlur stdDeviation="1.28" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.05 0" />
                    <feBlend mode="normal" in2="shape" result="effect2_innerShadow_1259_40089" />
                </filter>
                <clipPath id="clip0_1259_40089">
                    <rect width="24" height="24" fill="white" transform="translate(21 21)" />
                </clipPath>
            </defs>
        </svg>

    )
}

export default PostedIcon