"use client";
import { Button } from "@/components/ui/button";
import { PenBox } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EmojiPicker from "emoji-picker-react";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";

function EditExpence({ budgets }) {
  const [emojiIcon, setEmojiIcon] = useState("😊");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState(budgets?.name);
  const [amount, setAmount] = useState(budgets?.amount);
  const { user } = useUser();

  const handleOnUpdateBudgetSubmit = async (e) => {};
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex gap-2 items-center bg-blue-600 hover:bg-blue-700 cursor-pointer">
            <PenBox />
            <span className="hidden md:inline text-white">Edit</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <form onSubmit={handleOnUpdateBudgetSubmit}>
            <DialogHeader>
              <DialogTitle>Update Budget</DialogTitle>
              <DialogDescription>
                Update the existing budget.{" "}
              </DialogDescription>
              <div className="mt-5">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg"
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                >
                  {emojiIcon}
                </Button>
                <div className="absolute z-20">
                  <EmojiPicker
                    open={openEmojiPicker}
                    onEmojiClick={(e) => {
                      setEmojiIcon(e.emoji);
                      setOpenEmojiPicker(false);
                    }}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">
                    Update Budget Name
                  </h2>
                  <Input
                    type="text"
                    defaultValue={budgets?.name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Home Decor"
                    className="input"
                    required
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">
                    Update Budget Amount
                  </h2>
                  <Input
                    type="number"
                    defaultValue={budgets?.amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="e.g. 5000$"
                    className="input"
                    required
                  />
                </div>
              </div>
            </DialogHeader>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="submit" className="mt-5 w-full">
                  Update Budget
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditExpence;
