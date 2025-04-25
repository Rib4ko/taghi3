import React from 'react';

const Form = ({ children, onSubmit }) => {
    return (
        <form className="space-y-4" onSubmit={onSubmit}>
            {children}
        </form>
    );
};

export default Form;