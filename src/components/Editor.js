import React, { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';

// Editor is an uncontrolled React component for Quill rich text editing
const Editor = forwardRef(
  ({ readOnly, defaultValue, onTextChange, onSelectionChange }, ref) => {
    // Ref for the container div where Quill will mount
    const containerRef = useRef(null);

    // Ref to store the default value for the editor
    const defaultValueRef = useRef(defaultValue);

    // Refs to always have the latest callbacks
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);


    // Keep callback refs up to date to avoid stale closures
    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    });

    // Enable or disable the editor based on readOnly prop
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

        // Dynamically require Quill for client-side only
        Quill = require('quill');
        Quill = Quill.default ? Quill.default : Quill; // ESM/CJS compatibility

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
      }

      // Cleanup on unmount: remove Quill instance and clear container
      return () => {
        if (ref) ref.current = null;
        if (containerRef.current) containerRef.current.innerHTML = '';
      };
    }, [ref]);

    // Render the container div for the Quill editor
    return <div ref={containerRef} className="custom-quill-editor" style={{ minHeight: 200 }} />;;
  },
);

Editor.displayName = 'Editor';

export default Editor;