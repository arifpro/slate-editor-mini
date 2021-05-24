/* eslint-disable no-multi-assign */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-param-reassign */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable prettier/prettier */
import {css} from "@emotion/css";
import isHotkey from "is-hotkey";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import {
  MdCloudUpload, MdCode,
  MdFormatBold,
  MdFormatIndentIncrease,
  MdFormatItalic,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdFormatQuote,
  MdFormatUnderlined,
  MdImage,
  MdLooksOne,
  MdLooksTwo
} from "react-icons/md";
import {
  createEditor,
  Editor,
  Element as SlateElement,
  Transforms
} from "slate";
import {withHistory} from "slate-history";
import {
  Editable,
  Slate,
  useFocused,
  useSelected,
  useSlate,
  useSlateStatic,
  withReact
} from "slate-react";
import {HOTKEYS, initialValue} from "../../data";
import {Button, Toolbar} from "../custom";
// import TextArea from "./TextArea";
import {isBlockActive, isImageUrl} from "./validation";

// const HOTKEYS = {
//   "mod+b": "bold",
//   "mod+i": "italic",
//   "mod+u": "underline",
//   "mod+`": "code",
// };

const LIST_TYPES = ["numbered-list", "bulleted-list"];

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

// const isBlockActive = (editor, format) => {
//   const [match] = Editor.nodes(editor, {
//     match: (n) =>
//       !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
//   });
//   return !!match;
// };

const insertImage = (editor, url) => {
  const text = { text: "" };
  const image = { type: "image", url, children: [text] };
  Transforms.insertNodes(editor, image);
};

// const isImageUrl = (url) => {
//   if (!url) return false;
//   if (!isUrl(url)) return false;
//   const ext = new URL(url).pathname.split(".").pop();
//   return imageExtensions.includes(ext);
// };

const withImages = (editor) => {
  const { insertData, isVoid } = editor;
  editor.isVoid = (element) =>
    element.type === "image" ? true : isVoid(element);
  editor.insertData = (data) => {
    const text = data.getData("text/plain");
    const { files } = data;
    if (files && files.length > 0) {
      for (const file of files) {
        const reader = new FileReader();
        const [mime] = file.type.split("/");
        if (mime === "image") {
          reader.addEventListener("load", () => {
            const url = reader.result;
            insertImage(editor, url);
          });
          reader.readAsDataURL(file);
        }
      }
    } else if (isImageUrl(text)) {
      insertImage(editor, text);
    } else {
      insertData(data);
    }
  };
  return editor;
};

