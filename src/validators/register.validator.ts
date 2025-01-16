import * as v from 'valibot';

const RegisterSchema = v.object({
  username: v.pipe(
    v.string('username must not be null'),
    v.nonEmpty('username must not be null')
  ),
  password: v.pipe(
    v.string('password must not be null'),
    v.nonEmpty('password must not be null'),
    v.minLength(8, 'password must equal or greater than 8 charters')
  ),
  email: v.pipe(
    v.string('email must not be null'),
    v.nonEmpty('email must not be null'),
    v.email('invalid email format')
  )
});

type RegisterData = v.InferOutput<typeof RegisterSchema>;

export function getRegisterData(data: unknown): RegisterData {
  return v.parse(RegisterSchema, data);
}
