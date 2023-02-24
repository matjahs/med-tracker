import * as React from 'react';
import { Field, FormikProvider, useFormik } from 'formik';
import { Autocomplete, CheckboxWithLabel, TextField, TextFieldProps } from 'formik-mui';
import { AutocompleteRenderInputParams, Box, Button, capitalize, LinearProgress, Stack, TextField as MuiTextField } from '@mui/material';
import { SUBSTANCES, USERS } from '@/constants';
import { Substance, TodoItem, User } from '@/types';
import * as Yup from 'yup';
import { CodeBlock, dracula } from 'react-code-blocks';
// import { TimePicker, TimePickerProps } from '@mui/x-date-pickers/TimePicker';
import { TimePicker } from 'formik-mui-lab';
const TIME_FORMAT = `YYYYMMDDHHmmssSSS`;

const validationSchema = Yup.object<TodoItem>().shape({
  substance: Yup.object().shape({
    name: Yup.string().required('Required')
  }).required('Required'),
  text: Yup.string().required('Required'),
  time: Yup.date().required('Required'),
  users: Yup.array().of(Yup.object().shape({
    name: Yup.string().required('Required')
  })).required('Required')
});

interface CreateFormProps {
  substances: Substance[];
  users: User[];
  createItem: (item: FormValues) => Promise<TodoItem[]>;
}

type FormValues = Omit<TodoItem, 'id'>;

export function CreateForm({ substances, users, createItem }: CreateFormProps) {
  const formik = useFormik({
      initialValues: {
        substance: SUBSTANCES[0],
        text: 'Some text',
        time: new Date(),
        users: USERS
      },
      validationSchema,
      onSubmit: async (values) => {
        const item = {
          time: values.time,
          text: values.text,
          substance: values.substance,
          users: values.users
        } as FormValues;
        await createItem(values);

      }
    }
  );
O
  return (
    <div>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2}>
            <Field
              name='substance'
              component={Autocomplete}
              options={SUBSTANCES}
              getOptionLabel={(option: Substance) => option.name}
              style={{ width: 300 }}
              renderInput={(params: AutocompleteRenderInputParams) => (
                <MuiTextField
                  {...params}
                  name='substance'
                  error={formik.touched['substance'] && !!formik.errors['substance']}
                  // helperText={formik.errors['substance']}
                  label='Substance'
                  variant='outlined'
                />
              )}
            />

            <Field
              component={TimePicker}
              label="time"
              onChange={formik.handleChange}
            />


            {/*<DatePicker />*/}
            {/*<TimePicker*/}
            {/*  value={formik.values.time}*/}
            {/*  onChange={formik.handleChange}*/}
            {/*  renderInput={(params) => (*/}
            {/*    <TextField*/}
            {/*      {...params}*/}
            {/*      fullWidth*/}
            {/*      id='time'*/}
            {/*      variant='standard'*/}
            {/*      value={formik.values.time}*/}
            {/*      onChange={formik.handleChange}*/}
            {/*      error={formik.touched.time && Boolean(formik.errors.time)}*/}
            {/*    />*/}
            {/*  )}*/}
            {/*/>*/}

            <Stack direction='row'>
              {USERS?.length ? (
                USERS.map((user) => (
                  <Field
                    key={user.id}
                    component={CheckboxWithLabel}
                    type='checkbox'
                    name='users'
                    value={user}
                    Label={{ label: capitalize(user.name) }}
                  />
                ))
              ) : null}
            </Stack>

            <MuiTextField
              fullWidth
              name='text'
              label='Text'
              variant='outlined'
              value={formik.values.text}
            />

            {formik.isSubmitting && <LinearProgress />}

            <Button className='mt-1' color='primary' variant='contained' fullWidth type='submit'>
              Submit
            </Button>
          </Stack>
        </form>

        <Box style={{
          position: 'fixed',
          bottom: 0,
          right: 0
        }}>
          <CodeBlock
            text={JSON.stringify(formik.values, null, 2)}
            language='json'
            showLineNumbers={true}
            theme={dracula}
          />
        </Box>
      </FormikProvider>
    </div>
  );
}
