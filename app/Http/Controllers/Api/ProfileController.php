<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Customer;
use App\Models\SendCode;
use App\Http\Requests\ProfileChangeNamesRequest;
use App\Http\Resources\CustomerResource;
use Illuminate\Support\Str;
use Auth;
use App\Http\Requests\changePasswordRequest;
use App\Http\Requests\changeEmailRequest;
use App\Http\Requests\EmailRequest;
use App\Notifications\CodeNotification;
use Hash;
use Carbon\Carbon;
class ProfileController extends Controller
{
    
    public function changeName(){

        $user = auth('api')->user();

        $user->first_name = 'fff';
        $user->last_name = 'lll';
        $user->save();
        return new CustomerResource($user);
    }


    //  Change password

    public function changePassword(changePasswordRequest $request){

        $user = auth('api')->user();
        $newpassword = Hash::make($request->password);
        if($user->password == $newpassword){
            $user->password = $newpassword;
            $user->save();
        }
        return new CustomerResource($user);
    }



    
    //  Change Emails

    public function changeEmail(changeEmailRequest $request){

        $user = auth('api')->user();
        $code = $request->code;
        $new_email = $request->email;
        $is_exist = SendCode::where(['code'=>$request->code,'email'=>$user->email])->latest()->first();

        if($is_exist && $is_exist->status == 'active'){
            $check_other_user_email = Customer::where(['email'=>$new_email])->first();
            
            if(!$check_other_user_email)
            {
                $is_exist->status = 'inactive';
                $is_exist->save();
                $user->email = $new_email;
                $user->save();
            }else{
                return $this->success('error',"Try another email, It's already exist",400);    
            }

            
        }
        else{
            return $this->success('error','No valid code',400);
        }

        return new CustomerResource($user);
    }


    
    public function sendCode(EmailRequest $request){

        $random_number = rand(10000,1000000);

        
        $customer = Customer::where(['email'=>$request->email])->first();
        if(is_null($customer)){

            return $this->success('error','Your email is not a part of the system',400);
        }

        $customer->code  = $random_number;
        SendCode::create(['code'=>$random_number,'email'=>$customer->email]);
         
        $customer->notify(new CodeNotification($random_number));


        return $this->success('error','Send code your email, Please check ',200);
    }


    public function delete(EmailRequest $request){

       
        $customer = Customer::where(['email'=>$request->email])->whereNull('deleted_at')->first();
        // dd($customer);
        $message = 'Your account is already deleted.';
        $error = 'error';
        
       if(!is_null($customer)){
        $customer->deleted_at = Carbon::now();
        $customer->save();
        $error = 'success';
        $message = 'Your account is deleted.';
       }
    
        return $this->success($error,$message,200);
    }



    public function providerRegistration(Request $request){


        $provider = $request->provider;
        $email = $request->email;
        $image = $request->photo;
        $provider_token = $request->token;
        $provider_id = $request->provider_id;
        $pushToken = $request->push_token;
        $os = $request->os;
        // random str
        $randomkey = Str::random(60);
        $api_token = $randomkey;
        // create or update user

        $customer = Customer::where('email', $email)
        ->orderBy('id', 'desc')
        ->first();


        if($customer && $customer->provider === 'email'){
            return response()->json([
                'status' => 'error',
                'message' => 'This email is already registered with us. Please login with email'
            ]);
        }

        if(!$customer){
            $customer = new Customer();
            $customer->first_name = $request->first_name === 'null' ? 'Customer'.rand(100000, 999999) : $request->first_name;
            $customer->last_name = $request->last_name === 'null' ? 'Customer'.rand(100000, 999999) : $request->last_name;
            $customer->email = $email;
            $customer->api_token = $api_token;
            $customer->provider = $provider;
            $customer->image = $image;
            $customer->provider_id = $provider_id;
            if($pushToken){
                $customer->push_token = $pushToken;
                $customer->os = $os;
            }
            $customer->provider_token = $provider_token;
            $customer->save();

        }else{
            $customer->first_name = $request->first_name === 'null' ? 'Customer'.rand(100000, 999999) : $request->first_name;
            $customer->last_name = $request->last_name === 'null' ? 'Customer'.rand(100000, 999999) : $request->last_name;
            $customer->email = $email;
            $customer->provider_id = $provider_id;
            $customer->provider_token = $provider_token;
            if($pushToken){
                $customer->push_token = $pushToken;
                $customer->os = $os;
            }
            $customer->save();
        }
        

        $token = Auth::guard('api')->login($customer);
        $customer->token = $token;
        return new CustomerResource($customer);

    }
}
