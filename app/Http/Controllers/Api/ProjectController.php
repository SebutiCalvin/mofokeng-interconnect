<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\ProjectImage;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $query = Project::with(['constructor', 'images'])
            ->where('status', 'published');

        if ($request->has('search')) {
            $query->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
        }

        if ($request->has('type')) {
            $query->where('project_type', $request->type);
        }

        if ($request->has('featured')) {
            $query->where('is_featured', true);
        }

        $projects = $query->orderBy('created_at', 'desc')->paginate(12);

        return response()->json($projects);
    }

    public function show($slug)
    {
        $project = Project::where('slug', $slug)
            ->with(['constructor', 'images'])
            ->firstOrFail();

        $project->increment('views');

        return response()->json($project);
    }

    public function store(Request $request)
    {
        $constructor = $request->user()->constructor;

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'location' => ['nullable', 'string', 'max:255'],
            'city' => ['nullable', 'string', 'max:100'],
            'country' => ['nullable', 'string', 'max:100'],
            'project_type' => ['required', 'string'],
            'budget' => ['nullable', 'string'],
            'size' => ['nullable', 'string'],
            'duration' => ['nullable', 'string'],
            'completion_date' => ['nullable', 'date'],
            'features' => ['nullable', 'array'],
            'materials' => ['nullable', 'array'],
            'is_featured' => ['boolean'],
            'status' => ['in:draft,published,archived'],
        ]);

        $project = $constructor->projects()->create([
            'title' => $validated['title'],
            'slug' => Str::slug($validated['title']) . '-' . time(),
            'description' => $validated['description'],
            'location' => $validated['location'] ?? null,
            'city' => $validated['city'] ?? null,
            'country' => $validated['country'] ?? 'Lesotho',
            'project_type' => $validated['project_type'],
            'budget' => $validated['budget'] ?? null,
            'size' => $validated['size'] ?? null,
            'duration' => $validated['duration'] ?? null,
            'completion_date' => $validated['completion_date'] ?? null,
            'features' => $validated['features'] ?? [],
            'materials' => $validated['materials'] ?? [],
            'is_featured' => $validated['is_featured'] ?? false,
            'status' => $validated['status'] ?? 'draft',
        ]);

        return response()->json([
            'project' => $project,
            'message' => 'Project created successfully!'
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $project = $request->user()
            ->constructor
            ->projects()
            ->findOrFail($id);

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'location' => ['nullable', 'string', 'max:255'],
            'city' => ['nullable', 'string', 'max:100'],
            'country' => ['nullable', 'string', 'max:100'],
            'project_type' => ['required', 'string'],
            'budget' => ['nullable', 'string'],
            'size' => ['nullable', 'string'],
            'duration' => ['nullable', 'string'],
            'completion_date' => ['nullable', 'date'],
            'features' => ['nullable', 'array'],
            'materials' => ['nullable', 'array'],
            'is_featured' => ['boolean'],
            'status' => ['in:draft,published,archived'],
        ]);

        $project->update($validated);

        return response()->json([
            'project' => $project,
            'message' => 'Project updated successfully!'
        ]);
    }

    public function destroy($id)
    {
        $project = request()->user()
            ->constructor
            ->projects()
            ->findOrFail($id);

        foreach ($project->images as $image) {
            Storage::disk('public')->delete($image->image_path);
            $image->delete();
        }

        $project->delete();

        return response()->json([
            'message' => 'Project deleted successfully!'
        ]);
    }

    public function uploadImage(Request $request, $id)
    {
        $request->validate([
            'image' => ['required', 'image', 'mimes:jpeg,png,jpg', 'max:5120'],
            'caption' => ['nullable', 'string', 'max:255'],
            'is_primary' => ['boolean'],
        ]);

        $project = request()->user()
            ->constructor
            ->projects()
            ->findOrFail($id);

        $path = $request->file('image')->store('projects/' . $project->id, 'public');

        $image = $project->images()->create([
            'image_path' => $path,
            'caption' => $request->caption,
            'is_primary' => $request->is_primary ?? false,
            'order' => $project->images()->count(),
        ]);

        return response()->json([
            'image' => $image,
            'message' => 'Image uploaded successfully!'
        ]);
    }

    public function deleteImage($projectId, $imageId)
    {
        $project = request()->user()
            ->constructor
            ->projects()
            ->findOrFail($projectId);

        $image = $project->images()->findOrFail($imageId);
        Storage::disk('public')->delete($image->image_path);
        $image->delete();

        return response()->json([
            'message' => 'Image deleted successfully!'
        ]);
    }
}