import { useCartModal } from "@/hooks/useCartModal";
import { Drawer } from "@mantine/core";
import { PropsWithChildren } from "react";
import ModalContent from "./ModalContent";

export default function CartModal({ children }: PropsWithChildren) {
  const [opened, toggle] = useCartModal();

  return (
    <>
      <Drawer
        opened={opened}
        onClose={toggle}
        position="right"
        className="absolute z-[10000]"
        size="lg"
        withCloseButton={false}
        transitionProps={{
          transition: "rotate-left",
          duration: 150,
          timingFunction: "linear",
        }}
      >
        {children ? children : <ModalContent />}
      </Drawer>
    </>
  );
}
