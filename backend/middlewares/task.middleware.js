import jwt from 'jsonwebtoken';

export const authUser = (req, res, next)=>{
    const token = req.headers.authorization.split(' ')[1]

    if(token){
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
            if(decoded){
                // console.log(decoded.id);
                req.body.userId = decoded.id
                next()
            } else {
                res.json('You are not authorised')
            }
        })
    } else {
        res.json('token required')
    }
}