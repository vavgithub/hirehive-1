import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaPinterest,  FaYoutube } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import IconWrapper from '../Cards/IconWrapper'

function Footer({variant = ''}) {
    const handleTnCredirect = () => {
        window.open("/terms-and-conditions", "_blank");
    }
    const handlepPredirect = () => {
        window.open("/privacy-policy", "_blank");
    }
  return (
    <div className={(variant==='sidebar' ? " md:pl-[17rem] w-screen" : "") + " bg-transparent "}>
        <div className='px-4'>
          <div className="container  flex items-center justify-between  min-h-[5rem] ">
              <p className="typography-body text-font-gray">&copy; {new Date().getFullYear()} Copyrighted Value at Void™</p>
              <div className='flex gap-4 text-font-gray'>
                {/* <a href="https://www.facebook.com/atvoid" target="_blank" rel="noopener noreferrer">
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
                <a href="/pri" target="_blank" rel="noopener noreferrer">
                  <IconWrapper inheritColor size={0} customIconSize={5} icon={FaXTwitter} />   
                </a> */}
                <span className='cursor-pointer typography-body underline underline-offset-2' onClick={handleTnCredirect}>Terms & Conditions  </span>
              <span onClick={handlepPredirect} className='cursor-pointer typography-body underline underline-offset-2'>Privacy Policy </span>
              </div>
          </div>
        </div>
    </div>
  )
}

export default Footer
