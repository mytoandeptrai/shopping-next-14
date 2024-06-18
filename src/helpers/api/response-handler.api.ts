interface IResponsePayload<T> {
  code: number;
  message: string;
  data?: T;
}

const responseHandler = <T>(payload: IResponsePayload<T>) => {
  const { code, message, data } = payload;

  return {
    code: code ?? 0,
    message: message ?? 'Oh yeah oh yeah...',
    data: data ?? null,
  };
};

export { responseHandler };
