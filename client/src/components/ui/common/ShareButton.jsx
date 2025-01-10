import React from "react";
import { Button } from "../button";
import { Share } from "lucide-react";

const ShareButton = () => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out this amazing property!",
          text: "I thought you might like it.",
          url: window.location.href,
        });
        console.log("Content shared successfully!");
      } catch (error) {
        console.error("Error sharing content:", error);
      }
    } else {
      alert("Web Share API is not supported in your browser.");
    }
  };

  return (
    <Button onClick={handleShare} variant="outline">
      <Share />
      Share
    </Button>
  );
};

export default ShareButton;
