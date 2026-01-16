import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { forwardRef } from 'react'

const FormField = forwardRef(function FormField({
    elementType,
    id,
    label,
    inputType,
    name,
    placeholder,
    className,
    value,
    onChange,
    onBlur,
    startIcon,
    error,
    touched,
    options,
    isExistError,
    rows,
    accept
}, ref) {

    const renderElement = () => {
        switch (elementType) {
            case 'input': return <>
                <input type={inputType} id={id}
                    placeholder={placeholder}
                    className={`form-control ${className}`}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                />
            </>

            case 'select': return <>
                <select id={id}
                    className={`form-control ${className}`}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}>
                    {options && options.map((option, index) => (
                        <option value={option.value} key={index}>{option.label}</option>
                    ))}
                </select>
            </>

            case 'textarea': return <>
                <textarea ref={ref}
                    id={id}
                    placeholder={placeholder}
                    className={`form-control ${className}`}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    rows={rows || 4}
                />
            </>

            case 'file': return <>
                <input type='file' id={id}
                    className={className}
                    name={name}
                    onChange={onChange}
                    onBlur={onBlur}
                    accept={accept}
                />
            </>
            default: return null
        }
    }
    return (
        <div className="name space-y-1">
            <label htmlFor={id}>{label}</label>
            <div className="relative">
                {renderElement()}
                {elementType !== 'select' && startIcon && <FontAwesomeIcon icon={startIcon} className='form-control-icon' />}
            </div>
            {error && touched ? <p className='text-red-500'>{error}</p> : ""}
            {isExistError ? <p className='text-red-500'>user is already exists</p> : ""}
        </div>
    )
})

export default FormField
