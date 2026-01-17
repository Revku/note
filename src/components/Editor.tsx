import { useEffect, useState } from "react";

export function Editor() {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    if (content.length == 0) return;
  }, [content]);

  return (
    <div className="py-5 h-full">
      <textarea
        className="w-full h-full resize-none text-white outline-none"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
    </div>
  );
}
