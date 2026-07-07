import React, { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';

// Editor is an uncontrolled React component for Quill rich text editing
const Editor = forwardRef(
  ({ readOnly, defaultValue, onTextChange, onSelectionChange }, ref) => {
    const containerRef = useRef(null);
    const defaultValueRef = useRef(defaultValue);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    });

    useEffect(() => {
      ref.current?.enable?.(!readOnly);
    }, [ref, readOnly]);

    useEffect(() => {
      let quill;
      let editorContainer;
      const container = containerRef.current;
      let isMounted = true;

      if (typeof window !== 'undefined') {
        // Clean up previous instance
        container.innerHTML = '';

        // Dynamically import Quill for client-side only
        import('quill').then((QuillModule) => {
          if (!isMounted) return;
          const Quill = QuillModule.default ? QuillModule.default : QuillModule;

          // Create a new div for Quill to mount into
          editorContainer = container.appendChild(
            container.ownerDocument.createElement('div'),
          );

          // Initialize Quill editor
          quill = new Quill(editorContainer, {
            theme: 'snow',
          });

          // Expose the Quill instance via ref
          ref.current = quill;

          // Set the default value if provided
          if (defaultValueRef.current) {
            quill.setContents(defaultValueRef.current);
          }

          // Listen for text changes and call the provided callback
          quill.on(Quill.events.TEXT_CHANGE, (...args) => {
            onTextChangeRef.current?.(...args, quill);
          });

          // Listen for selection changes and call the provided callback
          quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
            onSelectionChangeRef.current?.(...args);
          });
        });
      }

      // Cleanup on unmount: remove Quill instance and clear container
      return () => {
        isMounted = false;
        if (ref) ref.current = null;
        if (containerRef.current) containerRef.current.innerHTML = '';
      };
    }, [ref]);

    return <div ref={containerRef} className="custom-quill-editor" style={{ minHeight: 200 }} />;
  },
);

Editor.displayName = 'Editor';

export default Editor;