import React from 'react';

const SectionHeader = ({center,tag,title,subtitle}) => {
    return (
        <>
            <header className={`sec-head${center?" sec-head--center":""}`}>
                <div className="sec-head__tag-row">
                    <div className="sec-head__tag-line"/>
                    <span className="sec-head__tag-text">{tag}</span>
                </div>
                <h2 className="sec-head__title">{title}</h2>
                {subtitle&&<p className="sec-head__subtitle">{subtitle}</p>}
            </header>
        </>
    );
};

export default SectionHeader;