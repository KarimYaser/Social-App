import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function SocialBtns() {
  return (<>
    <div className="social-btns flex gap-3 justify-center items-center *:grow-1"> {/* makes each child take flex-grow 1 */}
                <button className='btn bg-white text-gray-800 hover:scale-105 transition-transform duration-300'>
                  <FontAwesomeIcon icon={faGoogle} className='text-red-500 ' />
                  <span>Google</span>
                </button>
                <button className='btn'>
                  <FontAwesomeIcon icon={faFacebookF} />
                  <span>Facebook</span>
                </button>
              </div>
  </>
  )
}
