// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import type { CreateNoteDto } from '../../types/note';
// import css from './NoteForm.module.css';

// type Props = {
//   onSubmit: (data: CreateNoteDto) => void;
// };

// const validationSchema = Yup.object({
//   title: Yup.string()
//     .min(3, 'Minimum 3 characters')
//     .max(50, 'Maximum 50 characters')
//     .required('Title is required'),

//   content: Yup.string()
//     .min(5, 'Minimum 5 characters')
//     .required('Content is required'),

//   tag: Yup.string().required('Tag is required'),
// });

// export default function NoteForm({ onSubmit }: Props) {
//   return (
//     <Formik
//       initialValues={{
//         title: '',
//         content: '',
//         tag: 'Todo',
//       }}
//       validationSchema={validationSchema}
//       onSubmit={(values, actions) => {
//         onSubmit(values);
//         actions.resetForm();
//       }}
//     >
//       {({ isSubmitting }) => (
//         <Form className={css.form}>
//           <h2>Create note</h2>

//           <Field name="title" placeholder="Title" />
//           <ErrorMessage name="title" component="div" className={css.error} />

//           <Field as="textarea" name="content" placeholder="Content" />
//           <ErrorMessage name="content" component="div" className={css.error} />

//           <Field as="select" name="tag">
//             <option value="Todo">Todo</option>
//             <option value="Work">Work</option>
//             <option value="Personal">Personal</option>
//           </Field>

//           <button type="submit" disabled={isSubmitting}>
//             Create
//           </button>
//         </Form>
//       )}
//     </Formik>
//   );
// }

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import type { CreateNoteDto } from '../../types/note';
import css from './NoteForm.module.css';

type Props = {
  onSubmit: (data: CreateNoteDto) => void;
  onCancel: () => void;
};

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, 'Minimum 3 characters')
    .max(50, 'Maximum 50 characters')
    .required('Title is required'),

  content: Yup.string().max(500, 'Maximum 500 characters'),

  tag: Yup.string()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'])
    .required('Tag is required'),
});

export default function NoteForm({ onSubmit, onCancel }: Props) {
  return (
    <Formik
      initialValues={{
        title: '',
        content: '',
        tag: 'Todo',
      }}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        onSubmit(values);
        actions.resetForm();
      }}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          {/* TITLE */}
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field id="title" type="text" name="title" className={css.input} />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          {/* CONTENT */}
          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field
              as="textarea"
              id="content"
              name="content"
              rows={8}
              className={css.textarea}
            />
            <ErrorMessage
              name="content"
              component="span"
              className={css.error}
            />
          </div>

          {/* TAG */}
          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field as="select" id="tag" name="tag" className={css.select}>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>

          {/* ACTIONS */}
          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={onCancel}
            >
              Cancel
            </button>

            <button
              type="submit"
              className={css.submitButton}
              disabled={isSubmitting}
            >
              Create note
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
