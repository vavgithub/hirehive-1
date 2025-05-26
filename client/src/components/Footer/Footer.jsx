import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaPinterest,  FaYoutube } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import IconWrapper from '../Cards/IconWrapper'

function Footer({variant = ''}) {
  return (
    <div className={(variant==='sidebar' ? " md:pl-[17rem] w-screen" : "") + " bg-background-90 "}>
        <div className='px-4'>
          <div className="container  flex items-center justify-between  min-h-[5rem] ">
              <p className="typography-body text-font-gray">&copy; {new Date().getFullYear()} Copyrighted Value at Void™</p>
              {/* <div className='flex gap-4 text-font-gray'>
                <a href="https://www.facebook.com/atvoid" target="_blank" rel="noopener noreferrer">
                  <IconWrapper inheritColor size={0} customIconSize={5} icon={FaFacebook} />
                </a>
                <a href="https://linkedin.com/company/atvoid/" target="_blank" rel="noopener noreferrer">
                  <IconWrapper inheritColor size={0} customIconSize={5} icon={FaLinkedin} />
                </a>
                <a href="https://www.youtube.com/@ValueatVoid" target="_blank" rel="noopener noreferrer">
                  <IconWrapper inheritColor size={0} customIconSize={5} icon={FaYoutube} />
                </a>
                <a href="https://in.pinterest.com/valueatvoid/vav-design-tips/" target="_blank" rel="noopener noreferrer">
                  <IconWrapper inheritColor size={0} customIconSize={5} icon={FaPinterest} />
                </a>
                <a href="https://www.instagram.com/valueatvoid/" target="_blank" rel="noopener noreferrer">
                  <IconWrapper inheritColor size={0} customIconSize={5} icon={FaInstagram} />
                </a>
                <a href="https://x.com/valueatvoid" target="_blank" rel="noopener noreferrer">
                  <IconWrapper inheritColor size={0} customIconSize={5} icon={FaXTwitter} />   
                </a>
              </div> */}
          </div>
        </div>
    </div>
  )
}

export default Footer
