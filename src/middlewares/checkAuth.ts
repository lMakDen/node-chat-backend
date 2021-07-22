import { verifyJWToken } from '../utils'


export default (
  req: any,
  res: any,
  next: any,
) => {

  if(
    req.path === '/user/signIn' ||
    req.path === '/user/signUp' ||
    req.path === '/user/verify'
  ) {
    return next()
  }

  const token = req.headers.token;
  verifyJWToken(token).then((user: any) => {
    req.user = user.data._doc;
    return next()
  }).catch(() => {
      return res.status(403).json({
        message: 'Invalid auth token provided.'
      })
    })
}