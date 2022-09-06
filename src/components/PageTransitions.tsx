import type {FC, PropsWithChildren} from 'react';
import type {NextRouter} from "next/router";
import {AnimatePresence, LazyMotion, m} from "framer-motion";
import {fadeBack} from '../lib/animations';

const lazyAnimation = () => import("./DomFeatures").then((mod) => mod.default);

interface Props {
    router: NextRouter;
}

function handleExitComplete() {
    if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0 })
    }
}

const PageTransitions: FC<PropsWithChildren<Props>> = ({router, children}) => {
    return (
        <LazyMotion features={lazyAnimation}>
            <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
                <m.div
                    key={router.route.concat(fadeBack.name)}
                    className="page-wrap"
                    initial="hidden"
                    animate="enter"
                    exit="exit"
                    variants={fadeBack.variants}
                    transition={fadeBack.transition}
                >
                    {children}
                </m.div>
            </AnimatePresence>
        </LazyMotion>
    );
};

export default PageTransitions;
