import { useEffect, useLayoutEffect, useState } from "react";
import LZString from "lz-string";

export function Editor() {
  const [content, setContent] = useState<string>("");
  const [hash, setHash] = useState<string>("");

  useLayoutEffect(() => {
    const windowHash = window.location.hash;
    if (!windowHash) return;

    setContent(LZString.decompressFromEncodedURIComponent(windowHash.slice(1)));
  }, []);

  useEffect(() => {
    if (content.length == 0) return;

    setHash(LZString.compressToEncodedURIComponent(content));
  }, [content]);

  useEffect(() => {
    if (!hash) return;

    window.location.hash = hash;
  }, [hash]);

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
