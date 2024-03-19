export type ResponseType<Data = {}> = {
  data: Data;
  resultCode: number;
  messages: Array<string>;
  fieldErrors: Array<{ field: string; error: string }>;
};
