import React, { useState } from 'react';
import { memo } from "react";
import "./navigation.scss"
import { NavLink } from 'react-router-dom';

function TopNavigation(){
    const [activeIndex, setActiveIndex] = useState(null);
    const navItems = [
        { label: 'Trang chủ', href: 'home' },
        { label: 'Về chúng tôi', href: 'about' },
        { label: 'Chính sách mua hàng', href: 'policy' },
        { label: 'Liên hệ', href: 'contact' }
      ];
    const handleClick = (index) => {
        setActiveIndex(index);
      };
    return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse nav-container" >
          <ul className="navbar-nav">
          {navItems.map((item, index) => (
            <li
              key={index}
              className={`nav-item ${activeIndex === index ? 'active' : ''}`}
              onClick={() => handleClick(index)}
            >
                <NavLink
                to ={item.href}
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                    {item.label}
                </NavLink>
             
            </li>
          ))}
          </ul>
        </div>
      </nav>
    );
}

export default memo(TopNavigation);