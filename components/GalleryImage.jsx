"use client";
import { useEffect, useRef, useState } from "react";
import classes from "@styles/gallery.module.css";

const GalleryImage = ({ image, index }) => {
  const imageRef = useRef(null);
  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    const element = imageRef.current;
    if (!element) return;

    // Check if element is already visible in viewport on initial load
    const checkInitialVisibility = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // If the image is already visible on page load
      if (rect.top < windowHeight && rect.bottom > 0) {
        element.classList.add(classes.visible);
        setShouldAnimate(false);
        return true;
      }
      return false;
    };

    // Check immediately
    const isInitiallyVisible = checkInitialVisibility();

    // Only set up observer if image is NOT initially visible
    if (!isInitiallyVisible) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add(classes.visible);
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: "50px",
        }
      );

      observer.observe(element);

      return () => {
        observer.unobserve(element);
      };
    }
  }, []);

  return (
    <div 
      ref={imageRef} 
      className={classes.image_item}
      style={{ transitionDelay: shouldAnimate ? `${index * 0.05}s` : '0s' }}
    >
      <img src={image.src} alt={image.alt} loading="lazy" />
    </div>
  );
};

export default GalleryImage;