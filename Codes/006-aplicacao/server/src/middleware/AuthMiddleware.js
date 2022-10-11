import jwt from 'jsonwebtoken';

export class AuthMiddleware {


    async handle(request, response, next) {

        console.log("[AuthMiddleware] Validating request...");

        try {
            
            const authorization = request.headers['authorization'].split(' ');
            const prefix = authorization[0];
            const token = authorization[1];

            if ( prefix !== process.env.JWT_HEADER_KEY) {
                return response.status(401)
                        .send({
                            message: "Acesso não autorizado!"
                        })
            }

            const tokenIsValid = jwt.verify(token, 
                    process.env.JWT_SECRET_KEY);

            if ( tokenIsValid ) {
                return next();
            } else {
                return response.status(401).send({
                    message: "Token de acesso inválido!"
                })
            }

        } catch (error) {
            return response.status(401).send(error);
        }

    }        

}