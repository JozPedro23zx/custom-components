"use client";

import { useEffect, useRef, useState } from 'react';
import { Icon } from "@iconify/react";

const CustomCarousel = ({ children, itemsVisible = { base: 1, md: 3, xl: 5 } }) => {
    const scrollContainerRef = useRef(null);
    const [carouselWidth, setCarouselWidth] = useState(0);
    const [showButtons, setShowButtons] = useState(false);

    useEffect(() => {
        const calculateDimensions = () => {
            const container = scrollContainerRef.current;
            if (!container || !container.firstElementChild) return;

            const firstItem = container.firstElementChild;
            const itemWidth = firstItem.offsetWidth;
            const containerStyle = window.getComputedStyle(container);
            const gap = parseInt(containerStyle.gap) || 0;
            const paddingX = (parseInt(containerStyle.paddingLeft) || 0) + (parseInt(containerStyle.paddingRight) || 0);
            
            const totalItems = Array.isArray(children) ? children.length : 0;

            const screenWidth = window.innerWidth;
            let visibleCount = itemsVisible.base;
            if (screenWidth >= 1280) { 
                visibleCount = itemsVisible.xl;
            } else if (screenWidth >= 768) {
                visibleCount = itemsVisible.md;
            }
            
            visibleCount = Math.min(totalItems, visibleCount);

            if (visibleCount > 0) {
                const newWidth = (visibleCount * itemWidth) + ((visibleCount - 1) * gap) + paddingX;
                setCarouselWidth(newWidth);
            } else {
                setCarouselWidth(0);
            }

            setShowButtons(totalItems > visibleCount);
        };

        const timer = setTimeout(calculateDimensions, 0);
        window.addEventListener('resize', calculateDimensions);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', calculateDimensions);
        };
    }, [children, itemsVisible]);

    const scroll = (direction) => {
        if (!scrollContainerRef.current || !scrollContainerRef.current.firstElementChild) return;

        const container = scrollContainerRef.current;
        const card = container.firstElementChild;
        const gap = parseInt(window.getComputedStyle(container).gap) || 0;
        const scrollDistance = card.offsetWidth + gap;
        const scrollAmount = direction === 'left' ? -scrollDistance : scrollDistance;

        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    };
    
    return (
        <div 
            className="relative group w-full flex justify-center"
        >
            <div 
                className="relative w-full"
                style={{ maxWidth: carouselWidth > 0 ? `${carouselWidth}px` : '100%' }}
            >
                <button
                    onClick={() => scroll('left')}
                    className={`absolute top-1/2 -left-5 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-lg cursor-pointer transition-all duration-300 hover:bg-gray-100 group-hover:opacity-100 hidden md:block ${showButtons ? 'visible opacity-75' : 'invisible opacity-0'}`}
                >
                    <Icon icon={'heroicons-outline:arrow-left'} className="h-5 w-5" />
                </button>
                
                <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto gap-4 p-4 scrollbar-hide"
                >
                    {children}            
                </div>

                <button
                    onClick={() => scroll('right')}
                    className={`absolute top-1/2 -right-5 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-lg cursor-pointer transition-all duration-300 hover:bg-gray-100 group-hover:opacity-100 hidden md:block ${showButtons ? 'visible opacity-75' : 'invisible opacity-0'}`}
                >
                    <Icon icon={'heroicons-outline:arrow-right'} className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
};

export default CustomCarousel;