import React from 'react'
import { digitsRegex, lowerCaseRegex, specialCharRegex, upperCaseRegex } from '../../utility/regex'

function PasswordRuleValidator({password}) {
  return (
        <div>
            <p className='typography-large-p pt-4 pb-2 text-font-gray'>Password must meet the following criteria:
            </p>
            <ul className='list-disc list-inside'>
                <li className={'typography-large-p pb-2 ' + (password?.length >= 8 ? "text-green-100" : "text-font-gray")}>Password must be at least 8 characters long.
                </li>
                <li className={'typography-large-p pb-2 ' + (upperCaseRegex.test(password) ? "text-green-100" : "text-font-gray")}>Password must include at least one uppercase
                    letter (A-Z).</li>
                <li className={'typography-large-p pb-2 ' + (password?.length >=0 && lowerCaseRegex.test(password) ? "text-green-100" : "text-font-gray")}>Password must include at least one lowercase
                    letter (a-z).</li>
                <li className={'typography-large-p pb-2 ' + (digitsRegex.test(password) ? "text-green-100" : "text-font-gray")}>Password must include at least one number
                    (0-9).</li>
                <li className={'typography-large-p pb-2 ' + (specialCharRegex.test(password) ? "text-green-100" : "text-font-gray")}> Password must include at least one special
                    character .</li>
            </ul>
        </div>
  )
}

export default PasswordRuleValidator