const CustomSlateEditor = () => {
  const [value, setValue] = useState(initialValue);
  const textArea = useRef();
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  // const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const editor = useMemo(() => withImages(withHistory(withReact(createEditor()))), []);
  const [selectedText, setSelectedText] = useState('')

  return (
    <Slate editor={editor} ref={textArea} value={value} onChange={(v) => setValue(v)}>
      <Toolbar style={{padding: '1rem', margin: 0}}>
        <MarkButton format="bold" icon={<MdFormatBold />} />
        <MarkButton format="italic" icon={<MdFormatItalic />} />
        <MarkButton format="underline" icon={<MdFormatUnderlined />} />
        <MarkButton format="code" icon={<MdCode />} />
        <BlockButton format="heading-one" icon={<MdLooksOne />} />
        <BlockButton format="heading-two" icon={<MdLooksTwo />} />
        <BlockButton format="block-quote" icon={<MdFormatQuote />} />
        <BlockButton format="numbered-list" icon={<MdFormatListNumbered />} />
        <BlockButton format="bulleted-list" icon={<MdFormatListBulleted />} />
        <InsertImageButton />
        <UploadImageButton />
        <MarkTab format="indent" icon={<MdFormatIndentIncrease />} setSelectedText={setSelectedText} />
      </Toolbar>
      <Editable
        style={{padding: '0.5rem 1rem'}}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        // ref={textArea}
        // value={value}
        // onChange={(e) => setValue(e.target.value)}
        placeholder="Enter some text…"
        spellCheck
        autoFocus
        onKeyDown={(e) => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, e)) {
              e.preventDefault();
              const mark = HOTKEYS[hotkey];
              toggleMark(editor, mark);
            }
          }

          // shift+tab
          if (e.shiftKey) {
            if (e.shiftKey && e.key === 'Tab') {
              e.preventDefault();
              isMarkActive(editor, "indent")
              toggleMark(editor, "indent");
            }
          }

          // tab
          if (e.key === 'Tab') {
            if (!e.shiftKey && e.key === 'Tab') {
              e.preventDefault();
              isMarkActive(editor, "indent")
              toggleMark(editor, "indent");
            }
          }
        }}
      />
    </Slate>
  );
};

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      LIST_TYPES.includes(
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type
      ),
    split: true,
  });
  const newProperties = {
    type: isActive ? "paragraph" : isList ? "list-item" : format,
  };
  Transforms.setNodes(editor, newProperties);
  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const Element = (props) => {
  const { attributes, children, element } = props;

  switch (element.type) {
    case "block-quote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "heading-one":
      return <h1 {...attributes}>{children}</h1>;
    case "heading-two":
      return <h2 {...attributes}>{children}</h2>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>;
    case "image":
      return <Image {...props} />;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Image = ({ attributes, children, element }) => {
  const selected = useSelected();
  const focused = useFocused();
  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <img
          src={element.url}
          className={css`
            display: block;
            max-width: 100%;
            max-height: 20em;
            box-shadow: ${selected && focused ? "0 0 0 3px #B4D5FF" : "none"};
          `}
        />
      </div>
      {children}
    </div>
  );
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }
  if (leaf.code) {
    children = <code>{children}</code>;
  }
  if (leaf.italic) {
    children = <em>{children}</em>;
  }
  if (leaf.underline) {
    children = <u>{children}</u>;
  }
  if (leaf.indent) {
    children = <p style={{display: 'inline-block', margin: 0}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {children}</p>;
  }
  return <span {...attributes}>{children}</span>;
};

const BlockButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      active={isBlockActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      {icon}
    </Button>
  );
};

const MarkButton = ({ format, icon }) => {
  const editor = useSlate();
  // console.log(editor)
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      {icon}
    </Button>
  );
};

const MarkTab = ({ format, icon, setSelectedText }) => {
  const editor = useSlate();
  setSelectedText(editor)
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      {icon}
    </Button>
  );
};

const InsertImageButton = () => {
  const editor = useSlateStatic();
  return (
    <Button
      onMouseDown={(event) => {
        event.preventDefault();
        // eslint-disable-next-line no-alert
        const url = window.prompt("Enter the URL of the image:");
        if (url && !isImageUrl(url)) {
          // eslint-disable-next-line no-alert
          alert("URL is not an image");
          return;
        }
        if (url) {
          insertImage(editor, url);
        }
      }}
    >
      <MdImage />
    </Button>
  );
};

// eslint-disable-next-line arrow-body-style
const UploadImageButton = () => {
  const editor = useSlateStatic();
  const [file, setFile] = useState();

  const handleChange = (files) => {
    console.log(files[0])
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => setFile(reader.result);
    reader.onerror = (error) => console.log('Error: ', error);
  };
  
  useEffect(() => {
    if (file) {
      insertImage(editor, file);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file])

  return (
    <div className="choose_file" style={{
      position:"relative",
      display:"inline-block",
    }}>
      <span>
        <Button>
          <MdCloudUpload />
        </Button>
      </span>
      <input
        type="file"
        name="imgUpload"
        accept='.png'
        // onChange={getBase64}
        // onChange={(e) => setFile(e.target.files[0]) }
        onChange={(e) => handleChange(e.target.files) }
        style={{
         '-webkit-appearance': 'none',
         position: 'absolute',
         top: 0,
         left: 0,
         opacity: 0, 
         width: '16px',
        }}
      />
    </div>
  );
};

export default CustomSlateEditor;
