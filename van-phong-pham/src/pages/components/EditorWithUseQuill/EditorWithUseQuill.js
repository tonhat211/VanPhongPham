import { useEffect } from 'react';
import { useQuill } from 'react-quilljs';
import BlotFormatter from 'quill-blot-formatter';
import 'quill/dist/quill.snow.css';

const Editor = ({
  value,              // nội dung do cha quản lý (controlled)
  defaultValue = '',  // nội dung khởi tạo (un‑controlled/use once)
  onChange,           // callback(changeHtml) => void
  placeholder = 'Write something...',
}) => {
  const { quill, quillRef, Quill } = useQuill({
    placeholder,
    modules: { blotFormatter: {} },
  });

  /* đăng ký BlotFormatter đúng lúc */
  if (Quill && !quill) {
    Quill.register('modules/blotFormatter', BlotFormatter);
  }

  /*  1) gán nội dung khởi tạo đúng 1 lần */
  useEffect(() => {
    if (quill && defaultValue) {
      quill.clipboard.dangerouslyPasteHTML(defaultValue);
    }
  }, [quill, defaultValue]);

  /*  2) phản ứng khi prop value đổi (component controlled) */
  useEffect(() => {
    if (quill && value !== undefined && value !== quill.root.innerHTML) {
      quill.clipboard.dangerouslyPasteHTML(value);
    }
  }, [quill, value]);

  /*  3) lắng nghe thay đổi để gọi onChange */
  useEffect(() => {
    if (!quill) return;

    const handler = () => {
      onChange?.(quill.root.innerHTML); // gửi HTML đầy đủ
    };

    quill.on('text-change', handler);
    return () => quill.off('text-change', handler); // clean‑up
  }, [quill, onChange]);

  return <div ref={quillRef} />;
};

export default Editor;
