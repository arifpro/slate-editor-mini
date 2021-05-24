/* eslint-disable no-multi-assign */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-param-reassign */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable prettier/prettier */
import isHotkey from "is-hotkey";
import React, {
  useCallback,
  useMemo,
  useRef,
  useState
} from "react";
import {
  MdCode,
  MdFormatBold,
  MdFormatIndentIncrease,
  MdFormatItalic,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdFormatQuote,
  MdFormatUnderlined,
  MdLooksOne,
  MdLooksTwo
} from "react-icons/md";
import {createEditor} from "slate";
import {withHistory} from "slate-history";
import {Editable, Slate, withReact} from "slate-react";
import {HOTKEYS, initialValue} from "../../data";
import {Element, Leaf, Toolbar} from "../custom";
import {BlockButton, InsertImageButton, MarkButton, MarkTab, UploadImageButton} from "./ButtonIcons";
import {toggleMark, withImages} from "./helper";
import {isMarkActive} from "./validation";

const CustomSlateEditor = () => {
  const [value, setValue] = useState(initialValue);
  const textArea = useRef();
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
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

export default CustomSlateEditor;
