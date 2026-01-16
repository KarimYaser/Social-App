import React, { createContext, useRef } from 'react'

export const PostUploadContext = createContext(null)

export default function PostUploadProvider({ children }) {
    const textareaRef = useRef(null)

    return (
        <PostUploadContext.Provider value={{ textareaRef }}>
            {children}
        </PostUploadContext.Provider>
    )
}
