export const fadeBack = {
    name: "Fade Back",
    variants: {
        hidden: { opacity: 0, x: 0, y: 20 },
        enter: { opacity: 1, x: 0, y: 0 },
        exit: { opacity: 0, x: 0, y: 0 },
    },
    transition: {
        duration: 0.4,
        type: 'linear'
    }
};
