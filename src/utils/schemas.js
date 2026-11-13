import * as yup from "yup";

export const registerSchema = yup.object({
  name: yup.string().trim().required("სახელი სავალდებულოა"),

  email: yup
    .string()
    .trim()
    .email("შეიყვანე სწორი ელფოსტა")
    .required("ელფოსტა სავალდებულოა"),

  password: yup
    .string()
    .min(8, "პაროლი მინიმუმ 8 სიმბოლო უნდა იყოს")
    .required("პაროლი სავალდებულოა"),

  role: yup
    .string()
    .oneOf(["freelancer", "client"], "აირჩიე მომხმარებლის ტიპი")
    .required("აირჩიე მომხმარებლის ტიპი"),

  profession: yup
    .string()
    .trim()
    .when("role", {
      is: "freelancer",
      then: (schema) => schema.required("მიუთითე შენი პროფესია"),
      otherwise: (schema) => schema.notRequired(),
    }),

  industry: yup
    .string()
    .trim()
    .when("role", {
      is: "client",
      then: (schema) => schema.required("მიუთითე კომპანიის სფერო"),
      otherwise: (schema) => schema.notRequired(),
    }),

  bio: yup
    .string()
    .max(300, "აღწერა მაქსიმუმ 300 სიმბოლო უნდა იყოს")
    .notRequired(),
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email("შეიყვანე სწორი ელფოსტა")
    .required("ელფოსტა სავალდებულოა"),

  password: yup.string().required("პაროლი სავალდებულოა"),
});
