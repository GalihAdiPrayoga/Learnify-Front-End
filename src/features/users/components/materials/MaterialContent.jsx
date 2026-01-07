import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const variants = {
  enter: (dir) => ({ x: 80 * dir, opacity: 0, filter: "blur(6px)" }),
  center: { x: 0, opacity: 1, filter: "blur(0px)" },
  exit: (dir) => ({ x: -80 * dir, opacity: 0, filter: "blur(6px)" }),
};

const normalizeHtml = (raw) => {
  if (!raw) return "";
  let html = String(raw);
  const textarea = document.createElement("textarea");
  textarea.innerHTML = html;
  html = textarea.value;
  return html.replace(/\u00a0/g, " ").trim();
};

const MaterialContent = ({ material, animDir = 0 }) => {
  const renderedHtml = useMemo(
    () => normalizeHtml(material?.konten),
    [material]
  );

  return (
    <>
      <style>
        {`
          .prose h1 { font-size: 2.75rem; font-weight: 800; margin: 2.5rem 0 1.5rem; }
          .prose h2 { font-size: 2.1rem; font-weight: 700; margin: 2.25rem 0 1.25rem; }
          .prose h3 { font-size: 1.75rem; font-weight: 600; margin: 2rem 0 1rem; }
          .prose h4 { font-size: 1.4rem; font-weight: 600; margin: 1.75rem 0 0.75rem; }
          .prose p { margin-bottom: 1.25rem; line-height: 1.8; }
          .ql-align-center { text-align: center; }
          .ql-align-right { text-align: right; }
          .ql-align-justify { text-align: justify; }
          .ql-indent-1 { padding-left: 3em; }
          .ql-indent-2 { padding-left: 6em; }
          .ql-indent-3 { padding-left: 9em; }
          .prose pre { background: #0f172a; color: #e5e7eb; padding: 1.25rem; border-radius: 0.75rem; margin: 1.5rem 0; }
          .prose blockquote { border-left: 4px solid #cbd5f5; padding-left: 1rem; font-style: italic; color: #475569; }
        `}
      </style>

      <AnimatePresence mode="wait">
        <motion.article
          key={material?.id}
          custom={animDir || 1}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.35 }}
          className="prose prose-slate max-w-none text-gray-800"
          dangerouslySetInnerHTML={{ __html: renderedHtml }}
        />
      </AnimatePresence>
    </>
  );
};

export default MaterialContent;
