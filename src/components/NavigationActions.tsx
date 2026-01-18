import { useState } from "react";
import { LinkIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export function NavigationActions() {
  const [showShareDialog, setShowShareDialog] = useState(false);

  const copyLink = () => {
    window.navigator.clipboard.writeText(window.location.href);
    toast.success("Copied link to clipboard!");
  };

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" aria-label="Share menu" size="icon-sm">
            <LinkIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem onSelect={copyLink}>Copy link</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setShowShareDialog(true)}>
              Generate QR Code
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Share Note</DialogTitle>
          </DialogHeader>

          <p>QR CODE</p>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Copy image</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
