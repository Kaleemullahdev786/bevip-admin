<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Customer;
use App\Models\SendCode;
use App\Http\Requests\Api\RegisterRequest;
use App\Http\Requests\Api\AuthRequest;
use App\Http\Resources\CustomerResource;
use Hash;

class AuthController extends Controller
{
    
    /**
     * @param json response for registeration 
     */
    public function register(RegisterRequest $request)
    {
       
        $data = $request->validated();
        $data['password']= Hash::make($data['password']);
        $customer = Customer::create($data);
        $credentials = $request->only(['email', 'password']);

        if (!$token = auth('api')->attempt($credentials)) {
            return response()->json([
                'error' => 'Unauthorized'
            ], Response::HTTP_UNAUTHORIZED);
        }
       
         $token_details = $this->respondWithToken($token);
         $customer->token =$token_details->getData()->access_token;
         return new CustomerResource($customer);
    }


        
    /**
     * @param email and password
     */

    public function login(AuthRequest $request)
    {
        $credentials = $request->only(['email', 'password']);
        $credentials['deleted_at'] = null;
        if (!$token = auth('api')->attempt($credentials)) {

            
            return response()->json([
                'error' => 'Invalid Credentials'
            ], Response::HTTP_UNAUTHORIZED);
        }
        $customer = auth('api')->user();

         if(!is_null($customer->deleted_at)){
            return $this->success('error','Your account is not available',400);
        }

        $token_details = $this->respondWithToken($token);
        $customer->token =$token_details->getData()->access_token;
        return new CustomerResource($customer);
    }

    /**
     * @param token and show profile
     */

    public function user(Request $request)
    {
        $customer = auth('api')->user();
        return new CustomerResource($customer);
    }

    /**
     * @param token and logout
     */

    public function logout()
    {
        auth('api')->logout();
        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }

     /**
     * @param token and refresh the token
     */
    public function refresh()
    {
        return $this->respondWithToken(auth('api')->refresh());
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => config('jwt.ttl') * 60
        ]);
    }


    public function checkToken(Request $request)
    {
        try {
            $payload = JWTAuth::parseToken()->getPayload();
            return response()->json(['valid' => true, 'payload' => $payload]);
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json(['valid' => false, 'error' => 'Token has expired']);
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json(['valid' => false, 'error' => 'Token is invalid']);
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['valid' => false, 'error' => 'Token is absent']);
        }
    }
}
