"use client"

import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState, useLayoutEffect, useEffect, createContext, useContext } from "react";
import { useThemeMode } from "../theme/ThemeContext";

// Contexte pour partager l'état de l'animation
const ThemeAnimationContext = createContext({
    currentRadius: 0,
    maxRadius: 0,
    centerX: 0,
    centerY: 0,
    isAnimating: false,
    mode: 'light',
    prevMode: 'light'
});

export const useThemeAnimation = () => useContext(ThemeAnimationContext);

function usePrevious(value) {
    const ref = useRef();
    const prev = ref.current;
    ref.current = value;
    return prev;
}

export function useAnimatedTheme(elementRef) {
    const { currentRadius, centerX, centerY, isAnimating, mode, prevMode } = useThemeAnimation();
    const [elementMode, setElementMode] = useState(mode);

    useEffect(() => {
        if (!isAnimating || !elementRef.current) {
            setElementMode(mode);
            return;
        }
        const rect = elementRef.current.getBoundingClientRect();
        const elementCenterX = rect.left + rect.width / 2;
        const elementCenterY = rect.top + rect.height / 2;
        const distance = Math.hypot(elementCenterX - centerX, elementCenterY - centerY);
        setElementMode(currentRadius >= distance ? mode : prevMode);
    }, [currentRadius, centerX, centerY, isAnimating, mode, prevMode, elementRef]);

    return elementMode;
}

export default function AnimatedThemeWrapper({ children }) {
    const { mode } = useThemeMode();
    const prevMode = usePrevious(mode);

    const backgrounds = {
        dark: "#0a192f",
        light: "#f5f5f5",
    };

    const [dimensions, setDimensions] = useState({ w: 0, h: 0 });
    const [currentRadius, setCurrentRadius] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [displayedMode, setDisplayedMode] = useState(mode);
    const containerRef = useRef();

    // Calcul du centre et du rayon max
    const centerX = dimensions.w / 2;
    const centerY = dimensions.h / 2;
    const maxRadius = Math.hypot(dimensions.w, dimensions.h);

    // Gère le changement de mode
    useEffect(() => {
        if (mode !== displayedMode) {
            setIsAnimating(true);
            const timeout = setTimeout(() => {
                setDisplayedMode(mode);
                setIsAnimating(false);
                setCurrentRadius(0);
            }, 600);
            return () => clearTimeout(timeout);
        }
    }, [mode, displayedMode]);

    // Gère la taille du conteneur
    useLayoutEffect(() => {
        function update() {
            if (containerRef.current) {
                setDimensions({
                    w: containerRef.current.offsetWidth,
                    h: containerRef.current.offsetHeight,
                });
            }
        }
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    const contextValue = {
        currentRadius,
        maxRadius,
        centerX,
        centerY,
        isAnimating,
        mode,
        prevMode: prevMode || mode,
    };

    return (
        <ThemeAnimationContext.Provider value={contextValue}>
            <div
                ref={containerRef}
                style={{
                    position: "relative",
                    minHeight: "100vh",
                    overflow: "hidden",
                    width: "100%",
                }}
            >
                {/* Fond affiché */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background: backgrounds[displayedMode],
                        zIndex: 0,
                        transition: "background 0.3s",
                    }}
                />

                {/* Reveal circulaire */}
                <AnimatePresence mode="wait">
                    {mode !== displayedMode && maxRadius > 10 && dimensions.w > 0 && dimensions.h > 0 && (
                        <motion.div
                            key={mode + maxRadius}
                            initial={{
                                clipPath: `circle(0px at 50% 50%)`,
                                background: backgrounds[mode],
                            }}
                            animate={{
                                clipPath: `circle(${maxRadius}px at 50% 50%)`,
                                background: backgrounds[mode],
                            }}
                            exit={{
                                clipPath: `circle(0px at 50% 50%)`,
                                background: backgrounds[mode],
                            }}
                            transition={{
                                duration: 0.6,
                                ease: "easeInOut",
                                onUpdate: (latest) => {
                                    const clipPath = latest.clipPath;
                                    if (typeof clipPath === 'string') {
                                        const match = clipPath.match(/circle\((\d+(?:\.\d+)?)px/);
                                        if (match) setCurrentRadius(parseFloat(match[1]));
                                    }
                                }
                            }}
                            style={{
                                position: "absolute",
                                inset: 0,
                                zIndex: 1,
                                width: "100%",
                                height: "100%",
                            }}
                        />
                    )}
                </AnimatePresence>

                <div style={{ position: "relative", zIndex: 2 }}>
                    {children}
                </div>
            </div>
        </ThemeAnimationContext.Provider>
    );
}