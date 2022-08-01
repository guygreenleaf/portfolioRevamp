import { NextApiRequest, NextApiResponse } from 'next'

type ResponseError = {
  message: string
}

export default async function personHandler(
  req: NextApiRequest,
  res: NextApiResponse<boolean | ResponseError>
) {
  const { query } = req
  const { token } = query

const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.NEXT_PUBLIC_RECAPTCHA_SECRET}&response=${token}`,
                {
                    method: 'POST'
                });

const json = await response.json();

    console.log(json);

    if (json['success'] === true) {
        res.status(200).json(true);
    } else {
        res.status(400).json({ message: 'Invalid ReCAPTCHA Token.' });
    }
}