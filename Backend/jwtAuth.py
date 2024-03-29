from jose import JWTError,jwt
from fastapi import HTTPException,Depends
from fastapi.security import HTTPBearer,HTTPAuthorizationCredentials
from datetime import datetime,timedelta
from schema.user import JWTPayload
import traceback

security = HTTPBearer()

class JWTAuth:
    secret_key = "lkksjuihsvucdubdnk"
    algorithm = 'HS256'
    
    
    def encode_token(self,payload):
        asof = datetime.now()
        payload.update(
            {
                "scope": "access_token",
                "iat": asof.timestamp(),
                "exp": (asof + timedelta(minutes=30)).timestamp(),
            }
        )
        return jwt.encode(
            payload,
            self.secret_key,
            algorithm=self.algorithm,
        )
    
    def decode_token(self, token):
        try:
            print('Hello')
            payload = jwt.decode(
                token, self.secret_key, algorithms=[self.algorithm]
            )
            if payload["scope"] == "access_token":
                return payload
            raise HTTPException(
                status_code=401, detail="Scope for the token is invalid"
            )
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail="Token expired")
        except jwt.JWTError:
            traceback.print_exc()
            raise HTTPException(status_code=401, detail="Invalid token")
        
        

async def authenticate_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
)-> JWTPayload:
    auth_handler = JWTAuth()
    payload = auth_handler.decode_token(credentials.credentials)
    return JWTPayload(**{
        "mobile_number": payload["mobile_number"],
        "user_id": payload["user_id"]
    })
