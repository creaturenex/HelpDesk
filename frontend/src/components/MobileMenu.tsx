import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

import { Link } from "@tanstack/react-router";
import { useState } from "react";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>
          <Menu />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <Button
          className="py-4 text-2xl font-bold border"
          size="lg"
          variant="link"
          onClick={() => setIsOpen(false)}
        >
          <Link to="/">Home</Link>
        </Button>
        <Button
          className="py-4 text-2xl font-semibold"
          size="lg"
          variant="link"
          onClick={() => setIsOpen(false)}
        >
          <Link to="/ticket/new">New Ticket</Link>
        </Button>
      </DrawerContent>
    </Drawer>
  );
}
