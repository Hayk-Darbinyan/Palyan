import { toast } from "sonner";

export const shareOnFacebook = (url: string) => {
  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    "_blank",
    "width=600,height=400"
  );
};

export const shareOnInstagram = async (url: string) => {
  try {
    await navigator.clipboard.writeText(url);
    toast.success("URL copied to clipboard");
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
};

export const shareUniversal = async (title: string, url: string) => {
  try {
    await navigator.share({
      title,
      url,
    });
  } catch (err) {
    console.error("Error sharing", err);
    toast.error("Error sharing");
  }
};
