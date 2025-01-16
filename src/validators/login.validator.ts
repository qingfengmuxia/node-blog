import * as v from 'valibot';

const LoginScheme = v.object({
  email: v.pipe(
    v.string('email must not be null'),
    v.nonEmpty('email must not be null'),
    v.email('invalid email format')
  ),
  password: v.pipe(
    v.string('password must not be null'),
    v.nonEmpty('password must not be null')
  )
});

type LoginData = v.InferOutput<typeof LoginScheme>;

export function getLoginData(data: unknown): LoginData {
  return v.parse(LoginScheme, data);
}
