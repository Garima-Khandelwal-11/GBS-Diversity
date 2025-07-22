//we are overriding (predefined) Error classes functions to stanndardize hoe the api handles error
class ApiError extends Error{
    constructor(
        statusCode=500,
        message= "Smething went wrong",
        errors= [],
        stack =""
    ){
        super(message)
        this.statusCode=statusCode||500;
        this.message=message;
        this.data =null
        this.success=false;
        this.errors=errors

        if(stack){
            this.stack=stack
        }else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export {ApiError}