<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\YachtSizeModel;
use Illuminate\Support\Facades\Validator;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesController extends Controller
{
    public function create()
    {
        return Inertia::render('Permissions/Roles/Create');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'role' => 'required|unique:roles,name',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        //lower case the role name//
        $rolename = strtolower($request->role);
        $role = Role::create(['name' => $rolename]);

        return redirect()->route('roles')->withErrors(['success' => 'Role Added Successfully!']);
    }

    public function index()
    {
        $roles = Role::all();
        return Inertia::render('Permissions/Roles/index', ['roles' => $roles]);
    }

    public function permissions($id)
    {
        $role = Role::find($id);
        $permissionsAll = Permission::all();
        //if role has permissions then make custom key is_assigned to true//
        foreach ($permissionsAll as $permission) {
            $permission->have_permission = $role->hasPermissionTo($permission->name);
        }        
        return Inertia::render('Permissions/Roles/Permissions', ['role' => $role, 'permissionsall' => $permissionsAll]);
    }

    public function storePermissions(Request $request, $role, $permission){
        $role = Role::find($role);
        $permission = Permission::find($permission);
        if($role->hasPermissionTo($permission->name)){
            $role->revokePermissionTo($permission->name);
        }else{
            $role->givePermissionTo($permission->name);
        }
        return redirect()->back()->withErrors(['success' => 'Permission Updated Successfully!']);
    }

    public function edit($id)
    {
        $role = Role::find($id);
        return Inertia::render('Permissions/Roles/Edit', ['role' => $role]);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'role' => 'required|unique:roles,name,' . $id,
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $role = Role::find($id);
        $role->name = strtolower($request->role);
        $role->save();

        return redirect()->route('roles')->withErrors(['success' => 'Role Updated Successfully!']);
    }
}
