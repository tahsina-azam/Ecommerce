import { useCartModal } from "@/hooks/useCart";
import { Drawer } from "@mantine/core";
import ModalContent from "./ModalContent";

export default function CartModal() {
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
        <ModalContent />
      </Drawer>
    </>
  );
}
