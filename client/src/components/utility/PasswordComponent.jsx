import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import StyledCard from '../Cards/StyledCard'
import { InputField } from '../Inputs/InputField'
import { Button } from '../Buttons/Button'
import PasswordRuleValidator from './PasswordRuleValidator'


function PasswordComponent({hasFooter = false, handlePasswordSubmit, watch, control, passwordError, isSubmitting, cardbg = "" }) {
    const password = watch("password");
    return (
        <div className={ "flex items-center w-screen justify-center bg-cover bg-verification " + (hasFooter ? 'min-h-[calc(100vh-5rem)]' : ' min-h-screen')}>
            <StyledCard padding={0} extraStyles={"w-full mx-8 md:mx-0 max-w-lg space-y-8 shadow-xl " + cardbg}>
                <form onSubmit={handlePasswordSubmit} className="mx-8 sm:mx-16 md:mb-16">
                    <h1 className="mt-5 sm:mt-8 md:mt-16 ">
                        Create Password
                    </h1>
                    <p className="typography-large-p py-4 text-font-gray text-center">
                        Create a password to secure your account. Make sure it’s strong
                        and easy to remember.
                    </p>
                    <div className='flex flex-col gap-4'>
                        <Controller
                            name="password"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <InputField
                                    id="password"
                                    label="Create Password"
                                    type="password"
                                    placeholder="New Password"
                                    required={true}
                                    error={passwordError}
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            name="confirmPassword"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <InputField
                                    id="confirmPassword"
                                    label="Confirm Password"
                                    placeholder="Confirm New Password"
                                    type="password"
                                    required={true}
                                    error={passwordError}
                                    {...field}
                                />
                            )}
                        />
                    </div>
                    {passwordError && (
                        <span className="text-red-500 typography-small-p">{passwordError}</span>
                    )}

                    {/* Validation criteria */}
                    <PasswordRuleValidator password={password} />

                    <div className="flex mt-6 justify-center gap-4 w-full mr-16 mb-6 ">
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={isSubmitting}
                            className="w-full "
                        >
                            {isSubmitting ? 'Submitting...' : 'Next'}
                        </Button>
                    </div>
                </form>
            </StyledCard>
        </div>
    )
}

export default PasswordComponent
