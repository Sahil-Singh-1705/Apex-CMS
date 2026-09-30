// // components/custom-editor.js

// import React from "react";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import Editor from "ckeditor5-custom-build";

// const editorConfiguration = {
//   toolbar: {
//     items: [
//       "heading",
//       "|",
//       "bold",
//       "italic",
//       "underline",
//       "link",
//       "bulletedList",
//       "numberedList",
//       "|",
//       "outdent",
//       "indent",
//       "alignment",
//       "|",
//       "fontBackgroundColor",
//       "fontColor",
//       "fontFamily",
//       "fontSize",
//       "|",
//       "style",
//       "sourceEditing",
//       "imageUpload",
//       "imageInsert",
//       "|",
//       "specialCharacters",
//       "subscript",
//       "superscript",
//       "blockQuote",
//       "|",
//       "insertTable",
//       "mediaEmbed",
//       "pageBreak",
//       "code",
//       "findAndReplace",
//       "undo",
//       "redo",
//     ],
//   },
//   language: "en",
//   image: {
//     resizeUnit: 'px',
//     toolbar: [
//       'imageStyle:alignLeft',
//       'imageStyle:full',
//       'imageStyle:alignRight',
//       '|',
//       'imageTextAlternative'
//     ],
//     styles: ['full', 'alignLeft', 'alignRight']
//   },
//   table: {
//     contentToolbar: [
//       "tableColumn",
//       "tableRow",
//       "mergeTableCells",
//       "tableCellProperties",
//       "tableProperties",
//     ],
//   },
// };

// function CustomEditor({ initialData, setContent }) {
//   return (
//     <CKEditor
//       editor={Editor}
//       config={editorConfiguration}
//       data={initialData}
//       onChange={(event, editor) => {
//         const data = editor.getData();
//         setContent(data);
//         console.log({ event, editor, data });
//       }}
//     />
//   );
// }

// export default CustomEditor;
