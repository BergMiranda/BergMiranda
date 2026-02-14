export const sendEmail = async (to: string, subject: string, body: string) => {
  console.log(`EMAIL => ${to} | ${subject} | ${body}`);
};

export const sendSms = async (to: string, message: string) => {
  console.log(`SMS => ${to} | ${message}`);
};
