/*
 * Registration form fields — edit this list to add, remove, or rename
 * questions. The form, validation, and submitted data all follow it.
 *
 *   name          key used in the submitted data
 *   label         text shown above the field
 *   type          "text" | "email" | "textarea" | "tel"
 *   required      true / false
 *   placeholder   hint text inside the box
 *   autocomplete  browser autofill hint
 *   errorMessage  shown when a required field is empty
 *
 * NOTE: these are placeholder fields. Final fields will be confirmed by the
 * Open Score founders. Since students are young, only collect what is needed.
 */
window.OPEN_SCORE_REGISTRATION_FIELDS = [
  {
    name: 'studentFirstName',
    label: 'Student first name',
    type: 'text',
    required: true,
    placeholder: 'e.g. Maya',
    autocomplete: 'off',
    errorMessage: "Enter the student's first name."
  },
  {
    name: 'guardianName',
    label: 'Parent / guardian name',
    type: 'text',
    required: true,
    placeholder: 'Full name',
    autocomplete: 'name',
    errorMessage: "Enter a parent or guardian's name."
  },
  {
    name: 'guardianEmail',
    label: 'Parent / guardian email',
    type: 'email',
    required: true,
    placeholder: 'name@email.com',
    autocomplete: 'email',
    errorMessage: 'Enter an email address.'
  },
  {
    name: 'comment',
    label: 'Questions or comments (optional)',
    type: 'textarea',
    required: false,
    placeholder: 'Anything we should know before class?',
    autocomplete: 'off'
  }
];
