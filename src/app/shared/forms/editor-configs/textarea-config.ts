import {AngularEditorConfig} from "@kolkov/angular-editor";

export const sharedEditorConfig: AngularEditorConfig = {
  editable: true,
  spellcheck: false,
  minHeight: '15rem',
  maxHeight: '50rem',
  translate: 'no',
  sanitize: false,
  // toolbarPosition: 'top',
  outline: true,
  // showToolbar: false,
  defaultParagraphSeparator: 'p',
  toolbarHiddenButtons: [
    [
      'strikeThrough',
      'indent',
      'outdent',
      'fontName'
    ],
    [
      'fontSize',
      'backgroundColor',
      'customClasses',
      'insertVideo',
      'insertHorizontalRule',
      'removeFormat',
      'toggleEditorMode'
    ]
  ]
};
