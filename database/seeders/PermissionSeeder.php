<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $modules = [
            'Users',
            'Roles & Permissions',
            'Tour Plans',
            'Tour Plan Visits',
            'Warehouses',
            'Dealers',
            'Departments',
            'Transits',
            'Leads',
            'Products',
            'Lead Sources',
        ];

        $actions = ['add', 'edit', 'delete', 'view'];

        // Optional: clear cached permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        foreach ($modules as $module) {
            foreach ($actions as $action) {
                Permission::firstOrCreate(['name' => strtolower($action . ' ' . $module)]);
            }
        }

        // Optional: Create an Admin role with all permissions
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $adminRole->syncPermissions(Permission::all());
    }
}
