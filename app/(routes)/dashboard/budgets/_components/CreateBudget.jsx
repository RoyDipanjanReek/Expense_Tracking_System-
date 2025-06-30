"use client";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function CreateBudget({refreshData}) {
  const [emojiIcon, setEmojiIcon] = useState("😊");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !amount) return;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("amount", amount);
    formData.append("emojiIcon", emojiIcon);
    try {
      const responce = await fetch("/api/create-budget", {
        method: "POST",
        body: formData,
      });

      if (!responce.ok) {
        // Log the error response for debugging
        const errorText = await responce.text();
        console.error("Server error:", errorText);
        throw new Error("Failed to create Budget");
      }

      const data = await responce.json();
      if(data) {

        refreshData()
        toast('New Budget Created!')
      }
      console.log(data);
      setIsUploading(data);
      router.push("/dashboard");
    } catch (error) {
      console.log("Failed to create budget", error);
      alert("Failed to create budget");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <div className="bg-slate-100 p-10 rounded-md items-center flex flex-col border-2 mt-5 border-dashed cursor-pointer hover:shadow-md">
            <h2 className="text-3xl">+</h2>
            <h2>Create New Budget</h2>
          </div>
        </DialogTrigger>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Create New Budget</DialogTitle>
              <DialogDescription>Add a new budget below. </DialogDescription>
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
                  <h2 className="text-black font-medium my-1">Budgets Name</h2>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Home Decor"
                    className="input"
                    required
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">
                    Budgets Amount
                  </h2>
                  <Input
                    type="number"
                    value={amount}
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
                  Create Budgets
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateBudget;
