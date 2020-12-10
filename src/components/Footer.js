import React, { useState, useEffect } from 'react';

const Footer = () => {
    return <>
        {/* THIS IS FOR THE FOOTER - needs to be styled*/}

        <div className="footer-container">
            <div className="bottom-container-inner">
                <span className="bottom-link-items">C 2020</span>
                <span className="bottom-link-items">Privacy</span>
                <span className="bottom-link-items">Terms</span>
                <span className="bottom-link-items">Accessibility</span>
                <span className="bottom-link-items">Sitemap</span>
                <span className="bottom-link-items">Do Not Sell My Personal Information</span>
            </div>
        </div>

    </>

}

export default Footer;