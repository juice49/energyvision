import { signUp } from '../../components/utils/subscription'
import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = req.body
  signUp(data).then((isSuccessful) => {
    if (!isSuccessful) {
      return res.status(500).json({ msg: 'Subscribe failed' })
    }
    res.status(200).json({ msg: 'Successfully subscribed.' })
  })
}