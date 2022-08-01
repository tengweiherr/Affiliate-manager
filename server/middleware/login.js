import jwt from 'jsonwebtoken';

const login = async(req, res, next) => {
    
    try {
        const token = req.headers.authorization.split(" ")[1];
        
        let decodedData;

        if(token && token.length < 500) {
            decodedData = jwt.verify(token, 'test');
            req.userId = decodedData?.id; //optional chaining
        }

        next();

    } catch (error) {
        console.log(error);
    }
}

export default login;