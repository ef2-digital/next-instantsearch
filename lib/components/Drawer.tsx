import {
  domAnimation,
  LazyMotion,
  AnimatePresence,
  m,
  type Variants,
  useAnimation,
} from "framer-motion";
import { PropsWithChildren, useEffect, useMemo } from "react";
import { Fragment } from "react/jsx-runtime";
import { useFloating, useInteractions, useDismiss } from "@floating-ui/react";

export interface DrawerProps {
  isOpen: boolean;
  size?: number;
  classNames?: {
    overlay?: string;
    base?: string;
  };
  onClose: () => void;
}

const overlayVariants: Variants = {
  close: {
    opacity: 0,
    transition: {
      delay: 0.3,
    },
  },
  open: {
    opacity: 1,
  },
};

const Drawer = ({
  isOpen,
  classNames,
  children,
  size = 300,
  onClose,
}: PropsWithChildren<DrawerProps>) => {
  const constrols = useAnimation();

  const { context } = useFloating({
    open: isOpen,
    onOpenChange: onClose,
  });

  const { getFloatingProps } = useInteractions([useDismiss(context)]);

  // Life cycle.
  useEffect(() => {
    constrols.start(isOpen ? "open" : "close");
  }, [isOpen, constrols]);

  // Render.
  const baseVariants: Variants = useMemo(
    () => ({
      close: {
        right: -size,
      },
      open: {
        right: 0,
      },
    }),
    [size]
  );

  return (
    <Fragment>
      <LazyMotion features={domAnimation}>
        <AnimatePresence>
          {isOpen && (
            <m.div
              className={`absolute inset-0 w-full h-full pointer-events-auto z-[9995] bg-black bg-opacity-10 ${classNames?.overlay ?? ""}`}
              initial="close"
              exit="close"
              animate={isOpen ? "open" : "close"}
              variants={overlayVariants}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>
        <m.div
          {...getFloatingProps()}
          className={`fixed pointer-events-auto bg-white z-[9999] box-border w-full top-0 h-full ${classNames?.base ?? ""}`}
          style={{ width: size }}
          initial="close"
          animate={constrols}
          variants={baseVariants}
          transition={{
            type: "tween",
            duration: 0.3,
          }}
        >
          {children}
        </m.div>
      </LazyMotion>
    </Fragment>
  );
};

export default Drawer;
