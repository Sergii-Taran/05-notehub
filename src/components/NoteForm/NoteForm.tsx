import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import css from './NoteForm.module.css';

type Props = {
  onSubmit: (data: { title: string; content: string; tag: string }) => void;
};

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, 'Minimum 3 characters')
    .max(50, 'Maximum 50 characters')
    .required('Title is required'),

  content: Yup.string()
    .min(5, 'Minimum 5 characters')
    .required('Content is required'),

  tag: Yup.string().required('Tag is required'),
});

export default function NoteForm({ onSubmit }: Props) {
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
          <h2>Create note</h2>

          <Field name="title" placeholder="Title" />
          <ErrorMessage name="title" component="div" className={css.error} />

          <Field as="textarea" name="content" placeholder="Content" />
          <ErrorMessage name="content" component="div" className={css.error} />

          <Field as="select" name="tag">
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
          </Field>

          <button type="submit" disabled={isSubmitting}>
            Create
          </button>
        </Form>
      )}
    </Formik>
  );
}
