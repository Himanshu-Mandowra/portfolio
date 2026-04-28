import React, { useState } from 'react';
import { motion, useTransform, useScroll, useMotionValue } from 'framer-motion';


function FuturisticPage() {

    const x = useMotionValue(0)
    const opacity = useTransform(x, [-100, 0, 100], [0, 1, 0])
    const [isRotated, setIsRotated] = useState(false);
    const [isMovedUp, setIsMovedUp] = useState(false);
    const [isZoomUp, setIsZoomUp] = useState(false);

    const handleClick = () => {
        setIsMovedUp(!isMovedUp);
        setIsRotated(!isRotated);
        setIsZoomUp(!isZoomUp);

    }





    return (
        <div id='Project' className="w-full overflow-hidden Project h-[100vh]  bg-[#222] flex items-center justify-center text-white">
            <div className='flex justify-center lg:w-[30%]  w-full ' >
                <div className="w-[120%] flex text-center justify-center  items-center ">

                    <div className="text-[47px] lg:w-[90%] w-[60%] flex flex-col items-center justify-center">
                        <motion.div className="z-2 up p-10 bg-orange-800 h-[16vh] w-full overflow-hidden border-8 border-white border-solid rounded-t-[22px] border-b-0"
                            animate={{ y: isMovedUp ? -100 : 0 }} // Moves the element upward by 100px
                            transition={{ stiffness: 300, delay: 0.5 }}
                        //  style={{ transformOrigin: 'top center' }} // Rotate from the top edge
                        >

                        </motion.div>
                        <motion.div className="z-2 down bg-orange-800 h-[18vh] w-full overflow-hidden border-8 border-white border-solid p-0"
                            animate={{ y: isMovedUp ? 100 : 0 }} // Moves the element downward by 100px
                            transition={{ stiffness: 300, delay: 0.5 }}
                        >

                        </motion.div>
                    </div>
                </div>
            </div>
            <div className="text-[17px] absolute lg:w-[50%] w-full flex justify-center">
                <motion.div className="flex sm:border-0 border-dashed rounded-full border-l-2 border-l-transparent border-r-2 border-r-transparent  items-center justify-center down  p-6 text-white border--orange-500 h-[20vh] w-[50%] overflow-hidden border-3"
                    animate={{ scale: isZoomUp ? 1 : 0 }} // Moves the element downward by 100px
                    transition={{ stiffness: 300, delay: 0.5 }}

                >
                    <motion.button className=' z-1 cursor-pointer text-white sm:font-light lg:font-bold py-2 px-4 rounded hover:bg-custom-blue-dark focus:outline-none focus:ring-2 focus:ring-custom-blue focus:ring-opacity-50'
                        initial={{ background: 'linear-gradient(to right, #1e40af, #3b82f6)' }}
                        whileHover={{
                            scale: 1.2,
                            background: 'linear-gradient(to right, #f43f5e, #f97316)',  // Reverse colors on hover
                        }}   // Slightly enlarge on hover
                        
                        whileTap={{ scale: 0.3 }}
                        animate={{ y: ["0%", "-20%", "0%"], scale: [1, 1.05, 1], padding: 5 }}  // Floating effect
                        transition={{
                            duration: 5,        // Duration of one cycle
                            ease: "easeInOut",  // Easing function
                            repeat: Infinity,   // Repeat indefinitely
                            repeatType: "loop" , // Loop the animation
                            times: [0, 0.5, 1]        // Keyframes to ensure smooth transitions
                        }}
                    >

                        Enter Projects

                    </motion.button>

                </motion.div>
            </div>
            <div className="absolute w-full flex justify-center">
                <motion.div
                    onClick={handleClick}
                    className="z-2 border-5 border-pink-950 border-b-8 border-b-pink-950 w-6 h-9 bg-blue-500 cursor-pointer"
                    animate={{ rotate: isRotated ? 90 : 0, y: isMovedUp ? -100 : 0 }}
                    transition={{
                        rotate: { type: 'spring', stiffness: 300 },
                        y: {
                            stiffness: 300, delay: 0.5 // Delay for the y animation
                        }
                    }}

                    style={{ originY: 0 }}  // Set the origin to the top

                // animate={{ y: [0, -10, 0] }}
                // transition={{ duration: 1, repeat: Infinity }}
                />
            </div>
        </div >
    );
}

export default FuturisticPage;
