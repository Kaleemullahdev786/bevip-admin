<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class UsersController extends Controller
{
    public function index()
    {
        $hasPermission = auth()->user()->hasPermissionTo('view users');
        if(!$hasPermission){
            abort(403);
        }
        $users = User::get();
        return Inertia::render('Users/index', ['users' => $users]);
    }

    public function create()
    {
        $hasPermission = auth()->user()->hasPermissionTo('create users');
        if(!$hasPermission){
            abort(403);
        }
        $roles = Role::get(['name']);
        $rolesArray = [];

        foreach ($roles as $role) {
            $rolesArray[] = [
                'value' => $role->name,
                'label' => $role->name
            ];
        }

        $rolesmain = $rolesArray;
        return Inertia::render('Users/Create', ['rolesmain' => $rolesmain]);
    }

    public function store(Request $request)
    {
        $hasPermission = auth()->user()->hasPermissionTo('create users');
        if(!$hasPermission){
            abort(403);
        }
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required',
            'role' => 'required'
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->role = $request->role['value'];
        $user->save();
        $findrole = Role::where('name', $request->role['value'])->first();
        if($findrole){
            $user->assignRole($findrole->name);
        }
        //get all permissions assigned to this role //
        $permissions = $findrole->permissions;
        $user->syncPermissions($permissions);

        return redirect()->route('users')->withErrors(['success' => 'User Added Successfully!']);
    }

    public function edit($id)
    {
        $hasPermission = auth()->user()->hasPermissionTo('update users');
        if(!$hasPermission){
            abort(403);
        }
        $user = User::find($id);
        $roles = Role::get(['name']);
        $rolesArray = [];

        foreach ($roles as $role) {
            $rolesArray[] = [
                'value' => $role->name,
                'label' => $role->name
            ];
        }

        $rolesmain = $rolesArray;

        //get all permissions//
        $permissions = $user->getAllPermissions();

        $allPermissions = Permission::all();
        //have permission//
        foreach ($allPermissions as $permission) {
            $permission->have_permission = false;
            foreach ($permissions as $userPermission) {
                if($permission->name == $userPermission->name){
                    $permission->have_permission = true;
                }
            }
        }


        return Inertia::render('Users/Edit', ['user' => $user, 'rolesmain' => $rolesmain,'permissions' => $allPermissions]);
    }

    public function update(Request $request, $id)
    {
        $hasPermission = auth()->user()->hasPermissionTo('update users');
        if(!$hasPermission){
            abort(403);
        }
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users,email,'.$id,
            'role' => 'required'
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $user = User::find($id);
        $user->name = $request->name;
        $user->email = $request->email;
        $user->role = $request->role['value'];
        $user->save();
        $findrole = Role::where('name', $request->role['value'])->first();
        if($findrole){
            $user->assignRole($findrole->name);
        }
        //get all permissions assigned to this role //
        $permissions = $findrole->permissions;
        $user->syncPermissions($permissions);

        return redirect()->route('users')->withErrors(['success' => 'User Updated Successfully!']);
    }

    public function delete($id)
    {
        $hasPermission = auth()->user()->hasPermissionTo('delete users');
        if(!$hasPermission){
            abort(403);
        }
        $user = User::find($id);
        //remove all permissions assigned to this user //
        $user->syncPermissions([]);
        $user->removeRole($user->role);
        $user->delete();
        return redirect()->route('users')->withErrors(['success' => 'User Deleted Successfully!']);
    }

    public function block($id)
    {
        $hasPermission = auth()->user()->hasPermissionTo('block users');
        if(!$hasPermission){
            abort(403);
        }
        $user = User::find($id);
        if($user->status == 'blocked'){
            $user->status = 'active';
        }else{
        $user->status = 'blocked';
        }
        $user->save();
        return redirect()->route('users')->withErrors(['success' => 'User Status Updated Successfully!']);
    }

    public function permissions(Request $request,$userid,$permissionid)
    {
        $hasPermission = auth()->user()->hasPermissionTo('permissions users');
        if(!$hasPermission){
            abort(403);
        }
        $user = User::find($userid);
        $permission = Permission::find($permissionid);
        if($user->hasPermissionTo($permission->name)){
            $user->revokePermissionTo($permission->name);
        }else{
            $user->givePermissionTo($permission->name);
        }
        return redirect()->back()->withErrors(['success' => 'Permission Updated Successfully!']);
    }
}
