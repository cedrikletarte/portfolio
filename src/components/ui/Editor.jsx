import React, { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';

// Editor is an uncontrolled React component for Quill rich text editing
const Editor = forwardRef(({ readOnly, defaultValue, onTextChange, onSelectionChange }, ref) => {
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
        editorContainer = container.appendChild(container.ownerDocument.createElement('div'));

        // Initialize Quill editor
        quill = new Quill(editorContainer, {
          theme: 'snow',
        });

        // The snow theme's link tooltip renders its "edit"/"remove" actions as
        // bare <a> tags with no href (unlike its own "preview" link, which ships
        // with href="about:blank" for this exact reason). Lighthouse's SEO audit
        // flags anchors without a href as uncrawlable. Quill always calls
        // preventDefault() on these clicks, so giving them the same inert href
        // Quill already uses elsewhere is safe and doesn't change behavior.
        container.querySelectorAll('a.ql-action, a.ql-remove').forEach((el) => {
          el.setAttribute('href', 'about:blank');
        });

        // Quill's toolbar dropdowns (.ql-picker-label, role="button") render with
        // no visible text (icon-only) and no accessible name of their own,
        // failing the aria-command-name audit for screen reader users. Each
        // dropdown's wrapper carries a "ql-<format>" class we can map to a label.
        const PICKER_LABELS = {
          header: 'Text style',
          font: 'Font',
          size: 'Font size',
          color: 'Text color',
          background: 'Background color',
          align: 'Alignment',
        };
        container.querySelectorAll('.ql-picker').forEach((picker) => {
          const format = [...picker.classList]
            .find((c) => c.startsWith('ql-') && c !== 'ql-picker' && c !== 'ql-expanded')
            ?.replace('ql-', '');
          const label = picker.querySelector('.ql-picker-label');
          if (label && format && PICKER_LABELS[format]) {
            label.setAttribute('aria-label', PICKER_LABELS[format]);
          }
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
});

Editor.displayName = 'Editor';

export default Editor;
