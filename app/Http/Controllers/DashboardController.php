<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Route;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;


class DashboardController extends Controller
{
    public function dashboardIndex()
    {
        return Inertia::render('Dashboard/Dashboard');
    }

    public function permissionsIndex()
    {
        $roles = Role::all();
        return Inertia::render('Dashboard/Permissions', ['roles' => $roles]);
    }
}
