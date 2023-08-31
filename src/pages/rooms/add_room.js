import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RichTextEditor, Link as EditorLink } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import { notifications } from "@mantine/notifications";

export default function AddRoom() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const editor = useEditor({
    extensions: [StarterKit, EditorLink, Highlight],
    content: content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  const submitForm = () => {
    let posts = JSON.parse(localStorage.getItem("posts"));
    if (!posts) posts = [];
    if (title && content) {
      posts.push({
        id: Math.floor(Math.random() * 100000),
        title: title,
        content: content,
        status: "review",
      });

      localStorage.setItem("posts", JSON.stringify(posts));

      notifications.show({
        title: "Create succesful",
        message: "Thank You!",
        color: "green",
      });
      navigate("/");
    } else {
      notifications.show({
        title: "Please enter field",
        color: "red",
      });
    }
  };

  return (
    <div>
      <div className="container mx-auto my-5">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h1 className="h1">Add New Meeting Room</h1>
        </div>
        <div className="card mb-2 p-4">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              submitForm();
            }}
          >
            <div className="mb-3">
              <label for="post-title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="post-title"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label for="post-content" className="form-label">
                Content of the Meeting
              </label>

              <RichTextEditor editor={editor}>
                <RichTextEditor.Toolbar sticky stickyOffset={60}>
                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Bold />
                    <RichTextEditor.Italic />
                    <RichTextEditor.Underline />
                    <RichTextEditor.Strikethrough />
                    <RichTextEditor.ClearFormatting />
                    <RichTextEditor.Highlight />
                    <RichTextEditor.Code />
                  </RichTextEditor.ControlsGroup>

                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.H1 />
                    <RichTextEditor.H2 />
                    <RichTextEditor.H3 />
                    <RichTextEditor.H4 />
                  </RichTextEditor.ControlsGroup>

                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Blockquote />
                    <RichTextEditor.Hr />
                    <RichTextEditor.BulletList />
                    <RichTextEditor.OrderedList />
                  </RichTextEditor.ControlsGroup>

                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Link />
                    <RichTextEditor.Unlink />
                  </RichTextEditor.ControlsGroup>

                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.AlignLeft />
                    <RichTextEditor.AlignCenter />
                    <RichTextEditor.AlignJustify />
                    <RichTextEditor.AlignRight />
                  </RichTextEditor.ControlsGroup>
                </RichTextEditor.Toolbar>

                <RichTextEditor.Content />
              </RichTextEditor>
            </div>
            <div className="text-end">
              <button type="submit" className="btn btn-primary">
                Add
              </button>
            </div>
          </form>
        </div>
        <div className="text-center">
          <Link to="/dashboard" className="btn btn-link btn-sm">
            <i className="bi bi-arrow-left"></i> Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
