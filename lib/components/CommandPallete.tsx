import {
  Modal,
  ModalContent,
  ModalProps,
  Kbd,
  useDisclosure,
  ListboxItem,
} from "@nextui-org/react";
import { useEventListener } from "usehooks-ts";
import { useCallback, useEffect, useMemo, useState } from "react";
import Hits from "./Hits";
import Search from "./Search";
import {
  useConfigure,
  UseConfigureProps,
  useHits,
  useSearchBox,
} from "react-instantsearch";
import FocusLock from "react-focus-lock";
import type { Hit as THit, BaseHit } from "instantsearch.js";
import Highlight from "./Highlight";
import Snippet from "./Snippet";

//  hideCloseButton

export interface CommandPalleteProps<T extends BaseHit>
  extends Omit<
    ModalProps,
    | "isOpen"
    | "onOpenChange"
    | "isDismissable"
    | "hideCloseButton"
    | "closeButton"
    | "onSelect"
  > {
  // TODO move module in package json to devDependencies.
  configure: UseConfigureProps;
  onSelect?: (hit: THit<T>, close: () => void) => void;
}

const CommandPallete = <T extends BaseHit>({
  onSelect,
  configure = {},
}: CommandPalleteProps<T>) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { items } = useHits<T>();
  const { query } = useSearchBox();

  // Constants.
  const isMac = navigator.userAgent.includes("Mac");

  // Methods.
  const handleOnKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "k" && event.metaKey) {
        event.preventDefault();
        onOpenChange();
      }

      if (event.key === "ArrowDown") {
        setSelectedIndex((selectedIndex + 1) % items.length);
      }

      if (event.key === "ArrowUp") {
        setSelectedIndex((selectedIndex - 1 + items.length) % items.length);
      }

      if (event.key === "Enter" && onSelect) {
        onSelect(items[selectedIndex], onClose);
        onOpenChange();
      }
    },
    [selectedIndex, items, onSelect]
  );

  useConfigure(configure);
  useEventListener("keydown", handleOnKeyDown);

  // Lifecycle.
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Render.
  const selectedKeys = useMemo(
    () => new Set([selectedIndex.toString()]),
    [selectedIndex]
  );

  return (
    <>
      <button
        className="border inline-flex items-center gap-2 px-4 py-2 rounded-xl leading-none"
        onClick={onOpen}
      >
        <span className="text-sm">Quick search</span>
        <Kbd keys={isMac ? ["command"] : ["ctrl"]}>K</Kbd>
      </button>
      <Modal
        hideCloseButton
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable
      >
        <ModalContent>
          <FocusLock>
            <Search
              endContent={
                <Kbd as="button" className="text-[0.6rem]">
                  ESC
                </Kbd>
              }
            />
          </FocusLock>
          <Hits
            selectedKeys={selectedKeys}
            selectionMode="single"
            hitComponent={(hit, index) => (
              <ListboxItem
                key={index.toString()}
                hideSelectedIcon
                startContent={
                  <div className="size-10 flex-none rounded bg-primary-200" />
                }
                classNames={{
                  base: 'gap-4 data-[selected="true"]:bg-primary p-3 data-[hover="true"]:bg-gray-100 data-[selected="true"]:data-[hover="true"]:bg-primary-600 duration-300',
                  title:
                    'text-sm overflow-visible text-clip text-gray-700 group-data-[hover="true"]:text-gray-900 group-data-[selected="true"]:text-white group-data-[selected="true"]:group-data-[hover="true"]:text-white',
                  description:
                    'text-sm text-gray-500 group-data-[hover="true"]:text-gray-700 group-data-[selected="true"]:text-white group-data-[selected="true"]:group-data-[hover="true"]:text-white',
                }}
                title={<Highlight attribute="title" hit={hit} />}
                description={<Snippet attribute="description" hit={hit} />}
              />
            )}
          />
          <div className="flex flex-wrap items-center bg-gray-50 gap-4 px-4 py-2 text-xs text-gray-700">
            <span>
              <Kbd keys={["up"]} className="text-[0.6rem] mr-1" />
              <Kbd keys={["down"]} className="text-[0.6rem] mr-2" />
              to navigate
            </span>
            <span>
              <Kbd keys={["enter"]} className="text-[0.6rem] mr-2" />
              to select
            </span>
            <span>
              <Kbd className="text-[0.6rem] mr-2">ESC</Kbd>
              to close
            </span>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CommandPallete;
