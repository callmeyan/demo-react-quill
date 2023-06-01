// import {css} from "@emotion/css";
import React, { useEffect, useRef, useState } from 'react';
import './ReplaceParser.tsx';
import ReactQuill, { Quill } from 'react-quill';
import { DeltaStatic, Sources } from 'quill';
import 'react-quill/dist/quill.snow.css';

// /既往开来

const CustomHeart = () => <span>♥</span>;

function insertHeart() {
  const cursorPosition = this.quill.getSelection().index;
  this.quill.insertText(cursorPosition, '♥');
  this.quill.setSelection(cursorPosition + 1);
}

/*
 * Custom toolbar component including the custom heart button and dropdowns
 */
const EditorToolbar = () => (
  <div id="quill-editor-toolbar">
    <select className="ql-font">
      <option value="arial">Arial</option>
      <option value="comic-sans">Comic Sans</option>
      <option value="courier-new">Courier New</option>
      <option value="georgia">Georgia</option>
      <option value="helvetica">Helvetica</option>
      <option value="lucida">Lucida</option>
    </select>
    <select className="ql-size">
      <option value="extra-small">Size 1</option>
      <option value="small">Size 2</option>
      <option value="medium" selected>
        Size 3
      </option>
      <option value="large">Size 4</option>
    </select>
    <select className="ql-align" />
    <select className="ql-color" />
    <select className="ql-background" />
    <button className="ql-clean" />
    {/*<button className="ql-insertHeart">*/}
    {/*    <CustomHeart />*/}
    {/*</button>*/}
  </div>
);

// Add sizes to whitelist and register them
const Size = Quill.import('formats/size');
Size.whitelist = ['extra-small', 'small', 'medium', 'large'];
Quill.register(Size, true);

// Add fonts to whitelist and register them
const Font = Quill.import('formats/font');
Font.whitelist = [
  'arial',
  'comic-sans',
  'courier-new',
  'georgia',
  'helvetica',
  'lucida',
];
Quill.register(Font, true);

type QuillEditorProps = {
  editContent: any;
  selected?: HTMLElement;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
};
const icons = Quill.import('ui/icons');
icons['undo'] = `<svg viewbox="0 0 18 18">
    <polygon class="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10"></polygon>
    <path class="ql-stroke" d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"></path>
  </svg>`;
icons['redo'] = `<svg viewbox="0 0 18 18">
    <polygon class="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10"></polygon>
    <path class="ql-stroke" d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"></path>
  </svg>`;
export const QuillEditor: React.FC<QuillEditorProps> = (props) => {
  // const [value, setValue] = useState('');
  const [content, setContent] = useState<DeltaStatic>(props.editContent);
  const editorInstance = useRef<ReactQuill>(null);
  const handleChange = (
    value: string,
    _delta: DeltaStatic,
    _source: Sources,
    editor: ReactQuill.UnprivilegedEditor
  ) => {
    // setValue(value)
    // console.log(delta, source, editor)
    setContent(editor.getContents());
  };
  const toolbar = [
    [{ header: [1, 2, 3, 4, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'undo', 'redo'],
    ['clean'],
  ];
  const modules = {
    toolbar: {
      container: '#quill-editor-toolbar',
      // handlers:{
      //     undo: ()=>{
      //         // editorInstance.current?.getEditor()
      //         console.log('undo')
      //     },
      //     redo:()=>{
      //         console.log('redo')
      //
      //     }
      // }
    },
  };
  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'replace',
  ];
  const handleReplaceItemClick = (node: HTMLElement) => {
    const blot = Quill.find(node);
    const offset = blot.offset(blot.scroll),
      length = blot.length();
    editorInstance.current?.editor?.setSelection(offset, length);
  };
  const handleEditorClick = (e: React.MouseEvent<HTMLElement>) => {
    const span = e.target as HTMLSpanElement;
    if (!span) {
      return;
    }
    if (span.classList.contains('text-replace-item')) {
      handleReplaceItemClick(span);
    }
    if (props.onClick) {
      props.onClick(e);
    }
  };

  useEffect(() => {
    if (props.selected) {
      handleReplaceItemClick(props.selected);
    }
  }, [props]);

  return (
    <div className="editor-container" onClick={handleEditorClick}>
      <ReactQuill
        ref={editorInstance}
        modules={modules}
        formats={formats}
        theme="snow"
        value={content}
        onChange={handleChange}
      />
      <EditorToolbar />
    </div>
  );
};
/*
 <div className={css(`
            background:#eee;
            padding:10px;
            margin-top:10px;
            border:solid 1px #999;
            border-radius:4px;
            `)}>{JSON.stringify(content)}</div>
        <div className={css(`
            background:#eee;
            padding:10px;
            margin-top:10px;
            border:solid 1px #999;
            border-radius:4px;
            `)}>{JSON.stringify(value)}</div>
 */
