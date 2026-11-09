<?php

namespace App\Http\Controllers\Api;

use App\Models\Constructor;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ConstructorController extends Controller
{
    public function profile()
    {
        $user = Auth::user();
        $constructor = Constructor::where('user_id', $user->id)->firstOrFail();
        return response()->json($constructor);
    }

    public function updateProfile(Request $request)
    {
        $user = Auth::user();
        $constructor = Constructor::where('user_id', $user->id)->firstOrFail();

        $request->validate([
            'company_name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'location' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:100',
            'country' => 'nullable|string|max:100',
            'phone' => 'nullable|string|max:20',
            'established_year' => 'nullable|integer|min:1900|max:' . date('Y'),
            'specializations' => 'nullable|string', // comma-separated
            'certifications' => 'nullable|string',
            'website' => 'nullable|url|max:255',
        ]);

        // Update fields
        $data = $request->only([
            'company_name', 'description', 'location', 'city', 'country',
            'phone', 'established_year', 'website'
        ]);

        // Convert comma-separated strings to arrays
        if ($request->has('specializations')) {
            $data['specializations'] = array_map('trim', explode(',', $request->specializations));
        }
        if ($request->has('certifications')) {
            $data['certifications'] = array_map('trim', explode(',', $request->certifications));
        }

        // Update slug if company name changed
        if ($constructor->company_name !== $request->company_name) {
            $data['slug'] = Str::slug($request->company_name) . '-' . uniqid();
        }

        $constructor->update($data);

        return response()->json($constructor);
    }

    public function uploadLogo(Request $request)
    {
        $request->validate([
            'logo' => 'required|image|max:2048',
        ]);

        $user = Auth::user();
        $constructor = Constructor::where('user_id', $user->id)->firstOrFail();

        if ($constructor->logo) {
            Storage::disk('public')->delete($constructor->logo);
        }

        $path = $request->file('logo')->store('constructors/logos', 'public');
        $constructor->update(['logo' => $path]);

        return response()->json(['logo' => $path]);
    }

    public function uploadCover(Request $request)
    {
        $request->validate([
            'cover_image' => 'required|image|max:5120',
        ]);

        $user = Auth::user();
        $constructor = Constructor::where('user_id', $user->id)->firstOrFail();

        if ($constructor->cover_image) {
            Storage::disk('public')->delete($constructor->cover_image);
        }

        $path = $request->file('cover_image')->store('constructors/covers', 'public');
        $constructor->update(['cover_image' => $path]);

        return response()->json(['cover_image' => $path]);
    }

    public function show($id)
    {
        $constructor = Constructor::with(['user', 'projects'])
            ->where('slug', $id)
            ->orWhere('id', $id)
            ->firstOrFail();

        return response()->json($constructor);
    }

    // Admin: verify constructor
    public function verify($id)
    {
        $constructor = Constructor::findOrFail($id);
        $constructor->update([
            'is_verified' => true,
            'status' => 'active',
        ]);
        return response()->json(['message' => 'Constructor verified']);
    }
}