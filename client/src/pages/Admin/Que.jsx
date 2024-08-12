import React from 'react'
import Header from '../../components/utility/Header'
import { Button } from '../../components/ui/Button'
import Skip from '../../svg/Buttons/Skip'

const Que = () => {
    return (
        <div className="bg-background-80 h-screen">
            <div className='p-4 flex flex-col justify-between I h-full'>
                <Header HeaderText="Additional Questions"></Header>
                <div className='bg-background-30 rounded-xl h-full'>

                </div>
                <div className='w-full flex flex-row-reverse'>

                    <div className='w-[240px]'>
                        <Button variant="primary" icon={Skip}>
                            Skip
                        </Button>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Que