// TinyMCEEditor.js

import React, { forwardRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
const TinyMCEEditor = forwardRef(function TinyMCEEditor({ initialData }, ref) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [editorInitialized, setEditorInitialized] = useState(false);
  const editorRef = useRef(null);
  const filePickerCallback = (callback, value, meta) => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", meta.filetype);

    input.addEventListener("change", () => {
      const file = input.files[0];
      if (file) {
        setSelectedFile(file);
        // Upload the file to the server
        uploadFileToServer(file)
          .then((responseBody) => {
            console.log(responseBody.imageUrl);

            // Invoke the callback with the uploaded file URL
            callback(responseBody.imageUrl, {
              src: responseBody.imageUrl,
              alt: "Image Alt Text",
            });
          })
          .catch((error) => {
            console.error("File upload failed:", error);
          });
      }
    });

    input.click();
  };
  const uploadFileToServer = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      console.log(response.status); // Log HTTP status code
      console.log(response.statusText); // Log textual representation of the status

      if (!response.ok) {
        throw new Error("File upload failed");
      }

      const responseBody = await response.json();
      console.log(responseBody);
      return responseBody || {}; // Handle the case where responseBody is undefined
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    if (editorRef.current) {
      setEditorInitialized(true);
    }
  }, [editorRef]);

  React.useImperativeHandle(ref, () => ({
    getContent: () => {
      if (editorRef.current) {
        return editorRef.current.getContent();
      }
  
      return "";
    },
  
    setContent: (content) => {
      if (editorRef.current) {
        editorRef.current.setContent(content);
      }
    }
  }));

  return (
    <>
      <Editor
        // ref={editorRef}
        
        apiKey="if6pwyg36vy2fkube5ipns7z6okc1gkgvaurqvqndl47yxce"
        initialValue={initialData}
        onInit={(evt, editor) => {
          editorRef.current = editor;
          setEditorInitialized(true);
        }}
        
        onEditorChange={(evt, editor) => {
          editorRef.current = editor;
        }}
        init={{
          valid_elements: '*[*]',
          custom_elements:"style",
          // valid_children : '+body[style]',
          extended_valid_elements: "svg[*],a[*],link[href|rel|type|media],script[src|type]", // This allows most SVG elements
          selector: "#myTextarea", // Specifies the target textarea or element
          width: "100%", // Sets the width of the editor
          height: 300, // Sets the height of the editor
          plugins: [
            "advlist",
            "autolink",
            "link",
            "image",
            "lists",
            "charmap",
            "preview",
            "anchor",
            "pagebreak",
            "searchreplace",
            "wordcount",
            "visualblocks",
            "visualchars",
            "fullscreen",
            "code",
            "insertdatetime",
            "media",
            "table",
            "emoticons",
            "help",
          ], // Specifies the list of plugins to be included
          toolbar:
            "undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | " +
            "bullist numlist outdent indent | link image | print preview media fullscreen | " +
            "forecolor backcolor emoticons | help", // Defines the toolbar configuration
          menu: {
            favs: {
              title: "My Favorites",
              items: "code visualaid | searchreplace | emoticons",
            },
          }, // Defines a custom menu with favorites
          menubar: "favs file edit view insert format tools table help", // Specifies the items in the menubar
          content_css: [
             'https://cdn.jsdelivr.net/npm/owl.carousel@2.3.4/dist/assets/owl.carousel.min.css',
             'https://cdn.jsdelivr.net/npm/owl.carousel@2.3.4/dist/assets/owl.theme.default.min.css',        
             '"https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH',        
            'css/content.css',
          ],
          file_picker_callback: filePickerCallback,
        }}
      />
    </>
  );
});

export default TinyMCEEditor;
