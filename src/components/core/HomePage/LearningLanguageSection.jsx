import React from 'react'
import HighlightText from './HighlightText'
import know_your_progres from "../../../assets/Images/Know_your_progress.png"
import compare_with_others from "../../../assets/Images/Compare_with_others.png"
import plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png"
import Button from './Button'

const LearningLanguageSection = () => {
  return (
    <div className='mt-[130px]'>
      <div className='flex flex-col items-center gap-5'>
        <div className='text-4xl font-semibold text-center'>
        Your swiss knife for 
        <HighlightText text={"learning any language"}/>
        </div>
        <div className='text-center text-richblack-600 mx-auto text-base mt-3 font-medium w-[70%]'>
        Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
        </div>
        <div className='flex items-center justify-center mt-5'>
        <img src={know_your_progres} alt="" className='object-contain -mr-32'/>
        <img src={compare_with_others} alt="" className='object-contain'/>
        <img src={plan_your_lessons} alt="" className='object-contain -ml-36'/>
        </div>
      <div className='w-fit'>
        <Button active={true} linkto={"/signup"}>
            <div>
                Learn More
            </div>
        </Button>
      </div>
      </div>

    </div>
  )
}

export default LearningLanguageSection
