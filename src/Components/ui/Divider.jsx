import React from 'react'

export default function Divider({ text,className }) {
    return (
        <div className={`seperator text-center
             text-gray-500 relative 
             before:w-3/10 before:absolute 
             before:h-px before:bg-gray-300 
             before:top-1/2 before:left-0
              -before:translate-y-1/2 after:w-3/10 
              after:absolute after:h-px
               after:bg-gray-300 after:top-1/2
                after:right-0 -after:translate-y-1/2 ${className} `}>{text}</div>
    )
}
