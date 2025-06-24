import React, { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';

// Editor is an uncontrolled React component
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
      let Quill;
      let editorContainer;
      const container = containerRef.current;

      if (typeof window !== 'undefined') {
        // Clean up previous instance
        container.innerHTML = '';

        Quill = require('quill');
        Quill = Quill.default ? Quill.default : Quill; // ESM/CJS compat

        editorContainer = container.appendChild(
          container.ownerDocument.createElement('div'),
        );
        quill = new Quill(editorContainer, {
          theme: 'snow',
        });

        ref.current = quill;

        if (defaultValueRef.current) {
          quill.setContents(defaultValueRef.current);
        }

        quill.on(Quill.events.TEXT_CHANGE, (...args) => {
          onTextChangeRef.current?.(...args, quill);
        });

        quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
          onSelectionChangeRef.current?.(...args);
        });
      }

      return () => {
        if (ref) ref.current = null;
        if (containerRef.current) containerRef.current.innerHTML = '';
      };
    }, [ref]);

    return <div ref={containerRef} className="custom-quill-editor" style={{ minHeight: 200 }} />;;
  },
);

Editor.displayName = 'Editor';

export default Editor;